import { create } from "zustand";
import { TRADING_PAIRS } from "../config/constants";

export const useAppStore = create((set) => ({
  // Selected trading pair
  selectedPair: TRADING_PAIRS[0],
  setSelectedPair: (pair) => set({ selectedPair: pair, signalResult: null, error: null }),

  // Market data
  marketData: null,
  isMarketLoading: false,
  marketError: null,
  setMarketData: (data) => set({ marketData: data }),
  setMarketLoading: (v) => set({ isMarketLoading: v }),
  setMarketError: (e) => set({ marketError: e }),

  // Signal result
  signalResult: null,
  setSignalResult: (result) => set({ signalResult: result }),

  // Loading / error state for signal generation
  isLoading: false,
  error: null,
  setLoading: (v) => set({ isLoading: v }),
  setError: (e) => set({ error: e }),
}));