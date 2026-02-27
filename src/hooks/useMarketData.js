import { useEffect, useCallback } from "react";
import { fetchMarketData } from "../services/marketService";
import { useAppStore } from "../store/appStore";

export function useMarketData(pair) {
  const { setMarketData, setMarketLoading, setMarketError, marketData } = useAppStore();

  const load = useCallback(async () => {
    if (!pair) return;
    setMarketLoading(true);
    setMarketError(null);
    try {
      const data = await fetchMarketData(pair.coingeckoId);
      setMarketData(data);
    } catch (err) {
      if (err.message === "RATE_LIMIT") {
        setMarketError("Market data temporarily unavailable. Using last known data.");
        // Don't clear existing marketData on rate limit
      } else {
        setMarketError(err.message || "Failed to load market data");
      }
    } finally {
      setMarketLoading(false);
    }
  }, [pair?.coingeckoId]);

  useEffect(() => {
    load();
    const interval = setInterval(load, 60000);
    return () => clearInterval(interval);
  }, [load]);

  return { refresh: load };
}