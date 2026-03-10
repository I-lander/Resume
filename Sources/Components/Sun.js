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
    this.glowPhase = Math.random() * Math.PI * 2;
    this.glowSpeed = 0.002;
    this.hue = 200;
  }

  draw(ctx) {
    var screenX = this.x - camera.x;
    var screenY = this.y - camera.y;

    const labelW = Math.min(this.radius + 600, innerWidth - 20);
    this.text.style.left = `${screenX - labelW / 2}px`;
    this.text.style.top = `${screenY - (this.radius + 50) / 2}px`;
    this.text.style.width = `${labelW}px`;
    this.text.style.height = `${this.radius + 50}px`;

    const pulse = Math.sin(Date.now() * this.glowSpeed + this.glowPhase);
    const glowRadius = this.radius * (2.5 + pulse * 0.5);
    const glowOpacity = 0.15 + pulse * 0.05;

    ctx.save();
    for (let i = 3; i >= 1; i--) {
      const layerRadius = glowRadius * (i / 2);
      const gradient = ctx.createRadialGradient(
        screenX, screenY, 0,
        screenX, screenY, layerRadius
      );
      gradient.addColorStop(0, `hsla(${this.hue}, 80%, 80%, ${glowOpacity * 0.3})`);
      gradient.addColorStop(0.3, `hsla(${this.hue + 20}, 70%, 60%, ${glowOpacity * 0.15})`);
      gradient.addColorStop(1, `hsla(${this.hue + 40}, 60%, 50%, 0)`);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(screenX, screenY, layerRadius, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    ctx.save();
    ctx.shadowColor = `hsla(${this.hue}, 100%, 80%, 0.8)`;
    ctx.shadowBlur = 20 + pulse * 10;
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(screenX, screenY, this.radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.restore();
  }

  update(ctx) {
    this.draw(ctx);
    this.text.style.opacity = 1;
    if (this.id === "other") {
      if (this.text.innerHTML === "") {
        this.text.innerHTML =
          "<span style='font-size:18px'>Je suis aussi...</span>";
      }
    } else {
      if (this.text.innerHTML === "") {
        this.text.innerHTML =
          "<span style='font-size:18px'>Survolez les planêtes pour qu'elles arrêtent de tourner.</span>";
      }
    }
  }
}
