// Decorative hero illustration — "Layered System Stack": a database cylinder →
// API/logic node → UI dashboard card, connected by thin lines with data pulses
// flowing upward (database → interface). Pure inline SVG: no image deps, GPU-only
// CSS animation, aria-hidden. Colors come from theme tokens (fill-/stroke-/text-
// utilities), so it re-themes with light/dark automatically. All motion is killed
// by the global prefers-reduced-motion rule in index.css.
export default function HeroVisual() {
  return (
    <svg
      viewBox="0 0 360 470"
      role="img"
      aria-hidden="true"
      focusable="false"
      className="h-auto w-full max-w-[420px]"
    >
      <defs>
        <radialGradient id="hvGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.35" className="text-accent" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" className="text-accent" />
        </radialGradient>
      </defs>

      {/* Ambient glow behind the dashboard and the database */}
      <circle cx="180" cy="98" r="120" fill="url(#hvGlow)" className="hv-glow" />
      <circle cx="180" cy="372" r="95" fill="url(#hvGlow)" className="hv-glow" style={{ animationDelay: '1.4s' }} />

      <g className="hv-float">
        {/* ---- Connectors (drawn first, behind the nodes) ---- */}
        <g className="stroke-line" strokeWidth="1.5" strokeLinecap="round">
          <line x1="180" y1="168" x2="180" y2="208" />
          <line x1="180" y1="288" x2="180" y2="316" />
        </g>
        {/* Upward-flowing data pulses */}
        <circle r="3.5" cx="180" cy="206" className="hv-flow fill-accent" style={{ '--hv-d': '-38px' }} />
        <circle r="3.5" cx="180" cy="314" className="hv-flow fill-accent" style={{ '--hv-d': '-26px', animationDelay: '1.2s' }} />

        {/* ================= INTERFACE LAYER — dashboard card ================= */}
        <g>
          <rect x="64" y="24" width="232" height="144" rx="12" className="fill-surface stroke-line" strokeWidth="1.5" />
          {/* window dots + title */}
          <circle cx="80" cy="42" r="3" className="fill-line" />
          <circle cx="90" cy="42" r="3" className="fill-line" />
          <circle cx="100" cy="42" r="3" className="fill-line" />
          <rect x="200" y="39" width="80" height="6" rx="3" className="fill-line" />
          {/* stat cards */}
          <rect x="80" y="62" width="92" height="40" rx="6" className="fill-bg stroke-line" strokeWidth="1.25" />
          <rect x="90" y="72" width="34" height="5" rx="2.5" className="fill-line" />
          <rect x="90" y="84" width="52" height="8" rx="3" className="fill-accent" />
          <rect x="188" y="62" width="92" height="40" rx="6" className="fill-bg stroke-line" strokeWidth="1.25" />
          <rect x="198" y="72" width="34" height="5" rx="2.5" className="fill-line" />
          <rect x="198" y="84" width="44" height="8" rx="3" className="fill-accent/60" />
          {/* mini bar chart */}
          <g className="fill-accent">
            <rect x="86" y="138" width="13" height="14" rx="2" className="fill-accent/40" />
            <rect x="108" y="128" width="13" height="24" rx="2" className="fill-accent/60" />
            <rect x="130" y="118" width="13" height="34" rx="2" className="fill-accent" />
            <rect x="152" y="132" width="13" height="20" rx="2" className="fill-accent/50" />
            <rect x="174" y="124" width="13" height="28" rx="2" className="fill-accent/70" />
          </g>
          <line x1="80" y1="153" x2="282" y2="153" className="stroke-line" strokeWidth="1" />
        </g>

        {/* ================= LOGIC LAYER — API / backend node ================= */}
        <g>
          <rect x="104" y="208" width="152" height="80" rx="12" className="fill-surface stroke-line" strokeWidth="1.5" />
          {/* code lines */}
          <rect x="124" y="228" width="58" height="6" rx="3" className="fill-line" />
          <rect x="124" y="242" width="86" height="6" rx="3" className="fill-line" />
          <rect x="124" y="256" width="40" height="6" rx="3" className="fill-line" />
          {/* endpoint node */}
          <circle cx="226" cy="244" r="11" className="fill-accent/15 stroke-accent" strokeWidth="1.5" />
          <circle cx="226" cy="244" r="3.5" className="fill-accent" />
        </g>

        {/* ================= DATA LAYER — database cylinder ================= */}
        <g className="fill-surface stroke-line" strokeWidth="1.5">
          <path d="M128 332 v72 a52 13 0 0 0 104 0 v-72" />
          <ellipse cx="180" cy="358" rx="52" ry="13" fill="none" className="stroke-line" strokeWidth="1.25" />
          <ellipse cx="180" cy="384" rx="52" ry="13" fill="none" className="stroke-line" strokeWidth="1.25" />
          <ellipse cx="180" cy="332" rx="52" ry="13" className="fill-bg stroke-line" />
          <circle cx="158" cy="332" r="2.5" className="fill-accent" stroke="none" />
        </g>

        {/* ---- Faint floating architecture chips ---- */}
        <g className="opacity-60">
          <line x1="296" y1="80" x2="324" y2="64" className="stroke-line" strokeWidth="1.25" />
          <circle cx="328" cy="62" r="4" className="fill-accent" />
          <rect x="14" y="250" width="46" height="22" rx="6" className="fill-surface stroke-line" strokeWidth="1.25" />
          <circle cx="26" cy="261" r="3" className="fill-accent" />
          <rect x="34" y="258" width="18" height="5" rx="2.5" className="fill-line" />
        </g>
      </g>
    </svg>
  );
}
