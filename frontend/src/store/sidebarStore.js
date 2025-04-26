import { create } from "zustand";

export const useSidebarStore = create((set) => ({
  badges: {},
  setBadges: (newBadges) => set({ badges: newBadges }),
}));
