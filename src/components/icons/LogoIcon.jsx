export default function LogoIcon({ size = 32, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer ring */}
      <circle cx="16" cy="16" r="14" stroke="rgba(0,229,160,0.4)" strokeWidth="1" />
      {/* Signal rings */}
      <circle cx="16" cy="16" r="10" stroke="rgba(0,229,160,0.3)" strokeWidth="1" strokeDasharray="3 2" />
      {/* Core hexagon */}
      <path
        d="M16 7L22.928 11V19L16 23L9.072 19V11L16 7Z"
        fill="rgba(0,229,160,0.12)"
        stroke="rgba(0,229,160,0.7)"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      {/* Center dot */}
      <circle cx="16" cy="16" r="2.5" fill="#00e5a0" />
      {/* Vertical signal line */}
      <line x1="16" y1="3" x2="16" y2="9" stroke="#00e5a0" strokeWidth="1.5" strokeLinecap="round" />
      {/* Top signal arcs */}
      <path
        d="M11 6.5 C11 6.5 13.5 4 16 4 C18.5 4 21 6.5 21 6.5"
        stroke="rgba(0,229,160,0.5)"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}