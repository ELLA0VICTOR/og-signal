export default function SignalIcon({ size = 18, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Center dot */}
      <circle cx="10" cy="10" r="2" fill="currentColor" />
      {/* Inner arc */}
      <path
        d="M6.5 13.5a5 5 0 010-7"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M13.5 6.5a5 5 0 010 7"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
      {/* Outer arc */}
      <path
        d="M4 16a9 9 0 010-12"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M16 4a9 9 0 010 12"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
    </svg>
  );
}