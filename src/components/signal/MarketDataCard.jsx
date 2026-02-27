import { useAppStore } from "../../store/appStore";
import { useMarketData } from "../../hooks/useMarketData";
import { formatPrice, formatPercent, formatLargeNumber } from "../../utils/formatters";

function Sk({ w = "w-16" }) {
  return <div className={`skeleton h-3 rounded-sm ${w}`} />;
}

export default function MarketDataCard() {
  const { selectedPair, marketData, isMarketLoading, marketError } = useAppStore();
  useMarketData(selectedPair);

  const change = marketData?.change24h ?? 0;
  const isUp = change >= 0;

  return (
    <div
      className="glass-panel"
      style={{ background: "var(--bg-surface)" }}
    >
      {/* Top row: symbol + price */}
      <div
        className="flex items-start justify-between px-5 py-4"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div>
          <div
            className="text-xs font-mono uppercase tracking-widest mb-2"
            style={{ color: "var(--text-3)", letterSpacing: "0.15em" }}
          >
            {selectedPair.symbol}
          </div>
          {isMarketLoading && !marketData ? (
            <Sk w="w-32" />
          ) : (
            <div
              className="font-display"
              style={{
                fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
                lineHeight: 1,
                color: "var(--text-1)",
                fontWeight: 400,
                letterSpacing: "-0.02em",
              }}
            >
              ${formatPrice(marketData?.currentPrice)}
            </div>
          )}
        </div>

        {/* 24h change */}
        <div>
          {isMarketLoading && !marketData ? (
            <Sk w="w-14" />
          ) : (
            <div
              className="font-mono text-sm px-2.5 py-1"
              style={{
                border: `1px solid ${isUp ? "rgba(74,222,128,0.25)" : "rgba(248,113,113,0.25)"}`,
                borderRadius: "4px",
                color: isUp ? "var(--buy)" : "var(--sell)",
                background: isUp ? "rgba(74,222,128,0.04)" : "rgba(248,113,113,0.04)",
              }}
            >
              {formatPercent(change)}
            </div>
          )}
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 divide-x" style={{ borderBottom: "1px solid var(--border)" }}>
        {[
          { label: "24h High", value: `$${formatPrice(marketData?.high24h)}` },
          { label: "24h Low",  value: `$${formatPrice(marketData?.low24h)}` },
        ].map((s) => (
          <div key={s.label} className="px-5 py-3" style={{ borderColor: "var(--border)" }}>
            <div className="text-xs font-mono mb-1" style={{ color: "var(--text-3)" }}>{s.label}</div>
            {isMarketLoading && !marketData ? <Sk /> : (
              <div className="text-xs font-mono" style={{ color: "var(--text-2)" }}>{s.value}</div>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 divide-x" style={{ borderColor: "var(--border)" }}>
        {[
          { label: "7d", value: formatPercent(marketData?.change7d), isChange: true, val: marketData?.change7d ?? 0 },
          { label: "Volume", value: formatLargeNumber(marketData?.volume24h) },
          { label: "Mkt Cap", value: formatLargeNumber(marketData?.marketCap) },
        ].map((s) => (
          <div key={s.label} className="px-4 py-3" style={{ borderColor: "var(--border)" }}>
            <div className="text-xs font-mono mb-1" style={{ color: "var(--text-3)" }}>{s.label}</div>
            {isMarketLoading && !marketData ? <Sk /> : (
              <div
                className="text-xs font-mono"
                style={{
                  color: s.isChange
                    ? s.val >= 0 ? "var(--buy)" : "var(--sell)"
                    : "var(--text-2)",
                }}
              >
                {s.value}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      {(marketError || marketData?.lastUpdated) && (
        <div className="px-5 py-2.5" style={{ borderTop: "1px solid var(--border)" }}>
          {marketError ? (
            <p className="text-xs font-mono" style={{ color: "var(--hold)" }}>{marketError}</p>
          ) : (
            <p className="text-xs font-mono" style={{ color: "var(--text-4)" }}>
              updated {new Date(marketData.lastUpdated).toLocaleTimeString()}
            </p>
          )}
        </div>
      )}
    </div>
  );
}