import { camera } from "../../app.js";

export class Contact {
  constructor() {
    this.x = innerWidth / 2;
    this.y = innerHeight / 2;
    this.opacity = 1;
    this.elementTuto = document.getElementById("contactTuto");
    this.elementH1 = document.getElementById("contactH1");
    this.elementText = document.getElementById("contactText");
    this.isTutoDisplay = true;
    this.buttonSize = innerWidth < 500 ? 40 : 50;
    this.typewriterDone = false;
    this.typewriterIndex = 0;
    this.typewriterText = "Pour vous déplacer, cliquer et glisser dans la direction souhaitée.";
    this.lastTypeTime = 0;
  }

  _typewriter() {
    if (this.typewriterDone) return;
    const now = Date.now();
    if (now - this.lastTypeTime < 35) return;
    this.lastTypeTime = now;

    if (this.typewriterIndex <= this.typewriterText.length) {
      const textEl = this.elementTuto.querySelector(".typewriter-text");
      if (textEl) {
        textEl.textContent = this.typewriterText.substring(0, this.typewriterIndex);
      }
      this.typewriterIndex++;
    } else {
      this.typewriterDone = true;
    }
  }

  _getWidth() {
    return Math.min(500, innerWidth - 40);
  }

  draw() {
    var screenX = this.x - camera.x;
    var screenY = this.y - camera.y;
    const w = this._getWidth();

    if (this.isTutoDisplay) {
      this.elementTuto.style.left = `${0}px`;
      this.elementTuto.style.top = `${0}px`;
      this.elementTuto.style.width = `${innerWidth}px`;
      this.elementTuto.style.height = `auto`;
      this.elementTuto.style.color = "white";
      this.elementTuto.style.opacity = this.opacity;
      this.elementTuto.style.textAlign = `center`;
      this.elementTuto.style.fontSize = innerWidth < 500 ? "16px" : "24px";
      if (this.elementTuto.innerHTML == "") {
        const compassSize = innerWidth < 500 ? 24 : 32;
        this.elementTuto.innerHTML = `<p class="tuto-banner"><span class="typewriter-text"></span><span class="typewriter-cursor">|</span></br>
        Suivez les <img style='width:${compassSize}px; margin-top:8px; display:inline; vertical-align:middle;' src='./Sources/Images/compass.png'> pour vous diriger vers les systèmes.</p>`;
      }
      this._typewriter();
    }

    this.elementH1.style.left = `${screenX - w / 2}px`;
    this.elementH1.style.top = `${screenY - 360}px`;
    this.elementH1.style.width = `${w}px`;
    this.elementH1.style.height = `${w}px`;
    this.elementH1.style.color = "white";
    this.elementH1.style.opacity = this.opacity;
    if (this.elementH1.innerHTML == "") {
      this.elementH1.innerHTML = '<h1 class="hero-title">Ilan Varillon</h1>';
    }

    this.elementText.style.left = `${screenX - w / 2}px`;
    this.elementText.style.top = `${screenY - 25}px`;
    this.elementText.style.width = `${w}px`;
    this.elementText.style.height = `${w}px`;
    this.elementText.style.color = "white";
    this.elementText.style.opacity = this.opacity;
    if (this.elementText.innerHTML == "") {
      this.elementText.innerHTML =
        '<p class="contact-info">06 10 51 33 58</p>' +
        '<p class="contact-info">ilan.varillon@gmail.com</p>';
    }
    if (this.opacity > 0) {
      let linkedinButton = document.getElementById("linkedin");
      if (!linkedinButton) {
        linkedinButton = document.createElement("button");
        linkedinButton.id = "linkedin";
        linkedinButton.classList.add("linkedinButton");
        linkedinButton.style.position = "fixed";
        linkedinButton.style.zIndex = 1000000;
        linkedinButton.addEventListener("click", function () {
          window.open("https://www.linkedin.com/in/ilan-v-4498b891/", "_blank");
        });
        linkedinButton.addEventListener("touchstart", function () {
          window.open("https://www.linkedin.com/in/ilan-v-4498b891/", "_blank");
        });
        document.body.appendChild(linkedinButton);

        linkedinButton.style.width = `${this.buttonSize}px`;
        linkedinButton.style.height = `${this.buttonSize}px`;
        const btnImage = new Image();
        btnImage.src = "./Sources/Images/LinkedIn_logo_initials.png";
        linkedinButton.appendChild(btnImage);
        btnImage.style.width = `${this.buttonSize}px`;
        btnImage.style.height = `${this.buttonSize}px`;

        linkedinButton.style.backgroundColor = "transparent";
        linkedinButton.style.border = "none";
      }
      linkedinButton.style.left = `${screenX - this.buttonSize / 2}px`;
      linkedinButton.style.top = `${screenY + 75}px`;
      linkedinButton.style.opacity = this.opacity;

      let resumeButton = document.getElementById("resume");
      if (!resumeButton) {
        resumeButton = document.createElement("button");
        resumeButton.id = "resume";
        resumeButton.innerText = "Mon CV";
        resumeButton.classList.add("resumeButton");
        resumeButton.style.position = "fixed";
        resumeButton.style.zIndex = 100000;
        resumeButton.addEventListener("click", function () {
          window.open("./Sources/Ilan_VARILLON_CV_2026.pdf", "_blank");
        });
        resumeButton.addEventListener("touchstart", function () {
          window.open("./Sources/Ilan_VARILLON_CV_2026.pdf", "_blank");
        });
        document.body.appendChild(resumeButton);

        resumeButton.style.width = `${this.buttonSize}px`;
        resumeButton.style.height = `${this.buttonSize}px`;

        resumeButton.style.backgroundColor = "transparent";
      }
      resumeButton.style.left = `${screenX - this.buttonSize / 2}px`;
      resumeButton.style.top = `${screenY + 300}px`;
      resumeButton.style.opacity = this.opacity;
    }
  }

  update() {
    this.draw();

    var dx = this.x - camera.x - innerWidth / 2;
    var dy = this.y - camera.y - innerHeight / 2;
    var distance = Math.sqrt(dx * dx + dy * dy);
    var maxDistance = 500;
    this.opacity = Math.max(0, 1 - distance / maxDistance);
    if (this.opacity <= 0) {
      this.isTutoDisplay = false;
      this.elementTuto.innerHTML = "";
      let linkedinButton = document.getElementById("linkedin");
      let resumeButton = document.getElementById("resume");
      linkedinButton.style.right = `${this.buttonSize + 18}px`;
      linkedinButton.style.left = "auto";
      linkedinButton.style.top = `${0}px`;
      linkedinButton.style.margin = `18px`;
      linkedinButton.style.opacity = 1;
      linkedinButton.style.backgroundColor = "rgba(0,0,0,.5)";

      resumeButton.style.right = `${0}px`;
      resumeButton.style.left = "auto";
      resumeButton.style.top = `${0}px`;
      resumeButton.style.margin = `18px`;
      resumeButton.style.opacity = 1;
      resumeButton.style.backgroundColor = "rgba(0,0,0,.5)";
    }
  }
}
