export default function WalletIcon({ size = 18, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="2" y="5" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M2 9h16" stroke="currentColor" strokeWidth="1.4" />
      <path d="M2 5.5C2 4.12 3.12 3 4.5 3h11C16.88 3 18 4.12 18 5.5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="14.5" cy="13" r="1.5" fill="currentColor" />
    </svg>
  );
}