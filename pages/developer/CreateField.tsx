import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { X, Plus, Trash2 } from 'lucide-react';
import { createTemplateField } from '../../services/templateService';
import { useLanguage } from '../../context/LanguageContext';

interface FieldOption {
    value: string;
    label: string;
}

const CreateField: React.FC = () => {
    const { templateId, stageId } = useParams<{ templateId: string; stageId: string }>();
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useLanguage();

    const [label, setLabel] = useState('');
    const [inputType, setInputType] = useState('text');
    const [fieldOptions, setFieldOptions] = useState<FieldOption[]>([]);
    const [rationale, setRationale] = useState('');
    const [isRequired, setIsRequired] = useState(false);
    const [minLength, setMinLength] = useState('');
    const [maxLength, setMaxLength] = useState('');
    const [mustBePositive, setMustBePositive] = useState(false);
    const [mustBeValidUrl, setMustBeValidUrl] = useState(false);
    const [mustBeBetween0And100, setMustBeBetween0And100] = useState(false);
    const [newOption, setNewOption] = useState({ value: '', label: '' });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);

    const inputTypes = [
        { value: 'text', label: t('developer.fieldBuilder.textShort') },
        { value: 'textarea', label: t('developer.fieldBuilder.textAreaLong') },
        { value: 'number', label: t('developer.fieldBuilder.number') },
        { value: 'dropdown', label: t('developer.fieldBuilder.dropdownSingle') },
        { value: 'multiselect', label: t('developer.fieldBuilder.multiselectCheckboxes') },
        { value: 'slider', label: t('developer.fieldBuilder.slider') },
        { value: 'url', label: t('developer.fieldBuilder.url') }
    ];

    useEffect(() => {
        // Get any passed state from navigation
        if (location.state && location.state.field) {
            const field = location.state.field;
            setLabel(field.label || '');
            setInputType(field.inputType || 'text');
            setFieldOptions(field.fieldOptions ? JSON.parse(field.fieldOptions) : []);
            setRationale(field.rationale || '');
            setIsRequired(field.isRequired || false);
            setMinLength(field.minLength?.toString() || '');
            setMaxLength(field.maxLength?.toString() || '');
            setMustBePositive(field.mustBePositive || false);
            setMustBeValidUrl(field.mustBeValidUrl || false);
            setMustBeBetween0And100(field.mustBeBetween0And100 || false);
        }
    }, [location.state]);

    const addOption = () => {
        if (newOption.value && newOption.label) {
            setFieldOptions([...fieldOptions, { ...newOption }]);
            setNewOption({ value: '', label: '' });
        }
    };

    const removeOption = (index: number) => {
        setFieldOptions(fieldOptions.filter((_: any, i: number) => i !== index));
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (!label.trim()) {
            newErrors.label = t('developer.fieldBuilder.fieldLabelRequired');
        }

        if (!inputType) {
            newErrors.inputType = t('developer.fieldBuilder.inputTypeRequired');
        }

        if ((inputType === 'dropdown' || inputType === 'multiselect') && fieldOptions.length === 0) {
            newErrors.fieldOptions = t('developer.fieldBuilder.fieldOptionsRequired');
        }

        if (!rationale.trim()) {
            newErrors.rationale = t('developer.fieldBuilder.rationaleRequired');
        } else if (rationale.length < 50) {
            newErrors.rationale = t('developer.fieldBuilder.rationaleMin');
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        setLoading(true);
        try {
            const token = sessionStorage.getItem('token') || undefined;

            // Ensure templateId is valid
            const parsedTemplateId = parseInt(templateId || '0');
            if (isNaN(parsedTemplateId) || parsedTemplateId <= 0) {
                throw new Error('Invalid template ID');
            }

            const fieldData = {
                templateId: parsedTemplateId,
                stageNumber: parseInt(stageId || '1'),
                fieldOrder: 0, // Will be set properly when saved in template
                label,
                inputType,
                fieldOptions: (inputType === 'dropdown' || inputType === 'multiselect') ? JSON.stringify(fieldOptions) : null,
                rationale,
                isRequired,
                minLength: minLength ? parseInt(minLength) : null,
                maxLength: maxLength ? parseInt(maxLength) : null,
                mustBePositive,
                mustBeValidUrl,
                mustBeBetween0And100
            };

            await createTemplateField(fieldData, token);

            // Automatically navigate back to template builder after successful save
            // Using the correct route pattern from App.tsx: /developer/template/:id/edit
            navigate(`/developer/template/${parsedTemplateId}/edit`, {
                state: {
                    message: 't("auto.CreateField.cb35dfd0")',
                    messageType: 'success'
                }
            });
        } catch (error) {
            console.error('Failed to create field:', error);
            alert('Failed to create field. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        // Using the correct route pattern from App.tsx: /developer/template/:id/edit
        navigate(`/developer/template/${templateId}/edit`);
    };

    return (
        <div className={t("auto.AdminLayout.6adb5be9")}>
            <div className="flex items-center mb-6">
                <button
                    onClick={handleCancel}
                    className="flex items-center text-gray-600 hover:text-gray-900 me-4"
                >
                    <X size={20} />
                    {t('developer.fieldBuilder.backToTemplate')}
                </button>
                <h1 className="text-2xl font-bold text-gray-800">
                    {t('developer.fieldBuilder.addNewField')}
                </h1>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6 max-w-2xl">
                <form onSubmit={handleSave}>
                    <div className={t("auto.CreateField.028d2a3b")}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {t('developer.fieldBuilder.inputFieldLabel')}
                            </label>
                            <input
                                type="text"
                                value={label}
                                onChange={(e) => setLabel(e.target.value)}
                                className={`w-full px-3 py-2 border rounded-md ${errors.label ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500`}
                                placeholder={t('developer.fieldBuilder.fieldNamePlaceholder')}
                                aria-label={t('developer.fieldBuilder.inputFieldLabelAria')}
                            />
                            {errors.label && <p className="mt-1 text-sm text-red-600">{errors.label}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {t('developer.fieldBuilder.inputType')}
                            </label>
                            <select
                                value={inputType}
                                onChange={(e) => setInputType(e.target.value)}
                                className={`w-full px-3 py-2 border rounded-md ${errors.inputType ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500`}
                                aria-label={t('developer.fieldBuilder.inputTypeAria')}
                            >
                                <option value="">{t('developer.fieldBuilder.selectInputType')}</option>
                                {inputTypes.map((type) => (
                                    <option key={type.value} value={type.value}>
                                        {type.label}
                                    </option>
                                ))}
                            </select>
                            {errors.inputType && <p className="mt-1 text-sm text-red-600">{errors.inputType}</p>}
                        </div>

                        {(inputType === 'dropdown' || inputType === 'multiselect') && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {t('developer.fieldBuilder.fieldOptions')}
                                </label>
                                <div className="space-y-2 mb-3">
                                    {fieldOptions.map((option, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <input
                                                type="text"
                                                value={option.value}
                                                readOnly
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                                                aria-label={`${t('developer.fieldBuilder.optionValue')} ${index + 1}`}
                                            />
                                            <input
                                                type="text"
                                                value={option.label}
                                                readOnly
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                                                aria-label={`${t('developer.fieldBuilder.optionLabel')} ${index + 1}`}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeOption(index)}
                                                className="text-red-500 hover:text-red-700 p-2"
                                                aria-label={`Remove option ${index + 1}`}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                <div className={t("auto.AdminLogs.9edfbb10")}>
                                    <input
                                        type="text"
                                        value={newOption.value}
                                        onChange={(e) => setNewOption({ ...newOption, value: e.target.value })}
                                        placeholder={t('developer.fieldBuilder.valuePlaceholder')}
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                        aria-label={t('developer.fieldBuilder.optionValue')}
                                    />
                                    <input
                                        type="text"
                                        value={newOption.label}
                                        onChange={(e) => setNewOption({ ...newOption, label: e.target.value })}
                                        placeholder={t('developer.fieldBuilder.labelPlaceholder')}
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                        aria-label={t('developer.fieldBuilder.optionLabel')}
                                    />
                                    <button
                                        type="button"
                                        onClick={addOption}
                                        className="px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center"
                                        aria-label={t('developer.fieldBuilder.addOption')}
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>
                                {errors.fieldOptions && <p className="mt-1 text-sm text-red-600">{errors.fieldOptions}</p>}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {t('developer.fieldBuilder.rationaleAndPrompt')}
                            </label>
                            <textarea
                                value={rationale}
                                onChange={(e) => setRationale(e.target.value)}
                                rows={4}
                                className={`w-full px-3 py-2 border rounded-md ${errors.rationale ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500`}
                                placeholder={t('developer.fieldBuilder.rationalePlaceholder')}
                                aria-label={t('developer.fieldBuilder.rationaleAria')}
                            />
                            <p className="mt-1 text-sm text-gray-500">
                                Explain why this field exists and how the AI should use the user's answer in the final analysis.
                            </p>
                            {errors.rationale && <p className="mt-1 text-sm text-red-600">{errors.rationale}</p>}
                        </div>

                        <div>
                            <h3 className="text-lg font-medium text-gray-800 mb-3">{t('developer.fieldBuilder.validationRules')}</h3>

                            <div className={t("auto.AdminLogs.d84d5bcb")}>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={t("auto.CreateField.2a9d32d1")}
                                        checked={isRequired}
                                        onChange={(e) => setIsRequired(e.target.checked)}
                                        className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                                        aria-label={t('developer.fieldBuilder.requiredFieldAria')}
                                    />
                                    <label htmlFor={t("auto.CreateField.2a9d32d1")} className="ms-2 block text-sm text-gray-700">
                                        {t('developer.fieldBuilder.requiredQuestion')}
                                    </label>
                                </div>

                                {inputType === 'text' || inputType === 'textarea' ? (
                                    <>
                                        <div>
                                            <label className="block text-sm text-gray-700 mb-1">
                                                {t('developer.fieldBuilder.minLengthLabel')}
                                            </label>
                                            <input
                                                type="number"
                                                value={minLength}
                                                onChange={(e) => setMinLength(e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                                aria-label={t('developer.fieldBuilder.minLengthAria')}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm text-gray-700 mb-1">
                                                {t('developer.fieldBuilder.maxLengthLabel')}
                                            </label>
                                            <input
                                                type="number"
                                                value={maxLength}
                                                onChange={(e) => setMaxLength(e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                                aria-label={t('developer.fieldBuilder.maxLengthAria')}
                                            />
                                        </div>
                                    </>
                                ) : null}

                                {inputType === 'number' && (
                                    <>
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id={t("auto.CreateField.bd293dc2")}
                                                checked={mustBePositive}
                                                onChange={(e) => setMustBePositive(e.target.checked)}
                                                className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                                                aria-label={t('developer.fieldBuilder.positiveNumberAria')}
                                            />
                                            <label htmlFor={t("auto.CreateField.bd293dc2")} className="ms-2 block text-sm text-gray-700">
                                                {t('developer.fieldBuilder.positiveNumberQuestion')}
                                            </label>
                                        </div>

                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id={t("auto.CreateField.c30d25fd")}
                                                checked={mustBeBetween0And100}
                                                onChange={(e) => setMustBeBetween0And100(e.target.checked)}
                                                className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                                                aria-label={t('developer.fieldBuilder.between0And100Aria')}
                                            />
                                            <label htmlFor={t("auto.CreateField.c30d25fd")} className="ms-2 block text-sm text-gray-700">
                                                {t('developer.fieldBuilder.between0And100Question')}
                                            </label>
                                        </div>
                                    </>
                                )}

                                {inputType === 'url' && (
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id={t("auto.CreateField.84c07958")}
                                            checked={mustBeValidUrl}
                                            onChange={(e) => setMustBeValidUrl(e.target.checked)}
                                            className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                                            aria-label={t('developer.fieldBuilder.validUrlQuestion')}
                                        />
                                        <label htmlFor={t("auto.CreateField.84c07958")} className="ms-2 block text-sm text-gray-700">
                                            {t('developer.fieldBuilder.validUrlQuestion')}
                                        </label>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex rtl:justify-start space-x-3 mt-8">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                            disabled={loading}
                        >
                            {t('developer.fieldBuilder.cancel')}
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin -ms-1 me-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    {t('developer.fieldBuilder.saving')}
                                </>
                            ) : (
                                t('developer.fieldBuilder.saveField')
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateField;