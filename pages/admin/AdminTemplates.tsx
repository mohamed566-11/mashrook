import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Plus, Edit, Trash2, Eye, Star } from 'lucide-react';

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

const AdminTemplates: React.FC = () => {
    const { t } = useLanguage();
    const [templates, setTemplates] = useState<Template[]>([
        {
            id: 1,
            name: t('developer.templateBuilder.aiBusinessValidator'),
            description: t('developer.templateBuilder.aiBusinessValidatorDesc'),
            category: t('developer.templateBuilder.businessValidation'),
            duration: 25,
            isPopular: true,
            createdAt: '2025-01-15',
            fieldsCount: 12
        },
        {
            id: 2,
            name: t('developer.templateBuilder.aiSwotBuilder'),
            description: t('developer.templateBuilder.aiSwotBuilderDesc'),
            category: t('developer.templateBuilder.swotAndPestel'),
            duration: 30,
            isPopular: true,
            createdAt: '2025-01-16',
            fieldsCount: 18
        },
        {
            id: 3,
            name: t('developer.templateBuilder.buildingMarketingPlan'),
            description: t('developer.templateBuilder.buildingMarketingPlanDesc'),
            category: t('developer.templateBuilder.marketing'),
            duration: 35,
            isPopular: false,
            createdAt: '2025-01-17',
            fieldsCount: 15
        },
        {
            id: 4,
            name: t('developer.templateBuilder.financialPerformanceAssessment'),
            description: t('developer.templateBuilder.financialPerformanceAssessmentDesc'),
            category: t('developer.templateBuilder.financial'),
            duration: 40,
            isPopular: false,
            createdAt: '2025-01-18',
            fieldsCount: 20
        },
        {
            id: 5,
            name: t('developer.templateBuilder.gapAnalysis'),
            description: t('developer.templateBuilder.gapAnalysisDesc'),
            category: t('developer.templateBuilder.analysis'),
            duration: 45,
            isPopular: true,
            createdAt: '2025-01-19',
            fieldsCount: 16
        }
    ]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [showPopularOnly, setShowPopularOnly] = useState(false);

    // Get unique categories from templates
    const categories = ['all', ...new Set(templates.map(t => t.category))];

    // Filter templates based on search term, category, and popularity
    const filteredTemplates = templates.filter(template => {
        const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            template.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
        const matchesPopular = !showPopularOnly || template.isPopular;
        return matchesSearch && matchesCategory && matchesPopular;
    });

    const handleAddTemplate = () => {
        // In a real implementation, this would navigate to a template creation page
        alert(t('admin.templates.addTemplateAction'));
    };

    const handleEditTemplate = (id: number) => {
        // In a real implementation, this would navigate to a template editing page
        alert(t('admin.templates.editTemplateAction').replace('{id}', id.toString()));
    };

    const handleDeleteTemplate = (id: number) => {
        if (window.confirm(t('admin.templates.deleteConfirmation'))) {
            setTemplates(templates.filter(t => t.id !== id));
        }
    };

    const handleViewTemplate = (id: number) => {
        // In a real implementation, this would navigate to a template preview page
        alert(t('admin.templates.viewTemplateAction').replace('{id}', id.toString()));
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">{t('admin.templates.title')}</h1>
                    <p className="text-gray-600 mt-1">{t('admin.templates.description')}</p>
                </div>
                <button
                    onClick={handleAddTemplate}
                    className="mt-4 md:mt-0 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                    <Plus size={20} />
                    {t('admin.templates.addTemplate')}
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                            {t('common.search')}
                        </label>
                        <input
                            type="text"
                            id="search"
                            placeholder={t('admin.templates.searchPlaceholder')}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                            {t('developer.templateBuilder.category')}
                        </label>
                        <select
                            id="category"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            {categories.map(category => (
                                <option key={category} value={category}>
                                    {category === 'all' ? t('admin.templates.allCategories') : category}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-end">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={showPopularOnly}
                                onChange={(e) => setShowPopularOnly(e.target.checked)}
                                className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">{t('admin.templates.showPopularOnly')}</span>
                        </label>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="text-2xl font-bold text-green-600">{templates.length}</div>
                    <div className="text-gray-600">{t('admin.templates.totalTemplates')}</div>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="text-2xl font-bold text-blue-600">
                        {templates.filter(t => t.isPopular).length}
                    </div>
                    <div className="text-gray-600">{t('admin.templates.popularTemplates')}</div>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="text-2xl font-bold text-purple-600">
                        {Math.round(templates.reduce((acc, t) => acc + t.duration, 0) / templates.length) || 0}
                    </div>
                    <div className="text-gray-600">{t('admin.templates.avgDuration')}</div>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="text-2xl font-bold text-orange-600">
                        {Math.round(templates.reduce((acc, t) => acc + t.fieldsCount, 0) / templates.length) || 0}
                    </div>
                    <div className="text-gray-600">{t('admin.templates.avgFields')}</div>
                </div>
            </div>

            {/* Templates List */}
            {filteredTemplates.length === 0 ? (
                <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                    <p className="text-gray-500 mb-4">{t('admin.templates.noTemplatesFound')}</p>
                    <button
                        onClick={handleAddTemplate}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 mx-auto transition-colors"
                    >
                        <Plus size={20} />
                        {t('admin.templates.createFirstTemplate')}
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTemplates.map(template => (
                        <div key={template.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        {template.name}
                                    </h3>
                                    {template.isPopular && (
                                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded flex items-center gap-1">
                                            <Star size={12} />
                                            {t('common.popular')}
                                        </span>
                                    )}
                                </div>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                    {template.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                        {template.category}
                                    </span>
                                    <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                        {template.duration} {t('templates.minutes')}
                                    </span>
                                    <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                        {template.fieldsCount} {t('developer.fields')}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-sm text-gray-500">
                                    <span>
                                        {t('common.createdAt')}: {template.createdAt}
                                    </span>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-6 py-3 flex justify-end space-x-2">
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
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminTemplates;