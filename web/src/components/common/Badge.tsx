type BadgeVariant = "default" | "red" | "green" | "yellow" | "blue";

interface BadgeProps {
  text: string;
  variant?: BadgeVariant;
}

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  default: "bg-zinc-800 text-zinc-300",
  red: "bg-red-900/50 text-red-400",
  green: "bg-green-900/50 text-green-400",
  yellow: "bg-yellow-900/50 text-yellow-400",
  blue: "bg-blue-900/50 text-blue-400",
};

export function Badge({ text, variant = "default" }: BadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${VARIANT_CLASSES[variant]}`}>
      {text}
    </span>
  );
}
