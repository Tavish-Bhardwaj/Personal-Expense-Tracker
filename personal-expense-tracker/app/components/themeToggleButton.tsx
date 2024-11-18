
"use client";

import { useTheme } from "../contexts/ThemeContext";
import { Button } from "@/components/ui/button";

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      onClick={toggleTheme}
      className="p-2 flex items-center gap-2 rounded-md bg-card dark:bg-card-foreground text-foreground dark:text-primary-foreground border border-border dark:border-muted shadow-md hover:bg-muted hover:dark:bg-muted-foreground"
    >
      {theme === "light" ? (
        <>
          🌙 <span className="hidden sm:inline">Dark Mode</span>
        </>
      ) : (
        <>
          ☀️ <span className="hidden sm:inline">Light Mode</span>
        </>
      )}
    </Button>
  );
};

export default ThemeToggleButton;
