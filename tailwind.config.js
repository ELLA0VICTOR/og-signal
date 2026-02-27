/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Instrument Serif", "Georgia", "serif"],
        mono: ["IBM Plex Mono", "Courier New", "monospace"],
        body: ["IBM Plex Mono", "Courier New", "monospace"],
      },
      colors: {
        black: "#000000",
        surface: "#0a0a0a",
        raised: "#111111",
        border: "rgba(255,255,255,0.08)",
        buy: "#4ade80",
        sell: "#f87171",
        hold: "#fbbf24",
        accent: "#ffffff",
      },
      borderRadius: {
        panel: "6px",
        btn: "4px",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) both",
        "fade-in": "fadeIn 0.4s ease both",
        shimmer: "shimmer 2s linear infinite",
        spin: "spin 1s linear infinite",
        blink: "blink 1.2s step-end infinite",
        "slide-in": "slideIn 0.4s cubic-bezier(0.16,1,0.3,1) both",
      },
    },
  },
  plugins: [],
};