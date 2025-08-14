"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Palette, Check, Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/theme-context";
import { getThemeStyles } from "@/lib/themes";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

interface PreviewComponentsProps {  
  className?: string;
  children?: React.ReactNode;
}

export function PreviewComponents({ className, children }: PreviewComponentsProps) {
  const { currentTheme, setTheme, themes, previewDarkMode, setPreviewDarkMode } = useTheme();
  const themeStyles = getThemeStyles(currentTheme, previewDarkMode);

  return (
    <Card 
      className={cn("not-prose bg-background", className)} 
      style={themeStyles}
    >
      <CardHeader className="pb-0" style={previewDarkMode ? themes[0].cssVars.dark : themes[0].cssVars.light}>
        <div className="flex gap-2 justify-end">
          <div className="flex gap-2">
            <Button
              onClick={() => window.open('https://v0.app', '_blank')}
              size={"sm"}
              aria-label="Open in V0"
            >
              <span className="hidden md:block">Open in</span>
              <svg 
                viewBox="0 0 40 20" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 text-current"
              >
                <path 
                  d="M23.3919 0H32.9188C36.7819 0 39.9136 3.13165 39.9136 6.99475V16.0805H36.0006V6.99475C36.0006 6.90167 35.9969 6.80925 35.9898 6.71766L26.4628 16.079C26.4949 16.08 26.5272 16.0805 26.5595 16.0805H36.0006V19.7762H26.5595C22.6964 19.7762 19.4788 16.6139 19.4788 12.7508V3.68923H23.3919V12.7508C23.3919 12.9253 23.4054 13.0977 23.4316 13.2668L33.1682 3.6995C33.0861 3.6927 33.003 3.68923 32.9188 3.68923H23.3919V0Z" 
                  fill="currentColor"
                />
                <path 
                  d="M13.7688 19.0956L0 3.68759H5.53933L13.6231 12.7337V3.68759H17.7535V17.5746C17.7535 19.6705 15.1654 20.6584 13.7688 19.0956Z" 
                  fill="currentColor"
                />
              </svg>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setPreviewDarkMode(!previewDarkMode)}
            >
              {previewDarkMode ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
              <span className="sr-only">Toggle preview dark mode</span>
            </Button>
            
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <Button variant="ghost" size="sm">
                  <Palette className="h-4 w-4" />
                  <span className="sr-only">Switch theme</span>
                </Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content 
                  className="min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md z-50"
                  sideOffset={4}
                >
                  {themes.map((theme) => (
                    <DropdownMenu.Item
                      key={theme.name}
                      className={cn(
                        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                        "hover:bg-accent hover:text-accent-foreground"
                      )}
                      onClick={() => setTheme(theme)}
                    >
                      <div className="flex items-center gap-2">
                        <div 
                          className="h-4 w-4 rounded-full border-2 border-border"
                          style={{ 
                            background: `linear-gradient(45deg, ${theme.cssVars.light['--primary']}, ${theme.cssVars.light['--accent']})` 
                          }}
                        />
                        <span>{theme.label}</span>
                        {currentTheme.name === theme.name && (
                          <Check className="ml-auto h-4 w-4" />
                        )}
                      </div>
                    </DropdownMenu.Item>
                  ))}
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 w-full h-full">
        {children}
      </CardContent>
    </Card>
  );
}