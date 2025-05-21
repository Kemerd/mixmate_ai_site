import { DefaultTheme } from 'styled-components';

// Define our theme with colors from the Flutter app theme.dart file
// We're using a sleek, modern, Apple-inspired design language with
// glassmorphic elements throughout the UI for depth and visual hierarchy.
// Our color scheme features dark backgrounds with vibrant lime green accents
// for a futuristic, high-tech audio production feel.
const theme: DefaultTheme = {
    colors: {
        primary: '#39FF14', // primaryColor - Neon green
        secondary: '#1F1F21', // secondaryColor - Very dark gray
        accent: '#9CFF00', // accentColor - Bright lime green
        text: {
            primary: '#D7FDE4', // textPrimary - Light mint green
            secondary: '#7DA18A', // textSecondary - Muted mint green
            accent: '#39FF14', // textAccent - Neon green for emphasis
        },
        background: {
            primary: '#020B12', // background - Very dark blue-black
            secondary: '#0A1C24', // surface - Slightly lighter than background
            gradient: 'linear-gradient(135deg, #010708 0%, #020B12 50%, #051820 100%)', // backgroundGradient
        },
    },
    typography: {
        fontFamily: {
            primary: 'sfpro, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            monospace: 'SF Mono, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        },
        fontSize: {
            xs: '0.75rem',
            sm: '0.875rem',
            base: '1rem',
            lg: '1.125rem',
            xl: '1.25rem',
            '2xl': '1.5rem',
            '3xl': '1.875rem',
            '4xl': '2.25rem',
            '5xl': '3rem',
            '6xl': '4rem',
        },
        fontWeight: {
            normal: 400,
            medium: 500,
            semibold: 600,
            bold: 700,
        },
    },
    spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        '2xl': '2.5rem',
        '3xl': '3rem',
    },
    breakpoints: {
        xs: '320px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
    },
    animation: {
        spring: {
            default: {
                type: 'spring',
                stiffness: 300,
                damping: 30,
            },
            soft: {
                type: 'spring',
                stiffness: 200,
                damping: 25,
            },
            bouncy: {
                type: 'spring',
                stiffness: 400,
                damping: 15,
            },
        },
        duration: {
            fast: 0.2,
            normal: 0.3,
            slow: 0.5,
        },
    },
    borderRadius: {
        sm: '0.25rem',
        md: '0.5rem',
        lg: '1rem',
        xl: '1.5rem',
        full: '9999px',
    },
};

export default theme; 