import { truncateTxHash } from "../../utils/formatters";
import { BASE_SEPOLIA_EXPLORER } from "../../config/constants";

export default function VerificationBadge({ txHash, model, generatedAt }) {
  const scanUrl = txHash ? `${BASE_SEPOLIA_EXPLORER}/tx/${txHash}` : null;
  const timeStr = generatedAt ? new Date(generatedAt).toLocaleTimeString() : "";

  const rows = [
    { label: "model",      value: model || "google/gemini-2.5-flash" },
    { label: "settlement", value: "INDIVIDUAL", highlight: true },
    { label: "network",    value: "Base Sepolia" },
    ...(timeStr ? [{ label: "generated", value: timeStr }] : []),
    {
      label: "tx_hash",
      value: txHash ? truncateTxHash(txHash) : "settlement pending...",
      link: scanUrl,
      pending: !txHash,
    },
  ];

  return (
    <div className="glass-panel" style={{ background: "var(--bg-surface)" }}>
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-3"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div className="flex items-center gap-2">
          <span className="dot-live" />
          <span
            className="font-mono text-xs"
            style={{ color: "var(--buy)", letterSpacing: "0.04em" }}
          >
            verified on opengradient
          </span>
        </div>
        <span
          className="font-mono text-xs"
          style={{ color: "var(--text-3)" }}
        >
          tee-attested
        </span>
      </div>

      {/* Key-value rows */}
      <div className="divide-y" style={{ borderColor: "var(--border)" }}>
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between px-5 py-2.5"
            style={{ borderColor: "var(--border)" }}
          >
            <span
              className="font-mono text-xs"
              style={{ color: "var(--text-3)", minWidth: 90 }}
            >
              {row.label}
            </span>
            {row.link ? (
              <a
                href={row.link}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs transition-all duration-150"
                style={{
                  color: "rgba(255,255,255,0.5)",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                {row.value} ↗
              </a>
            ) : (
              <span
                className="font-mono text-xs"
                style={{
                  color: row.highlight
                    ? "var(--buy)"
                    : row.pending
                    ? "var(--hold)"
                    : "var(--text-2)",
                  letterSpacing: "0.02em",
                }}
              >
                {row.value}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* CTA */}
      {scanUrl && (
        <div className="px-5 py-3" style={{ borderTop: "1px solid var(--border)" }}>
          <a
            href={scanUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs transition-all duration-150"
            style={{
              color: "var(--text-2)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            view on basescan
            <span style={{ fontSize: 10 }}>↗</span>
          </a>
        </div>
      )}
    </div>
  );
}