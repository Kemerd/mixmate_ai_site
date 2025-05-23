import React, { useMemo, useCallback } from 'react';
import styled from 'styled-components';
import { motion, useAnimation, AnimationControls } from 'framer-motion';
import { fadeUpVariant, staggerContainer, bounceScale } from '../../animations/variants';
import useInView from '../../hooks/useInView';
import { useRhythmController, useRhythmAnimation } from '../../hooks/useRhythm';

const PricingSection = styled(motion.section)`
  padding: ${({ theme }) => theme.spacing['3xl']} ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.background.primary};
  position: relative;
  overflow: hidden;
`;

const Container = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled(motion.h2)`
  font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
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

const PricingGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing['2xl']};
  padding: 0 ${({ theme }) => theme.spacing.md};

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const PricingCard = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => !['whileHover', 'whileFocus', 'animate', 'isPopular'].includes(prop),
})<{ $isPopular?: boolean }>`
  background: ${({ theme, $isPopular }) =>
        $isPopular
            ? `linear-gradient(135deg, 
          ${theme.colors.accent}15 0%,
          ${theme.colors.background.secondary} 100%)`
            : theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  position: relative;
  overflow: hidden;
  border: 1px solid ${({ theme, $isPopular }) =>
        $isPopular ? theme.colors.accent : 'rgba(255, 255, 255, 0.1)'};
  backdrop-filter: blur(10px);
`;

const PopularBadge = styled(motion.span).withConfig({
  shouldForwardProp: (prop) => !['initial', 'animate', 'transition'].includes(prop),
})`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  right: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.text.primary};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const PlanName = styled(motion.h3)`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const PlanPrice = styled(motion.div)`
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  .amount {
    font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    color: ${({ theme }) => theme.colors.text.primary};
  }

  .period {
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

const FeatureList = styled(motion.ul)`
  list-style: none;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Feature = styled(motion.li)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSize.base};

  &::before {
    content: '✓';
    color: ${({ theme }) => theme.colors.accent};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }
`;

const CTAButton = styled(motion.button).withConfig({
  shouldForwardProp: (prop) => !['whileHover', 'whileTap', 'variants', 'isPopular'].includes(prop),
})<{ $isPopular?: boolean }>`
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  background: ${({ theme, $isPopular }) =>
        $isPopular ? theme.colors.accent : 'transparent'};
  border: 2px solid ${({ theme }) => theme.colors.accent};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  color: ${({ theme, $isPopular }) =>
        $isPopular ? theme.colors.text.primary : theme.colors.accent};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

// Move static data outside component to prevent recreation on every render
const PRICING_PLANS = [
    {
        name: 'Indie Producer',
        price: '$9.99',
        period: '/month',
        features: [
            'Full DAW Integration',
            'Real-time Mixing Suggestions',
            '10-second Context Window',
            'CPU Processing',
            '500 MixMoves Per Month',
        ],
    },
    {
        name: 'Production Studio',
        price: '$99.99',
        period: '/month',
        isPopular: true,
        features: [
            'Everything in Indie Producer, PLUS:',
            'GPU Acceleration (10-30x Faster)',
            '30-second Context Window',
            'Priority Processing',
            '5000 MixMoves Per Month',
        ],
    },
];

// Memoized PricingCard component to prevent unnecessary re-renders
const MemoizedPricingCard = React.memo<{
    plan: typeof PRICING_PLANS[0];
    index: number;
    currentBeat: number;
}>(({ plan, index, currentBeat }) => {
    // Use the new useRhythmAnimation hook directly
    const intensity = plan.isPopular ? 1.5 : 1;
    
    const cardAnimation = useRhythmAnimation(
        {
            // Very subtle movement, glow and scale
            y: -3 * intensity,
            scale: 1 + (0.005 * intensity),
            boxShadow: plan.isPopular 
                ? '0 8px 24px rgba(137, 255, 0, 0.3)'  // Accent color with opacity
                : '0 6px 16px rgba(0, 0, 0, 0.15)',
            transition: {
                duration: 0.2,
                ease: [0.33, 1, 0.68, 1], // Subtle easing
            }
        },
        {
            // Return to normal
            y: 0,
            scale: 1,
            boxShadow: plan.isPopular 
                ? '0 4px 12px rgba(137, 255, 0, 0.2)' // Accent color with opacity
                : '0 2px 8px rgba(0, 0, 0, 0.1)',
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 25,
                duration: 0.4,
            }
        },
        // Popular card pulses on beat 0, non-popular card on beat 2
        // Creating a nice alternating effect
        [plan.isPopular ? 0 : 2],
        120,
        currentBeat
    );

    // Memoize hover animation
    const hoverAnimation = useMemo(() => ({
        y: -10,
        transition: {
            type: 'spring',
            stiffness: 300,
            damping: 20,
        },
    }), []);

    // Memoize badge animation
    const badgeAnimation = useMemo(() => ({
        initial: { scale: 0 },
        animate: { scale: 1 },
        transition: {
            type: 'spring',
            stiffness: 300,
            damping: 20,
        }
    }), []);

    return (
        <PricingCard
            variants={fadeUpVariant}
            $isPopular={plan.isPopular}
            animate={cardAnimation}
            whileHover={hoverAnimation}
        >
            {plan.isPopular && (
                <PopularBadge
                    {...badgeAnimation}
                >
                    Most Popular
                </PopularBadge>
            )}

            <PlanName>{plan.name}</PlanName>
            <PlanPrice>
                <span className="amount">{plan.price}</span>
                <span className="period">{plan.period}</span>
            </PlanPrice>

            <FeatureList>
                {plan.features.map((feature, featureIndex) => (
                    <Feature
                        key={featureIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                            delay: 0.3 + featureIndex * 0.1,
                        }}
                    >
                        {feature}
                    </Feature>
                ))}
            </FeatureList>

            <CTAButton
                $isPopular={plan.isPopular}
                variants={bounceScale}
                whileHover="hover"
                whileTap="tap"
            >
                {plan.isPopular ? 'Start Studio Plan' : 'Start Indie Plan'}
            </CTAButton>
        </PricingCard>
    );
});

MemoizedPricingCard.displayName = 'MemoizedPricingCard';

const Pricing: React.FC = React.memo(() => {
    const { ref, controls: inViewControls } = useInView();
    const currentBeat = useRhythmController(120); // Shared rhythm at 120 BPM

    return (
        <PricingSection id="pricing" ref={ref}>
            <Container
                variants={staggerContainer}
                initial="hidden"
                animate={inViewControls}
            >
                <SectionTitle variants={fadeUpVariant}>
                    Revolutionary Tech, Not Revolutionary Pricing
                </SectionTitle>

                <PricingGrid>
                    {PRICING_PLANS.map((plan, index) => (
                        <MemoizedPricingCard
                            key={`${plan.name}-${index}`}
                            plan={plan}
                            index={index}
                            currentBeat={currentBeat}
                        />
                    ))}
                </PricingGrid>
            </Container>
        </PricingSection>
    );
});

// Add display name for debugging
Pricing.displayName = 'Pricing';

export default Pricing; 