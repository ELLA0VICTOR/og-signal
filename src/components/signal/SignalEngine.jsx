import PairSelector from "./PairSelector";
import MarketDataCard from "./MarketDataCard";
import GenerateButton from "./GenerateButton";
import SignalResult from "./SignalResult";
import LoadingState from "../ui/LoadingState";
import ErrorState from "../ui/ErrorState";
import { useAppStore } from "../../store/appStore";
import { useSignalGeneration } from "../../hooks/useSignalGeneration";
import { useWalletConnection } from "../../hooks/useWalletConnection";

export default function SignalEngine() {
  const { isLoading, error, setError } = useAppStore();
  const { generateSignal, loadingStep } = useSignalGeneration();
  const { isCorrectNetwork, handleSwitchNetwork, isSwitching } = useWalletConnection();

  return (
    <div className="space-y-3">
      {/* Wrong network */}
      {!isCorrectNetwork && (
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{
            border: "1px solid rgba(251,191,36,0.2)",
            borderRadius: "6px",
            background: "rgba(251,191,36,0.03)",
          }}
        >
          <div>
            <p className="font-mono text-xs" style={{ color: "var(--hold)" }}>
              wrong network
            </p>
            <p className="font-mono text-xs mt-0.5" style={{ color: "var(--text-3)" }}>
              switch to base sepolia (84532)
            </p>
          </div>
          <button
            onClick={handleSwitchNetwork}
            disabled={isSwitching}
            className="font-mono text-xs px-3 py-1.5 transition-all duration-150"
            style={{
              border: "1px solid rgba(251,191,36,0.25)",
              borderRadius: "4px",
              color: "var(--hold)",
              background: "transparent",
              cursor: isSwitching ? "not-allowed" : "pointer",
            }}
          >
            {isSwitching ? "switching..." : "switch →"}
          </button>
        </div>
      )}

      <PairSelector />
      <MarketDataCard />

      {/* Loading panel */}
      {isLoading ? (
        <div className="glass-panel" style={{ background: "var(--bg-surface)" }}>
          <LoadingState step={loadingStep} />
        </div>
      ) : (
        <GenerateButton />
      )}

      {/* Error */}
      {error && !isLoading && (
        <ErrorState
          message={error}
          onRetry={() => { setError(null); generateSignal(); }}
        />
      )}

      {/* Result */}
      {!isLoading && !error && <SignalResult />}
    </div>
  );
}