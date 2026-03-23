import { Planet } from "./Planet.js";

const SKILL_CONFIG = {
  html:       { img: "html-img",      text: "HTML",           stars: "★★★★★" },
  css:        { img: "css-img",       text: "CSS",            stars: "★★★★☆" },
  javascript: { img: "javascript-img",text: "Javascript",     stars: "★★★★★" },
  react:      { img: "react-img",     text: "React",          stars: "★★★★☆" },
  angular:    { img: "angular-img",   text: "Angular",        stars: "★★★☆☆" },
  typescript: { img: "typescript-img",text: "Typescript",      stars: "★★★★☆" },
  python:     { img: "python-img",    text: "Python",         stars: "★★★☆☆" },
  c_sharp:    { img: "c_sharp-img",   text: "C#",             stars: "★★☆☆☆" },
  chatGPT:    { img: "chatGPT-img",   text: "ChatGPT",        stars: "★★★★★" },
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

export class DonkeyReadingsPlanet extends Planet {
  constructor(radius, distance, parent) {
    super(radius, distance, parent);
    this.image = document.getElementById("donkey-img");
    this.id = "donkey";
    this.text =
      "<h3>Les lectures de l'âne</h3>" +
      "<p>Depuis que Chat GPT a été mis en ligne, je l'utilise au quotidien.<br>" +
      "J'ai eu l'idée de ce service dans le train en voyant mon voisin de devant qui consultait un horoscope.<br>" +
      "Codée en React, l'application permet de poser une question et de recevoir un tirage de trois cartes.<br>" +
      "Le modèle génère alors une lecture construite autour de la question et des cartes choisies aléatoirement.<br><br>" +
      "Le lien du repo Github :<br> <a class='link' href='https://github.com/I-lander/donkeysReadings/' target='_blank'><img class='repo-link' src='./Sources/Images/GitHub-white.png'></a>" +
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
      "<h3>Genesis: Art of Creation</h3>" +
      "<p>Un jeu de type god game / toy qui témoigne de toute mon expérience acquise.<br>" +
      "Il s'agit d'un jeu de type god game / toy où le seul but est de prendre plaisir.<br>" +
      "Destiné aux plateformes Steam, Android et Itchio.<br><br>" +
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
      "<p>Mon dernier jeu publié ! Un survival / bullet-heaven mobile où le joueur incarne une créature surnaturelle qui affronte des vagues d'humains pour collecter 333 âmes.<br>" +
      "Développé en Typescript avec Phaser 3, React / Ionic, et packagé pour Android via Capacitor.<br><br>" +
      "Le lien du Play Store :<br> <a class='link' href='https://play.google.com/store/apps/details?id=com.donkeysisle.epitaph&hl=fr' target='_blank'><img class='repo-link' src='./Sources/Images/playStore.png'></a>" +
      "Le lien de la page itchio :<br> <a class='link' href='https://donkey-isle.itch.io/epitaph' target='_blank'><img class='repo-link' src='./Sources/Images/epitaph.png'></a>" +
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
