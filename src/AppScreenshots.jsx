// AppScreenshots.jsx
// Drop this component into App.jsx between the Hero and ProblemSection.
// Usage: import AppScreenshots from "./AppScreenshots";
//        then place <AppScreenshots /> in your JSX.
import Integrations from "./Integrations";

const screens = [
  {
    id: "home",
    label: "Your daily feed",
    headline: "Everything you saved,\nready when you are.",
    accent: "#F07040",
    // Replace the src below with your real screenshot
    imgSrc: '/screen1.PNG',
    imgAlt: "EchoFeed home screen — personalized feed of saved content",
    // Placeholder description shown inside the phone frame when no image
    placeholderLines: ["Today's Feed", "3 episodes ready", "12 saves this week"],
  },
  {
    id: "listen",
    label: "Podcast experience",
    headline: "Your beliefs,\nplaying in your ears.",
    accent: "#FF8C5A",
    imgSrc: '/screen2.PNG', // Replace with your screenshot path
    imgAlt: "EchoFeed podcast player — personalized audio episode",
    placeholderLines: ["Now Playing", "Episode #14", "22 min · Your saves"],
  },
  {
    id: "chat",
    label: "AI coach",
    headline: "Ask anything.\nGet answers from you.",
    accent: "#F07040",
    imgSrc: '/screen3.PNG', // Replace with your screenshot path
    imgAlt: "EchoFeed chat — AI coach responding with your saved content",
    placeholderLines: ["EchoFeed AI", "Based on your saves…", "3 insights found"],
  },
];

// ─── Individual phone card ────────────────────────────────────────────────────
function PhoneCard({ screen, index }) {
  // Slight tilt for the app-store aesthetic
  const tilts = ["-4deg", "0deg", "4deg"];
  const tilt = tilts[index] || "0deg";
  const delays = ["0s", "0.12s", "0.24s"];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
        animation: `phoneReveal 0.7s ${delays[index]} both`,
      }}
    >
      {/* Phone frame */}
      <div
        style={{
          transform: `rotate(${tilt})`,
          transition: "transform 0.3s ease",
          cursor: "default",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "rotate(0deg) scale(1.03)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = `rotate(${tilt})`)}
      >
        {/* Outer bezel */}
        <div
          style={{
            width: 283,
            height: 591,
            background: "#111",
            borderRadius: 36,
            padding: 6,
            boxShadow: "0 0 0 1px #333, 0 32px 64px rgba(0,0,0,0.6)",
            position: "relative",
          }}
        >
          {/* Dynamic island */}
          <div
            style={{
              position: "absolute",
              top: 14,
              left: "50%",
              transform: "translateX(-50%)",
              width: 80,
              height: 24,
              background: "#000",
              borderRadius: 12,
              zIndex: 10,
            }}
          />

          {/* Screen area */}
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 31,
              overflow: "hidden",
              background: "#0c0c0c",
              position: "relative",
            }}
          >
            {screen.imgSrc ? (
              <img
                src={screen.imgSrc}
                alt={screen.imgAlt}
                style={{ width: "100%", 
                  height: "100%", 
                  objectFit: "cover", 
                  imageRendering: "high-quality", 
                  WebkitBackfaceVisibility: "hidden",
                  transformStyle: "preserve-3d", // Add this
                  willChange: "transform",       // Add this 
                  objectPosition: "50% 4%"
                }}
              />
            ) : (
              // ── Placeholder ──
              <Placeholder screen={screen} />
            )}
          </div>
        </div>
      </div>

      {/* Caption below phone */}
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            display: "inline-block",
            background: "rgba(240,112,64,0.12)",
            border: "1px solid rgba(240,112,64,0.25)",
            color: screen.accent,
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            padding: "4px 12px",
            borderRadius: 100,
            marginBottom: 10,
          }}
        >
          {screen.label}
        </div>
        <div
          style={{
            fontFamily: "'Clash Display', sans-serif",
            fontSize: 16,
            fontWeight: 600,
            color: "#f0ede8",
            lineHeight: 1.25,
            letterSpacing: "-0.01em",
            whiteSpace: "pre-line",
          }}
        >
          {screen.headline}
        </div>
      </div>
    </div>
  );
}

// ─── Placeholder screen contents (swap with real <img> later) ────────────────
function Placeholder({ screen }) {
  const configs = {
    home: <HomePlaceholder />,
    listen: <ListenPlaceholder />,
    chat: <ChatPlaceholder />,
  };
  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      {configs[screen.id] || <GenericPlaceholder lines={screen.placeholderLines} />}
    </div>
  );
}

function HomePlaceholder() {
  const saves = [
    { emoji: "🎙️", title: "Daily episode ready", sub: "22 min · 8 saves distilled", hot: true },
    { emoji: "⚡", title: "Discipline over motivation", sub: "TikTok · saved 3 days ago" },
    { emoji: "🧠", title: "The 5am mindset shift", sub: "Instagram · saved last week" },
    { emoji: "💬", title: "Stoic thinking, applied", sub: "YouTube · saved 2 weeks ago" },
  ];
  return (
    <div style={{ padding: "48px 12px 12px", height: "100%", display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ color: "#888", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 2 }}>Good morning</div>
      <div style={{ fontFamily: "'Clash Display', sans-serif", color: "#f0ede8", fontSize: 16, fontWeight: 600, marginBottom: 10 }}>Your EchoFeed</div>
      {saves.map((s, i) => (
        <div key={i} style={{
          background: s.hot ? "rgba(240,112,64,0.15)" : "#161616",
          border: `1px solid ${s.hot ? "rgba(240,112,64,0.4)" : "#252525"}`,
          borderRadius: 12,
          padding: "10px 10px",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}>
          <div style={{ fontSize: 16, lineHeight: 1 }}>{s.emoji}</div>
          <div>
            <div style={{ color: "#f0ede8", fontSize: 10, fontWeight: 500, lineHeight: 1.3 }}>{s.title}</div>
            <div style={{ color: "#888", fontSize: 9, marginTop: 1 }}>{s.sub}</div>
          </div>
          {s.hot && <div style={{ marginLeft: "auto", width: 6, height: 6, borderRadius: "50%", background: "#F07040", flexShrink: 0 }} />}
        </div>
      ))}
    </div>
  );
}

function ListenPlaceholder() {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", padding: "52px 16px 20px" }}>
      {/* Album art */}
      <div style={{
        width: 130, height: 130, borderRadius: 20,
        background: "linear-gradient(135deg, #2a1f18 0%, #3d2515 100%)",
        border: "1px solid rgba(240,112,64,0.3)",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        marginBottom: 18, flexShrink: 0,
      }}>
        <div style={{ fontSize: 28, marginBottom: 4 }}>🎙️</div>
        <div style={{ color: "#F07040", fontFamily: "'Clash Display', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.05em" }}>ECHOFEED</div>
        <div style={{ color: "#888", fontSize: 9, marginTop: 2 }}>Episode #14</div>
      </div>

      <div style={{ color: "#f0ede8", fontFamily: "'Clash Display', sans-serif", fontSize: 13, fontWeight: 600, textAlign: "center", marginBottom: 4 }}>Your Weekly Echo</div>
      <div style={{ color: "#888880", fontSize: 9, marginBottom: 16 }}>Built from 8 of your saves</div>

      {/* Progress bar */}
      <div style={{ width: "100%", marginBottom: 8 }}>
        <div style={{ height: 3, background: "#252525", borderRadius: 2, overflow: "hidden" }}>
          <div style={{ width: "38%", height: "100%", background: "#F07040", borderRadius: 2 }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
          <span style={{ color: "#888", fontSize: 8 }}>8:22</span>
          <span style={{ color: "#888", fontSize: 8 }}>22:14</span>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 4 }}>
        <div style={{ color: "#888", fontSize: 16 }}>⏮</div>
        <div style={{
          width: 40, height: 40, borderRadius: "50%",
          background: "#F07040",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 16,
        }}>▶</div>
        <div style={{ color: "#888", fontSize: 16 }}>⏭</div>
      </div>

      {/* Tags */}
      <div style={{ display: "flex", gap: 6, marginTop: 14, flexWrap: "wrap", justifyContent: "center" }}>
        {["Discipline", "Mindset", "Focus"].map((t) => (
          <div key={t} style={{
            background: "#2a1f18", border: "1px solid rgba(240,112,64,0.2)",
            color: "#FF8C5A", fontSize: 8, padding: "3px 8px", borderRadius: 100,
          }}>{t}</div>
        ))}
      </div>
    </div>
  );
}

function ChatPlaceholder() {
  const messages = [
    { role: "user", text: "I keep giving up on hard things. What did I save about this?" },
    { role: "ai", text: "From your saves: you bookmarked 3 videos about discipline over motivation. The common thread was this — action creates clarity, not the other way around.", saves: 3 },
    { role: "user", text: "Which one hit hardest?" },
    { role: "ai", text: "The one you saved twice — \"You don't rise to the level of your goals, you fall to the level of your systems.\"", saves: null },
  ];
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", padding: "44px 10px 10px" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, paddingBottom: 8, borderBottom: "1px solid #252525" }}>
        <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#F07040", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10 }}>✦</div>
        <div>
          <div style={{ color: "#f0ede8", fontSize: 10, fontWeight: 500 }}>EchoFeed AI</div>
          <div style={{ color: "#888", fontSize: 8 }}>Your personal coach</div>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8, overflow: "hidden" }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
            <div style={{
              maxWidth: "85%",
              background: m.role === "user" ? "#F07040" : "#161616",
              border: m.role === "ai" ? "1px solid #252525" : "none",
              borderRadius: m.role === "user" ? "12px 12px 4px 12px" : "12px 12px 12px 4px",
              padding: "7px 9px",
            }}>
              {m.saves && (
                <div style={{ color: "#FF8C5A", fontSize: 7, marginBottom: 4, display: "flex", alignItems: "center", gap: 3 }}>
                  <span>✦</span> From {m.saves} of your saves
                </div>
              )}
              <div style={{ color: m.role === "user" ? "#fff" : "#f0ede8", fontSize: 9, lineHeight: 1.45 }}>{m.text}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div style={{
        marginTop: 10, background: "#161616", border: "1px solid #252525",
        borderRadius: 20, padding: "7px 12px", display: "flex", alignItems: "center", gap: 6,
      }}>
        <div style={{ color: "#888", fontSize: 9, flex: 1 }}>Ask anything…</div>
        <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#F07040", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, color: "#fff" }}>↑</div>
      </div>
    </div>
  );
}

function GenericPlaceholder({ lines }) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
      {lines.map((l, i) => (
        <div key={i} style={{ color: i === 0 ? "#F07040" : "#888", fontSize: i === 0 ? 13 : 11 }}>{l}</div>
      ))}
    </div>
  );
}

// ─── Main exported component ──────────────────────────────────────────────────
export default function AppScreenshots() {
  return (
    <section style={{ padding: "0px 24px 80px", position: "relative", overflow: "hidden" }}>
      <style>{`
        @keyframes phoneReveal {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Subtle background glow */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: 800, height: 500,
        background: "radial-gradient(ellipse, rgba(240,112,64,0.07) 0%, transparent 80%)",
        pointerEvents: "none",
      }} />

      {/* Section label */}
      <div style={{ textAlign: "center", marginBottom: 12 }}>
        <div style={{
          display: "inline-block",
          fontSize: 12, fontWeight: 500, letterSpacing: "0.15em",
          textTransform: "uppercase", color: "#F07040",
        }}>
          See it in action
        </div>
      </div>

      <div style={{
        fontFamily: "'Clash Display', sans-serif",
        fontSize: "clamp(26px, 3.5vw, 42px)",
        fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.1,
        textAlign: "center", color: "#f0ede8",
        marginBottom: 56,
      }}>
        Built around your saves.<br />
        <em style={{ fontStyle: "normal", color: "#F07040" }}>Not someone else's.</em>
      </div>

      {/* Integrations centered */}
      <Integrations />  

      {/* Phone shelf */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        gap: "clamp(24px, 4vw, 56px)",
        flexWrap: "wrap",
      }}>
        {screens.map((screen, i) => (
          <PhoneCard key={screen.id} screen={screen} index={i} />
        ))}
      </div>

    </section>
  );
}
