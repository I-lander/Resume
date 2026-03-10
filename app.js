import {
  drawWorld,
  starsArray,
  worldObjects,
} from "./Sources/Components/Constants.js";
import { Stars } from "./Sources/Components/Stars.js";

const canvas = document.getElementById("canvas");
export const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

let lastFrameTimeMs = 0;
let maxFPS = 90;
export var mouseX = innerWidth / 2;
export var mouseY = 0;
export var mouseDown = false;

window.addEventListener("resize", function () {
  const oldWidth = canvas.width;
  const oldHeight = canvas.height;
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  const ship = worldObjects.find((element) => (element.tag = "ship"));
  ship.x = this.innerWidth / 2;
  ship.y = this.innerHeight / 2;
  camera.x -= (canvas.width - oldWidth) / 2;
  camera.y -= (canvas.height - oldHeight) / 2;
});

window.addEventListener("mousedown", function (e) {
  if (
    e.target.tagName.toLowerCase() === "a" ||
    e.target.tagName.toLowerCase() === "img" ||
    e.target.tagName.toLowerCase() === "button"
  ) {
    return;
  }
  mouseDown = true;
  mouseX = e.clientX;
  mouseY = e.clientY;
});

window.addEventListener("mouseup", function () {
  mouseDown = false;
});

window.addEventListener("mousemove", function (e) {
  if (mouseDown) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }
});

window.addEventListener("touchstart", function (e) {
  if (
    e.target.tagName.toLowerCase() === "a" ||
    e.target.tagName.toLowerCase() === "img" ||
    e.target.tagName.toLowerCase() === "button"
  ) {
    return;
  }
  mouseDown = true;
  mouseX = e.touches[0].clientX;
  mouseY = e.touches[0].clientY;
});

window.addEventListener(
  "touchend",
  function (e) {
    mouseDown = false;
    e.preventDefault();
  },
  { passive: false }
);

window.addEventListener(
  "touchmove",
  function (e) {
    if (mouseDown) {
      mouseX = e.touches[0].clientX;
      mouseY = e.touches[0].clientY;
    }
    e.preventDefault();
  },
  { passive: false }
);

export const camera = {
  x: 0,
  y: 0,
  width: canvas.width,
  height: canvas.height,
};

const limit = {
  id: "limit",
  x: innerWidth / 2,
  y: innerHeight / 2,
  radius: 3000,
};
const maxStars = limit.radius / 5;

const layers = [0.3, 0.6, 1.0];
for (var i = 0; i < maxStars; i++) {
  const r = Math.sqrt(Math.random()) * limit.radius;
  const theta = Math.random() * 2 * Math.PI;

  const starX = limit.x + r * Math.cos(theta);
  const starY = limit.y + r * Math.sin(theta);
  const layer = layers[Math.floor(Math.random() * layers.length)];
  starsArray.push(new Stars(starX, starY, layer));
}

const lerpFactor = 0.15;
let cameraVelX = 0;
let cameraVelY = 0;

window.addEventListener("load", function () {
  animate();
});

const animate = () => {
  const timestamp = Date.now();

  if (timestamp < lastFrameTimeMs + 1000 / maxFPS) {
    requestAnimationFrame(animate);
    return;
  }

  lastFrameTimeMs = timestamp;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let isMoving = false;

  if (mouseDown) {
    var speed = 8;
    var dx = mouseX - innerWidth / 2;
    var dy = mouseY - innerHeight / 2;
    var distance = Math.sqrt(dx * dx + dy * dy);

    var moveX = (dx / distance) * speed;
    var moveY = (dy / distance) * speed;

    cameraVelX += (moveX - cameraVelX) * lerpFactor;
    cameraVelY += (moveY - cameraVelY) * lerpFactor;

    var futurPosX = camera.x + cameraVelX;
    var futurPosY = camera.y + cameraVelY;
    var distanceFromCenter = Math.sqrt(
      futurPosX * futurPosX + futurPosY * futurPosY
    );

    if (distanceFromCenter <= limit.radius) {
      camera.x = futurPosX;
      camera.y = futurPosY;
      isMoving = true;
    }
  } else {
    cameraVelX *= 0.9;
    cameraVelY *= 0.9;
    if (Math.abs(cameraVelX) > 0.1 || Math.abs(cameraVelY) > 0.1) {
      var futurPosX = camera.x + cameraVelX;
      var futurPosY = camera.y + cameraVelY;
      var distanceFromCenter = Math.sqrt(
        futurPosX * futurPosX + futurPosY * futurPosY
      );
      if (distanceFromCenter <= limit.radius) {
        camera.x = futurPosX;
        camera.y = futurPosY;
      }
    }
  }

  var screenX = limit.x - camera.x;
  var screenY = limit.y - camera.y;
  ctx.save();
  const boundaryPulse = Math.sin(timestamp * 0.001) * 0.15 + 0.5;
  ctx.beginPath();
  ctx.arc(screenX, screenY, limit.radius, 0, 2 * Math.PI);
  ctx.setLineDash([10, 10]);
  ctx.lineDashOffset = -timestamp * 0.02;
  ctx.lineWidth = 2;
  ctx.strokeStyle = `hsla(0, 64%, 60%, ${boundaryPulse})`;
  ctx.shadowColor = "hsla(0, 64%, 60%, 0.3)";
  ctx.shadowBlur = 10;
  ctx.stroke();
  ctx.restore();

  drawWorld(isMoving, camera.x, camera.y);

  requestAnimationFrame(animate);
  return;
};
