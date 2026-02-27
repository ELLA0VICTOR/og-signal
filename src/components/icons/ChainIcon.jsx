export default function ChainIcon({ size = 16, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M6.5 11.5L11.5 6.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M9.172 8.828L10.94 7.06a2.5 2.5 0 013.536 3.536L12.708 12.364"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.828 9.172L7.06 10.94a2.5 2.5 0 01-3.536-3.536L5.292 5.636"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}