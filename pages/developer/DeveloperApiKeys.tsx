import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Eye, EyeOff, Copy, Plus, Trash2, Edit } from 'lucide-react';

interface ApiKey {
    id: string;
    name: string;
    key: string;
    createdAt: string;
    lastUsed: string;
    status: 'active' | 'disabled';
}

const DeveloperApiKeys: React.FC = () => {
    const { language, t } = useLanguage();
    const [apiKeys, setApiKeys] = useState<ApiKey[]>([
        {
            id: '1',
            name: t("developer.apiKeys.table.name"),
            key: 'AIzaSyCLCeMXElGa7qZoV2c3x0Xt2PXMQMWIS4E',
            createdAt: '2023-01-15',
            lastUsed: '2023-06-20',
            status: 'active'
        },
        {
            id: '2',
            name: t("auto.DeveloperApiKeys.a36b60e8"),
            key: 'sk_analytics_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            createdAt: '2023-03-22',
            lastUsed: '2023-06-18',
            status: 'active'
        },
        {
            id: '3',
            name: t("auto.DeveloperApiKeys.cc106ce1"),
            key: 'sk_backup_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            createdAt: '2023-05-10',
            lastUsed: t("developer.apiKeys.table.lastUsed"),
            status: 'disabled'
        }
    ]);

    const [showKey, setShowKey] = useState<Record<string, boolean>>({});
    const [newKeyName, setNewKeyName] = useState('');
    const [showNewKeyForm, setShowNewKeyForm] = useState(false);

    const toggleKeyVisibility = (id: string) => {
        setShowKey(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        alert(t("developer.apiKeys.alerts.keyCopied"));
    };

    const handleCreateKey = () => {
        if (!newKeyName.trim()) {
            alert(t("developer.apiKeys.alerts.enterKeyName"));
            return;
        }

        const newKey: ApiKey = {
            id: (apiKeys.length + 1).toString(),
            name: newKeyName,
            key: `sk_${newKeyName.toLowerCase().replace(/\s+/g, '_')}_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`,
            createdAt: new Date().toISOString().split('T')[0],
            lastUsed: t("developer.apiKeys.table.lastUsed"),
            status: 'active'
        };

        setApiKeys([...apiKeys, newKey]);
        setNewKeyName('');
        setShowNewKeyForm(false);
    };

    const handleDeleteKey = (id: string) => {
        if (window.confirm(t("developer.apiKeys.alerts.deleteConfirmation"))) {
            setApiKeys(apiKeys.filter(key => key.id !== id));
        }
    };

    const handleToggleStatus = (id: string) => {
        setApiKeys(apiKeys.map(key =>
            key.id === id
                ? { ...key, status: key.status === 'active' ? 'disabled' : 'active' }
                : key
        ));
    };

    const getStatusBadgeClass = (status: string) => {
        return status === 'active'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800';
    };

    return (
        <div className={t("auto.AdminLayout.6adb5be9")}>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">{t("developer.apiKeys.title")}</h1>
                    <p className="text-gray-600 mt-1">{t("developer.apiKeys.description")}</p>
                </div>
                <button
                    onClick={() => setShowNewKeyForm(true)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                    <Plus size={20} />
                    {t("developer.apiKeys.createNewKey")}
                </button>
            </div>

            {showNewKeyForm && (
                <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">{t("developer.apiKeys.createKeyForm.title")}</h2>
                    <div className={t("auto.ConfirmationModal.1904562d")}>
                        <input
                            type="text"
                            placeholder={t("developer.apiKeys.createKeyForm.placeholder")}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={newKeyName}
                            onChange={(e) => setNewKeyName(e.target.value)}
                        />
                        <button
                            onClick={handleCreateKey}
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                            {t("developer.apiKeys.createKeyForm.createButton")}
                        </button>
                        <button
                            onClick={() => {
                                setShowNewKeyForm(false);
                                setNewKeyName('');
                            }}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition-colors"
                        >
                            {t("developer.apiKeys.createKeyForm.cancelButton")}
                        </button>
                    </div>
                </div>
            )}

            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className={t("auto.DeveloperApiKeys.fb222b7a")}>
                            <tr>
                                <th scope={t("auto.DeveloperApiKeys.d89e2ddb")} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {t("developer.apiKeys.table.name")}
                                </th>
                                <th scope={t("auto.DeveloperApiKeys.d89e2ddb")} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {t("developer.apiKeys.table.key")}
                                </th>
                                <th scope={t("auto.DeveloperApiKeys.d89e2ddb")} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {t("developer.apiKeys.table.status")}
                                </th>
                                <th scope={t("auto.DeveloperApiKeys.d89e2ddb")} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {t("developer.apiKeys.table.created")}
                                </th>
                                <th scope={t("auto.DeveloperApiKeys.d89e2ddb")} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {t("developer.apiKeys.table.lastUsed")}
                                </th>
                                <th scope={t("auto.DeveloperApiKeys.d89e2ddb")} className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {t("developer.apiKeys.table.actions")}
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {apiKeys.map((apiKey) => (
                                <tr key={apiKey.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{apiKey.name}</div>
                                    </td>
                                    <td className={t("auto.DeveloperApiKeys.26119ac0")}>
                                        <div className="flex items-center">
                                            <code className="text-sm text-gray-500 font-mono">
                                                {showKey[apiKey.id] ? apiKey.key : `${apiKey.key.substring(0, 20)}...`}
                                            </code>
                                            <button
                                                onClick={() => toggleKeyVisibility(apiKey.id)}
                                                className="ms-2 text-gray-500 hover:text-gray-700"
                                                title={showKey[apiKey.id] ? t("developer.apiKeys.table.hideKey") : t("developer.apiKeys.table.showKey")}
                                            >
                                                {showKey[apiKey.id] ? <EyeOff size={16} /> : <Eye size={16} />}
                                            </button>
                                            <button
                                                onClick={() => copyToClipboard(apiKey.key)}
                                                className="ms-2 text-gray-500 hover:text-gray-700"
                                                title={t("developer.apiKeys.table.copyToClipboard")}
                                            >
                                                <Copy size={16} />
                                            </button>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(apiKey.status)}`}>
                                            {t(`developer.apiKeys.table.${apiKey.status}`)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {apiKey.createdAt}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {apiKey.lastUsed}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex rtl:justify-start space-x-2">
                                            <button
                                                onClick={() => handleToggleStatus(apiKey.id)}
                                                className="text-blue-500 hover:text-blue-700"
                                                title={apiKey.status === 'active' ? t("developer.apiKeys.table.disableKey") : t("developer.apiKeys.table.enableKey")}
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteKey(apiKey.id)}
                                                className="text-red-500 hover:text-red-700"
                                                title={t("developer.apiKeys.table.deleteKey")}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">{t("developer.apiKeys.security.title")}</h3>
                <ul className="list-disc list-inside text-blue-700 space-y-1">
                    <li>{t("developer.apiKeys.security.doNotShare")}</li>
                    <li>{t("developer.apiKeys.security.rotateKeys")}</li>
                    <li>{t("developer.apiKeys.security.useEnvironmentVariables")}</li>
                    <li>{t("developer.apiKeys.security.monitorUsage")}</li>
                </ul>
            </div>
        </div>
    );
};

export default DeveloperApiKeys;