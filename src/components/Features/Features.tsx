import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { fadeUpVariant, staggerContainer } from '../../animations/variants';
import useInView from '../../hooks/useInView';

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
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  max-width: 300px;
  width: 100%;
  margin: 0 auto ${({ theme }) => theme.spacing.xl};
`;

const Logo = styled(motion.img)`
  width: 100%;
  height: auto;
`;

const SectionTitle = styled(motion.h2)`
  font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
  color: ${({ theme }) => theme.colors.text.primary};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
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
`;

const FeaturesGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing['2xl']};
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
`;

const features = [
    {
        icon: '🎛️',
        title: 'Complete DAW Integration',
        description: 'Connects directly to your DAW through OSC communication, understanding every aspect of your production.',
    },
    {
        icon: '🧠',
        title: 'AI-Powered Mixing Suggestions',
        description: 'Get context-aware mixing advice based on your specific project, plugins, and genre.',
    },
    {
        icon: '🔊',
        title: 'Real-time Audio Analysis',
        description: 'Advanced analysis of your tracks to understand spectral relationships and provide precise feedback.',
    },
    {
        icon: '🎚️',
        title: 'Parameter Adjustment Guidance',
        description: 'Learn exactly which knobs to turn and by how much to achieve professional sound.',
    },
    {
        icon: '🔌',
        title: 'Plugin Intelligence',
        description: 'MixMate recognizes all your VSTs and plugins—even custom ones—and understands how to use them effectively.',
    },
    {
        icon: '📊',
        title: 'Comprehensive Analysis',
        description: 'Generates spectrograms, dB analysis, transient detection and dozens of audio metrics.',
    },
];

const Features: React.FC = () => {
    const { ref, controls } = useInView();

    return (
        <FeaturesSection id="features" ref={ref}>
            <Container
                variants={staggerContainer}
                initial="hidden"
                animate={controls}
            >
                <LogoContainer
                  variants={fadeUpVariant}
                >
                  <Logo 
                    src="/assets/logo/logo_text_green_white.svg" 
                    alt="MixMate AI Logo"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                </LogoContainer>

                <SectionTitle variants={fadeUpVariant}>
                    Your Expert AI Mixing Assistant
                </SectionTitle>

                <FeaturesGrid>
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            variants={fadeUpVariant}
                            whileHover={{
                                y: -5,
                                transition: {
                                    type: 'spring',
                                    stiffness: 300,
                                    damping: 20,
                                },
                            }}
                        >
                            <FeatureIcon
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 300,
                                    damping: 20,
                                    delay: index * 0.1,
                                }}
                            >
                                {feature.icon}
                            </FeatureIcon>
                            <FeatureTitle>{feature.title}</FeatureTitle>
                            <FeatureDescription>{feature.description}</FeatureDescription>
                        </FeatureCard>
                    ))}
                </FeaturesGrid>
            </Container>
        </FeaturesSection>
    );
};

export default Features; 