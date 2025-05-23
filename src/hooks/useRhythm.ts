import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useAnimation, AnimationControls } from 'framer-motion';

// Global state to ensure a single instance of the rhythm controller
let globalBeat = 0;
let globalInterval: NodeJS.Timeout | null = null;
let observers: ((beat: number) => void)[] = [];

// Memoize beat duration calculation to prevent recalculation
const memoizedBeatDurations = new Map<number, number>();
const getBeatDuration = (bpm: number): number => {
  if (!memoizedBeatDurations.has(bpm)) {
    memoizedBeatDurations.set(bpm, 60000 / bpm);
  }
  return memoizedBeatDurations.get(bpm)!;
};

// Initialize the global rhythm if it doesn't exist
const initializeGlobalRhythm = (bpm: number) => {
  if (globalInterval) return;
  
  const beatDuration = getBeatDuration(bpm);
  globalInterval = setInterval(() => {
    globalBeat = (globalBeat + 1) % 4;
    // Notify all observers of the beat change
    observers.forEach(callback => callback(globalBeat));
  }, beatDuration);
};

// Clean up the global rhythm if no observers
const cleanupGlobalRhythm = () => {
  if (observers.length === 0 && globalInterval) {
    clearInterval(globalInterval);
    globalInterval = null;
  }
};

/**
 * Shared rhythm controller for synchronized animations
 * Creates a 4/4 time signature metronome at specified BPM
 * Uses a singleton pattern to ensure perfect synchronization
 * 
 * @param bpm - Beats per minute (default: 120)
 * @returns Current beat position (0-3)
 */
export const useRhythmController = (bpm = 120) => {
  // Local state that mirrors the global beat
  const [beat, setBeat] = useState(globalBeat);
  
  // Memoize the observer function to prevent recreation
  const observer = useCallback((newBeat: number) => {
    setBeat(newBeat);
  }, []);
  
  useEffect(() => {
    // Initialize global rhythm if not already running
    initializeGlobalRhythm(bpm);
    
    // Register this component as an observer
    observers.push(observer);
    
    // Clean up when component unmounts
    return () => {
      observers = observers.filter(obs => obs !== observer);
      cleanupGlobalRhythm();
    };
  }, [bpm, observer]);
  
  return beat;
};

/**
 * Hook for kick drum-style animations (every beat)
 * Useful for background elements that pulse on every beat
 * 
 * @param bpm - Beats per minute (default: 120)
 * @param currentBeat - Current beat from useRhythmController
 * @returns Animation controls for use with animate prop
 */
export const useKickAnimation = (bpm = 120, currentBeat: number): AnimationControls => {
  const controls = useAnimation();
  const prevBeatRef = useRef<number>(-1);
  
  // Memoize timing calculations
  const timingConfig = useMemo(() => {
    const beatDuration = getBeatDuration(bpm);
    const kickDuration = 0.1 * beatDuration;
    return {
      kickDuration: kickDuration / 1000, // Convert to seconds
      springDuration: (beatDuration - kickDuration) / 1000,
    };
  }, [bpm]);

  // Memoize animation configurations
  const kickAnimation = useMemo(() => ({
    height: 1250,
    y: -10,
    transition: {
      duration: timingConfig.kickDuration,
      ease: [0.04, 0.62, 0.23, 0.98],
    },
  }), [timingConfig.kickDuration]);

  const springBackAnimation = useMemo(() => ({
    height: 1100,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 15,
      duration: timingConfig.springDuration,
    },
  }), [timingConfig.springDuration]);
  
  // Use effect that reacts to beat changes
  useEffect(() => {
    // Only trigger animation when beat changes
    if (prevBeatRef.current === currentBeat) return;
    prevBeatRef.current = currentBeat;
    
    // Kick on every beat (0,1,2,3)
    controls.start(kickAnimation).then(() => {
      controls.start(springBackAnimation);
    });
  }, [currentBeat, controls, kickAnimation, springBackAnimation]);

  return controls;
};

/**
 * Hook for snare-style animations (beats 1 and 3)
 * Creates chromatic aberration and scale effects
 * 
 * @param bpm - Beats per minute (default: 120)
 * @param currentBeat - Current beat from useRhythmController
 * @returns Animation controls for use with animate prop
 */
export const useSnareAnimation = (bpm = 120, currentBeat: number): AnimationControls => {
  const controls = useAnimation();
  const prevBeatRef = useRef<number>(-1);
  
  // Memoize timing calculations
  const timingConfig = useMemo(() => {
    const beatDuration = getBeatDuration(bpm);
    const snareDuration = 0.1 * beatDuration;
    return {
      snareDuration: snareDuration / 1000,
      springDuration: (beatDuration - snareDuration) / 1000,
    };
  }, [bpm]);

  // Memoize animation configurations
  const snareAnimation = useMemo(() => ({
    scale: 1.05,
    filter: "brightness(1.3) contrast(1.2)",
    textShadow: "3px 0 0 rgba(255,0,0,0.85), -3px 0 0 rgba(0,255,255,0.85), 0 2px 0 rgba(0,255,0,0.6)",
    transition: {
      duration: timingConfig.snareDuration,
      ease: [0.04, 0.62, 0.23, 0.98],
    },
  }), [timingConfig.snareDuration]);

  const resetAnimation = useMemo(() => ({
    scale: 1,
    filter: "brightness(1) contrast(1)",
    textShadow: "0 0 0 rgba(0,0,0,0)",
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 15,
      duration: timingConfig.springDuration,
    },
  }), [timingConfig.springDuration]);
  
  // Use effect that reacts to beat changes
  useEffect(() => {
    // Only trigger animation when beat changes
    if (prevBeatRef.current === currentBeat) return;
    prevBeatRef.current = currentBeat;
    
    // Snare only on beats 1 and 3 (second and fourth of each measure)
    if (currentBeat === 1 || currentBeat === 3) {
      controls.start(snareAnimation).then(() => {
        controls.start(resetAnimation);
      });
    }
  }, [currentBeat, controls, snareAnimation, resetAnimation]);

  return controls;
};

/**
 * Hook for header logo animations (beats 1 and 3)
 * Creates rotation and chromatic aberration effects
 * 
 * @param bpm - Beats per minute (default: 120)
 * @param currentBeat - Current beat from useRhythmController
 * @returns Animation controls for use with animate prop
 */
export const useLogoAnimation = (bpm = 120, currentBeat: number): AnimationControls => {
  const controls = useAnimation();
  const prevBeatRef = useRef<number>(-1);
  
  // Memoize timing calculations
  const timingConfig = useMemo(() => {
    const beatDuration = getBeatDuration(bpm);
    const animDuration = 0.1 * beatDuration;
    return {
      animDuration: animDuration / 1000,
      springDuration: (beatDuration - animDuration) / 1000,
    };
  }, [bpm]);

  // Memoize animation configurations for each beat
  const getLogoAnimation = useCallback((beat: number) => ({
    scale: 1.08,
    rotate: beat === 1 ? 3 : -3,
    filter: "brightness(1.2) contrast(1.1) drop-shadow(4px 0 0 rgba(255,0,0,0.85)) drop-shadow(-4px 0 0 rgba(0,255,255,0.85)) drop-shadow(0 2px 0 rgba(0,255,0,0.6))",
    transition: {
      duration: timingConfig.animDuration,
      ease: [0.04, 0.62, 0.23, 0.98],
    },
  }), [timingConfig.animDuration]);

  const resetAnimation = useMemo(() => ({
    scale: 1,
    rotate: 0,
    filter: "brightness(1) contrast(1) drop-shadow(0 0 0 rgba(0,0,0,0))",
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 15,
      duration: timingConfig.springDuration,
    },
  }), [timingConfig.springDuration]);
  
  // Use effect that reacts to beat changes
  useEffect(() => {
    // Only trigger animation when beat changes
    if (prevBeatRef.current === currentBeat) return;
    prevBeatRef.current = currentBeat;
    
    // Animate on beats 1 and 3 (like the snare)
    if (currentBeat === 1 || currentBeat === 3) {
      const logoAnimation = getLogoAnimation(currentBeat);
      controls.start(logoAnimation).then(() => {
        controls.start(resetAnimation);
      });
    }
  }, [currentBeat, controls, getLogoAnimation, resetAnimation]);

  return controls;
};

/**
 * Creates custom animation hook with specified properties
 * Allows for creating custom animations that sync to the rhythm
 * 
 * @param animationProps - Object with animation properties
 * @param resetProps - Object with reset properties
 * @param onBeats - Array of beat numbers to trigger on (default: [1,3])
 * @param bpm - Beats per minute (default: 120)
 * @returns Function that takes currentBeat and returns animation controls
 */
export const useRhythmAnimation = (
  animationProps: Record<string, any>,
  resetProps: Record<string, any>,
  onBeats: number[] = [1, 3],
  bpm = 120,
  currentBeat: number
): AnimationControls => {
  const controls = useAnimation();
  const prevBeatRef = useRef<number>(-1);
  
  // Memoize timing calculations
  const timingConfig = useMemo(() => {
    const beatDuration = getBeatDuration(bpm);
    const animDuration = 0.1 * beatDuration;
    return {
      animDuration: animDuration / 1000,
      springDuration: (beatDuration - animDuration) / 1000,
    };
  }, [bpm]);

  // Memoize animation configurations
  const memoizedAnimationProps = useMemo(() => ({
    ...animationProps,
    transition: {
      duration: timingConfig.animDuration,
      ease: [0.04, 0.62, 0.23, 0.98],
    },
  }), [animationProps, timingConfig.animDuration]);

  const memoizedResetProps = useMemo(() => ({
    ...resetProps,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 15,
      duration: timingConfig.springDuration,
    },
  }), [resetProps, timingConfig.springDuration]);
  
  useEffect(() => {
    if (prevBeatRef.current === currentBeat) return;
    prevBeatRef.current = currentBeat;
    
    if (onBeats.includes(currentBeat)) {
      controls.start(memoizedAnimationProps).then(() => {
        controls.start(memoizedResetProps);
      });
    }
  }, [currentBeat, controls, memoizedAnimationProps, memoizedResetProps, onBeats]);
  
  return controls;
};

// Keep the old function for backward compatibility but mark as deprecated
export const createRhythmAnimation = (
  animationProps: Record<string, any>,
  resetProps: Record<string, any>,
  onBeats: number[] = [1, 3],
  bpm = 120
) => {
  // Return a simple object instead of a function that calls hooks
  return {
    animationProps,
    resetProps,
    onBeats,
    bpm
  };
}; 