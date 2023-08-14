import { ctx } from "../../app.js";
import { Contact } from "./Contact.js";
import {
  AngularPlanet,
  BereshitPlanet,
  ChatGPTPlanet,
  CsharpPlanet,
  CssPlanet,
  DelementPlanet,
  DonkeyReadingsPlanet,
  GitPlanet,
  HtmlPlanet,
  JavascriptPlanet,
  PythonPlanet,
  ReactPlanet,
  ResumePlanet,
  Soft1Planet,
  Soft2Planet,
  Soft3Planet,
  Soft4Planet,
  Soft5Planet,
  Soft6Planet,
  Soft7Planet,
  Soft8Planet,
  Soft9Planet,
  SqlPlanet,
  TypescriptPlanet,
  UnityPlanet,
} from "./PlanetTypes.js";
import { Ship } from "./Ship.js";
import { ShootingStar } from "./ShootingStar.js";
import { OtherSun, ProjectsSun, SkillsSun } from "./SunTypes.js";

export function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

const ship = new Ship(innerWidth / 2, innerHeight / 2);
const contact = new Contact();
const skillsSun = new SkillsSun(-600, -500, 100);
const otherSun = new OtherSun(1500, -800, 75);
const projectsSun = new ProjectsSun(1750, 1800, 75);
const soft1Planet = new Soft1Planet(60, otherSun.orbitInterval * 2, otherSun);
const soft2Planet = new Soft2Planet(60, otherSun.orbitInterval * 3, otherSun);
const soft3Planet = new Soft3Planet(60, otherSun.orbitInterval * 4, otherSun);
const soft4Planet = new Soft4Planet(60, otherSun.orbitInterval * 5, otherSun);
const soft5Planet = new Soft5Planet(60, otherSun.orbitInterval * 6, otherSun);
const soft6Planet = new Soft6Planet(60, otherSun.orbitInterval * 7, otherSun);
const soft7Planet = new Soft7Planet(60, otherSun.orbitInterval * 8, otherSun);
const soft8Planet = new Soft8Planet(60, otherSun.orbitInterval * 9, otherSun);
const soft9Planet = new Soft9Planet(60, otherSun.orbitInterval * 10, otherSun);
const delementPlanet = new DelementPlanet(
  50,
  projectsSun.orbitInterval * 10,
  projectsSun
);
const bereshitPlanet = new BereshitPlanet(
  50,
  projectsSun.orbitInterval * 6,
  projectsSun
);
const donkeyReadingsPlanet = new DonkeyReadingsPlanet(
  50,
  projectsSun.orbitInterval * 8,
  projectsSun
);
const resumePlanet = new ResumePlanet(
  50,
  projectsSun.orbitInterval * 12,
  projectsSun
);
const htmlPlanet = new HtmlPlanet(50, skillsSun.orbitInterval * 4, skillsSun);
const cssPlanet = new CssPlanet(50, skillsSun.orbitInterval * 5, skillsSun);
const javascriptPlanet = new JavascriptPlanet(
  50,
  skillsSun.orbitInterval * 6,
  skillsSun
);
const reactPlanet = new ReactPlanet(50, skillsSun.orbitInterval * 7, skillsSun);
const angularPlanet = new AngularPlanet(
  50,
  skillsSun.orbitInterval * 8,
  skillsSun
);
const typescriptPlanet = new TypescriptPlanet(
  50,
  skillsSun.orbitInterval * 9,
  skillsSun
);
const pythonPlanet = new PythonPlanet(
  50,
  skillsSun.orbitInterval * 10,
  skillsSun
);
const csharpPlanet = new CsharpPlanet(
  50,
  skillsSun.orbitInterval * 11,
  skillsSun
);
const chatGPTPlanet = new ChatGPTPlanet(
  50,
  skillsSun.orbitInterval * 12,
  skillsSun
);
const gitPlanet = new GitPlanet(50, skillsSun.orbitInterval * 13, skillsSun);
const sqlPlanet = new SqlPlanet(50, skillsSun.orbitInterval * 14, skillsSun);
const unityPlanet = new UnityPlanet(
  50,
  skillsSun.orbitInterval * 15,
  skillsSun
);

export const worldObjects = [
  ship,
  projectsSun,
  skillsSun,
  otherSun,
  htmlPlanet,
  cssPlanet,
  javascriptPlanet,
  reactPlanet,
  angularPlanet,
  typescriptPlanet,
  pythonPlanet,
  csharpPlanet,
  chatGPTPlanet,
  gitPlanet,
  sqlPlanet,
  unityPlanet,
  contact,
  delementPlanet,
  donkeyReadingsPlanet,
  bereshitPlanet,
  resumePlanet,
  soft1Planet,
  soft2Planet,
  soft3Planet,
  soft4Planet,
  soft5Planet,
  soft6Planet,
  soft7Planet,
  soft8Planet,
  soft9Planet,
];

export const starsArray = [];

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

export function drawWorld() {
  drawShootingStar();

  for (var i = 0; i < worldObjects.length; i++) {
    var obj = worldObjects[i];
    obj.update(ctx);
  }

  for (let i = 0; i < starsArray.length; i++) {
    const star = starsArray[i];
    star.update(ctx);
  }
}
