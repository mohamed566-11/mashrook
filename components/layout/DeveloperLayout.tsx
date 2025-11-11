import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import Header from './Header';
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

const DeveloperLayout: React.FC = () => {
  const { language } = useLanguage();
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && (!user || user.role !== 'developer')) {
            navigate('/dashboard');
        }
    }, [user, loading, navigate]);

    if (loading) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>;
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
        { to: "/developer/dashboard", icon: LayoutDashboard, text: "t("common.dashboard")" },
        { to: "/developer/templates", icon: FileText, text: "t("admin.templateManagement")" },
        { to: "/developer/users", icon: Users, text: "t("admin.userManagement")" },
        { to: "/developer/api-keys", icon: Key, text: "t("developer.apiKeys")" },
        { to: "/developer/database", icon: Database, text: "t("admin.database")" },
        { to: "/developer/system", icon: Settings, text: "t("admin.systemSettings")" },
        { to: "/developer/logs", icon: Activity, text: "t("admin.activityLogs")" },
        { to: "/developer/tools", icon: Code, text: "t("developer.developerTools")" },
    ];

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <div className="pt-[70px] max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="t("auto.AdminLayout.b10df59b")">
                    <h1 className="text-3xl font-bold text-text-primary">Developer Control Panel</h1>
                    <p className="text-text-secondary mt-1">Full administrative access to all system components</p>
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
                    <div className="t("auto.AdminLayout.6adb5be9")">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeveloperLayout;