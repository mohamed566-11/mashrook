import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import {
    FileText, CheckCircle, AlertTriangle, User, CreditCard,
    ArrowRight, Clock, Globe
} from 'lucide-react';
import LogoImage from '../components/common/LogoImage';
import PageHeader from '../components/common/PageHeader';

const TermsOfService: React.FC = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    const termsSections = [
        {
            id: 1,
            title: "Acceptance of Terms",
            icon: <CheckCircle className="w-6 h-6" />,
            content: "By accessing or using Mashroo3k.com, you agree to be bound by these Terms of Service and all applicable laws and regulations."
        },
        {
            id: 2,
            title: "Use of Services",
            icon: <User className="w-6 h-6" />,
            content: "You agree to use our services only for lawful purposes and in accordance with these Terms. You are responsible for maintaining the confidentiality of your account credentials."
        },
        {
            id: 3,
            title: "Intellectual Property",
            icon: <FileText className="w-6 h-6" />,
            content: "All content, features, and functionality on our platform are owned by Mashroo3k.com and are protected by international copyright, trademark, and other intellectual property laws."
        },
        {
            id: 4,
            title: "Subscription and Payments",
            icon: <CreditCard className="w-6 h-6" />,
            content: "Our services are offered through subscription plans. You agree to pay all fees associated with your chosen plan and authorize us to charge your payment method."
        },
        {
            id: 5,
            title: "Termination",
            icon: <AlertTriangle className="w-6 h-6" />,
            content: "We may terminate or suspend your access to our services immediately, without prior notice, for any reason, including breach of these Terms."
        },
        {
            id: 6,
            title: "Limitation of Liability",
            icon: <AlertTriangle className="w-6 h-6" />,
            content: "Our liability to you for any damages arising from your use of our services is limited to the amount you have paid for the services in the past 12 months."
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
            <PageHeader title={t('support.termsOfService.title')} />

            {/* Hero Section */}
            <section className="py-20 bg-gradient-to-r from-primary-green to-green-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className={`text-4xl md:text-6xl font-bold mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
                        {t('support.termsOfService.title')}
                    </h1>
                    <p className={`text-xl md:text-2xl mb-10 max-w-3xl mx-auto transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
                        {t('support.termsOfService.description')}
                    </p>
                </div>
            </section>

            {/* Terms of Service Content */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="prose prose-lg max-w-none">
                            <p className="text-gray-600 mb-8">
                                {t('support.termsOfService.content')}
                            </p>

                            <p className="text-gray-600 mb-8">
                                These Terms of Service govern your access to and use of the Mashroo3k.com website
                                and services. Please read these terms carefully before using our platform.
                            </p>

                            <div className="bg-gray-50 rounded-2xl p-8 mb-12">
                                <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center">
                                    <FileText className="mr-3 text-primary-green" size={28} />
                                    Last Updated: October 15, 2023
                                </h2>
                                <p className="text-gray-600">
                                    These terms were last updated on the date above. We may update these terms from
                                    time to time, and we will notify you of any material changes.
                                </p>
                            </div>

                            {termsSections.map((section) => (
                                <div key={section.id} className="mb-12">
                                    <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center">
                                        <div className="mr-3 text-primary-green">
                                            {section.icon}
                                        </div>
                                        {section.title}
                                    </h2>
                                    <p className="text-gray-600">
                                        {section.content}
                                    </p>
                                </div>
                            ))}

                            <div className="mb-12">
                                <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center">
                                    <div className="mr-3 text-primary-green">
                                        <Globe size={24} />
                                    </div>
                                    Governing Law
                                </h2>
                                <p className="text-gray-600 mb-6">
                                    These Terms shall be governed by and construed in accordance with the laws of
                                    the State of California, without regard to its conflict of law provisions.
                                </p>
                                <div className="bg-gray-50 rounded-2xl p-6">
                                    <p className="font-semibold text-gray-900">Dispute Resolution</p>
                                    <p className="text-gray-600">
                                        Any dispute arising from these Terms shall be resolved through binding arbitration
                                        in San Francisco, California, in accordance with the rules of the American
                                        Arbitration Association.
                                    </p>
                                </div>
                            </div>

                            <div className="mb-12">
                                <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center">
                                    <div className="mr-3 text-primary-green">
                                        <Clock size={24} />
                                    </div>
                                    Contact Information
                                </h2>
                                <p className="text-gray-600 mb-6">
                                    If you have any questions about these Terms of Service, please contact us at:
                                </p>
                                <div className="bg-gray-50 rounded-2xl p-6">
                                    <p className="font-semibold text-gray-900">Legal Department</p>
                                    <p className="text-gray-600">Mashroo3k.com</p>
                                    <p className="text-gray-600">Email: legal@mashroo3k.com</p>
                                    <p className="text-gray-600">Phone: +1 (555) 123-4567</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* User Rights */}
            <section className="py-20 bg-gradient-to-r from-gray-900 to-black text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Your Rights and Responsibilities
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Understanding what you can expect from us and what we expect from you
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                            <h3 className="text-2xl font-bold mb-4">What We Provide</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <CheckCircle className="text-green-400 mr-3 mt-1 flex-shrink-0" size={20} />
                                    <span>Reliable and secure business analysis services</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="text-green-400 mr-3 mt-1 flex-shrink-0" size={20} />
                                    <span>Transparent pricing with no hidden fees</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="text-green-400 mr-3 mt-1 flex-shrink-0" size={20} />
                                    <span>Regular updates and feature improvements</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="text-green-400 mr-3 mt-1 flex-shrink-0" size={20} />
                                    <span>Responsive customer support</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                            <h3 className="text-2xl font-bold mb-4">Your Responsibilities</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <AlertTriangle className="text-yellow-400 mr-3 mt-1 flex-shrink-0" size={20} />
                                    <span>Provide accurate information for analyses</span>
                                </li>
                                <li className="flex items-start">
                                    <AlertTriangle className="text-yellow-400 mr-3 mt-1 flex-shrink-0" size={20} />
                                    <span>Maintain account security and confidentiality</span>
                                </li>
                                <li className="flex items-start">
                                    <AlertTriangle className="text-yellow-400 mr-3 mt-1 flex-shrink-0" size={20} />
                                    <span>Comply with all applicable laws and regulations</span>
                                </li>
                                <li className="flex items-start">
                                    <AlertTriangle className="text-yellow-400 mr-3 mt-1 flex-shrink-0" size={20} />
                                    <span>Pay subscription fees on time</span>
                                </li>
                            </ul>
                        </div>
                    </div>
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

export default TermsOfService;