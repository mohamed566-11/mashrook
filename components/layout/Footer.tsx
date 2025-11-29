import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import LogoImage from '../common/LogoImage';

const Footer: React.FC = () => {
    const { t, language } = useLanguage();
    const navigate = useNavigate();

    const footerLinks = [
        {
            title: t('footer.products.title'),
            links: [
                { name: t('footer.products.businessAnalysis'), href: '/dashboard' },
                { name: t('footer.products.templates'), href: '/templates' },
                { name: t('footer.products.reports'), href: '/reports' },
                // Removed integrations link as per requirements
            ]
        },
        {
            title: t('footer.company.title'),
            links: [
                { name: t('footer.company.about'), href: '/about' },
                // Removed blog link as per requirements
                { name: t('footer.company.careers'), href: '/careers' },
                { name: t('footer.company.contact'), href: '/contact' },
            ]
        },
        {
            title: t('footer.support.title'),
            links: [
                { name: t('footer.support.helpCenter'), href: '/help-center' },
                { name: t('footer.support.documentation'), href: '/documentation' },
                { name: t('footer.support.privacyPolicy'), href: '/privacy-policy' },
                // Removed terms of service link as per requirements
            ]
        }
    ];

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    return (
        <footer className="bg-gradient-to-r from-primary-green to-green-600 border-t border-border-color animate-fadeInUp pt-4">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    {/* Logo and Description */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center mb-4">
                            <LogoImage height={50} width={180} />
                        </div>
                        <p className="text-white mb-6 max-w-md">
                            {t('footer.description')}
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-white hover:text-gray-200 smooth-transition hover-scale">
                                <span className="sr-only">Twitter</span>
                                <div className="h-6 w-6 rounded-full bg-white bg-opacity-20 flex items-center justify-center">T</div>
                            </a>
                            <a href="#" className="text-white hover:text-gray-200 smooth-transition hover-scale">
                                <span className="sr-only">LinkedIn</span>
                                <div className="h-6 w-6 rounded-full bg-white bg-opacity-20 flex items-center justify-center">L</div>
                            </a>
                            <a href="#" className="text-white hover:text-gray-200 smooth-transition hover-scale">
                                <span className="sr-only">Facebook</span>
                                <div className="h-6 w-6 rounded-full bg-white bg-opacity-20 flex items-center justify-center">F</div>
                            </a>
                        </div>
                    </div>

                    {/* Links Sections */}
                    {footerLinks.map((section, index) => (
                        <div key={index} className={`animate-fadeInUp animate-delay-${(index + 1) * 100}`}>
                            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
                                {section.title}
                            </h3>
                            <ul className="space-y-3">
                                {section.links.map((link, linkIndex) => (
                                    <li key={linkIndex}>
                                        <button
                                            onClick={() => handleNavigation(link.href)}
                                            className="text-white hover:text-gray-200 smooth-transition hover-lift flex items-center transform transition duration-300 hover:translate-x-1 text-sm w-full text-left"
                                        >
                                            <span className="mr-2 w-2 h-2 rounded-full bg-white animate-pulse"></span>
                                            {link.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-12 pt-8 border-t border-border-color flex flex-col md:flex-row justify-between items-center">
                    <p className="text-white text-sm">
                        &copy; {new Date().getFullYear()} {t('common.appName')}. {t('footer.allRightsReserved')}
                    </p>
                    <div className="mt-4 md:mt-0 flex space-x-6">
                        <button
                            onClick={() => handleNavigation('/privacy-policy')}
                            className="text-white hover:text-gray-200 smooth-transition hover-lift text-sm"
                        >
                            {t('footer.privacyPolicy')}
                        </button>
                        <button
                            onClick={() => handleNavigation('/terms-of-service')}
                            className="text-white hover:text-gray-200 smooth-transition hover-lift text-sm"
                        >
                            {t('footer.terms')}
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;