
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Plus, FileText, Users, TrendingUp, DollarSign, ArrowRight, BarChart, CircleDot, CheckCircle, Clock } from 'lucide-react';
import { RecentAnalysis } from '../types';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../services/apiClient';
import usePageAnimation from '../hooks/usePageAnimation';

interface DashboardStats {
    totalAnalyses: number;
    activeUsers?: number; // Optional for regular users
    successRate: number;
    avgROI: number;
}

const Dashboard: React.FC = () => {
    const { user } = useAuth();
    const { t, language } = useLanguage();
    const navigate = useNavigate();
    const isVisible = usePageAnimation();
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [recentAnalyses, setRecentAnalyses] = useState<RecentAnalysis[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const token = sessionStorage.getItem('token');

                // Fetch stats - no longer passing userId or userRole as query parameters
                // Server will extract this information from the authentication token
                const statsData = await apiRequest<DashboardStats>('GET', '/api/dashboard/stats', undefined, token || undefined);
                setStats(statsData);

                // Fetch recent analyses
                const analysesData = await apiRequest<RecentAnalysis[]>('GET', '/api/dashboard/recent-analyses?count=3', undefined, token || undefined);
                setRecentAnalyses(analysesData);
            } catch (error) {
                console.error('Failed to fetch dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [user]);

    // Filter KPI data based on user role
    const kpiData = [
        {
            title: t('dashboard.totalAnalyses'),
            value: stats?.totalAnalyses.toLocaleString() || '0',
            change: '+12%',
            icon: FileText,
            color: 'text-blue-500',
            bg: 'bg-blue-100'
        },
        // Only show active users for admin/developer roles
        ...(user?.role === 'admin' || user?.role === 'developer' ? [{
            title: t('dashboard.activeUsers'),
            value: stats?.activeUsers?.toLocaleString() || '0',
            change: '+8%',
            icon: Users,
            color: 'text-indigo-500',
            bg: 'bg-indigo-100'
        }] : []),
        {
            title: t('dashboard.successRate'),
            value: stats ? `${stats.successRate}%` : '0%',
            change: '+2.1%',
            icon: TrendingUp,
            color: 'text-emerald-500',
            bg: 'bg-emerald-100'
        },
        {
            title: t('dashboard.avgROI'),
            value: stats ? `${stats.avgROI}%` : '0%',
            change: '+5.3%',
            icon: DollarSign,
            color: 'text-amber-500',
            bg: 'bg-amber-100'
        },
    ];

    const quickActions = [
        { title: t('dashboard.newBusinessAnalysis'), description: t('dashboard.analyzeBusinessIdea'), icon: FileText },
        { title: t('dashboard.marketResearch'), description: t('dashboard.exploreMarket'), icon: BarChart },
        { title: t('dashboard.performanceTracking'), description: t('dashboard.monitorMetrics'), icon: CircleDot },
    ];

    const StatusIcon = ({ status }: { status: RecentAnalysis['status'] }) => {
        if (status === 'Complete') return <CheckCircle className="h-4 w-4 text-green-500" />;
        if (status === 'Processing') return <Clock className="h-4 w-4 text-yellow-500 animate-spin" />;
        return null;
    };

    const getStatusText = (status: RecentAnalysis['status']) => {
        if (status === 'Complete') return t('analyses.complete');
        if (status === 'Processing') return t('analyses.processing');
        return status;
    };

    return (
        <div className={`p-4 sm:p-6 lg:p-8 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="bg-gradient-to-r from-green-600 to-green-800 text-white rounded-lg p-8 mb-8 shadow-lg animate-fadeInUp">
                <h1 className="text-3xl font-bold">{t('dashboard.welcome')}, {user?.name}!</h1>
                <p className="mt-2 text-green-100">{t('dashboard.description')}</p>
                <button
                    onClick={() => navigate('/templates')}
                    className="mt-6 bg-white text-primary-green font-semibold py-2 px-4 rounded-md hover:bg-gray-100 transition flex items-center gap-2 animate-bounceIn animate-delay-200">
                    <Plus size={18} />
                    {t('dashboard.createNewAnalysis')}
                </button>
            </div>

            {/* Dynamic grid based on number of visible KPIs */}
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 ${kpiData.length === 3 ? 'lg:grid-cols-3' :
                kpiData.length === 4 ? 'lg:grid-cols-4' :
                    'lg:grid-cols-3'
                }`}>
                {kpiData.map((item, index) => (
                    <div key={index} className={`bg-card-white p-6 rounded-lg shadow-sm border border-border-color animate-fadeInUp animate-delay-${(index + 1) * 100}`}>
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-text-secondary">{item.title}</p>
                                <p className="text-3xl font-bold text-text-primary mt-1">{item.value}</p>
                                <p className="text-sm text-green-600 font-semibold mt-2">{item.change}</p>
                            </div>
                            <div className={`p-3 rounded-full ${item.bg}`}>
                                <item.icon className={`h-6 w-6 ${item.color}`} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-text-primary">{t('dashboard.recentActivity')}</h2>
                        <button
                            onClick={() => navigate('/my-analyses')}
                            className="text-sm font-medium text-primary-green hover:underline"
                        >
                            {t('dashboard.viewAll')}
                        </button>
                    </div>
                    <div className="bg-card-white p-4 rounded-lg shadow-sm border border-border-color space-y-2 animate-fadeInUp animate-delay-500">
                        {loading ? (
                            <div className="text-center py-8 text-gray-500">{t('common.loading')}</div>
                        ) : recentAnalyses.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                <FileText className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                                <p>{t('analyses.noAnalyses')}</p>
                                <button
                                    onClick={() => navigate('/templates')}
                                    className="mt-4 bg-primary-green text-white px-4 py-2 rounded-md hover:bg-primary-green-hover"
                                >
                                    {t('dashboard.createNewAnalysis')}
                                </button>
                            </div>
                        ) : (
                            recentAnalyses.map((analysis) => (
                                <div
                                    key={analysis.id}
                                    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-md cursor-pointer transition animate-fadeInUp"
                                    onClick={() => navigate(`/report/${analysis.id}`)}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-gray-100 rounded-md"><FileText className="h-5 w-5 text-gray-500" /></div>
                                        <div>
                                            <p className="font-semibold text-text-primary">{analysis.name}</p>
                                            <p className="text-sm text-text-secondary">{analysis.type} &bull; {analysis.date}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="text-center">
                                            <p className="font-bold text-text-primary">{analysis.score}/100</p>
                                            <div className="flex items-center rtl:justify-start gap-1 text-sm text-text-secondary">
                                                <StatusIcon status={analysis.status} />
                                                {getStatusText(analysis.status)}
                                            </div>
                                        </div>
                                        <ArrowRight className={`h-5 w-5 text-gray-400 ${language === 'ar' ? 'scale-x-[-1]' : ''}`} />
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
                <div>
                    <h2 className="text-xl font-bold text-text-primary mb-4">{t('dashboard.quickActions')}</h2>
                    <div className="space-y-4">
                        {quickActions.map((action, index) => (
                            <div key={index} className={`bg-primary-green-bg border border-primary-green-light p-4 rounded-lg flex items-center gap-4 hover:shadow-md transition cursor-pointer animate-fadeInUp animate-delay-${(index + 6) * 100}`} onClick={() => navigate('/templates')}>
                                <div className="p-3 bg-white rounded-full"><action.icon className="h-5 w-5 text-primary-green" /></div>
                                <div>
                                    <p className="font-semibold text-text-primary">{action.title}</p>
                                    <p className="text-sm text-text-secondary">{action.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
