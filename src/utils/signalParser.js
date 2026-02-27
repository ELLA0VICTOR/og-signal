/**
 * Safely parse LLM JSON response into signal object
 * Handles cases where model wraps JSON in markdown code blocks
 */
export function parseSignalResponse(rawContent) {
  if (!rawContent) throw new Error("Empty response from LLM");

  // Strip markdown code blocks if present
  let cleaned = rawContent.trim();
  cleaned = cleaned.replace(/^```json\s*/i, "").replace(/\s*```$/, "");
  cleaned = cleaned.replace(/^```\s*/i, "").replace(/\s*```$/, "");

  // Find JSON object boundaries
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("No JSON found in LLM response");

  const jsonStr = cleaned.slice(start, end + 1);
  const parsed = JSON.parse(jsonStr);

  // Validate required fields
  if (!["BUY", "SELL", "HOLD"].includes(parsed.signal)) {
    throw new Error(`Invalid signal value: ${parsed.signal}`);
  }
  if (typeof parsed.confidence !== "number") {
    parsed.confidence = 50;
  }

  return {
    signal: parsed.signal,
    confidence: Math.min(100, Math.max(0, parsed.confidence)),
    timeframe: parsed.timeframe || "short-term (24-48h)",
    reasoning: parsed.reasoning || "",
    keyFactors: Array.isArray(parsed.keyFactors) ? parsed.keyFactors : [],
    riskLevel: ["LOW", "MEDIUM", "HIGH"].includes(parsed.riskLevel) ? parsed.riskLevel : "MEDIUM",
    disclaimer: parsed.disclaimer || "Not financial advice.",
  };
}