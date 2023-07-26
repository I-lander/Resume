import { camera } from "../../app.js";

export class Sun {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.orbitInterval = 75;
    this.tag = "sun";
    this.color = "hsla(180, 100%, 100%,0.7)";
    this.selectedObject;
    this.planet = false;
  }

  draw(ctx) {
    var screenX = this.x - camera.x;
    var screenY = this.y - camera.y;

    this.text.style.left = `${screenX - (this.radius + 600) / 2}px`;
    this.text.style.top = `${screenY - (this.radius + 50) / 2}px`;
    this.text.style.width = `${this.radius + 600}px`;
    this.text.style.height = `${this.radius + 50}px`;

    ctx.save();
    ctx.strokeStyle = this.color;
    ctx.beginPath();
    ctx.arc(screenX, screenY, this.radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.restore();
  }

  update(ctx) {
    this.draw(ctx);
    this.text.style.opacity = 1;
    if ((this.id === "other")) {
      this.text.innerHTML =
        "<span style='font-size:18px'>Je suis aussi...</span>";
    } else {
      this.text.innerHTML =
        "<span style='font-size:18px'>Survolez les planêtes pour qu'elles arrêtent de tourner.</span>";
    }
  }
}
