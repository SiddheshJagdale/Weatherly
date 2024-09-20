import { create } from "zustand";

export const useWeatherStore = create((set) => ({
  temperature: "24",
  setTemperature: (temp) => set({ temperature: temp }),
}));
