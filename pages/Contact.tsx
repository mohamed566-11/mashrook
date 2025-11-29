import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Mail, Phone, MapPin, Clock, MessageCircle, User, Send } from 'lucide-react';
import LogoImage from '../components/common/LogoImage';

const Contact: React.FC = () => {
    const { t, language } = useLanguage();
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real application, you would send the form data to your backend here
        console.log('Form submitted:', formData);
        setIsSubmitted(true);

        // Reset form after submission
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
        });

        // Reset submission status after 5 seconds
        setTimeout(() => {
            setIsSubmitted(false);
        }, 5000);
    };

    const contactMethods = [
        {
            icon: <Mail className="w-6 h-6" />,
            title: t('contact.email'),
            description: "support@mashroo3k.com",
            action: "support@mashroo3k.com"
        },
        {
            icon: <Phone className="w-6 h-6" />,
            title: t('contact.phone'),
            description: "+1 (555) 123-4567",
            action: "+1 (555) 123-4567"
        },
        {
            icon: <MapPin className="w-6 h-6" />,
            title: t('contact.address'),
            description: t('contact.addressDesc'),
            action: t('contact.addressDesc')
        },
        {
            icon: <Clock className="w-6 h-6" />,
            title: t('contact.workingHours'),
            description: t('contact.workingHoursDesc'),
            action: t('contact.workingHoursDesc')
        }
    ];

    const contactReasons = [
        {
            icon: <MessageCircle className="w-8 h-8" />,
            title: t('contact.supportTitle'),
            description: t('contact.supportDesc')
        },
        {
            icon: <User className="w-8 h-8" />,
            title: t('contact.businessTitle'),
            description: t('contact.businessDesc')
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">

            {/* Hero Section */}
            <section className="py-20 bg-gradient-to-r from-primary-green to-green-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className={`text-4xl md:text-6xl font-bold mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
                        {t('contact.title')}
                    </h1>
                    <p className={`text-xl md:text-2xl mb-10 max-w-3xl mx-auto transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
                        {t('contact.description')}
                    </p>
                </div>
            </section>

            {/* Contact Methods */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                            {t('contact.getInTouch')}
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            {t('contact.getInTouchDesc')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                                <p className="text-gray-600">{method.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Contact Us */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                            {t('contact.whyContactUs')}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {contactReasons.map((reason, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-primary-green/10 flex items-center justify-center mb-6">
                                    <div className="text-primary-green">
                                        {reason.icon}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-gray-900">{reason.title}</h3>
                                <p className="text-gray-600">{reason.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-12">
                        <div className="lg:w-1/2">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                                {t('contact.sendUsMessage')}
                            </h2>
                            <p className="text-xl text-gray-600 mb-8">
                                {t('contact.sendUsMessageDesc')}
                            </p>

                            <div className="bg-gray-50 rounded-2xl p-8">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {isSubmitted && (
                                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                                            {t('contact.formSubmitted')}
                                        </div>
                                    )}

                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                            {t('contact.name')}
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder={t('contact.namePlaceholder')}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                            {t('contact.email')}
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder={t('contact.emailPlaceholder')}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                            {t('contact.subject')}
                                        </label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleInputChange}
                                            placeholder={t('contact.subjectPlaceholder')}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                            {t('contact.message')}
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            placeholder={t('contact.messagePlaceholder')}
                                            rows={5}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
                                            required
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full px-6 py-4 bg-primary-green text-white font-bold rounded-lg hover:bg-primary-green-hover transition flex items-center justify-center gap-2"
                                    >
                                        {t('contact.sendMessage')}
                                        <Send size={16} />
                                    </button>
                                </form>
                            </div>
                        </div>

                        <div className="lg:w-1/2">
                            <div className="bg-gradient-to-r from-primary-green to-green-600 rounded-2xl p-8 text-white h-full">
                                <h3 className="text-2xl font-bold mb-6">
                                    {t('contact.liveChat')}
                                </h3>
                                <p className="text-green-100 mb-8">
                                    {t('contact.liveChatDesc')}
                                </p>

                                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8">
                                    <div className="flex items-center mb-4">
                                        <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex">
                                            <div className="bg-gray-800 rounded-lg rounded-tl-none px-4 py-2 max-w-xs">
                                                <p className="text-sm">Hello! How can I help you today?</p>
                                            </div>
                                        </div>

                                        <div className="flex justify-end">
                                            <div className="bg-white text-gray-900 rounded-lg rounded-tr-none px-4 py-2 max-w-xs">
                                                <p className="text-sm">I have a question about your business analysis platform.</p>
                                            </div>
                                        </div>

                                        <div className="flex">
                                            <div className="bg-gray-800 rounded-lg rounded-tl-none px-4 py-2 max-w-xs">
                                                <p className="text-sm">Sure, I'd be happy to help! What would you like to know?</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    disabled
                                    className="w-full px-6 py-4 bg-white text-primary-green font-bold rounded-lg opacity-50 cursor-not-allowed"
                                >
                                    {t('contact.chatComingSoon')}
                                </button>

                                <p className="text-green-100 text-sm mt-4 text-center">
                                    {t('contact.startChat')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </div>
    );
};

export default Contact;