import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AnalysisProvider } from './context/AnalysisContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import LanguageDirectionHandler from './components/LanguageDirectionHandler';

import MainLayout from './components/layout/MainLayout';
import AdminLayout from './components/layout/AdminLayout';
import DeveloperLayout from './components/layout/DeveloperLayout';

import Dashboard from './pages/Dashboard';
import Templates from './pages/Templates';
import MyAnalyses from './pages/MyAnalyses';
import NewAnalysis from './pages/NewAnalysis';
import Report from './pages/Report';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';
import LogoTest from './pages/LogoTest';
import LogoSizeTest from './pages/LogoSizeTest';

// New pages
import Reports from './pages/Reports';
import Integrations from './pages/Integrations';
import HelpCenter from './pages/HelpCenter';
import Blog from './pages/Blog';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import Documentation from './pages/Documentation';
import PrivacyPolicy from './pages/PrivacyPolicy';
import About from './pages/About';

import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminTemplates from './pages/admin/AdminTemplates';
import AdminWebsite from './pages/admin/AdminWebsite';
import AdminSettings from './pages/admin/AdminSettings';
import AdminLogs from './pages/admin/AdminLogs';

import DeveloperDashboard from './pages/developer/DeveloperDashboard';
import TemplateBuilder from './pages/developer/TemplateBuilder';
import CreateField from './pages/developer/CreateField';
import DeveloperLogin from './pages/developer/DeveloperLogin';

// Developer Control Panel Pages
import DeveloperTemplates from './pages/developer/DeveloperTemplates';
import DeveloperUsers from './pages/developer/DeveloperUsers';
import DeveloperApiKeys from './pages/developer/DeveloperApiKeys';
import DeveloperDatabase from './pages/developer/DeveloperDatabase';
import DeveloperSystem from './pages/developer/DeveloperSystem';
import DeveloperTools from './pages/developer/DeveloperTools';
import DeveloperLogs from './pages/developer/DeveloperLogs';

// Set HTML direction attribute based on language
const AppDirectionHandler: React.FC = () => {
  const { language } = useLanguage();

  useEffect(() => {
    document.documentElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  return null;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <LanguageProvider>
        <AuthProvider>
          <AnalysisProvider>
            <AppDirectionHandler />
            <LanguageDirectionHandler />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/developer/login" element={<DeveloperLogin />} />
              <Route path="/logo-test" element={<LogoTest />} />
              <Route path="/logo-size-test" element={<LogoSizeTest />} />

              <Route path="/" element={<MainLayout />}>
                <Route index element={<Navigate to="/dashboard" />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="templates" element={<Templates />} />
                <Route path="my-analyses" element={<MyAnalyses />} />
                <Route path="analysis/new" element={<NewAnalysis />} />
                <Route path="report/:id" element={<Report />} />
                <Route path="profile" element={<Profile />} />
                <Route path="notifications" element={<Notifications />} />
                {/* New routes */}
                <Route path="reports" element={<Reports />} />
                <Route path="integrations" element={<Integrations />} />
                <Route path="help-center" element={<HelpCenter />} />
                <Route path="blog" element={<Blog />} />
                <Route path="careers" element={<Careers />} />
                <Route path="contact" element={<Contact />} />
                <Route path="documentation" element={<Documentation />} />
                <Route path="privacy-policy" element={<PrivacyPolicy />} />
                <Route path="about" element={<About />} />
              </Route>

              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Navigate to="/admin/overview" />} />
                <Route path="overview" element={<AdminDashboard />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="templates" element={<AdminTemplates />} />
                <Route path="website" element={<AdminWebsite />} />
                <Route path="settings" element={<AdminSettings />} />
                <Route path="logs" element={<AdminLogs />} />
              </Route>

              <Route path="/developer" element={<DeveloperLayout />}>
                <Route index element={<Navigate to="/developer/dashboard" />} />
                <Route path="dashboard" element={<DeveloperDashboard />} />
                <Route path="template/new" element={<TemplateBuilder />} />
                <Route path="template/:id/edit" element={<TemplateBuilder />} />
                <Route path="template/:templateId/field/:stageId/new" element={<CreateField />} />
                <Route path="templates" element={<DeveloperTemplates />} />
                <Route path="users" element={<DeveloperUsers />} />
                <Route path="api-keys" element={<DeveloperApiKeys />} />
                <Route path="database" element={<DeveloperDatabase />} />
                <Route path="system" element={<DeveloperSystem />} />
                <Route path="tools" element={<DeveloperTools />} />
                <Route path="logs" element={<DeveloperLogs />} />
              </Route>
            </Routes>
          </AnalysisProvider>
        </AuthProvider>
      </LanguageProvider>
    </HashRouter>
  );
};

export default App;