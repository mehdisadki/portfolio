import { useState } from "react";
import SectionTitle from "./SectionTitle";

const CATEGORIES = ["Tous", "Langages", "Frameworks", "Outils", "Soft Skills"];

const SKILLS = [
  // Langages
  { name: "JavaScript", category: "Langages", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "Python", category: "Langages", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Java", category: "Langages", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "C", category: "Langages", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
  { name: "C++", category: "Langages", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
  { name: "Bas niveau", category: "Langages", emoji: "⚙️" },
  { name: "SQL", category: "Langages", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "MongoDB", category: "Outils", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "HTML5", category: "Langages", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS3", category: "Langages", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },

  // Frameworks
  { name: "React", category: "Frameworks", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Node.js", category: "Frameworks", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Express", category: "Frameworks", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
  { name: "Tailwind", category: "Frameworks", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Flask", category: "Frameworks", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" },
  { name: "Selenium", category: "Frameworks", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg" },
  { name: "BeautifulSoup4", category: "Frameworks", emoji: "🍜" },

  // Outils
  { name: "Git", category: "Outils", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "GitHub", category: "Outils", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
  { name: "Linux", category: "Outils", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
  { name: "Docker", category: "Outils", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "VS Code", category: "Outils", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
  { name: "Postman", category: "Outils", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },

  // Soft Skills (pas de logo donc on utilise des emojis stylisés)
  { name: "Travail d'équipe", category: "Soft Skills", emoji: "🤝" },
  { name: "Curiosité", category: "Soft Skills", emoji: "🔍" },
  { name: "Autonomie", category: "Soft Skills", emoji: "⚡" },
  { name: "Rigueur", category: "Soft Skills", emoji: "🎯" },
  { name: "Adaptabilité", category: "Soft Skills", emoji: "🔄" },
  { name: "Management", category: "Soft Skills", emoji: "👔" },

];

const CATEGORY_COLOR = {
  "Langages": "#00ffe7",
  "Frameworks": "#7b61ff",
  "Outils": "#00b4d8",
  "Soft Skills": "#f0a500",
};

export default function SkillsSection() {
  const [active, setActive] = useState("Tous");
  const [hovered, setHovered] = useState(null);

  const filtered = active === "Tous" ? SKILLS : SKILLS.filter(s => s.category === active);

  return (
    <section style={{ padding: "6rem 3rem" }}>
      <SectionTitle label="02" title="Compétences" />

      {/* Filtres */}
      <div style={{ display: "flex", gap: "0.8rem", marginTop: "2rem", marginBottom: "3rem", flexWrap: "wrap" }}>
        {CATEGORIES.map((cat) => (
          <button key={cat} onClick={() => setActive(cat)} style={{
            background: active === cat ? "rgba(0,255,231,0.1)" : "transparent",
            border: `1px solid ${active === cat ? "#00ffe7" : "rgba(0,255,231,0.2)"}`,
            color: active === cat ? "#00ffe7" : "rgba(255,255,255,0.4)",
            fontFamily: "'Orbitron', monospace",
            fontSize: "0.65rem", letterSpacing: "0.15em",
            padding: "0.5rem 1.2rem", cursor: "pointer",
            textTransform: "uppercase", transition: "all 0.2s",
            boxShadow: active === cat ? "0 0 12px rgba(0,255,231,0.15)" : "none",
          }}>
            {cat}
          </button>
        ))}
      </div>

      {/* Grille de logos */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))",
        gap: "1rem",
      }}>
        {filtered.map((skill) => {
          const color = CATEGORY_COLOR[skill.category];
          const isHovered = hovered === skill.name;

          return (
            <div
              key={skill.name}
              onMouseEnter={() => setHovered(skill.name)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                gap: "0.7rem", padding: "1.4rem 0.8rem",
                background: isHovered ? `${color}0f` : "rgba(0,255,231,0.02)",
                border: `1px solid ${isHovered ? color : "rgba(0,255,231,0.08)"}`,
                transition: "all 0.25s",
                cursor: "default",
                boxShadow: isHovered ? `0 0 18px ${color}22` : "none",
                position: "relative", overflow: "hidden",
              }}
            >
              {/* Coin décoratif en haut à gauche */}
              <div style={{
                position: "absolute", top: 4, left: 4,
                width: 8, height: 8,
                borderTop: `1px solid ${color}`,
                borderLeft: `1px solid ${color}`,
                opacity: isHovered ? 0.8 : 0.2,
                transition: "opacity 0.25s",
              }} />

              {/* Logo ou emoji */}
              {skill.icon ? (
                <img
                  src={skill.icon}
                  alt={skill.name}
                  style={{
                    width: 44, height: 44,
                    filter: isHovered
                      ? "brightness(1.1) drop-shadow(0 0 6px " + color + "88)"
                      : "brightness(0.75) grayscale(0.3)",
                    transition: "filter 0.25s",
                  }}
                />
              ) : (
                <span style={{
                  fontSize: "2rem",
                  filter: isHovered ? "none" : "grayscale(0.5)",
                  transition: "filter 0.25s",
                }}>
                  {skill.emoji}
                </span>
              )}

              {/* Nom */}
              <span style={{
                fontFamily: "'Courier New', monospace",
                fontSize: "0.7rem", textAlign: "center",
                color: isHovered ? color : "rgba(255,255,255,0.4)",
                letterSpacing: "0.05em",
                transition: "color 0.25s",
              }}>
                {skill.name}
              </span>

              {/* Badge catégorie visible au hover */}
              {isHovered && (
                <span style={{
                  position: "absolute", bottom: 4, right: 5,
                  fontFamily: "'Orbitron', monospace",
                  fontSize: "0.45rem", letterSpacing: "0.1em",
                  color: color, opacity: 0.6,
                  textTransform: "uppercase",
                }}>
                  {skill.category}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}