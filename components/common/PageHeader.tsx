import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { Globe, ArrowLeft } from 'lucide-react';
import LogoImage from './LogoImage';

interface PageHeaderProps {
  title: string;
  showLanguageSwitcher?: boolean;
  showBackButton?: boolean;
  onBack?: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  showLanguageSwitcher = true,
  showBackButton = true,
  onBack
}) => {
  const { t, language, setLanguage } = useLanguage();
  const navigate = useNavigate();

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            {showBackButton && (
              <button
                onClick={handleBack}
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-primary-green hover:bg-gray-100 smooth-transition hover-scale animate-fadeInLeft"
                aria-label={t('common.back')}
              >
                <ArrowLeft size={16} className="me-1" />
                <span>{t('common.back')}</span>
              </button>
            )}
            <div
              className="flex-shrink-0 flex items-center cursor-pointer transform transition duration-500 hover:scale-105"
              onClick={() => navigate('/')}
            >
              <LogoImage height={40} width={140} mobileHeight={30} mobileWidth={100} />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {showLanguageSwitcher && (
              <button
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-primary-green hover:bg-gray-100 smooth-transition hover-scale animate-fadeInRight"
                onClick={toggleLanguage}
                title={language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
                aria-label={language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
              >
                <Globe size={16} className="me-1" />
                <span className="font-bold">{language === 'ar' ? 'AR' : 'EN'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default PageHeader;