export default function VerifyIcon({ size = 18, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M10 2L12.09 7.26L17.77 7.64L13.64 11.22L15.18 16.74L10 13.77L4.82 16.74L6.36 11.22L2.23 7.64L7.91 7.26L10 2Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M7.5 10L9 11.5L12.5 8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}