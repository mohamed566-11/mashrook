import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect } from 'react';
import { AnalysisFormData } from '../types';

interface AnalysisContextType {
  formData: AnalysisFormData;
  currentStep: number;
  selectedTemplate: string;
  updateFormData: (step: number, data: any) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  resetForm: () => void;
  isStepComplete: (step: number) => boolean;
  setTemplate: (templateId: string) => void;
}

const initialFormData: AnalysisFormData = {
  step1: {}, step2: {}, step3: {}, step4: {}, step5: {},
};

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined);

export const AnalysisProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<AnalysisFormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');

  // Load saved draft from local storage on mount
  useEffect(() => {
    try {
      const savedDraft = localStorage.getItem('analysis_draft');
      if (savedDraft) {
        const draft = JSON.parse(savedDraft);
        if (window.confirm("You have a saved draft. Would you like to restore it?")) {
          setFormData(draft.formData);
          setCurrentStep(draft.currentStep);
          if (draft.selectedTemplate) {
            setSelectedTemplate(draft.selectedTemplate);
          }
        } else {
          localStorage.removeItem('analysis_draft');
        }
      }
    } catch (e) {
      console.error("Failed to load analysis draft", e);
      localStorage.removeItem('analysis_draft');
    }
  }, []);


  const updateFormData = useCallback((step: number, data: any) => {
    setFormData(prev => ({ ...prev, [`step${step}`]: { ...prev[`step${step}`], ...data } }));
  }, []);

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 5));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));
  const goToStep = (step: number) => {
    if (step >= 1 && step <= 5) {
      setCurrentStep(step);
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setCurrentStep(1);
    setSelectedTemplate('');
    localStorage.removeItem('analysis_draft');
  }

  const setTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
  }

  const isStepComplete = (step: number) => {
    // This is a simplistic check. A real app would have more robust validation.
    return Object.keys(formData[`step${step}`]).length > 0;
  }

  const value = { formData, currentStep, selectedTemplate, updateFormData, nextStep, prevStep, goToStep, resetForm, isStepComplete, setTemplate };

  return (
    <AnalysisContext.Provider value={value}>
      {children}
    </AnalysisContext.Provider>
  );
};

export const useAnalysis = () => {
  const context = useContext(AnalysisContext);
  if (context === undefined) {
    throw new Error('useAnalysis must be used within an AnalysisProvider');
  }
  return context;
};