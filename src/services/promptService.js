/**
 * Builds the structured LLM prompt from market data
 */
export function buildSignalPrompt(pair, marketData) {
  const {
    currentPrice,
    change24h,
    high24h,
    low24h,
    volume24h,
    marketCap,
    change7d,
  } = marketData;

  const systemPrompt = `You are a professional DeFi trading analyst running on OpenGradient's verifiable AI infrastructure. Your analysis will be cryptographically verified and settled on the Base Sepolia blockchain via the x402 protocol with TEE (Trusted Execution Environment) attestation. Provide precise, data-driven analysis. Always respond with valid JSON only — no markdown, no preamble, no explanation outside the JSON object.`;

  const priceFormatted = currentPrice >= 1
    ? currentPrice.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : currentPrice.toLocaleString("en-US", { minimumFractionDigits: 4, maximumFractionDigits: 6 });

  const userPrompt = `Analyze the following live market data for ${pair.symbol} and generate a trading signal.

LIVE MARKET DATA (${new Date().toUTCString()}):
- Current Price: $${priceFormatted} USD
- 24h Change: ${change24h >= 0 ? "+" : ""}${change24h.toFixed(2)}%
- 24h High: $${high24h.toLocaleString()} USD
- 24h Low: $${low24h.toLocaleString()} USD
- 24h Volume: $${(volume24h / 1e9).toFixed(2)}B USD
- Market Cap: $${(marketCap / 1e9).toFixed(2)}B USD
- 7-Day Change: ${change7d >= 0 ? "+" : ""}${change7d.toFixed(2)}%

OPENGRADIENT EXECUTION CONTEXT:
This inference runs inside a hardware-attested TEE on the OpenGradient network. The full prompt and response will be cryptographically settled on Base Sepolia as immutable proof of this analysis.

Respond ONLY with valid JSON in this exact format:
{
  "signal": "BUY",
  "confidence": 72,
  "timeframe": "short-term (24-48h)",
  "reasoning": "Two to three sentences explaining the key reasoning behind the signal based on the data provided.",
  "keyFactors": ["Factor one", "Factor two", "Factor three"],
  "riskLevel": "MEDIUM",
  "disclaimer": "Testnet demonstration only. Not financial advice."
}

The signal must be exactly one of: BUY, SELL, HOLD
The confidence must be a number between 0 and 100
The riskLevel must be exactly one of: LOW, MEDIUM, HIGH`;

  return [
    { role: "system", content: systemPrompt },
    { role: "user", content: userPrompt },
  ];
}