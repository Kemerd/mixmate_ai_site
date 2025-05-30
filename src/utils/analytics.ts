import ReactGA from 'react-ga4';

// Google Analytics Measurement ID
const MEASUREMENT_ID = 'G-TH3LYE27VP';

/**
 * Initialize Google Analytics
 */
export const initGA = () => {
  ReactGA.initialize(MEASUREMENT_ID, {
    testMode: process.env.NODE_ENV === 'development', // Don't send events in dev mode
  });
};

/**
 * Track page views
 */
export const trackPageView = (path: string) => {
  ReactGA.send({ hitType: 'pageview', page: path });
};

/**
 * Track section scrolling/viewing
 */
export const trackSectionView = (sectionName: string) => {
  ReactGA.event({
    category: 'Section Engagement',
    action: 'view',
    label: sectionName,
  });
};

/**
 * Track download button clicks
 */
export const trackDownloadClick = (platform: string) => {
  ReactGA.event({
    category: 'Download',
    action: 'click',
    label: platform,
  });
};

/**
 * Track Discord button clicks
 */
export const trackDiscordClick = (location: string) => {
  ReactGA.event({
    category: 'Social',
    action: 'discord_click',
    label: location, // e.g., 'header', 'support', 'footer'
  });
};

/**
 * Track expandable content interactions
 */
export const trackExpandContent = (contentType: string, action: 'expand' | 'collapse') => {
  ReactGA.event({
    category: 'Content Interaction',
    action: action,
    label: contentType, // e.g., 'technical_details', 'roadmap_details'
  });
};

/**
 * Track FAQ interactions
 */
export const trackFAQInteraction = (question: string, action: 'expand' | 'collapse') => {
  ReactGA.event({
    category: 'FAQ',
    action: action,
    label: question,
  });
};

/**
 * Track pricing interactions
 */
export const trackPricingInteraction = (action: string, label?: string) => {
  ReactGA.event({
    category: 'Pricing',
    action: action,
    label: label,
  });
};

/**
 * Track navigation link clicks
 */
export const trackNavigation = (destination: string, source: string = 'header') => {
  ReactGA.event({
    category: 'Navigation',
    action: 'click',
    label: `${source}_to_${destination}`,
  });
};

/**
 * Track modal interactions
 */
export const trackModalInteraction = (modalName: string, action: 'open' | 'close') => {
  ReactGA.event({
    category: 'Modal',
    action: action,
    label: modalName,
  });
};

/**
 * Track external link clicks
 */
export const trackExternalLink = (url: string, linkText?: string) => {
  ReactGA.event({
    category: 'External Link',
    action: 'click',
    label: linkText || url,
  });
};

/**
 * Track social media clicks
 */
export const trackSocialClick = (platform: string, location: string) => {
  ReactGA.event({
    category: 'Social',
    action: 'click',
    label: `${platform}_from_${location}`,
  });
};

/**
 * Track error events
 */
export const trackError = (errorType: string, errorMessage: string) => {
  ReactGA.event({
    category: 'Error',
    action: errorType,
    label: errorMessage,
  });
}; 