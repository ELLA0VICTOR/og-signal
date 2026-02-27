import { useEffect, useRef, useState } from "react";
import { truncateAddress } from "../../utils/formatters";
import { useWalletConnection } from "../../hooks/useWalletConnection";

export default function WalletStatus() {
  const { address, isCorrectNetwork, handleDisconnect, handleSwitchNetwork, isSwitching } =
    useWalletConnection();
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const triggerRef = useRef(null);
  const copyAddress = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(address);
        return true;
      }

      const textarea = document.createElement("textarea");
      textarea.value = address;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.top = "-1000px";
      textarea.style.left = "-1000px";
      textarea.style.opacity = "0";
      textarea.style.pointerEvents = "none";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(textarea);
      return ok;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    const onDocClick = (event) => {
      if (!menuRef.current) return;
      if (
        !menuRef.current.contains(event.target) &&
        !triggerRef.current?.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("pointerdown", onDocClick);
    return () => document.removeEventListener("pointerdown", onDocClick);
  }, []);

  if (!address) return null;

  return (
    <div className="flex items-center gap-2">
      {/* Network */}
      {isCorrectNetwork ? (
        <div
          className="flex items-center gap-1.5 px-2.5 py-1 font-mono text-xs"
          style={{
            border: "1px solid var(--border)",
            borderRadius: "4px",
            color: "var(--text-2)",
          }}
        >
          <span className="dot-live" style={{ width: 5, height: 5 }} />
          <span>base-sepolia</span>
        </div>
      ) : (
        <button
          onClick={handleSwitchNetwork}
          disabled={isSwitching}
          className="flex items-center gap-1.5 px-2.5 py-1 font-mono text-xs transition-all duration-150"
          style={{
            border: "1px solid rgba(251,191,36,0.3)",
            borderRadius: "4px",
            color: "var(--hold)",
            background: "transparent",
            cursor: "pointer",
          }}
        >
          <span
            style={{
              width: 5, height: 5, borderRadius: "50%",
              background: "var(--hold)", display: "inline-block",
            }}
          />
          {isSwitching ? "switching..." : "switch network"}
        </button>
      )}

      {/* Address + dropdown */}
      <div className="relative" ref={menuRef}>
        <button
          type="button"
          className="font-mono text-xs transition-all duration-150"
          style={{
            border: "1px solid var(--border)",
            borderRadius: "4px",
            color: "var(--text-2)",
            background: "transparent",
            padding: "4px 10px",
            cursor: "pointer",
          }}
          onClick={() => setMenuOpen((v) => !v)}
          title={address}
          ref={triggerRef}
          onPointerDown={(e) => { e.stopPropagation(); }}
        >
          {truncateAddress(address)}
        </button>

        {(copied || copyFailed) && (
          <div
            className="absolute right-0 mt-1 px-2 py-1 font-mono text-[10px]"
            style={{
              border: "1px solid var(--border)",
              borderRadius: "4px",
              background: "var(--bg-surface)",
              color: copied ? "var(--text-2)" : "var(--text-1)",
            }}
          >
            {copied ? "Copied" : "Copy failed"}
          </div>
        )}

        {menuOpen && (
          <div
            className="absolute right-0 mt-2 w-44"
            style={{
              border: "1px solid var(--border)",
              borderRadius: "6px",
              background: "var(--bg-surface)",
              zIndex: 10,
              padding: "6px",
            }}
            onPointerDown={(e) => { e.stopPropagation(); }}
          >
            <button
              type="button"
              className="w-full text-left font-mono text-xs transition-all duration-150"
              style={{
                color: "var(--text-1)",
                border: "1px solid var(--border-bright)",
                borderRadius: "4px",
                padding: "6px 8px",
                background: "rgba(255,255,255,0.03)",
                cursor: "pointer",
              }}
              onPointerDown={(e) => { e.stopPropagation(); }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-1)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-1)"; }}
              onClick={async () => {
                const ok = await copyAddress();
                setCopied(ok);
                setCopyFailed(!ok);
                if (ok) {
                  setTimeout(() => setCopied(false), 1200);
                } else {
                  setTimeout(() => setCopyFailed(false), 1500);
                  window.prompt("Copy address:", address);
                }
              }}
              title={copied ? "Copied" : "Copy address"}
            >
              {copied ? "Copied" : "Copy address"}
            </button>
          </div>
        )}
      </div>

      {/* Disconnect */}
      <button
        onClick={handleDisconnect}
        className="font-mono text-xs transition-all duration-150"
        style={{
          border: "1px solid var(--border)",
          borderRadius: "4px",
          color: "var(--text-3)",
          background: "transparent",
          padding: "4px 8px",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-2)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-3)"; }}
        title="Disconnect wallet"
      >
        Disconnect
      </button>
    </div>
  );
}
