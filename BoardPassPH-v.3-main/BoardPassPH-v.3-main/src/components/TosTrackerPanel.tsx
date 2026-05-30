import React, { useState } from 'react';
import { Clipboard, CheckCircle, Percent, AlertCircle, BookOpen, Layers, Sparkles, Award } from 'lucide-react';
import { UserProfile } from '../types';

interface TosTrackerPanelProps {
  profile: UserProfile;
  setProfile: (nextVal: React.SetStateAction<UserProfile | null>) => void;
}

interface TosTopic {
  id: string;
  name: string;
  emphasis: string;
  weight: number; // e.g. 5 means 5% of the overall board exam or similar weight
  difficultyRating: 'Low' | 'Medium' | 'High';
  description: string;
  highYieldTerms: string[];
}

interface TosSubject {
  id: string;
  name: string;
  overallWeight: string;
  colorClass: string;
  bgClass: string;
  borderClass: string;
  topics: TosTopic[];
}

const TOS_DATA: TosSubject[] = [
  {
    id: 'assessment',
    name: 'Psychological Assessment',
    overallWeight: '40% of Board GWA',
    colorClass: 'text-[#10b981] border-[#10b981]/20',
    bgClass: 'bg-[#deebe3]/10',
    borderClass: 'border-emerald-100',
    topics: [
      {
        id: 'assess-psychometric-properties',
        name: 'A. PSYCHOMETRIC PROPERTIES & PRINCIPLES (30% - 39 ITEMS)',
        emphasis: 'Synthesizing test manual indicators such as construct validity coefficients, convergent validity, standard error of measurement (SEM), and score reliability indices.',
        weight: 12,
        difficultyRating: 'High',
        description: 'Covers essential parameters for constructing, selecting, and interpreting tests. Validates the research-backed justification for accepting or rejecting specific psychometric instruments and applying assessment outcomes safely.',
        highYieldTerms: ['SEM (Standard Error of Measurement)', 'Construct Under-representation', 'Convergent vs. Discriminant Validity', 'Content Validity Index (CVI)', 'Face Validity Limitations']
      },
      {
        id: 'assess-methods-stats',
        name: 'B. RESEARCH METHODS AND STATISTICS (15% - 20 ITEMS)',
        emphasis: 'Calculating and applying item difficulty index (p) and item discrimination index (d) under Classical Test Theory, and standard deviation scores.',
        weight: 6,
        difficultyRating: 'High',
        description: 'Examines statistics and mathematical methods used in test development, normalization, and standardization, including standard scores (z-scores, T-scores, stanines, stens, and deviation intelligence quotients).',
        highYieldTerms: ['Item Difficulty Index (p)', 'Item Discrimination Index (d)', 'Sten (Standard Ten)', 'Deviation IQ (Mean 100, SD 15)', 'Normalized Distributions', 'Cronbach Alpha Coefficient']
      },
      {
        id: 'assess-uses-limitations',
        name: 'C. USES, BENEFITS, & LIMITATIONS OF ASSESSMENT (10% - 13 ITEMS)',
        emphasis: 'Formulating clinical limits, strengths, and standard applications of structured objective self-reports vs unstructured expressive projective measures.',
        weight: 4,
        difficultyRating: 'Medium',
        description: 'Identifies the appropriate clinical purpose, administrative strengths, benefits, and severe constraints of diverse testing instruments across educational, clinical, and workspace settings.',
        highYieldTerms: ['Projective Hypothesis', 'Ego Defenses', 'Screening vs. Diagnostic Batteries', 'Social Desirability Bias', 'Unstructured Observations']
      },
      {
        id: 'assess-selection-methods',
        name: 'D. SELECTION OF ASSESSMENT METHODS & TOOLS (15% - 19 ITEMS)',
        emphasis: 'Aligning psychological test batteries with target demographic age ranges, cultural backgrounds, individual vs group formats, and clinical settings.',
        weight: 6,
        difficultyRating: 'Medium',
        description: 'Covers selecting appropriate tests for specific populations, settings, and needs, providing clear rationales for battery choices depending on specific referral questions.',
        highYieldTerms: ['Referral Genuineness', 'Individual vs. Group Testing', 'Culture-Fair Instruments', 'Age Norms Alignment', 'Differential Diagnostic Batteries']
      },
      {
        id: 'assess-admin-scoring-interpret',
        name: 'E. TEST ADMINISTRATION, SCORING, & INTERPRETATION (15% - 20 ITEMS)',
        emphasis: 'Identifying administrative errors, examiner scoring biases (such as the halo effect, leniency error, and central tendency error), and script deviations.',
        weight: 6,
        difficultyRating: 'Medium',
        description: 'Examines the practical steps to prepare testing environments, adhere strictly to script instructions, score outputs flawlessly, and prevent negative impacts of variable testing conditions.',
        highYieldTerms: ['Halo Biases', 'Rapport Establishing', 'Standard Administrative Conditions', 'Scoring Deviations', 'Ceiling and Floor Rules']
      },
      {
        id: 'assess-ethics-standards',
        name: 'F. ETHICAL PRINCIPLES & STANDARDS OF PRACTICE (15% - 19 ITEMS)',
        emphasis: 'Ensuring absolute test material security, protecting user confidentiality, and maintaining high ethical compliance under Philippine RA 10029.',
        weight: 6,
        difficultyRating: 'Low',
        description: 'Covers standard ethical codes (PAP Code of Ethics, PRC regulations), legal boundaries under Republic Act 10029, and resolving challenging psychometric scenarios (such as child custody or court mandates).',
        highYieldTerms: ['Republic Act 10029', 'PAP Ethical Standards', 'Test Security Guardrails', 'Informed Consent Exceptions', 'Limits of Competence', 'Release of Raw Test Data']
      }
    ]
  },
  {
    id: 'abnormal',
    name: 'Abnormal Psychology',
    overallWeight: '20% of Board GWA',
    colorClass: 'text-rose-700 border-rose-200',
    bgClass: 'bg-rose-50/20',
    borderClass: 'border-rose-150',
    topics: [
      {
        id: 'abn-normalcy-abnormalcy',
        name: 'A. MANIFESTATIONS OF BEHAVIOR (5% - 5 ITEMS)',
        emphasis: 'Differentiating clinical distress or behavioral dysfunction from typical deviations using cultural norms and social contexts.',
        weight: 1,
        difficultyRating: 'Low',
        description: 'Covers recognizing normal and abnormal behaviors based on social context, expectations, and statistical infrequency.',
        highYieldTerms: ['Statistically Infrequent', 'Ego-Syntonic vs. Ego-Dystonic', 'Social Context Fit', 'Four Ds (Distress, Dysfunction, Danger, Deviance)', 'Maladaptiveness']
      },
      {
        id: 'abn-disorders-dsm5',
        name: 'B. PSYCHOLOGICAL DISORDERS & SPECIFIC SYMPTOMS (50% - 50 ITEMS)',
        emphasis: 'Applying precise DSM-5 diagnostic criteria, timing triggers (e.g. GAD 6 mos, PTSD 1 mo, MDD 2 wks), and differential exclusions.',
        weight: 10,
        difficultyRating: 'High',
        description: 'Rigorous diagnostic parameters across core DSM-5 categories: Bipolar, Anxiety, Trauma-related, OCD, Somatic, Dissociative, Depressive, Eating, Sleep, Genitourinary/Paraphilic, Substance, Conduct, Personality, Schizophrenia, Neurodevelopmental, and Neurocognitive disorders.',
        highYieldTerms: ['Splitting (BPD)', 'Avolition vs. Alogia', 'Hypomanic Episode (4 Days)', 'Schizophreniform (1 to 6 Months)', 'Depersonalization', 'Social Communication Deficits (ASD)']
      },
      {
        id: 'abn-etiology-theories',
        name: 'C. THEORETICAL APPROACHES IN EXPLAINING ETIOLOGY (20% - 20 ITEMS)',
        emphasis: 'Vignettes testing the diathesis-stress paradigm, neurotransmitter fluctuations, and gene-environment interaction models.',
        weight: 4,
        difficultyRating: 'Medium',
        description: 'Examines genetic, biological, and neurological bases of disorders, alongside learning, cognitive, psychoanalytic, interpersonal, and cultural models.',
        highYieldTerms: ['Diathesis-Stress Model', 'Reciprocal Gene-Environment', 'Neurotransmitters (Serotonin, Dopamine)', 'Cognitive Triad (Beck)', 'Defense Mechanisms', 'Suicide Etiology']
      },
      {
        id: 'abn-therapeutic-interventions',
        name: 'D. THERAPEUTIC INTERVENTIONS (10% - 10 ITEMS)',
        emphasis: 'Selecting evidence-based therapeutic treatments (e.g., CBT, Dialectical Behavior Therapy, Exposure therapy) based on diagnosis.',
        weight: 2,
        difficultyRating: 'Medium',
        description: 'Covers different psychological interventions, their applications for severe disorders, and assessing scientific clinical treatment efficacy.',
        highYieldTerms: ['CBT (Cognitive Behavioral Therapy)', 'DBT (Dialectical Behavior Therapy)', 'Systematic Desensitization', 'Efficacy Measures', 'Psychopharmacology Adjuncts']
      },
      {
        id: 'abn-sociocultural-ethics',
        name: 'E. SOCIO-CULTURAL FACTORS & ETHICS IN DIAGNOSING (5% - 5 ITEMS)',
        emphasis: 'Diagnosing fairly across cultural idioms of distress while avoiding toxic diagnostic labels and respecting privacy rights.',
        weight: 1,
        difficultyRating: 'Medium',
        description: 'Explores cultural concepts of distress (Dhat, Amok, Koro) and basic ethical principles (non-maleficence, client dignity) in formal diagnosis.',
        highYieldTerms: ['Cultural Idioms of Distress', 'Negative Labelling/Stigmatization', 'Ethical Standards of Diagnosing', 'Diagnostic Label Utility']
      },
      {
        id: 'abn-crisis-mhlaw',
        name: 'F. GLOBAL HEALTH CRISIS AND MENTAL HEALTH LAW (10% - 10 ITEMS)',
        emphasis: 'Applying the mandates of the Philippine Mental Health Act (RA 11036) and planning crisis/disaster mental health strategies.',
        weight: 2,
        difficultyRating: 'Low',
        description: 'Covers the impact of massive health crises (like COVID-19) on human mental wellness, and the active execution of Republic Act 11036.',
        highYieldTerms: ['Republic Act 11036', 'Rights of Service Users', 'Informing Consent in Crisis', 'Psychological First Aid (PFA)', 'Disaster Response Protocols']
      }
    ]
  },
  {
    id: 'developmental',
    name: 'Developmental Psychology',
    overallWeight: '20% of Board GWA',
    colorClass: 'text-amber-700 border-amber-200',
    bgClass: 'bg-amber-50/15',
    borderClass: 'border-amber-100',
    topics: [
      {
        id: 'dev-nature-nurture',
        name: 'A. PERSPECTIVES ON NATURE AND NURTURE (5% - 5 ITEMS)',
        emphasis: 'Identifying evocative, passive, and active (niche-picking) gene-environment correlations in developmental scenarios.',
        weight: 1,
        difficultyRating: 'Low',
        description: 'Examines core development processes (biological, cognitive, socio-emotional domains) and the interplay between genetic predispositions and environment.',
        highYieldTerms: ['Active GeneCorrelation/Niche-Picking', 'Evocative Correlations', 'Passive Correlations', 'Nature vs. Nurture Interplay', 'Epigenetic Framework']
      },
      {
        id: 'dev-research-methods',
        name: 'B. RESEARCH METHODS & ETHICS (5% - 5 ITEMS)',
        emphasis: 'Differentiating cross-sectional from longitudinal designs, and isolating confounding cohort effects.',
        weight: 1,
        difficultyRating: 'Medium',
        description: 'Covers primary methodologies in lifelong human research, cohort constraints, APA principles, and PAP ethical guidelines for minors.',
        highYieldTerms: ['Cohort Effects', 'Cross-Sectional Studies', 'Longitudinal Designs', 'Assent from Minors', 'Sequential Studies']
      },
      {
        id: 'dev-theories',
        name: 'C. DEVELOPMENTAL THEORIES (25% - 25 ITEMS)',
        emphasis: 'Vignettes testing Piaget stages (e.g. object permanence, conservation), Erikson, Freud, Kohlberg, and Ainsworth attachment profiles.',
        weight: 5,
        difficultyRating: 'High',
        description: 'Classic developmental systems: Freud psychosexual, Erikson psychosocial, Piaget cognitive, Kohlberg moral, Bronfenbrenner ecological, Vygotsky sociocultural, Ainsworth attachment, Mahler separation, Marcia identity, and Wilson evolutionary models.',
        highYieldTerms: ['Separation-Individuation (Mahler)', 'Zone of Proximal Development (Vygotsky)', 'Scaffolding', 'Postconventional Morality (Kohlberg)', 'Identity Moratorium (Marcia)', 'Secure vs. Disorganized Attachment']
      },
      {
        id: 'dev-principles',
        name: 'D. DEVELOPMENTAL PRINCIPLES (5% - 5 ITEMS)',
        emphasis: 'Applying characteristics of life-span development (multidirectional, plastic, contextual, lifelong, multidisciplinary) to clinical cases.',
        weight: 1,
        difficultyRating: 'Low',
        description: 'Discusses essential principles guiding safe development, biological limits of human plastic processes, and life-limiting trajectories.',
        highYieldTerms: ['Life-Span Plasticity', 'Multidirectional Growth', 'History-Graded Influences', 'Normative Age-Graded Events']
      },
      {
        id: 'dev-stages-tasks',
        name: 'E. DEVELOPMENTAL ISSUES AND STAGE TASKS (30% - 30 ITEMS)',
        emphasis: 'Evaluating developmental tasks across infancy, childhood, adolescence, and adulthood, alongside death, dying, and bereavement.',
        weight: 6,
        difficultyRating: 'Medium',
        description: 'Explores prenatal risks, physical, cognitive, socio-emotional transitions, expected Havighurst tasks, and handling grief or bereavement.',
        highYieldTerms: ['Havighurst Development Tasks', 'Teratogens', 'Organogenesis', 'Kubler-Ross Stages of Dying', 'Normative Crisis Transitions']
      },
      {
        id: 'dev-challenges-milestones',
        name: 'F. DEVELOPMENTAL CHALLENGES AND MILESTONES (30% - 30 ITEMS)',
        emphasis: 'Spotting developmental milestones (e.g., motor progress, pubertal markers, cognitive decline thresholds) and developmental challenges.',
        weight: 6,
        difficultyRating: 'Medium',
        description: 'Identifies biological and psychological stressors from birth to senescence, including learning disorders, mid-life crises, and end-of-life decision scenarios.',
        highYieldTerms: ['Fine vs. Gross Motor Milestones', 'Senescence', 'Age-Related Changes', 'Non-Normative Life Events', 'Adaptive Coping Skills']
      }
    ]
  },
  {
    id: 'io',
    name: 'Industrial/Organizational Psychology',
    overallWeight: '20% of Board GWA',
    colorClass: 'text-violet-700 border-violet-250',
    bgClass: 'bg-violet-50/20',
    borderClass: 'border-violet-100',
    topics: [
      {
        id: 'io-org-theory',
        name: 'A. ORGANIZATIONAL THEORY (20% - 20 ITEMS)',
        emphasis: 'Differentiating Classical (bureaucratic, administrative), Neoclassical (human relations), and Modern Open Systems theories of organizations.',
        weight: 4,
        difficultyRating: 'Medium',
        description: 'Covers organizational models, motivations, and systems. Applies theories to manage leadership, communication channels, operational excellence, and corporate culture.',
        highYieldTerms: ['Fayol Administrative Principles', 'Weber Bureaucracy Model', 'Hawthorne Studies', 'Open Systems Feedback', 'Contingency Theory Core']
      },
      {
        id: 'io-structures-systems',
        name: 'B. ORGANIZATIONAL STRUCTURES AND SYSTEMS (20% - 20 ITEMS)',
        emphasis: 'Analyzing pros and cons of Functional, Matrix, Flat, and Hierarchical designs, plus elements like delegation and span of control.',
        weight: 4,
        difficultyRating: 'Medium',
        description: 'Examines the strategic design of structures, job roles, departmentation mechanisms, span of control parameters, and alignment of structures with overarching business strategy.',
        highYieldTerms: ['Matrix Structure', 'Span of Control', 'Chain of Command', 'Job Design Elements', 'Organizational Role Ambiguity']
      },
      {
        id: 'io-hrd-hrm',
        name: 'C. HUMAN RESOURCE DEV\'T & MANAGEMENT (25% - 25 ITEMS)',
        emphasis: 'Applying and contrasting Human Resource Development (HRD), Human Resource Management (HRM), and Organizational Development (OD).',
        weight: 5,
        difficultyRating: 'High',
        description: 'Examines practices including manpower planning, staffing, active talent management, training program design, performance appraisal metrics, and employee engagement.',
        highYieldTerms: ['HRD vs. HRM Differences', 'Kirkpatrick\'s Training Evaluation', 'Performance Appraisals (BARS, MBO)', '360-Degree Feedback', 'Succession Planning']
      },
      {
        id: 'io-team-dynamics',
        name: 'D. TEAM DYNAMICS (15% - 15 ITEMS)',
        emphasis: 'Managing Tuckman\'s stages (Forming, Storming, Norming, Performing), combating groupthink, and containing social loafing.',
        weight: 3,
        difficultyRating: 'Low',
        description: 'Highlights group processes, common team challenges, conflict management modes, and methods to boost task cohesion and performance accountability.',
        highYieldTerms: ['Tuckman\'s Stages', 'Social Loafing (Ringelmann Effect)', 'Groupthink Symptoms', 'Interpersonal Cohesion', 'Conflict Resolution Styles']
      },
      {
        id: 'io-change-dev',
        name: 'E. ORGANIZATIONAL CHANGE & DEVELOPMENT (20% - 20 ITEMS)',
        emphasis: 'Executing Lewin\'s 3-step change model, managing corporate resistance, and evaluating structured OD interventions.',
        weight: 4,
        difficultyRating: 'Medium',
        description: 'Covers factors driving systemic transformations, large-scale changes, and choosing specific structural or behavioral organizational interventions.',
        highYieldTerms: ['Lewin\'s Unfreeze-Change-Refreeze', 'Resistance to Change', 'Action Research Model', 'Technostructural Interventions', 'Appreciative Inquiry']
      }
    ]
  }
];

export const TosTrackerPanel: React.FC<TosTrackerPanelProps> = ({ profile, setProfile }) => {
  const [selectedTopic, setSelectedTopic] = useState<TosTopic | null>(null);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('assessment');

  const progress = profile.tosProgress || {};

  // Calculate stats
  let totalTopicsCount = 0;
  let unreadCount = 0;
  let reviewingCount = 0;
  let masteredCount = 0;

  TOS_DATA.forEach(sub => {
    sub.topics.forEach(top => {
      totalTopicsCount++;
      const status = progress[top.id] || 'unread';
      if (status === 'unread') unreadCount++;
      else if (status === 'reviewing') reviewingCount++;
      else if (status === 'mastered') masteredCount++;
    });
  });

  const completionPercentage = Math.round((masteredCount / totalTopicsCount) * 100);

  const handleUpdateStatus = (topicId: string, nextStatus: 'unread' | 'reviewing' | 'mastered') => {
    setProfile(prev => {
      if (!prev) return prev;
      const updatedTosProgress = {
        ...prev.tosProgress,
        [topicId]: nextStatus
      };

      // Grant a tiny XP bonus on mastering a topic for the first time!
      const currentStatus = prev.tosProgress?.[topicId] || 'unread';
      let xpAward = 0;
      if (currentStatus !== 'mastered' && nextStatus === 'mastered') {
        xpAward = 50; // +50 XP milestone for mastering a curriculum domain!
      }

      const updated = {
        ...prev,
        totalXp: prev.totalXp + xpAward,
        tosProgress: updatedTosProgress
      };
      
      localStorage.setItem(`bp_profile_${prev.email}`, JSON.stringify(updated));
      return updated;
    });

    if (selectedTopic && selectedTopic.id === topicId) {
      setSelectedTopic(prev => prev ? { ...prev } : null);
    }
  };

  const activeSubject = TOS_DATA.find(s => s.id === selectedSubjectId) || TOS_DATA[0];

  return (
    <div id="tos-tracker-workspace" className="space-y-6 select-none animate-in fade-in duration-200">
      
      {/* Overview Block */}
      <div className="bg-white border border-gray-150 rounded-3xl p-6 shadow-xs relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.015] bg-[radial-gradient(#104030_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 text-center md:text-left max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] uppercase font-black tracking-widest text-[#104030] bg-foam/80 border border-pine/10 font-mono">
              <Clipboard className="w-3.5 h-3.5 text-pine" />
              PRC Board Certified Framework
            </span>
            <h2 className="font-display text-2xl text-pine tracking-tight">
              Philippine Psychometrician Table of Specifications (TOS)
            </h2>
            <p className="text-xs text-gray-500 leading-relaxed font-sans font-medium">
              The Table of Specifications (TOS) is the official PRC examination blueprint. Every question on the actual Board Exam (Personality 20%, Assessment 30%, Abnormal 30%, I/O 20%) is strictly apportioned across these exact skill specifications. Monitor your mastery to assure readiness.
            </p>
          </div>

          {/* Graphical circular meter */}
          <div className="flex-shrink-0 flex flex-col items-center justify-center p-3.5 bg-[#deebe3]/30 border border-emerald-250/30 rounded-3xl min-w-[150px]">
            <div className="relative flex items-center justify-center">
              {/* Circular gauge */}
              <svg className="w-20 h-20 transform -rotate-90">
                <circle
                  cx="40"
                  cy="40"
                  r="34"
                  className="stroke-gray-100 fill-none"
                  strokeWidth="6"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="34"
                  className="stroke-pine fill-none transition-all duration-500"
                  strokeWidth="6"
                  strokeDasharray={2 * Math.PI * 34}
                  strokeDashoffset={2 * Math.PI * 34 * (1 - completionPercentage / 100)}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute text-base font-display font-black text-pine">{completionPercentage}%</span>
            </div>
            <span className="text-[8px] uppercase tracking-widest font-black text-pine/80 font-mono mt-1.5 leading-none">Curricula Mastered</span>
            <span className="text-[10px] text-gray-400 font-mono mt-1">{masteredCount} of {totalTopicsCount} domains</span>
          </div>
        </div>

        {/* Dynamic score summary badges */}
        <div className="grid grid-cols-3 gap-3 border-t border-gray-100 pt-5 mt-5 font-mono text-[9px] font-black uppercase text-center tracking-wider">
          <div className="bg-gray-50 border border-gray-200/50 p-2.5 rounded-xl">
            <span className="block text-gray-400 text-[8px] tracking-widest">Unread</span>
            <span className="text-xs text-gray-700 font-sans font-black">{unreadCount} Domains</span>
          </div>
          <div className="bg-amber-50/60 border border-amber-250/40 p-2.5 rounded-xl">
            <span className="block text-amber-600 text-[8px] tracking-widest">In-Progress Review</span>
            <span className="text-xs text-amber-700 font-sans font-black">{reviewingCount} Domains</span>
          </div>
          <div className="bg-emerald-50 border border-emerald-250/30 p-2.5 rounded-xl">
            <span className="block text-emerald-600 text-[8px] tracking-widest">Completed Mastery</span>
            <span className="text-xs text-emerald-800 font-sans font-black">{masteredCount} Domains</span>
          </div>
        </div>
      </div>

      {/* Main interactive tracker board */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Subject selector sidebar */}
        <div className="lg:col-span-4 space-y-2 bg-white border border-gray-150 p-4 rounded-2xl shadow-xs">
          <span className="text-[9px] uppercase font-black text-gray-400 tracking-widest font-mono block mb-2 px-1">
            Subject Specification Units
          </span>

          <div className="space-y-1.5">
            {TOS_DATA.map((subj) => {
              const active = selectedSubjectId === subj.id;
              
              // stats per subject
              let subMastered = 0;
              subj.topics.forEach(t => {
                if (progress[t.id] === 'mastered') subMastered++;
              });
              
              return (
                <button
                  key={subj.id}
                  onClick={() => {
                    setSelectedSubjectId(subj.id);
                    setSelectedTopic(null);
                  }}
                  className={`w-full text-left p-3 rounded-xl border transition duration-150 flex flex-col justify-between items-stretch outline-none select-none ${
                    active 
                      ? 'bg-pine text-cream border-transparent shadow-xs' 
                      : 'bg-white border-gray-150 text-[#2e4737] hover:bg-gray-50 hover:border-gray-300'
                  }`}
                >
                  <div className="flex justify-between items-center w-full">
                    <span className="text-xs font-black tracking-tight">{subj.name}</span>
                    <span className={`text-[8.5px] font-mono uppercase px-1.5 py-0.5 rounded-full font-black ${
                      active ? 'bg-foam text-pine' : 'bg-gray-100 text-gray-500 border border-gray-200'
                    }`}>
                      {subj.overallWeight.split(' ')[0]}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center mt-2 border-t border-dashed pt-2 w-full border-current opacity-70">
                    <span className="text-[9px] font-mono uppercase leading-none">Completion Indicator</span>
                    <span className="text-[10px] font-bold leading-none">{subMastered}/{subj.topics.length} Mastered</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Topics grid listing */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white border border-gray-150 p-5 rounded-2xl shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b pb-3 border-gray-100">
              <div className="space-y-0.5">
                <span className="text-[9px] uppercase font-mono tracking-widest text-teal-800 bg-[#deebe3] px-2 py-0.5 rounded-full font-black border border-emerald-250/20">
                  {activeSubject.overallWeight}
                </span>
                <h3 className="font-display text-base text-pine font-semibold mt-1">{activeSubject.name}</h3>
              </div>
              <span className="text-[9px] uppercase text-gray-400 font-mono tracking-wider">
                {activeSubject.topics.length} Syllabus criteria blocks
              </span>
            </div>

            <div className="space-y-3">
              {activeSubject.topics.map((topic) => {
                const status = progress[topic.id] || 'unread';
                const isExpanded = selectedTopic?.id === topic.id;

                const getStatusBadge = () => {
                  switch (status) {
                    case 'mastered':
                      return <span className="bg-emerald-50 text-emerald-800 border-emerald-200 border text-[9px] font-mono font-black uppercase px-2.5 py-1 rounded-full flex items-center gap-1">🟢 Mastered (+50 XP Claimed)</span>;
                    case 'reviewing':
                      return <span className="bg-amber-50 text-amber-800 border-amber-250/40 border text-[9px] font-mono font-black uppercase px-2.5 py-1 rounded-full flex items-center gap-1">🟡 Reviewing</span>;
                    default:
                      return <span className="bg-gray-100 text-gray-500 border-gray-200 border text-[9px] font-mono font-black uppercase px-2.5 py-1 rounded-full flex items-center gap-1">⚪ Unread</span>;
                  }
                };

                return (
                  <div 
                    key={topic.id} 
                    className={`border rounded-xl transition duration-150 overflow-hidden ${
                      isExpanded ? 'border-pine-light ring-1 ring-pine-light bg-foam/10' : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div 
                      onClick={() => setSelectedTopic(isExpanded ? null : topic)}
                      className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer select-none active:bg-gray-50/50"
                    >
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400">
                          Approx {topic.weight}% Assessment Ratio • difficulty: {topic.difficultyRating}
                        </span>
                        <h4 className="text-xs font-black text-gray-900 leading-tight">
                          {topic.name}
                        </h4>
                      </div>

                      <div className="flex-shrink-0 self-start sm:self-auto">
                        {getStatusBadge()}
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="px-4 pb-4 border-t border-gray-100 pt-3 bg-gray-50/45 space-y-4">
                        <div className="space-y-1.5">
                          <span className="text-[8.5px] uppercase tracking-wider font-mono font-black text-gray-400 block">Syllabus Scope</span>
                          <p className="text-[11px] leading-relaxed text-gray-600 font-sans">
                            {topic.description}
                          </p>
                        </div>

                        <div className="space-y-1.5">
                          <span className="text-[8.5px] uppercase tracking-wider font-mono font-black text-gray-400 block">Exemplar Board Emphasis</span>
                          <p className="text-[11px] font-sans text-gray-700 italic border-l-2 border-pine pl-3.5 italic bg-foam/30 py-2 rounded-r-xl">
                            &quot;{topic.emphasis}&quot;
                          </p>
                        </div>

                        {/* High yield terms chips */}
                        <div className="space-y-2">
                          <span className="text-[8.5px] uppercase tracking-wider font-mono font-black text-gray-400 block">High Yield Lexicon &amp; Concepts</span>
                          <div className="flex flex-wrap gap-1.5">
                            {topic.highYieldTerms.map((term, i) => (
                              <span 
                                key={i} 
                                className="bg-white border border-gray-150 text-teal-950 font-mono text-[9px] font-semibold px-2.5 py-1 rounded-lg"
                              >
                                {term}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Status updating toggles */}
                        <div className="pt-3 border-t border-dashed border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                          <div className="flex items-center gap-1">
                            <Sparkles className="w-4 h-4 text-amber-500" />
                            <span className="text-[10px] font-bold text-gray-500 font-mono">Curricula Status Action:</span>
                          </div>

                          <div className="flex gap-2">
                            <button
                              onClick={() => handleUpdateStatus(topic.id, 'unread')}
                              className={`px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider rounded-lg border transition ${
                                status === 'unread' 
                                  ? 'bg-gray-100 text-gray-650 border-gray-350' 
                                  : 'bg-white text-gray-400 border-gray-200 hover:text-gray-600'
                              }`}
                            >
                              Reset
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(topic.id, 'reviewing')}
                              className={`px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider rounded-lg border transition ${
                                status === 'reviewing' 
                                  ? 'bg-amber-500 text-white border-amber-600 shadow-xs' 
                                  : 'bg-white text-amber-600 border-amber-200 hover:bg-amber-50'
                              }`}
                            >
                              Reviewing
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(topic.id, 'mastered')}
                              className={`px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider rounded-lg border transition ${
                                status === 'mastered' 
                                  ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs' 
                                  : 'bg-white text-emerald-600 border-emerald-200 hover:bg-emerald-50'
                              }`}
                            >
                              Mastered (+50 XP)
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
