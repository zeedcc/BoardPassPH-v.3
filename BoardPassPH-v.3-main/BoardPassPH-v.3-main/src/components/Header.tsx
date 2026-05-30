import React, { useState } from 'react';
import { Award, BookOpen, Palette, Check, Cloud, RefreshCw } from 'lucide-react';
import { UserProfile } from '../types';

interface HeaderProps {
  profile: UserProfile;
  onNavigate: (tabId: string) => void;
  theme: string;
  onThemeChange: (newTheme: string) => void;
  syncStatus?: 'syncing' | 'synced';
  onCloudSync?: () => void;
}

const THEME_OPTIONS = [
  { id: 'strawberry-matcha', name: 'Strawberry Matcha', emoji: '🍓🍵', bg: 'bg-[#1B3518]', accent: 'bg-[#E5526C]' },
  { id: 'lilac-dream', name: 'Lilac Dream', emoji: '💜🦄', bg: 'bg-[#261B4E]', accent: 'bg-[#9C85E5]' },
  { id: 'winter', name: 'Winter Frost', emoji: '❄️☃️', bg: 'bg-[#0F2038]', accent: 'bg-[#50A3EF]' },
  { id: 'pastel-pink-coquette', name: 'Pastel Coquette', emoji: '🎀🩰', bg: 'bg-[#401B22]', accent: 'bg-[#EC9FA5]' },
  { id: 'red-blush', name: 'Red Blush', emoji: '🌹💄', bg: 'bg-[#470D14]', accent: 'bg-[#F43F5E]' }
];

export const Header: React.FC<HeaderProps> = ({ profile, onNavigate, theme, onThemeChange, syncStatus = 'synced', onCloudSync }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const getTierColor = () => {
    const tier = (profile.tier || '7-Day Clinical Trial').toLowerCase();
    if (tier.includes('clinical')) {
      return 'bg-gradient-to-r from-red-600 to-rose-500 shadow-md shadow-rose-900/10 border-rose-300';
    }
    if (tier.includes('pro')) {
      return 'bg-gradient-to-r from-amber-600 to-yellow-500 shadow-md shadow-amber-900/10 border-yellow-300';
    }
    return 'bg-gradient-to-r from-teal-700 to-emerald-600 border-teal-300';
  };

  return (
    <header className="relative bg-gradient-to-br from-pine to-[#091b14] overflow-hidden px-6 py-8 border-b border-pine-mid">
      <div 
        className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:32px_32px]"
      />
      <div className="absolute -top-24 -right-12 w-64 h-64 rounded-full bg-sage/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-12 w-48 h-48 rounded-full bg-rose-500/5 blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-4 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3 select-none">
          <div className="p-2 bg-teal-900/30 rounded-2xl border border-teal-500/20 shadow-inner">
            <img 
              src="/icon.png" 
              alt="BoardPassPH Logo" 
              className="w-10 h-10 object-contain rounded-lg"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-sage">PRC Psychometrician & Board Review</span>
            <h1 className="font-display text-4xl text-cream tracking-tight leading-none mt-1">
              Board<span className="text-mint font-normal italic">Pass</span>PH
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={onCloudSync}
            disabled={syncStatus === 'syncing'}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-[10px] select-none transition-all duration-200 border cursor-pointer hover:bg-white/10 active:scale-95 duration-100 ${
              syncStatus === 'syncing' 
                ? 'bg-amber-500/10 border-amber-500/20 text-amber-300' 
                : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
            }`}
            title={syncStatus === 'syncing' ? 'Publishing changes to Google Cloud Firestore...' : 'Click to sync review stats with Google Cloud Firestore.'}
          >
            {syncStatus === 'syncing' ? (
              <>
                <RefreshCw className="w-3 h-3 text-amber-400 animate-spin" />
                <span className="font-extrabold uppercase tracking-wide">Syncing...</span>
              </>
            ) : (
              <>
                <Cloud className="w-3 h-3 text-emerald-400" />
                <span className="font-extrabold uppercase tracking-wide">Cloud Sync</span>
              </>
            )}
          </button>

          <div className="flex flex-col items-end hidden sm:flex select-none">
            <span className="text-[10px] uppercase tracking-wider text-sage font-bold">Review Class Session</span>
            <span className="text-xs text-mint/80 font-mono mt-0.5" id="myRankName">
              {profile.email ? profile.email.split('@')[0] : 'Reviewee'}
            </span>
          </div>

          <button
            onClick={() => onNavigate('billingTab')}
            className={`flex items-center gap-1.5 px-4 py-2 border rounded-full text-white font-sans font-bold text-xs uppercase tracking-widest cursor-pointer select-none transition-all duration-150 hover:scale-[1.03] active:scale-[0.98] ${getTierColor()}`}
            id="tierChip"
          >
            <Award className="w-3.5 h-3.5" />
            <span>{profile.tier || '7-Day Clinical Trial'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
