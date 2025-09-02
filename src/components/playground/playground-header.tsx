"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import {  Download } from "lucide-react";
import { usePlayground } from "./playground-context";
import { componentRegistry } from "./component-registry";
import { PlaygroundLogo } from "./playground-logo";
import { ThemeSelector } from "./theme-selector";
import Link from "next/link";

interface PlaygroundHeaderProps {
  onImportComponent?: () => void;
}

export function PlaygroundHeader({ onImportComponent }: PlaygroundHeaderProps) {
  const { state, setSelectedComponent } = usePlayground();
  const [selectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Components" },
    { id: "pricing", label: "Pricing Tables" },
    { id: "subscription", label: "Subscription" },
    { id: "usage", label: "Usage & Billing" },
    { id: "ui", label: "UI Components" },
  ];

  const filteredComponents = selectedCategory === "all" 
    ? componentRegistry 
    : componentRegistry.filter(comp => comp.category === selectedCategory);

  const handleComponentChange = (componentId: string) => {
    const component = componentRegistry.find(comp => comp.id === componentId);
    if (component) {
      setSelectedComponent(component);
    }
  };

  const handleImportComponent = () => {
    if (onImportComponent) {
      onImportComponent();
    } else {
      navigator.clipboard.writeText(state.code);
    }
  };

  return (
    <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left Section - Play Button, Logo, Component Selector */}
        <div className="flex items-center gap-4">
          <Link href="/">
            <PlaygroundLogo />
          </Link>

          {/* Component Selector */}
          <Select value={state.selectedComponent?.id || ""} onValueChange={handleComponentChange}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Select a component" />
            </SelectTrigger>
            <SelectContent className="w-96 min-w-96 max-h-96 overflow-y-auto">
              {categories.map(category => (
                <div key={category.id}>
                  <div className="px-3 py-2 text-sm font-semibold text-foreground bg-muted/50 border-b border-border">
                    {category.label}
                  </div>
                  {filteredComponents
                    .filter(comp => comp.category === category.id || category.id === "all")
                    .map(component => (
                      <SelectItem 
                        key={component.id} 
                        value={component.id}
                        className="px-3 py-3"
                      >
                        <div className="flex flex-col w-full">
                          <span className="font-medium text-sm">{component.name}</span>
                          <span className="text-xs text-muted-foreground leading-relaxed break-words">
                            {component.description}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                </div>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Right Section - Theme Selector and Import Button */}
        <div className="flex items-center gap-3">
          <ThemeSelector />
          
          <Button
            onClick={handleImportComponent}
            variant="outline"
          >
            <Download className="h-4 w-4 mr-2" />
            <span className="text-sm">IMPORT</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
