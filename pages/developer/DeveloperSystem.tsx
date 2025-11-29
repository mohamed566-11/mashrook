import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Settings, RefreshCw, Shield, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

const DeveloperSystem: React.FC = () => {
    const { language, t } = useLanguage();
    const [activeTab, setActiveTab] = useState('configuration');
    const [isRestarting, setIsRestarting] = useState(false);

    // Mock data for demonstration
    const systemInfo = {
        version: 'v1.2.4',
        environment: t('developer.environment'),
        uptime: '12 days, 4 hours, 32 minutes',
        memoryUsage: '1.2 GB / 4 GB',
        cpuUsage: '24%',
        diskUsage: '15.4 GB / 50 GB'
    };

    const environmentVariables = [
        { key: 'VITE_API_URL', value: 'https://b26db2dd6336.ngrok-free.app', sensitive: false },
        { key: 'VITE_GEMINI_API_KEY', value: 'AIzaSyCLCeMXElGa7qZoV2c3x0Xt2PXMQMWIS4E', sensitive: true },
        { key: 'VITE_ENABLE_DEVELOPER_MODE', value: 'true', sensitive: false },
        { key: 'NODE_ENV', value: 'development', sensitive: false },
        { key: 'PORT', value: '3000', sensitive: false },
    ];

    const healthChecks = [
        { name: t('developer.database'), status: 'healthy' },
        { name: t('admin.apiServices'), status: 'healthy' },
        { name: t('developer.systemInfo'), status: 'healthy' },
        { name: t('developer.developerTools'), status: 'degraded' },
        { name: t('developer.email'), status: 'healthy' },
        { name: t('developer.ai'), status: 'healthy' },
    ];

    const handleRestartServer = () => {
        if (window.confirm(t('developer.confirmRestart'))) {
            setIsRestarting(true);
            // Simulate restart process
            setTimeout(() => {
                setIsRestarting(false);
                alert(t('developer.serverRestarted'));
            }, 3000);
        }
    };

    const handleUpdateConfig = () => {
        alert(t('admin.settings.settingsSaved'));
    };

    const handleClearCache = () => {
        alert(t('developer.systemCacheCleared'));
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'healthy':
                return <CheckCircle className="text-green-500" size={20} />;
            case 'degraded':
                return <AlertTriangle className="text-yellow-500" size={20} />;
            case 'down':
                return <XCircle className="text-red-500" size={20} />;
            default:
                return <CheckCircle className="text-green-500" size={20} />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'healthy':
                return 'bg-green-100 text-green-800';
            case 'degraded':
                return 'bg-yellow-100 text-yellow-800';
            case 'down':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-green-100 text-green-800';
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">{t('developer.systemSettings')}</h1>
                    <p className="text-gray-600 mt-1">{t('developer.configureMonitorSettings')}</p>
                </div>
                <div className="flex space-x-3">
                    <button
                        onClick={handleClearCache}
                        className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                    >
                        <RefreshCw size={16} />
                        {t('developer.clearCache')}
                    </button>
                    <button
                        onClick={handleRestartServer}
                        disabled={isRestarting}
                        className="bg-red-500 hover:bg-red-600 disabled:bg-red-400 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                    >
                        {isRestarting ? (
                            <>
                                <RefreshCw className="animate-spin" size={16} />
                                {t('developer.restarting')}
                            </>
                        ) : (
                            <>
                                <RefreshCw size={16} />
                                {t('developer.restartServer')}
                            </>
                        )}
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                        <div className="text-blue-800 font-semibold">{t('developer.version')}</div>
                        <div className="text-xl font-bold text-blue-600">{systemInfo.version}</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                        <div className="text-green-800 font-semibold">{t('developer.environment')}</div>
                        <div className="text-xl font-bold text-green-600">{systemInfo.environment}</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4">
                        <div className="text-purple-800 font-semibold">{t('developer.uptime')}</div>
                        <div className="text-xl font-bold text-purple-600">{systemInfo.uptime}</div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
                <div className="border-b border-gray-200">
                    <nav className="flex -mb-px">
                        <button
                            onClick={() => setActiveTab('configuration')}
                            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'configuration'
                                ? 'border-green-500 text-green-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            {t('developer.configuration')}
                        </button>
                        <button
                            onClick={() => setActiveTab('environment')}
                            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'environment'
                                ? 'border-green-500 text-green-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            {t('developer.environmentVariables')}
                        </button>
                        <button
                            onClick={() => setActiveTab('health')}
                            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'health'
                                ? 'border-green-500 text-green-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            {t('developer.healthChecks')}
                        </button>
                        <button
                            onClick={() => setActiveTab('security')}
                            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'security'
                                ? 'border-green-500 text-green-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            {t('developer.security')}
                        </button>
                    </nav>
                </div>

                <div className="p-6">
                    {activeTab === 'configuration' && (
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">{t('developer.systemConfiguration')}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="appName" className="block text-sm font-medium text-gray-700 mb-1">
                                            {t('developer.applicationName')}
                                        </label>
                                        <input
                                            type="text"
                                            id="appName"
                                            defaultValue="Mashroo3k Business Analysis"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            placeholder={t('developer.enterApplicationName')}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="defaultLanguage" className="block text-sm font-medium text-gray-700 mb-1">
                                            {t('developer.defaultLanguage')}
                                        </label>
                                        <select
                                            id="defaultLanguage"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            aria-label={t('developer.selectDefaultLanguage')}
                                        >
                                            <option>{t('common.english')}</option>
                                            <option>{t('common.arabic')}</option>
                                            <option>{t('developer.spanish')}</option>
                                            <option>{t('developer.french')}</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 mb-1">
                                            {t('developer.timezone')}
                                        </label>
                                        <select
                                            id="timezone"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            aria-label={t('developer.selectTimezone')}
                                        >
                                            <option>{t('developer.utc')}</option>
                                            <option>{t('developer.gmt1')}</option>
                                            <option>{t('developer.gmt2')}</option>
                                            <option>{t('developer.gmt3')}</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id="maintenanceMode"
                                                className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                                            />
                                            <label htmlFor="maintenanceMode" className="ms-2 text-sm text-gray-700">
                                                {t('developer.maintenanceMode')}
                                            </label>
                                        </div>
                                        <p className="mt-1 text-sm text-gray-500">{t('developer.enableMaintenanceMode')}</p>
                                    </div>
                                    <div>
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id="debugMode"
                                                defaultChecked
                                                className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                                            />
                                            <label htmlFor="debugMode" className="ms-2 text-sm text-gray-700">
                                                {t('developer.debugMode')}
                                            </label>
                                        </div>
                                        <p className="mt-1 text-sm text-gray-500">{t('developer.enableDebugLogging')}</p>
                                    </div>
                                    <div>
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id="autoBackup"
                                                defaultChecked
                                                className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                                            />
                                            <label htmlFor="autoBackup" className="ms-2 text-sm text-gray-700">
                                                {t('developer.autoBackup')}
                                            </label>
                                        </div>
                                        <p className="mt-1 text-sm text-gray-500">{t('developer.enableAutoBackup')}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6">
                                <button
                                    onClick={handleUpdateConfig}
                                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                                >
                                    <Settings size={16} />
                                    {t('developer.updateConfiguration')}
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'environment' && (
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">{t('developer.environmentVariables')}</h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                {t('developer.variable')}
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                {t('developer.value')}
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                {t('common.actions')}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {environmentVariables.map((envVar) => (
                                            <tr key={envVar.key} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">{envVar.key}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-500 font-mono">
                                                        {envVar.sensitive ? '••••••••••••••••' : envVar.value}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button className="text-blue-500 hover:text-blue-700 me-3">
                                                        {t('common.edit')}
                                                    </button>
                                                    <button className="text-red-500 hover:text-red-700">
                                                        {t('common.delete')}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="mt-6">
                                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                                    <Settings size={16} />
                                    {t('developer.addNewVariable')}
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'health' && (
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">{t('developer.healthChecks')}</h2>
                            <div className="space-y-4">
                                {healthChecks.map((check) => (
                                    <div key={check.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                        <div className="flex items-center">
                                            {getStatusIcon(check.status)}
                                            <span className="ms-3 font-medium text-gray-900">{check.name}</span>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(check.status)}`}>
                                            {check.status === 'healthy' ? t('admin.healthy') :
                                                check.status === 'degraded' ? t('developer.degraded') :
                                                    t('developer.down')}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6">
                                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                                    <RefreshCw size={16} />
                                    {t('developer.runHealthChecks')}
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">{t('developer.security')}</h2>
                            <div className="space-y-6">
                                <div className="bg-gray-50 rounded-lg p-6">
                                    <h3 className="font-medium text-gray-800 mb-4">{t('developer.authentication')}</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label htmlFor="sessionTimeout" className="block text-sm font-medium text-gray-700 mb-1">
                                                {t('developer.sessionTimeout')}
                                            </label>
                                            <input
                                                type="number"
                                                id="sessionTimeout"
                                                defaultValue="30"
                                                className="w-full md:w-1/3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                                placeholder={t('developer.enterTimeoutMinutes')}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                {t('developer.passwordRequirements')}
                                            </label>
                                            <div className="space-y-2">
                                                <div className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        id="minLength"
                                                        defaultChecked
                                                        className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                                                    />
                                                    <label htmlFor="minLength" className="ms-2 text-sm text-gray-700">
                                                        {t('developer.min8Characters')}
                                                    </label>
                                                </div>
                                                <div className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        id="uppercase"
                                                        defaultChecked
                                                        className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                                                    />
                                                    <label htmlFor="uppercase" className="ms-2 text-sm text-gray-700">
                                                        {t('developer.requireUppercase')}
                                                    </label>
                                                </div>
                                                <div className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        id="numberRequired"
                                                        defaultChecked
                                                        className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                                                    />
                                                    <label htmlFor="numberRequired" className="ms-2 text-sm text-gray-700">
                                                        {t('developer.requireNumber')}
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-6">
                                    <h3 className="font-medium text-gray-800 mb-4">{t('developer.apiSecurity')}</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id="rateLimiting"
                                                defaultChecked
                                                className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                                            />
                                            <label htmlFor="rateLimiting" className="ms-2 text-sm text-gray-700">
                                                {t('developer.rateLimiting')}
                                            </label>
                                        </div>
                                        <div>
                                            <label htmlFor="requestsPerMinute" className="block text-sm font-medium text-gray-700 mb-1">
                                                {t('developer.requestsPerMinute')}
                                            </label>
                                            <input
                                                type="number"
                                                id="requestsPerMinute"
                                                defaultValue="100"
                                                className="w-full md:w-1/3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                                placeholder={t('developer.enterRequestsPerMinute')}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
                                    <div className="flex items-start">
                                        <Shield className="text-yellow-600 me-2 mt-1" size={20} />
                                        <div>
                                            <h3 className="font-medium text-yellow-800 mb-2">{t('developer.securityAudit')}</h3>
                                            <p className="text-sm text-yellow-700 mb-4">{t('developer.securityAuditDescription')}</p>
                                            <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                                                <Shield size={16} />
                                                {t('developer.runSecurityAudit')}
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

export default DeveloperSystem;