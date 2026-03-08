import { useState, useEffect } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { ErrorCard } from "@/components/common/ErrorCard";
import { SessionBanner } from "@/components/companion/SessionBanner";
import { CompanionPanelNav } from "@/components/companion/CompanionPanelNav";
import { RaceEventsPanel } from "@/components/companion/RaceEventsPanel";
import { TireStrategyPanel } from "@/components/companion/TireStrategyPanel";
import { WeatherPanel } from "@/components/companion/WeatherPanel";
import { ReplayControls } from "@/components/companion/ReplayControls";
import { useAppStore } from "@/stores/app-store";
import { useSessionStatus } from "@/hooks/useSessionStatus";
import { useRaceControl } from "@/hooks/useRaceControl";
import { useStints } from "@/hooks/useStints";
import { useWeather } from "@/hooks/useWeather";
import { useReplaySession } from "@/hooks/useReplaySession";
import { useDrivers } from "@/hooks/useDrivers";
import type { CompanionPanel, ReplaySpeed } from "@/types/app";

const LAP_INTERVAL_MS: Record<ReplaySpeed, number> = {
  0.5: 2000,
  1: 1000,
  2: 500,
  5: 200,
};

export function CompanionPage() {
  const { companionPanel, useMockData, setCompanionPanel, setUseMockData } =
    useAppStore();

  // Replay state (transient — not in Zustand)
  const [replayLap, setReplayLap] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [replaySpeed, setReplaySpeed] = useState<ReplaySpeed>(1);

  // Replay data (2025 AUS GP) — only fetch when in mock/replay mode
  const replay = useReplaySession(useMockData);

  // Live session data
  const sessionStatus = useSessionStatus();
  const liveSessionKey = !useMockData ? (sessionStatus.data?.sessionKey ?? null) : null;

  const driversQuery = useDrivers(liveSessionKey);
  const raceControlQuery = useRaceControl(liveSessionKey, driversQuery.data ?? new Map());
  const stintsQuery = useStints(liveSessionKey);
  const weatherQuery = useWeather(liveSessionKey);

  const isLive = !useMockData && (sessionStatus.data?.isLive ?? false);

  // Lap advance timer
  useEffect(() => {
    if (!isPlaying) return;
    if (replayLap >= replay.totalLaps) {
      setIsPlaying(false);
      return;
    }
    const id = setInterval(() => {
      setReplayLap((l) => {
        if (l >= replay.totalLaps) {
          setIsPlaying(false);
          return l;
        }
        return l + 1;
      });
    }, LAP_INTERVAL_MS[replaySpeed]);
    return () => clearInterval(id);
  }, [isPlaying, replaySpeed, replay.totalLaps, replayLap]);

  // Reset replay when toggling modes
  useEffect(() => {
    if (!useMockData) {
      setReplayLap(0);
      setIsPlaying(false);
    }
  }, [useMockData]);

  // Data selection
  const isLoading = useMockData
    ? replay.isLoading
    : raceControlQuery.isLoading || stintsQuery.isLoading || weatherQuery.isLoading;

  const error = useMockData
    ? replay.error
    : raceControlQuery.error ?? stintsQuery.error ?? weatherQuery.error ?? null;

  const raceName = useMockData
    ? replay.raceName
    : (sessionStatus.data?.sessionName ?? "Live Session");

  const sessionName = useMockData ? "Race · Replay" : (isLive ? "Live" : "Race");

  // Visible events: replay mode filters by lap, live mode shows all (already sorted newest-first)
  const visibleEvents = useMockData
    ? replay.events
        .filter((e) => e.lapNumber === null || e.lapNumber <= replayLap)
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    : (raceControlQuery.data ?? []);

  const drivers = useMockData ? replay.drivers : (stintsQuery.data ?? []);
  const weather = useMockData ? replay.weather : (weatherQuery.data ?? null);

  return (
    <div>
      <PageHeader
        title="Race Companion"
        subtitle="Follow along during the race"
      />

      <div className="space-y-4">
        <SessionBanner
          raceName={raceName}
          sessionName={sessionName}
          isLive={isLive}
          isReplay={useMockData}
          useMockData={useMockData}
          onToggleMock={setUseMockData}
        />

        {useMockData && !replay.isLoading && !replay.error && (
          <ReplayControls
            currentLap={replayLap}
            totalLaps={replay.totalLaps}
            isPlaying={isPlaying}
            speed={replaySpeed}
            onPlayPause={() => setIsPlaying((p) => !p)}
            onSeek={(lap) => {
              setReplayLap(lap);
              setIsPlaying(false);
            }}
            onSpeedChange={setReplaySpeed}
            onReset={() => {
              setReplayLap(0);
              setIsPlaying(false);
            }}
          />
        )}

        <CompanionPanelNav
          activePanel={companionPanel as CompanionPanel}
          onPanelChange={setCompanionPanel}
        />

        {isLoading && <LoadingSpinner />}

        {!isLoading && error && (
          <ErrorCard message="Could not load session data. Try switching to mock data." />
        )}

        {!isLoading && !error && (
          <>
            {companionPanel === "events" && (
              <RaceEventsPanel events={visibleEvents} />
            )}
            {companionPanel === "tires" && (
              <TireStrategyPanel
                drivers={drivers}
                currentLap={useMockData ? replayLap : undefined}
              />
            )}
            {companionPanel === "weather" && weather && (
              <WeatherPanel weather={weather} />
            )}
            {companionPanel === "weather" && !weather && (
              <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 text-center text-sm text-zinc-500">
                No weather data available
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
