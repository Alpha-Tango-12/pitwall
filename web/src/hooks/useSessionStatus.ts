import { useQuery } from "@tanstack/react-query";
import { fetchSessions } from "@/services/openf1";
import type { SessionStatus } from "@/types/app";

export function useSessionStatus(year: number = new Date().getFullYear()) {
  return useQuery({
    queryKey: ["sessionStatus", year],
    queryFn: () => fetchSessions({ year }),
    refetchInterval: 60_000,
    select: (sessions): SessionStatus => {
      const now = Date.now();
      const active = sessions.find((s) => {
        const start = new Date(s.date_start).getTime();
        const end = new Date(s.date_end).getTime();
        return now >= start && now <= end;
      });

      if (active) {
        return {
          isLive: true,
          sessionKey: active.session_key,
          sessionName: active.session_name,
        };
      }

      return { isLive: false, sessionKey: null, sessionName: null };
    },
  });
}
