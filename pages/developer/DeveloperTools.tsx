import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Terminal, Code, Bug, Play, StopCircle, Download, Upload, FileText } from 'lucide-react';

const DeveloperTools: React.FC = () => {
    const { t, language } = useLanguage();
    const [activeTool, setActiveTool] = useState('console');
    const [consoleInput, setConsoleInput] = useState('');
    const [consoleOutput, setConsoleOutput] = useState([
        { type: 'info', message: 'Developer Console initialized. Type help for available commands.' },
        { type: 'info', message: '> ' }
    ]);

    const tools = [
        { id: 'console', name: t('developer.tools.console'), icon: Terminal },
        { id: 'debugger', name: t('developer.tools.debugger'), icon: Bug },
        { id: 'api-tester', name: t('developer.tools.apiTester'), icon: Code },
        { id: 'data-import', name: t('developer.tools.dataImport'), icon: Upload },
        { id: 'data-export', name: t('developer.tools.dataExport'), icon: Download },
    ];

    const handleConsoleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!consoleInput.trim()) return;

        // Add user input to output
        const newOutput = [...consoleOutput];
        newOutput[newOutput.length - 1] = { type: 'input', message: `> ${consoleInput}` };
        newOutput.push({ type: 'info', message: '> ' });

        setConsoleOutput(newOutput);
        setConsoleInput('');

        // Process command
        processCommand(consoleInput);
    };

    const processCommand = (command: string) => {
        const newOutput = [...consoleOutput];
        newOutput[newOutput.length - 2] = { type: 'input', message: `> ${command}` };

        switch (command.toLowerCase()) {
            case 'help':
                newOutput.push({ type: 'info', message: 'Available commands:' });
                newOutput.push({ type: 'info', message: '  help - Show this help message' });
                newOutput.push({ type: 'info', message: '  clear - Clear the console' });
                newOutput.push({ type: 'info', message: '  version - Show application version' });
                newOutput.push({ type: 'info', message: '  status - Show system status' });
                newOutput.push({ type: 'info', message: '  users - List all users' });
                newOutput.push({ type: 'info', message: '  templates - List all templates' });
                break;
            case 'clear':
                setConsoleOutput([{ type: 'info', message: '> ' }]);
                return;
            case 'version':
                newOutput.push({ type: 'info', message: 'Application Version: 1.2.4' });
                newOutput.push({ type: 'info', message: 'Build Date: 2023-06-20' });
                break;
            case 'status':
                newOutput.push({ type: 'info', message: 'System Status: Operational' });
                newOutput.push({ type: 'info', message: 'Database: Connected' });
                newOutput.push({ type: 'info', message: 'API: Online' });
                newOutput.push({ type: 'info', message: 'Authentication: Active' });
                break;
            case 'users':
                newOutput.push({ type: 'info', message: 'Total Users: 1,245' });
                newOutput.push({ type: 'info', message: 'Active Today: 342' });
                newOutput.push({ type: 'info', message: 'Admin Users: 3' });
                newOutput.push({ type: 'info', message: 'Developer Users: 2' });
                break;
            case 'templates':
                newOutput.push({ type: 'info', message: 'Total Templates: 24' });
                newOutput.push({ type: 'info', message: 'Active Templates: 22' });
                newOutput.push({ type: 'info', message: 'Popular Templates: 5' });
                break;
            default:
                newOutput.push({ type: 'error', message: `Command not found: ${command}` });
                newOutput.push({ type: 'info', message: 'Type "t("auto.DeveloperTools.657f8b8d")" for available commands' });
        }

        newOutput.push({ type: 'info', message: '> ' });
        setConsoleOutput(newOutput);
    };

    const handleRunTest = () => {
        alert('Running tests... This would execute unit/integration tests in a real implementation.');
    };

    const handleDebugStart = () => {
        alert('Starting debugger... This would attach a debugger to the application in a real implementation.');
    };

    const handleDebugStop = () => {
        alert('Stopping debugger... This would detach the debugger in a real implementation.');
    };

    const handleImportData = () => {
        alert('Importing data... This would import data from a file in a real implementation.');
    };

    const handleExportData = () => {
        alert('Exporting data... This would export data to a file in a real implementation.');
    };

    return (
        <div className={t("auto.AdminLayout.6adb5be9")}>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">{t('developer.developerTools')}</h1>
                    <p className="text-gray-600 mt-1">{t('developer.tools.advancedTools')}</p>
                </div>
                <div className={t("auto.AdminLogs.9edfbb10")}>
                    <button
                        onClick={handleRunTest}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                    >
                        <Play size={16} />
                        {t('developer.tools.runTests')}
                    </button>
                    <button
                        onClick={handleDebugStart}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                    >
                        <Bug size={16} />
                        {t('developer.tools.startDebugger')}
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
                <div className="border-b border-gray-200">
                    <nav className="flex -mb-px">
                        {tools.map((tool) => (
                            <button
                                key={tool.id}
                                onClick={() => setActiveTool(tool.id)}
                                className={`py-4 px-6 text-center border-b-2 font-medium text-sm flex items-center ${activeTool === tool.id
                                    ? 'border-green-500 text-green-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                <tool.icon size={16} className={t("auto.DeveloperTools.26d39cea")} />
                                {tool.name}
                            </button>
                        ))}
                    </nav>
                </div>

                <div className={t("auto.AdminLayout.6adb5be9")}>
                    {activeTool === 'console' && (
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">{t('developer.tools.developerConsole')}</h2>
                            <div className="bg-gray-900 rounded-lg p-4 h-96 overflow-y-auto font-mono text-sm">
                                {consoleOutput.map((line, index) => (
                                    <div
                                        key={index}
                                        className={
                                            line.type === 'error' ? 'text-red-400' :
                                                line.type === 'input' ? 'text-green-400' :
                                                    'text-gray-300'
                                        }
                                    >
                                        {line.message}
                                    </div>
                                ))}
                                <form onSubmit={handleConsoleSubmit} className={t("auto.DeveloperTools.21d71465")}>
                                    <span className="text-green-400 me-2">{'>'}</span>
                                    <input
                                        type="text"
                                        value={consoleInput}
                                        onChange={(e) => setConsoleInput(e.target.value)}
                                        className="flex-1 bg-transparent text-gray-300 outline-none"
                                        placeholder={t("auto.DeveloperTools.61e5516f")}
                                        aria-label={t("auto.DeveloperTools.6524a8bc")}
                                    />
                                </form>
                            </div>
                            <div className="mt-4 flex gap-2">
                                <button
                                    onClick={() => processCommand('clear')}
                                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition-colors"
                                >
                                    {t('developer.tools.clearConsole')}
                                </button>
                                <button
                                    onClick={() => processCommand('help')}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                                >
                                    {t('developer.tools.help')}
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTool === 'debugger' && (
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">{t('developer.tools.debugger')}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-gray-50 rounded-lg p-6">
                                    <h3 className="font-medium text-gray-800 mb-4">{t('developer.tools.debugControls')}</h3>
                                    <div className={t("auto.Step1_BasicInfo.eeefd75c")}>
                                        <button
                                            onClick={handleDebugStart}
                                            className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                                        >
                                            <Play size={16} />
                                            {t('developer.tools.startDebugging')}
                                        </button>
                                        <button
                                            onClick={handleDebugStop}
                                            className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                                        >
                                            <StopCircle size={16} />
                                            {t('developer.tools.stopDebugging')}
                                        </button>
                                    </div>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-6">
                                    <h3 className="font-medium text-gray-800 mb-4">{t('developer.tools.breakpoints')}</h3>
                                    <div className={t("auto.Step1_BasicInfo.6a0d104e")}>
                                        <div className="flex items-center justify-between p-2 bg-white rounded">
                                            <span className={t("auto.AdminDashboard.65abb98f")}>TemplateService.ts:45</span>
                                            <div className="flex items-center">
                                                <div className="w-2 h-2 rounded-full bg-green-500 me-2"></div>
                                                <span className="text-xs text-gray-500">Active</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between p-2 bg-white rounded">
                                            <span className={t("auto.AdminDashboard.65abb98f")}>AuthService.ts:12</span>
                                            <div className="flex items-center">
                                                <div className="w-2 h-2 rounded-full bg-yellow-500 me-2"></div>
                                                <span className="text-xs text-gray-500">Disabled</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
                                        {t('developer.tools.addBreakpoint')}
                                    </button>
                                </div>
                            </div>
                            <div className="mt-6 bg-gray-50 rounded-lg p-6">
                                <h3 className="font-medium text-gray-800 mb-4">{t('developer.tools.debugOutput')}</h3>
                                <div className="bg-gray-900 rounded-lg p-4 h-48 overflow-y-auto font-mono text-sm text-gray-300">
                                    <div>[2023-06-20 14:30:22] Debugger attached to process</div>
                                    <div>[2023-06-20 14:30:23] Listening on port 9229</div>
                                    <div>[2023-06-20 14:30:25] Waiting for debugger connection...</div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTool === 'api-tester' && (
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">{t('developer.tools.apiTester')}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className={t("auto.Step1_BasicInfo.eeefd75c")}>
                                    <div>
                                        <label htmlFor={t("auto.DeveloperTools.db9c30d5")} className="block text-sm font-medium text-gray-700 mb-1">
                                            {t('developer.tools.httpMethod')}
                                        </label>
                                        <select
                                            id={t("auto.DeveloperTools.db9c30d5")}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            aria-label={t("auto.DeveloperTools.e43fae86")}
                                        >
                                            <option>GET</option>
                                            <option>POST</option>
                                            <option>PUT</option>
                                            <option>DELETE</option>
                                            <option>PATCH</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor={t("auto.DeveloperTools.e1890704")} className="block text-sm font-medium text-gray-700 mb-1">
                                            {t('developer.tools.endpointUrl')}
                                        </label>
                                        <input
                                            type="text"
                                            id={t("auto.DeveloperTools.e1890704")}
                                            defaultValue="/api/templates"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            placeholder={t("auto.DeveloperTools.922bf35d")}
                                            aria-label={t("auto.DeveloperTools.714291c7")}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor={t("auto.DeveloperTools.4340fd73")} className="block text-sm font-medium text-gray-700 mb-1">
                                            {t('developer.tools.headers')}
                                        </label>
                                        <textarea
                                            id={t("auto.DeveloperTools.4340fd73")}
                                            rows={3}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            placeholder="Content-Type: application/json&#10;Authorization: Bearer token"
                                            aria-label={t("auto.DeveloperTools.736943e8")}
                                        ></textarea>
                                    </div>
                                    <div>
                                        <label htmlFor={t("auto.DeveloperTools.1be38aa3")} className="block text-sm font-medium text-gray-700 mb-1">
                                            {t('developer.tools.requestBody')}
                                        </label>
                                        <textarea
                                            id={t("auto.DeveloperTools.1be38aa3")}
                                            rows={5}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 font-mono text-sm"
                                            placeholder={'{\n  "name": "Template name",\n  "description": "Template description"\n}'}
                                            aria-label={t("auto.DeveloperTools.a3ba8461")}
                                        ></textarea>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="font-medium text-gray-800">Response</h3>
                                        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                                            <Play size={16} />
                                            {t('developer.tools.sendRequest')}
                                        </button>
                                    </div>
                                    <div className="bg-gray-900 rounded-lg p-4 h-80 overflow-y-auto font-mono text-sm text-gray-300">
                                        <div className="text-green-400">Status: 200 OK</div>
                                        <div className="text-blue-400 mt-2">Headers:</div>
                                        <div className={t("auto.DeveloperTools.04c50002")}>Content-Type: application/json</div>
                                        <div className={t("auto.DeveloperTools.04c50002")}>Server: nginx/1.18.0</div>
                                        <div className="text-blue-400 mt-2">Body:</div>
                                        <div className={t("auto.DeveloperTools.04c50002")}>{'{'}</div>
                                        <div className={t("auto.DeveloperTools.3c2619ff")}>[</div>
                                        <div className={t("auto.DeveloperTools.6c2dcb84")}>{'{'}</div>
                                        <div className={t("auto.DeveloperTools.0499a59c")}>"id": 1,</div>
                                        <div className={t("auto.DeveloperTools.0499a59c")}>"name": "Business Plan Template",</div>
                                        <div className={t("auto.DeveloperTools.0499a59c")}>"description": "Comprehensive business plan template"</div>
                                        <div className={t("auto.DeveloperTools.6c2dcb84")}>{'},'}</div>
                                        <div className={t("auto.DeveloperTools.3c2619ff")}>]</div>
                                        <div>{'}'}</div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTool === 'data-import' && (
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">{t('developer.tools.dataImport')}</h2>
                            <div className="bg-gray-50 rounded-lg p-6">
                                <div className="flex items-center justify-center w-full">
                                    <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-50">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <Upload className="w-10 h-10 mb-3 text-gray-400" />
                                            <p className="mb-2 text-sm text-gray-500">
                                                <span className="font-semibold">{t('developer.tools.clickToUpload')}</span> {t('developer.tools.dragAndDrop')}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {t('developer.tools.fileTypes')}
                                            </p>
                                        </div>
                                        <input type="file" className={t("auto.DeveloperTools.662f707d")} aria-label={t("auto.DeveloperTools.f0f9957b")} />
                                    </label>
                                </div>
                                <div className={t("auto.DeveloperSystem.42b34b63")}>
                                    <button
                                        onClick={handleImportData}
                                        className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                                    >
                                        <Upload size={16} />
                                        {t('developer.tools.importData')}
                                    </button>
                                </div>
                            </div>
                            <div className={t("auto.DeveloperSystem.42b34b63")}>
                                <h3 className="font-medium text-gray-800 mb-4">{t('developer.tools.importSettings')}</h3>
                                <div className={t("auto.Step1_BasicInfo.eeefd75c")}>
                                    <div>
                                        <label htmlFor={t("auto.DeveloperTools.897f9760")} className="block text-sm font-medium text-gray-700 mb-1">
                                            {t('developer.tools.dataFormat')}
                                        </label>
                                        <select
                                            id={t("auto.DeveloperTools.897f9760")}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            aria-label={t("auto.DeveloperTools.8e33f11a")}
                                        >
                                            <option>CSV</option>
                                            <option>JSON</option>
                                            <option>XML</option>
                                        </select>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id={t("auto.DeveloperTools.77dced08")}
                                            className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                                            aria-label={t("auto.DeveloperTools.f59b3659")}
                                        />
                                        <label htmlFor={t("auto.DeveloperTools.77dced08")} className="ms-2 text-sm text-gray-700">
                                            {t('developer.tools.overwriteData')}
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id={t("auto.DeveloperTools.f9ab0545")}
                                            defaultChecked
                                            className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                                            aria-label={t("auto.DeveloperTools.1f70a340")}
                                        />
                                        <label htmlFor={t("auto.DeveloperTools.f9ab0545")} className="ms-2 text-sm text-gray-700">
                                            {t('developer.tools.validateData')}
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTool === 'data-export' && (
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">{t('developer.tools.dataExport')}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-gray-50 rounded-lg p-6">
                                    <h3 className="font-medium text-gray-800 mb-4">{t('developer.tools.exportOptions')}</h3>
                                    <div className={t("auto.Step1_BasicInfo.eeefd75c")}>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                {t('developer.tools.dataToExport')}
                                            </label>
                                            <div className={t("auto.Step1_BasicInfo.6a0d104e")}>
                                                <div className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        id={t("auto.DeveloperTools.192b7e3f")}
                                                        defaultChecked
                                                        className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                                                        aria-label={t("auto.DeveloperTools.9f8e9d68")}
                                                    />
                                                    <label htmlFor={t("auto.DeveloperTools.192b7e3f")} className="ms-2 text-sm text-gray-700">
                                                        Users
                                                    </label>
                                                </div>
                                                <div className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        id={t("auto.DeveloperTools.4e232376")}
                                                        defaultChecked
                                                        className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                                                        aria-label={t("auto.DeveloperTools.4200bcfe")}
                                                    />
                                                    <label htmlFor={t("auto.DeveloperTools.4e232376")} className="ms-2 text-sm text-gray-700">
                                                        Templates
                                                    </label>
                                                </div>
                                                <div className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        id={t("auto.DeveloperTools.d5a87117")}
                                                        className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                                                        aria-label={t("auto.DeveloperTools.9627394b")}
                                                    />
                                                    <label htmlFor={t("auto.DeveloperTools.d5a87117")} className="ms-2 text-sm text-gray-700">
                                                        Analyses
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor={t("auto.DeveloperTools.f2632d3a")} className="block text-sm font-medium text-gray-700 mb-1">
                                                {t('developer.tools.exportFormat')}
                                            </label>
                                            <select
                                                id={t("auto.DeveloperTools.f2632d3a")}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                                aria-label={t("auto.DeveloperTools.d3e94251")}
                                            >
                                                <option>CSV</option>
                                                <option>JSON</option>
                                                <option>XML</option>
                                                <option>Excel</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-6">
                                    <h3 className="font-medium text-gray-800 mb-4">{t('developer.tools.exportSettings')}</h3>
                                    <div className={t("auto.Step1_BasicInfo.eeefd75c")}>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                {t('developer.tools.dateRange')}
                                            </label>
                                            <div className="grid grid-cols-2 gap-2">
                                                <input
                                                    type="date"
                                                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                                    aria-label={t("auto.DeveloperTools.4d34f109")}
                                                />
                                                <input
                                                    type="date"
                                                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                                    aria-label={t("auto.DeveloperTools.b7de7e42")}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id={t("auto.DeveloperTools.390626c5")}
                                                defaultChecked
                                                className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                                                aria-label={t("auto.DeveloperTools.5eafaf98")}
                                            />
                                            <label htmlFor={t("auto.DeveloperTools.390626c5")} className="ms-2 text-sm text-gray-700">
                                                {t('developer.tools.compressFiles')}
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id={t("auto.DeveloperTools.4b45b3ec")}
                                                defaultChecked
                                                className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                                                aria-label={t("auto.DeveloperTools.65d181fa")}
                                            />
                                            <label htmlFor={t("auto.DeveloperTools.4b45b3ec")} className="ms-2 text-sm text-gray-700">
                                                {t('developer.tools.includeMetadata')}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={t("auto.DeveloperSystem.42b34b63")}>
                                <button
                                    onClick={handleExportData}
                                    className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                                >
                                    <Download size={16} />
                                    {t('developer.tools.exportData')}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DeveloperTools;