import { camera } from "../../app.js";
import { getRandom, worldObjects, getBloomFlash } from "./Constants.js";

export class Planet {
  constructor(radius, distance, parent) {
    this.x = 0;
    this.y = 0;
    this.radius = radius;
    this.color = Math.random() * 360;
    this.initRadius = this.radius;
    this.speed = (getRandom(0, 0.8) - 0.4) / 100;
    this.oldSpeed = this.speed;
    this.distance = distance;
    this.angle = Math.random() * 6;
    this.parent = parent;
    this.dashOffset = 0;
    this.glowIntensity = 0;
    this.hasTriggeredBloom = false;
    this.scaleAnim = 0;
  }

  draw(ctx) {
    var screenX = this.x - camera.x;
    var screenY = this.y - camera.y;

    ctx.save();
    this.dashOffset -= this.speed * 50;
    ctx.strokeStyle = `hsla(${this.color}, 100%, 80%, 0.3)`;
    ctx.setLineDash([4, 8]);
    ctx.lineDashOffset = this.dashOffset;
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.arc(
      this.parent.x - camera.x,
      this.parent.y - camera.y,
      this.distance,
      0,
      2 * Math.PI
    );
    ctx.stroke();
    ctx.restore();

    if (this.glowIntensity > 0) {
      ctx.save();
      const glowRadius = this.radius * 1.8;
      const gradient = ctx.createRadialGradient(
        screenX, screenY, this.radius * 0.5,
        screenX, screenY, glowRadius
      );
      gradient.addColorStop(0, `hsla(${this.color}, 80%, 70%, ${this.glowIntensity * 0.4})`);
      gradient.addColorStop(1, `hsla(${this.color}, 60%, 50%, 0)`);
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(screenX, screenY, glowRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    ctx.save();
    if (this.glowIntensity > 0) {
      ctx.shadowColor = `hsla(${this.color}, 100%, 80%, ${this.glowIntensity * 0.8})`;
      ctx.shadowBlur = 15 * this.glowIntensity;
    }
    ctx.strokeStyle = `hsla(0, 0%, 100%, ${0.6 + this.glowIntensity * 0.4})`;
    ctx.lineWidth = 1 + this.glowIntensity;
    ctx.beginPath();
    ctx.arc(screenX, screenY, this.radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.restore();

    if (this.image) {
      ctx.drawImage(
        this.image,
        screenX - this.radius / 2,
        screenY - this.radius / 2,
        this.radius,
        this.radius
      );
    } else {
      let planetText = document.getElementById(this.id);
      const textSize = this.maxDist + 25;
      if (!planetText) {
        planetText = document.createElement("div");
        planetText.id = this.id;
        planetText.classList.add("planetText");
        if (planetText.innerHTML == "") {
          planetText.innerHTML = this.text;
        }
        planetText.style.position = "fixed";
        planetText.style.zIndex = 10000;
        planetText.style.transform = "scale(0)";
        planetText.style.transition = "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease";
        document.body.appendChild(planetText);

        requestAnimationFrame(() => {
          planetText.style.transform = "scale(1)";
        });

        const links = document.querySelectorAll(".link");
        if (links) {
          links.forEach(function (link) {
            link.addEventListener("touchstart", function (e) {
              let targetElement = e.target;
              if (
                targetElement.tagName.toLowerCase() === "img" &&
                targetElement.parentElement.tagName.toLowerCase() === "a"
              ) {
                targetElement = targetElement.parentElement;
              }
              if (targetElement.tagName.toLowerCase() === "a") {
                window.open(targetElement.href, "_blank");
              }
            });
          });
        }
      }
      planetText.style.width = `${textSize}px`;
      planetText.style.height = `${textSize}px`;
      planetText.style.left = `${screenX - textSize / 2}px`;
      planetText.style.top = `${screenY - textSize / 2}px`;
      ctx.save();
      ctx.fillStyle = "rgba(32, 32, 34, 0.9)";
      ctx.beginPath();
      ctx.arc(screenX, screenY, this.radius, 0, 2 * Math.PI);
      ctx.fill();
      ctx.restore();
    }
  }

  update(ctx) {
    this.angle += this.speed;
    this.x = this.parent.x + this.distance * Math.cos(this.angle);
    this.y = this.parent.y + this.distance * Math.sin(this.angle);
    this.draw(ctx);
    this.detectCollision();
  }

  detectCollision() {
    const screenMin = Math.min(innerWidth, innerHeight);
    this.maxDist = this.parent.id === "projects" ? Math.min(300, screenMin * 0.7) : Math.min(100, screenMin * 0.25);
    const growSpeed = this.parent.id === "projects" ? 10 : 3.3;

    if (this.parent.selectedObject && this.parent.selectedObject !== this) {
      if (this.radius >= this.initRadius) {
        this.radius -= growSpeed;
      }
      this.glowIntensity = Math.max(0, this.glowIntensity - 0.05);
      this.hasTriggeredBloom = false;
      return;
    }

    var dx = this.x - camera.x - innerWidth / 2;
    var dy = this.y - camera.y - innerHeight / 2;
    var distance = Math.sqrt(dx * dx + dy * dy);

    if (distance <= this.radius) {
      const thisPlanetIndex = worldObjects.indexOf(this);
      const [thisPlanet] = worldObjects.splice(thisPlanetIndex, 1);
      worldObjects.push(thisPlanet);

      this.parent.selectedObject = this;

      const bf = getBloomFlash();
      if (!this.hasTriggeredBloom && bf) {
        bf.trigger(this.x, this.y, this.color);
        this.hasTriggeredBloom = true;
      }

      if (this.text) {
        this.speed = 0;
        this.glowIntensity = Math.min(1, this.glowIntensity + 0.08);

        if (this.parent.id !== "other") {
          this.parent.text.style.opacity = 0;
        }
        if (this.radius <= this.maxDist) {
          this.radius += growSpeed;
        }
        if (this.radius >= this.maxDist) {
          this.image = "";
        }
      }
    }
    if (distance > this.radius) {
      this.parent.selectedObject = null;
      this.glowIntensity = Math.max(0, this.glowIntensity - 0.05);
      this.hasTriggeredBloom = false;

      if (this.text) {
        if (this.radius >= this.initRadius) {
          const text = document.getElementById(`${this.id}`);
          if (text) {
            text.style.transform = "scale(0)";
            setTimeout(() => text.remove(), 300);
          }
          this.image =
            this.parent.id === "other"
              ? document.getElementById("question-img")
              : document.getElementById(`${this.id}-img`);
          this.radius -= growSpeed;
        }
      }
    }
    if (this.text) {
      if (distance >= this.radius) {
        this.speed = this.oldSpeed;
      }
    }
  }
}
