export default function SectionTitle({ label, title }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
      <span style={{
        fontFamily: "'Orbitron', monospace", color: "rgba(0,255,231,0.2)",
        fontSize: "0.7rem", letterSpacing: "0.2em",
      }}>
        [{label}]
      </span>
      <h2 style={{
        fontFamily: "'Orbitron', monospace",
        fontSize: "clamp(1.4rem, 3vw, 2rem)",
        fontWeight: 700, color: "#fff", letterSpacing: "0.1em",
        textTransform: "uppercase",
      }}>
        {title}
      </h2>
      <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, rgba(0,255,231,0.3), transparent)" }} />
    </div>
  );
}