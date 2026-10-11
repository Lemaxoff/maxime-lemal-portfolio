import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Activer le mode clair" : "Activer le mode sombre"}
      className="relative w-10 h-10 rounded-full glass-card flex items-center justify-center text-primary hover:text-primary hover:scale-110 transition-all duration-300 hover:shadow-[0_0_20px_hsl(var(--gold)/0.4)]"
    >
      <Sun
        size={18}
        className={`absolute transition-all duration-500 ${
          isDark ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
        }`}
      />
      <Moon
        size={18}
        className={`absolute transition-all duration-500 ${
          isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"
        }`}
      />
    </button>
  );
};

export default ThemeToggle;
