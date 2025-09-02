"use client";

import { useState, useEffect, useRef } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FileTabs, FileTab } from "./file-tabs";
import { usePlayground } from "./playground-context";
import { Button } from "@/components/ui/button";
import { Copy, Download, RotateCcw, Save } from "lucide-react";

export function AdvancedCodeEditor() {
  const { state, updateCode, copyCode, resetToDefault } = usePlayground();
  const [activeTab, setActiveTab] = useState("page.tsx");
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const tabs: FileTab[] = [
    {
      id: "page.tsx",
      name: "page.tsx",
      content: state.code,
      language: "tsx",
    },
    {
      id: "styles.css",
      name: "styles.css",
      content: `/* Component styles */
.component-container {
  /* Add your custom styles here */
}`,
      language: "css",
    },
  ];

  const activeTabContent = tabs.find(tab => tab.id === activeTab)?.content || "";

  useEffect(() => {
    if (state.selectedComponent) {
      setEditValue(state.code);
    }
  }, [state.selectedComponent, state.code]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditValue(activeTabContent);
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 0);
  };

  const handleSave = () => {
    if (activeTab === "page.tsx") {
      updateCode(editValue);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(activeTabContent);
    setIsEditing(false);
  };

  const handleReset = () => {
    if (state.selectedComponent) {
      updateCode(state.selectedComponent.defaultCode);
      setEditValue(state.selectedComponent.defaultCode);
    }
  };

  const handleExport = () => {
    const blob = new Blob([activeTabContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${state.selectedComponent?.name || "component"}.${activeTab.split('.').pop()}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopy = async () => {
    if (activeTab === "page.tsx") {
      await copyCode();
    } else {
      await navigator.clipboard.writeText(activeTabContent);
    }
  };

  if (!state.selectedComponent) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-900 text-gray-400">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2 text-white">CODE</h3>
          <p className="text-sm">Select a component to view its code</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gray-900">
      {/* File Tabs */}
      <FileTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        className="bg-gray-900"
      />

      {/* Editor Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-gray-800/50">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">
            {activeTab === "page.tsx" ? "React Component" : "CSS Styles"}
          </span>
        </div>
        
        <div className="flex items-center gap-1">
          {isEditing ? (
            <>
              <Button size="sm" onClick={handleSave} variant="default" className="h-7 px-2">
                <Save className="h-3 w-3 mr-1" />
                Save
              </Button>
              <Button size="sm" onClick={handleCancel} variant="outline" className="h-7 px-2">
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button size="sm" onClick={handleEdit} variant="outline" className="h-7 px-2">
                Edit
              </Button>
              <Button size="sm" onClick={handleReset} variant="outline" className="h-7 px-2">
                <RotateCcw className="h-3 w-3" />
              </Button>
              <Button size="sm" onClick={handleCopy} variant="outline" className="h-7 px-2">
                <Copy className="h-3 w-3" />
              </Button>
              <Button size="sm" onClick={handleExport} variant="outline" className="h-7 px-2">
                <Download className="h-3 w-3" />
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Code Content */}
      <div className="flex-1 overflow-auto">
        {isEditing ? (
          <div className="p-4 h-full">
            <textarea
              ref={textareaRef}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="w-full h-full bg-gray-800 text-white font-mono text-sm p-4 border border-white/10 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your code here..."
              spellCheck={false}
            />
          </div>
        ) : (
          <SyntaxHighlighter
            language={activeTab === "page.tsx" ? "tsx" : "css"}
            style={oneDark}
            customStyle={{
              margin: 0,
              borderRadius: 0,
              fontSize: "14px",
              lineHeight: "1.5",
              background: "#1a1a1a",
              padding: "1rem",
            }}
            showLineNumbers
            wrapLines
          >
            {activeTabContent}
          </SyntaxHighlighter>
        )}
      </div>
    </div>
  );
}
