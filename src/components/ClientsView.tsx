import React, { useState } from 'react';
import { MOCK_LEADS } from '../data/mockData';

interface ClientsViewProps {
  onTriggerAiAction: (title: string, prompt: string) => void;
}

export const ClientsView: React.FC<ClientsViewProps> = ({ onTriggerAiAction }) => {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'buyer' | 'seller' | 'investor'>('all');

  // Derive rich client list from leads and listings
  const clients = [
    {
      id: 'c-1',
      name: 'Sarah Jenkins',
      email: 'sarah.j@techcorp.com',
      phone: '+1 (555) 234-5678',
      type: 'buyer' as const,
      status: 'Active VIP',
      interest: 'Looking for 3BR in Downtown ($1.2M - $1.5M)',
      lastContact: '10 mins ago',
      agent: 'Michael T.',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&h=120&q=80'
    },
    {
      id: 'c-2',
      name: 'Michael Chang',
      email: 'm.chang@investments.io',
      phone: '+1 (555) 876-5432',
      type: 'investor' as const,
      status: 'Active Portfolio',
      interest: 'Seeking 7%+ cap rate multi-family units ($2.5M+)',
      lastContact: '2 hours ago',
      agent: 'Elena R.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80'
    },
    {
      id: 'c-3',
      name: 'Richard & Martha Vance',
      email: 'r.vance@vancetrust.org',
      phone: '+1 (555) 998-8776',
      type: 'seller' as const,
      status: 'Needs Attention',
      interest: 'Selling 124 Maple St ($1.35M) - 52 DOM',
      lastContact: 'Yesterday',
      agent: 'Michael T.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80'
    },
    {
      id: 'c-4',
      name: 'The Rivera Family',
      email: 'carlos.rivera@gmail.com',
      phone: '+1 (555) 345-6789',
      type: 'buyer' as const,
      status: 'In Negotiation',
      interest: 'Counter offer sent for 452 Oak Lane ($890k)',
      lastContact: 'Yesterday',
      agent: 'Elena R.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80'
    },
    {
      id: 'c-5',
      name: 'Dr. Amanda Vance',
      email: 'vance.md@hospital.org',
      phone: '+1 (555) 901-2345',
      type: 'buyer' as const,
      status: 'VIP Buyer',
      interest: 'Penthouse suites in Skyline Heights ($3.2M)',
      lastContact: '3 hours ago',
      agent: 'Michael T.',
      avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=120&h=120&q=80'
    },
    {
      id: 'c-6',
      name: 'Marcus & Chloe Thorne',
      email: 'm.thorne@designstudio.com',
      phone: '+1 (555) 456-7890',
      type: 'buyer' as const,
      status: 'Closing Escrow',
      interest: '782 Pine Ave ($1.15M)',
      lastContact: '4 hours ago',
      agent: 'Elena R.',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&h=120&q=80'
    }
  ];

  const filtered = clients.filter((c) => {
    if (filterType !== 'all' && c.type !== filterType) return false;
    if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.interest.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-lg animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="font-headline-lg text-[28px] font-bold text-on-surface tracking-tight">
            Client Directory
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
            Manage relationship histories, preference profiles, and AI communications.
          </p>
        </div>
        <div className="flex gap-sm">
          <button
            onClick={() =>
              onTriggerAiAction(
                'AI Client Retention & Touchpoint Audit',
                'Analyze our client directory and draft personalized touchpoint messages for clients who have not been contacted in over 48 hours.'
              )
            }
            className="px-md py-sm rounded-lg border border-primary/40 text-primary bg-primary-fixed/30 font-label-md text-label-md hover:bg-primary-fixed/50 transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
            AI Touchpoint Audit
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-wrap gap-4 items-center justify-between bg-surface-container-lowest p-4 rounded-xl border border-outline-variant shadow-2xs">
        <div className="flex gap-2 items-center">
          <span className="text-xs font-bold text-outline mr-1 uppercase tracking-wider">Role:</span>
          {[
            { id: 'all', label: 'All Clients' },
            { id: 'buyer', label: 'Buyers' },
            { id: 'seller', label: 'Sellers' },
            { id: 'investor', label: 'Investors' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setFilterType(item.id as any)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                filterType === item.id
                  ? 'bg-primary text-on-primary shadow-2xs'
                  : 'bg-surface-container-low text-secondary hover:bg-surface-container'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-outline text-[18px]">
            search
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name or criteria..."
            className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-outline-variant bg-surface text-xs focus:border-primary outline-none"
          />
        </div>
      </div>

      {/* Clients Table / Cards */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low/80 border-b border-outline-variant text-[11px] font-bold text-outline uppercase tracking-wider">
                <th className="p-4">Client Name & Contact</th>
                <th className="p-4">Role & Status</th>
                <th className="p-4">Criteria / Current Property</th>
                <th className="p-4">Assigned Agent</th>
                <th className="p-4">Last Contact</th>
                <th className="p-4 text-right">AI Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/40 text-sm">
              {filtered.map((client) => (
                <tr key={client.id} className="hover:bg-surface-container-low/40 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={client.avatar}
                        alt={client.name}
                        className="w-10 h-10 rounded-full object-cover border border-outline-variant/60"
                      />
                      <div>
                        <p className="font-bold text-on-surface">{client.name}</p>
                        <div className="flex items-center gap-2 text-xs text-secondary mt-0.5">
                          <span>{client.phone}</span>
                          <span>•</span>
                          <span className="truncate max-w-[160px]">{client.email}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider inline-block mb-1 ${
                      client.type === 'buyer'
                        ? 'bg-[#dcfce7] text-[#16a34a]'
                        : client.type === 'seller'
                        ? 'bg-error-container text-error'
                        : 'bg-primary-fixed text-primary'
                    }`}>
                      {client.type}
                    </span>
                    <p className="text-xs font-medium text-secondary">{client.status}</p>
                  </td>
                  <td className="p-4">
                    <p className="text-xs text-on-surface font-medium max-w-xs">{client.interest}</p>
                  </td>
                  <td className="p-4">
                    <span className="text-xs font-semibold bg-surface-container px-2 py-1 rounded text-on-surface-variant">
                      {client.agent}
                    </span>
                  </td>
                  <td className="p-4 text-xs text-secondary">{client.lastContact}</td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() =>
                        onTriggerAiAction(
                          `WhatsApp Script: ${client.name}`,
                          `Write a friendly, high-converting WhatsApp check-in for ${client.name} (${client.type}, interested in: "${client.interest}").`
                        )
                      }
                      className="px-2.5 py-1 bg-[#E0E7FF] text-[#3730A3] hover:bg-[#c7d2fe] rounded text-xs font-bold transition-colors cursor-pointer inline-flex items-center gap-1 shadow-2xs"
                      title="Generate WhatsApp Message"
                    >
                      <span className="material-symbols-outlined text-[14px]">chat</span>
                      WhatsApp
                    </button>
                    <button
                      onClick={() =>
                        onTriggerAiAction(
                          `Client Profile: ${client.name}`,
                          `Analyze preferences and recommend top 3 matching properties or strategy for ${client.name}.`
                        )
                      }
                      className="px-2.5 py-1 bg-surface border border-outline-variant hover:bg-surface-container rounded text-xs font-medium text-on-surface transition-colors cursor-pointer inline-flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[14px]">person_search</span>
                      Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
