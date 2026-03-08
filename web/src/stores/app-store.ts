import { create } from "zustand";
import type {
  CompanionPanel,
  StandingsTab,
  GlossaryCategory,
  LearnSection,
} from "@/types/app";

interface AppState {
  standingsTab: StandingsTab;
  companionPanel: CompanionPanel;
  learnSection: LearnSection;
  glossarySearch: string;
  glossaryCategoryFilter: GlossaryCategory | null;
  useMockData: boolean;

  setStandingsTab: (tab: StandingsTab) => void;
  setCompanionPanel: (panel: CompanionPanel) => void;
  setLearnSection: (section: LearnSection) => void;
  setGlossarySearch: (query: string) => void;
  setGlossaryCategoryFilter: (category: GlossaryCategory | null) => void;
  setUseMockData: (useMock: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  standingsTab: "drivers",
  companionPanel: "events",
  learnSection: "glossary",
  glossarySearch: "",
  glossaryCategoryFilter: null,
  useMockData: false,

  setStandingsTab: (tab) => set({ standingsTab: tab }),
  setCompanionPanel: (panel) => set({ companionPanel: panel }),
  setLearnSection: (section) => set({ learnSection: section }),
  setGlossarySearch: (query) => set({ glossarySearch: query }),
  setGlossaryCategoryFilter: (category) =>
    set({ glossaryCategoryFilter: category }),
  setUseMockData: (useMock) => set({ useMockData: useMock }),
}));
