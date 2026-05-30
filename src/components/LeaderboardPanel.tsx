import React, { useState, useEffect, useMemo } from 'react';
import { Award, RefreshCw, Sparkles, CheckCircle2, AlertCircle, Trophy, Sparkle, Search } from 'lucide-react';
import { UserProfile } from '../types';
import { db, firestoreWithTimeout } from '../firebase';
import { collection, doc, setDoc, getDocs } from 'firebase/firestore';

interface LeaderboardPanelProps {
  profile: UserProfile;
}

export const LeaderboardPanel: React.FC<LeaderboardPanelProps> = ({ profile }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [leaderboardUsers, setLeaderboardUsers] = useState<any[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState<{ type: 'success' | 'error' | null; text: string }>({
    type: null,
    text: '',
  });

  // Collect candidate accounts generated on this browser locally
  const getLocalCandidates = () => {
    const list: any[] = [];
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('bp_profile_')) {
          const data = localStorage.getItem(key);
          if (data) {
            const parsed = JSON.parse(data);
            list.push(parsed);
          }
        }
      }
    } catch (e) {
      console.error('Error reading local candidates:', e);
    }

    // Force active user inside
    if (!list.find(u => u.email === profile.email)) {
      list.push(profile);
    }
    return list;
  };

  // On mount: Load cached listings, then automatically sync with Firebase in background
  useEffect(() => {
    // 1. Initial bundle from local profile & offline cached Cloud candidates
    const locals = getLocalCandidates();
    let cachedCloud: any[] = [];
    try {
      const savedCache = localStorage.getItem('bp_leaderboard_cloud_cache');
      if (savedCache) {
        cachedCloud = JSON.parse(savedCache);
      }
    } catch (err) {
      console.warn('Error reading cloud leaderboard cache:', err);
    }

    // Merge by unique email keying
    const mergedMap = new Map();
    locals.forEach(item => mergedMap.set(item.email, item));
    cachedCloud.forEach(item => mergedMap.set(item.email, item));

    const sorted = Array.from(mergedMap.values()).sort((a, b) => (b.totalXp ?? 0) - (a.totalXp ?? 0));
    setLeaderboardUsers(sorted);

    // 2. Perform background synchronization with 5-minute cooldown to conserve quota
    const timer = setTimeout(() => {
      const lastSync = localStorage.getItem('bp_leaderboard_last_sync');
      const now = Date.now();
      if (!lastSync || now - parseInt(lastSync, 10) > 300000) { // 5 minutes
        triggerLiveSync(true); 
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [profile]);

  // Performs real-time cloud data push and pull synchronization
  const triggerLiveSync = async (silentOnFailure = false) => {
    setIsSyncing(true);
    setSyncMessage({ type: null, text: '' });
    
    try {
      // Step A: Synchronize all local candidate scores into the global Firestore leaderboard collection
      const localsList = getLocalCandidates();
      for (const localUser of localsList) {
        if (!localUser || !localUser.email) continue;
        const targetEmail = localUser.email.trim().toLowerCase();
        const userRef = doc(db, 'leaderboard', targetEmail);
        const payload = {
          email: localUser.email,
          username: localUser.username || localUser.email.split('@')[0],
          school: localUser.school || 'BoardPassPH Candidate',
          totalXp: localUser.totalXp || 0,
          correct: localUser.correct || 0,
          attempts: localUser.attempts || 0,
          tier: localUser.tier || 'Free/Trial',
          theme: localUser.theme || 'strawberry-matcha',
          lastSynced: new Date().toISOString()
        };
        await setDoc(userRef, payload);
      }

      // Step B: Retrieve all registered national candidates synced on Firestore
      const querySnapshot = await firestoreWithTimeout(getDocs(collection(db, 'leaderboard')));
      const cloudUsers: any[] = [];
      querySnapshot.forEach((docSnap: any) => {
        cloudUsers.push(docSnap.data());
      });

      // Save to local cache buffer for speedier future boots
      localStorage.setItem('bp_leaderboard_cloud_cache', JSON.stringify(cloudUsers));
      localStorage.setItem('bp_leaderboard_last_sync', Date.now().toString());

      // Step C: Merge client locals with newly acquired cloud data
      const locals = getLocalCandidates();
      const mergedMap = new Map();
      locals.forEach(item => mergedMap.set(item.email, item));
      cloudUsers.forEach(item => mergedMap.set(item.email, item));

      const sorted = Array.from(mergedMap.values()).sort((a, b) => (b.totalXp ?? 0) - (a.totalXp ?? 0));
      setLeaderboardUsers(sorted);
      
      setSyncMessage({
        type: 'success',
        text: '💚 Live Sync Complete: Successfully replicated your score & updated national standings on the cloud.'
      });
    } catch (error: any) {
      console.warn('Leaderboard cloud sync issue, falling back safely:', error);
      if (!silentOnFailure) {
        setSyncMessage({
          type: 'error',
          text: `⚠️ Sync Limited: Firebase offline or setup pending. Your scores are preserved locally!`
        });
      }
    } finally {
      setIsSyncing(false);
    }
  };

  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) return leaderboardUsers;
    const query = searchQuery.toLowerCase().trim();
    return leaderboardUsers.filter(u => {
      const name = (u.username || u.email.split('@')[0] || '').toLowerCase();
      const school = (u.school || '').toLowerCase();
      return name.includes(query) || school.includes(query);
    });
  }, [leaderboardUsers, searchQuery]);

  const overallRank = useMemo(() => {
    const idx = leaderboardUsers.findIndex(u => u.email === profile.email);
    return idx !== -1 ? idx + 1 : 1;
  }, [leaderboardUsers, profile.email]);

  return (
    <div className="space-y-6">
      {/* Banner Area */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-700 to-amber-900 rounded-3xl p-6 text-cream relative shadow-md overflow-hidden select-none border border-amber-500/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="absolute inset-0 bg-[radial-gradient(#FFF_1px,transparent_1px)] bg-[size:20px_20px] opacity-10 pointer-events-none" />
        
        <div className="relative z-10 space-y-2 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="text-[9px] uppercase tracking-[0.2em] font-extrabold text-amber-900 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
              PmLE National Arena
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] font-mono text-emerald-300 bg-white/10 px-2 py-1 rounded-full border border-white/5 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live Sync Active
            </span>
          </div>
          <h2 className="font-display text-2xl tracking-tight leading-none text-cream flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-300 shrink-0" />
            Candidate Roster Board
          </h2>
          <p className="text-[11px] text-cream/80 leading-relaxed font-sans font-medium">
            Climb the ranks alongside real registered candidates studying for the upcoming Philippine Psychometrician Licensure Examination (PmLE).
          </p>
        </div>

        {/* Sync Controls inside Hero Banner */}
        <div className="relative z-10 w-full md:w-auto shrink-0">
          <button
            onClick={() => triggerLiveSync(false)}
            disabled={isSyncing}
            className="w-full md:w-auto px-5 py-3 bg-amber-55 hover:bg-amber-100 text-amber-900 hover:text-amber-950 font-bold text-xs uppercase tracking-wider rounded-2xl transition cursor-pointer flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-95 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 text-amber-800 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Syncing Standings...' : 'Sync Live Standings'}</span>
          </button>
        </div>
      </div>

      {/* Sync Status Banner */}
      {syncMessage.text && (
        <div className={`p-3.5 rounded-2xl flex items-start gap-2.5 text-xs font-semibold animate-in fade-in slide-in-from-top-2 duration-300 ${
          syncMessage.type === 'success' 
            ? 'bg-emerald-50 border border-emerald-100/80 text-emerald-950' 
            : 'bg-amber-50 border border-amber-100 text-amber-900'
        }`}>
          {syncMessage.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          )}
          <span>{syncMessage.text}</span>
        </div>
      )}

      {/* Ranks Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 select-none">
        <div className="bg-white border border-gray-150 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
          <div className="space-y-1">
            <span className="text-[8px] uppercase tracking-wider font-extrabold text-[#D97706] block font-mono">Current Candidate Rank</span>
            <h3 className="font-heading font-black text-[#B45309] text-2xl flex items-center gap-1.5 leading-none mt-1">
              🎖️ Rank #{overallRank}
            </h3>
          </div>
          <p className="text-[10px] text-gray-400 mt-2 font-medium">Earn study XP to advance your national clinical psych ranking stance.</p>
        </div>

        <div className="bg-white border border-gray-150 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
          <div className="space-y-1">
            <span className="text-[8px] uppercase tracking-wider font-extrabold text-blue-600 block font-mono">Accumulated Experience XP</span>
            <h3 className="font-heading font-black text-blue-700 text-2xl flex items-center gap-1.5 leading-none mt-1">
              ✨ {profile.totalXp || 0} XP
            </h3>
          </div>
          <p className="text-[10px] text-gray-400 mt-2 font-medium">Earned from practice evaluates, mock assessments, and streak multipliers.</p>
        </div>

        <div className="bg-white border border-gray-150 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
          <div className="space-y-1">
            <span className="text-[8px] uppercase tracking-wider font-extrabold text-[#382B6B] block font-mono">Cumulative Accuracy</span>
            <h3 className="font-heading font-black text-[#382B6B] bg-foam text-2xl flex items-center gap-1.5 leading-none mt-1 font-mono">
              🎯 {profile.attempts > 0 ? Math.round((profile.correct / profile.attempts) * 100) : 0}%
            </h3>
          </div>
          <p className="text-[10px] text-gray-400 mt-2 font-medium">Overall ratio calculated across AbPsych, testing scales, and pharmacology.</p>
        </div>
      </div>

      {/* FILTER SCORE ROSTER */}
      <div className="bg-white border border-gray-150 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between select-none">
        <div className="space-y-0.5 text-left w-full sm:w-auto">
          <span className="text-[8px] uppercase font-black tracking-wider text-gray-400 font-mono block">Filter National Review Roster</span>
          <h4 className="text-xs font-semibold text-teal-950 font-sans tracking-tight">Search Candidate Username or School</h4>
        </div>
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Type username (e.g. Katrina)..."
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2 text-xs font-sans font-bold outline-none focus:bg-white focus:border-amber-600 focus:ring-1 focus:ring-amber-500/10 placeholder:text-gray-400 text-[#0f2c1d]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-[8.5px] uppercase font-black text-gray-400 hover:text-gray-650 font-mono"
            >
              ✕ Clear
            </button>
          )}
        </div>
      </div>

      {/* Candidates List Container */}
      <div className="bg-white border border-gray-150 rounded-2xl overflow-hidden shadow-sm">
        <div className="bg-gray-50/70 py-3.5 px-5 border-b border-gray-150 flex justify-between items-center select-none font-mono">
          <h4 className="text-[10.5px] uppercase font-bold text-gray-400 tracking-wider">National Topnotchers (Aug &apos;26 PmLE Target)</h4>
          <span className="text-[9px] text-[#2e5e41] font-mono font-bold bg-[#deebe3] px-2.5 py-0.5 rounded-full">
            Filtered: {filteredUsers.length} Candidates
          </span>
        </div>

        <div className="divide-y divide-gray-100">
          {filteredUsers.map((user, idx) => {
            const dynamicRank = leaderboardUsers.findIndex(u => u.email === user.email) + 1;
            let rankBadge = "text-gray-500 bg-gray-50 border-gray-200";
            if (dynamicRank === 1) rankBadge = "bg-amber-100 text-amber-800 border-amber-300 font-black scale-105";
            else if (dynamicRank === 2) rankBadge = "bg-slate-100 text-slate-800 border-slate-300 font-bold";
            else if (dynamicRank === 3) rankBadge = "bg-orange-50 text-orange-800 border-orange-200";

            const isCurrent = user.email === profile.email;
            const displayName = user.username || user.email.split('@')[0];

            return (
              <div 
                key={user.email}
                className={`p-4 flex items-center justify-between hover:bg-foam/15 transition-all duration-150 ${
                  isCurrent ? 'bg-amber-500/5' : ''
                }`}
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className={`w-7 h-7 flex-shrink-0 flex items-center justify-center border rounded-lg text-xs font-mono font-extrabold shadow-inner select-none ${rankBadge}`}>
                    {dynamicRank}
                  </div>
                  <div className="truncate pr-2">
                    <h5 className={`font-sans font-bold text-xs leading-snug truncate flex items-center gap-1.5 ${
                      isCurrent ? 'text-teal-900 font-extrabold' : 'text-gray-800'
                    }`}>
                      {displayName} {isCurrent && <span className="text-[7.5px] tracking-wider uppercase font-mono font-black text-amber-700 bg-amber-50 px-1 border border-amber-200 rounded-xs">You</span>}
                    </h5>
                    <p className="text-[10px] text-gray-400 leading-none mt-0.5 truncate font-medium">
                      {user.school || 'BoardPassPH Reviewee Candidate'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 font-mono select-none flex-shrink-0 text-right">
                  <div>
                    <span className="text-[10.5px] font-bold text-pine block leading-tight">{user.totalXp || 0} XP</span>
                    <span className="text-[9px] text-gray-400 block leading-none font-medium">
                      Accuracy: {user.attempts > 0 ? Math.round(((user.correct ?? 0) / user.attempts) * 100) : 0}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}

          {filteredUsers.length === 0 && (
            <div className="p-8 text-center bg-gray-50/10">
              <p className="text-xs text-gray-400 font-mono italic">No reviewee candidates match your current search query.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
