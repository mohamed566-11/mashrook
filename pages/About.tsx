import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import {
    Users, Target, Award, TrendingUp, Lightbulb, Globe,
    ArrowRight, CheckCircle
} from 'lucide-react';
import LogoImage from '../components/common/LogoImage';
import PageHeader from '../components/common/PageHeader';

const About: React.FC = () => {
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
            title: t('about.valueInnovation'),
            description: t('about.valueInnovationDesc')
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: t('about.valueEmpowerment'),
            description: t('about.valueEmpowermentDesc')
        },
        {
            icon: <Award className="w-8 h-8" />,
            title: t('about.valueExcellence'),
            description: t('about.valueExcellenceDesc')
        },
        {
            icon: <Globe className="w-8 h-8" />,
            title: t('about.valueGlobalImpact'),
            description: t('about.valueGlobalImpactDesc')
        }
    ];

    const team = [
        {
            name: t('about.teamMember1Name'),
            role: t('about.teamMember1Role'),
            bio: t('about.teamMember1Bio'),
            avatar: "AH"
        },
        {
            name: t('about.teamMember2Name'),
            role: t('about.teamMember2Role'),
            bio: t('about.teamMember2Bio'),
            avatar: "SJ"
        },
        {
            name: t('about.teamMember3Name'),
            role: t('about.teamMember3Role'),
            bio: t('about.teamMember3Bio'),
            avatar: "MA"
        },
        {
            name: t('about.teamMember4Name'),
            role: t('about.teamMember4Role'),
            bio: t('about.teamMember4Bio'),
            avatar: "FK"
        }
    ];

    const milestones = [
        { year: "2020", event: t('about.milestone2020') },
        { year: "2021", event: t('about.milestone2021') },
        { year: "2022", event: t('about.milestone2022') },
        { year: "2023", event: t('about.milestone2023') },
        { year: "2024", event: t('about.milestone2024') }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
            <PageHeader title={t('about.title')} />

            {/* Hero Section */}
            <section className="py-20 bg-gradient-to-r from-primary-green to-green-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className={`text-4xl md:text-6xl font-bold mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
                        {t('about.title')}
                    </h1>
                    <p className={`text-xl md:text-2xl mb-10 max-w-3xl mx-auto transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
                        {t('about.description')}
                    </p>
                </div>
            </section>

            {/* Our Story */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="md:w-1/2">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                                {t('about.ourStory')}
                            </h2>
                            <p className="text-gray-600 mb-6">
                                {t('about.content')}
                            </p>
                            <p className="text-gray-600 mb-8">
                                {t('about.content2')}
                            </p>
                            <button
                                onClick={() => navigate('/signup')}
                                className="px-6 py-3 bg-primary-green text-white font-semibold rounded-md hover:bg-primary-green-hover transition flex items-center gap-2"
                            >
                                {t('about.joinOurJourney')} <ArrowRight size={16} />
                            </button>
                        </div>
                        <div className="md:w-1/2">
                            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-96 flex items-center justify-center">
                                <span className="text-gray-500">{t('about.ourTeamPhoto')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Values */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                            {t('about.ourValues')}
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            {t('about.ourValuesDesc')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 group text-center"
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

            {/* Our Team */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                            {t('about.ourLeadershipTeam')}
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            {t('about.ourLeadershipTeamDesc')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {team.map((member, index) => (
                            <div
                                key={index}
                                className="bg-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 text-center"
                            >
                                <div className="w-20 h-20 rounded-full bg-primary-green/10 flex items-center justify-center mx-auto mb-6 text-primary-green font-bold text-xl">
                                    {member.avatar}
                                </div>
                                <h3 className="text-xl font-bold mb-1 text-gray-900">{member.name}</h3>
                                <p className="text-primary-green mb-4">{member.role}</p>
                                <p className="text-gray-600">{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Milestones */}
            <section className="py-20 bg-gradient-to-r from-primary-green to-green-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            {t('about.ourJourney')}
                        </h2>
                        <p className="text-xl text-green-100 max-w-3xl mx-auto">
                            {t('about.ourJourneyDesc')}
                        </p>
                    </div>

                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-white/20"></div>

                        <div className="space-y-12">
                            {milestones.map((milestone, index) => (
                                <div
                                    key={index}
                                    className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                                >
                                    <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                                            <span className="text-2xl font-bold">{milestone.year}</span>
                                            <p className="mt-2">{milestone.event}</p>
                                        </div>
                                    </div>
                                    <div className="md:w-1/2 flex justify-center md:justify-start md:pl-6 md:pr-6">
                                        <div className="w-6 h-6 rounded-full bg-white border-4 border-primary-green"></div>
                                    </div>
                                    <div className="md:w-1/2"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}


            {/* Footer */}

        </div>
    );
};

export default About;