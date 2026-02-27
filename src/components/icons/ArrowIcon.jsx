export default function ArrowIcon({ size = 16, direction = "right", className = "" }) {
  const rotations = { up: -90, down: 90, left: 180, right: 0 };
  const rotation = rotations[direction] || 0;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ transform: `rotate(${rotation}deg)`, display: "inline-block" }}
    >
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}