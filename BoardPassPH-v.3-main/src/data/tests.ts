import { PsychologyTest } from '../types';

export const CATEGORIES = [
  { id: 'cognitive', name: '1. Cognitive Scales' },
  { id: 'personality', name: '2. Personality Inventories' },
  { id: 'projective', name: '3. Projective Techniques' },
  { id: 'mood', name: '4. Mood Scales' },
  { id: 'career', name: '5. Interest & Career Tests' }
];

export const TESTS: PsychologyTest[] = [
  // COGNITIVE SCALES
  {
    id: "wisc-v",
    name: "Wechsler Intelligence Scale for Children (WISC-V)",
    category: "cognitive",
    developer: "David Wechsler",
    quickInfo: "Gold standard individual intelligence test for children aged 6 to 16.",
    purpose: "Assesses cognitive ability, intellectual giftedness, and learning difficulties in children.",
    administration: {
      type: "Individual",
      items: "21 subtests",
      ageRange: "6 to 16 years (6:0 to 16:11)",
      time: "65-90 min",
      trainingNeeded: "Level C"
    },
    scoring: "Full Scale IQ (FSIQ) and 5 primary index scores. Mean is 100 with SD of 15.",
    interpretation: "Scores >=130 represent clinical giftedness; <=69 represents intellectual disability.",
    versions: "WISC, WISC-R, WISC-III, WISC-IV, WISC-V",
    factorsMeasured: "Verbal comprehension, spatial reasoning, abstract logic, short memory, speed.",
    subtests: [
      {
        name: "Verbal Comprehension Index (VCI)",
        definition: "Measures verbal reasoning, concept formation, and acquired factual knowledge from the environment.",
        highMeaning: "Strong verbal database, elegant vocabulary retrieval, elevated conceptual matching, and rich academic exposure.",
        lowMeaning: "Speech/grammar retrieval struggles, limited exposure to educational stimuli, or language-based learning issues."
      },
      {
        name: "Visual Spatial Index (VSI)",
        definition: "Evaluates spatial processing, visual-motor integration, and mental synthesis of multi-dimensional shapes.",
        highMeaning: "Excellent non-verbal logic, clean visual assembly, and superior physical construction matching skills.",
        lowMeaning: "Dyspraxia, visual tracking challenges, or structural arrangement recognition deficits."
      },
      {
        name: "Fluid Reasoning Index (FRI)",
        definition: "Evaluates inductive visual logic, nonverbal categorization, and abstract quantitative conceptualization.",
        highMeaning: "Outstanding problem-solving flexibility, rapid recognition of implicit rules, and logic-based deduction.",
        lowMeaning: "Struggles with novel tasks, visual-perceptual logic blocks, or concrete-bound reasoning styles."
      },
      {
        name: "Working Memory Index (WMI)",
        definition: "Assesses immediate audio-visual retention, attention maintenance, and active informational manipulation.",
        highMeaning: "High capacity for holding multiple ideas at once, active concentration, and sequence tracking.",
        lowMeaning: "Easily distracted, low active verbal retention buffer, stress, or ADHD symptoms."
      },
      {
        name: "Processing Speed Index (PSI)",
        definition: "Measures visual scanning velocity, prompt graphomotor coordination, and rapid clerical selection.",
        highMeaning: "Quick clerical comparison, prompt handwriting feedback, and agile visual tracking.",
        lowMeaning: "Sluggish motor execution, clinical anxiety or over-attention to perfection, or fine motor processing delays."
      }
    ]
  },
  {
    id: "wais-iv",
    name: "Wechsler Adult Intelligence Scale - Fourth Edition (WAIS-IV)",
    category: "cognitive",
    developer: "David Wechsler",
    quickInfo: "Legendary individual adult intelligence battery for ages 16-90.",
    purpose: "Measures intellectual capabilities, cognitive declines, and organic brain syndromes.",
    administration: {
      type: "Individual",
      items: "15 subtests",
      ageRange: "16 to 90 years (16:0 to 90:11)",
      time: "60-90 min",
      trainingNeeded: "Level C",
    },
    scoring: "FSIQ + 4 Index Scores (VCI, PRI, WMI, PSI). Mean 100, SD 15.",
    interpretation: "Scores normalized around IQ 100 benchmark. Focuses on clinical deviations.",
    versions: "WAIS, WAIS-R, WAIS-III, WAIS-IV",
    factorsMeasured: "Crystallized/fluid logic, execution memory control, speed.",
    isSmo34: true,
    subtests: [
      {
        name: "Verbal Comprehension Index (VCI)",
        definition: "Reflects crystallized intelligence; evaluates verbal concept formation, language expression, and social knowledge retrieval.",
        highMeaning: "Superior language fluency, high conceptual clarity, and extensive environmental/factual memory.",
        lowMeaning: "Speech blocks, cognitive delays, restricted lexicon, or foreign language barriers."
      },
      {
        name: "Perceptual Reasoning Index (PRI)",
        definition: "Reflects fluid intelligence; assesses nonverbal fluid logic, visual-spatial categorization, and motor synthesis.",
        highMeaning: "Strong visual puzzle building, agile abstract non-verbal logic, and rapid structural coordination.",
        lowMeaning: "Poor visual-motor integration, spatial orientation errors, or constructional dyspraxia."
      },
      {
        name: "Working Memory Index (WMI)",
        definition: "Assesses active listening retention, attention focus, and mental mathematics sequencing.",
        highMeaning: "Exceptional short-term audio buffer, high concentration endurance, and active logic parsing.",
        lowMeaning: "Severe distractibility, anxiety, dyslexia, or immediate concentration fatigue."
      },
      {
        name: "Processing Speed Index (PSI)",
        definition: "Rates visual clerical accuracy, prompt cognitive scanning, and rapid decision processing speed.",
        highMeaning: "Agile clerical checkings, prompt motor speed, and lightning cognitive sorting.",
        lowMeaning: "Motor planning lapses, aging decline, high checking perfectionism, or traumatic head injuries."
      }
    ]
  },
  {
    id: "wais-iii",
    name: "Wechsler Adult Intelligence Scale - Third Edition (WAIS-III)",
    category: "cognitive",
    developer: "David Wechsler",
    quickInfo: "Prevalent clinical adult intelligence battery listed under standard guidelines.",
    purpose: "Measures intellectual capacity, verbal, and performance metrics in adult cohorts.",
    administration: {
      type: "Individual",
      items: "14 subtests",
      ageRange: "16:0 to 89:11 years",
      time: "75-100 min",
      trainingNeeded: "Level C"
    },
    scoring: "Verbal IQ (VIQ), Performance IQ (PIQ), Full Scale IQ (FSIQ). Mean 100, SD 15.",
    interpretation: "Traditional index comparing verbal expression against motor executive control.",
    versions: "WAIS, WAIS-R, WAIS-III, WAIS-IV",
    factorsMeasured: "Verbal comprehension, perceptual organization, working memory, processing speed.",
    isSmo34: true
  },
  {
    id: "wais-r",
    name: "Wechsler Adult Intelligence Scale - Revised (WAIS-R)",
    category: "cognitive",
    developer: "David Wechsler",
    quickInfo: "Historical 1981 revision of the core adult Wechsler scale.",
    purpose: "Classic assessment of general cognitive functions in adolescent and adult populations.",
    administration: {
      type: "Individual",
      items: "11 subtests",
      ageRange: "16 to 74 years",
      time: "60-90 min",
      trainingNeeded: "Level C"
    },
    scoring: "VIQ, PIQ, FSIQ. Mean 100, SD 15.",
    interpretation: "Standardized norms to diagnose cognitive deficits and learning milestones.",
    versions: "WAIS, WAIS-R, WAIS-III, WAIS-IV",
    factorsMeasured: "Information, Digit Span, Vocabulary, Arithmetic, Comprehension, Blocks, digit symbol.",
    isSmo34: true
  },
  {
    id: "wais",
    name: "Wechsler Adult Intelligence Scale (WAIS)",
    category: "cognitive",
    developer: "David Wechsler",
    quickInfo: "The original 1955 Wechsler adult intelligence test.",
    purpose: "Pioneering battery replacing Wechsler-Bellevue to evaluate adult intellectual capacity.",
    administration: {
      type: "Individual",
      items: "11 subtests",
      ageRange: "16 years and older",
      time: "65-90 min",
      trainingNeeded: "Level C"
    },
    scoring: "Verbal, Performance, and Full Scale IQ scores. Mean 100, SD 15.",
    interpretation: "Historic baseline for standardized performance testing protocols.",
    versions: "Wechsler-Bellevue, WAIS, WAIS-R, WAIS-III, WAIS-IV",
    factorsMeasured: "Verbal reasoning, perceptual motor skills, spatial orientation, attention.",
  },
  {
    id: "wechsler-bellevue",
    name: "Wechsler-Bellevue Intelligence Scale",
    category: "cognitive",
    developer: "David Wechsler",
    quickInfo: "The 1939 precursor to the WAIS; first to feature verbal & performance subscales.",
    purpose: "Measures intellectual functioning in adults, introducing deviations instead of mental age.",
    administration: {
      type: "Individual",
      items: "11 subtests",
      ageRange: "7 to 70 years",
      time: "60-90 min",
      trainingNeeded: "Level C"
    },
    scoring: "Verbal, Performance, and Full Scale IQ (Deviation-based). Mean 100, SD 15.",
    interpretation: "The foundational scale that shifted testing from Stanford-Binet mental ages to quotients.",
    versions: "Wechsler-Bellevue Form I & Form II",
    factorsMeasured: "Verbal capability, abstract performance, visual synthesis, digit tracking."
  },
  {
    id: "digit-span",
    name: "Digit Span (WAIS Subtest)",
    category: "cognitive",
    developer: "David Wechsler",
    quickInfo: "Immediate memory subtest from the Wechsler scales.",
    purpose: "Measures executive working storage, immediate audio recall, and distraction bounds.",
    administration: {
      type: "Individual",
      items: "Forwards, Backwards, and Sequencing",
      ageRange: "16 to 90 years",
      time: "5-10 min",
      trainingNeeded: "Level B"
    },
    scoring: "Raw score converted to scaled score (1 to 19 range, Mean 10, SD 3).",
    interpretation: "Low score points to anxiety, distraction, organic brain distress, or learning gaps.",
    versions: "Integrated standard task inside Wechsler scales",
    factorsMeasured: "Auditory retention, sequence tracking, mental flexibility."
  },
  {
    id: "stanford-binet",
    name: "Stanford-Binet Intelligence Scales (SB5)",
    category: "cognitive",
    developer: "Alfred Binet, Theodore Simon, & Lewis Terman",
    quickInfo: "Individually administered cognitive tracker evaluating 5 distinct indexing domains.",
    purpose: "Diagnoses developmental anomalies, intellectual giftings, and clinical weaknesses.",
    administration: {
      type: "Individual",
      items: "10 subtests",
      ageRange: "2 to 85+ years",
      time: "45-75 min",
      trainingNeeded: "Level C"
    },
    scoring: "Nonverbal IQ, Verbal IQ, Full Scale IQ. Mean 100, SD 15.",
    interpretation: "Identifies standard intellectual tiers from profound delays to gifted capabilities.",
    versions: "Binet-Simon, Stanford-Binet Form L-M, SB4, SB5",
    factorsMeasured: "Fluid reasoning, knowledge, quantitative calculation, visual space, working memory."
  },
  {
    id: "stanford-binet-form-lm",
    name: "Stanford-Binet Intelligence Scale: Form L-M (3rd Edition)",
    category: "cognitive",
    developer: "Lewis Terman & Maud Merrill",
    quickInfo: "Classic 1960 edition combining the best aspects of Form L and Form M.",
    purpose: "Measures intellectual development through a wide array of verbal and action tasks.",
    administration: {
      type: "Individual",
      items: "Varied task clusters by year levels",
      ageRange: "2 to Adult",
      time: "60-90 min",
      trainingNeeded: "Level C"
    },
    scoring: "Ratio IQ (Mental Age / Chronological Age * 100) on earlier versions, later standardized.",
    interpretation: "Highly useful for evaluating verbal reasoning and cognitive developmental thresholds.",
    versions: "Forms L & M, L-M Third Edition",
    factorsMeasured: "Verbal reasoning, visual comprehension, computational logic, perceptual skill."
  },
  {
    id: "stanford-binet-4th",
    name: "Stanford-Binet Intelligence Scale - 4th Edition",
    category: "cognitive",
    developer: "Robert L. Thorndike, Elizabeth P. Hagen, & Jerome M. Sattler",
    quickInfo: "The 1986 fourth edition implementing modern psychometric factor methodologies.",
    purpose: "Detailed appraisal of cognitive learning profiles using fifteen standardized subscales.",
    administration: {
      type: "Individual",
      items: "15 subtests",
      ageRange: "2 to 23 years",
      time: "60-90 min",
      trainingNeeded: "Level C"
    },
    scoring: "Composite Standard Age Score (SAS). Mean 100, SD 16.",
    interpretation: "Evaluates strengths and deficits within four distinct intelligence profiles.",
    versions: "SB1, SB2, SB3, SB_L-M, SB4, SB5",
    factorsMeasured: "Verbal reasoning, abstract visual reasoning, quantitative reasoning, short-term memory."
  },
  {
    id: "wisc-r",
    name: "Wechsler Intelligence Scale for Children - Revised (WISC-R)",
    category: "cognitive",
    developer: "David Wechsler",
    quickInfo: "The landmark 1974 child intelligence revision.",
    purpose: "Measures overall mental maturity and scholastic abilities in children aged 6 to 16.",
    administration: {
      type: "Individual",
      items: "12 subtests",
      ageRange: "6 to 16 years",
      time: "50-75 min",
      trainingNeeded: "Level C"
    },
    scoring: "Verbal, Performance, and Full Scale IQ scores. Mean 100, SD 15.",
    interpretation: "Traditional standard for placing special education and enrichment tracks.",
    versions: "WISC, WISC-R, WISC-III, WISC-IV, WISC-V",
    factorsMeasured: "Verbal fluency, perceptual categorization, coordination, task sequencing."
  },
  {
    id: "wisc-iii",
    name: "Wechsler Intelligence Scale for Children - Third Edition (WISC-III)",
    category: "cognitive",
    developer: "David Wechsler",
    quickInfo: "1991 standard pediatric intelligence scale introducing processing speed indexes.",
    purpose: "Assesses cognitive functioning and developmental delays in school-age cohorts.",
    administration: {
      type: "Individual",
      items: "13 subtests",
      ageRange: "6 to 16 years",
      time: "60-85 min",
      trainingNeeded: "Level C"
    },
    scoring: "VIQ, PIQ, FSIQ, and 4 Factor Indexes. Mean 100, SD 15.",
    interpretation: "Bridges conceptual deficits with psychomotor performance metrics.",
    versions: "WISC, WISC-R, WISC-III, WISC-IV, WISC-V",
    factorsMeasured: "Verbal comprehension, perceptual organization, freedom from distractibility, processing speed."
  },
  {
    id: "wisc-iv",
    name: "Wechsler Intelligence Scale for Children - Fourth Edition (WISC-IV)",
    category: "cognitive",
    developer: "David Wechsler",
    quickInfo: "2003 clinical standard version restructuring indexes to match modern cognitive theories.",
    purpose: "Diagnoses cognitive learning barriers, dyscalculia, and visual processing issues.",
    administration: {
      type: "Individual",
      items: "15 subtests",
      ageRange: "6:0 to 16:11 years",
      time: "65-80 min",
      trainingNeeded: "Level C"
    },
    scoring: "FSIQ + 4 Index Scores (VCI, PRI, WMI, PSI). Mean 100, SD 15.",
    interpretation: "Identifies discrepancies in working storage limits or attention processing pipelines.",
    versions: "WISC series, leading to WISC-V",
    factorsMeasured: "Verbal comprehension, perceptual reasoning, working memory, processing speed."
  },
  {
    id: "wppsi",
    name: "Wechsler Preschool and Primary Scale of Intelligence (WPPSI)",
    category: "cognitive",
    developer: "David Wechsler",
    quickInfo: "Original 1967 toddler and early childhood intelligence test.",
    purpose: "Evaluates child intellectual milestones for preschool and nursery class placements.",
    administration: {
      type: "Individual",
      items: "11 subtests",
      ageRange: "4:0 to 6:5 years",
      time: "50-60 min",
      trainingNeeded: "Level C"
    },
    scoring: "Verbal, Performance, and Full Scale IQ. Mean 100, SD 15.",
    interpretation: "Measures pre-academic readiness and cognitive growth in young pediatric age groups.",
    versions: "WPPSI, WPPSI-R, WPPSI-III, WPPSI-IV",
    factorsMeasured: "Vocabulary, motor skill, geometric construction, immediate sentence tracking."
  },
  {
    id: "wppsi-r",
    name: "Wechsler Preschool and Primary Scale of Intelligence - Revised (WPPSI-R)",
    category: "cognitive",
    developer: "David Wechsler",
    quickInfo: "1989 child revision with expanded items and colorful stimuli.",
    purpose: "Measures intellectual ability in young children, pinpointing clinical developmental gaps.",
    administration: {
      type: "Individual",
      items: "12 subtests",
      ageRange: "3:0 to 7:3 years",
      time: "50-65 min",
      trainingNeeded: "Level C"
    },
    scoring: "VIQ, PIQ, FSIQ. Mean 100, SD 15.",
    interpretation: "Tracks perceptual concept formation and linguistic logic foundations.",
    versions: "WPPSI, WPPSI-R, WPPSI-III, WPPSI-IV",
    factorsMeasured: "Verbal expression, spatial matching, hand-eye coordination, categorization."
  },
  {
    id: "wppsi-iii",
    name: "Wechsler Preschool and Primary Scale of Intelligence - Third Edition (WPPSI-III)",
    category: "cognitive",
    developer: "David Wechsler",
    quickInfo: "2002 version featuring simplified tasks and age-appropriate design.",
    purpose: "Understands child intellectual capacities and early developmental neuropsychological markers.",
    administration: {
      type: "Individual",
      items: "14 subtests",
      ageRange: "2:6 to 7:3 years",
      time: "30-50 min",
      trainingNeeded: "Level C"
    },
    scoring: "Full Scale IQ plus verbal, performance, and processing speed quotients. Mean 100, SD 15.",
    interpretation: "Differentiates early speech difficulties from general cognitive learning barriers.",
    versions: "WPPSI series, leading to WPPSI-IV",
    factorsMeasured: "Linguistic logic, visual spatial integration, processing acceleration, raw reasoning."
  },
  {
    id: "flanagan-industrial",
    name: "Flanagan Industrial Tests (FIT)",
    category: "cognitive",
    developer: "John C. Flanagan",
    quickInfo: "Targeted 18-test modular aptitude selection system.",
    purpose: "Measures technical, supervisory, and operational performance standards across industrial roles.",
    administration: {
      type: "Group or Individual",
      items: "18 standalone modular booklets",
      ageRange: "Adults / Job Applicants",
      time: "5-15 min per module",
      trainingNeeded: "Level B"
    },
    scoring: "Accuracy rating matching specific career tasks.",
    interpretation: "Correlates candidates to industrial tasks, engineering accuracy, and safe operations.",
    versions: "FIT Original Edition",
    factorsMeasured: "Arithmetic, assembly, mechanics, coding, tables, safety, scales."
  },
  {
    id: "fact-battery",
    name: "Flanagan Aptitude Classification Tests (FACT™ Battery)",
    category: "cognitive",
    developer: "John C. Flanagan",
    quickInfo: "Multi-aptitude vocational intelligence testing suite.",
    purpose: "Evaluates specialized occupational potential and technical job placement paths.",
    administration: {
      type: "Group or Individual",
      items: "16 test modules",
      ageRange: "High school to Adults",
      time: "120-180 min total",
      trainingNeeded: "Level B"
    },
    scoring: "Converted to occupational stanine levels (1 to 9 scale).",
    interpretation: "Scores matching high stanines indicate outstanding performance capability in technical fields.",
    versions: "FACT Standard Edition",
    factorsMeasured: "Inspection accuracy, pattern coding, numbers, mechanical components, precision logic."
  },
  {
    id: "k-abc",
    name: "Kaufman Assessment Battery for Children (K-ABC)",
    category: "cognitive",
    developer: "Alan S. Kaufman & Nadeen L. Kaufman",
    quickInfo: "Individually administered child cognitive and achievement battery.",
    purpose: "Differentiates step-by-step sequential and simultaneous cognitive processing styles.",
    administration: {
      type: "Individual",
      items: "18 subtests",
      ageRange: "3:0 to 18:11 years",
      time: "50-70 min",
      trainingNeeded: "Level C"
    },
    scoring: "Standard scores across Luria or CHC theory tracks. Mean 100, SD 15.",
    interpretation: "Great for evaluating speech delays or educational development without verbal bias.",
    versions: "K-ABC, KABC-II",
    factorsMeasured: "Sequential logic, fluid synthesis, working recall, long-term memory."
  },
  {
    id: "raven-spm",
    name: "Raven's Standard Progressive Matrices (SPM)",
    category: "cognitive",
    developer: "John C. Raven",
    quickInfo: "Legendary non-verbal g-factor abstract matrix test.",
    purpose: "Measures nonverbal eductive capability and clinical abstract reasoning.",
    administration: {
      type: "Group or Individual",
      items: "60 matrices across Sets A-E",
      ageRange: "6 to 80 years",
      time: "45 min",
      trainingNeeded: "Level B"
    },
    scoring: "Raw score out of 60 converted to age-based percentile markings.",
    interpretation: "Percentiles >= 95 flag high abstract ability; <= 5 warns of intellectual deficits.",
    versions: "Coloured (CPM), Standard (SPM), Advanced (APM)",
    factorsMeasured: "Eductive logic, visual reasoning, relationship mapping.",
    isSmo34: true
  },
  {
    id: "raven-cpm",
    name: "Colored Progressive Matrices (CPM)",
    category: "cognitive",
    developer: "John C. Raven",
    quickInfo: "Standard colored matrix test designed for young children and special patient cohorts.",
    purpose: "Evaluates observation and nonverbal logic in clinical and developmental screenings.",
    administration: {
      type: "Individual or Group",
      items: "36 items in Series A, Ab, B",
      ageRange: "5 to 11 years / Elderly",
      time: "15-30 min",
      trainingNeeded: "Level B"
    },
    scoring: "Raw score converted to percentile rankings by age norms.",
    interpretation: "Excellent for assessing nonverbal intelligence when sensory or speech barriers exist.",
    versions: "CPM, SPM, APM",
    factorsMeasured: "Perceptual matching, analogical reasoning, concrete schema completion."
  },
  {
    id: "raven-apm",
    name: "Advanced Progressive Matrices (APM)",
    category: "cognitive",
    developer: "John C. Raven",
    quickInfo: "High-ceiling matrix-based non-verbal reasoning test.",
    purpose: "Measures intellectual capability, abstract logic, and speed under high cognitive loads.",
    administration: {
      type: "Group or Individual",
      items: "36 items (Set II)",
      ageRange: "Adolescents and Adults",
      time: "40-60 min",
      trainingNeeded: "Level B"
    },
    scoring: "Raw score converted to adult percentile thresholds.",
    interpretation: "Differentiates intellectually superior individuals and advanced professional applicants.",
    versions: "APM Set I (practice) & Set II",
    factorsMeasured: "Fluid reasoning, complex pattern completion, rapid pattern matching."
  },
  {
    id: "wms-iii",
    name: "Wechsler Memory Scale - Third Edition (WMS-III)",
    category: "cognitive",
    developer: "David Wechsler",
    quickInfo: "Comprehensive evaluation of adult learning and memory capabilities.",
    purpose: "Identifies memory impairments, trauma damage, or clinical dementia markers.",
    administration: {
      type: "Individual",
      items: "11 subtests",
      ageRange: "16 to 90 years",
      time: "30-45 min",
      trainingNeeded: "Level C"
    },
    scoring: "8 Index scores (Immediate, Delayed, Working memory). Mean 100, SD 15.",
    interpretation: "Highlights selective performance deficits between visual recall and auditory tracking.",
    versions: "WMS, WMS-R, WMS-III, WMS-IV",
    factorsMeasured: "Verbal memory, visual memory, delayed retention, attention tracking.",
    isSmo34: true
  },
  {
    id: "lnnb",
    name: "Luria-Nebraska Neuropsychological Battery (LNNB)",
    category: "cognitive",
    developer: "Alexander Luria (Adapted by Charles Golden)",
    quickInfo: "Standardized clinical battery measuring complex organic neuropsychological traits.",
    purpose: "Diagnoses hemispheric and localized cerebral lesions or coordination dysfunctions.",
    administration: {
      type: "Individual",
      items: "269 items across 11 scales",
      ageRange: "15 years and older",
      time: "90-150 min",
      trainingNeeded: "Level C"
    },
    scoring: "Produces clinical T-scores. Elevations indicate organic brain lobe impairment.",
    interpretation: "Significant profile peaks identify specific sensory, motor, or language cortex problems.",
    versions: "Form I, Form II, LNNB-C (Child)",
    factorsMeasured: "Motor coordination, tactical integration, rhythmic speed, receptive speech, writing, memory."
  },
  {
    id: "culture-fair",
    name: "Culture Fair Intelligence Test (CFIT)",
    category: "cognitive",
    developer: "Raymond B. Cattell",
    quickInfo: "Non-verbal IQ test minimizing linguistic and socio-cultural factors.",
    purpose: "Measures inherent fluid cognitive capacity ('g' factor) independent of school exposure.",
    administration: {
      type: "Group or Individual",
      items: "4 timed abstract subscales",
      ageRange: "4 to Adult (Scales 1-3)",
      time: "20-30 min",
      trainingNeeded: "Level B"
    },
    scoring: "Raw score converted to normalized Fluid IQ (Mean 100, SD 16).",
    interpretation: "Tracks spatial and matrix logic, ideal for cross-cultural or multilingual evaluations.",
    versions: "Scale 1, Scale 2, Scale 3",
    factorsMeasured: "Fluid reasoning, series continuation, classifications, matrix logic.",
    isSmo34: true
  },
  {
    id: "benton-visual",
    name: "Benton Visual Retention Test (Benton)",
    category: "cognitive",
    developer: "Arthur L. Benton",
    quickInfo: "Classic clinical check measuring visual perception and memory accuracy.",
    purpose: "Screens for organic brain damage, visual-spatial issues, and dementia markers.",
    administration: {
      type: "Individual",
      items: "10 visual design cards",
      ageRange: "8 years to Adult",
      time: "10-15 min",
      trainingNeeded: "Level C"
    },
    scoring: "Number of correct designs reproduced (0-10) and total error count (0-24).",
    interpretation: "Elevated error patterns suggest focal lesions in the parietal or occipital lobes.",
    versions: "Forms C, D, E",
    factorsMeasured: "Visual memory, spatial drawing ability, immediate recollection."
  },
  {
    id: "differential-ability",
    name: "Differential Ability Scales (DAS)",
    category: "cognitive",
    developer: "Colin D. Elliott",
    quickInfo: "Comprehensive individually administered cognitive profiling battery.",
    purpose: "Analyzes specific learning strengths, academic readiness, and cognitive speed.",
    administration: {
      type: "Individual",
      items: "20 cognitive and achievement subtests",
      ageRange: "2:6 to 17:11 years",
      time: "45-90 min",
      trainingNeeded: "Level C"
    },
    scoring: "General Conceptual Ability (GCA) score. Mean 100, SD 15.",
    interpretation: "Assesses visual, verbal, and nonverbal logic boundaries in developmental therapy.",
    versions: "DAS, DAS-II",
    factorsMeasured: "Verbal logic, spatial visualization, quantitative calculations, execution speed."
  },
  {
    id: "k-tea",
    name: "Kaufman Test of Educational Achievement (K-TEA)",
    category: "cognitive",
    developer: "Alan S. Kaufman & Nadeen L. Kaufman",
    quickInfo: "Clinical individual achievement battery mapping educational needs.",
    purpose: "Identifies clinical reading, math, and written language learning deficits.",
    administration: {
      type: "Individual",
      items: "Comprehensive subtest battery",
      ageRange: "4 to 25 years",
      time: "50-80 min",
      trainingNeeded: "Level B"
    },
    scoring: "Standardized educational domain scores (Mean 100, SD 15).",
    interpretation: "Discrepancy between IQ and K-TEA highlights localized academic learning disorders.",
    versions: "K-TEA, KTEA-II, KTEA-3",
    factorsMeasured: "Reading decryption, reading comprehension, mathematical calculations, writing."
  },
  {
    id: "wrat",
    name: "Wide Range Achievement Test (WRAT)",
    category: "cognitive",
    developer: "Joseph F. Jastak",
    quickInfo: "Brief, rapid assessment of basic academic skill foundations.",
    purpose: "Identifies reading, spelling, and basic calculating dysfunctions.",
    administration: {
      type: "Individual or Group",
      items: "4 basic scales",
      ageRange: "5 to 94 years",
      time: "15-30 min",
      trainingNeeded: "Level B"
    },
    scoring: "Standard scores and grade equivalent levels. Mean 100, SD 15.",
    interpretation: "Enables fast diagnostic placement of clinical learning disorders.",
    versions: "WRAT, WRAT-R, WRAT-3, WRAT-4, WRAT-5",
    factorsMeasured: "Word decoding, reading comprehension, spelling, math arithmetic."
  },
  {
    id: "wrat-3",
    name: "Wide Range Achievement Test - Third Edition (WRAT-3)",
    category: "cognitive",
    developer: "Gary S. Wilkinson",
    quickInfo: "The 1993 edition of the popular academic achievement screener.",
    purpose: "Appraises core scholastic competencies across distinct age and industrial groups.",
    administration: {
      type: "Group or Individual",
      items: "Reading, Spelling, Arithmetic",
      ageRange: "5 to 75 years",
      time: "15-25 min",
      trainingNeeded: "Level B"
    },
    scoring: "Standard scores and national percentiles. Mean 100, SD 15.",
    interpretation: "Quickly estimates academic grade levels for vocational and counseling plans.",
    versions: "WRAT series",
    factorsMeasured: "Letter pronunciation, alphabetical coding, mathematical equation solving."
  },
  {
    id: "piat",
    name: "Peabody Individual Achievement Test (PIAT)",
    category: "cognitive",
    developer: "Lloyd Dunn & Frederick Markwardt",
    quickInfo: "Individually administered scholastic test utilizing a pointing format.",
    purpose: "Evaluates child skill profiles in reading, calculation, and general information.",
    administration: {
      type: "Individual (Pointing response)",
      items: "6 subscales",
      ageRange: "5 to 18 years",
      time: "30-40 min",
      trainingNeeded: "Level B"
    },
    scoring: "Standard domain scores, age equivalents, percentiles. Mean 100, SD 15.",
    interpretation: "Perfect for children with motor deficits or mild speech disorders.",
    versions: "PIAT, PIAT-R",
    factorsMeasured: "Mathematics, reading recognition, spelling, reading comprehension, general knowledge."
  },
  {
    id: "metropolitan-achievement",
    name: "Metropolitan Achievement Test",
    category: "cognitive",
    developer: "Walter N. Durost et al.",
    quickInfo: "Standardized group achievement battery used in classroom diagnostics.",
    purpose: "Measures overall academic progress and curriculum milestone attainment.",
    administration: {
      type: "Group administration",
      items: "Multiple choice packets",
      ageRange: "Kindergarten to Grade 12",
      time: "90-180 min",
      trainingNeeded: "Level A/B"
    },
    scoring: "Percentiles, stanines, and scale scores matching academic norms.",
    interpretation: "Indicates school system compliance, performance rankings, and learning progress.",
    versions: "MAT 1st to MAT 8 Editions",
    factorsMeasured: "Reading fluency, grammar, mathematical concepts, science logic, social sciences."
  },
  {
    id: "stanford-achievement",
    name: "Stanford Achievement Test",
    category: "cognitive",
    developer: "Truman Kelley, Giles Ruch, & Lewis Terman",
    quickInfo: "Classic academic group achievement test tracking school standards.",
    purpose: "Gauges student competencies in baseline curriculum areas.",
    administration: {
      type: "Group standard",
      items: "Comprehensive test modules",
      ageRange: "Grades K to 12",
      time: "2-3 hours",
      trainingNeeded: "Level A/B"
    },
    scoring: "Standard scores, national percentiles, and grade matching.",
    interpretation: "Identifies educational deficiencies and monitors program success metrics.",
    versions: "SAT 1 to SAT 10 Editions",
    factorsMeasured: "Spelling, listening comprehension, scientific facts, language mechanics, calculation logic."
  },
  {
    id: "vineland",
    name: "Vineland Adaptive Behavior Scales (VABS)",
    category: "cognitive",
    developer: "Edgar Doll (VABS-3 by Sara Sparrow et al.)",
    quickInfo: "Observer rating scale evaluating personal and social adaptive skills.",
    purpose: "Diagnoses intellectual and developmental disabilities when paired with IQ tests.",
    administration: {
      type: "Interviewer or Parent Checklist",
      items: "Multi-domain checklists",
      ageRange: "Birth to 90 years",
      time: "20-60 min",
      trainingNeeded: "Level B"
    },
    scoring: "Adaptive Behavior Composite standard score. Mean 100, SD 15.",
    interpretation: "Scores below 70 confirm functional adaptive deficits matching clinical criteria.",
    versions: "Vineland Social Maturity Scale, VABS-II, VABS-3",
    factorsMeasured: "Communication, daily living skills, socialization, motor coordination."
  },
  {
    id: "wiat",
    name: "Wechsler Individual Achievement Test (WIAT)",
    category: "cognitive",
    developer: "David Wechsler",
    quickInfo: "Clinical diagnostic tool measuring clinical academic skill blocks.",
    purpose: "Identifies discrepancies between general mental capabilities and actual academic skills.",
    administration: {
      type: "Individual",
      items: "9 subtests",
      ageRange: "4 to 85 years",
      time: "45-75 min",
      trainingNeeded: "Level B",
    },
    scoring: "Standard scores across domain indexes. Mean 100, SD 15.",
    interpretation: "Measures math or dyslexia bottlenecks for individualized interventions.",
    versions: "WIAT, WIAT-II, WIAT-III, WIAT-4",
    factorsMeasured: "Oral language, written expression, reading synthesis, mathematics.",
    isSmo34: true
  },
  {
    id: "wiat-ii",
    name: "Wechsler Individual Achievement Test - Second Edition (WIAT-II)",
    category: "cognitive",
    developer: "David Wechsler",
    quickInfo: "Second edition of the clinical educational achievement index.",
    purpose: "Assesses academic achievements and supports clinical learning disability determinations.",
    administration: {
      type: "Individual",
      items: "Pre-writing, calculations, oral reading",
      ageRange: "4 to 85 years",
      time: "50-80 min",
      trainingNeeded: "Level B"
    },
    scoring: "Standard domain composites and grade-equivalent values. Mean 100, SD 15.",
    interpretation: "Pinpoints verbal or quantitative gaps to optimize classroom support structures.",
    versions: "WIAT series",
    factorsMeasured: "Linguistic mechanics, reading comprehension, mathematical logic, spelling."
  },
  {
    id: "wj-cognitive",
    name: "Woodcock-Johnson III Test of Cognitive Ability",
    category: "cognitive",
    developer: "Richard Woodcock, Kevin McGrew, & Nancy Mather",
    quickInfo: "Comprehensive evaluation of cognitive processing profiles based on CHC theory.",
    purpose: "Maps cognitive processing capabilities, brain-related functions, and memory limits.",
    administration: {
      type: "Individual",
      items: "20 standard and extended subtests",
      ageRange: "2 to 90+ years",
      time: "60-90 min",
      trainingNeeded: "Level C"
    },
    scoring: "General Intellectual Ability (GIA) index. Mean 100, SD 15.",
    interpretation: "Explains cognitive hurdles using Horn-Cattell-Carroll (CHC) theory metrics.",
    versions: "WJ-R, WJ III, WJ IV",
    factorsMeasured: "Comprehension-knowledge, long-term retrieval, visual-spatial, auditory processing, processing speed."
  },
  {
    id: "wj-achievement",
    name: "Woodcock-Johnson III Test of Achievement",
    category: "cognitive",
    developer: "Richard Woodcock et al.",
    quickInfo: "CHC-aligned standardized academic achievement assessment battery.",
    purpose: "Evaluates academic skills, scholastic fluencies, and curriculum progress.",
    administration: {
      type: "Individual",
      items: "22 subtests across standard and extended clusters",
      ageRange: "2 to 90+ years",
      time: "60-70 min",
      trainingNeeded: "Level B"
    },
    scoring: "Standard educational domain scores. Mean 100, SD 15.",
    interpretation: "Maps educational mastery levels, assisting in dyslexia and learning disorder planning.",
    versions: "WJ III Achievement, WJ IV",
    factorsMeasured: "Reading fluency, calculations, spelling, writing, oral mechanics."
  },
  {
    id: "halstead-reitan",
    name: "Halstead-Reitan Neuropsychological Test Battery",
    category: "cognitive",
    developer: "Ward Halstead & Ralph Reitan",
    quickInfo: "Gold-standard clinical battery evaluating brain dysfunction and localization.",
    purpose: "Determines presence, source, and exact location of cerebral cortex anomalies.",
    administration: {
      type: "Individual standard",
      items: "Variable modular tests (typically 5-10 subtests)",
      ageRange: "15 years and older (Child options exist)",
      time: "4 to 6 hours",
      trainingNeeded: "Level C"
    },
    scoring: "Halstead Impairment Index (HII) ranging from 0.0 to 1.0.",
    interpretation: "Index values >= 0.4 represent active neuropsychological brain impairments.",
    versions: "Halstead-Reitan Battery (HRNB)",
    factorsMeasured: "Tactile perception, auditory-visual coordination, psychomotor speed, executive controls."
  },
  {
    id: "ppvt-r",
    name: "Peabody Picture Vocabulary Test -- Revised (PPVT-R)",
    category: "cognitive",
    developer: "Lloyd M. Dunn & Leota M. Dunn",
    quickInfo: "Rapid non-verbal pointing test assessing receptive vocabulary.",
    purpose: "Measures visual-receptive language skills, useful for nonverbal or high-anxiety patients.",
    administration: {
      type: "Individual (Pointing response)",
      items: "175 visual plates",
      ageRange: "2.5 to 40 years",
      time: "10-20 min",
      trainingNeeded: "Level B"
    },
    scoring: "Raw score converted to standard receptive quotient (Mean 100, SD 15).",
    interpretation: "Identifies comprehension levels without requiring verbal explanation from the user.",
    versions: "PPVT, PPVT-R, PPVT-III, PPVT-4, PPVT-5",
    factorsMeasured: "Receptive vocabulary, verbal verbal comprehension, conceptual categorization."
  },
  {
    id: "army-alpha-beta",
    name: "Army Alpha/Beta Test",
    category: "cognitive",
    developer: "Robert Yerkes et al. (WWI Committee)",
    quickInfo: "The historical WWI group-administered intelligence test.",
    purpose: "Enables rapid placement of military recruits (Alpha for literates, Beta for illiterates/foreigners).",
    administration: {
      type: "Group administration",
      items: "Varies (8 Alpha tests, 7 Beta tests)",
      ageRange: "Adults",
      time: "40-50 min",
      trainingNeeded: "Level B"
    },
    scoring: "Ranked along army letter grades (A to E classifications).",
    interpretation: "First broad demonstration of standardized group cognitive and vocational testing.",
    versions: "Army Alpha & Army Beta",
    factorsMeasured: "Verbal sequencing, math logic, abstract code tracking, maze tracing."
  },
  {
    id: "bender-gestalt-ii",
    name: "Bender Visual-Motor Gestalt Test, 2nd Edition",
    category: "cognitive",
    developer: "Lauretta Bender (Revised by Brannigan & Decker)",
    quickInfo: "Visual-motor copying test assessing visual maturation and integration.",
    purpose: "Screens for visual-motor maturation, learning gaps, or organic cerebral regression.",
    administration: {
      type: "Individual",
      items: "16 visual cards (Koppitz uses 9)",
      ageRange: "4 to 85+ years",
      time: "10-15 min",
      trainingNeeded: "Level C",
    },
    scoring: "Error counts (Distortion, Integration, Rotation, Perseveration).",
    interpretation: "High errors relative to chronologic norms suggest organic cerebral regression.",
    versions: "Bender-Gestalt I, Bender-Gestalt II",
    factorsMeasured: "Visual perceptual-motor coordination, drawing accuracy.",
    isSmo34: true
  },
  {
    id: "bender-monograph",
    name: "Bender Gestalt Monograph",
    category: "cognitive",
    developer: "Lauretta Bender",
    quickInfo: "The original 1938 monograph describing the Gestalt visual-motor test.",
    purpose: "Historic treatise on using visual coordinate patterns to understand personality and clinical delay.",
    administration: {
      type: "Individual",
      items: "9 classic figures",
      ageRange: "Children and Adults",
      time: "10 min",
      trainingNeeded: "Level C"
    },
    scoring: "Qualitative interpretation based on Wertheimer's Gestalt pattern principles.",
    interpretation: "First clinical blueprint linking drawing distortions to psychiatric and neurological issues.",
    versions: "Original 1938 Bender Monographs",
    factorsMeasured: "Visual maturation, structural orientation, coordination logic."
  },
  {
    id: "ctmm",
    name: "California Test of Mental Maturity (CTMM)",
    category: "cognitive",
    developer: "Elizabeth Sullivan, Willis Clark, & Ernest Tiegs",
    quickInfo: "Group intelligence test evaluating language and non-language attributes.",
    purpose: "Assesses cognitive intelligence profiles across school systems.",
    administration: {
      type: "Group standard",
      items: "12 analytical subscales",
      ageRange: "Kindergarten to Adults",
      time: "90 min",
      trainingNeeded: "Level B"
    },
    scoring: "Language IQ, Non-language IQ, and Full Scale IQ. Mean 100, SD 16.",
    interpretation: "Contrasts language-based intelligence markers with abstract visual logic.",
    versions: "CTMM Short & Long Forms",
    factorsMeasured: "Memory retention, spatial visualization, logical reasoning, numerical fluency, vocabulary."
  },
  {
    id: "dat",
    name: "Differential Aptitude Test (DAT)",
    category: "cognitive",
    developer: "George K. Bennett, Harold G. Seashore, & Alexander Wesman",
    quickInfo: "Integrated vocational multi-aptitude battery.",
    purpose: "Measures specific job capabilities for educational counseling and workplace placements.",
    administration: {
      type: "Group or Individual",
      items: "8 standalone subtests",
      ageRange: "Grades 7 to 12 / Adults",
      time: "2-3 hours total",
      trainingNeeded: "Level B"
    },
    scoring: "Percentile rankings across eight aptitude profiles.",
    interpretation: "Highlights vocational potentials like clerical accuracy, physical mechanics, or spatial logic.",
    versions: "Forms L & M, Form V & W, DAT Next Gen",
    factorsMeasured: "Verbal logic, numerical skill, abstract reasoning, spatial rotation, mechanical logic, clerical speed."
  },
  {
    id: "wonderlic",
    name: "Wonderlic Personnel Test (WPT)",
    category: "cognitive",
    developer: "Eldon F. Wonderlic",
    quickInfo: "Brief, timed cognitive ability test used widely in hiring.",
    purpose: "Measures general problem-solving, cognitive speed, and educational readiness under pressure.",
    administration: {
      type: "Group or Individual (Strictly Timed)",
      items: "50 items",
      ageRange: "Adolescents to Adults",
      time: "12 min",
      trainingNeeded: "Level A/B"
    },
    scoring: "Number of correct answers (0 to 50 score range).",
    interpretation: "Scores matching job benchmarks map applicant performance to complex industrial roles.",
    versions: "WPT-Q (Quick), WPT-R (Revised)",
    factorsMeasured: "Mathematical problem-solving, vocabulary logic, logic sequences, spatial matching."
  },
  {
    id: "torrance-creative",
    name: "Torrance Test of Creative Thinking (TTCT)",
    category: "cognitive",
    developer: "E. Paul Torrance",
    quickInfo: "Standardized benchmark tool measuring dynamic creative thinking.",
    purpose: "Appraises divergent thinking capabilities and creative logic profiles.",
    administration: {
      type: "Group or Individual",
      items: "Verbal and Figural booklets",
      ageRange: "Kindergarten to Adults",
      time: "60-90 min",
      trainingNeeded: "Level B"
    },
    scoring: "Evaluates Fluency, Flexibility, Originality, and Elaboration.",
    interpretation: "Scores point to creative problem-solving potential rather than static scholastic knowledge.",
    versions: "TTCT Verbal, TTCT Figural",
    factorsMeasured: "Divergent thinking, creative visualization, novelty, details."
  },
  {
    id: "woodcock-reading",
    name: "Woodcock Reading Mastery Test (WRMT)",
    category: "cognitive",
    developer: "Richard W. Woodcock",
    quickInfo: "Comprehensive individually administered checklist evaluating reading skills.",
    purpose: "Diagnoses reading delays, dyslexia signs, and monitors spelling progress.",
    administration: {
      type: "Individual",
      items: "9 clusters",
      ageRange: "4:6 to 75+ years",
      time: "30-50 min",
      trainingNeeded: "Level B"
    },
    scoring: "Standard domain scores, age equivalents. Mean 100, SD 15.",
    interpretation: "Highlights deficits in phonic decryption, comprehension, or vocabulary.",
    versions: "WRMT, WRMT-R, WRMT-III",
    factorsMeasured: "Visual word detection, phonic decoding, reading comprehension, vocabulary."
  },
  {
    id: "sdmt",
    name: "Stanford Diagnostic Mathematics Test",
    category: "cognitive",
    developer: "L. Beatty, R. Madden, E. Gardner, & B. Karlsen",
    quickInfo: "Standard education assessment analyzing math delays.",
    purpose: "Diagnoses specific learning bottlenecks in mathematical concepts and calculations.",
    administration: {
      type: "Group or Individual",
      items: "Varies by grade levels",
      ageRange: "Grades 1.5 to 12",
      time: "45-65 min",
      trainingNeeded: "Level A/B"
    },
    scoring: "Percentiles, stanines, and scale scores matching academic norms.",
    interpretation: "Isolates calculation errors from difficulties understanding mathematical concepts.",
    versions: "SDMT Red, Green, Brown levels",
    factorsMeasured: "Number concepts, computational skills, applications, fraction logic."
  },
  {
    id: "porteus-maze",
    name: "Porteus Maze Test",
    category: "cognitive",
    developer: "Stanley Porteus",
    quickInfo: "Non-verbal intelligence scale using maze traces.",
    purpose: "Assesses planning, foresight, and impulse control, minimizing verbal or educational influences.",
    administration: {
      type: "Individual",
      items: "Graduated maze templates",
      ageRange: "3 years to Adult",
      time: "15-25 min",
      trainingNeeded: "Level B"
    },
    scoring: "Mental Age (MA) credit based on errors and trails used.",
    interpretation: "Poor maze performance suggests impulsivity, frontal brain lobe distress, or psychopathy.",
    versions: "Vineland Revision, Extension, Series II",
    factorsMeasured: "Foresight, spatial navigation, physical coordination, impulse control."
  },
  {
    id: "pkp-lagmay",
    name: "Panukat ng Katalinuhang Pilipino (PKP)",
    category: "cognitive",
    developer: "Dr. Alfredo V. Lagmay",
    quickInfo: "Indigenous Filipino non-verbal and verbal intelligence test.",
    purpose: "Measures cognitive abilities of Filipinos, avoiding Western cultural bias.",
    administration: {
      type: "Group or Individual",
      items: "Standard Filipino cognitive booklets",
      ageRange: "Ages 16 and older",
      time: "45-60 min",
      trainingNeeded: "Level B",
    },
    scoring: "Normalized percentiles and sten scores matching Philippine norms.",
    interpretation: "Provides a culturally fair appraisal of cognitive capacity and reasoning skills.",
    versions: "PKP Standard Forms",
    factorsMeasured: "Verbal logic, spatial relationships, computational reasoning.",
    isSmo34: true
  },
  {
    id: "purdue-test",
    name: "Purdue Non-Language Test (PNLT)",
    category: "cognitive",
    developer: "Joseph Tiffin et al.",
    quickInfo: "Brief non-verbal geometric matching test.",
    purpose: "Assesses mental capability independent of educational or language barriers.",
    administration: {
      type: "Group or Individual",
      items: "48 matching items",
      ageRange: "Adolescents to Adults",
      time: "25 min",
      trainingNeeded: "Level B"
    },
    scoring: "Raw score converted to industrial percentile norms.",
    interpretation: "Measures spatial logic, making it ideal for selecting technical and assembly line workers.",
    versions: "PNLT Form A & Form B",
    factorsMeasured: "Geometric matching, spatial reasoning, detail discrimination."
  },
  {
    id: "thurstone-mental-alertness",
    name: "Thurstone Test of Mental Alertness (TTMA)",
    category: "cognitive",
    developer: "L.L. Thurstone & Thelma Gwinn Thurstone",
    quickInfo: "Brief, timed general intelligence screener.",
    purpose: "Evaluates capacity to acquire new skills, adjust to work changes, and solve problems quickly.",
    administration: {
      type: "Group or Individual (Strictly Timed)",
      items: "126 altitude items",
      ageRange: "Adolescents to Adults",
      time: "20 min",
      trainingNeeded: "Level B"
    },
    scoring: "Raw sum converted to percentiles. Yields Quantitative and Linguistic scores.",
    interpretation: "Indicates learning speed and mental quickness under office or industrial pressure.",
    versions: "TTMA Form A & Form B",
    factorsMeasured: "Linguistic logic, numerical calculations, verbal analogies, spelling accuracy."
  },
  {
    id: "watson-glaser",
    name: "Watson Glaser Critical Thinking Appraisal",
    category: "cognitive",
    developer: "Goodwin Watson & Edward Glaser",
    quickInfo: "High-ceiling assessment of critical reasoning abilities.",
    purpose: "Evaluates analytical thinking, argument construction, and logical deduction.",
    administration: {
      type: "Group or Individual",
      items: "40 to 80 items",
      ageRange: "Adolescents and Adults",
      time: "30-45 min",
      trainingNeeded: "Level B"
    },
    scoring: "Raw score matched to elite academic and industrial percentiles.",
    interpretation: "Strong predictive validity for law, executive leadership, or engineering success.",
    versions: "Forms A, B, WGCTA-III",
    factorsMeasured: "Drawing inferences, recognizing assumptions, deduction, interpretation, evaluating arguments."
  },
  {
    id: "army-gct",
    name: "Army General Classification Test (AGCT)",
    category: "cognitive",
    developer: "US Army (WWII Board)",
    quickInfo: "Historic WWII cognitive classification battery.",
    purpose: "Identifies cadet learning speed, technical potential, and leadership traits.",
    administration: {
      type: "Group administration",
      items: "150 question booklet",
      ageRange: "Adults",
      time: "40 min",
      trainingNeeded: "Level B"
    },
    scoring: "Standardized service classification quotients. Mean 100, SD 20.",
    interpretation: "Placed millions of wartime enlistees into technical positions and officer training routes.",
    versions: "AGCT Forms 1a to 1d",
    factorsMeasured: "Verbal recognition, math calculations, spatial mapping."
  },
  {
    id: "drs-2",
    name: "Dementia Rating Scale - Second Edition (DRS-2)",
    category: "cognitive",
    developer: "Steven Mattis",
    quickInfo: "In-depth clinical battery assessing cognitive decline.",
    purpose: "Measures cognitive declines, dementia progress, and neuropathological delays.",
    administration: {
      type: "Individual",
      items: "36 items across 5 tasks",
      ageRange: "Ages 56 to 95 and older",
      time: "15-30 min",
      trainingNeeded: "Level C"
    },
    scoring: "Total score of 144. Higher values indicate normal cognitive functions.",
    interpretation: "Differentiates normal aging declines from active neuropathological dementia.",
    versions: "Mattis DRS, DRS-2",
    factorsMeasured: "Attention tracking, physical coordination, conceptual reasoning, verbal construction, memory recall."
  },
  {
    id: "sternberg-triarchic",
    name: "Sternberg Triarchic Abilities Test (STAT)",
    category: "cognitive",
    developer: "Robert Sternberg",
    quickInfo: "Ability test evaluating Sternberg's three-part model of intelligence.",
    purpose: "Profiles analytic, creative, and practical intelligence, avoiding traditional static academic testing.",
    administration: {
      type: "Group or Individual",
      items: "9 subtests (verbal, quantitative, figural)",
      ageRange: "Ages 5 to Adults",
      time: "70-90 min",
      trainingNeeded: "Level B"
    },
    scoring: "Separate scores for Analytical, Creative, and Practical abilities.",
    interpretation: "Reveals balanced learning profiles, indicating strengths in real-world situations and academic settings.",
    versions: "STAT Level H (High School), Level A (Adult)",
    factorsMeasured: "Analytical logic, divergent creativity, practical problem-solving."
  },
  {
    id: "rist-2",
    name: "RIST-2: Reynolds Intellectual Screening Test",
    category: "cognitive",
    developer: "Cecil R. Reynolds & Ronald B. Shultz",
    quickInfo: "Highly efficient 2-subtest brief intelligence screener.",
    purpose: "Provides rapid, reliable assessment of intellectual functioning for clinical or educational screenings.",
    administration: {
      type: "Individual",
      items: "Guess What (verbal) & Odd-Item Out (non-verbal)",
      ageRange: "3 to 94 years",
      time: "10-15 min",
      trainingNeeded: "Level C"
    },
    scoring: "RIST Index score. Mean 100, SD 15.",
    interpretation: "Identifies individuals needing further, comprehensive neuropsychological evaluations.",
    versions: "RIST, RIST-2",
    factorsMeasured: "Verbal concept formation, non-verbal spatial reasoning."
  },
  {
    id: "adhdt-2",
    name: "ADHDT-2: Attention-Deficit/Hyperactivity Disorder Test",
    category: "cognitive",
    developer: "James E. Gilliam",
    quickInfo: "Standardized norm-referenced rating scale screening for ADHD.",
    purpose: "Aids in diagnosing ADHD and assessing severity in school-aged children.",
    administration: {
      type: "Observer Rating scale",
      items: "56 behavior items",
      ageRange: "5 to 17 years",
      time: "10-15 min",
      trainingNeeded: "Level B"
    },
    scoring: "ADHD Index and Probability, percentile rankings.",
    interpretation: "Identifies clinical risk thresholds and confirms the presence of hyperactive or inattentive behaviors.",
    versions: "ADHDT, ADHDT-2",
    factorsMeasured: "Inattention, hyperactivity, impulsivity."
  },

  // PERSONALITY INVENTORIES
  {
    id: "mmpi-2",
    name: "Minnesota Multiphasic Personality Inventory (MMPI-2)",
    category: "personality",
    developer: "Starke R. Hathaway & J. Charnley McKinley",
    quickInfo: "Gold-standard objective clinical personality inventory.",
    purpose: "Evaluates severe clinical psychopathology and tracks defense profiles.",
    administration: {
      type: "Self-Administered / Group",
      items: "567 True/False items",
      ageRange: "18 years and older",
      time: "60-90 min",
      trainingNeeded: "Level C",
    },
    scoring: "Validity scales (L, F, K) and 10 Clinical scales. Standardized T-scores, Mean 50, SD 10.",
    interpretation: "T-scores >= 65 indicate clinically elevated psychiatric symptoms or distress.",
    versions: "MMPI, MMPI-2, MMPI-2-RF, MMPI-3",
    factorsMeasured: "Depression, anxiety, conversion hysteria, hypochondriasis, psychopathic deviance, paranoia.",
    isSmo34: true,
    subtests: [
      {
        name: "L Scale (Lie Scale)",
        definition: "Detects deliberate, naive attempts of a subject to present themselves in an overly positive, moralistic light.",
        highMeaning: "Strong defensive attempts to present an unrealistically perfect image, denial of common human frailties.",
        lowMeaning: "Frank, honest responses, self-accepting of minor social imperfections."
      },
      {
        name: "F Scale (Infrequency Scale)",
        definition: "Measures atypical, rare responses; detects 'faking bad', confusion, random responding, or severe distress.",
        highMeaning: "Suggests extreme distress, panic, potential 'faking bad' to seek help, or severe confusion.",
        lowMeaning: "Conforming, typical responding; comfortable adaptation to tests of this category."
      },
      {
        name: "K Scale (Correction Scale)",
        definition: "Measures sophisticated defensiveness or clinical guardrails; used to mathematically correct other clinical elevations.",
        highMeaning: "Sophisticated denial of problems, highly defensive profile, high state of psychological armor.",
        lowMeaning: "Overly self-critical, open exposure to psychological distress, low clinical ego-defense."
      },
      {
        name: "Hs (Scale 1 - Hypochondriasis)",
        definition: "Evaluates standard excessive, somatic complaints and preoccupation with bodily functions.",
        highMeaning: "Chronic physical complaints, strong focus on somatic symptoms, tendency to use physical illness to avoid challenges.",
        lowMeaning: "Freedom from excessive preoccupation with somatic symptoms, comfortable with physical body."
      },
      {
        name: "D (Scale 2 - Depression)",
        definition: "Assesses dysphoric mood, feelings of worthlessness, hopelessness, and psychomotor retardation.",
        highMeaning: "High state of clinical depression, severe discouragement, isolation, cognitive hopelessness.",
        lowMeaning: "Optimistic, physically active, emotionally buoyant, and socially engaged."
      },
      {
        name: "Hy (Scale 3 - Hysteria)",
        definition: "Detects hysterical conversion reactions to stressors and denial of psychiatric problems.",
        highMeaning: "Uses physical conversions or denial to handle emotional tension, highly suggestible, quick emotional demands.",
        lowMeaning: "Realistic, analytical in coping, comfortable confronting interpersonal differences directly."
      },
      {
        name: "Pd (Scale 4 - Psychopathic Deviate)",
        definition: "Explores antisocial tendencies, conflict with authority figures, and low emotional impulse control.",
        highMeaning: "Rebellious, hostile, low distress guilt, disregards laws, high conflict with authority.",
        lowMeaning: "Highly conforming, submissive to societal values, avoids social or ethical friction."
      },
      {
        name: "Mf (Scale 5 - Masculinity-Femininity)",
        definition: "Examines deviation of interests from traditional gender roles (originally conceived but modernly analyzed for interest flexibility).",
        highMeaning: "Rejection of stereotyped gender expectations, highly aesthetic, intellectual or diverse interests.",
        lowMeaning: "Strong, rigid adherence to traditional gender-role behaviors and interests."
      },
      {
        name: "Pa (Scale 6 - Paranoia)",
        definition: "Evaluates interpersonal sensitivity, hyper-vigilance, and persecutory or grandiose delusions.",
        highMeaning: "Highly suspicious, hyper-vigilant, harbors feelings of persecution, rigid and resentful.",
        lowMeaning: "Trusting of others, open to feedback, warm relations, possibly naive."
      },
      {
        name: "Pt (Scale 7 - Psychasthenia)",
        definition: "Rates persistent obsessive ideas, compulsive rituals, excessive guilt, and generalized anxiety.",
        highMeaning: "Extremely anxious, self-doubting, rigid, overwhelmed by checking behaviors and OCD traits.",
        lowMeaning: "Confident, efficient, free of excessive worry, comfortable with ambiguity."
      },
      {
        name: "Sc (Scale 8 - Schizophrenia)",
        definition: "Assesses alienative thoughts, sensory hallucinations, cognitive disorganization, and eccentricity.",
        highMeaning: "Severe cognitive confusion, feelings of depersonalization, bizarre sensory phenomena, or deep alienation.",
        lowMeaning: "Grounded in reality, clear pragmatic thoughts, strong feeling of social integration."
      },
      {
        name: "Ma (Scale 9 - Hypomania)",
        definition: "Tracks energy levels, psychomotor excitement, rapid cognitive flight, and racing thoughts.",
        highMeaning: "Hyperactive, unstable plans, low impulse restrictions, extremely talkative, manic episodes.",
        lowMeaning: "Low physical energy, listless, lethargic, possibly depressed motivation."
      },
      {
        name: "Si (Scale 0 - Social Introversion)",
        definition: "Evaluates comfort levels in interpersonal settings and desire for solitary pursuits.",
        highMeaning: "Highly introverted, shy, avoids social gatherings, prefers quiet or solitary tasks.",
        lowMeaning: "Extremely extroverted, socially driven, active seeker of group experiences."
      }
    ]
  },
  {
    id: "epps",
    name: "Edwards Personal Preference Schedule (EPPS)",
    category: "personality",
    developer: "Allen L. Edwards",
    quickInfo: "Objective personality scale exploring human needs.",
    purpose: "Assesses normal personality drives based on Murray's need system, using forced-choice pairings to avoid social desirability bias.",
    administration: {
      type: "Group or Individual",
      items: "225 forced-choice pairs",
      ageRange: "Ages 16 and older",
      time: "40-50 min",
      trainingNeeded: "Level B"
    },
    scoring: "Scores across 15 personality needs plus an consistency index (0-15 scale).",
    interpretation: "Consistency >= 11 confirms profile validity. Percentiles >= 85 reveal highly prominent needs.",
    versions: "EPPS Standard Forms",
    factorsMeasured: "Achievement, Order, Deference, Exhibition, Autonomy, Connection, Introspection, Emotional dependency."
  },
  {
    id: "neo-pi-r",
    name: "NEO Personality Inventory-Revised (NEO PI-R)",
    category: "personality",
    developer: "Paul T. Costa Jr. & Robert R. McCrae",
    quickInfo: "Standard 240-item questionnaire measuring the Big Five dimensions.",
    purpose: "Provides a thorough assessment of normal adult personality traits for research or counseling.",
    administration: {
      type: "Individual or Group",
      items: "240 Likert items",
      ageRange: "12 years and older",
      time: "35-45 min",
      trainingNeeded: "Level B",
    },
    scoring: "T-scores mapping the 5 domains and 30 underlying facets. Mean 50, SD 10.",
    interpretation: "Explains user attributes across the OCEAN domains.",
    versions: "NEO-PI, NEO PI-R, NEO-PI-3",
    factorsMeasured: "Neuroticism, Extraversion, Openness, Agreeableness, and Conscientiousness.",
    isSmo34: true
  },
  {
    id: "mbti",
    name: "Myers-Briggs Type Indicator (MBTI)",
    category: "personality",
    developer: "Katharine Cook Briggs & Isabel Briggs Myers",
    quickInfo: "Highly popular personality classification index based on Jungian themes.",
    purpose: "Classifies individuals into 1 of 16 cognitive preference types.",
    administration: {
      type: "Self-Report or Group",
      items: "93 forced-choice items (Form M)",
      ageRange: "14 years and older",
      time: "25-30 min",
      trainingNeeded: "Level B",
    },
    scoring: "Bipolar preference pairings: E/I, S/N, T/F, J/P.",
    interpretation: "Yields a 4-letter type code (e.g. INFJ) indicating cognitive style and social preferences.",
    versions: "Form G, Form M, Form Q",
    factorsMeasured: "Energy orientation, information perception, decision criteria, structure.",
    isSmo34: true
  },
  {
    id: "16pf",
    name: "Sixteen Personality Factor Questionnaire (16PF)",
    category: "personality",
    developer: "Raymond B. Cattell",
    quickInfo: "Normal-range personality profile assessing Cattell's 16 primary factors.",
    purpose: "Evaluates normal personality traits for counseling, hiring, and career guidance.",
    administration: {
      type: "Group or Individual",
      items: "185 items",
      ageRange: "16 years and older",
      time: "35-50 min",
      trainingNeeded: "Level B",
    },
    scoring: "Standard Sten scores (1 to 10 scale). Mean 5.5, SD 2.",
    interpretation: "Sten scores >= 8 and <= 3 highlight notable personality attributes.",
    versions: "16PF 1st to 5th Editions",
    factorsMeasured: "Warmth, reasoning, stability, dominance, social boldness, sensitivity, tension.",
    isSmo34: true
  },
  {
    id: "cpi",
    name: "California Psychological Inventory (CPI)",
    category: "personality",
    developer: "Harrison G. Gough",
    quickInfo: "Normal-range personality test emphasizing social and folk scales.",
    purpose: "Measures positive social adaptations, leadership skills, and values.",
    administration: {
      type: "Self-Report or Group",
      items: "434 (Form 434) or 260 items",
      ageRange: "13 years and older",
      time: "45-60 min",
      trainingNeeded: "Level B"
    },
    scoring: "Plotted along 20 folk scales. Categorizes users into 4 lifestyle archetypes (Alpha, Beta, Gamma, Delta).",
    interpretation: "Identifies interpersonal style, rule-following behavior, and internal self-awareness traits.",
    versions: "CPI-434, CPI-260",
    factorsMeasured: "Dominance, sociability, empathy, responsibility, self-reliance, tolerance, flexibility."
  },
  {
    id: "bpi",
    name: "Basic Personality Inventory (BPI)",
    category: "personality",
    developer: "Douglas N. Jackson",
    quickInfo: "Efficient objective scale to assess psychiatric symptomatology.",
    purpose: "Screens for personality disorders and adjustment difficulties in clinical and correctional settings.",
    administration: {
      type: "Self-Report or Group",
      items: "240 T/F items",
      ageRange: "Adolescents to Adults",
      time: "30-40 min",
      trainingNeeded: "Level B",
    },
    scoring: "T-scores across 12 clinical scales. Mean 50, SD 10.",
    interpretation: "T-scores >= 65 identify active distress, social withdrawal, or mood disturbance risks.",
    versions: "BPI Standard Form",
    factorsMeasured: "Persecutory ideas, anxiety, depression, impulse expression, social introversion.",
    isSmo34: true
  },
  {
    id: "pup-enriquez",
    name: "Panukat ng Ugali at Pagkatao (PUP)",
    category: "personality",
    developer: "Dr. Virgilio G. Enriquez",
    quickInfo: "The landmark indigenous scale of Filipino Psychology (Sikolohiyang Pilipino).",
    purpose: "Measures culturally validated Filipino personality traits and interpersonal orientations.",
    administration: {
      type: "Self-Report (Filipino / English)",
      items: "160 Likert items",
      ageRange: "Ages 15 and older",
      time: "30-45 min",
      trainingNeeded: "Level B",
    },
    scoring: "Yields profiles across 24 core traits, including native identity and validity indicators.",
    interpretation: "Measures indigenous values like Kapwa, Pakiramdam, and Pakikipagkapwa.",
    versions: "PUP Original Edition",
    factorsMeasured: "Sipag (hard work), Matulungin (helpful), Maalalahanin (thoughtful), Lakas ng Loob (guts).",
    isSmo34: true
  },
  {
    id: "pai",
    name: "Personality Assessment Inventory (PAI & PAS)",
    category: "personality",
    developer: "Leslie C. Morey",
    quickInfo: "Clinical personality inventory with validity and clinical scales.",
    purpose: "Evaluates adult personality, therapeutic dynamics, and psychiatric diagnoses.",
    administration: {
      type: "Self-Report booklet",
      items: "344 items (PAI) or 120 items (PAS)",
      ageRange: "18 to 89 years",
      time: "50-60 min",
      trainingNeeded: "Level C",
    },
    scoring: "T-scores across validity, clinical, and interpersonal scales. Mean 50, SD 10.",
    interpretation: "T-scores >= 70 alert to severe symptoms, suicide potential, or treatment resistance.",
    versions: "PAI, PAI-A (Adolescent), PAI-S, PAS",
    factorsMeasured: "Somatic, anxiety, depression, mania, borderline traits, substance use.",
    isSmo34: true
  },
  {
    id: "ipip-neo",
    name: "IPIP-NEO Personality Test",
    category: "personality",
    developer: "Lewis R. Goldberg",
    quickInfo: "Independent public-domain analog to the NEO-PI scales.",
    purpose: "Assesses Big Five personality traits for research or self-development.",
    administration: {
      type: "Self-Report scale",
      items: "120 or 300 items",
      ageRange: "Ages 16 and older",
      time: "20-40 min",
      trainingNeeded: "Level A/B"
    },
    scoring: "High-medium-low categories across the 5 domains and sub-facets.",
    interpretation: "Highlights typical behaviors, matching standard Horn-Cattell personality descriptions.",
    versions: "IPIP-120, IPIP-300",
    factorsMeasured: "Extraversion, Neuroticism, Openness, Agreeableness, Conscientiousness."
  },
  {
    id: "mapi",
    name: "Millon Adolescent Personality Inventory (MAPI)",
    category: "personality",
    developer: "Theodore Millon",
    quickInfo: "Comprehensive clinical diagnostic inventory for adolescents.",
    purpose: "Evaluates adolescent coping styles, peer adjustments, and psychological distress.",
    administration: {
      type: "Self-Report Booklet",
      items: "150 True/False items",
      ageRange: "Ages 13 to 19",
      time: "20-30 min",
      trainingNeeded: "Level C"
    },
    scoring: "Base Rate (BR) scores (0-115 scale), with a threshold >= 75 tracking pathological traits.",
    interpretation: "Identifies identity conflicts, body image issues, and self-defeating behaviors.",
    versions: "MAPI, MACI (Adolescent Clinical)",
    factorsMeasured: "Introspective style, forcefulness, submissiveness, body adjustments, authority attitudes."
  },
  {
    id: "mcmi-iii",
    name: "Millon Clinical Multiaxial Inventory-III (MCMI-III)",
    category: "personality",
    developer: "Theodore Millon",
    quickInfo: "Clinical inventory aligned with DSM personality disorder criteria.",
    purpose: "Diagnoses clinical syndromes and Axis II personality disorders in psychiatric patients.",
    administration: {
      type: "Self-Report Booklet",
      items: "175 T/F items",
      ageRange: "18 years and older (clinical only)",
      time: "25-35 min",
      trainingNeeded: "Level C"
    },
    scoring: "Base Rate (BR) scores. Scores >= 75 indicate the presence of clinical traits; >= 85 represent prominent disorders.",
    interpretation: "Excellent for identifying borderline, narcissistic, or antisocial personality patterns.",
    versions: "MCMI, MCMI-II, MCMI-III, MCMI-IV",
    factorsMeasured: "Clinical trials, coping indices, pathologic personality traits, social styles."
  },
  {
    id: "mcmi",
    name: "Millon Clinical Multiaxial Inventory (MCMI)",
    category: "personality",
    developer: "Theodore Millon",
    quickInfo: "The original 1977 clinical personality inventory.",
    purpose: "Measures clinical personality styles and psychopathologies based on Millon's biosocial theory.",
    administration: {
      type: "Self-Report Booklet",
      items: "175 items",
      ageRange: "18 and older",
      time: "30-45 min",
      trainingNeeded: "Level C"
    },
    scoring: "Base Rate scores indicating pathologic syndrome ranges.",
    interpretation: "Historical platform introducing coordinate Base Rate profiling in clinical diagnostics.",
    versions: "MCMI-I to MCMI-IV",
    factorsMeasured: "Schizoid, avoidant, dependent, histrionic, narcissistic traits."
  },
  {
    id: "mcmi-ii",
    name: "Millon Clinical Multiaxial Inventory-II (MCMI-II)",
    category: "personality",
    developer: "Theodore Millon",
    quickInfo: "The 1987 second edition featuring item weighting systems.",
    purpose: "Assesses DSM-III-R Axis II personality constructs in treatment facilities.",
    administration: {
      type: "Self-Report Booklet",
      items: "175 items",
      ageRange: "18 and older",
      time: "30-40 min",
      trainingNeeded: "Level C"
    },
    scoring: "Weighted Base Rate scores. Mean baseline is matched to clinical samples.",
    interpretation: "Detects diagnostic overlap and severity of personality disorders.",
    versions: "MCMI series",
    factorsMeasured: "Self-defeating personality, aggressive personality, clinical anxiety, dysthymia."
  },
  {
    id: "neo-ffi",
    name: "NEO Five Factor Inventory (NEO-FFI)",
    category: "personality",
    developer: "Paul T. Costa Jr. & Robert R. McCrae",
    quickInfo: "Short form of the NEO-PI measuring the Big Five dimensions.",
    purpose: "Provides a rapid assessment of the general adult personality profile.",
    administration: {
      type: "Individual or Group Self-Report",
      items: "60 Likert items",
      ageRange: "12 years and older",
      time: "10-15 min",
      trainingNeeded: "Level B"
    },
    scoring: "Domain percentile scores across the five core traits.",
    interpretation: "Saves time in research and academic counseling while keeping normal ranges intact.",
    versions: "NEO-FFI, NEO-FFI-3",
    factorsMeasured: "Extraversion, Neuroticism, Openness, Agreeableness, Conscientiousness."
  },
  {
    id: "mapangloob",
    name: "Masaklaw na Panukat ng Loob (Mapangloob)",
    category: "personality",
    developer: "Dr. Rogelio Pe-Pua & Dr. Gregorio E.H. Del Pilar",
    quickInfo: "Indigenous Filipino personality test measuring personality factors.",
    purpose: "Evaluates Filipino characteristics, values, and attitudes culturally.",
    administration: {
      type: "Self-Report (Filipino)",
      items: "Likert scale items",
      ageRange: "Ages 16 and older",
      time: "30-40 min",
      trainingNeeded: "Level B",
    },
    scoring: "Culturally validated scale scores across primary personality factors.",
    interpretation: "Assesses specific Philippine cultural concepts, such as internal character (Kalooban) and social pakikisama.",
    versions: "Mapangloob original scale",
    factorsMeasured: "Aesthetic preferences, social harmony, conscientiousness, emotional control.",
    isSmo34: true
  },
  {
    id: "mooney",
    name: "Mooney Problem Checklist",
    category: "personality",
    developer: "Ross L. Mooney",
    quickInfo: "Standard checklist of typical adolescent and adult issues.",
    purpose: "Aids counseling by allowing users to select personal problems they wish to resolve.",
    administration: {
      type: "Self-Report Checklist",
      items: "Varies (approx. 210-330 problems)",
      ageRange: "High school, College, or Adult",
      time: "20-35 min",
      trainingNeeded: "Level A/B"
    },
    scoring: "Count of checked problems grouped into thematic categories.",
    interpretation: "Reveals worries about finance, physical health, romance, or home relationships.",
    versions: "High School, College, and Adult forms",
    factorsMeasured: "Finance worries, health, academic progress, home life stability."
  },
  {
    id: "child-behavior-checklist",
    name: "Child Behavior Checklist (CBCL)",
    category: "personality",
    developer: "Thomas M. Achenbach",
    quickInfo: "Standardized parent-report behavior rating scale.",
    purpose: "Detects emotional and behavioral disturbances in minors through caregiver reports.",
    administration: {
      type: "Parent/Observer Questionnaire",
      items: "113 behavioral concern items",
      ageRange: "1.5 to 5 years / 6 to 18 years",
      time: "15-20 min",
      trainingNeeded: "Level B"
    },
    scoring: "T-scores tracking Internalizing (e.g., anxiety) and Externalizing (e.g., aggression) concerns.",
    interpretation: "T-scores >= 64 indicate clinically significant child behavioral risks.",
    versions: "CBCL, ASEBA series",
    factorsMeasured: "Withdrawal, somatic problems, anxiety, rule-breaking, aggressive behaviors."
  },
  {
    id: "ppp-carlota",
    name: "Panukat ng Pagkataong Pilipino (PPP)",
    category: "personality",
    developer: "Dr. Annadaisy Carlota",
    quickInfo: "Indigenous Philippine assessment of personality scales.",
    purpose: "Measures personal traits and social adjustments based on local cultural norms.",
    administration: {
      type: "Self-Report (Filipino / English)",
      items: "190 Likert items",
      ageRange: "Adolescents to Adult years",
      time: "40-50 min",
      trainingNeeded: "Level B",
    },
    scoring: "Yields percentiles and T-scores matching Philippine candidate norms.",
    interpretation: "Highlights cultural behaviors like cooperative effort (Pagtulungan) or sensitivity.",
    versions: "PPP original edition",
    factorsMeasured: "PAGKAMALIKHAIN (Creativity), PAGKASALADSA (Carelessness), KATAPATAN (Honesty), etc.",
    isSmo34: true
  },
  {
    id: "general-self-efficacy",
    name: "General Self-Efficacy Scale (GSE)",
    category: "personality",
    developer: "Ralf Schwarzer & Matthias Jerusalem",
    quickInfo: "Brief, popular scale assessing optimistic self-beliefs.",
    purpose: "Measures coping abilities and confidence in handling everyday stress.",
    administration: {
      type: "Self-Report checklist",
      items: "10 Likert items",
      ageRange: "Ages 12 and older",
      time: "3-5 min",
      trainingNeeded: "Level A/B"
    },
    scoring: "Compiles a total score (10 to 40). Higher values indicate stronger coping beliefs.",
    interpretation: "Scores can indicate resilience against performance anxiety and clinical stress.",
    versions: "GSE 30+ language translations",
    factorsMeasured: "Resilience, goal commitment, confidence under stress."
  },
  {
    id: "guilford-zimmerman",
    name: "Guilford Zimmerman Temperament Survey (GZTS)",
    category: "personality",
    developer: "J.P. Guilford & Wayne S. Zimmerman",
    quickInfo: "Classic personality survey assessing 10 distinct characteristics.",
    purpose: "Reviews traits of normal-range temperaments for business, career guidance, and academic research.",
    administration: {
      type: "Self-Report Booklet",
      items: "300 Yes/No items",
      ageRange: "College students and Adults",
      time: "45-60 min",
      trainingNeeded: "Level B"
    },
    scoring: "Yields 10 trait scores with standard C-scores (Mean 5.0, SD 2).",
    interpretation: "High scores indicate positive social styles, leadership qualities, and job stability.",
    versions: "GZTS Original Edition",
    factorsMeasured: "General activity, restraint, ascendance, sociability, stability, objectivity, friendliness, thoughtfulness, personal relations, masculinity."
  },
  {
    id: "jenkins-activity",
    name: "Jenkins Activity Survey (JAS)",
    category: "personality",
    developer: "C. David Jenkins",
    quickInfo: "Pioneering self-report survey identifying Type A behavior.",
    purpose: "Screening tool for coronary-prone Type A styles, characterized by rushing and competitiveness.",
    administration: {
      type: "Self-report",
      items: "52 multiple choice items",
      ageRange: "Adults",
      time: "15-20 min",
      trainingNeeded: "Level B"
    },
    scoring: "Provides scores for Type A behavior, speed and impatience, job involvement, and hard-driving competitive traits.",
    interpretation: "High Type A ratings correlate with health risks under stressful conditions.",
    versions: "JAS Form C, Student version (SJAS)",
    factorsMeasured: "Competitiveness, time urgency, impatience, occupational dedication."
  },
  {
    id: "life-orientation",
    name: "Life Orientation Test - Revised (LOT-R)",
    category: "personality",
    developer: "Michael F. Scheier, Charles S. Carver, & Michael W. Bridges",
    quickInfo: "Brief assessment of individual optimism-pessimism levels.",
    purpose: "Measures dispositional optimism for research, health, and coping studies.",
    administration: {
      type: "Self-report",
      items: "10 items (6 target, 4 fillers)",
      ageRange: "Adolescents to Adults",
      time: "3-5 min",
      trainingNeeded: "Level A/B"
    },
    scoring: "Summed scores can range from 0 to 24, indicating optimism.",
    interpretation: "High scores confirm optimistic viewpoints, which are linked to better recoveries and coping behaviors under stress.",
    versions: "LOT (1985), LOT-R (1994)",
    factorsMeasured: "Optimistic expectations, pessimistic expectations."
  },
  {
    id: "personality-research",
    name: "Personality Research Form (PRF)",
    category: "personality",
    developer: "Douglas N. Jackson",
    quickInfo: "Structured personality inventory based on Murray's need model.",
    purpose: "Assesses normal-range personality attributes in school counseling and organizations.",
    administration: {
      type: "Group or Individual",
      items: "352 (Form G) or 440 True/False items",
      ageRange: "Adolescents to Adults",
      time: "35-50 min",
      trainingNeeded: "Level B"
    },
    scoring: "Provides scores across 20 personality scales with built-in social desirability indicators.",
    interpretation: "Excellent validity profiles, making this a reliable alternative to traditional normal-range tests.",
    versions: "Form A, B, J, G, E, PRF-R",
    factorsMeasured: "Need for order, autonomy, dominance, affiliation, achievement, exhibition, aggression."
  },
  {
    id: "pictorial-self-concept",
    name: "Pictorial Self-Concept Scale",
    category: "personality",
    developer: "Angelo S. Bolea",
    quickInfo: "Visual test card scale evaluating self-views in children.",
    purpose: "Measures self-concept, social self-worth, and pediatric confidence levels.",
    administration: {
      type: "Individual (Picture sorting)",
      items: "50 card pictures",
      ageRange: "Ages 4 to 10 years",
      time: "15-20 min",
      trainingNeeded: "Level B"
    },
    scoring: "Sorted cards determine low-medium-high self-esteem ranges.",
    interpretation: "Useful for detecting hidden child distress or low confidence without relying on deep reading skills.",
    versions: "Bolea Pictorial original cards",
    factorsMeasured: "Cooperative self, physical confidence, social belonging, academic self-concept."
  },
  {
    id: "woodworth-pds",
    name: "Woodworth Personal Data Sheet (WPDS)",
    category: "personality",
    developer: "Robert S. Woodworth",
    quickInfo: "The historical first structured objective personality inventory.",
    purpose: "Developed to screen WWI military recruits for psychological fitness and neuroticism.",
    administration: {
      type: "Group Yes/No checklist",
      items: "116 questions",
      ageRange: "Adults",
      time: "20 min",
      trainingNeeded: "Level B"
    },
    scoring: "Count of checked somatic/psychiatric neurotic concerns.",
    interpretation: "First objective test that shifted psychiatric practice toward uniform questionnaires.",
    versions: "WPDS 1918 Edition",
    factorsMeasured: "Clinical somatic worries, clinical phobias, sleep disturbances, general anxiety."
  },
  {
    id: "basc",
    name: "BASC: Behavioral Assessment System for Children",
    category: "personality",
    developer: "Cecil R. Reynolds & Randy W. Kamphaus",
    quickInfo: "Multi-method assessment of child behaviors and feelings.",
    purpose: "Screening tool to identify child emotional disorders, ADHD risk, or social adjustment options.",
    administration: {
      type: "Self, Parent, and Teacher Ratings",
      items: "Likert scales",
      ageRange: "2 to 21 years",
      time: "20-30 min",
      trainingNeeded: "Level B"
    },
    scoring: "Standardized clinical T-scores. Mean 50, SD 10.",
    interpretation: "Identifies areas of distress, highlighting typical externalizing or internalizing behaviors.",
    versions: "BASC, BASC-2, BASC-3",
    factorsMeasured: "Hyperactivity, aggression, anxiety, depression, atypicality, adaptability."
  },
  {
    id: "aps- Reynolds",
    name: "APS: Adolescent Psychopathology Scale",
    category: "personality",
    developer: "William M. Reynolds",
    quickInfo: "Clinical rating scale aligned with DSM adolescent diagnoses.",
    purpose: "Gathers standard indications of adolescent clinical syndromes and personality disorders.",
    administration: {
      type: "Self-Report Booklet",
      items: "346 items",
      ageRange: "Ages 12 to 19",
      time: "45-60 min",
      trainingNeeded: "Level C"
    },
    scoring: "Produces T-scores across validity, clinical, and personality scales. Mean 50, SD 10.",
    interpretation: "Standard indicators for identifying drug abuse, clinical anxiety, or mood disorders in teenagers.",
    versions: "APS, APS Short Form",
    factorsMeasured: "Clinical depression, conduct disorders, somatic worries, panic features."
  },

  // PROJECTIVE TECHNIQUES
  {
    id: "tat",
    name: "Thematic Apperception Test (TAT)",
    category: "projective",
    developer: "Henry A. Murray & Christiana D. Morgan",
    quickInfo: "Classic projective test using picture cards.",
    purpose: "Reveals interpersonal conflicts and unconscious needs (Achievement, Affiliation, Power) using storytelling prompts.",
    administration: {
      type: "Individual",
      items: "31 cards (typically 10-12 selected)",
      ageRange: "4 years to Adult",
      time: "60-100 min",
      trainingNeeded: "Level C",
    },
    scoring: "Qualitative analysis based on Murray's 'Need-Press' theory.",
    interpretation: "Reveals latent conflicts, relationship patterns, and active coping mechanisms.",
    versions: "TAT, Children's (CAT), Senior (SAT)",
    factorsMeasured: "nAch, nAff, nPower, hidden conflicts.",
    isSmo34: true
  },
  {
    id: "rorschach",
    name: "Rorschach Inkblot Test",
    category: "projective",
    developer: "Hermann Rorschach",
    quickInfo: "Famous projective assessment using standardized inkblot cards.",
    purpose: "Evaluates unconscious personality architecture and cognitive-perceptual styles.",
    administration: {
      type: "Individual only",
      items: "10 inkblot plates (5 chromatic, 5 achromatic)",
      ageRange: "5 years to Adult",
      time: "50-120 min",
      trainingNeeded: "Level C",
    },
    scoring: "Exner Comprehensive System (ECS) or R-PAS coding.",
    interpretation: "Evaluates reality testing indices, emotional control, and defense structures.",
    versions: "Rorschach Plates, R-PAS",
    factorsMeasured: "Reality testing, coping styles, emotional processing.",
    isSmo34: true
  },
  {
    id: "ssct",
    name: "Sach's Sentence Completion Test (SSCT)",
    category: "projective",
    developer: "Joseph M. Sacks",
    quickInfo: "Semi-projective sentence completion inventory.",
    purpose: "Assess interpersonal relationships, attitudes, and adjustment conflicts.",
    administration: {
      type: "Individual or Group",
      items: "60 incomplete stems",
      ageRange: "Adolescents to Adults",
      time: "20-40 min",
      trainingNeeded: "Level B",
    },
    scoring: "Calculates clinical disturbance ratings: 2 (Severe), 1 (Mild), 0 (None) across 4 life areas.",
    interpretation: "Brings out hidden fears, authority conflicts, and coping mechanisms.",
    versions: "Sacks Adult Sentence Completion",
    factorsMeasured: "Attitude to family, sexuality, interpersonal, and self-concepts.",
    isSmo34: true
  },
  {
    id: "holtzman",
    name: "Holtzman Inkblot Technique (HIT)",
    category: "projective",
    developer: "Wayne H. Holtzman",
    quickInfo: "Structured inkblot test designed to improve on Rorschach psychometrics.",
    purpose: "Measures cognitive-perceptual styles, utilizing objective scoring norms.",
    administration: {
      type: "Individual or Group",
      items: "45 structured plates",
      ageRange: "Ages 5 to Adult",
      time: "45-60 min",
      trainingNeeded: "Level C"
    },
    scoring: "Standardized scoring across 22 quantitative scale dimensions.",
    interpretation: "Features high test-retest reliability, resolving many of the traditional Rorschach scoring complaints.",
    versions: "Form A & Form B",
    factorsMeasured: "Response complexity, visual spatial allocation, chromatic emotions, projection."
  },
  {
    id: "temas",
    name: "TEMAS",
    category: "projective",
    developer: "G. Constantino, R. Malgady, & O. Rogler",
    quickInfo: "Multicultural storytelling projective test utilizing urban backgrounds.",
    purpose: "Assesses personalities of ethnic minority youth, reducing culturally biased test artifacts.",
    administration: {
      type: "Individual (Storytelling request)",
      items: "23 colorful picture cards",
      ageRange: "5 to 18 years",
      time: "45-60 min",
      trainingNeeded: "Level C"
    },
    scoring: "Quantitatively rated across cognitive functions, affect styles, and personality traits.",
    interpretation: "Identifies clinical adjustment profiles and relationship traits using relatable urban stories.",
    versions: "TEMAS Minority & Non-Minority parallel cards",
    factorsMeasured: "Coping strategies, ethnic identity, cognitive schemas, affective states."
  },
  {
    id: "szondi",
    name: "Szondi Test",
    category: "projective",
    developer: "Léopold Szondi",
    quickInfo: "Unusual projective card sorting test based on photography.",
    purpose: "Identifies repressed needs and personality traits based on card choices.",
    administration: {
      type: "Individual card sorting",
      items: "48 portrait cards of psychiatric patients",
      ageRange: "Adolescents to Adults",
      time: "15-20 min",
      trainingNeeded: "Level C"
    },
    scoring: "Matches choices to 8 personality impulse quadrants.",
    interpretation: "Based on Szondi's 'Fate Analysis' drive theory, analyzing the portraits a user dislikes.",
    versions: "Szondi Cards original sets",
    factorsMeasured: "Repressed psychiatric desires, emotional dynamics."
  },
  {
    id: "word-association",
    name: "Word Association Test",
    category: "projective",
    developer: "Carl Jung & Francis Galton",
    quickInfo: "Classic association test measuring cognitive lag.",
    purpose: "Exposes active unconscious conflicts and clinical blockages using word-response triggers.",
    administration: {
      type: "Individual",
      items: "100 trigger words",
      ageRange: "Ages 12 and older",
      time: "15-25 min",
      trainingNeeded: "Level B"
    },
    scoring: "Qualitative evaluation of reaction delays or atypical responses.",
    interpretation: "Extended delays indicate emotional blocks or complexes associated with the trigger words.",
    versions: "Jungian, Kent-Rosanoff series",
    factorsMeasured: "Co-occurring complexes, blockages, defense reactions."
  },
  {
    id: "rotter-sentences",
    name: "Rotter Incomplete Sentences Blank (RISB)",
    category: "projective",
    developer: "Julian B. Rotter",
    quickInfo: "Semi-projective sentence completion blank.",
    purpose: "Evaluates child or adult adjustment traits, indicating if further therapy is needed.",
    administration: {
      type: "Group or Individual",
      items: "40 item stems",
      ageRange: "School, College, or Adult versions",
      time: "20-30 min",
      trainingNeeded: "Level B"
    },
    scoring: "Items are scored on a scale from 0 (very positive) to 6 (severely conflicted). Cutoff score is 135.",
    interpretation: "Scores above 135 indicate adjustment problems, showing clinical anxieties or conflicts.",
    versions: "High School, College, and Adult forms",
    factorsMeasured: "Social adjustments, personal conflicts, family issues, workplace worries."
  },
  {
    id: "forer-structured",
    name: "Forer Structured Sentence Completion Test (FSSCT)",
    category: "projective",
    developer: "Bertram R. Forer",
    quickInfo: "Projective complete stem checklist mapping authority attitudes.",
    purpose: "Reveals individual reactions, defense mechanisms, and attitudes toward parents and authority.",
    administration: {
      type: "Individual or Group",
      items: "100 unfinished lines",
      ageRange: "Ages 10 and older",
      time: "30-40 min",
      trainingNeeded: "Level B"
    },
    scoring: "Qualitative analysis across 4 categories: Interpersonal, self-concept, wishes, and causes of anger.",
    interpretation: "Provides a thorough assessment of childhood conflicts and family adjustments.",
    versions: "FSSCT Standard Edition",
    factorsMeasured: "Authority conflicts, family dynamics, interpersonal styles."
  },
  {
    id: "house-tree-person",
    name: "House-Tree-Person (HTP)",
    category: "projective",
    developer: "John N. Buck",
    quickInfo: "Projective drawing test used to evaluate personality and self-perception.",
    purpose: "Evaluates self-perception, childhood worries, and cognitive maturity through drawing.",
    administration: {
      type: "Individual drawing request",
      items: "Plates of drawings (freehand sketching, can include color)",
      ageRange: "Ages 3 and older",
      time: "20-40 min",
      trainingNeeded: "Level C",
    },
    scoring: "Qualitative evaluation of details, perspective, and drawing size.",
    interpretation: "House represents home life; Tree represents internal developmental growth; Person represents inter-personal dynamics.",
    versions: "HTP Standard Protocol",
    factorsMeasured: "Self-concept, familial dynamics, developmental maturity, coping style.",
    isSmo34: true
  },
  {
    id: "children-apperception",
    name: "Children's Apperception Test (CAT)",
    category: "projective",
    developer: "Leopold Bellak & Sonya Sorel Bellak",
    quickInfo: "Projective storytelling test using animal cartoons.",
    purpose: "Reveals developmental conflicts, family sibling rivalries, and childhood fears.",
    administration: {
      type: "Individual child",
      items: "10 picture cards",
      ageRange: "3 to 10 years",
      time: "30-45 min",
      trainingNeeded: "Level C"
    },
    scoring: "Qualitative analysis of stories, hero selection, major worries, and defense mechanisms.",
    interpretation: "Identifies early childhood relationship issues and adjustment challenges.",
    versions: "CAT-A (Animal), CAT-H (Human), CAT-S (Supplement)",
    factorsMeasured: "Sibling rivalry, oral anxieties, maternal relationships, peer fears."
  },

  // MOOD & CLINICAL SCALES
  {
    id: "beck-depression-ii",
    name: "Beck Depression Inventory (BDI-II)",
    category: "mood",
    developer: "Aaron T. Beck",
    quickInfo: "Standard psychometric scale measuring clinical depression severity.",
    purpose: "Measures depressive symptoms and tracks treatment outcomes over the preceding 2 weeks.",
    administration: {
      type: "Self-Report / Individual",
      items: "21 MCQ items (scored 0 to 3)",
      ageRange: "13 to 80 years",
      time: "5-10 min",
      trainingNeeded: "Level B",
    },
    scoring: "Summed scores range from 0 to 63. Categorizes severity levels.",
    interpretation: "0-13 minimal; 14-19 mild; 20-28 moderate; 29-63 severe clinical depression.",
    versions: "BDI, BDI-IA, BDI-II",
    factorsMeasured: "Sadness, cognitive guilt, somatic fatigue, suicidal thoughts, sleep patterns.",
    isSmo34: true
  },
  {
    id: "beck-depression-original",
    name: "Beck Depression Inventory (BDI)",
    category: "mood",
    developer: "Aaron T. Beck",
    quickInfo: "The original 1961 depressive checklist.",
    purpose: "Pioneering scale tracking depressive symptoms dynamically in therapeutic trials.",
    administration: {
      type: "Self-report",
      items: "21 MCQ items",
      ageRange: "Adolescents to Adults",
      time: "5-10 min",
      trainingNeeded: "Level B"
    },
    scoring: "Summed scores (0 to 63 range).",
    interpretation: "Classic baseline tool for evaluating depressive symptoms and tracking clinical progress.",
    versions: "BDI, BDI-IA, BDI-II",
    factorsMeasured: "Somatic distress, pessimism, guilt, fatigue."
  },
  {
    id: "beck-anxiety",
    name: "Beck Anxiety Inventory (BAI)",
    category: "mood",
    developer: "Aaron T. Beck",
    quickInfo: "Brief self-report scale focused on physical anxiety symptoms.",
    purpose: "Measures severity of physical and cognitive anxiety concerns.",
    administration: {
      type: "Self-Report",
      items: "21 checklist items (scored 0-3)",
      ageRange: "17 to 80 years",
      time: "5-10 min",
      trainingNeeded: "Level B",
    },
    scoring: "Summed scores range from 0 to 63.",
    interpretation: "0-7 minimal; 8-15 mild; 16-25 moderate; 26-63 severe clinical anxiety.",
    versions: "BAI Standard scale",
    factorsMeasured: "Physiological anxiety, autonomic panic, tension.",
    isSmo34: true
  },
  {
    id: "beck-hopelessness",
    name: "Beck Hopelessness Scale (BHS)",
    category: "mood",
    developer: "Aaron T. Beck",
    quickInfo: "Instrument assessing negative expectations about the future.",
    purpose: "Screens for suicide risk and tracks despair and pessimistic outlooks.",
    administration: {
      type: "Self-Report / Interview",
      items: "20 True/False items",
      ageRange: "17 to 80 years",
      time: "5-10 min",
      trainingNeeded: "Level B / C",
    },
    scoring: "Summed scores range from 0 to 20.",
    interpretation: "Scores over 9 represent moderate risk; over 15 represent severe suicide risk.",
    versions: "BHS Standard scale",
    factorsMeasured: "Feelings about the future, future expectations.",
    isSmo34: true
  },
  {
    id: "hamilton-anxiety",
    name: "Hamilton Anxiety Rating Scale - Revised (HARS-R)",
    category: "mood",
    developer: "Max Hamilton",
    quickInfo: "Clinician-rated scale measuring physical and cognitive anxiety.",
    purpose: "Diagnoses clinical anxiety severity and tracks progress in drug trials.",
    administration: {
      type: "Clinician interview",
      items: "14 clinical items (scored 0-4)",
      ageRange: "Children and Adults",
      time: "15-20 min",
      trainingNeeded: "Level C"
    },
    scoring: "Sum of items range from 0 to 56.",
    interpretation: "<17 mild; 18-24 moderate; 25-30 severe anxiety.",
    versions: "HARS, HARS-R",
    factorsMeasured: "Psychic anxiety, physical somatic distress, panic, fears."
  },
  {
    id: "hamilton-depression",
    name: "Hamilton Rating Scale for Depression (HRSD-R)",
    category: "mood",
    developer: "Max Hamilton",
    quickInfo: "Gold-standard clinician-rated scale to evaluate depressive symptoms.",
    purpose: "Measures depression severity and monitors progress in therapeutic trials.",
    administration: {
      type: "Clinician interview",
      items: "17 clinical items",
      ageRange: "Adults",
      time: "20-30 min",
      trainingNeeded: "Level C"
    },
    scoring: "Sum of 17 key items (0 to 52 range).",
    interpretation: "0-7 normal; 8-13 mild; 14-18 moderate; >=19 severe clinical depression.",
    versions: "HRSD, HRSD-R (HAM-D)",
    factorsMeasured: "Depressed mood, guilt, suicidal ideation, insomnia, retardation, somatic concern."
  },
  {
    id: "state-trait-anxiety",
    name: "State-Trait Anxiety Inventory (STAI)",
    category: "mood",
    developer: "Charles Spielberger",
    quickInfo: "Comprehensive scale separating temporary and chronic anxiety.",
    purpose: "Measures state anxiety (situational) and trait anxiety (personality-based).",
    administration: {
      type: "Self-Report scale",
      items: "40 Likert items",
      ageRange: "Ages 15 and older",
      time: "10-15 min",
      trainingNeeded: "Level B"
    },
    scoring: "Scores for State Anxiety (20-80) and Trait Anxiety (20-80).",
    interpretation: "High state anxiety suggests temporary panic; high trait anxiety reveals stable anxious tendencies.",
    versions: "Forms Y-1 & Y-2",
    factorsMeasured: "Situational worry, baseline emotional tension, chronic arousal."
  },
  {
    id: "wahler-symptoms",
    name: "Wahler Physical Symptoms Inventory",
    category: "mood",
    developer: "H.J. Wahler",
    quickInfo: "Checklist evaluating somatic physical complaints under stress.",
    purpose: "Measures somatization and tracks physiological complaints that are non-organic.",
    administration: {
      type: "Self-report",
      items: "42 somatic concern items",
      ageRange: "Ages 18 and older",
      time: "10 min",
      trainingNeeded: "Level B"
    },
    scoring: "Calculates a somatic index by comparing check counts with local baseline averages.",
    interpretation: "Elevated somatic complaints help identify physical symptoms linked to clinical anxiety.",
    versions: "Wahler Inventory Standard Edition",
    factorsMeasured: "Headaches, digestive issues, dizziness, fatigue concerns."
  },
  {
    id: "fear-survey",
    name: "Fear Survey Schedule",
    category: "mood",
    developer: "Joseph Wolpe & Peter Lang",
    quickInfo: "Standardized checklist evaluating phobic concerns.",
    purpose: "Identifies clinical phobias and charts triggers for systematic desensitization trials.",
    administration: {
      type: "Self-Report scale",
      items: "80 items (Likert scored)",
      ageRange: "Ages 16 and older",
      time: "15-20 min",
      trainingNeeded: "Level B"
    },
    scoring: "Sum of item ratings yields overall fear and panic index scores.",
    interpretation: "High subscale scores isolate fears (animals, isolation, crowds) to customize therapy plans.",
    versions: "FSS-I to FSS-III",
    factorsMeasured: "Socio-phobic fear, animal panic, somatic worries, natural disasters."
  },
  {
    id: "quality-life-inv",
    name: "Quality of Life Inventory (QOLI)",
    category: "mood",
    developer: "Michael B. Frisch",
    quickInfo: "Brief normal and clinical rating scale measuring personal satisfaction.",
    purpose: "Evaluates overall well-being and personal happiness across 16 life domains.",
    administration: {
      type: "Self-Report Questionnaire",
      items: "32 items",
      ageRange: "Ages 17 to Adults",
      time: "10-15 min",
      trainingNeeded: "Level B"
    },
    scoring: "Yields a global Quality of Life index score ranking from low to high.",
    interpretation: "Low scores help clinical counseling identify areas of distress or dissatisfaction.",
    versions: "QOLI Standard Edition",
    factorsMeasured: "Finance status, self-esteem, family relationship, environment, occupational fulfillment."
  },
  {
    id: "alcohol-use-inv",
    name: "Alcohol Use Inventory (AUI)",
    category: "mood",
    developer: "J.L. Horn, K.W. Wanberg, & F.M. Foster",
    quickInfo: "Exhaustive clinical inventory evaluating alcohol use patterns.",
    purpose: "Measures reasons for drinking, situational usage, and levels of dependency.",
    administration: {
      type: "Self-report",
      items: "228 items",
      ageRange: "Ages 16 and older",
      time: "35-50 min",
      trainingNeeded: "Level C"
    },
    scoring: "Plotted along 17 primary scales and 4 general secondary factor scales.",
    interpretation: "Isolates clinical dependency symptoms, assisting recovery teams in customizing therapy plans.",
    versions: "AUI Form G, AUI-Revised",
    factorsMeasured: "Situational cravings, somatic withdrawal symptoms, occupational impairment, social drinking."
  },
  {
    id: "childhood-trauma",
    name: "Childhood Trauma Questionnaire (CTQ)",
    category: "mood",
    developer: "Douglas Bernstein & Laura Fink",
    quickInfo: "Critical retrospective screening scale for child abuse history.",
    purpose: "Screens for childhood emotional, physical, and sexual abuse or neglect.",
    administration: {
      type: "Self-report (Retrospective)",
      items: "28 items",
      ageRange: "Ages 12 and older",
      time: "5-10 min",
      trainingNeeded: "Level B / C"
    },
    scoring: "Yields five distinct subscale trauma index scores with severity rankings.",
    interpretation: "Aids clinical counseling by revealing past traumas that may cause adult personality disorders.",
    versions: "CTQ Standardized Form",
    factorsMeasured: "Physical abuse, somatic neglect, sexual trauma, emotional invalidation."
  },
  {
    id: "children-depression-inv",
    name: "Children's Depression Inventory (CDI)",
    category: "mood",
    developer: "Maria Kovacs",
    quickInfo: "Standardized pediatric depression scale.",
    purpose: "Screens for depressive symptoms and cognitive distress in minor cohorts.",
    administration: {
      type: "Self-Report child",
      items: "27 items (scored 0-2)",
      ageRange: "7 to 17 years",
      time: "10-15 min",
      trainingNeeded: "Level B"
    },
    scoring: "Yields a Total T-score. Cutoff score of 65 represents clinical concern.",
    interpretation: "Scores above 65 suggest risks of withdrawal, emotional distress, or scholastic delays.",
    versions: "CDI, CDI-2",
    factorsMeasured: "Dysphoric mood, peer withdrawal, negative self-esteem, academic performance."
  },
  {
    id: "coping-stress",
    name: "Coping Intervention for Stressful Situations (CISS)",
    category: "mood",
    developer: "Norman Endler & James Parker",
    quickInfo: "Clinical assessment identifying coping strategies under stress.",
    purpose: "Measures task-oriented, emotion-oriented, and avoidance coping styles.",
    administration: {
      type: "Self-report",
      items: "48 Likert items",
      ageRange: "Adolescents to Adults",
      time: "10-15 min",
      trainingNeeded: "Level B"
    },
    scoring: "Yields scores across 3 primary coping profiles.",
    interpretation: "Emotion-oriented and avoidant styles can indicate vulnerability to clinical anxiety.",
    versions: "CISS Adolescent, Adult, and Situational versions",
    factorsMeasured: "Task-oriented actions, emotional reaction tendencies, social avoidance."
  },
  {
    id: "dispositional-resilience",
    name: "Dispositional Resilience Scale (DRS)",
    category: "mood",
    developer: "Paul Bartone",
    quickInfo: "Scale measuring psychological hardiness.",
    purpose: "Assesses resilience against high-stress workplace and life conditions.",
    administration: {
      type: "Self-report",
      items: "15 or 30 items",
      ageRange: "Adolescents to Adults",
      time: "5-10 min",
      trainingNeeded: "Level B"
    },
    scoring: "Yields scores for Commitment, Control, and Challenge, plus a Total Hardiness index.",
    interpretation: "High hardiness scores confirm resilience, predicting healthy coping styles.",
    versions: "DRS-15, DRS-30",
    factorsMeasured: "Stress commitment, internal locus of control, challenge mindset."
  },
  {
    id: "eating-disorder",
    name: "Eating Disorder Inventory - 2nd Ed (EDI-2)",
    category: "mood",
    developer: "David Garner",
    quickInfo: "Clinical self-report scale assessing eating behaviors.",
    purpose: "Understands anorexic and bulimic symptoms, assisting recovery plans.",
    administration: {
      type: "Self-Report or Interview",
      items: "91 items",
      ageRange: "Ages 12 and older",
      time: "20-25 min",
      trainingNeeded: "Level C"
    },
    scoring: "Parsed along 11 distinct clinical subscale concern tiers.",
    interpretation: "Isolates food preoccupation issues, body image struggles, and perfectionism goals.",
    versions: "EDI, EDI-2, EDI-3",
    factorsMeasured: "Drive for thinness, bulimia, body dissatisfaction, perfectionism, impulse regulation."
  },
  {
    id: "panas- Watson",
    name: "Positive and Negative Affect Schedule (PANAS)",
    category: "mood",
    developer: "David Watson, Lee Anna Clark, & Auke Tellegen",
    quickInfo: "Brief, popular scale assessing physical and mental emotional states.",
    purpose: "Measures positive affect (enthusiasm) and negative affect (upset, worry) states.",
    administration: {
      type: "Self-report",
      items: "20 emotion check words",
      ageRange: "Adolescents to Adults",
      time: "3-5 min",
      trainingNeeded: "Level A/B"
    },
    scoring: "Summed ratings from 10 to 50 for both Positive Affect (PA) and Negative Affect (NA).",
    interpretation: "Elevated NA suggests risks of general distress, clinical anxiety, or somatization.",
    versions: "PANAS, PANAS-C (Child/Adolescent)",
    factorsMeasured: "Positive emotion levels, somatic distress states, mood stability."
  },
  {
    id: "satisfaction-life",
    name: "Satisfaction with Life Scale (SWLS)",
    category: "mood",
    developer: "Ed Diener et al.",
    quickInfo: "Popular 5-item scale assessing life satisfaction.",
    purpose: "Aids clinical counseling by evaluating overall life satisfaction.",
    administration: {
      type: "Self-Report questionnaire",
      items: "5 Likert items",
      ageRange: "Ages 12 and older",
      time: "2-3 min",
      trainingNeeded: "Level A/B"
    },
    scoring: "Total score (5 to 35). Higher scores indicate higher life satisfaction.",
    interpretation: "Identifies clinical clients who are highly dissatisfied, assisting program reviews.",
    versions: "SWLS Standard Edition",
    factorsMeasured: "Life achievements, satisfaction with current situation, cognitive review."
  },
  {
    id: "life-event-checklist",
    name: "LEC-5: Life Event Checklist",
    category: "mood",
    developer: "National Center for PTSD",
    quickInfo: "Brief self-report screening scale for traumatic life events.",
    purpose: "Identifies exposure to stressful situations, supporting clinical PTSD diagnostic planning.",
    administration: {
      type: "Self-report",
      items: "17 trauma criteria items",
      ageRange: "Ages 18 and older",
      time: "5-10 min",
      trainingNeeded: "Level B"
    },
    scoring: "Identifies if exposure was directly experienced, witnessed, or learned about.",
    interpretation: "Screens patients for trauma exposure, assisting clinical therapy planning.",
    versions: "LEC, LEC-5 (DSM-5 updated)",
    factorsMeasured: "Disasters, physical abuse, combat, exposure to severe injuries."
  },
  {
    id: "ptsd-checklist",
    name: "PCL-5: Posttraumatic Stress Disorder Checklist",
    category: "mood",
    developer: "Frank Weathers et al.",
    quickInfo: "DSM-5 aligned self-report rating scale for PTSD symptoms.",
    purpose: "Screens for PTSD, supports diagnosis, and monitors symptoms during therapy.",
    administration: {
      type: "Self-report",
      items: "20 Likert items",
      ageRange: "Ages 18 and older",
      time: "5-10 min",
      trainingNeeded: "Level B"
    },
    scoring: "Total score of 80. Recommended cutoff is a score between 31 and 33.",
    interpretation: "Scores matching or exceeding the cutoff suggest active PTSD risks, needing further evaluation.",
    versions: "PCL, PCL-C, PCL-M, PCL-S, PCL-5",
    factorsMeasured: "Intrusive thoughts, avoidance, emotional changes, hyperarousal."
  },
  {
    id: "adverse-childhood",
    name: "ACE-Q: Adverse Childhood Experience Questionnaire",
    category: "mood",
    developer: "Vincent Felitti et al.",
    quickInfo: "Highly respected brief scale screening for childhood trauma.",
    purpose: "Measures childhood abuse, neglect, and family challenges.",
    administration: {
      type: "Self-report",
      items: "10 Yes/No items",
      ageRange: "Ages 18 and older",
      time: "5 min",
      trainingNeeded: "Level B"
    },
    scoring: "Total score (0 to 10), representing the count of checked issues.",
    interpretation: "Elevated scores correlate with chronic physical and mental health challenges.",
    versions: "ACE Study Forms, ACEv2",
    factorsMeasured: "Family trauma, emotional distress, childhood neglect, parental divorce."
  },
  {
    id: "patient-health-9",
    name: "PHQ-9: Patient Health Questionnaire",
    category: "mood",
    developer: "Robert Kroenke, Robert Spitzer, & Janet Williams",
    quickInfo: "Brief, popular self-report scale assessing depression severity.",
    purpose: "Assesses depression symptoms and monitors progress in primary care clinics.",
    administration: {
      type: "Self-report",
      items: "9 items matching DSM depressive criteria",
      ageRange: "Ages 12 and older",
      time: "3-5 min",
      trainingNeeded: "Level A/B"
    },
    scoring: "Total score of 27. Severity tiers: None (0-4), Mild (5-9), Moderate (10-14), Severe (15+).",
    interpretation: "Scores over 10 check for clinical depression, with item 9 monitoring suicide risk.",
    versions: "PHQ-9, PHQ-2 (brief screener)",
    factorsMeasured: "Anhedonia, guilt, sleep issues, fatigue, concentration, suction risks."
  },
  {
    id: "social-anxiety- adolescents",
    name: "K-GSADS-A: Kutcher Social Anxiety Scale",
    category: "mood",
    developer: "Stanley Kutcher",
    quickInfo: "Brief clinical scale measuring social anxiety in teenagers.",
    purpose: "Evaluates social anxiety, performance concerns, and social avoidance in adolescents.",
    administration: {
      type: "Interviewer or Self-Report",
      items: "6 items",
      ageRange: "12 to 18 years",
      time: "5 min",
      trainingNeeded: "Level B"
    },
    scoring: "Sum of ratings ranges from 0 to 18.",
    interpretation: "High scores identify severe social anxieties, assisting school counselors.",
    versions: "K-GSADS-A Standard scale",
    factorsMeasured: "Performance anxiety, peer avoidance, distress in social situations."
  },
  {
    id: "suicide-severity-columbia",
    name: "C-SSRS: Columbia Suicide Severity Rating Scale",
    category: "mood",
    developer: "Kelly Posner et al.",
    quickInfo: "Gold-standard questionnaire evaluating suicidal ideation.",
    purpose: "Evaluates suicidal thoughts, behaviors, and immediate safety concerns.",
    administration: {
      type: "Interviewer or Self-Screener",
      items: "2 to 6 screening questions",
      ageRange: "All ages",
      time: "2-10 min",
      trainingNeeded: "Level B (Screener) / Level C (In-depth)"
    },
    scoring: "Binary logic tracking active thoughts, plans, and intents.",
    interpretation: "Positive responses indicate high risks, requiring immediate safety precautions.",
    versions: "In-Depth Clinical, Brief Screener",
    factorsMeasured: "Suicidal intent, plans, preparative behavior."
  },
  {
    id: "trauma-screening-q",
    name: "TSQ: Trauma Screening Questionnaire",
    category: "mood",
    developer: "Chris R. Brewin et al.",
    quickInfo: "Brief, popular 10-item PTSD screener.",
    purpose: "Identifies PTSD risks in clients who have experienced trauma.",
    administration: {
      type: "Self-report",
      items: "10 Yes/No items (5 intrusive, 5 hyperarousal)",
      ageRange: "Ages 18 and older",
      time: "3-5 min",
      trainingNeeded: "Level B"
    },
    scoring: "Count of checked items. recommended cutoff is 6 positive responses.",
    interpretation: "Scores >= 6 indicate PTSD risks, needing further, comprehensive evaluations.",
    versions: "TSQ Baseline screening scale",
    factorsMeasured: "Intrusive memories, physical hyperarousal, insomnia."
  },

  // INTEREST & CAREER TESTS
  {
    id: "kolbe-index",
    name: "Kolbe A Index",
    category: "career",
    developer: "Kathy Kolbe",
    quickInfo: "Assessment evaluating conative operational styles.",
    purpose: "Identifies natural operational drives to build balanced, productive teams.",
    administration: {
      type: "Self-Report situational",
      items: "36 items",
      ageRange: "Ages 15 and older",
      time: "15-20 min",
      trainingNeeded: "Level B"
    },
    scoring: "Produces a 4-digit operational profile (four Action Modes scaled 1 to 10).",
    interpretation: "Action modes: Fact Finder (records), Follow Through (structures), Quick Start (initiates), Implementor (action).",
    versions: "Kolbe A, Kolbe Y (Youth)",
    factorsMeasured: "Conative style, task resolution instincts.",
    isSmo34: false
  },
  {
    id: "strong-interest",
    name: "Strong Interest Inventory (SII/SCII)",
    category: "career",
    developer: "E.K. Strong Jr.",
    quickInfo: "standardized interest inventory for career counseling.",
    purpose: "Matches personal interests with career profiles, utilizing John Holland's RIASEC themes.",
    administration: {
      type: "Self-Report Booklet",
      items: "291 items (Form 2004)",
      ageRange: "Ages 14 and older",
      time: "30-45 min",
      trainingNeeded: "Level B"
    },
    scoring: "Yields standard scores on General Occupational Themes and Basic Interest Scales.",
    interpretation: "Identifies candidate matches to career environments based on Holland themes.",
    versions: "SVIB, SCII, Strong Interest Inventory",
    factorsMeasured: "Holland career fields, leisure preferences, academic choices."
  },
  {
    id: "thurstone-interest",
    name: "Thurstone Interest Schedule (TIS)",
    category: "career",
    developer: "L.L. Thurstone",
    quickInfo: "Standard forced-choice career interest catalog.",
    purpose: "Determines vocational preferences across 10 job families.",
    administration: {
      type: "Group or Individual Self-report",
      items: "100 paired items",
      ageRange: "High school to Adults",
      time: "15-20 min",
      trainingNeeded: "Level B"
    },
    scoring: "Yields interest rankings across 10 career families.",
    interpretation: "Reveals strong vocational trends, supporting career counseling decisions.",
    versions: "TIS Standard Forms",
    factorsMeasured: "Verbal career interests, computational fields, artistic preferences, mechanical jobs."
  },
  {
    id: "oasis-3",
    name: "Occupational Aptitude Survey and Interest Schedule - Third Edition (OASIS-3)",
    category: "career",
    developer: "Albert S. Ancell",
    quickInfo: "Standardized modern career planning portfolio.",
    purpose: "Evaluate interests and vocational aptitudes to support career guidance.",
    administration: {
      type: "Group or Individual",
      items: "120 items (interests) and 5 subscales (aptitudes)",
      ageRange: "Grades 8 to Adults",
      time: "30-45 min",
      trainingNeeded: "Level B",
    },
    scoring: "Percentiles matched to the Guide for Occupational Exploration taxonomy.",
    interpretation: "Directly links career preferences with actual worker capabilities.",
    versions: "OASIS-2, OASIS-3",
    factorsMeasured: "Verbal, numerical, spatial, and twelve career interest categories.",
    isSmo34: true
  }
];
