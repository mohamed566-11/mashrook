import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Save, AlertCircle, Globe, Palette, Smartphone } from 'lucide-react';

const AdminWebsite: React.FC = () => {
    const { t } = useLanguage();
    const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

    const showNotification = (type: 'success' | 'error', message: string) => {
        setNotification({ type, message });
        setTimeout(() => setNotification(null), 5000);
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate saving website settings
        showNotification('success', t('admin.website.settingsSaved'));
    };

    return (
        <div className="max-w-4xl mx-auto">
            {/* Notification */}
            {notification && (
                <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 animate-slide-in ${notification.type === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                    }`}>
                    {notification.type === 'success' ? (
                        <AlertCircle className="text-green-600" size={20} />
                    ) : (
                        <AlertCircle className="text-red-600" size={20} />
                    )}
                    <span className={notification.type === 'success' ? 'text-green-800' : 'text-red-800'}>
                        {notification.message}
                    </span>
                </div>
            )}

            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800">{t('admin.website.title')}</h2>
                <p className="text-gray-600 mt-2">{t('admin.website.description')}</p>
            </div>

            <form onSubmit={handleSave} className="space-y-8">
                {/* General Website Settings */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Globe className="text-gray-600" size={20} />
                        <h3 className="text-lg font-semibold text-gray-800">{t('admin.website.general')}</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t('admin.website.siteName')}
                            </label>
                            <input
                                type="text"
                                defaultValue="Mashroo3k Business Analysis"
                                className="w-full h-11 px-4 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-primary-green focus:ring-2 focus:ring-primary-green/20"
                                placeholder={t('admin.website.siteName')}
                                aria-label={t('admin.website.siteName')}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t('admin.website.siteDescription')}
                            </label>
                            <input
                                type="text"
                                defaultValue="AI-powered business analysis platform"
                                className="w-full h-11 px-4 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-primary-green focus:ring-2 focus:ring-primary-green/20"
                                placeholder={t('admin.website.siteDescription')}
                                aria-label={t('admin.website.siteDescription')}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t('admin.website.siteUrl')}
                            </label>
                            <input
                                type="url"
                                defaultValue="https://mashroo3k.com"
                                className="w-full h-11 px-4 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-primary-green focus:ring-2 focus:ring-primary-green/20"
                                placeholder={t('admin.website.siteUrl')}
                                aria-label={t('admin.website.siteUrl')}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t('admin.website.adminEmail')}
                            </label>
                            <input
                                type="email"
                                defaultValue="admin@mashroo3k.com"
                                className="w-full h-11 px-4 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-primary-green focus:ring-2 focus:ring-primary-green/20"
                                placeholder={t('admin.website.adminEmail')}
                                aria-label={t('admin.website.adminEmail')}
                            />
                        </div>
                    </div>
                </div>

                {/* Appearance Settings */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Palette className="text-gray-600" size={20} />
                        <h3 className="text-lg font-semibold text-gray-800">{t('admin.website.appearance')}</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t('admin.website.primaryColor')}
                            </label>
                            <div className="flex items-center gap-3">
                                <input
                                    type="color"
                                    defaultValue="#10b981"
                                    className="w-12 h-11 border border-gray-300 rounded-md cursor-pointer"
                                    aria-label={t('admin.website.primaryColor')}
                                />
                                <input
                                    type="text"
                                    defaultValue="#10b981"
                                    className="flex-1 h-11 px-4 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-primary-green focus:ring-2 focus:ring-primary-green/20"
                                    placeholder={t('admin.website.primaryColor')}
                                    aria-label={t('admin.website.primaryColor')}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t('admin.website.secondaryColor')}
                            </label>
                            <div className="flex items-center gap-3">
                                <input
                                    type="color"
                                    defaultValue="#059669"
                                    className="w-12 h-11 border border-gray-300 rounded-md cursor-pointer"
                                    aria-label={t('admin.website.secondaryColor')}
                                />
                                <input
                                    type="text"
                                    defaultValue="#059669"
                                    className="flex-1 h-11 px-4 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-primary-green focus:ring-2 focus:ring-primary-green/20"
                                    placeholder={t('admin.website.secondaryColor')}
                                    aria-label={t('admin.website.secondaryColor')}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t('admin.website.logo')}
                            </label>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-11 bg-gray-200 rounded-md flex items-center justify-center">
                                    <Globe className="text-gray-600" size={20} />
                                </div>
                                <button
                                    type="button"
                                    className="flex-1 h-11 px-4 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:border-primary-green focus:ring-2 focus:ring-primary-green/20 text-sm font-medium"
                                    aria-label={t('admin.website.uploadLogo')}
                                >
                                    {t('admin.website.uploadLogo')}
                                </button>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t('admin.website.favicon')}
                            </label>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-11 bg-gray-200 rounded-md flex items-center justify-center">
                                    <Globe className="text-gray-600" size={16} />
                                </div>
                                <button
                                    type="button"
                                    className="flex-1 h-11 px-4 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:border-primary-green focus:ring-2 focus:ring-primary-green/20 text-sm font-medium"
                                    aria-label={t('admin.website.uploadFavicon')}
                                >
                                    {t('admin.website.uploadFavicon')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* SEO Settings */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Smartphone className="text-gray-600" size={20} />
                        <h3 className="text-lg font-semibold text-gray-800">{t('admin.website.seo')}</h3>
                    </div>
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t('admin.website.metaDescription')}
                            </label>
                            <textarea
                                rows={3}
                                defaultValue="Transform your business ideas into successful ventures with AI-powered analysis and insights."
                                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-primary-green focus:ring-2 focus:ring-primary-green/20"
                                placeholder={t('admin.website.metaDescription')}
                                aria-label={t('admin.website.metaDescription')}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t('admin.website.keywords')}
                            </label>
                            <input
                                type="text"
                                defaultValue="business analysis, AI, startup, entrepreneurship, market research"
                                className="w-full h-11 px-4 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-primary-green focus:ring-2 focus:ring-primary-green/20"
                                placeholder={t('admin.website.keywords')}
                                aria-label={t('admin.website.keywords')}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    {t('admin.website.searchIndexing')}
                                </label>
                                <p className="text-sm text-gray-500 mt-1">
                                    {t('admin.website.searchIndexingDesc')}
                                </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    defaultChecked
                                    aria-label={t('admin.website.searchIndexing')}
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-green"></div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="h-11 px-6 bg-primary-green text-white font-semibold rounded-md hover:bg-primary-green-hover flex items-center gap-2 transition"
                    >
                        <Save size={18} />
                        {t('admin.website.saveChanges')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminWebsite;