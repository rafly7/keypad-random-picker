import Store from "@/types/Store";
import { Theme, ThemeState } from "@/types/Theme";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create<Store>()(
    persist(
        (set, get) => ({
            colorTheme: Theme.Light,
            setColorTheme: (theme: ThemeState) => set({ colorTheme: theme }),
        }),
        {
            name: "user-data",
            partialize(state) {
                return {
                    colorTheme: state.colorTheme,
                };
            },
        }
    )
);

export default useStore;
