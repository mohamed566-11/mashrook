import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Filter, Download, Trash2, Search, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

interface LogEntry {
    id: string;
    timestamp: string;
    level: 'info' | 'warn' | 'error' | 'debug';
    message: string;
    source: string;
    userId?: string;
}

const DeveloperLogs: React.FC = () => {
    const { language, t } = useLanguage();
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [filteredLogs, setFilteredLogs] = useState<LogEntry[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [levelFilter, setLevelFilter] = useState<string>('all');
    const [sourceFilter, setSourceFilter] = useState<string>('all');
    const [loading, setLoading] = useState(true);

    // Mock data for demonstration
    const mockLogs: LogEntry[] = [
        {
            id: '1',
            timestamp: '2023-06-20T14:30:22.123Z',
            level: 'info',
            message: 'User john@example.com logged in successfully',
            source: 't("auto.DeveloperLogs.f33a1d77")',
            userId: 'user-123'
        },
        {
            id: '2',
            timestamp: '2023-06-20T14:29:45.456Z',
            level: 'error',
            message: 't("auto.DeveloperLogs.d66f8bd9")',
            source: 't("auto.DeveloperLogs.66daa9bd")',
        },
        {
            id: '3',
            timestamp: '2023-06-20T14:28:12.789Z',
            level: 'warn',
            message: 'High memory usage detected: 85% of available memory in use',
            source: 't("auto.DeveloperLogs.f12a3e09")',
        },
        {
            id: '4',
            timestamp: '2023-06-20T14:27:33.012Z',
            level: 'debug',
            message: 't("auto.DeveloperLogs.c62bc59b")',
            source: 't("auto.DeveloperLogs.8295eefe")',
        },
        {
            id: '5',
            timestamp: '2023-06-20T14:26:55.345Z',
            level: 'info',
            message: 'New template "Business Plan" created by admin@mashroo3k.com',
            source: 't("auto.DeveloperLogs.8295eefe")',
            userId: 'admin-456'
        },
        {
            id: '6',
            timestamp: '2023-06-20T14:25:17.678Z',
            level: 'error',
            message: 'API key validation failed for request from 192.168.1.100',
            source: 't("auto.DeveloperLogs.677e02b2")',
        },
        {
            id: '7',
            timestamp: '2023-06-20T14:24:44.901Z',
            level: 'info',
            message: 't("auto.DeveloperLogs.30565460")',
            source: 't("auto.DeveloperLogs.67676a01")',
        },
        {
            id: '8',
            timestamp: '2023-06-20T14:23:22.234Z',
            level: 'warn',
            message: 't("auto.DeveloperLogs.c33672fc")',
            source: 't("auto.DeveloperLogs.123fd323")',
            userId: 'user-789'
        },
    ];

    const sources = ['all', 't("auto.DeveloperLogs.f33a1d77")', 't("auto.DeveloperLogs.66daa9bd")', 't("auto.DeveloperLogs.f12a3e09")', 't("auto.DeveloperLogs.8295eefe")', 't("auto.DeveloperLogs.677e02b2")', 't("auto.DeveloperLogs.67676a01")', 't("auto.DeveloperLogs.123fd323")'];

    useEffect(() => {
        loadLogs();
    }, []);

    useEffect(() => {
        filterLogs();
    }, [logs, searchTerm, levelFilter, sourceFilter]);

    const loadLogs = async () => {
        try {
            setLoading(true);
            // Simulate API call
            setTimeout(() => {
                setLogs(mockLogs);
                setLoading(false);
            }, 500);
        } catch (err) {
            console.error('Failed to load logs', err);
            setLoading(false);
        }
    };

    const filterLogs = () => {
        let result = logs;

        // Apply search filter
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            result = result.filter(log =>
                log.message.toLowerCase().includes(term) ||
                log.source.toLowerCase().includes(term) ||
                (log.userId && log.userId.toLowerCase().includes(term))
            );
        }

        // Apply level filter
        if (levelFilter !== 'all') {
            result = result.filter(log => log.level === levelFilter);
        }

        // Apply source filter
        if (sourceFilter !== 'all') {
            result = result.filter(log => log.source === sourceFilter);
        }

        setFilteredLogs(result);
    };

    const handleClearLogs = () => {
        if (window.confirm(t('developer.confirmClearLogs'))) {
            setLogs([]);
            setFilteredLogs([]);
        }
    };

    const handleExportLogs = () => {
        alert('Exporting logs... This would download a file with the current logs in a real implementation.');
    };

    const getLevelIcon = (level: string) => {
        switch (level) {
            case 'error':
                return <AlertCircle className="text-red-500" size={16} />;
            case 'warn':
                return <AlertTriangle className="text-yellow-500" size={16} />;
            case 'info':
                return <Info className="text-blue-500" size={16} />;
            case 'debug':
                return <Info className="text-gray-500" size={16} />;
            default:
                return <Info className="text-gray-500" size={16} />;
        }
    };

    const getLevelBadgeClass = (level: string) => {
        switch (level) {
            case 'error':
                return 'bg-red-100 text-red-800';
            case 'warn':
                return 'bg-yellow-100 text-yellow-800';
            case 'info':
                return 'bg-blue-100 text-blue-800';
            case 'debug':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const formatTimestamp = (timestamp: string) => {
        return new Date(timestamp).toLocaleString();
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
            </div>
        );
    }

    return (
        <div className={t("auto.AdminLayout.6adb5be9")}>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">{t('developer.activityLogs')}</h1>
                    <p className="text-gray-600 mt-1">{t('developer.monitorSystemActivity')}</p>
                </div>
                <div className={t("auto.AdminLogs.9edfbb10")}>
                    <button
                        onClick={handleExportLogs}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                    >
                        <Download size={16} />
                        {t('developer.exportLogs')}
                    </button>
                    <button
                        onClick={handleClearLogs}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                    >
                        <Trash2 size={16} />
                        {t('developer.clearLogs')}
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-2">
                        <div className={t("auto.UserFormModal.99c483e1")}>
                            <div className="absolute inset-y-0 left-0 ps-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder={t("developer.searchLogs")}
                                className="block w-full ps-10 pe-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                aria-label={t("auto.DeveloperLogs.007267b2")}
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor={t("auto.DeveloperLogs.f9cf4cc9")} className="block text-sm font-medium text-gray-700 mb-1">
                            {t('developer.level')}
                        </label>
                        <select
                            id={t("auto.DeveloperLogs.f9cf4cc9")}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={levelFilter}
                            onChange={(e) => setLevelFilter(e.target.value)}
                            aria-label={t("developer.filterByLevel")}
                        >
                            <option value="all">{t('developer.allLevels')}</option>
                            <option value="info">Info</option>
                            <option value="warn">Warning</option>
                            <option value="error">Error</option>
                            <option value="debug">{t('developer.debug')}</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor={t("auto.DeveloperLogs.2348e476")} className="block text-sm font-medium text-gray-700 mb-1">
                            {t('developer.source')}
                        </label>
                        <select
                            id={t("auto.DeveloperLogs.2348e476")}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={sourceFilter}
                            onChange={(e) => setSourceFilter(e.target.value)}
                            aria-label={t("developer.filterBySource")}
                        >
                            {sources.map(source => (
                                <option key={source} value={source}>
                                    {source === 'all' ? t('developer.allSources') : source}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className={t("auto.DeveloperApiKeys.fb222b7a")}>
                        <thead>
                            <tr>
                                <th scope={t("auto.DeveloperApiKeys.d89e2ddb")} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {t('developer.timestamp')}
                                </th>
                                <th scope={t("auto.DeveloperApiKeys.d89e2ddb")} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {t('developer.level')}
                                </th>
                                <th scope={t("auto.DeveloperApiKeys.d89e2ddb")} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {t('developer.source')}
                                </th>
                                <th scope={t("auto.DeveloperApiKeys.d89e2ddb")} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {t('developer.message')}
                                </th>
                                <th scope={t("auto.DeveloperApiKeys.d89e2ddb")} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {t('developer.user')}
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredLogs.map((log) => (
                                <tr key={log.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {formatTimestamp(log.timestamp)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            {getLevelIcon(log.level)}
                                            <span className={`ms-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getLevelBadgeClass(log.level)}`}>
                                                {log.level}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {log.source}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900">
                                        {log.message}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {log.userId || 'System'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredLogs.length === 0 && (
                    <div className="text-center py-12">
                        <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">{t('developer.noLogsFound')}</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            {t('developer.adjustSearchCriteria')}
                        </p>
                    </div>
                )}
            </div>

            <div className="mt-6 flex justify-between items-center">
                <div className="text-sm text-gray-500">
                    {t('developer.showingLogs', { count: filteredLogs.length, total: logs.length })}
                </div>
                <div className="flex space-x-2">
                    <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                        Previous
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeveloperLogs;