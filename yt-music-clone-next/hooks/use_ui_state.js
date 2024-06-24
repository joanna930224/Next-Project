import { create } from "zustand";

const useUIState = create((set) => ({
  homeCategory: "",
  homeImageSrc:
    "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  setHomeCategory: (value) => set({ homeCategory: value }),
  setHomeImageSrc: (src) => set({ homeImageSrc: src }),
}));

export default useUIState;
