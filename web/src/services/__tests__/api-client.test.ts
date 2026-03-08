import { describe, it, expect } from "vitest";
import { http, HttpResponse } from "msw";
import { server } from "@/test/msw/server";
import { fetchOpenF1, fetchJolpica, ApiError } from "../api-client";

describe("api-client", () => {
  describe("fetchOpenF1", () => {
    it("constructs correct URL with query params", async () => {
      const result = await fetchOpenF1<{ session_key: number }>("sessions", {
        year: 2026,
      });
      expect(result).toHaveLength(1);
      expect(result[0]!.session_key).toBe(9999);
    });

    it("handles 200 responses with JSON parsing", async () => {
      const result = await fetchOpenF1("drivers", { session_key: "latest" });
      expect(Array.isArray(result)).toBe(true);
    });

    it("handles 404 with ApiError", async () => {
      server.use(
        http.get("https://api.openf1.org/v1/sessions", () => {
          return new HttpResponse(null, { status: 404 });
        }),
      );
      await expect(fetchOpenF1("sessions")).rejects.toThrow(ApiError);
    });

    it("handles 500 with ApiError", async () => {
      server.use(
        http.get("https://api.openf1.org/v1/sessions", () => {
          return new HttpResponse(null, { status: 500 });
        }),
      );
      await expect(fetchOpenF1("sessions")).rejects.toThrow(ApiError);
    });

    it("handles network errors", async () => {
      server.use(
        http.get("https://api.openf1.org/v1/sessions", () => {
          return HttpResponse.error();
        }),
      );
      await expect(fetchOpenF1("sessions")).rejects.toThrow();
    });

    it("returns empty array when API returns empty", async () => {
      server.use(
        http.get("https://api.openf1.org/v1/sessions", () => {
          return HttpResponse.json([]);
        }),
      );
      const result = await fetchOpenF1("sessions");
      expect(result).toEqual([]);
    });
  });

  describe("fetchJolpica", () => {
    it("fetches and returns JSON", async () => {
      const result = await fetchJolpica<{ MRData: { RaceTable: { Races: unknown[] } } }>(
        "2026.json",
      );
      expect(result.MRData.RaceTable.Races).toHaveLength(1);
    });

    it("handles 404 with ApiError", async () => {
      server.use(
        http.get("https://api.jolpi.ca/ergast/f1/9999.json", () => {
          return new HttpResponse(null, { status: 404 });
        }),
      );
      await expect(fetchJolpica("9999.json")).rejects.toThrow(ApiError);
    });
  });
});
