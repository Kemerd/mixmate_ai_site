import React, { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { fadeUpVariant, staggerContainer, bounceScale } from '../../animations/variants';

// Move static data outside component to prevent recreation on every render
const WINDOWS_LOGO_PATH = `${process.env.PUBLIC_URL}/assets/images/brand-logos/windows.svg`;
const MACOS_LOGO_PATH = `${process.env.PUBLIC_URL}/assets/images/brand-logos/macos.svg`;
const DAW_INTERFACE_PATH = `${process.env.PUBLIC_URL}/assets/images/mixmate_preview_test.png`;

// Memoize static animation variants to prevent recreation
const memoizedMacOsButtonVariants = {
  hover: {
    scale: 1.02,
    transition: { type: "spring", stiffness: 300, damping: 15 }
  }
};

const memoizedMacOsElementVariants = {
  logo: { 
    visible: { opacity: 0.8, scale: 1, display: "block" },
    hidden: { opacity: 0, scale: 0.95, transitionEnd: { display: "none" } }
  },
  badge: {
    visible: { opacity: 1, scale: 1, display: "block" },
    hidden: { opacity: 0, scale: 0.95, transitionEnd: { display: "none" } }
  }
};

const memoizedMacOsLogoVariants = {
  initial: { opacity: 0.8 },
  hover: { opacity: 0 }
};

const memoizedComingSoonVariants = {
  initial: { opacity: 0 },
  hover: { opacity: 1 }
};

const memoizedBadgeVariants = {
  rest: { opacity: 0, y: 3, scale: 0.95, transition: { duration: 0.15, ease: "easeOut" } },
  hover: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 350, damping: 12, delay: 0.05 } }
};

// Styled components for our hero section
const HeroSection = styled(motion.section)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing['3xl']} ${({ theme }) => theme.spacing.xl};
  padding-top: calc(${({ theme }) => theme.spacing['3xl']} * 2);
  position: relative;
  overflow: hidden;
`;

const GradientBackground = styled(motion.div)`
  position: absolute;
  top: -50%;
  left: -50%;
  right: -50%;
  bottom: -50%;
  background: radial-gradient(
    circle at center,
    ${({ theme }) => `${theme.colors.accent}15`} 0%,
    transparent 70%
  );
  z-index: -1;
  transform-origin: center;
`;

const HeroContent = styled(motion.div)`
  max-width: 1200px;
  width: 100%;
  text-align: center;
  z-index: 1;
`;

const Title = styled(motion.h1)`
  font-size: clamp(2.5rem, 8vw, ${({ theme }) => theme.typography.fontSize['6xl']});
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.text.primary} 0%,
    ${({ theme }) => theme.colors.accent} 50%,
    ${({ theme }) => theme.colors.text.primary} 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  background-size: 200% auto;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  line-height: 1.2;
`;

const Subtitle = styled(motion.p)`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 800px;
  margin: 0 auto ${({ theme }) => theme.spacing['2xl']};
  line-height: 1.5;
  padding: 0 ${({ theme }) => theme.spacing.md};
`;

// Define interfaces for our custom props
interface DownloadButtonProps {
  $disabled?: boolean;
}

interface ButtonIconProps {
  $disabled?: boolean;
}

const CTAContainer = styled(motion.div)`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: center;
  }
`;

const DownloadButton = styled(motion.a)<DownloadButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  background: ${({ theme, $disabled }) => $disabled ? 'rgba(255, 255, 255, 0.08)' : theme.colors.accent};
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  text-decoration: none;
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  cursor: ${({ $disabled }) => $disabled ? 'not-allowed' : 'pointer'};
  position: relative;
  overflow: hidden;
  min-width: 180px;
  opacity: ${({ $disabled }) => $disabled ? 0.8 : 1};
  box-shadow: ${({ $disabled }) => $disabled ? 'none' : '0 4px 12px rgba(57, 255, 20, 0.3)'};
  
  /* Glow effect */
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle at center,
      ${({ theme, $disabled }) => $disabled ? 'rgba(255, 255, 255, 0.05)' : `${theme.colors.accent}60`} 0%,
      transparent 70%
    );
    opacity: 0;
    z-index: -1;
    transition: opacity 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  }
  
  &:hover::before {
    opacity: ${({ $disabled }) => $disabled ? 0.1 : 0.7};
  }
`;

const ButtonIcon = styled(motion.img)<ButtonIconProps>`
  width: 120px;
  height: auto;
  filter: ${({ $disabled }) => $disabled ? 'brightness(0.8) grayscale(50%)' : 'brightness(1)'};
  transition: opacity 0.2s ease-out;
`;

const ComingSoonBadge = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.primary};
  text-transform: uppercase;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  letter-spacing: 1px;
  white-space: nowrap;
  transition: opacity 0.2s ease-out;
`;

const DAWInterfaceContainer = styled(motion.div)`
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -20%;
    left: 0;
    right: 0;
    height: 40%;
    background: radial-gradient(
      ellipse at center,
      ${({ theme }) => `${theme.colors.accent}15`} 0%,
      transparent 70%
    );
    z-index: -1;
    filter: blur(20px);
  }
`;

const DAWInterfaceImage = styled(motion.img)`
  width: 100%;
  height: auto;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
`;

const Hero: React.FC = React.memo(() => {
  // Add hover state for macOS button
  const [macOsHovered, setMacOsHovered] = useState(false);

  // Memoize event handlers to prevent child re-renders
  const handleMacOsMouseEnter = useCallback(() => setMacOsHovered(true), []);
  const handleMacOsMouseLeave = useCallback(() => setMacOsHovered(false), []);

  // Memoize complex animation objects to prevent recreation
  const windowsButtonAnimation = useMemo(() => ({
    initial: { boxShadow: "0 4px 12px rgba(57, 255, 20, 0.2)" },
    animate: {
      boxShadow: ["0 4px 12px rgba(57, 255, 20, 0.2)", "0 6px 20px rgba(57, 255, 20, 0.4)", "0 4px 12px rgba(57, 255, 20, 0.2)"],
      y: [0, -3, 0]
    },
    transition: {
      boxShadow: {
        repeat: Infinity,
        duration: 3,
        ease: "easeInOut"
      },
      y: {
        repeat: Infinity,
        duration: 3,
        ease: "easeInOut"
      }
    }
  }), []);

  const windowsButtonHover = useMemo(() => ({
    scale: 1.03,
    transition: { type: "spring", stiffness: 400, damping: 10 }
  }), []);

  const windowsButtonTap = useMemo(() => ({
    scale: 0.98,
    transition: { type: "spring", stiffness: 400, damping: 10 }
  }), []);

  const macOsButtonHover = useMemo(() => ({
    scale: 1.02,
    transition: { type: "spring", stiffness: 300, damping: 15 }
  }), []);

  const gradientBackgroundAnimation = useMemo(() => ({
    animate: {
      scale: [1, 1.2, 1],
      rotate: [0, 180, 360],
    },
    transition: {
      duration: 20,
      repeat: Infinity,
      repeatType: "reverse" as const,
    }
  }), []);

  const dawInterfaceAnimation = useMemo(() => ({
    initial: { y: 20 },
    animate: {
      y: [20, -20, 20],
    },
    transition: {
      duration: 6,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut",
    }
  }), []);

  const buttonIconAnimation = useMemo(() => ({
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { type: "spring", stiffness: 300, delay: 0.1 }
  }), []);

  // Memoize style objects to prevent recreation
  const windowsIconStyle = useMemo(() => ({
    filter: "invert(23%) sepia(98%) saturate(1640%) hue-rotate(199deg) brightness(96%) contrast(101%)"
  }), []);

  const macOsIconStyle = useMemo(() => ({
    filter: "brightness(0) invert(1)",
    opacity: macOsHovered ? 0 : 0.8
  }), [macOsHovered]);

  const comingSoonStyle = useMemo(() => ({
    opacity: macOsHovered ? 1 : 0
  }), [macOsHovered]);

  const dawImageStyle = useMemo(() => ({
    filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.2))'
  }), []);

  return (
    <HeroSection
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <GradientBackground
        {...gradientBackgroundAnimation}
      />

      <HeroContent>
        <Title
          variants={fadeUpVariant}
        >
          Because Someone Had
          <br />
          To Make It
        </Title>

        <Subtitle variants={fadeUpVariant}>
        The AI production assistant you've always wanted. Remember when you first saw an LLM and thought "cool, but can it fix my terrible mix?" Yeah. That one.
        </Subtitle>

        <CTAContainer variants={fadeUpVariant}>
          <DownloadButton
            href="#download-windows"
            variants={bounceScale}
            whileHover={windowsButtonHover}
            whileTap={windowsButtonTap}
            {...windowsButtonAnimation}
          >
            <ButtonIcon 
              src={WINDOWS_LOGO_PATH}
              alt="Windows logo"
              {...buttonIconAnimation}
              style={windowsIconStyle}
            />
          </DownloadButton>
          
          <DownloadButton
            $disabled={true}
            as="div"
            onMouseEnter={handleMacOsMouseEnter}
            onMouseLeave={handleMacOsMouseLeave}
            whileHover={macOsButtonHover}
          >
            <ButtonIcon 
              src={MACOS_LOGO_PATH}
              alt="MacOS logo" 
              $disabled={true}
              style={macOsIconStyle}
            />
            <ComingSoonBadge
              style={comingSoonStyle}
            >
              Coming Soon
            </ComingSoonBadge>
          </DownloadButton>
        </CTAContainer>

        <DAWInterfaceContainer
          variants={fadeUpVariant}
        >
          <DAWInterfaceImage
            src={DAW_INTERFACE_PATH}
            alt="MixMate AI Application Interface"
            {...dawInterfaceAnimation}
            style={dawImageStyle}
          />
        </DAWInterfaceContainer>
      </HeroContent>
    </HeroSection>
  );
});

// Add display name for debugging
Hero.displayName = 'Hero';

export default Hero; 