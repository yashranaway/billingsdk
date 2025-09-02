"use client";

import { cn } from "@/lib/utils";

export interface FileTab {
  id: string;
  name: string;
  content: string;
  language: string;
}

interface FileTabsProps {
  tabs: FileTab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

export function FileTabs({ tabs, activeTab, onTabChange, className }: FileTabsProps) {
  return (
    <div className={cn("flex border-b border-white/10", className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "px-4 py-2 text-sm font-medium border-b-2 transition-colors",
            activeTab === tab.id
              ? "border-white text-white bg-gray-800/50"
              : "border-transparent text-gray-400 hover:text-white hover:bg-gray-800/30"
          )}
        >
          {tab.name}
        </button>
      ))}
    </div>
  );
}
