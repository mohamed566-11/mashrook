import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { BarChart, PieChart, TrendingUp, FileText, Download, Eye } from 'lucide-react';
import LogoImage from '../components/common/LogoImage';

const Reports: React.FC = () => {
    const { t, language } = useLanguage();
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const reportCategories = [
        {
            title: t('reports.businessAnalysis'),
            description: t('reports.businessAnalysisDesc'),
            icon: <TrendingUp className="w-8 h-8" />,
            count: 24
        },
        {
            title: t('reports.financialReports'),
            description: t('reports.financialReportsDesc'),
            icon: <BarChart className="w-8 h-8" />,
            count: 18
        },
        {
            title: t('reports.marketResearch'),
            description: t('reports.marketResearchDesc'),
            icon: <PieChart className="w-8 h-8" />,
            count: 15
        },
        {
            title: t('reports.comparativeAnalysis'),
            description: t('reports.comparativeAnalysisDesc'),
            icon: <FileText className="w-8 h-8" />,
            count: 12
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">

            {/* Hero Section */}
            <section className="py-20 bg-gradient-to-r from-primary-green to-green-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className={`text-4xl md:text-6xl font-bold mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
                        {t('reports.title')}
                    </h1>
                    <p className={`text-xl md:text-2xl mb-10 max-w-3xl mx-auto transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
                        {t('reports.description')}
                    </p>
                </div>
            </section>

            {/* Report Categories */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                            {t('reports.categories')}
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            {t('reports.categoriesDesc')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {reportCategories.map((category, index) => (
                            <div
                                key={index}
                                className="bg-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 group text-center"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-primary-green/10 flex items-center justify-center mb-6 mx-auto group-hover:bg-primary-green/20 transition-colors duration-300">
                                    <div className="text-primary-green group-hover:scale-110 transition-transform duration-300">
                                        {category.icon}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-gray-900">{category.title}</h3>
                                <p className="text-gray-600 mb-4">{category.description}</p>
                                <div className="text-primary-green font-bold">{category.count} {t('reports.reportsAvailable')}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                            {t('reports.howItWorks')}
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            {t('reports.howItWorksDesc')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                            <div className="w-16 h-16 rounded-full bg-primary-green/10 flex items-center justify-center mb-6 mx-auto">
                                <span className="text-primary-green font-bold text-2xl">1</span>
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-900">{t('reports.step1Title')}</h3>
                            <p className="text-gray-600">{t('reports.step1Desc')}</p>
                        </div>

                        <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                            <div className="w-16 h-16 rounded-full bg-primary-green/10 flex items-center justify-center mb-6 mx-auto">
                                <span className="text-primary-green font-bold text-2xl">2</span>
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-900">{t('reports.step2Title')}</h3>
                            <p className="text-gray-600">{t('reports.step2Desc')}</p>
                        </div>

                        <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                            <div className="w-16 h-16 rounded-full bg-primary-green/10 flex items-center justify-center mb-6 mx-auto">
                                <span className="text-primary-green font-bold text-2xl">3</span>
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-900">{t('reports.step3Title')}</h3>
                            <p className="text-gray-600">{t('reports.step3Desc')}</p>
                        </div>
                    </div>
                </div>
            </section>


          
        </div>
    );
};

export default Reports;