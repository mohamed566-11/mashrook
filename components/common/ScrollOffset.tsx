import React, { useEffect } from 'react';

interface ScrollOffsetProps {
    offset?: number;
}

/**
 * Component to handle scroll offset for anchor links and programmatic scrolling
 * Ensures that when scrolling to an element, it appears below the fixed header
 */
const ScrollOffset: React.FC<ScrollOffsetProps> = ({ offset = 0 }) => {
    useEffect(() => {
        // Function to handle scroll offset
        const handleScrollToAnchor = () => {
            const { hash } = window.location;
            if (hash) {
                // Remove the '#' prefix
                const id = hash.replace('#', '');
                const element = document.getElementById(id);
                if (element) {
                    // Get the header height from CSS variable or use default
                    const headerHeight = parseFloat(
                        getComputedStyle(document.documentElement)
                            .getPropertyValue('--header-height') || '100'
                    );

                    // Calculate the position to scroll to (element position minus header height minus offset)
                    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - headerHeight - offset;

                    // Scroll to the calculated position
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        };

        // Handle initial load with hash
        if (window.location.hash) {
            // Small delay to ensure DOM is ready
            setTimeout(handleScrollToAnchor, 100);
        }

        // Listen for hash changes (for SPA navigation)
        const handleHashChange = () => {
            // Small delay to ensure DOM is updated
            setTimeout(handleScrollToAnchor, 100);
        };

        window.addEventListener('hashchange', handleHashChange);

        // Cleanup
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, [offset]);

    return null;
};

export default ScrollOffset;