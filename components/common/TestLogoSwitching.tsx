import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import LogoImage from './LogoImage';

const TestLogoSwitching: React.FC = () => {
    const { language, setLanguage } = useLanguage();

    return (
        <div className="p-4 space-y-4">
            <div>
                <h2 className="text-xl font-bold mb-1">Logo Consistency Test</h2>
                <p className="text-sm text-gray-600">تظل هوية الشعار عربية بغض النظر عن لغة الواجهة.</p>
            </div>
            <div className="flex justify-center">
                <LogoImage height={86} mobileHeight={72} />
            </div>
            <div className="flex gap-2">
                <button
                    onClick={() => setLanguage('ar')}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                    عربي
                </button>
                <button
                    onClick={() => setLanguage('en')}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                >
                    English
                </button>
            </div>
            <p className="text-sm text-gray-500">
                Current language: {language}. The logo stays Arabic-focused across languages.
            </p>
        </div>
    );
};

export default TestLogoSwitching;
