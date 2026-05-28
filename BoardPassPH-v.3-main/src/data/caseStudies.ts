export interface CaseQuestion {
  phase: number;
  title: string;
  question: string;
  options: string[];
  correctIndex: number;
  rationales: string[]; // Explanations for each option
}

export interface CaseStudy {
  id: string;
  subject: 'Abnormal Psychology' | 'Psychological Assessment' | 'Theories of Personality' | 'Industrial-Organizational';
  title: string;
  difficulty: 'Medium' | 'Clinical Hard' | 'Board Master';
  clientName: string;
  age: number;
  gender: string;
  occupation: string;
  referralReason: string;
  chiefComplaint: string;
  behavioralObservations: string;
  academicHistory: string;
  psychologicalTestingBattery: string;
  testResultsSummary: string;
  phases: CaseQuestion[];
  completedXpReward: number;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'case_001',
    subject: 'Abnormal Psychology',
    title: 'The Resonance of Splintered Chords',
    difficulty: 'Clinical Hard',
    clientName: 'Julian C.',
    age: 24,
    gender: 'Male',
    occupation: 'Conservatory Music Composer',
    referralReason: 'Admitted following a neighbor-initiated welfare check after Julian was found conducting an "imaginary orchestra" in the building hallway at 3:00 AM, in a state of partial undress.',
    chiefComplaint: 'Julian states: "The universe is playing a celestial cello symphony directly into my auditory cortex. For three weeks I couldn\'t sleep because the whispers in the music warned me that if I closed my eyes, the sheet music on my piano would catch fire. But then, two days ago, a black void opened in my chest. I cannot feel the keys. I am a hollow instrument, completely rotting away inside."',
    behavioralObservations: 'The client exhibits rapid, pressured speech with tangential associations during the intake interview. Mood is labile, fluctuating between intense grandiose mania ("I am the musical reincarnate of Chopin") and sudden profound lethargic weeping. Flat affect is present during flat intervals, paired with moderate catatonic waxy flexibility in his fingers.',
    academicHistory: 'Graduated magna cum laude from a elite Manila music conservatory. History of episodic isolation during semesters, followed by cycles of miraculous 72-hour composition bouts where he did not sleep or consume full meals.',
    psychologicalTestingBattery: 'MMPI-2-RF (Minnesota Multiphase Personality Inventory-2-Restructured Form), WAIS-IV (Wechsler Adult Intelligence Scale-4th Edition), Rorschach Inkblot Test.',
    testResultsSummary: 'MMPI-2-RF: Severe elevations on RC8 (Aberrant Experiences, T-Score = 82) and RC9 (Hypomanic Activation, T-Score = 79). RC2 (Low Positive Emotions) elevated at T = 71. WAIS-IV: Verbal Comprehension Index (VCI) = 132 (Very Superior), Working Memory Index (WMI) = 88 (Low Average), Processing Speed Index (PSI) = 90. Rorschach: Frequent "M-" responses suggesting highly idiosyncratic, distorted perceptual projections and poor reality testing.',
    completedXpReward: 80,
    phases: [
      {
        phase: 1,
        title: 'Diagnostic Recognition',
        question: 'Based on the longitudinal cyclic history of hypomanic/manic activation, interspersed deep depressive states, and concurrent auditory hallucinations persisting even during flat emotional states, which is the most accurate diagnostic formulation?',
        options: [
          'Schizophrenia, Paranoid type with bipolar specifiers',
          'Schizoaffective Disorder, Bipolar Type, with mixed features',
          'Bipolar I Disorder, Severe with Psychotic Features',
          'Delusional Disorder, Grandiose Type'
        ],
        correctIndex: 1,
        rationales: [
          'Incorrect. In current DSM-5 classification, Schizophrenia subtyping has been removed, and the prominent, prolonged mood episodes indicate a schizoaffective etiology.',
          'Correct! The clinical picture presents a continuous period of illness during which there is a major mood episode (manic and depressive) concurrent with criteria A of Schizophrenia, alongside delusions/hallucinations for at least 2 weeks in the absence of a major mood episode.',
          'Incorrect. While he has bipolar cycles, his auditory hallucinations and delusions occurred consistently when mood symptoms were absent, which fits Schizoaffective criteria better than pure Bipolar with psychotic features.',
          'Incorrect. Delusional disorder excludes prominent auditory hallucinations or mood cycles.'
        ]
      },
      {
        phase: 2,
        title: 'Differential Exclusion',
        question: 'To confirm Schizoaffective Disorder over Bipolar I Disorder with Psychotic Features, which diagnostic timeline milestone must be explicitly established in Julian’s case file?',
        options: [
          'Auditory hallucinations must occur exclusively during the manic episodes.',
          'Delusions and hallucinations must persist for at least 2 consecutive weeks in the absence of any prominent manic or depressive mood symptoms.',
          'A continuous mood episode must persist for at least 6 months without any interruption.',
          'Depressive symptoms must be entirely absent during the manic periods.'
        ],
        correctIndex: 1,
        rationales: [
          'Incorrect. If they occur exclusively during mood episodes, the diagnosis would remain Bipolar I with Psychotic Features.',
          'Correct! DSM-5 requires that delusions or hallucinations be present for at least 2 weeks in the absence of a major mood episode (manic or depressive) at some point during the lifetime duration of the illness.',
          'Incorrect. The 6-month requirement is associated with Schizophrenia, not the specific duration of the mood-free psychotic window.',
          'Incorrect. Bipolar mood symptoms can have mixed features where symptoms co-exist, but this does not distinguish it from schizoaffective disorder.'
        ]
      },
      {
        phase: 3,
        title: 'Cognitive Battery Interpretation',
        question: 'Julian’s WAIS-IV results reveal a prominent 44-point discrepancy between his Verbal Comprehension (VCI = 132) and Working Memory (WMI = 88). In clinical psychometrics, how should this discrepancy be interpreted?',
        options: [
          'It represents a global cognitive decline indicating progressive neurodegenerative issues.',
          'His verbal crystalized reasoning remains exceptionally superior, but active psychotic interference, manic flight of ideas, and distractibility are severely suppressing his auditory attention span and mental manipulation limits.',
          'He has a primary specific learning disorder affecting non-verbal mathematical integration.',
          'The battery is invalid and must be re-administered immediately.'
        ],
        correctIndex: 1,
        rationales: [
          'Incorrect. Julian is young, showing an active psychiatric episode, which easily accounts for temporary processing or attention drops.',
          'Correct! Discrepancies where VCI is highly superior but WMI is suppressed commonly reflect severe psychotic, manic, or emotional distractibility which limits immediate attention tracking and active working registers.',
          'Incorrect. Math learning disorders are not diagnosed via VCI/WMI discrepancies on adult WAIS cognitive tests alone.',
          'Incorrect. Discrepancies do not invalidate a test; they provide diagnostic clues to executive functioning and operational coping under psychiatric duress.'
        ]
      },
      {
        phase: 4,
        title: 'Counseling & Intervention Formulation',
        question: 'Which counseling modality and immediate therapeutic goal should be prioritized for Julian’s reintegration after stabilization?',
        options: [
          'Flooding exposure to extinguish the anxiety of piano keys.',
          'Cognitive Behavioral Therapy for Psychosis (CBTp) focusing on reality testing, developing coping strategies for auditory delusions, and establishing lithium medication compliance habits.',
          'Nondirective Unconditional Positive Regard to allow the split composer archetype to self-actualize.',
          'Aversive conditioning using unpleasant acoustic tones when manic fantasies occur.'
        ],
        correctIndex: 1,
        rationales: [
          'Incorrect. Flooding is utilized for specific phobias, not for active psychoses and hallucinations.',
          'Correct! CBTp is the gold standard psychotherapy for schizoaffective spectrum clients, focused on rational disputation of hallucinations, reality-testing boundaries, and maintaining critical medication adherence regimes.',
          'Incorrect. While humanistic warmth is valuable, severe psychosis requires structured cognitive boundaries to ground reality testing safely.',
          'Incorrect. Aversive conditioning is unethical and clinical counterproductive for psychotic disorders.'
        ]
      }
    ]
  },
  {
    id: 'case_002',
    subject: 'Theories of Personality',
    title: 'The Director’s Monolith',
    difficulty: 'Medium',
    clientName: 'Arthur V.',
    age: 38,
    gender: 'Male',
    occupation: 'Corporate Creative Director',
    referralReason: 'Referred by Human Resources after a series of critical complaints regarding a "hostile work environment," culminating in Arthur throwing an expensive glass awards trophy at an associate\'s desk during a brainstorming meeting.',
    chiefComplaint: 'Arthur is highly defensive: "This referral is an insult to my caliber. The people under me are intellectual insects. They can\'t comprehend the magnitude of my vision. If I yell, it\'s because it is the only way to squeeze genius out of mediocrity. HR is trying to defame me because they are threatened by my unique value to this firm."',
    behavioralObservations: 'The client is excessively groomed, wearing custom European tailoring. He is highly articulate but constantly interrupts the assessor, steering conversations towards his achievements. He displays active annoyance with standardized testing, calling the MMPI "a simplistic box-checking ritual for average minds."',
    academicHistory: 'Alumnus of an elite Ivy League institution. Continually references his high Grade Point Average and multiple industry prizes during the clinical interview.',
    psychologicalTestingBattery: 'MCMI-IV (Millon Clinical Multiaxial Inventory-IV), TAT (Thematic Apperception Test), Rotter Incomplete Sentences Blank (RISB).',
    testResultsSummary: 'MCMI-IV: Strong Elevations on Scale 5 (Narcissistic, Base Rate = 89) and Scale 6A (Antisocial, BR = 78). Scale 4 (Histrionic) = BR 72. TAT responses consistently depict lone heroic figures conquering weak envious crowds, but end with sudden, catastrophic betrayals or complete isolation.',
    completedXpReward: 75,
    phases: [
      {
        phase: 1,
        title: 'Core Typology Recognition',
        question: 'Under Heinz Kohut’s self-psychology framework, Arthur’s extreme grandiosity, fragile sensitivity to criticism, and demanding treatment of subordinates represent a pathology of what psychological structure?',
        options: [
          'Under-developed Animic shadow archetype.',
          'A fragmented and unmirrored "Grandiose Self" resulting from a severe lack of parental mirroring during key childhood stages.',
          'Compulsive superego over-compensation.',
          'Over-developed social interest (Gemeinschaftsgefühl).'
        ],
        correctIndex: 1,
        rationales: [
          'Incorrect. This utilizes Jungian concepts, which are not primary in Kohut\'s developmental psychoanalysis.',
          'Correct! Heinz Kohut postulated that pathological narcissism arises when parents fail to mirror the child\'s healthy early grandiosity, leaving the "Grandiose Self" frozen, needing constant external validation to prevent painful internal fragmentation.',
          'Incorrect. Arthur shows poor impulse control and low superego concern for others, ruling out compulsive superego over-compensation.',
          'Incorrect. He shows remarkably low social interest, which Adler defined as the cornerstone of psychological health.'
        ]
      },
      {
        phase: 2,
        title: 'Diagnostic Differentiation',
        question: 'Arthur displays grandiosity, a lack of empathy, and a strong sense of entitlement, but also impulsive rage and paranoia. Which personality disorder must be prioritized in the differential diagnosis?',
        options: [
          'Obsessive-Compulsive Personality Disorder (OCPD)',
          'Narcissistic Personality Disorder (NPD), with consideration of Borderline Personality traits during stress-induced fragmentation ("Narcissistic Rage")',
          'Avoidant Personality Disorder',
          'Schizotypal Personality Disorder'
        ],
        correctIndex: 1,
        rationales: [
          'Incorrect. OCPD focuses on rule-rigidity, cleanliness, and perfectionism, whereas Arthur’s focus is on status, superiority, and adoration.',
          'Correct! Arthur manifests classic DSM-5 criteria for Narcissistic Personality Disorder, but when his hyper-fragile self-worth is threatened, he undergoes dramatic "narcissistic rage" with borderline/paranoid micro-psychotic features.',
          'Incorrect. Avoidant individuals crave social connection but escape from fear of embarrassment, which is opposite to Arthur\'s grandiose, outgoing entitlement.',
          'Incorrect. Schizotypal traits involve odd magical thinking and eccentric behaviors, which Arthur does not demonstrate.'
        ]
      },
      {
        phase: 3,
        title: 'TAT Interpretation Study',
        question: 'In the TAT, Arthur’s repetitive themes of a "lone hero conquering a weak envious crowd but ending in sudden catastrophic isolation" suggest what underlying personality dynamic under Alfred Adler’s Individual Psychology?',
        options: [
          'An active striving for superiority that is healthy and socially constructive.',
          'A highly pampered "Lifestyle" characterized by a useless striving for personal superiority over others, masking an intense, uncooperative inferiority complex.',
          'Retrograde childhood Oedipal neurosis.',
          'Excellent reality integration with strong ego-resilience.'
        ],
        correctIndex: 1,
        rationales: [
          'Incorrect. Healthy striving involves deep social interest and contribution, which is absent in Arthur’s themes.',
          'Correct! Adler argued that narcissistic striving for personal superiority is a useless life-path bred from pampering, hiding a deep-seated inferiority complex and lack of social feeling, inevitably leading to social distance and felt isolation.',
          'Incorrect. Oedipal dynamics are Freudian concepts, not Adlerian Adlerian Individual Psychology paradigms.',
          'Incorrect. His isolation themes indicate vulnerable, brittle coping structures.'
        ]
      },
      {
        phase: 4,
        title: 'Strategic Intervention Selection',
        question: 'When conducting psychotherapy with Arthur, which clinical hurdle is the therapist most likely to encounter first, and what is the optimal counseling posture?',
        options: [
          'Severe catatonic resistance requiring chemical sensory stimulation.',
          'A "Devaluation/Idealization" transference cycle, where the therapist must maintain non-defensive limits, mirror authentic emotional vulnerability, and redirect Arthur toward developing genuine empathy for others.',
          'Extreme submissiveness and passive-aggressive obedience to commands.',
          'An inability to articulate language (Broca\'s aphasia) due to extreme anxiety.'
        ],
        correctIndex: 1,
        rationales: [
          'Incorrect. Aphasia and catatonia are not typical traits of personality disorders.',
          'Correct! Narcissistic clients quickly swing between idealizing their therapists (as brilliant extensions of themselves) and devaluing them (as soon as a critique is offered). The clinician must remain centered, secure, and help them construct a more cohesive self-structure.',
          'Incorrect. Submissiveness is rare in narcissistic clients; dominance and demands are typical.',
          'Incorrect. Hypomanic or speech pathologies are neurological, whereas Arthur is highly verbal.'
        ]
      }
    ]
  },
  {
    id: 'case_003',
    subject: 'Psychological Assessment',
    title: 'The Silent Deficit',
    difficulty: 'Board Master',
    clientName: 'Miguel "Mickey" T.',
    age: 9,
    gender: 'Male',
    occupation: 'Grade 3 Student',
    referralReason: 'Referred by school guidance counselor at a Quezon City academy due to highly disruptive classroom behaviors, constant seat-leaving, impulsive talking, and a major academic lag in mathematics.',
    chiefComplaint: 'Mother reports: "Mickey is incredibly smart when building complexes with Legos or listening to stories. But the moment the math teacher writes numbers on the board, he starts tapping his desk, gets out of his chair, or cries. The teacher says he is lazy and lacks focus, but we are terrified he might have a serious cognitive deficit."',
    behavioralObservations: 'During testing, Mickey was highly cooperative during verbal tasks, showing a rich vocabulary and humorous analogies. However, when faced with matrix logic and block design, he became hyperactive, continuously shifting his posture, requesting restroom breaks, and whispering "I can\'t think, the blocks are moving."',
    academicHistory: 'Exemplary performance in verbal and reading comprehension. Repeatedly fails weekly algebra and mathematical fraction quizzes.',
    psychologicalTestingBattery: 'WISC-V (Wechsler Intelligence Scale for Children-5th Edition), Bender Visual-Motor Gestalt Test (II), Connor\'s 3 ADHD Rating Scale (Completed by Mother and Teacher).',
    testResultsSummary: 'WISC-V Index Scores: Verbal Comprehension (VCI) = 128 (Superior), Fluid Reasoning (FRI) = 84 (Low Average), Visual Spatial Index (VSI) = 80 (Low Average), Working Memory (WMI) = 78 (Borderline), Processing Speed Index (PSI) = 82 (Low Average). Connor\'s 3: Mother & Teacher ratings show clinically significant elevations (T-Scores > 74) on Inattention and Hyperactivity subscales. Bender Gestalt II: Errors of integration and distortion are within age-appropriate statistical limits (ruling out neuro-motor apraxia).',
    completedXpReward: 90,
    phases: [
      {
        phase: 1,
        title: 'Cognitive Discrepancy Analysis',
        question: 'Under modern psychological testing standards, Mickey’s extremely high VCI (128) contrasted with suppressed WMI (78) and PSI (82) indicates what cognitive profile?',
        options: [
          'Global intellectual developmental disability (IDD).',
          'A prominent executive dysfunction profile where superior language skills mask underlying severe deficits in working memory and cognitive speed, typical of Attention-Deficit/Hyperactivity Disorder (ADHD).',
          'Primary expressive language disorder.',
          'Completely invalid results indicating active child malingering.'
        ],
        correctIndex: 1,
        rationales: [
          'Incorrect. Global IDD requires overall suppression in all indexes (usually < 70) and concurrent adaptive deficits.',
          'Correct! Mickey\'s high verbal intelligence hides severe executive and processing bottlenecks. This highly discrepant profile (VCI >> WMI/PSI) is classic in ADHD children, as their span of concentration inhibits holding and manipulation of arithmetic registers.',
          'Incorrect. Mickey\'s high VCI of 128 rules out expressive language problems.',
          'Incorrect. Malingering is extremely rare in 9-year-olds and his performance correlates perfectly with classroom behavior.'
        ]
      },
      {
        phase: 2,
        title: 'Specific Learning Classification',
        question: 'Mickey’s high oral-linguistic capability combined with profound visual-spatial and mathematical struggle (FRI = 84, VSI = 80, math failures) suggests which specific educational diagnostic criteria should be thoroughly explored?',
        options: [
          'Specific Learning Disorder with impairment in reading (Dyslexia)',
          'Specific Learning Disorder with impairment in mathematics (Dyscalculia)',
          'Autism Spectrum Disorder, Level 3',
          'Oppositional Defiant Disorder'
        ],
        correctIndex: 1,
        rationales: [
          'Incorrect. Mickey excels in reading and verbal abilities, ruling out Dyslexia.',
          'Correct! The clinical pattern of high language ability juxtaposed with visual-spatial fluid weaknesses, and specific school failure in algebraic/arithmetical structures, points directly to a Specific Learning Disorder with impairment in mathematics (Dyscalculia).',
          'Incorrect. He shows excellent social warmth, humor, and cooperative communication, ruling out Autism Spectrum traits.',
          'Incorrect. His behaviors are anxious and executive-driven during stressful math periods, not a generalized vindictive defiance against authority.'
        ]
      },
      {
        phase: 3,
        title: 'Bender Gestalt Integration Check',
        question: 'Mickey’s Bender Gestalt II results showed age-appropriate coordinate and design reproduction, showing no organic motor dyspraxia. What is the clinical value of this diagnostic finding?',
        options: [
          'It proves the child is completely lazy and has no learning issues.',
          'It successfully rules out fine-motor coordination deficits and focal brain lesions, allowing the clinician to isolate the math struggle as a cognitive-symbolic deficit (dyscalculia) and executive inattention.',
          'It invalidates the WISC-V findings entirely.',
          'It indicates a need for immediate brain CT/MRI scans.'
        ],
        correctIndex: 1,
        rationales: [
          'Incorrect. Learning and executive disorders are neurologically complex but do not mean the client is "lazy".',
          'Correct! Since the Bender Gestalt II measures visual-motor integration and shows no impairment, we can conclude that the motor skills are sound, isolating the difficulty to numerical processing and attention deficits.',
          'Incorrect. Bender Gestalt II and WISC-V measure different domains; they do not invalidate each other.',
          'Incorrect. Age-appropriate Bender results argue strongly *against* the necessity of expensive, invasive organic neuro-imaging.'
        ]
      },
      {
        phase: 4,
        title: 'Recommended Educational Accommodations',
        question: 'Under the Rules and Regulations of the Philippine Republic Act 9442 (Amending the Magna Carta for Persons with Disability), which exam accommodation should be officially requested from Mickey’s school?',
        options: [
          'Exert pressure to expel Mickey to avoid lowering school ranking results.',
          'Providing extended examinations time limits, allowing the user of visual math manipulatives, a quiet distraction-free workspace, and breaking math blocks into short, verbally reinforced segments.',
          'Immediate physical institutionalization.',
          'Complete immunity from ever grading mathematics performance.'
        ],
        correctIndex: 1,
        rationales: [
          'Incorrect. Expulsion is an illegal and discriminatory educational practice.',
          'Correct! These accommodations address his working memory bottleneck (extended time, visual manipulatives) and ADHD susceptibility to environmental clutter, providing a fair learning environment under Philippine law.',
          'Incorrect. Mickey does not pose any danger and institutionalization is highly inappropriate.',
          'Incorrect. He must still learn and be assessed, but under supportive accommodations.'
        ]
      }
    ]
  },
  {
    id: 'case_004',
    subject: 'Industrial-Organizational',
    title: 'The Ethics of the Unlicensed Seal',
    difficulty: 'Board Master',
    clientName: 'Clarissa M., RPm',
    age: 29,
    gender: 'Female',
    occupation: 'Corporate Human Resources & Recruitment Manager',
    referralReason: 'Consultation sought by clarifying ethical obligations regarding direct management directives inside a massive BPO services firm in Taguig.',
    chiefComplaint: 'Clarissa states: "Our Vice President of Talent Solutions ordered me to implement the MMPI-2 and WAIS-IV batteries as a mandatory screening tool for all supervisors seeking promotion. When I pointed out that only Licensed Psychologists (RPsy) or supervised Psychometricians (RPm) can formally purchase, score, and sign off on these standard diagnostic scales, he told me that either I compile and interpret them myself within 10 days, or my employment contract will be terminated for insubordination. We do not have any retail psychologist on our payroll. What is my professional stance under Philippine Psychology Law?"',
    behavioralObservations: 'The client presents with severe signs of acute occupational burnout, including tension headaches, shallow breathing, and intense stress regarding her career standing and ethical licensing integrity.',
    academicHistory: 'Passed the Philippine Board Exam for Psychometricians (PmLE) with an 84.50% rating. Fully updated Professional Regulation Commission (PRC) identification card issuer.',
    psychologicalTestingBattery: 'PRC Board of Psychology Code of Ethics, Republic Act No. 10029 (Philippine Psychology Act of 2009).',
    testResultsSummary: 'Review of organizational practices highlights a direct, severe violation of professional psychometric regulations, exposing the firm to critical legal penalties and illegal clinical practice certifications.',
    completedXpReward: 95,
    phases: [
      {
        phase: 1,
        title: 'Legal Licensing Recognition',
        question: 'Under Philippine Republic Act 10029, what is the defined legal scope of a Licensed Psychometrician (RPm) regarding psychological assessments?',
        options: [
          'Administering and scoring psychological tests, interpret results, and write clinical reports completely free of any psychologist supervision.',
          'Administering, scoring, and writing draft interpretations of objective personality measures, projective tests (subject to limitations), and cognitive scales, but ONLY under the supervised authority of a Licensed Psychologist (RPsy).',
          'Diagnosing major clinical psychiatric conditions under the supervision of a physician.',
          'Prescribing psychoactive medications for workplace anxiety reduction.'
        ],
        correctIndex: 1,
        rationales: [
          'Incorrect. RPms can never operate completely unsupervised when administering clinical tests; a supervising RPsy must sign off on psychological evaluations.',
          'Correct! Under RA 10029, a registered psychometrician’s scope involves administering, basic scoring, and preparing descriptive drafts, but always under the official guidance of a registered psychologist who holds the final ethical liability.',
          'Incorrect. Medical diagnosis and prescribal rights lie strictly under Psychiatry and Medicine licenses, not under the Psychology Act.',
          'Incorrect. Prescribing medications is strictly limited to medical doctors (psychiatrists).'
        ]
      },
      {
        phase: 2,
        title: 'Assessment Tool Suitability',
        question: 'Is the Vice President’s directive to utilize the MMPI-2 and WAIS-IV as mandatory screening tools for BPO company promotions ethically and methodologically sound?',
        options: [
          'Yes, because these extensive tests provide a fail-safe measure of organizational productivity and emotional stability.',
          'No, because the MMPI-2 and WAIS-IV are clinical-diagnostic instruments designed for psychiatric populations, violating the psychometric "suitability of purpose" concept. Normal corporate screening should utilize industrial-organizational tools with job-relevant criterion-related validity.',
          'No, because only executive management has the right to select assessment batteries.',
          'Yes, because any psychological test is valid for any human resource setting.'
        ],
        correctIndex: 1,
        rationales: [
          'Incorrect. Using clinical batteries as standard promotional filters is diagnostic sorting, which is inappropriate and highly unethical for standard career progression.',
          'Correct! Tests must match their validated purpose. MMPI-2 measures severe psychopathology, and WAIS-IV measures cognitive capacity. Using them as generic corporate screening mechanisms is highly unethical and violates test-utility validation profiles.',
          'Incorrect. Management style is subordinate to professional ethical laws and test publishers\' requirements.',
          'Incorrect. Test validation is specific to population types; general applicability is a major psychometric error.'
        ]
      },
      {
        phase: 3,
        title: 'Ethical Dispute Resolution',
        question: 'Under the PAP (Psychological Association of the Philippines) Code of Ethics, when a conflict arises between direct organizational demands (the VP’s termination threats) and professional ethical standards, what step should Clarissa take?',
        options: [
          'Comply immediately to secure her income, then report the firm anonymously to the police.',
          'Formally state her commitment to the PRC / PAP Code of Ethics, refuse to conduct assessments that violate licensing laws, document the ethical violation, and seek to resolve the conflict through professional consensus or consulting an external legal counsel.',
          'Resign silently without informing management of the ethical issue.',
          'Deliberately fabricate false scores to ruin the company’s promotion database as revenge.'
        ],
        correctIndex: 1,
        rationales: [
          'Incorrect. Complying violates her professional licensing vows and makes her legally liable under RA 10029.',
          'Correct! Under ethical dispute guidelines, a professional must make their commitment to the ethical code clear and take proactive, documented steps to resolve the conflict in a non-compliant manner that protects client safety and credentials.',
          'Incorrect. Resigning without explaining the ethical hazard does not resolve the dynamic issue and allows the firm to press the next recruiter into illegal testing.',
          'Incorrect. Maliciously fabricating data is a critical professional felony.'
        ]
      },
      {
        phase: 4,
        title: 'Legal Penalty Safeguard',
        question: 'Under Section 33 of RA 10029, any person who violates the provisions of the Psychology Act (such as practicing without a license or coercion in illegal testing) is subject to what legal penalty?',
        options: [
          'A simple, non-recorded verbal warning from the barangay captain.',
          'A fine ranging from ₱100,000 to ₱200,500, or imprisonment of not less than 6 months nor more than 2 years, or both, at the discretion of the court.',
          'Automatic lifetime ban from ever entering Taguig City.',
          'No penal consequences exist for corporate entities.'
        ],
        correctIndex: 1,
        rationales: [
          'Incorrect. Minor warnings are not associated with major licensing violations under Philippine statutory laws.',
          'Correct! Under the penal provisions of RA 10029 (Section 33), practicing without credentials or violating licensing regulations is a criminal offense carrying severe fines and prison terms.',
          'Incorrect. The jurisdiction is national, and the penalties involve actual state imprisonment/fines rather than municipal bans.',
          'Incorrect. Corporate agents can face direct prosecution if they enforce actions violating criminal health acts.'
        ]
      }
    ]
  },
  {
    id: 'case_005',
    subject: 'Theories of Personality',
    title: 'The Echo of the Empty Chair',
    difficulty: 'Medium',
    clientName: 'Isabella S.',
    age: 31,
    gender: 'Female',
    occupation: 'Emergency Relief Coordinator',
    referralReason: 'Self-referred due to progressive emotional numbness, intense somatic chest tightness, and a inability to build intimate romantic relationships following her rescue deployments during catastrophic super-typhoon events.',
    chiefComplaint: 'Isabella reports: "I look at my relationships, and I feel nothing. It\'s like I have a safety shield of ice around my heart. But at night, my chest clenches. I feel like there\'s an unexpressed scream trapped in my throat from three years ago when we couldn\'t evacuate a sector. I can\'t bear my partner asking for affection. I block it out completely."',
    behavioralObservations: 'The client sits in a stiff, highly controlled posture. She speaks about catastrophic events with a flat, intellectualized tone, but her leg is continuously shaking and she holds her hands tightly around her neck during narrative pivots.',
    academicHistory: 'Master’s degree in Disaster Risk Management and Social Psychology. Highly knowledgeable regarding trauma, which she uses to heavily self-rationalize.',
    psychologicalTestingBattery: 'Beck Anxiety Inventory (BAI), Gestalt Phenomenological Assessment, Post-Traumatic Stress Disorder Checklist (PCL-5).',
    testResultsSummary: 'PCL-5: High clinical score (Score = 54), demonstrating severe traumatic hyperarousal and detachment indicators. BAI: Moderate somatic anxiety (Score = 26). Gestalt Observation: Severe "retroflection" where the client is holding back emotion and redirecting her anger and grief inward, causing muscle constriction and numbing.',
    completedXpReward: 80,
    phases: [
      {
        phase: 1,
        title: 'Counseling Modality Selection',
        question: 'Isabella\'s Gestalt profile shows high "retroflection" (doing to herself what she wishes she could do to others, resulting in chronic somatic chest tension). Which counseling approach would focus primarily on integrating these bodily blocks and finishing this unresolved emotional baggage?',
        options: [
          'Rational Emotive Behavior Therapy (REBT) by disputing her rigid beliefs.',
          'Gestalt Therapy by Fritz Perls, emphasizing present-moment bodily awareness, contact boundary work, and resolving unfinished business through active techniques like the Empty Chair.',
          'Systematic Desensitization using imaginal mental scales.',
          'Adlerian Lifestyle Analysis looking for early sibling rivalry.'
        ],
        correctIndex: 1,
        rationales: [
          'Incorrect. REBT focuses on intellectual belief modification, whereas Gestalt is highly somatic and experiential, which fits her body block better.',
          'Correct! Gestalt therapy targets split-off feelings, somatic tensions, retroflections, and "unfinished business" (catastrophes from deployments) through experiential contact tools, allowing somatic and verbal emotional release.',
          'Incorrect. Desensitization helps phobias but doesn\'t directly target active contact boundary disturbances or deep bodily blockages.',
          'Incorrect. Sibling patterns do not address active somatic retroflections and secondary traumatic stress.'
        ]
      },
      {
        phase: 2,
        title: 'Gestalt Boundary Distortion Recognition',
        question: 'When Isabella redirects her "unexpressed scream" inward to choke her own throat and tighten her chest rather than channeling it toward external traumatic realizations, what Fritz Perls boundary distortion is she utilizing?',
        options: [
          'Confluence',
          'Retroflection',
          'Introjection',
          'Deflection'
        ],
        correctIndex: 1,
        rationales: [
          'Incorrect. Confluence is the blurring of boundary limits between self and environment, leading to a need to agree with everyone.',
          'Correct! Retroflection occurs when an individual turns back on themselves actions or feelings they wish to direct outward, literally choking their own emotional channels and expressing feelings somatically.',
          'Incorrect. Introjection is the passive absorption of values and ideas from authority figures without critical digestion.',
          'Incorrect. Deflection is the process of avoiding contact through humor, intellectualizations, or changing subjects.'
        ]
      },
      {
        phase: 3,
        title: 'Empty Chair Technique Execution',
        question: 'To execute the Gestalt "Empty Chair" technique for Isabella\'s trauma with the un-evacuated sector, how should the therapist structure the experiment?',
        options: [
          'Instruct Isabella to sit in the chair and listen to the therapist criticize her performance.',
          'Ask Isabella to place her split-off somatic tightness (the "Ice Shield") or the key authority figures from that deployment in the empty chair, and engage in an active, dual-sided dialogue in the present tense to voice the unexpressed trapped cry.',
          'Have her sleep in the chair to dream about super-typhoons.',
          'Put her partner in the chair to resolve their domestic financial obligations.'
        ],
        correctIndex: 1,
        rationales: [
          'Incorrect. Empty chair is client-led and designed to integrate dual client aspects, not a vehicle for therapist criticism.',
          'Correct! By externalizing the split-off somatic block ("the shield of ice") or projecting an unaddressed individual in the empty chair, the client speaks from both perspectives (e.g., her ice self and her hurt self), integrating the emotional rift.',
          'Incorrect. Sleep/dream state is not a component of active Gestalt empty chair exercises.',
          'Incorrect. Financial disputes do not address her deep, unresolved rescue trauma.'
        ]
      },
      {
        phase: 4,
        title: 'Clinical Evaluation of Progress',
        question: 'Which indicator during Gestalt therapy would represent a successful healing milestone of "integration of organismic needs" for Isabella?',
        options: [
          'An increase in intellectualizing her feelings using advanced trauma words.',
          'A somatic release (full crying or laughing) coupled with felt congruence, open relaxed breathing, and an emotional ability to let other people touch her boundaries without anxiety.',
          'Complete emotional isolation where she never feels anger again.',
          'Volunteering to deploy immediately to another active disaster zone with no self-care margins.'
        ],
        correctIndex: 1,
        rationales: [
          'Incorrect. Intellectualization is a defense mechanism (deflection), not an integration of organistic needs.',
          'Correct! Gestalt integration results in alignment between body, speech, and emotion, as somatic armor softens, restoring functional and intimate contact boundaries.',
          'Incorrect. Suppressed anger represents continued retroflection, not therapeutic healing.',
          'Incorrect. Rushing into danger shows continuous traumatic counter-phobic defense, which is dangerous.'
        ]
      }
    ]
  },
  {
    id: 'case_006',
    subject: 'Abnormal Psychology',
    title: 'The Clock of Clean Claws',
    difficulty: 'Medium',
    clientName: 'Edward H.',
    age: 27,
    gender: 'Male',
    occupation: 'Electrical Design Scholar',
    referralReason: 'Sought clinical psych assistance after his hands developed painful, bleeding skin lesions due to washing them with industrial surgical sanitizer up to 60 times a day.',
    chiefComplaint: 'Edward explains: "I know my hands are clean. But if I don\'t wash them in sequences of 4, a cold panic climbs up my back. I believe that there is a lethal microscopic electrical rust crawling on my skin. If I don\'t wash it away, this rust will contact my computer, create a short circuit fire, and burn my family alive while they sleep. It takes me 4 hours to leave my apartment because I must check every socket exactly 16 times."',
    behavioralObservations: 'Edward appears tense and hyper-vigilant. He continuously checks his watch and inspects the corners of the therapist\'s office for electrical wires. Mood is anxious with restricted affect. Hands are heavily chapped, dry, and show visible fissures with dynamic bandage coverings.',
    academicHistory: 'Alumnus of a prestigious technical university. Exceptional concentration on structural details, but took 2 extra years to graduate due to delays in submitting physical circuit layouts because he had to cross-check them endlessly.',
    psychologicalTestingBattery: 'Yale-Brown Obsessive Compulsive Scale (Y-BOCS), Beck Depression Inventory (BDI-II), Assessment of Cognitive Distortions.',
    testResultsSummary: 'Y-BOCS: Extremely high score (Score = 32 out of 40), signifying extreme clinical severity of obsessive-compulsive processes. BDI-II: Score of 21, indicating moderate secondary depressive features stemming from severe functional impairment.',
    completedXpReward: 75,
    phases: [
      {
        phase: 1,
        title: 'Symptom Formulation Check',
        question: 'Under DSM-5-TR standards, Edward\'s intrusive belief about "microscopic electrical rust causing a fatal fire" represents a/an _________, while his physical washing procedures represent a/an _________:',
        options: [
          'Delusion; Hallucination',
          'Obsession (ego-dystonic mental threat); Compulsion (behavior designed to reduce or prevent the associated distressing state)',
          'Idea of Reference; Somatic Delusion',
          'Panic Attack; Dissociative Amnesia'
        ],
        correctIndex: 1,
        rationales: [
          'Incorrect. Delusions and hallucinations represent active psychoses; Edward understands his behavior is excessive, making it an obsession-compulsion mechanism.',
          'Correct! Obsessions are recurrent thoughts, urges, or images perceived as intrusive and unwanted (the rust/fire risk). Compulsions are repetitive behaviors performed to alleviate the panic or prevent a dreaded event.',
          'Incorrect. Reference ideas and somatic delusions occur in psychotic conditions, whereas Edward exhibits ego-dystonic obsessive distress.',
          'Incorrect. Panic is present, but the core structural pattern is highly obsessive-compulsive.'
        ]
      },
      {
        phase: 2,
        title: 'Cognitive Insight Assessment',
        question: 'Edward tells you, "I know deep down that rust doesn\'t travel like a virus, but I feel like I just can\'t take the 0.001% risk that my family might die. I must check." How should his level of clinical insight be formally classified?',
        options: [
          'With excellent insight (completely symptom-free)',
          'With fair to good insight (he recognizes that his beliefs are definitely or probably not true, or that they may/may not be true)',
          'With absent insight/delusional beliefs',
          'With post-traumatic dissociative retrograde insight'
        ],
        correctIndex: 1,
        rationales: [
          'Incorrect. Excellent insight implies no OCD impairment, whereas Edward is clearly impaired but aware of his behavior.',
          'Correct! DSM-5 specifier "with fair/good insight" applies because Edward is able to recognize that the obsessive beliefs are irrational and probably not true, despite being driven to perform compulsions.',
          'Incorrect. Absent insight occurs when the client is convinced that their thoughts are absolutely true, which Edward disputes during calm discussions.',
          'Incorrect. Retrograde psychogenic insight is not a formal DSM-5 modifier.'
        ]
      },
      {
        phase: 3,
        title: 'Behavioral Mechanism Analysis',
        question: 'Under B.F. Skinner’s Operant Conditioning paradigm, what behavioral mechanism sustains and reinforces Edward’s hand-washing rituals?',
        options: [
          'Positive Reinforcement: Washing hands provides pleasant physiological feedback.',
          'Negative Reinforcement: The act of washing hands immediately terminates or reduces the intense, distressing biological anxiety state, reinforcing the habit to wash again during the next cycle.',
          'Vicarious Classical Conditioning.',
          'Extinction of safety seeking response.'
        ],
        correctIndex: 1,
        rationales: [
          'Incorrect. Hand-washing is painful and raw; it provides no positive sensory pleasure.',
          'Correct! Negative reinforcement is the removal of an aversive stimulus (anxiety/dread) immediately after a behavior (compulsive washing). This temporary relief strongly maintains and perpetuates the compulsive loop.',
          'Incorrect. Classical conditioning explains the acquisition of fears, but operant negative reinforcement explains the maintenance of the compulsion.',
          'Incorrect. Extinction would involve the breaking of the behavior, whereas Edward is currently highly reinforced.'
        ]
      },
      {
        phase: 4,
        title: 'Primary Treatment Protocol',
        question: 'Which behavioral therapy protocol has been established as the gold-standard treatment for Obsessive-Compulsive Disorder, and how is it applied in his case?',
        options: [
          'Cognitive psychoanalysis to unlock his childhood trauma regarding cleanliness.',
          'Exposure and Response Prevention (ERP): Exposing Edward to touching a "rusty" socket or dusty wire, and strictly preventing him from washing his hands or checking for decreasing intervals until the anxiety naturally habituates and subsides.',
          'Somatic electroconvulsive therapy (ECT) administered twice a week.',
          'Hypnotic regression to make him forget what numbers represent.'
        ],
        correctIndex: 1,
        rationales: [
          'Incorrect. General psychoanalysis has very poor empirical data in treating concrete severe OCD symptoms.',
          'Correct! ERP is the empirical gold standard: exposing the client to the obsession triggers and guiding them to resist the compulsion, proving that anxiety naturally decreases without executing the ritual.',
          'Incorrect. ECT is for treatment-resistant major depression, not a primary intervention for standard OCD.',
          'Incorrect. Forgetting numbers does not cure OCD and would make his engineering career impossible.'
        ]
      }
    ]
  }
];
