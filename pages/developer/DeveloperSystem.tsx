import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Settings, RefreshCw, Shield, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

const DeveloperSystem: React.FC = () => {
  const { language } = useLanguage();
    const [activeTab, setActiveTab] = useState('configuration');
    const [isRestarting, setIsRestarting] = useState(false);

    // Mock data for demonstration
    const systemInfo = {
        version: 'v1.2.4',
        environment: 't("auto.DeveloperSystem.330f49df")',
        uptime: '12 days, 4 hours, 32 minutes',
        memoryUsage: '1.2 GB / 4 GB',
        cpuUsage: '24%',
        diskUsage: '15.4 GB / 50 GB'
    };

    const environmentVariables = [
        { key: 'VITE_API_URL', value: 'https://localhost:7141', sensitive: false },
        { key: 'VITE_GEMINI_API_KEY', value: 'AIzaSyCLCeMXElGa7qZoV2c3x0Xt2PXMQMWIS4E', sensitive: true },
        { key: 'VITE_ENABLE_DEVELOPER_MODE', value: 'true', sensitive: false },
        { key: 'NODE_ENV', value: 'development', sensitive: false },
        { key: 'PORT', value: '3000', sensitive: false },
    ];

    const healthChecks = [
        { name: 'Database Connection', status: 'healthy' },
        { name: 'API Service', status: 'healthy' },
        { name: 'Authentication Service', status: 'healthy' },
        { name: 'File Storage', status: 'degraded' },
        { name: 'Email Service', status: 'healthy' },
        { name: 'AI Service', status: 'healthy' },
    ];

    const handleRestartServer = () => {
        if (window.confirm('Are you sure you want to restart the server? This will temporarily interrupt service for all users.')) {
            setIsRestarting(true);
            // Simulate restart process
            setTimeout(() => {
                setIsRestarting(false);
                alert('Server restarted successfully!');
            }, 3000);
        }
    };

    const handleUpdateConfig = () => {
        alert('Configuration updated successfully!');
    };

    const handleClearCache = () => {
        alert('System cache cleared successfully!');
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
        <div className="t("auto.AdminLayout.6adb5be9")">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">System Settings</h1>
                    <p className="text-gray-600 mt-1">Configure and monitor system-wide settings</p>
                </div>
                <div className="t("auto.AdminLogs.9edfbb10")">
                    <button
                        onClick={handleClearCache}
                        className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                    >
                        <RefreshCw size={16} />
                        Clear Cache
                    </button>
                    <button
                        onClick={handleRestartServer}
                        disabled={isRestarting}
                        className="bg-red-500 hover:bg-red-600 disabled:bg-red-400 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                    >
                        {isRestarting ? (
                            <>
                                <RefreshCw className="animate-spin" size={16} />
                                Restarting...
                            </>
                        ) : (
                            <>
                                <RefreshCw size={16} />
                                Restart Server
                            </>
                        )}
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                        <div className="text-blue-800 font-semibold">Version</div>
                        <div className="text-xl font-bold text-blue-600">{systemInfo.version}</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                        <div className="text-green-800 font-semibold">Environment</div>
                        <div className="text-xl font-bold text-green-600">{systemInfo.environment}</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4">
                        <div className="text-purple-800 font-semibold">Uptime</div>
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
                            Configuration
                        </button>
                        <button
                            onClick={() => setActiveTab('environment')}
                            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'environment'
                                ? 'border-green-500 text-green-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            Environment Variables
                        </button>
                        <button
                            onClick={() => setActiveTab('health')}
                            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'health'
                                ? 'border-green-500 text-green-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            Health Checks
                        </button>
                        <button
                            onClick={() => setActiveTab('security')}
                            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'security'
                                ? 'border-green-500 text-green-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            Security
                        </button>
                    </nav>
                </div>

                <div className="t("auto.AdminLayout.6adb5be9")">
                    {activeTab === 'configuration' && (
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">System Configuration</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="t("auto.Step1_BasicInfo.eeefd75c")">
                                    <div>
                                        <label htmlFor="t("auto.DeveloperSystem.b9d55a0c")" className="block text-sm font-medium text-gray-700 mb-1">
                                            Application Name
                                        </label>
                                        <input
                                            type="t("auto.Program.1cb251ec")"
                                            id="t("auto.DeveloperSystem.b9d55a0c")"
                                            defaultValue="t("auto.DeveloperSystem.001c50d2")"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            placeholder="t("auto.DeveloperSystem.07166da5")"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="t("auto.DeveloperSystem.7de1466c")" className="block text-sm font-medium text-gray-700 mb-1">
                                            Default Language
                                        </label>
                                        <select
                                            id="t("auto.DeveloperSystem.7de1466c")"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            aria-label="t("auto.DeveloperSystem.c96a77fb")"
                                        >
                                            <option>English</option>
                                            <option>Arabic</option>
                                            <option>Spanish</option>
                                            <option>French</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="t("auto.DeveloperSystem.b2c6cc48")" className="block text-sm font-medium text-gray-700 mb-1">
                                            Timezone
                                        </label>
                                        <select
                                            id="t("auto.DeveloperSystem.b2c6cc48")"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            aria-label="t("auto.DeveloperSystem.236df51b")"
                                        >
                                            <option>UTC</option>
                                            <option>GMT+1</option>
                                            <option>GMT+2</option>
                                            <option>GMT+3</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="t("auto.Step1_BasicInfo.eeefd75c")">
                                    <div>
                                        <div className="flex items-center">
                                            <input
                                                type="t("auto.Step1_BasicInfo.9fced129")"
                                                id="t("auto.DeveloperSystem.84cc4f8f")"
                                                className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                                            />
                                            <label htmlFor="t("auto.DeveloperSystem.84cc4f8f")" className="ms-2 text-sm text-gray-700">
                                                Maintenance Mode
                                            </label>
                                        </div>
                                        <p className="mt-1 text-sm text-gray-500">Enable maintenance mode for the application</p>
                                    </div>
                                    <div>
                                        <div className="flex items-center">
                                            <input
                                                type="t("auto.Step1_BasicInfo.9fced129")"
                                                id="t("auto.DeveloperSystem.48e635f7")"
                                                defaultChecked
                                                className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                                            />
                                            <label htmlFor="t("auto.DeveloperSystem.48e635f7")" className="ms-2 text-sm text-gray-700">
                                                Debug Mode
                                            </label>
                                        </div>
                                        <p className="mt-1 text-sm text-gray-500">Enable debug logging for detailed system information</p>
                                    </div>
                                    <div>
                                        <div className="flex items-center">
                                            <input
                                                type="t("auto.Step1_BasicInfo.9fced129")"
                                                id="t("auto.DeveloperSystem.93f66cf0")"
                                                defaultChecked
                                                className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                                            />
                                            <label htmlFor="t("auto.DeveloperSystem.93f66cf0")" className="ms-2 text-sm text-gray-700">
                                                Auto-backup
                                            </label>
                                        </div>
                                        <p className="mt-1 text-sm text-gray-500">Enable automatic backups of system data</p>
                                    </div>
                                </div>
                            </div>
                            <div className="t("auto.DeveloperSystem.42b34b63")">
                                <button
                                    onClick={handleUpdateConfig}
                                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                                >
                                    <Settings size={16} />
                                    Update Configuration
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'environment' && (
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Environment Variables</h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="t("auto.DeveloperApiKeys.fb222b7a")">
                                        <tr>
                                            <th scope="t("auto.DeveloperApiKeys.d89e2ddb")" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Variable
                                            </th>
                                            <th scope="t("auto.DeveloperApiKeys.d89e2ddb")" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Value
                                            </th>
                                            <th scope="t("auto.DeveloperApiKeys.d89e2ddb")" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {environmentVariables.map((envVar) => (
                                            <tr key={envVar.key} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">{envVar.key}</div>
                                                </td>
                                                <td className="t("auto.DeveloperApiKeys.26119ac0")">
                                                    <div className="text-sm text-gray-500 font-mono">
                                                        {envVar.sensitive ? '••••••••••••••••' : envVar.value}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button className="text-blue-500 hover:text-blue-700 me-3">
                                                        Edit
                                                    </button>
                                                    <button className="text-red-500 hover:text-red-700">
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="t("auto.DeveloperSystem.42b34b63")">
                                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                                    <Settings size={16} />
                                    Add New Variable
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'health' && (
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">System Health Checks</h2>
                            <div className="t("auto.Step1_BasicInfo.eeefd75c")">
                                {healthChecks.map((check) => (
                                    <div key={check.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                        <div className="flex items-center">
                                            {getStatusIcon(check.status)}
                                            <span className="ms-3 font-medium text-gray-900">{check.name}</span>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(check.status)}`}>
                                            {check.status.charAt(0).toUpperCase() + check.status.slice(1)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <div className="t("auto.DeveloperSystem.42b34b63")">
                                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                                    <RefreshCw size={16} />
                                    Run Health Checks
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Security Settings</h2>
                            <div className="t("auto.CreateField.028d2a3b")">
                                <div className="bg-gray-50 rounded-lg p-6">
                                    <h3 className="font-medium text-gray-800 mb-4">Authentication</h3>
                                    <div className="t("auto.Step1_BasicInfo.eeefd75c")">
                                        <div>
                                            <label htmlFor="t("auto.DeveloperSystem.c280bf60")" className="block text-sm font-medium text-gray-700 mb-1">
                                                Session Timeout (minutes)
                                            </label>
                                            <input
                                                type="number"
                                                id="t("auto.DeveloperSystem.c280bf60")"
                                                defaultValue="30"
                                                className="w-full md:w-1/3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                                placeholder="t("auto.DeveloperSystem.6e4d9a88")"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Password Requirements
                                            </label>
                                            <div className="t("auto.Step1_BasicInfo.6a0d104e")">
                                                <div className="flex items-center">
                                                    <input
                                                        type="t("auto.Step1_BasicInfo.9fced129")"
                                                        id="t("auto.DeveloperSystem.2781cf95")"
                                                        defaultChecked
                                                        className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                                                    />
                                                    <label htmlFor="t("auto.DeveloperSystem.2781cf95")" className="ms-2 text-sm text-gray-700">
                                                        Minimum 8 characters
                                                    </label>
                                                </div>
                                                <div className="flex items-center">
                                                    <input
                                                        type="t("auto.Step1_BasicInfo.9fced129")"
                                                        id="t("auto.DeveloperSystem.2e994c40")"
                                                        defaultChecked
                                                        className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                                                    />
                                                    <label htmlFor="t("auto.DeveloperSystem.2e994c40")" className="ms-2 text-sm text-gray-700">
                                                        Require uppercase letter
                                                    </label>
                                                </div>
                                                <div className="flex items-center">
                                                    <input
                                                        type="t("auto.Step1_BasicInfo.9fced129")"
                                                        id="number"
                                                        defaultChecked
                                                        className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                                                    />
                                                    <label htmlFor="number" className="ms-2 text-sm text-gray-700">
                                                        Require number
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-6">
                                    <h3 className="font-medium text-gray-800 mb-4">API Security</h3>
                                    <div className="t("auto.Step1_BasicInfo.eeefd75c")">
                                        <div className="flex items-center">
                                            <input
                                                type="t("auto.Step1_BasicInfo.9fced129")"
                                                id="t("auto.DeveloperSystem.122889f4")"
                                                defaultChecked
                                                className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                                            />
                                            <label htmlFor="t("auto.DeveloperSystem.122889f4")" className="ms-2 text-sm text-gray-700">
                                                Rate Limiting
                                            </label>
                                        </div>
                                        <div>
                                            <label htmlFor="t("auto.DeveloperSystem.b91d8bd9")" className="block text-sm font-medium text-gray-700 mb-1">
                                                Requests per minute
                                            </label>
                                            <input
                                                type="number"
                                                id="t("auto.DeveloperSystem.b91d8bd9")"
                                                defaultValue="100"
                                                className="w-full md:w-1/3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                                placeholder="t("auto.DeveloperSystem.575df61e")"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
                                    <div className="flex items-start">
                                        <Shield className="text-yellow-600 me-2 mt-1" size={20} />
                                        <div>
                                            <h3 className="font-medium text-yellow-800 mb-2">Security Audit</h3>
                                            <p className="text-sm text-yellow-700 mb-4">Run a comprehensive security audit to identify potential vulnerabilities.</p>
                                            <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                                                <Shield size={16} />
                                                Run Security Audit
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