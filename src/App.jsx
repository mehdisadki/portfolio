import { useState, useEffect } from "react";
import LoadingScreen from "./components/LoadingScreen";
import NavBar from "./components/NavBar";
import HeroSection from "./components/HeroSection";
import SkillsSection from "./components/SkillsSection";
import FormationsSection from "./components/FormationsSection";
import ExperiencesSection from "./components/ExperiencesSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState("accueil");

  useEffect(() => {
    document.title = "Mehdi Sadki — Portfolio";
  }, []);

  const show = (id) => ({ display: active === id ? "block" : "none" });

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      <div style={{
        background: "#020612", minHeight: "100vh",
        color: "#fff", overflowX: "hidden",
        opacity: loading ? 0 : 1,
        transition: "opacity 0.6s ease",
      }}>
        <NavBar active={active} setActive={setActive} />

        <main style={{ paddingTop: "80px" }}>
          <div style={show("accueil")}><HeroSection setActive={setActive} /></div>
          <div style={show("compétences")}><SkillsSection /></div>
          <div style={show("formations")}><FormationsSection /></div>
          <div style={show("expériences")}><ExperiencesSection /></div>
          <div style={show("projets")}><ProjectsSection /></div>
          <div style={show("contact")}><ContactSection /></div>
        </main>

        <footer style={{
          textAlign: "center", padding: "2rem",
          borderTop: "1px solid rgba(0,255,231,0.08)",
          fontFamily: "'Courier New', monospace",
          color: "rgba(255,255,255,0.2)", fontSize: "0.75rem",
        }}>
          © 2025 Mehdi Sadki · Tous droits réservés
        </footer>
      </div>
    </>
  );
}