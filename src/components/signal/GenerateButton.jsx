import { useSignalGeneration } from "../../hooks/useSignalGeneration";
import { useAppStore } from "../../store/appStore";
import { useWalletConnection } from "../../hooks/useWalletConnection";

const LABELS = ["", "fetching market data...", "connecting to opengradient...",
  "executing in TEE...", "settling on-chain...", "parsing signal..."];

export default function GenerateButton() {
  const { generateSignal, loadingStep } = useSignalGeneration();
  const { isLoading, marketData } = useAppStore();
  const { isConnected, isCorrectNetwork } = useWalletConnection();

  const disabled = !isConnected || !isCorrectNetwork || !marketData || isLoading;

  return (
    <button
      onClick={generateSignal}
      disabled={disabled}
      className="w-full font-mono transition-all duration-150"
      style={{
        background: disabled ? "transparent" : "rgba(255,255,255,0.95)",
        border: `1px solid ${disabled ? "var(--border)" : "rgba(255,255,255,0.3)"}`,
        borderRadius: "6px",
        color: disabled ? "var(--text-3)" : "#000000",
        cursor: disabled ? "not-allowed" : "pointer",
        fontSize: "0.78rem",
        fontWeight: 500,
        letterSpacing: "0.04em",
        padding: "13px 20px",
      }}
    >
      {isLoading
        ? <span style={{ color: "var(--text-2)" }}>{LABELS[loadingStep] || "processing..."}</span>
        : "Generate Verified Signal →"}
    </button>
  );
}