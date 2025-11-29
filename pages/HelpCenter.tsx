import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Search, BookOpen, MessageCircle, Video, FileText, HelpCircle, ArrowRight, Mail, Phone } from 'lucide-react';
import LogoImage from '../components/common/LogoImage';

const HelpCenter: React.FC = () => {
    const { t, language } = useLanguage();
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const helpCategories = [
        {
            title: t('helpCenter.gettingStarted'),
            description: t('helpCenter.gettingStartedDesc'),
            icon: <BookOpen className="w-8 h-8" />,
            articles: 12
        },
        {
            title: t('helpCenter.accountManagement'),
            description: t('helpCenter.accountManagementDesc'),
            icon: <FileText className="w-8 h-8" />,
            articles: 8
        },
        {
            title: t('helpCenter.businessAnalysis'),
            description: t('helpCenter.businessAnalysisDesc'),
            icon: <HelpCircle className="w-8 h-8" />,
            articles: 15
        },
        {
            title: t('helpCenter.reports'),
            description: t('helpCenter.reportsDesc'),
            icon: <FileText className="w-8 h-8" />,
            articles: 10
        },
        {
            title: t('helpCenter.integrations'),
            description: t('helpCenter.integrationsDesc'),
            icon: <MessageCircle className="w-8 h-8" />,
            articles: 7
        },
        {
            title: t('helpCenter.troubleshooting'),
            description: t('helpCenter.troubleshootingDesc'),
            icon: <Video className="w-8 h-8" />,
            articles: 9
        }
    ];

    const popularArticles = [
        {
            title: t('helpCenter.article1Title'),
            excerpt: t('helpCenter.article1Excerpt'),
            category: t('helpCenter.gettingStarted')
        },
        {
            title: t('helpCenter.article2Title'),
            excerpt: t('helpCenter.article2Excerpt'),
            category: t('helpCenter.businessAnalysis')
        },
        {
            title: t('helpCenter.article3Title'),
            excerpt: t('helpCenter.article3Excerpt'),
            category: t('helpCenter.reports')
        }
    ];

    const contactMethods = [
        {
            title: t('helpCenter.liveChat'),
            description: t('helpCenter.liveChatDesc'),
            icon: <MessageCircle className="w-6 h-6" />,
            action: t('helpCenter.startChat')
        },
        {
            title: t('helpCenter.emailSupport'),
            description: t('helpCenter.emailSupportDesc'),
            icon: <Mail className="w-6 h-6" />,
            action: 'support@mashroo3k.com'
        },
        {
            title: t('helpCenter.phoneSupport'),
            description: t('helpCenter.phoneSupportDesc'),
            icon: <Phone className="w-6 h-6" />,
            action: '+1 (555) 123-4567'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">

            {/* Hero Section */}
            <section className="py-20 bg-gradient-to-r from-primary-green to-green-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className={`text-4xl md:text-6xl font-bold mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
                        {t('helpCenter.title')}
                    </h1>
                    <p className={`text-xl md:text-2xl mb-10 max-w-3xl mx-auto transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
                        {t('helpCenter.description')}
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={t('helpCenter.searchPlaceholder')}
                                className="block w-full pl-10 pr-3 py-4 border border-transparent rounded-full leading-5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent shadow-lg"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Help Categories */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                            {t('helpCenter.categories')}
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            {t('helpCenter.categoriesDesc')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {helpCategories.map((category, index) => (
                            <div
                                key={index}
                                className="bg-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 group cursor-pointer"
                                onClick={() => navigate('/documentation')}
                            >
                                <div className="w-16 h-16 rounded-2xl bg-primary-green/10 flex items-center justify-center mb-6 group-hover:bg-primary-green/20 transition-colors duration-300">
                                    <div className="text-primary-green group-hover:scale-110 transition-transform duration-300">
                                        {category.icon}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-gray-900">{category.title}</h3>
                                <p className="text-gray-600 mb-4">{category.description}</p>
                                <div className="text-primary-green font-bold flex items-center">
                                    {category.articles} {t('helpCenter.articles')}
                                    <ArrowRight className="ml-2 w-4 h-4" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Popular Articles */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                            {t('helpCenter.popularArticles')}
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            {t('helpCenter.popularArticlesDesc')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {popularArticles.map((article, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
                            >
                                <span className="inline-block px-3 py-1 text-xs font-semibold text-primary-green bg-primary-green/10 rounded-full mb-4">
                                    {article.category}
                                </span>
                                <h3 className="text-xl font-bold mb-3 text-gray-900">{article.title}</h3>
                                <p className="text-gray-600 mb-4">{article.excerpt}</p>
                                <button
                                    onClick={() => navigate('/documentation')}
                                    className="text-primary-green font-bold flex items-center"
                                >
                                    {t('helpCenter.readMore')}
                                    <ArrowRight className="ml-2 w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Support */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                            {t('helpCenter.contactSupport')}
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            {t('helpCenter.contactSupportDesc')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {contactMethods.map((method, index) => (
                            <div
                                key={index}
                                className="bg-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 text-center"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-primary-green/10 flex items-center justify-center mb-6 mx-auto">
                                    <div className="text-primary-green">
                                        {method.icon}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-gray-900">{method.title}</h3>
                                <p className="text-gray-600 mb-4">{method.description}</p>
                                <button
                                    className="px-6 py-3 bg-primary-green text-white font-bold rounded-full hover:bg-primary-green-hover transition-all duration-300"
                                >
                                    {method.action}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


          
        </div>
    );
};

export default HelpCenter;