import React, { useState, useEffect } from 'react';
import { Shield, Database, Plus, Trash2, CheckCircle, Clock, Check, X, AlertCircle, RefreshCw, Landmark, HelpCircle, BookOpen, UploadCloud, FileJson } from 'lucide-react';
import { SEED_QUESTIONS } from '../data/seedQuestions';
import { UserProfile, GCashPaymentRequest } from '../types';
import { getAllGCashRequests, approveGCashRequest, rejectGCashRequest } from '../utils/gcashHelpers';
import { db } from '../firebase';
import { collection, doc, getDocs, setDoc, deleteDoc } from 'firebase/firestore';

interface AdminPanelProps {
  onRefreshSeeds: () => void;
  currentUser?: UserProfile | null;
  setCurrentUser?: React.Dispatch<React.SetStateAction<UserProfile | null>>;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onRefreshSeeds, currentUser, setCurrentUser }) => {
  const [activeSubTab, setActiveSubTab] = useState<'questions' | 'billing' | 'users' | 'announcements' | 'import'>('billing'); // Default to billing for the reviewee's convenience!
  
  // Announcements Posting States
  const [annTitle, setAnnTitle] = useState('');
  const [annTag, setAnnTag] = useState<'REGULATORY' | 'SYLLABUS' | 'ANNOUNCEMENT'>('ANNOUNCEMENT');
  const [annIcon, setAnnIcon] = useState('📢');
  const [annDesc, setAnnDesc] = useState('');
  const [annLink, setAnnLink] = useState('');
  const [customAnnouncements, setCustomAnnouncements] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('bp_custom_announcements');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const handlePostAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle.trim() || !annDesc.trim()) return;

    const newAnn = {
      id: Date.now().toString(),
      tag: annTag,
      title: annTitle.trim(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      icon: annIcon.trim() || '📢',
      desc: annDesc.trim(),
      link: annLink.trim()
    };

    const nextList = [newAnn, ...customAnnouncements];
    localStorage.setItem('bp_custom_announcements', JSON.stringify(nextList));
    setCustomAnnouncements(nextList);
    
    try {
      await setDoc(doc(db, 'custom_announcements', newAnn.id), newAnn);
    } catch (err) {
      console.warn('Failed to post announcement on Firestore:', err);
    }

    setAnnTitle('');
    setAnnDesc('');
    setAnnLink('');
    setAnnIcon('📢');
    alert('📢 Announcement successfully posted!');
  };

  const handleDeleteAnnouncement = async (id: string) => {
    if (!window.confirm('⚠️ Delete this custom announcement from the candidate board?')) return;
    const nextList = customAnnouncements.filter(item => item.id !== id);
    localStorage.setItem('bp_custom_announcements', JSON.stringify(nextList));
    setCustomAnnouncements(nextList);

    try {
      await deleteDoc(doc(db, 'custom_announcements', id));
    } catch (err) {
      console.warn('Failed to delete announcement from Firestore:', err);
    }
  };
  
  // MCQ items states
  const [list, setList] = useState(() => {
    try {
      const saved = localStorage.getItem('bp_custom_seed_questions');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [vignette, setVignette] = useState('');
  const [optA, setOptA] = useState('');
  const [optB, setOptB] = useState('');
  const [optC, setOptC] = useState('');
  const [optD, setOptD] = useState('');
  const [correct, setCorrect] = useState<0 | 1 | 2 | 3>(0);
  const [explanation, setExplanation] = useState('');
  const [category, setCategory] = useState('My Custom Admin Subject');

  // Billing requests state
  const [billingRequests, setBillingRequests] = useState<GCashPaymentRequest[]>([]);
  const [loadingBilling, setLoadingBilling] = useState(false);
  const [rejectionReasonMap, setRejectionReasonMap] = useState<Record<string, string>>({});
  const [showRejectInputId, setShowRejectInputId] = useState<string | null>(null);

  // Import states
  const [importStatus, setImportStatus] = useState<string>('');
  const [importLoading, setImportLoading] = useState(false);

  const handleImportJson = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImportLoading(true);
    setImportStatus('Reading file...');

    try {
      const text = await file.text();
      const data = JSON.parse(text);

      // We expect data to be an array of objects or an object of objects
      let profilesToImport: any[] = [];
      if (Array.isArray(data)) {
        profilesToImport = data;
      } else if (typeof data === 'object') {
        // Handle maps/collections exported like { "user1@email.com": { ... }, "user2@email.com": { ... } }
        profilesToImport = Object.values(data);
      }

      if (profilesToImport.length === 0) {
        setImportStatus('No profiles found in JSON.');
        setImportLoading(false);
        return;
      }

      setImportStatus(`Found ${profilesToImport.length} profiles. Importing...`);

      let importedCount = 0;
      for (const profile of profilesToImport) {
        if (profile.email) {
          const emailKey = profile.email.toLowerCase().trim();
          await setDoc(doc(db, 'profiles', emailKey), profile, { merge: true });
          importedCount++;
          if (importedCount % 5 === 0) {
            setImportStatus(`Importing... (${importedCount}/${profilesToImport.length})`);
          }
        }
      }

      setImportStatus(`Successfully imported ${importedCount} profiles!`);
      // Reload the local users so they appear in the UI
      loadLocalUsers();
    } catch (err: any) {
      console.error('Import error:', err);
      setImportStatus(`Error: ${err.message}`);
    } finally {
      setImportLoading(false);
      // clear the file input so it can be used again
      e.target.value = '';
    }
  };

  // User Administration states
  const [localUsers, setLocalUsers] = useState<{ email: string; tier: string; totalXp: number; streak: number }[]>([]);
  const [usersSearchQuery, setUsersSearchQuery] = useState('');
  const [adminUserViewMode, setAdminUserViewMode] = useState<'list' | 'tiers'>('list');

  // Gather registered users from localStorage & Firestore
  const loadLocalUsers = async () => {
    const gatheredMap = new Map<string, { email: string; tier: string; totalXp: number; streak: number }>();

    // Speed first: read from localStorage
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('bp_profile_')) {
        const email = key.replace('bp_profile_', '');
        try {
          const raw = localStorage.getItem(key);
          if (raw) {
            const parsed = JSON.parse(raw);
            const userEmail = (parsed.email || email).trim().toLowerCase();
            gatheredMap.set(userEmail, {
              email: parsed.email || email,
              tier: parsed.tier || 'Free',
              totalXp: parsed.totalXp ?? 0,
              streak: parsed.streak ?? 0,
            });
          }
        } catch (e) {
          console.warn('Error reading local profile', e);
        }
      }
    }

    // Merged live: query whole profiles collection from Firestore
    const cloudEmails = new Set<string>();
    try {
      const snapshot = await getDocs(collection(db, 'profiles'));
      snapshot.forEach(doc => {
        const data = doc.data();
        if (data.email) {
          const mailKey = data.email.trim().toLowerCase();
          cloudEmails.add(mailKey);
          gatheredMap.set(mailKey, {
            email: data.email,
            tier: data.tier || 'Free',
            totalXp: data.totalXp ?? 0,
            streak: data.streak ?? 0,
          });
        }
      });

      // Automatically sync any local reviewees to Firestore now that rules allow reads and writes
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('bp_profile_')) {
          const email = key.replace('bp_profile_', '').trim().toLowerCase();
          if (email && !cloudEmails.has(email)) {
            try {
              const raw = localStorage.getItem(key);
              if (raw) {
                const parsed = JSON.parse(raw);
                // Sync to Firestore
                await setDoc(doc(db, 'profiles', email), parsed);
                console.log(`Synced local candidate profile into Firestore: ${email}`);
                // Add to gatheredMap
                gatheredMap.set(email, {
                  email: parsed.email || email,
                  tier: parsed.tier || 'Free',
                  totalXp: parsed.totalXp ?? 0,
                  streak: parsed.streak ?? 0,
                });
              }
            } catch (err) {
              console.warn(`Failed to auto-sync local profile ${email} to Firestore:`, err);
            }
          }
        }
      }
    } catch (fbErr) {
      console.warn("Could not list live cloud profiles from Firestore:", fbErr);
    }

    setLocalUsers(Array.from(gatheredMap.values()));
  };

  const handleAdminResetUserData = async (email: string) => {
    if (!window.confirm(`⚠️ Are you sure you want to completely RESET all evaluation metrics and data for ${email}? This erases assessment stats, custom logs, notes, badges, and calendar heatmaps, while keeping their authentication password.`)) {
      return;
    }
    const key = `bp_profile_${email}`;
    const raw = localStorage.getItem(key);
    let currentPassword = '';
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        currentPassword = parsed.password || '';
      } catch (e) {
        // ignore
      }
    }

    const clearedProfile: UserProfile = {
      email,
      password: currentPassword, // retain login credit
      tier: '7-Day Clinical Trial',
      totalXp: 125,
      attempts: 0,
      correct: 0,
      currentCombo: 0,
      streak: 0,
      streakShields: 0,
      lastDate: new Date().toISOString().split('T')[0],
      adaptive: false,
      deck: [],
      notes: {},
      moods: {},
      habitsChecked: {},
      heat: {},
      badges: {},
      allowPushNotifications: true,
      rememberQuestionHistory: true,
      questionHistory: []
    };

    localStorage.setItem(key, JSON.stringify(clearedProfile));
    localStorage.removeItem(`bp_notes_${email}`);

    // Update in Firestore
    try {
      await setDoc(doc(db, 'profiles', email.trim().toLowerCase()), clearedProfile);
    } catch (fbErr) {
      console.warn('Could not post profile reset to Firestore:', fbErr);
    }

    alert(`✓ User data metrics successfully reset for ${email}.`);
    await loadLocalUsers();

    if (currentUser && currentUser.email === email && setCurrentUser) {
      setCurrentUser(clearedProfile);
    }
  };

  const handleAdminResetXpAndStreak = async (email: string) => {
    if (!window.confirm(`Are you sure you want to reset XP and streak for ${email} to default (125 XP, 0 Streak)?`)) {
      return;
    }
    const key = `bp_profile_${email}`;
    const raw = localStorage.getItem(key);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        parsed.totalXp = 125;
        parsed.streak = 0;
        parsed.currentCombo = 0;
        parsed.attempts = 0;
        parsed.correct = 0;
        localStorage.setItem(key, JSON.stringify(parsed));
        
        // Sync to cloud
        try {
          await setDoc(doc(db, 'profiles', email.trim().toLowerCase()), parsed);
        } catch (fbErr) {
          console.warn('Could not sync user XP reset to Firestore:', fbErr);
        }

        alert(`✓ XP index and streak counter reset successfully for ${email}.`);
        await loadLocalUsers();

        if (currentUser && currentUser.email === email && setCurrentUser) {
          setCurrentUser(parsed);
        }
      } catch (e) {
        alert('Could not update user model: parsed error.');
      }
    }
  };

  const handleAdminChangeTier = async (email: string, nextTier: UserProfile['tier']) => {
    const key = `bp_profile_${email}`;
    const raw = localStorage.getItem(key);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        parsed.tier = nextTier;
        localStorage.setItem(key, JSON.stringify(parsed));
        
        // Sync to cloud
        try {
          await setDoc(doc(db, 'profiles', email.trim().toLowerCase()), parsed);
        } catch (fbErr) {
          console.warn('Could not elevated subscription in Firestore:', fbErr);
        }

        alert(`✓ Elevated ${email} to the "${nextTier}" level.`);
        await loadLocalUsers();

        if (currentUser && currentUser.email === email && setCurrentUser) {
          setCurrentUser(parsed);
        }
      } catch (e) {
        alert('Could not update user subscription level.');
      }
    }
  };

  // Batch upgrade (to be added)
  const [batchEmails, setBatchEmails] = useState('');

  const handleBatchUpgradeClinicalSuite = async () => {
    const emails = batchEmails.split('\n').map(e => e.trim()).filter(e => e.length > 0);
    if (!window.confirm(`Upgrade ${emails.length} users to 'Clinical Suite'?`)) return;

    for (const email of emails) {
       try {
         await setDoc(doc(db, 'profiles', email.trim().toLowerCase()), { tier: 'Clinical Suite' }, { merge: true });
         console.log(`Successfully upgraded ${email}`);
       } catch (e) {
         console.error(`Failed to upgrade ${email}`, e);
       }
    }
    alert('Batch upgrade complete for processed users. Refresh the list to see changes.');
    setBatchEmails('');
    await loadLocalUsers();
  }

  // Load GCash requests
  const loadBillingRequests = async () => {
    setLoadingBilling(true);
    try {
      const gReqs = await getAllGCashRequests();
      setBillingRequests(gReqs);
    } catch (err) {
      console.warn('Could not query GCash transactions list:', err);
    } finally {
      setLoadingBilling(false);
    }
  };

  const loadAnnouncements = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'custom_announcements'));
      const fbList: any[] = [];
      snapshot.forEach(doc => {
        fbList.push(doc.data());
      });
      if (fbList.length > 0) {
        setCustomAnnouncements(fbList);
      }
    } catch (err) {
      console.warn('Could not read announcements from Firestore:', err);
    }
  };

  useEffect(() => {
    loadBillingRequests();
    loadAnnouncements();
    // Poll every 4 seconds so that testing between multiple tabs is instantaneous!
    const interval = setInterval(loadBillingRequests, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleApprove = async (id: string) => {
    if (!window.confirm('Are you sure you want to approve this premium GCash transaction? This will instantly unlock the premium suite on their reviewee profile.')) return;
    try {
      await approveGCashRequest(id);
      alert('✓ Upgrade authorized successfully! The user is now elevated to premium status.');
      await loadBillingRequests();
    } catch (err: any) {
      alert('Failed to approve transaction: ' + err.message);
    }
  };

  const handleRejectSubmit = async (id: string) => {
    const reason = rejectionReasonMap[id]?.trim() || 'Reference number not matching our GCash bank records.';
    try {
      await rejectGCashRequest(id, reason);
      alert('✗ Transaction marked as match-failed. Custom notification submitted to student.');
      setShowRejectInputId(null);
      await loadBillingRequests();
    } catch (err: any) {
      alert('Failed to reject transaction: ' + err.message);
    }
  };

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vignette.trim() || !optA.trim() || !optB.trim() || !optC.trim() || !optD.trim()) {
      alert('Please fill out all diagnostic fields.');
      return;
    }

    const payload = {
      id: `custom-q-${Date.now()}`,
      vignette: vignette.trim(),
      options: [optA.trim(), optB.trim(), optC.trim(), optD.trim()],
      correctIndex: correct,
      explanation: explanation.trim() || 'A standard board review rationalization.',
      category: category.trim(),
      source: 'dsm5' as const
    };

    const nextList = [payload, ...list];
    setList(nextList);
    localStorage.setItem('bp_custom_seed_questions', JSON.stringify(nextList));

    setVignette('');
    setOptA('');
    setOptB('');
    setOptC('');
    setOptD('');
    setCorrect(0);
    setExplanation('');

    onRefreshSeeds();
    alert('✅ High yield question logged successfully to local database context.');
  };

  const handleDelete = (id: string) => {
    const nextList = list.filter((l: any) => l.id !== id);
    setList(nextList);
    localStorage.setItem('bp_custom_seed_questions', JSON.stringify(nextList));
    onRefreshSeeds();
  };

  if (!currentUser || currentUser.email.trim().toLowerCase() !== 'studyfilesbyz@gmail.com') {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-8 rounded-3xl text-center space-y-3 max-w-lg mx-auto my-12 shadow-sm animate-in fade-in duration-200">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto animate-bounce" />
        <h4 className="font-display text-lg font-bold">PRC Administrative Panel Lockout</h4>
        <p className="text-xs text-red-600 leading-relaxed font-sans font-medium">
          Access to this management interface is strictly restricted to the authorized program administrator (<span className="font-mono text-[11px] font-bold">studyfilesbyz@gmail.com</span>). Your credentials do not match these privileges.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-teal-800 to-teal-950 rounded-2xl p-6 text-white shadow relative select-none border border-teal-700/35">
        <h2 className="font-display text-2xl text-cream flex items-center gap-2">
          <Shield className="w-6 h-6 text-cream" />
          PRC Administrative Dashboard
        </h2>
        <p className="text-xs text-teal-100/80 mt-1 max-w-xl leading-relaxed">
          Unlock candidates premium review profiles, verify standard GCash receipts, and append high-yield clinical psych MCQs for Board examination preparation.
        </p>

        {/* Dual Mode Sub Navigation menu */}
        <div className="flex gap-1 bg-teal-950/55 p-1 rounded-xl border border-teal-700/30 max-w-2xl mt-5 font-mono text-[9px] font-black uppercase tracking-wider">
          <button
            onClick={() => setActiveSubTab('billing')}
            className={`flex-1 px-2 py-2 rounded-lg transition duration-150 cursor-pointer ${
              activeSubTab === 'billing' 
                ? 'bg-cream text-teal-950 font-black shadow-xs' 
                : 'text-teal-200 hover:text-white'
            }`}
          >
            💳 GCash ({billingRequests.filter(r => r.status === 'pending').length} Pending)
          </button>
          <button
            onClick={() => setActiveSubTab('questions')}
            className={`flex-1 px-2 py-2 rounded-lg transition duration-150 cursor-pointer ${
              activeSubTab === 'questions' 
                ? 'bg-cream text-teal-950 font-black shadow-xs' 
                : 'text-teal-200 hover:text-white'
            }`}
          >
            ✏️ MCQ Curricula
          </button>
          <button
            onClick={() => {
              setActiveSubTab('users');
              loadLocalUsers();
            }}
            className={`flex-1 px-2 py-2 rounded-lg transition duration-150 cursor-pointer ${
              activeSubTab === 'users' 
                ? 'bg-cream text-teal-950 font-black shadow-xs' 
                : 'text-teal-200 hover:text-white'
            }`}
          >
            🧑‍🎓 Reviewees ({localUsers.length})
          </button>
          <button
            onClick={() => setActiveSubTab('announcements')}
            className={`flex-1 px-2 py-2 rounded-lg transition duration-150 cursor-pointer ${
              activeSubTab === 'announcements' 
                ? 'bg-cream text-teal-950 font-black shadow-xs' 
                : 'text-teal-200 hover:text-white'
            }`}
          >
            📢 Post Announcements ({customAnnouncements.length})
          </button>
          <button
            onClick={() => setActiveSubTab('import')}
            className={`flex-1 px-2 py-2 rounded-lg transition duration-150 cursor-pointer ${
              activeSubTab === 'import' 
                ? 'bg-cream text-teal-950 font-black shadow-xs' 
                : 'text-teal-200 hover:text-white'
            }`}
          >
            📥 Import Data
          </button>
        </div>
      </div>

      {activeSubTab === 'billing' && (
        <div className="bg-white border border-gray-150 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-100 pb-4 gap-3">
            <div className="space-y-1">
              <h4 className="font-heading font-black text-xs text-gray-500 uppercase tracking-widest flex items-center gap-1.5 font-mono">
                <Landmark className="w-4 h-4 text-teal-700 animate-pulse" />
                GCash Subscription Approvals
              </h4>
              <p className="text-[10px] text-gray-400 font-mono">
                Compare these 13-digit reference logs with your GCash receipt notifications for Receiver: <strong>DEDC</strong>.
              </p>
            </div>
            <button
              onClick={loadBillingRequests}
              disabled={loadingBilling}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-xl text-[10px] font-mono font-bold text-gray-600 hover:bg-gray-50 uppercase tracking-wider cursor-pointer"
            >
              <RefreshCw className={`w-3 h-3 ${loadingBilling ? 'animate-spin' : ''}`} />
              Sync requests
            </button>
          </div>

          {billingRequests.length === 0 ? (
            <div className="text-center py-10 bg-gray-50 p-6 rounded-2xl border border-dashed border-gray-200 flex flex-col items-center space-y-2">
              <HelpCircle className="w-8 h-8 text-gray-300" />
              <p className="text-xs font-bold text-gray-500 font-mono uppercase">No payment requests logged in the queue</p>
              <p className="text-[10px] text-gray-400 max-w-sm">
                Candidates must submit transactions on the <strong>Unlock Premium (Help Desk)</strong> page to register references here.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {billingRequests.map((req) => {
                const isPending = req.status === 'pending';
                const isApproved = req.status === 'approved';
                const isRejected = req.status === 'rejected';

                return (
                  <div 
                    key={req.id} 
                    className={`border rounded-2xl p-4.5 space-y-3.5 transition duration-150 ${
                      isPending ? 'border-amber-200 bg-amber-50/10' :
                      isApproved ? 'border-emerald-150 bg-emerald-50/5' :
                      'border-gray-250 bg-gray-200/10 opacity-75'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[9px] font-mono font-black uppercase text-gray-700 bg-gray-100 border border-gray-200 px-2 py-0.5 rounded">
                            {req.requestedTier}
                          </span>
                          <span className="text-[10.5px] font-black text-teal-800">{req.email}</span>
                        </div>
                        <div className="flex gap-4 font-mono text-[10px] text-gray-400 flex-wrap">
                          <span>Ref: <strong className="text-pine font-sans text-xs">{req.gcashRef}</strong></span>
                          <span>Sender: <strong>{req.gcashNumber}</strong></span>
                          <span>Timestamp: {new Date(req.timestamp).toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {isPending ? (
                          <>
                            <button
                              onClick={() => handleApprove(req.id)}
                              className="flex items-center gap-1 bg-emerald-700 hover:bg-emerald-800 text-cream font-bold text-[10px] uppercase font-mono tracking-wider px-3 py-1.5 rounded-lg border-b-2 border-emerald-900 shadow transition active:scale-95 cursor-pointer"
                            >
                              <Check className="w-3.5 h-3.5" /> Confirm Match
                            </button>
                            <button
                              onClick={() => setShowRejectInputId(showRejectInputId === req.id ? null : req.id)}
                              className="flex items-center gap-1 bg-rose-600 hover:bg-rose-700 text-cream font-bold text-[10px] uppercase font-mono tracking-wider px-3 py-1.5 rounded-lg border-b-2 border-rose-800 shadow transition active:scale-95 cursor-pointer"
                            >
                              <X className="w-3.5 h-3.5" /> Refuse Match
                            </button>
                          </>
                        ) : (
                          <span className={`inline-flex items-center gap-1 text-[10px] font-mono font-black uppercase px-2.5 py-1 rounded-full border ${
                            isApproved 
                              ? 'bg-emerald-100 text-emerald-800 border-emerald-200' 
                              : 'bg-rose-50 text-rose-800 border-rose-100'
                          }`}>
                            {isApproved ? '✓ Verified Active' : '✗ Match Refused'}
                          </span>
                        )}
                      </div>
                    </div>

                    {showRejectInputId === req.id && (
                      <div className="bg-white border border-rose-150 p-3 rounded-xl space-y-2 animate-in slide-in-from-top-1">
                        <label className="text-[9px] uppercase font-bold text-gray-400 block tracking-wider font-mono">
                          Rejection / matching failure explanation
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="e.g. Reference code unrecognized in bank account history logs."
                            value={rejectionReasonMap[req.id] || ''}
                            onChange={e => setRejectionReasonMap(prev => ({ ...prev, [req.id]: e.target.value }))}
                            className="flex-1 bg-white border border-gray-200 text-xs font-semibold py-1.5 px-3 rounded-lg outline-none"
                          />
                          <button
                            onClick={() => handleRejectSubmit(req.id)}
                            className="bg-rose-600 text-white text-[10px] uppercase font-bold px-3 py-1.5 rounded-lg border-b-2 border-rose-800 cursor-pointer hover:bg-rose-700"
                          >
                            Mark Refused
                          </button>
                        </div>
                      </div>
                    )}

                    {isRejected && req.rejectionReason && (
                      <div className="p-2.5 bg-rose-50 text-rose-800 rounded-xl border border-rose-100 flex gap-2 items-center">
                        <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                        <span className="text-[10px] font-mono leading-none">Reason: <strong>{req.rejectionReason}</strong></span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {activeSubTab === 'questions' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <form onSubmit={handleAddCustom} className="space-y-4">
              <h4 className="font-heading font-black text-xs text-gray-500 uppercase tracking-widest flex items-center gap-2 font-mono">
                <Plus className="w-4 h-4 text-teal-700" />
                Append Board MCQ Item
              </h4>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider font-mono">Clinical Vignette Description</label>
                <textarea
                  value={vignette}
                  onChange={e => setVignette(e.target.value)}
                  required
                  rows={3}
                  placeholder="Describe diagnostic context, duration, and patient parameters..."
                  className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold outline-none focus:border-teal-700 font-sans"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider font-mono">Configure Options</label>
                {[
                  { name: 'Option A (Label)', val: optA, setter: setOptA },
                  { name: 'Option B (Label)', val: optB, setter: setOptB },
                  { name: 'Option C (Label)', val: optC, setter: setOptC },
                  { name: 'Option D (Label)', val: optD, setter: setOptD },
                ].map((row, idx) => (
                  <div key={idx} className="flex gap-2">
                    <div className="w-6 h-6 rounded bg-gray-100 flex items-center justify-center text-[10px] font-mono font-bold text-gray-500 self-center">
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <input
                      type="text"
                      required
                      value={row.val}
                      onChange={e => row.setter(e.target.value)}
                      placeholder={row.name}
                      className="flex-1 bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold outline-none"
                    />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider font-mono font-mono">Correct Index</label>
                  <select
                    value={correct}
                    onChange={e => setCorrect(Number(e.target.value) as any)}
                    className="w-full bg-white border border-gray-200 text-xs font-bold py-2 px-3 rounded-lg outline-none font-mono"
                  >
                    <option value={0}>A</option>
                    <option value={1}>B</option>
                    <option value={2}>C</option>
                    <option value={3}>D</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider font-mono">Chapter / Subject</label>
                  <input
                    type="text"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full bg-white border border-gray-200 text-xs font-semibold py-2 px-3 rounded-lg outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider font-mono">Rationale Explanation</label>
                <textarea
                  value={explanation}
                  onChange={e => setExplanation(e.target.value)}
                  rows={2}
                  placeholder="Describe pathophysiology indicators and exclusion criteria..."
                  className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-medium outline-none text-gray-700 font-semibold"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-teal-800 hover:bg-teal-900 border-b-2 border-teal-950 text-cream font-bold text-xs uppercase tracking-widest rounded-xl transition cursor-pointer select-none"
              >
                Log Curricula Entry
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <h4 className="font-heading font-black text-xs text-gray-500 uppercase tracking-widest flex items-center gap-1.5 font-mono">
                <Database className="w-4 h-4 text-teal-700" />
                Logged entries ({list.length + SEED_QUESTIONS.length})
              </h4>
            </div>

            <div className="space-y-3.5 max-h-[580px] overflow-y-auto pr-1 no-scrollbar">
              {list.map((item: any) => (
                <div key={item.id} className="border border-teal-100 bg-teal-50/10 rounded-xl p-3.5 flex justify-between gap-3 relative">
                  <div className="space-y-1.5 leading-relaxed">
                    <span className="text-[8px] uppercase tracking-wider font-extrabold text-teal-800 bg-teal-50 border border-teal-100 px-2 py-0.5 rounded-full font-mono">
                      {item.category} (Custom User logged)
                    </span>
                    <p className="text-xs text-gray-800 font-semibold">{item.vignette}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1 hover:bg-rose-50 rounded text-gray-400 hover:text-rose-600 transition h-max self-center cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

              {SEED_QUESTIONS.slice(0, 10).map((item, idx) => (
                <div key={idx} className="border border-gray-100 bg-gray-50/20 rounded-xl p-3.5">
                  <div className="space-y-1.5">
                    <span className="text-[8px] uppercase tracking-wider font-extrabold text-gray-500 bg-white border border-gray-200 px-2 py-0.5 rounded-full font-mono">
                      {item.category || "Clinical Diagnosis"} (Static Seed item)
                    </span>
                    <p className="text-xs font-semibold text-gray-800 leading-normal">{item.vignette}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeSubTab === 'users' && (
        <div className="bg-white border border-gray-150 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-100 pb-4 gap-3">
            <div className="space-y-1">
              <h4 className="font-heading font-black text-xs text-gray-500 uppercase tracking-widest flex items-center gap-1.5 font-mono">
                <Shield className="w-4 h-4 text-teal-700 animate-pulse" />
                Student Reviewees Manager
              </h4>
              <p className="text-[10px] text-gray-400 font-mono">
                Administer diagnostic records, reset streak indicators, and override tier levels for active local student profiles.
              </p>
            </div>
            <button
              onClick={loadLocalUsers}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-xl text-[10px] font-mono font-bold text-gray-600 hover:bg-gray-50 uppercase tracking-wider cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              Reload Accounts List
            </button>
          </div>

          {/* Controls: Search and View Mode */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="w-full md:max-w-md">
              <input
                type="text"
                placeholder="🔍 Search student email address..."
                value={usersSearchQuery}
                onChange={e => setUsersSearchQuery(e.target.value)}
                className="w-full bg-white border border-gray-200 text-xs font-semibold py-2 px-3 rounded-lg outline-none focus:border-teal-700"
              />
              <div className="mt-4 bg-gray-50 border border-gray-200 p-4 rounded-xl space-y-2">
                <label className="text-[9px] uppercase font-bold text-gray-500 tracking-wider">Batch Upgrade to Clinical Suite</label>
                <textarea
                  value={batchEmails}
                  onChange={e => setBatchEmails(e.target.value)}
                  placeholder="Paste student emails (one per line)..."
                  className="w-full bg-white border border-gray-200 rounded-lg p-2 text-xs font-sans outline-none"
                  rows={3}
                />
                <button
                  onClick={handleBatchUpgradeClinicalSuite}
                  className="w-full bg-teal-800 text-white text-[10px] font-bold uppercase tracking-widest py-2 rounded-lg cursor-pointer"
                >
                  Process Batch Upgrade
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-xl font-mono">
              <span className="text-[9px] uppercase font-bold text-gray-500 tracking-wider">Layout:</span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setAdminUserViewMode('list')}
                  className={`px-3 py-1 rounded-lg text-[9px] uppercase tracking-wider transition ${
                    adminUserViewMode === 'list'
                      ? 'bg-teal-700 text-white shadow-xs cursor-default font-black'
                      : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-150 cursor-pointer font-bold'
                  }`}
                >
                  📋 List ({localUsers.filter(u => !usersSearchQuery || u.email.toLowerCase().includes(usersSearchQuery.toLowerCase())).length})
                </button>
                <button
                  type="button"
                  onClick={() => setAdminUserViewMode('tiers')}
                  className={`px-3 py-1 rounded-lg text-[9px] uppercase tracking-wider transition ${
                    adminUserViewMode === 'tiers'
                      ? 'bg-teal-700 text-white shadow-xs cursor-default font-black'
                      : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-150 cursor-pointer font-bold'
                  }`}
                >
                  🗂️ View in Tiers
                </button>
              </div>
            </div>
          </div>

          {localUsers.length === 0 ? (
            <div className="text-center py-10 bg-gray-50 p-6 rounded-2xl border border-dashed border-gray-200 flex flex-col items-center space-y-2">
              <HelpCircle className="w-8 h-8 text-gray-300" />
              <p className="text-xs font-bold text-gray-500 font-mono uppercase">No local student accounts detected</p>
              <p className="text-[10px] text-gray-400 max-w-sm">
                Profiles are created once students register or bypass sign-in credentials.
              </p>
            </div>
          ) : adminUserViewMode === 'tiers' ? (
            <div className="space-y-6">
              {['Free', '7-Day Clinical Trial', 'Pro Suite', 'Clinical Suite'].map(tierName => {
                const tierUsers = localUsers
                  .filter(u => {
                    const ut = u.tier || 'Free';
                    return ut.toLowerCase() === tierName.toLowerCase();
                  })
                  .filter(u => !usersSearchQuery || u.email.toLowerCase().includes(usersSearchQuery.toLowerCase()));

                return (
                  <div key={tierName} className="border border-gray-150 rounded-2xl overflow-hidden bg-white shadow-xs">
                    <div className="bg-gray-50 border-b border-gray-150 px-4 py-2.5 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${
                          tierName.toLowerCase().includes('clinical') ? 'bg-rose-500 animate-pulse' :
                          tierName.toLowerCase().includes('pro') ? 'bg-amber-500' : 'bg-teal-600'
                        }`} />
                        <h5 className="text-[11px] font-black uppercase tracking-wider text-teal-950 font-mono">
                          {tierName} ({tierUsers.length})
                        </h5>
                      </div>
                      <span className="text-[8px] font-mono font-bold bg-white border border-gray-200 text-gray-500 px-2 py-0.5 rounded-full uppercase tracking-wider font-sans">
                        Review Level
                      </span>
                    </div>
                    <div className="p-4 space-y-3">
                      {tierUsers.length === 0 ? (
                        <p className="text-[10px] text-gray-400 font-mono italic p-2 bg-gray-50 rounded-xl">No active reviewees found in this tier</p>
                      ) : (
                        <div className="grid grid-cols-1 gap-3">
                          {tierUsers.map((user) => {
                            const isCurrent = currentUser?.email === user.email;

                            return (
                              <div 
                                key={user.email} 
                                className={`border rounded-xl p-3.5 space-y-3.5 transition duration-150 ${
                                  isCurrent ? 'border-teal-500 bg-teal-5/10' : 'border-gray-200 bg-gray-50/10'
                                }`}
                              >
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <span className="text-[11px] font-black text-gray-900">{user.email}</span>
                                      {isCurrent && (
                                        <span className="bg-teal-700 text-white font-mono text-[8.5px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                                          Current You
                                        </span>
                                      )}
                                    </div>
                                    
                                    {/* Meta display */}
                                    <div className="flex gap-4 font-mono text-[9px] text-gray-500 uppercase tracking-wider flex-wrap">
                                      <span>Tier: <strong className="text-pine font-sans font-bold text-[11px]">{user.tier}</strong></span>
                                      <span>Score XP: <strong className="text-emerald-700 font-sans">{user.totalXp}</strong></span>
                                      <span>Streak: <strong className="text-orange-600 font-sans">{user.streak} days</strong></span>
                                    </div>
                                  </div>

                                  {/* Administrative controls buttons and dropdown */}
                                  <div className="flex flex-wrap items-center gap-2.5">
                                    {/* Upgrade tier selector */}
                                    <div className="flex items-center gap-1.5 bg-white border border-gray-200 px-2 py-1.5 rounded-xl">
                                      <span className="text-[8.5px] uppercase font-black text-gray-400 tracking-wider font-mono">Tier:</span>
                                      <select
                                        value={user.tier}
                                        onChange={(e) => handleAdminChangeTier(user.email, e.target.value as any)}
                                        className="text-[10px] font-bold text-teal-950 font-mono outline-none border-none bg-transparent"
                                      >
                                        <option value="Free">Free</option>
                                        <option value="7-Day Clinical Trial">7-Day Clinical Trial</option>
                                        <option value="Pro Suite">Pro Suite</option>
                                        <option value="Clinical Suite">Clinical Suite</option>
                                      </select>
                                    </div>

                                    {/* Reset XP & Streak */}
                                    <button
                                      onClick={() => handleAdminResetXpAndStreak(user.email)}
                                      className="flex items-center gap-1 bg-amber-500 hover:bg-amber-600 text-white font-mono font-bold text-[9px] uppercase tracking-wider px-3 py-2 rounded-xl transition duration-150 cursor-pointer shadow-xs active:scale-95 font-sans"
                                    >
                                      ⚡ Reset XP & Streak
                                    </button>

                                    {/* Reset All Data */}
                                    <button
                                      onClick={() => handleAdminResetUserData(user.email)}
                                      className="flex items-center gap-1 bg-rose-600 hover:bg-rose-700 text-white font-mono font-bold text-[9px] uppercase tracking-wider px-3 py-2 rounded-xl transition duration-150 cursor-pointer shadow-xs active:scale-95 font-sans"
                                    >
                                      🗑️ Reset All Data
                                    </button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="space-y-4">
              {localUsers
                .filter(u => !usersSearchQuery || u.email.toLowerCase().includes(usersSearchQuery.toLowerCase()))
                .map((user) => {
                  const isCurrent = currentUser?.email === user.email;

                  return (
                    <div 
                      key={user.email} 
                      className={`border rounded-2xl p-4 space-y-3.5 transition duration-150 ${
                        isCurrent ? 'border-teal-500 bg-teal-50/10' : 'border-gray-200 bg-gray-50/10'
                      }`}
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[11px] font-black text-gray-900">{user.email}</span>
                            {isCurrent && (
                              <span className="bg-teal-700 text-white font-mono text-[8.5px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                                Current You
                              </span>
                            )}
                          </div>
                          
                          {/* Meta display */}
                          <div className="flex gap-4 font-mono text-[9px] text-gray-500 uppercase tracking-wider flex-wrap">
                            <span>Tier: <strong className="text-pine font-sans font-bold text-[11px]">{user.tier}</strong></span>
                            <span>Score XP: <strong className="text-emerald-700 font-sans">{user.totalXp}</strong></span>
                            <span>Streak: <strong className="text-orange-600 font-sans">{user.streak} days</strong></span>
                          </div>
                        </div>

                        {/* Administrative controls buttons and dropdown */}
                        <div className="flex flex-wrap items-center gap-2.5">
                          {/* Upgrade tier selector */}
                          <div className="flex items-center gap-1.5 bg-white border border-gray-200 px-2 py-1.5 rounded-xl">
                            <span className="text-[8.5px] uppercase font-black text-gray-400 tracking-wider font-mono">Tier:</span>
                            <select
                              value={user.tier}
                              onChange={(e) => handleAdminChangeTier(user.email, e.target.value as any)}
                              className="text-[10px] font-bold text-teal-950 font-mono outline-none border-none bg-transparent"
                            >
                              <option value="Free">Free</option>
                              <option value="7-Day Clinical Trial">7-Day Clinical Trial</option>
                              <option value="Pro Suite">Pro Suite</option>
                              <option value="Clinical Suite">Clinical Suite</option>
                            </select>
                          </div>

                          {/* Reset XP & Streak */}
                          <button
                            onClick={() => handleAdminResetXpAndStreak(user.email)}
                            className="flex items-center gap-1 bg-amber-500 hover:bg-amber-600 text-white font-mono font-bold text-[9px] uppercase tracking-wider px-3 py-2 rounded-xl transition duration-150 cursor-pointer shadow-xs active:scale-95"
                          >
                            ⚡ Reset XP & Streak
                          </button>

                          {/* Reset All Data */}
                          <button
                            onClick={() => handleAdminResetUserData(user.email)}
                            className="flex items-center gap-1 bg-rose-600 hover:bg-rose-700 text-white font-mono font-bold text-[9px] uppercase tracking-wider px-3 py-2 rounded-xl transition duration-150 cursor-pointer shadow-xs active:scale-95"
                          >
                            🗑️ Reset All Data
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      )}

      {activeSubTab === 'announcements' && (
        <div className="bg-white border border-gray-150 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="border-b border-gray-100 pb-4">
            <h4 className="font-heading font-black text-xs text-gray-500 uppercase tracking-widest flex items-center gap-1.5 font-mono">
              📢 Post Custom Announcements
            </h4>
            <p className="text-[10px] text-gray-400 font-mono mt-1">
              Add news flashes, syllabus updates, regulation logs, or challenge summaries to the student Dashboard announcements view.
            </p>
          </div>

          <form onSubmit={handlePostAnnouncement} className="grid grid-cols-1 md:grid-cols-12 gap-5 font-sans">
            <div className="md:col-span-8 space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider font-mono">Announcement Header Title</label>
                <input
                  type="text"
                  required
                  value={annTitle}
                  onChange={e => setAnnTitle(e.target.value)}
                  placeholder="e.g. PRC Psychometrician Syllabus adjustments on IO Psych"
                  className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold outline-none focus:border-teal-700"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider font-mono">Announcement Description Details</label>
                <textarea
                  required
                  rows={4}
                  value={annDesc}
                  onChange={e => setAnnDesc(e.target.value)}
                  placeholder="Insert the rich details of the announcement. Inform reviewees about changes, challenges, or board regulations specifically."
                  className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold outline-none focus:border-teal-700 font-mono"
                />
              </div>
            </div>

            <div className="md:col-span-4 space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider font-mono">Topic Category Tag</label>
                <select
                  value={annTag}
                  onChange={e => setAnnTag(e.target.value as any)}
                  className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold outline-none font-mono"
                >
                  <option value="ANNOUNCEMENT">📢 Announcement</option>
                  <option value="REGULATORY">⚖️ Regulatory / PRC</option>
                  <option value="SYLLABUS">📋 Syllabus Update</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider font-mono">Emoji Icon</label>
                  <input
                    type="text"
                    required
                    value={annIcon}
                    onChange={e => setAnnIcon(e.target.value)}
                    placeholder="e.g. 📢"
                    className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold outline-none text-center focus:border-teal-700"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider font-mono">External URL Link</label>
                  <input
                    type="text"
                    value={annLink}
                    onChange={e => setAnnLink(e.target.value)}
                    placeholder="Optional details URL"
                    className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold outline-none focus:border-teal-700 font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-teal-800 hover:bg-teal-900 text-white font-mono font-bold text-[9px] uppercase tracking-widest rounded-xl shadow-md border-b-2 border-teal-950 transition duration-150 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                Post Announcement
              </button>
            </div>
          </form>

          {/* List of Custom Posted Announcements */}
          <div className="border-t border-gray-100 pt-5 space-y-4 select-none">
            <h5 className="text-[9.5px] uppercase font-black text-gray-400 tracking-widest font-mono">Currently Posted Custom Announcements ({customAnnouncements.length})</h5>
            {customAnnouncements.length === 0 ? (
              <p className="text-xs text-gray-400 font-mono italic">No custom announcements have been posted yet. Run the form above to post live items.</p>
            ) : (
              <div className="space-y-3">
                {customAnnouncements.map((item) => (
                  <div key={item.id} className="border border-gray-150 rounded-xl p-3 bg-gray-50/40 flex justify-between items-start gap-4">
                    <div className="flex gap-3 items-start">
                      <div className="text-xl bg-white p-2 rounded-lg border border-gray-100 shadow-xs">{item.icon}</div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[8.5px] font-mono tracking-wider font-black uppercase text-teal-800 bg-teal-50 border border-teal-200/50 px-2 py-0.5 rounded">
                            {item.tag}
                          </span>
                          <span className="text-[9.5px] text-gray-400 font-mono">{item.date}</span>
                        </div>
                        <h6 className="text-[11px] font-bold text-gray-800 mt-1">{item.title}</h6>
                        <p className="text-[10px] text-gray-500 font-mono mt-1 whitespace-pre-line">{item.desc}</p>
                        {item.link && (
                          <a href={item.link} target="_blank" rel="noreferrer" className="text-[9px] text-teal-700 hover:underline block mt-1 font-mono">
                            🔗 Details Link: {item.link}
                          </a>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteAnnouncement(item.id)}
                      className="p-1.5 text-gray-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition cursor-pointer"
                      title="Remove Announcement"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      {activeSubTab === 'import' && (
        <div className="bg-white border border-gray-150 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex flex-col border-b border-gray-100 pb-4 gap-3">
            <h4 className="font-heading font-black text-xs text-gray-500 uppercase tracking-widest flex items-center gap-1.5 font-mono">
              <Database className="w-4 h-4 text-teal-700" />
              Import Data (JSON)
            </h4>
            <p className="text-[10px] text-gray-400 font-mono">
              Upload a JSON file containing user profiles to migrate the data directly into your current Firebase environment. This bypasses the need to have Google Cloud Platform export permissions since it reads raw JSON map outputs.
            </p>
          </div>

          <div className="bg-gray-50 border border-dashed border-gray-300 rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm relative group cursor-pointer hover:border-teal-400 transition-colors">
              <UploadCloud className="w-8 h-8 text-teal-600 group-hover:scale-110 transition-transform" />
              <input
                type="file"
                accept=".json"
                onChange={handleImportJson}
                disabled={importLoading}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                title="Select JSON File to Import"
              />
            </div>
            
            <div className="space-y-1">
              <h5 className="text-xs font-bold text-gray-700 font-sans">
                {importLoading ? 'Importing Data...' : 'Click or drop a JSON file here'}
              </h5>
              <p className="text-[10px] text-gray-400 font-mono">
                Supports arrays of profiles or object-mapped collections
              </p>
            </div>

            {importStatus && (
              <div className={`mt-4 px-4 py-2 rounded-xl text-[10px] font-mono font-bold border ${
                importStatus.includes('Error') || importStatus.includes('No profiles')
                  ? 'bg-rose-50 border-rose-200 text-rose-700'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-700'
              }`}>
                {importStatus}
              </div>
            )}
          </div>
          
          <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 flex gap-3 text-blue-800">
             <FileJson className="w-5 h-5 opacity-70 shrink-0" />
             <div className="text-[10px] leading-relaxed font-mono">
               <strong>Expected format:</strong> Expected to be a JSON array of profile objects (where each profile contains an <code className="bg-white/60 px-1 rounded">email</code> field), OR a dictionary map where values are profile objects. Existing user structures will be intelligently merged automatically to preserve state.
             </div>
          </div>
        </div>
      )}
    </div>
  );
};
