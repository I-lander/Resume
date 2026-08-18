import { Planet } from "./Planet.js";

const SKILL_CONFIG = {
  html:       { img: "html-img",      text: "HTML",           stars: "★★★★★" },
  css:        { img: "css-img",       text: "CSS",            stars: "★★★★☆" },
  javascript: { img: "javascript-img",text: "Javascript",     stars: "★★★★★" },
  react:      { img: "react-img",     text: "React",          stars: "★★★★☆" },
  angular:    { img: "angular-img",   text: "Angular",        stars: "★★★☆☆" },
  typescript: { img: "typescript-img",text: "Typescript",      stars: "★★★★★" },
  python:     { img: "python-img",    text: "Python",         stars: "★★★★☆" },
  c_sharp:    { img: "c_sharp-img",   text: "C#",             stars: "★★★★☆" },
  claude:     { img: "claude-img",    text: "Claude",        stars: "★★★★★" },
  git:        { img: "git-img",       text: "Git / Github",   stars: "★★★☆☆" },
  sql:        { img: "sql-img",       text: "SQL",            stars: "★★★★★" },
  docker:     { img: "docker-img",    text: "Docker",         stars: "★★★★☆" },
};

export class SkillPlanet extends Planet {
  constructor(radius, distance, parent, skillKey) {
    super(radius, distance, parent);
    const config = SKILL_CONFIG[skillKey];
    this.image = document.getElementById(config.img);
    this.id = skillKey;
    this.text = `<p style='text-align:center'>Mon niveau sur</br> <b>${config.text}</b> :</br> ${config.stars}</p>`;
  }
}

export class DelementPlanet extends Planet {
  constructor(radius, distance, parent) {
    super(radius, distance, parent);
    this.image = document.getElementById("delement-img");
    this.id = "delement";
    this.text =
      "<h3 style='text-align:center'>Délements</h3>" +
      "<p>Délements est un jeu développé sur Unity." +
      "Mon but en me lançant dans ce projet était d'apprendre le C#.<br>" +
      "Disponible gratuitement sur : <br> <a class='link' href='https://play.google.com/store/apps/details?id=com.donkeysisle.diceychess' target='_blank'><img class='repo-link' src='./Sources/Images/playStore.png'></a>" +
      "Le lien du repo Github :<br> <a class='link' href='https://github.com/I-lander/Delements/' target='_blank'><img class='repo-link' src='./Sources/Images/GitHub-white.png'></a>" +
      "</p>";
  }
}

export class BereshitPlanet extends Planet {
  constructor(radius, distance, parent) {
    super(radius, distance, parent);
    this.image = document.getElementById("bereshit-img");
    this.id = "bereshit";
    this.text =
      "<h3 style='text-align:center'>Bereshit</h3>" +
      "<p>Ma première création, c'est avec lui que j'ai appris les bases de la programmation orientée objet.<br>" +
      "Le but initial était pour moi de coder en Javascript Vanilla sans l'aide d'aucune librairie extérieure.<br>" +
      "Il est jouable gratuitement sur navigateur via le lien suivant :<br> " +
      "<a class='link' href='https://i-lander.github.io/GameProject/' target='_blank'><img class='repo-link' src='./Sources/Images/bereshit.png'></a><br>" +
      "Le lien du repo Github :<br> <a class='link' href='https://github.com/I-lander/GameProject/' target='_blank'><img class='repo-link' src='./Sources/Images/GitHub-white.png'></a>" +
      "</p>";
  }
}



export class ResumePlanet extends Planet {
  constructor(radius, distance, parent) {
    super(radius, distance, parent);
    this.image = document.getElementById("resumePlanet-img");
    this.id = "resumePlanet";
    this.text =
      "<h3>Mon site CV</h3>" +
      "<p>Ce site peut lui-même être considéré comme l'un de mes projets ^^.<br>" +
      "J'ai eu envie de créer un CV plus original qui dépasse la simple feuille A4.<br>" +
      "L'idée m'est alors venue de combiner mes compétences et mon amour pour la création de jeu.<br>" +
      "Développé entièrement en Javascript vanilla, il m'a permis également de faire un point sur ma montée en compétence et sur ma compréhension de la programmation.<br><br>" +
      "Le lien du repo Github :<br> <a class='link' href='https://github.com/I-lander/Resume' target='_blank'><img class='repo-link' src='./Sources/Images/GitHub-white.png'></a>" +
      "</p>";
  }
}

export class GenesisPlanet extends Planet {
  constructor(radius, distance, parent) {
    super(radius, distance, parent);
    this.image = document.getElementById("genesis-img");
    this.id = "genesis";
    this.text =
      "<h3>Genesis: Age of Creation</h3>" +
      "<p>Un jeu de simulation dans lequel on endosse le rôle d'une entité créatrice. On pioche des cartes pour débloquer des biomes, des ressources et des bâtiments, ou pour déclencher des événements qui laissent leur marque sur le monde.<br>" +
      "Aucun combat ici : tout l'enjeu est de faire grandir sa création de façon équilibrée en encaissant les catastrophes qui s'abattent sur une carte toujours plus vaste.<br>" +
      "Jouable gratuitement dans le navigateur.<br><br>" +
      "Le lien de la page itchio :<br> <a class='link' href='https://donkey-isle.itch.io/genesis-age-of-creation' target='_blank'><img class='repo-link' src='./Sources/Images/genesis.svg'></a>" +
      "</p>";
  }
}

export class EpitaphPlanet extends Planet {
  constructor(radius, distance, parent) {
    super(radius, distance, parent);
    this.image = document.getElementById("epitaph-img");
    this.id = "epitaph";
    this.text =
      "<h3>Epitaph</h3>" +
      "<p>Un survival / bullet-heaven mobile dans lequel on incarne une créature surnaturelle lâchée au milieu de vagues d'humains. L'objectif : moissonner 333 âmes avant de se faire submerger.<br>" +
      "Développé en Typescript avec Phaser 3, puis packagé pour Android via Capacitor.<br><br>" +
      "Le lien du Play Store :<br> <a class='link' href='https://play.google.com/store/apps/details?id=com.donkeysisle.epitaph&hl=fr' target='_blank'><img class='repo-link' src='./Sources/Images/playStore.png'></a>" +
      "Le lien de la page itchio :<br> <a class='link' href='https://donkey-isle.itch.io/epitaph' target='_blank'><img class='repo-link' src='./Sources/Images/epitaph.png'></a>" +
      "</p>";
  }
}

export class JuicePlanet extends Planet {
  constructor(radius, distance, parent) {
    super(radius, distance, parent);
    this.image = document.getElementById("juice-img");
    this.id = "juice";
    this.text =
      "<h3>Juice Juicy Juice</h3>" +
      "<p>Un idle / clicker en pixel art dont le but est de casser le jeu : plus vous générez de chaos à l'écran, plus le compteur de FPS simulé s'effondre, et plus vous gagnez.<br>" +
      "Développé en Typescript avec Phaser 3, packagé pour Android via Capacitor et pour desktop via Electron.<br><br>" +
      "Le lien de la page itchio :<br> <a class='link' href='https://donkey-isle.itch.io/juice-juicy-juice' target='_blank'><img class='repo-link' src='./Sources/Images/juice.png'></a>" +
      "Le lien du repo Github :<br> <a class='link' href='https://github.com/I-lander/JuiceJuicyJuice' target='_blank'><img class='repo-link' src='./Sources/Images/GitHub-white.png'></a>" +
      "</p>";
  }
}

export class CliffWhisperPlanet extends Planet {
  constructor(radius, distance, parent) {
    super(radius, distance, parent);
    this.image = document.getElementById("cliffwhisper-img");
    this.id = "cliffwhisper";
    this.text =
      "<h3>The Cliff Whisper</h3>" +
      "<p>Un idle / roguelike où le joueur incarne un dieu ancien corrompu : ici le compteur central doit descendre, pas monter. Il faut réduire la population humaine à zéro en luttant contre une natalité qui s'accélère.<br>" +
      "Développé en Typescript avec Phaser 3, packagé pour Android via Capacitor et pour desktop via Electron.<br><br>" +
      "Le lien de la page itchio :<br> <a class='link' href='https://donkey-isle.itch.io/the-cliff-whisper' target='_blank'><img class='repo-link' src='./Sources/Images/cliffwhisper.png'></a>" +
      "Le lien du repo Github :<br> <a class='link' href='https://github.com/I-lander/TheCliffWhisper' target='_blank'><img class='repo-link' src='./Sources/Images/GitHub-white.png'></a>" +
      "</p>";
  }
}

const SOFT_SKILLS = [
  "Autodidacte",
  "Hyper enthousiaste",
  "Rigoureux",
  "Créatif",
  "Assoiffé de nouveaux défis",
  "Ouvert à la critique",
  "Autonome",
  "Drôle",
  "Toujours souriant",
];

export class SoftPlanet extends Planet {
  constructor(radius, distance, parent, index) {
    super(radius, distance, parent);
    this.id = `soft${index + 1}`;
    this.text = `<p style='text-align:center'>${SOFT_SKILLS[index]}</p>`;
  }
}
