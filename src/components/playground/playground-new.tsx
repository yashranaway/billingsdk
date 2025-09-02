"use client";

import { useState } from "react";
import { PlaygroundHeaderNew } from "./playground-header-new";
import { CodePanel } from "./code-panel";
import { PreviewPanel } from "./preview-panel";
import { PlaygroundProvider } from "./playground-context";
import { Button } from "@/components/ui/button";
import { PanelLeft, PanelRight, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function PlaygroundNew() {
  const [showCodePanel, setShowCodePanel] = useState(true);
  const [showPreviewPanel, setShowPreviewPanel] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleImportComponent = () => {
    // You can implement custom import logic here
    console.log("Import component clicked");
  };

  const toggleCodePanel = () => setShowCodePanel(!showCodePanel);
  const togglePreviewPanel = () => setShowPreviewPanel(!showPreviewPanel);
  const toggleFullscreen = () => setIsFullscreen(!isFullscreen);

  return (
    <PlaygroundProvider>
      <div className={cn(
        "flex flex-col bg-gray-900 text-white",
        isFullscreen ? "fixed inset-0 z-50" : "h-screen"
      )}>
        {/* Header */}
        <PlaygroundHeaderNew onImportComponent={handleImportComponent} />
        
        {/* Panel Controls */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-gray-800/50">
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={toggleCodePanel}
              className={cn(
                "text-gray-400 hover:text-white",
                showCodePanel && "text-white bg-gray-700"
              )}
            >
              <PanelLeft className="h-4 w-4 mr-1" />
              Code
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={togglePreviewPanel}
              className={cn(
                "text-gray-400 hover:text-white",
                showPreviewPanel && "text-white bg-gray-700"
              )}
            >
              <PanelRight className="h-4 w-4 mr-1" />
              Preview
            </Button>
          </div>
          
          <Button
            size="sm"
            variant="ghost"
            onClick={toggleFullscreen}
            className="text-gray-400 hover:text-white"
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Main Content - Responsive Split */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel - CODE */}
          {showCodePanel && (
            <div className={cn(
              "border-r border-white/10",
              showPreviewPanel ? "w-1/2" : "w-full"
            )}>
              <CodePanel />
            </div>
          )}

          {/* Right Panel - PREVIEW */}
          {showPreviewPanel && (
            <div className={cn(
              showCodePanel ? "w-1/2" : "w-full"
            )}>
              <PreviewPanel />
            </div>
          )}
        </div>
      </div>
    </PlaygroundProvider>
  );
}
