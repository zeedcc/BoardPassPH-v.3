import React, { useState, useEffect } from 'react';
import { Award, CheckCircle, HelpCircle, Sparkles, BookOpen, AlertCircle, RefreshCw } from 'lucide-react';
import { UserProfile, Question } from '../types';
import { SEED_QUESTIONS } from '../data/seedQuestions';

interface DailyBoardChallengeProps {
  profile: UserProfile;
  setProfile: (nextVal: React.SetStateAction<UserProfile | null>) => void;
}

export const DailyBoardChallenge: React.FC<DailyBoardChallengeProps> = ({ profile, setProfile }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; msg: string } | null>(null);

  // Get single deterministic question per day based on date hash
  const todayStr = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  
  const getTodayQuestion = (): { question: Question; index: number } => {
    const seedCount = SEED_QUESTIONS.length;
    let hash = 0;
    for (let i = 0; i < todayStr.length; i++) {
      hash = todayStr.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % seedCount;
    return { question: SEED_QUESTIONS[index], index };
  };

  const { question, index: questionIndex } = getTodayQuestion();

  // Check if today's challenge was already successfully solved
  const isAlreadyCompleted = profile.dailyChallenges?.[todayStr] === 'correct';

  useEffect(() => {
    if (isAlreadyCompleted) {
      setIsSubmitted(true);
      setSelectedOption(question.correctIndex);
      setFeedback({
        isCorrect: true,
        msg: '🎉 Daily Challenge complete! +30 XP claimed.'
      });
    } else {
      // Clear status if date changed or user logs on another day
      setIsSubmitted(false);
      setSelectedOption(null);
      setFeedback(null);
    }
  }, [isAlreadyCompleted, todayStr, question.correctIndex]);

  const handleSubmit = () => {
    if (selectedOption === null) return;

    const isCorrectChoice = selectedOption === question.correctIndex;

    if (isCorrectChoice) {
      // Award XP once and save status
      setProfile((prev) => {
        if (!prev) return prev;
        
        const existingChallenges = prev.dailyChallenges || {};
        // Only award XP if not already marked as correct for today
        const alreadyClaimed = existingChallenges[todayStr] === 'correct';
        const updatedXp = alreadyClaimed ? prev.totalXp : prev.totalXp + 30;

        const updatedProfile = {
          ...prev,
          totalXp: updatedXp,
          dailyChallenges: {
            ...existingChallenges,
            [todayStr]: 'correct' as const
          }
        };
        return updatedProfile;
      });

      setIsSubmitted(true);
      setFeedback({
        isCorrect: true,
        msg: '🎉 Magnificent! Your clinical formulation is correct. You’ve claimed today’s +30 XP Board Challenge bonus!'
      });
    } else {
      setFeedback({
        isCorrect: false,
        msg: '❌ That formulation is not quite accurate. Study the vignette carefully and reassess your options to try again!'
      });
    }
  };

  return (
    <div id="daily-board-challenge-widget" className="bg-white border border-gray-150 rounded-3xl p-6 shadow-sm space-y-5 select-none relative overflow-hidden transition-all duration-300">
      {/* Background soft grids */}
      <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#1b3518_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4 relative z-10">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-[9px] uppercase font-black tracking-widest text-mint bg-amber-500/10 px-2.5 py-1 rounded-full border border-mint/20 font-mono">
              <Sparkles className="w-3 h-3 text-mint fill-mint animate-pulse" />
              Pre-Selected High-Yield
            </span>
            <span className="text-[9px] uppercase tracking-wider font-extrabold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100 font-mono">
              📅 {todayStr}
            </span>
          </div>
          <h2 className="font-display text-xl text-pine tracking-tight mt-1">
            Daily Board Challenge
          </h2>
          <p className="text-xs text-gray-500 leading-relaxed font-sans font-medium">
            Tackle one curated clinical scenario with fellow RPm examinees today. Offers an automatic <strong className="text-emerald-700 font-bold">+30 XP</strong> reward upon success!
          </p>
        </div>

        {/* Badge Indicator */}
        <div className="flex-shrink-0">
          {isAlreadyCompleted ? (
            <div className="flex items-center gap-1.5 bg-[#deebe3] text-[#2e5e41] border border-emerald-250/50 px-4 py-2 rounded-2xl">
              <CheckCircle className="w-4 h-4 text-emerald-600 animate-bounce" />
              <div className="text-left font-mono">
                <span className="block text-[8px] uppercase tracking-wider font-extrabold leading-none">Status</span>
                <span className="text-[10px] font-black uppercase leading-tight pr-1">Claimed +30 XP</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 bg-amber-50 text-amber-800 border border-amber-200 px-4 py-2 rounded-2xl">
              <Award className="w-4 h-4 text-amber-600 animate-pulse" />
              <div className="text-left font-mono">
                <span className="block text-[8px] uppercase tracking-wider font-extrabold leading-none">Unsolved</span>
                <span className="text-[10px] font-black uppercase leading-tight">+30 XP Available</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main interactive area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
        
        {/* Clinician Case Study Section */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-foam/45 border border-pine/5 p-5 rounded-2xl space-y-3 shadow-inner">
            <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase font-black text-pine/70 tracking-wider">
              <BookOpen className="w-3.5 h-3.5 text-pine-light" />
              Clinical Focus: {question.category}
            </div>
            <p className="text-xs leading-relaxed text-gray-700 italic font-medium font-sans">
              &quot;{question.vignette}&quot;
            </p>
            <div className="flex gap-2 pt-1 font-mono text-[8.5px] font-extrabold text-gray-400 uppercase tracking-widest">
              <span>Source: {question.source?.toUpperCase() || 'BOARD'}</span>
              <span>•</span>
              <span>Difficulty: {question.difficulty?.toUpperCase() || 'MEDIUM'}</span>
            </div>
          </div>
        </div>

        {/* Options & Selection Area */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <div className="space-y-2.5">
            <span className="text-[9px] uppercase font-black text-gray-400 font-mono tracking-wider block">
              Choose the correct diagnostic conclusion:
            </span>
            <div className="space-y-2">
              {question.options.map((option, idx) => {
                const getOptionStyling = () => {
                  // If completed, highlight correct green
                  if (isAlreadyCompleted) {
                    if (idx === question.correctIndex) {
                      return 'border-emerald-500 bg-emerald-50 text-emerald-900 pointer-events-none ring-1 ring-emerald-400';
                    }
                    return 'border-gray-150 bg-gray-50/50 text-gray-400 opacity-60 pointer-events-none';
                  }

                  const isSelected = selectedOption === idx;
                  if (isSubmitted && isSelected) {
                    if (idx === question.correctIndex) {
                      return 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                    }
                  }

                  // Default states
                  return isSelected
                    ? 'border-pine bg-foam text-pine font-semibold ring-1 ring-pine'
                    : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-800 hover:border-gray-300';
                };

                return (
                  <button
                    key={idx}
                    disabled={isAlreadyCompleted}
                    onClick={() => {
                      setSelectedOption(idx);
                      setFeedback(null); // Clear errors when choosing another
                    }}
                    className={`w-full text-left p-3 border rounded-xl text-xs transition duration-150 flex items-start gap-2.5 select-none ${
                      !isAlreadyCompleted ? 'cursor-pointer active:scale-[0.99]' : ''
                    } ${getOptionStyling()}`}
                  >
                    <span className="w-5 h-5 flex-shrink-0 flex items-center justify-center font-mono text-[10px] font-black rounded-lg border border-gray-200 select-none bg-gray-50/80">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="leading-tight font-medium font-sans">
                      {option}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Correct/Incorrect notification feedback banner */}
          {feedback && (
            <div className={`p-3.5 rounded-xl border flex items-start gap-2.5 transition duration-200 select-none ${
              feedback.isCorrect 
                ? 'bg-emerald-50 border-emerald-200/60 text-emerald-950 text-xs' 
                : 'bg-rose-50 border-rose-200/60 text-rose-950 text-xs'
            }`}>
              {feedback.isCorrect ? (
                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
              )}
              <span className="leading-relaxed font-sans font-medium">
                {feedback.msg}
              </span>
            </div>
          )}

          {/* Action button */}
          {!isAlreadyCompleted && (
            <button
              onClick={handleSubmit}
              disabled={selectedOption === null}
              className={`w-full py-3 px-4 font-mono text-[10px] font-black uppercase tracking-wider rounded-xl transition duration-150 flex items-center justify-center gap-1.5 border-b-2 ${
                selectedOption !== null
                  ? 'bg-pine hover:bg-pine-mid text-cream border-pine-mid cursor-pointer active:scale-98'
                  : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
              }`}
            >
              <span>Verify & Claim Bonus XP</span>
            </button>
          )}
        </div>
      </div>

      {/* Rationale overview shown when complete */}
      {isAlreadyCompleted && (
        <div id="daily-challenge-explanation" className="border-t border-gray-100 pt-4.5 space-y-2.5 relative z-10 bg-foam/10 p-4 rounded-2xl border border-dashed border-gray-200">
          <div className="flex items-center gap-1.5 text-[9.5px] font-black text-pine uppercase tracking-wider font-mono">
            <BookOpen className="w-3.5 h-3.5 text-mint" />
            High-Yield Clinical Formulation & DSM-5 Rationale
          </div>
          <p className="text-[11px] text-gray-600 leading-relaxed font-sans">
            {question.explanation}
          </p>
          <div className="p-3 bg-teal-50 border border-teal-100 rounded-xl text-[10px] text-teal-900 font-sans leading-relaxed flex items-start gap-2">
            <CheckCircle className="w-3.5 h-3.5 text-teal-700 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="font-extrabold block mb-0.5 uppercase tracking-wider text-[8.5px] font-mono">Reviewee Board Tip:</strong>
              The board exam commonly tests these complex differential boundaries between standard adaptive sadness and pathological clinical distress. Read full questions carefully to confirm functional occupational or social impairments.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
