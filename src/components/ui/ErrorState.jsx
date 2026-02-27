import { OG_FAUCET } from "../../config/constants";

export default function ErrorState({ message, onRetry }) {
  const isFunds = message?.includes("$OPG") || message?.includes("Insufficient");
  const isMeta  = message?.includes("MetaMask");

  return (
    <div
      className="glass-panel px-5 py-5 space-y-4"
      style={{
        background: "rgba(248,113,113,0.03)",
        borderColor: "rgba(248,113,113,0.15)",
      }}
    >
      <div>
        <div
          className="font-mono text-xs uppercase tracking-widest mb-2"
          style={{ color: "var(--sell)", letterSpacing: "0.15em" }}
        >
          Error
        </div>
        <p className="font-mono text-xs" style={{ color: "var(--text-2)", lineHeight: 1.7 }}>
          {message || "Something went wrong."}
        </p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {onRetry && (
          <button
            onClick={onRetry}
            className="font-mono text-xs px-3 py-1.5 transition-all duration-150"
            style={{
              border: "1px solid var(--border)",
              borderRadius: "4px",
              color: "var(--text-2)",
              background: "transparent",
              cursor: "pointer",
            }}
          >
            retry
          </button>
        )}
        {isFunds && (
          <a
            href={OG_FAUCET}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs px-3 py-1.5 transition-all duration-150"
            style={{
              border: "1px solid rgba(74,222,128,0.2)",
              borderRadius: "4px",
              color: "var(--buy)",
              textDecoration: "none",
            }}
          >
            get $OPG tokens ↗
          </a>
        )}
        {isMeta && (
          <a
            href="https://metamask.io/download/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs px-3 py-1.5 transition-all duration-150"
            style={{
              border: "1px solid var(--border)",
              borderRadius: "4px",
              color: "var(--text-2)",
              textDecoration: "none",
            }}
          >
            install metamask ↗
          </a>
        )}
      </div>
    </div>
  );
}