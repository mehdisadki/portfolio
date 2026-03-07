import { useState } from "react";
import { PROJECTS } from "../data/index.js";
import SectionTitle from "./SectionTitle";

const STATUS_CONFIG = {
  LIVE:  { label: "LIVE",       color: "#00ffe7" },
  DEV:   { label: "EN COURS",   color: "#f0a500" },
  DONE:  { label: "TERMINÉ",    color: "#6c757d" },
};

function TerminalCard({ project, isActive }) {
  const [visibleLines, setVisibleLines] = useState(1);
  const [animating, setAnimating] = useState(false);
  const status = STATUS_CONFIG[project.status];

  const startAnimation = () => {
    if (animating) return;
    setAnimating(true);
    setVisibleLines(1);
    let i = 1;
    const id = setInterval(() => {
      i++;
      setVisibleLines(i);
      if (i >= project.lines.length) {
        clearInterval(id);
        setAnimating(false);
      }
    }, 400);
  };

  return (
    <div style={{
      width: "100%",
      background: "rgba(0,255,231,0.02)",
      border: `1px solid ${isActive ? "rgba(0,255,231,0.35)" : "rgba(0,255,231,0.1)"}`,
      transition: "all 0.4s",
      boxShadow: isActive ? "0 0 40px rgba(0,255,231,0.08)" : "none",
      display: "flex", flexDirection: "column",
    }}>

      {/* Barre de titre du terminal */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0.7rem 1rem",
        background: "rgba(0,255,231,0.05)",
        borderBottom: "1px solid rgba(0,255,231,0.1)",
      }}>
        <div style={{ display: "flex", gap: "0.4rem" }}>
          {["#ff5f57", "#febc2e", "#28c840"].map((c, i) => (
            <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: 0.8 }} />
          ))}
        </div>
        <span style={{
          fontFamily: "'Courier New', monospace", fontSize: "0.7rem",
          color: "rgba(0,255,231,0.5)", letterSpacing: "0.1em",
        }}>
          mehdi@portfolio:~/{project.title.toLowerCase().replace(/ /g, "-")}
        </span>
        <div style={{
          fontFamily: "'Orbitron', monospace", fontSize: "0.55rem",
          color: status.color, border: `1px solid ${status.color}`,
          padding: "0.15rem 0.4rem", letterSpacing: "0.15em",
          opacity: 0.9,
        }}>
          {status.label}
        </div>
      </div>

      {/* Image / Preview */}
      <div
        style={{
          height: 180, position: "relative", overflow: "hidden",
          background: "rgba(0,0,0,0.4)", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
        onClick={startAnimation}
      >
        {project.image ? (
          <img src={project.image} alt={project.title} style={{
            width: "100%", height: "100%", objectFit: "contain",
            filter: "brightness(0.6) saturate(0.8)",
          }} />
        ) : (
          <div style={{
            width: "100%", height: "100%",
            background: `repeating-linear-gradient(
              0deg, transparent, transparent 2px,
              rgba(0,255,231,0.03) 2px, rgba(0,255,231,0.03) 4px
            )`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{
              fontFamily: "'Orbitron', monospace", fontSize: "0.6rem",
              color: "rgba(0,255,231,0.25)", letterSpacing: "0.2em",
            }}>
              APERÇU NON DISPONIBLE
            </span>
          </div>
        )}

        {/* Overlay au hover avec "Lancer la preview" */}
        <div style={{
          position: "absolute", inset: 0,
          background: "rgba(2,6,18,0.7)",
          display: "flex", alignItems: "center", justifyContent: "center",
          opacity: 0, transition: "opacity 0.3s",
        }}
          onMouseEnter={e => e.currentTarget.style.opacity = 1}
          onMouseLeave={e => e.currentTarget.style.opacity = 0}
        >
          <span style={{
            fontFamily: "'Orbitron', monospace", fontSize: "0.65rem",
            color: "#00ffe7", letterSpacing: "0.2em", border: "1px solid #00ffe7",
            padding: "0.5rem 1rem",
          }}>
            ▶ LANCER LA PREVIEW
          </span>
        </div>
      </div>

      {/* Terminal animé */}
      <div style={{
        padding: "1rem", minHeight: 130,
        fontFamily: "'Courier New', monospace", fontSize: "0.78rem",
        background: "rgba(0,0,0,0.3)",
        borderTop: "1px solid rgba(0,255,231,0.06)",
        borderBottom: "1px solid rgba(0,255,231,0.06)",
      }}>
        {project.lines.slice(0, visibleLines).map((line, i) => (
          <div key={i} style={{
            color: line.startsWith("✓") ? "#00ffe7"
              : line.startsWith("→") ? "rgba(255,255,255,0.7)"
              : line.startsWith("⟳") ? "#f0a500"
              : line.startsWith("$") ? "#fff"
              : "rgba(255,255,255,0.5)",
            lineHeight: 2,
            display: "flex", alignItems: "center", gap: "0.3rem",
          }}>
            {i === visibleLines - 1 && animating && (
              <span style={{ color: "#00ffe7", animation: "blink 0.5s infinite" }}>▌</span>
            )}
            {line}
          </div>
        ))}
      </div>

      {/* Infos et boutons */}
      <div style={{ padding: "1.2rem" }}>
        <h3 style={{
          fontFamily: "'Orbitron', monospace", color: "#fff",
          fontSize: "0.95rem", letterSpacing: "0.1em", marginBottom: "0.5rem",
        }}>
          {project.title}
        </h3>
        <p style={{
          fontFamily: "'Courier New', monospace",
          color: "rgba(255,255,255,0.45)", fontSize: "0.8rem",
          lineHeight: 1.7, marginBottom: "1rem",
        }}>
          {project.desc}
        </p>

        {/* Badges tech */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.2rem" }}>
          {project.tech.map(t => (
            <span key={t} style={{
              fontFamily: "'Courier New', monospace", fontSize: "0.65rem",
              color: "#00ffe7", background: "rgba(0,255,231,0.07)",
              border: "1px solid rgba(0,255,231,0.2)", padding: "0.2rem 0.5rem",
            }}>
              {t}
            </span>
          ))}
        </div>

        {/* Boutons */}
        <div style={{ display: "flex", gap: "0.8rem" }}>
          {/* Bouton GitHub */}
          {project.github && !["privé", "non prévu"].includes(project.github) ? (
            <a href={project.github} target="_blank" rel="noreferrer" style={{
              flex: 1, textAlign: "center",
              padding: "0.6rem", textDecoration: "none",
              fontFamily: "'Orbitron', monospace", fontSize: "0.6rem",
              letterSpacing: "0.15em", color: "rgba(255,255,255,0.6)",
              border: "1px solid rgba(255,255,255,0.15)",
              background: "transparent", transition: "all 0.2s",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#fff"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              GITHUB
            </a>
          ) : (
            <div style={{
              flex: 1, textAlign: "center", padding: "0.6rem",
              fontFamily: "'Orbitron', monospace", fontSize: "0.6rem",
              letterSpacing: "0.15em",
              color: "rgba(255,255,255,0.2)",
              border: `1px solid rgba(255,255,255,0.07)`,
              display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem",
            }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              {project.github === "privé" ? "PRIVÉ" : "NON PRÉVU"}
            </div>
          )}

          {/* Bouton Live */}
          {project.live && !["privé", "non prévu"].includes(project.live) ? (
            <a href={project.live} target="_blank" rel="noreferrer" style={{
              flex: 1, textAlign: "center",
              padding: "0.6rem", textDecoration: "none",
              fontFamily: "'Orbitron', monospace", fontSize: "0.6rem",
              letterSpacing: "0.15em", color: "#00ffe7",
              border: "1px solid #00ffe7",
              background: "transparent", transition: "all 0.2s",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,255,231,0.1)"; e.currentTarget.style.boxShadow = "0 0 15px rgba(0,255,231,0.2)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <span>⬡</span> VOIR LE SITE
            </a>
          ) : (
            <div style={{
              flex: 1, textAlign: "center", padding: "0.6rem",
              fontFamily: "'Orbitron', monospace", fontSize: "0.6rem",
              letterSpacing: "0.15em",
              color: "rgba(255,255,255,0.2)",
              border: `1px solid rgba(255,255,255,0.07)`,
              display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem",
            }}>
              <span>⬡</span>
              {project.live === "privé" ? "SITE WEB PRIVÉ" : "SITE WEB NON PRÉVU"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const [current, setCurrent] = useState(0);
  const total = PROJECTS.length;

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  return (
    <section style={{ padding: "6rem 3rem" }}>
      <SectionTitle label="05" title="Projets" />

      <div style={{ marginTop: "3rem", position: "relative" }}>

        {/* Carrousel */}
        <div style={{ overflow: "hidden" }}>
          <div style={{
            display: "flex",
            transform: `translateX(calc(-${current * 100}% - ${current * 1.5}rem))`,
            transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
            gap: "1.5rem",
          }}>
            {PROJECTS.map((project, i) => (
              <div key={project.id} style={{ minWidth: "100%", maxWidth: "100%" }}>
                <TerminalCard project={project} isActive={i === current} />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "2rem", marginTop: "2rem" }}>
          <button onClick={prev} style={{
            background: "transparent", border: "1px solid rgba(0,255,231,0.3)",
            color: "#00ffe7", width: 44, height: 44, cursor: "pointer",
            fontFamily: "'Orbitron', monospace", fontSize: "1rem",
            transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,255,231,0.1)"; e.currentTarget.style.boxShadow = "0 0 15px rgba(0,255,231,0.2)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.boxShadow = "none"; }}
          >
            ←
          </button>

          {/* Indicateurs */}
          <div style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
            {PROJECTS.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)} style={{
                background: "none", border: "none", cursor: "pointer", padding: 0,
              }}>
                <div style={{
                  width: i === current ? 24 : 8,
                  height: 3,
                  background: i === current ? "#00ffe7" : "rgba(0,255,231,0.2)",
                  transition: "all 0.3s",
                  boxShadow: i === current ? "0 0 8px #00ffe7" : "none",
                }} />
              </button>
            ))}
          </div>

          <button onClick={next} style={{
            background: "transparent", border: "1px solid rgba(0,255,231,0.3)",
            color: "#00ffe7", width: 44, height: 44, cursor: "pointer",
            fontFamily: "'Orbitron', monospace", fontSize: "1rem",
            transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,255,231,0.1)"; e.currentTarget.style.boxShadow = "0 0 15px rgba(0,255,231,0.2)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.boxShadow = "none"; }}
          >
            →
          </button>
        </div>

        {/* Compteur */}
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <span style={{
            fontFamily: "'Orbitron', monospace", fontSize: "0.65rem",
            color: "rgba(0,255,231,0.3)", letterSpacing: "0.2em",
          }}>
            {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}