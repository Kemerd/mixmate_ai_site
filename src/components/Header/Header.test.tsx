import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '../../styles/theme';
import Header from './Header';

const renderWithTheme = (component: React.ReactNode) => {
    return render(
        <ThemeProvider theme={theme}>
            {component}
        </ThemeProvider>
    );
};

describe('Header Component', () => {
    test('renders logo and navigation links', () => {
        renderWithTheme(<Header />);

        // Check if logo is present
        expect(screen.getByAltText('mixmate.ai Logo')).toBeInTheDocument();

        // Check if navigation links are present
        expect(screen.getByText('Features')).toBeInTheDocument();
        expect(screen.getByText('Pricing')).toBeInTheDocument();
        expect(screen.getByText('Support')).toBeInTheDocument();
    });

    test('mobile menu button toggles menu', () => {
        renderWithTheme(<Header />);

        // Find and click the mobile menu button
        const menuButton = screen.getByRole('button', { name: /menu/i });
        fireEvent.click(menuButton);

        // Check if mobile menu is visible
        const mobileMenu = screen.getAllByText('Features')[1]; // Second occurrence is in mobile menu
        expect(mobileMenu).toBeVisible();

        // Click again to close
        fireEvent.click(menuButton);
        expect(mobileMenu).not.toBeVisible();
    });

    test('navigation links have correct href attributes', () => {
        renderWithTheme(<Header />);

        const links = screen.getAllByRole('link');
        const navLinks = links.filter(link => link.getAttribute('href')?.startsWith('#'));

        expect(navLinks[0]).toHaveAttribute('href', '#features');
        expect(navLinks[1]).toHaveAttribute('href', '#pricing');
        expect(navLinks[2]).toHaveAttribute('href', '#support');
    });
}); 