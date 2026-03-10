import { camera } from "../../app.js";
import { getRandom } from "./Constants.js";

export class Nebula {
  constructor(x, y, radius, hue) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.hue = hue;
    this.opacity = getRandom(0.03, 0.08);
    this.pulseSpeed = getRandom(0.0005, 0.002);
    this.pulseOffset = Math.random() * Math.PI * 2;
  }

  update(ctx) {
    const screenX = this.x - camera.x;
    const screenY = this.y - camera.y;
    const pulse = Math.sin(Date.now() * this.pulseSpeed + this.pulseOffset) * 0.02;
    const currentOpacity = Math.max(0.01, this.opacity + pulse);

    const gradient = ctx.createRadialGradient(
      screenX, screenY, 0,
      screenX, screenY, this.radius
    );
    gradient.addColorStop(0, `hsla(${this.hue}, 80%, 60%, ${currentOpacity * 1.5})`);
    gradient.addColorStop(0.4, `hsla(${this.hue + 30}, 70%, 50%, ${currentOpacity})`);
    gradient.addColorStop(1, `hsla(${this.hue + 60}, 60%, 40%, 0)`);

    ctx.save();
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(screenX, screenY, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

export class CosmicDust {
  constructor(boundaryRadius) {
    this.boundaryRadius = boundaryRadius;
    this.reset();
  }

  reset() {
    const r = Math.sqrt(Math.random()) * this.boundaryRadius;
    const theta = Math.random() * Math.PI * 2;
    this.x = innerWidth / 2 + r * Math.cos(theta);
    this.y = innerHeight / 2 + r * Math.sin(theta);
    this.size = getRandom(0.5, 2);
    this.opacity = getRandom(0.1, 0.4);
    this.hue = getRandom(180, 280);
    this.driftX = getRandom(-0.15, 0.15);
    this.driftY = getRandom(-0.15, 0.15);
    this.pulseSpeed = getRandom(0.001, 0.004);
    this.pulseOffset = Math.random() * Math.PI * 2;
  }

  update(ctx) {
    this.x += this.driftX;
    this.y += this.driftY;

    const screenX = this.x - camera.x;
    const screenY = this.y - camera.y;
    const pulse = Math.sin(Date.now() * this.pulseSpeed + this.pulseOffset) * 0.15;
    const alpha = Math.max(0, this.opacity + pulse);

    ctx.save();
    ctx.fillStyle = `hsla(${this.hue}, 60%, 80%, ${alpha})`;
    ctx.shadowColor = `hsla(${this.hue}, 80%, 70%, ${alpha * 0.5})`;
    ctx.shadowBlur = 4;
    ctx.beginPath();
    ctx.arc(screenX, screenY, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

export class Vignette {
  update(ctx) {
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;
    const cx = w / 2;
    const cy = h / 2;
    const radius = Math.max(w, h) * 0.7;

    const gradient = ctx.createRadialGradient(cx, cy, radius * 0.3, cx, cy, radius);
    gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
    gradient.addColorStop(0.7, "rgba(0, 0, 0, 0.15)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0.6)");

    ctx.save();
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);
    ctx.restore();
  }
}

export class BloomFlash {
  constructor() {
    this.flashes = [];
  }

  trigger(x, y, hue) {
    this.flashes.push({
      x, y, hue,
      radius: 10,
      maxRadius: 120,
      alpha: 0.8,
      speed: 8,
    });
  }

  update(ctx) {
    ctx.save();
    for (let i = this.flashes.length - 1; i >= 0; i--) {
      const f = this.flashes[i];
      const screenX = f.x - camera.x;
      const screenY = f.y - camera.y;

      const gradient = ctx.createRadialGradient(
        screenX, screenY, 0,
        screenX, screenY, f.radius
      );
      gradient.addColorStop(0, `hsla(${f.hue}, 100%, 90%, ${f.alpha})`);
      gradient.addColorStop(0.5, `hsla(${f.hue}, 80%, 70%, ${f.alpha * 0.5})`);
      gradient.addColorStop(1, `hsla(${f.hue}, 60%, 50%, 0)`);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(screenX, screenY, f.radius, 0, Math.PI * 2);
      ctx.fill();

      f.radius += f.speed;
      f.alpha -= 0.03;

      if (f.alpha <= 0 || f.radius >= f.maxRadius) {
        this.flashes.splice(i, 1);
      }
    }
    ctx.restore();
  }
}
