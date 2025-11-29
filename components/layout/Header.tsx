import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { TrendingUp, User as UserIcon, LogOut, LayoutDashboard, Globe } from 'lucide-react';
import NotificationDropdown from '../NotificationDropdown';
import LogoImage from '../common/LogoImage';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const languageDropdownRef = useRef<HTMLDivElement>(null);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive
      ? 'text-primary-green border-b-2 border-primary-green'
      : 'text-gray-600 hover:text-primary-green'
    }`;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target as Node)) {
        setLanguageDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);

  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-card-white border-b border-border-color h-[100px]">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => navigate('/dashboard')}>
              <LogoImage height={40} width={240} mobileHeight={60} mobileWidth={240} />
            </div>
            <div className="hidden md:block">
              <div className="ms-10 flex items-baseline space-x-4">
                <NavLink to="/dashboard" className={navLinkClass}>{t('common.dashboard')}</NavLink>
                <NavLink to="/templates" className={navLinkClass}>{t('common.templates')}</NavLink>
                <NavLink to="/my-analyses" className={navLinkClass}>{t('common.myAnalyses')}</NavLink>
                {user?.role === 'admin' && (
                  <NavLink to="/admin" className={navLinkClass}>{t('common.admin')}</NavLink>
                )}
                {user?.role === 'developer' && (
                  <NavLink to="/developer" className={navLinkClass}>{t('common.developer')}</NavLink>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center">
            {/* Language Toggle */}
            <div className="relative" ref={languageDropdownRef}>
              <button
                onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label={t('common.toggleLanguage')}
              >
                <Globe size={20} className="text-gray-600" />
              </button>

              {languageDropdownOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setLanguage('en');
                        setLanguageDropdownOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm ${language === 'en' ? 'bg-primary-green/10 text-primary-green' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                      {t('common.english')}
                    </button>
                    <button
                      onClick={() => {
                        setLanguage('ar');
                        setLanguageDropdownOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm ${language === 'ar' ? 'bg-primary-green/10 text-primary-green' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                      {t('common.arabic')}
                    </button>
                  </div>
                </div>
              )}
            </div>

            <NotificationDropdown />
            <div className="ms-3 relative" ref={dropdownRef}>
              <div>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="max-w-xs bg-gray-100 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-green"
                >
                  <span className="sr-only">{t('common.openUserMenu')}</span>
                  <div className="h-9 w-9 rounded-full bg-primary-green flex items-center justify-center text-white font-bold">
                    {user?.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:block mx-3 text-sm font-medium text-gray-700">{user?.name}</span>
                </button>
              </div>
              {dropdownOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b">
                    <p className="font-semibold">{user?.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                  </div>
                  {(user?.role === 'admin' || user?.role === 'developer') && (
                    <a onClick={() => {
                      navigate(user?.role === 'admin' ? '/admin' : '/developer');
                      setDropdownOpen(false);
                    }} className="cursor-pointer flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <LayoutDashboard size={16} /> {user?.role === 'admin' ? t('common.adminPanel') : t('common.developerPanel')}
                    </a>
                  )}
                  <a onClick={() => { navigate('/profile'); setDropdownOpen(false); }} className="cursor-pointer flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <UserIcon size={16} /> {t('common.myProfile')}
                  </a>
                  <a onClick={() => { logout(); setDropdownOpen(false); }} className="cursor-pointer flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <LogOut size={16} /> {t('common.signOut')}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;