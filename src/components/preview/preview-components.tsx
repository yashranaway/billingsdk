"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { FileText, Code, Palette, Check } from "lucide-react";
import { useTheme } from "@/contexts/theme-context";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

interface PreviewComponentsProps {  
  className?: string;
  children?: React.ReactNode;
}

export function PreviewComponents({ className, children }: PreviewComponentsProps) {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const { currentTheme, setTheme, themes } = useTheme();

  return (
    <Card className={cn("not-prose bg-background", className)}>
      <CardHeader className="pb-0">
        {/* Tab Buttons */}
        <div className="flex gap-2 justify-between">
          <div className="flex gap-2">
            <Button
              variant={activeTab === 'preview' ? 'outline' : 'ghost'}
              onClick={() => setActiveTab('preview')}
            >
              <FileText className="h-4 w-4" />
              Preview
            </Button>
            <Button
              variant={activeTab === 'code' ? 'outline' : 'ghost'}
              onClick={() => setActiveTab('code')}
            >
              <Code className="h-4 w-4" />
              Code
            </Button>
          </div>
          
          {/* Theme Switcher */}
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
      </CardHeader>

      <CardContent>
        {activeTab === 'preview' ? (
          <div>{children}</div>
        ) : (
          <div className="bg-muted p-4 rounded-md">
            <pre className="text-sm text-muted-foreground">
              <code>{`// Code view coming soon...`}</code>
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
}