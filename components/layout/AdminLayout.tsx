import React, { useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import EnhancedHeader from './EnhancedHeader';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, Users, FileText, Globe, Settings, History } from 'lucide-react';
import useHeaderHeight from '../../hooks/useHeaderHeight';
import ScrollOffset from '../common/ScrollOffset';

const AdminLayout: React.FC = () => {
    const { language, t } = useLanguage();
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const headerHeight = useHeaderHeight();

    useEffect(() => {
        if (!loading && (!user || user.role !== 'admin')) {
            navigate('/dashboard'); // or to an unauthorized page
        }
    }, [user, loading, navigate]);

    if (loading) {
        return <div className="flex items-center justify-center h-screen">{t('common.loading')}</div>;
    }

    if (!user || user.role !== 'admin') {
        return null;
    }

    const navLinkClass = ({ isActive }: { isActive: boolean }) =>
        `flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-md transition-colors ${isActive
            ? 'bg-primary-green-light text-primary-green-hover'
            : 'text-gray-600 hover:bg-gray-100'
        }`;

    const adminNavLinks = [
        { to: "/admin/overview", icon: LayoutDashboard, text: t('common.adminOverview') },
        { to: "/admin/users", icon: Users, text: t('common.adminUsers') },
        { to: "/admin/templates", icon: FileText, text: t('common.adminTemplates') },
        { to: "/admin/website", icon: Globe, text: t('common.adminWebsite') },
        { to: "/admin/settings", icon: Settings, text: t('common.adminSettings') },
        { to: "/admin/logs", icon: History, text: t('common.adminActivityLogs') },
    ];

    return (
        <div className="min-h-screen bg-background">
            <EnhancedHeader />
            <div style={{ paddingTop: `var(--header-height, 100px)` }} className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <ScrollOffset />
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-text-primary">{t('common.adminPanel')}</h1>
                    <p className="text-text-secondary mt-1">{t('common.manageBusinessPlatform')}</p>
                </div>
                <div className="bg-card-white rounded-lg shadow-sm border border-border-color p-2">
                    <div className="flex items-center border-b border-border-color">
                        {adminNavLinks.map(link => (
                            <NavLink key={link.to} to={link.to} className={({ isActive }) => `flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-500 hover:text-text-primary border-b-2 ${isActive ? 'border-primary-green text-primary-green' : 'border-transparent'}`}>
                                <link.icon size={16} />
                                {link.text}
                            </NavLink>
                        ))}
                    </div>
                    <div className="p-6">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;