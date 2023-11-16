"use client";

import { Theme } from "@/types/Theme";
import useTheme from "../../hooks/useTheme";
import useHydration from "@/hooks/useHydration";
import IconButton from "@/components/dls/IconButton";
import SunIcon from "../atoms/icons/SunIcon";
import MoonIcon from "../atoms/icons/MoonIcon";

const ThemeToggleIcon = () => {
  const { colorTheme, setColorTheme } = useTheme();
  const hydrated = useHydration();

  function toggleTheme() {
    if (colorTheme === Theme.Light) {
      setColorTheme(Theme.Dark);
    } else {
      setColorTheme(Theme.Light);
    }
  }

  if (!hydrated) return <></>;
  return (
    <IconButton className="ml-2 dark:text-slate-200" onClick={toggleTheme}>
      {colorTheme === Theme.Light ? <SunIcon /> : <MoonIcon />}
    </IconButton>
  );
};

export default ThemeToggleIcon;
