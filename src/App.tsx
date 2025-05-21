import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import GlobalStyles from './styles/GlobalStyles';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Features from './components/Features/Features';
import Pricing from './components/Pricing/Pricing';
import Support from './components/Support/Support';
import Footer from './components/Footer/Footer';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Header />
      <main>
        <Hero />
        <Features />
        <Pricing />
        <Support />
        {/* More sections will be added here */}
      </main>
      <Footer />
    </ThemeProvider>
  );
};

export default App;
