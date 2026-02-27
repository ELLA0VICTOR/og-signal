const CFG = {
  BUY:  { color: "#4ade80", bg: "rgba(74,222,128,0.04)",  border: "rgba(74,222,128,0.18)"  },
  SELL: { color: "#f87171", bg: "rgba(248,113,113,0.04)", border: "rgba(248,113,113,0.18)" },
  HOLD: { color: "#fbbf24", bg: "rgba(251,191,36,0.04)",  border: "rgba(251,191,36,0.18)"  },
};

const RISK_COLOR = {
  LOW:    "var(--buy)",
  MEDIUM: "var(--hold)",
  HIGH:   "var(--sell)",
};

function ConfidenceArc({ value, color }) {
  const r = 28;
  const circ = 2 * Math.PI * r;
  const filled = (value / 100) * circ;

  return (
    <div className="relative flex items-center justify-center" style={{ width: 72, height: 72 }}>
      <svg width={72} height={72} viewBox="0 0 72 72" style={{ transform: "rotate(-90deg)" }}>
        <circle cx={36} cy={36} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={4} />
        <circle
          cx={36} cy={36} r={r} fill="none"
          stroke={color} strokeWidth={4} strokeLinecap="round"
          strokeDasharray={`${filled} ${circ - filled}`}
        />
      </svg>
      <div
        className="absolute font-mono text-sm font-medium"
        style={{ color, fontSize: "0.75rem" }}
      >
        {value}%
      </div>
    </div>
  );
}

export default function SignalVerdict({ signal, confidence, riskLevel, timeframe }) {
  const cfg = CFG[signal] || CFG.HOLD;

  return (
    <div
      className="px-5 py-5"
      style={{
        background: cfg.bg,
        border: `1px solid ${cfg.border}`,
        borderRadius: "6px",
      }}
    >
      <div className="flex items-center justify-between">
        {/* Left: signal + meta */}
        <div className="space-y-2">
          <div
            className="font-display"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 3.5rem)",
              lineHeight: 1,
              color: cfg.color,
              fontWeight: 400,
              letterSpacing: "-0.02em",
            }}
          >
            {signal}
          </div>
          <div className="flex items-center gap-3">
            <div
              className="font-mono text-xs px-2 py-0.5"
              style={{
                border: `1px solid ${cfg.border}`,
                borderRadius: "3px",
                color: RISK_COLOR[riskLevel] || "var(--text-2)",
              }}
            >
              {riskLevel} RISK
            </div>
            <div className="font-mono text-xs" style={{ color: "var(--text-3)" }}>
              {timeframe}
            </div>
          </div>
        </div>

        {/* Right: confidence arc */}
        <div className="flex flex-col items-center gap-1">
          <ConfidenceArc value={confidence} color={cfg.color} />
          <div className="font-mono text-xs" style={{ color: "var(--text-3)", fontSize: "10px", letterSpacing: "0.1em" }}>
            CONFIDENCE
          </div>
        </div>
      </div>
    </div>
  );
}