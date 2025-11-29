import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Link, Globe, Zap, Shield, Database, Cloud, Code, ArrowRight } from 'lucide-react';
import LogoImage from '../components/common/LogoImage';
import PageHeader from '../components/common/PageHeader';

const Integrations: React.FC = () => {
    const { t, language } = useLanguage();
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    const integrationCategories = [
        {
            title: t('integrations.accounting'),
            description: t('integrations.accountingDesc'),
            icon: <Database className="w-8 h-8" />,
            apps: ['QuickBooks', 'Xero', 'FreshBooks', 'Wave']
        },
        {
            title: t('integrations.crm'),
            description: t('integrations.crmDesc'),
            icon: <Globe className="w-8 h-8" />,
            apps: ['Salesforce', 'HubSpot', 'Zoho CRM', 'Pipedrive']
        },
        {
            title: t('integrations.analytics'),
            description: t('integrations.analyticsDesc'),
            icon: <Zap className="w-8 h-8" />,
            apps: ['Google Analytics', 'Mixpanel', 'Hotjar', 'Amplitude']
        },
        {
            title: t('integrations.security'),
            description: t('integrations.securityDesc'),
            icon: <Shield className="w-8 h-8" />,
            apps: ['Okta', 'Auth0', 'OneLogin', 'Azure AD']
        },
        {
            title: t('integrations.development'),
            description: t('integrations.developmentDesc'),
            icon: <Code className="w-8 h-8" />,
            apps: ['GitHub', 'GitLab', 'Bitbucket', 'Jira']
        },
        {
            title: t('integrations.cloud'),
            description: t('integrations.cloudDesc'),
            icon: <Cloud className="w-8 h-8" />,
            apps: ['AWS', 'Google Cloud', 'Microsoft Azure', 'DigitalOcean']
        }
    ];

    const benefits = [
        {
            title: t('integrations.benefit1Title'),
            description: t('integrations.benefit1Desc'),
            icon: <Zap className="w-6 h-6" />
        },
        {
            title: t('integrations.benefit2Title'),
            description: t('integrations.benefit2Desc'),
            icon: <Shield className="w-6 h-6" />
        },
        {
            title: t('integrations.benefit3Title'),
            description: t('integrations.benefit3Desc'),
            icon: <Database className="w-6 h-6" />
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
            <PageHeader title={t('integrations.title')} />

            {/* Hero Section */}
            <section className="py-20 bg-gradient-to-r from-primary-green to-green-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className={`text-4xl md:text-6xl font-bold mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
                        {t('integrations.title')}
                    </h1>
                    <p className={`text-xl md:text-2xl mb-10 max-w-3xl mx-auto transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
                        {t('integrations.description')}
                    </p>
                </div>
            </section>

            {/* Integration Categories */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                            {t('integrations.categories')}
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            {t('integrations.categoriesDesc')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {integrationCategories.map((category, index) => (
                            <div
                                key={index}
                                className="bg-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 group"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-primary-green/10 flex items-center justify-center mb-6 group-hover:bg-primary-green/20 transition-colors duration-300">
                                    <div className="text-primary-green group-hover:scale-110 transition-transform duration-300">
                                        {category.icon}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-gray-900">{category.title}</h3>
                                <p className="text-gray-600 mb-4">{category.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {category.apps.map((app, appIndex) => (
                                        <span
                                            key={appIndex}
                                            className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-600"
                                        >
                                            {app}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                            {t('integrations.benefits')}
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            {t('integrations.benefitsDesc')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {benefits.map((benefit, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-primary-green/10 flex items-center justify-center mb-6">
                                    <div className="text-primary-green">
                                        {benefit.icon}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-gray-900">{benefit.title}</h3>
                                <p className="text-gray-600">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                            {t('integrations.howItWorks')}
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            {t('integrations.howItWorksDesc')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-gray-50 rounded-2xl p-8 shadow-lg text-center">
                            <div className="w-16 h-16 rounded-full bg-primary-green/10 flex items-center justify-center mb-6 mx-auto">
                                <span className="text-primary-green font-bold text-2xl">1</span>
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-900">{t('integrations.step1Title')}</h3>
                            <p className="text-gray-600">{t('integrations.step1Desc')}</p>
                        </div>

                        <div className="bg-gray-50 rounded-2xl p-8 shadow-lg text-center">
                            <div className="w-16 h-16 rounded-full bg-primary-green/10 flex items-center justify-center mb-6 mx-auto">
                                <span className="text-primary-green font-bold text-2xl">2</span>
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-900">{t('integrations.step2Title')}</h3>
                            <p className="text-gray-600">{t('integrations.step2Desc')}</p>
                        </div>

                        <div className="bg-gray-50 rounded-2xl p-8 shadow-lg text-center">
                            <div className="w-16 h-16 rounded-full bg-primary-green/10 flex items-center justify-center mb-6 mx-auto">
                                <span className="text-primary-green font-bold text-2xl">3</span>
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-900">{t('integrations.step3Title')}</h3>
                            <p className="text-gray-600">{t('integrations.step3Desc')}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-gray-900 to-black text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        {t('integrations.readyToConnect')}
                    </h2>
                    <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
                        {t('integrations.readyToConnectDesc')}
                    </p>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="px-8 py-4 bg-primary-green text-white font-bold rounded-full text-lg hover:bg-primary-green-hover transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center justify-center mx-auto"
                    >
                        {t('integrations.getStarted')} <ArrowRight className="ml-2" />
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white pt-16 pb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
                        {/* Logo and Description */}
                        <div className="lg:col-span-2">
                            <div className="flex flex-col items-start gap-6">
                                <LogoImage height={80} width={280} mobileHeight={60} mobileWidth={210} />
                                <p className="text-gray-400 max-w-md leading-relaxed">
                                    {t('footer.description')}
                                </p>
                                <div className="flex space-x-4">
                                    <a href="#" className="text-gray-400 hover:text-primary-green transition-colors duration-300">
                                        <span className="sr-only">Twitter</span>
                                        <div className="h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary-green">T</div>
                                    </a>
                                    <a href="#" className="text-gray-400 hover:text-primary-green transition-colors duration-300">
                                        <span className="sr-only">LinkedIn</span>
                                        <div className="h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary-green">L</div>
                                    </a>
                                    <a href="#" className="text-gray-400 hover:text-primary-green transition-colors duration-300">
                                        <span className="sr-only">Facebook</span>
                                        <div className="h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary-green">F</div>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Products */}
                        <div>
                            <ul className="space-y-3">
                                <li>
                                    <button
                                        onClick={() => handleNavigation('/dashboard')}
                                        className="text-gray-400 hover:text-primary-green transition-colors duration-300 flex items-center transform transition duration-300 hover:translate-x-1 w-full text-left"
                                    >
                                        <span className="mr-2 w-2 h-2 rounded-full bg-primary-green animate-pulse"></span>
                                        {t('footer.products.businessAnalysis')}
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => handleNavigation('/templates')}
                                        className="text-gray-400 hover:text-primary-green transition-colors duration-300 flex items-center transform transition duration-300 hover:translate-x-1 w-full text-left"
                                    >
                                        <span className="mr-2 w-2 h-2 rounded-full bg-primary-green animate-pulse"></span>
                                        {t('footer.products.templates')}
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => handleNavigation('/reports')}
                                        className="text-gray-400 hover:text-primary-green transition-colors duration-300 flex items-center transform transition duration-300 hover:translate-x-1 w-full text-left"
                                    >
                                        <span className="mr-2 w-2 h-2 rounded-full bg-primary-green animate-pulse"></span>
                                        {t('footer.products.reports')}
                                    </button>
                                </li>
                                {/* Removed integrations link as per requirements */}
                            </ul>
                        </div>

                        {/* Company */}
                        <div>
                            <ul className="space-y-3">
                                <li>
                                    <button
                                        onClick={() => handleNavigation('/about')}
                                        className="text-gray-400 hover:text-primary-green transition-colors duration-300 flex items-center transform transition duration-300 hover:translate-x-1 w-full text-left"
                                    >
                                        <span className="mr-2 w-2 h-2 rounded-full bg-primary-green animate-pulse"></span>
                                        {t('footer.company.about')}
                                    </button>
                                </li>
                                {/* Removed blog link as per requirements */}
                                <li>
                                    <button
                                        onClick={() => handleNavigation('/careers')}
                                        className="text-gray-400 hover:text-primary-green transition-colors duration-300 flex items-center transform transition duration-300 hover:translate-x-1 w-full text-left"
                                    >
                                        <span className="mr-2 w-2 h-2 rounded-full bg-primary-green animate-pulse"></span>
                                        {t('footer.company.careers')}
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => handleNavigation('/contact')}
                                        className="text-gray-400 hover:text-primary-green transition-colors duration-300 flex items-center transform transition duration-300 hover:translate-x-1 w-full text-left"
                                    >
                                        <span className="mr-2 w-2 h-2 rounded-full bg-primary-green animate-pulse"></span>
                                        {t('footer.company.contact')}
                                    </button>
                                </li>
                            </ul>
                        </div>

                        {/* Support */}
                        <div>
                            <ul className="space-y-3">
                                <li>
                                    <button
                                        onClick={() => handleNavigation('/help-center')}
                                        className="text-gray-400 hover:text-primary-green transition-colors duration-300 flex items-center transform transition duration-300 hover:translate-x-1 w-full text-left"
                                    >
                                        <span className="mr-2 w-2 h-2 rounded-full bg-primary-green animate-pulse"></span>
                                        {t('footer.support.helpCenter')}
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => handleNavigation('/documentation')}
                                        className="text-gray-400 hover:text-primary-green transition-colors duration-300 flex items-center transform transition duration-300 hover:translate-x-1 w-full text-left"
                                    >
                                        <span className="mr-2 w-2 h-2 rounded-full bg-primary-green animate-pulse"></span>
                                        {t('footer.support.documentation')}
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => handleNavigation('/privacy-policy')}
                                        className="text-gray-400 hover:text-primary-green transition-colors duration-300 flex items-center transform transition duration-300 hover:translate-x-1 w-full text-left"
                                    >
                                        <span className="mr-2 w-2 h-2 rounded-full bg-primary-green animate-pulse"></span>
                                        {t('footer.support.privacyPolicy')}
                                    </button>
                                </li>
                                {/* Removed terms of service link as per requirements */}
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-400 text-sm">
                            &copy; {new Date().getFullYear()} {t('common.appName')}. {t('footer.allRightsReserved')}
                        </p>
                        <div className="mt-4 md:mt-0 flex space-x-6">
                            <button
                                onClick={() => handleNavigation('/privacy-policy')}
                                className="text-gray-400 hover:text-primary-green transition-colors duration-300 text-sm"
                            >
                                {t('footer.privacyPolicy')}
                            </button>
                            <button
                                onClick={() => handleNavigation('/terms-of-service')}
                                className="text-gray-400 hover:text-primary-green transition-colors duration-300 text-sm"
                            >
                                {t('footer.terms')}
                            </button>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Integrations;