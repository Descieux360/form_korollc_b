import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { IconButton } from './IconButton';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage, then default to true (dark mode)
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    // Default to true if not set
    return true;
  });

  useEffect(() => {
    // Apply theme on mount/change
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className={`fixed top-10 right-6 sm:top-auto sm:right-auto sm:bottom-8 sm:left-8 z-[100] ${className}`}>
      <IconButton
        icon={isDark ? <Sun size={20} className="text-rose-400" /> : <Moon size={20} className="text-rose-600" />}
        variant="secondary"
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="rounded-full w-10 h-10 sm:w-11 sm:h-11 p-0! backdrop-blur-xl bg-white/80 dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800 shadow-xl shadow-stone-200/50 dark:shadow-none transition-transform hover:scale-110 active:scale-90"
      />
    </div>
  );
}
