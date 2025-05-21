import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* Modern CSS Reset */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* Improve text rendering */
  html {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    scroll-behavior: smooth;
  }

  body {
    font-family: ${({ theme }) => theme.typography.fontFamily.primary};
    background-color: ${({ theme }) => theme.colors.background.primary};
    color: ${({ theme }) => theme.colors.text.primary};
    line-height: 1.5;
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* Improve media defaults */
  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
  }

  /* Remove built-in form typography styles */
  input, button, textarea, select {
    font: inherit;
  }

  /* Avoid text overflows */
  p, h1, h2, h3, h4, h5, h6 {
    overflow-wrap: break-word;
  }

  /* Create a root stacking context */
  #root {
    isolation: isolate;
    min-height: 100vh;
  }

  /* Modern scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.background.secondary};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.accent};
    border-radius: ${({ theme }) => theme.borderRadius.full};
  }

  /* Smooth anchor scrolling */
  html {
    scroll-padding-top: 80px; /* Height of sticky header */
  }

  /* Remove blue highlight on mobile tap */
  * {
    -webkit-tap-highlight-color: transparent;
  }

  /* Better button defaults */
  button {
    background: none;
    border: none;
    cursor: pointer;
    outline: none;
  }

  /* Better link defaults */
  a {
    color: inherit;
    text-decoration: none;
  }
`;

export default GlobalStyles; 