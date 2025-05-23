import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, AnimationControls, useAnimation } from 'framer-motion';
import styled from 'styled-components';
import { slideInRight, bounceScale } from '../../animations/variants';
import { useRhythmController, useLogoAnimation, createRhythmAnimation } from '../../hooks/useRhythm';

// Styled components for our header
const HeaderContainer = styled(motion.header)<{ $isMenuOpen?: boolean; $isAnimating?: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100vw; /* Use viewport width to ensure no overflow */
  height: ${({ $isMenuOpen, $isAnimating }) => ($isMenuOpen || $isAnimating) ? '50vh' : '80px'};
  min-height: 80px;
  max-height: ${({ $isMenuOpen, $isAnimating }) => ($isMenuOpen || $isAnimating) ? '50vh' : '80px'};
  display: flex;
  flex-direction: ${({ $isMenuOpen, $isAnimating }) => ($isMenuOpen || $isAnimating) ? 'column' : 'row'};
  align-items: center;
  justify-content: ${({ $isMenuOpen, $isAnimating }) => ($isMenuOpen || $isAnimating) ? 'flex-start' : 'space-between'};
  padding: 0 ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => `linear-gradient(
    to bottom,
    ${theme.colors.background.primary} 0%,
    rgba(0, 0, 0, 0.8) 100%
  )`};
  backdrop-filter: blur(10px);
  z-index: 1000;
  overflow: hidden; /* Completely hide all scrollbars */
  
  /* Smooth transitions for layout changes */
  transition: height 0.4s cubic-bezier(0.23, 1, 0.32, 1),
              max-height 0.4s cubic-bezier(0.23, 1, 0.32, 1),
              flex-direction 0.3s ease,
              justify-content 0.3s ease;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-bottom: ${({ $isMenuOpen, $isAnimating, theme }) => ($isMenuOpen || $isAnimating) ? theme.spacing.xl : '0'};
    height: ${({ $isMenuOpen, $isAnimating }) => ($isMenuOpen || $isAnimating) ? '50vh' : '80px'};
    max-height: ${({ $isMenuOpen, $isAnimating }) => ($isMenuOpen || $isAnimating) ? '50vh' : '80px'};
    overflow: hidden; /* No scrollbars on mobile either */
    
    /* Mobile-specific transitions */
    transition: height 0.4s cubic-bezier(0.23, 1, 0.32, 1),
                max-height 0.4s cubic-bezier(0.23, 1, 0.32, 1),
                padding-bottom 0.3s ease,
                flex-direction 0.3s ease,
                justify-content 0.3s ease;
  }
`;

// Add a top row container for mobile
const HeaderTopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 80px;
`;

const Logo = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  will-change: transform, filter; /* Performance optimization */
  transform-style: preserve-3d;
  backface-visibility: hidden;

  img {
    height: 50px;
    width: auto;
    transform-origin: center; /* For rotation around center */
  }
`;

const Nav = styled(motion.nav)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const NavLink = styled(motion.a)`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  transition: color 0.2s ease;
  will-change: opacity, color, transform;

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

// Discord button styled component with more subtle animation
const DiscordButton = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #5865f2; /* Discord brand color */
  width: 140px;
  height: 40px;
  border-radius: 14px; /* Higher border radius for squircle effect */
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); /* Spring-like transition */
  box-shadow: 0 2px 8px rgba(88, 101, 242, 0.3);
  overflow: hidden;
  cursor: pointer;
  
  /* Squircle mask - approximation with border-radius */
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='40'%3E%3Crect width='140' height='40' rx='14' ry='14'/%3E%3C/svg%3E");
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='40'%3E%3Crect width='140' height='40' rx='14' ry='14'/%3E%3C/svg%3E");

  &:hover {
    background-color: #4752c4; /* Slightly darker on hover */
    transform: scale(1.03);
    box-shadow: 0 4px 12px rgba(88, 101, 242, 0.5);
  }
  
  svg {
    width: 100%;
    height: 20px;
    fill: white;
  }
`;

// Mobile version of the Discord button
const MobileDiscordButton = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #5865f2;
  width: 140px;
  height: 40px;
  border-radius: 14px;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 2px 8px rgba(88, 101, 242, 0.3);
  overflow: hidden;
  cursor: pointer;
  
  &:hover {
    background-color: #4752c4;
    transform: scale(1.03);
    box-shadow: 0 4px 12px rgba(88, 101, 242, 0.5);
  }
  
  svg {
    width: 100%;
    height: 20px;
    fill: white;
  }
`;

const MobileMenuButton = styled(motion.button)`
  display: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.sm};
  width: 40px;
  height: 40px;
  position: relative;
  justify-content: center;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
  }
`;

// Animated hamburger lines
const HamburgerLine = styled(motion.div)`
  width: 24px;
  height: 2px;
  background-color: ${({ theme }) => theme.colors.text.primary};
  position: absolute;
  right: 0; /* Position from right instead of centering */
  transform-origin: center;
`;

// Hamburger menu component
const AnimatedHamburger: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  return (
    <>
      <HamburgerLine
        animate={{
          rotate: isOpen ? 45 : 0,
          y: isOpen ? 0 : -6,
        }}
        transition={{
          duration: 0.3,
          ease: [0.23, 1, 0.32, 1],
        }}
      />
      <HamburgerLine
        animate={{
          opacity: isOpen ? 0 : 1,
        }}
        transition={{
          duration: 0.3,
          ease: [0.23, 1, 0.32, 1],
        }}
      />
      <HamburgerLine
        animate={{
          rotate: isOpen ? -45 : 0,
          y: isOpen ? 0 : 6,
        }}
        transition={{
          duration: 0.3,
          ease: [0.23, 1, 0.32, 1],
        }}
      />
    </>
  );
};

const MobileMenu = styled(motion.div)`
  display: none;
  width: 100%;
  max-width: 100vw; /* Prevent any overflow */
  height: calc(50vh - 80px); /* Fixed height minus header top row */
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* Align content to top */
  gap: ${({ theme }) => theme.spacing.lg};
  padding-top: ${({ theme }) => theme.spacing.lg};
  overflow: hidden; /* No scrollbars in mobile menu */

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
  }
`;

// Mobile nav link styling
const MobileNavLink = styled(motion.a)`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-decoration: none;
  transition: color 0.2s ease;
  padding: ${({ theme }) => theme.spacing.sm} 0;

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

// Discord SVG component
const DiscordSVG = () => (
  <svg height="20" viewBox="-2.69 .21 802.65 159.23867842" xmlns="http://www.w3.org/2000/svg">
    <path d="m799.96 37.4v80.85h-26.97v-14.71c-2.28 5.54-5.74 9.76-10.4 12.64-4.65 2.87-10.41 4.32-17.23 4.32-6.1 0-11.42-1.51-15.97-4.54-4.54-3.03-8.05-7.19-10.52-12.47-2.45-5.28-3.69-11.24-3.69-17.92-.08-6.88 1.23-13.06 3.91-18.53s6.47-9.73 11.34-12.8c4.88-3.06 10.45-4.6 16.69-4.6 12.85 0 21.47 5.69 25.87 17.07v-29.31zm-31 58.01c2.76-2.73 4.12-6.28 4.12-10.61 0-4.18-1.33-7.6-4.01-10.22-2.67-2.61-6.34-3.93-10.94-3.93-4.55 0-8.18 1.33-10.9 4-2.72 2.66-4.07 6.11-4.07 10.38s1.35 7.75 4.07 10.44c2.72 2.7 6.31 4.04 10.79 4.04 4.54-.01 8.19-1.38 10.94-4.1zm-58.61-41.62v24.26c-2.8-1.88-6.42-2.81-10.9-2.81-5.87 0-10.39 1.81-13.54 5.44-3.16 3.63-4.73 9.27-4.73 16.91v20.66h-26.97v-65.69h26.42v20.88c1.46-7.63 3.84-13.26 7.11-16.9 3.25-3.63 7.46-5.44 12.59-5.44 3.89 0 7.22.9 10.02 2.69zm-130.61 61.99c-6.35-3.14-11.19-7.44-14.53-12.91-3.33-5.47-5.01-11.57-5.01-18.31s1.66-12.75 5.01-18.03 8.16-9.42 14.49-12.42c6.3-3 13.83-4.49 22.56-4.49s16.26 1.49 22.57 4.49 11.12 7.11 14.42 12.36c3.31 5.24 4.96 11.26 4.96 18.08 0 6.73-1.65 12.83-4.96 18.3-3.3 5.47-8.13 9.77-14.48 12.92-6.36 3.14-13.86 4.71-22.52 4.71-8.67 0-16.17-1.55-22.51-4.7zm33.45-19.92c2.68-2.73 4.03-6.34 4.03-10.83s-1.34-8.07-4.03-10.72c-2.67-2.66-6.32-3.99-10.94-3.99-4.71 0-8.39 1.33-11.07 3.99s-4.01 6.23-4.01 10.72 1.33 8.1 4.01 10.83c2.67 2.72 6.36 4.1 11.07 4.1 4.62-.01 8.27-1.38 10.94-4.1zm-111.67 19.92c-6.31-3.14-11.07-7.41-14.25-12.8s-4.78-11.46-4.78-18.19c0-6.74 1.65-12.77 4.95-18.08 3.31-5.31 8.15-9.49 14.54-12.52 6.38-3.03 14.01-4.54 22.89-4.54 11.01 0 20.15 2.36 27.41 7.08v20.55c-2.56-1.8-5.55-3.26-8.96-4.38s-7.06-1.69-10.96-1.69c-6.83 0-12.16 1.27-16.01 3.82s-5.79 5.87-5.79 10c0 4.04 1.87 7.34 5.62 9.94 3.74 2.59 9.16 3.89 16.29 3.89 3.66 0 7.28-.55 10.85-1.62 3.55-1.1 6.62-2.43 9.18-4v19.88c-8.06 4.94-17.42 7.41-28.07 7.41-8.96-.03-16.6-1.6-22.91-4.75zm-77.94 2.36c-5.95-1.57-11.31-3.85-16.08-6.85v-18.64c3.61 2.84 8.43 5.18 14.49 7.02 6.05 1.83 11.9 2.75 17.56 2.75 2.65 0 4.64-.36 5.99-1.06 1.36-.71 2.04-1.56 2.04-2.54 0-1.12-.37-2.05-1.11-2.8-.74-.76-2.17-1.38-4.29-1.91l-13.21-3.03c-7.56-1.8-12.93-4.29-16.12-7.48-3.19-3.18-4.78-7.35-4.78-12.51 0-4.35 1.38-8.12 4.18-11.35 2.79-3.22 6.75-5.71 11.89-7.46 5.15-1.76 11.15-2.64 18.06-2.64 6.16 0 11.81.67 16.95 2.02s9.39 3.06 12.77 5.16v17.64c-3.46-2.11-7.43-3.76-11.95-5.01-4.52-1.24-9.15-1.84-13.94-1.84-6.9 0-10.34 1.2-10.34 3.59 0 1.12.53 1.96 1.6 2.52s3.03 1.14 5.88 1.75l11.01 2.02c7.19 1.26 12.55 3.49 16.07 6.67 3.53 3.18 5.29 7.88 5.29 14.1 0 6.82-2.91 12.23-8.75 16.24-5.83 4.01-14.11 6.01-24.83 6.01-6.31-.01-12.44-.8-18.38-2.37zm-55.01-50.1c8.24 3.62 18.46 3.78 26.89 0v50.56h-26.89zm13.46-8.49c7.42 0 13.44-5.52 13.44-12.32s-6.02-12.32-13.44-12.32c-7.43 0-13.45 5.52-13.45 12.32s6.02 12.32 13.45 12.32zm-113.34-19.91h42.93c10.35 0 19.09 1.65 26.26 4.94 7.16 3.29 12.52 7.88 16.08 13.75 3.55 5.87 5.34 12.6 5.34 20.17 0 7.41-1.86 14.13-5.57 20.15-3.71 6.03-9.35 10.79-16.95 14.31-7.59 3.51-17 5.28-28.24 5.28h-39.85zm39.41 58.62c6.96 0 12.33-1.78 16.07-5.32 3.74-3.57 5.61-8.41 5.61-14.55 0-5.7-1.67-10.24-5-13.64s-8.38-5.12-15.13-5.12h-13.43v38.63zm-109 30.62c-17.32 12.94-34.11 20.78-50.63 25.91-4.09-5.59-7.7-11.56-10.83-17.82a105.82 105.82 0 0 0 17.09-8.31c-1.41-1.06-2.81-2.17-4.18-3.3-32.51 15.36-68.25 15.36-101.15 0a96.475 96.475 0 0 1 -4.19 3.3c5.4 3.24 11.11 6.03 17.07 8.29-3.13 6.28-6.77 12.23-10.84 17.83-16.5-5.14-33.28-12.98-50.59-25.9-3.54-37.87 3.54-76.29 29.64-115.7 12.95-6.06 26.8-10.47 41.29-12.97 1.79 3.2 3.91 7.52 5.34 10.95 15.1-2.31 30.34-2.31 45.72 0 1.43-3.43 3.51-7.75 5.28-10.95 14.47 2.5 28.31 6.89 41.25 12.94 22.63 33.76 33.88 71.83 29.73 115.73zm-114.37-43.71c.18-11.23-7.92-20.44-17.97-20.44s-17.98 9.22-17.98 20.44c0 11.21 8.1 20.42 17.98 20.42 10.05 0 17.99-9.21 17.97-20.42zm66.43 0c.18-11.23-7.92-20.44-17.97-20.44s-17.98 9.22-17.98 20.44c0 11.21 8.1 20.42 17.98 20.42 10.05 0 17.97-9.21 17.97-20.42z" fill="currentColor"/>
  </svg>
);

// Custom hook for subtle sine-wave animation on nav links
const useSineWaveAnimation = (bpm = 120, currentBeat: number, offset = 0): AnimationControls => {
  const controls = useAnimation();
  
  // Calculate sine wave position (0-1) based on beat and optional offset
  const sinePosition = Math.sin((currentBeat / 4 + offset) * Math.PI * 2) * 0.5 + 0.5;
  
  // Update animation on every beat or beat fraction
  useEffect(() => {
    // Subtle brightness and scale based on sine wave
    controls.start({
      opacity: 0.7 + (sinePosition * 0.3), // Subtle opacity change (0.7-1.0)
      y: sinePosition * 2, // Subtle vertical movement (0-2px)
      scale: 1 + (sinePosition * 0.02), // Subtle scale (1.0-1.02)
      transition: {
        duration: 0.5, // Half-beat duration for smooth sine wave
        ease: [0.33, 1, 0.68, 1], // Sine-like easing
      }
    });
  }, [currentBeat, sinePosition, controls]);
  
  return controls;
};

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMenuAnimating, setIsMenuAnimating] = useState(false); // Track animation state
  const currentBeat = useRhythmController(120); // Shared rhythm at 120 BPM
  const logoControls = useLogoAnimation(120, currentBeat); // Logo animation on beats 1 & 3
  
  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '0px'; // Prevent layout shift from scrollbar
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isMobileMenuOpen]);

  // Handle menu toggle with animation tracking
  const handleMenuToggle = () => {
    if (isMobileMenuOpen) {
      setIsMenuAnimating(true); // Start tracking animation
      setIsMobileMenuOpen(false);
    } else {
      setIsMobileMenuOpen(true);
      setIsMenuAnimating(false);
    }
  };

  // Handle exit animation complete
  const handleExitComplete = () => {
    setIsMenuAnimating(false); // Exit animation finished, safe to change layout
  };
  
  // Get animation controls for each nav link with slight offsets for wave effect
  const featuresControls = useSineWaveAnimation(120, currentBeat, 0);
  const pricingControls = useSineWaveAnimation(120, currentBeat, 0.3);
  const technicalControls = useSineWaveAnimation(120, currentBeat, 0.5);
  const roadmapControls = useSineWaveAnimation(120, currentBeat, 0.7);
  const supportControls = useSineWaveAnimation(120, currentBeat, 0.9);
  
  // Array of nav items with their animation controls
  const navItems = [
    { name: 'Features', controls: featuresControls },
    { name: 'Pricing', controls: pricingControls },
    { name: 'Technical', controls: technicalControls },
    { name: 'Roadmap', controls: roadmapControls },
    { name: 'Support', controls: supportControls },
  ];

  return (
    <HeaderContainer
      $isMenuOpen={isMobileMenuOpen}
      $isAnimating={isMenuAnimating}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
      }}
    >
      <HeaderTopRow>
        <Logo 
          href="/" 
          variants={bounceScale} 
          whileHover="hover" 
          whileTap="tap"
          animate={logoControls} // Apply the rhythmic animation
        >
          <img src={`${process.env.PUBLIC_URL}/logo192.png`} alt="mixmate.ai Logo" />
        </Logo>

        <Nav>
          {/* Discord Button without rhythm animation */}
          <DiscordButton 
            href="https://discord.gg/ZEJ97uwSSX" 
            target="_blank" 
            rel="noopener noreferrer"
            variants={bounceScale}
            whileHover="hover"
            whileTap="tap"
            // No rhythm animation here
          >
            <DiscordSVG />
          </DiscordButton>
          
          {/* Navigation links with subtle sine wave animations */}
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              href={`#${item.name.toLowerCase()}`}
              variants={bounceScale}
              whileHover="hover"
              whileTap="tap"
              animate={item.controls} // Apply subtle sine wave animation
            >
              {item.name}
            </NavLink>
          ))}
        </Nav>

        <MobileMenuButton
          onClick={handleMenuToggle}
          variants={bounceScale}
          whileTap="tap"
        >
          <AnimatedHamburger isOpen={isMobileMenuOpen} />
        </MobileMenuButton>
      </HeaderTopRow>

      <AnimatePresence onExitComplete={handleExitComplete}>
        {isMobileMenuOpen && (
          <MobileMenu
            variants={slideInRight}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {/* Add Discord button to mobile menu */}
            <MobileDiscordButton
              href="https://discord.gg/ZEJ97uwSSX"
              target="_blank"
              rel="noopener noreferrer"
              variants={bounceScale}
              whileHover="hover"
              whileTap="tap"
            >
              <DiscordSVG />
            </MobileDiscordButton>
            
            {/* Navigation links */}
            {navItems.map((item) => (
              <MobileNavLink
                key={item.name}
                href={`#${item.name.toLowerCase()}`}
                onClick={handleMenuToggle}
                variants={bounceScale}
                whileHover="hover"
                whileTap="tap"
                animate={item.controls} // Apply subtle sine wave animation
              >
                {item.name}
              </MobileNavLink>
            ))}
          </MobileMenu>
        )}
      </AnimatePresence>
    </HeaderContainer>
  );
};

export default Header; 