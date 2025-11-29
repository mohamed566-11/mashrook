import { useState, useEffect } from 'react';

/**
 * Custom hook to dynamically measure the height of the header element
 * and provide it as a CSS variable for proper offset calculation
 */
export const useHeaderHeight = () => {
    const [headerHeight, setHeaderHeight] = useState(0);

    useEffect(() => {
        // Function to measure header height
        const measureHeaderHeight = () => {
            const header = document.querySelector('header');
            if (header) {
                const height = header.offsetHeight;
                setHeaderHeight(height);
                // Set CSS variable for use in styles
                document.documentElement.style.setProperty('--header-height', `${height}px`);
            }
        };

        // Measure immediately
        measureHeaderHeight();

        // Set up a ResizeObserver to watch for header size changes
        const resizeObserver = new ResizeObserver(measureHeaderHeight);
        const header = document.querySelector('header');
        if (header) {
            resizeObserver.observe(header);
        }

        // Also listen for window resize events
        window.addEventListener('resize', measureHeaderHeight);

        // Set up a MutationObserver to watch for DOM changes that might affect header height
        const mutationObserver = new MutationObserver(measureHeaderHeight);
        mutationObserver.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['class', 'style']
        });

        // Cleanup
        return () => {
            resizeObserver.disconnect();
            window.removeEventListener('resize', measureHeaderHeight);
            mutationObserver.disconnect();
        };
    }, []);

    return headerHeight;
};

export default useHeaderHeight;