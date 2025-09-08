"use client";

import { usePerformanceOptimization } from "@/hooks/use-performance-optimization";

export function PerformanceTest() {
  const { isLowPerformance, prefersReducedMotion, shouldEnableVisualEffects } = usePerformanceOptimization();

  return (
    <div className="fixed bottom-4 right-4 bg-black/50 text-white p-2 rounded text-xs z-50">
      <div>Low Performance: {isLowPerformance ? 'Yes' : 'No'}</div>
      <div>Prefers Reduced Motion: {prefersReducedMotion ? 'Yes' : 'No'}</div>
      <div>Visual Effects: {shouldEnableVisualEffects ? 'Enabled' : 'Disabled'}</div>
    </div>
  );
}