import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Database, RefreshCw, Download, Upload, Trash2, Play, AlertTriangle } from 'lucide-react';

const DeveloperDatabase: React.FC = () => {
  const { language } = useLanguage();
    const [activeTab, setActiveTab] = useState('overview');
    const [backupName, setBackupName] = useState('');
    const [isBackingUp, setIsBackingUp] = useState(false);

    // Mock data for demonstration
    const databaseStats = {
        totalTables: 12,
        totalRecords: 12543,
        totalSize: '45.2 MB',
        lastBackup: '2023-06-15 14:30:22'
    };

    const tables = [
        { name: 'Users', records: 1245, size: '2.1 MB', lastModified: '2023-06-20' },
        { name: 'Templates', records: 24, size: '0.8 MB', lastModified: '2023-06-19' },
        { name: 'TemplateFields', records: 342, size: '1.2 MB', lastModified: '2023-06-19' },
        { name: 'Analyses', records: 8765, size: '25.6 MB', lastModified: '2023-06-20' },
        { name: 'AnalysisResults', records: 8765, size: '12.4 MB', lastModified: '2023-06-20' },
    ];

    const backups = [
        { name: 'backup_20230615.sql', size: '32.4 MB', date: '2023-06-15 14:30:22', status: 'completed' },
        { name: 'backup_20230601.sql', size: '31.8 MB', date: '2023-06-01 14:30:15', status: 'completed' },
        { name: 'backup_20230515.sql', size: '30.2 MB', date: '2023-05-15 14:28:44', status: 'completed' },
    ];

    const handleBackup = () => {
        if (!backupName.trim()) {
            alert('Please enter a backup name');
            return;
        }

        setIsBackingUp(true);
        // Simulate backup process
        setTimeout(() => {
            setIsBackingUp(false);
            alert(`Database backup "t("auto.DeveloperDatabase.d37f4226")" created successfully!`);
            setBackupName('');
        }, 2000);
    };

    const handleRestore = (backupName: string) => {
        if (window.confirm(`Are you sure you want to restore the database from "t("auto.DeveloperDatabase.d37f4226")"? This will overwrite current data.`)) {
            alert(`Restoring database from "t("auto.DeveloperDatabase.d37f4226")"...`);
        }
    };

    const handleDeleteBackup = (backupName: string) => {
        if (window.confirm(`Are you sure you want to delete the backup "t("auto.DeveloperDatabase.d37f4226")"? This action cannot be undone.`)) {
            alert(`Backup "t("auto.DeveloperDatabase.d37f4226")" deleted successfully!`);
        }
    };

    const handleOptimize = () => {
        alert('Optimizing database... This may take a few minutes.');
    };

    const handleClearCache = () => {
        alert('Database cache cleared successfully!');
    };

    return (
        <div className="t("auto.AdminLayout.6adb5be9")">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Database Management</h1>
                    <p className="text-gray-600 mt-1">Monitor, backup, and manage your database</p>
                </div>
                <div className="t("auto.AdminLogs.9edfbb10")">
                    <button
                        onClick={handleOptimize}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                    >
                        <RefreshCw size={16} />
                        Optimize
                    </button>
                    <button
                        onClick={handleClearCache}
                        className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                    >
                        <Trash2 size={16} />
                        Clear Cache
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                        <div className="text-blue-800 font-semibold">Total Tables</div>
                        <div className="text-2xl font-bold text-blue-600">{databaseStats.totalTables}</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                        <div className="text-green-800 font-semibold">Total Records</div>
                        <div className="text-2xl font-bold text-green-600">{databaseStats.totalRecords.toLocaleString()}</div>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-4">
                        <div className="text-yellow-800 font-semibold">Database Size</div>
                        <div className="text-2xl font-bold text-yellow-600">{databaseStats.totalSize}</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4">
                        <div className="text-purple-800 font-semibold">Last Backup</div>
                        <div className="text-sm font-bold text-purple-600">{databaseStats.lastBackup}</div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
                <div className="border-b border-gray-200">
                    <nav className="flex -mb-px">
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'overview'
                                    ? 'border-green-500 text-green-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            Database Overview
                        </button>
                        <button
                            onClick={() => setActiveTab('tables')}
                            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'tables'
                                    ? 'border-green-500 text-green-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            Tables
                        </button>
                        <button
                            onClick={() => setActiveTab('backups')}
                            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'backups'
                                    ? 'border-green-500 text-green-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            Backups
                        </button>
                        <button
                            onClick={() => setActiveTab('maintenance')}
                            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'maintenance'
                                    ? 'border-green-500 text-green-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            Maintenance
                        </button>
                    </nav>
                </div>

                <div className="t("auto.AdminLayout.6adb5be9")">
                    {activeTab === 'overview' && (
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Database Status</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-gray-50 rounded-lg p-6">
                                    <h3 className="font-medium text-gray-800 mb-2">Connection Status</h3>
                                    <div className="flex items-center">
                                        <div className="w-3 h-3 rounded-full bg-green-500 me-2"></div>
                                        <span className="text-green-600">Connected</span>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-2">Database is running normally</p>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-6">
                                    <h3 className="font-medium text-gray-800 mb-2">Performance</h3>
                                    <div className="flex items-center">
                                        <div className="w-3 h-3 rounded-full bg-green-500 me-2"></div>
                                        <span className="text-green-600">Optimal</span>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-2">Query response time: 12ms</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'tables' && (
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Database Tables</h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="t("auto.DeveloperApiKeys.fb222b7a")">
                                        <tr>
                                            <th scope="t("auto.DeveloperApiKeys.d89e2ddb")" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Table Name
                                            </th>
                                            <th scope="t("auto.DeveloperApiKeys.d89e2ddb")" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Records
                                            </th>
                                            <th scope="t("auto.DeveloperApiKeys.d89e2ddb")" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Size
                                            </th>
                                            <th scope="t("auto.DeveloperApiKeys.d89e2ddb")" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Last Modified
                                            </th>
                                            <th scope="t("auto.DeveloperApiKeys.d89e2ddb")" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {tables.map((table) => (
                                            <tr key={table.name} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">{table.name}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {table.records.toLocaleString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {table.size}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {table.lastModified}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button className="text-blue-500 hover:text-blue-700 me-3">
                                                        View
                                                    </button>
                                                    <button className="text-red-500 hover:text-red-700">
                                                        Truncate
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'backups' && (
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-lg font-semibold text-gray-800">Database Backups</h2>
                                <div className="t("auto.AdminLogs.9edfbb10")">
                                    <input
                                        type="t("auto.Program.1cb251ec")"
                                        placeholder="t("auto.DeveloperDatabase.ec8515af")"
                                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                        value={backupName}
                                        onChange={(e) => setBackupName(e.target.value)}
                                    />
                                    <button
                                        onClick={handleBackup}
                                        disabled={isBackingUp}
                                        className="bg-green-500 hover:bg-green-600 disabled:bg-green-400 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                                    >
                                        {isBackingUp ? (
                                            <>
                                                <RefreshCw className="animate-spin" size={16} />
                                                Backing up...
                                            </>
                                        ) : (
                                            <>
                                                <Download size={16} />
                                                Create Backup
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="t("auto.DeveloperApiKeys.fb222b7a")">
                                        <tr>
                                            <th scope="t("auto.DeveloperApiKeys.d89e2ddb")" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Backup Name
                                            </th>
                                            <th scope="t("auto.DeveloperApiKeys.d89e2ddb")" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Size
                                            </th>
                                            <th scope="t("auto.DeveloperApiKeys.d89e2ddb")" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Date
                                            </th>
                                            <th scope="t("auto.DeveloperApiKeys.d89e2ddb")" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th scope="t("auto.DeveloperApiKeys.d89e2ddb")" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {backups.map((backup) => (
                                            <tr key={backup.name} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">{backup.name}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {backup.size}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {backup.date}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                        {backup.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button
                                                        onClick={() => handleRestore(backup.name)}
                                                        className="text-blue-500 hover:text-blue-700 me-3 flex items-center"
                                                    >
                                                        <Play size={14} className="t("auto.DeveloperDatabase.671e468d")" />
                                                        Restore
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteBackup(backup.name)}
                                                        className="text-red-500 hover:text-red-700 flex items-center"
                                                    >
                                                        <Trash2 size={14} className="t("auto.DeveloperDatabase.671e468d")" />
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'maintenance' && (
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Database Maintenance</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-gray-50 rounded-lg p-6">
                                    <h3 className="font-medium text-gray-800 mb-2">Optimize Database</h3>
                                    <p className="text-sm text-gray-600 mb-4">Reorganize database structure to improve performance</p>
                                    <button
                                        onClick={handleOptimize}
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                                    >
                                        <RefreshCw size={16} />
                                        Run Optimization
                                    </button>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-6">
                                    <h3 className="font-medium text-gray-800 mb-2">Clear Cache</h3>
                                    <p className="text-sm text-gray-600 mb-4">Clear database cache to free up memory</p>
                                    <button
                                        onClick={handleClearCache}
                                        className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                                    >
                                        <Trash2 size={16} />
                                        Clear Cache
                                    </button>
                                </div>
                                <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
                                    <div className="flex items-start">
                                        <AlertTriangle className="text-yellow-600 me-2 mt-1" size={20} />
                                        <div>
                                            <h3 className="font-medium text-yellow-800 mb-2">Danger Zone</h3>
                                            <p className="text-sm text-yellow-700 mb-4">Reset the entire database. This action cannot be undone.</p>
                                            <button
                                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                                            >
                                                <Trash2 size={16} />
                                                Reset Database
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DeveloperDatabase;