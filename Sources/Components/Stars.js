import { camera } from "../../app.js";
import { getRandom } from "./Constants.js";

export class Stars {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = getRandom(0, 3);
    this.opacity = getRandom(0, 0.7);
    this.color = `hsla(180, 80%, 100%,${this.opacity})`;
  }

  draw(ctx) {
    var screenX = this.x - camera.x;
    var screenY = this.y - camera.y;
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(screenX, screenY, this.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
  }
  update(ctx) {
    this.draw(ctx);
  }
}
