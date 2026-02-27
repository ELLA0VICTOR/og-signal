export default function GlassPanel({ children, className = "", elevated = false, style = {} }) {
  return (
    <div
      className={`${elevated ? "glass-panel-elevated" : "glass-panel"} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}