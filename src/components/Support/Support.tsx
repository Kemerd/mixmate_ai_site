import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUpVariant, staggerContainer, bounceScale } from '../../animations/variants';
import useInView from '../../hooks/useInView';

const SupportSection = styled(motion.section)`
  padding: ${({ theme }) => theme.spacing['3xl']} ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.background.secondary};
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

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing['2xl']};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ContactForm = styled(motion.form)`
  background: ${({ theme }) => theme.colors.background.primary};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const FormGroup = styled(motion.div)`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Label = styled(motion.label)`
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;

const Input = styled(motion.input)`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background.secondary};
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.accent}30;
  }
`;

const TextArea = styled(Input).attrs({ as: 'textarea' })`
  min-height: 150px;
  resize: vertical;
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.text.primary};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  cursor: pointer;
`;

const FAQSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const FAQItem = styled(motion.div)`
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
`;

const FAQQuestion = styled(motion.button)`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-align: left;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => `${theme.colors.background.primary}90`};
  }
`;

const FAQAnswer = styled(motion.div)`
  padding: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  background: ${({ theme }) => theme.colors.background.primary}80;
  line-height: 1.6;
`;

const faqs = [
    {
        question: "How does mixmate.ai work?",
        answer: "mixmate.ai creates a direct neural bridge between your DAW and advanced AI. It connects to your DAW through OSC communication, analyzes your tracks in real-time, and provides context-aware mixing suggestions based on your specific project, plugins, and genre.",
    },
    {
        question: "Which DAWs are currently supported?",
        answer: "Currently, mixmate.ai fully supports Ableton Live with direct integration. We're actively working on adding support for Logic Pro, FL Studio, Pro Tools, and other major DAWs. Join our waitlist to be notified when your DAW is supported.",
    },
    {
        question: "What are MixMoves and how do they work?",
        answer: "MixMoves are the currency that powers mixmate.ai's analysis and suggestions. Each time MixMate analyzes your tracks, suggests a tweak, or helps improve your mix, it costs you MixMoves. The Indie Producer plan includes 500 MixMoves per month, while the Production Studio plan includes 5000.",
    },
    {
        question: "Is my music data secure?",
        answer: "Absolutely! We use enterprise-grade encryption to protect your music data. We never store your actual audio files without explicit permission. All processing is done locally on your machine, with only the analysis data being sent to our servers for AI processing.",
    },
];

const Support: React.FC = () => {
    const { ref, controls } = useInView();
    const [openFAQ, setOpenFAQ] = useState<number | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
    };

    return (
        <SupportSection id="support" ref={ref}>
            <Container
                variants={staggerContainer}
                initial="hidden"
                animate={controls}
            >
                <SectionTitle variants={fadeUpVariant}>
                    Producer Support
                </SectionTitle>

                <Grid>
                    <ContactForm
                        variants={fadeUpVariant}
                        onSubmit={handleSubmit}
                    >
                        <FormGroup>
                            <Label>Name</Label>
                            <Input
                                type="text"
                                placeholder="Your name"
                                required
                                whileFocus={{ scale: 1.01 }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Email</Label>
                            <Input
                                type="email"
                                placeholder="your@email.com"
                                required
                                whileFocus={{ scale: 1.01 }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Message</Label>
                            <TextArea
                                placeholder="Tell us about your production needs..."
                                required
                                whileFocus={{ scale: 1.01 }}
                            />
                        </FormGroup>
                        <SubmitButton
                            type="submit"
                            variants={bounceScale}
                            whileHover="hover"
                            whileTap="tap"
                        >
                            Connect With Us
                        </SubmitButton>
                    </ContactForm>

                    <FAQSection variants={fadeUpVariant}>
                        {faqs.map((faq, index) => (
                            <FAQItem key={index}>
                                <FAQQuestion
                                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                                    variants={bounceScale}
                                    whileHover="hover"
                                    whileTap="tap"
                                >
                                    {faq.question}
                                    <motion.span
                                        animate={{ rotate: openFAQ === index ? 180 : 0 }}
                                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                    >
                                        ↓
                                    </motion.span>
                                </FAQQuestion>
                                <AnimatePresence>
                                    {openFAQ === index && (
                                        <FAQAnswer
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{
                                                type: 'spring',
                                                stiffness: 300,
                                                damping: 30,
                                            }}
                                        >
                                            {faq.answer}
                                        </FAQAnswer>
                                    )}
                                </AnimatePresence>
                            </FAQItem>
                        ))}
                    </FAQSection>
                </Grid>
            </Container>
        </SupportSection>
    );
};

export default Support; 