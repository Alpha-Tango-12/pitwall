import type { StandingsTab } from "@/types/app";

interface StandingsToggleProps {
  activeTab: StandingsTab;
  onTabChange: (tab: StandingsTab) => void;
}

const TABS: { value: StandingsTab; label: string }[] = [
  { value: "drivers", label: "Drivers" },
  { value: "constructors", label: "Constructors" },
];

export function StandingsToggle({ activeTab, onTabChange }: StandingsToggleProps) {
  return (
    <div className="mb-6 flex rounded-lg bg-zinc-900 p-1">
      {TABS.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onTabChange(tab.value)}
          className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === tab.value
              ? "bg-zinc-800 text-white"
              : "text-zinc-400 hover:text-zinc-300"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
