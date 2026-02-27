import { TRADING_PAIRS } from "../../config/constants";
import { useAppStore } from "../../store/appStore";

export default function PairSelector() {
  const { selectedPair, setSelectedPair } = useAppStore();

  return (
    <div>
      <div
        className="text-xs font-mono uppercase tracking-widest mb-2"
        style={{ color: "var(--text-3)", letterSpacing: "0.15em" }}
      >
        Asset
      </div>
      <div
        className="flex gap-px"
        style={{ border: "1px solid var(--border)", borderRadius: "6px", overflow: "hidden" }}
      >
        {TRADING_PAIRS.map((pair, idx) => {
          const isActive = selectedPair.id === pair.id;
          return (
            <button
              key={pair.id}
              onClick={() => setSelectedPair(pair)}
              className="flex-1 py-2.5 font-mono text-xs transition-all duration-150"
              style={{
                background: isActive ? "rgba(255,255,255,0.07)" : "var(--bg-surface)",
                borderRight:
                  idx < TRADING_PAIRS.length - 1 ? "1px solid var(--border)" : "none",
                color: isActive ? "var(--text-1)" : "var(--text-3)",
                cursor: "pointer",
                letterSpacing: "0.05em",
              }}
            >
              {pair.shortName}
            </button>
          );
        })}
      </div>
    </div>
  );
}