import { useState, useEffect } from "react";

const BOOT_LINES = [
  { text: "INITIALISATION DU SYSTÈME...", delay: 0 },
  { text: "CHARGEMENT DU NOYAU v2.4.1", delay: 300 },
  { text: "VÉRIFICATION DE L'INTÉGRITÉ DES DONNÉES...", delay: 700 },
  { text: "> MODULES DÉTECTÉS : [REACT] [NODE] [EXPRESS] [SQL]", delay: 1100 },
  { text: "> CONNEXION AU SERVEUR... OK", delay: 1500 },
  { text: "> DÉCRYPTAGE DU PROFIL UTILISATEUR...", delay: 1900 },
  { text: "> IDENTITÉ CONFIRMÉE : MEHDI SADKI", delay: 2400 },
  { text: "> NIVEAU D'ACCÈS : DÉVELOPPEUR FULL STACK", delay: 2900 },
  { text: "COMPILATION DES DONNÉES EN COURS...", delay: 3400 },
  { text: "ACCÈS AUTORISÉ.", delay: 4200 },
];

const RANDOM_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&";

function randomChar() {
  return RANDOM_CHARS[Math.floor(Math.random() * RANDOM_CHARS.length)];
}

function MatrixRain() {
  const columns = 20;
  const [chars, setChars] = useState(
    Array.from({ length: columns }, () => Array.from({ length: 8 }, randomChar))
  );

  useEffect(() => {
    const id = setInterval(() => {
      setChars((prev) =>
        prev.map((col) => [randomChar(), ...col.slice(0, col.length - 1)])
      );
    }, 80);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{
      position: "absolute", inset: 0, display: "flex",
      justifyContent: "space-around", overflow: "hidden",
      opacity: 0.07, pointerEvents: "none",
    }}>
      {chars.map((col, ci) => (
        <div key={ci} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {col.map((c, ri) => (
            <span key={ri} style={{
              fontFamily: "'Courier New', monospace",
              fontSize: "0.9rem",
              color: ri === 0 ? "#fff" : "#00ffe7",
              opacity: 1 - ri * 0.12,
            }}>
              {c}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

function ProgressBar({ progress }) {
  return (
    <div style={{ width: "100%", maxWidth: 500 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
        <span style={{ fontFamily: "'Courier New', monospace", color: "rgba(0,255,231,0.6)", fontSize: "0.7rem", letterSpacing: "0.2em" }}>
          TRANSFERT DE DONNÉES
        </span>
        <span style={{ fontFamily: "'Orbitron', monospace", color: "#00ffe7", fontSize: "0.75rem" }}>
          {Math.round(progress)}%
        </span>
      </div>
      <div style={{
        width: "100%", height: 3,
        background: "rgba(0,255,231,0.1)",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          height: "100%", width: `${progress}%`,
          background: "linear-gradient(to right, rgba(0,255,231,0.4), #00ffe7)",
          transition: "width 0.1s linear",
          boxShadow: "0 0 10px #00ffe7",
          position: "relative",
        }}>
          {/* Effet de brillance qui défile */}
          <div style={{
            position: "absolute", top: 0, right: 0, bottom: 0, width: 40,
            background: "linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent)",
            animation: "shimmer 0.8s infinite",
          }} />
        </div>
      </div>
      {/* Blocs de data sous la barre */}
      <div style={{ display: "flex", gap: "3px", marginTop: "0.4rem" }}>
        {Array.from({ length: 40 }).map((_, i) => (
          <div key={i} style={{
            flex: 1, height: 4,
            background: i / 40 < progress / 100
              ? `rgba(0,255,231,${0.3 + Math.random() * 0.5})`
              : "rgba(255,255,255,0.05)",
            transition: "background 0.2s",
          }} />
        ))}
      </div>
    </div>
  );
}

function HexGrid() {
  return (
    <div style={{
      position: "absolute", right: "5%", top: "50%", transform: "translateY(-50%)",
      display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "6px",
      opacity: 0.15, pointerEvents: "none",
    }}>
      {Array.from({ length: 48 }).map((_, i) => (
        <div key={i} style={{
          width: 28, height: 28,
          border: "1px solid #00ffe7",
          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          background: Math.random() > 0.7 ? "rgba(0,255,231,0.15)" : "transparent",
          animation: `pulse ${1 + Math.random() * 2}s infinite`,
          animationDelay: `${Math.random() * 2}s`,
        }} />
      ))}
    </div>
  );
}

export default function LoadingScreen({ onComplete }) {
  const [visibleLines, setVisibleLines] = useState([]);
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [glitchTitle, setGlitchTitle] = useState("MEHDI SADKI");

  // Affiche les lignes une par une
  useEffect(() => {
    BOOT_LINES.forEach(({ text, delay }) => {
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, text]);
      }, delay);
    });
  }, []);

  // Barre de progression
  useEffect(() => {
    const duration = 4800;
    const steps = 120;
    const interval = duration / steps;
    let current = 0;
    const id = setInterval(() => {
      current += 1;
      // Progression non-linéaire : rapide au début, lente au milieu, rapide à la fin
      const eased = Math.min(100, current < 60
        ? current * 1.2
        : current < 100
          ? 72 + (current - 60) * 0.5
          : 100
      );
      setProgress(eased);
      if (current >= steps) clearInterval(id);
    }, interval);
    return () => clearInterval(id);
  }, []);

  // Effet glitch sur le titre
  useEffect(() => {
    const original = "MEHDI SADKI";
    const id = setInterval(() => {
      if (Math.random() > 0.85) {
        const glitched = original.split("").map((c) =>
          Math.random() > 0.7 ? randomChar() : c
        ).join("");
        setGlitchTitle(glitched);
        setTimeout(() => setGlitchTitle(original), 80);
      }
    }, 200);
    return () => clearInterval(id);
  }, []);

  // Fade out et appel du callback
  useEffect(() => {
    const id = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => onComplete(), 800);
    }, 5400);
    return () => clearTimeout(id);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');
        @keyframes shimmer { 0%,100% { opacity:0.6 } 50% { opacity:1 } }
        @keyframes pulse { 0%,100% { opacity:0.3 } 50% { opacity:1 } }
        @keyframes blink { 0%,100% { opacity:1 } 50% { opacity:0 } }
        @keyframes scanline {
          0% { transform: translateY(-100%) }
          100% { transform: translateY(100vh) }
        }
      `}</style>

      <div style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "#020612",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        overflow: "hidden",
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 0.8s ease",
      }}>
        <MatrixRain />
        <HexGrid />

        {/* Ligne de scan */}
        <div style={{
          position: "absolute", left: 0, right: 0, height: 2,
          background: "linear-gradient(to right, transparent, rgba(0,255,231,0.3), transparent)",
          animation: "scanline 3s linear infinite",
          pointerEvents: "none",
        }} />

        {/* Coin décoratifs */}
        {[
          { top: 20, left: 20, borderTop: "2px solid #00ffe7", borderLeft: "2px solid #00ffe7" },
          { top: 20, right: 20, borderTop: "2px solid #00ffe7", borderRight: "2px solid #00ffe7" },
          { bottom: 20, left: 20, borderBottom: "2px solid #00ffe7", borderLeft: "2px solid #00ffe7" },
          { bottom: 20, right: 20, borderBottom: "2px solid #00ffe7", borderRight: "2px solid #00ffe7" },
        ].map((style, i) => (
          <div key={i} style={{ position: "absolute", width: 30, height: 30, opacity: 0.5, ...style }} />
        ))}

        <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: 600, padding: "0 2rem" }}>

          {/* Titre avec effet glitch */}
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p style={{
              fontFamily: "'Courier New', monospace", color: "rgba(0,255,231,0.5)",
              fontSize: "0.7rem", letterSpacing: "0.4em", marginBottom: "1rem",
            }}>
              &gt; ACCÈS AU PORTFOLIO
            </p>
            <h1 style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: "clamp(1.8rem, 5vw, 3.5rem)",
              fontWeight: 900, letterSpacing: "0.15em",
              background: "linear-gradient(135deg, #ffffff 40%, #00ffe7 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              {glitchTitle}
            </h1>
          </div>

          {/* Logs de boot */}
          <div style={{
            background: "rgba(0,255,231,0.02)",
            border: "1px solid rgba(0,255,231,0.1)",
            padding: "1.5rem", marginBottom: "2rem",
            minHeight: 220, maxHeight: 220, overflowY: "auto",
            fontFamily: "'Courier New', monospace",
          }}>
            {visibleLines.map((line, i) => (
              <div key={i} style={{
                color: line.includes("CONFIRMÉE") || line.includes("AUTORISÉ")
                  ? "#00ffe7"
                  : "rgba(255,255,255,0.55)",
                fontSize: "0.78rem", lineHeight: 2,
                letterSpacing: "0.05em",
                animation: "none",
              }}>
                <span style={{ color: "rgba(0,255,231,0.35)", marginRight: "0.5rem" }}>
                  {String(i).padStart(2, "0")}
                </span>
                {line}
                {i === visibleLines.length - 1 && (
                  <span style={{ animation: "blink 1s infinite", marginLeft: 4 }}>█</span>
                )}
              </div>
            ))}
          </div>

          {/* Barre de progression */}
          <ProgressBar progress={progress} />

          <p style={{
            textAlign: "center", marginTop: "1.5rem",
            fontFamily: "'Orbitron', monospace",
            color: "rgba(0,255,231,0.3)", fontSize: "0.6rem", letterSpacing: "0.3em",
          }}>
            {progress < 100 ? "CHARGEMENT EN COURS..." : "ACCÈS ACCORDÉ — BIENVENUE"}
          </p>
        </div>
      </div>
    </>
  );
}