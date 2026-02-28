import { useEffect, useState } from "react";
import ConnectButton from "../wallet/ConnectButton";
import WalletStatus from "../wallet/WalletStatus";
import { useWalletConnection } from "../../hooks/useWalletConnection";

export default function Header({ activeTab = "landing", onTabChange }) {
  const { isConnected } = useWalletConnection();
  const [scrolled, setScrolled] = useState(false);
  const tabs = [
    { id: "landing", label: "Overview" },
    { id: "signals", label: "Signal Engine" },
  ];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-200"
      style={{
        background: scrolled ? "rgba(0,0,0,0.94)" : "rgba(0,0,0,0.7)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: `1px solid ${scrolled ? "var(--border)" : "transparent"}`,
      }}
    >
      {/* Full-width container, padding on edges */}
      <div
        className="w-full px-3 sm:px-6 flex items-center justify-between gap-3"
        style={{ minHeight: 52, maxWidth: "100%" }}
      >
        {/* Left: wordmark */}
        <div className="flex items-center gap-2">
          {/* Tiny signal SVG */}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="1.5" fill="rgba(255,255,255,0.5)" />
            <path d="M4.5 9.5a3.5 3.5 0 010-5" stroke="rgba(255,255,255,0.3)" strokeWidth="1.1" strokeLinecap="round" />
            <path d="M9.5 4.5a3.5 3.5 0 010 5" stroke="rgba(255,255,255,0.3)" strokeWidth="1.1" strokeLinecap="round" />
            <path d="M2.5 11.5a6.5 6.5 0 010-9" stroke="rgba(255,255,255,0.12)" strokeWidth="1.1" strokeLinecap="round" />
            <path d="M11.5 2.5a6.5 6.5 0 010 9" stroke="rgba(255,255,255,0.12)" strokeWidth="1.1" strokeLinecap="round" />
          </svg>
          <span
            className="font-mono font-medium"
            style={{
              color: "rgba(255,255,255,0.8)",
              fontSize: "0.8rem",
              letterSpacing: "-0.01em",
            }}
          >
            OG Signal
          </span>
          <span
            className="font-mono text-xs hidden sm:inline"
            style={{ color: "var(--text-4)", marginLeft: 2 }}
          >
            / v1
          </span>
        </div>

        {/* Center: nav links */}
        <nav className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className="font-mono text-xs transition-all duration-150"
                style={{
                  color: activeTab === tab.id ? "var(--text-1)" : "var(--text-3)",
                  borderBottom: activeTab === tab.id ? "1px solid var(--text-2)" : "1px solid transparent",
                  paddingBottom: 4,
                  background: "transparent",
                  borderTop: "1px solid transparent",
                  borderLeft: "1px solid transparent",
                  borderRight: "1px solid transparent",
                  letterSpacing: "0.02em",
                  cursor: "pointer",
                }}
                onClick={() => onTabChange?.(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="h-4 w-px" style={{ background: "var(--border)" }} />
          {[
            { label: "Docs", href: "https://docs.opengradient.ai/" },
            { label: "Faucet", href: "https://faucet.opengradient.ai/" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs transition-all duration-150"
              style={{ color: "var(--text-3)", letterSpacing: "0.02em", textDecoration: "none" }}
              onMouseEnter={(e) => { e.target.style.color = "var(--text-2)"; }}
              onMouseLeave={(e) => { e.target.style.color = "var(--text-3)"; }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right: wallet */}
        <div className="shrink-0">
          {isConnected ? <WalletStatus /> : <ConnectButton />}
        </div>
      </div>

      <div
        className="md:hidden px-3 pb-2 flex items-center justify-between gap-3"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <div className="flex items-center gap-2 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className="font-mono text-xs transition-all duration-150 whitespace-nowrap"
              style={{
                color: activeTab === tab.id ? "var(--text-1)" : "var(--text-3)",
                border: `1px solid ${activeTab === tab.id ? "var(--border-bright)" : "var(--border)"}`,
                borderRadius: "4px",
                padding: "4px 8px",
                background: "transparent",
                letterSpacing: "0.02em",
                cursor: "pointer",
              }}
              onClick={() => onTabChange?.(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="https://docs.opengradient.ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs"
            style={{ color: "var(--text-3)", textDecoration: "none" }}
          >
            Docs
          </a>
          <a
            href="https://faucet.opengradient.ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs"
            style={{ color: "var(--text-3)", textDecoration: "none" }}
          >
            Faucet
          </a>
        </div>
      </div>
    </header>
  );
}
