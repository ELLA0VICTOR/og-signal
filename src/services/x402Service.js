import { wrapFetchWithPaymentFromConfig } from "@x402/fetch";
import { createWalletClient, http, custom } from "viem";
import { baseSepolia } from "../config/chains";
import { OG_LLM_ENDPOINT, DEFAULT_MODEL } from "../config/constants";

/**
 * Dynamically import ExactEvmScheme to handle potential package path variations
 */
async function getExactEvmScheme() {
  try {
    const mod = await import("@x402/evm/exact/client");
    return mod.ExactEvmScheme;
  } catch {
    try {
      const mod = await import("@x402/evm");
      return mod.ExactEvmScheme;
    } catch {
      throw new Error("Could not load @x402/evm. Ensure it is installed correctly.");
    }
  }
}

/**
 * Creates an x402-enabled fetch client using the user's MetaMask wallet
 */
async function createX402Client(walletClient) {
  const ExactEvmScheme = await getExactEvmScheme();
  return wrapFetchWithPaymentFromConfig(fetch, {
    schemes: [
      { network: "eip155:84532", client: new ExactEvmScheme(walletClient) },
    ],
  });
}

/**
 * Calls OpenGradient's TEE-verified LLM via x402 protocol
 */
export async function callOGLLM({ walletClient, messages, model = DEFAULT_MODEL, maxTokens = 600 }) {
  const x402Fetch = await createX402Client(walletClient);

  const response = await x402Fetch(`${OG_LLM_ENDPOINT}/v1/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-SETTLEMENT-TYPE": "individual",
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

  // Extract transaction hash from payment response header
  let txHash = null;
  const paymentResponseHeader = response.headers.get("X-PAYMENT-RESPONSE");
  if (paymentResponseHeader) {
    try {
      const paymentReceipt = JSON.parse(atob(paymentResponseHeader));
      txHash = paymentReceipt.txHash || null;
    } catch {
      // txHash will remain null, handled gracefully
    }
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content || "";

  return { content, txHash, model };
}

/**
 * Creates a viem walletClient from the user's browser wallet (MetaMask)
 */
export function createBrowserWalletClient(account) {
  if (!window.ethereum) {
    throw new Error("NO_METAMASK");
  }

  return createWalletClient({
    account,
    chain: baseSepolia,
    transport: custom(window.ethereum),
  });
}
