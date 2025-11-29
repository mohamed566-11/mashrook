import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

interface FieldOption {
    value: string;
    label: string;
}

interface FieldBuilderProps {
    field?: any;
    onSave: (field: any) => void;
    onCancel: () => void;
}

const FieldBuilder: React.FC<FieldBuilderProps> = ({ field, onSave, onCancel }) => {
    const navigate = useNavigate();
    const { templateId, stageId } = useParams<{ templateId: string; stageId: string }>();
    const { t } = useLanguage();

    const [label, setLabel] = useState(field?.label || '');
    const [inputType, setInputType] = useState(field?.inputType || 'text');
    const [fieldOptions, setFieldOptions] = useState<FieldOption[]>(field?.fieldOptions ? JSON.parse(field.fieldOptions) : []);
    const [rationale, setRationale] = useState(field?.rationale || '');
    const [isRequired, setIsRequired] = useState(field?.isRequired || false);
    const [minLength, setMinLength] = useState(field?.minLength?.toString() || '');
    const [maxLength, setMaxLength] = useState(field?.maxLength?.toString() || '');
    const [mustBePositive, setMustBePositive] = useState(field?.mustBePositive || false);
    const [mustBeValidUrl, setMustBeValidUrl] = useState(field?.mustBeValidUrl || false);
    const [mustBeBetween0And100, setMustBeBetween0And100] = useState(field?.mustBeBetween0And100 || false);
    const [newOption, setNewOption] = useState({ value: '', label: '' });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const inputTypes = [
        { value: 'text', label: t('fieldBuilder.textShort') },
        { value: 'textarea', label: t('fieldBuilder.textAreaLong') },
        { value: 'number', label: t('fieldBuilder.number') },
        { value: 'dropdown', label: t('fieldBuilder.dropdownSingle') },
        { value: 'multiselect', label: t('fieldBuilder.multiselectCheckboxes') },
        { value: 'slider', label: t('fieldBuilder.slider') },
        { value: 'url', label: t('fieldBuilder.url') }
    ];

    // Reset form when field prop changes
    useEffect(() => {
        if (field) {
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
        } else {
            // Reset to defaults for new field
            setLabel('');
            setInputType('text');
            setFieldOptions([]);
            setRationale('');
            setIsRequired(false);
            setMinLength('');
            setMaxLength('');
            setMustBePositive(false);
            setMustBeValidUrl(false);
            setMustBeBetween0And100(false);
            setNewOption({ value: '', label: '' });
        }
    }, [field]);

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
            newErrors.label = t('fieldBuilder.fieldLabelRequired');
        }

        if (!inputType) {
            newErrors.inputType = t('fieldBuilder.inputTypeRequired');
        }

        if ((inputType === 'dropdown' || inputType === 'multiselect') && fieldOptions.length === 0) {
            newErrors.fieldOptions = t('fieldBuilder.fieldOptionsRequired');
        }

        if (!rationale.trim()) {
            newErrors.rationale = t('fieldBuilder.rationaleRequired');
        } else if (rationale.length < 50) {
            newErrors.rationale = t('fieldBuilder.rationaleMin');
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = (e?: React.MouseEvent | React.FormEvent) => {
        // Prevent default behavior to avoid any form submission or navigation
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        console.log('FieldBuilder: handleSave called');
        if (validate()) {
            const fieldData = {
                id: field?.id,
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

            console.log('FieldBuilder: Calling onSave with fieldData:', fieldData);
            try {
                onSave(fieldData);
                console.log('FieldBuilder: onSave completed successfully');
            } catch (error) {
                console.error('FieldBuilder: Error in onSave:', error);
            }
        } else {
            console.log('FieldBuilder: Validation failed', errors);
        }
    };

    const handleCancel = () => {
        if (templateId) {
            navigate(`/developer/templates/${templateId}/edit`);
        } else {
            onCancel();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <form onSubmit={handleSave} onClick={(e) => e.stopPropagation()}>
                    <div className={t("auto.AdminLayout.6adb5be9")}>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-800">
                                {field ? t('fieldBuilder.editField') : t('fieldBuilder.addNewField')}
                            </h2>
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="text-gray-500 hover:text-gray-700"
                                aria-label={t("common.close")}
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className={t("auto.CreateField.028d2a3b")}>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {t('fieldBuilder.inputFieldLabel')}
                                </label>
                                <input
                                    type="text"
                                    value={label}
                                    onChange={(e) => setLabel(e.target.value)}
                                    className={`w-full px-3 py-2 border rounded-md ${errors.label ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500`}
                                    placeholder={t('fieldBuilder.fieldNamePlaceholder')}
                                    aria-label={t('fieldBuilder.inputFieldLabelAria')}
                                />
                                {errors.label && <p className="mt-1 text-sm text-red-600">{errors.label}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {t('fieldBuilder.inputType')}
                                </label>
                                <select
                                    value={inputType}
                                    onChange={(e) => setInputType(e.target.value)}
                                    className={`w-full px-3 py-2 border rounded-md ${errors.inputType ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500`}
                                    aria-label={t('fieldBuilder.inputTypeAria')}
                                >
                                    <option value="">{t('fieldBuilder.selectInputType')}</option>
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
                                        {t('fieldBuilder.fieldOptions')}
                                    </label>
                                    <div className="space-y-2 mb-3">
                                        {fieldOptions.map((option, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <input
                                                    type="text"
                                                    value={option.value}
                                                    readOnly
                                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                                                    aria-label={`${t('fieldBuilder.optionValue')} ${index + 1}`}
                                                />
                                                <input
                                                    type="text"
                                                    value={option.label}
                                                    readOnly
                                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                                                    aria-label={`${t('fieldBuilder.optionLabel')} ${index + 1}`}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeOption(index)}
                                                    className="text-red-500 hover:text-red-700 p-2"
                                                    aria-label={`${t('fieldBuilder.removeOption')} ${index + 1}`}
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
                                            placeholder={t('fieldBuilder.value')}
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            aria-label={t('fieldBuilder.value')}
                                        />
                                        <input
                                            type="text"
                                            value={newOption.label}
                                            onChange={(e) => setNewOption({ ...newOption, label: e.target.value })}
                                            placeholder={t('fieldBuilder.label')}
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            aria-label={t('fieldBuilder.label')}
                                        />
                                        <button
                                            type="button"
                                            onClick={addOption}
                                            className="px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center"
                                            aria-label={t('fieldBuilder.addOption')}
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                    {errors.fieldOptions && <p className="mt-1 text-sm text-red-600">{errors.fieldOptions}</p>}
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {t('fieldBuilder.rationale')}
                                </label>
                                <textarea
                                    value={rationale}
                                    onChange={(e) => setRationale(e.target.value)}
                                    rows={4}
                                    className={`w-full px-3 py-2 border rounded-md ${errors.rationale ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500`}
                                    placeholder={t('fieldBuilder.rationalePlaceholder')}
                                    aria-label={t('fieldBuilder.rationaleAria')}
                                />
                                <p className="mt-1 text-sm text-gray-500">
                                    {t('fieldBuilder.rationaleHelp')}
                                </p>
                                {errors.rationale && <p className="mt-1 text-sm text-red-600">{errors.rationale}</p>}
                            </div>

                            <div>
                                <h3 className="text-lg font-medium text-gray-800 mb-3">{t('fieldBuilder.fieldValidation')}</h3>

                                <div className={t("auto.AdminLogs.d84d5bcb")}>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id={t("auto.CreateField.2a9d32d1")}
                                            checked={isRequired}
                                            onChange={(e) => setIsRequired(e.target.checked)}
                                            className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                                            aria-label={t('fieldBuilder.requiredFieldAria')}
                                        />
                                        <label htmlFor={t("auto.CreateField.2a9d32d1")} className="ms-2 block text-sm text-gray-700">
                                            {t('fieldBuilder.requiredField')}
                                        </label>
                                    </div>

                                    {inputType === 'text' || inputType === 'textarea' ? (
                                        <>
                                            <div>
                                                <label className="block text-sm text-gray-700 mb-1">
                                                    {t('fieldBuilder.minLength')}
                                                </label>
                                                <input
                                                    type="number"
                                                    value={minLength}
                                                    onChange={(e) => setMinLength(e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                                    aria-label={t('fieldBuilder.minLengthAria')}
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm text-gray-700 mb-1">
                                                    {t('fieldBuilder.maxLength')}
                                                </label>
                                                <input
                                                    type="number"
                                                    value={maxLength}
                                                    onChange={(e) => setMaxLength(e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                                    aria-label={t('fieldBuilder.maxLengthAria')}
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
                                                    aria-label={t('fieldBuilder.positiveNumberAria')}
                                                />
                                                <label htmlFor={t("auto.CreateField.bd293dc2")} className="ms-2 block text-sm text-gray-700">
                                                    {t('fieldBuilder.positiveNumber')}
                                                </label>
                                            </div>

                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    id={t("auto.CreateField.c30d25fd")}
                                                    checked={mustBeBetween0And100}
                                                    onChange={(e) => setMustBeBetween0And100(e.target.checked)}
                                                    className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                                                    aria-label={t('fieldBuilder.between0And100Aria')}
                                                />
                                                <label htmlFor={t("auto.CreateField.c30d25fd")} className="ms-2 block text-sm text-gray-700">
                                                    {t('fieldBuilder.between0And100')}
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
                                                aria-label={t("fieldBuilder.validUrlAria")}
                                            />
                                            <label htmlFor={t("auto.CreateField.84c07958")} className="ms-2 block text-sm text-gray-700">
                                                {t('fieldBuilder.validUrl')}
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
                            >
                                {t('fieldBuilder.cancel')}
                            </button>
                            <button
                                type="button"
                                onClick={handleSave}
                                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                            >
                                {t('fieldBuilder.saveField')}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FieldBuilder;