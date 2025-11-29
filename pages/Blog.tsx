import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Calendar, User, Tag, ArrowRight, Search, Clock } from 'lucide-react';
import LogoImage from '../components/common/LogoImage';
import PageHeader from '../components/common/PageHeader';

const Blog: React.FC = () => {
    const { t, language } = useLanguage();
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    const blogPosts = [
        {
            id: 1,
            title: t('blog.post1Title'),
            excerpt: t('blog.post1Excerpt'),
            author: t('blog.author1'),
            date: t('blog.date1'),
            category: t('blog.categoryBusiness'),
            readTime: '5 min read',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1115&q=80'
        },
        {
            id: 2,
            title: t('blog.post2Title'),
            excerpt: t('blog.post2Excerpt'),
            author: t('blog.author2'),
            date: t('blog.date2'),
            category: t('blog.categoryFinance'),
            readTime: '8 min read',
            image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
        },
        {
            id: 3,
            title: t('blog.post3Title'),
            excerpt: t('blog.post3Excerpt'),
            author: t('blog.author1'),
            date: t('blog.date3'),
            category: t('blog.categoryMarket'),
            readTime: '6 min read',
            image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
        },
        {
            id: 4,
            title: t('blog.post4Title'),
            excerpt: t('blog.post4Excerpt'),
            author: t('blog.author3'),
            date: t('blog.date4'),
            category: t('blog.categoryTech'),
            readTime: '10 min read',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
        },
        {
            id: 5,
            title: t('blog.post5Title'),
            excerpt: t('blog.post5Excerpt'),
            author: t('blog.author2'),
            date: t('blog.date5'),
            category: t('blog.categoryBusiness'),
            readTime: '7 min read',
            image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1032&q=80'
        },
        {
            id: 6,
            title: t('blog.post6Title'),
            excerpt: t('blog.post6Excerpt'),
            author: t('blog.author1'),
            date: t('blog.date6'),
            category: t('blog.categoryFinance'),
            readTime: '9 min read',
            image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
        }
    ];

    const categories = [
        { id: 'all', name: t('blog.allCategories') },
        { id: 'business', name: t('blog.categoryBusiness') },
        { id: 'finance', name: t('blog.categoryFinance') },
        { id: 'market', name: t('blog.categoryMarket') },
        { id: 'tech', name: t('blog.categoryTech') }
    ];

    const filteredPosts = blogPosts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || post.category === categories.find(c => c.id === selectedCategory)?.name;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
            <PageHeader title={t('blog.title')} />

            {/* Hero Section */}
            <section className="py-20 bg-gradient-to-r from-primary-green to-green-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className={`text-4xl md:text-6xl font-bold mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
                        {t('blog.title')}
                    </h1>
                    <p className={`text-xl md:text-2xl mb-10 max-w-3xl mx-auto transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
                        {t('blog.description')}
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
                                placeholder={t('blog.searchPlaceholder')}
                                className="block w-full pl-10 pr-3 py-4 border border-transparent rounded-full leading-5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent shadow-lg"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Category Filter */}
            <section className="py-10 bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap justify-center gap-4">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${selectedCategory === category.id
                                    ? 'bg-primary-green text-white shadow-lg'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Blog Posts */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPosts.map((post) => (
                            <div
                                key={post.id}
                                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 group"
                            >
                                <div className="h-48 overflow-hidden">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-8">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="inline-block px-3 py-1 text-xs font-semibold text-primary-green bg-primary-green/10 rounded-full">
                                            {post.category}
                                        </span>
                                        <div className="flex items-center text-gray-500 text-sm">
                                            <Clock className="w-4 h-4 mr-1" />
                                            {post.readTime}
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-primary-green transition-colors duration-300">
                                        {post.title}
                                    </h3>
                                    <p className="text-gray-600 mb-6">{post.excerpt}</p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 rounded-full bg-primary-green/10 flex items-center justify-center mr-3">
                                                <User className="w-4 h-4 text-primary-green" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{post.author}</p>
                                                <div className="flex items-center text-gray-500 text-xs">
                                                    <Calendar className="w-3 h-3 mr-1" />
                                                    {post.date}
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => navigate('/blog/post')}
                                            className="text-primary-green font-bold flex items-center group-hover:translate-x-1 transition-transform duration-300"
                                        >
                                            {t('blog.readMore')}
                                            <ArrowRight className="ml-2 w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-r from-primary-green to-green-600 rounded-2xl p-8 md:p-12 text-white text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            {t('blog.newsletterTitle')}
                        </h2>
                        <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
                            {t('blog.newsletterDesc')}
                        </p>
                        <div className="max-w-md mx-auto flex">
                            <input
                                type="email"
                                placeholder={t('blog.emailPlaceholder')}
                                className="flex-grow px-4 py-3 rounded-l-full text-gray-900 focus:outline-none"
                            />
                            <button className="bg-gray-900 text-white px-6 py-3 rounded-r-full font-bold hover:bg-black transition-colors duration-300">
                                {t('blog.subscribe')}
                            </button>
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

export default Blog;