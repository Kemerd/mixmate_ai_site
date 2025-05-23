import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUpVariant, staggerContainer } from '../../animations/variants';
import useInView from '../../hooks/useInView';
import { useRhythmController, useRhythmAnimation } from '../../hooks/useRhythm';

const RoadmapSection = styled(motion.section)`
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
    ${({ theme }) => theme.colors.background.secondary} 100%
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

const FeatureList = styled(motion.ul)`
  list-style: none;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const FeatureItem = styled(motion.li)`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;

  &::before {
    content: '✓';
    color: ${({ theme }) => theme.colors.accent};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    flex-shrink: 0;
    margin-top: 2px;
  }

  strong {
    color: ${({ theme }) => theme.colors.text.primary};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }
`;

const ComingSoonList = styled(motion.ul)`
  list-style: none;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const ComingSoonItem = styled(motion.li)`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;

  &::before {
    content: '⏳';
    flex-shrink: 0;
    margin-top: 2px;
  }

  strong {
    color: ${({ theme }) => theme.colors.text.primary};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }
`;

const MoonshotBox = styled(motion.div)`
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.accent}10 0%,
    ${({ theme }) => theme.colors.background.secondary} 100%
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

const Roadmap: React.FC = React.memo(() => {
  const { ref, controls: inViewControls } = useInView();
  const currentBeat = useRhythmController(120);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <RoadmapSection id="roadmap" ref={ref}>
      <Container
        variants={staggerContainer}
        initial="hidden"
        animate={inViewControls}
      >
        <SectionTitle 
          variants={fadeUpVariant}
        >
          Jesus Christ, We Just Built This Thing
        </SectionTitle>
        
        <Subtitle variants={fadeUpVariant}>
          Look, we've been coding for 72 hours straight on nothing but energy drinks and the burning 
          desire to never hear another poorly mixed track again. Give us a minute to catch our breath 
          before demanding new features.
        </Subtitle>

        <ExpandButton
          onClick={handleToggleExpand}
          variants={fadeUpVariant}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isExpanded ? 'Hide Roadmap Details' : 'Show Roadmap Details'}
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
                <SectionSubtitle>What You Get Right Now:</SectionSubtitle>
                
                <FeatureList>
                  <FeatureItem>
                    <div>
                      <strong>Real-time Mixing Advice:</strong> Get specific, actionable suggestions based on what the AI 
                      sees in your project
                    </div>
                  </FeatureItem>
                  <FeatureItem>
                    <div>
                      <strong>Parameter Adjustment Guidance:</strong> Learn exactly which knobs to turn and by how much
                    </div>
                  </FeatureItem>
                  <FeatureItem>
                    <div>
                      <strong>Complete Plugin Intelligence:</strong> MixMate recognizes all your VSTs and plugins—even 
                      custom and third-party ones—and understands what each is capable of. It knows what tools you have 
                      available and how best to use them.
                    </div>
                  </FeatureItem>
                </FeatureList>
              </ContentSection>

              <ContentSection>
                <SectionSubtitle>Coming Soon (When We've Had Some Sleep):</SectionSubtitle>
                <ComingSoonItem>
                    <div>
                      <strong>Full Audio Embedding Generation:</strong> Your tracks get transformed into 768-dimensional 
                      representations that capture everything from frequency relationships to tonal qualities
                    </div>
                  </ComingSoonItem>
                  <ComingSoonItem>
                    <div>
                      <strong>Automated Bouncing:</strong> Export sections for analysis without interrupting your workflow
                    </div>
                  </ComingSoonItem>
                  <ComingSoonItem>
                    <div>
                      <strong>Comprehensive Analysis:</strong> Spectrograms, dB analysis, transient detection, and dozens 
                      of other audio metrics
                    </div>
                  </ComingSoonItem>
                <ComingSoonList>
                  <ComingSoonItem>
                    <div>
                      <strong>Direct DAW Control:</strong> Let MixMate make the changes for you (if you're brave enough)
                    </div>
                  </ComingSoonItem>
                  <ComingSoonItem>
                    <div>
                      <strong>Automated Gain Staging:</strong> "Your gain structure is a disaster. Let me fix that for you."
                    </div>
                  </ComingSoonItem>
                  <ComingSoonItem>
                    <div>
                      <strong>Track Creation:</strong> "You need a parallel compression bus for those drums. I'll set it up."
                    </div>
                  </ComingSoonItem>
                  <ComingSoonItem>
                    <div>
                      <strong>Plugin Management:</strong> "That's the wrong compressor for this application. Let me swap it."
                    </div>
                  </ComingSoonItem>
                  <ComingSoonItem>
                    <div>
                      <strong>Full Mix Overhauls:</strong> "This is beyond saving. Let me restructure your entire project."
                    </div>
                  </ComingSoonItem>
                  <ComingSoonItem>
                    <div>
                      <strong>Therapy Sessions:</strong> "Let's talk about your unhealthy relationship with sidechain compression."
                    </div>
                  </ComingSoonItem>
                </ComingSoonList>

                <ContentText>
                  We've got big plans, but right now we're focused on making the core experience rock solid. 
                  If there's something specific you're dying to see, let us know. Or better yet, wait until 
                  we've had at least one full night of sleep before bombarding us with feature requests and complaints.
                </ContentText>
              </ContentSection>

              <ContentSection>
                <SectionSubtitle>The Moonshot (Assuming Enough of You Don't Read the Privacy Policy):</SectionSubtitle>
                
                <MoonshotBox>
                  <ContentText>
                    <strong>Audio-to-DAW Alchemy:</strong> Drop in any reference track, and watch as MixMate conjures 
                    an entire production setup that would create that sound. Every plugin. Every parameter. Every routing 
                    decision. We'll reverse-engineer professional mixes into complete production templates.
                  </ContentText>
                  <ContentText style={{ marginBottom: 0 }}>
                    Assuming, of course, that enough of you don't frantically hit that "opt-out of anonymous data collection" 
                    button. Don't worry—we're only after your genius plugin chains and mixing decisions, not your actual 
                    audio or MIDI (we know that's the copyrighted stuff). Your paranoia is directly proportional to how 
                    long this feature takes to develop. So maybe just... don't look too closely at that section of the terms? 
                    Do it for the culture.
                  </ContentText>
                </MoonshotBox>
              </ContentSection>
            </CollapsibleContent>
          )}
        </AnimatePresence>
      </Container>
    </RoadmapSection>
  );
});

Roadmap.displayName = 'Roadmap';

export default Roadmap; 