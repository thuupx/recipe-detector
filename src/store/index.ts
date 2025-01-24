import { FujifilmExifData, RecipeSettingsResponse, SensorModel } from "@/types";
import { create, useStore } from "zustand";

type AppStore = {
  settings: RecipeSettingsResponse | null;
  setSettings: (settings: RecipeSettingsResponse) => void;
  sensorModel?: SensorModel;
  setSensorModel: (sensorModel: SensorModel) => void;
  exifData: FujifilmExifData | null;
  setExifData: (exifData: FujifilmExifData) => void;
};

export const appStore = create<AppStore>((set) => ({
  settings: null,
  setSettings: (settings) => set({ settings }),
  sensorModel: undefined,
  setSensorModel: (sensorModel) => set({ sensorModel }),
  exifData: null,
  setExifData: (exifData) => set({ exifData }),
}));

export const useAppStore = () => useStore(appStore);
