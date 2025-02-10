import { Planet } from "./Planet.js";

export class HtmlPlanet extends Planet {
  constructor(radius, speed, distance, parent) {
    super(radius, speed, distance, parent);
    this.image = document.getElementById("html");
    this.id = "html";
    this.text =
      "<p style='text-align:center'>Mon niveau sur</br> <b>HTML<b> :</br> ★★★★★</p>";
  }
}
export class CssPlanet extends Planet {
  constructor(radius, speed, distance, parent) {
    super(radius, speed, distance, parent);
    this.image = document.getElementById("css-img");
    this.id = "css";
    this.text =
      "<p style='text-align:center'>Mon niveau sur</br> <b>CSS<b> :</br> ★★★★☆</p>";
  }
}
export class JavascriptPlanet extends Planet {
  constructor(radius, speed, distance, parent) {
    super(radius, speed, distance, parent);
    this.image = document.getElementById("javascript-img");
    this.id = "javascript";
    this.text =
      "<p style='text-align:center'>Mon niveau sur</br> <b>Javascript<b> :</br> ★★★★★</p>";
  }
}
export class ReactPlanet extends Planet {
  constructor(radius, speed, distance, parent) {
    super(radius, speed, distance, parent);
    this.image = document.getElementById("react-img");
    this.id = "react";
    this.text =
      "<p style='text-align:center'>Mon niveau sur</br> <b>React<b> :</br> ★★★★☆</p>";
  }
}
export class AngularPlanet extends Planet {
  constructor(radius, speed, distance, parent) {
    super(radius, speed, distance, parent);
    this.image = document.getElementById("angular-img");
    this.id = "angular";
    this.text =
      "<p style='text-align:center'>Mon niveau sur</br> <b>Angular<b> :</br> ★★★☆☆</p>";
  }
}
export class TypescriptPlanet extends Planet {
  constructor(radius, speed, distance, parent) {
    super(radius, speed, distance, parent);
    this.image = document.getElementById("typescript-img");
    this.id = "typescript";
    this.text =
      "<p style='text-align:center'>Mon niveau sur</br> <b>Typescript<b> :</br> ★★★★☆</p>";
  }
}
export class PythonPlanet extends Planet {
  constructor(radius, speed, distance, parent) {
    super(radius, speed, distance, parent);
    this.image = document.getElementById("python-img");
    this.id = "python";
    this.text =
      "<p style='text-align:center'>Mon niveau sur</br> <b>Python<b> :</br> ★★★☆☆</p>";
  }
}
export class CsharpPlanet extends Planet {
  constructor(radius, speed, distance, parent) {
    super(radius, speed, distance, parent);
    this.image = document.getElementById("c_sharp-img");
    this.id = "c_sharp";
    this.text =
      "<p style='text-align:center'>Mon niveau sur</br> <b>C#<b> :</br> ★★☆☆☆</p>";
  }
}
export class ChatGPTPlanet extends Planet {
  constructor(radius, speed, distance, parent) {
    super(radius, speed, distance, parent);
    this.image = document.getElementById("chatGPT-img");
    this.id = "chatGPT";
    this.text =
      "<p style='text-align:center'>Mon niveau sur</br> <b>ChatGPT<b> :</br> ★★★★★</p>";
  }
}
export class GitPlanet extends Planet {
  constructor(radius, speed, distance, parent) {
    super(radius, speed, distance, parent);
    this.image = document.getElementById("git-img");
    this.id = "git";
    this.text =
      "<p style='text-align:center'>Mon niveau sur</br> <b>Git<b> / Github<b> :</br> ★★★☆☆</p>";
  }
}
export class SqlPlanet extends Planet {
  constructor(radius, speed, distance, parent) {
    super(radius, speed, distance, parent);
    this.image = document.getElementById("sql-img");
    this.id = "sql";
    this.text =
      "<p style='text-align:center'>Mon niveau sur</br> <b>SQL<b> :</br> ★★★★★</p>";
  }
}
export class DockerPlanet extends Planet {
  constructor(radius, speed, distance, parent) {
    super(radius, speed, distance, parent);
    this.image = document.getElementById("docker-img");
    this.id = "docker";
    this.text =
      "<p style='text-align:center'>Mon niveau sur</br> <b>Docker<b> :</br> ★★★★☆</p>";
  }
}
export class DelementPlanet extends Planet {
  constructor(radius, speed, distance, parent) {
    super(radius, speed, distance, parent);
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
  constructor(radius, speed, distance, parent) {
    super(radius, speed, distance, parent);
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
  constructor(radius, speed, distance, parent) {
    super(radius, speed, distance, parent);
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
  constructor(radius, speed, distance, parent) {
    super(radius, speed, distance, parent);
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
  constructor(radius, speed, distance, parent) {
    super(radius, speed, distance, parent);
    this.image = document.getElementById("genesis-img");
    this.id = "genesis";
    this.text =
      "<h3>Genesis: Art of Creation</h3>" +
      "<p>C'est à ce jour ma dernière création, il témoigne donc de toute mon expérience acquise.<br>" +
      "Il s'agit d'un jeu de type god game / toy où le seul but est de prendre plaisir.<br>" +
      "Destiné aux plateformes Steam, Android et Itchio.<br><br>" +
      "Le lien de la page itchio :<br> <a class='link' href='https://donkey-isle.itch.io/genesis-age-of-creation' target='_blank'><img class='repo-link' src='./Sources/Images/genesis.svg'></a>" +
      "</p>";
  }
}
export class Soft1Planet extends Planet {
  constructor(radius, speed, distance, parent) {
    super(radius, speed, distance, parent);
    this.id = "soft1";
    this.text = "<p style='text-align:center'>Autodidacte</p>";
  }
}
export class Soft2Planet extends Planet {
  constructor(radius, speed, distance, parent) {
    super(radius, speed, distance, parent);
    this.id = "soft2";
    this.text = "<p style='text-align:center'>Hyper enthousiaste</p>";
  }
}
export class Soft3Planet extends Planet {
  constructor(radius, speed, distance, parent) {
    super(radius, speed, distance, parent);
    this.id = "soft3";
    this.text = "<p style='text-align:center'>Rigoureux</p>";
  }
}
export class Soft4Planet extends Planet {
  constructor(radius, speed, distance, parent) {
    super(radius, speed, distance, parent);
    this.id = "soft4";
    this.text = "<p style='text-align:center'>Créatif</p>";
  }
}
export class Soft5Planet extends Planet {
  constructor(radius, speed, distance, parent) {
    super(radius, speed, distance, parent);
    this.id = "soft5";
    this.text = "<p style='text-align:center'>Assoiffé de nouveaux défis</p>";
  }
}
export class Soft6Planet extends Planet {
  constructor(radius, speed, distance, parent) {
    super(radius, speed, distance, parent);
    this.id = "soft6";
    this.text = "<p style='text-align:center'>Ouvert à la critique</p>";
  }
}
export class Soft7Planet extends Planet {
  constructor(radius, speed, distance, parent) {
    super(radius, speed, distance, parent);
    this.id = "soft7";
    this.text = "<p style='text-align:center'>Autonome</p>";
  }
}

export class Soft8Planet extends Planet {
  constructor(radius, speed, distance, parent) {
    super(radius, speed, distance, parent);
    this.id = "soft7";
    this.text = "<p style='text-align:center'>Drôle</p>";
  }
}

export class Soft9Planet extends Planet {
  constructor(radius, speed, distance, parent) {
    super(radius, speed, distance, parent);
    this.id = "soft7";
    this.text = "<p style='text-align:center'>Toujours souriant</p>";
  }
}
