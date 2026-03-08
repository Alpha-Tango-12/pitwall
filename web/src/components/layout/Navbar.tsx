import { NavLink } from "react-router-dom";
import { LayoutDashboard, CalendarDays, Trophy, Radio, BookOpen, Brain } from "lucide-react";

const NAV_ITEMS = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/calendar", icon: CalendarDays, label: "Calendar" },
  { to: "/standings", icon: Trophy, label: "Standings" },
  { to: "/companion", icon: Radio, label: "Companion" },
  { to: "/strategy", icon: Brain, label: "Strategy" },
  { to: "/learn", icon: BookOpen, label: "Learn F1" },
] as const;

export function Navbar() {
  return (
    <nav className="hidden md:flex items-center gap-1 border-b border-zinc-800 bg-zinc-950 px-6 py-3">
      <NavLink to="/" className="mr-6 text-lg font-bold text-f1-red">
        Pitwall
      </NavLink>
      {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              isActive
                ? "bg-zinc-800 text-white"
                : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
            }`
          }
        >
          <Icon size={18} />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
