import { Variants } from 'framer-motion';

// Fade up animation with spring physics
export const fadeUpVariant: Variants = {
    hidden: {
        opacity: 0,
        y: 20,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 300,
            damping: 30,
        },
    },
};

// Scale up animation with spring physics
export const scaleUpVariant: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.95,
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            type: 'spring',
            stiffness: 300,
            damping: 30,
        },
    },
};

// Stagger children animation
export const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3,
        },
    },
};

// Slide in from right
export const slideInRight: Variants = {
    hidden: {
        x: 100,
        opacity: 0,
    },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            type: 'spring',
            stiffness: 300,
            damping: 30,
        },
    },
};

// Slide in from left
export const slideInLeft: Variants = {
    hidden: {
        x: -100,
        opacity: 0,
    },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            type: 'spring',
            stiffness: 300,
            damping: 30,
        },
    },
};

// Bounce scale animation
export const bounceScale: Variants = {
    tap: {
        scale: 0.95,
        transition: {
            type: 'spring',
            stiffness: 400,
            damping: 15,
        },
    },
    hover: {
        scale: 1.05,
        transition: {
            type: 'spring',
            stiffness: 400,
            damping: 15,
        },
    },
};

// Gradient text animation
export const gradientText: Variants = {
    hidden: {
        backgroundPosition: '200% center',
        opacity: 0,
    },
    visible: {
        backgroundPosition: '0% center',
        opacity: 1,
        transition: {
            duration: 1,
            ease: 'easeOut',
        },
    },
}; 