export default function ReasoningPanel({ reasoning, keyFactors, disclaimer }) {
  return (
    <div className="glass-panel" style={{ background: "var(--bg-surface)" }}>
      {/* Reasoning */}
      <div className="px-5 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
        <div
          className="font-mono text-xs uppercase tracking-widest mb-3"
          style={{ color: "var(--text-3)", letterSpacing: "0.15em" }}
        >
          Analysis
        </div>
        <p
          className="font-mono text-xs leading-relaxed"
          style={{ color: "var(--text-2)", lineHeight: 1.8 }}
        >
          {reasoning}
        </p>
      </div>

      {/* Key factors */}
      {keyFactors?.length > 0 && (
        <div className="px-5 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
          <div
            className="font-mono text-xs uppercase tracking-widest mb-3"
            style={{ color: "var(--text-3)", letterSpacing: "0.15em" }}
          >
            Key Factors
          </div>
          <div className="space-y-1.5">
            {keyFactors.map((f, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="font-mono text-xs" style={{ color: "var(--text-4)", marginTop: 1 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-xs" style={{ color: "var(--text-2)" }}>
                  {f}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="px-5 py-3">
        <p className="font-mono text-xs" style={{ color: "var(--text-4)" }}>
          {disclaimer}
        </p>
      </div>
    </div>
  );
}