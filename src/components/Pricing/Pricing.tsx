import React, { useMemo, useCallback, useState } from 'react';
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

const BillingToggle = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  margin-top: 0px;
  padding: ${({ theme }) => theme.spacing.xs};
  background: ${({ theme }) => theme.colors.background.secondary}80;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  border: 1px solid rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  width: fit-content;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.colors.accent}05 0%,
      transparent 50%,
      ${({ theme }) => theme.colors.accent}03 100%
    );
    pointer-events: none;
  }
`;

const ToggleButton = styled(motion.button).withConfig({
  shouldForwardProp: (prop) => !['isActive'].includes(prop),
})<{ isActive: boolean }>`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  background: ${({ theme, isActive }) =>
    isActive 
      ? `linear-gradient(135deg, ${theme.colors.accent} 0%, ${theme.colors.accent}DD 100%)`
      : 'transparent'};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  color: ${({ theme, isActive }) =>
    isActive ? theme.colors.background.primary : theme.colors.text.secondary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  z-index: 1;
  min-width: 80px;
  
  &:hover {
    background: ${({ theme, isActive }) =>
      isActive 
        ? `linear-gradient(135deg, ${theme.colors.accent} 0%, ${theme.colors.accent}EE 100%)`
        : `${theme.colors.accent}10`};
    color: ${({ theme, isActive }) =>
      isActive ? theme.colors.background.primary : theme.colors.accent};
  }
`;

const ToggleLabel = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.secondary}CC;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  margin-top: ${({ theme }) => theme.spacing['2xl']};
  text-align: center;
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  opacity: 0.7;
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
  shouldForwardProp: (prop) => !['isPopular', 'whileHover'].includes(prop),
})<{ isPopular?: boolean }>`
  background: ${({ theme, isPopular }) =>
        isPopular
            ? `linear-gradient(135deg, 
          ${theme.colors.accent}15 0%,
          ${theme.colors.background.secondary} 100%)`
            : theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  position: relative;
  overflow: hidden;
  border: 1px solid ${({ theme, isPopular }) =>
        isPopular ? theme.colors.accent : 'rgba(255, 255, 255, 0.1)'};
  backdrop-filter: blur(10px);
`;

const PopularBadge = styled(motion.span)`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  right: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.background.primary};
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
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .price-line {
    display: flex;
    align-items: baseline;
    gap: ${({ theme }) => theme.spacing.xs};
  }

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

const DiscountBadge = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.accent}20 0%, ${({ theme }) => theme.colors.accent}10 100%);
  border: 1px solid ${({ theme }) => theme.colors.accent}40;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  margin-top: ${({ theme }) => theme.spacing.sm};
  width: fit-content;
  
  .discount-text {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    color: ${({ theme }) => theme.colors.accent};
  }
  
  .savings-amount {
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    color: ${({ theme }) => theme.colors.text.secondary};
    text-decoration: line-through;
    margin-left: ${({ theme }) => theme.spacing.xs};
  }
`;

const FeatureList = styled(motion.ul)`
  list-style: none;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Feature = styled(motion.li).withConfig({
  shouldForwardProp: (prop) => !['isComingSoon'].includes(prop),
})<{ isComingSoon?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme, isComingSoon }) => 
    isComingSoon ? theme.colors.text.secondary + '80' : theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  position: relative;

  &::before {
    content: '✓';
    color: ${({ theme, isComingSoon }) => 
      isComingSoon ? theme.colors.text.secondary + '60' : theme.colors.accent};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }
`;

const ComingSoonBadge = styled.span`
  background: ${({ theme }) => theme.colors.accent}40;
  color: ${({ theme }) => theme.colors.accent};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  margin-left: auto;
`;

const CTAButton = styled(motion.button).withConfig({
  shouldForwardProp: (prop) => !['isPopular', 'whileHover', 'whileTap'].includes(prop),
})<{ isPopular?: boolean }>`
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  background: ${({ theme, isPopular }) =>
        isPopular ? theme.colors.accent : 'transparent'};
  border: 2px solid ${({ theme }) => theme.colors.accent};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  color: ${({ theme, isPopular }) =>
        isPopular ? theme.colors.background.primary : theme.colors.accent};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.background.primary};
  }
`;

// Static pricing data with the new structure
const INDIE_FEATURES = [
  'Ableton Live integration',
  'Real-time mixing suggestions',
  '1,000 MixMoves for AI analysis',
  'Fast AI models',
  'Our pity for your financial situation',
  '#s 10-second live audio analysis',
  '#s CPU processing',
];

const PRO_FEATURES = [
  'Ableton Live integration',
  'Real-time mixing suggestions',
  '10,000 MixMoves for AI analysis',
  'Advanced AI models with priority processing',
  'Our undying love and support',
  '#s 30-second live audio analysis',
  '#s GPU processing',
];

// Utility function to calculate discount percentage and savings
const calculateDiscount = (monthlyPrice: string, yearlyPrice: string) => {
  const monthly = parseFloat(monthlyPrice.replace('$', ''));
  const yearly = parseFloat(yearlyPrice.replace('$', ''));
  const monthlyAnnual = monthly * 12;
  const savings = monthlyAnnual - yearly;
  const discountPercentage = Math.round((savings / monthlyAnnual) * 100);
  
  return {
    discountPercentage,
    savings: savings.toFixed(2),
    monthlyAnnual: monthlyAnnual.toFixed(2)
  };
};

// Memoized PricingCard component to prevent unnecessary re-renders
const MemoizedPricingCard = React.memo<{
    plan: {
        name: string;
        monthlyPrice: string;
        yearlyPrice: string;
        features: string[];
        isPopular?: boolean;
    };
    index: number;
    currentBeat: number;
    isYearly: boolean;
}>(({ plan, index, currentBeat, isYearly }) => {
    // Use the new useRhythmAnimation hook directly
    const intensity = plan.isPopular ? 1.5 : 1;
    
    // Calculate discount information
    const discountInfo = useMemo(() => 
        calculateDiscount(plan.monthlyPrice, plan.yearlyPrice), 
        [plan.monthlyPrice, plan.yearlyPrice]
    );
    
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

    // Memoize discount badge animation
    const discountBadgeAnimation = useMemo(() => ({
        initial: { opacity: 0, scale: 0.8, y: 10 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.8, y: -10 },
        transition: {
            type: 'spring',
            stiffness: 400,
            damping: 25,
            duration: 0.3
        }
    }), []);

    return (
        <PricingCard
            variants={fadeUpVariant}
            isPopular={plan.isPopular}
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
                <div className="price-line">
                    <span className="amount">{isYearly ? plan.yearlyPrice : plan.monthlyPrice}</span>
                    <span className="period">{isYearly ? '/year' : '/month'}</span>
                </div>
                
                {isYearly && (
                    <DiscountBadge
                        {...discountBadgeAnimation}
                    >
                        <span className="discount-text">
                            Save {discountInfo.discountPercentage}% • ${discountInfo.savings} off
                        </span>
                        <span className="savings-amount">
                            ${discountInfo.monthlyAnnual}
                        </span>
                    </DiscountBadge>
                )}
            </PlanPrice>

            <FeatureList>
                {plan.features.map((feature, featureIndex) => {
                    const isComingSoon = feature.startsWith('#s ');
                    const displayFeature = isComingSoon ? feature.substring(3) : feature;
                    
                    return (
                        <Feature
                            key={featureIndex}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                                delay: 0.3 + featureIndex * 0.1,
                            }}
                            isComingSoon={isComingSoon}
                        >
                            {displayFeature}
                            {isComingSoon && <ComingSoonBadge>Coming Soon</ComingSoonBadge>}
                        </Feature>
                    );
                })}
            </FeatureList>

            <CTAButton
                isPopular={plan.isPopular}
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
    const [isYearly, setIsYearly] = useState(false);

    // Define pricing plans with new structure
    const pricingPlans = useMemo(() => [
        {
            name: 'Indie Producer',
            monthlyPrice: '$9.99',
            yearlyPrice: '$99.99',
            features: INDIE_FEATURES,
        },
        {
            name: 'Production Studio',
            monthlyPrice: '$99.99',
            yearlyPrice: '$999.99',
            features: PRO_FEATURES,
            isPopular: true,
        },
    ], []);

    const handleToggleBilling = useCallback((yearly: boolean) => {
        setIsYearly(yearly);
    }, []);

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
                    {pricingPlans.map((plan, index) => (
                        <MemoizedPricingCard
                            key={`${plan.name}-${index}`}
                            plan={plan}
                            index={index}
                            currentBeat={currentBeat}
                            isYearly={isYearly}
                        />
                    ))}
                </PricingGrid>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                >
                    <ToggleLabel>Choose your billing cycle</ToggleLabel>
                    <BillingToggle>
                        <ToggleButton
                            isActive={!isYearly}
                            onClick={() => handleToggleBilling(false)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Monthly
                        </ToggleButton>
                        <ToggleButton
                            isActive={isYearly}
                            onClick={() => handleToggleBilling(true)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Yearly
                        </ToggleButton>
                    </BillingToggle>
                </motion.div>
            </Container>
        </PricingSection>
    );
});

// Add display name for debugging
Pricing.displayName = 'Pricing';

export default Pricing; 