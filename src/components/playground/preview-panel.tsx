"use client";

import React, { useEffect, useState } from "react";
import { usePlayground } from "./playground-context";
import { useTheme } from "@/contexts/theme-context";
import { Button } from "@/components/ui/button";
import { RefreshCw, Maximize2, Minimize2, Monitor, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";

type ViewportSize = "desktop" | "mobile";

export function PreviewPanel() {
  const { state } = usePlayground();
  const { previewDarkMode, currentTheme } = useTheme();
  const [error, setError] = useState<string | null>(null);
  const [Component, setComponent] = useState<React.ComponentType<any> | null>(null);
  const [viewportSize, setViewportSize] = useState<ViewportSize>("desktop");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (state.selectedComponent) {
      setComponent(() => state.selectedComponent!.component);
      setError(null);
    }
  }, [state.selectedComponent]);

  useEffect(() => {
    const root = document.documentElement;
    if (previewDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [previewDarkMode]);

  // Apply theme CSS variables
  useEffect(() => {
    const root = document.documentElement;
    const cssVars = previewDarkMode ? currentTheme.cssVars.dark : currentTheme.cssVars.light;
    
    Object.entries(cssVars).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });
  }, [currentTheme, previewDarkMode]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setError(null);
    
    // Small delay to show the refresh animation
    await new Promise(resolve => setTimeout(resolve, 100));
    
    setRefreshKey(prev => prev + 1);
    if (state.selectedComponent) {
      setComponent(() => state.selectedComponent!.component);
    }
    
    setIsRefreshing(false);
  };

  const getViewportWidth = () => {
    switch (viewportSize) {
      case "mobile": return "375px";
      default: return "100%";
    }
  };

  if (!state.selectedComponent) {
    return (
      <div className="h-full flex items-center justify-center bg-background text-muted-foreground">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2 text-foreground">PREVIEW</h3>
          <p className="text-sm">Select a component to see it in action</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "h-full flex flex-col bg-background",
      isFullscreen && "fixed inset-0 z-50"
    )}>
      {/* Preview Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/50">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Live Preview</span>
          <div className="flex items-center gap-1 ml-2">
            {viewportSize === "mobile" ? (
              <Smartphone className="h-3 w-3 text-muted-foreground" />
            ) : (
              <Monitor className="h-3 w-3 text-muted-foreground" />
            )}
            <span className="text-xs text-muted-foreground capitalize">{viewportSize}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          {/* Viewport Controls */}
          <div className="flex items-center gap-1 mr-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setViewportSize("mobile")}
              className={cn(
                "h-8 w-8 p-0",
                viewportSize === "mobile" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Smartphone className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setViewportSize("desktop")}
              className={cn(
                "h-8 w-8 p-0",
                viewportSize === "desktop" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Monitor className="h-4 w-4" />
            </Button>
          </div>

          <Button
            size="sm"
            variant="ghost"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="h-7 px-2 text-muted-foreground hover:text-foreground disabled:opacity-50"
          >
            <RefreshCw className={cn("h-3 w-3", isRefreshing && "animate-spin")} />
          </Button>
          
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="h-7 px-2 text-muted-foreground hover:text-foreground"
          >
            {isFullscreen ? (
              <Minimize2 className="h-3 w-3" />
            ) : (
              <Maximize2 className="h-3 w-3" />
            )}
          </Button>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 overflow-auto bg-background">
        <div className="min-h-full flex items-center justify-center p-4">
          {error ? (
            <div className="text-center p-8">
              <div className="text-destructive text-lg font-semibold mb-2">
                Component Error
              </div>
              <div className="text-muted-foreground mb-4">{error}</div>
              <Button onClick={handleRefresh} variant="outline" size="sm">
                Try Again
              </Button>
            </div>
          ) : Component ? (
            <div 
              className={cn(
                "w-full transition-all duration-300 ease-in-out",
                viewportSize === "mobile" ? "max-w-sm" : "max-w-6xl"
              )}
              style={{ 
                maxWidth: getViewportWidth(),
                minHeight: viewportSize === "mobile" ? "600px" : "auto"
              }}
            >
              <div className="w-full h-full flex items-center justify-center">
                <ErrorBoundary key={refreshKey} onError={setError}>
                  <Component key={refreshKey} {...state.props} />
                </ErrorBoundary>
              </div>
            </div>
          ) : (
            <div className="text-center text-muted-foreground">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
              <p>Loading component...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Error Boundary for Component Preview
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; onError: (error: string) => void },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; onError: (error: string) => void }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    this.props.onError(error.message);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center p-8">
          <div className="text-destructive text-lg font-semibold mb-2">
            Component Failed to Render
          </div>
          <div className="text-muted-foreground">
            Check the code for syntax errors or invalid props
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
