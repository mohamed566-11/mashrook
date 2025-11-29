import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import {
    Shield, Lock, Eye, Database, User,
    ArrowRight, Clock, MapPin
} from 'lucide-react';
import LogoImage from '../components/common/LogoImage';

const PrivacyPolicy: React.FC = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const policySections = [
        {
            id: 1,
            title: "Information We Collect",
            icon: <Database className="w-6 h-6" />,
            content: "We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support. This may include your name, email address, company information, and payment details."
        },
        {
            id: 2,
            title: "How We Use Your Information",
            icon: <User className="w-6 h-6" />,
            content: "We use the information we collect to provide, maintain, and improve our services, to communicate with you, to process transactions, and to comply with legal obligations."
        },
        {
            id: 3,
            title: "Data Protection",
            icon: <Lock className="w-6 h-6" />,
            content: "We implement appropriate technical and organizational measures to protect your personal data against unauthorized or unlawful processing and against accidental loss, destruction, or damage."
        },
        {
            id: 4,
            title: "Data Retention",
            icon: <Clock className="w-6 h-6" />,
            content: "We retain your personal information for as long as necessary to provide our services and comply with our legal obligations. When data is no longer needed, we securely delete it."
        },
        {
            id: 5,
            title: "Your Rights",
            icon: <Eye className="w-6 h-6" />,
            content: "You have the right to access, correct, or delete your personal information. You may also object to or restrict certain processing activities and request data portability."
        },
        {
            id: 6,
            title: "International Transfers",
            icon: <MapPin className="w-6 h-6" />,
            content: "We may transfer your personal information to countries other than your own for processing purposes. We ensure appropriate safeguards are in place for such transfers."
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        

            {/* Hero Section */}
            <section className="py-20 bg-gradient-to-r from-primary-green to-green-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className={`text-4xl md:text-6xl font-bold mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
                        {t('support.privacyPolicy.title')}
                    </h1>
                    <p className={`text-xl md:text-2xl mb-10 max-w-3xl mx-auto transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
                        {t('support.privacyPolicy.description')}
                    </p>
                </div>
            </section>

            {/* Privacy Policy Content */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="prose prose-lg max-w-none">
                            <p className="text-gray-600 mb-8">
                                {t('support.privacyPolicy.content')}
                            </p>

                            <p className="text-gray-600 mb-8">
                                This Privacy Policy describes how Mashroo3k.com ("we", "our", or "us") collects,
                                uses, and shares your personal information when you use our website and services.
                            </p>

                            <div className="bg-gray-50 rounded-2xl p-8 mb-12">
                                <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center">
                                    <Shield className="mr-3 text-primary-green" size={28} />
                                    Last Updated: October 15, 2023
                                </h2>
                                <p className="text-gray-600">
                                    This policy was last updated on the date above. We may update this policy from
                                    time to time, and we will post any changes on this page.
                                </p>
                            </div>

                            {policySections.map((section) => (
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
                                        <Shield size={24} />
                                    </div>
                                    Contact Us
                                </h2>
                                <p className="text-gray-600 mb-6">
                                    If you have any questions about this Privacy Policy or our privacy practices,
                                    please contact us at:
                                </p>
                                <div className="bg-gray-50 rounded-2xl p-6">
                                    <p className="font-semibold text-gray-900">Privacy Team</p>
                                    <p className="text-gray-600">Mashroo3k.com</p>
                                    <p className="text-gray-600">Email: privacy@mashroo3k.com</p>
                                    <p className="text-gray-600">Phone: +1 (555) 123-4567</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Data Protection Commitment */}
            <section className="py-20 bg-gradient-to-r from-primary-green to-green-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Our Commitment to Data Protection
                    </h2>
                    <p className="text-xl text-green-100 mb-10 max-w-3xl mx-auto">
                        We are committed to protecting your privacy and being transparent about how we handle your data
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                            <Lock className="mx-auto mb-4" size={32} />
                            <h3 className="text-xl font-bold mb-2">End-to-End Encryption</h3>
                            <p className="text-green-100">
                                All data transmission is encrypted using industry-standard protocols
                            </p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                            <Database className="mx-auto mb-4" size={32} />
                            <h3 className="text-xl font-bold mb-2">Secure Storage</h3>
                            <p className="text-green-100">
                                Your data is stored in secure, access-controlled environments
                            </p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                            <Eye className="mx-auto mb-4" size={32} />
                            <h3 className="text-xl font-bold mb-2">Privacy by Design</h3>
                            <p className="text-green-100">
                                Privacy considerations are integrated into every aspect of our platform
                            </p>
                        </div>
                    </div>
                </div>
            </section>

           
        </div>
    );
};

export default PrivacyPolicy;