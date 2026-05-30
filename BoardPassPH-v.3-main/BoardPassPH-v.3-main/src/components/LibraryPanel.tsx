import React, { useState, useMemo } from 'react';
import { Search, BookOpen, Clock, HelpCircle, ShieldCheck } from 'lucide-react';
import { CATEGORIES, TESTS } from '../data/tests';
import { PsychologyTest, Question, UserProfile } from '../types';
import { generateLocalQuestionForTest } from '../utils/questionGenerator';

const getChedSubtests = (test: PsychologyTest) => {
  if (test.subtests && test.subtests.length > 0) {
    return test.subtests;
  }
  // Generate from factorsMeasured
  const factors = test.factorsMeasured
    ? test.factorsMeasured.split(/[,;&.]+/).map(f => f.trim()).filter(f => f.length > 1 && f.toLowerCase() !== 'and')
    : [];
  
  if (factors.length === 0) {
    // Default single scale based on name
    factors.push(test.name.replace(/\(.*?\)/g, '').trim() + " Scale");
  }

  return factors.map(factor => {
    const lower = factor.toLowerCase();
    let definition = `Measures individual capacities, behavior markers, or psychometric indicators related to ${factor} under CHED curriculum frameworks.`;
    let highMeaning = `High levels of ${lower}. Reflects elevated clinical severity, exceptional cognitive manifestation, or pronounced clinical trait strength.`;
    let lowMeaning = `Low or typical levels of ${lower}. Suggests standard adjustment, negative symptom presence, or baseline competence parameters.`;

    // Contextual overrides for precise psychometric terminology
    if (lower.includes('depression')) {
      definition = "Evaluates dysphoric mood, emotional sadness, lack of interest, and clinical melancholia.";
      highMeaning = "Clinically elevated depressive symptoms, feelings of worthlessness, and risk of psychomotor slowing.";
      lowMeaning = "Absence of severe depressive markers, general emotional resilience, and active engagement.";
    } else if (lower.includes('anxiety')) {
      definition = "Measures biological hyper-arousal, somatic tension, nervous apprehension, and future-oriented fear.";
      highMeaning = "Elevated autonomic alarm state, constant catastrophic worry, and persistent emotional distress.";
      lowMeaning = "Calm, relaxed somatic state, lower tension baseline, and stable coping mechanisms.";
    } else if (lower.includes('attention') || lower.includes('inattention')) {
      definition = "Assesses focus stability, distractibility, selective processing speed, and cognitive fatigue.";
      highMeaning = "High focus challenges (if inattention) or superior attention span and sustained vigilance.";
      lowMeaning = "Consistent cognitive processing (if inattention) or easily distracted and quick focus fatigue.";
    } else if (lower.includes('hyperactivity')) {
      definition = "Evaluates psychomotor restlessness, inability to sit still, and excessive physical energy expressions.";
      highMeaning = "Extreme physical urge to move, constant squirming, and high motor pressure.";
      lowMeaning = "Calm physical state, capacity to sit quietly for age, and composed motor demeanor.";
    } else if (lower.includes('impulsivity') || lower.includes('impulsive')) {
      definition = "Measures diminished inhibitory control, rapid action without forethought, and risk-taking actions.";
      highMeaning = "Inability to delay gratification, poor behavioral inhibition, and quick reckless decisions.";
      lowMeaning = "Strong emotional and motor self-discipline, cautious decision pacing, and deliberate control.";
    } else if (lower.includes('intelligence') || lower.includes('reasoning') || lower.includes('logic')) {
      definition = "Evaluates abstract critical deduction, problem solving flexibility, and pattern induction.";
      highMeaning = "Superior abstract intelligence, outstanding logic processing, and adaptive conceptualization.";
      lowMeaning = "Concrete reasoning style, difficulty with novel problem contexts, or typical cognitive speed.";
    } else if (lower.includes('verbal') || lower.includes('vocabulary')) {
      definition = "Measures crystallized verbal concepts, word power accumulation, and semantic comprehension.";
      highMeaning = "Vast semantic store, highly polished spelling and grammar, and articulate verbal reasoning.";
      lowMeaning = "Limited exposure to language stimuli, language retrieval barriers, or simplified expression.";
    } else if (lower.includes('memory') || lower.includes('retention')) {
      definition = "Assesses encoding, storage capacity, and accurate retrieval of informational prompts.";
      highMeaning = "Superior memory capacity, rapid recall, and reliable long-term or active working retention.";
      lowMeaning = "Encoding lapses, fast trace decay, or typical retrieval and short memory blocks.";
    } else if (lower.includes('perceptual') || lower.includes('spatial')) {
      definition = "Assesses multi-dimensional shape manipulation, visual synthesis, and mental rotation.";
      highMeaning = "Exceptional spatial visualization, strong three-dimensional orientation, and visual assembly.";
      lowMeaning = "Difficulties with spatial relationships, construction delays, or visual orientation blocks.";
    } else if (lower.includes('speed') || lower.includes('motor')) {
      definition = "Measures motor swiftness, processing tempo, and clerical matching speed.";
      highMeaning = "Extremely rapid clerical and visual scanning, prompt reflexive reactions.";
      lowMeaning = "Deliberate focus on accuracy leading to high timing, or sluggish manual execution.";
    } else if (lower.includes('social') || lower.includes('interpersonal')) {
      definition = "Measures social adjustment, comfort in group dynamics, and interpersonal response accuracy.";
      highMeaning = "Strong preference for social interaction, deep empathy, or high interpersonal extraversion.";
      lowMeaning = "Introverted, prefers solitary environments, or experiences clinical social anxieties.";
    } else if (lower.includes('confidentiality') || lower.includes('ethics')) {
      definition = "Measures candidate understanding of standard clinical secrets, client safety, and PAP guidelines.";
      highMeaning = "Flawless compliance with professional ethics and high awareness of clinical boundaries.";
      lowMeaning = "Need for ethics reinforcement or lack of familiarity with professional regulatory guidelines.";
    } else if (lower.includes('paranoia') || lower.includes('suspicious')) {
      definition = "Measures sensitivity to perceived threats, hyper-vigilance, and interpersonal mistrust.";
      highMeaning = "Extreme guardedness, tendency to misinterpret motives as hostile, or rigid security walls.";
      lowMeaning = "Trusting, supportive disposition, open to feedback, with minimal defensiveness.";
    } else if (lower.includes('self-efficacy') || lower.includes('confidence')) {
      definition = "Measures belief in personal capability to execute courses of action and master tasks.";
      highMeaning = "High persistence in faces of adversity, optimistic problem approach, and strong agency.";
      lowMeaning = "Self-doubting, easily discouraged by setbacks, and avoidance of complex goals.";
    } else if (lower.includes('coping') || lower.includes('stress')) {
      definition = "Evaluates adaptive cognitive and emotional coping strategies used to mitigate ambient strain.";
      highMeaning = "Highly resourceful stress management, low physiological burnout, and resilient pacing.";
      lowMeaning = "Prone to feeling overwhelmed, uses avoidant defenses, or exhibits somatic tension.";
    } else if (lower.includes('schizophrenia') || lower.includes('alienative')) {
      definition = "Assesses cognitive bizarreness, social estrangement, and sensory tracking distortion.";
      highMeaning = "Elevated disorganization, unconventional beliefs, or severe sensorimotor alienation.";
      lowMeaning = "Grounded in shared reality, clear goal-directed thought train, and high social fit.";
    } else if (lower.includes('obsessive') || lower.includes('compulsive')) {
      definition = "Analyzes preoccupation with strict order, intrusive ideas, repetitive checkings, and symmetry.";
      highMeaning = "High need for flawless predictability, rigorous perfectionism, or excessive ritualism.";
      lowMeaning = "Highly flexible layout tracking, comfortable with ambiguous structures, or unstructured pacing.";
    }

    return {
      name: factor.charAt(0).toUpperCase() + factor.slice(1),
      definition,
      highMeaning,
      lowMeaning
    };
  });
};

interface LibraryPanelProps {
  onPracticeTest: (question: Question) => void;
  profile?: UserProfile | null;
  onNavigate?: (tabId: string) => void;
}

export const LibraryPanel: React.FC<LibraryPanelProps> = ({ onPracticeTest, profile, onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCatId, setSelectedCatId] = useState<string | null>(null);
  const [showOnlySmo34, setShowOnlySmo34] = useState(false);
  const [activeTest, setActiveTest] = useState<PsychologyTest | null>(null);

  const filteredTests = useMemo(() => {
    return TESTS.filter(t => {
      const matchSearch = 
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.developer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.factorsMeasured.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchCat = selectedCatId ? t.category === selectedCatId : true;
      const matchSmo = showOnlySmo34 ? !!t.isSmo34 : true;
      return matchSearch && matchCat && matchSmo;
    });
  }, [searchQuery, selectedCatId, showOnlySmo34]);

  const handleLaunchPractice = (test: PsychologyTest) => {
    const seed = Math.floor(Math.random() * 100);
    const mockQ = generateLocalQuestionForTest(test, seed);
    onPracticeTest(mockQ);
  };

  const isTrial = profile?.tier?.toLowerCase().includes('trial');
  const displayedTests = isTrial ? filteredTests.slice(0, 6) : filteredTests;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl text-pine">Psychological Assessment Encyclopedia</h2>
          <p className="text-xs text-gray-500 mt-1 leading-relaxed">
            Study and practice the PRC Psychometrician board-mandatory clinical tests, cognitive batteries, lifespans, and specialized scales. 
            Tap on any profile to review its parameters, or launch a dedicated practice multiple choice exam!
          </p>
        </div>

        {isTrial && (
          <div className="bg-emerald-50/75 border border-emerald-200/50 rounded-2xl px-3.5 py-1.5 flex items-center gap-2 text-[10.5px] text-emerald-900 font-sans font-bold select-none shrink-0 self-start md:self-auto shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-emerald-700 animate-pulse" />
            <span>Clinical Trial Mode Enabled</span>
          </div>
        )}
      </div>

      {isTrial && (
        <div className="bg-emerald-50/15 border border-emerald-100 rounded-xl p-4 text-[11px] text-gray-700 leading-relaxed font-sans font-medium select-text">
          <span className="font-black text-emerald-800 uppercase tracking-wider font-mono mr-1.5 flex items-center gap-1">
            ✨ Evaluation Limitation Notice
          </span>
          The entire CHED Annex B psychometric test database is fully queryable in this trial. Launching multi-topic mock exams from this encyclopedia generates individual practice cards with real-time feedback, while batch multi-user clinical key validation is a Premium feature.
        </div>
      )}

      {/* CHED SMO No. 34 Series of 2017 section highlight */}
      <div className="bg-gradient-to-r from-teal-50 to-[#def6f7] border border-teal-150 rounded-2xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 select-none">
        <div className="space-y-1 text-left">
          <div className="flex items-center gap-2">
            <span className="text-[9px] uppercase tracking-wider font-extrabold text-[#f45185] bg-pink-50 border border-pink-100 px-2 py-0.5 rounded-full">
              CHED Guidelines
            </span>
            <span className="text-xs font-bold text-teal-900 font-mono">SMO No. 34 Series of 2017</span>
          </div>
          <h4 className="text-xs font-semibold text-teal-950 font-sans">
            Psychological test materials listed in <strong className="text-[#f45185]">Annex B</strong> under the CHED curricula policies.
          </h4>
        </div>
        <button
          onClick={() => {
            const nextValue = !showOnlySmo34;
            setShowOnlySmo34(nextValue);
            if (nextValue) {
              setSelectedCatId(null);
            }
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer select-none border shadow-md active:scale-95 duration-100 ${
            showOnlySmo34 
              ? 'bg-[#f45185] text-cream border-[#f45185] font-black' 
              : 'bg-white text-[#f45185] border-pink-200 hover:bg-pink-50/50'
          }`}
        >
          {showOnlySmo34 ? '✨ Showing CHED Annex B Only' : '🔍 Filter CHED Annex B'}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tests by name, developer, subscales, or clinical purpose..."
            className="w-full bg-white border border-gray-200 focus:border-sage focus:ring-3 focus:ring-sage/10 pl-4 pr-4 py-2.5 rounded-xl text-xs font-medium placeholder-gray-400 outline-none transition-all"
          />
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar md:pb-0">
          <button
            onClick={() => {
              setSelectedCatId(null);
              setShowOnlySmo34(false);
            }}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer select-none ${
              selectedCatId === null && !showOnlySmo34
                ? 'bg-pine text-white' 
                : 'bg-white border border-gray-200 text-gray-600 hover:border-sage'
            }`}
          >
            All Scales ({TESTS.length})
          </button>
          {CATEGORIES.map(cat => {
            const count = TESTS.filter(t => t.category === cat.id && (showOnlySmo34 ? !!t.isSmo34 : true)).length;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCatId(cat.id)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer select-none ${
                  selectedCatId === cat.id 
                    ? 'bg-pine text-white' 
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-sage'
                }`}
              >
                {cat.name.split('.')[1] || cat.name} ({count})
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayedTests.map(test => (
          <div 
            key={test.id}
            className="bg-white border border-gray-200 rounded-2xl hover:shadow-lg hover:border-sage/40 hover:-translate-y-0.5 p-4 flex flex-col justify-between transition-all duration-200 ease-out relative group"
          >
            <div className="space-y-3">
              <div className="flex flex-wrap gap-1.5 justify-between items-start">
                <div className="flex flex-wrap gap-1 items-center">
                  <span className="text-[9px] uppercase tracking-wider font-extrabold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-100">
                    {test.category}
                  </span>
                  {test.isSmo34 && (
                    <span className="text-[8.5px] uppercase tracking-wider font-extrabold text-[#f45185] bg-pink-50 px-1.5 py-0.5 rounded-full border border-pink-100 font-mono">
                      CHED Annex B
                    </span>
                  )}
                </div>
                <span className="text-[9px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded border border-gray-100 font-mono font-bold">
                  {test.administration.type}
                </span>
              </div>

              <div>
                <h4 className="font-heading font-black text-gray-900 text-sm tracking-tight leading-snug group-hover:text-pine transition-colors">
                  {test.name}
                </h4>
                <p className="text-[10px] text-gray-400 font-medium italic mt-0.5">
                  by {test.developer}
                </p>
              </div>

              <p className="text-xs text-gray-600 font-medium line-clamp-2">
                {test.purpose}
              </p>

              <div className="grid grid-cols-2 gap-2 bg-gray-50/70 p-2.5 rounded-xl border border-gray-100/50 text-[10px]">
                <div>
                  <span className="text-gray-400 block font-bold uppercase tracking-wider text-[8px]">Administration</span>
                  <span className="text-gray-700 font-semibold truncate block mt-0.5">{test.administration.time}</span>
                </div>
                <div>
                  <span className="text-gray-400 block font-bold uppercase tracking-wider text-[8px]">Total Items</span>
                  <span className="text-gray-700 font-semibold truncate block mt-0.5 text-ellipsis overflow-hidden">{test.administration.items}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-gray-100">
              <button
                onClick={() => setActiveTest(test)}
                className="px-3 py-1.5 hover:bg-gray-100 border border-gray-200 text-gray-700 text-xs font-bold rounded-lg cursor-pointer transition active:scale-95 text-center"
              >
                📖 Study Detail
              </button>
              <button
                onClick={() => handleLaunchPractice(test)}
                className="px-3 py-1.5 bg-gradient-to-r from-pine to-pine-mid text-white text-xs font-bold rounded-lg cursor-pointer shadow-sm hover:shadow active:scale-95 transition text-center"
              >
                🎯 Practice test
              </button>
            </div>
          </div>
        ))}

        {isTrial && filteredTests.length > 6 && (
          <div className="col-span-full bg-gradient-to-br from-amber-50/15 to-teal-500/5 border border-dashed border-teal-200 rounded-3xl p-6 md:p-8 text-center space-y-4 shadow-sm my-2 animate-in fade-in duration-300">
            <span className="inline-flex items-center gap-1 bg-teal-50 border border-teal-100 px-3 py-1 rounded-full text-[10.5px] font-mono font-extrabold text-teal-800 uppercase tracking-widest leading-none">
              🔒 Premium Encyclopedia Locked
            </span>
            <h4 className="font-display font-black text-gray-900 text-lg md:text-xl tracking-tight leading-snug">
              Unlock All PRC Board-Mandatory Clinical Tests ({filteredTests.length - 6} additional scales hidden)
            </h4>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-sans font-medium max-w-2xl mx-auto">
              Under your current 7-Day Clinical Trial, we have displayed the top 6 psychological assessments (WAIS-IV, MMPI-2, etc.). To explore the complete CHED Annex-B curriculum, developmental grids, and activate unlimited AI quiz generating, upgrade to BoardPassPH Premium!
            </p>
            <div className="bg-white p-4 rounded-2xl border border-teal-100 text-left text-xs space-y-2 font-medium font-sans text-gray-700 max-w-lg mx-auto shadow-2xs">
              <div className="flex items-start gap-2.5">
                <span className="text-emerald-500 font-extrabold text-[12px] mt-0.5">✓</span>
                <span>Access all <strong>30+ mandatory test profiles</strong> (Neo-PI, 16PF, RPM, Stanford-Binet V)</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-emerald-500 font-extrabold text-[12px] mt-0.5">✓</span>
                <span>Active <strong>Subscale grids</strong> and clinical factor measurements decoder tools</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-emerald-500 font-extrabold text-[12px] mt-0.5">✓</span>
                <span>Practice simulated licensure board exam multiple-choice questions per test</span>
              </div>
            </div>
            <div className="pt-2">
              <button
                onClick={() => onNavigate?.('billingTab')}
                className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-[#14b8a6] hover:from-emerald-700 hover:to-teal-600 text-cream font-sans font-black text-xs uppercase tracking-wider rounded-xl cursor-pointer shadow-md select-none active:scale-95 transition duration-150 inline-flex items-center justify-center gap-2 animate-pulse"
              >
                👑 Unlock Premium Encyclopedia via GCash →
              </button>
            </div>
          </div>
        )}

        {filteredTests.length === 0 && (
          <div className="col-span-full bg-white border border-dashed border-gray-200 rounded-3xl p-12 text-center text-gray-500">
            <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h5 className="font-bold text-gray-700">No Assessment Scales Found</h5>
            <p className="text-xs text-gray-400 mt-1">Try refining your search keyword or clearing the filter.</p>
          </div>
        )}
      </div>

      {activeTest && (
        <div className="fixed inset-0 bg-black/55 backdrop-blur-xs z-[1500] flex justify-center items-center p-4 animate-in fade-in duration-100">
          <div className="bg-white max-w-2xl w-full rounded-2xl shadow-2xl border border-pine/10 p-6 relative max-h-[85vh] overflow-y-auto animate-in zoom-in-95 duration-150">
            <button
              onClick={() => setActiveTest(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-pine p-1 text-xl leading-none font-bold bg-gray-50 hover:bg-gray-100 rounded-full transition cursor-pointer select-none"
            >
              &times;
            </button>

            <div className="border-b border-gray-100 pb-4 mb-4 space-y-2">
              <span className="text-[10px] uppercase font-black text-rose-600 bg-rose-50 border border-rose-100 px-3 py-1 rounded-full">
                Encyclopedia Entry
              </span>
              <h3 className="font-display text-2xl text-pine tracking-tight leading-tight mt-1">
                {activeTest.name}
              </h3>
              <p className="text-xs text-gray-400 italic">
                First standardized by: {activeTest.developer} (Versions: {activeTest.versions})
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <h5 className="text-[10px] uppercase tracking-wider font-extrabold text-pine-light">Clinical Assessment Purpose</h5>
                <p className="text-xs text-gray-700 leading-relaxed font-semibold bg-gray-50 p-2.5 rounded-lg">
                  {activeTest.purpose}
                </p>
              </div>

              <div className="space-y-1">
                <h5 className="text-[10px] uppercase tracking-wider font-extrabold text-pine-light">Factors &amp; Subscales Measured</h5>
                <p className="text-xs text-gray-700 leading-relaxed bg-gray-50 p-2.5 rounded-lg border-l-2 border-sage">
                  {activeTest.factorsMeasured}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="border border-gray-100 rounded-xl p-2.5 text-center">
                  <span className="text-[8px] text-gray-400 block font-bold uppercase tracking-widest">Age Range</span>
                  <span className="text-xs text-gray-700 font-bold block mt-0.5">{activeTest.administration.ageRange}</span>
                </div>
                <div className="border border-gray-100 rounded-xl p-2.5 text-center">
                  <span className="text-[8px] text-gray-400 block font-bold uppercase tracking-widest">Time Constraint</span>
                  <span className="text-xs text-gray-700 font-bold block mt-0.5">{activeTest.administration.time}</span>
                </div>
                <div className="border border-gray-100 rounded-xl p-2.5 text-center">
                  <span className="text-[8px] text-gray-400 block font-bold uppercase tracking-widest">Required Training</span>
                  <span className="text-xs text-gray-700 font-bold block mt-0.5 text-teal-700">{activeTest.administration.trainingNeeded}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-0.5 border border-teal-100 bg-teal-50/20 rounded-xl p-3">
                  <h5 className="text-[9px] uppercase tracking-widest font-extrabold text-teal-800">Scoring Mechanism</h5>
                  <p className="text-xs text-gray-700 leading-relaxed font-medium mt-1">
                    {activeTest.scoring}
                  </p>
                </div>
                <div className="space-y-0.5 border border-indigo-100 bg-indigo-50/20 rounded-xl p-3">
                  <h5 className="text-[9px] uppercase tracking-widest font-extrabold text-indigo-800">Standard Interpretation</h5>
                  <p className="text-xs text-gray-700 leading-relaxed font-medium mt-1">
                    {activeTest.interpretation}
                  </p>
                </div>
              </div>

              {/* CHED GUIDELINES COMPLIANCE CARD */}
              <div className="bg-gradient-to-br from-[#def5f6] to-[#ecfbfb] border border-[#aae1e3] rounded-xl p-4 space-y-2 mt-4 animate-in fade-in duration-200">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[8px] uppercase font-mono bg-[#f45185] text-white font-black px-2 py-0.5 rounded-md">
                    CHED Annex B Program Standard
                  </span>
                  <span className="text-xs font-black text-teal-900">
                    Commission on Higher Education Guidelines
                  </span>
                </div>
                <p className="text-[11px] text-teal-950 leading-relaxed font-sans font-medium">
                  Under <strong>CHED Memorandum Order (CMO) No. 34 Series of 2017</strong>, this standardized test is recognized as an integral laboratory instrument in the Philippine undergraduate Psychology curriculum. It aligns with the <strong>Board of Psychology Professional Regulatory Commission (PRC)</strong> table of specifications, particularly under the {
                    activeTest.category === 'cognitive' ? 'Cognitive and Intelligence Assessment syllabus block (40% Weight).' :
                    activeTest.category === 'personality' ? 'Personality Assessment & Psychological Inventories block (40% Weight).' :
                    activeTest.category === 'projective' ? 'Clinical Assessment Practice - Unstructured Projective Measures (40% Weight).' :
                    activeTest.category === 'mood' ? 'Clinical Symptom Indicators & Wellness Assessment block (20% Weight).' :
                    'Vocational and Industrial/Organizational Selection Area (20% Weight).'
                  }
                </p>
                <div className="grid grid-cols-2 gap-4 text-[10px] bg-white/70 p-2.5 rounded-lg border border-teal-100 mt-2 font-mono">
                  <div>
                    <span className="text-gray-400 block font-bold text-[8px] uppercase">Curriculum Domain</span>
                    <span className="font-extrabold text-teal-950 truncate block">{activeTest.category.toUpperCase()} DIAGNOSTICS</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block font-bold text-[8px] uppercase">Program Mapping</span>
                    <span className="font-extrabold text-teal-950 block">CHED Laboratory Elective</span>
                  </div>
                </div>
              </div>

              {(() => {
                const subscaleList = getChedSubtests(activeTest);
                if (subscaleList.length === 0) return null;
                return (
                  <div className="space-y-3 mt-4 border-t border-gray-100 pt-4">
                    <h5 className="text-[10px] uppercase tracking-wider font-extrabold text-[#7c2d12] bg-orange-50 stroke-orange-200 border border-orange-100 px-2 py-0.5 rounded-md inline-block">
                      Subtests, Subscales &amp; Factor Meanings ({subscaleList.length})
                    </h5>
                    <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
                      {subscaleList.map((sub, sidx) => (
                        <div key={sidx} className="bg-amber-50/10 border border-amber-250/25 rounded-xl p-3.5 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-black text-pine">{sub.name}</span>
                          </div>
                          <p className="text-[11px] text-gray-600 leading-relaxed font-sans">
                            {sub.definition}
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] pt-1 border-t border-dashed border-gray-100">
                            <div className="bg-emerald-50/60 text-emerald-950 p-2.5 rounded-lg border border-emerald-100 flex flex-col">
                              <span className="font-bold text-emerald-800 uppercase tracking-wider text-[8px] flex items-center gap-1">
                                🟢 High Score Meaning
                              </span>
                              <span className="mt-0.5 leading-relaxed font-sans font-medium">{sub.highMeaning}</span>
                            </div>
                            <div className="bg-rose-50/50 text-rose-950 p-2.5 rounded-lg border border-rose-100 flex flex-col">
                              <span className="font-bold text-rose-800 uppercase tracking-wider text-[8px] flex items-center gap-1">
                                🔴 Low Score Meaning
                              </span>
                              <span className="mt-0.5 leading-relaxed font-sans font-medium">{sub.lowMeaning}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}

              {activeTest.mnemonics && (
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 flex gap-2">
                  <span className="text-base select-none">💡</span>
                  <div>
                    <h6 className="text-[9px] uppercase font-bold text-amber-800 tracking-wider">High Yield Study Mnemonic</h6>
                    <p className="text-xs text-amber-900 leading-relaxed font-semibold font-mono mt-0.5">
                      {activeTest.mnemonics}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2.5 mt-6 pt-4 border-t border-gray-100">
              <button
                onClick={() => setActiveTest(null)}
                className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-bold rounded-lg cursor-pointer"
              >
                Close Profile
              </button>
              <button
                onClick={() => {
                  const t = activeTest;
                  setActiveTest(null);
                  handleLaunchPractice(t);
                }}
                className="px-4 py-2 bg-pine text-white text-xs font-bold rounded-lg cursor-pointer hover:bg-pine-mid hover:shadow-md transition"
              >
                Launch Mock Question →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
