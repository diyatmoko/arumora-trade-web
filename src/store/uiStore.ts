import { create } from 'zustand';

type UiState = {
  sidebarCollapsed: boolean;
  drawerOpen: boolean;
  paletteOpen: boolean;
  toggleSidebar: () => void;
  setDrawerOpen: (open: boolean) => void;
  setPaletteOpen: (open: boolean) => void;
};

export const useUiStore = create<UiState>()((set) => ({
  sidebarCollapsed: false,
  drawerOpen: false,
  paletteOpen: false,
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  setDrawerOpen: (open) => set({ drawerOpen: open }),
  setPaletteOpen: (open) => set({ paletteOpen: open }),
}));
