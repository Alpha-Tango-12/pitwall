import { NavLink } from "react-router-dom";
import { LayoutDashboard, CalendarDays, Trophy, Radio, BookOpen } from "lucide-react";

const NAV_ITEMS = [
  { to: "/", icon: LayoutDashboard, label: "Home" },
  { to: "/calendar", icon: CalendarDays, label: "Calendar" },
  { to: "/standings", icon: Trophy, label: "Standings" },
  { to: "/companion", icon: Radio, label: "Race" },
  { to: "/learn", icon: BookOpen, label: "Learn" },
] as const;

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden border-t border-zinc-800 bg-zinc-950/95 backdrop-blur-sm pb-[env(safe-area-inset-bottom)]">
      {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          end={to === "/"}
          className={({ isActive }) =>
            `flex flex-1 flex-col items-center gap-1 py-2 text-xs font-medium transition-colors min-h-[44px] ${
              isActive ? "text-f1-red" : "text-zinc-500"
            }`
          }
        >
          <Icon size={20} />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
