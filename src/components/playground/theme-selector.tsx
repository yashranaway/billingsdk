"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from "@/components/ui/dropdown-menu";
import { Palette, Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/theme-context";
import { usePlayground } from "./playground-context";
import { themes } from "@/lib/themes";

export function ThemeSelector() {
  const { currentTheme, setTheme, previewDarkMode, setPreviewDarkMode } = useTheme();
  const { setTheme: setPlaygroundTheme, setDarkMode } = usePlayground();
  const [isOpen, setIsOpen] = useState(false);

  const handleThemeSelect = (theme: typeof themes[0]) => {
    setTheme(theme);
    setPlaygroundTheme(theme);
    setIsOpen(false);
  };

  const toggleDarkMode = () => {
    const newDarkMode = !previewDarkMode;
    setPreviewDarkMode(newDarkMode);
    setDarkMode(newDarkMode);
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        size="sm"
        variant="outline"
        onClick={toggleDarkMode}
        className="h-8 w-8 p-0"
      >
        {previewDarkMode ? (
          <Sun className="h-4 w-4" />
        ) : (
          <Moon className="h-4 w-4" />
        )}
      </Button>
      
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button size="sm" variant="outline" className="h-8">
            <Palette className="h-4 w-4 mr-2" />
            {currentTheme.label}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">
            Themes
          </div>
          <DropdownMenuSeparator />
          {themes.map((theme) => (
            <DropdownMenuItem
              key={theme.name}
              onClick={() => handleThemeSelect(theme)}
              className="flex items-center justify-between"
            >
              <span>{theme.label}</span>
              {currentTheme.name === theme.name && (
                <div className="w-2 h-2 rounded-full bg-primary" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
