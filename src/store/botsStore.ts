import { create } from 'zustand';
import { BOTS } from '../data/bots';
import type { Bot, BotStatus } from '../data/bots';

type BotsState = {
  bots: Bot[];
  toggle: (id: string) => void;
  setStatus: (id: string, status: BotStatus) => void;
};

const NEXT_STATUS: Record<BotStatus, BotStatus> = {
  running: 'paused',
  paused: 'running',
  stopped: 'running',
  error: 'running',
};

export const useBotsStore = create<BotsState>()((set) => ({
  bots: BOTS,
  toggle: (id) =>
    set((s) => ({
      bots: s.bots.map((b) => (b.id === id ? { ...b, status: NEXT_STATUS[b.status] } : b)),
    })),
  setStatus: (id, status) =>
    set((s) => ({ bots: s.bots.map((b) => (b.id === id ? { ...b, status } : b)) })),
}));
