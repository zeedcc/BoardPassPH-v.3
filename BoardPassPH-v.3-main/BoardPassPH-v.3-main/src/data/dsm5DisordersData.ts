export interface Dsm5Disorder {
  id: string;
  name: string;
  category: string;
  description: string;
  specifiers: string;
  gender: string;
  duration: string;
  onset: string;
  differentialDiagnosis: string;
}

export const DSM5_CATEGORIES = [
  "Neurodevelopmental Disorders",
  "Schizophrenia Spectrum & Psychotic",
  "Bipolar and Related Disorders",
  "Depressive Disorders",
  "Anxiety Disorders",
  "Obsessive-Compulsive & Related",
  "Trauma & Stressor-Related",
  "Dissociative Disorders",
  "Somatic Symptom & Related",
  "Feeding and Eating Disorders",
  "Elimination Disorders",
  "Sleep-Wake Disorders",
  "Sexual Dysfunctions",
  "Gender Dysphoria",
  "Disruptive, Impulse-Control, & Conduct",
  "Substance-Related & Addictive",
  "Neurocognitive Disorders",
  "Personality Disorders",
  "Paraphilic Disorders"
];

export const DSM5_DISORDERS: Dsm5Disorder[] = [
  // --- Neurodevelopmental Disorders ---
  {
    id: "gdd",
    name: "Global Developmental Delay",
    category: "Neurodevelopmental Disorders",
    description: "Diagnosed in individuals under the age of 5 when clinical severity level cannot be reliably assessed during early childhood. The child fails to meet expected developmental milestones in several areas.",
    specifiers: "None (Severity unspecified)",
    gender: "Slightly more common in males.",
    duration: "Ongoing; requires reassessment over time.",
    onset: "Early infancy / Toddlerhood.",
    differentialDiagnosis: "Intellectual Disability (if over age 5), sensory impairments, environmental deprivation."
  },
  {
    id: "language-disorder",
    name: "Language Disorder",
    category: "Neurodevelopmental Disorders",
    description: "Persistent difficulties in the acquisition and use of language across modalities (spoken, written, sign language) due to deficits in comprehension or production.",
    specifiers: "Specify if associated with a medical, genetic, or environmental condition.",
    gender: "More common in males (approx. 2:1 ratio).",
    duration: "Persistent; symptoms stabilize over adolescence.",
    onset: "Early developmental period (usually by age 4).",
    differentialDiagnosis: "Speech Sound Disorder, selective mutism, Autism Spectrum Disorder, intellectual disability."
  },
  {
    id: "speech-sound-disorder",
    name: "Speech Sound Disorder",
    category: "Neurodevelopmental Disorders",
    description: "Persistent difficulty with speech sound production that interferes with speech intelligibility or prevents verbal communication of messages.",
    specifiers: "Specify if associated with cleft palate, neuromuscular conditions, or hearing loss.",
    gender: "Higher prevalence in males.",
    duration: "Generally lifelong without early speech therapy intervention.",
    onset: "Early developmental period (typically apparent by age 3).",
    differentialDiagnosis: "Normal developmental pronunciation, physical structural abnormalities, dysarthria."
  },
  {
    id: "unspecified-intellectual-disability",
    name: "Unspecified Intellectual Disability (Intellectual Developmental Disorder)",
    category: "Neurodevelopmental Disorders",
    description: "Reserved for individuals over age 5 when assessment of intellectual disability is rendered difficult or impossible because of associated sensory or physical impairments.",
    specifiers: "Requires periodical diagnostic re-evaluations.",
    gender: "Slightly higher male predisposition.",
    duration: "Persistent / lifelong.",
    onset: "Early developmental epoch.",
    differentialDiagnosis: "Global Developmental Delay (typically for under age 5), specific learning disabilities."
  },
  {
    id: "childhood-onset-fluency-disorder",
    name: "Childhood-Onset Fluency Disorder (Stuttering)",
    category: "Neurodevelopmental Disorders",
    description: "Disturbances in the normal fluency and time patterning of speech that are inappropriate for the individual's age and language skills.",
    specifiers: "Specify if mild, moderate, or severe.",
    gender: "Male-to-female ratio is about 3:1 in children, rising to 4:1 in adults.",
    duration: "Persistent; peak recovery occurs if resolved before puberty.",
    onset: "Developmental period (usually between ages 2 and 7 years).",
    differentialDiagnosis: "Sensory deficits, neurological stuttering, adult speech disfluency."
  },
  {
    id: "social-pragmatic-communication-disorder",
    name: "Social (Pragmatic) Communication Disorder",
    category: "Neurodevelopmental Disorders",
    description: "Primary difficulty in the social use of verbal and nonverbal communication, including greeting, sharing information, and following conversational patterns.",
    specifiers: "Specify severity level.",
    gender: "Preponderance in males.",
    duration: "Ongoing; manifests clearly once conversational demands exceed capacity.",
    onset: "Usually fully recognizable by age 4 or 5.",
    differentialDiagnosis: "Autism Spectrum Disorder (pragmatic disorder lacks restricted/repetitive patterns), ADHD, Social Anxiety."
  },
  {
    id: "unspecified-communication-disorder",
    name: "Unspecified Communication Disorder",
    category: "Neurodevelopmental Disorders",
    description: "Symptoms of communication disorder cause impairment but do not meet the full criteria for any of the specific pragmatic, language, or speech disorders.",
    specifiers: "None.",
    gender: "No consensus.",
    duration: "Variable.",
    onset: "Early dev period.",
    differentialDiagnosis: "Full diagnoses of speech/language disorders."
  },
  {
    id: "asd",
    name: "Autism Spectrum Disorder",
    category: "Neurodevelopmental Disorders",
    description: "Continuous deficits in social communication and social interaction across multiple contexts, matched with restricted, repetitive patterns of behavior, interests, or activities.",
    specifiers: "With/without accompanying intellectual impairment; standard language impairment; associated with medical/genetic conditions; severity levels (1, 2, or 3 based on support needed).",
    gender: "More common in males (4:1 ratio; girls are often underdiagnosed).",
    duration: "Lifelong; social adaptive skills vary based on early intervention and support.",
    onset: "Usually identified during the second year of life (12 to 24 months).",
    differentialDiagnosis: "Social Communication Disorder (lacks repetitive behaviors), Rett Syndrome, ADHD, Intellectual Disability."
  },
  {
    id: "adhd",
    name: "ADHD (Attention-Deficit/Hyperactivity Disorder)",
    category: "Neurodevelopmental Disorders",
    description: "A persistent pattern of inattention and/or hyperactivity-impulsivity that interferes with functioning or development, presenting in two or more settings.",
    specifiers: "Combined presentation, Predominantly inattentive, Predominantly hyperactive/impulsive; Severity: Mild, Moderate, Severe; In partial remission.",
    gender: "More frequent in males (approx. 2:1 ratio in children, 1.6:1 in adults). Females present more with inattention.",
    duration: "Symptoms must persist for at least 6 months.",
    onset: "Multiple symptoms must be present before age 12.",
    differentialDiagnosis: "Oppositional Defiant Disorder, Anxiety disorders, Bipolar disorder, Specific learning disorders."
  },
  {
    id: "other-specified-adhd",
    name: "Other Specified Attention-Deficit/Hyperactivity Disorder",
    category: "Neurodevelopmental Disorders",
    description: "Symptoms characteristic of ADHD that cause clinically significant distress but do not meet full criteria. Specified reason (e.g., inattention with insufficient symptom count).",
    specifiers: "Specific atypical clinical reasons provided by clinician.",
    gender: "Similar to ADHD.",
    duration: "At least 6 months.",
    onset: "Typically childhood / early development.",
    differentialDiagnosis: "Subthreshold ADHD, Anxiety, situational stress."
  },
  {
    id: "unspecified-adhd",
    name: "Unspecified Attention-Deficit/Hyperactivity Disorder",
    category: "Neurodevelopmental Disorders",
    description: "ADHD-like presentations where the clinician chooses not to specify the exact reason that criteria are not met, often in emergency department or triage settings.",
    specifiers: "None.",
    gender: "Similar to ADHD.",
    duration: "Unspecified.",
    onset: "Childhood.",
    differentialDiagnosis: "Malingering, general situational distraction."
  },
  {
    id: "specific-learning-disorder",
    name: "Specific Learning Disorder",
    category: "Neurodevelopmental Disorders",
    description: "Persistent difficulties learning and using academic skills (reading, writing, or mathematics) that are substantially below those expected for chronological age.",
    specifiers: "With impairment in reading (dyslexia), written expression (dysgraphia), or mathematics (dyscalculia). Specify severity: Mild, Moderate, Severe.",
    gender: "More common in males (estimates range from 2:1 to 3:1).",
    duration: "Must persist for at least 6 months despite targeted educational interventions.",
    onset: "School-age years (may not fully manifest until academic demands exceed capacity).",
    differentialDiagnosis: "Intellectual developmental disorder, sensory deficits, inadequate instruction, ADHD."
  },
  {
    id: "developmental-coordination-disorder",
    name: "Developmental Coordination Disorder",
    category: "Neurodevelopmental Disorders",
    description: "Acquisition and execution of coordinated motor skills is substantially below expected levels, manifesting as clumsiness, slowness, and inaccuracy of motor skills.",
    specifiers: "Associated with medical conditions or genetic markers.",
    gender: "Slight male predominance (ranging from 2:1 to 7:1).",
    duration: "Lifelong; can be compensated for during adulthood.",
    onset: "Early developmental period.",
    differentialDiagnosis: "Cerebral palsy, muscular dystrophy, ADHD."
  },
  {
    id: "stereotypic-movement-disorder",
    name: "Stereotypic Movement Disorder",
    category: "Neurodevelopmental Disorders",
    description: "Repetitive, seemingly driven, and nonfunctional motor behavior (e.g., hand shaking, body rocking, head banging) that interferes with activities or results in self-injury.",
    specifiers: "With or without self-injurious behavior; associated with known medical/genetic conditions; Severity: Mild, Moderate, Severe.",
    gender: "Preponderance in males.",
    duration: "Variable; often resolves or persists depending on intellectual capacity.",
    onset: "Early developmental period (usually prior to school age).",
    differentialDiagnosis: "Tourette\'s disorder, Autism Spectrum Disorder, Trichotillomania, OCD."
  },
  {
    id: "tourettes-disorder",
    name: "Tourette’s Disorder",
    category: "Neurodevelopmental Disorders",
    description: "Both multiple motor tics and one or more vocal tics have been present at some point during the illness, though not necessarily concurrently.",
    specifiers: "None.",
    gender: "More common in males (approx. 3:1 to 4:1 ratio).",
    duration: "Tics may wax and wane in frequency but must have persisted for more than 1 year.",
    onset: "Always before age 18.",
    differentialDiagnosis: "Persistent (Chronic) Motor or Vocal Tic Disorder, Myoclonus, OCD."
  },
  {
    id: "persistent-chronic-motor-vocal-tic-disorder",
    name: "Persistent (Chronic) Motor or Vocal Tic Disorder",
    category: "Neurodevelopmental Disorders",
    description: "Single or multiple motor or vocal tics have been present, but NOT both motor and vocal concurrently.",
    specifiers: "With motor tics only OR with vocal tics only.",
    gender: "Higher male prevalence.",
    duration: "Persisted for more than 1 year.",
    onset: "Before age 18.",
    differentialDiagnosis: "Tourette’s disorder (which requires both), Provisional Tic Disorder."
  },
  {
    id: "provisional-tic-disorder",
    name: "Provisional Tic Disorder",
    category: "Neurodevelopmental Disorders",
    description: "Single or multiple motor and/or vocal tics are present, but fail to satisfy the chronic duration requirements.",
    specifiers: "None.",
    gender: "More common in males.",
    duration: "Present for less than 1 year since the very first tic onset.",
    onset: "Before age 18.",
    differentialDiagnosis: "Tourette’s disorder, Persistent Motor or Vocal Tic Disorder."
  },
  {
    id: "other-specified-tic-disorder",
    name: "Other Specified Tic Disorder",
    category: "Neurodevelopmental Disorders",
    description: "Tic presentations that cause distress but do not meet full criteria. Reason is specified (e.g., late-onset tics in adulthood).",
    specifiers: "Specify reason (e.g., onset after age 18).",
    gender: "Varies.",
    duration: "Varies.",
    onset: "Adulthood or atypical childhood.",
    differentialDiagnosis: "Secondary tics, substance-induced tics."
  },
  {
    id: "unspecified-tic-disorder",
    name: "Unspecified Tic Disorder",
    category: "Neurodevelopmental Disorders",
    description: "Symptoms characteristic of tics cause significant impairment but clinician choose not to specify the exact criteria missing.",
    specifiers: "None.",
    gender: "Higher in males.",
    duration: "Flexible.",
    onset: "Variable.",
    differentialDiagnosis: "Myoclonus, stereotypies, chorea."
  },

  // --- Schizophrenia Spectrum and Other Psychotic Disorders ---
  {
    id: "schizotypal-disorder",
    name: "Schizotypal (Personality) Disorder",
    category: "Schizophrenia Spectrum & Psychotic",
    description: "A pervasive pattern of social and interpersonal deficits marked by acute discomfort with, and reduced capacity for, close relationships, alongside cognitive or perceptual distortions and eccentricities.",
    specifiers: "Can be coded also as a Personality Disorder under Cluster A.",
    gender: "Slightly more common in males.",
    duration: "Persistent, lifelong (stable course).",
    onset: "Early adulthood, though traits may appear in childhood.",
    differentialDiagnosis: "Schizophrenia, delusional disorder, Autism Spectrum Disorder."
  },
  {
    id: "delusional-disorder",
    name: "Delusional Disorder",
    category: "Schizophrenia Spectrum & Psychotic",
    description: "The presence of one or more delusions with a duration of 1 month or longer, without the active-phase symptoms of Schizophrenia (e.g., no prominent hallucinations or disorganized speech).",
    specifiers: "Erotomanic type, Grandiose type, Jealous type, Persecutory type, Somatic type, Mixed type, Unspecified type; With bizarre content.",
    gender: "No major overall gender differences, though persecutory type is slightly more common in males.",
    duration: "Delusions must persist for at least 1 month.",
    onset: "Typically middle-to-late adulthood.",
    differentialDiagnosis: "Schizophrenia, Obsessive-Compulsive Disorder, Major Depressive or Bipolar Disorder with psychotic features."
  },
  {
    id: "brief-psychotic-disorder",
    name: "Brief Psychotic Disorder",
    category: "Schizophrenia Spectrum & Psychotic",
    description: "An acute, sudden onset of at least one positive psychotic symptom (delusions, hallucinations, disorganized speech, or grossly disorganized behavior).",
    specifiers: "With marked stressors (brief reactive psychosis), Without marked stressors, With postpartum onset (during pregnancy or within 4 weeks postpartum); With catatonia.",
    gender: "Twice as common in females.",
    duration: "At least 1 day but less than 1 month, with a complete return to premorbid functioning.",
    onset: "Any stage of life, average age of onset is mid-30s.",
    differentialDiagnosis: "Schizophreniform Disorder, substance-induced psychotic disorder, malingering."
  },
  {
    id: "schizophreniform-disorder",
    name: "Schizophreniform Disorder",
    category: "Schizophrenia Spectrum & Psychotic",
    description: "An intermediate psychotic disorder whose symptoms are identical to Schizophrenia but differ in overall duration and lack of required social/occupational decline.",
    specifiers: "With good prognostic features, Without good prognostic features; With catatonia.",
    gender: "Equally distributed among males and females.",
    duration: "At least 1 month but less than 6 months (acts as a provisional diagnosis before Schizophrenia).",
    onset: "Late adolescence to early adulthood.",
    differentialDiagnosis: "Brief Psychotic Disorder (under 1 month), Schizophrenia (reaches 6 months), major depressive with psychotic features."
  },
  {
    id: "schizophrenia",
    name: "Schizophrenia",
    category: "Schizophrenia Spectrum & Psychotic",
    description: "A severe mental disorder characterized by disruptions in thought processes, perceptions, emotional responsiveness, and social interactions, featuring active, prodromal, or residual phases.",
    specifiers: "First episode (currently in acute/partial/full remission), Multiple episodes, Continuous; With catatonia; Severity of positive/negative symptoms.",
    gender: "Slightly more common and has an earlier onset in males.",
    duration: "Continuous signs of the disturbance must persist for at least 6 months, including at least 1 month of active-phase symptoms.",
    onset: "Late adolescence to mid-30s; males peak in early-20s, females in late-20s / early-30s.",
    differentialDiagnosis: "Schizoaffective Disorder, Sch schizophreniform, Delusional disorder, Bipolar with psychotic features."
  },
  {
    id: "schizoaffective-disorder",
    name: "Schizoaffective Disorder",
    category: "Schizophrenia Spectrum & Psychotic",
    description: "An uninterrupted period of illness during which there is a major mood episode (major depressive or manic) concurrent with active-phase symptoms of Schizophrenia.",
    specifiers: "Bipolar type (manic or manic/depressive), Depressive type (only depressive episodes); With catatonia.",
    gender: "More common in females (owing to the increased prevalence of depressive symptoms in women).",
    duration: "Delusions or hallucinations must be present for 2 or more weeks in the ABSENCE of a major mood episode at some point during the life duration of the illness.",
    onset: "Early adulthood.",
    differentialDiagnosis: "Schizophrenia, Bipolar with psychotic features, Major Depressive Disorder with psychotic features."
  },
  {
    id: "substance-medication-induced-psychotic-disorder",
    name: "Substance/Medication-Induced Psychotic Disorder",
    category: "Schizophrenia Spectrum & Psychotic",
    description: "Prominent delusions or hallucinations that develop during or soon after substance intoxication, withdrawal, or exposure to a medication.",
    specifiers: "With onset during intoxication OR with onset during withdrawal.",
    gender: "Varies depending on substance preference.",
    duration: "Variable; resolves as substance clears (under 1 month of abstinence).",
    onset: "Any age linked to substance usage.",
    differentialDiagnosis: "Delirium, primary psychotic disorders (which persist long after detoxification)."
  },
  {
    id: "psychotic-disorder-due-to-another-medical-condition",
    name: "Psychotic Disorder Due to Another Medical Condition",
    category: "Schizophrenia Spectrum & Psychotic",
    description: "Prominent hallucinations or delusions that are established as a direct pathophysiological consequence of another general medical disease (e.g., temporal lobe epilepsy).",
    specifiers: "With delusions OR with hallucinations.",
    gender: "Equal gender distribution.",
    duration: "Variable; follows the clinical course of the primary illness.",
    onset: "Any age, tied to the onset of the medical pathology.",
    differentialDiagnosis: "Delirium, substance-induced psychosis, Schizophrenia."
  },
  {
    id: "catatonia-specifier",
    name: "Catatonia Associated With Another Mental Disorder (Catatonia Specifier)",
    category: "Schizophrenia Spectrum & Psychotic",
    description: "A clinical syndrome of extreme psychomotor disturbance characterized by at least three clinical features such as stupor, catalepsy, waxy flexibility, mutism, negativism, posturing, mannerisms, stereotypes, agitation, grimacing, echolalia, or echopraxia.",
    specifiers: "Specifier applied to neurodevelopmental, psychotic, bipolar, or depressive conditions.",
    gender: "Dependent on primary diagnosis.",
    duration: "Tied to primary underlying psychiatric condition.",
    onset: "Varies based on underlying trigger.",
    differentialDiagnosis: "Neuroleptic malignant syndrome, catatonic state due to medical illness, encephalopathy."
  },
  {
    id: "catatonic-disorder-due-to-medical-condition",
    name: "Catatonic Disorder Due to Another Medical Condition",
    category: "Schizophrenia Spectrum & Psychotic",
    description: "Full catatonic symptoms are present and proven to be direct physiological results of an active medical diagnosis.",
    specifiers: "None.",
    gender: "Varies by medical etiology.",
    duration: "Co-occurs with the duration of physical pathology.",
    onset: "Any age, corresponding to somatic onset.",
    differentialDiagnosis: "Primary Catatonia Specifier, Delirium."
  },
  {
    id: "unspecified-catatonia",
    name: "Unspecified Catatonia",
    category: "Schizophrenia Spectrum & Psychotic",
    description: "Catatonia-like presentation where the underlying cause is not yet clear, or full diagnostic criteria cannot be completed immediately.",
    specifiers: "None.",
    gender: "Balanced.",
    duration: "Temporary / Acute.",
    onset: "Acute adult or child presentation.",
    differentialDiagnosis: "Psychomotor retardation, catatonic disorder."
  },
  {
    id: "other-specified-schizophrenia-spectrum",
    name: "Other Specified Schizophrenia Spectrum and Other Psychotic Disorder",
    category: "Schizophrenia Spectrum & Psychotic",
    description: "Psychotic symptoms causing distress but not meeting full diagnostic thresholds, used when specifying the reasoning (e.g., persistent auditory hallucinations in the absence of other symptoms).",
    specifiers: "Persistent auditory hallucinations, delusional symptoms with overlapping mood, etc.",
    gender: "Equal.",
    duration: "Variable.",
    onset: "Atypical.",
    differentialDiagnosis: "Delusional disorder, Schizophrenia."
  },
  {
    id: "unspecified-schizophrenia-spectrum",
    name: "Unspecified Schizophrenia Spectrum and Other Psychotic Disorder",
    category: "Schizophrenia Spectrum & Psychotic",
    description: "Psychotic symptoms present but clinician choose not to specify the exact reason due to insufficient diagnostic information.",
    specifiers: "None.",
    gender: "Minimal gender variation.",
    duration: "Varies.",
    onset: "Flexible.",
    differentialDiagnosis: "Schizophrenia, substance abuse."
  },

  // --- Bipolar and Related Disorders ---
  {
    id: "bipolar-i-disorder",
    name: "Bipolar I Disorder",
    category: "Bipolar and Related Disorders",
    description: "Characterized by the occurrence of at least one manic episode in a person\'s lifetime. Major depressive or hypomanic episodes are common but NOT required for diagnosis.",
    specifiers: "Mild, Moderate, Severe; With anxious distress, With mixed features, With rapid cycling, With melancholic features; With psychotic features; With catatonia; With peripartum onset; With seasonal pattern.",
    gender: "Equally common in males and females. Males present more with mania first; females with depression first.",
    duration: "Manic episode must last at least 1 week (or any duration if hospitalization is required).",
    onset: "Mean age of onset is approximately 18 years.",
    differentialDiagnosis: "MDD, Bipolar II, Schizoaffective Disorder, ADHD, Borderline Personality Disorder."
  },
  {
    id: "bipolar-ii-disorder",
    name: "Bipolar II Disorder",
    category: "Bipolar and Related Disorders",
    description: "Requires the lifetime occurrence of at least one hypomanic episode AND at least one major depressive episode, with no history of any manic episodes.",
    specifiers: "Same specifiers as Bipolar I (e.g., rapid cycling, anxious distress).",
    gender: "Higher prevalence in females (who report greater depressive frequency).",
    duration: "Hypomanic symptoms must last at least 4 consecutive days, and depressive symptoms at least 2 weeks.",
    onset: "Mid-20s, slightly later than Bipolar I.",
    differentialDiagnosis: "Bipolar I (manic episodes), Cyclothymic Disorder, Borderline Personality Disorder, ADHD."
  },
  {
    id: "cyclothymic-disorder",
    name: "Cyclothymic Disorder",
    category: "Bipolar and Related Disorders",
    description: "A chronic, fluctuating mood disturbance involving numerous periods of hypomanic symptoms and depressive symptoms that do not meet the full diagnostic criteria for episodes.",
    specifiers: "With anxious distress.",
    gender: "Equally distributed in clinical samples, though women seek treatment more frequently.",
    duration: "Symptom fluctuations must persist for at least 2 years in adults (1 year in children/adolescents), with no symptom-free period exceeding 2 months.",
    onset: "Adolescence or early adult life.",
    differentialDiagnosis: "Bipolar I, Bipolar II, MDD, Borderline Personality Disorder."
  },
  {
    id: "substance-medication-induced-bipolar",
    name: "Substance/Medication-Induced Bipolar and Related Disorder",
    category: "Bipolar and Related Disorders",
    description: "Prominent and persistent disturbance in mood (elevated, expansive, or irritable) with or without depressed mood, caused during or shortly after substance usage/withdrawal or medication exposure.",
    specifiers: "With onset during intoxication OR with onset during withdrawal.",
    gender: "Varies depending on substance class.",
    duration: "Elevated mood resolving after substance clearance.",
    onset: "Any age during exposure.",
    differentialDiagnosis: "Primary Bipolar Disorder, steroid-induced mania."
  },
  {
    id: "bipolar-due-to-medical-condition",
    name: "Bipolar and Related Disorder Due to Another Medical Condition",
    category: "Bipolar and Related Disorders",
    description: "Manic, hypomanic, or mixed patterns directly attributable to an underlying genetic or neurological pathology (e.g., hyperthyroidism, stroke).",
    specifiers: "With manic features, With manic- or hypomanic-like episode, With mixed features.",
    gender: "Equal.",
    duration: "Varies based on medical therapy.",
    onset: "Corresponds with endocrine/neurological onset.",
    differentialDiagnosis: "Primary Bipolar I/II, Medication side effects."
  },
  {
    id: "other-specified-bipolar",
    name: "Other Specified Bipolar and Related Disorder",
    category: "Bipolar and Related Disorders",
    description: "Clinically meaningful manic/hypomanic tendencies that fall short of standardized counts or durations (e.g., short-duration cyclothymia).",
    specifiers: "Short-duration hypomania, hypomanic episodes with insufficient symptom count, etc.",
    gender: "Slight female tilt.",
    duration: "Short duration.",
    onset: "Adolescence/Adulthood.",
    differentialDiagnosis: "Cyclothymia, persistent depressive disorder."
  },
  {
    id: "unspecified-bipolar",
    name: "Unspecified Bipolar and Related Disorder",
    category: "Bipolar and Related Disorders",
    description: "Mood presentations that mimic bipolar traits but clinician chooses not to specify the precise threshold discrepancy.",
    specifiers: "None.",
    gender: "Balanced.",
    duration: "Variable.",
    onset: "Varies.",
    differentialDiagnosis: "Bipolar II, general depressive disorders."
  },

  // --- Depressive Disorders ---
  {
    id: "dmdd",
    name: "Disruptive Mood Dysregulation Disorder",
    category: "Depressive Disorders",
    description: "Severe, recurrent temper outbursts (verbal and/or behavioral) that are grossly out of proportion in intensity or duration to the situation, with a persistently irritable mood in between.",
    specifiers: "None.",
    gender: "Far more common in males (typically school-age children).",
    duration: "Outbursts occur 3 or more times per week for 12 or more months, with no symptom-free period exceeding 3 months.",
    onset: "Must be diagnosed between ages 6 and 18; onset must be before age 10.",
    differentialDiagnosis: "ADHD, Oppositional Defiant Disorder, Pediatric Bipolar Disorder (DMDD features non-episodic irritability)."
  },
  {
    id: "mdd",
    name: "Major Depressive Disorder, Single and Recurrent Episodes",
    category: "Depressive Disorders",
    description: "Characterized by 5 or more symptoms of depression present during the same period, including at least depressed mood or loss of interest/pleasure (anhedonia). Can present as a single lifetime episode or recurrent.",
    specifiers: "Mild, Moderate, Severe; With psychotic features; In partial/full remission; With anxious distress; With mixed features; With melancholic features; With atypical features; With catatonia; With peripartum onset; With seasonal pattern.",
    gender: "Females experience a 1.5- to 3-fold higher rate of MDD compared to males starting in early adolescence.",
    duration: "Symptoms must be present during the same 2-week period and represent a change from previous functioning.",
    onset: "May occur at any age; peak onset is the 20s.",
    differentialDiagnosis: "Bipolar disorders (requires no manic/hypomanic), Persistent Depressive Disorder, adjustment disorder with depressed mood."
  },
  {
    id: "dysthymia",
    name: "Persistent Depressive Disorder (Dysthymia)",
    category: "Depressive Disorders",
    description: "A chronic, milder form of depressed mood that occurs for most of the day, for more days than not, accompanied by at least 2 other depressive symptoms.",
    specifiers: "With pure dysthymic syndrome, With persistent major depressive episode, With intermittent major depressive episodes; Mild, Moderate, Severe.",
    gender: "More common in females (up to 2:1 ratio).",
    duration: "Must persist for at least 2 years in adults (1 year in children and adolescents), with no symptom-free intervals exceeding 2 months.",
    onset: "Early and insidious (childhood/adolescence) or late-onset (adulthood).",
    differentialDiagnosis: "MDD (PDD is defined by chronicity over symptom volume), cyclothymic disorder."
  },
  {
    id: "pmdd",
    name: "Premenstrual Dysphoric Disorder",
    category: "Depressive Disorders",
    description: "Severe emotional and physical symptoms (mood swings, irritability, anxiety, lethargy, breast tenderness) that occur repeatedly in the luteal phase of the menstrual cycle.",
    specifiers: "None.",
    gender: "Females only (post-menarche, pre-menopause).",
    duration: "Symptoms improve within a few days after onset of menses and become minimal/absent in the week post-menses.",
    onset: "Any time after menarche.",
    differentialDiagnosis: "Major Depressive Disorder, Panic Disorder, thyroid conditions."
  },
  {
    id: "substance-medication-induced-depressive",
    name: "Substance/Medication-Induced Depressive Disorder",
    category: "Depressive Disorders",
    description: "Persistent and marked depression of mood developed during or soon after substance exposure, medication side effects, or drug detoxification.",
    specifiers: "With onset during intoxication OR with onset during withdrawal.",
    gender: "Varies with the substance class.",
    duration: "Mood returns to normal upon removal of substance.",
    onset: "Linked to toxicological timelines.",
    differentialDiagnosis: "Primary MDD, medical-health depression."
  },
  {
    id: "depressive-due-to-medical-condition",
    name: "Depressive Disorder Due to Another Medical Condition",
    category: "Depressive Disorders",
    description: "Depressive mood symptoms caused directly by organic medical pathologies (such as hypothyroidism, Parkinson\'s disease, or stroke).",
    specifiers: "With depressive features, With major depressive-like episode, With mixed features.",
    gender: "Ties to primary medical disease demographics.",
    duration: "Follows secondary somatic disease pathways.",
    onset: "Concurrent with somatic dysfunction.",
    differentialDiagnosis: "Adjustment disorder, pain-induced depression, Primary MDD."
  },
  {
    id: "other-specified-depressive",
    name: "Other Specified Depressive Disorder",
    category: "Depressive Disorders",
    description: "Depressive episodes causing impairment but falling short of full symptom criteria (e.g., recurrent brief depression).",
    specifiers: "Recurrent brief depression, short-duration depressive episode, etc.",
    gender: "Higher in females.",
    duration: "Typically brief or situational.",
    onset: "Varies.",
    differentialDiagnosis: "Adjustment disorder, normal bereavement."
  },
  {
    id: "unspecified-depressive",
    name: "Unspecified Depressive Disorder",
    category: "Depressive Disorders",
    description: "Depressive symptom presentations where specifying the particular reason is not possible or desired by the practitioner.",
    specifiers: "None.",
    gender: "Balanced.",
    duration: "Variable.",
    onset: "Variable.",
    differentialDiagnosis: "Bipolar disorders, physical health complaints."
  },

  // --- Anxiety Disorders ---
  {
    id: "separation-anxiety-disorder",
    name: "Separation Anxiety Disorder",
    category: "Anxiety Disorders",
    description: "Developmentally inappropriate and excessive fear or anxiety concerning separation from those to whom the individual is attached.",
    specifiers: "None.",
    gender: "Equally distributed in clinical samples, though females show higher rates in community surveys.",
    duration: "Must last at least 4 weeks in children/adolescents, and typically 6 months or more in adults.",
    onset: "Can manifest at any time, but is most frequently diagnosed in childhood.",
    differentialDiagnosis: "Generalized Anxiety Disorder, agoraphobia, panic disorder."
  },
  {
    id: "selective-mutism",
    name: "Selective Mutism",
    category: "Anxiety Disorders",
    description: "Consistent failure to speak in specific social situations in which there is an expectation for speaking (e.g., at school) despite speaking in other situations (e.g., at home).",
    specifiers: "None.",
    gender: "Equally common in males and females.",
    duration: "Must persist for at least 1 month (excluding the first month of a new school environment).",
    onset: "Usually before age 5, though may not come to clinical attention until starting school.",
    differentialDiagnosis: "Communication Disorders, Autism Spectrum Disorder, social anxiety disorder."
  },
  {
    id: "specific-phobia",
    name: "Specific Phobia",
    category: "Anxiety Disorders",
    description: "Marked, persistent, and irrational fear or anxiety about a specific object or situation (e.g., flying, heights, animals, receiving an injection, seeing blood).",
    specifiers: "Animal, Natural environment, Blood-injection-injury, Situational, Other.",
    gender: "Females are more frequently affected (approx. 2:1 ratio), though blood-injection-injury is balanced.",
    duration: "The fear, anxiety, or avoidance is persistent, typically lasting for 6 months or more.",
    onset: "Usually childhood (peaks at age 7 to 11).",
    differentialDiagnosis: "Agoraphobia, OCD, PTSD, social anxiety."
  },
  {
    id: "social-anxiety-disorder",
    name: "Social Anxiety Disorder (Social Phobia)",
    category: "Anxiety Disorders",
    description: "Marked fear or anxiety about one or more social situations in which the individual is exposed to possible scrutiny by others, fearing they will act in a way that is humiliating.",
    specifiers: "Performance only (if fear is restricted to speaking or performing in public).",
    gender: "Slightly higher female prevalence, though males show up more in clinical treatment samples.",
    duration: "Typically lasting for 6 months or more.",
    onset: "Median age of onset is 13 years (often after a humiliating childhood experience).",
    differentialDiagnosis: "Agoraphobia, Panic Disorder, Avoidant Personality Disorder, Schizoid Personality."
  },
  {
    id: "panic-disorder",
    name: "Panic Disorder",
    category: "Anxiety Disorders",
    description: "Recurrent, unexpected panic attacks (abrupt surges of intense fear or discomfort reaching a peak within minutes), followed by at least 1 month of persistent concern about more attacks.",
    specifiers: "None.",
    gender: "Females are affected twice as frequently as males.",
    duration: "At least 1 month of worry, concern, or maladaptive behavior change following attacks.",
    onset: "Median age of onset is 20-24 years.",
    differentialDiagnosis: "Somatic symptom disorder, specific phobia, thyroid conditions, cardiac issues."
  },
  {
    id: "panic-attack-specifier",
    name: "Panic Attack (Specifier)",
    category: "Anxiety Disorders",
    description: "An abrupt surge of intense fear or intense discomfort that reaches a peak within minutes, during which time four or more of a list of symptoms (e.g., sweating, palpitations, trembling, dyspnea) occur.",
    specifiers: "Can be applied as a clinical specifier to any psychiatric diagnosis.",
    gender: "Varies depending on the clinical disorder coded.",
    duration: "Reaches peak within minutes (short-lived, usually under 30 mins).",
    onset: "Sudden / Paroxysmal.",
    differentialDiagnosis: "Phobic panic triggers, organic cardiovascular disease."
  },
  {
    id: "agoraphobia",
    name: "Agoraphobia",
    category: "Anxiety Disorders",
    description: "Marked fear or anxiety about two or more of the following five situations: using public transportation, being in open spaces, being in enclosed places, standing in line/crowds, or being outside of home alone.",
    specifiers: "None.",
    gender: "Twice as common in females.",
    duration: "Usually persistent, lasting for 6 months or more.",
    onset: "Late adolescence/early adulthood, peaking in early 20s.",
    differentialDiagnosis: "Specific Phobia (situational), Social Anxiety, Panic Disorder, PTSD."
  },
  {
    id: "generalized-anxiety-disorder",
    name: "Generalized Anxiety Disorder",
    category: "Anxiety Disorders",
    description: "Excessive, uncontrollable anxiety and worry (apprehensive expectation) occurring more days than not, about a number of events or activities (such as work or school performance).",
    specifiers: "None.",
    gender: "Females are twice as likely as males to experience GAD.",
    duration: "The worry and physical anxiety symptoms must be present for at least 6 months.",
    onset: "Median age of onset is 30 years, though many report lifelong worry.",
    differentialDiagnosis: "MDD, somatic symptom disorder, thyroid hyperactivity, social anxiety."
  },
  {
    id: "substance-medication-induced-anxiety",
    name: "Substance/Medication-Induced Anxiety Disorder",
    category: "Anxiety Disorders",
    description: "Anxiety, panic attacks, or obsession-compulsive symptoms caused quickly as direct consequences of toxic exposure or drug withdrawal.",
    specifiers: "With onset during intoxication, withdrawal, or post-medication use.",
    gender: "Equal overall.",
    duration: "Subsides once toxins are eliminated from systemic pathways.",
    onset: "Concurrent with substance use timeline.",
    differentialDiagnosis: "Primary anxiety conditions, Delirium."
  },
  {
    id: "anxiety-due-to-medical-condition",
    name: "Anxiety Disorder Due to Another Medical Condition",
    category: "Anxiety Disorders",
    description: "Severe anxiety states or localized panics caused directly by physiological consequences of general somatic conditions (e.g., pheochromocytoma).",
    specifiers: "None.",
    gender: "Matches underlying somatic conditions.",
    duration: "Co-occurs with the duration of physical systemic disease.",
    onset: "Varies with physical etiology.",
    differentialDiagnosis: "Grave\'s disease, primary Panic Disorder."
  },
  {
    id: "other-specified-anxiety",
    name: "Other Specified Anxiety Disorder",
    category: "Anxiety Disorders",
    description: "Clinically meaningful anxiety states that fail to meet strict symptom combinations or diagnostic durations (e.g., khyal cap / wind attacks).",
    specifiers: "Cultural syndromes, generalized anxiety with sub-duration, etc.",
    gender: "Preponderance in women.",
    duration: "Atypical.",
    onset: "Atypical.",
    differentialDiagnosis: "Adjustment disorder, normal response to acute stressors."
  },
  {
    id: "unspecified-anxiety",
    name: "Unspecified Anxiety Disorder",
    category: "Anxiety Disorders",
    description: "Anxiety symptoms present but clinician declines to write specific reasons for criteria deficiency.",
    specifiers: "None.",
    gender: "Balanced.",
    duration: "Varies.",
    onset: "Varies.",
    differentialDiagnosis: "Specific phobias, cardiac symptoms."
  },

  // --- Obsessive-Compulsive and Related Disorders ---
  {
    id: "ocd",
    name: "Obsessive-Compulsive Disorder",
    category: "Obsessive-Compulsive & Related",
    description: "The presence of obsessions (recurrent, persistent, intrusive thoughts, urges, or images causing distress) and/or compulsions (repetitive behaviors or mental acts the individual feels driven to perform in response to an obsession).",
    specifiers: "With good or fair insight, With poor insight, With absent insight/delusional beliefs; Tic-related.",
    gender: "Slightly more common in females in adulthood; more common in males in childhood.",
    duration: "The obsessions or compulsions are time-consuming (e.g., take more than 1 hour per day) or cause clinically significant impairment.",
    onset: "Mean age of onset is 19.5 years; childhood onset is common in males.",
    differentialDiagnosis: "Generalized Anxiety Disorder, Major Depressive Disorder, Obsessive-Compulsive Personality Disorder (OCPD lacks true intrusive obsessions and rituals)."
  },
  {
    id: "body-dysmorphic-disorder",
    name: "Body Dysmorphic Disorder",
    category: "Obsessive-Compulsive & Related",
    description: "Preoccupation with one or more perceived defects or flaws in physical appearance that are not observable or appear slight to others, driving repetitive behaviors (mirror checking, grooming) or mental comparisons.",
    specifiers: "With muscle dysmorphia; Insight levels (good/fair, poor, absent/delusional).",
    gender: "Equally common in males and females. Males show higher rate of muscle dysmorphia.",
    duration: "Persistent; causes intense preoccupation, consuming hours daily.",
    onset: "Mean age of onset is 15 years; typically subclinical signs develop by age 12-13.",
    differentialDiagnosis: "Anorexia nervosa (where weight is primary focus), social anxiety, major depression."
  },
  {
    id: "hoarding-disorder",
    name: "Hoarding Disorder",
    category: "Obsessive-Compulsive & Related",
    description: "Persistent difficulty discarding or parting with possessions, regardless of their actual value, due to a perceived need to save items and distress associated with discarding them, stuffing living quarters.",
    specifiers: "With excessive acquisition; Insight levels (good, poor, absent/delusional).",
    gender: "More common in males in epidemiological surveys, but females present to clinical treatment more often.",
    duration: "Chronic, lifelong progression; severity increments across life decades.",
    onset: "Early symptoms start around age 11 to 15, becoming severe as independent living is established in the 20s.",
    differentialDiagnosis: "Organic brain disease, OCD (hoarding is generally ego-syntonic; OCD hoarding is ego-dystonic)."
  },
  {
    id: "trichotillomania",
    name: "Trichotillomania (Hair-Pulling Disorder)",
    category: "Obsessive-Compulsive & Related",
    description: "Recurrent pulling out of one\'s hair, resulting in hair loss, paired with repeated attempts to decrease or stop hair pulling.",
    specifiers: "None.",
    gender: "Much more common in females (approx. 10:1 ratio in adults; closer to equal in children).",
    duration: "Persistent; fluctuates over years if untreated.",
    onset: "Typically coincides with or follows the onset of puberty (age 11 to 13).",
    differentialDiagnosis: "Alopecia (medical), stereotypic movement disorder, body dysmorphic disorder."
  },
  {
    id: "excoriation-disorder",
    name: "Excoriation (Skin-Picking) Disorder",
    category: "Obsessive-Compulsive & Related",
    description: "Recurrent skin picking resulting in skin lesions, accompanied by repeated attempts to decrease or stop skin picking.",
    specifiers: "None.",
    gender: "Much more common in females (approx. 75% or more cases).",
    duration: "Ongoing; can persist for months or years.",
    onset: "Usually during adolescence, frequently co-occurring with acne.",
    differentialDiagnosis: "Scabies/dermatological conditions, OCD, stereotypic movement, self-harm."
  },

  // --- Trauma- and Stressor-Related Disorders ---
  {
    id: "rad",
    name: "Reactive Attachment Disorder",
    category: "Trauma & Stressor-Related",
    description: "A pattern of markedly disturbed and developmentally inappropriate attachment behaviors in which a child rarely or minimally turns to a primary caregiver for comfort, support, or protection.",
    specifiers: "Persistent; Severity: Mild, Moderate, Severe.",
    gender: "Balanced.",
    duration: "Symptoms must be clear before age 5, and child must have a developmental age of at least 9 months.",
    onset: "Always diagnosed in infancy/early childhood; associated with history of severe social neglect.",
    differentialDiagnosis: "Autism Spectrum Disorder, intellectual disability, depressive disorders."
  },
  {
    id: "dised",
    name: "Disinhibited Social Engagement Disorder",
    category: "Trauma & Stressor-Related",
    description: "A pattern of behavior in which a child actively approaches and interacts with unfamiliar adults in an overly familiar, culturally inappropriate way, lacking normal boundaries.",
    specifiers: "Persistent; Severity levels.",
    gender: "Balanced.",
    duration: "Associated with a developmental age of at least 9 months.",
    onset: "Infancy to early childhood, linked to unstable, institutional, or abusive early care environments.",
    differentialDiagnosis: "ADHD (hyperactive traits), Reactive Attachment Disorder."
  },
  {
    id: "ptsd",
    name: "Posttraumatic Stress Disorder",
    category: "Trauma & Stressor-Related",
    description: "Development of characteristic symptoms (intrusion, avoidance, negative alterations in cognitions/mood, and hyperarousal) following exposure to one or more traumatic events (such as combat, sexual assault, or natural disasters).",
    specifiers: "With dissociative symptoms (depersonalization or derealization); With delayed expression (if diagnostic thresholds are not met until 6 months or more after the event); PTSD in children under age 6.",
    gender: "More prevalent and has a longer duration in females.",
    duration: "The symptoms must persist for more than 1 month.",
    onset: "Can occur at any age, beginning from 1 year of age onward.",
    differentialDiagnosis: "Acute Stress Disorder (under 1 month), adjustment disorder, panic disorder, MDD."
  },
  {
    id: "acute-stress-disorder",
    name: "Acute Stress Disorder",
    category: "Trauma & Stressor-Related",
    description: "An acute trauma reaction presenting with intrusion, negative mood, dissociation, avoidance, and arousal symptoms, following immediate exposure to a severe life-threatening stressor.",
    specifiers: "None.",
    gender: "More common in females.",
    duration: "Lasts from 3 days to 1 month maximum following traumatic exposure.",
    onset: "Symptoms develop immediately after the traumatic event.",
    differentialDiagnosis: "PTSD (diagnosed only after 1 month has elapsed), adjustment disorder, brief psychotic reaction."
  },
  {
    id: "adjustment-disorders",
    name: "Adjustment Disorders",
    category: "Trauma & Stressor-Related",
    description: "The development of emotional or behavioral symptoms in response to an identifiable stressor (e.g., divorce, job loss) occurring within 3 months of the onset of the stressor.",
    specifiers: "With depressed mood, With anxiety, With mixed anxiety and depressed mood, With disturbance of conduct, With mixed disturbance of emotions and conduct, Unspecified.",
    gender: "Equally diagnosed in males and females.",
    duration: "Once the stressor or its consequences have terminated, symptoms do not persist for more than an additional 6 months.",
    onset: "Within 3 months of stressor onset.",
    differentialDiagnosis: "Major Depressive Disorder, PTSD, bereavement, generalized anxiety."
  },

  // --- Dissociative Disorders ---
  {
    id: "did",
    name: "Dissociative Identity Disorder",
    category: "Dissociative Disorders",
    description: "The disruption of identity characterized by two or more distinct personality states (alters) or an experience of possession, accompanied by recurrent gaps in the recall of everyday events or trauma.",
    specifiers: "None.",
    gender: "Prevalence is high in females in clinical settings, who typically present with more acute somatic and dissociative traits than males.",
    duration: "Chronic, fluctuating course.",
    onset: "Almost always associated with early childhood trauma (abuse or severe neglect) before age 9.",
    differentialDiagnosis: "Borderline Personality Disorder, Schizophrenia, rapid cycling Bipolar, PTSD."
  },
  {
    id: "dissociative-amnesia",
    name: "Dissociative Amnesia",
    category: "Dissociative Disorders",
    description: "An inability to recall important autobiographical information, usually of a traumatic or stressful nature, that is inconsistent with ordinary forgetting.",
    specifiers: "With dissociative fugue (characterized by purposeful travel or bewildered wandering associated with identity amnesia).",
    gender: "More common in females.",
    duration: "Acute, variable duration; memory recovery can be sudden or gradual.",
    onset: "Any age, following traumatic physical/emotional stress.",
    differentialDiagnosis: "Organic amnesic disorders, traumatic brain injury, substance-induced memory loss."
  },
  {
    id: "depersonalization-derealization-disorder",
    name: "Depersonalization/Derealization Disorder",
    category: "Dissociative Disorders",
    description: "Persistent or recurrent experiences of depersonalization (feeling detached from one\'s body or mental processes) and/or derealization (experiences of unreality or detachment concerning surroundings) while reality testing remains intact.",
    specifiers: "None.",
    gender: "Equally common in males and females.",
    duration: "Highly variable; ranges from brief episodes to continuous chronic states.",
    onset: "Mean age of onset is 16 years; less than 5% of cases start after age 25.",
    differentialDiagnosis: "Schizophrenia, PTSD, acute anxiety, panic disorder, epilepsy."
  },

  // --- Somatic Symptom and Related Disorders ---
  {
    id: "somatic-symptom-disorder",
    name: "Somatic Symptom Disorder",
    category: "Somatic Symptom & Related",
    description: "Distressing somatic (physical) symptoms paired with abnormal, excessive thoughts, feelings, and behaviors (such as extreme health anxiety) in response to these symptoms.",
    specifiers: "With predominant pain; Persistent; Severity: Mild, Moderate, Severe.",
    gender: "Females report higher rates of somatic complaints than males.",
    duration: "Although any single symptom may not be continuously present, the state of being symptomatic is persistent, typically more than 6 months.",
    onset: "Usually begins in childhood or early adulthood.",
    differentialDiagnosis: "Illness Anxiety Disorder (lacks prominent physical symptoms), panic disorder, multiple sclerosis."
  },
  {
    id: "conversion-disorder",
    name: "Conversion Disorder (Functional Neurological Symptom Disorder)",
    category: "Somatic Symptom & Related",
    description: "One or more symptoms of altered voluntary motor or sensory function (e.g., blindness, paralysis, seizures) that are clinically incompatible with recognized neurological or medical conditions.",
    specifiers: "With motor deficit; With sensory loss; With attacks or seizures; Acute episode OR persistent.",
    gender: "Two to three times more common in females.",
    duration: "Transient (acute) or chronic (if lasting more than 6 months).",
    onset: "Often sudden onset, peaking in late adolescence to early adulthood.",
    differentialDiagnosis: "Neurological disease (e.g., stroke, epilepsy), Factitious Disorder, Malingering."
  },
  {
    id: "psychological-factors-affecting-other-medical-conditions",
    name: "Psychological Factors Affecting Other Medical Conditions",
    category: "Somatic Symptom & Related",
    description: "A general medical symptom or condition is present, and psychological or behavioral factors adversely affect the medical condition (e.g., denial of diabetes treatment).",
    specifiers: "Severity: Mild, Moderate, Severe, Extreme.",
    gender: "Balanced.",
    duration: "Follows secondary somatic disease pathways.",
    onset: "Any age.",
    differentialDiagnosis: "Somatic Symptom Disorder (focused more on distress than physiological pathology mismatch)."
  },
  {
    id: "factitious-disorder",
    name: "Factitious Disorder",
    category: "Somatic Symptom & Related",
    description: "Falsification of physical or psychological signs or symptoms, or induction of injury or disease, in oneself or another, associated with identified deception in the absence of obvious external rewards (e.g., seeking attention).",
    specifiers: "Factitious Disorder Imposed on Self (Munchausen) OR Imposed on Another (Munchausen by proxy). Single episode or recurrent.",
    gender: "More common in females, but severe chronic forms (Munchausen) are more common in middle-aged males.",
    duration: "Often chronic and episodic, lasting years.",
    onset: "Usually early adulthood, often after a hospitalization for a real illness.",
    differentialDiagnosis: "Malingering (which has explicit pragmatic external rewards like money or draft evasion), somatic symptom disorder."
  },

  // --- Feeding and Eating Disorders ---
  {
    id: "pica",
    name: "Pica",
    category: "Feeding and Eating Disorders",
    description: "Continuous eating of nonnutritive, nonfood substances (such as paper, soap, hair, clay, chalk) over a persistent period.",
    specifiers: "In remission.",
    gender: "Equal in children, though pregnant females are affected.",
    duration: "The ingestion process must persist for at least 1 month and be developmentally/culturally inappropriate.",
    onset: "Childhood is most common, though can occur during pregnancy or in those with intellectual disabilities.",
    differentialDiagnosis: "Anorexia nervosa, Autism Spectrum Disorder, nutritional deficiencies."
  },
  {
    id: "rumination-disorder",
    name: "Rumination Disorder",
    category: "Feeding and Eating Disorders",
    description: "Repeated regurgitation of food, which may be re-chewed, re-swallowed, or spit out, not attributable to gastrointestinal conditions.",
    specifiers: "In remission.",
    gender: "Higher in infants and individuals with cognitive deficits.",
    duration: "Must occur for at least 1 month.",
    onset: "Can occur in infancy, childhood, or adulthood.",
    differentialDiagnosis: "Gastroesophageal reflux disease (GERD), anorexia nervosa, bulimia."
  },
  {
    id: "avoidant-restrictive-food-intake-disorder",
    name: "Avoidant/Restrictive Food Intake Disorder",
    category: "Feeding and Eating Disorders",
    description: "An eating or feeding disturbance (e.g., lack of interest in food, avoidance based on sensory characteristics) leading to failure to meet appropriate nutritional needs.",
    specifiers: "In remission.",
    gender: "Equally distributed in infants; slightly higher male rate in childhood comorbidities.",
    duration: "Persistent, resulting in significant weight loss or nutritional deficiency.",
    onset: "Usually infancy or early childhood.",
    differentialDiagnosis: "Anorexia nervosa (ARFID lacks body image distortion), depression, medical illness."
  },
  {
    id: "anorexia-nervosa",
    name: "Anorexia Nervosa",
    category: "Feeding and Eating Disorders",
    description: "Restriction of energy intake relative to requirements, leading to a significantly low body weight, paired with an intense fear of gaining weight and a distorted perception of body shape/weight.",
    specifiers: "Restricting type (dieting/fasting only) OR Binge-eating/purging type; In partial/full remission; Severity (based on BMI): Mild (>=17), Moderate (16-16.9), Severe (15-15.9), Extreme (<15).",
    gender: "Far more common in females (10:1 ratio).",
    duration: "Persistent over months, often presenting chronicity if untreated.",
    onset: "Typically adolescence or early adulthood; rarely starts before puberty or after age 40.",
    differentialDiagnosis: "Bulimia Nervosa (Anorexia is defined by significantly low weight), Avoidant/Restrictive Food Intake Disorder, MDD."
  },
  {
    id: "bulimia-nervosa",
    name: "Bulimia Nervosa",
    category: "Feeding and Eating Disorders",
    description: "Recurrent episodes of binge eating (consuming an abnormally large amount of food with a sense of lack of control) paired with recurrent inappropriate compensatory behaviors to prevent weight gain.",
    specifiers: "In partial/full remission; Severity (based on weekly compensatory episodes): Mild (1-3), Moderate (4-7), Severe (8-11), Extreme (12+).",
    gender: "Far more common in females (10:1 ratio).",
    duration: "Binge eating and compensatory behaviors must occur, on average, at least once a week for 3 months.",
    onset: "Adolescence or early adulthood, peaking in late adolescence.",
    differentialDiagnosis: "Binge-Eating Disorder (Bulimia lacks low body weight but requires purging/compensatory actions), Anorexia (binge-eating/purging type)."
  },
  {
    id: "binge-eating-disorder",
    name: "Binge-Eating Disorder",
    category: "Feeding and Eating Disorders",
    description: "Recurrent episodes of binge eating in the absolute absence of the recurrent inappropriate compensatory behaviors characteristic of Bulimia Nervosa.",
    specifiers: "In partial/full remission; Severity (mild, moderate, severe, extreme based on episodes per week).",
    gender: "More common in females, but has a more balanced gender distribution than Anorexia or Bulimia.",
    duration: "The binge eating episodes must occur, on average, at least once a week for 3 months.",
    onset: "Typically adolescence or young adulthood; can start later in life.",
    differentialDiagnosis: "Bulimia Nervosa, obesity (non-psychiatric), depressive disorders."
  },

  // --- Elimination Disorders ---
  {
    id: "enuresis",
    name: "Enuresis",
    category: "Elimination Disorders",
    description: "Repeated voiding of urine into bed or clothes, whether involuntary or intentional.",
    specifiers: "Nocturnal only, Diurnal only, or Nocturnal and diurnal.",
    gender: "More common in males.",
    duration: "Must occur twice a week for at least 3 consecutive months OR cause significant clinical impairment. Individual must have a mental/chronological age of at least 5 years.",
    onset: "Usually diagnosed at age 5 or older.",
    differentialDiagnosis: "Neurogenic bladder, urinary tract infection, medication side effects."
  },
  {
    id: "encopresis",
    name: "Encopresis",
    category: "Elimination Disorders",
    description: "Repeated passage of feces into inappropriate places (e.g., clothing, floor), whether involuntary or intentional.",
    specifiers: "With constipation and overflow incontinence OR Without constipation and overflow incontinence.",
    gender: "More common in males.",
    duration: "Must occur at least once a month for at least 3 months. Individual must have a mental/chronological age of at least 4 years.",
    onset: "Diagnosed at age 4 or older.",
    differentialDiagnosis: "Physical anal sphincter abnormalities, lactose intolerance."
  },

  // --- Sleep-Wake Disorders ---
  {
    id: "insomnia-disorder",
    name: "Insomnia Disorder",
    category: "Sleep-Wake Disorders",
    description: "A predominant complaint of dissatisfaction with sleep quantity or quality, associated with difficulty initiating sleep, maintaining sleep, or early-morning awakening with inability to return to sleep.",
    specifiers: "With non-sleep mental disorder; With medical condition; Episodic, Persistent, or Recurrent.",
    gender: "More common in females (approx. 1.4:1 ratio).",
    duration: "Occurs at least 3 nights per week and is present for at least 3 months.",
    onset: "Can occur at any age, but first onset is most common in young adulthood.",
    differentialDiagnosis: "Sleep apnea, circadian rhythm disorders, normal sleep variations."
  },
  {
    id: "hypersomnolence-disorder",
    name: "Hypersomnolence Disorder",
    category: "Sleep-Wake Disorders",
    description: "Self-reported excessive sleepiness (hypersomnolence) despite a main sleep period lasting at least 7 hours, with recurrent episodes of sleep or prolonged nocturnal sleep that is non-restorative.",
    specifiers: "With cognitive impairment; Acute, Subacute, or Persistent.",
    gender: "Equally distributed.",
    duration: "Occurs at least 3 times per week and is present for at least 3 months.",
    onset: "Usually begins in late adolescence or early 20s.",
    differentialDiagnosis: "Sleep deprivation, Sleep Apnea, Narcolepsy."
  },
  {
    id: "narcolepsy",
    name: "Narcolepsy",
    category: "Sleep-Wake Disorders",
    description: "Recurrent periods of an irrepressible need to sleep, lapsing into sleep, or napping occurring within the same day, accompanied by cataplexy (sudden bilateral muscle tone loss) or hypocretin deficiency.",
    specifiers: "Mild, Moderate, Severe (based on cataplexy frequency).",
    gender: "Slightly more common in males.",
    duration: "Must occur at least 3 times per week for at least 3 months.",
    onset: "Typically peaks in adolescence (age 15-25) or less commonly in the 30s.",
    differentialDiagnosis: "Hypersomnolence disorder, idiopathic hypersomnia, sleep apnea."
  },
  {
    id: "obstructive-sleep-apnea",
    name: "Obstructive Sleep Apnea Hypopnea",
    category: "Sleep-Wake Disorders",
    description: "Repeated episodes of upper airway obstruction (apneas or hypopneas) during sleep, leading to oxygen desaturation and daytime sleepiness.",
    specifiers: "Mild, Moderate, Severe.",
    gender: "Much more common in males (up to 4:1 in midlife, balanced after menopause).",
    duration: "Requires overnight polysomnography showing at least 5 obstructive apneas per hour with diagnostic symptoms.",
    onset: "Typically middle-aged and older adults.",
    differentialDiagnosis: "Central sleep apnea, panic attacks, simple snoring."
  },
  {
    id: "central-sleep-apnea",
    name: "Central Sleep Apnea",
    category: "Sleep-Wake Disorders",
    description: "Repeated episodes of apnea during sleep characterized by a temporary cessation of ventilatory efforts (lack of respiratory drive).",
    specifiers: "Idiopathic central sleep apnea, Cheyne-Stokes breathing, high-altitude periodic breathing.",
    gender: "More common in males and older adults.",
    duration: "Documented by overnight sleep study.",
    onset: "Variable, often associated with heart failure or neurological disease.",
    differentialDiagnosis: "Obstructive sleep apnea, drug-induced respiratory depression."
  },
  {
    id: "sleep-related-hypoventilation",
    name: "Sleep-Related Hypoventilation",
    category: "Sleep-Wake Disorders",
    description: "Polysomnography shows episodes of decreased respiration during sleep associated with elevated CO2 levels.",
    specifiers: "Idiopathic, Congenital central alveolar hypoventilation, comorbid medical disease.",
    gender: "Variable.",
    duration: "Documented sleep laboratory diagnostic criteria.",
    onset: "Congenital forms in infancy; acquired forms in adulthood with obesity or COPD.",
    differentialDiagnosis: "Central sleep apnea, normal ventilation."
  },
  {
    id: "circadian-rhythm-sleep-wake",
    name: "Circadian Rhythm Sleep-Wake Disorders",
    category: "Sleep-Wake Disorders",
    description: "A persistent or recurrent pattern of sleep disruption that is primarily due to an alteration of the circadian system or a mismatch with the environment.",
    specifiers: "Delayed sleep phase type, Advanced sleep phase type, Irregular sleep-wake type, Non-24-hour sleep-wake type, Shift work type.",
    gender: "Equal overall, though delayed phase is highly prevalent in adolescents.",
    duration: "Persistent, causing distress or daytime impairment.",
    onset: "Typically adolescence (for delayed sleep phase) or young adulthood.",
    differentialDiagnosis: "Primary insomnia, poor sleep hygiene."
  },
  {
    id: "nrem-sleep-arousal-disorders",
    name: "Non–Rapid Eye Movement Sleep Arousal Disorders",
    category: "Sleep-Wake Disorders",
    description: "Recurrent episodes of incomplete awakening from sleep, usually occurring during the first third of the major sleep episode, presenting as Sleepwalking (somnambulism) or Sleep Terrors.",
    specifiers: "Sleepwalking type (with sleep-related eating / sleep-related sexual behavior); Sleep terror type.",
    gender: "Equally distributed in children; slightly more males for sleepwalking in adults.",
    duration: "Recurrent episodes over weeks or months; individuals have amnesia for the episodes.",
    onset: "Childhood is most common (typical peak at age 4 to 12).",
    differentialDiagnosis: "Nightmare disorder (NREM lacks detailed dream recall; nightmares have vivid recall), REM behavior disorder, sleep-onset panic."
  },
  {
    id: "nightmare-disorder",
    name: "Nightmare Disorder",
    category: "Sleep-Wake Disorders",
    description: "Repeated occurrences of extended, extremely dysphoric, and well-remembered dreams that usually involve efforts to avoid threats to survival or security.",
    specifiers: "With non-sleep disorder; With medical condition; Acute, Subacute, or Chronic.",
    gender: "More common in females (emerging in adolescence).",
    duration: "Recurrent; causes significant distress upon rapid awakening.",
    onset: "Usually childhood (prior to age 6), increasing in frequency during adolescence.",
    differentialDiagnosis: "Sleep Terror Disorder (nightmares lead to rapid, alert awakening with detailed memories; terrors have autonomic arousal, confusion, and amnesia)."
  },
  {
    id: "rem-sleep-behavior-disorder",
    name: "Rapid Eye Movement Sleep Behavior Disorder",
    category: "Sleep-Wake Disorders",
    description: "Repeated episodes of arousal during sleep associated with vocalization and/or complex motor behaviors (dream enactment) that occur during REM sleep, due to a loss of normal muscle atonia.",
    specifiers: "Associated with neurodegenerative disease (e.g., Lewy Body dementia).",
    gender: "Significantly higher in males over age 50.",
    duration: "Chronic progression; acts as a precursor to synucleinopathies.",
    onset: "Usually older adulthood (typically age 50 or older).",
    differentialDiagnosis: "NREM sleep arousal disorders, sleep apnea, nocturnal seizures."
  },
  {
    id: "restless-legs-syndrome",
    name: "Restless Legs Syndrome",
    category: "Sleep-Wake Disorders",
    description: "An urge to move the legs, usually accompanied by or in response to uncomfortable and unpleasant sensations in the legs, which begins/worsens during periods of rest and is relieved by movement.",
    specifiers: "None.",
    gender: "Twice as common in females.",
    duration: "Must occur at least 3 times per week for at least 3 months.",
    onset: "Can begin at any age, but severe cases usually start in middle or older age.",
    differentialDiagnosis: "Leg cramps, peripheral neuropathy, arthritis."
  },

  // --- Sexual Dysfunctions ---
  {
    id: "delayed-ejaculation",
    name: "Delayed Ejaculation",
    category: "Sexual Dysfunctions",
    description: "Marked delay in, or infrequency or absence of, ejaculation on 75-100% of occasions of partner sexual activity.",
    specifiers: "Lifelong OR acquired; Generalized OR situational; Mild, Moderate, Severe.",
    gender: "Males only.",
    duration: "Must persist for a minimum duration of approximately 6 months.",
    onset: "Young adulthood to midlife.",
    differentialDiagnosis: "Medication side effects (e.g., SSRIs), endocrine disease."
  },
  {
    id: "erectile-disorder",
    name: "Erectile Disorder",
    category: "Sexual Dysfunctions",
    description: "Persistent failure to obtain or maintain an erection during partner sexual activity (occurring in 75-100% of encounters).",
    specifiers: "Lifelong OR acquired; Generalized OR situational; Mild, Moderate, Severe.",
    gender: "Males only.",
    duration: "Must persist for a minimum of 6 months.",
    onset: "Variable; acquisition rates rise with age.",
    differentialDiagnosis: "Cardiovascular disease, diabetes, performance anxiety, hypogonadism."
  },
  {
    id: "female-orgasmic-disorder",
    name: "Female Orgasmic Disorder",
    category: "Sexual Dysfunctions",
    description: "Marked delay in, infrequency of, or absence of orgasm, or markedly reduced intensity of orgasmic sensations.",
    specifiers: "Lifelong OR acquired; Generalized OR situational; Mild, Moderate, Severe.",
    gender: "Females only.",
    duration: "Minimum of 6 months.",
    onset: "Young adulthood.",
    differentialDiagnosis: "Substance-induced (SSRI), primary relational conflict."
  },
  {
    id: "female-sexual-interest-arousal-disorder",
    name: "Female Sexual Interest/Arousal Disorder",
    category: "Sexual Dysfunctions",
    description: "Absent or significantly reduced sexual interest/arousal, as manifested by reduced sexual thoughts, response to cues, or physical sensations.",
    specifiers: "Lifelong OR acquired; Generalized OR situational; Severity.",
    gender: "Females only.",
    duration: "Minimum of 6 months.",
    onset: "Typically young adulthood or peri-menopause.",
    differentialDiagnosis: "Major Depressive Disorder, hormone deficiencies, partner abuse."
  },
  {
    id: "genito-pelvic-pain-penetration-disorder",
    name: "Genito-Pelvic Pain/Penetration Disorder",
    category: "Sexual Dysfunctions",
    description: "Persistent or recurrent difficulties with vaginal penetration, marked vulvovaginal pain during intercourse, fear of pain, or tensing of pelvic floor muscles.",
    specifiers: "Lifelong OR acquired; Severity.",
    gender: "Females only.",
    duration: "Minimum of 6 months.",
    onset: "Typically young adulthood, or during first intercourse attempts.",
    differentialDiagnosis: "Vaginal infections, endometriosis, history of sexual trauma."
  },
  {
    id: "male-hypoactive-sexual-desire-disorder",
    name: "Male Hypoactive Sexual Desire Disorder",
    category: "Sexual Dysfunctions",
    description: "Persistent or recurrently deficient or absent sexual/erotic thoughts or fantasies and desire for sexual activity.",
    specifiers: "Lifelong OR acquired; Generalized OR situational; Severity.",
    gender: "Males only.",
    duration: "Minimum of 6 months.",
    onset: "Young adulthood to older age.",
    differentialDiagnosis: "Low testosterone, depression, relationship distress."
  },
  {
    id: "premature-ejaculation",
    name: "Premature (Early) Ejaculation",
    category: "Sexual Dysfunctions",
    description: "A persistent or recurrent pattern of ejaculation occurring during partner sexual activity within approximately 1 minute of vaginal penetration and before the individual wishes it.",
    specifiers: "Lifelong OR acquired; Generalized OR situational; Mild, Moderate, Severe.",
    gender: "Males only.",
    duration: "Must be present for at least 6 months.",
    onset: "Usually lifelong starting at puberty, but can be acquired.",
    differentialDiagnosis: "Thyroid disease, performance anxiety, prostatitis."
  },

  // --- Gender Dysphoria ---
  {
    id: "gender-dysphoria",
    name: "Gender Dysphoria",
    category: "Gender Dysphoria",
    description: "A marked incongruence between one\'s experienced/expressed gender and assigned gender, accompanied by significant distress or impairment.",
    specifiers: "Gender Dysphoria in Children OR Gender Dysphoria in Adolescents and Adults; With a disorder of sex development; Post-transition.",
    gender: "Assigned males show higher rates of experienced female gender identity.",
    duration: "The incongruence must be present for at least 6 months.",
    onset: "May start in early childhood (usually age 2 to 4) or emerge during puberty or adulthood.",
    differentialDiagnosis: "Transgender identity (non-dysphoric), Body Dysmorphic Disorder, Schizophrenia (somatic delusions)."
  },

  // --- Disruptive, Impulse-Control, and Conduct Disorders ---
  {
    id: "oppositional-defiant-disorder",
    name: "Oppositional Defiant Disorder",
    category: "Disruptive, Impulse-Control, & Conduct",
    description: "A pattern of angry/irritable mood, argumentative/defiant behavior, or vindictiveness directed toward individuals who are not siblings.",
    specifiers: "Mild (1 setting), Moderate (2 settings), Severe (3 or more settings).",
    gender: "Slightly more common in males in childhood; equally common in adolescents.",
    duration: "Must persist for at least 6 months, and present with at least four symptoms.",
    onset: "Manifests during preschool years; rarely emerges after early adolescence.",
    differentialDiagnosis: "Conduct Disorder (ODD lacks physical aggression/theft), ADHD, Disruptive Mood Dysregulation Disorder."
  },
  {
    id: "intermittent-explosive-disorder",
    name: "Intermittent Explosive Disorder",
    category: "Disruptive, Impulse-Control, & Conduct",
    description: "Recurrent behavioral outbursts representing a failure to control aggressive impulses, resulting in verbal/physical aggression or property destruction that is out of proportion to the provocation.",
    specifiers: "None.",
    gender: "More common in males and young adults.",
    duration: "Frequent outbursts (twice weekly for 3 months) or infrequent destructive outbursts (3 in a 12-month period).",
    onset: "Individual must be at least 6 years of age (or equivalent developmental level); peak onset in adolescence.",
    differentialDiagnosis: "DMDD, Conduct Disorder, antisocial personality, borderlines."
  },
  {
    id: "conduct-disorder",
    name: "Conduct Disorder",
    category: "Disruptive, Impulse-Control, & Conduct",
    description: "A repetitive and persistent pattern of behavior in which the basic rights of others or major age-appropriate societal norms are violated (aggression, destruction, deceit, theft).",
    specifiers: "Childhood-onset type (developed prior to age 10), Adolescent-onset type, Unspecified onset; With limited prosocial emotions (callous-unemotional traits); Mild, Moderate, Severe.",
    gender: "More common in males, who show more physical violence and direct confrontation.",
    duration: "At least 3 symptoms must be present in the last 12 months, with at least 1 symptom present in the last 6 months.",
    onset: "Middle childhood to middle adolescence.",
    differentialDiagnosis: "Oppositional Defiant Disorder, ADHD, Bipolar, Antisocial Personality Disorder (restricted to age 18+)."
  },
  {
    id: "antisocial-personality-conduct",
    name: "Antisocial Personality Disorder",
    category: "Disruptive, Impulse-Control, & Conduct",
    description: "A pervasive pattern of disregard for and violation of the rights of others, characterized by deceitfulness, impulsivity, irritability, and lack of remorse.",
    specifiers: "Must have a history of Conduct Disorder before age 15. Standardized under Cluster B Personality.",
    gender: "Much more common in males.",
    duration: "Persistent pattern since age 15.",
    onset: "Must be at least 18 years of age to diagnose formally.",
    differentialDiagnosis: "Conduct Disorder (under age 18), Narcissistic Personality Disorder, borderline."
  },
  {
    id: "pyromania",
    name: "Pyromania",
    category: "Disruptive, Impulse-Control, & Conduct",
    description: "Deliberate and purposeful fire setting on more than one occasion, accompanied by tension or affective arousal before the act and gratification/relief when setting fires.",
    specifiers: "None.",
    gender: "Much more common in males, especially those with poor social skills.",
    duration: "Recurrent setting of fires.",
    onset: "Childhood or adolescence; adult onset is rare.",
    differentialDiagnosis: "Conduct Disorder (fire setting for vandalism), manic episode, anti-social deceit."
  },
  {
    id: "kleptomania",
    name: "Kleptomania",
    category: "Disruptive, Impulse-Control, & Conduct",
    description: "Recurrent failure to resist impulses to steal objects that are not needed for personal use or for their monetary value, accompanied by rising tension before and relief after the theft.",
    specifiers: "None.",
    gender: "Much more common in females (approx. 3:1 ratio in clinical samples).",
    duration: "Persistent, chronic cycle of stealing.",
    onset: "Adolescence, though can start in late childhood or adulthood.",
    differentialDiagnosis: "Shoplifting (deliberate gain), Conduct Disorder, manic episode, Antisocial Personality."
  },

  // --- Substance-Related and Addictive Disorders ---
  {
    id: "substance-use-disorders",
    name: "Substance Use Disorders",
    category: "Substance-Related & Addictive",
    description: "A cluster of cognitive, behavioral, and physiological symptoms indicating that the individual continues using the substance despite significant substance-related problems.",
    specifiers: "Specify substance (e.g., alcohol, opioids); Mild (2-3 symptoms), Moderate (4-5), Severe (6+).",
    gender: "Higher prevalence in males overall.",
    duration: "Symptom criteria must occur within a 12-month period.",
    onset: "Usually begins in adolescence or young adulthood.",
    differentialDiagnosis: "Substance intoxication/withdrawal, situational strain."
  },
  {
    id: "substance-induced-disorders",
    name: "Substance-Induced Disorders",
    category: "Substance-Related & Addictive",
    description: "The development of a reversible substance-specific syndrome of psychiatric symptoms caused directly by intoxication, withdrawal, or medication ingestion.",
    specifiers: "With onset during intoxication OR with onset during withdrawal.",
    gender: "Varies depending on substance class.",
    duration: "Typically transient, resolving within days or weeks of abstinence.",
    onset: "Concurrent with ingestion / detox.",
    differentialDiagnosis: "Primary mood/psychotic disorders, Delirium."
  },
  {
    id: "substance-intoxication-withdrawal",
    name: "Substance Intoxication and Withdrawal",
    category: "Substance-Related & Addictive",
    description: "Direct behavioral and toxicological consequences of substance intake (intoxication) or cessation (withdrawal).",
    specifiers: "Specify substance classes.",
    gender: "Varies.",
    duration: "Short term / Acute.",
    onset: "Immediate post-abuse or cessation window.",
    differentialDiagnosis: "Delirium, general infections, acute panic."
  },
  {
    id: "alcohol-related-disorders",
    name: "Alcohol-Related Disorders",
    category: "Substance-Related & Addictive",
    description: "Includes Alcohol Use Disorder, Intoxication, Withdrawal, and unspecified conditions causing marked organic health and mental deterioration.",
    specifiers: "With/without withdrawal; Severity grades.",
    gender: "Significantly higher in males.",
    duration: "12-month criteria for Use Disorder.",
    onset: "Late teens or 20s.",
    differentialDiagnosis: "Essential tremors, general anxiety."
  },
  {
    id: "caffeine-related-disorders",
    name: "Caffeine-Related Disorders",
    category: "Substance-Related & Addictive",
    description: "Includes Caffeine Intoxication and Caffeine Withdrawal, causing impairment such as restlessness, insomnia, or muscle twitching.",
    specifiers: "None.",
    gender: "Balanced.",
    duration: "Acute.",
    onset: "Following caffeine ingestion or sudden cessation.",
    differentialDiagnosis: "Generalized anxiety disorder, panic attacks."
  },
  {
    id: "cannabis-related-disorders",
    name: "Cannabis-Related Disorders",
    category: "Substance-Related & Addictive",
    description: "Includes Cannabis Use Disorder, Intoxication, and Withdrawal (presenting with irritability, sleep difficulty, decreased appetite).",
    specifiers: "Severity scores.",
    gender: "More common in males.",
    duration: "Use disorder defined over 12 months.",
    onset: "Adolescence or young adulthood.",
    differentialDiagnosis: "MDD, generalized anxiety, bipolar."
  },
  {
    id: "hallucinogen-related-disorders",
    name: "Hallucinogen-Related Disorders",
    category: "Substance-Related & Addictive",
    description: "Includes Phencyclidine (PCP) and other hallucinogen use disorders, intoxication, and Hallucinogen Persisting Perception Disorder (HPPD / flashbacks).",
    specifiers: "With perceptual disturbances.",
    gender: "Higher in males.",
    duration: "Flashbacks can persist for years.",
    onset: "Youth / Late teens.",
    differentialDiagnosis: "Schizophrenia, temporal lobe epilepsy."
  },
  {
    id: "inhalant-related-disorders",
    name: "Inhalant-Related Disorders",
    category: "Substance-Related & Addictive",
    description: "Abuse of volatile hydrocarbons (glue, gasoline) causing acute neurotoxicity, cognitive decay, and sudden sniffing death.",
    specifiers: "None.",
    gender: "Common in young males and impoverished youth.",
    duration: "Typically acute usage, can be chronic.",
    onset: "Early adolescence (age 12-16).",
    differentialDiagnosis: "Delirium, early-onset schizophrenia."
  },
  {
    id: "opioid-related-disorders",
    name: "Opioid-Related Disorders",
    category: "Substance-Related & Addictive",
    description: "Abuse of morphine, heroin, fentanyl, or prescription pain relievers, presenting with pupillary constriction, slurred speech, and severe withdrawal distress.",
    specifiers: "Severity grades; With/without withdrawal.",
    gender: "Predominance in males, though opioid medication abuse is rising in females.",
    duration: "12-month criteria.",
    onset: "Early adulthood.",
    differentialDiagnosis: "Sedative abuse, clinical depression."
  },
  {
    id: "sedative-hypnotic-anxiolytic-related",
    name: "Sedative-, Hypnotic-, or Anxiolytic-Related Disorders",
    category: "Substance-Related & Addictive",
    description: "Abuse of benzodiazepines or barbiturates causing central nervous system depression. Withdrawal can be life-threatening (similar to alcohol).",
    specifiers: "Specific substance; Severity.",
    gender: "Higher in females for prescription abuse; males for illicit procurement.",
    duration: "Use disorder defined over 12 months.",
    onset: "Any age, often starting as treatment for insomnia/anxiety.",
    differentialDiagnosis: "Alcohol withdrawal, major depressive disorder."
  },
  {
    id: "stimulant-related-disorders",
    name: "Stimulant-Related Disorders",
    category: "Substance-Related & Addictive",
    description: "Abuse of amphetamines, Cocaine, or methylphenidate, causing pupillary dilation, tachycardia, agitation, or severe crash depression upon withdrawal.",
    specifiers: "Stimulant type (cocaine, amphetamines).",
    gender: "Higher in males.",
    duration: "12-month use criteria.",
    onset: "Late teens or young adulthood.",
    differentialDiagnosis: "Manic episode, primary paranoid Schizophrenia."
  },
  {
    id: "tobacco-related-disorders",
    name: "Tobacco-Related Disorders",
    category: "Substance-Related & Addictive",
    description: "Nicotine addiction and withdrawal symptoms (irritability, anxiety, increased appetite) that develop immediately upon smoking cessation.",
    specifiers: "In early/sustained remission.",
    gender: "Balanced.",
    duration: "12-month duration.",
    onset: "Adolescence or adulthood.",
    differentialDiagnosis: "Anxiety disorders, caffeine withdrawal."
  },
  {
    id: "other-substance-disorders",
    name: "Other (or Unknown) Substance–Related Disorders",
    category: "Substance-Related & Addictive",
    description: "Substance disorders involving anabolic steroids, nitrous oxide, or other atypical chemicals.",
    specifiers: "Substance specified if known.",
    gender: "Varies.",
    duration: "Use disorder over 12 months.",
    onset: "Varies.",
    differentialDiagnosis: "Primary psychiatric illnesses."
  },
  {
    id: "gambling-disorder",
    name: "Gambling Disorder",
    category: "Substance-Related & Addictive",
    description: "The only non-substance behavioral addiction in DSM-5. Persistent and recurrent problematic gambling behavior leading to clinically significant impairment.",
    specifiers: "Episodic OR persistent; Mild (4-5 criteria), Moderate (6-7), Severe (8-9).",
    gender: "More common in males (who start younger), though females show later-onset rapid progression.",
    duration: "Problematic behavior must be present for a 12-month period.",
    onset: "Adolescence or young adulthood.",
    differentialDiagnosis: "Manic episode (gambling occurs only during mania), antisocial personality."
  },

  // --- Neurocognitive Disorders ---
  {
    id: "delirium",
    name: "Delirium",
    category: "Neurocognitive Disorders",
    description: "A disturbance in attention and awareness that develops over a short period of time, represents a change from baseline, and fluctuates in severity during the course of a day.",
    specifiers: "Substance intoxication delirium, Substance withdrawal delirium, Medication-induced delirium; Acute OR persistent; Hyperactive, Hypoactive, Mixed activity.",
    gender: "Tends to be slightly more common in older males.",
    duration: "Brief (usually hours to a few days), though can persist for weeks.",
    onset: "Abrupt, sudden acute onset.",
    differentialDiagnosis: "Major Neurocognitive Disorder (NCD is chronic and progressive without rapid fluctuation), acute psychosis."
  },
  {
    id: "major-ncd",
    name: "Major Neurocognitive Disorder",
    category: "Neurocognitive Disorders",
    description: "Significant cognitive decline from a previous level of performance in one or more cognitive domains (complex attention, executive function, learning/memory, language, perceptual-motor, social cognition), interfering with independence in everyday activities.",
    specifiers: "Due to Alzheimers, Lewy Body, Parkinson, Vascular, Frontotemporal, Traumatic Brain Injury, HIV, Prion, Huntingtons; With or without behavioral disturbance; Mild, Moderate, Severe.",
    gender: "Varies; Alzheimer\'s is more common in females; vascular/Lewy body is more common in males.",
    duration: "Chronic, progressive decline.",
    onset: "Typically late life (senescence), though can occur younger due to trauma.",
    differentialDiagnosis: "Mild Neurocognitive Disorder (retains independence), Delirium, Pseudodementia (depression)."
  },
  {
    id: "mild-ncd",
    name: "Mild Neurocognitive Disorder",
    category: "Neurocognitive Disorders",
    description: "Modest cognitive decline from a previous level of performance, but the cognitive deficits do NOT interfere with capacity for independence in everyday activities.",
    specifiers: "Due to specific etiologies; with/without behavioral disturbances.",
    gender: "Varies by etiology.",
    duration: "Stable or slowly progressive.",
    onset: "Middle-to-late life.",
    differentialDiagnosis: "Major Neurocognitive Disorder (independence is lost), normal aging, depression."
  },
  {
    id: "ncd-alzheimers",
    name: "Major or Mild Neurocognitive Disorder Due to Alzheimer’s Disease",
    category: "Neurocognitive Disorders",
    description: "Insidious, progressive decline in memory and learning, followed by deficits in other cognitive domains, marked by amyloid-beta plaques and tau tangles.",
    specifiers: "With or without behavioral disturbance; Probable or possible Alzheimer\'s.",
    gender: "Significantly more common in females.",
    duration: "Chronic, degenerative, and irreversible decline.",
    onset: "Typically late-onset (after age 65), though rare early-onset forms exist.",
    differentialDiagnosis: "Vascular dementia, Lewy Body dementia, Major depression."
  },
  {
    id: "ncd-frontotemporal",
    name: "Major or Mild Frontotemporal Neurocognitive Disorder",
    category: "Neurocognitive Disorders",
    description: "Characterized by early, progressive changes in personality, social conduct, and behavior (disinhibition, apathy, loss of empathy) OR progressive language decline (aphasia).",
    specifiers: "Behavioral variant OR Language variant.",
    gender: "More common in males.",
    duration: "Chronic progressive.",
    onset: "Typically younger (age 45-65) compared to Alzheimer\'s.",
    differentialDiagnosis: "Alzheimer\'s, antisocial personality, schizophrenia, major depression."
  },
  {
    id: "ncd-lewy-bodies",
    name: "Major or Mild Neurocognitive Disorder With Lewy Bodies",
    category: "Neurocognitive Disorders",
    description: "Fluctuating cognition, recurrent visual hallucinations, and spontaneous features of parkinsonism, characterized by abnormal alpha-synuclein protein deposits.",
    specifiers: "Probable or possible.",
    gender: "More common in males.",
    duration: "Progressive, high motor and cognitive dysfunction.",
    onset: "Older age (usually over 65).",
    differentialDiagnosis: "Parkinson\'s disease NCD (in Lewy Body, cognitive symptoms occur before or concurrently with motor symptoms; in Parkinson\'s, motor symptoms occur first)."
  },
  {
    id: "ncd-vascular",
    name: "Major or Mild Vascular Neurocognitive Disorder",
    category: "Neurocognitive Disorders",
    description: "Cognitive decline caused by cerebrovascular disease (strokes, transient ischemic attacks) presenting with a stepwise, abrupt decline in function.",
    specifiers: "Probable or possible.",
    gender: "More common in males.",
    duration: "Stepwise progressive or fluctuating.",
    onset: "Any age after vascular disease or strokes.",
    differentialDiagnosis: "Alzheimer\'s (which has a smooth, insidious decline; vascular has stepwise card)."
  },
  {
    id: "ncd-tbi",
    name: "Major or Mild Neurocognitive Disorder Due to Traumatic Brain Injury",
    category: "Neurocognitive Disorders",
    description: "Cognitive deficits establishing immediately after a traumatic brain injury (concussion, contusion) with documented physical trauma markers.",
    specifiers: "With or without behavioral disturbances.",
    gender: "Higher in young males.",
    duration: "May show improvement or stabilize over months/years.",
    onset: "Immediate post-trauma.",
    differentialDiagnosis: "Post-concussion syndrome, substance abuse NCD."
  },
  {
    id: "ncd-substance-induced",
    name: "Substance/Medication-Induced Major or Mild Neurocognitive Disorder",
    category: "Neurocognitive Disorders",
    description: "Cognitive deficits representing a decline from baseline, persisting beyond the duration of intoxication or acute withdrawal, caused by neurotoxic substance abuse (Korsakoff\'s syndrome).",
    specifiers: "Amnestic-confabulatory state (Korsakoff); Non-amnestic forms.",
    gender: "More common in males.",
    duration: "Persistent; Korsakoff syndromic damage is usually permanent.",
    onset: "Associated with chronic substance abuse.",
    differentialDiagnosis: "Alzheimer\'s Disease, vascular dementia."
  },
  {
    id: "ncd-hiv",
    name: "Major or Mild Neurocognitive Disorder Due to HIV Infection",
    category: "Neurocognitive Disorders",
    description: "Subcortical cognitive deficits (slowed processing, apathy, executive dysfunction) caused directly by viral HIV infiltration of brain tissue.",
    specifiers: "None.",
    gender: "Varies with HIV contraction demographics.",
    duration: "May improve with antiretroviral therapy (ART) or progress.",
    onset: "During chronic phases of HIV infection.",
    differentialDiagnosis: "Opportunistic infections (cryptococcal meningitis), neurosyphilis."
  },
  {
    id: "ncd-prion",
    name: "Major or Mild Neurocognitive Disorder Due to Prion Disease",
    category: "Neurocognitive Disorders",
    description: "Extremely rapid cognitive decline accompanied by motor features (myoclonus, ataxia) caused by transmissible spongiform encephalopathies (Creutzfeldt-Jakob disease).",
    specifiers: "Probable or possible.",
    gender: "Balanced.",
    duration: "Rapid progress; death typically occurs within 1 year of diagnosis.",
    onset: "Usually, late middle age (age 50-70).",
    differentialDiagnosis: "Alzheimer\'s (CJD is extremely fast, over weeks/months; Alzheimer\'s takes years)."
  },
  {
    id: "ncd-parkinsons",
    name: "Major or Mild Neurocognitive Disorder Due to Parkinson’s Disease",
    category: "Neurocognitive Disorders",
    description: "Cognitive decline occurring in the context of established Parkinson\'s disease, showing early subcortical and executive functioning deficits.",
    specifiers: "Probable or possible.",
    gender: "More common in males.",
    duration: "Slow progressive.",
    onset: "Typically diagnosed years after the onset of motor symptoms (must have motor symptoms present for at least 1 year prior to cognitive decline).",
    differentialDiagnosis: "Neurocognitive disorder with Lewy Bodies (where cognitive symptoms occur within 1 year of motor onset)."
  },
  {
    id: "ncd-huntingtons",
    name: "Major or Mild Neurocognitive Disorder Due to Huntington’s Disease",
    category: "Neurocognitive Disorders",
    description: "Progressive cognitive decline characterized by early executive function changes and motor chorea, inherited via an autosomal dominant CAG trinucleotide repeat expansion.",
    specifiers: "Probable; comorbid behavioral disorders.",
    gender: "Equal.",
    duration: "Chronic, slowly progressive.",
    onset: "Typically. age 35 to 45.",
    differentialDiagnosis: "Parkinson\'s disease, Tardive dyskinesia."
  },
  {
    id: "ncd-other-medical",
    name: "Major or Mild Neurocognitive Disorder Due to Another Medical Condition",
    category: "Neurocognitive Disorders",
    description: "Decline in cognitive domains caused directly by other medical diseases (such as neurosyphilis, brain tumors, normal pressure hydrocephalus, or thyroid disease).",
    specifiers: "Specific etiology noted.",
    gender: "Varies.",
    duration: "Co-occurs or resolves based on primary clinical course.",
    onset: "Any age corresponding to primary somatic onset.",
    differentialDiagnosis: "Alzheimer\'s disease, major depression."
  },
  {
    id: "ncd-multiple",
    name: "Major or Mild Neurocognitive Disorder Due to Multiple Etiologies",
    category: "Neurocognitive Disorders",
    description: "Cognitive decay that represents a combination of several overlapping pathological causes (e.g., Alzheimer\'s disease concurrent with vascular strokes).",
    specifiers: "Etiologies specified.",
    gender: "Older age groups.",
    duration: "Cumulative chronic decline.",
    onset: "Senile years.",
    differentialDiagnosis: "Single classic etiology dementia."
  },

  // --- Personality Disorders ---
  {
    id: "general-personality-disorder",
    name: "General Personality Disorder",
    category: "Personality Disorders",
    description: "An enduring pattern of inner experience and behavior that deviates markedly from the expectations of the individual\'s culture, occupying domains of cognition, affectivity, interpersonal functioning, or impulse control.",
    specifiers: "Coded into Clusters A, B, or C.",
    gender: "Even overall, though specific subtypes are skewed.",
    duration: "Enduring, stable, and of long duration; traceable back to adolescence or early adulthood.",
    onset: "Adolescence or early adulthood.",
    differentialDiagnosis: "Mood disorders, substance use, medical disease."
  },
  {
    id: "paranoid-personality",
    name: "Paranoid Personality Disorder",
    category: "Personality Disorders",
    description: "A pattern of pervasive distrust and suspiciousness of others such that their motives are interpreted as malevolent, leading to hypervigilance and social isolation.",
    specifiers: "Cluster A Personality Disorder.",
    gender: "More common in males in clinical samples.",
    duration: "Persistent, lifelong traits.",
    onset: "Adolescence / Early adulthood.",
    differentialDiagnosis: "Delusional Disorder, Paranoid Schizophrenia (personality disorder lacks persistent hallucinations or delusions)."
  },
  {
    id: "schizoid-personality",
    name: "Schizoid Personality Disorder",
    category: "Personality Disorders",
    description: "A pervasive pattern of detachment from social relationships and a restricted range of expression of emotions in interpersonal settings, preferring solitary activities.",
    specifiers: "Cluster A Personality Disorder.",
    gender: "Slightly more common and causes greater impairment in males.",
    duration: "Enduring, stable lifelong course.",
    onset: "Early adulthood, with childhood signs of solitary play.",
    differentialDiagnosis: "Autism Spectrum Disorder, schizotypal personality, social phobia."
  },
  {
    id: "schizotypal-personality-pd",
    name: "Schizotypal Personality Disorder",
    category: "Personality Disorders",
    description: "A pattern of social and interpersonal deficits marked by acute discomfort with close relationships, paired with cognitive or perceptual distortions and eccentricities.",
    specifiers: "Cluster A Personality Disorder.",
    gender: "More common in males.",
    duration: "Lifelong stable course.",
    onset: "Early adulthood.",
    differentialDiagnosis: "Schizophrenia, paranoid personality, borderlines."
  },
  {
    id: "antisocial-personality",
    name: "Antisocial Personality Disorder",
    category: "Personality Disorders",
    description: "A pervasive pattern of disregard for and violation of the rights of others, presenting since age 15, requiring previous evidence of Conduct Disorder before age 15.",
    specifiers: "Cluster B Personality Disorder.",
    gender: "Much more common in males.",
    duration: "Enduring, stable, often showing minor recovery of behavioral aggression after age 40.",
    onset: "Diagnosed only at age 18 years or older; conduct disorder must set in prior to age 15.",
    differentialDiagnosis: "Narcissistic Personality Disorder, Borderline Personality Disorder, substance abuse."
  },
  {
    id: "borderline-personality",
    name: "Borderline Personality Disorder",
    category: "Personality Disorders",
    description: "A pervasive pattern of instability of interpersonal relationships, self-image, and affects, alongside marked impulsivity (suicidal self-harm, frantic efforts to avoid abandonment).",
    specifiers: "Cluster B Personality Disorder.",
    gender: "Females constitute about 75% of clinical borderline diagnoses.",
    duration: "Chronic fluctuating course; chronic distress peaks in young adulthood, stabilizing in middle age.",
    onset: "Early adulthood.",
    differentialDiagnosis: "Bipolar disorders (Borderline features rapid transient mood shifts in hours; Bipolar mood episodes last days/weeks), histrionic, complex PTSD."
  },
  {
    id: "histrionic-personality",
    name: "Histrionic Personality Disorder",
    category: "Personality Disorders",
    description: "A pervasive pattern of excessive emotionality and attention seeking, feeling uncomfortable when they are not the center of attention.",
    specifiers: "Cluster B Personality Disorder.",
    gender: "Evenly distributed in general population surveys, though females are more frequently diagnosed in clinical settings.",
    duration: "Lifelong enduring pattern.",
    onset: "Early adulthood.",
    differentialDiagnosis: "Borderline personality, Narcissistic Personality Disorder, somatization."
  },
  {
    id: "narcissistic-personality",
    name: "Narcissistic Personality Disorder",
    category: "Personality Disorders",
    description: "A pervasive pattern of grandiosity (in fantasy or behavior), an intense need for admiration, and a profound lack of empathy, often fragile underneath.",
    specifiers: "Cluster B Personality Disorder.",
    gender: "Up to 50-75% of those diagnosed are male.",
    duration: "Enduring, persistent.",
    onset: "Early adulthood.",
    differentialDiagnosis: "Antisocial Personality, Histrionic Personality, Borderline Personality."
  },
  {
    id: "avoidant-personality",
    name: "Avoidant Personality Disorder",
    category: "Personality Disorders",
    description: "A pervasive pattern of social inhibition, feelings of inadequacy, and hypersensitivity to negative evaluation, fearing rejection.",
    specifiers: "Cluster C Personality Disorder.",
    gender: "Equally distributed in community samples.",
    duration: "Chronic, lifelong course.",
    onset: "Early adulthood.",
    differentialDiagnosis: "Social Anxiety Disorder (severe overlap; Avoidant PD features a more global, ego-syntonic self-concept of being defective), Schizoid (Schizoid lacks desire for relationships; Avoidant desires them but experiences terror)."
  },
  {
    id: "dependent-personality",
    name: "Dependent Personality Disorder",
    category: "Personality Disorders",
    description: "A pervasive and excessive need to be taken care of that leads to submissive and clinging behavior and fears of separation.",
    specifiers: "Cluster C Personality Disorder.",
    gender: "Diagnosed more frequently in females in clinical settings, though some surveys show a balanced prevalence.",
    duration: "Persistent stable course.",
    onset: "Early adulthood.",
    differentialDiagnosis: "Borderline personality (BPD responds to abandonment with rage/suicidality; Dependent responds with immediate submissive searching for a new partner), histrionic."
  },
  {
    id: "obsessive-compulsive-personality",
    name: "Obsessive-Compulsive Personality Disorder",
    category: "Personality Disorders",
    description: "A pervasive pattern of preoccupation with orderliness, perfectionism, and mental and interpersonal control, at the expense of flexibility, openness, and efficiency.",
    specifiers: "Cluster C Personality Disorder. Commonly known as OCPD.",
    gender: "Diagnosed about twice as often in males.",
    duration: "Enduring lifelong traits.",
    onset: "Early adulthood.",
    differentialDiagnosis: "Obsessive-Compulsive Disorder (such as true intrusive obsessions and ritualistic checking; OCPD is characterized by orderliness and workaholism without discrete compulsions)."
  },

  // --- Paraphilic Disorders ---
  {
    id: "voyeuristic-disorder",
    name: "Voyeuristic Disorder",
    category: "Paraphilic Disorders",
    description: "Experiencing intense sexual arousal from observing an unsuspecting person who is naked, disrobing, or engaging in sexual activity, acting on these urges or experiencing distress.",
    specifiers: "In a controlled environment; In full remission.",
    gender: "Almost exclusively males.",
    duration: "Must be present for at least 6 months.",
    onset: "Usually before age 15.",
    differentialDiagnosis: "Exhibitionistic disorder, conduct disorder."
  },
  {
    id: "exhibitionistic-disorder",
    name: "Exhibitionistic Disorder",
    category: "Paraphilic Disorders",
    description: "Intense sexual arousal from exposing one\'s genitals to an unsuspecting person, acted on or causing deep relational impairment.",
    specifiers: "Sexually aroused by exposing genitals to prepubertal children, postpubertal children, or both; In controlled environment.",
    gender: "Almost exclusively males.",
    duration: "At least 6 months.",
    onset: "Before age 18.",
    differentialDiagnosis: "Conduct disorder, substance intoxication."
  },
  {
    id: "frotteuristic-disorder",
    name: "Frotteuristic Disorder",
    category: "Paraphilic Disorders",
    description: "Intense sexual arousal from touching or rubbing against a non-consenting person, acted on or causing distress.",
    specifiers: "In controlled environments.",
    gender: "Almost exclusively males.",
    duration: "At least 6 months.",
    onset: "Usually, age 15-25.",
    differentialDiagnosis: "Substance intoxication, antisocial behavior."
  },
  {
    id: "sexual-masochism-disorder",
    name: "Sexual Masochism Disorder",
    category: "Paraphilic Disorders",
    description: "Intense sexual arousal from being humiliated, bound, beaten, or otherwise made to suffer, causing clinically significant distress or impairment.",
    specifiers: "With asphyxiophilia (if arousal depends on restricting respiration); In remission.",
    gender: "More common in males, though reported in females.",
    duration: "At least 6 months.",
    onset: "Usually, childhood or early adulthood.",
    differentialDiagnosis: "Non-paraphilic sexual fantasies, self-harm."
  },
  {
    id: "sexual-sadism-disorder",
    name: "Sexual Sadism Disorder",
    category: "Paraphilic Disorders",
    description: "Intense sexual arousal from the physical or psychological suffering of another person, acted on with a non-consenting person.",
    specifiers: "In controlled environments.",
    gender: "Almost exclusively males.",
    duration: "At least 6 months.",
    onset: "Early adulthood, can be preceded by conduct issues.",
    differentialDiagnosis: "Antisocial personality, sexual masochism."
  },
  {
    id: "pedophilic-disorder",
    name: "Pedophilic Disorder",
    category: "Paraphilic Disorders",
    description: "Intense paraphilic sexual interest in prepubertal children (generally age 13 or younger) by individuals who are at least 16 years old and 5 years older than the child.",
    specifiers: "Exclusive type (aroused only by children) OR nonexclusive type; attracted to males, females, or both; incested.",
    gender: "Almost exclusively males.",
    duration: "At least 6 months.",
    onset: "Early adulthood.",
    differentialDiagnosis: "Substance-induced loss of impulse, antisocial personality."
  },
  {
    id: "fetishistic-disorder",
    name: "Fetishistic Disorder",
    category: "Paraphilic Disorders",
    description: "Experiencing intense sexual arousal from the use of nonliving objects or a highly specific focus on non-genital body parts.",
    specifiers: "Body part(s) focus, Nonliving object focus, Other; In controlled environments.",
    gender: "Almost exclusively males.",
    duration: "At least 6 months.",
    onset: "Usually puberty.",
    differentialDiagnosis: "Transvestic disorder (fetish is specifically clothing for cross-dressing purposes)."
  },
  {
    id: "transvestic-disorder",
    name: "Transvestic Disorder",
    category: "Paraphilic Disorders",
    description: "Intense sexual arousal from cross-dressing, causing clinically significant distress or relational impairment.",
    specifiers: "With fetishism; With autogynephilia (aroused by thoughts of self as female).",
    gender: "Assigned males only.",
    duration: "At least 6 months.",
    onset: "Typically childhood or adolescence.",
    differentialDiagnosis: "Gender Dysphoria (in Transvestic disorder, cross-dressing is primarily for sexual excitement; gender dysphoria involves identity incongruence)."
  }
];
