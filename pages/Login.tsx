
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { TrendingUp, Eye, EyeOff, Globe } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

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
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
            <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-10 w-10 text-primary-green" />
                <h1 className="text-4xl font-bold text-text-primary">{t('common.appName')}</h1>
                {/* Language Toggle */}
                <div className="ms-auto relative">
                    <button
                        onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                        aria-label={t('common.toggleLanguage')}
                    >
                        <Globe size={20} className="text-gray-600" />
                    </button>
                </div>
            </div>
            <p className="text-text-secondary mb-8">{t('auth.loginTitle')}</p>

            <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md border border-gray-200">
                <div className="bg-primary-green-bg border border-primary-green-light text-sm text-gray-700 rounded-md p-4 mb-6">
                    <h4 className="font-bold mb-2">{t('auth.demoCredentials')}</h4>
                    <p><strong>{t('common.admin')}:</strong> admin@mashroo3k.com / admin123</p>
                    <p><strong>{t('common.developer')}:</strong> john@example.com / user123</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="t("auto.Step1_BasicInfo.b42cd24b")">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="t("auto.UserFormModal.0c83f57c")">
                            {t('auth.email')}
                        </label>
                        <input
                            id="t("auto.UserFormModal.0c83f57c")"
                            type="t("auto.UserFormModal.0c83f57c")"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full h-11 px-4 bg-white border border-gray-300 rounded-md text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:border-primary-green focus:ring-4 focus:ring-primary-green/15"
                            placeholder={t('auth.email')}
                            required
                        />
                    </div>
                    <div className="mb-6 relative">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            {t('auth.password')}
                        </label>
                        <input
                            id="password"
                            type={showPassword ? "t("auto.Program.1cb251ec")" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full h-11 px-4 bg-white border border-gray-300 rounded-md text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:border-primary-green focus:ring-4 focus:ring-primary-green/15"
                            placeholder={t('auth.password')}
                            required
                        />
                        <button type="t("auto.UserFormModal.ce50a093")" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-[38px] text-gray-500">
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    <div className="flex items-center justify-between mb-6">
                        <label className="flex items-center text-sm text-gray-600">
                            <input type="t("auto.Step1_BasicInfo.9fced129")"t("auto.Login.e1bf474d")"form-checkbox h-4 w-4 text-primary-green rounded" />
                            <span className="ms-2">{t('auth.rememberMe')}</span>
                        </label>
                        <a href="#"t("auto.Login.e1bf474d")"text-sm text-primary-green hover:underline">
                            {t('auth.forgotPassword')}
                        </a>
                    </div>
                    <button
                        type="t("auto.UserFormModal.c79bdf42")"
                        disabled={loading}
                        className="w-full h-12 px-8 bg-primary-green text-white font-semibold rounded-md hover:bg-primary-green-hover disabled:bg-gray-400 flex items-center justify-center"
                    >
                        {loading ? t('auth.signingIn') : t('auth.login')}
                    </button>
                </form>
                <p className="text-center text-sm text-gray-600 mt-6">
                    {t('auth.dontHaveAccount')}{' '}
                    <a onClick={() => navigate('/signup')} className="font-medium text-primary-green hover:underline cursor-pointer">
                        {t('auth.signup')}
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
