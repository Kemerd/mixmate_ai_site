import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { slideInRight, bounceScale } from '../../animations/variants';

// Styled components for our header
const HeaderContainer = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => `linear-gradient(
    to bottom,
    ${theme.colors.background.primary} 0%,
    rgba(0, 0, 0, 0.8) 100%
  )`};
  backdrop-filter: blur(10px);
  z-index: 1000;
`;

const Logo = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};

  img {
    height: 50px;
    width: auto;
    /* No filter needed for the new logo */
  }
`;

const Nav = styled(motion.nav)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const NavLink = styled(motion.a)`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

const MobileMenuButton = styled(motion.button)`
  display: none;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  display: none;
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => theme.colors.background.primary};
  padding: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.xl};
  }
`;

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <HeaderContainer
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
      }}
    >
      <Logo href="/" variants={bounceScale} whileHover="hover" whileTap="tap">
        <img src="/logo192.png" alt="mixmate.ai Logo" />
      </Logo>

      <Nav>
        {['Features', 'Pricing', 'Support'].map((item) => (
          <NavLink
            key={item}
            href={`#${item.toLowerCase()}`}
            variants={bounceScale}
            whileHover="hover"
            whileTap="tap"
          >
            {item}
          </NavLink>
        ))}
      </Nav>

      <MobileMenuButton
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        variants={bounceScale}
        whileTap="tap"
      >
        {isMobileMenuOpen ? '×' : '☰'}
      </MobileMenuButton>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            variants={slideInRight}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {['Features', 'Pricing', 'Support'].map((item) => (
              <NavLink
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsMobileMenuOpen(false)}
                variants={bounceScale}
                whileHover="hover"
                whileTap="tap"
              >
                {item}
              </NavLink>
            ))}
          </MobileMenu>
        )}
      </AnimatePresence>
    </HeaderContainer>
  );
};

export default Header; 