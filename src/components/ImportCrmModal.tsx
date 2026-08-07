import React, { useEffect, useState } from 'react';
import { useLanguage } from '../lib/i18n.tsx';

interface ImportCrmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFinish: () => void;
}

const PLATFORMS = [
  { id: 'hubspot', label: 'HubSpot', icon: 'hub' },
  { id: 'easybroker', label: 'EasyBroker', icon: 'real_estate_agent' },
  { id: 'salesforce', label: 'Salesforce', icon: 'cloud' },
  { id: 'pipedrive', label: 'Pipedrive', icon: 'trending_up' },
  { id: 'zoho', label: 'Zoho CRM', icon: 'apartment' },
  { id: 'other', label: 'Otro', icon: 'more_horiz' },
];

type Step = 'select' | 'importing' | 'done';

export const ImportCrmModal: React.FC<ImportCrmModalProps> = ({ isOpen, onClose, onFinish }) => {
  const { t } = useLanguage();
  const [step, setStep] = useState<Step>('select');
  const [selected, setSelected] = useState<string | null>(null);
  const [customName, setCustomName] = useState('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setStep('select');
      setSelected(null);
      setCustomName('');
      setProgress(0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (step !== 'importing') return;
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setStep('done');
          return 100;
        }
        return prev + 8;
      });
    }, 120);
    return () => clearInterval(interval);
  }, [step]);

  if (!isOpen) return null;

  const platformLabel = selected === 'other' ? customName || t('importCrm.otherPlaceholder') : PLATFORMS.find((p) => p.id === selected)?.label || '';

  const handleClose = () => {
    onClose();
  };

  const handleFinish = () => {
    onFinish();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-on-surface/50 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-2xl max-w-[32rem] w-full p-6 space-y-5">
        <div className="flex justify-between items-center border-b border-outline-variant/60 pb-4">
          <h3 className="font-headline-md text-[19px] font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">sync_alt</span>
            {t('importCrm.title')}
          </h3>
          <button
            onClick={handleClose}
            className="text-outline hover:text-on-surface p-1 rounded-full hover:bg-surface-container-low transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {step === 'select' && (
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-bold text-on-surface">{t('importCrm.step1Title')}</h4>
              <p className="text-xs text-secondary mt-1 leading-relaxed">{t('importCrm.step1Desc')}</p>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {PLATFORMS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelected(p.id)}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                    selected === p.id
                      ? 'border-primary bg-primary-fixed/40 text-primary shadow-2xs'
                      : 'border-outline-variant text-secondary hover:bg-surface-container-low'
                  }`}
                >
                  <span className="material-symbols-outlined text-[22px]">{p.icon}</span>
                  {p.label}
                </button>
              ))}
            </div>

            {selected === 'other' && (
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder={t('importCrm.otherPlaceholder')}
                className="w-full px-3 py-2 rounded-lg border border-outline-variant bg-surface focus:border-primary outline-none text-sm"
              />
            )}

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={handleClose}
                className="px-4 py-2 rounded-lg border border-outline-variant font-semibold text-secondary hover:bg-surface-container-low transition-colors cursor-pointer text-xs"
              >
                {t('importCrm.back')}
              </button>
              <button
                disabled={!selected}
                onClick={() => setStep('importing')}
                className="px-5 py-2 rounded-lg bg-primary text-on-primary font-bold text-xs hover:bg-[#172e6e] transition-colors shadow-sm cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {t('importCrm.next')}
              </button>
            </div>
          </div>
        )}

        {step === 'importing' && (
          <div className="space-y-4 py-4">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-[22px] animate-spin">progress_activity</span>
              <div>
                <h4 className="text-sm font-bold text-on-surface">{t('importCrm.step2Title')}</h4>
                <p className="text-xs text-secondary mt-0.5">{t('importCrm.step2Desc', platformLabel)}</p>
              </div>
            </div>
            <div className="w-full h-2.5 bg-surface-container rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-150"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
          </div>
        )}

        {step === 'done' && (
          <div className="space-y-4 py-2 text-center">
            <div className="w-14 h-14 rounded-full bg-[#dcfce7] text-[#16a34a] flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-[28px]">check_circle</span>
            </div>
            <div>
              <h4 className="text-base font-bold text-on-surface">{t('importCrm.step3Title')}</h4>
              <p className="text-xs text-secondary mt-1 leading-relaxed max-w-[24rem] mx-auto">
                {t('importCrm.step3Desc', platformLabel)}
              </p>
            </div>
            <button
              onClick={handleFinish}
              className="px-5 py-2 rounded-lg bg-primary text-on-primary font-bold text-xs hover:bg-[#172e6e] transition-colors shadow-sm cursor-pointer"
            >
              {t('importCrm.finish')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
