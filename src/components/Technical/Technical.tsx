import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUpVariant, staggerContainer } from '../../animations/variants';
import useInView from '../../hooks/useInView';
import { useRhythmController, useRhythmAnimation } from '../../hooks/useRhythm';
import { useSectionTracking } from '../../hooks/useAnalyticsTracking';
import { trackExpandContent } from '../../utils/analytics';

const TechnicalSection = styled(motion.section)`
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
  font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
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

const Subtitle = styled(motion.p)`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const ExpandButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin: 0 auto ${({ theme }) => theme.spacing['2xl']};
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.accent}20 0%,
    ${({ theme }) => theme.colors.background.primary} 100%
  );
  border: 2px solid ${({ theme }) => theme.colors.accent};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  color: ${({ theme }) => theme.colors.accent};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.background.primary};
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(156, 255, 0, 0.3);
  }
`;

const ExpandIcon = styled(motion.span)`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const CollapsibleContent = styled(motion.div)`
  overflow: hidden;
`;

const TechGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const TechCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.background.primary};
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

const TechNumber = styled.span`
  display: inline-block;
  width: 32px;
  height: 32px;
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.background.primary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const TechTitle = styled(motion.h3)`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`;

const TechDescription = styled(motion.p)`
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
  font-size: ${({ theme }) => theme.typography.fontSize.base};
`;

const ContentSection = styled(motion.div)`
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
`;

const SectionSubtitle = styled(motion.h3)`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`;

const ContentText = styled(motion.p)`
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.7;
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  max-width: 800px;
`;

const ProcessList = styled(motion.ol)`
  list-style: none;
  counter-reset: step-counter;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const ProcessStep = styled(motion.li)`
  counter-increment: step-counter;
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;

  &::before {
    content: counter(step-counter);
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.background.primary};
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    flex-shrink: 0;
    margin-top: 2px;
  }
`;

const EmbeddingExample = styled(motion.div)`
  background: ${({ theme }) => theme.colors.background.primary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.lg};
  margin: ${({ theme }) => theme.spacing.lg} 0;
  border-left: 4px solid ${({ theme }) => theme.colors.accent};
  font-family: ${({ theme }) => theme.typography.fontFamily.monospace};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;

const EmbeddingItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.text.secondary};

  .label {
    color: ${({ theme }) => theme.colors.text.primary};
  }

  .value {
    color: ${({ theme }) => theme.colors.accent};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }
`;

const HighlightBox = styled(motion.div)`
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.accent}10 0%,
    ${({ theme }) => theme.colors.background.primary} 100%
  );
  border: 1px solid ${({ theme }) => theme.colors.accent}40;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  margin: ${({ theme }) => theme.spacing.xl} 0;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.colors.accent}08 0%,
      transparent 50%,
      ${({ theme }) => theme.colors.accent}05 100%
    );
    pointer-events: none;
  }
`;

const Technical: React.FC = React.memo(() => {
  const { ref, controls: inViewControls } = useInView();
  const currentBeat = useRhythmController(120);
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Add section tracking for analytics
  const technicalRef = useSectionTracking('technical');

  const techData = [
    {
      number: "1",
      title: "OSC Communication Layer",
      description: "We've weaponized Ableton's OSC implementation to extract and control literally everything. Not just the parameters they thought you should access—all of them."
    },
    {
      number: "2", 
      title: "LibTorch-Powered Audio Intelligence",
      description: "We took bleeding-edge advanced audio embedding models and transformed them through custom conversion pipelines. Our C++ implementation with CUDA acceleration processes in milliseconds what takes ages elsewhere."
    },
    {
      number: "3",
      title: "Contextualized LLM Integration", 
      description: "We feed our AI both the audio embeddings AND the complete DAW state. Track names, effect chains, automation curves—all of it gets converted into a unified representation space."
    }
  ];

  const handleToggleExpand = () => {
    const newExpandedState = !isExpanded;
    setIsExpanded(newExpandedState);
    trackExpandContent('technical_details', newExpandedState ? 'expand' : 'collapse');
  };

  return (
    <TechnicalSection id="technical" ref={(el) => {
      // Combine both refs
      if (typeof ref === 'function') {
        ref(el);
      } else if (ref) {
        (ref as any).current = el;
      }
      if (technicalRef) {
        (technicalRef as any).current = el;
      }
    }}>
      <Container
        variants={staggerContainer}
        initial="hidden"
        animate={inViewControls}
      >
        <SectionTitle 
          variants={fadeUpVariant}
        >
          Under the Hood: How We Built This Monstrosity
        </SectionTitle>
        
        <Subtitle variants={fadeUpVariant}>
          Look, we genuinely believe even if you know how we did this, you couldn't replicate our results, 
          so here's how it works, for all the engineers who actually give a damn.
        </Subtitle>

        <ExpandButton
          onClick={handleToggleExpand}
          variants={fadeUpVariant}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isExpanded ? 'Hide Technical Details' : 'Show Technical Details'}
          <ExpandIcon
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            ▼
          </ExpandIcon>
        </ExpandButton>

        <AnimatePresence>
          {isExpanded && (
            <CollapsibleContent
              initial={{ height: 0, opacity: 0 }}
              animate={{ 
                height: 'auto', 
                opacity: 1,
                transition: {
                  height: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
                  opacity: { duration: 0.3, delay: 0.2 }
                }
              }}
              exit={{ 
                height: 0, 
                opacity: 0,
                transition: {
                  height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
                  opacity: { duration: 0.2 }
                }
              }}
            >
              <ContentSection>
                <SectionSubtitle>The Unholy Trinity</SectionSubtitle>
                <ContentText>
                  MixMate combines three technologies that, frankly, weren't meant to work together:
                </ContentText>
                
                <TechGrid>
                  {techData.map((tech, index) => (
                    <TechCard
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{
                        y: -5,
                        transition: { type: 'spring', stiffness: 300, damping: 20 }
                      }}
                    >
                      <TechNumber>{tech.number}</TechNumber>
                      <TechTitle>{tech.title}</TechTitle>
                      <TechDescription>{tech.description}</TechDescription>
                    </TechCard>
                  ))}
                </TechGrid>
              </ContentSection>

              <ContentSection>
                <SectionSubtitle>Why This Shouldn't Work (But It Does)</SectionSubtitle>
                <ContentText>
                  In theory, deep audio analysis, DAW state tracking, and natural language processing should be 
                  three entirely separate problems requiring separate solutions. We threw that conventional wisdom 
                  out the window and built a unified system that's greater than the sum of its parts.
                </ContentText>
                <ContentText>
                  Our embedding space doesn't just represent "how this audio sounds"—it represents "what this 
                  producer is trying to do with these specific tools." That distinction is why nobody else can 
                  touch what we've built.
                </ContentText>
              </ContentSection>

              <ContentSection>
                <SectionSubtitle>So, What the Hell is an Embedding?</SectionSubtitle>
                <ContentText>
                  Think of it like this: An embedding is a fancy, multi-dimensional vector (think: a list of numbers) 
                  that captures the *essence* of something complex, like a sound or even an idea.
                </ContentText>
                <ContentText>
                  It's not the *word* "fruit" you say out loud; it's the abstract *concept* of "fruit" you have 
                  in your head. By itself, a single embedding is kind of useless – what good is the *idea* of 
                  fruit if you don't know what an apple, banana, or orange actually is?
                </ContentText>
                <ContentText>
                  The magic happens when you compare them. Similar concepts get vectors that are numerically close. 
                  Dissimilar ones are far apart. Imagine a super simple 1D embedding:
                </ContentText>
                
                <EmbeddingExample>
                  <EmbeddingItem>
                    <span className="label">'Apple' might become</span>
                    <span className="value">0.34</span>
                  </EmbeddingItem>
                  <EmbeddingItem>
                    <span className="label">'Banana' might become</span>
                    <span className="value">0.37</span>
                    <span style={{ marginLeft: '8px', fontSize: '0.75rem', opacity: 0.7 }}>(pretty close, right?)</span>
                  </EmbeddingItem>
                  <EmbeddingItem>
                    <span className="label">'Car' might become</span>
                    <span className="value">0.80</span>
                    <span style={{ marginLeft: '8px', fontSize: '0.75rem', opacity: 0.7 }}>(way off in numerical space)</span>
                  </EmbeddingItem>
                </EmbeddingExample>

                <ContentText>
                  Now, scale that up to hundreds of dimensions, apply it to audio characteristics, and feed it 
                  context from your DAW. That's how MixMate understands not just the sound, but the *intent* behind it.
                </ContentText>
              </ContentSection>

              <ContentSection>
                <SectionSubtitle>The Secret Sauce</SectionSubtitle>
                
                <HighlightBox>
                  <ContentText style={{ marginBottom: 0 }}>
                    Okay, so we have these fancy audio embeddings. Big deal. On their own, they're just 
                    high-dimensional snapshots of sound. The real magic—the *actual* secret sauce—happens 
                    when we fuse that audio intelligence with the mountains of context ripped straight from your DAW.
                  </ContentText>
                </HighlightBox>

                <ContentText>
                  When you ask MixMate to "make the vocals cut through the mix better," it:
                </ContentText>

                <ProcessList>
                  <ProcessStep>
                    Analyzes the spectral relationship between your vocal track and competing elements 
                    <em style={{ color: '#7DA18A', fontStyle: 'italic' }}> (using the embeddings)</em>
                  </ProcessStep>
                  <ProcessStep>
                    Examines your existing processing chain to understand your intended sound 
                    <em style={{ color: '#7DA18A', fontStyle: 'italic' }}> (using the DAW context)</em>
                  </ProcessStep>
                  <ProcessStep>
                    Considers standard practices for your detected genre 
                    <em style={{ color: '#7DA18A', fontStyle: 'italic' }}> (using questionably-sourced magic AI knowledge)</em>
                  </ProcessStep>
                  <ProcessStep>
                    Generates targeted parameter adjustments that respect your existing work 
                    <em style={{ color: '#7DA18A', fontStyle: 'italic' }}> (the intelligent output)</em>
                  </ProcessStep>
                </ProcessList>

                <ContentText>
                  We're not applying generic presets. We're making the same decisions a world-class producer 
                  would make after understanding your specific project.
                </ContentText>
              </ContentSection>

              <ContentSection>
                <SectionSubtitle>Good Luck Copying This</SectionSubtitle>
                <ContentText>
                  We solved insanely complex technical challenges to make this work on consumer hardware. 
                  Our vectorization engine converts audio into 768-dimensional embeddings in about 100ms—10-30x 
                  faster than any existing implementations. We've built a complete audio processing toolkit with 
                  GPU-accelerated resampling, spectrogram generation, and real-time monitoring that makes 
                  everything run smoother than you thought possible.
                </ContentText>
                <ContentText>
                  So yeah, that's how it works. Not that it helps you much, especially if you don't know how 
                  to write C or know what a Tensor is. But we appreciate your curiosity.
                </ContentText>
              </ContentSection>
            </CollapsibleContent>
          )}
        </AnimatePresence>
      </Container>
    </TechnicalSection>
  );
});

Technical.displayName = 'Technical';

export default Technical; 