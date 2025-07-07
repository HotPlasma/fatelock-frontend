import { useState, useEffect } from 'react';

export type ScrollDirection = 'up' | 'down' | 'idle';

export const useScrollDirection = (threshold: number = 10): ScrollDirection => {
    const [scrollDirection, setScrollDirection] = useState<ScrollDirection>('idle');
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const updateScrollDirection = () => {
            const scrollY = window.scrollY;
            const difference = Math.abs(scrollY - lastScrollY);

            // Only update direction if scroll difference is greater than threshold
            if (difference > threshold) {
                if (scrollY > lastScrollY) {
                    setScrollDirection('down');
                } else {
                    setScrollDirection('up');
                }
                setLastScrollY(scrollY);
            }
        };

        // Add event listener
        window.addEventListener('scroll', updateScrollDirection);

        // Initialize scroll position
        setLastScrollY(window.scrollY);

        // Cleanup
        return () => {
            window.removeEventListener('scroll', updateScrollDirection);
        };
    }, [lastScrollY, threshold]);

    return scrollDirection;
}; 