import { describe, it, expect } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { useRaceControl } from "../useRaceControl";
import { http, HttpResponse } from "msw";
import { server } from "@/test/msw/server";

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: 0 } },
  });
  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };
}

describe("useRaceControl", () => {
  it("maps YELLOW flag to correct explanation", async () => {
    const { result } = renderHook(() => useRaceControl(9999), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const events = result.current.data!;
    expect(events[0]!.severity).toBe("warning");
    expect(events[0]!.explanation).toContain("slow down");
  });

  it("maps RED flag to danger severity", async () => {
    server.use(
      http.get("https://api.openf1.org/v1/race_control", () => {
        return HttpResponse.json([
          {
            meeting_key: 1300,
            session_key: 9999,
            date: "2026-03-15T04:20:00+00:00",
            driver_number: null,
            lap_number: 10,
            category: "Flag",
            flag: "RED",
            scope: "Track",
            sector: null,
            qualifying_phase: null,
            message: "RED FLAG",
          },
        ]);
      }),
    );

    const { result } = renderHook(() => useRaceControl(9999), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data![0]!.severity).toBe("danger");
  });

  it("maps DRS ENABLED to info severity", async () => {
    server.use(
      http.get("https://api.openf1.org/v1/race_control", () => {
        return HttpResponse.json([
          {
            meeting_key: 1300,
            session_key: 9999,
            date: "2026-03-15T04:25:00+00:00",
            driver_number: null,
            lap_number: 12,
            category: "Drs",
            flag: null,
            scope: null,
            sector: null,
            qualifying_phase: null,
            message: "DRS ENABLED",
          },
        ]);
      }),
    );

    const { result } = renderHook(() => useRaceControl(9999), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data![0]!.severity).toBe("info");
    expect(result.current.data![0]!.explanation).toContain("DRS");
  });

  it("maps SafetyCar to warning severity", async () => {
    server.use(
      http.get("https://api.openf1.org/v1/race_control", () => {
        return HttpResponse.json([
          {
            meeting_key: 1300,
            session_key: 9999,
            date: "2026-03-15T04:50:00+00:00",
            driver_number: null,
            lap_number: 27,
            category: "SafetyCar",
            flag: "YELLOW",
            scope: "Track",
            sector: null,
            qualifying_phase: null,
            message: "SAFETY CAR DEPLOYED",
          },
        ]);
      }),
    );

    const { result } = renderHook(() => useRaceControl(9999), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data![0]!.severity).toBe("warning");
  });

  it("sorts by timestamp descending (newest first)", async () => {
    server.use(
      http.get("https://api.openf1.org/v1/race_control", () => {
        return HttpResponse.json([
          {
            meeting_key: 1300, session_key: 9999,
            date: "2026-03-15T04:10:00+00:00",
            driver_number: null, lap_number: 5,
            category: "Flag", flag: "GREEN", scope: null, sector: null, qualifying_phase: null,
            message: "GREEN FLAG",
          },
          {
            meeting_key: 1300, session_key: 9999,
            date: "2026-03-15T04:20:00+00:00",
            driver_number: null, lap_number: 10,
            category: "Flag", flag: "YELLOW", scope: "Sector", sector: 2, qualifying_phase: null,
            message: "YELLOW IN SECTOR 2",
          },
        ]);
      }),
    );

    const { result } = renderHook(() => useRaceControl(9999), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    const events = result.current.data!;
    expect(events[0]!.flag).toBe("YELLOW");
    expect(events[1]!.flag).toBe("GREEN");
  });

  it("falls back to raw message for unknown categories", async () => {
    server.use(
      http.get("https://api.openf1.org/v1/race_control", () => {
        return HttpResponse.json([
          {
            meeting_key: 1300, session_key: 9999,
            date: "2026-03-15T04:10:00+00:00",
            driver_number: null, lap_number: 5,
            category: "Other", flag: null, scope: null, sector: null, qualifying_phase: null,
            message: "TRACK LIMITS - CAR 4 LAP 5 TURN 9",
          },
        ]);
      }),
    );

    const { result } = renderHook(() => useRaceControl(9999), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data![0]!.explanation).toBe("TRACK LIMITS - CAR 4 LAP 5 TURN 9");
  });
});
