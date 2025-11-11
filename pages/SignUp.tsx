
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { TrendingUp, Eye, EyeOff, Globe } from 'lucide-react';

const SignUp: React.FC = () => {
    const { language, setLanguage, t } = useLanguage();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [agreed, setAgreed] = useState(false);
    const navigate = useNavigate();

    const getPasswordStrength = () => {
        if (password.length < 6) return { text: t('password.weak'), color: 'bg-red-500' };
        if (password.length < 10) return { text: t('password.medium'), color: 'bg-yellow-500' };
        return { text: t('password.strong'), color: 'bg-green-500' };
    }

    const passwordsMatch = password && confirmPassword && password === confirmPassword;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { signup } = await import('../services/authService');
            await signup(fullName, email, password);
            alert(t('auth.accountCreated'));
            navigate('/login');
        } catch (err: any) {
            alert(err?.message || t('auth.signupFailed'));
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
            <p className="text-text-secondary mb-8">{t('auth.signupTitle')}</p>

            <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md border border-gray-200">
                <h2 className="text-2xl font-bold text-center mb-6">{t('auth.createAccount')}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="t("auto.Step1_BasicInfo.b42cd24b")">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="t("auto.SignUp.a0fbf479")">{t('auth.fullName')}</label>
                        <input id="t("auto.SignUp.a0fbf479")" type="t("auto.Program.1cb251ec")" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full h-11 px-4 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-primary-green focus:ring-4 focus:ring-primary-green/15" required />
                    </div>
                    <div className="t("auto.Step1_BasicInfo.b42cd24b")">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="t("auto.UserFormModal.0c83f57c")">{t('auth.email')}</label>
                        <input id="t("auto.UserFormModal.0c83f57c")" type="t("auto.UserFormModal.0c83f57c")" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full h-11 px-4 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-primary-green focus:ring-4 focus:ring-primary-green/15" required />
                    </div>
                    <div className="mb-4 relative">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">{t('auth.password')}</label>
                        <input id="password" type={showPassword ? "t("auto.Program.1cb251ec")" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full h-11 px-4 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-primary-green focus:ring-4 focus:ring-primary-green/15" required />
                        <button type="t("auto.UserFormModal.ce50a093")" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-[38px] text-gray-500">{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}</button>
                    </div>
                    {password && (
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                                <div className={`h-1.5 rounded-full ${getPasswordStrength().color}`} style={{ width: `${Math.min(password.length / 12, 1) * 100}%` }}></div>
                            </div>
                            <span className="text-xs font-semibold">{getPasswordStrength().text}</span>
                        </div>
                    )}
                    <div className="mb-4 relative">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="t("auto.Profile.dfd6a38c")">{t('auth.confirmPassword')}</label>
                        <input id="t("auto.Profile.dfd6a38c")" type={showConfirmPassword ? "t("auto.Program.1cb251ec")" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={`w-full h-11 px-4 bg-white border rounded-md focus:outline-none focus:ring-4 ${passwordsMatch ? 'border-green-500 focus:border-green-500 focus:ring-green-500/15' : 'border-gray-300 focus:border-primary-green focus:ring-primary-green/15'}`} required />
                        <button type="t("auto.UserFormModal.ce50a093")" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-[38px] text-gray-500">{showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}</button>
                    </div>
                    <div className="t("auto.AdminLayout.b10df59b")">
                        <label className="flex items-center text-sm text-gray-600">
                            <input type="t("auto.Step1_BasicInfo.9fced129")" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="form-checkbox h-4 w-4 text-primary-green rounded" />
                            <span className="ms-2">{t('auth.termsAgreement')}</span>
                        </label>
                    </div>
                    <button type="t("auto.UserFormModal.c79bdf42")" disabled={!agreed || !passwordsMatch} className="w-full h-12 px-8 bg-primary-green text-white font-semibold rounded-md hover:bg-primary-green-hover disabled:bg-gray-400">
                        {t('auth.createAccount')}
                    </button>
                </form>
                <p className="text-center text-sm text-gray-600 mt-6">
                    {t('auth.alreadyHaveAccount')}{' '}
                    <a onClick={() => navigate('/login')} className="font-medium text-primary-green hover:underline cursor-pointer">
                        {t('auth.login')}
                    </a>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
