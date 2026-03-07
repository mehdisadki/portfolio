import { useState, useEffect, useRef } from "react";
import photo from "../assets/photo.jpg";

function TerminalCursor() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const id = setInterval(() => setVisible((v) => !v), 530);
    return () => clearInterval(id);
  }, []);
  return (
    <span style={{ color: "#00ffe7", opacity: visible ? 1 : 0, fontWeight: 700 }}>█</span>
  );
}

function TypeWriter({ text, speed = 40, onDone }) {
  const [displayed, setDisplayed] = useState("");
  const i = useRef(0);
  useEffect(() => {
    i.current = 0;
    setDisplayed("");
    const id = setInterval(() => {
      if (i.current < text.length) {
        setDisplayed(text.slice(0, i.current + 1));
        i.current++;
      } else {
        clearInterval(id);
        onDone && onDone();
      }
    }, speed);
    return () => clearInterval(id);
  }, [text]);
  return <span>{displayed}</span>;
}

export default function HeroSection({ setActive }) {
  const [done, setDone] = useState(false);

  return (
    <section style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      justifyContent: "center", alignItems: "flex-start",
      padding: "0 3rem", position: "relative",
    }}>
      {/* Grille de fond */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `
          linear-gradient(rgba(0,255,231,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,255,231,0.04) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
      }} />

      {/* Photo de profil */}
      <div style={{
        position: "absolute", right: "8%", top: "50%", transform: "translateY(-50%)",
        width: 340, height: 340,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {/* Cercles orbitaux animés */}
        <div style={{
          position: "absolute", width: 340, height: 340, borderRadius: "50%",
          border: "1px solid rgba(0,255,231,0.15)",
          animation: "spin 12s linear infinite",
        }}>
          {/* Point sur l'orbite */}
          <div style={{
            position: "absolute", top: -4, left: "50%", transform: "translateX(-50%)",
            width: 8, height: 8, borderRadius: "50%",
            background: "#00ffe7", boxShadow: "0 0 10px #00ffe7",
          }} />
        </div>
        <div style={{
          position: "absolute", width: 380, height: 380, borderRadius: "50%",
          border: "1px solid rgba(0,255,231,0.06)",
          animation: "spinReverse 18s linear infinite",
        }}>
          <div style={{
            position: "absolute", bottom: -3, left: "50%", transform: "translateX(-50%)",
            width: 6, height: 6, borderRadius: "50%",
            background: "rgba(0,255,231,0.5)", boxShadow: "0 0 8px rgba(0,255,231,0.5)",
          }} />
        </div>

        {/* Cadre hexagonal simulé avec clip-path */}
        <div style={{
          width: 260, height: 260, position: "relative",
          clipPath: "polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)",
          background: "linear-gradient(135deg, rgba(0,255,231,0.2), rgba(0,255,231,0.05))",
          padding: 3,
        }}>
          <div style={{
            width: "100%", height: "100%",
            clipPath: "polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)",
            overflow: "hidden",
            background: "#020612",
          }}>
            <img
              src={photo}
              alt="Mehdi Sadki"
              style={{
                width: "100%", height: "100%",
                objectFit: "cover", objectPosition: "center top",
                filter: "grayscale(20%) contrast(1.05)",
                mixBlendMode: "normal",
              }}
            />
            {/* Overlay scanline effect */}
            <div style={{
              position: "absolute", inset: 0,
              background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,231,0.02) 2px, rgba(0,255,231,0.02) 4px)",
              pointerEvents: "none",
            }} />
          </div>
        </div>

        {/* Badge statut en bas */}
        <div style={{
          position: "absolute", bottom: -16,
          background: "rgba(2,6,18,0.95)",
          border: "1px solid rgba(0,255,231,0.3)",
          padding: "0.3rem 1rem",
          fontFamily: "'Orbitron', monospace",
          fontSize: "0.6rem", letterSpacing: "0.2em",
          color: "#00ffe7",
          display: "flex", alignItems: "center", gap: "0.5rem",
        }}>
          <div style={{
            width: 6, height: 6, borderRadius: "50%",
            background: "#00ffe7", boxShadow: "0 0 6px #00ffe7",
            animation: "blink 1.5s infinite",
          }} />
          DISPONIBLE
        </div>
      </div>

      {/* Contenu */}
      <div style={{ position: "relative", zIndex: 2, maxWidth: 700 }}>
        <p style={{
          fontFamily: "'Courier New', monospace", color: "#00ffe7",
          fontSize: "0.85rem", letterSpacing: "0.3em", marginBottom: "1.5rem", opacity: 0.8,
        }}>
          &gt; INITIALISATION DU PROFIL...
        </p>

        <h1 style={{
          fontFamily: "'Orbitron', monospace",
          fontSize: "clamp(2.5rem, 6vw, 5rem)",
          fontWeight: 900, lineHeight: 1.05,
          background: "linear-gradient(135deg, #ffffff 40%, #00ffe7 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          marginBottom: "0.5rem",
        }}>
          Mehdi Sadki
        </h1>

        <h2 style={{
          fontFamily: "'Orbitron', monospace",
          fontSize: "clamp(0.9rem, 2vw, 1.3rem)",
          color: "#00ffe7", fontWeight: 400,
          letterSpacing: "0.25em", marginBottom: "2rem", opacity: 0.85,
        }}>
          <TypeWriter
            text="ÉTUDIANT · BUT INFORMATIQUE · 2ÈME ANNÉE"
            speed={45}
            onDone={() => setDone(true)}
          />
          {done && <TerminalCursor />}
        </h2>

        <p style={{
          fontFamily: "'Courier New', monospace",
          color: "rgba(255,255,255,0.55)", fontSize: "1rem",
          lineHeight: 1.8, maxWidth: 520, marginBottom: "3rem",
        }}>
          Passionné par le développement web et les nouvelles technologies.
          Je conçois des applications modernes, du frontend au backend,
          avec un œil pour le design et la performance.
        </p>

        <div style={{ display: "flex", gap: "1rem" }}>
          <button onClick={() => setActive("contact")} style={{
            display: "inline-block", padding: "0.85rem 2rem",
            background: "transparent", border: "1px solid #00ffe7",
            color: "#00ffe7", fontFamily: "'Orbitron', monospace",
            fontSize: "0.75rem", letterSpacing: "0.2em", cursor: "pointer",
            transition: "all 0.3s",
          }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "rgba(0,255,231,0.1)";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(0,255,231,0.2)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            ME CONTACTER
          </button>
          <a href="/cv.pdf" download="CV_Mehdi_Sadki.pdf" style={{
            display: "inline-block", padding: "0.85rem 2rem",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "rgba(255,255,255,0.6)", fontFamily: "'Orbitron', monospace",
            fontSize: "0.75rem", letterSpacing: "0.2em", textDecoration: "none",
          }}>
            MON CV
          </a>
        </div>
      </div>
    </section>
  );
}