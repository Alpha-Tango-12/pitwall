import { Minus, RefreshCw, ChevronsDown, ChevronsUp, ShieldAlert } from "lucide-react";

interface StrategyCard {
  title: string;
  icon: typeof Minus;
  body: string;
  insight: string;
}

const STRATEGY_CARDS: StrategyCard[] = [
  {
    title: "1-Stop Strategy",
    icon: Minus,
    body: "The driver makes a single pit stop during the race, running two stints on different tire compounds. Requires managing tire wear carefully to keep the car competitive to the end.",
    insight: "Works best on low-degradation circuits",
  },
  {
    title: "2-Stop Strategy",
    icon: RefreshCw,
    body: "Two pit stops dividing the race into three stints. Allows teams to use softer, faster tires more often, but the extra stop costs time in the pit lane.",
    insight: "Teams use this when tires wear quickly",
  },
  {
    title: "The Undercut",
    icon: ChevronsDown,
    body: "Pitting before your rival to get fresh tires first. The new tires give a temporary speed advantage that can make up the pit stop time loss and jump the rival when they eventually pit.",
    insight: "Most effective when fresh tires gain big lap time",
  },
  {
    title: "The Overcut",
    icon: ChevronsUp,
    body: "Staying out longer than a rival before pitting. The driver on older tires tries to build a big enough gap so they come out ahead after the rival pits and they pit later.",
    insight: "Works when traffic or pit lane time costs more",
  },
  {
    title: "Safety Car Window",
    icon: ShieldAlert,
    body: "When a Safety Car is deployed, gaps between cars collapse. Teams use this opportunity to pit without losing as much time — potentially jumping rivals without the usual cost.",
    insight: "A well-timed SC can flip the race",
  },
];

export function StrategySection() {
  return (
    <div className="space-y-3">
      {STRATEGY_CARDS.map(({ title, icon: Icon, body, insight }) => (
        <div
          key={title}
          className="rounded-xl border border-zinc-800 bg-zinc-900 p-4"
        >
          <div className="mb-2 flex items-center gap-2">
            <Icon className="h-4 w-4 text-zinc-400" />
            <h3 className="font-semibold text-white">{title}</h3>
          </div>
          <p className="mb-3 text-sm text-zinc-300">{body}</p>
          <div className="rounded-lg bg-zinc-800 px-3 py-2">
            <span className="text-xs font-medium text-zinc-500">Key insight: </span>
            <span className="text-xs text-zinc-300">{insight}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
