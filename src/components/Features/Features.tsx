import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import styled from 'styled-components';
import { motion, useAnimation, AnimationControls } from 'framer-motion';
import { fadeUpVariant, staggerContainer } from '../../animations/variants';
import useInView from '../../hooks/useInView';
import { useRhythmController, useKickAnimation, useSnareAnimation, useRhythmAnimation } from '../../hooks/useRhythm';

// Styled components for the features section
const FeaturesSection = styled(motion.section)`
  padding: ${({ theme }) => theme.spacing['3xl']} ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.background.secondary};
  position: relative;
  overflow: hidden;
`;

const Container = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
`;

const LogoContainer = styled(motion.div)`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  max-width: 300px;
  width: 100%;
  margin: 0 auto ${({ theme }) => theme.spacing.md};
  position: relative;
  z-index: 2;
`;

const Logo = styled(motion.img)`
  width: 100%;
  height: auto;
  /* Enhanced performance optimizations */
  will-change: transform, filter;
  transform-style: preserve-3d;
  backface-visibility: hidden;
  /* Base position for chromatic aberration layering */
  position: relative;
  
  /* Create pseudo-elements for RGB splitting */
  &::before, &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: inherit;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.1s ease;
    mix-blend-mode: screen;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
  color: ${({ theme }) => theme.colors.text.primary};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
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
  position: relative;
  z-index: 2;
`;

const FeaturesGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing['2xl']};
  position: relative;
  z-index: 2;
`;

const FeatureCard = styled(motion.div)`
  background: ${({ theme }) => `linear-gradient(
    135deg,
    ${theme.colors.background.primary} 0%,
    ${theme.colors.background.secondary} 100%
  )`};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      ${({ theme }) => theme.colors.accent}50 50%,
      transparent 100%
    );
  }
`;

const FeatureIcon = styled(motion.div)`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.accent}15;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.accent};
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
`;

const FeatureTitle = styled(motion.h3)`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const FeatureDescription = styled(motion.p)`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ComingSoonPill = styled(motion.div)`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing.md};
  right: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => `linear-gradient(
    135deg,
    ${theme.colors.accent}80 0%,
    ${theme.colors.accent} 100%
  )`};
  padding: 4px 12px;
  border-radius: 20px;
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.background.primary};
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  letter-spacing: 0.5px;
`;

// Container for the background visual effect
const BackgroundEffectContainer = styled(motion.div)`
  position: absolute;
  top: -25px;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  z-index: 1;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 0px; /* Position vertically at 290px from top */
  overflow: visible;
`;

// Updated BackgroundSVG component with base height
const BackgroundSVG = styled(motion.img)`
  max-width: 1500px; 
  height: 1100px; /* Base height before animation */
  opacity: 0.8;
  position: relative;
  /* Add a slight transform to extend even wider */
  transform: scale(1.2);
  transform-origin: center top;
`;

const GeneralSubtleTextContainer = styled(motion.div)`
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 2;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.lg};
`;

const TopSpecificSubtleTextContainer = styled(GeneralSubtleTextContainer)`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const BottomSpecificSubtleTextContainer = styled(GeneralSubtleTextContainer)`
  margin-top: ${({ theme }) => theme.spacing['2xl']};
  max-width: 550px;
`;

const SubtleText = styled(motion.p)`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  opacity: 0.9;
  letter-spacing: 0.2px;
  text-align: center;
  margin-bottom: 0;
`;

// Move static data outside component to prevent recreation on every render
const FEATURES_DATA = [
    {
        icon: '🎛️',
        title: 'Real-time DAW Integration',
        description: 'Seamlessly integrates with your favorite DAW. No bouncing, no exporting - just instant AI feedback on your mix.',
        comingSoon: false,
    },
    {
        icon: '🧠',
        title: 'Context-Aware Analysis',
        description: 'Understands your genre, style, and creative intent. Gets smarter with every project you work on.',
        comingSoon: false,
    },
    {
        icon: '⚡',
        title: 'Lightning-Fast Processing',
        description: 'GPU-accelerated AI processing delivers suggestions in real-time. No waiting, no interruptions to your creative flow.',
        comingSoon: false,
    },
    {
        icon: '🎯',
        title: 'Precision Mixing Moves',
        description: 'Specific, actionable suggestions. "Boost 2.3kHz on the snare by 1.2dB" instead of "make it punchier".',
        comingSoon: false,
    },
    {
        icon: '📊',
        title: 'Visual Feedback System',
        description: 'See exactly what the AI is hearing with detailed frequency analysis and mix visualization.',
        comingSoon: false,
    },
    {
        icon: '🔄',
        title: 'Adaptive Learning',
        description: 'Learns your mixing style and preferences. The more you use it, the better it gets at helping you.',
        comingSoon: true,
    },
];

const LOGO_PATH = `${process.env.PUBLIC_URL}/assets/logo/logo_text_green_white.svg`;
const BACKGROUND_SVG_PATH = `${process.env.PUBLIC_URL}/assets/images/squircle_rectangle.svg`;

// Memoized FeatureCard component to prevent unnecessary re-renders
const MemoizedFeatureCard = React.memo<{
    feature: typeof FEATURES_DATA[0];
    index: number;
    currentBeat: number;
}>(({ feature, index, currentBeat }) => {
    // Use the new useRhythmAnimation hook directly
    const cardAnimation = useRhythmAnimation(
        {
            // Extremely subtle movement and shadow
            y: -2,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            transition: {
                duration: 0.2,
                ease: [0.33, 1, 0.68, 1], // Subtle easing
            }
        },
        {
            // Return to normal
            y: 0,
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 25,
                duration: 0.4,
            }
        },
        // Different timing based on card position
        [(index % 2 === 0) ? 0 : 2], // Even cards on beat 0, odd cards on beat 2
        120,
        currentBeat
    );

    // Memoize hover animation
    const hoverAnimation = useMemo(() => ({
        y: -5,
        transition: {
            type: 'spring',
            stiffness: 300,
            damping: 20,
        },
    }), []);

    // Memoize icon animation
    const iconAnimation = useMemo(() => ({
        initial: { scale: 0 },
        animate: { scale: 1 },
        transition: {
            type: 'spring',
            stiffness: 300,
            damping: 20,
            delay: index * 0.1,
        }
    }), [index]);

    return (
        <FeatureCard
            variants={fadeUpVariant}
            animate={cardAnimation}
            whileHover={hoverAnimation}
        >
            <FeatureIcon
                {...iconAnimation}
            >
                {feature.icon}
            </FeatureIcon>
            <FeatureTitle>{feature.title}</FeatureTitle>
            <FeatureDescription>{feature.description}</FeatureDescription>
            {feature.comingSoon && (
                <ComingSoonPill
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 20,
                        delay: 0.5,
                    }}
                >
                    Coming Soon
                </ComingSoonPill>
            )}
        </FeatureCard>
    );
});

MemoizedFeatureCard.displayName = 'MemoizedFeatureCard';

const Features: React.FC = React.memo(() => {
    const { ref, controls: inViewControls } = useInView();
    const currentBeat = useRhythmController(120); // Shared rhythm at 120 BPM
    const kickControls = useKickAnimation(120, currentBeat); // Kick on every beat
    const snareControls = useSnareAnimation(120, currentBeat); // Snare on beats 1 & 3

    // Memoize logo hover animation
    const logoHoverAnimation = useMemo(() => ({
        scale: 1.05
    }), []);

    // Memoize logo transition
    const logoTransition = useMemo(() => ({
        type: "spring",
        stiffness: 300
    }), []);

    // Memoize logo style
    const logoStyle = useMemo(() => ({
        filter: "drop-shadow(4px 0 0 rgba(255,0,0,0.85)) drop-shadow(-4px 0 0 rgba(0,255,255,0.85)) drop-shadow(0 2px 0 rgba(0,255,0,0.6))"
    }), []);

    // Memoize subtitle animation
    const subtitleAnimation = useMemo(() => ({
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 0.9, y: 0 },
        transition: { type: 'spring', stiffness: 100, damping: 20, delay: 0.3 }
    }), []);

    return (
        <FeaturesSection id="features" ref={ref}>
            <Container
                variants={staggerContainer}
                initial="hidden"
                animate={inViewControls}
                style={{ position: 'relative' }}
            >
                <BackgroundEffectContainer variants={fadeUpVariant}>
                  <BackgroundSVG 
                    src={BACKGROUND_SVG_PATH}
                    alt=""
                    variants={fadeUpVariant}
                    animate={kickControls} // Apply kick animation controls
                  />
                </BackgroundEffectContainer>

                <LogoContainer variants={fadeUpVariant}>
                  <Logo 
                    src={LOGO_PATH}
                    alt="MixMate AI Logo"
                    whileHover={logoHoverAnimation}
                    transition={logoTransition}
                    animate={snareControls} // Apply snare animation controls
                    style={logoStyle}
                  />
                </LogoContainer>

                <SectionTitle variants={fadeUpVariant}>
                    Your Expert AI Mixing Assistant
                </SectionTitle>
                
                <TopSpecificSubtleTextContainer
                    variants={fadeUpVariant}
                >
                    <SubtleText
                        {...subtitleAnimation}
                    >
                        No more generic "make it sound better" tools. MixMate AI understands what you're trying to achieve and helps you get there faster.
                    </SubtleText>
                </TopSpecificSubtleTextContainer>

                <FeaturesGrid>
                    {FEATURES_DATA.map((feature, index) => (
                        <MemoizedFeatureCard
                            key={`${feature.title}-${index}`}
                            feature={feature}
                            index={index}
                            currentBeat={currentBeat}
                        />
                    ))}
                </FeaturesGrid>
            </Container>
        </FeaturesSection>
    );
});

// Add display name for debugging
Features.displayName = 'Features';

export default Features; 