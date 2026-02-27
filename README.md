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

og-signal/
│
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
├── .env.example
│
├── public/
│   └── favicon.svg
│
└── src/
    │
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    │
    ├── styles/
    │   └── liquidGlass.css
    │
    ├── config/
    │   ├── constants.js
    │   ├── chains.js
    │   └── wagmiConfig.js
    │
    ├── store/
    │   └── appStore.js
    │
    ├── utils/
    │   ├── formatters.js
    │   └── signalParser.js
    │
    ├── services/
    │   ├── marketService.js
    │   ├── promptService.js
    │   └── x402Service.js
    │
    ├── hooks/
    │   ├── useMarketData.js
    │   ├── useWalletConnection.js
    │   └── useSignalGeneration.js
    │
    └── components/
        │
        ├── layout/
        │   └── Header.jsx
        │
        ├── wallet/
        │   ├── ConnectButton.jsx
        │   └── WalletStatus.jsx
        │
        ├── signal/
        │   ├── SignalEngine.jsx
        │   ├── PairSelector.jsx
        │   ├── MarketDataCard.jsx
        │   ├── GenerateButton.jsx
        │   ├── SignalResult.jsx
        │   ├── SignalVerdict.jsx
        │   ├── ReasoningPanel.jsx
        │   └── VerificationBadge.jsx
        │
        └── ui/
            ├── GlassPanel.jsx
            ├── GlassButton.jsx
            ├── LoadingState.jsx
            ├── ErrorState.jsx
            │
            └── icons/
                ├── LogoIcon.jsx
                ├── WalletIcon.jsx
                ├── ChainIcon.jsx
                ├── SignalIcon.jsx
                ├── VerifyIcon.jsx
                ├── ArrowIcon.jsx
                └── SpinnerIcon.jsx

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