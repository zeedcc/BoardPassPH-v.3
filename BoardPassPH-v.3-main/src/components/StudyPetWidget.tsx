import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, Sparkles, ShoppingBag, Award, Trophy, User, 
  HelpCircle, Coffee, BookOpen, Star, RefreshCw, Check, Zap, Smile,
  Gamepad2, Volume2, VolumeX, AlertTriangle, ArrowLeftRight
} from 'lucide-react';
import { UserProfile } from '../types';

interface StudyPetWidgetProps {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
}

interface PetAccessory {
  id: string;
  name: string;
  emoji: string;
  cost: number;
  description: string;
  buffLabel: string;
}

const ACCESSORIES: PetAccessory[] = [
  {
    id: 'glasses',
    name: 'Freudian Glasses',
    emoji: '👓',
    cost: 100,
    description: 'Increases understanding of deep analytical schemas.',
    buffLabel: '+10% XP on Clinical Practice Rooms'
  },
  {
    id: 'espresso',
    name: 'Brain-Juice Espresso',
    emoji: '☕',
    cost: 120,
    description: 'Keeps neurons firing during rigorous study intervals.',
    buffLabel: '+15% XP on Focus Shield Pomodoros'
  },
  {
    id: 'manual',
    name: 'Mini DSM-5 Manual',
    emoji: '📘',
    cost: 180,
    description: 'Quick reference guide to diagnostic differential exclusions.',
    buffLabel: '+15% XP on Daily Board Challenges'
  },
  {
    id: 'mortarboard',
    name: 'Sages Mortarboard Cap',
    emoji: '🎓',
    cost: 250,
    description: 'The ultimate symbol of Philippine board exam master class.',
    buffLabel: '+20% XP on Subject Study Planner Logs'
  }
];

const SPECIES_TEMPLATES = {
  frog: {
    emoji: '🐸',
    name: 'Sigmund Frog',
    specialty: 'Psychoanalyst Companion',
    bgColor: 'from-emerald-50 to-emerald-100/40',
    borderColor: 'border-emerald-200',
    accentColor: 'text-emerald-700',
    quotes: [
      "Hmm... I detect some resistance in your ego. Let's analyze another MCQ!",
      "Sometimes, a study break is just a study break. But right now, we need to log hours!",
      "Is your Super-ego telling you to review Abnormal Psychology? Let's treat it with positive focus!",
      "The interpretation of exam vignettes is the royal road to passing the Board!",
      "Don't project your anxiety onto the Clinical Exam. You are highly capable!",
      "Your libido for knowledge is strong today. Keep studying!"
    ]
  },
  kitty: {
    emoji: '🐱',
    name: 'Carl Kitty',
    specialty: 'Humanistic Companion',
    bgColor: 'from-amber-50 to-amber-100/40',
    borderColor: 'border-amber-200',
    accentColor: 'text-amber-700',
    quotes: [
      "I hear you, and I accept your current level of preparation unconditionally.",
      "Remember, congruence between your real self and ideal self comes with steady, patient review.",
      "Your capacity for self-actualization is infinite! You're going to be an outstanding RPm.",
      "No conditions of worth here—you are doing great simply by showing up to study!",
      "Trust your organistic valuing process today. Follow your gut on diagnostic qualifiers.",
      "Let's focus on the present moment. One clinical vignette at a time!"
    ]
  },
  pup: {
    emoji: '🐶',
    name: 'Pavlov\'s Pup',
    specialty: 'Behavioral Companion',
    bgColor: 'from-rose-50 to-rose-100/40',
    borderColor: 'border-rose-200',
    accentColor: 'text-rose-700',
    quotes: [
      "Every correct MCQ response is a positive reinforcer! Let's build the ultimate study habit!",
      "Ring the study bell! I am conditioned to salivate for high-yield assessment tables.",
      "Extinction of board exam anxiety is achieved through systematic exposure. You've got this!",
      "Let's generalize this stimulus of success! One correct quiz answer after another.",
      "Is learning hard? Let's break it down into micro-operants with continuous reinforcement!",
      "Woof! Your study behavior has high response strength today!"
    ]
  },
  owl: {
    emoji: '🦉',
    name: 'Albert Owl',
    specialty: 'Cognitive REBT Companion',
    bgColor: 'from-violet-50 to-violet-100/40',
    borderColor: 'border-violet-200',
    accentColor: 'text-violet-700',
    quotes: [
      "It is completely irrational to think you must answer every vignette perfectly. Focus on learning!",
      "Action is the ultimate cognitive disruption of performance anxiety. Go answer a quiz!",
      "Dispute those self-defeating thoughts! Replace 'I can't pass' with 'I am actively reviewing'!",
      "A failed practice trial is not a catastrophe. It is empirical data for target improvement!",
      "Are you demanding perfection from yourself? Let go of 'shoulds' and 'musts'!",
      "Rational thinking leads to healthy clinical decisions. Read the criteria objectively!"
    ]
  }
};

// Safe Synthesizer sound engine for physical feedback
const playTone = (freq: number, type: OscillatorType, duration: number, isMuted: boolean) => {
  if (isMuted) return;
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = type;
    osc.frequency.value = freq;
    
    gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    // Suppress audio context blocked warnings
  }
};

export const StudyPetWidget: React.FC<StudyPetWidgetProps> = ({ profile, setProfile }) => {
  // Safe default initializations
  const petSpecies = (['frog', 'kitty', 'pup', 'owl'].includes(profile.petSpecies || '') ? profile.petSpecies! : 'frog') as 'frog' | 'kitty' | 'pup' | 'owl';
  const petTemplate = SPECIES_TEMPLATES[petSpecies] || SPECIES_TEMPLATES.frog;
  const petName = profile.petName || petTemplate.name;
  const petHappiness = profile.petHappiness ?? 80;
  
  // Calculate Pet level based directly on User Study XP (Feature 1 requirement: "raising a pet when XP increases")
  const XP_PER_PET_LEVEL = 200;
  const companionLevel = Math.max(1, Math.floor((profile.totalXp) / XP_PER_PET_LEVEL) + 1);
  const companionLevelXp = profile.totalXp % XP_PER_PET_LEVEL;
  const companionLevelProgress = Math.round((companionLevelXp / XP_PER_PET_LEVEL) * 100);

  const [activeQuote, setActiveQuote] = useState('');
  const [speechBubbleOpen, setSpeechBubbleOpen] = useState(false);
  const [petAnimationState, setPetAnimationState] = useState<'idle' | 'pulse' | 'bouncing' | 'spin' | 'eating' | 'sleeping'>('idle');
  const [customNameInput, setCustomNameInput] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);
  const [activeTab, setActiveTab2] = useState<'interact' | 'shop' | 'evolve'>('interact');
  const [purchaseError, setPurchaseError] = useState('');
  const [purchaseSuccess, setPurchaseSuccess] = useState('');
  const [isMuted, setIsMuted] = useState(true); // default muted to stay unobtrusive
  
  // State-based dynamic pet expression context
  const [currentExpression, setCurrentExpression] = useState<'normal' | 'happy' | 'thinking' | 'eating' | 'sleeping'>('normal');

  // Stately visual particle feed effects
  const [feedEffect, setFeedEffect] = useState<'heart' | 'sparkle' | 'food' | 'star' | null>(null);

  const getEvolutionsLabel = (level: number) => {
    if (level < 2) return '🥚 Hatchling';
    if (level < 3) return '🍼 Curious Toddler';
    if (level < 5) return '📚 Novice Scholar';
    if (level < 8) return '🎓 Certified Specialist';
    return '🌟 Clinical Board Sage';
  };

  const getEvolutionEmoji = (level: number) => {
    if (level < 2) return '🥚';
    if (level < 3) return '🚀';
    if (level < 5) return '📖';
    if (level < 8) return '🏆';
    return '👑';
  };

  // Sound cues definitions
  const soundClick = () => playTone(587.33, 'triangle', 0.08, isMuted);
  const soundSuccess = () => {
    playTone(523.25, 'sine', 0.1, isMuted);
    setTimeout(() => playTone(659.25, 'sine', 0.1, isMuted), 100);
    setTimeout(() => playTone(783.99, 'sine', 0.2, isMuted), 200);
  };
  const soundError = () => {
    playTone(220, 'sawtooth', 0.15, isMuted);
    setTimeout(() => playTone(180, 'sawtooth', 0.15, isMuted), 120);
  };

  // Trigger high-yield speech/quote
  const triggerSpeech = () => {
    soundClick();
    const quotes = petTemplate.quotes;
    let fallback = quotes[Math.floor(Math.random() * quotes.length)];
    if (profile.activePetAccessory) {
      const equipped = ACCESSORIES.find(a => a.id === profile.activePetAccessory);
      if (equipped) {
        fallback += ` (Passively boosted by ${equipped.emoji} ${equipped.name}!)`;
      }
    }
    setActiveQuote(fallback);
    setSpeechBubbleOpen(true);
    setCurrentExpression('thinking');
    setPetAnimationState('bouncing');
    setTimeout(() => {
      setPetAnimationState('idle');
      setCurrentExpression('normal');
    }, 1800);
  };

  // Auto trigger speech occasionally on load
  useEffect(() => {
    const quotes = petTemplate.quotes;
    setActiveQuote(quotes[0]);
    setSpeechBubbleOpen(true);
  }, [petSpecies]);

  // Rename Companion
  const handleRenameCompanion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customNameInput.trim()) return;

    setProfile(prev => {
      const updated = {
        ...prev,
        petName: customNameInput.trim()
      };
      localStorage.setItem(`bp_profile_${prev.email}`, JSON.stringify(updated));
      return updated;
    });
    setIsEditingName(false);
    setCustomNameInput('');
    soundSuccess();
  };

  // Change Species
  const handleChangeSpecies = (species: 'frog' | 'kitty' | 'pup' | 'owl') => {
    soundClick();
    setProfile(prev => {
      const defaultName = SPECIES_TEMPLATES[species].name;
      const updated = {
        ...prev,
        petSpecies: species,
        petName: defaultName
      };
      localStorage.setItem(`bp_profile_${prev.email}`, JSON.stringify(updated));
      return updated;
    });
    setPetAnimationState('spin');
    setTimeout(() => setPetAnimationState('idle'), 800);
  };

  // Cycle through species
  const hanceCycleSpecies = () => {
    const speciesArr: ('frog' | 'kitty' | 'pup' | 'owl')[] = ['frog', 'kitty', 'pup', 'owl'];
    const currentIdx = speciesArr.indexOf(petSpecies as any);
    const nextIdx = (currentIdx + 1) % speciesArr.length;
    handleChangeSpecies(speciesArr[nextIdx]);
  };

  // Feed Companion logic (Costs 15 Study XP to feed, adds happiness + rewards and levels up and unlocks special states)
  const handleFeedCompanion = (type: 'snack' | 'boba') => {
    const cost = type === 'snack' ? 15 : 35;
    if (profile.totalXp < cost) {
      soundError();
      setPurchaseError(`❌ Lacks overall Achievements balance (requires ${cost} XP) to prepare custom feed!`);
      return;
    }

    const happinessGain = type === 'snack' ? 15 : 40;
    
    setFeedEffect('food');
    setCurrentExpression('eating');
    setPetAnimationState('eating');

    setProfile(prev => {
      const currentHappiness = prev.petHappiness ?? 80;
      const nextHappiness = Math.min(100, currentHappiness + happinessGain);
      
      const updated = {
        ...prev,
        totalXp: prev.totalXp - cost, // Deduct User XP dynamically
        petHappiness: nextHappiness
      };
      localStorage.setItem(`bp_profile_${prev.email}`, JSON.stringify(updated));
      return updated;
    });

    soundSuccess();

    setTimeout(() => {
      setFeedEffect('heart');
      setCurrentExpression('happy');
      setPetAnimationState('pulse');
    }, 1200);

    setTimeout(() => {
      setFeedEffect(null);
      setPetAnimationState('idle');
      setCurrentExpression('normal');
    }, 2800);

    setPurchaseSuccess(`🥗 Fed ${petName}! Consumed ${type === 'snack' ? 'Academic Protein Salad 🥬' : 'DSM-5 Bubble Matcha 🍵'}!`);
    setPurchaseError('');
    
    // Custom feeding response
    const quotes = [
      "Yum! Positive reinforcement received! Truly delicious! 😋",
      "Excellent study calories! My neuro-connections are firing at maximum speed! 🧠⚡",
      "Ah, the perfect reward to shape optimal study behaviors! Thank you companion!",
      "My cognitive faculties are highly satisfied by this empirical nourishment!"
    ];
    setActiveQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    setSpeechBubbleOpen(true);
  };

  // Interact with Companion (Free, boosts happiness slightly)
  const handleInteractCompanion = () => {
    if (petAnimationState !== 'idle') return;
    soundClick();
    setPetAnimationState('spin');
    setFeedEffect('heart');
    setCurrentExpression('happy');
    
    setProfile(prev => {
      const currentHappiness = prev.petHappiness ?? 80;
      const updated = {
        ...prev,
        petHappiness: Math.min(100, currentHappiness + 5)
      };
      localStorage.setItem(`bp_profile_${prev.email}`, JSON.stringify(updated));
      return updated;
    });

    setTimeout(() => {
      setFeedEffect(null);
      setPetAnimationState('idle');
      setCurrentExpression('normal');
    }, 1500);

    triggerSpeech();
  };

  // Companion naps to rest and restore state (Free)
  const handleNapCompanion = () => {
    if (petAnimationState !== 'idle') return;
    soundClick();
    setPetAnimationState('sleeping');
    setCurrentExpression('sleeping');
    setFeedEffect('star');
    setActiveQuote("💤 Shh... Sigmund Frog and the ego-complex are integrating in deep REM sleep...");
    setSpeechBubbleOpen(true);

    setTimeout(() => {
      setFeedEffect(null);
      setPetAnimationState('idle');
      setCurrentExpression('normal');
      setSpeechBubbleOpen(false);
    }, 3000);
  };

  // Buy Accessory
  const buyAccessory = (acc: PetAccessory) => {
    if (profile.totalXp < acc.cost) {
      soundError();
      setPurchaseError(`❌ You need ${acc.cost} XP to unlock this accessory. Keep practicing Board questions!`);
      return;
    }

    const unlocked = profile.petAccessories || [];
    if (unlocked.includes(acc.id)) {
      soundError();
      setPurchaseError(`Warning: You already own the ${acc.name}!`);
      return;
    }

    setProfile(prev => {
      const owned = prev.petAccessories || [];
      const updated = {
        ...prev,
        totalXp: prev.totalXp - acc.cost,
        petAccessories: [...owned, acc.id],
        activePetAccessory: acc.id // Auto equip
      };
      localStorage.setItem(`bp_profile_${prev.email}`, JSON.stringify(updated));
      return updated;
    });

    soundSuccess();
    setPurchaseSuccess(`👑 Successfully purchased and equipped ${acc.name} ${acc.emoji}! Passive XP buffs activated!`);
    setPurchaseError('');
    setPetAnimationState('pulse');
  };

  // Toggle Equip Accessory
  const handleEquipAccessory = (id: string) => {
    soundClick();
    setProfile(prev => {
      const currentEquipped = prev.activePetAccessory;
      const updated = {
        ...prev,
        activePetAccessory: currentEquipped === id ? undefined : id
      };
      localStorage.setItem(`bp_profile_${prev.email}`, JSON.stringify(updated));
      return updated;
    });
    setPetAnimationState('bouncing');
    setPurchaseSuccess(`🎒 Companion gear update saved successfully!`);
  };

  const currentTemplate = petTemplate;
  const equippedAccessory = ACCESSORIES.find(a => a.id === profile.activePetAccessory);

  // Dynamic expression rendering
  const getRenderEmoji = () => {
    if (companionLevel < 2) return '🥚';
    
    const baseEmoji = currentTemplate.emoji;
    switch (currentExpression) {
      case 'happy':
        return `${baseEmoji}💖`;
      case 'thinking':
        return `${baseEmoji}🎓`;
      case 'eating':
        return `${baseEmoji}😋`;
      case 'sleeping':
        return `💤`;
      default:
        return baseEmoji;
    }
  };

  return (
    <div className="bg-white border border-gray-150 rounded-3xl p-6 shadow-sm space-y-6" id="studyPetWidget">
      
      {/* Header section with interactive RPG styling */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
        <div className="text-left space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] uppercase font-extrabold tracking-wider px-2.5 py-1 bg-emerald-100 text-[#2f4939] rounded-full border border-emerald-200">
              🎮 COMPANION RPG HUB
            </span>
            <span className="text-[10px] uppercase font-extrabold tracking-wider px-2.5 py-1 bg-amber-50 text-amber-700 rounded-full border border-amber-100 flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-500 fill-amber-500" /> PASSIVE MULTIPLIERS ACTIVE
            </span>
          </div>
          <h3 className="font-display font-black text-xl text-pine leading-tight pt-1">
            Groom &amp; Raise Your Study Companion
          </h3>
          <p className="text-xs text-gray-500 max-w-xl leading-relaxed">
            Your clinical pet grows, reacts, and unlocks new cognitive specialties as you secure board-level diagnostic milestones in the arena!
          </p>
        </div>

        {/* Level and Mute control row */}
        <div className="flex items-center gap-3 self-start sm:self-auto shrink-0">
          <button
            onClick={() => {
              setIsMuted(!isMuted);
              setTimeout(() => { if (isMuted) playTone(523.25, 'sine', 0.1, false); }, 50);
            }}
            className="p-2 border border-gray-200 hover:border-pine hover:bg-gray-50 rounded-xl transition text-gray-500 cursor-pointer"
            title={isMuted ? "Unmute Retro Chimes" : "Mute Retro Chimes"}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-gray-400" /> : <Volume2 className="w-4 h-4 text-emerald-600 animate-pulse" />}
          </button>

          <div className="bg-gradient-to-br from-[#2f4939] to-[#1e3226] text-white px-4 py-2 rounded-2xl flex items-center gap-2.5 shadow-sm font-sans border-b-4 border-emerald-950">
            <span className="text-xl">{getEvolutionEmoji(companionLevel)}</span>
            <div className="text-left leading-tight">
              <span className="text-[8px] uppercase tracking-widest text-emerald-300 font-extrabold block">PET LEVEL</span>
              <strong className="text-xs font-black text-white block">{companionLevel} &bull; {getEvolutionsLabel(companionLevel)}</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* PHYSICAL retro handheld pocket pet console system design */}
        <div className="lg:col-span-5 bg-gradient-to-b from-gray-100 to-gray-200 border-x-4 border-t-4 border-b-12 border-gray-300 rounded-[3rem] p-5 shadow-lg relative flex flex-col justify-between max-w-sm mx-auto w-full min-h-[440px]">
          
          {/* Authentic retro console top details */}
          <div className="w-full flex justify-between items-center mb-4 select-none">
            <div className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 rounded-full bg-red-600 border border-red-800 shadow-inner animate-pulse shrink-0" />
              <span className="font-mono text-[8px] tracking-widest font-bold text-gray-500">BATTERY OK</span>
            </div>
            <div className="h-1.5 w-16 bg-gray-400 rounded-full" />
            <div className="font-mono text-[8.5px] font-black tracking-tighter text-gray-600 bg-gray-300/60 px-2 py-0.5 rounded-md">
              PSYCH-GOTCHI v1.5
            </div>
          </div>

          {/* Interactive LCD Screen Interface frame wrapping */}
          <div className="bg-emerald-950 p-4 rounded-2xl border-4 border-stone-800 shadow-2xl relative flex-1 flex flex-col justify-between overflow-hidden text-emerald-400 font-mono">
            {/* Screen shadow effects */}
            <div className="absolute inset-x-0 top-0 h-4 bg-black/25 pointer-events-none z-10" />
            <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(rgba(0,0,0,1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,1)_1px,transparent_1px)] bg-[size:4px_4px] pointer-events-none" />

            {/* LCD Screen Status Bar header */}
            <div className="flex justify-between items-center text-[9px] border-b border-emerald-800/60 pb-1 z-10 select-none">
              <span>HP: {petHappiness < 40 ? '⚠️ HUNGRY' : '💪 FIT'}</span>
              <span className="animate-pulse">● LIVE</span>
              <span>XP: {profile.totalXp}</span>
            </div>

            {/* SPEECH AND CREATURE ACTIVE PORT */}
            <div className="flex-1 flex flex-col justify-center items-center py-4 relative z-10">
              
              {/* Pet accessories absolute orientation */}
              {equippedAccessory && (
                <div 
                  className="absolute top-4 left-1/2 -translate-x-1/2 text-2xl z-20 select-none animate-bounce"
                  title={`Equipped: ${equippedAccessory.name}`}
                >
                  {equippedAccessory.id === 'mortarboard' && '🎓'}
                  {equippedAccessory.id === 'glasses' && '👓'}
                  {equippedAccessory.id === 'espresso' && '☕'}
                  {equippedAccessory.id === 'manual' && '📘'}
                </div>
              )}

              {/* Speech bubble or Active thought banner */}
              <AnimatePresence>
                {speechBubbleOpen && activeQuote && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute top-1 left-2 right-2 bg-emerald-900/90 border border-emerald-600 rounded-lg p-2 text-[9.5px] text-emerald-200 leading-snug shadow-md select-text overflow-hidden text-left"
                  >
                    <div className="flex justify-between items-start gap-1">
                      <span className="flex-1">💬 &ldquo;{activeQuote}&rdquo;</span>
                      <button 
                        onClick={() => setSpeechBubbleOpen(false)}
                        className="text-emerald-400 hover:text-emerald-100 font-bold px-1 rounded hover:bg-emerald-800 text-[9px] cursor-pointer shrink-0"
                      >
                        ✕
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Feed/Interactivity dynamic sprite layer */}
              {feedEffect && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl z-30 animate-ping">
                  {feedEffect === 'heart' ? '❤️' : 
                   feedEffect === 'sparkle' ? '✨' : 
                   feedEffect === 'food' ? '🥗' : '🌟'}
                </div>
              )}

              {/* Standard Central Rounded Sprite Deck */}
              <button 
                onClick={handleInteractCompanion}
                className="w-24 h-24 bg-gradient-to-b from-emerald-900/40 to-emerald-900/80 rounded-full border-2 border-emerald-700/60 flex items-center justify-center text-5xl shadow-inner transition-transform relative select-none cursor-pointer hover:scale-105 active:scale-95 duration-150"
                title="Tap to Interactively Pet"
              >
                {/* Mood indicator bead */}
                <div className={`absolute top-1 right-2 w-2.5 h-2.5 rounded-full ${petHappiness >= 75 ? 'bg-teal-400' : 'bg-amber-400'} border border-emerald-950 shadow-inner`} />
                
                <div className={`transition-all duration-300 ${
                  petAnimationState === 'pulse' ? 'animate-pulse scale-110' :
                  petAnimationState === 'bouncing' ? 'animate-bounce' :
                  petAnimationState === 'spin' ? 'rotate-45 scale-105' :
                  petAnimationState === 'eating' ? 'animate-bounce scale-95 origin-bottom' :
                  petAnimationState === 'sleeping' ? 'opacity-40 translate-y-2' :
                  'hover:scale-110'
                }`}>
                  {getRenderEmoji()}
                </div>
              </button>

              {/* Stage specialized summary banner */}
              <span className="text-[10px] uppercase font-bold text-emerald-500/70 tracking-widest mt-2 block select-none">
                {currentTemplate.specialty}
              </span>
            </div>

            {/* Micro progress bar for growth */}
            <div className="space-y-1 z-10 select-none">
              <div className="flex justify-between text-[8px] text-emerald-400/80 font-mono">
                <span>CARE: {petHappiness}%</span>
                <span>LVL UP: {companionLevelProgress}%</span>
              </div>
              <div className="h-2 w-full bg-emerald-950 border border-emerald-800/60 rounded-full overflow-hidden p-0.5">
                <div 
                  className="h-full bg-emerald-400 rounded-full transition-all duration-700"
                  style={{ width: `${companionLevelProgress}%` }}
                />
              </div>
            </div>
          </div>

          {/* D-PAD and Action Button Physical Console Layout */}
          <div className="mt-5 grid grid-cols-12 gap-2 items-center select-none">
            
            {/* D-PAD CROSS CONTROLLER AREA */}
            <div className="col-span-5 flex justify-center items-center">
              <div className="relative w-20 h-20">
                <div className="absolute top-1/2 left-0 right-0 h-6 -translate-y-1/2 bg-stone-700 rounded-lg shadow-md border-y border-stone-800" />
                <div className="absolute left-1/2 top-0 bottom-0 w-6 -translate-x-1/2 bg-stone-700 rounded-lg shadow-md border-x border-stone-800" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 bg-stone-800 rounded-full z-10 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-stone-600" />
                </div>
                {/* Dpad buttons overlays */}
                <button 
                  onClick={hanceCycleSpecies}
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-6 z-20 cursor-pointer active:scale-90"
                  title="Cycle species up"
                />
                <button 
                  onClick={hanceCycleSpecies}
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-6 z-20 cursor-pointer active:scale-90"
                  title="Cycle species down"
                />
                <button 
                  onClick={hanceCycleSpecies}
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 z-20 cursor-pointer active:scale-90"
                  title="Cycle species left"
                />
                <button 
                  onClick={hanceCycleSpecies}
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 z-20 cursor-pointer active:scale-90"
                  title="Cycle species right"
                />
              </div>
            </div>

            {/* SPEAKER GRILLE vents detail */}
            <div className="col-span-3 flex flex-col gap-1 justify-center items-center rotate-12">
              <div className="w-8 h-1 bg-stone-400/50 rounded-full" />
              <div className="w-8 h-1 bg-stone-400/50 rounded-full" />
              <div className="w-8 h-1 bg-stone-400/50 rounded-full" />
            </div>

            {/* TACTILE GAME CONSOLE ROUND BUTTONS (A & B) */}
            <div className="col-span-4 flex gap-3 h-14 justify-end items-center rotate-[-10deg]">
              <div className="flex flex-col items-center">
                <button 
                  onClick={handleNapCompanion}
                  className="w-7 h-7 rounded-full bg-stone-700 border-2 border-stone-900 active:bg-stone-800 cursor-pointer flex items-center justify-center shadow-md active:translate-y-0.5 transition-all text-[8px] font-bold text-gray-300"
                  title="REST / SLP"
                >
                  💤
                </button>
                <span className="text-[7px] font-bold text-gray-500 mt-1 uppercase">B Button</span>
              </div>

              <div className="flex flex-col items-center">
                <button 
                  onClick={handleInteractCompanion}
                  className="w-9 h-9 rounded-full bg-red-600 border-2 border-red-800 active:bg-red-700 cursor-pointer flex items-center justify-center shadow-md active:translate-y-0.5 transition-all text-sm font-bold text-white"
                  title="PET COMPANION"
                >
                  👋
                </button>
                <span className="text-[7.5px] font-bold text-gray-500 mt-1 uppercase">A Button</span>
              </div>
            </div>
          </div>

          {/* Quick interactive parameters bar */}
          <div className="mt-4 border-t border-gray-300 pt-3 flex justify-between items-center text-xs text-gray-700">
            <div className="text-left font-sans">
              {isEditingName ? (
                <form onSubmit={handleRenameCompanion} className="flex gap-1 items-center">
                  <input
                    type="text"
                    required
                    maxLength={15}
                    value={customNameInput}
                    onChange={e => setCustomNameInput(e.target.value)}
                    placeholder="Set Name..."
                    className="bg-white border border-gray-300 rounded px-2 py-1 text-xs font-semibold outline-none w-24 text-gray-800"
                  />
                  <button type="submit" className="bg-[#2f4939] text-white px-2 py-1 rounded text-[9px] font-bold cursor-pointer hover:bg-emerald-900">
                    Done
                  </button>
                </form>
              ) : (
                <div className="flex items-center gap-1">
                  <strong className="text-xs text-stone-900 font-extrabold">{petName}</strong>
                  <button 
                    onClick={() => { setIsEditingName(true); setCustomNameInput(petName); }}
                    className="text-[9px] text-[#2f4939] hover:underline cursor-pointer bg-white px-1.5 py-0.5 rounded border border-gray-200"
                  >
                    Ren
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center gap-1 bg-white/50 border border-gray-200 px-1.5 py-0.5 rounded-lg">
              <span className="text-[9.5px] text-gray-400 uppercase font-bold mr-1">Switch:</span>
              <button 
                onClick={hanceCycleSpecies}
                className="text-[10px] text-[#2f4939] hover:underline font-bold flex items-center gap-0.5 cursor-pointer"
              >
                <ArrowLeftRight className="w-3 h-3 text-pine" /> Next
              </button>
            </div>
          </div>

        </div>

        {/* Dynamic configuration system interface panels */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            
            {/* Modular styled tabs navigator */}
            <div className="flex flex-wrap gap-1 bg-gray-50 border border-gray-200 p-1 rounded-xl">
              <button
                onClick={() => { setActiveTab2('interact'); setPurchaseError(''); setPurchaseSuccess(''); }}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition cursor-pointer flex items-center justify-center gap-2 ${
                  activeTab === 'interact'
                    ? 'bg-[#2f4939] text-white shadow-sm'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                <Gamepad2 className="w-3.5 h-3.5" />
                <span>Console Actions</span>
              </button>
              <button
                onClick={() => { setActiveTab2('shop'); setPurchaseError(''); setPurchaseSuccess(''); }}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition cursor-pointer flex items-center justify-center gap-2 ${
                  activeTab === 'shop'
                    ? 'bg-[#2f4939] text-white shadow-sm'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Shop &amp; Buffs</span>
              </button>
              <button
                onClick={() => { setActiveTab2('evolve'); setPurchaseError(''); setPurchaseSuccess(''); }}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition cursor-pointer flex items-center justify-center gap-2 ${
                  activeTab === 'evolve'
                    ? 'bg-[#2f4939] text-white shadow-sm'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                <Trophy className="w-3.5 h-3.5" />
                <span>Evolution Chart</span>
              </button>
            </div>

            {/* Notifications */}
            {purchaseSuccess && (
              <div className="p-3.5 bg-emerald-50 border border-emerald-150 text-emerald-800 text-xs rounded-xl font-medium leading-relaxed text-left flex items-start gap-2 animate-fadeIn">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{purchaseSuccess}</span>
              </div>
            )}
            {purchaseError && (
              <div className="p-3.5 bg-rose-50 border border-rose-150 text-rose-800 text-xs rounded-xl text-left flex items-start gap-2 font-medium">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{purchaseError}</span>
              </div>
            )}

            {/* TAB CONTENT: Interact */}
            {activeTab === 'interact' && (
              <div className="space-y-4 text-left animate-fadeIn">
                <div className="bg-amber-50/50 rounded-2xl p-4 border border-amber-100/60 space-y-3.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🍲</span>
                    <div>
                      <h4 className="text-xs font-extrabold text-amber-900 tracking-wider uppercase">Caloric Feeding Lab</h4>
                      <p className="text-[11px] text-amber-800/80 leading-relaxed">
                        Feeding companion draws from your available high-yield study XP achievements. A properly nourished pet stays high-energy and periodically drops vital board test answers!
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <button
                      onClick={() => handleFeedCompanion('snack')}
                      className="p-4 bg-white border border-gray-200 hover:border-emerald-300 rounded-xl transition text-left space-y-1 active:scale-95 cursor-pointer shadow-xs group"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-2xl group-hover:scale-125 transition-transform">🥬</span>
                        <span className="text-[8.5px] uppercase font-bold text-gray-500 bg-gray-150 px-2 py-0.5 rounded font-mono">15 XP</span>
                      </div>
                      <strong className="text-xs text-gray-800 block pt-1">Academic Protein Salad</strong>
                      <span className="text-[9.5px] text-gray-500 leading-normal block">Increases companion care state by 15 points.</span>
                    </button>

                    <button
                      onClick={() => handleFeedCompanion('boba')}
                      className="p-4 bg-white border border-gray-200 hover:border-emerald-300 rounded-xl transition text-left space-y-1 active:scale-95 cursor-pointer shadow-xs group"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-2xl group-hover:scale-125 transition-transform">🍵</span>
                        <span className="text-[8.5px] uppercase font-bold text-gray-500 bg-gray-150 px-2 py-0.5 rounded font-mono">35 XP</span>
                      </div>
                      <strong className="text-xs text-gray-800 block pt-1">DSM-5 Bubble Matcha</strong>
                      <span className="text-[9.5px] text-gray-500 leading-normal block">Greatly improves diagnostic mood stability (+40 Care).</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleInteractCompanion}
                    className="py-3 px-4 bg-emerald-50 hover:bg-[#2f4939] text-[#2f4939] hover:text-white border border-emerald-100 rounded-xl transition font-mono font-extrabold text-[10px] uppercase tracking-widest text-center cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <Smile className="w-4 h-4 text-emerald-600" />
                    Interact &amp; Pet
                  </button>

                  <button
                    onClick={triggerSpeech}
                    className="py-3 px-4 bg-white hover:bg-gray-50 text-gray-600 hover:text-pine border border-gray-200 rounded-xl transition font-mono font-extrabold text-[10px] uppercase tracking-widest text-center cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <BookOpen className="w-4 h-4 text-gray-400" />
                    Ask for Insight
                  </button>
                </div>
              </div>
            )}

            {/* TAB CONTENT: Shop */}
            {activeTab === 'shop' && (
              <div className="space-y-4 text-left animate-fadeIn">
                <div className="flex justify-between items-center text-[10.5px] font-mono tracking-wider font-bold text-gray-400 border-b border-gray-100 pb-2">
                  <span>UNLOCKED EXPERT BUFF GEAR</span>
                  <span>Wallet Balance: <strong className="text-pine font-black">{profile.totalXp} Achievements XP</strong></span>
                </div>

                <div className="space-y-2.5 max-h-[250px] overflow-y-auto pr-1">
                  {ACCESSORIES.map((acc) => {
                    const ownedList = profile.petAccessories || [];
                    const isOwned = ownedList.includes(acc.id);
                    const isEquipped = profile.activePetAccessory === acc.id;

                    return (
                      <div 
                        key={acc.id} 
                        className={`border rounded-xl p-3 flex items-center justify-between gap-3 transition ${
                          isEquipped 
                            ? 'bg-teal-50/50 border-teal-200 ring-2 ring-teal-100' 
                            : 'bg-white border-gray-150'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="text-2xl bg-gray-50 border border-gray-200 p-2 rounded-xl shrink-0 block">{acc.emoji}</span>
                          <div className="min-w-0">
                            <h5 className="text-xs font-black text-gray-850 flex items-center gap-2">
                              <span>{acc.name}</span>
                              {isOwned && (
                                <span className="text-[8px] uppercase tracking-wider bg-teal-50 text-teal-700 border border-teal-150 px-1.5 py-0.2 rounded font-mono font-black">
                                  Purchased
                                </span>
                              )}
                            </h5>
                            <p className="text-[10.5px] text-gray-500 leading-normal truncate">{acc.description}</p>
                            <span className="text-[10px] text-teal-800 font-extrabold block font-mono mt-0.5">{acc.buffLabel}</span>
                          </div>
                        </div>

                        {isOwned ? (
                          <button
                            onClick={() => handleEquipAccessory(acc.id)}
                            className={`px-3 py-1.5 text-[9px] uppercase tracking-widest font-mono font-black rounded-lg transition shrink-0 cursor-pointer ${
                              isEquipped 
                                ? 'bg-teal-800 text-white hover:bg-teal-900 border-b-2 border-teal-950' 
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-650'
                            }`}
                          >
                            {isEquipped ? 'Unequip' : 'Equip'}
                          </button>
                        ) : (
                          <button
                            onClick={() => buyAccessory(acc)}
                            disabled={profile.totalXp < acc.cost}
                            className="px-3 py-1.5 text-[10px] uppercase tracking-wider font-mono font-black bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition disabled:opacity-40 disabled:hover:bg-amber-500 cursor-pointer shrink-0 border-b-2 border-amber-700"
                          >
                            {acc.cost} XP
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB CONTENT: Evolution Map */}
            {activeTab === 'evolve' && (
              <div className="space-y-4 text-left animate-fadeIn">
                <div className="flex flex-col gap-2 p-4 bg-gray-50 border border-gray-150 rounded-2xl">
                  <h4 className="text-xs font-black text-gray-700 uppercase font-mono tracking-wider mb-1">Growth Stages Progression</h4>
                  <p className="text-[11px] text-gray-500 mb-3 leading-relaxed">
                    Gain Board XP by studying and responding to clinical vignettes. Every 200 XP levels up your pet companion. Level up milestones unlock specialized cognitive intelligence traits listed below:
                  </p>
                  
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { level: 1, title: 'Egg / Hatchling', xp: '0 - 199 XP', emoji: '🥚' },
                      { level: 2, title: 'Curious Toddler', xp: '200 - 399 XP', emoji: `${currentTemplate.emoji}🍼` },
                      { level: 3, title: 'Novice Scholar', xp: '400 - 799 XP', emoji: `${currentTemplate.emoji}📚` },
                      { level: 5, title: 'Certified Specialist', xp: '800 - 1399 XP', emoji: `${currentTemplate.emoji}🎓` },
                      { level: 8, title: 'Clinical Board Sage', xp: '1400+ XP', emoji: `${currentTemplate.emoji}🌟` }
                    ].map(stage => {
                      const isActive = companionLevel >= stage.level && (
                        stage.level === 8 ? true : 
                        companionLevel < (stage.level === 1 ? 2 : stage.level === 2 ? 3 : stage.level === 3 ? 5 : 8)
                      );
                      const isUnlocked = companionLevel >= stage.level;

                      return (
                        <div key={stage.level} className={`flex items-center justify-between p-3 rounded-xl border ${
                          isActive 
                            ? 'bg-emerald-50/50 border-emerald-200 ring-2 ring-emerald-100 shadow-xs' 
                            : isUnlocked ? 'bg-white border-gray-150' : 'bg-gray-50/30 border-gray-100 opacity-50'
                        }`}>
                          <div className="flex items-center gap-3">
                            <div className={`w-11 h-11 shrink-0 rounded-xl flex items-center justify-center text-sm tracking-tighter shadow-xs ${
                              isActive ? 'bg-emerald-100' : isUnlocked ? 'bg-gray-100' : 'bg-gray-100 grayscale'
                            }`}>
                              {stage.emoji}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className={`text-[12px] font-extrabold ${isActive ? 'text-emerald-950' : isUnlocked ? 'text-gray-800' : 'text-gray-400'}`}>
                                  Lvl {stage.level}+ &bull; {stage.title}
                                </span>
                                {isActive && <span className="text-[8px] uppercase font-mono font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200 animate-pulse">EVALUATED</span>}
                              </div>
                              <span className="text-[10px] text-gray-400 font-mono italic block">{stage.xp}</span>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Bottom active status banner */}
            <div className="border-t border-gray-150 pt-4 flex items-center gap-4 select-none font-sans text-left">
              <Award className="w-9 h-9 text-amber-500 shrink-0" />
              <div>
                <strong className="text-xs text-stone-800 block uppercase font-extrabold tracking-wide">ACTIVE PASSIVE STUDY BUNDLE REWARDS</strong>
                <p className="text-[10px] text-gray-500 leading-relaxed mt-0.5">
                  Unlock specialized pet diagnostic accessories and gear to initiate continuous, math-certified boosts to aid in topping national levels!
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
