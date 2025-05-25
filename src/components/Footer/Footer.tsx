import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { fadeUpVariant, bounceScale } from '../../animations/variants';
import useInView from '../../hooks/useInView';
import Modal from '../Modal/Modal';
import { PrivacyPolicyContent, TermsOfServiceContent, AboutUsContent } from '../Modal/ModalContent';

const FooterSection = styled(motion.footer)`
  padding: ${({ theme }) => theme.spacing['3xl']} ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.background.primary};
  position: relative;
  overflow: hidden;
`;

const Container = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: ${({ theme }) => theme.spacing['2xl']};
  align-items: start;
`;

const Column = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const Logo = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  position: relative;
  transition: transform 0.3s ease;

  img {
    max-height: 120px;
    max-width: 200px;
    width: auto;
    height: auto;
    object-fit: contain;
    transition: all 0.3s ease;
  }

  &:hover {
    transform: scale(1.05);
    
    img {
      filter: 
        drop-shadow(2px 0 0 #ff0000)
        drop-shadow(-2px 0 0 #00ffff)
        drop-shadow(0 2px 0 #ff00ff);
      animation: glitch 0.3s ease-in-out;
    }
  }

  @keyframes glitch {
    0% {
      filter: 
        drop-shadow(0 0 0 #ff0000)
        drop-shadow(0 0 0 #00ffff)
        drop-shadow(0 0 0 #ff00ff);
    }
    25% {
      filter: 
        drop-shadow(3px 0 0 #ff0000)
        drop-shadow(-3px 0 0 #00ffff)
        drop-shadow(0 3px 0 #ff00ff);
    }
    50% {
      filter: 
        drop-shadow(-2px 0 0 #ff0000)
        drop-shadow(2px 0 0 #00ffff)
        drop-shadow(0 -2px 0 #ff00ff);
    }
    75% {
      filter: 
        drop-shadow(1px 0 0 #ff0000)
        drop-shadow(-1px 0 0 #00ffff)
        drop-shadow(0 1px 0 #ff00ff);
    }
    100% {
      filter: 
        drop-shadow(2px 0 0 #ff0000)
        drop-shadow(-2px 0 0 #00ffff)
        drop-shadow(0 2px 0 #ff00ff);
    }
  }
`;

const Description = styled(motion.p)`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  line-height: 1.6;
  max-width: 300px;
`;

const Title = styled(motion.h3)`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const LinkList = styled(motion.ul)`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Link = styled(motion.button)`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  text-align: left;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const SocialLinks = styled(motion.div)`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`;

const SocialLink = styled(motion.a)`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.background.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
    transform: translateY(-2px);
  }
`;

const BottomBar = styled(motion.div)`
  margin-top: ${({ theme }) => theme.spacing['3xl']};
  padding-top: ${({ theme }) => theme.spacing.xl};
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const Copyright = styled(motion.p)`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;

const ComingSoonContent = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
`;

type ModalType = 'privacy' | 'terms' | 'about' | 'pressKit' | null;

const Footer: React.FC = () => {
  const { ref, controls } = useInView();
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const handleCloseModal = () => setActiveModal(null);

  return (
    <FooterSection ref={ref}>
      <Container
        variants={fadeUpVariant}
        initial="hidden"
        animate={controls}
      >
        <Column>
          <Logo href="https://novabox.digital/">
            <img src={`${process.env.PUBLIC_URL}/assets/logo/small_novabox1.png`} alt="Novabox Logo" />
          </Logo>
          <Description>
            The world's first intelligent production assistant that creates a direct neural bridge between your DAW and advanced AI.
          </Description>
          <SocialLinks>
            <SocialLink
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              variants={bounceScale}
              whileHover="hover"
              whileTap="tap"
            >
              𝕏
            </SocialLink>
            <SocialLink
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              variants={bounceScale}
              whileHover="hover"
              whileTap="tap"
            >
              in
            </SocialLink>
            <SocialLink
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              variants={bounceScale}
              whileHover="hover"
              whileTap="tap"
            >
              IG
            </SocialLink>
          </SocialLinks>
        </Column>

        <Column>
          <Title>Legal</Title>
          <LinkList>
            <li><Link onClick={() => setActiveModal('terms')}>Terms of Service</Link></li>
            <li><Link onClick={() => setActiveModal('privacy')}>Privacy Policy</Link></li>
            <li><Link onClick={() => setActiveModal('about')}>About Us</Link></li>
          </LinkList>
        </Column>
      </Container>

      <BottomBar variants={fadeUpVariant} animate={controls}>
        <Copyright>&copy; {new Date().getFullYear()} Novabox LLC. All rights reserved.</Copyright>
      </BottomBar>

      <Modal isOpen={activeModal === 'privacy'} onClose={handleCloseModal} title="Privacy Policy">
        <PrivacyPolicyContent />
      </Modal>

      <Modal isOpen={activeModal === 'terms'} onClose={handleCloseModal} title="Terms of Service">
        <TermsOfServiceContent />
      </Modal>

      <Modal isOpen={activeModal === 'about'} onClose={handleCloseModal} title="About Us">
        <AboutUsContent />
      </Modal>

      <Modal isOpen={activeModal === 'pressKit'} onClose={handleCloseModal} title="Coming Soon">
        <ComingSoonContent>
          Our press kit will be available soon. Check back later!
        </ComingSoonContent>
      </Modal>
    </FooterSection>
  );
};

export default Footer; 