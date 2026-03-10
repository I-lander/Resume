import { camera } from "../../app.js";
import { getRandom } from "./Constants.js";

export class Stars {
  constructor(x, y, layer = 1) {
    this.x = x;
    this.y = y;
    this.radius = getRandom(0.3, 3);
    this.baseOpacity = getRandom(0.2, 0.8);
    this.opacity = this.baseOpacity;
    this.layer = layer;
    this.twinkleSpeed = getRandom(0.001, 0.005);
    this.twinkleOffset = Math.random() * Math.PI * 2;
    this.hue = getRandom(180, 260);
    this.saturation = getRandom(0, 40);
  }

  draw(ctx) {
    const screenX = this.x - camera.x * this.layer;
    const screenY = this.y - camera.y * this.layer;

    const twinkle = Math.sin(Date.now() * this.twinkleSpeed + this.twinkleOffset);
    this.opacity = this.baseOpacity + twinkle * 0.3;
    this.opacity = Math.max(0.05, Math.min(1, this.opacity));

    ctx.save();

    if (this.radius > 1.5) {
      ctx.shadowColor = `hsla(${this.hue}, ${this.saturation}%, 90%, ${this.opacity * 0.6})`;
      ctx.shadowBlur = this.radius * 3;
    }

    ctx.fillStyle = `hsla(${this.hue}, ${this.saturation}%, 100%, ${this.opacity})`;
    ctx.beginPath();
    ctx.arc(screenX, screenY, this.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
  }

  update(ctx) {
    this.draw(ctx);
  }
}
