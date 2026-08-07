import React, { useState } from 'react';
import { Listing } from '../types';
import { useLanguage } from '../lib/i18n.tsx';

interface NewListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddListing: (listing: Listing) => void;
  onTriggerAiAction: (title: string, prompt: string) => void;
}

export const NewListingModal: React.FC<NewListingModalProps> = ({
  isOpen,
  onClose,
  onAddListing,
  onTriggerAiAction
}) => {
  const { t } = useLanguage();
  const [address, setAddress] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [bedrooms, setBedrooms] = useState('3');
  const [bathrooms, setBathrooms] = useState('2');
  const [sqft, setSqft] = useState('');
  const [type, setType] = useState<Listing['type']>('Single Family');
  const [clientName, setClientName] = useState('');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleGenerateAiDescription = () => {
    if (!address || !title) {
      alert(t('newListing.missingFieldsAlert'));
      return;
    }
    const generated = `Bienvenido a ${address} — un(a) excepcional ${type.toLowerCase()} que ofrece ${bedrooms} recámaras, ${bathrooms} baños de lujo, y ${sqft || 'amplios'} pies cuadrados de vida arquitectónica refinada. Cuenta con espacios de concepto abierto, acabados de diseñador de alta gama, y acceso privilegiado a las mejores amenidades de la ciudad. Una oportunidad de inversión incomparable.`;
    setDescription(generated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address || !price) return;

    const listingPrice = Number(price.replace(/[^0-9.]/g, '')) || 1000000;

    const newListing: Listing = {
      id: `list-${Date.now()}`,
      address,
      title: title || t('newListing.defaultTitle'),
      price: listingPrice,
      bedrooms: Number(bedrooms) || 3,
      bathrooms: Number(bathrooms) || 2,
      sqft: Number(sqft) || 2000,
      type,
      status: 'active',
      daysOnMarket: 1,
      clientName: clientName || t('newListing.defaultSeller'),
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      // No market history yet for a freshly published listing — neutral
      // baseline until the AI engine has enough signal to score it.
      marketAvgPrice: listingPrice,
      estimatedDaysToSell: 30,
      marketHealth: { price: 60, location: 60, demand: 60, velocity: 60, competition: 60, condition: 60 },
      comparables: [],
      source: 'manual'
    };

    onAddListing(newListing);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-on-surface/50 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-2xl max-w-[36rem] w-full p-6 space-y-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b border-outline-variant/60 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">add_home</span>
            </div>
            <div>
              <h3 className="font-headline-md text-[20px] font-bold text-on-surface">{t('newListing.title')}</h3>
              <p className="text-xs text-secondary">{t('newListing.subtitle')}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-outline hover:text-on-surface p-1 rounded-full hover:bg-surface-container-low transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-xs text-on-surface mb-1">{t('newListing.address')}</label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder={t('newListing.addressPlaceholder')}
                className="w-full px-3 py-2 rounded-lg border border-outline-variant bg-surface focus:border-primary outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-xs text-on-surface mb-1">{t('newListing.propTitle')}</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t('newListing.propTitlePlaceholder')}
                className="w-full px-3 py-2 rounded-lg border border-outline-variant bg-surface focus:border-primary outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-xs text-on-surface mb-1">{t('newListing.price')}</label>
              <input
                type="text"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="1,500,000"
                className="w-full px-3 py-2 rounded-lg border border-outline-variant bg-surface focus:border-primary outline-none font-bold text-primary"
              />
            </div>
            <div>
              <label className="block font-bold text-xs text-on-surface mb-1">{t('newListing.propType')}</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full px-3 py-2 rounded-lg border border-outline-variant bg-surface focus:border-primary outline-none"
              >
                <option value="Single Family">{t('listings.typeSingleFamily')}</option>
                <option value="Condo">{t('listings.typeCondo')}</option>
                <option value="Multi-Family">{t('listings.typeMultiFamily')}</option>
                <option value="Commercial">{t('listings.typeCommercial')}</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-xs text-on-surface mb-1">{t('newListing.sqft')}</label>
              <input
                type="number"
                value={sqft}
                onChange={(e) => setSqft(e.target.value)}
                placeholder="2,500"
                className="w-full px-3 py-2 rounded-lg border border-outline-variant bg-surface focus:border-primary outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-xs text-on-surface mb-1">{t('newListing.bedrooms')}</label>
              <input
                type="number"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-outline-variant bg-surface focus:border-primary outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-xs text-on-surface mb-1">{t('newListing.bathrooms')}</label>
              <input
                type="number"
                step="0.5"
                value={bathrooms}
                onChange={(e) => setBathrooms(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-outline-variant bg-surface focus:border-primary outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-xs text-on-surface mb-1">{t('newListing.sellerName')}</label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder={t('newListing.sellerPlaceholder')}
                className="w-full px-3 py-2 rounded-lg border border-outline-variant bg-surface focus:border-primary outline-none"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block font-bold text-xs text-on-surface">{t('newListing.description')}</label>
              <button
                type="button"
                onClick={handleGenerateAiDescription}
                className="text-xs font-bold text-primary hover:text-primary-container flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                {t('newListing.aiWrite')}
              </button>
            </div>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t('newListing.descriptionPlaceholder')}
              className="w-full px-3 py-2 rounded-lg border border-outline-variant bg-surface focus:border-primary outline-none text-xs leading-relaxed"
            />
          </div>

          <div className="pt-4 border-t border-outline-variant/60 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-outline-variant font-semibold text-secondary hover:bg-surface-container-low transition-colors cursor-pointer"
            >
              {t('newListing.cancel')}
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-primary text-on-primary font-bold hover:bg-[#172e6e] transition-colors shadow-sm cursor-pointer flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">check</span>
              {t('newListing.publish')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
