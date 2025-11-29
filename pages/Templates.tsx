import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import {
    Utensils, ShoppingCart, Rocket, Dumbbell, Star, Clock, ArrowRight,
    CheckCircle, BarChart, Wrench, Target, Shield, Lightbulb, FileText,
    Users, TrendingUp, Database, Globe, Zap
} from 'lucide-react';
import { useAnalysis } from '../context/AnalysisContext';
import { listTemplates, Template } from '../services/templateService';

// Icon mapping for categories
const categoryIcons: Record<string, React.ComponentType<any>> = {
    'Food & Beverage': Utensils,
    'Retail & E-commerce': ShoppingCart,
    'Fitness & Wellness': Dumbbell,
    'Startups & Innovation': Rocket,
    'Business Strategy': CheckCircle,
    'SWOT & PESTEL': BarChart,
    'Marketing Strategy': Target,
    'Financial Analysis': TrendingUp,
    'Operational Efficiency': Wrench,
    'Risk Management': Shield,
    'Data & Analytics': Database,
    'Business Planning': FileText,
    'International Business': Globe,
    'Technology & IT': Zap
};

// Icon mapping for specific templates
const templateIcons: Record<string, React.ComponentType<any>> = {
    'AI Business Idea Validator': CheckCircle,
    'AI-Powered SWOT & PESTEL Builder': BarChart,
    'AI Pitch Deck Generator': Target,
    'Financial Performance Assessment': TrendingUp,
    'Market Opportunity Analyzer': Zap,
    'Gap Analysis': Wrench,
    'Business Health Check': Shield,
    'Digital Maturity Assessment': Database,
    'Marketing Plan Builder': FileText,
    'Growth Readiness Assessment': Globe
};

// Template name to translation key mapping
const templateNameToKey: Record<string, string> = {
    'AI Business Idea Validator': 'developer.templateBuilder.aiBusinessValidator',
    'AI-Powered SWOT & PESTEL Builder': 'developer.templateBuilder.aiSwotBuilder',
    'AI Pitch Deck Generator': 'developer.templateBuilder.aiPitchDeckGenerator',
    'Marketing Plan Builder': 'developer.templateBuilder.buildingMarketingPlan',
    'Financial Performance Assessment': 'developer.templateBuilder.financialPerformanceAssessment',
    'Growth Readiness Assessment': 'developer.templateBuilder.assessingGrowthReadiness',
    'Gap Analysis': 'developer.templateBuilder.gapAnalysis',
    'Business Health Check': 'developer.templateBuilder.aiBusinessHealthCheck',
    'Digital Maturity Assessment': 'developer.templateBuilder.digitalMaturityAssessment',
    'Market Opportunity Analyzer': 'developer.templateBuilder.aiMarketOpportunityAnalyzer'
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

const TemplateCard: React.FC<{ template: Template; t: (key: string) => string }> = ({ template, t }) => {
    const navigate = useNavigate();
    const { resetForm, setTemplate } = useAnalysis();

    // Get translated name and description if available
    const translatedName = templateNameToKey[template.name] ? t(templateNameToKey[template.name]) : template.name;
    const translatedDesc = templateDescToKey[template.description] ? t(templateDescToKey[template.description]) : template.description;

    const handleStartAnalysis = () => {
        resetForm();
        setTemplate(template.id.toString()); // Convert to string as expected by AnalysisContext
        navigate('/analysis/new');
    }

    // Get icon based on template name, then category, or use default
    const IconComponent = templateIcons[template.name] || categoryIcons[template.category] || Rocket;

    return (
        <div className="bg-card-white rounded-lg shadow-sm border border-border-color p-6 flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            {template.isPopular && <div className="absolute top-4 right-4 bg-yellow-100 text-yellow-800 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1"><Star size={12} /> {t('templates.popularTemplates')}</div>}
            <div className="p-3 bg-primary-green-light rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <IconComponent className="h-8 w-8 text-primary-green" />
            </div>
            <h3 className="text-lg font-bold text-text-primary">{translatedName}</h3>
            <p className="text-sm text-text-secondary mt-2 flex-grow">{translatedDesc}</p>
            <div className="flex items-center text-sm text-text-secondary mt-4 border-t border-border-color pt-4">
                <Clock size={16} className="me-2" />
                <span>Approx. {template.duration} {t('templates.minutes')}</span>
            </div>
            <button onClick={handleStartAnalysis} className="mt-4 w-full bg-primary-green-bg text-primary-green font-semibold py-2 px-4 rounded-md hover:bg-primary-green-light transition flex items-center justify-center gap-2">
                {t('templates.startAnalysis')} <ArrowRight size={16} />
            </button>
        </div>
    );
};

const Templates: React.FC = () => {
    const { t } = useLanguage();
    const [templates, setTemplates] = useState<Template[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                setLoading(true);
                const fetchedTemplates = await listTemplates();
                setTemplates(fetchedTemplates);
            } catch (err) {
                console.error('Failed to fetch templates:', err);
                setError('Failed to load templates. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchTemplates();
    }, []);

    // Group templates by category
    const categories = [...new Set(templates.map(t => t.category))];
    const popularTemplates = templates.filter(t => t.isPopular);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mr-4"></div>
                <div className="text-lg text-gray-600">{t('common.loading')}</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 text-center">
                <div className="text-red-500 mb-4">{error}</div>
                <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                    {t('common.retry')}
                </button>
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-screen-xl mx-auto">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-text-primary">{t('templates.title')}</h1>
                <p className="mt-2 text-lg text-text-secondary">{t('templates.description')}</p>
            </div>

            <div>
                {popularTemplates.length > 0 && (
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Star className="w-6 h-6 text-yellow-500" />
                            <h2 className="text-2xl font-bold text-text-primary">{t('templates.popularTemplates')}</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                            {popularTemplates.map(template => <TemplateCard key={template.id} template={template} t={t} />)}
                        </div>
                    </div>
                )}

                {categories.map(category => {
                    const categoryTemplates = templates.filter(t => t.category === category);
                    return categoryTemplates.length > 0 ? (
                        <div key={category}>
                            <h2 className="text-2xl font-bold text-text-primary mb-4">{category}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                                {categoryTemplates.map(template => (
                                    <TemplateCard key={template.id} template={template} t={t} />
                                ))}
                            </div>
                        </div>
                    ) : null;
                })}
            </div>
        </div>
    );
};

export default Templates;