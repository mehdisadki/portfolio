import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import SectionTitle from "./SectionTitle";

export default function ContactSection() {
  const formRef = useRef();
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      formRef.current.reset();
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  const inputStyle = {
    background: "rgba(0,255,231,0.03)",
    border: "1px solid rgba(0,255,231,0.18)",
    color: "#fff", padding: "1rem 1.2rem",
    fontFamily: "'Courier New', monospace", fontSize: "0.9rem",
    outline: "none", width: "100%",
    transition: "border-color 0.2s",
  };

  return (
    <section style={{ padding: "6rem 3rem" }}>
      <SectionTitle label="06" title="Contact" />

      <div style={{ display: "flex", gap: "4rem", marginTop: "3rem", flexWrap: "wrap" }}>

        {/* Infos à gauche */}
        <div style={{ minWidth: 220 }}>
          <p style={{
            fontFamily: "'Courier New', monospace",
            color: "rgba(255,255,255,0.4)", fontSize: "0.85rem",
            lineHeight: 1.9, marginBottom: "2rem",
          }}>
            &gt; Une question, une opportunité<br />
            &gt; ou juste envie d'échanger ?<br />
            &gt; Je réponds rapidement.
          </p>

          {[
            { label: "EMAIL", value: "mehdi.sadki@email.com", href: "mailto:mehdi.sadki@email.com" },
            { label: "GITHUB", value: "github.com/mehdi-sadki", href: "https://github.com/mehdi-sadki" },
            { label: "LINKEDIN", value: "linkedin.com/in/mehdi-sadki", href: "https://linkedin.com/in/mehdi-sadki" },
          ].map((item) => (
            <div key={item.label} style={{ marginBottom: "1.2rem" }}>
              <p style={{
                fontFamily: "'Orbitron', monospace", fontSize: "0.6rem",
                color: "rgba(0,255,231,0.4)", letterSpacing: "0.25em", marginBottom: "0.3rem",
              }}>
                {item.label}
              </p>
              <a href={item.href} target="_blank" rel="noreferrer" style={{
                fontFamily: "'Courier New', monospace", fontSize: "0.82rem",
                color: "rgba(255,255,255,0.55)", textDecoration: "none",
                transition: "color 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.color = "#00ffe7"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.55)"}
              >
                {item.value}
              </a>
            </div>
          ))}
        </div>

        {/* Formulaire à droite */}
        <div style={{ flex: 1, minWidth: 300, maxWidth: 540 }}>

          {/* Terminal header */}
          <div style={{
            display: "flex", alignItems: "center", gap: "0.4rem",
            padding: "0.7rem 1rem",
            background: "rgba(0,255,231,0.05)",
            border: "1px solid rgba(0,255,231,0.1)",
            borderBottom: "none",
          }}>
            {["#ff5f57", "#febc2e", "#28c840"].map((c, i) => (
              <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: 0.8 }} />
            ))}
            <span style={{
              fontFamily: "'Courier New', monospace", fontSize: "0.7rem",
              color: "rgba(0,255,231,0.4)", letterSpacing: "0.1em", marginLeft: "0.5rem",
            }}>
              mehdi@portfolio:~/contact
            </span>
          </div>

          {status === "success" ? (
            <div style={{
              border: "1px solid rgba(0,255,231,0.2)",
              padding: "2.5rem 2rem",
              fontFamily: "'Courier New', monospace",
              background: "rgba(0,255,231,0.02)",
            }}>
              <p style={{ color: "#00ffe7", fontSize: "0.85rem", lineHeight: 2 }}>
                &gt; Message envoyé avec succès.<br />
                &gt; Je reviens vers toi rapidement.<br />
                <span style={{ opacity: 0.4 }}>&gt; Merci ! ✓</span>
              </p>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} style={{
              display: "flex", flexDirection: "column", gap: "1rem",
              border: "1px solid rgba(0,255,231,0.1)",
              padding: "1.5rem",
              background: "rgba(0,255,231,0.01)",
            }}>
              <input
                type="text" name="from_name" placeholder="Ton nom"
                required
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = "#00ffe7"}
                onBlur={e => e.target.style.borderColor = "rgba(0,255,231,0.18)"}
              />
              <input
                type="email" name="from_email" placeholder="Ton email"
                required
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = "#00ffe7"}
                onBlur={e => e.target.style.borderColor = "rgba(0,255,231,0.18)"}
              />
              <textarea
                name="message" placeholder="Ton message..."
                required rows={5}
                style={{ ...inputStyle, resize: "vertical" }}
                onFocus={e => e.target.style.borderColor = "#00ffe7"}
                onBlur={e => e.target.style.borderColor = "rgba(0,255,231,0.18)"}
              />

              {status === "error" && (
                <p style={{
                  fontFamily: "'Courier New', monospace", fontSize: "0.75rem",
                  color: "#ff5f57",
                }}>
                  &gt; Erreur lors de l'envoi. Réessaie ou contacte-moi directement par email.
                </p>
              )}

              <button type="submit" disabled={status === "loading"} style={{
                background: "transparent", border: "1px solid #00ffe7",
                color: "#00ffe7", padding: "1rem 2rem",
                fontFamily: "'Orbitron', monospace", fontSize: "0.75rem",
                letterSpacing: "0.2em", cursor: status === "loading" ? "not-allowed" : "pointer",
                alignSelf: "flex-start", transition: "all 0.3s",
                opacity: status === "loading" ? 0.5 : 1,
                display: "flex", alignItems: "center", gap: "0.6rem",
              }}
                onMouseEnter={e => {
                  if (status !== "loading") {
                    e.currentTarget.style.background = "rgba(0,255,231,0.1)";
                    e.currentTarget.style.boxShadow = "0 0 20px rgba(0,255,231,0.2)";
                  }
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {status === "loading" ? (
                  <><span style={{ animation: "blink 0.8s infinite" }}>█</span> ENVOI EN COURS...</>
                ) : (
                  "ENVOYER"
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}