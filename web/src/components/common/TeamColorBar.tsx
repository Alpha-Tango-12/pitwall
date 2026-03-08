interface TeamColorBarProps {
  color: string;
  className?: string;
}

export function TeamColorBar({ color, className = "" }: TeamColorBarProps) {
  return (
    <div
      className={`w-1 rounded-full ${className}`}
      style={{ backgroundColor: color }}
    />
  );
}
