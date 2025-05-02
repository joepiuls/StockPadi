// store/useThemeStore.js
import { create } from 'zustand';

const useThemeStore = create((set) => ({
  isDark: false,
  toggleTheme: () => set((state) => {
    const newTheme = !state.isDark;
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    return { isDark: newTheme };
  }),
  initializeTheme: () => {
    const savedTheme = localStorage.getItem('theme');
    const isDark = savedTheme ? savedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', isDark);
    return set({ isDark });
  }
}));

export default useThemeStore;