import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  setUser: (user, token) => {
    set({ user, token });
    localStorage.setItem("auth_token", token); // persist token
  },
  logout: () => {
    set({ user: null, token: null });
    localStorage.removeItem("auth_token");
  },
  loadToken: () => {
    const token = localStorage.getItem("auth_token");
    if (token) set({ token });
  },
}));
