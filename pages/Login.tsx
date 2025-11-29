
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { TrendingUp, Eye, EyeOff, Globe } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import LogoImage from '../components/common/LogoImage';

const Login: React.FC = () => {
    const { language, setLanguage, t } = useLanguage();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { login, loading } = useAuth();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email && password) {
            login(email, password);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-green to-green-700 flex flex-col justify-center items-center p-4 animate-fadeIn">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden animate-scaleIn">
                <div className="bg-gradient-to-r from-primary-green to-green-600 p-8 text-center">
                    <div className="flex justify-center mb-6 bg-transparent p-0" style={{ background: 'transparent', boxShadow: 'none', border: 'none' }}>
                        <LogoImage
                            height={120}
                            width={400}
                            mobileHeight={105}
                            mobileWidth={350}
                            className="animate-bounceIn"
                            withShadow={false}
                        />
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2 animate-fadeInDown">{t('auth.welcomeBack')}</h1>
                    <p className="text-green-100 text-sm sm:text-base font-medium animate-fadeInUp animate-delay-200">{t('auth.loginTitle')}</p>
                </div>

                <div className="p-8">
                    <div className="flex justify-end mb-6">
                        <button
                            onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
                            className="p-2 rounded-full hover:bg-gray-100 transition-colors animate-fadeInRight"
                            aria-label={t('common.toggleLanguage')}
                        >
                            <Globe size={20} className="text-gray-600" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="animate-fadeInUp animate-delay-300">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                {t('auth.email')}
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-lg text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:border-primary-green focus:ring-4 focus:ring-primary-green/15 transition-all duration-300 hover:shadow-sm"
                                placeholder={t('auth.emailPlaceholder')}
                                required
                            />
                        </div>

                        <div className="animate-fadeInUp animate-delay-400">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                {t('auth.password')}
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full h-12 px-4 pr-12 bg-gray-50 border border-gray-200 rounded-lg text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:border-primary-green focus:ring-4 focus:ring-primary-green/15 transition-all duration-300 hover:shadow-sm"
                                    placeholder={t('auth.passwordPlaceholder')}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary-green transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between animate-fadeInUp animate-delay-500">
                            <label className="flex items-center text-sm text-gray-600">
                                <input type="checkbox" className="form-checkbox h-4 w-4 text-primary-green rounded border-gray-300 focus:ring-primary-green" />
                                <span className="ms-2">{t('auth.rememberMe')}</span>
                            </label>
                            <a href="#" className="text-sm text-primary-green hover:underline font-medium">
                                {t('auth.forgotPassword')}
                            </a>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-12 px-8 bg-primary-green text-white font-semibold rounded-lg hover:bg-primary-green-hover disabled:bg-gray-400 flex items-center justify-center transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg animate-fadeInUp animate-delay-600"
                        >
                            {loading ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                    {t('auth.signingIn')}
                                </>
                            ) : (
                                t('auth.login')
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-gray-100 text-center animate-fadeInUp animate-delay-700">
                        <p className="text-gray-600 text-sm">
                            {t('auth.dontHaveAccount')}{' '}
                            <a
                                onClick={() => navigate('/signup')}
                                className="font-medium text-primary-green hover:underline cursor-pointer transition-colors"
                            >
                                {t('auth.signup')}
                            </a>
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-8 text-center animate-fadeInUp animate-delay-800">
                <p className="text-green-100 text-sm">© {new Date().getFullYear()} {t('common.appName')}. {t('auth.allRightsReserved')}</p>
            </div>
        </div>
    );
};

export default Login;
