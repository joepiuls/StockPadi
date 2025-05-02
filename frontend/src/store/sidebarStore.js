// store/sidebarStore.js
import { create } from 'zustand';

export const useSidebarStore = create((set) => ({
  badges: {},
  badgeError: null,
  setBadges: (badges) => set({ badges, badgeError: null }),
  setBadgeError: (error) => set({ badgeError: error }),
}));