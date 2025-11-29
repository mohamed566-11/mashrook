import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, Save, AlertCircle, CheckCircle } from 'lucide-react';
import { apiRequest } from '../services/apiClient';

interface ProfileData {
    name: string;
    email: string;
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

const Profile: React.FC = () => {
    const { language, t } = useLanguage();
    const { user, login } = useAuth();
    const [formData, setFormData] = useState<ProfileData>({
        name: user?.name || '',
        email: user?.email || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                name: user.name,
                email: user.email
            }));
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = t('profile.nameRequired');
        }

        if (!formData.email.trim()) {
            newErrors.email = t('profile.emailRequired');
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = t('profile.emailInvalid');
        }

        if (formData.newPassword) {
            if (!formData.currentPassword) {
                newErrors.currentPassword = t('profile.currentPasswordRequired');
            }
            if (formData.newPassword.length < 6) {
                newErrors.newPassword = t('profile.newPasswordMin');
            }
            if (formData.newPassword !== formData.confirmPassword) {
                newErrors.confirmPassword = t('profile.passwordsMismatch');
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;
        if (!user?.id) return;

        setLoading(true);
        setMessage(null);

        try {
            const token = sessionStorage.getItem('token');
            const updateData: any = {
                name: formData.name,
                email: formData.email
            };

            if (formData.newPassword) {
                updateData.currentPassword = formData.currentPassword;
                updateData.newPassword = formData.newPassword;
            }

            const response = await apiRequest(
                'PUT',
                `/api/users/${user.id}/profile`,
                updateData,
                token || undefined
            );

            // Update session storage with new user data
            const updatedUser = { ...user, name: formData.name, email: formData.email };
            sessionStorage.setItem('user', JSON.stringify(updatedUser));

            setMessage({ type: 'success', text: t('profile.profileUpdated') });

            // Clear password fields
            setFormData(prev => ({
                ...prev,
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            }));

            // If password was changed, show additional message
            if (formData.newPassword) {
                setTimeout(() => {
                    setMessage({ type: 'success', text: t('profile.passwordChanged') });
                }, 2000);
            }

        } catch (error: any) {
            console.error('Failed to update profile:', error);
            setMessage({
                type: 'error',
                text: error?.message || t('profile.updateFailed')
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">{t('profile.myProfile')}</h1>
                <p className="text-gray-500 mt-1">{t('profile.manageAccount')}</p>
            </div>

            {message && (
                <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${message.type === 'success'
                    ? 'bg-green-50 border border-green-200 text-green-800'
                    : 'bg-red-50 border border-red-200 text-red-800'
                    }`}>
                    {message.type === 'success' ? (
                        <CheckCircle className="w-5 h-5" />
                    ) : (
                        <AlertCircle className="w-5 h-5" />
                    )}
                    <span>{message.text}</span>
                </div>
            )}

            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Personal Information */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('profile.personalInfo')}</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <User className="inline w-4 h-4 me-2" />
                                    {t('auth.fullName')}
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`w-full h-11 px-4 border rounded-md ${errors.name ? 'border-red-300' : 'border-gray-300'
                                        } focus:outline-none focus:ring-2 focus:ring-primary-green/20`}
                                    placeholder={t('auth.fullName')}
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <Mail className="inline w-4 h-4 me-2" />
                                    {t('auth.email')}
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full h-11 px-4 border rounded-md ${errors.email ? 'border-red-300' : 'border-gray-300'
                                        } focus:outline-none focus:ring-2 focus:ring-primary-green/20`}
                                    placeholder={t('auth.email')}
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                                )}
                            </div>

                            <div className="text-sm">
                                <p className="text-sm text-gray-500">
                                    <strong>{t('profile.role')}:</strong> {user?.role === 'admin' ? t('profile.administrator') : t('profile.user')}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Change Password */}
                    <div className="border-t pt-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('profile.changePassword')}</h2>
                        <p className="text-sm text-gray-500 mb-4">{t('profile.leaveBlank')}</p>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <Lock className="inline w-4 h-4 me-2" />
                                    {t('profile.currentPassword')}
                                </label>
                                <input
                                    type="password"
                                    name="currentPassword"
                                    value={formData.currentPassword}
                                    onChange={handleChange}
                                    className={`w-full h-11 px-4 border rounded-md ${errors.currentPassword ? 'border-red-300' : 'border-gray-300'
                                        } focus:outline-none focus:ring-2 focus:ring-primary-green/20`}
                                    placeholder={t('profile.currentPassword')}
                                />
                                {errors.currentPassword && (
                                    <p className="mt-1 text-sm text-red-600">{errors.currentPassword}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <Lock className="inline w-4 h-4 me-2" />
                                    {t('profile.newPassword')}
                                </label>
                                <input
                                    type="password"
                                    name="newPassword"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                    className={`w-full h-11 px-4 border rounded-md ${errors.newPassword ? 'border-red-300' : 'border-gray-300'
                                        } focus:outline-none focus:ring-2 focus:ring-primary-green/20`}
                                    placeholder={t('profile.newPassword')}
                                />
                                {errors.newPassword && (
                                    <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <Lock className="inline w-4 h-4 me-2" />
                                    {t('profile.confirmNewPassword')}
                                </label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className={`w-full h-11 px-4 border rounded-md ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                                        } focus:outline-none focus:ring-2 focus:ring-primary-green/20`}
                                    placeholder={t('profile.confirmNewPassword')}
                                />
                                {errors.confirmPassword && (
                                    <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="border-t pt-6">
                        <button
                            type="submit"
                            disabled={loading}
                            className="h-11 px-6 bg-primary-green text-white font-semibold rounded-md hover:bg-primary-green-hover disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            <Save className="w-4 h-4" />
                            {loading ? t('profile.saving') : t('profile.saveChanges')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;
