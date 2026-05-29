import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Award, CheckSquare, Layers, LineChart, Calendar, 
  Megaphone, Calculator, MessageSquare, Shield, HelpCircle, User,
  Sparkles, CheckCircle2, ChevronRight, Menu, X, ShieldAlert, Key, Users,
  Clipboard, Clock, Gift, Brain, Briefcase, Scale, Heart, Trash2
} from 'lucide-react';
import { UserProfile, Question } from './types';

// Importing Custom Panels & RPG components
import { Header } from './components/Header';
import { RpgBar } from './components/RpgBar';
import { StudentHubCard } from './components/StudentHubCard';
import { LibraryPanel } from './components/LibraryPanel';
import { PracticePanel } from './components/PracticePanel';
import { MockExamPanel } from './components/MockExamPanel';
import { SpacedRepPanel } from './components/SpacedRepPanel';
import { AnalyticsPanel } from './components/AnalyticsPanel';
import { StudyPlannerPanel } from './components/StudyPlannerPanel';
import { BillingPanel } from './components/BillingPanel';
import { FeedbackPanel } from './components/FeedbackPanel';
import { AdminPanel } from './components/AdminPanel';
import { LeaderboardPanel } from './components/LeaderboardPanel';
import { WeightedCalculatorPanel } from './components/WeightedCalculatorPanel';
import { AnnouncementsPanel } from './components/AnnouncementsPanel';
import { ProfilePanel } from './components/ProfilePanel';
import { GroupStudyPanel } from './components/GroupStudyPanel';
import { FlashcardDecksPanel } from './components/FlashcardDecksPanel';
import { DailyBoardChallenge } from './components/DailyBoardChallenge';
import { TosTrackerPanel } from './components/TosTrackerPanel';
import { FocusShieldPanel } from './components/FocusShieldPanel';
import { ReferralsPanel } from './components/ReferralsPanel';
import { StudyPetWidget } from './components/StudyPetWidget';
import { DevConceptsPanel } from './components/DevConceptsPanel';
import { IoConceptsPanel } from './components/IoConceptsPanel';
import { Dsm5DisordersPanel } from './components/Dsm5DisordersPanel';
import { PsychometricConceptsPanel } from './components/PsychometricConceptsPanel';
import { LifeStagesPanel } from './components/LifeStagesPanel';

import { getRandomLocalQuestion } from './utils/questionGenerator';
import { SEED_QUESTIONS } from './data/seedQuestions';
import { db } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const THEME_OPTIONS = [
  { id: 'strawberry-matcha', name: 'Strawberry Matcha', emoji: '🍓🍵', bg: 'bg-[#1B3518]', accent: 'bg-[#E5526C]' },
  { id: 'lilac-dream', name: 'Lilac Dream', emoji: '💜🦄', bg: 'bg-[#261B4E]', accent: 'bg-[#9C85E5]' },
  { id: 'winter', name: 'Winter Frost', emoji: '❄️☃️', bg: 'bg-[#0F2038]', accent: 'bg-[#50A3EF]' },
  { id: 'pastel-pink-coquette', name: 'Pastel Coquette', emoji: '🎀🩰', bg: 'bg-[#401B22]', accent: 'bg-[#EC9FA5]' },
  { id: 'red-blush', name: 'Red Blush', emoji: '🌹💄', bg: 'bg-[#470D14]', accent: 'bg-[#F43F5E]' }
];

const DEFAULT_PROFILE = (email: string): UserProfile => ({
  email,
  tier: '7-Day Clinical Trial',
  theme: 'strawberry-matcha',
  totalXp: 0,
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
});

const ADMIN_EMAIL = 'studyfilesbyz@gmail.com';

const isTabAllowed = (tabId: string, userTier: string, email?: string): boolean => {
  const tier = (userTier || 'Free').toLowerCase();
  const userEmail = (email || '').trim().toLowerCase();

  // ONLY make the admin panel available to the authorized admin email
  if (tabId === 'admin') {
    return userEmail === ADMIN_EMAIL;
  }
  
  if (['home', 'feedback', 'settings', 'bulletin', 'referrals'].includes(tabId)) {
    return true;
  }

  // Make the study planner, dsm5Disorders context, Group Study Arena, and TOS tracker suite fully available to all tiers
  if (['planner', 'tos', 'dsm5Disorders', 'groupstudy', 'flashcards'].includes(tabId)) {
    return true;
  }

  if (tier === 'free' || tier.includes('trial')) {
    return ['practice', 'repetition', 'library', 'devConcepts', 'ioConcepts', 'psychometrics', 'lifeStages'].includes(tabId);
  }

  if (tier.includes('pro')) {
    return !['mock'].includes(tabId);
  }

  return true;
};

export default function App() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const syncTimeoutRef = React.useRef<any>(null);
  const [syncStatus, setSyncStatus] = useState<'syncing' | 'synced'>('synced');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authConfirmPassword, setAuthConfirmPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [cacheStatus, setCacheStatus] = useState('');
  const [isClearingCache, setIsClearingCache] = useState(false);
  
  // Sidebar states
  const [activeTab, setActiveTab2] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [feedbackSubTab, setFeedbackSubTab] = useState<'premium' | 'help'>('premium');

  const handleNavigate = (tabId: string) => {
    if (tabId === 'billingTab') {
      setFeedbackSubTab('premium');
      setActiveTab2('feedback');
    } else {
      setActiveTab2(tabId);
    }
  };

  // Active question state
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [loadingQuestion, setLoadingQuestion] = useState(false);
  const [selectedModel, setSelectedModel] = useState<'budget' | 'standard' | 'premium' | 'testbank'>('standard');
  const [urlRoomId, setUrlRoomId] = useState<string | null>(null);

  // Forgot Password recovery states
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [recoveryNewPassword, setRecoveryNewPassword] = useState('');
  const [recoveryError, setRecoveryError] = useState('');
  const [sendingOtp, setSendingOtp] = useState(false);
  const [otpMockResponse, setOtpMockResponse] = useState<string | null>(null);

  // Auto detect url room code on startup
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const roomParam = params.get('room');
    if (roomParam) {
      setUrlRoomId(roomParam);
      setActiveTab2('groupstudy');
    }
    const flashcardParam = params.get('flashcardRoom');
    if (flashcardParam) {
      localStorage.setItem('bp_flashcard_join_room_id', flashcardParam);
      setActiveTab2('flashcards');
    }
  }, []);

  // Securely enforce access rules for restricted features based on current tier
  useEffect(() => {
    if (profile && !isTabAllowed(activeTab, profile.tier, profile.email)) {
      setActiveTab2('home');
    }
  }, [profile?.tier, activeTab, profile?.email]);

  // Load profile upon startup on this client
  useEffect(() => {
    import('./firebase').then(m => m.initializeFirebase());
    const initializeProfile = async () => {
      try {
        const lastEmail = localStorage.getItem('bp_last_logged_email');
        if (lastEmail) {
          const emailKey = lastEmail.trim().toLowerCase();
          
          // Speed rendering: load local copy first
          let loadedProfile: UserProfile | null = null;
          const saved = localStorage.getItem(`bp_profile_${emailKey}`);
          if (saved) {
            const parsed = JSON.parse(saved);
            let notesObj = {};
            try {
              const savedNotes = localStorage.getItem(`bp_notes_${emailKey}`);
              notesObj = savedNotes ? JSON.parse(savedNotes) : parsed.notes || {};
            } catch {
              notesObj = parsed.notes || {};
            }
            loadedProfile = { ...parsed, notes: notesObj };
            setProfile(loadedProfile);
          } else {
            loadedProfile = DEFAULT_PROFILE(emailKey);
            setProfile(loadedProfile);
          }

          // Then, fetch live copy from Firestore
          try {
            const docRef = doc(db, 'profiles', emailKey);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              const fbProfile = docSnap.data() as UserProfile;
              setProfile(fbProfile);
              localStorage.setItem(`bp_profile_${emailKey}`, JSON.stringify(fbProfile));
              if (fbProfile.notes) {
                localStorage.setItem(`bp_notes_${emailKey}`, JSON.stringify(fbProfile.notes));
              }
            } else if (loadedProfile) {
              await setDoc(docRef, loadedProfile);
            }
          } catch (fbErr) {
            console.warn("Could not sync live profile from Firestore on mount:", fbErr);
          }
        }
      } catch (e) {
        console.warn("Could not read local review profile:", e);
      }
    };
    initializeProfile();
  }, []);

  // Sync active theme with HTML Root
  useEffect(() => {
    const activeTheme = profile?.theme || 'strawberry-matcha';
    document.documentElement.setAttribute('data-theme', activeTheme);
  }, [profile?.theme]);

  // Set Profile and Sync with debounced background writing to prevent Firebase quota exhaustion
  const updateProfileAndSave = (nextVal: React.SetStateAction<UserProfile | null>) => {
    setProfile(prev => {
      const next = typeof nextVal === 'function' ? nextVal(prev) : nextVal;
      if (next) {
        localStorage.setItem(`bp_profile_${next.email}`, JSON.stringify(next));
        localStorage.setItem('bp_last_logged_email', next.email);
        
        // Cancel previous sync timer
        if (syncTimeoutRef.current) {
          clearTimeout(syncTimeoutRef.current);
        }
        
        setSyncStatus('syncing');
        // Schedule a consolidated sync in 6 seconds
        syncTimeoutRef.current = setTimeout(() => {
          const syncEmail = next.email.trim().toLowerCase();
          setDoc(doc(db, 'profiles', syncEmail), next)
            .then(() => {
              setSyncStatus('synced');
            })
            .catch(err => {
              console.warn('Failed to sync profile to Firestore in background after debounce:', err);
              setSyncStatus('synced');
            });
        }, 6000);
      }
      return next;
    });
  };

  const handleManualCloudSync = async () => {
    if (!profile) return;
    setSyncStatus('syncing');
    try {
      const syncEmail = profile.email.trim().toLowerCase();
      const docRef = doc(db, 'profiles', syncEmail);
      await setDoc(docRef, profile);
      await new Promise(resolve => setTimeout(resolve, 650));
      setSyncStatus('synced');
      alert("✅ Review session data safely backed up to Google Cloud Firestore. Your progress, flashcards, and notes are now synchronized across all your devices!");
    } catch (err) {
      console.warn("Manual cloud sync failed:", err);
      setSyncStatus('synced');
    }
  };

  const CACHE_KEYS_TO_CLEAR = [
    'bp_custom_announcements',
    'bp_announcements_last_sync',
    'bp_custom_seed_questions',
    'bp_leaderboard_cloud_cache',
    'bp_leaderboard_last_sync',
    'bp_feedbacks',
    'bp_uploaded_files',
    'bp_push_subscribed',
    'bp_push_dismissed',
    'bp_firestore_connected'
  ];

  const handleClearCache = async () => {
    if (typeof window === 'undefined') return;

    const confirmed = window.confirm(
      'Clear cached app data and reload the page? This refreshes offline assets and removes transient cached content while keeping your saved profile.'
    );

    if (!confirmed) return;

    setIsClearingCache(true);
    setCacheStatus('Clearing cached data...');

    try {
      for (const key of CACHE_KEYS_TO_CLEAR) {
        localStorage.removeItem(key);
        sessionStorage.removeItem(key);
      }

      if ('caches' in window) {
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map((cacheName) => caches.delete(cacheName)));
      }

      setCacheStatus('Cache cleared. Reloading now...');
      window.setTimeout(() => window.location.reload(), 300);
    } catch (error) {
      console.warn('Failed to clear app cache:', error);
      setCacheStatus('Could not clear cache. Please try again.');
      setIsClearingCache(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    if (!authEmail.trim() || !authEmail.includes('@')) {
      setAuthError('Please enter a valid candidate email address.');
      return;
    }
    if (!authPassword) {
      setAuthError('Password is required.');
      return;
    }

    const emailKey = authEmail.trim().toLowerCase();
    
    let loadedProfile: UserProfile | null = null;
    const localSaved = localStorage.getItem(`bp_profile_${emailKey}`);
    if (localSaved) {
      try {
        loadedProfile = JSON.parse(localSaved);
      } catch (err) {
        console.warn("Local profile failed to parse", err);
      }
    }

    // Always attempt live Firebase lookup to ensure secure validation matches cloud state
    try {
      const docRef = doc(db, 'profiles', emailKey);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        loadedProfile = docSnap.data() as UserProfile;
      }
    } catch (fbErr) {
      console.warn("Could not fetch remote profile during authentication check:", fbErr);
    }

    if (!loadedProfile) {
      setAuthError("No account found with this email. Please register by clicking the 'Sign Up' option below.");
      return;
    }

    // Verify Password match
    if (loadedProfile.password && loadedProfile.password !== authPassword) {
      setAuthError("Incorrect password. Please try again or use standard OTP recovery options below.");
      return;
    }

    // Successful authentications
    setProfile(loadedProfile);
    localStorage.setItem(`bp_profile_${emailKey}`, JSON.stringify(loadedProfile));
    localStorage.setItem('bp_last_logged_email', emailKey);
    if (loadedProfile.notes) {
      localStorage.setItem(`bp_notes_${emailKey}`, JSON.stringify(loadedProfile.notes));
    }
    setActiveTab2('home');
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    if (!authEmail.trim() || !authEmail.includes('@')) {
      setAuthError('Please enter a valid candidate email address.');
      return;
    }
    if (!authPassword || authPassword.length < 4) {
      setAuthError('Password must be at least 4 characters long.');
      return;
    }
    if (authPassword !== authConfirmPassword) {
      setAuthError('Passwords do not match. Please re-enter them.');
      return;
    }

    const emailKey = authEmail.trim().toLowerCase();

    // Check if account already exists
    let exists = false;
    try {
      const docRef = doc(db, 'profiles', emailKey);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        exists = true;
      }
    } catch {
      if (localStorage.getItem(`bp_profile_${emailKey}`)) {
        exists = true;
      }
    }

    if (exists) {
      setAuthError("An account with this email address already exists. Please Sign In instead.");
      return;
    }

    // Build default profile
    const newProfile = DEFAULT_PROFILE(emailKey);
    newProfile.password = authPassword;
    newProfile.signUpDate = new Date().toISOString();

    try {
      const docRef = doc(db, 'profiles', emailKey);
      await setDoc(docRef, newProfile);
    } catch (err) {
      console.warn("Failed syncing new profile to storage, using local persistence:", err);
    }

    // Set signed up session
    setProfile(newProfile);
    localStorage.setItem(`bp_profile_${emailKey}`, JSON.stringify(newProfile));
    localStorage.setItem('bp_last_logged_email', emailKey);
    alert("🎉 Candidate Account Registered Successfully! Welcome to BoardPassPH.");
    setActiveTab2('home');
  };

  const handleSendRecoveryOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const targetEmail = recoveryEmail.trim();
    if (!targetEmail || !targetEmail.includes('@')) {
      setRecoveryError('Please enter a valid candidate email address.');
      return;
    }
    
    setRecoveryError('');

    // Generate a secure 6-digit verification code locally and display it immediately
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    setOtpSent(true);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredOtp.trim() === generatedOtp) {
      setOtpVerified(true);
      setRecoveryError('');
    } else {
      setRecoveryError('Incorrect verification passcode. Please try again.');
    }
  };

  const handleCompleteReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (recoveryNewPassword.length < 4) {
      setRecoveryError('Password must be at least 4 characters.');
      return;
    }

    const emailCor = recoveryEmail.trim().toLowerCase();
    const saved = localStorage.getItem(`bp_profile_${emailCor}`);
    let profObj = saved ? JSON.parse(saved) : DEFAULT_PROFILE(emailCor);
    profObj.password = recoveryNewPassword;
    
    localStorage.setItem(`bp_profile_${emailCor}`, JSON.stringify(profObj));
    
    alert(`👍 Password reset successful for ${emailCor}! You can now log in with your updated credentials.`);
    
    // Clear recovery states and navigate back to sign in
    setAuthEmail(recoveryEmail);
    setAuthPassword(recoveryNewPassword); // Auto fill to be super user-friendly!
    setIsForgotPassword(false);
    setOtpSent(false);
    setOtpVerified(false);
    setRecoveryEmail('');
    setRecoveryNewPassword('');
    setEnteredOtp('');
    setRecoveryError('');
  };

  const handleSignOut = () => {
    if (syncTimeoutRef.current) {
      clearTimeout(syncTimeoutRef.current);
    }
    setProfile(null);
    localStorage.removeItem('bp_last_logged_email');
    setCurrentQuestion(null);
  };

  const handleResetData = () => {
    if (profile) {
      const clean = DEFAULT_PROFILE(profile.email);
      updateProfileAndSave(clean);
      localStorage.removeItem(`bp_notes_${profile.email}`);
      localStorage.removeItem('bp_uploaded_files');
      setCurrentQuestion(null);
      alert('Local evaluation indexes and XP matrices cleared successfully.');
    }
  };

  // Main fetch question routine (Gemini / Local MCQ)
  const handleFetchQuestion = async (
    focusArea: string,
    source: 'dsm5' | 'pharma' | 'assessment' | 'dev' | 'io' | 'local_test',
    difficulty: 'easy' | 'medium' | 'hard' | 'random',
    fileData?: string,
    fileMimeType?: string
  ) => {
    setLoadingQuestion(true);
    setCurrentQuestion(null);

    const history = profile?.questionHistory || [];

    // If selectedModel is 'testbank', retrieve a curated standard question from SEED_QUESTIONS
    if (selectedModel === 'testbank') {
      setTimeout(() => {
        const targetSource = source === 'local_test' ? undefined : source;
        let pool = SEED_QUESTIONS;
        if (targetSource) {
          pool = pool.filter(q => q.source === targetSource);
        }
        
        if (difficulty && difficulty !== 'random') {
          const diffMatch = pool.filter(q => q.difficulty === difficulty);
          if (diffMatch.length > 0) pool = diffMatch;
        }
        
        const unseen = pool.filter(q => {
          const normQ = q.vignette.replace(/[^a-zA-Z0-9]/g, '').toLowerCase().substring(0, 80);
          if (!normQ) return false;
          return !history.some((h: any) => {
            if (typeof h !== 'string') return false;
            try {
              let hVig = h;
              if (h.trim().startsWith('{')) {
                const parsed = JSON.parse(h);
                if (q.topic && parsed.topic && q.topic.toLowerCase().trim() === parsed.topic.toLowerCase().trim()) {
                  return true;
                }
                hVig = parsed.vignette || '';
              }
              const normH = hVig.replace(/[^a-zA-Z0-9]/g, '').toLowerCase().substring(0, 80);
              return normH.includes(normQ) || normQ.includes(normH);
            } catch {
              const normH = h.replace(/[^a-zA-Z0-9]/g, '').toLowerCase().substring(0, 80);
              return normH.includes(normQ) || normQ.includes(normH);
            }
          });
        });
        
        const finalPool = unseen.length > 0 ? unseen : pool;
        const randomQ = finalPool[Math.floor(Math.random() * finalPool.length)] || SEED_QUESTIONS[Math.floor(Math.random() * SEED_QUESTIONS.length)];
        setCurrentQuestion(randomQ);
        setLoadingQuestion(false);
      }, 500);
      return;
    }

    // If source is local_test or offline fallbacks are requested
    if (source === 'local_test') {
      setTimeout(() => {
        const q = getRandomLocalQuestion(undefined, difficulty, history);
        setCurrentQuestion(q);
        setLoadingQuestion(false);
      }, 500);
      return;
    }

    try {
      const customKey = profile ? localStorage.getItem(`bp_gemini_api_key_${profile.email}`) : '';
      const res = await fetch('/api/generate-question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          focusArea,
          source,
          difficulty,
          fileData,
          fileMimeType,
          history,
          customApiKey: customKey || ''
        })
      });

      const data = await res.json();
      if (data && !data.isFallback) {
        setCurrentQuestion(data);
      } else {
        throw new Error("Triggering regional fallback datasets");
      }
    } catch (apiErr) {
      console.warn("Utilizing instant high-yield offline question fallback:", apiErr);
      const q = getRandomLocalQuestion((source as string) === 'local_test' ? undefined : (source as any), difficulty, history);
      setCurrentQuestion(q);
    } finally {
      setLoadingQuestion(false);
    }
  };

  // Launch direct practice test from WISC-V / etc encyclopedia click
  const handlePracticeFromEncyclopedia = (question: Question) => {
    setCurrentQuestion(question);
    setActiveTab2('practice');
  };

  const TABS = [
    { id: 'home', name: 'Student Dashboard', icon: CheckSquare, category: 'Main' },
    { id: 'groupstudy', name: 'Group Study Arena', icon: Users, category: 'Main' },
    { id: 'flashcards', name: 'Recall & AI Flashcards', icon: Layers, category: 'Main' },
    { id: 'practice', name: 'Clinical Practice', icon: BookOpen, category: 'Main' },
    { id: 'mock', name: 'Simulated Exam', icon: Award, category: 'Main' },
    { id: 'library', name: 'Test Encyclopedia', icon: Layers, category: 'Main' },
    { id: 'referrals', name: 'Colleague Referrals', icon: Gift, category: 'Main' },
    { id: 'devConcepts', name: 'Developmental Syllabus', icon: Brain, category: 'Study' },
    { id: 'psychometrics', name: 'Psychometrics', icon: Scale, category: 'Study' },
    { id: 'lifeStages', name: 'Life Stages', icon: Heart, category: 'Study' },
    { id: 'ioConcepts', name: 'I/O Psychology Syllabus', icon: Briefcase, category: 'Study' },
    { id: 'dsm5Disorders', name: 'DSM-5 Disorders Portal', icon: Sparkles, category: 'Study' },
    { id: 'repetition', name: 'Spaced Repetition', icon: Layers, category: 'Study' },
    { id: 'analytics', name: 'Achievements & Metrics', icon: LineChart, category: 'Study' },
    { id: 'focusShield', name: 'Pomodoro & Focus Shield', icon: Clock, category: 'Study' },
    { id: 'planner', name: 'Study Planner Calendar', icon: Calendar, category: 'Study' },
    { id: 'tos', name: 'PRC TOS Tracker', icon: Clipboard, category: 'Board' },
    { id: 'bulletin', name: 'Announcements', icon: Megaphone, category: 'Board' },
    { id: 'calculator', name: 'Weighted GWA Calculator', icon: Calculator, category: 'Board' },
    { id: 'feedback', name: 'GCash / Help Desk', icon: MessageSquare, category: 'Support' },
    { id: 'settings', name: 'Preferences', icon: User, category: 'Support' },
    { id: 'admin', name: 'Curriculum Admin', icon: Shield, category: 'Secret' },
  ];

  // Render Login state
  if (!profile) {
    return (
      <div className="min-h-screen bg-cream flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 select-none font-sans relative overflow-hidden">
        {/* Animated ambient blob */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-sage/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-mint/10 blur-3xl pointer-events-none" />
        
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-pine via-sage to-mint shadow-xs" />
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3 relative z-10-relative">
          <div className="w-20 h-20 bg-white/90 p-2.5 rounded-3xl mx-auto flex items-center justify-center shadow-md border border-pine-light/10 transform hover:rotate-6 transition-transform">
            <img 
              src="/icon.png" 
              alt="BoardPassPH App Logo" 
              className="w-16 h-16 object-contain rounded-2xl"
              referrerPolicy="no-referrer"
            />
          </div>
          <h2 className="text-4xl font-display font-bold italic text-[#f45185] tracking-tight">
            Board<span className="text-mint font-normal italic">Pass</span>PH
          </h2>
          <p className="text-xs text-gray-400 max-w-xs mx-auto font-mono tracking-tight">
            Comprehensive Reviewee Prep Portal for the Philippine Psychometrician Licensure Examination (PmLE)
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
          <div className="bg-white py-8 px-6 shadow-xl border border-gray-150 rounded-3xl space-y-6">
            
            {isForgotPassword ? (
              /* PASSWORD RECOVERY SYSTEM */
              <div className="space-y-4">
                <div className="border-b border-gray-100 pb-2">
                  <h3 className="font-display text-base font-bold text-pine uppercase tracking-wider font-mono">
                    🔑 Password Restoration
                  </h3>
                  <p className="text-[10px] text-gray-400 mt-0.5">
                    Enter your email to generate a verification code
                  </p>
                </div>

                {recoveryError && (
                  <div className="p-3 bg-rose-50 border border-rose-150 text-rose-800 text-[11px] font-semibold rounded-xl flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-rose-500 shrink-0" />
                    <span>{recoveryError}</span>
                  </div>
                )}

                {!otpSent ? (
                  /* STEP 1: Email Request */
                  <form onSubmit={handleSendRecoveryOtp} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider font-mono">
                        Registered Academic Email
                      </label>
                      <input
                        type="email"
                        required
                        value={recoveryEmail}
                        onChange={e => setRecoveryEmail(e.target.value)}
                        placeholder="reviewee@boardpassph.com"
                        className="w-full bg-white border border-gray-200 focus:border-sage focus:ring-3 focus:ring-sage/10 pl-4 py-2.5 rounded-xl text-xs font-semibold outline-none transition-all"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 bg-pine hover:bg-pine-mid text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-md cursor-pointer transition active:scale-[0.99] flex items-center justify-center gap-2"
                    >
                      <span>Generate Verification Code</span>
                    </button>
                  </form>
                ) : !otpVerified ? (
                  /* STEP 2: Verify Otp */
                  <form onSubmit={handleVerifyOtp} className="space-y-4">
                    <div className="space-y-3 bg-sage-50/50 border border-sage/20 p-4 rounded-2xl animate-in fade-in duration-200 select-text">
                      <div className="flex gap-2 text-sage-900">
                        <CheckCircle2 className="w-4.5 h-4.5 text-sage shrink-0 mt-0.5" />
                        <div className="text-[10.5px] leading-relaxed font-semibold">
                          <p className="font-bold text-sage-800">✓ Your Verification Code</p>
                          <p className="mt-1 text-gray-700">Your password reset code has been generated. Enter it below to proceed:</p>
                          <div className="mt-3 text-center">
                            <div className="inline-block font-mono text-lg font-black bg-white border-2 border-sage/30 px-4 py-2 rounded-lg tracking-widest text-pine select-all">{generatedOtp}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider font-mono">
                        Enter 6-Digit Passcode
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        placeholder="e.g. 540321"
                        value={enteredOtp}
                        onChange={e => setEnteredOtp(e.target.value)}
                        className="w-full bg-white border border-gray-200 focus:border-sage focus:ring-3 focus:ring-sage/10 text-center tracking-widest font-mono text-base font-bold py-2.5 rounded-xl outline-none transition-all"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-md cursor-pointer transition active:scale-[0.99]"
                    >
                      Verify Passcode
                    </button>
                  </form>
                ) : (
                  /* STEP 3: Input New Password */
                  <form onSubmit={handleCompleteReset} className="space-y-4">
                    <div className="p-3 bg-emerald-50 border border-emerald-100 text-emerald-800 text-[11px] font-semibold rounded-xl flex items-center gap-2 select-none">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Authorization cleared! Configure updated password.</span>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider font-mono">
                        New Review Password
                      </label>
                      <input
                        type="password"
                        required
                        placeholder="••••••••"
                        value={recoveryNewPassword}
                        onChange={e => setRecoveryNewPassword(e.target.value)}
                        className="w-full bg-white border border-gray-200 focus:border-sage focus:ring-3 focus:ring-sage/10 pl-4 py-2.5 rounded-xl text-xs font-semibold outline-none transition-all font-mono"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-md cursor-pointer transition active:scale-[0.99]"
                    >
                      Update Password Credentials
                    </button>
                  </form>
                )}

                <div className="pt-2 text-center">
                  <button
                    onClick={() => {
                      setIsForgotPassword(false);
                      setOtpSent(false);
                      setOtpVerified(false);
                      setRecoveryError('');
                      setRecoveryEmail('');
                    }}
                    type="button"
                    className="text-[10px] text-pine opacity-80 hover:opacity-100 font-bold uppercase tracking-widest font-mono cursor-pointer"
                  >
                    ← Back to Sign In
                  </button>
                </div>
              </div>
            ) : (
              /* DYNAMIC AUTH SCREEN: SIGN IN OR SIGN UP */
              <>
                {authError && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-xl flex items-start gap-2 animate-in fade-in slide-in-from-top-2 mb-2 select-text">
                    <ShieldAlert className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <span>{authError}</span>
                  </div>
                )}

                {isSignUp ? (
                  /* SIGN UP FORM */
                  <form className="space-y-4" onSubmit={handleSignUp}>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider font-mono">
                        Register Candidate Email
                      </label>
                      <input
                        type="email"
                        required
                        value={authEmail}
                        onChange={e => setAuthEmail(e.target.value)}
                        placeholder="candidate@boardpassph.com"
                        className="w-full bg-white border border-gray-200 focus:border-sage focus:ring-3 focus:ring-sage/10 pl-4 py-2.5 rounded-xl text-xs font-semibold placeholder-gray-400 outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider font-mono">
                        Create Review Password (Required)
                      </label>
                      <div className="relative">
                        <input
                          type="password"
                          required
                          minLength={4}
                          value={authPassword}
                          onChange={e => setAuthPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full bg-white border border-gray-200 focus:border-sage focus:ring-3 focus:ring-sage/10 pl-4 py-2.5 rounded-xl text-xs font-semibold placeholder-gray-400 outline-none transition-all font-mono"
                        />
                        <div className="absolute inset-y-0 right-3 flex items-center text-gray-300">
                          <Key className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider font-mono">
                        Confirm Review Password (Required)
                      </label>
                      <div className="relative">
                        <input
                          type="password"
                          required
                          value={authConfirmPassword}
                          onChange={e => setAuthConfirmPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full bg-white border border-gray-200 focus:border-sage focus:ring-3 focus:ring-sage/10 pl-4 py-2.5 rounded-xl text-xs font-semibold placeholder-gray-400 outline-none transition-all font-mono"
                        />
                        <div className="absolute inset-y-0 right-3 flex items-center text-gray-300">
                          <Key className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-pine hover:bg-pine-mid text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-md border-b-2 border-pine-mid shadow-pine/10 hover:shadow-lg transition cursor-pointer"
                    >
                      Create Candidate Profile
                    </button>

                    <div className="pt-2 text-center">
                      <button
                        type="button"
                        onClick={() => {
                          setIsSignUp(false);
                          setAuthError('');
                        }}
                        className="text-[10px] text-pine opacity-80 hover:opacity-100 font-bold uppercase tracking-widest font-mono cursor-pointer"
                      >
                        ← Already registered? Sign In
                      </button>
                    </div>
                  </form>
                ) : (
                  /* SIGN IN FORM */
                  <form className="space-y-4" onSubmit={handleSignIn}>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider font-mono">
                        Candidate Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={authEmail}
                        onChange={e => setAuthEmail(e.target.value)}
                        placeholder="reviewee@boardpassph.com"
                        className="w-full bg-white border border-gray-200 focus:border-sage focus:ring-3 focus:ring-sage/10 pl-4 py-2.5 rounded-xl text-xs font-semibold placeholder-gray-400 outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider font-mono">
                          Review Password (Required)
                        </label>
                      </div>
                      <div className="relative">
                        <input
                          type="password"
                          required
                          value={authPassword}
                          onChange={e => setAuthPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full bg-white border border-gray-200 focus:border-sage focus:ring-3 focus:ring-sage/10 pl-4 py-2.5 rounded-xl text-xs font-semibold placeholder-gray-400 outline-none transition-all font-mono"
                        />
                        <div className="absolute inset-y-0 right-3 flex items-center text-gray-300">
                          <Key className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-pine hover:bg-pine-mid text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-md border-b-2 border-pine-mid shadow-pine/10 hover:shadow-lg transition cursor-pointer"
                    >
                      Launch Study Room
                    </button>

                    <div className="pt-2 text-center flex flex-col gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setIsSignUp(true);
                          setAuthError('');
                        }}
                        className="text-[10px] text-[#2c4e34] hover:text-emerald-950 font-bold uppercase tracking-widest font-mono cursor-pointer bg-emerald-50 hover:bg-emerald-100/70 border border-emerald-200 py-2.5 rounded-xl transition-all"
                      >
                        🌟 New Candidate? Sign Up for an Account
                      </button>
                    </div>

                    <div className="relative flex py-1 items-center">
                      <div className="flex-grow border-t border-gray-150" />
                      <span className="flex-shrink mx-3 text-[9px] text-gray-400 font-bold uppercase tracking-widest font-mono">Troubleshoot</span>
                      <div className="flex-grow border-t border-gray-150" />
                    </div>

                    <button
                      onClick={() => {
                        setIsForgotPassword(true);
                        setRecoveryEmail(authEmail);
                      }}
                      type="button"
                      className="w-full py-2.5 bg-gray-50 hover:bg-gray-100/80 border border-gray-200 hover:border-sage text-pine text-xs font-bold uppercase tracking-widest rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 font-mono"
                    >
                      <Key className="w-4 h-4 text-sage" />
                      <span>Forgot Password? Restore Access</span>
                    </button>
                  </form>
                )}
              </>
            )}
          </div>
        </div>

        <div className="mt-8 text-center text-[10.5px] text-gray-400 font-mono">
          © 2026 BoardPassPH Review. All psychiatric indices updated to DSM-5-TR.
        </div>
      </div>
    );
  }

  // Active Main UI Layout
  return (
    <div className="min-h-screen bg-foam/40 flex flex-col font-sans select-text pb-12">
      {/* Header and Sync alerts */}
      <Header 
        profile={profile} 
        onNavigate={handleNavigate} 
        theme={profile?.theme || 'strawberry-matcha'}
        onThemeChange={(newTheme) => {
          updateProfileAndSave(prev => {
            if (!prev) return prev;
            return {
              ...prev,
              theme: newTheme
            };
          });
        }}
        syncStatus={syncStatus}
        onCloudSync={handleManualCloudSync}
      />

      <div className="max-w-7xl w-full mx-auto px-4 md:px-6 pt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Responsive Mobile Drawer / Sidebar button */}
        <div className="lg:col-span-12 flex justify-between items-center lg:hidden bg-white p-3.5 border border-gray-200/50 rounded-2xl shadow-xs select-none">
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="flex items-center gap-2 text-pine font-bold uppercase tracking-wider text-xs bg-foam px-3 py-1.5 rounded-xl border border-pine/5 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            <span>Menu Navigation</span>
          </button>
          <span className="text-[10px] font-mono font-bold text-pine bg-[#deebe3] px-2 py-0.5 rounded-full uppercase">
            {activeTab === 'home' ? 'Student Dashboard' : TABS.find(t => t.id === activeTab)?.name}
          </span>
        </div>

        {/* Sidebar Navigation Panel */}
        <div className={`lg:col-span-3 space-y-4 lg:block ${mobileMenuOpen ? 'block' : 'hidden'} animate-in fade-in slide-in-from-top-3 lg:animate-none lg:slide-none select-none`}>
          <div className="bg-white border border-gray-150 rounded-2xl p-4 shadow-sm space-y-4">
            <div className="p-3 bg-emerald-50 text-pine rounded-xl border border-emerald-100 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-[10px] uppercase font-bold tracking-widest font-mono text-emerald-800">Reviewee active</span>
            </div>

            <nav className="space-y-4">
              {['Main', 'Study', 'Board', 'Support', 'Secret'].map(cat => {
                const subTabs = TABS.filter(t => t.category === cat && isTabAllowed(t.id, profile?.tier || 'Free', profile?.email));
                if (subTabs.length === 0) return null;

                return (
                  <div key={cat} className="space-y-1">
                    <span className="text-[9px] uppercase font-black text-gray-400 tracking-widest px-2.5 font-mono">
                      {cat}
                    </span>
                    <div className="space-y-0.5">
                      {subTabs.map(tab => {
                        const IconComponent = tab.icon;
                        const isSelected = activeTab === tab.id;
                        
                        return (
                          <button
                            key={tab.id}
                            onClick={() => {
                              setActiveTab2(tab.id);
                              setMobileMenuOpen(false);
                            }}
                            className={`w-full text-left flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold transition-all relative cursor-pointer ${
                              isSelected 
                                ? 'bg-pine text-cream font-black shadow-sm' 
                                : 'text-[#2e4737]/80 hover:bg-foam/20 hover:text-pine hover:translate-x-0.5'
                            }`}
                          >
                            <IconComponent className={`w-3.5 h-3.5 ${isSelected ? 'text-mint' : 'text-sage'}`} />
                            <span className="truncate">{tab.name}</span>
                            {isSelected && (
                              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-mint" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </nav>
          </div>

          {/* Theme customizer slot */}
          <div className="bg-white border border-gray-150 rounded-2xl p-4 shadow-sm space-y-3 animate-in fade-in duration-300">
            <span className="text-[9px] uppercase font-black text-gray-400 tracking-widest px-2.5 font-mono">
              Workspace Theme
            </span>
            <div className="grid grid-cols-1 gap-1.5">
              {THEME_OPTIONS.map((opt) => {
                const isActive = (profile?.theme || 'strawberry-matcha') === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => {
                      updateProfileAndSave(prev => {
                        if (!prev) return prev;
                        return {
                          ...prev,
                          theme: opt.id
                        };
                      });
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-left text-[11px] font-bold transition hover:scale-[1.01] active:scale-[0.99] cursor-pointer ${
                      isActive 
                        ? 'bg-pine text-cream border-transparent shadow-xs' 
                        : 'text-[#2e4737]/80 hover:bg-foam/10 hover:text-pine'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{opt.emoji}</span>
                      <span>{opt.name}</span>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <span className={`w-2.5 h-2.5 rounded-full ${opt.bg} border border-white/20 inline-block`} />
                      <span className={`w-2.5 h-2.5 rounded-full ${opt.accent} border border-white/20 inline-block`} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Core Main Panel */}
        <div className="lg:col-span-9 space-y-6">

          {/* XP milestone bars */}
          <RpgBar 
            profile={profile} 
            setProfile={updateProfileAndSave as any} 
            onNavigate={handleNavigate}
            onLogout={handleSignOut}
          />

          {/* Conditional rendering of tab templates */}
          {activeTab === 'home' && (
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm space-y-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-[10px] uppercase font-extrabold text-pine tracking-[0.2em]">
                      Quick maintenance
                    </p>
                    <h3 className="font-display text-lg text-pine leading-snug">
                      Clear cached app data
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Refresh offline assets and remove transient cached content while keeping your saved profile intact.
                    </p>
                  </div>
                  <button
                    onClick={handleClearCache}
                    disabled={isClearingCache}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-[0.18em] bg-rose-600 hover:bg-rose-700 disabled:bg-rose-300 text-cream border-b-2 border-rose-800 transition cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                    {isClearingCache ? 'Clearing...' : 'Clear Cache'}
                  </button>
                </div>
                {cacheStatus && (
                  <p className="text-xs font-semibold text-pine bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-2">
                    {cacheStatus}
                  </p>
                )}
              </div>

              <StudentHubCard 
                profile={profile} 
                onNavigate={handleNavigate} 
              />
              
              {profile && (
                <DailyBoardChallenge
                  profile={profile}
                  setProfile={updateProfileAndSave}
                />
              )}
              
              {profile && (
                <StudyPetWidget
                  profile={profile}
                  setProfile={updateProfileAndSave as any}
                />
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase font-extrabold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-100 w-max block select-none">
                      Board MCQs
                    </span>
                    <h4 className="font-display text-lg text-pine leading-snug">
                      Quick Practice Session Setup
                    </h4>
                    <p className="text-xs text-gray-500 leading-normal leading-relaxed font-sans font-medium">
                      Configure your clinical disorder chapters, toggle the 90s speed trials, and begin evaluating diagnostic criteria instantly.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab2('practice')}
                    className="w-full mt-4 py-2.5 bg-pine hover:bg-pine-mid text-cream text-xs font-black uppercase tracking-widest rounded-xl transition cursor-pointer select-none border-b-2 border-pine-mid flex items-center justify-center gap-1"
                  >
                    <span>Activate Practice Room</span>
                    <ChevronRight className="w-3.5 h-3.5 text-mint" />
                  </button>
                </div>

                <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase font-extrabold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-100 w-max block select-none">
                      Calculators
                    </span>
                    <h4 className="font-display text-lg text-pine leading-snug">
                      Weighted Score Calculator
                    </h4>
                    <p className="text-xs text-gray-500 leading-normal leading-relaxed font-sans font-medium">
                      The GWA is calculated proportionally (Personality 20%, Assessment 40%, Abnormal 20%, I/O 20%) with strict individual course fail thresholds.
                    </p>
                  </div>
                  {profile && isTabAllowed('calculator', profile.tier, profile.email) ? (
                    <button
                      onClick={() => setActiveTab2('calculator')}
                      className="w-full mt-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-cream text-xs font-black uppercase tracking-widest rounded-xl transition cursor-pointer select-none border-b-2 border-rose-800 flex items-center justify-center gap-1"
                    >
                      <span>Check Passing Viability</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleNavigate('billingTab')}
                      className="w-full mt-4 py-2.5 bg-gray-100 hover:bg-gray-150 text-gray-600 text-xs font-black uppercase tracking-widest rounded-xl transition cursor-pointer select-none border-b-2 border-gray-300 flex items-center justify-center gap-1.5"
                    >
                      <span>🔒 Unlock with Pro Suite</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              <LeaderboardPanel profile={profile} />
            </div>
          )}

          {activeTab === 'groupstudy' && (
            <GroupStudyPanel
              profile={profile}
              setProfile={updateProfileAndSave}
              urlRoomId={urlRoomId}
              clearUrlRoomId={() => setUrlRoomId(null)}
            />
          )}

          {activeTab === 'flashcards' && (
            <FlashcardDecksPanel
              profile={profile!}
              setProfile={updateProfileAndSave}
            />
          )}

          {activeTab === 'practice' && (
            <PracticePanel
              profile={profile}
              setProfile={updateProfileAndSave}
              currentQuestion={currentQuestion}
              onFetchQuestion={handleFetchQuestion}
              loading={loadingQuestion}
              selectedModel={selectedModel}
              onModelChange={setSelectedModel}
            />
          )}

          {activeTab === 'mock' && (
            <MockExamPanel
              profile={profile}
              setProfile={updateProfileAndSave as any}
              onNavigate={handleNavigate}
            />
          )}

          {activeTab === 'library' && (
            <LibraryPanel
              onPracticeTest={handlePracticeFromEncyclopedia}
              profile={profile}
              onNavigate={handleNavigate}
            />
          )}

          {activeTab === 'tos' && (
            <TosTrackerPanel
              profile={profile}
              setProfile={updateProfileAndSave}
            />
          )}

          {activeTab === 'focusShield' && (
            <FocusShieldPanel
              profile={profile}
              setProfile={updateProfileAndSave}
              onNavigate={handleNavigate}
            />
          )}

          {activeTab === 'referrals' && (
            <ReferralsPanel
              profile={profile}
              setProfile={updateProfileAndSave}
            />
          )}

          {activeTab === 'repetition' && (
            <SpacedRepPanel
              profile={profile}
              setProfile={updateProfileAndSave}
              onStartReviewQuiz={handlePracticeFromEncyclopedia}
            />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsPanel
              profile={profile}
              setProfile={updateProfileAndSave}
            />
          )}

          {activeTab === 'planner' && (
            <StudyPlannerPanel
              profile={profile}
              setProfile={updateProfileAndSave}
            />
          )}

          {activeTab === 'devConcepts' && (
            <DevConceptsPanel 
              profile={profile}
              onNavigate={handleNavigate}
            />
          )}

          {activeTab === 'psychometrics' && (
            <PsychometricConceptsPanel />
          )}

          {activeTab === 'lifeStages' && (
            <LifeStagesPanel />
          )}

          {activeTab === 'ioConcepts' && (
            <IoConceptsPanel 
              profile={profile}
              onNavigate={handleNavigate}
            />
          )}

          {activeTab === 'dsm5Disorders' && (
            <Dsm5DisordersPanel />
          )}

          {activeTab === 'bulletin' && (
            <AnnouncementsPanel />
          )}

          {activeTab === 'calculator' && (
            <WeightedCalculatorPanel profile={profile} />
          )}

          {activeTab === 'feedback' && (
            <div className="space-y-6">
              {/* Internal sub-tab to navigate between Unlock Premium & Helpline */}
              <div className="flex bg-white/45 p-1 border border-pine/5 rounded-2xl max-w-sm font-mono text-[9px] font-black uppercase tracking-wider gap-1 select-none shadow-xs">
                <button
                  onClick={() => setFeedbackSubTab('premium')}
                  className={`flex-grow text-center px-3 py-2 rounded-xl transition duration-150 cursor-pointer ${
                    feedbackSubTab === 'premium' ? 'bg-pine text-[#fbfdfb] font-black shadow-xs' : 'text-pine hover:bg-foam/65'
                  }`}
                >
                  💳 Unlock Premium via GCash
                </button>
                <button
                  onClick={() => setFeedbackSubTab('help')}
                  className={`flex-grow text-center px-3 py-2 rounded-xl transition duration-150 cursor-pointer ${
                    feedbackSubTab === 'help' ? 'bg-pine text-[#fbfdfb] font-black shadow-xs' : 'text-pine hover:bg-foam/65'
                  }`}
                >
                  ✉️ Helpline & Suggestions
                </button>
              </div>

              {feedbackSubTab === 'premium' ? (
                <BillingPanel
                  profile={profile!}
                  setProfile={updateProfileAndSave}
                />
              ) : (
                <FeedbackPanel
                  profile={profile!}
                />
              )}
            </div>
          )}

          {activeTab === 'settings' && (
            <ProfilePanel
              profile={profile}
              setProfile={updateProfileAndSave}
              onSignOut={handleSignOut}
              onResetData={handleResetData}
            />
          )}

          {activeTab === 'admin' && (
            <AdminPanel
              onRefreshSeeds={handleResetData}
              currentUser={profile}
              setCurrentUser={updateProfileAndSave}
            />
          )}

        </div>
      </div>
    </div>
  );
}
