import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Briefcase, FolderOpen, ChevronRight, FileText, CheckCircle2, 
  HelpCircle, Award, Volume2, Bookmark, BookOpen, Clock, AlertTriangle, 
  RotateCcw, Sparkles, User, GraduationCap, ArrowRight, ShieldCheck, HelpCircle as HelpIcon, Lock
} from 'lucide-react';
import { CASE_STUDIES, CaseStudy, CaseQuestion } from '../data/caseStudies';
import { UserProfile } from '../types';

interface CaseStudySimulatorProps {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
}

export const CaseStudySimulator: React.FC<CaseStudySimulatorProps> = ({ profile, setProfile }) => {
  // Solved cases track via localStorage under user specific email
  const solvedStorageKey = `bp_solved_cases_${profile.email}`;
  const [solvedCaseIds, setSolvedCaseIds] = useState<string[]>([]);

  // Load solved cases on startup
  useEffect(() => {
    try {
      const saved = localStorage.getItem(solvedStorageKey);
      if (saved) {
        setSolvedCaseIds(JSON.parse(saved));
      } else {
        setSolvedCaseIds([]);
      }
    } catch (e) {
      console.error('Error loading solved cases', e);
    }
  }, [profile.email, solvedStorageKey]);

  // Selected active case structure
  const [activeCaseId, setActiveCaseId] = useState<string | null>(null);
  
  // Inside the active case: active dossier page tab
  const [dossierTab, setDossierTab] = useState<'intake' | 'behavior' | 'battery' | 'formulate'>('intake');
  
  // Current formulation phase progress (0, 1, 2, or 3 corresponding to phase 1, 2, 3, 4)
  const [currentPhaseIdx, setCurrentPhaseIdx] = useState<number>(0);
  
  // Interactive formulation state
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [phaseSubmitted, setPhaseSubmitted] = useState<boolean>(false);
  const [phaseIsCorrect, setPhaseIsCorrect] = useState<boolean | null>(null);
  const [attempts, setAttempts] = useState<number>(0);
  
  // Show beautiful case celebration screen upon completing all phases of a case
  const [showCaseCelebrate, setShowCaseCelebrate] = useState<boolean>(false);
  const [xpAwarded, setXpAwarded] = useState<number>(0);

  // Filter cases: 'all', 'unsolved', 'solved'
  const [filterMode, setFilterMode] = useState<'all' | 'unsolved' | 'solved'>('unsolved');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');

  const activeCase = useMemo(() => {
    return CASE_STUDIES.find(c => c.id === activeCaseId) || null;
  }, [activeCaseId]);

  // Read filtered cases (strictly "do not repeat cases" can prioritize the unsolved ones)
  const filteredCases = useMemo(() => {
    return CASE_STUDIES.filter(c => {
      const isSolved = solvedCaseIds.includes(c.id);
      
      // Filter by solved/unsolved
      if (filterMode === 'unsolved' && isSolved) return false;
      if (filterMode === 'solved' && !isSolved) return false;
      
      // Filter by subject
      if (selectedSubject !== 'all' && c.subject !== selectedSubject) return false;
      
      return true;
    });
  }, [solvedCaseIds, filterMode, selectedSubject]);

  // Launch a case
  const startCase = (caseObj: CaseStudy) => {
    setActiveCaseId(caseObj.id);
    setDossierTab('intake'); // Always start with intake
    setCurrentPhaseIdx(0);  // Phase 1
    setSelectedOption(null);
    setPhaseSubmitted(false);
    setPhaseIsCorrect(null);
    setAttempts(0);
    setShowCaseCelebrate(false);
  };

  // Close active case and go back to roster
  const exitCaseBoard = () => {
    setActiveCaseId(null);
    setShowCaseCelebrate(false);
  };

  // Handle Formulation submission
  const handleOptionSelect = (index: number) => {
    if (phaseSubmitted) return; // Answer locked
    setSelectedOption(index);
  };

  const submitPhaseAnswer = () => {
    if (selectedOption === null || activeCase === null) return;

    const currentQuestion = activeCase.phases[currentPhaseIdx];
    const isCorrect = selectedOption === currentQuestion.correctIndex;

    setPhaseIsCorrect(isCorrect);
    setPhaseSubmitted(true);
    setAttempts(prev => prev + 1);

    // If incorrect, prompt retry. If correct, let them view reasoning before moving forward
  };

  const handleNextPhase = () => {
    if (!activeCase) return;

    if (currentPhaseIdx < activeCase.phases.length - 1) {
      // Advance to next formulation chapter stage
      setCurrentPhaseIdx(prev => prev + 1);
      setSelectedOption(null);
      setPhaseSubmitted(false);
      setPhaseIsCorrect(null);
      setAttempts(0);
    } else {
      // Completed last phase! Complete Case Study celebration!
      handleCompleteCase();
    }
  };

  const handleRetryPhase = () => {
    setSelectedOption(null);
    setPhaseSubmitted(false);
    setPhaseIsCorrect(null);
  };

  const handleCompleteCase = () => {
    if (!activeCase) return;

    const isNewSolve = !solvedCaseIds.includes(activeCase.id);
    const reward = isNewSolve ? activeCase.completedXpReward : Math.round(activeCase.completedXpReward * 0.2); // 20% on repeat solves

    setXpAwarded(reward);
    setShowCaseCelebrate(true);

    if (isNewSolve) {
      const updatedSolved = [...solvedCaseIds, activeCase.id];
      setSolvedCaseIds(updatedSolved);
      localStorage.setItem(solvedStorageKey, JSON.stringify(updatedSolved));
    }

    // Allocate User Study XP and updates Profile globally
    setProfile(prev => {
      const nextXp = prev.totalXp + reward;
      const nextCorrect = prev.correct + 4; // Add 4 clinical formulations to profile metrics
      const nextAttempts = prev.attempts + 4;
      const updated = {
        ...prev,
        totalXp: nextXp,
        correct: nextCorrect,
        attempts: nextAttempts
      };
      // Save profile immediately to local storage
      localStorage.setItem(`bp_profile_${prev.email}`, JSON.stringify(updated));
      return updated;
    });
  };

  const handleResetAppCases = () => {
    if (window.confirm("Do you want to reset your clinical case history? This will allow you to re-solve all premium vignettes as fresh encounters!")) {
      localStorage.removeItem(solvedStorageKey);
      setSolvedCaseIds([]);
      setFilterMode('unsolved');
      setPurchaseSuccess("🔄 Case study history reset successfully! All scenarios are now available for initial full XP value rewards.");
      setTimeout(() => setPurchaseSuccess(''), 4000);
    }
  };

  const [purchaseSuccess, setPurchaseSuccess] = useState('');

  return (
    <div className="space-y-6" id="caseStudySimulator">
      
      {/* Header card banner */}
      <div className="bg-gradient-to-r from-[#1B3518] to-pine-mid text-white rounded-3xl p-6 relative overflow-hidden shadow-md select-none text-left">
        <div className="absolute inset-x-0 bottom-0 h-1 bg-[#E5526C]" />
        <div className="absolute -right-10 -bottom-10 opacity-[0.06] transform rotate-12 pointer-events-none">
          <GraduationCap className="w-64 h-64" />
        </div>

        <div className="relative z-10 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[9px] uppercase font-black tracking-widest font-mono bg-emerald-500/20 border border-emerald-500/30 text-[#a8f5cf] px-2.5 py-0.5 rounded-full">
              ⚡ INTENSIVE REVIEW ADDON (FEATURE 2)
            </span>
            <span className="text-[9px] uppercase font-black tracking-widest font-mono bg-amber-500/20 border border-amber-500/30 text-amber-200 px-2.5 py-0.5 rounded-full">
              No Repeats Guaranteed
            </span>
          </div>
          <h2 className="font-heading font-black text-2xl tracking-tight uppercase">
            Intensive Clinical Case Study Board Simulator
          </h2>
          <p className="text-xs text-emerald-200/90 font-sans max-w-2xl leading-relaxed">
            Translate academic theories into diagnostic competencies. Experience realistic Philippine PmLE level client intakes, psychometric indices, and differential formulations. Unsolved cases are selected automatically with no prior scenario repetitions!
          </p>
        </div>
      </div>

      {activeCaseId === null ? (
        // CASE ROSTER SCREEN
        <>
          {/* Controls Bar */}
          <div className="bg-white border border-gray-150 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between select-none">
            
            {/* Filter Toggle tabs */}
            <div className="flex gap-1.5 p-1 bg-gray-50 border border-gray-150 rounded-xl w-full md:w-auto">
              <button
                onClick={() => setFilterMode('unsolved')}
                className={`flex-1 md:flex-none px-4 py-1.5 rounded-lg text-xs font-bold font-mono transition cursor-pointer text-center ${
                  filterMode === 'unsolved'
                    ? 'bg-white text-pine shadow-xs border border-gray-100'
                    : 'text-gray-400 hover:text-gray-700'
                }`}
              >
                📂 Unsolved Cases ({CASE_STUDIES.filter(c => !solvedCaseIds.includes(c.id)).length})
              </button>
              <button
                onClick={() => setFilterMode('solved')}
                className={`flex-1 md:flex-none px-4 py-1.5 rounded-lg text-xs font-bold font-mono transition cursor-pointer text-center ${
                  filterMode === 'solved'
                    ? 'bg-white text-pine shadow-xs border border-gray-100'
                    : 'text-gray-400 hover:text-gray-700'
                }`}
              >
                ✅ Solved Log ({solvedCaseIds.length})
              </button>
              <button
                onClick={() => setFilterMode('all')}
                className={`flex-1 md:flex-none px-4 py-1.5 rounded-lg text-xs font-bold font-mono transition cursor-pointer text-center ${
                  filterMode === 'all'
                    ? 'bg-white text-pine shadow-xs border border-gray-100'
                    : 'text-gray-400 hover:text-gray-700'
                }`}
              >
                🔍 View All ({CASE_STUDIES.length})
              </button>
            </div>

            {/* Subject Selector dropdown */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-mono font-bold text-gray-750 outline-none focus:bg-white focus:border-pine cursor-pointer w-full md:w-56"
              >
                <option value="all">All Board Subject Areas</option>
                <option value="Abnormal Psychology">Abnormal Psychology / Clinical</option>
                <option value="Psychological Assessment">Psychological Assessment</option>
                <option value="Theories of Personality">Theories of Personality</option>
                <option value="Industrial-Organizational">Industrial-Organizational</option>
              </select>

              {solvedCaseIds.length > 0 && (
                <button
                  onClick={handleResetAppCases}
                  className="px-3 py-2 bg-rose-50 text-rose-700 hover:bg-rose-100 active:scale-95 text-[10.5px] font-mono font-bold rounded-xl transition shrink-0 cursor-pointer border border-rose-100 flex items-center gap-1.5"
                  title="Clear all completed cases from history"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset History
                </button>
              )}
            </div>
          </div>

          {purchaseSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-150 text-emerald-800 text-xs rounded-xl font-medium text-left">
              {purchaseSuccess}
            </div>
          )}

          {/* Cases grid roster */}
          {filteredCases.length === 0 ? (
            <div className="bg-white border border-gray-150 rounded-2xl p-12 text-center shadow-sm">
              <FolderOpen className="w-12 h-12 text-gray-300 mx-auto stroke-[1.5]" />
              <h3 className="text-sm font-bold text-gray-800 mt-4 uppercase">No Cases Available in Filter</h3>
              <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto">
                {filterMode === 'unsolved' 
                  ? "🎉 outstanding work! You have successfully completed every single intensive case study scenario in our board vault!" 
                  : "Go solve some cases to build your BoardPassPH portfolio database!"}
              </p>
              {filterMode === 'unsolved' && solvedCaseIds.length > 0 && (
                <button
                  onClick={handleResetAppCases}
                  className="mt-4 px-4 py-2 bg-pine text-white text-xs font-mono font-bold rounded-xl hover:bg-[#13271c] cursor-pointer"
                >
                  Reset History &amp; Replay Cases
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCases.map((cs) => {
                const isSolved = solvedCaseIds.includes(cs.id);
                // Assign beautiful badges per subject
                let subjectBg = 'bg-teal-50 border-teal-200 text-teal-800';
                if (cs.subject === 'Psychological Assessment') subjectBg = 'bg-indigo-50 border-indigo-200 text-indigo-800';
                if (cs.subject === 'Theories of Personality') subjectBg = 'bg-amber-50 border-amber-200 text-amber-800';
                if (cs.subject === 'Industrial-Organizational') subjectBg = 'bg-rose-50 border-rose-200 text-rose-800';

                return (
                  <div
                    key={cs.id}
                    className="bg-white border border-gray-150 rounded-2xl p-5 shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between items-stretch relative group text-left"
                  >
                    {isSolved && (
                      <div className="absolute top-4 right-4 text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full text-[8.5px] font-mono font-black uppercase flex items-center gap-1 select-none">
                        <CheckCircle2 className="w-3 h-3 fill-current" /> Solved
                      </div>
                    )}

                    <div className="space-y-3.5">
                      {/* Top tags */}
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className={`text-[8px] uppercase tracking-wider font-extrabold font-mono px-2 py-0.5 border rounded-full ${subjectBg}`}>
                          {cs.subject}
                        </span>
                        <span className="text-[8px] uppercase tracking-wider font-extrabold font-mono px-2 py-0.5 bg-gray-50 border border-gray-150 text-gray-500 rounded-full">
                          {cs.difficulty}
                        </span>
                      </div>

                      {/* Title */}
                      <div>
                        <h4 className="text-[13px] font-black text-gray-900 group-hover:text-pine transition leading-normal font-sans uppercase">
                          {cs.title}
                        </h4>
                        <div className="text-[11px] text-gray-400 mt-1 font-mono">
                          Client Profile: {cs.clientName} ({cs.gender}, {cs.age}yo)
                        </div>
                      </div>

                      {/* Snippet */}
                      <p className="text-[11px] text-gray-500 line-clamp-3 leading-relaxed font-sans mt-1">
                        <strong>Brief Complaint:</strong> &ldquo;{cs.chiefComplaint.split('"')?.[1] || cs.chiefComplaint}&rdquo;
                      </p>
                    </div>

                    {/* Footer entry and XP rewards */}
                    <div className="border-t border-gray-100 pt-3.5 mt-4 flex items-center justify-between select-none">
                      <div className="text-left font-mono leading-none">
                        <span className="text-[8px] uppercase tracking-widest text-gray-400 block">Review Reward</span>
                        <span className="text-xs font-bold text-emerald-700 block mt-0.5">💰 +{cs.completedXpReward} XP</span>
                      </div>

                      <button
                        onClick={() => startCase(cs)}
                        className="px-3.5 py-1.5 bg-[#deebe3] text-teal-900 hover:bg-pine hover:text-white rounded-xl text-xs font-mono font-bold tracking-tight transition active:scale-95 cursor-pointer flex items-center gap-1"
                      >
                        {isSolved ? 'Replay Case' : 'Formulate Clinical Case'}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      ) : (
        // ACTIVE CASE VIEWPORT (Dossier Mode)
        <div className="bg-white border border-gray-150 rounded-3xl overflow-hidden shadow-sm flex flex-col items-stretch text-left">
          
          {/* Top Dossier Title strip */}
          <div className="bg-[#13271c] px-6 py-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b-2 border-emerald-600 select-none text-cream">
            <div className="text-left space-y-1">
              <div className="flex items-center gap-2">
                <button 
                  onClick={exitCaseBoard}
                  className="text-[10px] uppercase font-bold text-gray-300 hover:text-white hover:underline font-mono px-2 py-0.5 bg-white/5 rounded transition-all"
                >
                  ◀ Exit Board
                </button>
                <span className="text-[9px] uppercase font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2 py-0.5 rounded font-mono">
                  {activeCase.id}
                </span>
              </div>
              <h3 className="font-heading font-black text-white text-base font-sans uppercase tracking-tight mt-1.5 flex items-center gap-2">
                <FolderOpen className="w-5 h-5 text-emerald-400" />
                {activeCase.title}
              </h3>
            </div>

            {/* Study Progress trackers */}
            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="text-right leading-none">
                <span className="text-[8px] uppercase tracking-widest text-emerald-400 block">Formulation Progress</span>
                <span className="text-cream font-bold mt-1 block">
                  Stage {currentPhaseIdx + 1} of {activeCase.phases.length}
                </span>
              </div>

              {/* Graphical Stage tracker progress circles */}
              <div className="flex gap-1.5">
                {activeCase.phases.map((ph, idx) => {
                  const isActive = idx === currentPhaseIdx;
                  const isCompleted = idx < currentPhaseIdx;
                  const isPending = idx > currentPhaseIdx;
                  
                  let circleStyle = 'bg-teal-900/30 border-teal-800 text-teal-400';
                  if (isActive) circleStyle = 'bg-amber-500 border-amber-400 text-white animate-pulse';
                  if (isCompleted) circleStyle = 'bg-emerald-600 border-emerald-500 text-white';

                  return (
                    <div 
                      key={idx}
                      className={`w-5 h-5 border rounded-full flex items-center justify-center text-[10px] font-black font-mono select-none ${circleStyle}`}
                      title={`Phase ${ph.phase}: ${ph.title}`}
                    >
                      {isCompleted ? '✓' : ph.phase}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Clinician's Dossier folder layout tabs navigation inside report */}
          <div className="bg-gray-50 border-b border-gray-150 px-5 pt-3.5 flex flex-wrap gap-2 select-none">
            
            <button
              onClick={() => setDossierTab('intake')}
              className={`px-4 py-2 border-b-2 font-mono text-[10.5px] uppercase font-black tracking-tight transition duration-150 cursor-pointer ${
                dossierTab === 'intake'
                  ? 'border-pine text-pine font-extrabold bg-white'
                  : 'border-transparent text-gray-400 hover:text-gray-700'
              }`}
            >
              👤 Client Intake &amp; Referral
            </button>

            <button
              onClick={() => setDossierTab('behavior')}
              className={`px-4 py-2 border-b-2 font-mono text-[10.5px] uppercase font-black tracking-tight transition duration-150 cursor-pointer ${
                dossierTab === 'behavior'
                  ? 'border-pine text-pine font-extrabold bg-white'
                  : 'border-transparent text-gray-400 hover:text-gray-700'
              }`}
            >
              🧠 Observational History
            </button>

            <button
              onClick={() => setDossierTab('battery')}
              className={`px-4 py-2 border-b-2 font-mono text-[10.5px] uppercase font-black tracking-tight transition duration-150 cursor-pointer ${
                dossierTab === 'battery'
                  ? 'border-pine text-pine font-extrabold bg-white'
                  : 'border-transparent text-gray-400 hover:text-gray-700'
              }`}
            >
              📊 Test Battery Indicators
            </button>

            <button
              onClick={() => setDossierTab('formulate')}
              className={`px-4 py-2 border-b-2 font-mono text-[10.5px] uppercase font-black tracking-tight transition duration-150 cursor-pointer relative ${
                dossierTab === 'formulate'
                  ? 'border-pine text-pine font-extrabold bg-white'
                  : 'border-transparent text-amber-700 hover:text-amber-900 bg-amber-500/5 hover:bg-amber-500/10 rounded-t-lg'
              }`}
            >
              ✍️ Formulation Board
              <span className="absolute -top-1.5 -right-1 bg-amber-500 text-white text-[7.5px] px-1 rounded-full font-black animate-bounce shrink-0">
                Quiz
              </span>
            </button>
          </div>

          {/* Dossier contents space inside folder */}
          <div className="p-6">
            
            {showCaseCelebrate ? (
              // CELEBRATION COMPLETED VIEW PORT
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center p-8 bg-[#deebe3]/30 border border-emerald-200 rounded-3xl space-y-6 max-w-2xl mx-auto"
              >
                <div className="w-20 h-20 bg-emerald-600 text-white rounded-full mx-auto flex items-center justify-center text-5xl shadow-md select-none">
                  🎓
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase font-mono tracking-widest text-[#245336]">Case Study Formulated</span>
                  <h3 className="text-xl font-black text-pine uppercase font-sans">
                    CONGRATULATIONS, REVIEWEENE CLINICIAN!
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed font-sans max-w-md mx-auto">
                    You have successfully analyzed all multi-phase clinical formulation segments for the case report <strong>&ldquo;{activeCase.title}&rdquo;</strong>.
                  </p>
                </div>

                {/* Reward Display Box */}
                <div className="bg-white border-2 border-emerald-500/10 rounded-2xl p-4 max-w-sm mx-auto select-none">
                  <div className="text-xs text-gray-400 font-mono">Dynamic Study Reward Claim</div>
                  <strong className="text-2xl font-black text-emerald-700 mt-1 block font-mono">💰 +{xpAwarded} XP Awarded</strong>
                  <div className="text-[9.5px] text-[#245336] bg-[#deebe3] px-2.5 py-1 rounded-lg font-bold font-mono mt-2 inline-block">
                    Study Companion Level Progress Increased!
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <button
                    onClick={exitCaseBoard}
                    className="px-6 py-2.5 bg-[#13271c] hover:bg-pine text-white rounded-xl text-xs font-mono font-bold tracking-tight transition active:scale-95 cursor-pointer shadow-md inline-flex items-center gap-2"
                  >
                    Return to Case Roster
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ) : (
              // TAB SPECIFIC PANELS Inside Report
              <div>
                
                {dossierTab === 'intake' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 md:grid-cols-12 gap-6"
                  >
                    <div className="md:col-span-4 space-y-4">
                      {/* Intake Demographics Block */}
                      <div className="bg-[#fbfcfa] border border-gray-150 rounded-2xl p-4 select-none">
                        <h4 className="text-[10px] font-black uppercase font-mono text-gray-400 border-b border-gray-100 pb-2 mb-3">Client Demographics</h4>
                        
                        <div className="space-y-3 text-xs">
                          <div className="flex justify-between">
                            <span className="text-gray-400 font-mono">Client Codename</span>
                            <strong className="text-[#13271c] font-bold">{activeCase.clientName}</strong>
                          </div>

                          <div className="flex justify-between">
                            <span className="text-gray-400 font-mono">Client Age</span>
                            <strong className="text-gray-800 font-bold">{activeCase.age} Years Old</strong>
                          </div>

                          <div className="flex justify-between">
                            <span className="text-gray-400 font-mono">Designated Sex</span>
                            <strong className="text-gray-800 font-bold">{activeCase.gender}</strong>
                          </div>

                          <div className="flex justify-between">
                            <span className="text-gray-400 font-mono">Stance Occupation</span>
                            <strong className="text-gray-800 font-bold truncate max-w-[150px]">{activeCase.occupation}</strong>
                          </div>
                        </div>
                      </div>

                      {/* Referral details */}
                      <div className="bg-amber-500/5 border border-amber-950/10 rounded-2xl p-4 text-xs">
                        <h4 className="text-[10px] font-black uppercase font-mono text-amber-800 border-b border-amber-950/5 pb-2 mb-2 flex items-center gap-1.5 select-none">
                          <AlertTriangle className="w-3.5 h-3.5" /> Referral Context
                        </h4>
                        <p className="text-amber-950 leading-relaxed font-sans">{activeCase.referralReason}</p>
                      </div>
                    </div>

                    <div className="md:col-span-8 bg-[#fbfcfa] border border-gray-200 rounded-2xl p-5 text-xs text-left space-y-4">
                      <div>
                        <h3 className="text-xs font-bold text-gray-800 uppercase font-mono border-b border-gray-150 pb-2 mb-2 select-none">Chief Complaint Statement (Verbatim Intake)</h3>
                        <p className="text-gray-600 leading-relaxed text-[12.5px] italic bg-white p-3 rounded-xl border border-gray-100 font-sans">
                          {activeCase.chiefComplaint}
                        </p>
                      </div>

                      <div className="bg-cream/40 border border-gray-150 p-4 rounded-xl">
                        <strong className="text-xs block text-[#13271c] uppercase font-mono mb-2 select-none">Brief Chronological History</strong>
                        <p className="text-gray-500 leading-relaxed font-sans">{activeCase.academicHistory || 'Patient maintains normal developmental milestones up to current clinical presentation intervals.'}</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {dossierTab === 'behavior' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="bg-[#fbfcfa] border border-gray-200 rounded-2xl p-5 text-xs text-left space-y-3">
                      <h3 className="text-xs font-bold text-gray-850 uppercase font-mono border-b border-gray-150 pb-2 mb-2 select-none">Clinical Behavioral Observations</h3>
                      <p className="text-gray-600 leading-relaxed font-sans text-xs bg-white p-4 border border-gray-100 rounded-xl">
                        {activeCase.behavioralObservations}
                      </p>
                    </div>

                    <div className="bg-amber-500/5 border border-amber-900/10 rounded-2xl p-4 text-xs text-left select-none">
                      <h4 className="font-mono font-bold text-amber-800 text-[10.5px] uppercase tracking-wider mb-1">Diagnostic Clue Tracker</h4>
                      <p className="text-amber-950 leading-normal font-sans text-[11px]">
                        Pay extremely careful attention to physical manifestations during interviews (pressured speech, posture stiffening, waxy flexibilities) in Philippine Board testing scenarios. They often outline DSM-5-TR modifiers.
                      </p>
                    </div>
                  </motion.div>
                )}

                {dossierTab === 'battery' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 md:grid-cols-12 gap-6"
                  >
                    <div className="md:col-span-5 space-y-4">
                      {/* Administered testing lists */}
                      <div className="bg-[#fbfcfa] border border-gray-150 rounded-2xl p-4 select-none text-xs">
                        <h4 className="text-[10px] font-black uppercase font-mono text-gray-400 border-b border-gray-100 pb-2 mb-3">Administered Testing Battery</h4>
                        
                        <div className="space-y-2">
                          {activeCase.psychologicalTestingBattery.split(',').map((test, index) => (
                            <div key={index} className="flex items-center gap-2 bg-white px-3 py-2 border border-gray-100 rounded-xl">
                              <FileText className="w-3.5 h-3.5 text-pine shrink-0" />
                              <strong className="text-gray-700 font-sans text-[11px]">{test.trim()}</strong>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-7 bg-[#fbfcfa] border border-gray-200 rounded-2xl p-5 text-xs text-left space-y-3">
                      <h3 className="text-xs font-bold text-gray-850 uppercase font-mono border-b border-gray-150 pb-2 mb-2 select-none">Test Diagnostics Findings Summary</h3>
                      <p className="text-gray-600 leading-relaxed font-sans bg-white p-4 border border-gray-100 rounded-xl text-xs leading-relaxed">
                        {activeCase.testResultsSummary}
                      </p>
                    </div>
                  </motion.div>
                )}

                {dossierTab === 'formulate' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#fbfcfa] border border-gray-150 rounded-2xl p-5 md:p-6 text-left space-y-5"
                  >
                    {/* Active Question Phase Block */}
                    <div className="space-y-1 select-none">
                      <span className="text-[9.5px] uppercase font-black tracking-widest font-mono text-amber-700 bg-amber-50 border border-amber-200/50 px-2.5 py-0.5 rounded-full inline-block">
                        PHASE {activeCase.phases[currentPhaseIdx].phase} of 4: {activeCase.phases[currentPhaseIdx].title}
                      </span>
                      <h3 className="text-sm font-extrabold text-gray-900 leading-relaxed font-sans pt-1">
                        {activeCase.phases[currentPhaseIdx].question}
                      </h3>
                    </div>

                    {/* Options list selection block */}
                    <div className="space-y-3">
                      {activeCase.phases[currentPhaseIdx].options.map((opt, oIdx) => {
                        const isSelected = selectedOption === oIdx;
                        const isCorrectAnswer = oIdx === activeCase.phases[currentPhaseIdx].correctIndex;

                        let style = 'bg-white border-gray-200 hover:border-pine cursor-pointer hover:bg-gray-50/50';
                        
                        if (isSelected && !phaseSubmitted) {
                          style = 'bg-teal-50 border-[#1B3518] ring-1 ring-[#1B3518]/25';
                        } else if (phaseSubmitted) {
                          if (isCorrectAnswer) {
                            style = 'bg-emerald-50 border-emerald-500 text-emerald-800 cursor-default';
                          } else if (isSelected) {
                            style = 'bg-rose-50 border-rose-500 text-rose-800 cursor-default';
                          } else {
                            style = 'bg-white border-gray-150 opacity-50 cursor-default';
                          }
                        }

                        return (
                          <div
                            key={oIdx}
                            onClick={() => handleOptionSelect(oIdx)}
                            className={`p-4 border rounded-xl transition duration-150 text-xs font-medium flex items-start gap-3 select-none ${style}`}
                          >
                            <span className={`w-5 h-5 rounded-md flex-shrink-0 flex items-center justify-center text-[10px] font-bold font-mono border mt-0.5 ${
                              isSelected 
                                ? 'bg-[#1B3518] text-[#deebe3] border-[#1B3518]' 
                                : 'bg-gray-50 text-gray-400'
                            }`}>
                              {String.fromCharCode(65 + oIdx)}
                            </span>
                            
                            <span className="flex-1 font-sans leading-relaxed text-[11.5px]">{opt}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Submit and Feedback Actions area */}
                    <div className="border-t border-gray-150 pt-4 mt-4 select-none">
                      {phaseSubmitted ? (
                        <div className="space-y-4">
                          {/* Feedback status banner */}
                          <div className={`p-4 rounded-xl border flex items-start gap-3 text-left ${
                            phaseIsCorrect 
                              ? 'bg-emerald-50 border-emerald-150 text-emerald-800' 
                              : 'bg-rose-50 border-rose-150 text-rose-850'
                          }`}>
                            <div className="text-xl shrink-0 mt-0.5">
                              {phaseIsCorrect ? '🎯' : '💡'}
                            </div>

                            <div className="space-y-1">
                              <strong className="text-xs block font-bold">
                                {phaseIsCorrect ? 'Correct Diagnostic Formulation!' : 'Incorrect Board formulation'}
                              </strong>
                              <p className="text-xs leading-relaxed font-sans">
                                {activeCase.phases[currentPhaseIdx].rationales[selectedOption ?? 0]}
                              </p>
                            </div>
                          </div>

                          <div className="flex gap-2 justify-end">
                            {!phaseIsCorrect ? (
                              <button
                                onClick={handleRetryPhase}
                                className="px-5 py-2 border border-gray-300 hover:bg-gray-50 text-gray-600 rounded-xl text-xs font-mono font-bold tracking-tight transition active:scale-95 cursor-pointer flex items-center gap-1.5"
                              >
                                <RotateCcw className="w-4 h-4 text-gray-450" />
                                Review Dossier &amp; Try Again
                              </button>
                            ) : (
                              <button
                                onClick={handleNextPhase}
                                className="px-5 py-2.5 bg-pine hover:bg-pine-mid text-white rounded-xl text-xs font-mono font-bold tracking-tight transition active:scale-95 cursor-pointer flex items-center gap-1.5"
                              >
                                {currentPhaseIdx === activeCase.phases.length - 1 ? 'Claim Case Solution ✅' : 'Next Clinical Phase ➔'}
                              </button>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-gray-400 font-mono flex items-center gap-1">
                            <HelpIcon className="w-3.5 h-3.5 text-gray-350 shrink-0" /> Solve each phase incrementally to clear the case study file.
                          </span>

                          <button
                            onClick={submitPhaseAnswer}
                            disabled={selectedOption === null}
                            className="px-6 py-2 bg-[#1B3518] hover:bg-[#13271c] disabled:opacity-45 text-[#deebe3] rounded-xl text-xs font-mono font-bold tracking-tight transition active:scale-95 cursor-pointer flex items-center gap-1.5"
                          >
                            Submit Stage Solution
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

              </div>
            )}

          </div>

          {/* Prompt warning if formulating without reading case */}
          {dossierTab !== 'formulate' && !showCaseCelebrate && (
            <div className="bg-amber-500/5 border-t border-gray-150 px-6 py-3 flex items-center justify-between text-xs font-mono select-none">
              <span className="text-amber-800 flex items-center gap-1 text-[11px]">
                <BookOpen className="w-3.5 h-3.5" /> Carefully ingest all demographic, behavioral, and assessment testing details first.
              </span>

              <button
                onClick={() => setDossierTab('formulate')}
                className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-[10px] uppercase font-bold tracking-wider font-mono transition active:scale-95 cursor-pointer flex items-center gap-1"
              >
                Go to formulation
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
