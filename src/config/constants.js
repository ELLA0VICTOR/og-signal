export const OG_LLM_ENDPOINT =
  import.meta.env.VITE_OG_LLM_ENDPOINT || "http://localhost:8788";
export const OG_EXPLORER = "https://explorer.opengradient.ai";
export const BASE_SEPOLIA_EXPLORER = "https://sepolia.basescan.org";
export const OPG_TOKEN_ADDRESS = "0x240b09731D96979f50B2C649C9CE10FcF9C7987F";
export const OG_FAUCET = "https://faucet.opengradient.ai/";

export const DEFAULT_MODEL = "google/gemini-2.5-flash";

export const TRADING_PAIRS = [
  { id: "ethereum", symbol: "ETH/USD", name: "Ethereum", coingeckoId: "ethereum", shortName: "ETH" },
  { id: "bitcoin", symbol: "BTC/USD", name: "Bitcoin", coingeckoId: "bitcoin", shortName: "BTC" },
  { id: "sui", symbol: "SUI/USD", name: "Sui", coingeckoId: "sui", shortName: "SUI" },
  { id: "solana", symbol: "SOL/USD", name: "Solana", coingeckoId: "solana", shortName: "SOL" },
];

// OpenGradient pre-deployed ML workflow contracts (Alpha Testnet - Chain 10744)
export const OG_WORKFLOW_CONTRACTS = {
  ETH_1HR_VOLATILITY: "0xD5629A5b95dde11e4B5772B5Ad8a13B933e33845",
  SUI_30MIN_RETURN: "0xD85BA71f5701dc4C5BDf9780189Db49C6F3708D2",
  SUI_6HR_RETURN: "0x3C2E4DbD653Bd30F1333d456480c1b7aB122e946",
};

export const LOADING_STEPS = [
  "Fetching live market data...",
  "Connecting to OpenGradient network...",
  "Executing inference in TEE...",
  "Waiting for on-chain settlement...",
  "Parsing verified signal...",
];
