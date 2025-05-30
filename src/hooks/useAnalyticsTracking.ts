import { useEffect, useRef } from 'react';
import { trackSectionView } from '../utils/analytics';

/**
 * Hook to track when a section comes into view
 * @param sectionName - Name of the section to track
 * @param threshold - Percentage of section that needs to be visible (0.5 = 50%)
 */
export const useSectionTracking = (sectionName: string, threshold: number = 0.5) => {
  const elementRef = useRef<HTMLElement>(null);
  const hasBeenTracker = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Track only when entering view for the first time
          if (entry.isIntersecting && !hasBeenTracker.current) {
            hasBeenTracker.current = true;
            trackSectionView(sectionName);
          }
        });
      },
      {
        threshold,
        rootMargin: '0px 0px -10% 0px', // Trigger when section is 10% from bottom of viewport
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [sectionName, threshold]);

  return elementRef;
}; 