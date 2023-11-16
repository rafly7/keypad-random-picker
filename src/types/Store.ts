import { ThemeState } from "./Theme";

type Store = {
    colorTheme: ThemeState;
    setColorTheme: (theme: ThemeState) => void;
};

export default Store;
