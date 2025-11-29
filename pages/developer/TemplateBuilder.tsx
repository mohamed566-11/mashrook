import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ChevronLeft, Save, Plus, Edit, Trash2, GripVertical, Eye } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { createTemplate, updateTemplate, getTemplateById, listCategories, createTemplateField, listTemplateFields, updateTemplateField } from '../../services/templateService';
import { useLanguage } from '../../context/LanguageContext';

interface TemplateFormData {
    name: string;
    description: string;
    category: string;
    duration: string;
    isPopular: boolean;
}

interface TemplateField {
    id: number | string; // Can be number (from DB) or string (temporary IDs)
    templateId: number;
    stageNumber: number;
    fieldOrder: number;
    label: string;
    inputType: string;
    fieldOptions: string | null;
    rationale: string;
    isRequired: boolean;
    minLength: number | null;
    maxLength: number | null;
    mustBePositive: boolean;
    mustBeValidUrl: boolean;
    mustBeBetween0And100: boolean;
    createdAt?: string;
}

const TemplateBuilder: React.FC = () => {
    const { id } = useParams<{ id?: string }>();
    const navigate = useNavigate();
    const location = useLocation();
    const isEditing = !!id;
    const { t } = useLanguage();

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<TemplateFormData>({
        name: '',
        description: '',
        category: '',
        duration: '30',
        isPopular: false
    });
    const [templateName, setTemplateName] = useState(''); // For displaying "Now Editing: [template name]"
    const [availableCategories, setAvailableCategories] = useState<string[]>([]);
    const [stages, setStages] = useState([
        { id: 1, name: t('developer.templateBuilder.basicInfo'), fields: [] as TemplateField[] },
        { id: 2, name: t('developer.templateBuilder.financialDetails'), fields: [] as TemplateField[] },
        { id: 3, name: t('developer.templateBuilder.operations'), fields: [] as TemplateField[] },
        { id: 4, name: t('developer.templateBuilder.marketStrategy'), fields: [] as TemplateField[] },
        { id: 5, name: t('developer.templateBuilder.industrySpecific'), fields: [] as TemplateField[] }
    ]);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const [createdTemplateId, setCreatedTemplateId] = useState<number | null>(null);

    useEffect(() => {
        // Check for success messages from field creation
        if (location.state && location.state.message) {
            // Display message to user (in a real app, you might use a toast notification)
            console.log(location.state.message);
            // Reload template fields to show the newly added field
            if (createdTemplateId) {
                loadTemplate(createdTemplateId);
            }
            // Clear the state
            window.history.replaceState({}, document.title);
        }

        loadCategories();
        if (isEditing && id) {
            loadTemplate(parseInt(id));
        }
    }, [id, isEditing, createdTemplateId]);

    const loadCategories = async () => {
        try {
            const token = sessionStorage.getItem('token') || undefined;
            const categories = await listCategories(token);
            setAvailableCategories(categories);
        } catch (err) {
            console.error('Failed to load categories', err);
        }
    };

    const loadTemplate = async (templateId: number) => {
        setLoading(true);
        try {
            const token = sessionStorage.getItem('token') || undefined;
            const template = await getTemplateById(templateId, token);
            setFormData({
                name: template.name,
                description: template.description || '',
                category: template.category,
                duration: template.duration.toString(),
                isPopular: template.isPopular
            });
            setTemplateName(template.name); // Set the template name for display
            setCreatedTemplateId(templateId);

            // Load fields for each stage
            try {
                const fields = await listTemplateFields(templateId, token);
                console.log('TemplateBuilder: Loaded fields', fields);
                // Group fields by stage
                const updatedStages = stages.map(stage => ({
                    ...stage,
                    fields: fields.filter(field => field.stageNumber === stage.id)
                }));
                setStages(updatedStages);
            } catch (fieldErr) {
                console.error('Failed to load template fields', fieldErr);
            }
        } catch (err) {
            console.error('Failed to load template', err);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Update templateName when name field changes
        if (name === 'name') {
            setTemplateName(value);
        }

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        handleInputChange(e);
    };

    const handleNewCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // This function is no longer needed with the simplified category selection
        handleInputChange(e);
    };

    const validateStep1 = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = t('developer.templateBuilder.templateNameRequired');
        } else if (formData.name.length < 5) {
            newErrors.name = t('developer.templateBuilder.templateNameMin');
        } else if (formData.name.length > 100) {
            newErrors.name = t('developer.templateBuilder.templateNameMax');
        }

        if (!formData.description.trim()) {
            newErrors.description = t('developer.templateBuilder.descriptionRequired');
        } else if (formData.description.length < 20) {
            newErrors.description = t('developer.templateBuilder.descriptionMin');
        } else if (formData.description.length > 280) {
            newErrors.description = t('developer.templateBuilder.descriptionMax');
        }

        if (!formData.category.trim()) {
            newErrors.category = t('developer.templateBuilder.categoryRequired');
        }

        if (!formData.duration.trim()) {
            newErrors.duration = t('developer.templateBuilder.timeRequired');
        } else if (isNaN(parseInt(formData.duration)) || parseInt(formData.duration) <= 0) {
            newErrors.duration = t('developer.templateBuilder.timePositive');
        } else if (parseInt(formData.duration) > 120) {
            newErrors.duration = t('developer.templateBuilder.timeMax');
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSaveAndDefineInputs = () => {
        if (validateStep1()) {
            setStep(2);
        }
    };

    const handleSaveTemplate = async () => {
        console.log('TemplateBuilder: handleSaveTemplate called');
        setLoading(true);
        try {
            const token = sessionStorage.getItem('token') || undefined;
            const templateData = {
                name: formData.name,
                description: formData.description,
                category: formData.category,
                duration: parseInt(formData.duration),
                isPopular: formData.isPopular
            };

            let templateId = createdTemplateId;

            if (isEditing && id) {
                // Update existing template
                console.log('TemplateBuilder: Updating existing template', id);
                await updateTemplate(parseInt(id), templateData, token);
                templateId = parseInt(id);
            } else {
                // Create new template
                console.log('TemplateBuilder: Creating new template');
                const createdTemplate = await createTemplate(templateData, token);
                templateId = createdTemplate.id;
                setCreatedTemplateId(templateId);
                console.log('TemplateBuilder: Created template with ID', templateId);
            }

            // Save all fields for the template
            if (templateId) {
                console.log('TemplateBuilder: Saving fields for template', templateId);
                // Collect all fields from all stages
                const allFields: any[] = [];
                stages.forEach(stage => {
                    stage.fields.forEach(field => {
                        allFields.push({
                            ...field,
                            templateId: templateId, // Always use the correct templateId
                            stageNumber: stage.id
                        });
                    });
                });

                console.log('TemplateBuilder: Found', allFields.length, 'fields to save');

                // Save each field
                for (const field of allFields) {
                    try {
                        // If it's a new field (has temporary ID), create it
                        if (typeof field.id === 'string' && field.id.startsWith('temp_')) { // Temporary IDs are strings starting with 'temp_'
                            console.log('TemplateBuilder: Creating new field', field);
                            const fieldData = {
                                templateId: field.templateId,
                                stageNumber: field.stageNumber,
                                fieldOrder: field.fieldOrder,
                                label: field.label,
                                inputType: field.inputType,
                                fieldOptions: field.fieldOptions,
                                rationale: field.rationale,
                                isRequired: field.isRequired,
                                minLength: field.minLength,
                                maxLength: field.maxLength,
                                mustBePositive: field.mustBePositive,
                                mustBeValidUrl: field.mustBeValidUrl,
                                mustBeBetween0And100: field.mustBeBetween0And100
                            };
                            await createTemplateField(fieldData, token);
                            console.log('TemplateBuilder: Created field successfully');
                        }
                        // If it's an existing field (has numeric ID), update it
                        else if (typeof field.id === 'number') {
                            console.log('TemplateBuilder: Updating existing field', field);
                            const fieldData = {
                                stageNumber: field.stageNumber,
                                fieldOrder: field.fieldOrder,
                                label: field.label,
                                inputType: field.inputType,
                                fieldOptions: field.fieldOptions,
                                rationale: field.rationale,
                                isRequired: field.isRequired,
                                minLength: field.minLength,
                                maxLength: field.maxLength,
                                mustBePositive: field.mustBePositive,
                                mustBeValidUrl: field.mustBeValidUrl,
                                mustBeBetween0And100: field.mustBeBetween0And100
                            };
                            await updateTemplateField(field.id, fieldData, token);
                            console.log('TemplateBuilder: Updated field successfully');
                        }
                    } catch (fieldErr) {
                        console.error('Failed to save field', field, fieldErr);
                    }
                }
            }

            console.log('TemplateBuilder: Navigation to /developer/templates');
            navigate('/developer/templates');
        } catch (err) {
            console.error('Failed to save template', err);
            alert('Failed to save template. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleAddField = (stageId: number) => {
        // Navigate to the new field creation page instead of opening modal
        if (createdTemplateId) {
            // Using the correct route pattern from App.tsx: /developer/template/:templateId/field/:stageId/new
            navigate(`/developer/template/${createdTemplateId}/field/${stageId}/new`);
        } else {
            // If template hasn't been created yet, save it first
            handleSaveAndNavigateToField(stageId);
        }
    };

    const handleSaveAndNavigateToField = async (stageId: number) => {
        if (validateStep1()) {
            setLoading(true);
            try {
                const token = sessionStorage.getItem('token') || undefined;
                const templateData = {
                    name: formData.name,
                    description: formData.description,
                    category: formData.category,
                    duration: parseInt(formData.duration),
                    isPopular: formData.isPopular
                };

                // Log the template data for debugging
                console.log('TemplateBuilder: Template data to be saved', templateData);

                let templateId = createdTemplateId;

                if (isEditing && id) {
                    // Update existing template
                    await updateTemplate(parseInt(id), templateData, token);
                    templateId = parseInt(id);
                } else {
                    // Create new template
                    const createdTemplate = await createTemplate(templateData, token);
                    templateId = createdTemplate.id;
                    setCreatedTemplateId(templateId);
                }

                // Navigate to field creation page using the correct route pattern
                navigate(`/developer/template/${templateId}/field/${stageId}/new`);
            } catch (err: any) {
                console.error('Failed to save template', err);
                // Show more specific error message
                let errorMessage = 'Failed to save template. Please try again.';
                if (err.message) {
                    errorMessage = err.message;
                }
                alert(errorMessage);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleEditField = (field: any) => {
        // For editing, we'll still navigate to a separate page but pass the field data
        if (createdTemplateId) {
            // Using the correct route pattern from App.tsx: /developer/template/:templateId/field/:stageId/new
            navigate(`/developer/template/${createdTemplateId}/field/${field.stageNumber}/new`, {
                state: { field }
            });
        }
    };

    const handleDeleteField = (fieldId: number | string, stageId: number) => {
        setStages(prev => {
            const newStages = [...prev];
            const stageIndex = newStages.findIndex(s => s.id === stageId);
            if (stageIndex !== -1) {
                newStages[stageIndex].fields = newStages[stageIndex].fields.filter(f => f.id !== fieldId);
                // Update fieldOrder for remaining fields
                newStages[stageIndex].fields.forEach((field, index) => {
                    field.fieldOrder = index;
                });
            }
            return newStages;
        });
    };

    const handleDragEnd = (result: any) => {
        const { destination, source, draggableId } = result;

        // Dropped outside the list
        if (!destination) return;

        // Dropped in the same place
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        // Find the stage and update field order
        setStages(prev => {
            const newStages = [...prev];
            const sourceStageIndex = newStages.findIndex(s => s.id === parseInt(source.droppableId));
            const destStageIndex = newStages.findIndex(s => s.id === parseInt(destination.droppableId));

            if (sourceStageIndex === destStageIndex) {
                // Reordering within the same stage
                const newFields = Array.from(newStages[sourceStageIndex].fields);
                const [movedField] = newFields.splice(source.index, 1);
                newFields.splice(destination.index, 0, movedField);

                // Update fieldOrder
                newFields.forEach((field, index) => {
                    field.fieldOrder = index;
                });

                newStages[sourceStageIndex].fields = newFields;
            } else {
                // Moving between stages
                const sourceFields = Array.from(newStages[sourceStageIndex].fields);
                const destFields = Array.from(newStages[destStageIndex].fields);
                const [movedField] = sourceFields.splice(source.index, 1);

                // Update stage number
                movedField.stageNumber = parseInt(destination.droppableId);
                destFields.splice(destination.index, 0, movedField);

                // Update fieldOrder for both stages
                sourceFields.forEach((field, index) => {
                    field.fieldOrder = index;
                });

                destFields.forEach((field, index) => {
                    field.fieldOrder = index;
                });

                newStages[sourceStageIndex].fields = sourceFields;
                newStages[destStageIndex].fields = destFields;
            }

            return newStages;
        });
    };

    if (loading && isEditing) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="flex items-center mb-6">
                <button
                    onClick={() => navigate('/developer/templates')}
                    className="flex items-center text-gray-600 hover:text-gray-900 me-4"
                >
                    <ChevronLeft size={20} />
                    {t('developer.templateBuilder.backToTemplates')}
                </button>
                <h1 className="text-2xl font-bold text-gray-800">
                    {isEditing ? t('developer.templateBuilder.editTemplate') : t('developer.templateBuilder.createTemplate')}
                </h1>
            </div>

            {/* Step Indicator */}
            <div className="flex items-center mb-8">
                <div className={`flex items-center ${step === 1 ? 'text-green-600' : 'text-gray-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center me-2 ${step === 1 ? 'bg-green-100' : 'bg-gray-100'}`}>
                        1
                    </div>
                    <span>{t('developer.templateBuilder.templateMetadata')}</span>
                </div>
                <div className="flex-1 h-px bg-gray-200 mx-4"></div>
                <div className={`flex items-center ${step === 2 ? 'text-green-600' : 'text-gray-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center me-2 ${step === 2 ? 'bg-green-100' : 'bg-gray-100'}`}>
                        2
                    </div>
                    <span>{t('developer.templateBuilder.defineInputs')}</span>
                </div>
            </div>

            {step === 1 ? (
                /* Step 1: Template Metadata */
                <div className="bg-white rounded-lg border border-gray-200 p-6 max-w-2xl">
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">{t('developer.templateBuilder.templateMetadata')}</h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {t('developer.templateBuilder.templateName')} *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500`}
                                placeholder={t('developer.templateBuilder.templateNamePlaceholder')}
                            />
                            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {t('developer.templateBuilder.shortDescription')} *
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                rows={3}
                                className={`w-full px-3 py-2 border rounded-md ${errors.description ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500`}
                                placeholder={t('developer.templateBuilder.descriptionPlaceholder')}
                            />
                            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {t('developer.templateBuilder.estimatedTime')} *
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    name="duration"
                                    value={formData.duration}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 border rounded-md ${errors.duration ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500`}
                                    placeholder={t('developer.templateBuilder.durationPlaceholder')}
                                    aria-label={t('developer.templateBuilder.estimatedTimeAria')}
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pe-3 pointer-events-none">
                                    min
                                </div>
                            </div>
                            {errors.duration && <p className="mt-1 text-sm text-red-600">{errors.duration}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {t('developer.templateBuilder.category')} *
                            </label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-md ${errors.category ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500`}
                                aria-label={t('developer.templateBuilder.categoryAria')}
                            >
                                <option value="">{t('developer.templateBuilder.selectCategory')}</option>
                                {availableCategories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                                <option value="General">{t('developer.templateBuilder.generalCategory')}</option>
                            </select>
                            {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="isPopular"
                                checked={formData.isPopular}
                                onChange={handleInputChange}
                                className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                                aria-label={t('developer.templateBuilder.markPopularAria')}
                            />
                            <label className="ms-2 block text-sm text-gray-700">
                                {t('developer.templateBuilder.markPopular')}
                            </label>
                        </div>
                    </div>

                    <div className="flex rtl:justify-start mt-8 space-x-3">
                        <button
                            onClick={() => navigate('/developer/templates')}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                        >
                            {t('common.cancel')}
                        </button>
                        <button
                            onClick={handleSaveAndDefineInputs}
                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin -ms-1 me-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    {t('developer.templateBuilder.saving')}...
                                </>
                            ) : (
                                <>
                                    <Save size={16} className="me-2" />
                                    {t('developer.templateBuilder.saveAndDefine')}
                                </>
                            )}
                        </button>
                    </div>
                </div>
            ) : (
                /* Step 2: Define Inputs */
                <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">
                        {t('developer.templateBuilder.nowEditing')} {templateName || formData.name}
                    </h2>

                    <DragDropContext onDragEnd={handleDragEnd}>
                        <div className="space-y-6">
                            {stages.map((stage) => (
                                <div key={stage.id} className="bg-white rounded-lg border border-gray-200">
                                    <div className="px-6 py-4 border-b border-gray-200">
                                        <h3 className="text-lg font-medium text-gray-800">{stage.name}</h3>
                                    </div>

                                    <Droppable droppableId={stage.id.toString()} isDropDisabled={false} isCombineEnabled={false}>
                                        {(provided) => (
                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                className="p-4"
                                            >
                                                {stage.fields.map((field, index) => (
                                                    <Draggable key={field.id.toString()} draggableId={field.id.toString()} index={index}>
                                                        {(provided) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                className="bg-gray-50 rounded-md p-4 mb-3 flex items-center"
                                                            >
                                                                <div
                                                                    {...provided.dragHandleProps}
                                                                    className="me-3 cursor-move text-gray-400"
                                                                >
                                                                    <GripVertical size={20} />
                                                                </div>
                                                                <div className="min-w-0 flex-grow">
                                                                    <div className="font-medium">{field.label}</div>
                                                                    <div className="text-sm text-gray-600">{field.inputType}</div>
                                                                </div>
                                                                <div className="flex space-x-2">
                                                                    <button
                                                                        onClick={() => handleEditField(field)}
                                                                        className="text-blue-500 hover:text-blue-700"
                                                                        aria-label={t('developer.templateBuilder.editFieldAria')}
                                                                    >
                                                                        <Edit size={16} />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleDeleteField(field.id, stage.id)}
                                                                        className="text-red-500 hover:text-red-700"
                                                                        aria-label={t('developer.templateBuilder.deleteFieldAria')}
                                                                    >
                                                                        <Trash2 size={16} />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}

                                                <button
                                                    onClick={() => handleAddField(stage.id)}
                                                    className="w-full py-3 border-2 border-dashed border-gray-300 rounded-md text-gray-500 hover:border-green-400 hover:text-green-600 flex items-center justify-center"
                                                    aria-label={t('developer.templateBuilder.addNewInputFieldAria')}
                                                >
                                                    <Plus size={16} className="me-2" />
                                                    {t('developer.templateBuilder.addNewField')}
                                                </button>
                                            </div>
                                        )}
                                    </Droppable>
                                </div>
                            ))}
                        </div>
                    </DragDropContext>

                    <div className="flex rtl:justify-start mt-8 space-x-3">
                        <button
                            onClick={() => setStep(1)}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                        >
                            {t('developer.templateBuilder.backToMetadata')}
                        </button>
                        <button
                            onClick={handleSaveTemplate}
                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin -ms-1 me-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    {t('developer.templateBuilder.saving')}...
                                </>
                            ) : (
                                <>
                                    <Save size={16} className="me-2" />
                                    {t('developer.templateBuilder.saveTemplate')}
                                </>
                            )}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TemplateBuilder;