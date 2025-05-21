import { useEffect } from 'react';
import { useAnimation } from 'framer-motion';
import { useInView as useInViewObserver } from 'react-intersection-observer';

interface UseInViewProps {
    threshold?: number;
    triggerOnce?: boolean;
    rootMargin?: string;
}

const useInView = ({
    threshold = 0.1,
    triggerOnce = true,
    rootMargin = '-50px',
}: UseInViewProps = {}) => {
    const controls = useAnimation();
    const [ref, inView] = useInViewObserver({
        threshold,
        triggerOnce,
        rootMargin,
    });

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        } else {
            controls.start('hidden');
        }
    }, [controls, inView]);

    return { ref, controls, inView };
};

export default useInView; 