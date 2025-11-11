
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { FileText, Search, Filter, Download, RefreshCw, Trash2, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';
import { apiRequest } from '../../services/apiClient';

interface ActivityLog {
    id: number;
    action: string;
    entityType: string;
    entityId: number | null;
    description: string;
    details: string | null;
    ipAddress: string;
    userAgent: string;
    createdAt: string;
    severity: string;
    userId: number | null;
    userName: string | null;
    userEmail: string | null;
}

interface LogStats {
    todayCount: number;
    last7DaysCount: number;
    last30DaysCount: number;
    totalCount: number;
    errorCount: number;
    warningCount: number;
}

const AdminLogs: React.FC = () => {
  const { language } = useLanguage();
    const [logs, setLogs] = useState<ActivityLog[]>([]);
    const [stats, setStats] = useState<LogStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [actionFilter, setActionFilter] = useState<string>('');
    const [severityFilter, setSeverityFilter] = useState<string>('');
    const [actions, setActions] = useState<string[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [pageSize] = useState(50);
    const [autoRefresh, setAutoRefresh] = useState(true);
    const [refreshInterval, setRefreshInterval] = useState(5); // seconds
    const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
    const [newLogsCount, setNewLogsCount] = useState(0);
    const [selectedLog, setSelectedLog] = useState<ActivityLog | null>(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    const fetchLogs = async (silent = false) => {
        try {
            if (!silent) setLoading(true);
            const token = sessionStorage.getItem('token');
            const params = new URLSearchParams({
                page: page.toString(),
                pageSize: pageSize.toString(),
            });

            if (searchTerm) params.append('searchTerm', searchTerm);
            if (actionFilter) params.append('action', actionFilter);
            if (severityFilter) params.append('severity', severityFilter);

            const response = await apiRequest<any>('GET', `/api/activitylogs?${params}`, undefined, token || undefined);

            // Detect new logs
            if (logs.length > 0 && response.logs.length > 0) {
                const latestExistingId = logs[0]?.id || 0;
                const newLogs = response.logs.filter((log: ActivityLog) => log.id > latestExistingId);
                if (newLogs.length > 0) {
                    setNewLogsCount(newLogs.length);
                    // Auto-scroll notification could be added here
                }
            }

            setLogs(response.logs);
            setTotal(response.total);
            setLastUpdated(new Date());
        } catch (error) {
            console.error('Failed to fetch logs:', error);
        } finally {
            if (!silent) setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const token = sessionStorage.getItem('token');
            const response = await apiRequest<LogStats>('GET', '/api/activitylogs/stats', undefined, token || undefined);
            setStats(response);
        } catch (error) {
            console.error('Failed to fetch stats:', error);
        }
    };

    const fetchActions = async () => {
        try {
            const token = sessionStorage.getItem('token');
            const response = await apiRequest<string[]>('GET', '/api/activitylogs/actions', undefined, token || undefined);
            setActions(response);
        } catch (error) {
            console.error('Failed to fetch actions:', error);
        }
    };

    const clearOldLogs = async () => {
        if (!confirm('Are you sure you want to delete logs older than 90 days?')) return;

        try {
            const token = sessionStorage.getItem('token');
            await apiRequest('DELETE', '/api/activitylogs/clear?daysToKeep=90', undefined, token || undefined);
            alert('Old logs cleared successfully');
            fetchLogs();
            fetchStats();
        } catch (error) {
            console.error('Failed to clear logs:', error);
            alert('Failed to clear old logs');
        }
    };

    // Auto-refresh effect
    useEffect(() => {
        if (!autoRefresh) return;

        const interval = setInterval(() => {
            fetchLogs(true); // Silent refresh
            fetchStats();
        }, refreshInterval * 1000);

        return () => clearInterval(interval);
    }, [autoRefresh, refreshInterval, page, searchTerm, actionFilter, severityFilter]);

    // Initial load and filter changes
    useEffect(() => {
        fetchLogs();
        fetchStats();
        fetchActions();
    }, [page, actionFilter, severityFilter]);

    useEffect(() => {
        const debounce = setTimeout(() => {
            if (searchTerm !== undefined) {
                setPage(1);
                fetchLogs();
            }
        }, 500);

        return () => clearTimeout(debounce);
    }, [searchTerm]);

    const getSeverityIcon = (severity: string) => {
        switch (severity.toLowerCase()) {
            case 'error':
            case 'critical':
                return <AlertCircle className="w-4 h-4 text-red-600" />;
            case 'warning':
                return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
            case 'info':
            default:
                return <Info className="w-4 h-4 text-blue-600" />;
        }
    };

    const getSeverityColor = (severity: string) => {
        switch (severity.toLowerCase()) {
            case 'error':
            case 'critical':
                return 'bg-red-50 border-red-200 text-red-800';
            case 'warning':
                return 'bg-yellow-50 border-yellow-200 text-yellow-800';
            case 'info':
            default:
                return 'bg-blue-50 border-blue-200 text-blue-800';
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        }) + ' ' + date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });
    };

    const deleteLog = async (logId: number, e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent opening modal when clicking delete

        if (!confirm('Are you sure you want to delete this activity log? This action cannot be undone.')) {
            return;
        }

        try {
            const token = sessionStorage.getItem('token');
            await apiRequest('DELETE', `/api/activitylogs/${logId}`, undefined, token || undefined);

            // Remove from local state
            setLogs(prev => prev.filter(log => log.id !== logId));
            setTotal(prev => prev - 1);

            // Refresh stats
            fetchStats();
        } catch (error) {
            console.error('Failed to delete log:', error);
            alert('Failed to delete activity log. Please try again.');
        }
    };

    const openDetailsModal = (log: ActivityLog) => {
        setSelectedLog(log);
        setShowDetailsModal(true);
    };

    const closeDetailsModal = () => {
        setShowDetailsModal(false);
        setSelectedLog(null);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">Admin Activity Logs</h2>
                    <p className="text-sm text-gray-500">Track all administrative actions and system changes</p>
                    <div className="flex items-center gap-2 mt-2">
                        {autoRefresh && (
                            <span className="flex items-center gap-1 text-xs text-green-600">
                                <span className="animate-pulse">●</span>
                                Live (updates every {refreshInterval}s)
                            </span>
                        )}
                        <span className="text-xs text-gray-400">
                            Last updated: {lastUpdated.toLocaleTimeString()}
                        </span>
                        {newLogsCount > 0 && (
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-medium">
                                +{newLogsCount} new
                            </span>
                        )}
                    </div>
                </div>
                <div className="t("auto.AdminLogs.9edfbb10")">
                    <div className="flex items-center gap-2 me-2">
                        <label className="flex items-center gap-2 text-sm text-gray-700">
                            <input
                                type="t("auto.Step1_BasicInfo.9fced129")"
                                checked={autoRefresh}
                                onChange={(e) => {
                                    setAutoRefresh(e.target.checked);
                                    if (e.target.checked) {
                                        fetchLogs();
                                        fetchStats();
                                    }
                                }}
                                className="rounded border-gray-300 text-primary-green focus:ring-primary-green"
                            />
                            Auto-refresh
                        </label>
                        {autoRefresh && (
                            <select
                                value={refreshInterval}
                                onChange={(e) => setRefreshInterval(Number(e.target.value))}
                                className="h-8 px-2 border border-gray-300 rounded text-xs"
                                aria-label="t("auto.AdminLogs.0ea33efb")"
                            >
                                <option value="3">3s</option>
                                <option value="5">5s</option>
                                <option value="10">10s</option>
                                <option value="30">30s</option>
                                <option value="60">60s</option>
                            </select>
                        )}
                    </div>
                    <button
                        onClick={() => {
                            fetchLogs();
                            fetchStats();
                            setNewLogsCount(0);
                        }}
                        className="h-10 px-4 bg-white border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 flex items-center gap-2"
                    >
                        <RefreshCw className="t("auto.ConfirmationModal.1bbd1cd2")" />
                        Refresh
                    </button>
                    <button
                        onClick={clearOldLogs}
                        className="h-10 px-4 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 flex items-center gap-2"
                    >
                        <Trash2 className="t("auto.ConfirmationModal.1bbd1cd2")" />
                        Clear Old Logs
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            {stats && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <p className="text-sm text-gray-500">Today</p>
                        <p className="text-2xl font-bold text-gray-800">{stats.todayCount}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <p className="text-sm text-gray-500">Last 7 Days</p>
                        <p className="text-2xl font-bold text-gray-800">{stats.last7DaysCount}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <p className="text-sm text-gray-500">Warnings</p>
                        <p className="text-2xl font-bold text-yellow-600">{stats.warningCount}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <p className="text-sm text-gray-500">Errors</p>
                        <p className="text-2xl font-bold text-red-600">{stats.errorCount}</p>
                    </div>
                </div>
            )}

            {/* Filters */}
            <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6 flex flex-wrap items-center gap-4">
                <div className="flex-1 min-w-[200px]">
                    <div className="t("auto.UserFormModal.99c483e1")">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="t("auto.Program.1cb251ec")"
                            placeholder="t("auto.AdminLogs.412a9c03")"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="h-10 ps-10 pe-4 bg-white border border-gray-300 rounded-md text-sm w-full"
                        />
                    </div>
                </div>
                <select
                    value={actionFilter}
                    onChange={(e) => setActionFilter(e.target.value)}
                    className="h-10 px-4 bg-white border border-gray-300 rounded-md text-sm"
                    aria-label="t("auto.AdminLogs.99d03978")"
                >
                    <option value="">All Actions</option>
                    {actions.map(action => (
                        <option key={action} value={action}>{action}</option>
                    ))}
                </select>
                <select
                    value={severityFilter}
                    onChange={(e) => setSeverityFilter(e.target.value)}
                    className="h-10 px-4 bg-white border border-gray-300 rounded-md text-sm"
                    aria-label="t("auto.AdminLogs.7367d2ff")"
                >
                    <option value="">All Severities</option>
                    <option value="t("auto.ActivityLog.4059b025")">Info</option>
                    <option value="t("auto.ActivityLogsController.0eaadb4f")">Warning</option>
                    <option value="t("common.error")">Error</option>
                    <option value="t("auto.ActivityLogsController.278d01e5")">Critical</option>
                </select>
                <span className="text-sm text-gray-500">{total} total logs</span>
            </div>

            {/* Logs Table */}
            {loading ? (
                <div className="text-center bg-white p-12 rounded-lg border border-gray-200">
                    <RefreshCw className="w-8 h-8 text-gray-400 mx-auto mb-4 animate-spin" />
                    <p className="text-gray-600">Loading activity logs...</p>
                </div>
            ) : logs.length === 0 ? (
                <div className="text-center bg-white p-12 rounded-lg border border-dashed border-gray-300">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-800">No activity logs yet</h3>
                    <p className="text-sm text-gray-500 mt-1">Admin activities will appear here.</p>
                </div>
            ) : (
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="t("auto.AdminLogs.d486f799")">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {logs.map((log) => (
                                    <tr key={log.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 text-sm text-gray-600" style={{ minWidth: '180px' }}>
                                            {formatDate(log.createdAt)}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                                            {log.userName ? (
                                                <div>
                                                    <p className="font-medium text-gray-800">{log.userName}</p>
                                                    <p className="text-xs text-gray-500">{log.userEmail}</p>
                                                </div>
                                            ) : (
                                                <span className="text-gray-400">System</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                {log.action}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-800">
                                            <div className="t("auto.AdminLogs.c5abe331")">
                                                <p className="t("auto.AdminLogs.244f58cf")">{log.description}</p>
                                                {log.entityType && (
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        {log.entityType}
                                                        {log.entityId && ` #${log.entityId}`}
                                                    </p>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 font-mono">
                                            {log.ipAddress}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => openDetailsModal(log)}
                                                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${getSeverityColor(log.severity)} cursor-pointer hover:opacity-80 transition-opacity`}
                                                    title="t("auto.AdminLogs.c1797353")"
                                                >
                                                    {getSeverityIcon(log.severity)}
                                                    {log.severity}
                                                </button>
                                                <button
                                                    onClick={(e) => deleteLog(log.id, e)}
                                                    className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                                    title="t("auto.AdminLogs.af0775a3")"
                                                >
                                                    <Trash2 className="t("auto.ConfirmationModal.1bbd1cd2")" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                            Showing {((page - 1) * pageSize) + 1} to {Math.min(page * pageSize, total)} of {total} logs
                        </div>
                        <div className="t("auto.AdminLogs.9edfbb10")">
                            <button
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => setPage(p => p + 1)}
                                disabled={page * pageSize >= total}
                                className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Details Modal */}
            {showDetailsModal && selectedLog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">Activity Log Details</h3>
                            <button
                                onClick={closeDetailsModal}
                                className="text-gray-400 hover:text-gray-600"
                                aria-label="t("auto.AdminLogs.ce2cbc2e")"
                            >
                                <svg className="t("auto.AdminLogs.e2fdd9e3")" fill="t("auto.ConfirmationModal.334c4a4c")" stroke="t("auto.ConfirmationModal.be92d077")" viewBox="0 0 24 24">
                                    <path strokeLinecap="t("auto.ConfirmationModal.9bbd993d")" strokeLinejoin="t("auto.ConfirmationModal.9bbd993d")" strokeWidth={2} d="t("auto.AdminLogs.28c72870")" />
                                </svg>
                            </button>
                        </div>

                        <div className="px-6 py-4 space-y-4">
                            {/* Basic Info */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">Log ID</label>
                                    <p className="mt-1 text-sm text-gray-900">#{selectedLog.id}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">Timestamp</label>
                                    <p className="mt-1 text-sm text-gray-900">{new Date(selectedLog.createdAt).toLocaleString()}</p>
                                </div>
                            </div>

                            {/* Action & Severity */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">Action</label>
                                    <p className="t("auto.AdminLogs.cc2c9aab")">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                            {selectedLog.action}
                                        </span>
                                    </p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">Severity</label>
                                    <p className="t("auto.AdminLogs.cc2c9aab")">
                                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${getSeverityColor(selectedLog.severity)}`}>
                                            {getSeverityIcon(selectedLog.severity)}
                                            {selectedLog.severity}
                                        </span>
                                    </p>
                                </div>
                            </div>

                            {/* User Info */}
                            {selectedLog.userName && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">User</label>
                                    <div className="mt-1 bg-gray-50 rounded-md p-3">
                                        <p className="text-sm font-medium text-gray-900">{selectedLog.userName}</p>
                                        <p className="text-xs text-gray-600">{selectedLog.userEmail}</p>
                                        {selectedLog.userId && (
                                            <p className="text-xs text-gray-500 mt-1">User ID: {selectedLog.userId}</p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Entity Info */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">Entity Type</label>
                                    <p className="mt-1 text-sm text-gray-900">{selectedLog.entityType}</p>
                                </div>
                                {selectedLog.entityId && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500">Entity ID</label>
                                        <p className="mt-1 text-sm text-gray-900">#{selectedLog.entityId}</p>
                                    </div>
                                )}
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Description</label>
                                <p className="mt-1 text-sm text-gray-900 bg-gray-50 rounded-md p-3">{selectedLog.description}</p>
                            </div>

                            {/* Technical Details */}
                            <div className="border-t pt-4">
                                <h4 className="text-sm font-semibold text-gray-900 mb-3">Technical Details</h4>
                                <div className="t("auto.AdminLogs.d84d5bcb")">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500">IP Address</label>
                                        <p className="mt-1 text-sm text-gray-900 font-mono bg-gray-50 rounded px-2 py-1 inline-block">
                                            {selectedLog.ipAddress}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500">User Agent</label>
                                        <p className="mt-1 text-xs text-gray-700 bg-gray-50 rounded p-2 break-all font-mono">
                                            {selectedLog.userAgent}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Additional Details */}
                            {selectedLog.details && (
                                <div className="border-t pt-4">
                                    <label className="block text-sm font-medium text-gray-500 mb-2">Additional Details</label>
                                    <pre className="text-xs text-gray-700 bg-gray-50 rounded p-3 overflow-x-auto">
                                        {selectedLog.details}
                                    </pre>
                                </div>
                            )}
                        </div>

                        <div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t border-gray-200">
                            <button
                                onClick={closeDetailsModal}
                                className="w-full sm:w-auto px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminLogs;
