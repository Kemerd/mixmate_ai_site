import { useState, useEffect, useRef } from 'react';
import { useAnimation, AnimationControls } from 'framer-motion';

/**
 * Shared rhythm controller for synchronized animations
 * Creates a 4/4 time signature metronome at specified BPM
 * 
 * @param bpm - Beats per minute (default: 120)
 * @returns Current beat position (0-3)
 */
export const useRhythmController = (bpm = 120) => {
  // Shared state for animation synchronization
  const [beat, setBeat] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Setup shared metronome
  useEffect(() => {
    const beatDuration = 60000 / bpm; // 500ms for 120 BPM
    
    // Start a single shared interval for both animations
    intervalRef.current = setInterval(() => {
      setBeat(prevBeat => (prevBeat + 1) % 4); // 4/4 time signature (0,1,2,3)
    }, beatDuration);
    
    // Clean up on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [bpm]);
  
  return beat; // Return current beat position (0,1,2,3)
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
  
  // Use effect that reacts to beat changes
  useEffect(() => {
    // Only trigger animation when beat changes
    if (prevBeatRef.current === currentBeat) return;
    prevBeatRef.current = currentBeat;
    
    // Calculate timing
    const beatDuration = 60000 / bpm; // 500ms for 120 BPM
    const kickDuration = 0.1 * beatDuration; // Quick expansion (50ms for 120 BPM)
    
    // Kick on every beat (0,1,2,3)
    controls.start({
      // Quick expansion
      height: 1250,
      y: -10, // Slight upward movement
      transition: {
        duration: kickDuration / 1000, // Convert to seconds
        ease: [0.04, 0.62, 0.23, 0.98], // Custom easing for quick expansion
      },
    }).then(() => {
      // Spring back
      controls.start({
        height: 1100,
        y: 0,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 15,
          duration: (beatDuration - kickDuration) / 1000, // Remaining time in the beat
        },
      });
    });
  }, [currentBeat, bpm, controls]);

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
  
  // Use effect that reacts to beat changes
  useEffect(() => {
    // Only trigger animation when beat changes
    if (prevBeatRef.current === currentBeat) return;
    prevBeatRef.current = currentBeat;
    
    // Calculate timing
    const beatDuration = 60000 / bpm; // 500ms for 120 BPM
    const snareDuration = 0.1 * beatDuration; // Same as kick duration (50ms for 120 BPM)
    
    // Snare only on beats 1 and 3 (second and fourth of each measure)
    if (currentBeat === 1 || currentBeat === 3) {
      // The snare animation sequence with more pronounced chromatic aberration
      controls.start({
        // Quick expansion with enhanced chromatic aberration
        scale: 1.05,
        filter: "brightness(1.3) contrast(1.2)",
        // More pronounced RGB split
        textShadow: "3px 0 0 rgba(255,0,0,0.85), -3px 0 0 rgba(0,255,255,0.85), 0 2px 0 rgba(0,255,0,0.6)",
        transition: {
          duration: snareDuration / 1000,
          ease: [0.04, 0.62, 0.23, 0.98],
        },
      }).then(() => {
        // Spring back
        controls.start({
          scale: 1,
          filter: "brightness(1) contrast(1)",
          textShadow: "0 0 0 rgba(0,0,0,0)",
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 15,
            duration: (beatDuration - snareDuration) / 1000,
          },
        });
      });
    }
  }, [currentBeat, bpm, controls]);

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
  
  // Use effect that reacts to beat changes
  useEffect(() => {
    // Only trigger animation when beat changes
    if (prevBeatRef.current === currentBeat) return;
    prevBeatRef.current = currentBeat;
    
    // Calculate timing
    const beatDuration = 60000 / bpm; // 500ms for 120 BPM
    const animDuration = 0.1 * beatDuration; // Quick animation (50ms for 120 BPM)
    
    // Animate on beats 1 and 3 (like the snare)
    if (currentBeat === 1 || currentBeat === 3) {
      // Logo animation sequence with rotation and chromatic aberration
      controls.start({
        // Quick rotation and scale with chromatic aberration
        scale: 1.08,
        rotate: currentBeat === 1 ? 3 : -3, // Alternate rotation direction
        filter: "brightness(1.2) contrast(1.1) drop-shadow(4px 0 0 rgba(255,0,0,0.85)) drop-shadow(-4px 0 0 rgba(0,255,255,0.85)) drop-shadow(0 2px 0 rgba(0,255,0,0.6))",
        transition: {
          duration: animDuration / 1000,
          ease: [0.04, 0.62, 0.23, 0.98],
        },
      }).then(() => {
        // Spring back
        controls.start({
          scale: 1,
          rotate: 0,
          filter: "brightness(1) contrast(1) drop-shadow(0 0 0 rgba(0,0,0,0))",
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 15,
            duration: (beatDuration - animDuration) / 1000,
          },
        });
      });
    }
  }, [currentBeat, bpm, controls]);

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
export const createRhythmAnimation = (
  animationProps: Record<string, any>,
  resetProps: Record<string, any>,
  onBeats: number[] = [1, 3],
  bpm = 120
) => {
  return (currentBeat: number): AnimationControls => {
    const controls = useAnimation();
    const prevBeatRef = useRef<number>(-1);
    
    useEffect(() => {
      if (prevBeatRef.current === currentBeat) return;
      prevBeatRef.current = currentBeat;
      
      const beatDuration = 60000 / bpm;
      const animDuration = 0.1 * beatDuration;
      
      if (onBeats.includes(currentBeat)) {
        controls.start({
          ...animationProps,
          transition: {
            duration: animDuration / 1000,
            ease: [0.04, 0.62, 0.23, 0.98],
          },
        }).then(() => {
          controls.start({
            ...resetProps,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 15,
              duration: (beatDuration - animDuration) / 1000,
            },
          });
        });
      }
    }, [currentBeat, controls]);
    
    return controls;
  };
}; 