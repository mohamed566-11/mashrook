import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Save, AlertCircle } from 'lucide-react';

const AdminSettings: React.FC = () => {
    const { language, t } = useLanguage();
    const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

    const showNotification = (type: 'success' | 'error', message: string) => {
        setNotification({ type, message });
        setTimeout(() => setNotification(null), 5000);
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate saving settings
        showNotification('success', t('admin.settings.settingsSaved'));
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
                <h2 className="text-2xl font-bold text-gray-800">{t('admin.settings.title')}</h2>
                <p className="text-gray-600 mt-2">{t('admin.settings.description')}</p>
            </div>

            <form onSubmit={handleSave} className="space-y-8">
                {/* General Settings */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('admin.settings.general')}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t('common.appName')}
                            </label>
                            <input
                                type="text"
                                defaultValue="Mashroo3k Business Analysis"
                                className="w-full h-11 px-4 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-primary-green focus:ring-2 focus:ring-primary-green/20"
                                placeholder={t('common.appName')}
                                aria-label={t('common.appName')}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t('profile.personalInfo')}
                            </label>
                            <select
                                className="w-full h-11 px-4 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-primary-green focus:ring-2 focus:ring-primary-green/20"
                                aria-label={t('profile.personalInfo')}
                            >
                                <option value="en">English</option>
                                <option value="ar">العربية</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Security Settings */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('admin.settings.security')}</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    {t('admin.settings.maintenance')}
                                </label>
                                <p className="text-sm text-gray-500 mt-1">
                                    {t('admin.settings.maintenance')}
                                </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    aria-label={t('admin.settings.maintenance')}
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-green"></div>
                            </label>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    {t('admin.settings.security')}
                                </label>
                                <p className="text-sm text-gray-500 mt-1">
                                    {t('admin.settings.security')}
                                </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    defaultChecked
                                    aria-label={t('admin.settings.security')}
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-green"></div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Notification Settings */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('admin.settings.notifications')}</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    {t('notifications.title')}
                                </label>
                                <p className="text-sm text-gray-500 mt-1">
                                    {t('notifications.title')}
                                </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    defaultChecked
                                    aria-label={t('notifications.title')}
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-green"></div>
                            </label>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    {t('admin.settings.notifications')}
                                </label>
                                <p className="text-sm text-gray-500 mt-1">
                                    {t('admin.settings.notifications')}
                                </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    aria-label={t('admin.settings.notifications')}
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
                        {t('admin.settings.saveChanges')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminSettings;