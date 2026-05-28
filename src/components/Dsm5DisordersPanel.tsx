import React, { useState, useMemo } from 'react';
import { 
  Search, BookOpen, Calendar, HelpCircle, Users, Sparkles, Filter, 
  ChevronRight, Brain, Clock, ShieldAlert, BadgeInfo, Info, ListFilter,
  CheckCircle2, ArrowRight, HeartHandshake
} from 'lucide-react';
import { DSM5_DISORDERS, DSM5_CATEGORIES, Dsm5Disorder } from '../data/dsm5DisordersData';
import { getDisorderTreatments } from '../utils/dsm5TreatmentHelper';
import { getDisorderCriteria } from '../utils/dsm5CriteriaHelper';

export function Dsm5DisordersPanel() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDisorderId, setSelectedDisorderId] = useState<string | null>(DSM5_DISORDERS[0]?.id || null);

  // Filtered disorders query
  const filteredDisorders = useMemo(() => {
    return DSM5_DISORDERS.filter(disorder => {
      // Category filter
      const matchesCategory = selectedCategory === 'All' || disorder.category === selectedCategory;
      
      // Search text filter
      const matchesSearch = searchQuery === '' || 
        disorder.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        disorder.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        disorder.differentialDiagnosis.toLowerCase().includes(searchQuery.toLowerCase()) ||
        disorder.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  // Selected disorder detail mapping
  const activeDisorder = useMemo(() => {
    if (!selectedDisorderId) return null;
    return DSM5_DISORDERS.find(d => d.id === selectedDisorderId) || null;
  }, [selectedDisorderId]);

  const activeTreatments = useMemo(() => {
    if (!activeDisorder) return null;
    return getDisorderTreatments(activeDisorder.id, activeDisorder.category);
  }, [activeDisorder]);

  const criteriaData = useMemo(() => {
    if (!activeDisorder) return null;
    return getDisorderCriteria(
      activeDisorder.id,
      activeDisorder.name,
      activeDisorder.category,
      activeDisorder.description,
      activeDisorder.duration,
      activeDisorder.specifiers,
      activeDisorder.differentialDiagnosis
    );
  }, [activeDisorder]);

  // Quick stats computed
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    DSM5_DISORDERS.forEach(d => {
      counts[d.category] = (counts[d.category] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-6 animate-in fade-in duration-200">
      
      {/* HEADER BAR */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-150 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-100 font-mono">
              DSM-5-TR Diagnostic Matrix
            </span>
          </div>
          <h3 className="font-display text-2xl font-bold tracking-tight text-pine md:text-3xl">
            Syllabus of Mental Disorders
          </h3>
          <p className="text-xs text-gray-500 font-medium leading-relaxed font-sans">
            Diagnostic durations, specifiers, sex-linked trends, onsets, and differential diagnostics for the Philippine Licensure Exam.
          </p>
        </div>
        
        {/* Total Badge */}
        <div className="flex items-center gap-2 bg-[#deebe3] px-3.5 py-1.5 rounded-2xl border border-pine/5">
          <BookOpen className="w-4 h-4 text-pine shrink-0" />
          <div className="flex flex-col">
            <span className="text-[9px] uppercase tracking-wider text-gray-500 font-mono font-bold">Diagnoses Tracked</span>
            <span className="text-xs font-black text-pine font-mono leading-none">{DSM5_DISORDERS.length} Disorders</span>
          </div>
        </div>
      </div>

      {/* FILTER SEARCH INPUT AND SELECTOR GRID */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        
        {/* Search Bar */}
        <div className="md:col-span-8 relative">
          <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-gray-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by disorder name, differential, keywords, or specifier..."
            className="w-full bg-foam/30 hover:bg-foam/50 border border-gray-200 focus:border-sage focus:ring-3 focus:ring-sage/10 pl-10 pr-4 py-3 rounded-2xl text-xs font-semibold outline-none transition-all placeholder-gray-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-3.5 flex items-center text-xs font-mono font-bold text-gray-400 hover:text-pine"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category dropdown */}
        <div className="md:col-span-4 relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
            <ListFilter className="w-4 h-4 text-sage" />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              // Auto select first match
              const firstMatch = DSM5_DISORDERS.find(d => e.target.value === 'All' || d.category === e.target.value);
              if (firstMatch) {
                setSelectedDisorderId(firstMatch.id);
              }
            }}
            className="w-full bg-white border border-gray-200 focus:border-sage focus:ring-3 focus:ring-sage/10 pl-9 pr-3 py-3 rounded-2xl text-xs font-bold outline-none cursor-pointer appearance-none transition-all text-gray-700"
          >
            <option value="All">All Categories</option>
            {DSM5_CATEGORIES.map(category => (
              <option key={category} value={category}>
                {category} ({categoryCounts[category] || 0})
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* QUICK CHIPS FILTER LIST */}
      <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-none select-none">
        <button
          onClick={() => {
            setSelectedCategory('All');
            const firstMatch = DSM5_DISORDERS[0];
            if (firstMatch) setSelectedDisorderId(firstMatch.id);
          }}
          className={`px-3 py-1.5 rounded-xl text-[10.5px] font-bold whitespace-nowrap border cursor-pointer transition ${
            selectedCategory === 'All'
              ? 'bg-pine text-cream border-pine shadow-xs font-black'
              : 'bg-foam/40 text-pine/80 hover:bg-foam hover:text-pine border-pine/5'
          }`}
        >
          🌐 All ({DSM5_DISORDERS.length})
        </button>
        {DSM5_CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              const firstMatch = DSM5_DISORDERS.find(d => d.category === cat);
              if (firstMatch) setSelectedDisorderId(firstMatch.id);
            }}
            className={`px-3 py-1.5 rounded-xl text-[10.5px] font-bold whitespace-nowrap border cursor-pointer transition ${
              selectedCategory === cat
                ? 'bg-pine text-cream border-pine shadow-xs font-black'
                : 'bg-foam/40 text-pine/80 hover:bg-foam hover:text-pine border-pine/5'
            }`}
          >
            📋 {cat} ({categoryCounts[cat] || 0})
          </button>
        ))}
      </div>

      {/* DETAILED INDEX - SPLIT SCREEN MASTER-DETAIL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[460px]">
        
        {/* LEFT COMPACT DIRECTORY */}
        <div className="lg:col-span-5 border border-gray-150 rounded-2xl overflow-hidden flex flex-col bg-gray-50/35">
          
          <div className="p-3 bg-gray-100/60 border-b border-gray-150 flex justify-between items-center bg-foam/40">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 font-mono">
              Diagnostic Feed ({filteredDisorders.length})
            </span>
            <span className="text-[10px] font-mono text-sage">Select to view criteria</span>
          </div>

          <div className="divide-y divide-gray-150 overflow-y-auto max-h-[500px] scrollbar-thin">
            {filteredDisorders.length === 0 ? (
              <div className="p-8 text-center text-gray-400 space-y-2">
                <BadgeInfo className="w-8 h-8 mx-auto opacity-45" />
                <p className="text-xs font-semibold">No diagnostic matches found.</p>
                <p className="text-[10px]">Refine your keywords or toggle category settings.</p>
              </div>
            ) : (
              filteredDisorders.map((disorder) => {
                const isSelected = selectedDisorderId === disorder.id;
                return (
                  <button
                    key={disorder.id}
                    onClick={() => setSelectedDisorderId(disorder.id)}
                    className={`w-full text-left p-3.5 flex items-start gap-3 transition-colors cursor-pointer ${
                      isSelected 
                        ? 'bg-pine/5 border-l-4 border-pine' 
                        : 'hover:bg-foam/25 border-l-4 border-transparent'
                    }`}
                  >
                    <div className="shrink-0 mt-0.5 w-5 h-5 flex items-center justify-center rounded bg-gray-100 text-gray-400 font-bold text-[9px] font-mono">
                      {disorder.name.charAt(0)}
                    </div>
                    <div className="space-y-0.5 min-w-0 flex-grow">
                      <div className="flex justify-between items-start gap-1">
                        <span className={`text-xs font-bold leading-tight block truncate ${isSelected ? 'text-pine font-black' : 'text-gray-700'}`}>
                          {disorder.name}
                        </span>
                        <ChevronRight className={`w-3.5 h-3.5 text-gray-300 shrink-0 mt-0.5 transition-transform ${isSelected ? 'translate-x-1 text-pine' : ''}`} />
                      </div>
                      <span className="text-[9px] text-gray-400 block font-mono">
                        {disorder.category}
                      </span>
                      <p className="text-[10px] text-gray-400 font-medium leading-relaxed truncate">
                        {disorder.description}
                      </p>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* RIGHT DYNAMIC SYLLABUS PANEL (DETAILS) */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          {activeDisorder ? (
            <div className="border border-gray-200 bg-white shadow-xs rounded-2xl p-5 space-y-5 h-full flex flex-col justify-between">
              
              <div className="space-y-4">
                {/* Header Title */}
                <div className="space-y-1.5 relative">
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-[#f55a7f] bg-rose-50 px-2 py-0.5 rounded-md border border-rose-100">
                      {activeDisorder.category}
                    </span>
                    <span className="text-[9px] font-mono text-gray-400">ID: dsm_{activeDisorder.id}</span>
                  </div>
                  <h4 className="font-display text-xl font-bold text-pine leading-tight select-text">
                    {activeDisorder.name}
                  </h4>
                </div>

                {/* Description Text */}
                <div className="p-3.5 bg-foam/40 rounded-xl space-y-1">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-teal-800 flex items-center gap-1.5 select-none">
                    <Info className="w-3.5 h-3.5" /> Core Diagnostic Abstract
                  </span>
                  <p className="text-[11.5px] text-gray-600 font-medium leading-relaxed font-sans select-text">
                    {activeDisorder.description}
                  </p>
                </div>

                {/* Quick Diagnostics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  
                  {/* Duration Parameter */}
                  <div className="border border-gray-150 p-3 rounded-xl space-y-1 bg-white">
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5 select-none">
                      <Clock className="w-3.5 h-3.5 shrink-0" /> Essential Durations
                    </span>
                    <p className="text-[11px] text-gray-700 font-semibold select-text leading-tight">
                      {activeDisorder.duration}
                    </p>
                  </div>

                  {/* Typical Onsets */}
                  <div className="border border-gray-150 p-3 rounded-xl space-y-1 bg-white">
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-teal-800 flex items-center gap-1.5 select-none font-sans">
                      <Calendar className="w-3.5 h-3.5 shrink-0" /> Onset Window
                    </span>
                    <p className="text-[11px] text-gray-700 font-semibold select-text leading-tight">
                      {activeDisorder.onset}
                    </p>
                  </div>

                  {/* Gender and Sex ratios */}
                  <div className="border border-gray-150 p-3 rounded-xl space-y-1 bg-white">
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-indigo-700 flex items-center gap-1.5 select-none">
                      <Users className="w-3.5 h-3.5 shrink-0" /> Sex & Gender Trends
                    </span>
                    <p className="text-[11px] text-gray-700 font-semibold select-text leading-tight">
                      {activeDisorder.gender}
                    </p>
                  </div>

                  {/* Standard Specifiers */}
                  <div className="border border-gray-150 p-3 rounded-xl space-y-1 bg-white">
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#da59c6] flex items-center gap-1.5 select-none">
                      <Sparkles className="w-3.5 h-3.5 shrink-0 text-[#da59c6]" /> DSM-5-TR Specifiers
                    </span>
                    <p className="text-[11px] text-gray-700 font-semibold select-text leading-tight">
                      {activeDisorder.specifiers}
                    </p>
                  </div>

                </div>

                {/* Official Diagnostic Criteria Block */}
                {criteriaData && (
                  <div className="border border-teal-200/60 bg-teal-50/10 p-4 rounded-xl space-y-3">
                    <div className="flex items-center gap-1.5 text-teal-800 select-none">
                      <CheckCircle2 className="w-4.5 h-4.5 text-teal-700 shrink-0" />
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider">
                        📋 DSM-5 Diagnostic Criteria Checklist
                      </span>
                    </div>
                    
                    <div className="space-y-2 text-xs text-gray-700 leading-relaxed font-sans select-text">
                      <p className="text-[10.5px] text-teal-950 font-semibold bg-teal-50/50 p-2 rounded-lg border border-teal-100">
                        {criteriaData.essentialCountSummary}
                      </p>
                      
                      <div className="space-y-3 pt-1">
                        {criteriaData.criteria.map((crt) => (
                          <div key={crt.code} className="border-l-2 border-teal-500 pl-3 py-0.5 space-y-1">
                            <div className="flex items-baseline gap-1.5 flex-wrap">
                              <span className="text-[9.5px] font-mono font-black text-teal-800 bg-teal-50 px-1.5 py-0.5 rounded border border-teal-100 uppercase">
                                Criterion {crt.code}
                              </span>
                              <span className="font-extrabold text-pine text-[11.5px]">{crt.name}</span>
                              {crt.requiredCount && (
                                <span className="text-[9px] font-semibold text-teal-800 bg-[#def6f7] border border-teal-100 px-2 py-0.2 rounded-full font-mono">
                                  {crt.requiredCount}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-gray-600 font-medium">{crt.details}</p>
                            {crt.bullets && (
                              <ul className="list-disc pl-4 space-y-1 text-[10.5px] text-gray-500 font-sans font-medium mt-1">
                                {crt.bullets.map((b, bIdx) => (
                                  <li key={bIdx}>{b}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>

                      {criteriaData.exclusionCriteria && criteriaData.exclusionCriteria.length > 0 && (
                        <div className="pt-2 border-t border-gray-150 space-y-1">
                          <span className="text-[9px] font-mono text-gray-400 font-bold uppercase tracking-wide">Critical Exclusions &amp; Distress Indicators</span>
                          <ul className="list-inside list-disc pl-1 space-y-0.5 text-[10px] text-gray-500 font-medium">
                            {criteriaData.exclusionCriteria.map((ex, exIdx) => (
                              <li key={exIdx} className="leading-tight">{ex}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Differential Diagnosis (Highlighted Board Pointer) */}
                <div className="border border-rose-150/60 bg-rose-50/20 p-4 rounded-xl space-y-2">
                  <div className="flex items-center gap-1.5 text-rose-800 select-none">
                    <ShieldAlert className="w-4 h-4 shrink-0" />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider">
                      Differential Diagnosis & Board Pointers
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-700 font-medium leading-relaxed font-sans select-text">
                    {activeDisorder.differentialDiagnosis}
                  </p>
                </div>

                {/* Proposed Clinical Interventions (Therapies & Medications) */}
                {activeTreatments && (
                  <div className="border border-emerald-200 bg-emerald-50/15 p-4 rounded-xl space-y-3.5">
                    <div className="flex items-center gap-1.5 text-emerald-800 select-none">
                      <HeartHandshake className="w-4 h-4 shrink-0 text-emerald-700" />
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider">
                        🔑 Suggested Interventions & Treatment Matrix
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-1">
                      {/* Therapies */}
                      <div className="space-y-1">
                        <span className="text-[9.5px] uppercase tracking-wide font-black text-emerald-800 font-mono flex items-center gap-1">
                          🧠 First-Line Psychotherapy
                        </span>
                        <p className="text-[11px] text-gray-700 font-medium leading-relaxed font-sans select-text">
                          {activeTreatments.therapies}
                        </p>
                      </div>

                      {/* Medications */}
                      <div className="space-y-1">
                        <span className="text-[9.5px] uppercase tracking-wide font-black text-rose-800 font-mono flex items-center gap-1">
                          💊 Primary Pharmacotherapy
                        </span>
                        <p className="text-[11px] text-gray-700 font-medium leading-relaxed font-sans select-text">
                          {activeTreatments.medications}
                        </p>
                      </div>
                    </div>

                    {activeTreatments.boardTip && (
                      <div className="bg-emerald-50 border-l-2 border-emerald-500 pl-2.5 py-1.5 text-[10.5px] text-emerald-950 leading-relaxed font-sans font-medium select-text">
                        <span className="font-bold text-emerald-900 font-mono text-[9px] uppercase tracking-wider mr-1 select-none">Board Checkpoint:</span>
                        {activeTreatments.boardTip}
                      </div>
                    )}
                  </div>
                )}

              </div>

              {/* Study helper prompt */}
              <div className="mt-4 pt-3 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-2 select-none">
                <span className="text-[10px] font-mono text-gray-400">
                  Tip: Master the specific durations for high yield MCQ questions.
                </span>
                <div className="flex gap-2">
                  <a
                    href="#practice"
                    onClick={(e) => {
                      e.preventDefault();
                      // We will let the app handle navigation if we want
                    }}
                    className="text-[10px] uppercase font-bold text-pine hover:underline font-mono flex items-center gap-1"
                  >
                    <span>Analyze in MCQ Practice</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>

            </div>
          ) : (
            <div className="border border-[#deebe3] bg-foam/25 rounded-2xl p-12 text-center flex flex-col items-center justify-center space-y-3 h-full min-h-[400px]">
              <Brain className="w-12 h-12 text-sage animate-pulse" />
              <div className="space-y-1">
                <h5 className="font-display font-bold text-pine text-sm">Select a Disorder Diagnosis</h5>
                <p className="text-xs text-gray-400 max-w-xs mx-auto">
                  Browse the alphabetical directories or search by standard categories to explore diagnostic criteria.
                </p>
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
