import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { wagmiConfig } from "./config/wagmiConfig";
import Header from "./components/layout/Header";
import SignalEngine from "./components/signal/SignalEngine";
import ConnectButton from "./components/wallet/ConnectButton";
import { useWalletConnection } from "./hooks/useWalletConnection";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 30_000 } },
});

// ─── SVG Icons inline for landing only ───────────────────────────────────────

function IconTEE() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="2" y="2" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.2" />
      <path d="M6 7h8M6 10h5M6 13h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="14" cy="13" r="2" fill="currentColor" opacity="0.3" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function IconChain() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M8 12.5L12 7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M10.5 9.5l1.8-1.8a2.5 2.5 0 013.5 3.5l-1.8 1.8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M9.5 10.5l-1.8 1.8a2.5 2.5 0 01-3.5-3.5l1.8-1.8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function IconProof() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 2l2 5.5h5.5l-4.5 3.5 1.5 5.5L10 14l-4.5 2.5 1.5-5.5L2.5 7.5H8L10 2z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" fill="none" />
      <path d="M7.5 10l1.5 1.5 3.5-3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconSignal() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="2" fill="currentColor" />
      <path d="M6.5 13.5a5 5 0 010-7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M13.5 6.5a5 5 0 010 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M4 16a9 9 0 010-12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
      <path d="M16 4a9 9 0 010 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}

function IconModel() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="5" r="2" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="4" cy="15" r="2" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="16" cy="15" r="2" stroke="currentColor" strokeWidth="1.2" />
      <path d="M10 7v3M10 10l-4.5 3M10 10l4.5 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function IconArrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── AppContent ───────────────────────────────────────────────────────────────

function AppContent() {
  const { isConnected } = useWalletConnection();
  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <div className="ambient-glow" />
      <div className="scanlines" />
      <div className="relative z-10">
        <Header />
      </div>
      <main className="relative z-10 px-4 pb-20">
        {isConnected ? (
          <div className="max-w-xl mx-auto pt-10">
            <SignalEngine />
          </div>
        ) : (
          <Landing />
        )}
      </main>
    </div>
  );
}

// ─── Landing ──────────────────────────────────────────────────────────────────

function Landing() {
  return (
    <div className="w-full">
      {/* ── HERO ── */}
      <section
        className="grid-bg relative"
        style={{
          borderBottom: "1px solid var(--border)",
        }}
      >
        {/* Radial fade over grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 20%, #000 100%)",
          }}
        />

        <div className="relative max-w-5xl mx-auto px-6 py-24 text-center space-y-10">
          {/* Status pill */}
          <div className="flex justify-center animate-fade-up">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5"
              style={{
                border: "1px solid var(--border)",
                borderRadius: "3px",
                background: "rgba(255,255,255,0.02)",
              }}
            >
              <span className="dot-live" />
              <span
                className="font-mono text-xs tracking-widest uppercase"
                style={{ color: "var(--text-3)", letterSpacing: "0.15em" }}
              >
                OpenGradient · Base Sepolia Testnet
              </span>
            </div>
          </div>

          {/* Headline — tight, wide, web3 mono */}
          <div className="animate-fade-up delay-100 space-y-4">
            <h1
              className="font-mono font-semibold tracking-tighter"
              style={{
                fontSize: "clamp(2.8rem, 7vw, 5rem)",
                lineHeight: 0.95,
                color: "rgba(255,255,255,0.95)",
                letterSpacing: "-0.04em",
              }}
            >
              OG Signal
            </h1>
            <p
              className="font-mono text-sm mx-auto"
              style={{
                color: "var(--text-2)",
                lineHeight: 1.8,
                maxWidth: 520,
                letterSpacing: "0.02em",
              }}
            >
              Cryptographically verifiable AI trading signals executed inside
              a hardware-attested TEE and settled on Base Sepolia — every signal
              is an immutable on-chain proof.
            </p>
          </div>

          {/* CTA row */}
          <div className="flex flex-col items-center gap-3 animate-fade-up delay-200">
            <ConnectButton large />
            <p
              className="font-mono text-xs"
              style={{ color: "var(--text-4)", letterSpacing: "0.04em" }}
            >
              MetaMask · $OPG testnet tokens · Base Sepolia (84532)
            </p>
          </div>

          {/* Stat strip */}
          <div
            className="animate-fade-up delay-300 grid grid-cols-3 divide-x mx-auto"
            style={{
              maxWidth: 560,
              border: "1px solid var(--border)",
              borderRadius: "6px",
              overflow: "hidden",
              background: "var(--bg-surface)",
            }}
          >
            {[
              { value: "TEE", label: "Execution Environment" },
              { value: "x402", label: "Payment Protocol" },
              { value: "∞", label: "On-Chain Receipts" },
            ].map((s) => (
              <div
                key={s.label}
                className="py-4 text-center"
                style={{ borderColor: "var(--border)" }}
              >
                <div
                  className="font-mono font-semibold"
                  style={{ color: "var(--text-1)", fontSize: "1.1rem", letterSpacing: "-0.02em" }}
                >
                  {s.value}
                </div>
                <div
                  className="font-mono text-xs mt-1"
                  style={{ color: "var(--text-3)", letterSpacing: "0.05em" }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="mb-10">
            <p
              className="font-mono text-xs uppercase tracking-widest"
              style={{ color: "var(--text-3)", letterSpacing: "0.2em" }}
            >
              How It Works
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-px"
            style={{
              border: "1px solid var(--border)",
              borderRadius: "6px",
              overflow: "hidden",
              background: "var(--border)",
            }}
          >
            {[
              {
                step: "01",
                title: "Connect Wallet",
                body: "Link MetaMask on Base Sepolia with $OPG testnet tokens for payment authorization.",
                icon: <IconChain />,
              },
              {
                step: "02",
                title: "Market Ingest",
                body: "Live price data fetched from CoinGecko — current price, volume, 24h range, 7d change.",
                icon: <IconSignal />,
              },
              {
                step: "03",
                title: "TEE Execution",
                body: "Prompt and market data are sent to OpenGradient's LLM inside a hardware-isolated enclave.",
                icon: <IconTEE />,
              },
              {
                step: "04",
                title: "On-Chain Proof",
                body: "x402 settles payment on Base Sepolia. Prompt + response recorded individually — forever provable.",
                icon: <IconProof />,
              },
            ].map((item) => (
              <div
                key={item.step}
                className="p-6 space-y-4"
                style={{ background: "var(--bg-surface)" }}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="font-mono text-xs"
                    style={{ color: "var(--text-4)", letterSpacing: "0.1em" }}
                  >
                    {item.step}
                  </span>
                  <span style={{ color: "var(--text-3)" }}>{item.icon}</span>
                </div>
                <div>
                  <div
                    className="font-mono text-sm font-medium mb-2"
                    style={{ color: "var(--text-1)", letterSpacing: "-0.01em" }}
                  >
                    {item.title}
                  </div>
                  <p
                    className="font-mono text-xs leading-relaxed"
                    style={{ color: "var(--text-3)", lineHeight: 1.75 }}
                  >
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="mb-10">
            <p
              className="font-mono text-xs uppercase tracking-widest"
              style={{ color: "var(--text-3)", letterSpacing: "0.2em" }}
            >
              Infrastructure
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-3">
            {[
              {
                icon: <IconTEE />,
                title: "Trusted Execution",
                body: "OpenGradient runs LLM inference inside Intel TDX / AMD SEV hardware enclaves. Your prompt cannot be tampered with.",
                tag: "Hardware-level",
              },
              {
                icon: <IconProof />,
                title: "Individual Settlement",
                body: "Each signal uses X-SETTLEMENT-TYPE: individual — the full prompt and response are recorded on-chain. Replayable. Auditable.",
                tag: "On-chain",
              },
              {
                icon: <IconModel />,
                title: "Gemini 2.5 Flash",
                body: "Signals are generated by Google's Gemini 2.5 Flash via OpenGradient's verified gateway — fast, cost-efficient, structured JSON output.",
                tag: "AI Model",
              },
              {
                icon: <IconChain />,
                title: "x402 Protocol",
                body: "The open HTTP payment-gated API standard. MetaMask signs an EIP-712 authorization; $OPG is settled atomically with inference.",
                tag: "Protocol",
              },
              {
                icon: <IconSignal />,
                title: "4 Trading Pairs",
                body: "ETH/USD · BTC/USD · SUI/USD · SOL/USD — live market data refreshed every 60 seconds from CoinGecko.",
                tag: "Markets",
              },
              {
                icon: <IconProof />,
                title: "Zero Trust Design",
                body: "No API keys in the frontend. No private keys stored. The wallet signs payment payloads only — standard MetaMask UX.",
                tag: "Security",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="p-5 space-y-3 transition-all duration-150"
                style={{
                  border: "1px solid var(--border)",
                  borderRadius: "6px",
                  background: "var(--bg-surface)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)";
                  e.currentTarget.style.background = "var(--bg-raised)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.background = "var(--bg-surface)";
                }}
              >
                <div className="flex items-start justify-between">
                  <span style={{ color: "var(--text-3)" }}>{f.icon}</span>
                  <span
                    className="font-mono text-xs px-2 py-0.5"
                    style={{
                      border: "1px solid var(--border)",
                      borderRadius: "3px",
                      color: "var(--text-4)",
                    }}
                  >
                    {f.tag}
                  </span>
                </div>
                <div>
                  <div
                    className="font-mono text-sm font-medium mb-1.5"
                    style={{ color: "var(--text-1)", letterSpacing: "-0.01em" }}
                  >
                    {f.title}
                  </div>
                  <p
                    className="font-mono text-xs leading-relaxed"
                    style={{ color: "var(--text-3)", lineHeight: 1.75 }}
                  >
                    {f.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TERMINAL PREVIEW ── */}
      <section style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="mb-10">
            <p
              className="font-mono text-xs uppercase tracking-widest"
              style={{ color: "var(--text-3)", letterSpacing: "0.2em" }}
            >
              Signal Output
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            {/* Terminal */}
            <div
              style={{
                border: "1px solid var(--border)",
                borderRadius: "6px",
                background: "var(--bg-surface)",
                overflow: "hidden",
              }}
            >
              <div
                className="flex items-center justify-between px-4 py-2.5"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <div className="flex items-center gap-1.5">
                  {["rgba(255,255,255,0.1)","rgba(255,255,255,0.07)","rgba(255,255,255,0.04)"].map((c,i) => (
                    <div key={i} style={{ width:8, height:8, borderRadius:"50%", background:c }} />
                  ))}
                </div>
                <span className="font-mono text-xs" style={{ color: "var(--text-4)" }}>
                  signal_output.json
                </span>
                <span className="font-mono text-xs" style={{ color: "var(--text-4)" }}>
                  Base Sepolia
                </span>
              </div>
              <pre
                className="px-5 py-5 font-mono text-xs overflow-x-auto"
                style={{ color: "var(--text-3)", lineHeight: 2, margin: 0 }}
              >
{`{
  `}<span style={{ color: "rgba(255,255,255,0.35)" }}>"signal"</span>{`:     `}<span style={{ color: "#4ade80" }}>"BUY"</span>{`,
  `}<span style={{ color: "rgba(255,255,255,0.35)" }}>"confidence"</span>{`: `}<span style={{ color: "rgba(255,255,255,0.6)" }}>82</span>{`,
  `}<span style={{ color: "rgba(255,255,255,0.35)" }}>"riskLevel"</span>{`:  `}<span style={{ color: "#fbbf24" }}>"MEDIUM"</span>{`,
  `}<span style={{ color: "rgba(255,255,255,0.35)" }}>"timeframe"</span>{`:  `}<span style={{ color: "rgba(255,255,255,0.4)" }}>"short-term (24-48h)"</span>{`,
  `}<span style={{ color: "rgba(255,255,255,0.35)" }}>"txHash"</span>{`:     `}<span style={{ color: "rgba(255,255,255,0.2)" }}>"0x3a9f...c204"</span>{`,
  `}<span style={{ color: "rgba(255,255,255,0.35)" }}>"settlement"</span>{`: `}<span style={{ color: "rgba(255,255,255,0.4)" }}>"individual"</span>{`
}`}
              </pre>
            </div>

            {/* Execution trace */}
            <div
              style={{
                border: "1px solid var(--border)",
                borderRadius: "6px",
                background: "var(--bg-surface)",
                overflow: "hidden",
              }}
            >
              <div
                className="flex items-center justify-between px-4 py-2.5"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <span className="font-mono text-xs" style={{ color: "var(--text-4)" }}>
                  execution_trace
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="dot-live" />
                  <span className="font-mono text-xs" style={{ color: "var(--text-4)" }}>live</span>
                </div>
              </div>
              <div className="divide-y" style={{ borderColor: "var(--border)" }}>
                {[
                  { step: "market_ingest",     status: "DONE",    note: "CoinGecko · 60s refresh" },
                  { step: "prompt_build",       status: "DONE",    note: "structured JSON prompt" },
                  { step: "x402_handshake",     status: "DONE",    note: "EIP-712 signed" },
                  { step: "tee_execution",      status: "DONE",    note: "Intel TDX enclave" },
                  { step: "on_chain_settlement",status: "PENDING", note: "Base Sepolia" },
                  { step: "signal_parse",       status: "PENDING", note: "JSON validation" },
                ].map((row) => (
                  <div
                    key={row.step}
                    className="flex items-center justify-between px-4 py-2.5"
                    style={{ borderColor: "var(--border)" }}
                  >
                    <div>
                      <div className="font-mono text-xs" style={{ color: "var(--text-2)" }}>
                        {row.step}
                      </div>
                      <div className="font-mono text-xs" style={{ color: "var(--text-4)", fontSize: "10px" }}>
                        {row.note}
                      </div>
                    </div>
                    <span
                      className="font-mono text-xs"
                      style={{
                        color: row.status === "DONE" ? "var(--buy)" : "var(--hold)",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {row.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SUPPORTED PAIRS ── */}
      <section style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="mb-10">
            <p
              className="font-mono text-xs uppercase tracking-widest"
              style={{ color: "var(--text-3)", letterSpacing: "0.2em" }}
            >
              Supported Assets
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px"
            style={{
              border: "1px solid var(--border)",
              borderRadius: "6px",
              overflow: "hidden",
              background: "var(--border)",
            }}
          >
            {[
              { symbol: "ETH", name: "Ethereum",  note: "Largest smart contract platform" },
              { symbol: "BTC", name: "Bitcoin",   note: "Digital store of value" },
              { symbol: "SUI", name: "Sui",        note: "High-throughput L1" },
              { symbol: "SOL", name: "Solana",     note: "High-performance blockchain" },
            ].map((a) => (
              <div
                key={a.symbol}
                className="px-5 py-5"
                style={{ background: "var(--bg-surface)" }}
              >
                <div
                  className="font-mono font-semibold mb-1"
                  style={{ color: "var(--text-1)", fontSize: "1rem", letterSpacing: "-0.02em" }}
                >
                  {a.symbol}
                </div>
                <div className="font-mono text-xs mb-1" style={{ color: "var(--text-3)" }}>
                  {a.name}
                </div>
                <div className="font-mono" style={{ color: "var(--text-4)", fontSize: "10px" }}>
                  {a.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section>
        <div className="max-w-5xl mx-auto px-6 py-20 text-center space-y-8">
          <div className="space-y-3">
            <h2
              className="font-mono font-semibold"
              style={{
                fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
                color: "var(--text-1)",
                letterSpacing: "-0.03em",
              }}
            >
              Ready to generate a signal?
            </h2>
            <p className="font-mono text-sm" style={{ color: "var(--text-3)" }}>
              Connect your wallet and get a TEE-verified, on-chain provable trading signal in under 30 seconds.
            </p>
          </div>
          <div className="flex justify-center">
            <ConnectButton large />
          </div>
          <div
            className="inline-flex items-center gap-6 font-mono text-xs"
            style={{ color: "var(--text-4)" }}
          >
            <span>Free testnet</span>
            <span style={{ opacity: 0.3 }}>·</span>
            <span>No sign-up</span>
            <span style={{ opacity: 0.3 }}>·</span>
            <span>Cryptographic proof</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function App() {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <AppContent />
      </QueryClientProvider>
    </WagmiProvider>
  );
}