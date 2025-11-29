
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { TrendingUp, Eye, EyeOff, Globe, CheckCircle2, XCircle } from 'lucide-react';
import LogoImage from '../components/common/LogoImage';
import { signup } from '../services/authService';

const SignUp: React.FC = () => {
    const { language, setLanguage, t } = useLanguage();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [agreed, setAgreed] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const navigate = useNavigate();

    const getPasswordStrength = () => {
        if (password.length < 6) return { text: t('password.weak'), color: 'bg-red-500', width: '33%' };
        if (password.length < 10) return { text: t('password.medium'), color: 'bg-yellow-500', width: '66%' };
        return { text: t('password.strong'), color: 'bg-green-500', width: '100%' };
    }

    const passwordsMatch = password && confirmPassword && password === confirmPassword;

    const validatePasswords = () => {
        if (confirmPassword && password !== confirmPassword) {
            setConfirmPasswordError(language === 'ar' ? 'كلمات المرور غير متطابقة' : 'Passwords do not match');
            return false;
        }
        setConfirmPasswordError('');
        return true;
    }

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setConfirmPassword(value);
        if (value && password && value !== password) {
            setConfirmPasswordError(language === 'ar' ? 'كلمات المرور غير متطابقة' : 'Passwords do not match');
        } else {
            setConfirmPasswordError('');
        }
    }

    const handleConfirmPasswordBlur = () => {
        setConfirmPasswordFocused(false);
        validatePasswords();
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate passwords match
        if (!validatePasswords()) {
            return;
        }

        if (password.length < 6) {
            setPasswordError(language === 'ar' ? 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' : 'Password must be at least 6 characters');
            return;
        }

        try {
            await signup(fullName, email, password);
            alert(t('auth.accountCreated'));
            navigate('/login');
        } catch (err: any) {
            alert(err?.message || t('auth.signupFailed'));
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
                    <h1 className="text-2xl font-bold text-white mb-2 animate-fadeInDown">{t('auth.joinUs')}</h1>
                    <p className="text-green-100 text-sm sm:text-base font-medium animate-fadeInUp animate-delay-200">{t('auth.signupTitle')}</p>
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
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">{t('auth.fullName')}</label>
                            <input
                                id="fullName"
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-lg text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:border-primary-green focus:ring-4 focus:ring-primary-green/15 transition-all duration-300 hover:shadow-sm"
                                placeholder={t('auth.fullNamePlaceholder')}
                                required
                            />
                        </div>

                        <div className="animate-fadeInUp animate-delay-400">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">{t('auth.email')}</label>
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

                        <div className="animate-fadeInUp animate-delay-500">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">{t('auth.password')}</label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setPasswordError('');
                                        if (confirmPassword) {
                                            validatePasswords();
                                        }
                                    }}
                                    onFocus={() => setPasswordFocused(true)}
                                    onBlur={() => setPasswordFocused(false)}
                                    className={`w-full h-12 px-4 pr-12 bg-gray-50 border rounded-lg text-base text-gray-900 placeholder-gray-500 focus:outline-none transition-all duration-300 hover:shadow-sm ${passwordFocused
                                        ? 'border-primary-green focus:ring-4 focus:ring-primary-green/20 shadow-[0_0_0_3px_rgba(34,197,94,0.1)]'
                                        : passwordError
                                            ? 'border-red-500 focus:ring-4 focus:ring-red-500/15'
                                            : 'border-gray-200 focus:border-primary-green focus:ring-4 focus:ring-primary-green/15'
                                        }`}
                                    placeholder={t('auth.passwordPlaceholder')}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary-green transition-all duration-300 hover:scale-110"
                                >
                                    {showPassword ? <EyeOff size={20} className="transition-opacity duration-300" /> : <Eye size={20} className="transition-opacity duration-300" />}
                                </button>
                            </div>
                            {passwordError && (
                                <p className="mt-2 text-sm text-red-600 animate-fadeInDown flex items-center gap-1">
                                    <XCircle size={14} />
                                    {passwordError}
                                </p>
                            )}
                            {password && (
                                <div className="flex items-center gap-2 mt-3">
                                    <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                                        <div
                                            className={`h-2.5 rounded-full transition-all duration-500 ease-out ${getPasswordStrength().color}`}
                                            style={{ width: getPasswordStrength().width }}
                                        ></div>
                                    </div>
                                    <span className="text-xs font-semibold whitespace-nowrap transition-colors duration-300">{getPasswordStrength().text}</span>
                                </div>
                            )}
                        </div>

                        <div className="animate-fadeInUp animate-delay-600">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">{t('auth.confirmPassword')}</label>
                            <div className="relative">
                                <input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                    onFocus={() => setConfirmPasswordFocused(true)}
                                    onBlur={handleConfirmPasswordBlur}
                                    className={`w-full h-12 px-4 pr-12 bg-gray-50 border rounded-lg focus:outline-none focus:ring-4 transition-all duration-300 hover:shadow-sm ${confirmPasswordError
                                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20 shadow-[0_0_0_3px_rgba(239,68,68,0.1)] animate-shake'
                                        : passwordsMatch && confirmPassword
                                            ? 'border-green-500 focus:border-green-500 focus:ring-green-500/20 shadow-[0_0_0_3px_rgba(34,197,94,0.1)]'
                                            : confirmPasswordFocused
                                                ? 'border-primary-green focus:ring-primary-green/20 shadow-[0_0_0_3px_rgba(34,197,94,0.1)]'
                                                : 'border-gray-200 focus:border-primary-green focus:ring-primary-green/15'
                                        }`}
                                    placeholder={t('auth.confirmPasswordPlaceholder')}
                                    required
                                />
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                                    {passwordsMatch && confirmPassword && (
                                        <CheckCircle2 size={18} className="text-green-500 animate-scaleIn" />
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="text-gray-500 hover:text-primary-green transition-all duration-300 hover:scale-110"
                                    >
                                        {showConfirmPassword ? <EyeOff size={20} className="transition-opacity duration-300" /> : <Eye size={20} className="transition-opacity duration-300" />}
                                    </button>
                                </div>
                            </div>
                            {confirmPasswordError && (
                                <p className="mt-2 text-sm text-red-600 animate-fadeInDown flex items-center gap-1">
                                    <XCircle size={14} />
                                    {confirmPasswordError}
                                </p>
                            )}
                            {passwordsMatch && confirmPassword && !confirmPasswordError && (
                                <p className="mt-2 text-sm text-green-600 animate-fadeInDown flex items-center gap-1">
                                    <CheckCircle2 size={14} />
                                    {language === 'ar' ? 'كلمات المرور متطابقة' : 'Passwords match'}
                                </p>
                            )}
                        </div>

                        <div className="animate-fadeInUp animate-delay-700">
                            <label className="flex items-center text-sm text-gray-600">
                                <input
                                    type="checkbox"
                                    checked={agreed}
                                    onChange={(e) => setAgreed(e.target.checked)}
                                    className="form-checkbox h-4 w-4 text-primary-green rounded border-gray-300 focus:ring-primary-green"
                                />
                                <span className="ms-2">{t('auth.termsAgreement')}</span>
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={!agreed || !passwordsMatch}
                            className="w-full h-12 px-8 bg-primary-green text-white font-semibold rounded-lg hover:bg-primary-green-hover disabled:bg-gray-400 flex items-center justify-center transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg animate-fadeInUp animate-delay-800"
                        >
                            {t('auth.createAccount')}
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-gray-100 text-center animate-fadeInUp animate-delay-900">
                        <p className="text-gray-600 text-sm">
                            {t('auth.alreadyHaveAccount')}{' '}
                            <a
                                onClick={() => navigate('/login')}
                                className="font-medium text-primary-green hover:underline cursor-pointer transition-colors"
                            >
                                {t('auth.login')}
                            </a>
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-8 text-center animate-fadeInUp animate-delay-1000">
                <p className="text-green-100 text-sm">© {new Date().getFullYear()} {t('common.appName')}. {t('auth.allRightsReserved')}</p>
            </div>
        </div>
    );
};

export default SignUp;
