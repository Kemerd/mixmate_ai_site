import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import GlobalStyles from './styles/GlobalStyles';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Features from './components/Features/Features';
import Pricing from './components/Pricing/Pricing';
import Technical from './components/Technical/Technical';
import Roadmap from './components/Roadmap/Roadmap';
import Support from './components/Support/Support';
import Footer from './components/Footer/Footer';

const App: React.FC = () => {
  // Ensure page always starts at top on mount/refresh
  React.useEffect(() => {
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
    <ThemeProvider theme={theme}>
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
  );
};

export default App;
