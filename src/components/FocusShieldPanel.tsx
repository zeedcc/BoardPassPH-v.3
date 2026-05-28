import React, { useState, useEffect, useRef } from 'react';
import { Clock, ShieldAlert, Sparkles, CheckSquare, Play, Pause, RotateCcw, Volume2, Shield, Heart, AlertTriangle } from 'lucide-react';
import { UserProfile } from '../types';

interface FocusShieldPanelProps {
  profile: UserProfile;
  setProfile: (nextVal: React.SetStateAction<UserProfile | null>) => void;
  onNavigate: (tabId: string) => void;
}

type TimerMode = 'work' | 'shortBreak' | 'longBreak';

export const FocusShieldPanel: React.FC<FocusShieldPanelProps> = ({ profile, setProfile, onNavigate }) => {
  // Pomodoro timer states
  const [timerMode, setTimerMode] = useState<TimerMode>('work');
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  
  // Custom durations state
  const [customWorkMin, setCustomWorkMin] = useState(25);
  const [customBreakMin, setCustomBreakMin] = useState(5);

  // Allowlist & Focus Shield states
  const [isShieldActive, setIsShieldActive] = useState(false);
  const [breachCount, setBreachCount] = useState(0);
  const [focusFocusTask, setFocusFocusTask] = useState('DSM-5 Differential Diagnosis study');
  const [showBreachModal, setShowBreachModal] = useState(false);

  // Refs
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Allowed pages internally
  const ALLOWED_INTERNAL_APPS = [
    { id: 'practice', name: '✏️ Practice Room Testing', desc: 'Solve randomized clinical vignettes with Gemini' },
    { id: 'mock', name: '🏆 Simulated Board Exams', desc: 'Participate in official length simulated assessment decks' },
    { id: 'library', name: '📚 Drug & Assessment Encyclopedia', desc: 'Browse critical parameters, developers, and classifications' },
    { id: 'tos', name: '📋 Official PRC TOS Syllabus Tracker', desc: 'Track your competency completion coordinates' },
    { id: 'bulletin', name: '📢 PRC Board Direct News Feed', desc: 'Check updates regarding exam registration and protocols' }
  ];

  // Tick down timer
  useEffect(() => {
    if (isActive) {
      timerIntervalRef.current = setInterval(() => {
        if (seconds > 0) {
          setSeconds(prev => prev - 1);
        } else if (seconds === 0) {
          if (minutes > 0) {
            setMinutes(prev => prev - 1);
            setSeconds(59);
          } else {
            // Timer expired!
            clearInterval(timerIntervalRef.current!);
            setIsActive(false);
            handleTimerComplete();
          }
        }
      }, 1000);
    } else {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [isActive, minutes, seconds]);

  // Adjust timers on mode shifts
  useEffect(() => {
    resetTimerToMode(timerMode);
  }, [timerMode, customWorkMin, customBreakMin]);

  const resetTimerToMode = (mode: TimerMode) => {
    setIsActive(false);
    setSeconds(0);
    if (mode === 'work') {
      setMinutes(customWorkMin);
    } else if (mode === 'shortBreak') {
      setMinutes(customBreakMin);
    } else {
      setMinutes(15);
    }
  };

  const handleTimerComplete = () => {
    // Play HTML5 sound chime (simulated or real standard buzzer via audio synthetic api)
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.6);
    } catch (e) {
      // safe fallback
    }

    if (timerMode === 'work') {
      // Award XP
      const xpReward = 20;
      setProfile(prev => {
        if (!prev) return prev;
        const updated = {
          ...prev,
          totalXp: prev.totalXp + xpReward
        };
        localStorage.setItem(`bp_profile_${prev.email}`, JSON.stringify(updated));
        return updated;
      });
      alert(`⏱️ Focus session ended successfully! You earned +20 XP for maintaining your concentration. Best of luck on the upcoming board exam!`);
      setTimerMode('shortBreak');
    } else {
      alert(`⏱️ Break concluded. Ready to start your next focus session?`);
      setTimerMode('work');
    }
  };

  // Window Focusdrift detection
  useEffect(() => {
    const handleWindowBlur = () => {
      if (isShieldActive) {
        // Drifted!
        setBreachCount(prev => prev + 1);
        setShowBreachModal(true);

        // Play warning buzzing note
        try {
          const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(150, audioCtx.currentTime); 
          gain.gain.setValueAtTime(0.4, audioCtx.currentTime);
          osc.start();
          osc.stop(audioCtx.currentTime + 0.5);
        } catch (e) {
          // safe trigger
        }

        // Deduct 5 XP as penalty coordinates
        setProfile(prev => {
          if (!prev) return prev;
          const updatedXp = Math.max(0, prev.totalXp - 5);
          const updated = {
            ...prev,
            totalXp: updatedXp
          };
          localStorage.setItem(`bp_profile_${prev.email}`, JSON.stringify(updated));
          return updated;
        });
      }
    };

    window.addEventListener('blur', handleWindowBlur);
    return () => {
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, [isShieldActive]);

  const progressTotalSeconds = timerMode === 'work' 
    ? customWorkMin * 60 
    : timerMode === 'shortBreak' 
      ? customBreakMin * 60 
      : 15 * 60;

  const currentRemainingSeconds = (minutes * 60) + seconds;
  const progressRatio = Math.max(0, Math.min(1, currentRemainingSeconds / progressTotalSeconds));
  const circleOffset = 2 * Math.PI * 52 * (1 - progressRatio);

  return (
    <div id="focus-shield-workspace" className="space-y-6 select-none animate-in fade-in duration-200">
      
      {/* Alert modal on tab blur */}
      {showBreachModal && (
        <div className="fixed inset-0 bg-teal-980/85 z-55 flex items-center justify-center p-4">
          <div className="bg-white border-2 border-rose-500 rounded-3xl p-6 md:p-8 max-w-sm w-full space-y-4 shadow-2xl animate-bounce-short">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center text-rose-600 border border-rose-200">
                <ShieldAlert className="w-8 h-8" />
              </div>
            </div>
            <div className="text-center space-y-1">
              <h3 className="font-display text-lg font-black text-rose-700 uppercase tracking-tight">Focus Shield Breached!</h3>
              <p className="text-[11px] font-mono font-black uppercase text-gray-400">Attention drift detected</p>
            </div>
            <div className="bg-rose-50 border border-rose-100 p-4 rounded-xl text-xs text-rose-950 font-sans leading-relaxed text-center">
              Our clinical safety sentinel indicates you drifted away from the BoardPassPH application. 
              To discourage diagnostic laziness, <strong className="text-rose-700 font-bold">-5 XP</strong> has been deducted from your profile balance. Stay strong!
            </div>
            <button
              onClick={() => setShowBreachModal(false)}
              className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-[#ffffff] font-mono text-[10px] font-black uppercase tracking-widest rounded-xl transition cursor-pointer"
            >
              Understand &amp; Resume Shielding
            </button>
          </div>
        </div>
      )}

      {/* Main Focus Shield Intro */}
      <div className="bg-white border border-gray-150 rounded-3xl p-6 shadow-xs relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.015] bg-[radial-gradient(#104030_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="space-y-1.5 max-w-xl text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] uppercase font-black tracking-widest text-[#104030] bg-[#deebe3] border border-emerald-250/30 font-mono">
              <Shield className="w-3.5 h-3.5 text-pine" />
              Interactive Distraction Locker
            </span>
            <h2 className="font-display text-2xl text-pine tracking-tight">
              Clinical Space Shield &amp; Pomodoro Timer
            </h2>
            <p className="text-xs text-gray-500 leading-normal font-sans font-medium">
              Activate the ultimate study environment with integrated Pomodoro cycles. Enabling the <strong className="text-[#a51c30]">Clinical Focus Shield</strong> will capture tab-switching drifts and lock unallowed browsing behaviors with dynamic feedback.
            </p>
          </div>

          {/* Active status */}
          <div className="flex-shrink-0">
            {isShieldActive ? (
              <div className="flex items-center gap-2.5 bg-rose-50 border border-rose-200 px-5 py-3 rounded-2xl">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping shrink-0" />
                <div className="text-left font-mono">
                  <span className="block text-[8px] uppercase tracking-wider font-extrabold text-rose-500 leading-none">SHIELD LOCK ON</span>
                  <span className="text-[10px] font-black text-rose-800 uppercase leading-tight pr-1">Tab switching penalized</span>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2.5 bg-teal-50 border border-teal-200 px-5 py-3 rounded-2xl">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                <div className="text-left font-mono">
                  <span className="block text-[8px] uppercase tracking-wider font-extrabold text-[#2e5e41] leading-none">SHIELD LAZY</span>
                  <span className="text-[10px] font-black text-teal-900 uppercase leading-tight">No focus penalty active</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Pomodoro module column */}
        <div className="lg:col-span-8 bg-white border border-gray-150 p-6 rounded-2xl shadow-xs flex flex-col justify-between space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-100 pb-4 gap-3">
            <h4 className="font-heading font-black text-xs text-gray-500 uppercase tracking-widest flex items-center gap-1.5 font-mono">
              <Clock className="w-4 h-4 text-pine" />
              Interactive Clinical Cycle Tracker
            </h4>
            
            {/* Mode swapper pills */}
            <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-100 font-mono text-[9px] font-black uppercase tracking-wider gap-1">
              <button
                onClick={() => setTimerMode('work')}
                className={`px-3 py-1.5 rounded-lg transition duration-150 cursor-pointer ${
                  timerMode === 'work' ? 'bg-pine text-[#fbfdfb] font-black shadow-xs' : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                Focus Work
              </button>
              <button
                onClick={() => setTimerMode('shortBreak')}
                className={`px-3 py-1.5 rounded-lg transition duration-150 cursor-pointer ${
                  timerMode === 'shortBreak' ? 'bg-pine text-[#fbfdfb] font-black shadow-xs' : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                Short Break
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Timer circle representation */}
            <div className="md:col-span-5 flex justify-center py-4">
              <div className="relative w-44 h-44 flex items-center justify-center">
                {/* SVG path rings */}
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="88"
                    cy="88"
                    r="52"
                    className="stroke-gray-100 fill-none"
                    strokeWidth="8"
                  />
                  <circle
                    cx="88"
                    cy="88"
                    r="52"
                    className="stroke-pine fill-none transition-all duration-300"
                    strokeWidth="8"
                    strokeDasharray={2 * Math.PI * 52}
                    strokeDashoffset={circleOffset}
                    strokeLinecap="round"
                  />
                </svg>
                {/* Inner time text rendering */}
                <div className="absolute text-center select-none">
                  <span className="font-display font-black text-3xl text-teal-980 tracking-tighter block leading-none">
                    {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
                  </span>
                  <span className="text-[9px] font-mono uppercase tracking-widest font-extrabold text-gray-400 mt-1 block">
                    {timerMode === 'work' ? 'focusing' : 'break time'}
                  </span>
                </div>
              </div>
            </div>

            {/* Custom configuration details */}
            <div className="md:col-span-7 space-y-4">
              <div className="space-y-1">
                <span className="text-[8.5px] uppercase font-black text-gray-400 block font-mono">Current Clinical Mission:</span>
                <input
                  type="text"
                  value={focusFocusTask}
                  onChange={e => setFocusFocusTask(e.target.value)}
                  placeholder="Task definition (vignette focus, abnormal chapters etc)"
                  className="w-full bg-white border border-gray-200 text-xs font-semibold py-2 px-3 rounded-lg outline-none focus:border-sage"
                />
              </div>

              {/* Adjust intervals */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="space-y-1">
                  <label className="text-[8.5px] uppercase font-black text-gray-400 block font-mono">Work Min:</label>
                  <input
                    type="number"
                    min="1"
                    max="120"
                    value={customWorkMin}
                    onChange={e => {
                      const m = Math.max(1, parseInt(e.target.value) || 1);
                      setCustomWorkMin(m);
                    }}
                    className="w-full bg-white border border-gray-200 text-xs font-semibold py-2 px-2.5 rounded-lg outline-none focus:border-sage"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[8.5px] uppercase font-black text-gray-400 block font-mono">Break Min:</label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={customBreakMin}
                    onChange={e => {
                      const m = Math.max(1, parseInt(e.target.value) || 1);
                      setCustomBreakMin(m);
                    }}
                    className="w-full bg-white border border-gray-200 text-xs font-semibold py-2 px-2.5 rounded-lg outline-none focus:border-sage"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2.5 pt-2">
                <button
                  onClick={() => setIsActive(!isActive)}
                  className={`flex-1 py-2.5 rounded-xl text-[10px] font-mono font-black uppercase tracking-wider transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs border-b-2 active:scale-95 ${
                    isActive 
                      ? 'bg-amber-500 hover:bg-amber-600 text-white border-amber-600' 
                      : 'bg-pine hover:bg-pine-mid text-cream border-pine-mid'
                  }`}
                >
                  {isActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-cream" />}
                  <span>{isActive ? 'Pause' : 'Start Focus'}</span>
                </button>
                <button
                  onClick={() => resetTimerToMode(timerMode)}
                  className="py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-600 border border-gray-200 rounded-xl transition duration-150 cursor-pointer active:scale-95"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

          <div className="bg-foam/25 border border-pine/5 p-4 rounded-xl text-[10.5px] text-gray-500 leading-normal leading-relaxed font-sans font-medium flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5 animate-pulse" />
            <div>
              <strong className="text-pine font-semibold block mb-0.5 uppercase text-[9px] tracking-wider font-mono">Concentration Bonus Reward:</strong>
              Maintained focus work cycles award +20 XP. Activating the "Focus Shield" protects you from visual and online disruptions, ensuring absolute preparedness on board examinations.
            </div>
          </div>
        </div>

        {/* Allowlist column */}
        <div className="lg:col-span-4 bg-teal-950/95 border border-teal-800 text-cream p-5 rounded-2xl shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="space-y-1 pb-3 border-b border-teal-800/40">
              <h4 className="text-xs font-black uppercase tracking-widest font-mono flex items-center gap-1.5 text-mint">
                <Shield className="w-4 h-4 text-amber-500 animate-pulse" />
                Clinician Focus Shield
              </h4>
              <p className="text-[10px] text-teal-200/70 font-mono">
                Simulates real-world app blockades to restrict external visual distractions.
              </p>
            </div>

            {/* Toggle Shield check */}
            <div className="bg-teal-900/60 p-4 rounded-xl border border-teal-800/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-black font-mono text-white tracking-wider">
                  Shield Lock Switch
                </span>
                <label className="relative inline-flex items-center cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    checked={isShieldActive}
                    onChange={(e) => {
                      setIsShieldActive(e.target.checked);
                      if (e.target.checked) setBreachCount(0);
                    }}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-teal-980/70 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                </label>
              </div>

              <div className="text-[10px] text-teal-200/80 leading-relaxed font-sans font-medium">
                {isShieldActive ? (
                  <span className="text-amber-300 font-bold block">
                    ⚡ SHIELD SYSTEM ONLINE! Drifting off this browser tab triggers immediate warning panels and deducts -5 XP dynamically. Keep focused!
                  </span>
                ) : (
                  <span>
                    No attention monitoring is active. Slide toggle above to test your cognitive resilience with tab focus validation.
                  </span>
                )}
              </div>
            </div>

            {/* Allowed tools list */}
            <div className="space-y-2">
              <span className="text-[9px] uppercase font-black text-teal-300 tracking-widest font-mono block">
                Allowed Portal Resources:
              </span>
              <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                {ALLOWED_INTERNAL_APPS.map((app) => (
                  <div 
                    key={app.id}
                    onClick={() => {
                      if (isShieldActive) {
                        // Let them access allowed screens instantly!
                        onNavigate(app.id);
                      } else {
                        onNavigate(app.id);
                      }
                    }}
                    className="p-2.5 bg-teal-900/30 hover:bg-teal-900/60 border border-teal-850 rounded-xl transition duration-150 flex items-start gap-2 cursor-pointer"
                  >
                    <div className="space-y-0.5">
                      <span className="text-[11px] font-black text-white block hover:underline">{app.name}</span>
                      <p className="text-[9.5px] text-teal-200/60 leading-tight">{app.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-teal-850 pt-4 flex justify-between items-center text-[10px] font-mono text-teal-200/60">
            <span>🛡️ Attention Blocker Simulator</span>
            {isShieldActive && (
              <span className="text-amber-300 font-bold">Breached: {breachCount} times</span>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
