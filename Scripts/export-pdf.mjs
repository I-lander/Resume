#!/usr/bin/env node
/**
 * Convertit le CV HTML en PDF A4.
 *
 * Le CV est une page A4 unique (@page size A4; margin 0) qui charge ses icones
 * depuis des CDN : le rendu passe donc par un vrai navigateur, et l'impression
 * attend que le reseau soit calme.
 *
 * Zero dependance : pilote le Chrome (ou Edge) deja installe via le protocole
 * DevTools, avec le WebSocket natif de Node (>= 22).
 *
 * Usage :
 *   node Scripts/export-pdf.mjs
 *   node Scripts/export-pdf.mjs --source Sources/autre.html --out C:\tmp\cv.pdf
 *   node Scripts/export-pdf.mjs --timeout 60000
 */

import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { setTimeout as sleep } from 'node:timers/promises';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

function parseArgs(argv) {
  const opts = {
    source: join(repoRoot, 'Sources', 'Ilan_Varillon_CV_2026.html'),
    out: null,
    timeout: 30000,
  };
  for (let i = 0; i < argv.length; i += 1) {
    const [flag, inline] = argv[i].split(/=(.*)/s);
    const value = () => (inline !== undefined ? inline : argv[++i]);
    switch (flag) {
      case '--source': case '-s': opts.source = value(); break;
      case '--out': case '-o': opts.out = value(); break;
      case '--timeout': case '-t': opts.timeout = Number(value()); break;
      case '--help': case '-h': opts.help = true; break;
      default: throw new Error(`Option inconnue : ${flag}`);
    }
  }
  return opts;
}

const BROWSER_CANDIDATES = {
  win32: [
    `${process.env.ProgramFiles}\\Google\\Chrome\\Application\\chrome.exe`,
    `${process.env['ProgramFiles(x86)']}\\Google\\Chrome\\Application\\chrome.exe`,
    `${process.env.LOCALAPPDATA}\\Google\\Chrome\\Application\\chrome.exe`,
    `${process.env.ProgramFiles}\\Microsoft\\Edge\\Application\\msedge.exe`,
    `${process.env['ProgramFiles(x86)']}\\Microsoft\\Edge\\Application\\msedge.exe`,
  ],
  darwin: [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  ],
  linux: ['/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'],
};

function findBrowser() {
  const found = (BROWSER_CANDIDATES[process.platform] ?? []).find((p) => p && existsSync(p));
  if (!found) {
    throw new Error('Aucun navigateur Chromium trouve. Installe Google Chrome ou Microsoft Edge.');
  }
  return found;
}

/** Client CDP minimal : envoi de commandes et abonnement aux evenements. */
class Cdp {
  #ws;
  #nextId = 1;
  #pending = new Map();
  #listeners = new Map();

  static async connect(url) {
    const client = new Cdp();
    client.#ws = new WebSocket(url);
    client.#ws.addEventListener('message', (event) => client.#onMessage(event.data));
    await new Promise((ok, ko) => {
      client.#ws.addEventListener('open', ok, { once: true });
      client.#ws.addEventListener('error', () => ko(new Error('Connexion DevTools impossible.')), { once: true });
    });
    return client;
  }

  #onMessage(raw) {
    const msg = JSON.parse(raw);
    if (msg.id !== undefined) {
      const slot = this.#pending.get(msg.id);
      if (!slot) return;
      this.#pending.delete(msg.id);
      if (msg.error) slot.reject(new Error(msg.error.message));
      else slot.resolve(msg.result);
      return;
    }
    for (const fn of this.#listeners.get(msg.method) ?? []) fn(msg.params);
  }

  on(method, fn) {
    if (!this.#listeners.has(method)) this.#listeners.set(method, new Set());
    this.#listeners.get(method).add(fn);
  }

  send(method, params = {}, sessionId) {
    const id = this.#nextId++;
    return new Promise((res, rej) => {
      this.#pending.set(id, { resolve: res, reject: rej });
      this.#ws.send(JSON.stringify({ id, method, params, sessionId }));
    });
  }

  close() {
    this.#ws.close();
  }
}

/** Attend l'evenement load, puis un silence reseau de 500 ms. */
async function waitForQuietNetwork(cdp, timeout) {
  let inflight = 0;
  let lastActivity = Date.now();
  const touch = (delta) => {
    inflight = Math.max(0, inflight + delta);
    lastActivity = Date.now();
  };

  cdp.on('Network.requestWillBeSent', () => touch(+1));
  cdp.on('Network.loadingFinished', () => touch(-1));
  cdp.on('Network.loadingFailed', () => touch(-1));

  const loaded = new Promise((ok) => cdp.on('Page.loadEventFired', ok));
  const deadline = Date.now() + timeout;

  await Promise.race([loaded, sleep(timeout)]);
  while (Date.now() < deadline) {
    if (inflight === 0 && Date.now() - lastActivity > 500) return;
    await sleep(100);
  }
  console.warn('Attention : le reseau est encore actif, impression quand meme.');
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  if (opts.help) {
    console.log('Usage : node Scripts/export-pdf.mjs [--source <html>] [--out <pdf>] [--timeout <ms>]');
    return;
  }

  const source = resolve(opts.source);
  if (!existsSync(source)) throw new Error(`Fichier introuvable : ${source}`);
  const out = resolve(opts.out ?? source.replace(/\.html?$/i, '.pdf'));

  const browser = findBrowser();
  // Profil jetable : sans lui, l'export echoue si le navigateur tourne deja.
  const profileDir = await mkdtemp(join(tmpdir(), 'cv-pdf-'));

  console.log(`Navigateur : ${browser}`);
  console.log(`Source     : ${source}`);
  console.log(`Sortie     : ${out}`);

  const child = spawn(browser, [
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    '--remote-debugging-port=0',
    `--user-data-dir=${profileDir}`,
    'about:blank',
  ], { stdio: 'ignore' });

  let cdp;
  try {
    // Chrome ecrit le port qu'il a choisi dans DevToolsActivePort une fois pret.
    const portFile = join(profileDir, 'DevToolsActivePort');
    let endpoint;
    for (let i = 0; i < 100 && !endpoint; i += 1) {
      await sleep(100);
      if (!existsSync(portFile)) continue;
      const [port, path] = (await readFile(portFile, 'utf8')).split('\n');
      if (port && path) endpoint = `ws://127.0.0.1:${port.trim()}${path.trim()}`;
    }
    if (!endpoint) throw new Error("Le navigateur n'a pas expose son port DevTools.");

    cdp = await Cdp.connect(endpoint);

    const { targetId } = await cdp.send('Target.createTarget', { url: 'about:blank' });
    const { sessionId } = await cdp.send('Target.attachToTarget', { targetId, flatten: true });

    await cdp.send('Page.enable', {}, sessionId);
    await cdp.send('Network.enable', {}, sessionId);
    await cdp.send('Page.navigate', { url: pathToFileURL(source).href }, sessionId);
    await waitForQuietNetwork(cdp, opts.timeout);

    const { data } = await cdp.send('Page.printToPDF', {
      printBackground: true,   // sidebar noire, pastilles, badges
      preferCSSPageSize: true, // respecte @page size A4; margin 0
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0,
    }, sessionId);

    await mkdir(dirname(out), { recursive: true });
    const pdf = Buffer.from(data, 'base64');
    await writeFile(out, pdf);
    console.log(`PDF genere (${(pdf.length / 1024).toFixed(1)} Ko).`);
  } finally {
    try {
      await cdp?.send('Browser.close');
    } catch {
      // le navigateur est deja parti
    }
    cdp?.close();
    child.kill();
    await rm(profileDir, { recursive: true, force: true, maxRetries: 5 });
  }
}

main().catch((err) => {
  console.error(`Echec : ${err.message}`);
  process.exit(1);
});
