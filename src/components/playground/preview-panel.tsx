"use client";

import React, { useEffect, useState } from "react";
import { usePlayground } from "./playground-context";
import { useTheme } from "@/contexts/theme-context";
import { Button } from "@/components/ui/button";
import { RefreshCw, Maximize2, Minimize2, Monitor, Smartphone, Tablet } from "lucide-react";
import { cn } from "@/lib/utils";

type ViewportSize = "desktop" | "tablet" | "mobile";

export function PreviewPanel() {
  const { state } = usePlayground();
  const { previewDarkMode, currentTheme } = useTheme();
  const [error, setError] = useState<string | null>(null);
  const [Component, setComponent] = useState<React.ComponentType<any> | null>(null);
  const [viewportSize, setViewportSize] = useState<ViewportSize>("desktop");
  const [isFullscreen, setIsFullscreen] = useState(false);

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

  const handleRefresh = () => {
    setError(null);
    if (state.selectedComponent) {
      setComponent(() => state.selectedComponent!.component);
    }
  };

  const getViewportWidth = () => {
    switch (viewportSize) {
      case "mobile": return "375px";
      case "tablet": return "768px";
      default: return "100%";
    }
  };

  if (!state.selectedComponent) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-900 text-gray-400">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2 text-white">PREVIEW</h3>
          <p className="text-sm">Select a component to see it in action</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "h-full flex flex-col bg-gray-900",
      isFullscreen && "fixed inset-0 z-50"
    )}>
      {/* Preview Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-gray-800/50">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Live Preview</span>
        </div>
        
        <div className="flex items-center gap-1">
          {/* Viewport Controls */}
          <div className="flex items-center gap-1 mr-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setViewportSize("mobile")}
              className={cn(
                "h-7 w-7 p-0",
                viewportSize === "mobile" ? "bg-gray-700 text-white" : "text-gray-400 hover:text-white"
              )}
            >
              <Smartphone className="h-3 w-3" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setViewportSize("tablet")}
              className={cn(
                "h-7 w-7 p-0",
                viewportSize === "tablet" ? "bg-gray-700 text-white" : "text-gray-400 hover:text-white"
              )}
            >
              <Tablet className="h-3 w-3" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setViewportSize("desktop")}
              className={cn(
                "h-7 w-7 p-0",
                viewportSize === "desktop" ? "bg-gray-700 text-white" : "text-gray-400 hover:text-white"
              )}
            >
              <Monitor className="h-3 w-3" />
            </Button>
          </div>

          <Button
            size="sm"
            variant="ghost"
            onClick={handleRefresh}
            className="h-7 px-2 text-gray-400 hover:text-white"
          >
            <RefreshCw className="h-3 w-3" />
          </Button>
          
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="h-7 px-2 text-gray-400 hover:text-white"
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
      <div className="flex-1 overflow-auto p-6 bg-gray-900">
        <div className="min-h-full flex items-center justify-center">
          {error ? (
            <div className="text-center p-8">
              <div className="text-red-500 text-lg font-semibold mb-2">
                Component Error
              </div>
              <div className="text-gray-400 mb-4">{error}</div>
              <Button onClick={handleRefresh} variant="outline" size="sm">
                Try Again
              </Button>
            </div>
          ) : Component ? (
            <div 
              className="w-full max-w-4xl transition-all duration-200"
              style={{ maxWidth: getViewportWidth() }}
            >
              <ErrorBoundary onError={setError}>
                <Component {...state.props} />
              </ErrorBoundary>
            </div>
          ) : (
            <div className="text-center text-gray-400">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
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
          <div className="text-red-500 text-lg font-semibold mb-2">
            Component Failed to Render
          </div>
          <div className="text-gray-400">
            Check the code for syntax errors or invalid props
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
