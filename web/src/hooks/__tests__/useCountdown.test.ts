import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCountdown } from "../useCountdown";

describe("useCountdown", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns correct days/hours/minutes/seconds for future date", () => {
    vi.setSystemTime(new Date("2026-03-10T00:00:00Z"));
    const target = new Date("2026-03-15T04:00:00Z");
    const { result } = renderHook(() => useCountdown(target));

    expect(result.current.days).toBe(5);
    expect(result.current.hours).toBe(4);
    expect(result.current.minutes).toBe(0);
    expect(result.current.seconds).toBe(0);
    expect(result.current.isExpired).toBe(false);
  });

  it("returns isExpired=true for past date", () => {
    vi.setSystemTime(new Date("2026-03-16T00:00:00Z"));
    const target = new Date("2026-03-15T04:00:00Z");
    const { result } = renderHook(() => useCountdown(target));

    expect(result.current.isExpired).toBe(true);
    expect(result.current.days).toBe(0);
    expect(result.current.hours).toBe(0);
    expect(result.current.minutes).toBe(0);
    expect(result.current.seconds).toBe(0);
  });

  it("updates every second", () => {
    vi.setSystemTime(new Date("2026-03-15T03:59:57Z"));
    const target = new Date("2026-03-15T04:00:00Z");
    const { result } = renderHook(() => useCountdown(target));

    expect(result.current.seconds).toBe(3);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.seconds).toBe(2);
  });

  it("returns zero values when expired", () => {
    vi.setSystemTime(new Date("2026-04-01T00:00:00Z"));
    const target = new Date("2026-03-15T04:00:00Z");
    const { result } = renderHook(() => useCountdown(target));

    expect(result.current).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isExpired: true,
    });
  });
});
