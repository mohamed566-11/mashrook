import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import LogoImage from '../components/common/LogoImage';
import EnhancedHeader from '../components/layout/EnhancedHeader';
import useHeaderHeight from '../hooks/useHeaderHeight';
import ScrollOffset from '../components/common/ScrollOffset';

const LogoTest: React.FC = () => {
    const { language, setLanguage } = useLanguage();
    const headerHeight = useHeaderHeight();

    return (
        <div className="min-h-screen bg-gray-50">
            <EnhancedHeader />
            <div style={{ paddingTop: `var(--header-height, 100px)` }} className="max-w-4xl mx-auto p-6">
                <ScrollOffset />
                <h1 className="text-3xl font-bold text-center mb-8">Logo Test Page</h1>

                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-xl font-semibold mb-4">Logo Switching Test</h2>
                    <div className="flex flex-col items-center gap-6">
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 w-full max-w-md flex flex-col items-center">
                            <p className="mb-4">Current Logo (Height: 80px)</p>
                            <LogoImage height={80} />
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={() => setLanguage('ar')}
                                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                            >
                                عربي (Arabic)
                            </button>
                            <button
                                onClick={() => setLanguage('en')}
                                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                            >
                                English
                            </button>
                        </div>

                        <p className="text-lg font-medium">Current language: {language}</p>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4">Logo in Different Contexts</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="border border-gray-200 rounded-lg p-4">
                            <p className="mb-2">Header Size (Height: 55px)</p>
                            <LogoImage height={55} />
                        </div>
                        <div className="border border-gray-200 rounded-lg p-4">
                            <p className="mb-2">Login Page Size (Height: 68px)</p>
                            <LogoImage height={68} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogoTest;