import React, { useState } from 'react';
import { useLanguage } from '../lib/i18n.tsx';

interface LoginViewProps {
  onLogin: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const { t, language, toggleLanguage } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-surface p-4 relative">
      <button
        onClick={toggleLanguage}
        className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer border border-primary/30"
      >
        <span className="material-symbols-outlined text-[16px]">language</span>
        <span>{language === 'es' ? 'ES' : 'EN'}</span>
      </button>

      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white shadow-sm mx-auto mb-4">
            <span className="material-symbols-outlined text-[24px]">real_estate_agent</span>
          </div>
          <h1 className="font-display text-headline-md font-bold text-primary tracking-tight">EstatePro CRM</h1>
          <p className="text-xs text-secondary mt-1">{t('sidebar.tagline')}</p>
        </div>

        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-sm p-6">
          <h2 className="text-xl font-bold text-on-surface">{t('login.title')}</h2>
          <p className="text-sm text-secondary mt-1 mb-6">{t('login.subtitle')}</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-bold text-xs text-on-surface mb-1">{t('login.email')}</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('login.emailPlaceholder')}
                className="w-full px-3 py-2.5 rounded-lg border border-outline-variant bg-surface focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none text-sm"
              />
            </div>
            <div>
              <label className="block font-bold text-xs text-on-surface mb-1">{t('login.password')}</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('login.passwordPlaceholder')}
                className="w-full px-3 py-2.5 rounded-lg border border-outline-variant bg-surface focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none text-sm"
              />
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-1.5 text-secondary cursor-pointer">
                <input type="checkbox" className="rounded border-outline-variant" />
                {t('login.remember')}
              </label>
              <button type="button" className="text-primary font-semibold hover:underline">
                {t('login.forgot')}
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-primary text-on-primary font-bold text-sm hover:bg-[#172e6e] transition-colors shadow-sm cursor-pointer"
            >
              {t('login.submit')}
            </button>
          </form>
        </div>

        <p className="text-center text-[11px] text-outline mt-4">{t('login.demoNote')}</p>
      </div>
    </div>
  );
};
