import { useState, useEffect, useCallback } from 'react';
import { Transition } from 'motion/react';

interface PerformanceMetrics {
  isLowPerformance: boolean;
  prefersReducedMotion: boolean;
  shouldEnableVisualEffects: boolean;
}

type GetAnimationConfig = (defaultConfig?: Transition) => Transition;

export function usePerformanceOptimization(): PerformanceMetrics & {
  getAnimationConfig: GetAnimationConfig;
} {
  const [isLowPerformance, setIsLowPerformance] = useState<boolean>(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleMediaChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleMediaChange);
    
    const memory = (navigator as any).deviceMemory || 0;
    const cores = navigator.hardwareConcurrency || 0;
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    

    const isLowPerformanceDevice = 
      (memory > 0 && memory < 4) || 
      (cores > 0 && cores < 4) || 
      isMobile ||
      (memory > 0 && memory < 2 && cores > 0 && cores < 2);
    
    setIsLowPerformance(isLowPerformanceDevice);
    
    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, []);

  const getAnimationConfig: GetAnimationConfig = useCallback((defaultConfig: Transition = {}) => {
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

  const shouldEnableVisualEffects: boolean = !prefersReducedMotion && !isLowPerformance;

  return {
    isLowPerformance,
    prefersReducedMotion,
    getAnimationConfig,
    shouldEnableVisualEffects
  };
}