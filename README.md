# OG Signal

OG Signal is a web client for generating verifiable AI trading signals on OpenGradient. It connects a browser wallet on Base Sepolia, fetches live market data, builds a structured prompt, calls the OpenGradient LLM endpoint via the x402 payment protocol, and returns a signed, on-chain provable signal.

## Features

- Wallet-based access via MetaMask (Base Sepolia)
- Live market data from CoinGecko (price, volume, 24h/7d change)
- TEE-verified LLM inference through OpenGradient
- x402 payment flow with individual settlement
- Structured JSON-only signal output with parsing and validation

## Tech Stack

- React + Vite
- Tailwind CSS
- Wagmi + viem for wallet interactions
- @x402/fetch and @x402/evm for payment-gated requests
- Zustand for client state

## Local Development

Install dependencies and run the dev server.

```bash
npm install
npm run dev
```

## Configuration

Key constants live in `src/config/constants.js`.

- `OG_LLM_ENDPOINT` OpenGradient LLM gateway
- `BASE_SEPOLIA_EXPLORER` BaseScan explorer base URL
- `OPG_TOKEN_ADDRESS` $OPG token contract on Base Sepolia
- `DEFAULT_MODEL` default LLM model
- `TRADING_PAIRS` supported asset list

Base Sepolia RPC is configured in `src/config/wagmiConfig.js`.

## Project Structure

```text
og-signal/
+-- index.html
+-- package.json
+-- postcss.config.js
+-- tailwind.config.js
+-- vite.config.js
+-- public/
+-- src/
¦  +-- App.jsx
¦  +-- main.jsx
¦  +-- index.css
¦  +-- assets/
¦  ¦  +-- react.svg
¦  +-- components/
¦  ¦  +-- icons/
¦  ¦  ¦  +-- ArrowIcon.jsx
¦  ¦  ¦  +-- ChainIcon.jsx
¦  ¦  ¦  +-- LogoIcon.jsx
¦  ¦  ¦  +-- SignalIcon.jsx
¦  ¦  ¦  +-- SpinnerIcon.jsx
¦  ¦  ¦  +-- VerifyIcon.jsx
¦  ¦  ¦  +-- WalletIcon.jsx
¦  ¦  +-- layout/
¦  ¦  ¦  +-- Header.jsx
¦  ¦  +-- signal/
¦  ¦  ¦  +-- GenerateButton.jsx
¦  ¦  ¦  +-- MarketDataCard.jsx
¦  ¦  ¦  +-- PairSelector.jsx
¦  ¦  ¦  +-- ReasoningPanel.jsx
¦  ¦  ¦  +-- SignalEngine.jsx
¦  ¦  ¦  +-- SignalResult.jsx
¦  ¦  ¦  +-- SignalVerdict.jsx
¦  ¦  ¦  +-- VerificationBadge.jsx
¦  ¦  +-- ui/
¦  ¦  ¦  +-- ErrorState.jsx
¦  ¦  ¦  +-- GlassButton.jsx
¦  ¦  ¦  +-- GlassPanel.jsx
¦  ¦  ¦  +-- LoadingState.jsx
¦  ¦  +-- wallet/
¦  ¦     +-- ConnectButton.jsx
¦  ¦     +-- WalletStatus.jsx
¦  +-- config/
¦  ¦  +-- chains.js
¦  ¦  +-- constants.js
¦  ¦  +-- wagmiConfig.js
¦  +-- hooks/
¦  ¦  +-- useMarketData.js
¦  ¦  +-- useSignalGeneration.js
¦  ¦  +-- useWalletConnection.js
¦  +-- services/
¦  ¦  +-- marketService.js
¦  ¦  +-- promptService.js
¦  ¦  +-- x402Service.js
¦  +-- store/
¦  ¦  +-- appStore.js
¦  +-- styles/
¦  ¦  +-- liquidGlass.css
¦  +-- utils/
¦     +-- formatters.js
¦     +-- signalParser.js
+-- README.md
```

## Architecture

High-level flow:

1. User connects MetaMask on Base Sepolia.
2. Market data is pulled from CoinGecko on an interval.
3. A structured prompt is assembled with market data and guardrails.
4. The OpenGradient LLM endpoint is called via x402. The wallet signs the payment payload.
5. The LLM responds with JSON only. The client parses and validates the signal.
6. Payment receipt headers are decoded and shown as on-chain proof.

Key modules:

- `useWalletConnection` handles connection state and network switching.
- `useMarketData` polls CoinGecko and stores the latest data.
- `useSignalGeneration` orchestrates prompt building, x402 call, parsing, and UI state.
- `x402Service` wraps fetch with payment handling and extracts on-chain receipt headers.

## n8n Workflow

No n8n workflow definition is currently present in this repository. If you use n8n to orchestrate off-chain steps, add the exported workflow JSON under a `n8n/` directory and document:

- Trigger and inputs
- Data enrichment steps
- OpenGradient call or proxy
- Settlement tracking or logging
- Output schema

Share the workflow details and I will integrate them into this README.

## Notes

- MetaMask is required.
- Base Sepolia is required for settlement.
- $OPG testnet tokens are required to pay for x402 requests.