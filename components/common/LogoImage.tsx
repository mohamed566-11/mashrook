import React from 'react';

interface LogoImageProps {
    className?: string;
    // Desktop size
    height?: number;
    width?: number;
    // Mobile size
    mobileHeight?: number;
    mobileWidth?: number;
    onClick?: () => void;
    borderRadius?: number;
    withShadow?: boolean;
}

const LogoImage: React.FC<LogoImageProps> = ({
    className = '',
    height = 96,
    width = 340,
    mobileHeight = 76,
    mobileWidth = 260,
    onClick,
    borderRadius = 0,
    withShadow = true
}) => {
    const [isMobile, setIsMobile] = React.useState(
        () => (typeof window !== 'undefined' ? window.innerWidth <= 768 : false)
    );

    React.useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const logoSrc = '/file.png';
    const altText = 'مسروق - شعار الموقع';

    const currentHeight = isMobile ? mobileHeight : height;
    const currentWidth = isMobile ? mobileWidth : width;

    return (
        <img
            src={logoSrc}
            alt={altText}
            className={`logo-image ${className}`}
            style={{
                width: `${currentWidth}px`,
                height: `${currentHeight}px`,
                maxWidth: '100%',
                objectFit: 'contain',
                cursor: onClick ? 'pointer' : 'default',
                display: 'block',
                transition: 'all 0.3s ease',
                borderRadius: `${borderRadius}px`,
                filter: withShadow ? 'drop-shadow(0 6px 12px rgba(0, 0, 0, 0.08))' : 'none',
                backgroundColor: 'transparent',
                background: 'transparent',
                boxShadow: 'none',
                border: 'none',
                padding: '0'
            }}
            onClick={onClick}
        />
    );
};

export default LogoImage;