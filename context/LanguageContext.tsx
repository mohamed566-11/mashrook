import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Import translation files
import enTranslations from '../translations/en.json';
import arTranslations from '../translations/ar.json';

type Language = 'en' | 'ar';

// Define translation structure
interface Translations {
    [key: string]: any;
}

interface LanguageContextType {
    language: Language;
    setLanguage: (language: Language) => void;
    t: (key: string, params?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('en');

    useEffect(() => {
        // Check for saved language preference in localStorage
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage === 'en' || savedLanguage === 'ar') {
            setLanguage(savedLanguage);
        }
    }, []);

    const updateLanguage = (newLanguage: Language) => {
        setLanguage(newLanguage);
        localStorage.setItem('language', newLanguage);
    };

    // Function to get translation by key
    const t = (key: string, params?: Record<string, string | number>): string => {
        const translations = language === 'en' ? enTranslations : arTranslations;

        // Split key by dots to navigate nested objects
        const keys = key.split('.');
        let result: any = translations;

        for (const k of keys) {
            if (result && typeof result === 'object' && k in result) {
                result = result[k];
            } else {
                // Return the key if translation not found
                return key;
            }
        }

        // Handle parameter substitution
        if (params && typeof result === 'string') {
            let translated = result;
            for (const [paramKey, paramValue] of Object.entries(params)) {
                translated = translated.replace(`{${paramKey}}`, String(paramValue));
            }
            return translated;
        }

        return result;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage: updateLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = (): LanguageContextType => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};