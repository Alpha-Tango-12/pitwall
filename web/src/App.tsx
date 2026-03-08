import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Layout } from "@/components/layout/Layout";
import { DashboardPage } from "@/routes/DashboardPage";
import { CalendarPage } from "@/routes/CalendarPage";
import { StandingsPage } from "@/routes/StandingsPage";
import { CompanionPage } from "@/routes/CompanionPage";
import { LearnPage } from "@/routes/LearnPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});


export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/standings" element={<StandingsPage />} />
            <Route path="/companion" element={<CompanionPage />} />
            <Route path="/learn" element={<LearnPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
