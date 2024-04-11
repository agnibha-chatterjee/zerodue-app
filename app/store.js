import { create } from "zustand";

const initialState = {
  user: null,
};

export const useStore = create((set) => ({
  ...initialState,
  setUser: (user) => set({ user }),
}));
