import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { RefreshCw, Trash2, Download, Play, AlertTriangle } from 'lucide-react';

const DeveloperDatabase: React.FC = () => {
    const { language, t } = useLanguage();
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
            alert(t('developer.enterBackupNamePrompt'));
            return;
        }

        setIsBackingUp(true);
        // Simulate backup process
        setTimeout(() => {
            setIsBackingUp(false);
            alert(t('developer.backupCreated').replace('{backupName}', backupName));
            setBackupName('');
        }, 2000);
    };

    const handleRestore = (backupName: string) => {
        if (window.confirm(t('developer.confirmRestore').replace('{backupName}', backupName))) {
            alert(t('developer.restoringDatabase').replace('{backupName}', backupName));
        }
    };

    const handleDeleteBackup = (backupName: string) => {
        if (window.confirm(t('developer.confirmDeleteBackup').replace('{backupName}', backupName))) {
            alert(t('developer.backupDeleted').replace('{backupName}', backupName));
        }
    };

    const handleOptimize = () => {
        alert(t('developer.optimizingDatabase'));
    };

    const handleClearCache = () => {
        alert(t('developer.cacheCleared'));
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">{t('developer.databaseManagement')}</h1>
                    <p className="text-gray-600 mt-1">{t('developer.monitorBackupManage')}</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleOptimize}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                    >
                        <RefreshCw size={16} />
                        {t('developer.runOptimization')}
                    </button>
                    <button
                        onClick={handleClearCache}
                        className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                    >
                        <Trash2 size={16} />
                        {t('developer.clearCache')}
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                        <div className="text-blue-800 font-semibold">{t('developer.totalTables')}</div>
                        <div className="text-2xl font-bold text-blue-600">{databaseStats.totalTables}</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                        <div className="text-green-800 font-semibold">{t('developer.totalRecords')}</div>
                        <div className="text-2xl font-bold text-green-600">{databaseStats.totalRecords.toLocaleString()}</div>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-4">
                        <div className="text-yellow-800 font-semibold">{t('developer.databaseSize')}</div>
                        <div className="text-2xl font-bold text-yellow-600">{databaseStats.totalSize}</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4">
                        <div className="text-purple-800 font-semibold">{t('developer.lastBackup')}</div>
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
                            {t('developer.databaseOverview')}
                        </button>
                        <button
                            onClick={() => setActiveTab('tables')}
                            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'tables'
                                ? 'border-green-500 text-green-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            {t('developer.tables')}
                        </button>
                        <button
                            onClick={() => setActiveTab('backups')}
                            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'backups'
                                ? 'border-green-500 text-green-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            {t('developer.backups')}
                        </button>
                        <button
                            onClick={() => setActiveTab('maintenance')}
                            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'maintenance'
                                ? 'border-green-500 text-green-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            {t('developer.maintenance')}
                        </button>
                    </nav>
                </div>

                <div className="p-6">
                    {activeTab === 'overview' && (
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">{t('developer.databaseStatus')}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-gray-50 rounded-lg p-6">
                                    <h3 className="font-medium text-gray-800 mb-2">{t('developer.connectionStatus')}</h3>
                                    <div className="flex items-center">
                                        <div className="w-3 h-3 rounded-full bg-green-500 me-2"></div>
                                        <span className="text-green-600">{t('developer.connected')}</span>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-2">{t('developer.databaseRunningNormally')}</p>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-6">
                                    <h3 className="font-medium text-gray-800 mb-2">{t('developer.performance')}</h3>
                                    <div className="flex items-center">
                                        <div className="w-3 h-3 rounded-full bg-green-500 me-2"></div>
                                        <span className="text-green-600">{t('developer.optimal')}</span>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-2">Query response time: 12ms</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'tables' && (
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">{t('developer.databaseTables')}</h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                {t('developer.tableName')}
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                {t('developer.records')}
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                {t('common.size')}
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                {t('developer.lastModified')}
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                {t('common.actions')}
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
                                                        {t('developer.view')}
                                                    </button>
                                                    <button className="text-red-500 hover:text-red-700">
                                                        {t('developer.truncate')}
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
                                <h2 className="text-lg font-semibold text-gray-800">{t('developer.databaseBackups')}</h2>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="text"
                                        placeholder={t('developer.enterBackupName')}
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
                                                {t('developer.backingUp')}
                                            </>
                                        ) : (
                                            <>
                                                <Download size={16} />
                                                {t('developer.createBackup')}
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                {t('developer.databaseBackups')}
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                {t('common.size')}
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                {t('common.date')}
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                {t('common.status')}
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                {t('common.actions')}
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
                                                        <Play size={14} className="me-1" />
                                                        {t('developer.restore')}
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteBackup(backup.name)}
                                                        className="text-red-500 hover:text-red-700 flex items-center"
                                                    >
                                                        <Trash2 size={14} className="me-1" />
                                                        {t('developer.delete')}
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
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">{t('developer.databaseMaintenance')}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-gray-50 rounded-lg p-6">
                                    <h3 className="font-medium text-gray-800 mb-2">{t('developer.optimizeDatabase')}</h3>
                                    <p className="text-sm text-gray-600 mb-4">{t('developer.reorganizeDatabase')}</p>
                                    <button
                                        onClick={handleOptimize}
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                                    >
                                        <RefreshCw size={16} />
                                        {t('developer.runOptimization')}
                                    </button>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-6">
                                    <h3 className="font-medium text-gray-800 mb-2">{t('developer.clearCache')}</h3>
                                    <p className="text-sm text-gray-600 mb-4">{t('developer.clearDatabaseCache')}</p>
                                    <button
                                        onClick={handleClearCache}
                                        className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                                    >
                                        <Trash2 size={16} />
                                        {t('developer.clearCache')}
                                    </button>
                                </div>
                                <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
                                    <div className="flex items-start">
                                        <AlertTriangle className="text-yellow-600 me-2 mt-1" size={20} />
                                        <div>
                                            <h3 className="font-medium text-yellow-800 mb-2">{t('developer.dangerZone')}</h3>
                                            <p className="text-sm text-yellow-700 mb-4">{t('developer.resetDatabaseWarning')}</p>
                                            <button
                                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                                            >
                                                <Trash2 size={16} />
                                                {t('developer.resetDatabase')}
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