"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, Download } from "lucide-react";
import { usePlayground } from "./playground-context";
import { componentRegistry } from "./component-registry";

interface PlaygroundHeaderNewProps {
  onImportComponent?: () => void;
}

export function PlaygroundHeaderNew({ onImportComponent }: PlaygroundHeaderNewProps) {
  const { state, setSelectedComponent } = usePlayground();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

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
    <div className="border-b border-white/10 bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-gray-900/60">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left Section - Play Button, Separator, Component Selector */}
        <div className="flex items-center gap-4">
          {/* Play Button */}
          <div className="flex items-center gap-2 px-3 py-2 bg-gray-800 border border-white/10 rounded-md">
            <div className="w-3 h-3 bg-green-500 rounded-full flex items-center justify-center">
              <Play className="w-2 h-2 text-white fill-current" />
            </div>
            <span className="text-white text-sm font-medium">/</span>
            <div className="w-4 h-4 text-white">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <span className="text-white text-sm font-medium">Billing SDK</span>
          </div>

          {/* Component Selector */}
          <Select value={state.selectedComponent?.id || ""} onValueChange={handleComponentChange}>
            <SelectTrigger className="w-64 bg-gray-800 border-white/10 text-white">
              <SelectValue placeholder="Select a component" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-white/10">
              {categories.map(category => (
                <div key={category.id}>
                  <div className="px-2 py-1.5 text-sm font-semibold text-gray-400">
                    {category.label}
                  </div>
                  {filteredComponents
                    .filter(comp => comp.category === category.id || category.id === "all")
                    .map(component => (
                      <SelectItem 
                        key={component.id} 
                        value={component.id}
                        className="text-white hover:bg-gray-700 focus:bg-gray-700"
                      >
                        <div className="flex flex-col">
                          <span className="font-medium">{component.name}</span>
                          <span className="text-xs text-gray-400">
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

        {/* Right Section - Import Component Button */}
        <div className="flex items-center gap-3">
          <Button
            onClick={handleImportComponent}
            className="bg-gray-800 border-white/10 text-white hover:bg-gray-700 hover:text-white"
            variant="outline"
          >
            <Download className="h-4 w-4 mr-2" />
            <span className="text-sm">IMPORT</span>
            <br />
            <span className="text-sm">COMPONENT</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
