import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            primary: string;
            secondary: string;
            accent: string;
            text: {
                primary: string;
                secondary: string;
                accent: string;
            };
            background: {
                primary: string;
                secondary: string;
                gradient: string;
            };
        };
        typography: {
            fontFamily: {
                primary: string;
                monospace: string;
            };
            fontSize: {
                xs: string;
                sm: string;
                base: string;
                lg: string;
                xl: string;
                '2xl': string;
                '3xl': string;
                '4xl': string;
                '5xl': string;
                '6xl': string;
            };
            fontWeight: {
                normal: number;
                medium: number;
                semibold: number;
                bold: number;
            };
        };
        spacing: {
            xs: string;
            sm: string;
            md: string;
            lg: string;
            xl: string;
            '2xl': string;
            '3xl': string;
        };
        breakpoints: {
            xs: string;
            sm: string;
            md: string;
            lg: string;
            xl: string;
            '2xl': string;
        };
        animation: {
            spring: {
                default: {
                    type: string;
                    stiffness: number;
                    damping: number;
                };
                soft: {
                    type: string;
                    stiffness: number;
                    damping: number;
                };
                bouncy: {
                    type: string;
                    stiffness: number;
                    damping: number;
                };
            };
            duration: {
                fast: number;
                normal: number;
                slow: number;
            };
        };
        borderRadius: {
            sm: string;
            md: string;
            lg: string;
            xl: string;
            full: string;
        };
    }
} 