
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Target, TrendingUp, Shield, BarChart, Sparkles, ArrowRight } from 'lucide-react';
import { useAnalysis } from '../../context/AnalysisContext';
import { createAnalysis } from '../../services/analysisService';
import GenerationLoading from './GenerationLoading';

const CheckItem = ({ text }: { text: string }) => (
  <div className="flex items-center gap-2">
    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
      <svg className="w-3.5 h-3.5 text-green-600" fill="t("auto.ConfirmationModal.334c4a4c")" stroke="t("auto.ConfirmationModal.be92d077")" viewBox="0 0 24 24"><path strokeLinecap="t("auto.ConfirmationModal.9bbd993d")" strokeLinejoin="t("auto.ConfirmationModal.9bbd993d")" strokeWidth="3"t("auto.ConfirmationModal.1bcfc86b")"M5 13l4 4L19 7"></path></svg>
    </div>
    <span className="text-sm text-gray-700">{text}</span>
  </div>
);

const ConfirmationModal: React.FC<{ onCancel: () => void }> = ({ onCancel }) => {
    const { formData, resetForm } = useAnalysis();
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleConfirm = async () => {
        setIsGenerating(true);
        setError(null);
        try {
            const token = sessionStorage.getItem('token') || undefined;
            const userStr = sessionStorage.getItem('user');
            let ownerId = 1;
            if (userStr) {
                try {
                    const user = JSON.parse(userStr);
                    ownerId = parseInt(user.id) || 1;
                } catch {}
            }
            const { id } = await createAnalysis(formData, ownerId, token);
            localStorage.setItem('latest_analysis_id', String(id));
            // GenerationLoading will handle redirect
        } catch (e: any) {
            setError(e.message || "An unknown error occurred.");
            setIsGenerating(false);
        }
    };
    
    if (isGenerating) {
        return <GenerationLoading />;
    }
    
    if (error) {
        // Simple error display, could be a more complex modal
        return (
             <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-8 text-center">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Generation Failed</h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <div className="t("auto.ConfirmationModal.de75b584")">
                        <button onClick={onCancel} className="flex-1 h-11 border border-gray-300 text-gray-700 font-semibold rounded-md hover:bg-gray-50">Close</button>
                        <button onClick={handleConfirm} className="flex-1 h-11 bg-primary-green text-white font-semibold rounded-md hover:bg-primary-green-hover">Try Again</button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-8">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                        <Target className="w-6 h-6 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Ready to Generate Analysis?</h2>
                </div>
                <p className="text-gray-600 mb-6">We've collected all the information needed to create your comprehensive business analysis report.</p>
                <div className="space-y-3 mb-6 bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <CheckItem text="t("auto.ConfirmationModal.0a03c56a")" />
                    <CheckItem text="t("auto.ConfirmationModal.9b1a8e5c")" />
                    <CheckItem text="t("auto.ConfirmationModal.4353306d")" />
                    <CheckItem text="t("auto.ConfirmationModal.117a882f")" />
                    <CheckItem text="t("auto.ConfirmationModal.f95cefeb")" />
                </div>
                <div className="t("auto.ConfirmationModal.830a1afa")">
                    <h3 className="font-semibold text-gray-900 mb-3">This analysis will include:</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-600" /> Financial Projections (5 years)</li>
                        <li className="flex items-center gap-2"><Shield className="w-4 h-4 text-green-600" /> Risk Assessment</li>
                        <li className="flex items-center gap-2"><BarChart className="w-4 h-4 text-green-600" /> Success Probability Score</li>
                        <li className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-green-600" /> AI-Powered Recommendations</li>
                        <li className="flex items-center gap-2"><Target className="w-4 h-4 text-green-600" /> Industry Benchmarks</li>
                    </ul>
                </div>
                <div className="t("auto.ConfirmationModal.1904562d")">
                    <button onClick={onCancel} className="flex-1 h-11 border border-gray-300 text-gray-700 font-semibold rounded-md hover:bg-gray-50">Cancel</button>
                    <button onClick={handleConfirm} className="flex-1 h-11 bg-primary-green text-white font-semibold rounded-md hover:bg-primary-green-hover flex items-center justify-center gap-2">
                        Generate Analysis <ArrowRight className="t("auto.ConfirmationModal.1bbd1cd2")" / {`language === 'ar' && 'scale-x-[-1]'`} >
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
