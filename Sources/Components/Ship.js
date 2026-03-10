import { camera, mouseDown, mouseX, mouseY } from "../../app.js";
import { worldObjects, getRandom } from "./Constants.js";

export class Ship {
  constructor(x, y) {
    this.x = x;
    this.oldX = x;
    this.y = y;
    this.oldY = y;
    this.sprite = document.getElementById("shipSprite");
    this.spriteSize = 100;
    this.particles = [];
    this.angle;
    this.tag = "ship";
  }

  emitParticles() {
    const numParticles = 80;
    if (this.particles.length >= numParticles || !mouseDown) {
      return;
    }
    let dx = this.oldX - this.x;
    let dy = this.oldY - this.y;

    let len = Math.sqrt(dx * dx + dy * dy);
    dx /= len;
    dy /= len;

    for (let i = 0; i < 2; i++) {
      this.particles.push(
        new Particles(this.x + camera.x, this.y + camera.y, -dx, -dy)
      );
    }
  }

  draw(ctx) {
    var relativeMouseX = mouseX - this.x;
    var relativeMouseY = mouseY - this.y;

    this.angle = Math.atan2(relativeMouseY, relativeMouseX) + Math.PI / 2;

    if (mouseDown) {
      ctx.save();
      const glowGradient = ctx.createRadialGradient(
        this.x, this.y, 5,
        this.x, this.y, 60
      );
      glowGradient.addColorStop(0, "hsla(200, 100%, 80%, 0.3)");
      glowGradient.addColorStop(0.5, "hsla(220, 80%, 60%, 0.1)");
      glowGradient.addColorStop(1, "hsla(240, 60%, 50%, 0)");
      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(this.x, this.y, 60, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    this.emitParticles();
    ctx.drawImage(
      this.sprite,
      -this.spriteSize / 2,
      -this.spriteSize / 2,
      this.spriteSize,
      this.spriteSize
    );
    ctx.restore();
  }

  update(ctx) {
    for (let i = 0; i < this.particles.length; i++) {
      const particle = this.particles[i];

      if (particle.life <= 0) {
        this.particles.splice(i, 1);
        i--;
        continue;
      }

      particle.update(ctx);
    }

    this.draw(ctx);

    for (var i = 0; i < worldObjects.length; i++) {
      var obj = worldObjects[i];
      if (obj.tag && obj.tag === "sun") {
        this.drawCompass(ctx, obj);
      }
    }
  }

  drawCompass(ctx, sun) {
    const compassSize = 50;
    const dx = sun.x - camera.x - this.x;
    const dy = sun.y - camera.y - this.y;

    const compassAngle = Math.atan2(dy, dx);
    const image = document.getElementById("compass");

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(compassAngle + Math.PI / 2);
    ctx.shadowColor = "hsla(40, 100%, 70%, 0.5)";
    ctx.shadowBlur = 10;
    ctx.drawImage(
      image,
      -compassSize / 2,
      -compassSize / 2 - 100,
      compassSize,
      compassSize
    );
    ctx.restore();
  }
}

export class Particles {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = Math.random() * 6 + 1;
    this.initialRadius = this.radius;
    this.velocity = { x: Math.random() * 2 - 1, y: Math.random() * 2 - 1 };
    this.life = 1;
    this.decay = getRandom(0.015, 0.04);
    this.hue = getRandom(190, 240);
  }

  draw(ctx) {
    const screenX = this.x - camera.x;
    const screenY = this.y - camera.y;

    ctx.save();
    const gradient = ctx.createRadialGradient(
      screenX, screenY, 0,
      screenX, screenY, this.radius
    );
    gradient.addColorStop(0, `hsla(${this.hue}, 80%, 90%, ${this.life})`);
    gradient.addColorStop(0.6, `hsla(${this.hue + 20}, 70%, 70%, ${this.life * 0.6})`);
    gradient.addColorStop(1, `hsla(${this.hue + 40}, 60%, 50%, 0)`);

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(screenX, screenY, this.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
  }

  update(ctx) {
    this.draw(ctx);
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.life -= this.decay;
    this.radius = this.initialRadius * this.life;
  }
}
