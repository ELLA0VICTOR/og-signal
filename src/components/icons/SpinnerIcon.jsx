export default function SpinnerIcon({ size = 18, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`animate-spin ${className}`}
      style={{ animationDuration: "0.8s" }}
    >
      {/* Background track */}
      <circle
        cx="10"
        cy="10"
        r="7.5"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="2"
      />
      {/* Animated arc */}
      <path
        d="M10 2.5A7.5 7.5 0 0 1 17.5 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}