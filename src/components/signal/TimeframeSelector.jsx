import { SIGNAL_TIMEFRAMES } from "../../config/constants";
import { useAppStore } from "../../store/appStore";

export default function TimeframeSelector() {
  const { selectedTimeframe, setSelectedTimeframe } = useAppStore();

  return (
    <div>
      <div
        className="text-xs font-mono uppercase tracking-widest mb-2"
        style={{ color: "var(--text-3)", letterSpacing: "0.15em" }}
      >
        Timeframe
      </div>
      <div
        className="flex gap-px"
        style={{ border: "1px solid var(--border)", borderRadius: "6px", overflow: "hidden" }}
      >
        {SIGNAL_TIMEFRAMES.map((timeframe, idx) => {
          const isActive = selectedTimeframe?.id === timeframe.id;
          return (
            <button
              key={timeframe.id}
              onClick={() => setSelectedTimeframe(timeframe)}
              className="flex-1 py-2.5 font-mono text-xs transition-all duration-150"
              style={{
                background: isActive ? "rgba(255,255,255,0.07)" : "var(--bg-surface)",
                borderRight:
                  idx < SIGNAL_TIMEFRAMES.length - 1 ? "1px solid var(--border)" : "none",
                color: isActive ? "var(--text-1)" : "var(--text-3)",
                cursor: "pointer",
                letterSpacing: "0.05em",
              }}
              title={`${timeframe.label} (${timeframe.horizon})`}
            >
              {timeframe.shortName}
            </button>
          );
        })}
      </div>
      <div className="mt-2 font-mono text-xs" style={{ color: "var(--text-4)" }}>
        Horizon: {selectedTimeframe?.horizon || "24-72h"}
      </div>
    </div>
  );
}
