import React from 'react';
import styled from 'styled-components';
import MarkdownRenderer from './MarkdownRenderer';

const Content = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  line-height: 1.6;

  h3 {
    color: ${({ theme }) => theme.colors.text.primary};
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
    margin: ${({ theme }) => theme.spacing.xl} 0 ${({ theme }) => theme.spacing.md};
  }

  p {
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  ul {
    margin: ${({ theme }) => theme.spacing.md} 0;
    padding-left: ${({ theme }) => theme.spacing.xl};
  }

  li {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
`;

export const PrivacyPolicyContent: React.FC = () => (
    <MarkdownRenderer filePath="/assets/docs/privacy_policy.md" />
);

export const TermsOfServiceContent: React.FC = () => (
    <MarkdownRenderer filePath="/assets/docs/terms_of_service.md" />
);

export const AboutUsContent: React.FC = () => (
    <Content>
        <h3>About Mixmate AI</h3>
        <p>
            MixMate AI is the world's first intelligent production assistant that creates a direct neural bridge 
            between your DAW and advanced AI systems.
        </p>
        
        <p>
            Unlike other AI audio tools that simply process your finished mix, MixMate AI understands every 
            component of your production from the inside out. By connecting directly to Ableton through 
            OSC communication, processing audio with our custom LibTorch models, and leveraging large 
            language models for human-like feedback, MixMate AI becomes an extension of your creative 
            process—not a replacement for it.
        </p>
        
        <h3>Our Mission</h3>
        <p>
            We believe that AI should enhance human creativity, not replace it. Our goal is to build tools 
            that help musicians and producers make better music, faster, while still maintaining complete 
            creative control. MixMate AI is designed to be a collaborative partner in your creative 
            process—suggesting improvements, explaining techniques, and helping you realize your unique vision.
        </p>
        
        <h3>Our Team</h3>
        <p>
            MixMate AI was founded by a team of experienced musicians, audio engineers, and machine learning 
            experts who understand both the technical and creative aspects of music production.
        </p>
        
        <p>
            Our diverse team combines expertise in audio signal processing, machine learning, user experience 
            design, and professional music production to create an AI assistant that truly understands the 
            nuances of music creation.
        </p>
        
        <h3>Contact Us</h3>
        <p>
            We're always looking to improve and expand MixMate AI. If you have questions, feedback, or 
            ideas for new features, please reach out to us at:
        </p>
        <p>
            Email: support@mixmate.ai
        </p>
    </Content>
); 