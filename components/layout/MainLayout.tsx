
import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from './Header';
import { useAuth } from '../../context/AuthContext';

const MainLayout: React.FC = () => {
  const { language } = useLanguage();
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !user) {
            navigate('/login');
        }
    }, [user, loading, navigate]);

    if (loading) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }

    if (!user) {
        return null; // or a loading spinner, this prevents rendering children before redirect
    }

    return (
        <div className="min-h-screen bg-background text-text-primary">
            <Header />
            <main className="t("auto.MainLayout.a03da62c")">
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;
