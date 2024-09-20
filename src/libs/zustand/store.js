import { create } from "zustand";
import sunnyDay from "../../images/blue-sky-with-cloud-sunshine-day_1234738-421089.avif";

export const useWeatherStore = create((set) => ({
  temperature: "24",
  setTemperature: (temp) => set({ temperature: temp }),
}));
export const useBackgroundStore = create((set) => ({
  background: "Sunny",
  setBackground: (weather) => set({ background: weather }),
}));
