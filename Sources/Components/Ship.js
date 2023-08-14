import { camera, mouseDown, mouseX, mouseY } from "../../app.js";
import { worldObjects } from "./Constants.js";

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
    const numParticles = 50;
    if (this.particles.length >= numParticles || !mouseDown) {
      return;
    }
    let dx = this.oldX - this.x;
    let dy = this.oldY - this.y;

    let len = Math.sqrt(dx * dx + dy * dy);
    dx /= len;
    dy /= len;

    this.particles.push(
      new Particles(this.x + camera.x, this.y + camera.y, -dx, -dy)
    );
  }
  draw(ctx) {
    var relativeMouseX = mouseX - this.x;
    var relativeMouseY = mouseY - this.y;

    this.angle = Math.atan2(relativeMouseY, relativeMouseX) + Math.PI / 2;
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

      // Remove particles with radius <= 0
      if (particle.radius <= 0) {
        this.particles.splice(i, 1);
        i--;
        continue;
      }

      // Update and draw particles
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
    this.radius = Math.random() * 8;
    this.velocity = { x: Math.random() * 2 - 1, y: Math.random() * 2 - 1 };
  }

  draw(ctx) {
    ctx.save();
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(this.x - camera.x, this.y - camera.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
  }

  update(ctx) {
    this.draw(ctx);
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.radius -= 0.1;
  }
}
