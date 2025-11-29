import React, { useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Outlet, useNavigate } from 'react-router-dom';
import EnhancedHeader from './EnhancedHeader';
import Footer from './Footer';
import { useAuth } from '../../context/AuthContext';
import useHeaderHeight from '../../hooks/useHeaderHeight';
import ScrollOffset from '../common/ScrollOffset';

const MainLayout: React.FC = () => {
    const { language, t } = useLanguage();
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const headerHeight = useHeaderHeight();

    useEffect(() => {
        if (!loading && !user) {
            navigate('/login');
        }
    }, [user, loading, navigate]);

    if (loading) {
        return <div className="flex items-center justify-center h-screen">{t('common.loading')}</div>;
    }

    if (!user) {
        return null; // or a loading spinner, this prevents rendering children before redirect
    }

    return (
        <div className="min-h-screen bg-background text-text-primary flex flex-col">
            <EnhancedHeader />
            <main className="flex-grow p-4 md:p-8 bg-gray-50" style={{ paddingTop: `calc(var(--header-height, 100px) + 1rem)` }}>
                <ScrollOffset />
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;