import { PsychologyTest, Question } from '../types';
import { TESTS } from '../data/tests';
import { SEED_QUESTIONS } from '../data/seedQuestions';

// Randomized parameters for procedural casing
const NAMES = ["Antonio", "Clara", "Therese", "Paolo", "Sonia", "Emilio", "Gideon", "Giselle", "Dante", "Angela", "Miguel", "Estrella", "Nicanor", "Regina", "Federico", "Isabel", "Ronaldo", "Celine", "Enrique", "Bianca", "Joaquin", "Victoria", "Amelia", "Luz", "Geronimo", "Mateo", "Pia", "Camila", "Lucia"];

const OCCUPATIONS = [
  "IT support specialist in Ortigas",
  "BPO billing supervisor in Quezon City",
  "third-year medical clerk at UST",
  "public high school teacher in Pasay",
  "freelance digital UI designer",
  "senior audit manager in Pasig",
  "call center associate at McKinley Hill",
  "law graduate reviewing in Sampaloc, Manila",
  "staff nurse at a provincial medical center",
  "hospitality relations manager in Boracay",
  "operations supervisor in Bonifacio Global City",
  "investment analyst in Ortigas",
  "structural engineering researcher",
  "fresh psychology graduate from Diliman"
];

const STRESSORS = [
  "intense corporate performance evaluations and client feedback targets",
  "sudden grief after losing an immediate family elder",
  "a tense, abrupt broken romantic engagement of four years",
  "massive financial strains following a failed local franchise investment",
  "the transition into a demanding graveyard/night-shift schedule",
  "clashing persistently with dominant and perfectionist in-laws",
  "intense daily commuting stress and heavy academic deadlines",
  "high-stakes PmLE licensing preparation while working part-time"
];

const TIMELINES = [
  "the last 6 months",
  "the past 2 years",
  "the past 3 weeks",
  "the last 5 months",
  "the preceding 4 weeks",
  "the past 12 months",
  "the last 8 months"
];

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Procedural blueprints for Clinical DSM-5 (source: 'dsm5')
const DSM5_BLUEPRINTS = [
  {
    topic: "Major Depressive Disorder",
    generate: (name: string, age: number, job: string, stressor: string, timeline: string) => ({
      category: "DSM-5-TR — Depressive Disorders (Clinical Vignette)",
      vignette: `A ${age}-year-old ${job} named ${name} presents with a debilitating period of deeply depressed mood, lack of interest in physical or social routines, and extreme fatigue lasting for ${timeline}. These symptoms became clinical after suffering ${stressor}. ${name} describes persistent feelings of worthlessness, daily sleep-onset insomnia, severe psychomotor slowing, and a noticeable 10lb change in weight. There is no history of manic mood swings or substance dependencies.`,
      options: ["Major Depressive Disorder (MDD)", "Persistent Depressive Disorder (Dysthymia)", "Adjustment Disorder with Depressed Mood", "Bipolar II Disorder"],
      explanation: "This case fully confirms Major Depressive Disorder under DSM-5-TR, requiring 5 or more depressive symptoms (including depressed mood or anhedonia) concurrently for at least 2 consecutive weeks, precipitating major occupational and personal disruption."
    })
  },
  {
    topic: "Generalized Anxiety Disorder",
    generate: (name: string, age: number, job: string, stressor: string, timeline: string) => ({
      category: "DSM-5-TR — Anxiety Disorders (Clinical Vignette)",
      vignette: `A ${age}-year-old ${job} named ${name} reports constant, widespread apprehension and clinical worry about multiple daily events (such as financial security, performance ratings, and family health) during ${timeline}. ${name} notes that the anxiety is completely uncontrollable and is accompanied by chronic muscle tension, restlessness, severe irritability, and difficulty falling asleep, severely affecting their office efficiency. No distinct phobias or panic spikes are declared.`,
      options: ["Generalized Anxiety Disorder (GAD)", "Panic Disorder", "Social Anxiety Disorder", "Obsessive-Compulsive Disorder (OCD)"],
      explanation: "Generalized Anxiety Disorder under DSM-5-TR is defined by excessive, uncontrollable worry regarding various daily activities or domains for more days than not for at least 6 months, accompanied by at least 3 vegetative somatic symptoms (e.g., muscle tension, restlessness, irritability)."
    })
  },
  {
    topic: "Panic Disorder",
    generate: (name: string, age: number, job: string, stressor: string, timeline: string) => ({
      category: "DSM-5-TR — Panic Spectrum (Clinical Vignette)",
      vignette: `A ${age}-year-old ${job} named ${name} is evaluated after experiencing recurrent, unexpected surges of intense fear and physical discomfort that peak within minutes. During these spikes, ${name} describes violent heart palpitations, a choking sensation, hyperventilation, trembling, and an overwhelming dread of dying. Following these attacks, ${name} has spent ${timeline} in constant dread of experiencing another attack and has avoided leaving their home alone.`,
      options: ["Panic Disorder", "Generalized Anxiety Disorder (GAD)", "Post-Traumatic Stress Disorder (PTSD)", "Specific Phobia, Situational"],
      explanation: "Panic Disorder under DSM-5-TR requires recurrent, unexpected panic attacks followed by at least 1 month of persistent worry about future attacks, their catastrophic consequences, or significant maladaptive behavioral transitions designed to avoid them."
    })
  },
  {
    topic: "Post-Traumatic Stress Disorder",
    generate: (name: string, age: number, job: string, stressor: string, timeline: string) => ({
      category: "DSM-5-TR — Trauma & Stressor Disorders (Clinical Vignette)",
      vignette: `A ${age}-year-old ${job} named ${name} describes experiencing distressing, intrusive memoirs and vivid flashbacks regarding a severe road traffic incident that occurred 6 months ago. For ${timeline}, they have persistently avoided boarding vehicles, report a state of hypervigilance, and have fits of anger, causing substantial marital strain. These symptoms started shortly after the stressor.`,
      options: ["Post-Traumatic Stress Disorder (PTSD)", "Acute Stress Disorder", "Adjustment Disorder", "Generalized Anxiety Disorder"],
      explanation: "PTSD requires symptoms of exposure to a qualifying traumatic event, followed by at least 1 month of intrusive re-experiencing (flashbacks, nightmares), cognitive alterations, active avoidance, and functional hyperarousal."
    })
  },
  {
    topic: "Obsessive-Compulsive Disorder",
    generate: (name: string, age: number, job: string, stressor: string, timeline: string) => ({
      category: "DSM-5-TR — Obsessive-Compulsive Spectrum (Clinical Vignette)",
      vignette: `A ${age}-year-old ${job} named ${name} is plagued by distressing, intrusive thoughts that their hands are severely contaminated with toxic waste. To temporarily neutralize the anxiety, they spend up to 4 hours per day performing a complex, rigid handwashing ritual. During ${timeline}, they have missed work deadlines and have developed severe dermatological abrasions due to this behavior, which escalated under ${stressor}.`,
      options: ["Obsessive-Compulsive Disorder (OCD)", "Body Dysmorphic Disorder", "Somatic Symptom Disorder", "Delusional Disorder, Somatic Type"],
      explanation: "OCD is diagnosed based on the presence of obsessions (anxiety-provoking intrusive thoughts/images) and/or compulsions (repetitive acts aimed at neutralizing the distress), which are highly time-consuming (taking >1 hour daily) and cause clinically significant functional impairment."
    })
  },
  {
    topic: "Bipolar I Disorder",
    generate: (name: string, age: number, job: string, stressor: string, timeline: string) => ({
      category: "DSM-5-TR — Bipolar Spectrum (Clinical Vignette)",
      vignette: `A ${age}-year-old ${job} named ${name} is brought in after presenting with a 1-week period of abnormally elevated, expansive mood, excessive grandiosity, and high energy. ${name} hasn't slept for more than 2 hours per night but notes feeling fully energetic. They speak with pressured, rapid speech, report flight of ideas, and embarked on a reckless clinical financial contract, severely disrupting their workplace.`,
      options: ["Bipolar I Disorder, manic episode", "Bipolar II Disorder, hypomanic episode", "Major Depressive Disorder", "Cyclothymic Disorder"],
      explanation: "Bipolar I requires the presence of at least one manic episode characterized by abnormally elevated or irritable mood and increased goal-directed activity lasting at least 1 week, accompanied by severe functional impairment, regardless of depressive history."
    })
  },
  {
    topic: "Bipolar II Disorder",
    generate: (name: string, age: number, job: string, stressor: string, timeline: string) => ({
      category: "DSM-5-TR — Bipolar Spectrum (Clinical Vignette)",
      vignette: `A ${age}-year-old ${job} named ${name} presents with a severe 3-week depressive episode marked by deep sadness and insomniac patterns. Clinical history reveals a historic 4-day period where ${name} was extraordinarily energetic, highly talkative, and possessed elevated self-esteem, but did not suffer occupational impairment, hospitalization, or delusions. What is the differential diagnostic conclusion?`,
      options: ["Bipolar II Disorder", "Bipolar I Disorder, manic", "Major Depressive Disorder (MDD)", "Borderline Personality Disorder"],
      explanation: "Bipolar II Disorder is defined by a clinical history of at least one Major Depressive Episode AND at least one Hypomanic Episode (lasting at least 4 contiguous days, showing distinct mood elevations but without causing severe functional impairment or requiring hospitalization)."
    })
  },
  {
    topic: "Schizophrenia",
    generate: (name: string, age: number, job: string, stressor: string, timeline: string) => ({
      category: "DSM-5-TR — Schizophrenia Spectrum (Clinical Vignette)",
      vignette: `A ${age}-year-old ${job} named ${name} is brought in by family. Over ${timeline}, they have expressed bizarre, unshakeable beliefs that the local HR department is broadcasting their personal thoughts on national radio waves. They are observed talking to non-existent individuals, show incoherent disorganized speech, and exhibit flat clinical affect. Their occupational and personal hygiene functioning has deteriorated severely.`,
      options: ["Schizophrenia", "Schizophreniform Disorder", "Brief Psychotic Disorder", "Schizotypal Personality Disorder"],
      explanation: "Schizophrenia requires at least two active-phase symptoms (delusions, hallucinations, disorganized speech, grossly disorganized behavior, or negative symptoms) persisting for at least 6 months, with at least 1 month of active symptoms."
    })
  },
  {
    topic: "Persistent Depressive Disorder (Dysthymia)",
    generate: (name: string, age: number, job: string, stressor: string, timeline: string) => ({
      category: "DSM-5-TR — Depressive Disorders (Clinical Vignette)",
      vignette: `A ${age}-year-old ${job} named ${name} describes their mood as 'perpetually down and gloomy' for more than 2 years. They report poor appetite, low energy, chronic self-doubt, and mild concentration issues. While they manage to carry out their essential work duties, they cannot remember a time when they felt genuinely joyful during this entire period. They deny any discrete major depressive episodes.`,
      options: ["Persistent Depressive Disorder (Dysthymia)", "Major Depressive Disorder", "Cyclothymic Disorder", "Adjustment Disorder with Depressed Mood"],
      explanation: "Persistent Depressive Disorder (Dysthymia) involves a depressed mood occurring for most of the day, for more days than not, for at least 2 years, accompanied by at least two vegetative symptoms, without meeting full historical criteria for a manic or persistent hypomanic episode."
    })
  },
  {
    topic: "Borderline Personality Disorder",
    generate: (name: string, age: number, job: string, stressor: string, timeline: string) => ({
      category: "DSM-5-TR — Personality Disorders (Clinical Vignette)",
      vignette: `A ${age}-year-old ${job} named ${name} exhibits a pervasive pattern of unstable interpersonal relationships. When their partner requested brief personal space, ${name} experienced intense fears of abandonment, resulting in self-injurious cutting behaviors. They report persistent chronic feelings of emptiness, extreme mood swings, and transient paranoid ideation under stress. These behaviors have been active across early adulthood.`,
      options: ["Borderline Personality Disorder (BPD)", "Bipolar II Disorder", "Histrionic Personality Disorder", "Antisocial Personality Disorder"],
      explanation: "Borderline Personality Disorder is characterized by a pervasive pattern of instability in interpersonal relationships, self-image, and affects, alongside marked impulsivity, beginning by early adulthood. Symptoms include frantic efforts to avoid abandonment, self-harm, chronic emptiness, and affective instability."
    })
  },
  {
    topic: "Somatic Symptom Disorder",
    generate: (name: string, age: number, job: string, stressor: string, timeline: string) => ({
      category: "DSM-5-TR — Somatic Symptom Spectrum (Clinical Vignette)",
      vignette: `A ${age}-year-old ${job} named ${name} presents with persistent chest discomfort and abdominal pain during ${timeline}. Medical evaluations, including multiple EKGs and endoscopy checks, report healthy physiological margins. However, ${name} remains highly consumed by these symptoms, spends several hours daily researching rare diseases, and exhibits extreme, disproportionate anxiety regarding their health, disrupting their career.`,
      options: ["Somatic Symptom Disorder", "Illness Anxiety Disorder", "Conversion Disorder", "Factitious Disorder"],
      explanation: "Somatic Symptom Disorder is defined by one or more physical symptoms that are distressing or cause significant daily disruption, accompanied by excessive, disproportionate thoughts, feelings, or behaviors related to those somatic symptoms."
    })
  },
  {
    topic: "No Clinical Diagnosis (Hard Differential)",
    generate: (name: string, age: number, job: string, stressor: string, timeline: string) => ({
      category: "DSM-5-TR — Diagnostic Thresholds (Clinical Vignette)",
      vignette: `A ${age}-year-old ${job} named ${name} presents for school assessment reporting moderate sadness, temporary sleep difficulties, and low enthusiasm. These symptoms started 3 weeks ago after ${stressor}. The patient notes they continue to score high on examinations, enjoy cooking with friends, and maintain great appetite and high vocational focus. They deny feelings of worthlessness, hopelessness, or psychomotor changes.`,
      options: ["No clinical mental disorder diagnosis; normal reaction to stressors", "Adjustment Disorder with Depressed Mood", "Major Depressive Disorder, Mild", "Persistent Depressive Disorder"],
      explanation: "To qualify for a clinical DSM-5 diagnosis, a presentation must cause clinically significant distress OR marked impairment in social, occupational, or other functional domains. Since the patient's academic, social, and physical functioning remains fully intact with no severe clinical symptoms, this represents a normal psychological reaction to stress, rather than pathology."
    })
  }
];

// Procedural blueprints for Psychopharmacology (source: 'pharma')
const PHARMA_BLUEPRINTS = [
  {
    topic: "Escitalopram / SSRI",
    generate: (name: string, age: number, job: string, stressor: string, timeline: string) => ({
      category: "Psychopharmacology — Depressive Disorders (Clinical Vignette)",
      vignette: `A ${age}-year-old ${job} named ${name} is diagnosed with Major Depressive Disorder (MDD). The clinician decides to initiate first-line pharmacological treatment. What is the standard FDA-approved gold standard drug class and its mechanism of action?`,
      options: ["Escitalopram (SSRI) - Serotonin Reuptake Transporter (SERT) Inhibition", "Amitriptyline (TCA) - Tricyclic sodium-channel blocker", "Phenelzine (MAOI) - Monoamine oxidase degradation blocker", "Alprazolam (Benzodiazepine) - GABA-A channel facilitation"],
      explanation: "Selective Serotonin Reuptake Inhibitors (SSRIs) like Escitalopram or Sertraline are the gold-standard, FDA-approved first-line pharmacological treatments for MDD due to their high efficacy and favorable safety profiles compared to legacy TCAs or MAOIs."
    })
  },
  {
    topic: "Lithium Carbonate / Mood Stabilizer",
    generate: (name: string, age: number, job: string, stressor: string, timeline: string) => ({
      category: "Psychopharmacology — Mood Stabilizers (Clinical Vignette)",
      vignette: `A ${age}-year-old ${job} named ${name} is admitted during an acute manic episode presenting with grandiose ideas, pressured speech, and decreased need for sleep. The consultant intends to initiate a classic, FDA-approved mood stabilizer that has a very narrow therapeutic index and requires strict serum monitoring to avoid toxicity.`,
      options: ["Lithium Carbonate (0.6 to 1.2 mEq/L serum range)", "Sodium Valproate (50 to 125 mcg/mL serum range)", "Lamotrigine (no systematic therapeutic blood draw required)", "Haloperidol (high incidence of acute dystonia)"],
      explanation: "Lithium remains the classic first-line FDA-approved mood stabilizer for acute mania and maintenance in Bipolar I. It requires strict therapeutic drug monitoring (target range: 0.6 to 1.2 mEq/L) because of its narrow therapeutic index."
    })
  },
  {
    topic: "Clozapine / Antipsychotic",
    generate: (name: string, age: number, job: string, stressor: string, timeline: string) => ({
      category: "Psychopharmacology — Schizophrenia Spectrum (Clinical Vignette)",
      vignette: `A ${age}-year-old ${job} named ${name} with treatment-resistant Schizophrenia is started on Clozapine after failing trials of Risperidone and Aripiprazole. What highly fatal side effect and mandatory monitoring protocol must the psychiatric nurse coordinate?`,
      options: ["Agranulocytosis (Weekly Absolute Neutrophil Count - ANC monitoring)", "Stevens-Johnson Syndrome (Severe clinical skin rash tracking)", "Cardiac Arrhythmia (Mandatory daily EKG telemetry panels)", "Extrapyramidal Parkinsonism (Anticholinergic Benztropine administration)"],
      explanation: "Clozapine carries a black box warning for agranulocytosis (severe reduction in white blood cell count). Patients must undergo mandatory, regular Absolute Neutrophil Count (ANC) monitoring to prevent life-threatening infections."
    })
  },
  {
    topic: "Methylphenidate / ADHD Stimulant",
    generate: (name: string, age: number, job: string, stressor: string, timeline: string) => ({
      category: "Psychopharmacology — ADHD Treatments (Clinical Vignette)",
      vignette: `An 8-year-old child presents with extreme inattention and hyperactive classroom movements. Under standard child guidelines, the physician initiates Methylphenidate. What is the neurobiological mechanism of this first-line psychostimulant?`,
      options: ["Blocks dopamine (DAT) and norepinephrine (NET) transporters", "Acts as a selective agonist at Postsynaptic Alpha-2A Adrenergic Receptors", "Blocks Serotonin Reuptake via SERT inhibition", "Increases GABA-A channel opening frequencies"],
      explanation: "Methylphenidate (Ritalin/Concerta) is an FDA-approved first-line stimulant that boosts extracellular levels of dopamine and norepinephrine in the prefrontal cortex by blocking their respective reuptake transporters (DAT and NET)."
    })
  },
  {
    topic: "Haloperidol / Typical Antipsychotic",
    generate: (name: string, age: number, job: string, stressor: string, timeline: string) => ({
      category: "Psychopharmacology — Schizophrenia Spectrum (Clinical Vignette)",
      vignette: `A ${age}-year-old ${job} named ${name} with acute psychosis is given a high-dose typical antipsychotic (Haloperidol). Hours later, they develop painful, involuntary muscle contractions of the neck and facial muscles (acute dystonia). What is the primary receptor mechanism responsible for both therapeutic benefit and these neurological side effects?`,
      options: ["High-affinity antagonism at Dopamine D2 receptors", "Dual antagonism at Serotonin 5-HT2A and Dopamine D2 receptors", "Positive allosteric modulation at GABA-A receptors", "Monoamine Oxidase inhibition (MAO-A/B)"],
      explanation: "First-generation typical antipsychotics like Haloperidol are high-potency Dopamine D2 receptor antagonists. This robust blockade in the mesolimbic pathway relieves positive psychotic symptoms, but concurrent blockade in the nigrostriatal pathway triggers extrapyramidal symptoms (EPS) like acute dystonia."
    })
  },
  {
    topic: "Alprazolam / Benzodiazepine",
    generate: (name: string, age: number, job: string, stressor: string, timeline: string) => ({
      category: "Psychopharmacology — Anxiety Management (Clinical Vignette)",
      vignette: `A ${age}-year-old ${job} named ${name} experiences intense, unprovoked panic attacks. The physician prescribes Alprazolam for immediate, short-term relief. Which chemical mechanism explains this drug's rapid anxiolytic and sedative effects?`,
      options: ["Positive allosteric modulation of GABA-A receptors, increasing chloride ion influx", "Inhibition of Serotonin Reuptake at the synapse", "Inhibition of Norepinephrine Reuptake at the synapse", "Antagonism of postsynaptic histamine H1 receptors"],
      explanation: "Benzodiazepines like Alprazolam act as positive allosteric modulators at GABA-A receptors. They increase the frequency of chloride channel opening in the presence of GABA, leading to neuronal hyperpolarization and rapid central nervous system inhibition."
    })
  }
];

// Procedural blueprints for Developmental Psychology (source: 'dev')
const DEV_BLUEPRINTS = [
  {
    topic: "Identity vs. Role Confusion",
    generate: (name: string, age: number, job: string, stressor: string, timeline: string) => ({
      category: "Developmental Psychology — Erickson's Crisis",
      vignette: `A 16-year-old student reports feeling highly unstable regarding their future occupational pathway. They describe experimenting with diverse peer groups, modifying their clothing patterns, and exploring religious belief systems, leading to intense family disputes. According to Erik Erikson, what psychosocial tension is being played out?`,
      options: ["Identity vs. Role Confusion", "Industry vs. Inferiority", "Intimacy vs. Isolation", "Autonomy vs. Shame & Doubt"],
      explanation: "Erik Erikson's psychosocial stage of adolescence (typically ages 12 to 18) is characterized by the crisis of Identity vs. Role Confusion, where the young person synthesizes their roles and values into a cohesive sense of self."
    })
  },
  {
    topic: "Generativity vs. Stagnation",
    generate: (name: string, age: number, job: string, stressor: string, timeline: string) => ({
      category: "Developmental Psychology — Erickson's Crisis",
      vignette: `A 48-year-old ${job} named ${name} reports feeling that their life is at an absolute standstill. Despite achieving stable career success, they note a profound lack of personal growth, express indifference toward helping younger colleagues, and feel self-absorbed. According to Erik Erikson, this represents a failure to negotiate:`,
      options: ["Generativity vs. Stagnation", "Integrity vs. Despair", "Intimacy vs. Isolation", "Industry vs. Inferiority"],
      explanation: "Middle adulthood (ages 40 to 65) is characterized by the tension between Generativity (creating, nurturing, and guiding the next generation) and Stagnation (feeling unproductive, self-centered, or stagnant)."
    })
  },
  {
    topic: "Conservation",
    generate: (name: string, age: number, job: string, stressor: string, timeline: string) => ({
      category: "Developmental Psychology — Piaget's Schema",
      vignette: `During a developmental assessment, a child is shown two identical low glasses containing equal volumes of water. The examiner then pours the water from one glass into a tall, thin cylinder. An 8-year-old child explains that both glasses still contain the exact same amount of liquid. Under Piaget's cognitive stages, this child is in the:`,
      options: ["Concrete Operational Stage (acquisition of Conservation)", "Preoperational Stage (dominated by Centration)", "Formal Operational Stage (abstract hypothesis testing)", "Sensorimotor Stage (attaining Object Permanence)"],
      explanation: "The understanding that physical indices (volume, mass, numbers) remain constant despite superficial physical rearrangements is 'Conservation', typically acquired in the Concrete Operational stage (ages 7 to 11)."
    })
  },
  {
    topic: "Kohlberg Postconventional Morality",
    generate: (name: string, age: number, job: string, stressor: string, timeline: string) => ({
      category: "Developmental Psychology — Kohlberg's Moral Stages",
      vignette: `When asked whether a husband should steal an unaffordable, life-saving drug for his dying wife, a participant states: 'He must steal it, because the right to human life is a universal value that transcends civil property laws.' In Lawrence Kohlberg's scheme, this reasoning belongs to:`,
      options: ["Postconventional Morality (Stage 6 - Universal Ethical Principles)", "Conventional Morality (Stage 4 - Law and Order Orientation)", "Preconventional Morality (Stage 1 - Punishment and Obedience)", "Conventional Morality (Stage 3 - Good Boy/Nice Girl Concordance)"],
      explanation: "Postconventional morality occurs when ethical choices are guided by self-chosen, abstract ethical principles and universal human rights that hold legal systems accountable, rather than blindly following local laws."
    })
  }
];

// Procedural blueprints for Industrial/Organizational Psychology (source: 'io')
const IO_BLUEPRINTS = [
  {
    topic: "Herzberg Two-Factor Theory",
    generate: (name: string, age: number, job: string, stressor: string, timeline: string) => ({
      category: "Industrial/Organizational Psychology — Workplace Motivation",
      vignette: `In a BPO call center in Ortigas, the HR department reports that while implementing clean workspaces, working air-conditioners, and competitive salaries stops staff from quitting, it fails to increase their work productivity. True engagement only rises when they launch peer-recognition programs and clear paths to promotion. According to Frederick Herzberg, basic working conditions, salaries, and security are:`,
      options: ["Hygiene Factors (prevent dissatisfaction, but do not motivate)", "True Motivators (directly boost job satisfaction and performance)", "Instrumentality values in expectancy equations", "Reinforcement variables in token economies"],
      explanation: "Herzberg's Two-Factor Theory postulates that 'Hygiene Factors' (such as pay, workspace safety, and clean facilities) are essential to prevent workplace dissatisfaction, but do not actively drive employee satisfaction or motivation. That requires 'Motivators' (such as growth, recognition, and responsibility)."
    })
  },
  {
    topic: "Criterion-related (Predictive) Validity",
    generate: (name: string, age: number, job: string, stressor: string, timeline: string) => ({
      category: "Industrial/Organizational Psychology — Talent Selection",
      vignette: `An organizational psychologist correlates pre-employment cognitive assessment scores of 200 call center operators with their actual key performance indicator (KPI) scores (such as issue resolution velocity) collected 6 months after hire. The administrator is trying to prove:`,
      options: ["Criterion-related (Predictive) Validity", "Internal Consistency Reliability (Cronbach's Alpha)", "Content Validity mapping", "Test-retest Coefficient of Stability"],
      explanation: "Criterion-related validity (specifically Predictive Validity) is established when scores on a selection instrument (predictor) are shown to statistically correlate with later direct measures of job performance (critical criterion)."
    })
  },
  {
    topic: "Expectancy Theory",
    generate: (name: string, age: number, job: string, stressor: string, timeline: string) => ({
      category: "Industrial/Organizational Psychology — Motivation Scales",
      vignette: `An HR manager assesses a team's motivation. Employees note that although they believe excessive effort will yield top sales volume (Expectancy), they feel completely doubtful that management will actually pay the promised sales bonuses (Instrumentality). Under Victor Vroom's Expectancy Theory, motivation is:`,
      options: ["Seriously compromised, as Expectancy, Instrumentality, and Valence are multiplicative", "Unchanged, because high Valence compensates for zero Instrumentality", "Boosted, because high effort functions as an intrinsic reward", "Determined entirely by positive hygiene reinforcements"],
      explanation: "Victor Vroom's Expectancy Theory states that Motivation = Expectancy (effort leading to performance) x Instrumentality (performance leading to reward) x Valence (personal value of the reward). Since these variables are multiplicative, if any index drops to zero, overall motivation collapses."
    })
  },
  {
    topic: "Hawthorne Effect",
    generate: (name: string, age: number, job: string, stressor: string, timeline: string) => ({
      category: "Industrial/Organizational Psychology — Hawthorne Studies",
      vignette: `During a classic operational experiment in an assembly plant, researchers noted that employee output and performance improved dramatically regardless of whether the workplace lighting was dimmed or brightened. The productivity rise occurred purely because workers felt valued and knew they were being observed. This is:`,
      options: ["The Hawthorne Effect", "Herzberg Motivation syndrome", "The Pygmalion expectancy bias", "The contrast rating error"],
      explanation: "The Hawthorne Effect is a well-documented phenomenon in industrial psychology where individuals alter their behavior or improve their work productivity simply in response to the awareness of being observed by researchers or supervisors."
    })
  }
];

// Procedural blueprints for Ethical Best Option Scenarios under the PAP Code of Ethics for Psychometricians (source: 'ethics')
export const ETHICS_BLUEPRINTS = [
  {
    topic: "Limits of Competence & Specialized Assessment",
    generate: (name: string, age: number, job: string, stressor: string, timeline: string) => ({
      category: "PAP Code of Ethics for Psychometricians — Best Option Scenario (Standard VII)",
      vignette: `A licensed psychometrician, ${name}, is asked by an educational administrator to administer and interpret a highly specialized diagnostic neuropsychological protocol for a student suspected of having a rare cognitive impairment. ${name}, who has experienced similar administrative pressure with ${stressor} during ${timeline}, has never received formal clinical training with this specific battery. All options are constructive, but what is the BEST first-line action under standard PAP directives?`,
      options: [
        "Formally communicate your professional limits of competence to the school directors, outline what you are qualified to administer, and refer the client to a board-certified clinical neuropsychologist.",
        "Request the clinical assessment manual, consult extensively with a clinical colleague, and administer the test with a supervised disclaimer in the final psychological report.",
        "Proceed with administering only the baseline general cognitive screening tests you feel competent with, and describe behavioral observations without offering a categorical diagnosis.",
        "Seek immediate continuing professional education (CPE) credits or training workshops to rapidly gain standard competency in neuropsychological metrics while holding the case."
      ],
      explanation: "All options are positive attempts to solve the case ethically (disclaimer, CPE, screening, or referral). However, under PAP Ethical Standard VII (Competence), psychometricians must actively operate strictly within the boundaries of their education, training, and credentialing. Since diagnosing complex neuropsychological disorders is outside a psychometrician's standard scope and training, the absolute BEST first-line action is to formally declare your professional limits and refer the student to a qualified clinical professional."
    })
  },
  {
    topic: "Safeguarding Test Security & Media Inquiries",
    generate: (name: string, age: number, job: string, stressor: string, timeline: string) => ({
      category: "PAP Code of Ethics for Psychometricians — Best Option Scenario (Standard IX)",
      vignette: `A seasoned psychometrician, ${name}, is preparing an educational workshop for parents coping with ${stressor} over ${timeline}. During the feedback panel, several parents request to examine actual subtest items and scoring cards of the WISC-V to understand why their children obtained low scores. All options show healthy intent to support families, but which represent the BEST answer matching PAP Test Security guidelines?`,
      options: [
        "Explain the theoretical construct of each subtest (e.g., verbal reasoning) using mock, generic, and non-copyrighted practice puzzles to safeguard active test security.",
        "Allow parents to view retired or outdated elements from historical test versions (e.g., WISC-III) under strict supervision without any photo-taking allowed.",
        "Review actual test items briefly in a one-on-one confidential counseling session while emphasizing that they must never disclose the questions to the public.",
        "Provide a detailed, item-by-item printout of the student's incorrect responses so parents can directly tutor them on those specific cognitive weaknesses."
      ],
      explanation: "While sharing information is supportive (parents feel involved), PAP Standard IX (Assessment: Safeguarding Test Security) mandates absolute preservation of the integrity and security of standardized materials. Releasing actual items, even older items if they resemble current ones, compromises test validity. The BEST action is to explain the underlying cognitive constructs using completely generic, non-copyrighted examples."
    })
  },
  {
    topic: "Informed Consent & Voluntary Participation",
    generate: (name: string, age: number, job: string, stressor: string, timeline: string) => ({
      category: "PAP Code of Ethics for Psychometricians — Best Option Scenario (Standard IX)",
      vignette: `A corporate HR psychometrician, ${name}, is tasked with administering a group personality inventory to staff undergoing ${stressor} over ${timeline}. An older clerk, ${name}'s peer, politely refuses to write their signature on the informed consent forms, citing personal privacy concerns. All options are respectful, but what is the BEST ethical way to resolve this conflict under PAP principles?`,
      options: [
        "Respect the staff member's refusal, document their non-participation without prejudice or negative career impact, and offer to discuss alternative non-test-based feedback options.",
        "Consult with the department head or lawyer to explain that the assessment is a mandatory organizational requirement, and document their refusal in the corporate registry.",
        "Instruct the employee to complete the test booklet without signing the form so their raw results can be analyzed anonymously for statistics.",
        "Allow the employee to take the materials home to review at their leisure, trusting they will return the completed scales in their own time."
      ],
      explanation: "While securing compliance or documenting mandatory procedures has institutional value, the PAP Code of Ethics places the highest value on client self-determination and the voluntariness of assessment. Under Standard IX.B (Informed Consent), unless the evaluation is legally mandated or part of a standard school/organizational policy where consent is pre-agreed, the individual has the absolute right to refuse. The BEST ethical approach is to respect the refusal without punitive repercussions and focus on alternative feedback routes."
    })
  },
  {
    topic: "Release of Raw Test Data & Professional Custody",
    generate: (name: string, age: number, job: string, stressor: string, timeline: string) => ({
      category: "PAP Code of Ethics for Psychometricians — Best Option Scenario (Standard IX)",
      vignette: `A psychometrician at an assessment center finishes evaluating a child who is struggling with school changes. The parents, anxious because of ${stressor} over ${timeline}, formally demand a complete copy of the raw answer sheets, protocols, and standard score profiles to give to their private home tutor. All options have collaborative value, but what is the BEST response under PAP rules?`,
      options: [
        "Decline releasing raw protocols and sheets, but write a comprehensive interpreted report translating scores into clear developmental summaries and tutor suggestions.",
        "Release photocopies of the raw answer sheets only after having the parents sign an explicit non-disclosure agreement (NDA) to protect test copyrights.",
        "Charge a standard nominal admin fee, run a descriptive session explaining how scores are calculated, and release the complete folder of raw materials.",
        "Defer the release request entirely to your center's legal counsel to shield yourself from liability while parent-staff tension remains active."
      ],
      explanation: "All options seek to mitigate legal or relational risks. However, PAP Standard IX.F (Release of Test Data) explicitly stipulates that raw test data, protocols, and test materials should NOT be released to unqualified individuals (like tutoring staff) because of copyright laws and high misinterpretation risks. The BEST response is to decline the raw material release but provide a highly readable, translated written synthesis with practical recommendations."
    })
  },
  {
    topic: "Obsolete Test Norms & Budget Pressures",
    generate: (name: string, age: number, job: string, stressor: string, timeline: string) => ({
      category: "PAP Code of Ethics for Psychometricians — Best Option Scenario (Standard IX)",
      vignette: `An organization hired ${name} as a psychometrician to screen candidates under heavy pressure from ${stressor} over ${timeline}. To save money, management instructs ${name} to use outdated, surplus paper booklets of a personality inventory published in 1998, rather than licensing the modern 2018 edition. All options try to manage administrative limits, but what is the BEST action under PAP?`,
      options: [
        "Formally present a written memorandum to directors explaining how outdated norms degrade selection accuracy, and suggest using free, validated open-source personality instruments.",
        "Use the 1998 booklets to stay within budget, but place a bold, explicit ethical disclaimer in all diagnostic profiles regarding outdated norming metrics.",
        "Administer the old tests, but normalize the scores manually by researching recent local academic journal publications that recalibrated the 1998 norms.",
        "Request that candidates sign an administrative waiver acknowledging that they are being evaluated using older standards and hold no grievances."
      ],
      explanation: "While using waivers or adding disclaimers manages liability, PAP Standard IX.G (Obsolete Tests and Outdated Test Results) strictly specifies that psychometricians do not base decisions or recommendations on obsolete tests or outdated results. Under financial constraints, the BEST professional and ethical action is to advocate for valid testing standards and recommend free, premium, scientifically validated open-source instruments that are up-to-date."
    })
  },
  {
    topic: "Multiple Relationships & Recruitment Ethics",
    generate: (name: string, age: number, job: string, stressor: string, timeline: string) => ({
      category: "PAP Code of Ethics for Psychometricians — Best Option Scenario (Standard IV)",
      vignette: `At a private evaluation trust, ${name} is assigned to score and interpret clinical profiles for high-level candidates. During a session, ${name} realizes that the leading candidate, who matches their stressful career history of ${stressor} during ${timeline}, is their close childhood cousin. All options act to maintain integrity, but what is the BEST action under PAP?`,
      options: [
        "Declare the familial relationship to the selection committee immediately, request that another psychometrician administer and score the battery, and recuse yourself.",
        "Proceed with administering the test under strict standardized scoring conditions, and have a peer audit your calculations to guarantee zero bias.",
        "Administer the test but withhold your family connection from the scoring sheet, instead recusing yourself only during the final interview and hiring discussions.",
        "Conduct a preliminary blind-only evaluation and seal the results in an envelope, having the administrative team process it without naming you."
      ],
      explanation: "All options focus on bias control (blind grading, peer audits, or interview recusals). However, PAP General Principle IV (Professional Responsibility) and multiple relationship guidelines require clear boundaries of objectivity. Since family relationships inherently introduce a conflict of interest, the BEST and cleanest ethical route is full upfront declaration, assigning the assessment to an unbiased peer, and complete self-recusal."
    })
  }
];

// Fallback to generate local questions for a specific test with high variance and zero repetitive text
export function generateLocalQuestionForTest(test: PsychologyTest, seedValue: number): Question {
  const mode = seedValue % 4;
  const distractors = TESTS.filter(t => t.id !== test.id);

  // Generate randomized clinical vignette context to embed the test
  const name = NAMES[seedValue % NAMES.length];
  const age = Math.floor(seedValue % 45) + 18;
  const job = OCCUPATIONS[(seedValue + 3) % OCCUPATIONS.length];
  const stressor = STRESSORS[(seedValue + 7) % STRESSORS.length];

  if (mode === 0) {
    const correctAns = test.developer;
    const options = [correctAns, ...distractors.slice(0, 3).map(d => d.developer)]
      .filter((v, i, a) => a.indexOf(v) === i)
      .slice(0, 4);
    while (options.length < 4) {
      options.push("Inapplicable researcher");
    }
    const shuffled = [...options].sort(() => Math.sin(seedValue) > 0 ? 1 : -1);
    const correctIndex = shuffled.indexOf(correctAns);
    return {
      category: `Psychological Assessment — Developers`,
      vignette: `Clinical intake for a ${age}-year-old ${job} named ${name} (under stress due to ${stressor}) indicates the need for testing. The diagnostic battery includes the classic "${test.name}". To ensure correct regulatory documentation in reports under the Phillippine Psychology Act (RA 10029), which expert is recognized as the developer of this clinical instrument?`,
      options: shuffled,
      correctIndex,
      explanation: `The "${test.name}" was developed by ${test.developer}. Its clinical purpose is: ${test.purpose}`,
      source: 'assessment',
      testId: test.id,
      difficulty: 'medium',
      topic: `Psychological Assessment — Developers — ${test.id}`
    };
  } else if (mode === 1) {
    const correctAns = `${test.administration.type} test (${test.administration.items} items), suitable for ${test.administration.ageRange}.`;
    const options = [
      correctAns,
      `Self-administered questionnaire (120 items), suitable for children aged 3 to 6 years.`,
      `Individually rated assessment (10 items), targeting psychiatric adult inpatients.`,
      `Group test (45 items) with a strict 3-hour time constraint.`
    ];
    const shuffled = [...options].sort(() => Math.cos(seedValue) > 0 ? 1 : -1);
    const correctIndex = shuffled.indexOf(correctAns);
    return {
      category: `Psychological Assessment — Standard Administration`,
      vignette: `When formatting a testing room and setting parameters to evaluate ${name}, a ${age}-year-old ${job} experiencing ${stressor}, the psychometrician prepares to administer the "${test.name}". Which standard administration guidelines (administration type, item parameters, and target age range) must be observed?`,
      options: shuffled,
      correctIndex,
      explanation: `The "${test.name}" is administered as a ${test.administration.type} test with ${test.administration.items}, targeted for ${test.administration.ageRange}, and typically takes about ${test.administration.time} to complete.`,
      source: 'assessment',
      testId: test.id,
      difficulty: 'medium',
      topic: `Psychological Assessment — Standard Administration — ${test.id}`
    };
  } else if (mode === 2) {
    const correctAns = test.scoring;
    const options = [correctAns, ...distractors.slice(0, 5).map(d => d.scoring)].filter((v, i, a) => a.indexOf(v) === i).slice(0, 4);
    while (options.length < 4) {
      options.push("Score sum evaluated on a 5-point ordinal scale of 1 to 5.");
    }
    const shuffled = [...options].sort(() => Math.sin(seedValue + 1) > 0 ? 1 : -1);
    const correctIndex = shuffled.indexOf(correctAns);
    return {
      category: `Psychological Assessment — Scoring & Metrics`,
      vignette: `A licensed psychologist reviewing the test reports of a ${age}-year-old ${job} named ${name} (recovering from severe stress caused by ${stressor}) evaluates their profile on the "${test.name}". What validated scoring methodology or standard metric interpretative rule is validated for this test?`,
      options: shuffled,
      correctIndex,
      explanation: `The "${test.name}" is scored by: ${test.scoring}. Clinical interpretation guidelines state: ${test.interpretation}`,
      source: 'assessment',
      testId: test.id,
      difficulty: 'hard',
      topic: `Psychological Assessment — Scoring & Metrics — ${test.id}`
    };
  } else {
    const correctAns = test.factorsMeasured;
    const options = [correctAns, ...distractors.slice(0, 5).map(d => d.factorsMeasured)].filter((v, i, a) => a.indexOf(v) === i).slice(0, 4);
    while (options.length < 4) {
      options.push("General intelligence and cognitive deterioration ratio.");
    }
    const shuffled = [...options].sort(() => Math.cos(seedValue + 2) > 0 ? 1 : -1);
    const correctIndex = shuffled.indexOf(correctAns);
    return {
      category: `Psychological Assessment — Factors Measured`,
      vignette: `An assessment brief outlines that ${name}, a ${age}-year-old ${job} struggling with ${stressor}, obtained crucial elevations on several scales. Which specific constructs, psychiatric indices, or personality factors are primarily measured by the "${test.name}"?`,
      options: shuffled,
      correctIndex,
      explanation: `The "${test.name}" is designated to measure: ${test.factorsMeasured}. Quick description: ${test.quickInfo}`,
      source: 'assessment',
      testId: test.id,
      difficulty: 'medium',
      topic: `Psychological Assessment — Factors Measured — ${test.id}`
    };
  }
}

// Retools question picker to retrieve high-yield procedural questions with absolute zero duplication
export function getRandomLocalQuestion(
  source?: 'dsm5' | 'pharma' | 'assessment' | 'dev' | 'io' | 'local_test' | 'ethics',
  difficulty?: 'easy' | 'medium' | 'hard' | 'random',
  history: string[] = []
): Question {
  // 1. Compile seen topics/vignettes
  const seenTopics = new Set<string>();
  const seenVignettes = new Set<string>();
  
  if (Array.isArray(history)) {
    history.forEach(h => {
      try {
        if (h && typeof h === 'string' && h.trim().startsWith('{')) {
          const parsed = JSON.parse(h);
          if (parsed.topic) {
            seenTopics.add(parsed.topic.toLowerCase().trim());
          }
          if (parsed.vignette) {
            const norm = parsed.vignette.replace(/[^a-zA-Z0-9]/g, '').toLowerCase().substring(0, 80);
            if (norm) seenVignettes.add(norm);
          }
        } else if (h && typeof h === 'string') {
          const norm = h.replace(/[^a-zA-Z0-9]/g, '').toLowerCase().substring(0, 80);
          if (norm) {
            seenVignettes.add(norm);
          }
        }
      } catch {
        if (h && typeof h === 'string') {
          const norm = h.replace(/[^a-zA-Z0-9]/g, '').toLowerCase().substring(0, 80);
          if (norm) {
            seenVignettes.add(norm);
          }
        }
      }
    });
  }

  // 2. Select active source
  const finalSource: 'dsm5' | 'pharma' | 'assessment' | 'dev' | 'io' | 'ethics' = 
    source && source !== 'local_test' ? source as any : getRandomItem(['dsm5', 'pharma', 'assessment', 'dev', 'io', 'ethics'] as const);

  // 3. Prepare randomized parameters
  const name = getRandomItem(NAMES);
  const age = Math.floor(Math.random() * 45) + 18;
  const job = getRandomItem(OCCUPATIONS);
  const stressor = getRandomItem(STRESSORS);
  const timeline = getRandomItem(TIMELINES);

  // 4. Retrieve based on the category
  if (finalSource === 'assessment') {
    // Collect all possible test combinations (TESTS x 4 modes)
    const combinations: Array<{ test: any; mode: number; topic: string }> = [];
    TESTS.forEach(test => {
      for (let m = 0; m < 4; m++) {
        let topicType = 'Factors Measured';
        if (m === 0) topicType = 'Developers';
        else if (m === 1) topicType = 'Standard Administration';
        else if (m === 2) topicType = 'Scoring & Metrics';
        
        const topic = `Psychological Assessment — ${topicType} — ${test.id}`;
        combinations.push({ test, mode: m, topic });
      }
    });

    const unseenCombinations = combinations.filter(c => !seenTopics.has(c.topic.toLowerCase().trim()));
    const finalCombPool = unseenCombinations.length > 0 ? unseenCombinations : combinations;
    // Pick completely randomly from final pool
    const selectedComb = finalCombPool[Math.floor(Math.random() * finalCombPool.length)];
    
    // Force generation of the exact selected mode by multiplying a random int by 4 and adding the target mode
    const customSeed = Math.floor(Math.random() * 10000) * 4 + selectedComb.mode;
    return generateLocalQuestionForTest(selectedComb.test, customSeed);
  }

  // Handle standard dynamic blueprint categories
  let blueprintsList: Array<{ topic: string; generate: any }> = [];
  if (finalSource === 'dsm5') {
    blueprintsList = DSM5_BLUEPRINTS;
  } else if (finalSource === 'pharma') {
    blueprintsList = PHARMA_BLUEPRINTS;
  } else if (finalSource === 'dev') {
    blueprintsList = DEV_BLUEPRINTS;
  } else if (finalSource === 'ethics') {
    blueprintsList = ETHICS_BLUEPRINTS;
  } else {
    blueprintsList = IO_BLUEPRINTS;
  }

  const unseenBlueprints = blueprintsList.filter(b => !seenTopics.has(b.topic.toLowerCase().trim()));
  const finalBPList = unseenBlueprints.length > 0 ? unseenBlueprints : blueprintsList;
  const blueprint = finalBPList[Math.floor(Math.random() * finalBPList.length)];
  const dataPacket = blueprint.generate(name, age, job, stressor, timeline);

  const originalOptions = [...dataPacket.options];
  const correctText = originalOptions[0];
  // Completely randomize option sorting
  const shuffledOptions = [...originalOptions].sort(() => Math.random() - 0.5);
  const correctIndex = shuffledOptions.indexOf(correctText);

  return {
    category: dataPacket.category,
    vignette: dataPacket.vignette,
    options: shuffledOptions,
    correctIndex,
    explanation: dataPacket.explanation,
    source: finalSource,
    difficulty: difficulty && difficulty !== 'random' ? difficulty : getRandomItem(['medium', 'hard']),
    topic: blueprint.topic
  };
}

// Builds a fully unique list of multiple questions, ensuring we never duplicate topics or specific text vignettes
export function buildProceduralExamList(count: number): Question[] {
  const result: Question[] = [];
  const usedDisorders = new Set<string>();
  const usedPharmaDrugs = new Set<string>();
  const usedDevTheories = new Set<string>();
  const usedIoTheories = new Set<string>();
  const usedTestIds = new Set<string>();

  const assessmentsPortion = Math.round(count * 0.15); 
  const ethicsPortion = Math.round(count * 0.10);
  const pharmaPortion = Math.round(count * 0.15); 
  const devPortion = Math.round(count * 0.10); 
  const ioPortion = Math.round(count * 0.10); 
  const clinicalPortion = count - (assessmentsPortion + ethicsPortion + pharmaPortion + devPortion + ioPortion); 

  // Random list indicators to scramble output order fully
  let seedValue = Math.floor(Math.random() * 10000);

  // 1. Clinical portion
  let addedClinical = 0;
  // Try to pick unique blueprint topics first
  const clinicalPool = [...DSM5_BLUEPRINTS].sort(() => Math.random() - 0.5);
  for (const b of clinicalPool) {
    if (addedClinical >= clinicalPortion) break;
    const name = NAMES[(seedValue++) % NAMES.length];
    const age = Math.floor(seedValue % 45) + 18;
    const job = OCCUPATIONS[(seedValue++) % OCCUPATIONS.length];
    const stressor = STRESSORS[(seedValue++) % STRESSORS.length];
    const timeline = TIMELINES[(seedValue++) % TIMELINES.length];

    const data = b.generate(name, age, job, stressor, timeline);
    const originalOptions = [...data.options];
    const correctText = originalOptions[0];
    const shuffledOptions = [...originalOptions].sort(() => Math.random() - 0.5);

    result.push({
      category: data.category,
      vignette: data.vignette,
      options: shuffledOptions,
      correctIndex: shuffledOptions.indexOf(correctText),
      explanation: data.explanation,
      source: 'dsm5',
      difficulty: 'hard',
      topic: b.topic
    });
    usedDisorders.add(b.topic);
    addedClinical++;
  }
  // If we still need more clinical, generate them procedurally with fresh random variables (making vignettes unique)
  while (addedClinical < clinicalPortion) {
    const blueprint = getRandomItem(DSM5_BLUEPRINTS);
    const name = NAMES[(seedValue++) % NAMES.length];
    const age = Math.floor(seedValue % 45) + 18;
    const job = OCCUPATIONS[(seedValue++) % OCCUPATIONS.length];
    const stressor = STRESSORS[(seedValue++) % STRESSORS.length];
    const timeline = TIMELINES[(seedValue++) % TIMELINES.length];

    const data = blueprint.generate(name, age, job, stressor, timeline);
    const originalOptions = [...data.options];
    const correctText = originalOptions[0];
    const shuffledOptions = [...originalOptions].sort(() => Math.random() - 0.5);

    result.push({
      category: data.category,
      vignette: data.vignette,
      options: shuffledOptions,
      correctIndex: shuffledOptions.indexOf(correctText),
      explanation: data.explanation,
      source: 'dsm5',
      difficulty: 'hard',
      topic: blueprint.topic
    });
    addedClinical++;
  }

  // 2. Assessment portion (Psychological Tests)
  let addedAssessment = 0;
  const testPool = [...TESTS].sort(() => Math.random() - 0.5);
  for (const test of testPool) {
    if (addedAssessment >= assessmentsPortion) break;
    const testModeSeed = Math.floor(Math.random() * 100);
    const generatedQ = generateLocalQuestionForTest(test, testModeSeed);
    result.push(generatedQ);
    usedTestIds.add(test.id);
    addedAssessment++;
  }
  while (addedAssessment < assessmentsPortion) {
    const randomTest = getRandomItem(TESTS);
    const testModeSeed = Math.floor(Math.random() * 100);
    const generatedQ = generateLocalQuestionForTest(randomTest, testModeSeed);
    result.push(generatedQ);
    addedAssessment++;
  }

  // 3. Pharmacological portion
  let addedPharma = 0;
  const pharmaPool = [...PHARMA_BLUEPRINTS].sort(() => Math.random() - 0.5);
  for (const b of pharmaPool) {
    if (addedPharma >= pharmaPortion) break;
    const name = NAMES[(seedValue++) % NAMES.length];
    const age = Math.floor(seedValue % 45) + 18;
    const job = OCCUPATIONS[(seedValue++) % OCCUPATIONS.length];
    const stressor = STRESSORS[(seedValue++) % STRESSORS.length];
    const timeline = TIMELINES[(seedValue++) % TIMELINES.length];

    const data = b.generate(name, age, job, stressor, timeline);
    const originalOptions = [...data.options];
    const correctText = originalOptions[0];
    const shuffledOptions = [...originalOptions].sort(() => Math.random() - 0.5);

    result.push({
      category: data.category,
      vignette: data.vignette,
      options: shuffledOptions,
      correctIndex: shuffledOptions.indexOf(correctText),
      explanation: data.explanation,
      source: 'pharma',
      difficulty: 'medium',
      topic: b.topic
    });
    usedPharmaDrugs.add(b.topic);
    addedPharma++;
  }
  while (addedPharma < pharmaPortion) {
    const blueprint = getRandomItem(PHARMA_BLUEPRINTS);
    const name = NAMES[(seedValue++) % NAMES.length];
    const age = Math.floor(seedValue % 45) + 18;
    const job = OCCUPATIONS[(seedValue++) % OCCUPATIONS.length];
    const stressor = STRESSORS[(seedValue++) % STRESSORS.length];
    const timeline = TIMELINES[(seedValue++) % TIMELINES.length];

    const data = blueprint.generate(name, age, job, stressor, timeline);
    const originalOptions = [...data.options];
    const correctText = originalOptions[0];
    const shuffledOptions = [...originalOptions].sort(() => Math.random() - 0.5);

    result.push({
      category: data.category,
      vignette: data.vignette,
      options: shuffledOptions,
      correctIndex: shuffledOptions.indexOf(correctText),
      explanation: data.explanation,
      source: 'pharma',
      difficulty: 'medium',
      topic: blueprint.topic
    });
    addedPharma++;
  }

  // 4. Developmental portion
  let addedDev = 0;
  const devPool = [...DEV_BLUEPRINTS].sort(() => Math.random() - 0.5);
  for (const b of devPool) {
    if (addedDev >= devPortion) break;
    const name = NAMES[(seedValue++) % NAMES.length];
    const age = Math.floor(seedValue % 45) + 18;
    const job = OCCUPATIONS[(seedValue++) % OCCUPATIONS.length];
    const stressor = STRESSORS[(seedValue++) % STRESSORS.length];
    const timeline = TIMELINES[(seedValue++) % TIMELINES.length];

    const data = b.generate(name, age, job, stressor, timeline);
    const originalOptions = [...data.options];
    const correctText = originalOptions[0];
    const shuffledOptions = [...originalOptions].sort(() => Math.random() - 0.5);

    result.push({
      category: data.category,
      vignette: data.vignette,
      options: shuffledOptions,
      correctIndex: shuffledOptions.indexOf(correctText),
      explanation: data.explanation,
      source: 'dev',
      difficulty: 'medium',
      topic: b.topic
    });
    usedDevTheories.add(b.topic);
    addedDev++;
  }
  while (addedDev < devPortion) {
    const blueprint = getRandomItem(DEV_BLUEPRINTS);
    const name = NAMES[(seedValue++) % NAMES.length];
    const age = Math.floor(seedValue % 45) + 18;
    const job = OCCUPATIONS[(seedValue++) % OCCUPATIONS.length];
    const stressor = STRESSORS[(seedValue++) % STRESSORS.length];
    const timeline = TIMELINES[(seedValue++) % TIMELINES.length];

    const data = blueprint.generate(name, age, job, stressor, timeline);
    const originalOptions = [...data.options];
    const correctText = originalOptions[0];
    const shuffledOptions = [...originalOptions].sort(() => Math.random() - 0.5);

    result.push({
      category: data.category,
      vignette: data.vignette,
      options: shuffledOptions,
      correctIndex: shuffledOptions.indexOf(correctText),
      explanation: data.explanation,
      source: 'dev',
      difficulty: 'medium',
      topic: blueprint.topic
    });
    addedDev++;
  }

  // 5. Ethics portion (PAP Code of Ethics)
  let addedEthics = 0;
  const ethicsPool = [...ETHICS_BLUEPRINTS].sort(() => Math.random() - 0.5);
  for (const b of ethicsPool) {
    if (addedEthics >= ethicsPortion) break;
    const name = NAMES[(seedValue++) % NAMES.length];
    const age = Math.floor(seedValue % 45) + 18;
    const job = OCCUPATIONS[(seedValue++) % OCCUPATIONS.length];
    const stressor = STRESSORS[(seedValue++) % STRESSORS.length];
    const timeline = TIMELINES[(seedValue++) % TIMELINES.length];

    const data = b.generate(name, age, job, stressor, timeline);
    const originalOptions = [...data.options];
    const correctText = originalOptions[0];
    const shuffledOptions = [...originalOptions].sort(() => Math.random() - 0.5);

    result.push({
      category: data.category,
      vignette: data.vignette,
      options: shuffledOptions,
      correctIndex: shuffledOptions.indexOf(correctText),
      explanation: data.explanation,
      source: 'ethics',
      difficulty: 'medium',
      topic: b.topic
    });
    addedEthics++;
  }
  while (addedEthics < ethicsPortion) {
    const blueprint = getRandomItem(ETHICS_BLUEPRINTS);
    const name = NAMES[(seedValue++) % NAMES.length];
    const age = Math.floor(seedValue % 45) + 18;
    const job = OCCUPATIONS[(seedValue++) % OCCUPATIONS.length];
    const stressor = STRESSORS[(seedValue++) % STRESSORS.length];
    const timeline = TIMELINES[(seedValue++) % TIMELINES.length];

    const data = blueprint.generate(name, age, job, stressor, timeline);
    const originalOptions = [...data.options];
    const correctText = originalOptions[0];
    const shuffledOptions = [...originalOptions].sort(() => Math.random() - 0.5);

    result.push({
      category: data.category,
      vignette: data.vignette,
      options: shuffledOptions,
      correctIndex: shuffledOptions.indexOf(correctText),
      explanation: data.explanation,
      source: 'ethics',
      difficulty: 'medium',
      topic: blueprint.topic
    });
    addedEthics++;
  }

  // 6. I/O portion
  let addedIo = 0;
  const ioPool = [...IO_BLUEPRINTS].sort(() => Math.random() - 0.5);
  for (const b of ioPool) {
    if (addedIo >= ioPortion) break;
    const name = NAMES[(seedValue++) % NAMES.length];
    const age = Math.floor(seedValue % 45) + 18;
    const job = OCCUPATIONS[(seedValue++) % OCCUPATIONS.length];
    const stressor = STRESSORS[(seedValue++) % STRESSORS.length];
    const timeline = TIMELINES[(seedValue++) % TIMELINES.length];

    const data = b.generate(name, age, job, stressor, timeline);
    const originalOptions = [...data.options];
    const correctText = originalOptions[0];
    const shuffledOptions = [...originalOptions].sort(() => Math.random() - 0.5);

    result.push({
      category: data.category,
      vignette: data.vignette,
      options: shuffledOptions,
      correctIndex: shuffledOptions.indexOf(correctText),
      explanation: data.explanation,
      source: 'io',
      difficulty: 'medium',
      topic: b.topic
    });
    usedIoTheories.add(b.topic);
    addedIo++;
  }
  while (addedIo < ioPortion) {
    const blueprint = getRandomItem(IO_BLUEPRINTS);
    const name = NAMES[(seedValue++) % NAMES.length];
    const age = Math.floor(seedValue % 45) + 18;
    const job = OCCUPATIONS[(seedValue++) % OCCUPATIONS.length];
    const stressor = STRESSORS[(seedValue++) % STRESSORS.length];
    const timeline = TIMELINES[(seedValue++) % TIMELINES.length];

    const data = blueprint.generate(name, age, job, stressor, timeline);
    const originalOptions = [...data.options];
    const correctText = originalOptions[0];
    const shuffledOptions = [...originalOptions].sort(() => Math.random() - 0.5);

    result.push({
      category: data.category,
      vignette: data.vignette,
      options: shuffledOptions,
      correctIndex: shuffledOptions.indexOf(correctText),
      explanation: data.explanation,
      source: 'io',
      difficulty: 'medium',
      topic: blueprint.topic
    });
    addedIo++;
  }

  // Scramble the whole exam questions so the whole shuffled
  return result.sort(() => Math.random() - 0.5);
}

