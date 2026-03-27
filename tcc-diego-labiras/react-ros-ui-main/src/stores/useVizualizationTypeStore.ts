import { create } from "zustand";

export type VizualizationType = "roomba" | "logs";

interface VizualizationTypeStore {
  vizualizationType: VizualizationType;
  setVizualizationType: (vizualizationType: VizualizationType) => void;
}

export const useVizualizationTypeStore = create<VizualizationTypeStore>(
  (set) => ({
    vizualizationType: "roomba",
    setVizualizationType: (vizualizationType: VizualizationType) =>
      set({ vizualizationType }),
  })
);
