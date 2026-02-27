# OG Signal

OG Signal is a web client for generating verifiable AI trading signals on OpenGradient. The frontend connects a browser wallet on Base Sepolia, fetches live market data, builds a structured prompt, and sends it to a Python gateway that uses the OpenGradient SDK for payment and TEE-verified inference.

## Features

- Wallet-based access via MetaMask (Base Sepolia)
- Live market data from CoinGecko (price, volume, 24h/7d change)
- TEE-verified LLM inference through OpenGradient
- Permit2 approvals and payment handled server-side
- Structured JSON-only signal output with parsing and validation

## Tech Stack

- React + Vite
- Tailwind CSS
- Wagmi + viem for wallet interactions
- OpenGradient Python SDK (server-side)
- Zustand for client state

## Local Development

Install dependencies and run both servers.

```bash
npm install
pip install -r server_py/requirements.txt
npm run server:py
npm run dev
```

## Configuration

Key constants live in `src/config/constants.js`.

- `OG_LLM_ENDPOINT` OpenGradient LLM gateway (points to Python server)
- `BASE_SEPOLIA_EXPLORER` BaseScan explorer base URL
- `OPG_TOKEN_ADDRESS` $OPG token contract on Base Sepolia
- `DEFAULT_MODEL` default LLM model
- `TRADING_PAIRS` supported asset list

Base Sepolia RPC is configured in `src/config/wagmiConfig.js`.

## Python Server (LLM Gateway)

The LLM requests are routed through a local Python API that uses the OpenGradient SDK and handles Permit2 approvals + payments on Base Sepolia.

Set your private key in `.env`:

```
OG_PRIVATE_KEY=your_private_key_here
```

Start the server:

```bash
npm run server:py
```

The frontend calls `http://localhost:8788` by default. Override with:

```bash
VITE_OG_LLM_ENDPOINT=http://localhost:8788
```

## Deployment

### Backend on Render

1. Create a new Web Service.
2. Root directory: repository root.
3. Build Command:
   ```
   pip install -r server_py/requirements.txt
   ```
4. Start Command:
   ```
   uvicorn server_py.app:app --host 0.0.0.0 --port 8788
   ```
5. Environment Variables:
   - `OG_PRIVATE_KEY` = your Base Sepolia wallet private key (must have Base Sepolia ETH + OPG)

After deploy, copy the Render service URL.

### Frontend on Vercel

1. Import the repo into Vercel.
2. Set Environment Variables:
   - `VITE_OG_LLM_ENDPOINT` = your Render backend URL
3. Deploy.

## Why the tx_hash can be "pending"

The OpenGradient SDK returns the response immediately after inference. The on-chain payment settlement may complete slightly later, so the receipt (tx hash) might not be present yet. Once settlement is finalized, the payment hash becomes available.

## Project Structure

```text
og-signal/
+-- index.html
+-- package.json
+-- postcss.config.js
+-- tailwind.config.js
+-- vite.config.js
+-- public/
+-- server_py/
¦   +-- app.py
¦   +-- requirements.txt
+-- src/
¦   +-- App.jsx
¦   +-- main.jsx
¦   +-- index.css
¦   +-- assets/
¦   ¦   +-- react.svg
¦   +-- components/
¦   ¦   +-- icons/
¦   ¦   ¦   +-- ArrowIcon.jsx
¦   ¦   ¦   +-- ChainIcon.jsx
¦   ¦   ¦   +-- LogoIcon.jsx
¦   ¦   ¦   +-- SignalIcon.jsx
¦   ¦   ¦   +-- SpinnerIcon.jsx
¦   ¦   ¦   +-- VerifyIcon.jsx
¦   ¦   ¦   +-- WalletIcon.jsx
¦   ¦   +-- layout/
¦   ¦   ¦   +-- Header.jsx
¦   ¦   +-- signal/
¦   ¦   ¦   +-- GenerateButton.jsx
¦   ¦   ¦   +-- MarketDataCard.jsx
¦   ¦   ¦   +-- PairSelector.jsx
¦   ¦   ¦   +-- ReasoningPanel.jsx
¦   ¦   ¦   +-- SignalEngine.jsx
¦   ¦   ¦   +-- SignalResult.jsx
¦   ¦   ¦   +-- SignalVerdict.jsx
¦   ¦   ¦   +-- VerificationBadge.jsx
¦   ¦   +-- ui/
¦   ¦   ¦   +-- ErrorState.jsx
¦   ¦   ¦   +-- GlassButton.jsx
¦   ¦   ¦   +-- GlassPanel.jsx
¦   ¦   ¦   +-- LoadingState.jsx
¦   ¦   +-- wallet/
¦   ¦       +-- ConnectButton.jsx
¦   ¦       +-- WalletStatus.jsx
¦   +-- config/
¦   ¦   +-- chains.js
¦   ¦   +-- constants.js
¦   ¦   +-- wagmiConfig.js
¦   +-- hooks/
¦   ¦   +-- useMarketData.js
¦   ¦   +-- useSignalGeneration.js
¦   ¦   +-- useWalletConnection.js
¦   +-- services/
¦   ¦   +-- marketService.js
¦   ¦   +-- promptService.js
¦   ¦   +-- x402Service.js
¦   +-- store/
¦   ¦   +-- appStore.js
¦   +-- styles/
¦   ¦   +-- liquidGlass.css
¦   +-- utils/
¦       +-- formatters.js
¦       +-- signalParser.js
+-- README.md
```

## Architecture

High-level flow:

1. User connects MetaMask on Base Sepolia.
2. Market data is pulled from CoinGecko on an interval.
3. A structured prompt is assembled with market data and guardrails.
4. The frontend calls the Python gateway.
5. The Python gateway uses the OpenGradient SDK to ensure Permit2 approval and perform x402 payment and inference.
6. The LLM responds with JSON only. The client parses and validates the signal.
7. Payment hash is returned when available.

Key modules:

- `useWalletConnection` handles connection state and network switching.
- `useMarketData` polls CoinGecko and stores the latest data.
- `useSignalGeneration` orchestrates prompt building, gateway call, parsing, and UI state.
- `server_py/app.py` handles payment approval and LLM inference via OpenGradient SDK.

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
- $OPG testnet tokens are required to pay for requests.
- The backend wallet must also have Base Sepolia ETH to pay gas for Permit2 approvals.
