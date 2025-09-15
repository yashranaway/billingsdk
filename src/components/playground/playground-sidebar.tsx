"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload } from "lucide-react";
import { usePlayground } from "./playground-context";
import { componentRegistry } from "./component-registry";
import { PlaygroundLogo } from "./playground-logo";
import { useState } from "react";

export function PlaygroundSidebar() {
  const { state, setSelectedComponent, updateCode, updateStyles } = usePlayground();
  const [selectedCategory] = useState<string>("all");

  const categories = [
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
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.tsx,.ts,.jsx,.js,.css';
    input.multiple = false;

    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          if (content) {
            const extension = file.name.split('.').pop()?.toLowerCase();
            if (extension === 'css') {
              updateStyles(content);
            } else if (['tsx', 'ts', 'jsx', 'js'].includes(extension || '')) {
              updateCode(content);
            } else {
              alert(`Unsupported file type: ${extension}. Please select a .tsx, .ts, .jsx, .js, or .css file.`);
            }
          }
        };
        reader.readAsText(file);
      }
    };

    input.click();
  };

  return (
    <aside className="flex flex-col w-56 sm:w-60 md:w-64 flex-shrink-0 border-r border-border bg-background h-full min-h-0">
      <div className="px-4 py-4 border-b border-border">
        <Link href="/" className="inline-flex">
          <PlaygroundLogo />
        </Link>
      </div>

      <div className="p-4 space-y-3 overflow-y-auto min-h-0">
        <div>
          <div className="text-xs font-semibold text-muted-foreground mb-1">Component</div>
          <Select value={state.selectedComponent?.id || ""} onValueChange={handleComponentChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a component">
                {state.selectedComponent?.name || "Select a component"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="max-h-96 overflow-y-auto">
              {categories.map(category => (
                <div key={category.id}>
                  <div className="px-3 py-2 text-xs font-semibold text-foreground bg-muted/50 border-b border-border">
                    {category.label}
                  </div>
                  {filteredComponents
                    .filter(comp => comp.category === category.id || category.id === "all")
                    .map(component => (
                      <SelectItem 
                        key={component.id} 
                        value={component.id}
                        className="px-3 py-2"
                      >
                        <span className="font-medium text-sm">{component.name}</span>
                      </SelectItem>
                    ))}
                </div>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="pt-2">
          <Button onClick={handleImportComponent} variant="outline" size="sm" className="w-full">
            <Upload className="h-4 w-4 mr-2" />
            IMPORT
          </Button>
        </div>
      </div>
    </aside>
  );
}
