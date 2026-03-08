import { BookOpen, Flag, Calendar, TrendingUp, Trophy } from "lucide-react";
import type { LearnSection } from "@/types/app";

interface LearnSectionNavProps {
  active: LearnSection;
  onChange: (section: LearnSection) => void;
}

const SECTIONS: { value: LearnSection; label: string; icon: typeof BookOpen }[] = [
  { value: "glossary", label: "Glossary", icon: BookOpen },
  { value: "flags", label: "Flags", icon: Flag },
  { value: "weekend", label: "Weekend", icon: Calendar },
  { value: "strategy", label: "Strategy", icon: TrendingUp },
  { value: "points", label: "Points", icon: Trophy },
];

export function LearnSectionNav({ active, onChange }: LearnSectionNavProps) {
  return (
    <div className="overflow-x-auto scrollbar-none">
      <div className="flex gap-2 pb-1">
        {SECTIONS.map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            onClick={() => onChange(value)}
            className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              active === value
                ? "bg-zinc-800 text-white"
                : "text-zinc-400 hover:text-zinc-300"
            }`}
          >
            <Icon className="h-3.5 w-3.5" />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
