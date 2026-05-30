import React, { useState } from 'react';
import { User, Bell, Trash2, Award, LogOut, CheckCircle, Palette, Shield, Key, School, Edit3, Save, Eye, EyeOff, Sparkles } from 'lucide-react';
import { UserProfile } from '../types';

interface ProfilePanelProps {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  onSignOut: () => void;
  onResetData: () => void;
}

export const ProfilePanel: React.FC<ProfilePanelProps> = ({
  profile,
  setProfile,
  onSignOut,
  onResetData
}) => {
  const [username, setUsername] = useState(profile.username || profile.email.split('@')[0]);
  const [school, setSchool] = useState(profile.school || '');
  const [password, setPassword] = useState(profile.password || '');
  const [photo, setPhoto] = useState(profile.photo || '🧠');
  const [isEditing, setIsEditing] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [customApiKey, setCustomApiKey] = useState(() => {
    return localStorage.getItem(`bp_gemini_api_key_${profile.email}`) || '';
  });
  const [isEditingKey, setIsEditingKey] = useState(false);

  const toggleReminder = () => {
    setProfile(prev => {
      if (!prev) return prev;
      const nextReminder = !prev.allowPushNotifications;
      localStorage.setItem(`bp_profile_${prev.email}`, JSON.stringify({
        ...prev,
        allowPushNotifications: nextReminder
      }));
      return { ...prev, allowPushNotifications: nextReminder };
    });
  };

  const toggleHistory = () => {
    setProfile(prev => {
      if (!prev) return prev;
      const nextHistory = !prev.rememberQuestionHistory;
      localStorage.setItem(`bp_profile_${prev.email}`, JSON.stringify({
        ...prev,
        rememberQuestionHistory: nextHistory
      }));
      return { ...prev, rememberQuestionHistory: nextHistory };
    });
  };

  const changeTheme = (themeId: string) => {
    setProfile(prev => {
      if (!prev) return prev;
      const updated = {
        ...prev,
        theme: themeId
      };
      localStorage.setItem(`bp_profile_${prev.email}`, JSON.stringify(updated));
      return updated;
    });
  };

  const currentLevel = Math.floor(profile.totalXp / 100) + 1;

  const themes = [
    { id: 'classic-pine', name: 'Classic Pine', desc: 'Sylvan board review classic theme', colors: ['#1b3518', '#8fa89b', '#a3e635'] },
    { id: 'strawberry-matcha', name: 'Strawberry Matcha', desc: 'Delicious cream, green tea, & pink berry', colors: ['#29402e', '#a37c82', '#ff6584'] },
    { id: 'lilac-dream', name: 'Lilac Dream', desc: 'Calming lavender night skies', colors: ['#453066', '#9a8bb3', '#d4a5ff'] },
    { id: 'pastel-pink-coquette', name: 'Pastel Pink Coquette', desc: 'Dainty vintage ballet lace & rose ribbons', colors: ['#8a3b4c', '#d6abb4', '#ff9eba'] },
    { id: 'winter', name: 'Winter', desc: 'Crisp glacier chill & northern neon cyan', colors: ['#1b324d', '#849cb5', '#4ad4db'] },
    { id: 'red-blush', name: 'Red Blush', desc: 'Passionate velvet & warm cheek rouge blush', colors: ['#751421', '#b36f78', '#ff5266'] },
  ];

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(prev => {
      if (!prev) return prev;
      const updated = {
        ...prev,
        username: username.trim(),
        school: school.trim(),
        password: password,
        photo: photo
      };
      localStorage.setItem(`bp_profile_${prev.email}`, JSON.stringify(updated));
      return updated;
    });
    setIsEditing(false);
    alert('✅ Board Pass Profile credentials updated successfully! Changes will propagate across diagnostic lists.');
  };

  const regId = `RPM-2026-${Math.abs(profile.email.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)).toString().substring(0, 5)}`;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl text-pine">Candidate Settings &amp; Preferences</h2>
        <p className="text-xs text-gray-500 mt-1 pb-1 border-b border-gray-100 leading-relaxed font-sans font-medium">
          Customize your board review parameters, adjust PWA local notifications permission, or refresh clinical tracking histories securely.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Dynamic Credentials ID Card: Column Span 7 */}
        <div className="lg:col-span-7 bg-gradient-to-br from-emerald-900 via-teal-950 to-green-950 text-cream rounded-3xl p-6 shadow-xl relative border border-emerald-700/35 overflow-hidden select-none min-h-[310px] flex flex-col justify-between">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-mint via-sage to-emerald-500" />
          <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-[radial-gradient(#FFF_1px,transparent_1px)] bg-[size:16px_16px] opacity-5 pointer-events-none" />
          
          {/* Hologram Stamp */}
          <div className="absolute right-6 top-16 w-16 h-16 rounded-full border-2 border-dashed border-mint/20 flex flex-col items-center justify-center text-[7px] text-mint/60 uppercase font-mono tracking-widest text-center select-none rotate-12 bg-emerald-950/30">
            <Sparkles className="w-4 h-4 text-mint/40 mb-0.5 animate-spin-slow" />
            <span>PmLE</span>
            <span className="font-bold">2026</span>
          </div>

          <div className="flex justify-between items-start border-b border-white/10 pb-4">
            <div className="space-y-0.5">
              <span className="text-[7.5px] tracking-[0.25em] font-extrabold uppercase text-mint font-mono block">
                Republic of the Philippines
              </span>
              <h3 className="text-xs uppercase font-sans font-black tracking-wider text-cream">
                Professional Regulation Commission
              </h3>
              <p className="text-[8.5px] text-sage font-mono">Board of Psychology Reviewee Card</p>
            </div>
            <span className="text-[9px] uppercase font-bold font-mono tracking-widest bg-mint/15 text-mint px-2 py-0.5 rounded-full border border-mint/25">
              {profile.tier}
            </span>
          </div>

          <div className="grid grid-cols-12 gap-4 py-5 items-center">
            <div className="col-span-3 flex justify-center">
              <div className="w-18 h-18 rounded-2xl bg-teal-900/60 border border-mint/30 flex items-center justify-center text-3xl shadow-inner relative group select-none">
                {photo}
                <div className="absolute bottom-0 inset-x-0 bg-black/60 text-[7.5px] font-mono text-center text-cream py-0.5 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                  Active
                </div>
              </div>
            </div>

            <div className="col-span-9 space-y-2">
              <div className="space-y-0.5">
                <span className="text-[7px] uppercase text-sage font-bold tracking-wider block font-mono">Review Candidate Name</span>
                <h4 className="text-base font-sans font-black tracking-tight text-cream capitalize leading-tight">
                  {profile.username || username || profile.email.split('@')[0]}
                </h4>
              </div>

              <div className="space-y-0.5">
                <span className="text-[7px] uppercase text-sage font-bold tracking-wider block font-mono">Affiliated Academic College</span>
                <p className="text-xs font-semibold font-sans text-cream/90 leading-none capitalize">
                  {profile.school || 'Unspecified Academic Institution'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[8px] text-sage uppercase">
                <div>
                  <span>Email Coordinate:</span>
                  <p className="font-sans text-[10px] text-cream font-bold truncate mt-0.5 lowecase font-mono select-text">{profile.email}</p>
                </div>
                <div>
                  <span>State Reg No:</span>
                  <span className="block text-[10px] text-mint font-bold mt-0.5 select-all">{regId}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hologram Footer Metrics info */}
          <div className="border-t border-white/10 pt-3 flex justify-between items-center text-right font-mono text-[8.5px] select-none text-sage">
            <div className="flex gap-4 text-left">
              <div>
                <span>Candidate Level</span>
                <strong className="block text-cream text-[10px] mt-0.5">Lv. {currentLevel}</strong>
              </div>
              <div>
                <span>Study Streak</span>
                <strong className="block text-cream text-[10px] mt-0.5">🔥 {profile.streak} Days</strong>
              </div>
              <div>
                <span>Practice Evaluates</span>
                <strong className="block text-cream text-[10px] mt-0.5">🎖️ {profile.attempts} Qs</strong>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span>BOARD ACCURACY INDEX</span>
              <strong className="block text-mint text-xs font-black mt-0.5">
                🎯 {profile.attempts > 0 ? Math.round((profile.correct / profile.attempts) * 100) : 0}%
              </strong>
            </div>
          </div>
        </div>

        {/* Interactive account edit forms: Column Span 5 */}
        <div className="lg:col-span-5 bg-white border border-gray-150 rounded-3xl p-5 shadow-sm space-y-4">
          <div className="border-b border-gray-100 pb-2.5 flex justify-between items-center">
            <h4 className="font-heading font-black text-pine text-xs uppercase tracking-widest flex items-center gap-1.5 font-mono">
              <Shield className="w-4 h-4 text-sage" />
              Manage Credentials
            </h4>
            <button
              onClick={() => {
                setIsEditing(!isEditing);
                if(!isEditing) {
                  // Keep state synced
                  setUsername(profile.username || profile.email.split('@')[0]);
                  setSchool(profile.school || '');
                  setPassword(profile.password || '');
                  setPhoto(profile.photo || '🧠');
                }
              }}
              className="text-[10px] font-bold text-pine hover:underline uppercase tracking-wide flex items-center gap-1 cursor-pointer font-mono"
            >
              <Edit3 className="w-3.5 h-3.5" />
              {isEditing ? 'Cancel Edit' : 'Edit Fields'}
            </button>
          </div>

          {!isEditing ? (
            <div className="space-y-4 text-xs font-medium leading-relaxed leading-normal">
              <p className="text-gray-500 font-sans">
                Reviewees can edit credentials anytime. Updating your visual profile modifies information printed on Review Cards & Leaderboard slots.
              </p>
              <div className="space-y-2 border-t border-gray-50 pt-3 font-mono text-[10.5px]">
                <div className="flex justify-between py-1">
                  <span className="text-gray-400">USERNAME</span>
                  <span className="font-sans font-bold text-gray-800">{profile.username || 'Not set'}</span>
                </div>
                <div className="flex justify-between py-1 border-t border-dashed border-gray-100">
                  <span className="text-gray-400">COLLEGE / SCHOOL</span>
                  <span className="font-sans font-bold text-gray-800 max-w-[200px] truncate block text-right">{profile.school || 'Unspecified school'}</span>
                </div>
                <div className="flex justify-between py-1 border-t border-dashed border-gray-100">
                  <span className="text-gray-400">AVATAR PRESET</span>
                  <span className="text-sm block">{profile.photo || '🧠'}</span>
                </div>
                <div className="flex justify-between py-1 border-t border-dashed border-gray-100">
                  <span className="text-gray-400">PASSWORD</span>
                  <span className="font-sans text-gray-800 font-bold">••••••••</span>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSaveProfile} className="space-y-3 font-sans">
              <div className="space-y-1">
                <label className="text-[9.5px] uppercase font-bold text-gray-400 block tracking-wider font-mono">Candidate Username</label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="e.g. Katrina Mae Santos"
                  className="w-full bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-xs font-semibold outline-none focus:border-sage"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9.5px] uppercase font-bold text-gray-400 block tracking-wider font-mono">Academic University / School</label>
                <input
                  type="text"
                  required
                  value={school}
                  onChange={e => setSchool(e.target.value)}
                  placeholder="e.g. University of the Philippines Diliman"
                  className="w-full bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-xs font-semibold outline-none focus:border-sage"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9.5px] uppercase font-bold text-gray-400 block tracking-wider font-mono">Review Room Password</label>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter review logging secrets"
                    className="w-full bg-white border border-gray-200 rounded-xl pl-3 pr-10 py-1.5 text-xs font-semibold outline-none focus:border-sage font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-pine"
                  >
                    {showPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9.5px] uppercase font-bold text-gray-400 block tracking-wider font-mono">Select Avatar Badge</label>
                <div className="flex gap-2 bg-foam/40 p-2 border border-gray-100 rounded-xl justify-between">
                  {['🧠', '📋', '🔬', '💼', '🎓', '🏥'].map(badge => (
                    <button
                      key={badge}
                      type="button"
                      onClick={() => setPhoto(badge)}
                      className={`text-xl p-1 rounded-lg transition-transform hover:scale-110 active:scale-95 ${
                        photo === badge ? 'ring-2 ring-pine bg-white shadow-xs scale-105' : ''
                      }`}
                    >
                      {badge}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-pine hover:bg-pine-mid text-white font-bold text-[10px] uppercase tracking-widest rounded-xl shadow-md border-b-2 border-pine-mid transition cursor-pointer select-none flex items-center justify-center gap-1 mt-2"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Reviewee Credentials</span>
              </button>
            </form>
          )}

          <div className="border-t border-gray-100 pt-3 space-y-2">
            <button
              onClick={onSignOut}
              className="w-full py-2 bg-gray-55 hover:bg-gray-100 text-gray-700 hover:text-pine text-xs font-bold uppercase tracking-widest rounded-xl transition cursor-pointer select-none flex items-center justify-center gap-1.5 border border-gray-200/40"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out Account
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 select-none">
        <div className="bg-white border border-gray-150 rounded-2xl p-5 shadow-sm space-y-4">
          <h4 className="font-heading font-black text-pine text-xs uppercase tracking-widest flex items-center gap-1.5 border-b border-gray-100 pb-2.5">
            <Bell className="w-4 h-4 text-sage" />
            PWA Notifications &amp; Privacy
          </h4>

          <div className="space-y-3 font-normal leading-normal">
            <label className="flex items-start gap-3.5 cursor-pointer py-1 select-none">
              <input 
                type="checkbox" 
                checked={profile.allowPushNotifications} 
                onChange={toggleReminder} 
                className="sr-only peer" 
              />
              <div className="relative w-10 h-5.5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4.5 after:w-4.5 after:transition-all peer-checked:bg-pine"></div>
              <div>
                <span className="text-xs font-bold text-gray-700 block leading-tight">Daily Habit Reminders Active</span>
                <span className="text-[10px] text-gray-400 font-mono">Triggers Chrome/Safari push notifications at 8:00 AM PHT daily.</span>
              </div>
            </label>

            <label className="flex items-start gap-3.5 cursor-pointer py-1 select-none border-t border-dashed border-gray-100 pt-3">
              <input 
                type="checkbox" 
                checked={profile.rememberQuestionHistory !== false} 
                onChange={toggleHistory} 
                className="sr-only peer" 
              />
              <div className="relative w-10 h-5.5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4.5 after:w-4.5 after:transition-all peer-checked:bg-pine"></div>
              <div>
                <span className="text-xs font-bold text-gray-700 block leading-tight">Unique Question Tracking Engine</span>
                <span className="text-[10px] text-gray-400 font-mono">Guarantees that you never encounter the exact same clinical MCQ twice.</span>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Aesthetic Presets Selection Grid */}
      <div className="bg-white border border-gray-150 rounded-2xl p-5 shadow-sm space-y-4 select-none">
        <h4 className="font-heading font-black text-pine text-xs uppercase tracking-widest flex items-center gap-1.5 border-b border-gray-100 pb-2.5">
          <Palette className="w-4.5 h-4.5 text-sage" />
          Aesthetic Interface Presets
        </h4>
        <p className="text-[10.5px] text-gray-400 font-mono leading-relaxed">
          Switch between customized visual presets designed to accommodate your personal study mood and environment.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {themes.map(t => {
            const isSelected = (profile.theme || 'strawberry-matcha') === t.id;
            return (
              <button
                key={t.id}
                onClick={() => changeTheme(t.id)}
                type="button"
                className={`text-left p-3.5 rounded-xl border transition-all duration-200 cursor-pointer relative flex flex-col justify-between h-28 ${
                  isSelected 
                    ? 'border-pine bg-foam/30 shadow-sm ring-2 ring-pine/5 font-bold' 
                    : 'border-gray-150 bg-white hover:bg-gray-50/40 hover:border-gray-300'
                }`}
              >
                <div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-gray-800 font-sans block leading-none">{t.name}</span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-pine animate-pulse" />
                    )}
                  </div>
                  <span className="text-[9px] text-gray-400 font-mono leading-relaxed mt-1 block font-medium">
                    {t.desc}
                  </span>
                </div>

                <div className="flex gap-1.5 mt-2.5 items-center w-full">
                  <div className="flex gap-1">
                    {t.colors.map((c, i) => (
                      <div 
                        key={i} 
                        className="w-3.5 h-3.5 rounded-full border border-black/5" 
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                  <span className="text-[8px] uppercase tracking-wider font-extrabold text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded ml-auto font-mono">
                    {t.id === 'strawberry-matcha' ? 'Default' : 'Aesthetic'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-white border border-gray-150 rounded-2xl p-5 shadow-sm space-y-4 select-none">
        <h4 className="font-heading font-black text-pine text-xs uppercase tracking-widest flex items-center gap-1.5 border-b border-gray-100 pb-2.5">
          <Key className="w-4 h-4 text-sage" />
          Developer API Key Integration
        </h4>
        <p className="text-[10px] text-gray-500 font-mono leading-relaxed">
          Bypass the standard plan quotas by securely supplying your own Gemini Developer API Key. Your key is kept entirely on your local browser device.
        </p>

        <div className="space-y-3">
          {!isEditingKey ? (
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider font-mono">Current Custom API Key</span>
                <span className="font-sans font-bold text-gray-800 text-sm mt-0.5 block">
                  {customApiKey ? '••••••••••••••••' + customApiKey.slice(-4) : 'No custom key configured. Running on standard quotas.'}
                </span>
              </div>
              <button
                onClick={() => setIsEditingKey(true)}
                className="px-4 py-1.5 bg-gray-100 hover:bg-gray-200 text-pine text-[10px] font-bold uppercase tracking-widest rounded transition cursor-pointer"
              >
                {customApiKey ? 'Update Key' : 'Setup Key'}
              </button>
            </div>
          ) : (
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                localStorage.setItem(`bp_gemini_api_key_${profile.email}`, customApiKey.trim());
                setIsEditingKey(false);
                alert('✅ Saved! Custom API key will be used for future AI generations.');
              }} 
              className="space-y-2"
            >
              <div className="relative">
                <input
                  type="text"
                  value={customApiKey}
                  onChange={e => setCustomApiKey(e.target.value)}
                  placeholder="Paste your Gemini AI Studio API Key here (AIzaSy...)"
                  className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-mono outline-none focus:border-sage focus:ring-1 focus:ring-sage"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-pine hover:bg-pine-mid text-white text-[10px] font-bold uppercase tracking-widest rounded shadow-sm transition cursor-pointer flex-1"
                >
                  Save API Key
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCustomApiKey(localStorage.getItem(`bp_gemini_api_key_${profile.email}`) || '');
                    setIsEditingKey(false);
                  }}
                  className="px-4 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 text-[10px] font-bold uppercase tracking-widest rounded transition cursor-pointer"
                >
                  Cancel
                </button>
                {customApiKey && (
                  <button
                    type="button"
                    onClick={() => {
                      if(confirm('Are you sure you want to remove your custom key? You will revert to standard plan quotas.')) {
                        setCustomApiKey('');
                        localStorage.removeItem(`bp_gemini_api_key_${profile.email}`);
                        setIsEditingKey(false);
                      }
                    }}
                    className="px-4 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 text-[10px] font-bold uppercase tracking-widest rounded transition cursor-pointer"
                  >
                    Clear Key
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>

      <div className="bg-white border border-gray-150 rounded-2xl p-5 shadow-sm space-y-4 select-none">
        <h4 className="font-heading font-black text-rose-700 text-xs uppercase tracking-widest flex items-center gap-1.5 border-b border-gray-100 pb-2.5">
          <Trash2 className="w-4 h-4 text-rose-500" />
          Regulatory Area Danger Block
        </h4>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-0.5 leading-snug">
            <h5 className="text-xs font-bold text-gray-700">Wipe Board Review Profiles</h5>
            <p className="text-[10px] text-gray-400 font-medium font-mono">Resets accumulated XP, streaks, purchase shields, and custom study reminders.</p>
          </div>
          <button
            onClick={() => {
              if (confirm('⚠️ Are you absolutely sure you want to delete all local review files? This will reset your streaks, levels, and custom checklist events.')) {
                onResetData();
              }
            }}
            className="px-4 py-2 hover:bg-rose-50 border border-rose-200 text-rose-700 text-xs font-black uppercase tracking-widest rounded-xl transition cursor-pointer"
          >
            Wipe Local Registry Data
          </button>
        </div>
      </div>
    </div>
  );
};

