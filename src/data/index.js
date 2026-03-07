import Logo from "../assets/logo_repare_manette.webp";
import LogoAnn from "../assets/logo_annotation.png";
import LogoImrah from "../assets/logo_imrah.png";


export const SKILLS = [
  { category: "Langages", items: ["JavaScript", "Python", "Java", "C", "SQL"] },
  { category: "Frontend", items: ["React", "HTML5", "CSS3", "Tailwind"] },
  { category: "Backend", items: ["Node.js", "Express", "REST API"] },
  { category: "Outils", items: ["Git", "GitHub", "Linux", "VS Code", "Docker"] },
];

export const FORMATIONS = [
  {
    date: "2023 — Présent",
    title: "BUT Informatique",
    company: "IUT Sorbonne Paris Nord",
    desc: "Formation en développement web, algorithmique, bases de données, réseaux et gestion de projets informatiques.",
  },
  {
    date: "2022",
    title: "Baccalauréat",
    company: "Lycée Voillaume",
    desc: "Obtention du baccalauréat avec mention, spécialité mathématiques et numérique.",
  },
];

export const EXPERIENCES = [
  {
    date: "2025-2026",
    title: "Entrepreneur",
    company: "Repare manette",
    desc: "Au sein de ma petite entreprise de réparation de manettes, j’ai géré l’image de l’entreprise sur les réseaux sociaux, tout en m’occupant de la relation client et de l’organisation. J’ai également réparé des cartes mères et développé des compétences en soudure et en réparation de circuits imprimés.",
  },
  {
    date: "2020-2026",
    title: "Boulangerie Familiale",
    company: "Vendeur / Boulanger",
    desc: "Au sein de plusieurs boulangeries familiales, j’ai travaillé en tant que vendeur tout en apprenant à préparer les viennoiseries et les différents types de pains. Cette expérience m’a également permis de comprendre la gestion d’une boulangerie, aussi bien sur le plan administratif que sur la gestion des stocks et des commandes.",
  },
  {
    date: "2023",
    title: "Projet Web Full Stack",
    company: "Projet académique",
    desc: "Développement d'une application web complète avec React en frontend et Express.js en backend, avec gestion d'une base de données.",
  },
  {
    date: "2025",
    title: "Stage chez le groupe Kodamer",
    company: "Developpeur Full Stack",
    desc: "En tant que développeur full stack, j’ai utilisé plusieurs langages de programmation et librairies pour développer des applications complètes. J’ai également été confronté à différents défis techniques, ce qui m’a permis de renforcer mes compétences en résolution de problèmes. Par ailleurs, j’ai acquis de l’expérience en relation client, en gestion de projet et en développement de solutions adaptées aux besoins des clients.",
  },
  {
    date: "2019",
    title: "Stagiaire chez la BNP Paribas",
    company: "Stage d'observation",
    desc: "À la BNP Paribas, j’ai pu découvrir le monde de l’informatique, apprendre quelques termes techniques et mieux comprendre les différents métiers du domaine. J’ai également eu l’occasion de m’initier à un langage de programmation.",
  },
];

// ============================================================
//  PROJECTS — affiché dans la section Projets
//
//  Champs disponibles :
//  - id        : numéro d'ordre affiché (ex: "01")
//  - title     : nom du projet
//  - status    : "LIVE" | "DEV" | "DONE"
//                  LIVE  = site en ligne
//                  DEV   = en cours de développement
//                  DONE  = terminé mais pas en ligne
//  - desc      : courte description (2-3 phrases max)
//  - tech      : tableau des technos utilisées
//  - github    : "https://github.com/..."  → bouton cliquable
//               "privé"                   → affiche 🔒 PRIVÉ
//               "non prévu"               → affiche NON PRÉVU
//               null                      → bouton absent
//  - live      : "https://..."            → bouton cliquable
//               "privé"                   → affiche 🔒 PRIVÉ
//               "non prévu"               → affiche NON PRÉVU
//               null                      → bouton absent
//  - image     : import de l'image du projet (null si pas de screenshot)
//                  Pour ajouter une image :
//                  1. Place le fichier dans src/assets/projects/
//                  2. Remplace null par : import monImage from "../assets/projects/monimage.png"
//                     ⚠️ Les imports doivent être faits EN HAUT du fichier, pas dans le tableau
//  - lines     : logs affichés dans le terminal animé de la carte
// ============================================================

// Exemples d'imports d'images (décommente et adapte) :
// import portfolioImg from "../assets/projects/portfolio.png";
// import fullstackImg from "../assets/projects/fullstack.png";
// import bddImg       from "../assets/projects/bdd.png";

export const PROJECTS = [
  {
    id: "01",
    title: "Application de Messagerie avec Annotations par Émoji",
    status: "DONE",
    desc: "Ce projet est une application de messagerie en temps réel qui permet aux utilisateurs d'envoyer et de recevoir des messages après avoir sélectionné un émoji en tant qu'annotation. L'application utilise WebSockets pour une communication en temps réel et une base de données PostgreSQL pour stocker les messages et les annotations.",
    tech: ["PHP", "WebSockets", "GitHub", "PostgreSQL", "Travail d'équipe"],
    github: "https://github.com/Cheick6/SAE_S1.git",
    live: 'non prévu',
    image: LogoAnn,                  // Remplace par : portfolioImg
    lines: [
      "$ php -S localhost:8000",
      "✓ Connexion PostgreSQL établie",
      "✓ Serveur WebSocket démarré sur :8080",
      "→ En attente de connexions...",
      "✓ Nouveau message reçu [émoji: 🔥]",
    ],
  },
  {
    id: "02",
    title: "CRM",
    status: "LIVE",
    desc: "Développement d’un CRM à destination d’Imrah Consulting. Ce CRM intègre un système de web scraping, l’envoi automatique d’e-mails et de messages, des rappels automatisés ainsi qu’un module de gestion des prospects.",
    tech: ["React", "Express", "Node.js", "MongoDB", "API"],
    github: "privé",
    live: 'privé',
    image: LogoImrah,                  // Remplace par : fullstackImg
    lines: [
      "$ node server.js",
      "✓ Connexion MongoDB établie",
      "✓ Serveur lancé sur :3000",
      "→ Module scraping initialisé",
      "→ Planificateur d'emails démarré",
      "→ Rappels automatisés actifs",
      "✓ CRM Imrah Consulting en ligne",
    ],
  },
  {
    id: "03",
    title: "Repare Manette",
    status: "DONE",
    desc: "",
    tech: ["Communication", "Réseaux Sociaux", "React", 'MongoDB', 'Express'],
    github: "non prévu",
    live: null,
    image: Logo,                  // Remplace par : bddImg
    lines: [
      "$ npm run dev",
      "✓ Connexion MongoDB établie",
      "✓ Serveur Express lancé sur :3000",
      "→ Module réseaux sociaux connecté",
      "→ Formulaire de contact actif",
      "✓ Site RepareManette en ligne",
    ],
  },
];