import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import LogoImage from '../components/common/LogoImage';
import EnhancedHeader from '../components/layout/EnhancedHeader';
import useHeaderHeight from '../hooks/useHeaderHeight';
import ScrollOffset from '../components/common/ScrollOffset';

const LogoSizeTest: React.FC = () => {
    const { language, setLanguage } = useLanguage();
    const headerHeight = useHeaderHeight();

    return (
        <div className="min-h-screen bg-gray-50">
            <EnhancedHeader />
            <div style={{ paddingTop: `var(--header-height, 100px)` }} className="max-w-4xl mx-auto p-6">
                <ScrollOffset />
                <h1 className="text-3xl font-bold text-center mb-8">Logo Size Test Page</h1>

                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-xl font-semibold mb-4">Different Logo Sizes</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="border border-gray-200 rounded-lg p-4">
                            <p className="mb-2">Header Size (Height: 85px, Width: 306px)</p>
                            <LogoImage height={85} width={306} />
                        </div>
                        <div className="border border-gray-200 rounded-lg p-4">
                            <p className="mb-2">Login Page Size (Height: 136px, Width: 476px)</p>
                            <LogoImage height={136} width={476} />
                        </div>
                        <div className="border border-gray-200 rounded-lg p-4">
                            <p className="mb-2">Mobile Size (Height: 68px, Width: 238px)</p>
                            <LogoImage height={40} width={140} mobileHeight={68} mobileWidth={238} />
                        </div>
                        <div className="border border-gray-200 rounded-lg p-4">
                            <p className="mb-2">Sidebar Size (Height: 77px, Width: 272px)</p>
                            <LogoImage height={77} width={272} />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4">Logo Switching Test</h2>
                    <div className="flex flex-col items-center gap-6">
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 w-full max-w-md flex flex-col items-center">
                            <p className="mb-4">Large Logo (Height: 153px, Width: 544px)</p>
                            <LogoImage height={153} width={544} />
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
            </div>
        </div>
    );
};

export default LogoSizeTest;