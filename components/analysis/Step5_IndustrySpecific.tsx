import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAnalysis } from '../../context/AnalysisContext';
import { AlertCircle } from 'lucide-react';
import { listTemplateFields } from '../../services/templateService';

interface CheckboxGroupProps {
    label: string;
    options: string[];
    name: string;
    selected: string[];
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
}

const CheckboxGroup = ({ label, options, name, selected, onChange, error }: CheckboxGroupProps) => (
    <div className="step5-checkbox-group">
        <label className="block text-gray-700 text-sm font-bold mb-2">{label} *</label>
        <div className="step5-checkbox-options">
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

const Step5_IndustrySpecific: React.FC = () => {
    const { t } = useLanguage();
    const { formData, updateFormData, selectedTemplate } = useAnalysis();
    const data = formData.step5;
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

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        updateFormData(5, { [name]: value });

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        updateFormData(5, { [name]: value });

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        const fieldName = 'industrySpecific'; // generic field name

        const currentValues = data[fieldName] || [];
        const newValues = checked
            ? [...currentValues, value]
            : currentValues.filter((item: string) => item !== value);
        updateFormData(5, { [fieldName]: newValues });

        if (errors[fieldName] && newValues.length > 0) {
            setErrors(prev => ({ ...prev, [fieldName]: '' }));
        }
    };

    const handleSelectBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));

        if (!value || value.trim() === '') {
            setErrors(prev => ({
                ...prev,
                [name]: `${e.target.getAttribute('data-label')} ${t('common.fieldRequired')}`
            }));
        }
    };

    const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));

        if (!value || value.trim() === '') {
            setErrors(prev => ({
                ...prev,
                [name]: `${e.target.getAttribute('data-label')} ${t('common.fieldRequired')}`
            }));
        } else if (parseFloat(value) <= 0) {
            setErrors(prev => ({
                ...prev,
                [name]: `${e.target.getAttribute('data-label')} ${t('common.fieldMustBeGreaterThan').replace('{value}', '0')}`
            }));
        }
    };

    const handleServiceBlur = (fieldName: string) => {
        setTouched(prev => ({ ...prev, [fieldName]: true }));
        const values = data[fieldName] || [];
        if (values.length === 0) {
            setErrors(prev => ({ ...prev, [fieldName]: t('common.fieldRequired') }));
        }
    };

    // Generic rendering based on template fields
    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">{t('analysis.step5Title')}</h2>
            <div className="step5-template-fields">
                {templateFields
                    .filter(field => field.stageNumber === 5)
                    .map(field => {
                        if (field.inputType === 'Dropdown') {
                            return (
                                <div key={field.id}>
                                    <label className="block text-gray-700 text-sm font-bold mb-2">{field.label} *</label>
                                    <Select
                                        name={`field_${field.id}`}
                                        value={data[`field_${field.id}`] || ''}
                                        onChange={handleSelectChange}
                                        onBlur={handleSelectBlur}
                                        data-label={field.label}
                                        error={touched[`field_${field.id}`] && !!errors[`field_${field.id}`]}
                                    >
                                        <option value="">{t('common.selectOption')} {field.label}</option>
                                        {field.fieldOptions && JSON.parse(field.fieldOptions).map((option: string) => (
                                            <option key={option} value={option}>{option}</option>
                                        ))}
                                    </Select>
                                    {touched[`field_${field.id}`] && errors[`field_${field.id}`] && (
                                        <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                                            <AlertCircle size={16} />
                                            <span>{errors[`field_${field.id}`]}</span>
                                        </div>
                                    )}
                                </div>
                            );
                        } else if (field.inputType === 'Multi-select checkboxes') {
                            return (
                                <div key={field.id} onBlur={() => handleServiceBlur(`field_${field.id}`)}>
                                    <CheckboxGroup
                                        label={field.label}
                                        options={field.fieldOptions ? JSON.parse(field.fieldOptions) : []}
                                        name={`field_${field.id}`}
                                        selected={data[`field_${field.id}`] || []}
                                        onChange={handleCheckboxChange}
                                        error={touched[`field_${field.id}`] ? errors[`field_${field.id}`] : ''}
                                    />
                                </div>
                            );
                        } else if (field.inputType === 'Number') {
                            return (
                                <div key={field.id}>
                                    <label className="block text-gray-700 text-sm font-bold mb-2">{field.label} *</label>
                                    <Input
                                        name={`field_${field.id}`}
                                        type="number"
                                        value={data[`field_${field.id}`] || ''}
                                        onChange={handleInputChange}
                                        onBlur={handleInputBlur}
                                        placeholder={field.label}
                                        data-label={field.label}
                                        error={touched[`field_${field.id}`] && !!errors[`field_${field.id}`]}
                                        required
                                    />

                                </div>
                            );
                        } else {
                            return (
                                <div key={field.id}>
                                    <label className="block text-gray-700 text-sm font-bold mb-2">{field.label} *</label>
                                    <Input
                                        name={`field_${field.id}`}
                                        type="number"
                                        value={data[`field_${field.id}`] || ''}
                                        onChange={handleInputChange}
                                        onBlur={handleInputBlur}
                                        placeholder={field.label}
                                        data-label={field.label}
                                        error={touched[`field_${field.id}`] && !!errors[`field_${field.id}`]}
                                        required
                                    />
                                    {touched[`field_${field.id}`] && errors[`field_${field.id}`] && (
                                        <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                                            <AlertCircle size={16} />
                                            <span>{errors[`field_${field.id}`]}</span>
                                        </div>
                                    )}
                                </div>
                            );
                        }
                    })}
            </div>
        </div>
    );
};

export default Step5_IndustrySpecific;