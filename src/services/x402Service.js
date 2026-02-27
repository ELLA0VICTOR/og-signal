import { OG_LLM_ENDPOINT, DEFAULT_MODEL } from "../config/constants";

/**
 * Calls the local Python gateway which handles OpenGradient + x402 server-side
 */
export async function callOGLLM({ messages, model = DEFAULT_MODEL, maxTokens = 600 }) {
  const response = await fetch(`${OG_LLM_ENDPOINT}/v1/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages,
      max_tokens: maxTokens,
      temperature: 0.1,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errMsg = errorData?.error?.message || "";

    if (errMsg.toLowerCase().includes("insufficient") || response.status === 402) {
      throw new Error("INSUFFICIENT_FUNDS");
    }

    throw new Error(errMsg || `HTTP ${response.status}: LLM inference failed`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content || "";
  const txHash = data.payment?.hash || null;

  return { content, txHash, model };
}
