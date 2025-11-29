
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { useAnalysis } from '../../context/AnalysisContext';
import { FileText, Calculator, Shield, Brain, CheckCircle, Check } from 'lucide-react';

const loadingSteps = [
    { icon: FileText, textKey: 'analysis.generationLoading.processingBusinessInfo' },
    { icon: Calculator, textKey: 'analysis.generationLoading.calculatingFinancialProjections' },
    { icon: Shield, textKey: 'analysis.generationLoading.analyzingRiskFactors' },
    { icon: Brain, textKey: 'analysis.generationLoading.generatingAiRecommendations' },
    { icon: CheckCircle, textKey: 'analysis.generationLoading.finalizingReport' },
];

interface LoadingStepProps {
    icon: React.ElementType;
    textKey: string;
    status: 'complete' | 'loading' | 'pending';
    t: (key: string) => string;
}

const LoadingStep: React.FC<LoadingStepProps> = ({ icon: Icon, textKey, status, t }) => (
    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${status === 'complete' ? 'bg-primary-green' : status === 'loading' ? 'bg-green-100' : 'bg-gray-200'}`}>
            {status === 'complete' ? <Check className="w-5 h-5 text-white" /> :
                status === 'loading' ? <div className="animate-spin"><Icon className="w-5 h-5 text-primary-green" /></div> :
                    <Icon className="w-5 h-5 text-gray-400" />
            }
        </div>
        <p className={`flex-1 font-medium transition-colors ${status === 'complete' ? 'text-green-700' : status === 'loading' ? 'text-gray-900' : 'text-gray-400'}`}>
            {t(textKey)}
        </p>
        {status === 'loading' && (
            <div className="flex space-x-1">
                {[0, 150, 300].map(delay =>
                    <div key={delay} className="w-2 h-2 bg-primary-green rounded-full animate-bounce" style={{ animationDelay: `${delay}ms` }} />
                )}
            </div>
        )}
    </div>
);

const GenerationLoading: React.FC = () => {
    const { t, language } = useLanguage();
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [generationComplete, setGenerationComplete] = useState(false);
    const navigate = useNavigate();
    const { resetForm } = useAnalysis();

    useEffect(() => {
        localStorage.removeItem('analysis_draft');
        const interval = setInterval(() => {
            setCurrentStepIndex(prev => {
                if (prev < loadingSteps.length - 1) {
                    return prev + 1;
                }
                clearInterval(interval);
                setGenerationComplete(true);
                return prev;
            });
        }, 1500); // Simulate time for each step
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (generationComplete) {
            setTimeout(() => {
                resetForm();
                const id = localStorage.getItem('latest_analysis_id') || `mock-id-${Date.now()}`;
                localStorage.removeItem('latest_analysis_id');
                navigate(`/report/${id}`);
            }, 1500);
        }
    }, [generationComplete, navigate, resetForm]);

    if (generationComplete) {
        return (
            <div className="fixed inset-0 bg-primary-green z-50 flex flex-col items-center justify-center text-white">
                <CheckCircle className="w-20 h-20 mb-4 animate-[scale-in_0.5s_ease-out]" />
                <h2 className="text-3xl font-bold mb-2">{t('analysis.generationLoading.analysisComplete')}</h2>
                <p className="text-green-100">{t('analysis.generationLoading.redirectingToReport')}</p>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md space-y-4">
                {loadingSteps.map((step, index) => (
                    <LoadingStep
                        key={index}
                        icon={step.icon}
                        textKey={step.textKey}
                        status={index < currentStepIndex ? 'complete' : index === currentStepIndex ? 'loading' : 'pending'}
                        t={t}
                    />
                ))}
            </div>
            <div className="w-full max-w-md mt-8">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-primary-green transition-all duration-500" style={{ width: `${((currentStepIndex + 1) / loadingSteps.length) * 100}%` }} />
                </div>
                <p className="text-center text-sm text-gray-600 mt-2">
                    {Math.round(((currentStepIndex + 1) / loadingSteps.length) * 100)}{t('analysis.generationLoading.percentComplete')}
                </p>
            </div>
        </div>
    );
};

export default GenerationLoading;
