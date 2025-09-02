"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { ComponentConfig, PlaygroundState } from "./types";

interface PlaygroundContextType {
  state: PlaygroundState;
  setSelectedComponent: (component: ComponentConfig) => void;
  updateCode: (code: string) => void;
  updateProps: (props: Record<string, any>) => void;
  resetToDefault: () => void;
  exportCode: () => string;
  copyCode: () => Promise<void>;
}

const PlaygroundContext = createContext<PlaygroundContextType | undefined>(undefined);

export function PlaygroundProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PlaygroundState>({
    selectedComponent: null,
    code: "",
    props: {},
    theme: "default",
    isDarkMode: true,
  });

  const setSelectedComponent = useCallback((component: ComponentConfig) => {
    setState((prev: PlaygroundState) => ({
      ...prev,
      selectedComponent: component,
      code: component.defaultCode,
      props: component.defaultProps || {},
    }));
  }, []);

  const updateCode = useCallback((code: string) => {
    setState((prev: PlaygroundState) => ({ ...prev, code }));
  }, []);

  const updateProps = useCallback((props: Record<string, any>) => {
    // Filter out undefined values to prevent component errors
    const filteredProps = Object.fromEntries(
      Object.entries(props).filter(([_, value]) => value !== undefined)
    );
    setState((prev: PlaygroundState) => ({ ...prev, props: { ...prev.props, ...filteredProps } }));
  }, []);

  const resetToDefault = useCallback(() => {
    if (state.selectedComponent) {
      const component = state.selectedComponent;
      setState((prev: PlaygroundState) => ({
        ...prev,
        code: component.defaultCode,
        props: component.defaultProps || {},
      }));
    }
  }, [state.selectedComponent]);

  const exportCode = useCallback(() => {
    return state.code;
  }, [state.code]);

  const copyCode = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(state.code);
    } catch (error) {
      console.error("Failed to copy code:", error);
    }
  }, [state.code]);

  const value: PlaygroundContextType = {
    state,
    setSelectedComponent,
    updateCode,
    updateProps,
    resetToDefault,
    exportCode,
    copyCode,
  };

  return (
    <PlaygroundContext.Provider value={value}>
      {children}
    </PlaygroundContext.Provider>
  );
}

export function usePlayground() {
  const context = useContext(PlaygroundContext);
  if (!context) {
    throw new Error("usePlayground must be used within PlaygroundProvider");
  }
  return context;
}
