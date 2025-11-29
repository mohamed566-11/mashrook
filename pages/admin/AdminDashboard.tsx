import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Users, FileText, BarChart, Database, Server, AlertTriangle } from 'lucide-react';
import { listUsers } from '../../services/userService';
import { listAnalyses } from '../../services/analysisService';

const StatCard = ({ title, value, change, icon: Icon, iconBg }: { title: string; value: string; change: string; icon: React.ElementType; iconBg: string }) => {
    const { t } = useLanguage();
    return (
        <div className="bg-white p-5 rounded-lg border border-gray-200 flex items-center justify-between">
            <div>
                <p className="text-sm text-gray-500">{t(title)}</p>
                <p className="text-2xl font-bold text-gray-800">{value}</p>
                <p className="text-xs text-green-600 mt-1">{change}</p>
            </div>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${iconBg}`}>
                <Icon className="w-6 h-6 text-white" />
            </div>
        </div>
    );
};

const QuickStat = ({ title, value }: { title: string; value: number }) => {
    const { t } = useLanguage();
    return (
        <div className="flex justify-between items-center py-3 border-b last:border-b-0">
            <p className="text-sm text-gray-600">{t(title)}</p>
            <p className="text-sm font-semibold text-gray-800">{value}</p>
        </div>
    );
};

const AdminDashboard: React.FC = () => {
    const { t } = useLanguage();
    const [stats, setStats] = useState({
        totalUsers: 0,
        activeUsers: 0,
        totalAnalyses: 0,
        adminUsers: 0,
        analysesThisMonth: 0,
    });

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            const token = sessionStorage.getItem('token') || undefined;
            const [users, analyses] = await Promise.all([
                listUsers(token),
                listAnalyses(token),
            ]);

            setStats({
                totalUsers: users.length,
                activeUsers: users.filter((u: any) => u.status === 'Active').length,
                totalAnalyses: analyses.length,
                adminUsers: users.filter((u: any) => u.role === 'admin').length,
                analysesThisMonth: analyses.length,
            });
        } catch (err) {
            console.error('Failed to load stats', err);
        }
    };
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard title="admin.totalUsers" value={String(stats.totalUsers)} change="+0%" icon={Users} iconBg="bg-blue-500" />
                <StatCard title="admin.activeUsers" value={String(stats.activeUsers)} change="+0%" icon={Users} iconBg="bg-indigo-500" />
                <StatCard title="admin.totalAnalyses" value={String(stats.totalAnalyses)} change="+28%" icon={FileText} iconBg="bg-emerald-500" />
                <StatCard title="admin.systemUptime" value="99.9%" change="+0.1%" icon={BarChart} iconBg="bg-amber-500" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-4">{t("admin.systemHealth")}</h3>
                    <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-3">
                        <div className="flex justify-between items-center p-3">
                            <div className="flex items-center gap-3">
                                <Database className="w-5 h-5 text-gray-500" />
                                <span className="font-medium">{t("admin.database")}</span>
                            </div>
                            <span className="text-sm font-semibold text-green-600">{t("admin.healthy")}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                            <div className="flex items-center gap-3">
                                <Server className="w-5 h-5 text-gray-500" />
                                <span className="font-medium">{t("admin.apiServices")}</span>
                            </div>
                            <span className="text-sm font-semibold text-green-600">{t("admin.online")}</span>
                        </div>
                        <div className="flex justify-between items-center p-3">
                            <div className="flex items-center gap-3">
                                <AlertTriangle className="w-5 h-5 text-gray-500" />
                                <span className="font-medium">{t("admin.storage")}</span>
                            </div>
                            <span className="text-sm font-semibold text-yellow-600">{t("admin.storageUsed")}</span>
                        </div>
                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-4">{t("admin.quickStatistics")}</h3>
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <QuickStat title="admin.adminUsers" value={stats.adminUsers} />
                        <QuickStat title="admin.analysesThisMonth" value={stats.analysesThisMonth} />
                        <QuickStat title="admin.deletedUsers" value={0} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;