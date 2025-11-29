import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { listTemplates, deleteTemplate } from '../../services/templateService';
import { useNavigate } from 'react-router-dom';
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

const DeveloperTemplates: React.FC = () => {
    const [templates, setTemplates] = useState<Template[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
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

    // Template category to translation key mapping
    const templateCategoryToKey: Record<string, string> = {
        'Business Validation': 'developer.businessValidation',
        'SWOT & PESTEL': 'developer.swotAndPestel',
        'Pitch Deck': 'developer.pitchDeck',
        'Marketing': 'developer.marketing',
        'Financial': 'developer.financial',
        'Growth': 'developer.growth',
        'Analysis': 'developer.analysis',
        'Health Check': 'developer.healthCheck',
        'Digital': 'developer.digital',
        'Market': 'developer.market',
        'Market Opportunity': 'developer.marketOpportunity'
    };

    useEffect(() => {
        loadTemplates();
    }, []);

    const loadTemplates = async () => {
        try {
            setLoading(true);
            const token = sessionStorage.getItem('token') || undefined;
            const templateList = await listTemplates(token);

            // Apply translation mapping to database templates
            const translatedTemplates = templateList.map(template => ({
                ...template,
                name: templateNameToKey[template.name] ? t(templateNameToKey[template.name]) : template.name,
                description: templateDescToKey[template.description] ? t(templateDescToKey[template.description]) : template.description
            }));

            setTemplates(translatedTemplates);
        } catch (err: any) {
            console.error('t("auto.DeveloperTemplates.6d0f42e7")', err);
            setError(err?.message || 'Failed to load templates');
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

    const handleDeleteTemplate = async (id: number) => {
        if (window.confirm(`${t('common.confirm')} ${t('common.delete')} ${t('developer.templateBuilder.template')}? ${t('common.deleteWarning')}`)) {
            try {
                const token = sessionStorage.getItem('token') || undefined;
                await deleteTemplate(id, token);
                setTemplates(templates.filter(t => t.id !== id));
            } catch (err: any) {
                console.error('Failed to delete template', err);
                alert(err?.message || t('developer.templateBuilder.saveTemplateError'));
            }
        }
    };

    const handleViewTemplate = (id: number) => {
        // In a real implementation, this would navigate to a preview page
        alert(`Viewing template ${id}`);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">{t('developer.templateManagement')}</h1>
                    <p className="text-gray-600 mt-1">{t('developer.templateBuilder.defineInputs')}</p>
                </div>
                <button
                    onClick={handleCreateTemplate}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                    <Plus size={20} />
                    {t('developer.createNewTemplate')}
                </button>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <p className="text-red-700">{error}</p>
                </div>
            )}

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
                                        {templateCategoryToKey[template.category] ? t(templateCategoryToKey[template.category]) : template.category}
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
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleViewTemplate(template.id)}
                                            className="text-gray-500 hover:text-gray-700 p-1"
                                            title={t('common.view')}
                                        >
                                            <Eye size={16} />
                                        </button>
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

export default DeveloperTemplates;