export default function GlassButton({ children, onClick, disabled = false, className = "", type = "button", style = {} }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`glass-btn px-4 py-2 text-xs transition-all duration-150 ${className}`}
      style={style}
    >
      {children}
    </button>
  );
}