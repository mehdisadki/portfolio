export default function NavBar({ active, setActive }) {
  const links = ["accueil", "compétences", "formations", "expériences", "projets", "contact"];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "1.2rem 3rem",
      background: "rgba(2,6,18,0.85)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid rgba(0,255,231,0.12)",
    }}>
      <div style={{
        fontFamily: "'Orbitron', monospace", color: "#00ffe7",
        fontWeight: 700, fontSize: "1.1rem", letterSpacing: "0.2em",
      }}>
        MS<span style={{ color: "#fff", opacity: 0.3 }}>/DEV</span>
      </div>

      <div style={{ display: "flex", gap: "2rem" }}>
        {links.map((l) => (
          <button key={l} onClick={() => setActive(l)} style={{
            background: "none", border: "none", cursor: "pointer",
            color: active === l ? "#00ffe7" : "rgba(255,255,255,0.45)",
            fontFamily: "'Orbitron', monospace", fontSize: "0.7rem",
            letterSpacing: "0.15em", textTransform: "uppercase",
            transition: "color 0.2s",
            borderBottom: active === l ? "1px solid #00ffe7" : "1px solid transparent",
            paddingBottom: "2px",
          }}>
            {l}
          </button>
        ))}
      </div>
    </nav>
  );
}