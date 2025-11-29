import React, { useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import EnhancedHeader from './EnhancedHeader';
import { useAuth } from '../../context/AuthContext';
import {
    LayoutDashboard,
    FileText,
    Users,
    Key,
    Settings,
    Code,
    Database,
    Activity
} from 'lucide-react';
import useHeaderHeight from '../../hooks/useHeaderHeight';
import ScrollOffset from '../common/ScrollOffset';

const DeveloperLayout: React.FC = () => {
    const { language, t } = useLanguage();
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const headerHeight = useHeaderHeight();

    useEffect(() => {
        if (!loading && (!user || user.role !== 'developer')) {
            navigate('/dashboard');
        }
    }, [user, loading, navigate]);

    if (loading) {
        return <div className="flex items-center justify-center h-screen">{t('common.loading')}</div>;
    }

    if (!user || user.role !== 'developer') {
        return null;
    }

    const navLinkClass = ({ isActive }: { isActive: boolean }) =>
        `flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-md transition-colors ${isActive
            ? 'bg-primary-green-light text-primary-green-hover'
            : 'text-gray-600 hover:bg-gray-100'
        }`;

    const developerNavLinks = [
        { to: "/developer/dashboard", icon: LayoutDashboard, text: t('common.dashboard') },
        { to: "/developer/templates", icon: FileText, text: t('developer.templateManagement') },
        { to: "/developer/users", icon: Users, text: t('developer.userManagement') },
        { to: "/developer/api-keys", icon: Key, text: t('developer.apiKeys') },
        { to: "/developer/database", icon: Database, text: t('developer.database') },
        { to: "/developer/system", icon: Settings, text: t('developer.systemSettings') },
        { to: "/developer/logs", icon: Activity, text: t('developer.activityLogs') },
        { to: "/developer/tools", icon: Code, text: t('developer.developerTools') },
    ];

    return (
        <div className="min-h-screen bg-background">
            <EnhancedHeader />
            <div style={{ paddingTop: `var(--header-height, 100px)` }} className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <ScrollOffset />
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-text-primary">{t('developer.controlPanel')}</h1>
                    <p className="text-text-secondary mt-1">{t('developer.fullAccess')}</p>
                </div>
                <div className="bg-card-white rounded-lg shadow-sm border border-border-color p-2">
                    <div className="flex items-center border-b border-border-color overflow-x-auto">
                        {developerNavLinks.map(link => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                className={({ isActive }) => `flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-500 hover:text-text-primary border-b-2 whitespace-nowrap ${isActive ? 'border-primary-green text-primary-green' : 'border-transparent'
                                    }`}
                            >
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

export default DeveloperLayout;