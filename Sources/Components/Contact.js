import { camera } from "../../app.js";

export class Contact {
  constructor() {
    this.x = innerWidth / 2;
    this.y = innerHeight / 2;
    this.opacity = 1;
    this.elementTuto = document.getElementById("contactTuto");
    this.elementH1 = document.getElementById("contactH1");
    this.elementText = document.getElementById("contactText");
    this.dimensions = { width: 500, height: 500 };
    this.isTutoDisplay = true;
    this.buttonSize = 50;
  }

  draw() {
    var screenX = this.x - camera.x;
    var screenY = this.y - camera.y;

    if (this.isTutoDisplay) {
      this.elementTuto.style.left = `${0}px`;
      this.elementTuto.style.top = `${0}px`;
      this.elementTuto.style.width = `${innerWidth}px`;
      this.elementTuto.style.height = `auto`;
      this.elementTuto.style.color = "white";
      this.elementTuto.style.backgroundColor = "rgba(0,0,0,.5)";
      this.elementTuto.style.opacity = this.opacity;
      this.elementTuto.style.textAlign = `center`;
      this.elementTuto.style.fontSize = "24px";
      if (this.elementTuto.innerHTML == "") {
        this.elementTuto.innerHTML = `<p>Pour vous déplacer, cliquer et glisser dans la direction souhaitée.</br>
        Suivez les <img style='width:32px; margin-top:8px; display:inline;' src='./Sources/Images/compass.png'> pour vous diriger vers les systèmes.</p>`;
      }
    }

    this.elementH1.style.left = `${screenX - this.dimensions.width / 2}px`;
    this.elementH1.style.top = `${screenY - 360}px`;
    this.elementH1.style.width = `${this.dimensions.width}px`;
    this.elementH1.style.height = `${this.dimensions.height}px`;
    this.elementH1.style.color = "white";
    this.elementH1.style.opacity = this.opacity;
    if (this.elementH1.innerHTML == "") {
      this.elementH1.innerHTML = "<h1>Ilan Varillon</h1>";
    }

    this.elementText.style.left = `${screenX - this.dimensions.width / 2}px`;
    this.elementText.style.top = `${screenY - 25}px`;
    this.elementText.style.width = `${this.dimensions.width}px`;
    this.elementText.style.height = `${this.dimensions.height}px`;
    this.elementText.style.color = "white";
    this.elementText.style.opacity = this.opacity;
    if (this.elementText.innerHTML == "") {
      this.elementText.innerHTML =
        "<p>06 10 51 33 58</p>" + "<p> ilan.varillon@gmail.com</p>";
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
        });        linkedinButton.addEventListener("touchstart", function () {
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
          window.open("./Sources/Ilan_VARILLON_CV_2025.pdf", "_blank");
        });
        resumeButton.addEventListener("touchstart", function () {
          window.open("./Sources/Ilan_VARILLON_CV_2025.pdf", "_blank");
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
