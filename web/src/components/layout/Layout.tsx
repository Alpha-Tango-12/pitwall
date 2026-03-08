import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { BottomNav } from "./BottomNav";

export function Layout() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 py-6 pb-24 md:pb-6">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
