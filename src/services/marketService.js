const COINGECKO_BASE = "https://api.coingecko.com/api/v3";

export async function fetchMarketData(coingeckoId) {
  const url = `${COINGECKO_BASE}/coins/${coingeckoId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false`;

  const response = await fetch(url);

  if (response.status === 429) {
    throw new Error("RATE_LIMIT");
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch market data for ${coingeckoId}`);
  }

  const data = await response.json();
  const md = data.market_data;

  return {
    currentPrice: md.current_price.usd,
    change24h: md.price_change_percentage_24h ?? 0,
    high24h: md.high_24h.usd,
    low24h: md.low_24h.usd,
    volume24h: md.total_volume.usd,
    marketCap: md.market_cap.usd,
    change7d: md.price_change_percentage_7d ?? 0,
    lastUpdated: data.last_updated,
  };
}