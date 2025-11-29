import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import LogoImage from '../common/LogoImage';
import NotificationDropdown from '../NotificationDropdown';
import { LayoutDashboard, TrendingUp, FileText, BarChart3, User, Settings, LogOut, Globe, Code } from 'lucide-react';

const EnhancedHeader: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { t, language, setLanguage } = useLanguage();
    const { user, logout } = useAuth();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
        setUserMenuOpen(false);
    }, [location.pathname]);

    const toggleLanguage = () => {
        setLanguage(language === 'ar' ? 'en' : 'ar');
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const baseNavItems = [
        { path: '/dashboard', label: t('common.dashboard'), icon: LayoutDashboard },
        { path: '/my-analyses', label: t('common.myAnalyses'), icon: TrendingUp },
        { path: '/templates', label: t('common.templates'), icon: FileText },
    ];

    // Add admin or reports link based on user role
    const navItems = [...baseNavItems];
    if (user?.role === 'admin') {
        navItems.push({ path: '/admin', label: t('common.admin'), icon: BarChart3 });
    } else if (user?.role === 'developer') {
        navItems.push({ path: '/developer/dashboard', label: t('common.developer'), icon: Code });
    } else {
        navItems.push({ path: '/reports', label: t('common.reports'), icon: BarChart3 });
    }

    return (
        <header className={`fixed top-0 left-0 right-0 z-40 bg-card-white border-b border-border-color transition-all duration-300 ${scrolled ? 'py-1 shadow-md' : 'py-2'} ${language === 'ar' ? 'rtl' : 'ltr'}`}>
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Logo Section */}
                    <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer animate-fadeInLeft" onClick={() => navigate('/dashboard')}>
                        <LogoImage height={65} width={230} mobileHeight={55} mobileWidth={200} />
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-1">
                        {navItems.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <button
                                    key={item.path}
                                    onClick={() => navigate(item.path)}
                                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors smooth-transition animate-fadeInDown animate-delay-${(index + 1) * 100} ${location.pathname === item.path
                                        ? 'text-primary-green bg-primary-green/10'
                                        : 'text-gray-600 hover:text-primary-green hover:bg-gray-100'
                                        }`}
                                >
                                    <Icon size={16} className="me-2" />
                                    <span>{item.label}</span>
                                </button>
                            );
                        })}
                    </nav>

                    {/* Actions Section */}
                    <div className="flex items-center space-x-2 animate-fadeInRight">
                        {/* Language Switcher */}
                        <button
                            className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-primary-green hover:bg-gray-100 smooth-transition hover-scale"
                            onClick={toggleLanguage}
                            title={language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
                            aria-label={language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
                        >
                            <Globe size={16} className="me-1" />
                            <span className="font-bold">{language === 'ar' ? 'AR' : 'EN'}</span>
                        </button>

                        {/* Notifications */}
                        <NotificationDropdown />

                        {/* User Menu */}
                        <div className="relative">
                            <button
                                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-primary-green hover:bg-gray-100 smooth-transition hover-scale"
                                onClick={() => setUserMenuOpen(!userMenuOpen)}
                                aria-label={t('common.openUserMenu')}
                            >
                                <div className="h-8 w-8 rounded-full bg-primary-green flex items-center justify-center text-white font-bold text-sm">
                                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                                </div>
                                <span className="hidden sm:block ms-2 me-1">{user?.name}</span>
                                <span className="hidden sm:block text-xs">▼</span>
                            </button>

                            {/* User Dropdown */}
                            {userMenuOpen && (
                                <div className="origin-top-right absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 animate-fadeInDown">
                                    <div className="p-4 border-b border-gray-200">
                                        <div className="flex items-center">
                                            <div className="h-12 w-12 rounded-full bg-primary-green flex items-center justify-center text-white font-bold text-lg">
                                                {user?.name?.charAt(0).toUpperCase() || 'U'}
                                            </div>
                                            <div className="ms-3">
                                                <p className="font-semibold text-gray-900">{user?.name}</p>
                                                <p className="text-sm text-gray-500 truncate">{user?.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="py-1">
                                        <button
                                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 smooth-transition"
                                            onClick={() => { navigate('/profile'); setUserMenuOpen(false); }}
                                        >
                                            <User size={16} className="me-2" />
                                            {t('common.myProfile')}
                                        </button>
                                        <button
                                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 smooth-transition"
                                            onClick={() => { navigate('/settings'); setUserMenuOpen(false); }}
                                        >
                                            <Settings size={16} className="me-2" />
                                            {t('common.settings')}
                                        </button>
                                        <div className="border-t border-gray-200 my-1"></div>
                                        <button
                                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 smooth-transition"
                                            onClick={handleLogout}
                                        >
                                            <LogOut size={16} className="me-2" />
                                            {t('common.signOut')}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="md:hidden p-2 rounded-md text-gray-600 hover:text-primary-green hover:bg-gray-100 smooth-transition"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label={t('common.toggleMenu')}
                        >
                            <div className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}>
                                <span className="block w-6 h-0.5 bg-current rounded transition-all duration-300"></span>
                                <span className="block w-6 h-0.5 bg-current rounded my-1 transition-all duration-300"></span>
                                <span className="block w-6 h-0.5 bg-current rounded transition-all duration-300"></span>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <nav className="md:hidden mt-4 pb-4 animate-slideInDown">
                        <div className="grid grid-cols-2 gap-2">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <button
                                        key={item.path}
                                        onClick={() => navigate(item.path)}
                                        className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors smooth-transition ${location.pathname === item.path
                                            ? 'text-primary-green bg-primary-green/10'
                                            : 'text-gray-600 hover:text-primary-green hover:bg-gray-100'
                                            }`}
                                    >
                                        <Icon size={16} className="me-2" />
                                        <span>{item.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </nav>
                )}
            </div>
        </header>
    );
};

export default EnhancedHeader;