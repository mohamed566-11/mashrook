import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Users, Target, Award, TrendingUp, Lightbulb, Globe, ArrowRight, Mail, MapPin, Clock } from 'lucide-react';
import LogoImage from '../components/common/LogoImage';


const Careers: React.FC = () => {
    const { t, language } = useLanguage();
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    const values = [
        {
            icon: <Target className="w-8 h-8" />,
            title: t('careers.valueInnovation'),
            description: t('careers.valueInnovationDesc')
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: t('careers.valueEmpowerment'),
            description: t('careers.valueEmpowermentDesc')
        },
        {
            icon: <Award className="w-8 h-8" />,
            title: t('careers.valueExcellence'),
            description: t('careers.valueExcellenceDesc')
        },
        {
            icon: <Globe className="w-8 h-8" />,
            title: t('careers.valueGlobalImpact'),
            description: t('careers.valueGlobalImpactDesc')
        }
    ];

    const benefits = [
        {
            title: t('careers.benefit1Title'),
            description: t('careers.benefit1Desc'),
            icon: <TrendingUp className="w-6 h-6" />
        },
        {
            title: t('careers.benefit2Title'),
            description: t('careers.benefit2Desc'),
            icon: <Lightbulb className="w-6 h-6" />
        },
        {
            title: t('careers.benefit3Title'),
            description: t('careers.benefit3Desc'),
            icon: <Award className="w-6 h-6" />
        }
    ];

    const openPositions = [
        {
            title: t('careers.position1Title'),
            department: t('careers.position1Dept'),
            location: t('careers.position1Location'),
            type: t('careers.fullTime'),
            description: t('careers.position1Desc')
        },
        {
            title: t('careers.position2Title'),
            department: t('careers.position2Dept'),
            location: t('careers.position2Location'),
            type: t('careers.fullTime'),
            description: t('careers.position2Desc')
        },
        {
            title: t('careers.position3Title'),
            department: t('careers.position3Dept'),
            location: t('careers.position3Location'),
            type: t('careers.fullTime'),
            description: t('careers.position3Desc')
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
           

            {/* Hero Section */}
            <section className="py-20 bg-gradient-to-r from-primary-green to-green-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className={`text-4xl md:text-6xl font-bold mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
                        {t('careers.title')}
                    </h1>
                    <p className={`text-xl md:text-2xl mb-10 max-w-3xl mx-auto transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
                        {t('careers.description')}
                    </p>
                </div>
            </section>

            {/* Our Values */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                            {t('careers.ourValues')}
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            {t('careers.ourValuesDesc')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className="bg-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 group text-center"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-primary-green/10 flex items-center justify-center mb-6 mx-auto group-hover:bg-primary-green/20 transition-colors duration-300">
                                    <div className="text-primary-green group-hover:scale-110 transition-transform duration-300">
                                        {value.icon}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-gray-900">{value.title}</h3>
                                <p className="text-gray-600">{value.description}</p>
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
                            {t('careers.benefits')}
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            {t('careers.benefitsDesc')}
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

            {/* Open Positions */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                            {t('careers.openPositions')}
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            {t('careers.openPositionsDesc')}
                        </p>
                    </div>

                    <div className="space-y-6">
                        {openPositions.map((position, index) => (
                            <div
                                key={index}
                                className="bg-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
                            >
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{position.title}</h3>
                                        <div className="flex flex-wrap gap-4 text-gray-600">
                                            <div className="flex items-center">
                                                <Users className="w-4 h-4 mr-2" />
                                                {position.department}
                                            </div>
                                            <div className="flex items-center">
                                                <MapPin className="w-4 h-4 mr-2" />
                                                {position.location}
                                            </div>
                                            <div className="flex items-center">
                                                <Clock className="w-4 h-4 mr-2" />
                                                {position.type}
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => navigate('/contact')}
                                        className="mt-4 md:mt-0 px-6 py-3 bg-primary-green text-white font-bold rounded-full hover:bg-primary-green-hover transition-all duration-300 flex items-center"
                                    >
                                        {t('careers.applyNow')}
                                        <ArrowRight className="ml-2 w-4 h-4" />
                                    </button>
                                </div>
                                <p className="text-gray-600">{position.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>



        </div>
    );
};

export default Careers;