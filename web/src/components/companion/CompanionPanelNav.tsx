import { Radio, Disc, Cloud } from "lucide-react";
import type { CompanionPanel } from "@/types/app";

interface CompanionPanelNavProps {
  activePanel: CompanionPanel;
  onPanelChange: (panel: CompanionPanel) => void;
}

const PANELS: { value: CompanionPanel; label: string; icon: typeof Radio }[] = [
  { value: "events", label: "Events", icon: Radio },
  { value: "tires", label: "Tires", icon: Disc },
  { value: "weather", label: "Weather", icon: Cloud },
];

export function CompanionPanelNav({ activePanel, onPanelChange }: CompanionPanelNavProps) {
  return (
    <div className="flex rounded-lg bg-zinc-900 p-1">
      {PANELS.map(({ value, label, icon: Icon }) => (
        <button
          key={value}
          onClick={() => onPanelChange(value)}
          className={`flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
            activePanel === value
              ? "bg-zinc-800 text-white"
              : "text-zinc-400 hover:text-zinc-300"
          }`}
        >
          <Icon className="h-3.5 w-3.5" />
          {label}
        </button>
      ))}
    </div>
  );
}
