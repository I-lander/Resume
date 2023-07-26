import { Sun } from "./Sun.js";

export class SkillsSun extends Sun {
  constructor(x, y, radius) {
    super(x, y, radius);
    this.id = "skills";
    this.text = document.getElementById("skills");
  }
}

export class ProjectsSun extends Sun {
  constructor(x, y, radius) {
    super(x, y, radius);
    this.id = "projects";
    this.text = document.getElementById("projects");
  }
}

export class OtherSun extends Sun {
  constructor(x, y, radius) {
    super(x, y, radius);
    this.id = "other";
    this.text = document.getElementById("other");
  }
}
