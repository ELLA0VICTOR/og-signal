import { useEffect, useState } from "react";

const STEPS = [
  "", "fetching market data...", "connecting to opengradient...",
  "executing inference in TEE...", "waiting for settlement...", "parsing signal...",
];

export default function LoadingState({ step = 1 }) {
  const label = STEPS[step] || "processing...";
  const progress = Math.round((step / 5) * 100);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    const startedAt = Date.now();
    const timer = setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - startedAt) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="px-5 py-10 flex flex-col items-center gap-6">
      {/* Progress bar */}
      <div className="w-full" style={{ background: "var(--border)", borderRadius: "2px", height: 1 }}>
        <div
          className="h-full transition-all duration-700"
          style={{
            width: `${progress}%`,
            background: "rgba(255,255,255,0.4)",
            borderRadius: "2px",
          }}
        />
      </div>

      {/* Label with blinking cursor */}
      <div
        className="font-mono text-xs cursor-blink"
        style={{ color: "var(--text-2)", letterSpacing: "0.04em" }}
      >
        {label}
      </div>

      {/* Step fraction */}
      <div className="font-mono text-xs" style={{ color: "var(--text-4)" }}>
        {step} / 5
      </div>

      <div className="font-mono text-xs text-center" style={{ color: "var(--text-4)", maxWidth: 360 }}>
        {`Elapsed: ${elapsedSeconds}s. Typical response is 15-45s, but settlement may take longer under network load.`}
      </div>
    </div>
  );
}
