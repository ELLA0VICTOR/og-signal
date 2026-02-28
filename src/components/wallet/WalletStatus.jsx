import { useState } from "react";
import { truncateAddress } from "../../utils/formatters";
import { useWalletConnection } from "../../hooks/useWalletConnection";

export default function WalletStatus() {
  const { address, isCorrectNetwork, handleDisconnect, handleSwitchNetwork, isSwitching } =
    useWalletConnection();
  const [menuOpen, setMenuOpen] = useState(false);

  if (!address) return null;

  return (
    <div className="flex items-center gap-2 flex-wrap justify-end">
      {/* Network */}
      {isCorrectNetwork ? (
        <div
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 font-mono text-xs"
          style={{
            border: "1px solid var(--border)",
            borderRadius: "4px",
            color: "var(--text-2)",
          }}
        >
          <span className="dot-live" style={{ width: 5, height: 5 }} />
          <span>base-sepolia</span>
        </div>
      ) : (
        <button
          onClick={handleSwitchNetwork}
          disabled={isSwitching}
          className="flex items-center gap-1.5 px-2.5 py-1 font-mono text-xs transition-all duration-150"
          style={{
            border: "1px solid rgba(251,191,36,0.3)",
            borderRadius: "4px",
            color: "var(--hold)",
            background: "transparent",
            cursor: "pointer",
          }}
        >
          <span
            style={{
              width: 5, height: 5, borderRadius: "50%",
              background: "var(--hold)", display: "inline-block",
            }}
          />
          {isSwitching ? "switching..." : "switch network"}
        </button>
      )}

      {/* Address */}
      <div
        className="font-mono text-xs transition-all duration-150"
        style={{
          border: "1px solid var(--border)",
          borderRadius: "4px",
          color: "var(--text-2)",
          background: "transparent",
          padding: "4px 10px",
        }}
        title={address}
      >
        {truncateAddress(address)}
      </div>

      {/* Disconnect */}
      <button
        onClick={handleDisconnect}
        className="font-mono text-xs transition-all duration-150"
        style={{
          border: "1px solid var(--border)",
          borderRadius: "4px",
          color: "var(--text-3)",
          background: "transparent",
          padding: "4px 8px",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-2)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-3)"; }}
        title="Disconnect wallet"
      >
        Disconnect
      </button>
    </div>
  );
}
