import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAnalysis } from '../../context/AnalysisContext';
import { AlertCircle } from 'lucide-react';
import { listTemplateFields } from '../../services/templateService';

interface FormFieldProps {
    label: string;
    children: React.ReactNode;
    error?: string;
    required?: boolean;
}

const FormField = ({ label, children, error, required = false }: FormFieldProps) => (
    <div className="step2-form-field">
        <label className="block text-gray-700 text-sm font-bold mb-2">
            {label} {required && '*'}
        </label>
        {children}
        {error && (
            <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                <AlertCircle size={16} />
                <span>{error}</span>
            </div>
        )}
    </div>
);

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: boolean;
}

const Input: React.FC<InputProps> = ({ error, ...props }) => (
    <input
        {...props}
        className={`w-full h-11 px-4 bg-white border rounded-md text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 ${error
            ? 'border-red-300 focus:border-red-500 focus:ring-red-500/15'
            : 'border-gray-300 focus:border-primary-green focus:ring-primary-green/15'
            }`}
    />
);

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    error?: boolean;
}

const Select: React.FC<SelectProps> = ({ error, children, ...props }) => (
    <select
        {...props}
        className={`w-full h-11 px-4 bg-white border rounded-md text-base text-gray-900 focus:outline-none focus:ring-4 ${error
            ? 'border-red-300 focus:border-red-500 focus:ring-red-500/15'
            : 'border-gray-300 focus:border-primary-green focus:ring-primary-green/15'
            }`}
    >
        {children}
    </select>
);

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    error?: boolean;
}

const TextArea: React.FC<TextAreaProps> = ({ error, ...props }) => (
    <textarea
        {...props}
        className={`w-full px-4 py-3 bg-white border rounded-md text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 ${error
            ? 'border-red-300 focus:border-red-500 focus:ring-red-500/15'
            : 'border-gray-300 focus:border-primary-green focus:ring-primary-green/15'
            }`}
        rows={4}
    />
);

interface CheckboxGroupProps {
    label: string;
    options: string[];
    name: string;
    selected: string[];
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    required?: boolean;
}

const CheckboxGroup = ({ label, options, name, selected, onChange, error, required = false }: CheckboxGroupProps) => (
    <div className="step2-checkbox-group">
        <label className="block text-gray-700 text-sm font-bold mb-2">
            {label} {required && '*'}
        </label>
        <div className="step2-checkbox-options">
            {options.map(option => (
                <label key={option} className="flex items-center">
                    <input
                        type="checkbox"
                        name={name}
                        value={option}
                        checked={selected.includes(option)}
                        onChange={onChange}
                        className="h-4 w-4 text-primary-green border-gray-300 rounded focus:ring-primary-green"
                    />
                    <span className="ms-2 text-gray-700">{option}</span>
                </label>
            ))}
        </div>
        {error && (
            <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                <AlertCircle size={16} />
                <span>{error}</span>
            </div>
        )}
    </div>
);

const Step2_Financials: React.FC = () => {
    const { t } = useLanguage();
    const { formData, updateFormData, selectedTemplate } = useAnalysis();
    const data = formData.step2;
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [templateFields, setTemplateFields] = useState<any[]>([]);

    useEffect(() => {
        const fetchTemplateFields = async () => {
            if (selectedTemplate) {
                try {
                    const templateId = parseInt(selectedTemplate, 10);
                    if (!isNaN(templateId)) {
                        const fields = await listTemplateFields(templateId);
                        setTemplateFields(fields);
                    }
                } catch (error) {
                    console.error('Failed to fetch template fields:', error);
                }
            }
        };

        fetchTemplateFields();
    }, [selectedTemplate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        updateFormData(2, { [name]: value });

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        const fieldName = e.target.name;

        const currentValues = data[fieldName] || [];
        const newValues = checked
            ? [...currentValues, value]
            : currentValues.filter((item: string) => item !== value);
        updateFormData(2, { [fieldName]: newValues });

        if (errors[fieldName] && newValues.length > 0) {
            setErrors(prev => ({ ...prev, [fieldName]: '' }));
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));

        // Find the field to get validation rules
        const field = templateFields.find(f => `field_${f.id}` === name);

        // Validate on blur
        if (field?.isRequired && (!value || value.trim() === '')) {
            setErrors(prev => ({
                ...prev,
                [name]: `${field.label} ${t('common.fieldRequired')}`
            }));
        } else if (field?.mustBePositive && value && parseFloat(value) <= 0) {
            setErrors(prev => ({
                ...prev,
                [name]: `${field.label} ${t('common.fieldMustBeGreaterThan').replace('{value}', '0')}`
            }));
        } else if (field?.mustBeBetween0And100 && value && (parseFloat(value) < 0 || parseFloat(value) > 100)) {
            setErrors(prev => ({
                ...prev,
                [name]: `${field.label} ${t('common.fieldMustBeBetween').replace('{min}', '0').replace('{max}', '100')}`
            }));
        } else if (field?.minLength && value && value.length < field.minLength) {
            setErrors(prev => ({
                ...prev,
                [name]: `${field.label} ${t('common.fieldMinLength').replace('{count}', field.minLength.toString())}`
            }));
        } else if (field?.maxLength && value && value.length > field.maxLength) {
            setErrors(prev => ({
                ...prev,
                [name]: `${field.label} ${t('common.fieldMaxLength').replace('{count}', field.maxLength.toString())}`
            }));
        }
    };

    const handleCheckboxGroupBlur = (fieldName: string) => {
        setTouched(prev => ({ ...prev, [fieldName]: true }));

        // Find the field to get validation rules
        const field = templateFields.find(f => `field_${f.id}` === fieldName);

        const values = data[fieldName] || [];
        if (field?.isRequired && values.length === 0) {
            setErrors(prev => ({ ...prev, [fieldName]: `${field.label} ${t('common.fieldRequired')}` }));
        }
    };

    // Generic rendering based on template fields
    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">{t('analysis.step2Title')}</h2>
            <div className="step2-template-fields">
                {templateFields
                    .filter(field => field.stageNumber === 2)
                    .map(field => {
                        if (field.inputType === 'text') {
                            return (
                                <FormField
                                    key={field.id}
                                    label={field.label}
                                    error={touched[`field_${field.id}`] ? errors[`field_${field.id}`] : ''}
                                    required={field.isRequired}
                                >
                                    <Input
                                        name={`field_${field.id}`}
                                        value={data[`field_${field.id}`] || ''}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder={field.label}
                                        error={touched[`field_${field.id}`] && !!errors[`field_${field.id}`]}
                                        required={field.isRequired}
                                        minLength={field.minLength || undefined}
                                        maxLength={field.maxLength || undefined}
                                    />
                                </FormField>
                            );
                        } else if (field.inputType === 'number') {
                            return (
                                <FormField
                                    key={field.id}
                                    label={field.label}
                                    error={touched[`field_${field.id}`] ? errors[`field_${field.id}`] : ''}
                                    required={field.isRequired}
                                >
                                    <Input
                                        name={`field_${field.id}`}
                                        type="number"
                                        value={data[`field_${field.id}`] || ''}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder={field.label}
                                        error={touched[`field_${field.id}`] && !!errors[`field_${field.id}`]}
                                        required={field.isRequired}
                                        min={field.mustBePositive ? 0 : undefined}
                                    />
                                </FormField>
                            );
                        } else if (field.inputType === 'textarea') {
                            return (
                                <FormField
                                    key={field.id}
                                    label={field.label}
                                    error={touched[`field_${field.id}`] ? errors[`field_${field.id}`] : ''}
                                    required={field.isRequired}
                                >
                                    <TextArea
                                        name={`field_${field.id}`}
                                        value={data[`field_${field.id}`] || ''}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder={field.label}
                                        error={touched[`field_${field.id}`] && !!errors[`field_${field.id}`]}
                                        required={field.isRequired}
                                        minLength={field.minLength || undefined}
                                        maxLength={field.maxLength || undefined}
                                    />
                                </FormField>
                            );
                        } else if (field.inputType === 'dropdown') {
                            return (
                                <FormField
                                    key={field.id}
                                    label={field.label}
                                    error={touched[`field_${field.id}`] ? errors[`field_${field.id}`] : ''}
                                    required={field.isRequired}
                                >
                                    <Select
                                        name={`field_${field.id}`}
                                        value={data[`field_${field.id}`] || ''}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched[`field_${field.id}`] && !!errors[`field_${field.id}`]}
                                        required={field.isRequired}
                                    >
                                        <option value="">{t('common.selectOption')} {field.label}</option>
                                        {field.fieldOptions && JSON.parse(field.fieldOptions).map((option: string) => (
                                            <option key={option} value={option}>{option}</option>
                                        ))}
                                    </Select>
                                </FormField>
                            );
                        } else if (field.inputType === 'multiselect') {
                            return (
                                <CheckboxGroup
                                    key={field.id}
                                    label={field.label}
                                    options={field.fieldOptions ? JSON.parse(field.fieldOptions) : []}
                                    name={`field_${field.id}`}
                                    selected={data[`field_${field.id}`] || []}
                                    onChange={handleCheckboxChange}
                                    error={touched[`field_${field.id}`] ? errors[`field_${field.id}`] : ''}
                                    required={field.isRequired}
                                />
                            );
                        }
                        return null;
                    })}
            </div>
        </div>
    );
};

export default Step2_Financials;