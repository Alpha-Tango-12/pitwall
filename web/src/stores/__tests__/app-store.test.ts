import { describe, it, expect, beforeEach } from "vitest";
import { useAppStore } from "../app-store";

describe("app-store", () => {
  beforeEach(() => {
    useAppStore.setState({
      standingsTab: "drivers",
      companionPanel: "events",
      learnSection: "glossary",
      glossarySearch: "",
      glossaryCategoryFilter: null,
      useMockData: true,
    });
  });

  it("has correct default values", () => {
    const state = useAppStore.getState();
    expect(state.standingsTab).toBe("drivers");
    expect(state.companionPanel).toBe("events");
    expect(state.learnSection).toBe("glossary");
    expect(state.glossarySearch).toBe("");
    expect(state.glossaryCategoryFilter).toBeNull();
    expect(state.useMockData).toBe(true);
  });

  it("setStandingsTab toggles between drivers/constructors", () => {
    useAppStore.getState().setStandingsTab("constructors");
    expect(useAppStore.getState().standingsTab).toBe("constructors");
  });

  it("setCompanionPanel switches panels", () => {
    useAppStore.getState().setCompanionPanel("tires");
    expect(useAppStore.getState().companionPanel).toBe("tires");
  });

  it("setGlossarySearch updates search", () => {
    useAppStore.getState().setGlossarySearch("DRS");
    expect(useAppStore.getState().glossarySearch).toBe("DRS");
  });

  it("setGlossaryCategoryFilter updates filter", () => {
    useAppStore.getState().setGlossaryCategoryFilter("strategy");
    expect(useAppStore.getState().glossaryCategoryFilter).toBe("strategy");
  });

  it("setLearnSection updates section", () => {
    useAppStore.getState().setLearnSection("flags");
    expect(useAppStore.getState().learnSection).toBe("flags");
  });

  it("state changes are independent", () => {
    useAppStore.getState().setStandingsTab("constructors");
    useAppStore.getState().setCompanionPanel("weather");
    expect(useAppStore.getState().standingsTab).toBe("constructors");
    expect(useAppStore.getState().companionPanel).toBe("weather");
    expect(useAppStore.getState().glossarySearch).toBe("");
  });

  it("setUseMockData toggles mock data", () => {
    useAppStore.getState().setUseMockData(false);
    expect(useAppStore.getState().useMockData).toBe(false);
  });
});
