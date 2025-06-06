// store.js
import { create } from "zustand";

export const useCacheStore = create((set, get) => ({
  cache: {},

  getData: (key) => get().cache[key],

  setData: (key, data) => {
    set((state) => ({
      cache: { ...state.cache, [key]: data },
    }));
  },
}));
