import { ctx } from "../../app.js";
import { Contact } from "./Contact.js";
import {
  SkillPlanet,
  BereshitPlanet,
  DelementPlanet,
  DonkeyReadingsPlanet,
  ResumePlanet,
  GenesisPlanet,
  EpitaphPlanet,
  SoftPlanet,
} from "./PlanetTypes.js";
import { Ship } from "./Ship.js";
import { ShootingStar } from "./ShootingStar.js";
import { OtherSun, ProjectsSun, SkillsSun } from "./SunTypes.js";
import { Nebula, CosmicDust, Vignette, BloomFlash } from "./Effects.js";

export function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

const ship = new Ship(innerWidth / 2, innerHeight / 2);
const contact = new Contact();

const skillsSun = new SkillsSun(-600, -500, 100);
skillsSun.hue = 200;

const otherSun = new OtherSun(1500, -800, 75);
otherSun.hue = 280;

const projectsSun = new ProjectsSun(1750, 1800, 75);
projectsSun.hue = 30;

const SKILL_KEYS = [
  "html", "css", "javascript", "react", "angular",
  "typescript", "python", "c_sharp", "claude", "git", "sql", "docker",
];

const skillPlanets = SKILL_KEYS.map((key, i) =>
  new SkillPlanet(50, skillsSun.orbitInterval * (4 + i), skillsSun, key)
);

const delementPlanet = new DelementPlanet(50, projectsSun.orbitInterval * 10, projectsSun);
const bereshitPlanet = new BereshitPlanet(50, projectsSun.orbitInterval * 6, projectsSun);
const donkeyReadingsPlanet = new DonkeyReadingsPlanet(50, projectsSun.orbitInterval * 8, projectsSun);
const resumePlanet = new ResumePlanet(50, projectsSun.orbitInterval * 12, projectsSun);
const genesisPlanet = new GenesisPlanet(50, projectsSun.orbitInterval * 14, projectsSun);
const epitaphPlanet = new EpitaphPlanet(50, projectsSun.orbitInterval * 16, projectsSun);

const softPlanets = Array.from({ length: 9 }, (_, i) =>
  new SoftPlanet(60, otherSun.orbitInterval * (2 + i), otherSun, i)
);

export const worldObjects = [
  ship,
  projectsSun,
  skillsSun,
  otherSun,
  ...skillPlanets,
  contact,
  delementPlanet,
  donkeyReadingsPlanet,
  bereshitPlanet,
  resumePlanet,
  genesisPlanet,
  epitaphPlanet,
  ...softPlanets,
];

export const starsArray = [];

const bloomFlash = new BloomFlash();
export function getBloomFlash() { return bloomFlash; }
const vignette = new Vignette();

const nebulae = [
  new Nebula(-400, -300, 500, 220),
  new Nebula(1600, 1700, 600, 280),
  new Nebula(1400, -700, 450, 320),
  new Nebula(500, 800, 350, 180),
  new Nebula(-200, 600, 400, 260),
  new Nebula(2000, 500, 500, 340),
  new Nebula(800, -500, 300, 200),
];

const cosmicDustParticles = Array.from({ length: 150 }, () => new CosmicDust(3000));

const shootingStar = new ShootingStar(canvas.width);
let nextShootingStarTime = Date.now() + getRandomDelay();

function getRandomDelay() {
  return getRandom(1000, 5000);
}

function drawShootingStar() {
  if (Date.now() >= nextShootingStarTime) {
    if (!shootingStar.isReset) {
      shootingStar.reset(canvas.width);
    }
    shootingStar.update(ctx);

    if (shootingStar.isOffScreen()) {
      nextShootingStarTime = Date.now() + getRandomDelay();
      shootingStar.isReset = false;
    }
  }
}

let lastCameraX = 0;
let lastCameraY = 0;

export function drawWorld(isMoving, cameraX, cameraY) {
  const cameraSpeedX = cameraX - lastCameraX;
  const cameraSpeedY = cameraY - lastCameraY;
  lastCameraX = cameraX;
  lastCameraY = cameraY;

  for (const nebula of nebulae) {
    nebula.update(ctx);
  }

  for (const dust of cosmicDustParticles) {
    dust.update(ctx);
  }

  drawShootingStar();

  for (let i = 0; i < starsArray.length; i++) {
    starsArray[i].update(ctx);
  }

  for (var i = 0; i < worldObjects.length; i++) {
    worldObjects[i].update(ctx);
  }

  bloomFlash.update(ctx);

  vignette.update(ctx);
}
