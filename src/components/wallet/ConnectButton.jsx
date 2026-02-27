import { useWalletConnection } from "../../hooks/useWalletConnection";

export default function ConnectButton({ large = false }) {
  const { handleConnect, isConnecting, errorMessage } = useWalletConnection();

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={handleConnect}
        disabled={isConnecting}
        className="font-mono transition-all duration-150"
        style={{
          background: isConnecting ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.95)",
          border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: "4px",
          color: isConnecting ? "rgba(255,255,255,0.5)" : "#000000",
          cursor: isConnecting ? "not-allowed" : "pointer",
          fontSize: large ? "0.8rem" : "0.7rem",
          fontWeight: 500,
          letterSpacing: "0.04em",
          padding: large ? "10px 28px" : "7px 16px",
        }}
      >
        {isConnecting ? "connecting..." : "Connect Wallet"}
      </button>
      {errorMessage && (
        <p className="text-xs font-mono" style={{ color: "var(--sell)" }}>
          {errorMessage}
        </p>
      )}
    </div>
  );
}