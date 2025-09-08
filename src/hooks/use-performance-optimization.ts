import { useState, useEffect, useCallback } from 'react';

/**
 * Hook to optimize performance by detecting device capabilities
 * and adjusting animations/effects accordingly
 */
export function usePerformanceOptimization() {
  const [isLowPerformance, setIsLowPerformance] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleMediaChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleMediaChange);
    
    // Simple performance detection based on device memory and CPU cores
    const memory = (navigator as any).deviceMemory || 0;
    const cores = navigator.hardwareConcurrency || 0;
    
    // Consider low performance if device has less than 4GB memory or less than 4 cores
    setIsLowPerformance(memory > 0 && memory < 4 || cores > 0 && cores < 4);
    
    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, []);

  /**
   * Returns animation configuration based on performance settings
   */
  const getAnimationConfig = useCallback((defaultConfig: any = {}) => {
    if (prefersReducedMotion || isLowPerformance) {
      return {
        ...defaultConfig,
        duration: 0,
        delay: 0,
        ease: "linear"
      };
    }
    return defaultConfig;
  }, [prefersReducedMotion, isLowPerformance]);

  /**
   * Returns whether to enable heavy visual effects
   */
  const shouldEnableVisualEffects = !prefersReducedMotion && !isLowPerformance;

  return {
    isLowPerformance,
    prefersReducedMotion,
    getAnimationConfig,
    shouldEnableVisualEffects
  };
}