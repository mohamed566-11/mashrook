import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import {
    BookOpen, Code, Database, GitBranch, Shield,
    ArrowRight, ChevronRight, Download
} from 'lucide-react';
import LogoImage from '../components/common/LogoImage';

const Documentation: React.FC = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const docCategories = [
        {
            id: 1,
            icon: <BookOpen className="w-8 h-8" />,
            title: "User Guides",
            description: "Step-by-step instructions for using our platform",
            articles: 24
        },
        {
            id: 2,
            icon: <Code className="w-8 h-8" />,
            title: "API Documentation",
            description: "Complete reference for our RESTful API",
            articles: 18
        },
        {
            id: 3,
            icon: <Database className="w-8 h-8" />,
            title: "Integration Guides",
            description: "Connect with third-party tools and services",
            articles: 15
        },
        {
            id: 4,
            icon: <GitBranch className="w-8 h-8" />,
            title: "Best Practices",
            description: "Tips and recommendations for optimal results",
            articles: 12
        },
        {
            id: 5,
            icon: <Shield className="w-8 h-8" />,
            title: "Release Notes",
            description: "Latest updates and feature releases",
            articles: 8
        }
    ];

    const popularDocs = [
        {
            id: 1,
            title: "Getting Started with Business Analysis",
            category: "User Guides",
            readingTime: "8 min read"
        },
        {
            id: 2,
            title: "API Authentication and Rate Limits",
            category: "API Documentation",
            readingTime: "12 min read"
        },
        {
            id: 3,
            title: "Connecting to CRM Systems",
            category: "Integration Guides",
            readingTime: "10 min read"
        },
        {
            id: 4,
            title: "Maximizing Analysis Accuracy",
            category: "Best Practices",
            readingTime: "6 min read"
        }
    ];

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">

            {/* Hero Section */}
            <section className="py-20 bg-gradient-to-r from-primary-green to-green-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className={`text-4xl md:text-6xl font-bold mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
                        {t('support.documentation.title')}
                    </h1>
                    <p className={`text-xl md:text-2xl mb-10 max-w-3xl mx-auto transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
                        {t('support.documentation.description')}
                    </p>
                    <button
                        onClick={() => navigate('/signup')}
                        className={`px-8 py-4 bg-white text-primary-green font-bold rounded-full text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    >
                        Download PDF Documentation
                    </button>
                </div>
            </section>

            {/* Documentation Categories */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                            Documentation Categories
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Comprehensive guides and references for all aspects of our platform
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {docCategories.map((category) => (
                            <div
                                key={category.id}
                                className="bg-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 group cursor-pointer"
                                onClick={() => navigate('/help-center')}
                            >
                                <div className="w-16 h-16 rounded-2xl bg-primary-green/10 flex items-center justify-center mb-6 group-hover:bg-primary-green/20 transition-colors duration-300">
                                    <div className="text-primary-green group-hover:scale-110 transition-transform duration-300">
                                        {category.icon}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-gray-900">{category.title}</h3>
                                <p className="text-gray-600 mb-4">{category.description}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500">{category.articles} articles</span>
                                    <ChevronRight className="text-primary-green group-hover:translate-x-1 transition-transform" size={20} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Popular Documentation */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                            Popular Documentation
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Most frequently accessed documentation by our users
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                        {popularDocs.map((doc, index) => (
                            <div
                                key={doc.id}
                                className={`flex items-center justify-between p-6 hover:bg-gray-50 transition-colors cursor-pointer ${index !== popularDocs.length - 1 ? 'border-b border-gray-100' : ''}`}
                                onClick={() => navigate('/help-center')}
                            >
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{doc.title}</h3>
                                    <div className="flex items-center">
                                        <span className="text-sm text-primary-green bg-primary-green/10 px-2 py-1 rounded-full mr-3">
                                            {doc.category}
                                        </span>
                                        <span className="text-sm text-gray-500">{doc.readingTime}</span>
                                    </div>
                                </div>
                                <ChevronRight className="text-gray-400" size={20} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* API Documentation Preview */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-12 items-center">
                        <div className="lg:w-1/2">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                                API Documentation
                            </h2>
                            <p className="text-gray-600 mb-8">
                                Our comprehensive RESTful API allows you to integrate Mashroo3k's powerful
                                business analysis capabilities directly into your applications and workflows.
                            </p>
                            <div className="space-y-6 mb-8">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 mt-1">
                                        <div className="w-6 h-6 rounded-full bg-primary-green/10 flex items-center justify-center">
                                            <div className="w-2 h-2 rounded-full bg-primary-green"></div>
                                        </div>
                                    </div>
                                    <p className="ml-4 text-gray-700">
                                        <span className="font-semibold">Authentication:</span> Secure OAuth 2.0 implementation
                                    </p>
                                </div>
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 mt-1">
                                        <div className="w-6 h-6 rounded-full bg-primary-green/10 flex items-center justify-center">
                                            <div className="w-2 h-2 rounded-full bg-primary-green"></div>
                                        </div>
                                    </div>
                                    <p className="ml-4 text-gray-700">
                                        <span className="font-semibold">Rate Limits:</span> Flexible quotas for different plan tiers
                                    </p>
                                </div>
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 mt-1">
                                        <div className="w-6 h-6 rounded-full bg-primary-green/10 flex items-center justify-center">
                                            <div className="w-2 h-2 rounded-full bg-primary-green"></div>
                                        </div>
                                    </div>
                                    <p className="ml-4 text-gray-700">
                                        <span className="font-semibold">Webhooks:</span> Real-time notifications for analysis completion
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => navigate('/help-center')}
                                className="px-6 py-3 bg-primary-green text-white font-semibold rounded-md hover:bg-primary-green-hover transition flex items-center gap-2"
                            >
                                View Full API Documentation <ArrowRight size={16} />
                            </button>
                        </div>
                        <div className="lg:w-1/2">
                            <div className="bg-gray-900 rounded-2xl p-8 text-white">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-xl font-bold">API Endpoint Example</h3>
                                    <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">POST</span>
                                </div>
                                <div className="bg-gray-800 rounded-lg p-4 mb-6 font-mono text-sm">
                                    <div className="text-gray-400">// Create a new business analysis</div>
                                    <div className="text-green-400">POST</div>
                                    <div className="text-blue-400">https://api.mashroo3k.com/v1/analyses</div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <div className="text-gray-400 text-sm">Request Body</div>
                                        <div className="bg-gray-800 rounded-lg p-4 font-mono text-sm">
                                            <div>&#123;</div>
                                            <div className="ml-4">"template_id": "tpl_abc123",</div>
                                            <div className="ml-4">"business_data": &#123;</div>
                                            <div className="ml-8">"name": "E-commerce Startup",</div>
                                            <div className="ml-8">"industry": "Retail",</div>
                                            <div className="ml-8">"funding": 50000</div>
                                            <div className="ml-4">&#125;</div>
                                            <div>&#125;</div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-gray-400 text-sm">Response</div>
                                        <div className="bg-gray-800 rounded-lg p-4 font-mono text-sm">
                                            <div>&#123;</div>
                                            <div className="ml-4">"analysis_id": "ana_xyz789",</div>
                                            <div className="ml-4">"status": "processing",</div>
                                            <div className="ml-4">"estimated_completion": "2023-10-15T14:30:00Z"</div>
                                            <div>&#125;</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

      

        </div>
    );
};

export default Documentation;