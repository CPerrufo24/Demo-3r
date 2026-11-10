import React, { useState } from 'react';
import { Listing } from '../types';

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
      alert('Please enter at least the property address and title first.');
      return;
    }
    const generated = `Welcome to ${address} — an exceptional ${type.toLowerCase()} offering ${bedrooms} bedrooms, ${bathrooms} luxury baths, and ${sqft || 'spacious'} square feet of refined architectural living. Featuring open-concept layouts, high-end designer finishes, and prime accessibility to top city amenities. An unparalleled investment opportunity.`;
    setDescription(generated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address || !price) return;

    const newListing: Listing = {
      id: `list-${Date.now()}`,
      address,
      title: title || 'Luxury Residential Property',
      price: Number(price.replace(/[^0-9.]/g, '')) || 1000000,
      bedrooms: Number(bedrooms) || 3,
      bathrooms: Number(bathrooms) || 2,
      sqft: Number(sqft) || 2000,
      type,
      status: 'active',
      daysOnMarket: 1,
      clientName: clientName || 'Elite Realty Client Trust',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
    };

    onAddListing(newListing);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-on-surface/50 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-2xl max-w-xl w-full p-6 space-y-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b border-outline-variant/60 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">add_home</span>
            </div>
            <div>
              <h3 className="font-headline-md text-[20px] font-bold text-on-surface">Add New Property Listing</h3>
              <p className="text-xs text-secondary">Enter property inventory details or use AI assistance</p>
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
              <label className="block font-bold text-xs text-on-surface mb-1">Property Address *</label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g. 550 Park Ave, Penthouse A"
                className="w-full px-3 py-2 rounded-lg border border-outline-variant bg-surface focus:border-primary outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-xs text-on-surface mb-1">Property Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Modern Skyline Penthouse"
                className="w-full px-3 py-2 rounded-lg border border-outline-variant bg-surface focus:border-primary outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-xs text-on-surface mb-1">Listing Price ($) *</label>
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
              <label className="block font-bold text-xs text-on-surface mb-1">Property Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full px-3 py-2 rounded-lg border border-outline-variant bg-surface focus:border-primary outline-none"
              >
                <option value="Single Family">Single Family</option>
                <option value="Condo">Condo</option>
                <option value="Multi-Family">Multi-Family</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-xs text-on-surface mb-1">Square Feet</label>
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
              <label className="block font-bold text-xs text-on-surface mb-1">Bedrooms</label>
              <input
                type="number"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-outline-variant bg-surface focus:border-primary outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-xs text-on-surface mb-1">Bathrooms</label>
              <input
                type="number"
                step="0.5"
                value={bathrooms}
                onChange={(e) => setBathrooms(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-outline-variant bg-surface focus:border-primary outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-xs text-on-surface mb-1">Seller / Client Name</label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="e.g. Richard Vance"
                className="w-full px-3 py-2 rounded-lg border border-outline-variant bg-surface focus:border-primary outline-none"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block font-bold text-xs text-on-surface">Property Description</label>
              <button
                type="button"
                onClick={handleGenerateAiDescription}
                className="text-xs font-bold text-primary hover:text-primary-container flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                AI Auto-Write Description
              </button>
            </div>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Click 'AI Auto-Write Description' above or enter custom property copy..."
              className="w-full px-3 py-2 rounded-lg border border-outline-variant bg-surface focus:border-primary outline-none text-xs leading-relaxed"
            />
          </div>

          <div className="pt-4 border-t border-outline-variant/60 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-outline-variant font-semibold text-secondary hover:bg-surface-container-low transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-primary text-on-primary font-bold hover:bg-[#172e6e] transition-colors shadow-sm cursor-pointer flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">check</span>
              Publish Listing
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
