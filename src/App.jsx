import { useState, useEffect, useRef } from "react";
import AppScreenshots from "./AppScreenshots";
// import Integrations from "./Integrations";

// ── Styles ────────────────────────────────────────────────────────────────────
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;500;600;700&family=Instrument+Sans:ital,wght@0,400;0,500;1,400&display=swap');

  :root {
    --bg: #0c0c0c;
    --surface: #161616;
    --border: #252525;
    --orange: #F07040;
    --orange-light: #FF8C5A;
    --orange-glow: rgba(240, 112, 64, 0.15);
    --text: #f0ede8;
    --muted: #888880;
    --warm: #2a1f18;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'Instrument Sans', sans-serif;
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* Grain overlay */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 100;
    opacity: 0.4;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.4; }
  }

  @keyframes scrollPulse {
    0%, 100% { opacity: 0.4; }
    50%       { opacity: 1; }
  }

  @keyframes badgeShimmer {
    0%, 100% { box-shadow: 0 0 0px rgba(240,112,64,0); }
    50% { box-shadow: 0 0 18px rgba(240,112,64,0.35); }
  }

  .anim-delay-1 { animation: fadeUp 0.6s 0.1s both; }
  .anim-delay-2 { animation: fadeUp 0.6s 0.2s both; }
  .anim-delay-3 { animation: fadeUp 0.6s 0.3s both; }
  .anim-delay-4 { animation: fadeUp 0.6s 0.4s both; }
  .anim-delay-5 { animation: fadeUp 0.6s 0.5s both; }
  .anim-delay-8 { animation: fadeUp 0.6s 0.8s both; }

  .badge-dot { animation: pulse 1s infinite; }
  .scroll-line { animation: scrollPulse 2s infinite; }

  .reveal {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.6s, transform 0.6s;
  }
  .reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    .nav-inner    { padding: 16px 24px !important; }
    .problem-grid { grid-template-columns: 1fr !important; }
    .quotes-grid  { grid-template-columns: 1fr !important; }
    .step-inner   { grid-template-columns: 1fr !important; gap: 8px !important; }
    .step-num     { font-size: 32px !important; }
    .signup-form  { flex-direction: column !important; }
    .footer-inner { flex-direction: column !important; gap: 12px !important; text-align: center !important; }
  }
`;

// ── Scroll Reveal Hook ────────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// ── Email Form ────────────────────────────────────────────────────────────────
function SignupForm({ id }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState("idle"); // idle | error | success
  const inputRef = useRef(null);

  const handleSubmit = async () => {
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes("@")) {
      setState("error");
      setTimeout(() => setState("idle"), 1000);
      return;
    }
    
    setState("success");
    await fetch("https://script.google.com/macros/s/AKfycbzn41PgLp-etm8NbuKs9BaKb_vWK5eDMshZVhyzAGEI5GEbYS_EP8Jznpobdsnly5Mlbg/exec", {
      method: "POST",
      // mode: "no-cors",
      body: JSON.stringify({ email: trimmed, timestamp: new Date().toISOString() }),
    });

    
  };

  const inputBorder =
    state === "error" ? "#e00055" : state === "idle" ? "var(--border)" : "var(--border)";

  return (
    <div style={{ width: "100%", maxWidth: 460 }}>
      <div
        className="signup-form"
        style={{ display: "flex", gap: 8, width: "100%" }}
      >
        <input
          ref={inputRef}
          type="email"
          id={id}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="your@email.com"
          disabled={state === "success"}
          style={{
            flex: 1,
            background: "var(--surface)",
            border: `1px solid ${inputBorder}`,
            borderRadius: 100,
            color: "var(--text)",
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: 15,
            padding: "14px 24px",
            outline: "none",
            transition: "border-color 0.2s",
          }}
        />
        <button
          onClick={handleSubmit}
          disabled={state === "success"}
          style={{
            background: state === "success" ? "#3a7d44" : "var(--orange)",
            color: "#fff",
            border: "none",
            borderRadius: 100,
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: 15,
            fontWeight: 500,
            padding: "14px 28px",
            cursor: state === "success" ? "default" : "pointer",
            transition: "all 0.2s",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => state !== "success" && (e.target.style.background = "var(--orange-light)")}
          onMouseLeave={(e) => state !== "success" && (e.target.style.background = "var(--orange)")}
        >
          {state === "success" ? "✓ You're in" : id === "heroEmail" ? "Join Waitlist" : "Get Early Access"}
        </button>
      </div>
      {state === "success" && (
        <p style={{ color: "var(--orange-light)", fontSize: 14, marginTop: 12 }}>
          You're on the list. We'll be in touch soon.
        </p>
      )}
    </div>
  );
}

// ── Nav ───────────────────────────────────────────────────────────────────────
function Nav() {
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      backdropFilter: "blur(12px)",
      background: "rgba(12, 12, 12, 0.8)",
      borderBottom: "1px solid var(--border)",
    }}>
      <div className="nav-inner" style={{
        padding: "20px 48px", display: "flex",
        alignItems: "center", justifyContent: "space-between",
      }}>
        <a href="#" style={{
          display: "flex", alignItems: "center", gap: 10,
          fontFamily: "'Clash Display', sans-serif", fontSize: 20,
          fontWeight: 600, color: "var(--text)", textDecoration: "none",
        }}>
          <div style={{
            width: 32, height: 32, background: "var(--orange)",
            borderRadius: 8, display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: 16,
          }}>✦</div>
          EchoFeed
        </a>
        <a
          href="#signup"
          style={{
            background: "var(--orange)", color: "#fff", border: "none",
            padding: "10px 24px", borderRadius: 100,
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: 14, fontWeight: 500, cursor: "pointer",
            transition: "all 0.2s", textDecoration: "none",
            display: "inline-block",
          }}
          onMouseEnter={(e) => { e.target.style.background = "var(--orange-light)"; e.target.style.transform = "translateY(-1px)"; }}
          onMouseLeave={(e) => { e.target.style.background = "var(--orange)"; e.target.style.transform = ""; }}
        >
          Join Waitlist
        </a>
      </div>
    </nav>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section style={{
      minHeight: "50vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "150px 24px 80px", textAlign: "center", position: "relative",
    }}>
      {/* Glow */}
      <div style={{
        position: "absolute", top: "20%", left: "50%",
        transform: "translateX(-50%)", width: 600, height: 600,
        background: "radial-gradient(circle, rgba(240,112,64,0.12) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Badge */}
      <div className="anim-delay-1" style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        background: "var(--warm)", border: "1px solid rgba(240,112,64,0.3)",
        borderRadius: 100, padding: "6px 16px", fontSize: 13,
        color: "var(--orange-light)", marginBottom: 32,
      }}>
        <span className="badge-dot" style={{
          width: 6, height: 6, background: "var(--orange)", borderRadius: "50%",
        }} />
        Now accepting early access
      </div>

      {/* Headline */}
      <h1 className="anim-delay-2" style={{
        fontFamily: "'Clash Display', sans-serif",
        fontSize: "clamp(42px, 7vw, 88px)",
        fontWeight: 600, lineHeight: 1.0, letterSpacing: "-0.03em",
        maxWidth: 900, marginBottom: 24,
      }}>
        Your saved videos.<br />
        <em style={{ fontStyle: "normal", color: "var(--orange)" }}>Finally working</em><br />
        for you.
      </h1>

      {/* Subheading */}
      <p className="anim-delay-3" style={{
        fontSize: 18, color: "var(--muted)", maxWidth: 520,
        lineHeight: 1.6, marginBottom: 48,
      }}>
        You save motivational content every day — then never go back to it.
        EchoFeed turns those saves into a{" "}
        <strong style={{ color: "var(--text)", fontWeight: 500 }}>personalized podcast</strong>{" "}
        that replays the ideas you already believe, until they actually stick.
      </p>


      {/* Signup */}
      <div className="anim-delay-4" id="waitlist" style={{ display: "flex", justifyContent: "center", width: "100%", maxWidth: 460,
       }}>
        <SignupForm id="heroEmail" />
      </div>

      <p className="anim-delay-5" style={{ marginTop: 16, fontSize: 13, color: "var(--muted)" }}>
        No spam. Early access only. Be the first to try it.
      </p>

      {/* Scroll hint */}
      <div className="anim-delay-8" style={{
        position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
        color: "var(--muted)", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase",
      }}>
        {/* <div className="scroll-line" style={{
          width: 1, height: 40,
          background: "linear-gradient(to bottom, var(--orange), transparent)",
        }} /> */}
      </div>
    </section>
  );
}

// ── Problem Section ───────────────────────────────────────────────────────────
const problems = [
  { num: "86%", label: "Save Regularly",       desc: "of people save motivational or mindset content on TikTok, Instagram, or YouTube at least a few times a month" },
  { num: "34%", label: "Never Go Back",         desc: "haven't rewatched saved content in months — or ever. The inspiration was real. The follow-through wasn't." },
  { num: "10s", label: "Motivation Window",     desc: "That's how long the feeling lasts after a motivational video before you scroll to the next thing" },
  { num: "0",   label: "Systems That Fix This", desc: "There is no product that turns what you intentionally save into something that actually compounds over time. Until now." },
];

function ProblemSection() {
  return (
    <div className="section reveal" style={{ padding: "10px 36px", maxWidth: 1250, margin: "0 auto" }}>
      <div style={{ fontSize: 12, fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--orange)", marginBottom: 20 }}>
        The Problem
      </div>
      <h2 style={{ fontFamily: "'Clash Display', sans-serif", fontSize: "clamp(32px,4vw,52px)", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.1, maxWidth: 640 }}>
        You save it.<br /><em style={{ fontStyle: "normal", color: "var(--orange)" }}>Then forget it.</em>
      </h2>

      <div className="problem-grid" style={{
        display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: 2, marginTop: 60, borderRadius: 20, overflow: "hidden",
      }}>
        {problems.map((p, i) => (
          <div key={i} style={{
            background: "var(--surface)", padding: 48,
            borderTop: i >= 2 ? "2px solid var(--bg)" : undefined,
          }}>
            <div style={{ fontFamily: "'Clash Display', sans-serif", fontSize: 64, fontWeight: 600, color: "var(--orange)", lineHeight: 1, marginBottom: 12 }}>{p.num}</div>
            <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>{p.label}</div>
            <div style={{ fontSize: 16, color: "var(--text)", lineHeight: 1.5 }}>{p.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── How It Works ──────────────────────────────────────────────────────────────
const steps = [
  { num: "01", tag: "Zero friction",    title: "Save like you already do",        desc: "When something resonates on TikTok or Instagram, share it to EchoFeed. One extra tap. That's the entire behavior change ask." },
  { num: "02", tag: "AI-powered",       title: "We extract what matters",          desc: "EchoFeed analyzes your saved content, finds the recurring themes and principles, and builds a personal profile of the ideas you keep coming back to." },
  { num: "03", tag: "Your voice, your ideas", title: "Get your personalized episode", desc: "Every day or week, you receive a short audio episode built entirely from your own saves — your ideas, repeated back to you until they actually change something." },
  { num: "04", tag: "In the moment",    title: "Chat when you need it most",       desc: "Before a hard decision, a workout, a difficult conversation — open the AI chat. It responds using your saved content, not generic advice. Your own beliefs, applied right now." },
];

function HowItWorksSection() {
  return (
    <div className="section reveal" style={{ padding: "100px 36px", maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ fontSize: 12, fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--orange)", marginBottom: 20 }}>
        How It Works
      </div>
      <h2 style={{ fontFamily: "'Clash Display', sans-serif", fontSize: "clamp(32px,4vw,52px)", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.1, maxWidth: 640 }}>
        One tap.<br /><em style={{ fontStyle: "normal", color: "var(--orange)" }}>Infinite reinforcement.</em>
      </h2>

      <div style={{ marginTop: 60, display: "flex", flexDirection: "column", gap: 2 }}>
        {steps.map((s, i) => (
          <div key={i} className="step-inner" style={{
            display: "grid", gridTemplateColumns: "80px 1fr", gap: 32,
            alignItems: "start", background: "var(--surface)", padding: "40px 48px",
            borderRadius: i === 0 ? "20px 20px 0 0" : i === steps.length - 1 ? "0 0 20px 20px" : 0,
          }}>
            <div className="step-num" style={{ fontFamily: "'Clash Display', sans-serif", fontSize: 48, fontWeight: 600, color: "var(--border)", lineHeight: 1 }}>{s.num}</div>
            <div>
              <div style={{ display: "inline-block", background: "var(--warm)", border: "1px solid rgba(240,112,64,0.2)", color: "var(--orange-light)", fontSize: 12, padding: "3px 10px", borderRadius: 100, marginBottom: 10 }}>{s.tag}</div>
              <div style={{ fontFamily: "'Clash Display', sans-serif", fontSize: 22, fontWeight: 600, marginBottom: 8, color: "var(--text)" }}>{s.title}</div>
              <div style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.6 }}>{s.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Quotes ────────────────────────────────────────────────────────────────────
const quotes = [
  { text: "Knowing that it's personalized to me and what I'm going through — that's what would make me actually listen every week." },
  { text: "If it could automatically create a playlist like the Spotify daylist, I would keep coming back to it." },
  { text: "It provides actionable insights in a way that is personalized. That's what I'd need." },
  { text: "If it managed to pop up at the right time during downtime — that would be the hook for me." },
];

function QuotesSection() {
  return (
    <div className="section reveal" style={{ padding: "50px 24px", maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ fontSize: 12, fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--orange)", marginBottom: 20 }}>
        Early Signals
      </div>
      <h2 style={{ fontFamily: "'Clash Display', sans-serif", fontSize: "clamp(32px,4vw,52px)", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.1, maxWidth: 640 }}>
        Real people.<br /><em style={{ fontStyle: "normal", color: "var(--orange)" }}>Real reactions.</em>
      </h2>

      <div className="quotes-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 60 }}>
        {quotes.map((q, i) => (
          <div key={i} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: 32, position: "relative" }}>
            <span style={{ fontFamily: "'Clash Display', sans-serif", fontSize: 48, color: "var(--orange)", lineHeight: 0.8, marginBottom: 16, display: "block" }}>"</span>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: "var(--text)", fontStyle: "italic", marginBottom: 20 }}>{q.text}</p>
            <div style={{ fontSize: 13, color: "var(--muted)" }}>Survey respondent, Cornell Tech</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Final CTA ─────────────────────────────────────────────────────────────────
function FinalCTA() {
  return (
    <div className="reveal" id="signup" style={{ padding: "120px 24px", textAlign: "center", position: "relative" }}>
      <div style={{
        position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: 800, height: 400,
        background: "radial-gradient(ellipse, rgba(240,112,64,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <h2 style={{ fontFamily: "'Clash Display', sans-serif", fontSize: "clamp(32px,5vw,64px)", fontWeight: 600, letterSpacing: "-0.02em", maxWidth: 700, margin: "0 auto 16px", lineHeight: 1.1 }}>
        You already choose<br />what inspires you.<br />
        <em style={{ fontStyle: "normal", color: "var(--orange)" }}>We make it stick.</em>
      </h2>
      <p style={{ color: "var(--muted)", fontSize: 17, marginBottom: 40 }}>
        Join the waitlist. Be first to try EchoFeed.
      </p>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <SignupForm id="footerEmail" />
      </div>
    </div>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)" }}>
      <div className="footer-inner" style={{ padding: "32px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", color: "var(--muted)", fontSize: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "'Clash Display', sans-serif", fontSize: 16, color: "var(--text)", textDecoration: "none" }}>
          <div style={{ width: 24, height: 24, background: "var(--orange)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>✦</div>
          EchoFeed
        </div>
        <div>© 2026 EchoFeed. Built at Cornell Tech.</div>
      </div>
    </footer>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  useScrollReveal();

  return (
    <>
      <style>{globalStyles}</style>
      <Nav />
      <Hero />
      <AppScreenshots />
      <ProblemSection />
      <HowItWorksSection />
      <QuotesSection />
      <FinalCTA />
      <Footer />
    </>
  );
}
