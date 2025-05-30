import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import GlobalStyles from './styles/GlobalStyles';
import SEO from './components/SEO/SEO';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Features from './components/Features/Features';
import Pricing from './components/Pricing/Pricing';
import Technical from './components/Technical/Technical';
import Roadmap from './components/Roadmap/Roadmap';
import Support from './components/Support/Support';
import Footer from './components/Footer/Footer';
import { initGA, trackPageView } from './utils/analytics';

const App: React.FC = () => {
  // Initialize Google Analytics and track page view
  React.useEffect(() => {
    // Initialize GA
    initGA();
    
    // Track initial page view
    trackPageView(window.location.pathname + window.location.search);
    
    // Ensure page always starts at top on mount/refresh
    // Disable browser's automatic scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    
    // Force scroll to top immediately
    window.scrollTo(0, 0);
    
    // Also ensure it happens after any potential layout shifts
    const timeoutId = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
    
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <SEO />
        <GlobalStyles />
        <Header />
        <main>
          <Hero />
          <Features />
          <Pricing />
          <Technical />
          <Roadmap />
          <Support />
          {/* More sections will be added here */}
        </main>
        <Footer />
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;
