import SectionTitle from "./SectionTitle";
import { EXPERIENCES } from "../data/index.js";

export default function ExperiencesSection() {
  return (
    <section style={{ padding: "6rem 3rem" }}>
      <SectionTitle label="04" title="Expériences" />
      <div style={{ marginTop: "3rem", position: "relative" }}>

        <div style={{
          position: "absolute", left: 110, top: 0, bottom: 0,
          width: 1, background: "linear-gradient(to bottom, #00ffe7, transparent)",
          opacity: 0.2,
        }} />

        {EXPERIENCES.length === 0 ? (
          <p style={{
            fontFamily: "'Courier New', monospace",
            color: "rgba(255,255,255,0.3)", fontSize: "0.85rem",
            marginLeft: "8rem",
          }}>
            &gt; Aucune expérience professionnelle pour le moment. En cours d'acquisition...
          </p>
        ) : (
          EXPERIENCES.map((exp, i) => (
            <div key={i} style={{ display: "flex", gap: "2rem", marginBottom: "3rem", alignItems: "flex-start" }}>
              <div style={{
                fontFamily: "'Courier New', monospace", color: "rgba(0,255,231,0.5)",
                fontSize: "0.7rem", minWidth: 100, paddingTop: "0.3rem", textAlign: "right",
              }}>
                {exp.date}
              </div>

              <div style={{
                width: 8, height: 8, borderRadius: "50%",
                background: "#00ffe7", marginTop: "0.5rem", flexShrink: 0,
                boxShadow: "0 0 10px #00ffe7",
              }} />

              <div style={{
                background: "rgba(0,255,231,0.03)",
                border: "1px solid rgba(0,255,231,0.1)",
                padding: "1.5rem", flex: 1,
              }}>
                <h3 style={{
                  fontFamily: "'Orbitron', monospace", color: "#fff",
                  fontSize: "0.9rem", letterSpacing: "0.1em", marginBottom: "0.3rem",
                }}>
                  {exp.title}
                </h3>
                <p style={{
                  color: "#00ffe7", fontFamily: "'Courier New', monospace",
                  fontSize: "0.75rem", marginBottom: "0.8rem", opacity: 0.7,
                }}>
                  {exp.company}
                </p>
                <p style={{
                  color: "rgba(255,255,255,0.5)", fontFamily: "'Courier New', monospace",
                  fontSize: "0.85rem", lineHeight: 1.7,
                }}>
                  {exp.desc}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}