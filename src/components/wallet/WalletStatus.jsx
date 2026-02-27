import { truncateAddress } from "../../utils/formatters";
import { useWalletConnection } from "../../hooks/useWalletConnection";

export default function WalletStatus() {
  const { address, isCorrectNetwork, handleDisconnect, handleSwitchNetwork, isSwitching } =
    useWalletConnection();

  if (!address) return null;

  return (
    <div className="flex items-center gap-2">
      {/* Network */}
      {isCorrectNetwork ? (
        <div
          className="flex items-center gap-1.5 px-2.5 py-1 font-mono text-xs"
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
      <button
        onClick={handleDisconnect}
        className="font-mono text-xs transition-all duration-150"
        style={{
          border: "1px solid var(--border)",
          borderRadius: "4px",
          color: "var(--text-2)",
          background: "transparent",
          padding: "4px 10px",
          cursor: "pointer",
        }}
        title="Click to disconnect"
      >
        {truncateAddress(address)}
      </button>
    </div>
  );
}