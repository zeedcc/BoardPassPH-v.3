import { Question } from '../types';

export const SEED_QUESTIONS: Question[] = [
  {
    category: "Clinical Practice — PAP Code of Ethics",
    vignette: "A registered psychometrician is running a private testing center. A close family friend asks if the psychometrician can administer a standardized intelligence and personality test battery for their 16-year-old child to aid in clinical diagnosis. According to the PAP Code of Ethics regarding Multiple Relationships, what is the MOST appropriate action for the psychometrician to take?",
    options: [
      "A. Proceed with the assessment, because refusing a client violates the principle of Competent Caring for the Well-Being of Persons.",
      "B. Proceed with the assessment, but ensure another psychometrician signs the psychological report to maintain accountability.",
      "C. Proceed with the assessment, provided the psychometrician strictly uses objective, computer-scored tests to eliminate human bias.",
      "D. None of the above"
    ],
    correctIndex: 3,
    explanation: "The PAP Code of Ethics explicitly directs psychology practitioners to refrain from entering into a multiple relationship if it could reasonably be expected to impair objectivity, competence, or effectiveness. Testing a close family friend's child violates this boundary, risking exploitation or harm. The professional must decline the request and refer the client to another qualified practitioner. Thus, 'None of the above' is the correct choice, as all listed actions improperly suggest proceeding with the assessment.",
    source: "ethics",
    difficulty: "medium"
  },
  {
    category: "Clinical Practice — PAP Code of Ethics",
    vignette: "A school guidance counselor requests the testing records of a 14-year-old student who recently underwent a comprehensive psychological evaluation at your clinic. The student's parents have provided written consent to share the evaluation with the school. The counselor specifically asks for the raw scores and the scaled scores of the test protocols to put in the student's permanent academic file. Based on the PAP Code of Ethics regarding the Release of Test Data, how should you respond?",
    options: [
      "A. Decline the request to release raw and scaled scores, as the ethics code prohibits releasing test data in this specific form.",
      "B. Provide the school with a written report containing interpretations and recommendations using non-technical language.",
      "C. Ensure that the released interpretations are only used by the persons explicitly agreed upon by the referral sources.",
      "D. More than one of the above"
    ],
    correctIndex: 3,
    explanation: "All three statements (A, B, and C) are in direct accordance with the PAP Code of Ethics regarding test security, release of test data, and explaining assessment results. Practitioners must not release raw and scaled scores, must use non-technical language when explaining results to teachers or parents, and must safeguard against misuse. Therefore, 'More than one of the above' is the correct answer.",
    source: "ethics",
    difficulty: "hard"
  },
  {
    category: "Clinical Practice — PAP Code of Ethics",
    vignette: "During a routine intake interview and testing session, a 16-year-old client discloses that they are actively being physically abused by an older relative at home. They beg the psychometrician not to tell anyone, fearing severe retaliation. Under the PAP Code of Ethics and Philippine Law (e.g., RA 7610 Child Abuse), which of the following is considered an ethically and legally sound course of action?",
    options: [
      "A. Maintain absolute confidentiality, as the principle of Respect for the Dignity of Persons dictates that the client's explicit request for privacy overrides all other concerns.",
      "B. Discuss the limits of confidentiality with the client, explaining that the law mandates the reporting of ongoing child abuse to appropriate authorities.",
      "C. The practitioner should have already explained the limitations of confidentiality to the minor prior to the assessment and obtained an assent form.",
      "D. More than one of the above"
    ],
    correctIndex: 3,
    explanation: "Options B and C represent correct ethical compliance. Limits of confidentiality must be discussed upfront (using an assent form for minors), and statutory laws like RA 7610 mandate the reporting of child abuse, which is a recognized exception to confidentiality. Option A is incorrect because confidentiality is not absolute when harm to vulnerable individuals or legal mandates are involved. Thus, 'More than one of the above' is the correct choice.",
    source: "ethics",
    difficulty: "hard"
  },
  {
    category: "Psychological Assessment — Reliability",
    vignette: "A corporate HR department wants to assess the internal consistency of their newly developed 50-item Employee Integrity Scale. The items are scored on a continuous Likert scale from 1 (Strongly Disagree) to 5 (Strongly Agree). The psychometrician needs to report an index of reliability. Which of the following methods are statistically appropriate to use based on the test's structure?",
    options: [
      "A. Cronbach’s Alpha (α), because it is widely used for tests with items scored on a continuous scale.",
      "B. McDonald’s Omega (ω), because it can handle complex factor structures to assess how well items consistently measure a single construct.",
      "C. Kuder-Richardson Formula 20 (KR-20), because it evaluates the internal consistency of Likert-scale items.",
      "D. More than one of the above"
    ],
    correctIndex: 3,
    explanation: "Both Cronbach’s Alpha and McDonald’s Omega are highly appropriate for evaluating the internal consistency of Likert-scale (continuous) items. KR-20 is exclusively used for dichotomously scored items (e.g., True/False) and is therefore inappropriate here. Thus, 'More than one of the above' is the correct choice.",
    source: "assessment",
    difficulty: "medium"
  },
  {
    category: "Psychological Assessment — Validity",
    vignette: "A clinical psychologist is developing a new brief screening questionnaire for Generalized Anxiety Disorder. To establish its construct validity, she correlates patient scores on her new tool with their scores on an older, well-established anxiety inventory, expecting a high correlation. She also correlates the scores with a measure of interpersonal extraversion, predicting a low correlation. According to the Multi-trait Multi-method Matrix (MTMM) principles, what is the psychologist demonstrating?",
    options: [
      "A. Convergent Validity, by showing the new test correlates highly with an established test measuring the same construct.",
      "B. Discriminant Validity, by showing the new test has little relationship with a conceptually unrelated variable.",
      "C. Evidence of Construct Validity, as both correlations support the theoretical framework of what the test is supposed to measure.",
      "D. More than one of the above"
    ],
    correctIndex: 3,
    explanation: "The scenario describes the psychologist demonstrating both Convergent Validity (expected high correlation with a similar established test) and Discriminant Validity (expected low correlation with an unrelated trait like extraversion). Since both are direct evidences of Construct Validity, all options A, B, and C are correct statements. Thus, 'More than one of the above' is the best answer.",
    source: "assessment",
    difficulty: "hard"
  },
  {
    category: "Psychological Assessment — Inferential Statistics",
    vignette: "A psychometrician is tasked with determining if there is a significant difference in the performance ratings of employees who underwent three different, independent training programs. The performance rating data collected is strictly ordinal, and the sample size is small resulting in heterogenous variances. Based on the rules of inferential statistics, which of the following statements applies?",
    options: [
      "A. A nonparametric test must be used because the data is ordinal and the assumptions for parametric tests are violated.",
      "B. The Kruskal-Wallis Test is the appropriate statistical tool since it compares distributions of three or more independent, non-normally distributed groups.",
      "C. The parametric One-Way ANOVA cannot be used because it assumes a normal distribution, homogenous variance, and interval/ratio data.",
      "D. More than one of the above"
    ],
    correctIndex: 3,
    explanation: "All statements A, B, and C are entirely correct. The data violates the core assumptions of parametric tests (needs normal distribution, interval/ratio data, equal variance), requiring a nonparametric alternative. For comparing three or more independent groups under these conditions, the Kruskal-Wallis Test is the exact equivalent to a One-Way ANOVA.",
    source: "assessment",
    difficulty: "hard"
  },
  {
    category: "Psychological Assessment — Inferential Statistics",
    vignette: "A researcher aims to determine if an individual's biological sex (Male/Female) is independent of their chosen political party affiliation (Party A / Party B / Party C). The data is composed purely of frequencies of categorical variables. Which of the following tests is strictly the most appropriate to assess this association?",
    options: [
      "A. Independent Samples T-Test, since there are independent categorical groups.",
      "B. Two-Way ANOVA, to measure the interaction effect between the two factors.",
      "C. Pearson's Product-Moment Correlation, to see the direct association between the categories.",
      "D. None of the above"
    ],
    correctIndex: 3,
    explanation: "The correct statistical tool is the Chi-Squared Test, which is the most common test for categorical data used to assess the association or independence between two categorical variables (e.g., gender and political party). Since this is not listed, 'None of the above' is the correct answer.",
    source: "assessment",
    difficulty: "medium"
  },
  {
    category: "Developmental Psychology — Early Childhood",
    vignette: "A mother approaches you for advice. Her 4-year-old child insists on pouring his own milk every morning, frequently spilling it and making a mess. To support healthy psychosocial development according to Erikson (Initiative vs. Guilt), which of the following actions is technically a valid supportive parenting technique?",
    options: [
      "A. Gently guide the child's hand while pouring, to ensure success and build confidence.",
      "B. Allow the child to pour independently and let him help wipe the spill, reinforcing autonomy and initiative.",
      "C. Provide a smaller, child-friendly pitcher to minimize potential spills while still allowing the child to act.",
      "D. More than one of the above"
    ],
    correctIndex: 3,
    explanation: "While Option B is excellent for reinforcing initiative and Option C alters the environment to afford success, Option A also provides scaffolding (Vygotsky). Since multiple answers represent developmentally appropriate, valid supportive responses that satisfy psychosocial crises, 'More than one of the above' is the best choice.",
    source: "dev",
    difficulty: "hard"
  },
  {
    category: "I/O Psychology — Employee Retention",
    vignette: "A local BPO firm in Cebu is experiencing high turnover rates among customer service agents within their first three months of employment. The HR team brainstorms several strategies. Which of the following is considered a correct industrial psychology strategy to mitigate early attrition?",
    options: [
      "A. Implement a Realistic Job Preview (RJP) during recruitment to align candidate expectations.",
      "B. Conduct stay-interviews during the first 30 days to address early adjustment concerns.",
      "C. Assign a dedicated peer mentor to facilitate socialization and organizational onboarding.",
      "D. More than one of the above"
    ],
    correctIndex: 3,
    explanation: "All three options (RJPs, stay-interviews, and peer mentorship) are empirically supported, highly effective strategies in organizational psychology used to reduce early employee turnover and improve job embeddedness.",
    source: "io",
    difficulty: "medium"
  },
  {
    category: "Psychological Assessment — Test Selection",
    vignette: "A high school guidance counselor wants to administer an assessment to Grade 12 students who are struggling to pick their college degrees. The counselor points to several standardized tests. Which of the following is inherently an appropriate instrument for identifying career trajectories?",
    options: [
      "A. The Strong Interest Inventory (SII)",
      "B. Self-Directed Search (SDS) based on RIASEC",
      "C. The Minnesota Multiphasic Personality Inventory (MMPI-2)",
      "D. More than one of the above"
    ],
    correctIndex: 3,
    explanation: "The Strong Interest Inventory (A) and the Self-Directed Search (B) are both excellent, valid instruments for vocational choice and career counseling. The MMPI-2, however, is a clinical tool for psychopathology. Because there are two correct answers, 'More than one of the above' is the best option.",
    source: "assessment",
    difficulty: "hard"
  },
  {
    category: "Abnormal Psychology — Differential Diagnosis",
    vignette: "A 35-year-old operations manager at a logistics firm presents with a 4-week history of feeling highly irritable, sleeping only 3 hours a night without feeling fatigued, talking rapidly, and making impulsive, risky investments. He has no history of any major depressive episodes. Which of the following is the BEST diagnosis?",
    options: [
      "A. Persistent Depressive Disorder (Dysthymia)",
      "B. Bipolar II Disorder",
      "C. Cyclothymic Disorder",
      "D. None of the above"
    ],
    correctIndex: 3,
    explanation: "The symptom profile describes a classic manic episode (elevated/irritable mood, decreased need for sleep, pressured speech, impulsivity lasting at least 1 week). A manic episode automatically qualifies for a diagnosis of Bipolar I Disorder. Since Bipolar I is not listed (Bipolar II requires hypomania and MDD; Cyclothymia requires alternating mild symptoms), 'None of the above' is the correct answer.",
    source: "dsm5",
    difficulty: "hard"
  },
  {
    category: "DSM-5 — Depressive Disorders (Hard Differential)",
    vignette: "A 23-year-old corporate worker presents for an assessment, reporting a \"constant dark cloud\" over her life. She explains that since breaking up with her partner of three years four months ago, she has felt deeply sad, has had difficulty falling asleep most nights, and feels a lack of energy during her weekends. However, she notes that she still manages to perform exceptionally well at her new job, has not missed any deadlines, and continues to eat normally and hang out with her friends every Friday night. She denies any suicidal ideation, feelings of worthlessness, or psychomotor changes. Based on the DSM-5 diagnostic criteria, what is the most appropriate initial diagnostic conclusion?",
    options: [
      "No diagnosis; the criteria for a mental disorder abnormality are not met",
      "Adjustment Disorder with Depressed Mood",
      "Major Depressive Disorder, Mild severity with atypical features",
      "Persistent Depressive Disorder (Dysthymia)"
    ],
    correctIndex: 0,
    explanation: "The correct conclusion is 'No diagnosis'. While the individual reports subjective sadness and minor sleep/energy fluctuations after a breakup, she continues to function exceptionally well at work, eats normally, and maintains robust social relationships. Under DSM-5, a mental disorder requires clinically significant distress or impairment in social, occupational, or other important areas of functioning. Since her functional impairment is absent, she does not meet the basic threshold for a clinical diagnosis. This reflects normal grief/sadness rather than pathology.",
    source: "dsm5",
    difficulty: "hard"
  },
  {
    category: "Psychopharmacology — Depressive Disorders",
    vignette: "A 28-year-old female presents with a 6-month history of depressed mood, anhedonia, hypersomnia, and feelings of worthlessness. She has no history of manic or hypomanic episodes. She is diagnosed with Major Depressive Disorder (MDD). What is the FDA-approved first-line pharmacological treatment?",
    options: [
      "Escitalopram (SSRI)",
      "Amitriptyline (TCA)",
      "Phenelzine (MAOI)",
      "Lithium Carbonate"
    ],
    correctIndex: 0,
    explanation: "Selective Serotonin Reuptake Inhibitors (SSRIs) like Escitalopram, Sertraline, and Fluoxetine are the gold-standard, FDA-approved first-line pharmacological treatments for Major Depressive Disorder due to their favorable safety profile and tolerability compared to TCAs and MAOIs.",
    source: "pharma",
    difficulty: "easy"
  },
  {
    category: "Psychopharmacology — Bipolar Spectrum",
    vignette: "A 34-year-old male is admitted during an acute manic episode presenting with grandiose ideas, pressured speech, and decreased need for sleep. The psychiatric consultant intends to initiate a classic, FDA-approved mood stabilizer that requires close serum level monitoring to avoid toxicity.",
    options: [
      "Lithium Carbonate",
      "Haloperidol",
      "Lamotrigine",
      "Sertraline"
    ],
    correctIndex: 0,
    explanation: "Lithium remains the classic first-line FDA-approved mood stabilizer for acute mania and maintenance therapy in Bipolar I Disorder. It requires strict therapeutic drug monitoring (target: 0.6 to 1.2 mEq/L) because of its narrow therapeutic index.",
    source: "pharma",
    difficulty: "easy"
  },
  {
    category: "Psychopharmacology — Schizophrenia",
    vignette: "A 22-year-old male is diagnosed with Schizophrenia after experiencing 7 months of auditory hallucinations, persecutory delusions, and social withdrawal. What represents the standard first-line antipsychotic class used today?",
    options: [
      "Second-Generation (Atypical) Antipsychotics (e.g., Risperidone, Aripiprazole)",
      "First-Generation (Typical) Antipsychotics (e.g., Chlorpromazine)",
      "Monoamine Oxidase Inhibitors (MAOIs)",
      "High-dose Benzodiazepines"
    ],
    correctIndex: 0,
    explanation: "Second-Generation (Atypical) Antipsychotics such as Risperidone, Olanzapine, and Aripiprazole are preferred as first-line treatments for Schizophrenia. They target both positive and negative symptoms while presenting a significantly lower risk of Extrapyramidal Symptoms (EPS) compared to first-generation neuroleptics.",
    source: "pharma",
    difficulty: "easy"
  },
  {
    category: "Psychopharmacology — ADHD",
    vignette: "An 8-year-old boy is diagnosed with ADHD, Combined Type. He exhibits substantial inattention and hyperactivity in school. What is the FDA-approved, first-line psychostimulant drug class most commonly selected?",
    options: [
      "Methylphenidate (e.g., Ritalin)",
      "Atomoxetine (Strattera)",
      "Clonidine",
      "Imipramine"
    ],
    correctIndex: 0,
    explanation: "Stimulants, particularly Methylphenidate and Ampheteramine derivatives, are FDA-approved first-line pharmacological agents for ADHD, with therapeutic response rates exceeding 70-80%. Atomoxetine is an approved non-stimulant second-line alternative.",
    source: "pharma",
    difficulty: "easy"
  },
  {
    category: "Psychopharmacology — Anxiety Disorders",
    vignette: "A 45-year-old bank manager describes persistent, excessive anxiety about daily activities, financial security, and health for over 8 months, accompanied by muscle tension and restlessness. For long-term pharmacological management of this Generalized Anxiety Disorder (GAD), which is the first-line treatment?",
    options: [
      "Escitalopram or Duloxetine (SSRI/SNRI)",
      "Alprazolam (Benzodiazepine) as monotherapy",
      "Propranolol (Beta-blocker)",
      "Lithium Carbonate"
    ],
    correctIndex: 0,
    explanation: "SSRIs (like Escitalopram) and SNRIs (like Duloxetine or Venlafaxine) are FDA-approved, non-addictive first-line pharmacological treatments for Generalized Anxiety Disorder (GAD). Benzodiazepines like Alprazolam are reserved for short-term relief due to dependence risk.",
    source: "pharma",
    difficulty: "easy"
  },
  {
    category: "Psychopharmacology — Obsessive-Compulsive Disorder",
    vignette: "A patient diagnosed with Obsessive-Compulsive Disorder (OCD) continues to experience distressing symmetry obsessions and counting compulsions despite undergoing Cognitive Behavioral Therapy. Which pharmacological strategy represents the first-line pharmacotherapeutic approach?",
    options: [
      "High-dose SSRI (e.g., Sertraline or Fluoxetine)",
      "Low-dose Benzodiazepines",
      "Valproic Acid",
      "Prazosin"
    ],
    correctIndex: 0,
    explanation: "FDA-approved first-line treatment for OCD consists of Selective Serotonin Reuptake Inhibitors (SSRIs) such as Sertraline, Fluoxetine, or Fluvoxamine, often initiated and maintained at significantly higher doses than those used for depression.",
    source: "pharma",
    difficulty: "medium"
  },
  {
    category: "Psychological Assessment — Cognitive Scales",
    vignette: "An assessment psychologist is evaluating a 9-year-old child for suspected intellectual giftedness. Which Wechsler intelligence scale is specifically designed as an individual test for children aged 6 to 16 years?",
    options: [
      "WISC-V (Wechsler Intelligence Scale for Children)",
      "WAIS-IV (Wechsler Adult Intelligence Scale)",
      "WPPSI-IV (Wechsler Preschool and Primary Scale)",
      "SB-5"
    ],
    correctIndex: 0,
    explanation: "The WISC (currently in its 5th edition, WISC-V) is Wechsler's gold-standard individual intelligence test designed for children aged 6:0 to 16:11. The WAIS is for adults (16-90), and the WPPSI is for younger children (2:6 to 7:7).",
    source: "assessment",
    testId: "wisc-v"
  },
  {
    category: "Psychological Assessment — Personality Inventories",
    vignette: "A psychometrician administers a legendary objective personality inventory consisting of 567 True/False items to screen for clinical psychopathology and assess personality structure. The report highlights elevation on Scale 2 (Depression) and Scale 7 (Psychasthenia). Which test was administered?",
    options: [
      "Minnesota Multiphasic Personality Inventory - 2 (MMPI-2)",
      "Million Clinical Multiaxial Inventory (MCMI-IV)",
      "Thematic Apperception Test (TAT)",
      "16 Personality Factors (16PF)"
    ],
    correctIndex: 0,
    explanation: "The MMPI-2 contains 567 authentic true-false test items and forms the backbone of clinical psychopathology screening. It utilizes basic clinical scales numbered 1 to 0 (including Scale 2 for Depression and Scale 7 for Psychasthenia/anxiety).",
    source: "assessment",
    testId: "mmpi-2"
  },
  {
    category: "Psychological Assessment — Projective Techniques",
    vignette: "During a psychological battery, a licensed psychologist displays a series of ambiguous black-and-white cards depicting human situations and instructs the client to create a dramatic story with a beginning, middle, and end. Which projective test is being utilized?",
    options: [
      "Thematic Apperception Test (TAT)",
      "Rorschach Inkblot Method",
      "Bentton Visual Retention Test (BVRT)",
      "House-Tree-Person (HTP)"
    ],
    correctIndex: 0,
    explanation: "The Thematic Apperception Test (TAT), developed by Henry Murray and Christiana Morgan, is a projective test consisting of 31 cards representing interpersonal situations. Clients are asked to construct narratives about what is happening, what led up to it, and the resolution.",
    source: "assessment",
    testId: "tat"
  },
  {
    category: "Psychological Assessment — Mood Scales",
    vignette: "A clinician wants to track a depressed patient's symptom severity weekly. She selects a brief, 21-item self-report inventory that takes only 5-10 minutes to complete. The items are scored 0 to 3, with a total score range of 0 to 63. Which test is this?",
    options: [
      "Beck Depression Inventory-II (BDI-II)",
      "Hamilton Depression Rating Scale (HAM-D)",
      "Zung Self-Rating Depression Scale",
      "MMPI-2 Content Scale"
    ],
    correctIndex: 0,
    explanation: "The Beck Depression Inventory-II (BDI-II) consists of 21 multiple-choice items scored 0-3 based on subjective reports of depressive symptoms matching DSM-4 diagnostic thresholds over the preceding two weeks.",
    source: "assessment",
    testId: "beck-depression-ii"
  },
  {
    category: "DSM-5 — Neurodevelopmental Disorders",
    vignette: "A 4-year-old child is brought to a neurodevelopmental clinic. The parents report a severe deficit in reciprocal social-communication, a total absence of eye contact, a lack of joint attention, and repetitive hand-flapping behaviors. No imaginative play is observed. What diagnostic category encompasses these symptoms?",
    options: [
      "Autism Spectrum Disorder (ASD)",
      "Social Communication Disorder",
      "Attention-Deficit/Hyperactivity Disorder (ADHD)",
      "Reactive Attachment Disorder"
    ],
    correctIndex: 0,
    explanation: "Under the DSM-5, symptoms of persistent deficits in social communication and social interaction, alongside restricted, repetitive patterns of behavior, interests, or activities (such as hand-flapping), are unified under Autism Spectrum Disorder.",
    source: "dsm5"
  },
  {
    category: "DSM-5 — Trauma and Stressor-Related Disorders",
    vignette: "A 25-year-old veteran returned from deployment 5 months ago. She reports persistent intrusive combat flashbacks, hyperarousal, avoidance of crowded places, sleep onset insomnia, and emotional numbing. These symptoms are causing severe occupational distress. What is the most accurate diagnosis?",
    options: [
      "Post-Traumatic Stress Disorder (PTSD)",
      "Acute Stress Disorder",
      "Adjustment Disorder",
      "Generalized Anxiety Disorder"
    ],
    correctIndex: 0,
    explanation: "PTSD is diagnosed when symptoms of intrusion, avoidance, cognitive/mood alterations, and hyperarousal persist for MORE than one month following exposure to a qualifying traumatic event.",
    source: "dsm5"
  },
  {
    category: "Developmental Psychology — Erickson's Stages",
    vignette: "A 16-year-old high school student in Manila is highly preoccupied with finding her career path, experimenting with clothing and peer groups, and exploring personal values, occasionally clashing with her parents. According to Erik Erikson, which psychosocial crisis is she currently negotiating?",
    options: [
      "Identity vs. Role Confusion",
      "Industry vs. Inferiority",
      "Intimacy vs. Isolation",
      "Autonomy vs. Shame & Doubt"
    ],
    correctIndex: 0,
    explanation: "Erik Erikson's stage corresponding to adolescence (typically ages 12 to 18) is Identity vs. Role Confusion, where youngsters search for a sense of self, personal values, and future direction in society.",
    source: "dev"
  },
  {
    category: "Developmental Psychology — Piaget's Stages",
    vignette: "During a developmental task, a psychologist pours equal amounts of water into two identical short glasses. She then pours one glass into a tall, thin beaker. An 8-year-old girl correctly states that both containers still hold the exact same volume of liquid. Under Piagetian theory, this demonstrates the acquisition of:",
    options: [
      "Conservation",
      "Object Permanence",
      "Egocentrism",
      "Abstract Hypothesis Testing"
    ],
    correctIndex: 0,
    explanation: "Conservation is the understanding that certain physical traits of objects (such as volume, mass, or number) remain identical despite variations in their physical shape or container. This is typically acquired during Piaget's Concrete Operational Stage (ages 7 to 11).",
    source: "dev"
  },
  {
    category: "I/O Psychology — Motivation Theories",
    vignette: "In a BPO office in Cebu, the HR team notices that while increasing commission payouts boosts call volume temporarily, keeping the workspace secure, clean, and providing stable medical benefits is essential for stopping high employee turnover. Which dual-factor theory separates hygiene factors from true motivators?",
    options: [
      "Herzberg's Two-Factor Theory",
      "Maslow's Hierarchy of Needs",
      "Vroom's Expectancy Theory",
      "Locke's Goal-Setting Theory"
    ],
    correctIndex: 0,
    explanation: "Frederick Herzberg's Two-Factor (Motivator-Hygiene) Theory proposes that workspace factors like safety, salary, and company policy are 'Hygiene Factors'—essential to prevent dissatisfaction but incapable of driving long-term positive motivation, which requires 'Motivators' like alignment, achievement, and recognition.",
    source: "io"
  },
  {
    category: "I/O Psychology — Selection Metrics",
    vignette: "An organizational psychologist wants to ensure that a pre-employment cognitive test used for selecting call center operators truly predicts their on-the-job KPI performance (e.g., ticket resolution speed and positive customer ratings) over their first six months. This HR manager is seeking to establish:",
    options: [
      "Criterion-related (Predictive) Validity",
      "Internal Consistency Reliability",
      "Content Validity",
      "Test-retest Coefficient of Stability"
    ],
    correctIndex: 0,
    explanation: "Criterion-related validity (specifically Predictive Validity) is the standard method for verifying that score metrics obtained on selection instruments accurately correlate with subsequent observable job performance measures (the criteria).",
    source: "io"
  },
  {
    category: "Psychological Assessment — HR Screening",
    vignette: "A HR manager at a high-stress tech firm wants a tool to screen prospective managers for emotional resilience and potential burnout under pressure. She asks you to recommend a test. To maximize utility and efficiency, which approach is best?",
    options: [
      "A. Administer a comprehensive projective battery (e.g., Rorschach and TAT) to uncover deep-seated defense mechanisms.",
      "B. Use a well-validated, group-administered objective personality inventory with dedicated stress/coping scales.",
      "C. Conduct structured clinical interviews lasting 2 hours for every applicant to ensure diagnostic precision.",
      "D. Administer a brief, unstandardized self-report checklist created by the company’s internal team."
    ],
    correctIndex: 1,
    explanation: "Objective personality inventories (e.g., NEO-PI-R or MMPI-3) offer standardized administration, group efficiency, objective scoring, and strong psychometric support for screening purposes. Projective tests and long interviews are too time-consuming and lack the group-level utility needed for HR screening. An unstandardized checklist lacks the required reliability and validity.",
    source: "assessment",
    difficulty: "medium"
  },
  {
    category: "Psychological Assessment — Psychometrics",
    vignette: "An industrial psychologist analyzes the results of a new mechanical aptitude test given to experienced engineers. The resulting distribution of scores shows a severe negative skew. What is the most accurate psychometric interpretation of this finding?",
    options: [
      "A. The test is too difficult for this specific group of test-takers.",
      "B. The test possesses a ceiling effect, meaning it lacks adequate item difficulty for this sample.",
      "C. The test possesses a floor effect, meaning the items are far too complex.",
      "D. The test-takers guessed randomly, causing the scores to cluster at the higher end."
    ],
    correctIndex: 1,
    explanation: "A negative skew means most scores are clustered at the high end, indicating the test was relatively easy for this specialized sample. This represents a ceiling effect, where the test fails to discriminate among high-ability individuals because it lacks sufficiently difficult items. A floor effect is associated with a positive skew.",
    source: "assessment",
    difficulty: "hard"
  },
  {
    category: "Psychological Assessment — Ethics & Standardization",
    vignette: "A school psychologist is asked to re-evaluate a child for a learning disability. The school district only owns the manuals and materials for an intelligence test's 3rd edition, though the 4th edition was released two years ago. What is the most ethically sound action?",
    options: [
      "A. Use the 3rd edition but apply a statistical correction formula to account for the Flynn effect.",
      "B. Use the 3rd edition but include a prominent disclaimer in the report stating that the results may be invalid.",
      "C. Decline to use the 3rd edition and advocate for purchasing or borrowing the current edition before testing.",
      "D. Administer an informal, non-standardized classroom assessment instead of a standardized IQ test."
    ],
    correctIndex: 2,
    explanation: "Psychological ethics codes dictate that psychologists should not base assessment decisions or recommendations on outdated test instruments when current editions are available. Disclaimers or ad-hoc adjustments do not rectify the ethical violation of using obsolete tools when standardized normative data has shifted.",
    source: "assessment",
    difficulty: "hard"
  },
  {
    category: "Psychological Assessment — Reliability Analysis",
    vignette: "A researcher is developing a new instrument to measure state anxiety (fluctuating, situational anxiety) rather than trait anxiety (enduring personality style). Which measure of reliability would be least appropriate to prioritize during development?",
    options: [
      "A. Test-retest reliability",
      "B. Internal consistency",
      "C. Alternate-forms reliability",
      "D. Inter-scorer reliability"
    ],
    correctIndex: 0,
    explanation: "Test-retest reliability measures the stability of scores over time. Because 'state' anxiety is expected to fluctuate rapidly based on environmental changes, a low test-retest coefficient would reflect true behavioral fluctuation rather than poor test construction. Therefore, it is the least appropriate index to prioritize for a state measure.",
    source: "assessment",
    difficulty: "hard"
  },
  {
    category: "Psychological Assessment — Validity Forms",
    vignette: "A psychometrician drafts a test designed to measure clinical depression. She reviews the items to ensure they map perfectly onto the GAD or depressive diagnostic criteria, covering affective, cognitive, and somatic symptoms. However, a client looks at the test and says, 'These questions just look like a general mood quiz.' The test has high ________ but seemingly low ________.",
    options: [
      "A. Criterion validity; Content validity",
      "B. Content validity; Face validity",
      "C. Face validity; Construct validity",
      "D. Construct validity; Criterion validity"
    ],
    correctIndex: 1,
    explanation: "Content validity is an objective evaluation of how well the test items sample the GAD or depressive symptom domain (systematically mapping onto diagnostic criteria). Face validity is the superficial appearance of what the test measures from the perspective of the test-taker. The test is psychometrically sound (high content) but lacks immediate face appeal to the client.",
    source: "assessment",
    difficulty: "medium"
  },
  {
    category: "Psychological Assessment — Test Administration",
    vignette: "During the administration of an individual intelligence test, a 10-year-old examinee becomes visibly distressed, begins crying, and states, 'I can't do this, I'm too stupid.' How should the examiner handle this variable to preserve both standardization and test-taker welfare?",
    options: [
      "A. Stop the test immediately, score only completed items, and extrapolate the final IQ score.",
      "B. Comfort the child, pause the timing of non-timed subtests, offer brief encouragement, and resume when calm.",
      "C. Tell the child that if they do not finish, they will fail the exam and disappoint their parents.",
      "D. Give the child the exact answers to the missed items to rebuild confidence before moving forward."
    ],
    correctIndex: 1,
    explanation: "Standard testing procedures allow examiners to manage rapport and anxiety through non-specific encouragement (e.g., 'Just try your best') and brief breaks between subtests, provided it doesn't violate specific subtest timing rules. Giving answers destroys standardization; stopping completely is premature without attempting to restore rapport.",
    source: "assessment",
    difficulty: "medium"
  },
  {
    category: "Psychological Assessment — Score Interpretation",
    vignette: "A clinician calculates the Standard Error of Measurement (SEM) for a personality scale and finds it to be quite large. When interpreting an individual client's score, what does this large SEM imply?",
    options: [
      "A. The client's observed score is highly accurate and close to their true score.",
      "B. The band of error around the observed score is wide, meaning we have less confidence in the exact score.",
      "C. The test possesses high internal consistency reliability.",
      "D. The test is highly valid for predicting behavioral outcomes."
    ],
    correctIndex: 1,
    explanation: "In CTT, SEM is inversely related to reliability. A large SEM means there is a significant amount of error variance. Consequently, the confidence interval around the client's observed score will be wide, indicating less precision regarding their true score.",
    source: "assessment",
    difficulty: "medium"
  },
  {
    category: "Psychological Assessment — Modern Testing Methods",
    vignette: "An educational psychologist evaluates a child from an underrepresented cultural background who has had minimal formal schooling. Instead of a traditional static IQ test, the psychologist uses a 'test-teach-retest' method to see how quickly the child picks up new skills. This methodology is known as:",
    options: [
      "A. Therapeutic Assessment",
      "B. Collaborative Assessment",
      "C. Dynamic Assessment",
      "D. Behavioral Assessment"
    ],
    correctIndex: 2,
    explanation: "Dynamic assessment explicitly utilizes a test-intervention-retest paradigm to evaluate an individual's learning potential or zone of proximal development, rather than just their static, current store of knowledge. This is highly useful for individuals with non-traditional educational backgrounds.",
    source: "assessment",
    difficulty: "medium"
  },
  {
    category: "Psychological Assessment — Item Analysis",
    vignette: "During item analysis of a 100-item multiple-choice exam, an item is found to have a discrimination index (d) of -0.25. What is the best course of action for the test developer?",
    options: [
      "A. Retain the item as it is, because it effectively differentiates between high and low performers.",
      "B. Modify the item instructions but keep the option keys identical.",
      "C. Eliminate or completely rewrite the item, as it indicates lower-performing students are getting it right more often than high-performing students.",
      "D. Increase the number of distractors to make it harder."
    ],
    correctIndex: 2,
    explanation: "A negative discrimination index means that individuals who performed poorly on the test as a whole answered this specific item correctly more often than those who performed well. This indicates a flawed, confusing, or miskeyed item that must be removed or heavily revised.",
    source: "assessment",
    difficulty: "medium"
  },
  {
    category: "Psychological Assessment — Standard Scores",
    vignette: "A student scores a Z-score of +1.5 on a Statistics midterm and a T-score of 60 on a Research Methods midterm. Assuming both distributions are normal, on which exam did the student perform better?",
    options: [
      "A. Statistics",
      "B. Research Methods",
      "C. The performance is identical on both exams.",
      "D. It is impossible to compare these scores without knowing the raw means."
    ],
    correctIndex: 0,
    explanation: "To compare, convert both to the same metric. A Z-score of +1.5 equates to a T-score of 65 (T=10Z+50). Alternatively, a T-score of 60 equates to a Z-score of +1.0. Therefore, the student performed better in Statistics (Z=+1.5) than in Research Methods (Z=+1.0).",
    source: "assessment",
    difficulty: "medium"
  },
  {
    category: "Psychological Assessment — Test Utility",
    vignette: "A clinical psychologist uses a screening tool for a very rare dissociative disorder (prevalence rate of 0.01% in the general population). The test has a reported accuracy rate of 95%. If administered randomly to the public, what is the primary psychometric concern?",
    options: [
      "A. Excessive false negatives",
      "B. A high rate of false positives due to the low base rate of the disorder",
      "C. Depressed internal consistency",
      "D. Restriction of range in item difficulty"
    ],
    correctIndex: 1,
    explanation: "When a condition has a very low base rate (prevalence) in a population, even a highly accurate test will generate a massive number of false positives relative to true positives. This is a fundamental principle of diagnostic utility and conditional probability.",
    source: "assessment",
    difficulty: "hard"
  },
  {
    category: "DSM-5-TR — Anxiety Disorders",
    vignette: "A 24-year-old male presents with persistent worry about his health, career, and relationships. He reports that he has felt constantly 'on edge,' irritable, and has experienced significant muscle tension and sleep disturbances for the past 5 months. He notes that while it is uncomfortable, he has not missed any days of work, and his social life remains active. What is the most accurate diagnostic conclusion?",
    options: [
      "A. Generalized Anxiety Disorder",
      "B. Adjustment Disorder with Anxiety",
      "C. No Diagnosis / Normal Anxiety",
      "D. Other Specified Anxiety Disorder"
    ],
    correctIndex: 2,
    explanation: "Generalized Anxiety Disorder (GAD) requires the presence of excessive anxiety and worry occurring more days than not for at least 6 months. Because the duration is only 5 months and the symptoms have not caused significant functional impairment in his occupational or social life, the presentation is best categorized as normal anxiety or a subclinical presentation rather than a full psychological disorder.",
    source: "dsm5",
    difficulty: "easy"
  },
  {
    category: "DSM-5-TR — Anxiety Disorders",
    vignette: "A 29-year-old female experiences sudden, unexpected episodes during which her heart races, she feels short of breath, trembles, and fears she is losing control. These episodes peak within 10 minutes. Over the last 6 weeks, she has changed her daily routine significantly, avoiding driving and public spaces because she is terrified of having another attack where help might not be available. What is the most likely diagnosis?",
    options: [
      "A. Panic Disorder",
      "B. Agoraphobia",
      "C. Specific Phobia (Situational)",
      "D. Social Anxiety Disorder"
    ],
    correctIndex: 0,
    explanation: "Panic Disorder requires recurrent, unexpected panic attacks followed by at least 1 month of persistent concern about additional attacks or a significant maladaptive change in behavior related to the attacks. Although she avoids public spaces and driving, this avoidance is specifically driven by the fear of the panic attacks themselves, making Panic Disorder the primary diagnosis.",
    source: "dsm5",
    difficulty: "easy"
  },
  {
    category: "DSM-5-TR — Trauma and Stressor-Related Disorders",
    vignette: "A 34-year-old male was involved in a severe car accident 3 weeks ago in which his passenger was seriously injured. Since then, he experiences intrusive memories of the crash, avoids the intersection where it occurred, feels constantly hypervigilant, and suffers from regular nightmares. His symptoms have caused major distress and impairment at work. What is the most accurate diagnosis?",
    options: [
      "A. Posttraumatic Stress Disorder (PTSD)",
      "B. Acute Stress Disorder (ASD)",
      "C. Adjustment Disorder with Depressed Mood",
      "D. Brief Psychotic Disorder"
    ],
    correctIndex: 1,
    explanation: "The time frame is the defining factor here. Symptoms began 3 weeks ago (within the 3-day to 1-month window following the trauma). If these identical symptoms persist beyond 1 month, the diagnosis would shift to PTSD.",
    source: "dsm5",
    difficulty: "medium"
  },
  {
    category: "DSM-5-TR — Depressive Disorders",
    vignette: "A 45-year-old high school teacher presents with a 3-week history of persistently depressed mood, anhedonia, a 10-lb unintentional weight loss, insomnia, and profound fatigue. She reports that 2 months ago, her mother passed away after a long illness. She feels an intense emptiness and longs for her mother, but also states, 'I am a complete failure as a daughter, and I don't deserve to live.' What is the most appropriate diagnosis?",
    options: [
      "A. Normal Bereavement",
      "B. Major Depressive Disorder (MDD)",
      "C. Prolonged Grief Disorder",
      "D. Persistent Depressive Disorder (Dysthymia)"
    ],
    correctIndex: 1,
    explanation: "Under DSM-5, bereavement does not exclude a diagnosis of MDD. While grief involves feelings of emptiness and loss tied directly to the deceased, MDD is characterized by a persistent depressed mood, a total inability to anticipate happiness, and feelings of worthlessness/self-loathing. Her statement of being a 'complete failure' and feeling she 'doesn't deserve to live' points to a major depressive episode triggered by bereavement.",
    source: "dsm5",
    difficulty: "medium"
  },
  {
    category: "DSM-5-TR — Anxiety Disorders",
    vignette: "A 19-year-old college student presents to the university clinic because she feels intensely anxious in her seminar classes. She avoids raising her hand or speaking because she is terrified that her classmates will judge her, notice her hands trembling, or think she is incompetent. She has skipped several classes to avoid presentations, severely impacting her grades. She has no issues hanging out with her close group of childhood friends. What is the most appropriate diagnosis?",
    options: [
      "A. Agoraphobia",
      "B. Panic Disorder",
      "C. Social Anxiety Disorder",
      "D. Generalized Anxiety Disorder"
    ],
    correctIndex: 2,
    explanation: "The core fear is negative evaluation, scrutiny, or embarrassment by others in social or performance situations (the seminar class). This fear is situational and distinct from Agoraphobia (where the fear is about trapped/unable to escape) or GAD (which involves widespread, unfocused worry across many life domains).",
    source: "dsm5",
    difficulty: "easy"
  },
  {
    category: "I/O Psychology — Selection Systems",
    vignette: "A multinational tech firm is facing high turnover among software engineers. The HR director wants to implement a new cognitive ability test for selection but is worried about adverse impact. As an I/O consultant, which validation strategy should you recommend to establish the strongest legal and psychometric justification for using this test while minimizing risk?",
    options: [
      "A. Conduct a concurrent validation study using current high-performing engineers to establish a cutoff score.",
      "B. Conduct a predictive validation study by administering the test to applicants, hiring them regardless of scores, and measuring their performance a year later.",
      "C. Utilize synthetic validity by mapping the cognitive demands of the role to a generalized database of IT positions.",
      "D. Conduct a comprehensive job analysis to ensure content validity, then pair the cognitive test with a structured behavioral interview using a compensatory scoring model."
    ],
    correctIndex: 3,
    explanation: "Cognitive ability tests consistently yield high criterion-related validity but are notorious for causing adverse impact. Pair-wise strategies that combine cognitive tests with non-cognitive predictors (like structured interviews) using a compensatory approach optimize predictive power while mitigating adverse impact. Content validity via job analysis provides the foundational legal defense.",
    source: "io",
    difficulty: "hard"
  },
  {
    category: "I/O Psychology — Job Analysis Methods",
    vignette: "A hospital is redesigning its nursing roles due to burnout. The Chief Nursing Officer wants a job analysis method that not only captures the specific tasks performed but also highlights the underlying psychological and physical characteristics required to handle high-stress patient environments. Which method is best suited?",
    options: [
      "A. Functional Job Analysis (FJA)",
      "B. Position Analysis Questionnaire (PAQ)",
      "C. Critical Incident Technique (CIT)",
      "D. Fleishman Job Analysis System (FJAS)"
    ],
    correctIndex: 2,
    explanation: "The Critical Incident Technique (CIT) focuses on specific, highly effective or ineffective behaviors observed in real-world scenarios. For high-stress roles like nursing, CIT excels at identifying the exact behavioral boundaries and psychological coping mechanisms required to handle crises, making it superior for both job redesign and targeted training.",
    source: "io",
    difficulty: "medium"
  },
  {
    category: "I/O Psychology — Adverse Impact",
    vignette: "An organization administers a physical agility test to 200 male applicants and 50 female applicants for a warehouse role. 120 males pass the test, while 20 females pass. The legal compliance team asks you if this selection tool violates the four-fifths (80%) rule. What is your assessment?",
    options: [
      "A. Yes, because the passing rate for females is 40%, which is less than 80%.",
      "B. No, because the selection ratio of females compared to males is exactly 80%.",
      "C. Yes, the test shows evidence of adverse impact because the female selection rate is two-thirds (66.7%) of the male selection rate.",
      "D. No, because the absolute number of males passing is significantly higher, rendering the percentage comparison skewed."
    ],
    correctIndex: 2,
    explanation: "Calculate the selection rates: Males = 120/200=60%. Females = 20/50=40%. To determine adverse impact, divide the selection rate of the protected/minority group by the majority group: 40%/60%=66.7%. Since 66.7% is less than the 80% threshold, evidence of adverse impact exists.",
    source: "io",
    difficulty: "hard"
  },
  {
    category: "I/O Psychology — Performance Management",
    vignette: "During an annual review cycle, a regional sales manager rates a sub-par sales representative highly across all performance dimensions (e.g., teamwork, punctuality, communication) simply because the representative secured a massive, highly visible client account in the first month of the fiscal year. What psychometric error is occurring?",
    options: [
      "A. Recency Effect",
      "B. Leniency Error",
      "C. Halo Effect",
      "D. Proximity Error"
    ],
    correctIndex: 2,
    explanation: "The Halo Effect occurs when an appraiser’s overall evaluation of an individual, or their evaluation on a single highly visible dimension (securing a massive client), biases their ratings across all other unrelated dimensions of performance. Restricting subjective inflation via behavior observation scales is recommended.",
    source: "io",
    difficulty: "easy"
  },
  {
    category: "I/O Psychology — Financial Utility",
    vignette: "A financial institution wants to assess the financial utility of a new structured interviewing process for investment analysts. They have data on the validity coefficient of the interview (r=.40), the base rate of success (.50), and the selection ratio (.20). Which framework should the I/O psychologist use to calculate the exact dollar-value return on investment (ROI) of this selection tool?",
    options: [
      "A. Taylor-Russell Tables",
      "B. Naylor-Shine Model",
      "C. Brogden-Cronbach-Gleser (BCG) Model",
      "D. Lawshe's Content Validity Ratio (CVR)"
    ],
    correctIndex: 2,
    explanation: "The Brogden-Cronbach-Gleser (BCG) model is specifically designed to estimate the financial utility of a selection system in institutional dollar value by factoring in the validity coefficient, service tenure, standard deviation of performance in dollar terms, and the selection ratio.",
    source: "io",
    difficulty: "hard"
  },
  {
    category: "Developmental Psychology — Psychosocial & Attachment",
    vignette: "A 14-month-old infant explores the living room, frequently looking back to ensure her father is still sitting on the couch. When a stranger enters, she runs back to her father, hugs his leg, and gradually warms up to the visitor while staying close to her father. Which Eriksonian psychosocial crisis and resulting core pathology are most relevant if this exploratory balancing act fails?",
    options: [
      "A. Autonomy vs. Shame and Doubt; Compulsion",
      "B. Trust vs. Mistrust; Withdrawal",
      "C. Initiative vs. Guilt; Inhibition",
      "D. None of the above"
    ],
    correctIndex: 1,
    explanation: "The infant is demonstrating secure attachment behavior typical of the Trust vs. Mistrust stage (infancy). According to Erikson's expanded theory, the core pathology resulting from the failure of this stage is Withdrawal. Option A belongs to toddlerhood, and Option C belongs to early childhood.",
    source: "dev",
    difficulty: "easy"
  },
  {
    category: "Developmental Psychology — Childhood Development",
    vignette: "A 4-year-old child insists on dressing himself every morning. Even though he frequently puts his shirt on backward and wears mismatched socks, his mother praises his effort. According to Erikson, this parental response fosters which Prime Adaptive Ego Quality?",
    options: [
      "A. Will",
      "B. Purpose",
      "C. Fidelity",
      "D. Competence"
    ],
    correctIndex: 1,
    explanation: "In early childhood (3 to 6 years), the crisis is Initiative vs. Guilt. The Prime Adaptive Ego Quality that emerges from successfully resolving this stage is Purpose. Will belongs to Autonomy vs. Shame and Doubt (toddlerhood), and Competence belongs to Industry vs. Inferiority (school age).",
    source: "dev",
    difficulty: "easy"
  },
  {
    category: "Developmental Psychology — Middle Childhood",
    vignette: "A school-aged girl is struggling with long division in school. She tells her teacher, 'I'm just stupid, I will never get this, so why even try?' She sits quietly at her desk, staring blankly at her paper without making any attempt to write. This behavior is a manifestation of which core pathology under Erikson's lifespans?",
    options: [
      "A. Inertia",
      "B. Inhibition",
      "C. Exclusivity",
      "D. Repudiation"
    ],
    correctIndex: 0,
    explanation: "The girl is in the Industry vs. Inferiority stage (school age, 6 to 12 years). The core pathology associated with a failure to resolve this stage, characterized by a cessation of effort and passive avoidance of mastery, is Inertia. Inhibition is linked to Initiative vs. Guilt.",
    source: "dev",
    difficulty: "medium"
  },
  {
    category: "Developmental Psychology — Adolescence & Adulthood",
    vignette: "A 24-year-old college graduate changes her career path every six months, alternates between friend groups, and refuses to commit to long-term romantic relationships, stating, 'I don't even know what I want out of life next week.' Which developmental crisis is she actively struggling to resolve?",
    options: [
      "A. Intimacy vs. Isolation",
      "B. Identity vs. Role Confusion",
      "C. Autonomy vs. Shame and Doubt",
      "D. Both A and B"
    ],
    correctIndex: 1,
    explanation: "Although she is chronologically an emerging/young adult, her behavior indicates an ongoing struggle with establishing a stable self-definition, which is the hallmark of Identity vs. Role Confusion. A stable identity is a developmental prerequisite for true intimacy; thus, she is stuck at the identity consolidation level.",
    source: "dev",
    difficulty: "easy"
  },
  {
    category: "Developmental Psychology — Adulthood",
    vignette: "A 45-year-old corporate manager spends his weekends mentoring low-income youth and organizing community workshops. He explains, 'I want to make sure the next generation has the tools to succeed after I'm gone.' This behavior best illustrates which construct?",
    options: [
      "A. Generativity and the ego quality of Care",
      "B. Integrity and the ego quality of Wisdom",
      "C. Industry and the ego quality of Competence",
      "D. None of the above"
    ],
    correctIndex: 0,
    explanation: "The manager is in middle adulthood (40 to 65 years), experiencing Generativity vs. Stagnation. Contributing to the growth of the next generation reflects Generativity, and the resulting Prime Adaptive Ego Quality is Care.",
    source: "dev",
    difficulty: "easy"
  },
  {
    category: "Psychological Ethics — Confidentiality Protocols",
    vignette: "A psychometrician conducting an online intake assessment via video conferencing notes that a client living in a remote province exhibits active suicidal ideation with a specific plan and access to means. The client explicitly begs the psychometrician not to tell anyone, stating that being hospitalized would destroy their remaining sense of autonomy and dignity. Which of the following actions represents the most ethically sound immediate intervention?",
    options: [
      "A. Respect the client's autonomy and right to dignity by agreeing to keep the information confidential while scheduling an emergency follow-up session the next morning.",
      "B. Immediately breach confidentiality by contacting local emergency services and the client's emergency contact, prioritizing Nonmaleficence and Safety over Autonomy.",
      "C. Inform the client that confidentiality must be breached due to imminent risk, collaborate with them to identify a local support person or crisis center, and assist them in making immediate contact while keeping them on the line.",
      "D. Terminate the call immediately to contact the supervising psychologist for consultation before taking any practical action to ensure strict adherence to lines of authority."
    ],
    correctIndex: 2,
    explanation: "While Nonmaleficence (preventing self-harm) is the paramount priority, ethical decision-making requires maximizing client autonomy even during a crisis. Option C balances both by breaching confidentiality out of necessity but doing so with the client's involvement and collaboration. Option B is overly paternalistic and can damage the therapeutic alliance or alienate the client, while Option A fails to prevent imminent harm.",
    source: "ethics",
    difficulty: "hard"
  },
  {
    category: "Psychological Ethics — Multiple Relationships",
    vignette: "A licensed psychologist moves to a small, isolated municipality to establish the area's only psychological clinic. A few weeks later, the local mayor—who controls the clinic’s zoning permits and funding grants—requests private therapy sessions for severe anxiety. Refusing the mayor might jeopardize the clinic's existence, depriving hundreds of residents of mental health care. What is the most ethical course of action?",
    options: [
      "A. Accept the mayor as a client but set rigid structural boundaries, documenting the economic necessity of preserving the clinic for the greater good (Justice).",
      "B. Refuse to treat the mayor to completely avoid a conflict of interest and dual relationship, prioritizing the principle of Integrity above all other communal needs.",
      "C. Refer the mayor to an online telepsychology provider outside the municipality, while offering to provide brief crisis stabilization face-to-face only if an acute emergency arises.",
      "D. Accept the mayor as a client but waive all fees to ensure there is no financial transaction, thereby eliminating the dual relationship."
    ],
    correctIndex: 2,
    explanation: "Ethical codes recognize that dual relationships are sometimes difficult to avoid in small communities, but a dual relationship with a figure who holds direct institutional power over the practitioner creates an unmanageable conflict of interest. Option C protects the practitioner’s integrity, avoids the dual relationship, protects the clinic's survival by not flatly alienating the mayor, and ensures the mayor still receives competent care via telepsychology.",
    source: "ethics",
    difficulty: "hard"
  },
  {
    category: "Psychological Ethics — Client Privacy",
    vignette: "A psychological clinic wants to boost its digital presence. The marketing team posts a compilation video of clients walking into the beautifully decorated lobby with their faces digitally blurred out. However, an astute viewer could easily identify a prominent local public figure by their unique clothing, gait, and luxury vehicle parked outside. Which ethical principle was primarily violated, and what was the correct hierarchy?",
    options: [
      "A. Respect for People's Rights and Dignity; the clinic failed to ensure absolute de-identification, which takes precedence over promotional activities.",
      "B. Beneficence; the video helped reduce mental health stigma in the community, which outweighs minor privacy risks.",
      "C. Fidelity; the clinic violated its implicit contract with the marketing team to provide engaging content.",
      "D. None of the above; since the faces were blurred, no ethical violation occurred."
    ],
    correctIndex: 0,
    explanation: "The right to privacy and confidentiality (Respect for People's Rights and Dignity) is absolute and cannot be compromised for institutional marketing or promotion. Blurring faces is insufficient if contextual clues (gait, clothing, car) allow for identification. Protecting client identity takes absolute precedence over corporate growth or stigma reduction.",
    source: "ethics",
    difficulty: "medium"
  },
  {
    category: "Psychological Ethics — Boundaries of Competence",
    vignette: "Following a catastrophic typhoon, a registered psychometrician (RPm) volunteered to provide psychological first aid (PFA). During a session, a survivor exhibits profound, complex symptoms of Dissociative Identity Disorder (DID) rooted in chronic childhood trauma. There are no clinical psychologists available on-site for another month. What should the psychometrician do?",
    options: [
      "A. Explicitly initiate intensive trauma-focused psychotherapy, since Beneficence dictates that doing something is better than leaving the survivor with no support.",
      "B. Provide immediate grounding techniques and PFA within their scope, explicitly document the limits of their competence, and arrange a formal referral to a clinical psychologist via telepsychology or for when they arrive.",
      "C. Refuse to talk to the survivor further to ensure they do not violate RA 10029 regarding scope of practice, directing them to wait for a clinical psychologist.",
      "D. Administer a full battery of projective tests (e.g., TAT, Rorschach) to fully map out the dissociative structure before the specialist arrives."
    ],
    correctIndex: 1,
    explanation: "The principle of Competence requires professionals to recognize the boundaries of their specific training. A psychometrician cannot conduct specialized trauma psychotherapy. However, totally abandoning the client violates Beneficence. Option B allows the RPm to provide immediate, safe, non-clinical stabilization (PFA) while systematically transitioning the client to a competent professional.",
    source: "ethics",
    difficulty: "hard"
  },
  {
    category: "Psychological Ethics — Test Security",
    vignette: "A psychologist is subpoenaed by a defense attorney to hand over the raw test protocols, including original test questions, scoring templates, and drawings, of a client involved in a high-profile custody battle. The attorney claims this is necessary to ensure a fair trial (Justice). What is the psychologist’s paramount ethical obligation?",
    options: [
      "A. Comply immediately with the subpoena to respect the legal system and demonstrate the principle of Fidelity to the courts.",
      "B. Refuse to release the raw test data and materials to protect test security and prevent public misuse, suggesting instead that a summary psychological report be submitted.",
      "C. Hand over the raw data but demand a high financial compensation fee to protect the financial integrity of the assessment firm.",
      "D. Let the client decide whether the raw data should be released, as client autonomy supersedes test security concerns."
    ],
    correctIndex: 1,
    explanation: "Psychologists are ethically bound to protect the security and integrity of psychometric instruments. Releasing raw data and test items to non-professionals compromises the future validity of the tests. The correct balance is to offer a comprehensive interpretation or report that satisfies the court’s informational needs without exposing copyrighted or secure assessment materials.",
    source: "ethics",
    difficulty: "hard"
  }
];

