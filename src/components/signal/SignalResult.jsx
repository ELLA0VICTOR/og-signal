import { useAppStore } from "../../store/appStore";
import SignalVerdict from "./SignalVerdict";
import ReasoningPanel from "./ReasoningPanel";
import VerificationBadge from "./VerificationBadge";

export default function SignalResult() {
  const { signalResult } = useAppStore();
  if (!signalResult) return null;

  const { signal, confidence, riskLevel, timeframe, reasoning,
    keyFactors, disclaimer, txHash, model, generatedAt, pair } = signalResult;

  return (
    <div className="space-y-2 animate-fade-up">
      {/* Section label */}
      <div className="flex items-center gap-3 py-2">
        <div className="rule flex-1" />
        <span
          className="font-mono text-xs uppercase tracking-widest"
          style={{ color: "var(--text-4)", letterSpacing: "0.15em" }}
        >
          {pair?.symbol} · signal
        </span>
        <div className="rule flex-1" />
      </div>

      <SignalVerdict signal={signal} confidence={confidence} riskLevel={riskLevel} timeframe={timeframe} />
      <ReasoningPanel reasoning={reasoning} keyFactors={keyFactors} disclaimer={disclaimer} />
      <VerificationBadge txHash={txHash} model={model} generatedAt={generatedAt} />
    </div>
  );
}