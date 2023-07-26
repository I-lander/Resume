import { camera } from "../../app.js";
import { getRandom } from "./Constants.js";

class StarParticle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.opacity = 1;
    this.color = Math.random() * 360;
    this.size = Math.random() * 3 + 1;
    this.speedX = getRandom(0, 0.7);
    this.speedY = getRandom(0, 0.7);
  }

  draw(ctx) {
    const screenX = this.x - camera.x;
    const screenY = this.y - camera.y;

    ctx.fillStyle = `hsla(${this.color}, 100%, 80%, ${this.opacity})`;
    ctx.beginPath();
    ctx.arc(screenX, screenY, this.size, 0, Math.PI * 2);
    ctx.fill();
  }

  update(ctx) {
    this.draw(ctx);
    this.x += this.speedX;
    this.y += this.speedY;
    this.opacity -= 0.03;
  }
}

export class ShootingStar {
  constructor(canvasWidth) {
    this.x = Math.random() * canvasWidth;
    this.y = 0;
    this.speed = Math.random() * 5 + 2;
    this.speedX = Math.random() * 8 - 4;
    this.particles = [];
    this.isReset = false;
  }

  draw(ctx) {
    this.particles.forEach((particle) => {
      particle.update(ctx);

      if (particle.opacity <= 0) {
        this.particles.splice(this.particles.indexOf(particle), 1);
      }
    });
  }

  update(ctx) {
    this.draw(ctx);
    this.x += this.speedX;
    this.y += this.speed;
    this.particles.push(new StarParticle(this.x, this.y));
  }

  isOffScreen() {
    const screenY = this.y - camera.y;

    if (
      screenY > innerHeight &&
      this.particles.every((particle) => particle.y - camera.y > innerHeight)
    ) {
      return true;
    }
    return false;
  }

  reset(canvasWidth) {
    this.x = Math.random() * canvasWidth;
    this.y = camera.y;
    this.speed = Math.random() * 5 + 2;
    this.particles = [];
    this.isReset = true;
  }
}
