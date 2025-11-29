import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { X, Eye, EyeOff } from 'lucide-react';

interface UserFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (userData: UserFormData) => Promise<void>;
    editUser?: {
        id: number;
        name: string;
        email: string;
        role: string;
    } | null;
}

export interface UserFormData {
    name: string;
    email: string;
    password?: string;
    role: string;
}

const UserFormModal: React.FC<UserFormModalProps> = ({ isOpen, onClose, onSubmit, editUser }) => {
    const { language, t } = useLanguage();
    const [formData, setFormData] = useState<UserFormData>({
        name: '',
        email: '',
        password: '',
        role: 'user',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (editUser) {
            setFormData({
                name: editUser.name,
                email: editUser.email,
                password: '',
                role: editUser.role,
            });
        } else {
            setFormData({
                name: '',
                email: '',
                password: '',
                role: 'user',
            });
        }
        setError('');
    }, [editUser, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Validation
        if (!formData.name.trim()) {
            setError(t('admin.users.form.nameRequired'));
            return;
        }
        if (!formData.email.trim()) {
            setError(t('admin.users.form.emailRequired'));
            return;
        }
        if (!editUser && !formData.password) {
            setError(t('admin.users.form.passwordRequired'));
            return;
        }
        if (formData.password && formData.password.length < 6) {
            setError(t('admin.users.form.passwordMinLength'));
            return;
        }

        setLoading(true);
        try {
            await onSubmit(formData);
            onClose();
        } catch (err: any) {
            setError(err?.message || t('admin.users.form.failedToSave'));
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-xl font-bold text-gray-900">
                        {editUser ? t('admin.users.form.updateUser') : t('admin.users.form.createUser')}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-gray-100 rounded-full transition"
                        aria-label={t('common.close')}
                    >
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            {t('profile.personalInfo')} <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full h-11 px-4 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-primary-green focus:ring-2 focus:ring-primary-green/20"
                            placeholder={t('admin.users.form.enterFullName')}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            {t('auth.email')} <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full h-11 px-4 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-primary-green focus:ring-2 focus:ring-primary-green/20"
                            placeholder={t('admin.users.form.enterEmail')}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            {t('auth.password')} {!editUser && <span className="text-red-500">*</span>}
                            {editUser && <span className="text-gray-500 text-xs font-normal">{t('admin.users.form.leaveBlank')}</span>}
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full h-11 px-4 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-primary-green focus:ring-2 focus:ring-primary-green/20"
                                placeholder={editUser ? t('admin.users.form.leaveBlank') : t('admin.users.form.enterPassword')}
                                required={!editUser}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                aria-label={showPassword ? t('password.hide') : t('password.show')}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            {t('admin.userManagement')} <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            className="w-full h-11 px-4 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-primary-green focus:ring-2 focus:ring-primary-green/20"
                            required
                            aria-label={t('admin.users.form.roleRequired')}
                        >
                            <option value="user">{t('common.user')}</option>
                            <option value="admin">{t('common.admin')}</option>
                        </select>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            onClick={onClose}
                            className="flex-1 h-11 px-4 border border-gray-300 text-gray-700 font-semibold rounded-md hover:bg-gray-50 transition"
                            disabled={loading}
                            aria-label={t('common.cancel')}
                        >
                            {t('common.cancel')}
                        </button>
                        <button
                            type="submit"
                            className="flex-1 h-11 px-4 bg-primary-green text-white font-semibold rounded-md hover:bg-primary-green-hover transition disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={loading}
                        >
                            {loading ? `${t('common.saving')}...` : editUser ? t('admin.users.form.updateUser') : t('admin.users.form.createUser')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserFormModal;
