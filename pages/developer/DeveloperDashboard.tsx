import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, FileText, Users, Key, Database, Settings, Code, Activity } from 'lucide-react';
import { listTemplates } from '../../services/templateService';
import { useLanguage } from '../../context/LanguageContext';

interface Template {
    id: number;
    name: string;
    description: string;
    category: string;
    duration: number;
    isPopular: boolean;
    createdAt: string;
    fieldsCount: number;
}

const DeveloperDashboard: React.FC = () => {
    const [templates, setTemplates] = useState<Template[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { t } = useLanguage();

    // Template name to translation key mapping
    const templateNameToKey: Record<string, string> = {
        'AI Business Idea Validator': 'developer.templateBuilder.aiBusinessValidator',
        'AI-Powered SWOT & PESTEL Builder': 'developer.templateBuilder.aiSwotBuilder',
        'AI Pitch Deck Generator': 'developer.templateBuilder.aiPitchDeckGenerator',
        'Building the Marketing Plan': 'developer.templateBuilder.buildingMarketingPlan',
        'Financial Performance Assessment': 'developer.templateBuilder.financialPerformanceAssessment',
        'Assessing Growth Readiness': 'developer.templateBuilder.assessingGrowthReadiness',
        'Gap Analysis': 'developer.templateBuilder.gapAnalysis',
        'AI Business Health Check': 'developer.templateBuilder.aiBusinessHealthCheck',
        'Digital Maturity Assessment': 'developer.templateBuilder.digitalMaturityAssessment',
        'AI-Based Market Opportunity Analyzer': 'developer.templateBuilder.aiMarketOpportunityAnalyzer'
    };

    // Template description to translation key mapping
    const templateDescToKey: Record<string, string> = {
        'Validate your business idea with AI-powered analysis covering core concept, financial hypotheses, feasibility, market validation, and critical assumptions.': 'developer.templateBuilder.aiBusinessValidatorDesc',
        'Comprehensive SWOT and PESTEL analysis to evaluate your business strengths, weaknesses, opportunities, threats, and external factors.': 'developer.templateBuilder.aiSwotBuilderDesc',
        'Create a professional investor pitch deck with market analysis, financial projections, and business model.': 'developer.templateBuilder.aiPitchDeckGeneratorDesc',
        'Develop a comprehensive marketing strategy covering target audience, marketing channels, pricing techniques, and content plans.': 'developer.templateBuilder.buildingMarketingPlanDesc',
        'Comprehensive financial performance analysis to identify strengths, weaknesses, and operational efficiency improvements.': 'developer.templateBuilder.financialPerformanceAssessmentDesc',
        'Evaluate your organization\'s readiness for expansion focusing on infrastructure, resources, and strategies needed for growth.': 'developer.templateBuilder.assessingGrowthReadinessDesc',
        'Identify gaps between current performance and desired goals across all areas of your business.': 'developer.templateBuilder.gapAnalysisDesc',
        'Comprehensive business health check covering financial, operational, marketing, and organizational aspects.': 'developer.templateBuilder.aiBusinessHealthCheckDesc',
        'Assess your organization\'s readiness for digital transformation and adoption of modern technologies.': 'developer.templateBuilder.digitalMaturityAssessmentDesc',
        'Analyze potential market opportunities focusing on trends, market segmentation, market size, and competition.': 'developer.templateBuilder.aiMarketOpportunityAnalyzerDesc'
    };

    useEffect(() => {
        loadTemplates();
    }, []);

    const loadTemplates = async () => {
        try {
            setLoading(true);
            try {
                const token = sessionStorage.getItem('token') || undefined;
                const templateList = await listTemplates(token);

                // Apply translation mapping to database templates
                const translatedTemplates = templateList.map(template => ({
                    ...template,
                    name: templateNameToKey[template.name] ? t(templateNameToKey[template.name]) : template.name,
                    description: templateDescToKey[template.description] ? t(templateDescToKey[template.description]) : template.description
                }));

                setTemplates(translatedTemplates);
            } catch (err) {
                console.error('Failed to load templates', err);
                // Fallback to mock data with new AI templates
                const mockTemplates = [
                    {
                        id: 1,
                        name: t('developer.templateBuilder.aiBusinessValidator'),
                        description: t('developer.templateBuilder.aiBusinessValidatorDesc'),
                        category: t('developer.templateBuilder.businessValidation'),
                        duration: 25,
                        isPopular: true,
                        createdAt: new Date().toISOString(),
                        fieldsCount: 12
                    },
                    {
                        id: 2,
                        name: t('developer.templateBuilder.aiSwotBuilder'),
                        description: t('developer.templateBuilder.aiSwotBuilderDesc'),
                        category: t('developer.templateBuilder.swotAndPestel'),
                        duration: 30,
                        isPopular: true,
                        createdAt: new Date().toISOString(),
                        fieldsCount: 15
                    },
                    {
                        id: 3,
                        name: t('developer.templateBuilder.aiPitchDeckGenerator'),
                        description: t('developer.templateBuilder.aiPitchDeckGeneratorDesc'),
                        category: t('developer.templateBuilder.pitchDeck'),
                        duration: 35,
                        isPopular: true,
                        createdAt: new Date().toISOString(),
                        fieldsCount: 18
                    },
                    {
                        id: 4,
                        name: t('developer.templateBuilder.buildingMarketingPlan'),
                        description: t('developer.templateBuilder.buildingMarketingPlanDesc'),
                        category: t('developer.templateBuilder.marketing'),
                        duration: 40,
                        isPopular: false,
                        createdAt: new Date().toISOString(),
                        fieldsCount: 20
                    },
                    {
                        id: 5,
                        name: t('developer.templateBuilder.financialPerformanceAssessment'),
                        description: t('developer.templateBuilder.financialPerformanceAssessmentDesc'),
                        category: t('developer.templateBuilder.financial'),
                        duration: 30,
                        isPopular: false,
                        createdAt: new Date().toISOString(),
                        fieldsCount: 16
                    },
                    {
                        id: 6,
                        name: t('developer.templateBuilder.assessingGrowthReadiness'),
                        description: t('developer.templateBuilder.assessingGrowthReadinessDesc'),
                        category: t('developer.templateBuilder.growth'),
                        duration: 35,
                        isPopular: false,
                        createdAt: new Date().toISOString(),
                        fieldsCount: 14
                    },
                    {
                        id: 7,
                        name: t('developer.templateBuilder.gapAnalysis'),
                        description: t('developer.templateBuilder.gapAnalysisDesc'),
                        category: t('developer.templateBuilder.analysis'),
                        duration: 25,
                        isPopular: false,
                        createdAt: new Date().toISOString(),
                        fieldsCount: 12
                    },
                    {
                        id: 8,
                        name: t('developer.templateBuilder.aiBusinessHealthCheck'),
                        description: t('developer.templateBuilder.aiBusinessHealthCheckDesc'),
                        category: t('developer.templateBuilder.healthCheck'),
                        duration: 45,
                        isPopular: true,
                        createdAt: new Date().toISOString(),
                        fieldsCount: 22
                    },
                    {
                        id: 9,
                        name: t('developer.templateBuilder.digitalMaturityAssessment'),
                        description: t('developer.templateBuilder.digitalMaturityAssessmentDesc'),
                        category: t('developer.templateBuilder.digital'),
                        duration: 30,
                        isPopular: false,
                        createdAt: new Date().toISOString(),
                        fieldsCount: 15
                    },
                    {
                        id: 10,
                        name: t('developer.templateBuilder.aiMarketOpportunityAnalyzer'),
                        description: t('developer.templateBuilder.aiMarketOpportunityAnalyzerDesc'),
                        category: t('developer.templateBuilder.market'),
                        duration: 40,
                        isPopular: true,
                        createdAt: new Date().toISOString(),
                        fieldsCount: 18
                    }
                ];
                setTemplates(mockTemplates);
            }
        } catch (err) {
            console.error('Failed to load templates', err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateTemplate = () => {
        navigate('/developer/template/new');
    };

    const handleEditTemplate = (id: number) => {
        navigate(`/developer/template/${id}/edit`);
    };

    const handleDeleteTemplate = (id: number) => {
        if (window.confirm(`${t('common.confirm')} ${t('common.delete')} ${t('developer.templateBuilder.template')}?`)) {
            // In a real implementation, this would call the delete API
            setTemplates(templates.filter(t => t.id !== id));
        }
    };

    const developerTools = [
        { name: t('developer.templateManagement'), icon: FileText, path: '/developer/templates' },
        { name: t('developer.userManagement'), icon: Users, path: '/developer/users' },
        { name: t('developer.apiKeys'), icon: Key, path: '/developer/api-keys' },
        { name: t('developer.database'), icon: Database, path: '/developer/database' },
        { name: t('developer.systemSettings'), icon: Settings, path: '/developer/system' },
        { name: t('developer.developerTools'), icon: Code, path: '/developer/tools' },
        { name: t('developer.activityLogs'), icon: Activity, path: '/developer/logs' },
    ];

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-800">{t('developer.controlPanel')}</h1>
                <p className="text-gray-600 mt-1">{t('developer.fullAccess')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {developerTools.map((tool) => (
                    <div
                        key={tool.name}
                        onClick={() => navigate(tool.path)}
                        className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                    >
                        <div className="flex items-center">
                            <tool.icon className="text-green-500" size={24} />
                            <h3 className="ms-3 text-lg font-medium text-gray-800">{tool.name}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold text-gray-800">{t('developer.templateManagement')}</h2>
                <button
                    onClick={handleCreateTemplate}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                    <Plus size={20} />
                    {t('developer.createNewTemplate')}
                </button>
            </div>

            {templates.length === 0 ? (
                <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                    <p className="text-gray-500 mb-4">{t('developer.noTemplates')}</p>
                    <button
                        onClick={handleCreateTemplate}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 mx-auto transition-colors"
                    >
                        <Plus size={20} />
                        {t('developer.createFirstTemplate')}
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {templates.map((template) => (
                        <div key={template.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        {templateNameToKey[template.name] ? t(templateNameToKey[template.name]) : template.name}
                                    </h3>
                                    {template.isPopular && (
                                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                            {t('common.popular')}
                                        </span>
                                    )}
                                </div>
                                <p className="text-gray-600 text-sm mb-4">
                                    {templateDescToKey[template.description] ? t(templateDescToKey[template.description]) : template.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                        {templateNameToKey[template.category] ? t(templateNameToKey[template.category]) : template.category}
                                    </span>
                                    <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                        {template.duration} {t('templates.minutes')}
                                    </span>
                                    <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                        {template.fieldsCount} {t('developer.fields')}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-gray-500">
                                        {t('common.createdAt')}: {new Date(template.createdAt).toLocaleDateString()}
                                    </span>
                                    <div className="flex items-center gap-1">
                                        <button
                                            onClick={() => handleEditTemplate(template.id)}
                                            className="text-blue-500 hover:text-blue-700 p-1"
                                            title={t('common.edit')}
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteTemplate(template.id)}
                                            className="text-red-500 hover:text-red-700 p-1"
                                            title={t('common.delete')}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DeveloperDashboard;