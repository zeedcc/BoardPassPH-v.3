export interface TreatmentInfo {
  therapies: string;
  medications: string;
  boardTip?: string;
}

const SPECIFIC_TREATMENTS: Record<string, TreatmentInfo> = {
  // Neurodevelopmental Disorders
  "gdd": {
    therapies: "Early intervention services, sensory-motor occupational therapy (OT), physical therapy (PT), speech-language therapy, and caregiver-mediated behavioral intervention.",
    medications: "Pharmacotherapy is not first-line; low-dose medication (e.g., alpha-2 agonists or low-dose atypical antipsychotics) may be considered ONLY for extreme co-morbid agitation or aggression.",
    boardTip: "On board exams, remember that GDD is diagnosed in children under 5 when reliable standardized testing cannot be completed. Multi-disciplinary training is key."
  },
  "asd": {
    therapies: "Applied Behavior Analysis (ABA) is the gold standard. Social Skills Groups, Speech-Language Therapy, Occupational Therapy, and Parent-Mediated Interventions.",
    medications: "No medication treats core social-communication deficits. FDA-approved atypical antipsychotics (Risperidone and Aripiprazole) are used for irritability, severe temper tantrums, and self-injurious behavior.",
    boardTip: "For licensure, remember that ASD requires deficits in social communication AND restricted/repetitive behaviors. Risperidone/Aripiprazole are high-yield FDA approvals. Screener: M-CHAT."
  },
  "adhd": {
    therapies: "Behavioral Parent Training (BPT) is first-line for preschool-aged children. Cognitive Behavioral Therapy (CBT), Executive Functioning coaching, and school accommodation plans.",
    medications: "First-line: Psychostimulants (Methylphenidate, Dexmethylphenidate, Amphetamine salts). Second-line/Non-stimulants: Atomoxetine (NRI), Alpha-2 adrenergic agonists (Clonidine, Guanfacine).",
    boardTip: "Stimulants block dopamine/norepinephrine reuptake in the prefrontal cortex. Standard ADHD criteria require symptoms in ≥2 settings prior to age 12."
  },
  
  // Depressive Disorders
  "mdd": {
    therapies: "Cognitive Behavioral Therapy (CBT), Interpersonal Psychotherapy (IPT: focused on grief, role transitions, disputes), and Behavioral Activation (BA). Mindfulness-Based CBT (MBCT) for relapse prevention.",
    medications: "First-line: SSRIs (Sertraline, Sertraline is highly favored; Escitalopram, Fluoxetine). SNRIs (Duloxetine, Venlafaxine). Atypical antidepressants (Bupropion for energy/no sexual side effects; Mirtazapine for sleep/appetite stimulation).",
    boardTip: "SSRIs require 4-6 weeks to manifest therapeutic effects. Watch out for Serotonin Syndrome when paired with MAOIs! First-line therapy for severe/refractory MDD with psychotic features remains ECT."
  },
  "persistent-depressive": {
    therapies: "Cognitive Behavioral Analysis System of Psychotherapy (CBASP) specifically designed for chronic depression; Cognitive Behavioral Therapy (CBT), Interpersonal Psychotherapy (IPT).",
    medications: "Antidepressants (SSRIs, SNRIs) are often paired with psychotherapy for maximum efficacy due to the high rate of treatment resistance.",
    boardTip: "Persistent Depressive Disorder (Dysthymia) requires a depressed mood for at least 2 years in adults (1 year in children/adolescents)."
  },

  // Bipolar and Related Disorders
  "bipolar-i": {
    therapies: "Psychoeducation (helps with compliance), Interpersonal and Social Rhythm Therapy (IPSRT - regulates sleep-wake cycles), Family-Focused Therapy (FFT).",
    medications: "Mood Stabilizers: Lithium Carbonate (gold standard, reduces suicide risk), divalproex sodium (Valproic acid - favored for rapid cycling), Carbamazepine. Atypical antipsychotics (Quetiapine, Olanzapine, Aripiprazole) for acute mania.",
    boardTip: "Lithium has a narrow therapeutic range (0.6 - 1.2 mEq/L); toxicity causes tremors, ataxia, and renal issues. Antidepressant monotherapy is dangerous as it can trigger manic switches!"
  },
  "bipolar-ii": {
    therapies: "Interpersonal and Social Rhythm Therapy (IPSRT), Cognitive Behavioral Therapy (CBT), and family psychoeducation.",
    medications: "Lamotrigine (mood stabilizer highly effective for preventing bipolar depressive episodes), Lithium, or Atypical Antipsychotics (e.g. Quetiapine).",
    boardTip: "Bipolar II requires at least one Hypomanic episode (≥4 days) AND at least one Major Depressive episode. There MUST NEVER be a history of a full manic episode."
  },

  // Schizophrenia Spectrum
  "schizophrenia": {
    therapies: "Cognitive Behavioral Therapy for Psychosis (CBT-p), Family Psychoeducation (reduces Expressed Emotion which triggers relapses), Social Skills Training, Assertive Community Treatment (ACT).",
    medications: "Antipsychotics are mandatory. First-generation (Typical): Haloperidol, Chlorpromazine (strong D2 antagonists, high Extrapyramidal Side Effects). Second-generation (Atypical): Risperidone, Olanzapine, Quetiapine, Aripiprazole. Clozapine for treatment-resistant cases.",
    boardTip: "Clozapine is reserved for treatment resistance but carries a black box warning for Agranulocytosis (requires absolute neutrophil count monitoring). High expressed emotion in families triggers relapse."
  },

  // Anxiety Disorders
  "panic-disorder": {
    therapies: "Cognitive Behavioral Therapy (CBT) featuring Panic Control Treatment (interoceptive exposure to physical panic sensations, cognitive restructuring).",
    medications: "First-line (long-term): SSRIs (Sertraline, Paroxetine). Acute panic attacks: Short-acting Benzodiazepines (Alprazolam, Lorazepam) used sparingly to avoid dependency and rebound anxiety.",
    boardTip: "Panic Disorder requires recurrent unexpected panic attacks followed by ≥1 month of persistent worry about future attacks or maladaptive behavioral changes."
  },
  "gad": {
    therapies: "Cognitive Behavioral Therapy (CBT: focusing on worry postponement, intolerance of uncertainty, cognitive restructuring), Acceptance and Commitment Therapy (ACT).",
    medications: "First-line: SSRIs (Escitalopram, Paroxetine) or SNRIs (Duloxetine, Venlafaxine). Buspirone (5-HT1A partial agonist) is an effective non-benzodiazepine alternative for generalized anxiety.",
    boardTip: "GAD requires excessive anxiety/worry about multiple events for at least 6 months, with at least 3 of 6 somatic symptoms (only 1 somatic symptom needed in children)."
  },
  "social-anxiety": {
    therapies: "Cognitive Behavioral Therapy (CBT), Social Skills Training, and Exposure Therapy (especially structured group exposure settings).",
    medications: "SSRIs or SNRIs. For performance-only subtype (e.g. public speaking anxiety): Beta-blockers (Propranolol) taken 30-60 minutes before the event to block physical adrenergic symptoms (tremors, racing heart).",
    boardTip: "Propranolol blocks the somatic manifestations of performance anxiety but does not affect cognitive anxiety. Do not use in patients with asthma."
  },

  // OCD and Related
  "ocd": {
    therapies: "Exposure and Response Prevention (ERP) is the absolute gold standard behavioral therapy. Cognitive Behavioral Therapy (CBT).",
    medications: "First-line: High-dose SSRIs (Fluoxetine, Fluvoxamine, Sertraline). Clomipramine (TCA with high serotonin reuptake inhibition) is extremely effective but has secondary tricyclic side effects.",
    boardTip: "ERP involves exposing the patient to obsessive triggers while strictly preventing them from executing the compulsive neutralizing behaviors."
  },

  // Trauma-Related
  "ptsd": {
    therapies: "Trauma-Focused CBT (TF-CBT), Eye Movement Desensitization and Reprocessing (EMDR), Prolonged Exposure (PE), and Cognitive Processing Therapy (CPT).",
    medications: "First-line pharmacotherapy: SSRIs (Sertraline, Paroxetine). Prazosin (alpha-1 blocker) is highly effective for reducing severe post-traumatic nightmares and improving sleep.",
    boardTip: "PTSD requires symptoms across 4 clusters (Intrusion, Avoidance, Cognition/Mood alterations, and Hyperarousal) persisting for >1 month. (If <1 month, consider Acute Stress Disorder)."
  },

  // Somatic Symptom and Related
  "somatic-symptom-disorder": {
    therapies: "Cognitive Behavioral Therapy (CBT) targeting somatosensory amplification, health catastrophizing, and illness concerns. Regular appointments with a single primary care provider as a gatekeeper.",
    medications: "SSRIs or SNRIs are helpful primarily if there is comorbid depression or anxiety, or to help dampen physical sensory amplification.",
    boardTip: "The patient with Somatic Symptom Disorder actually experiences genuine physical symptoms; the disorder is defined by the disproportionate cognitive interpretation of those physical symptoms."
  },

  // Eating Disorders
  "anorexia-nervosa": {
    therapies: "Family-Based Treatment (FBT / Maudsley approach) is first-line for adolescents. CBT-E (Enhanced CBT) and specialist supportive clinical management (SSCM). Multidisciplinary medical monitoring is vital.",
    medications: "Pharmacotherapy has limited efficacy. Olanzapine (atypical antipsychotic) is sometimes used as an adjunct to help stimulate appetite, weight gain, and reduce obsessive thoughts about body shape.",
    boardTip: "Anorexia Nervosa requires restricted energy intake leading to significantly low body weight, intense fear of gaining weight, and body image distortion. Distinguished from Bulimia by low weight status (BMI < 18.5)."
  },
  "bulimia-nervosa": {
    therapies: "Cognitive Behavioral Therapy for Eating Disorders (CBT-E) is first-line. Interpersonal Psychotherapy (IPT) is an alternative.",
    medications: "First-line: Fluoxetine (Prozac) is the ONLY FDA-approved medication for Bulimia Nervosa, shown to significantly reduce binge-purge frequencies at high doses (e.g. 60mg).",
    boardTip: "Bupropion (Wellbutrin) is STRICTLY CONTRAINDICATED in patients with Bulimia or Anorexia due to an increased risk of generalized grand mal seizures!"
  },

  // Personality Disorders
  "borderline-pd": {
    therapies: "Dialectical Behavior Therapy (DBT - developed by Marsha Linehan, emphasizes mindfulness, distress tolerance, emotion regulation, and interpersonal effectiveness). Schema-Focused Therapy, Mentalization-Based Therapy (MBT).",
    medications: "No FDA approved medications for BPD. Pharmacotherapy is symptomatic: SSRIs for anger or depression; low-dose second-generation antipsychotics for transient micropsychotic episodes or paranoia.",
    boardTip: "DBT is a high-yield board question. BPD core features: unstable interpersonal relationships, identity disturbance, chronic feelings of emptiness, and recurrent suicidal/self-harming behavior."
  },
  "antisocial-pd": {
    therapies: "Cognitive Behavioral Therapy (CBT) focusing on anti-social behavior modification, contingency management, and relapse prevention for substance use. Often extremely resistant to therapy.",
    medications: "No FDA approved medications. Psychopharmacology is limited to treating comorbid conditions (like ADHD or substance use) or managing severe aggressive behavior (atypical antipsychotics).",
    boardTip: "Requires a history of Conduct Disorder with onset before age 15. Diagnosis of Antisocial PD can only be formally assigned to individuals who are at least 18 years old."
  },
  "schizotypal-pd": {
    therapies: "Social skills training, supportive psychotherapy, and Cognitive Behavioral Therapy (CBT) to challenge odd beliefs and cognitive distortions.",
    medications: "Low-dose antipsychotics (e.g., Risperidone, Haldol) can help reduce magical thinking, ideas of reference, and transient psychotic episodes.",
    boardTip: "Schizotypal is in Cluster A (Odd/Eccentric) and shares a genetic link with Schizophrenia. Hallmarks: ideas of reference, odd beliefs, magical thinking, and severe social anxiety."
  }
};

const CATEGORY_TREATMENTS: Record<string, TreatmentInfo> = {
  "Neurodevelopmental Disorders": {
    therapies: "Applied Behavior Analysis (ABA), speech therapy, sensory occupational therapy, parent training, psychoeducation, and behavioral classroom management.",
    medications: "Stimulants (Methylphenidate) for ADHD symptoms; Alpha-2 agonists (Clonidine) for hyperactive-impulsive behaviors; Atypical antipsychotics (Risperidone) for autism-related irritability.",
    boardTip: "Characterized by developmental deficits that produce impairments in personal, social, academic, or occupational functioning with early onset."
  },
  "Schizophrenia Spectrum & Psychotic": {
    therapies: "Cognitive Behavioral Therapy for Psychosis (CBT-p), Family Psychoeducation (highly critical to reduce Expressed Emotion), Social Skills Training, and Assertive Community Treatment (ACT).",
    medications: "Antipsychotic medications are mandatory. Atypical antipsychotics (Risperidone, Olanzapine, Aripiprazole, Clozapine) are generally preferred first-line due to lower motor side effects.",
    boardTip: "Atypical antipsychotics block both Serotonin 5-HT2A and Dopamine D2 receptors, whereas typical antipsychotics are primarily primary D2 receptor blockers."
  },
  "Bipolar and Related Disorders": {
    therapies: "Interpersonal and Social Rhythm Therapy (IPSRT) to stabilize circadian rhythms; Psychoeducation to support medication adherence; Family-Focused Therapy (FFT).",
    medications: "Mood Stabilizers: Lithium Carbonate (decreases suicide risk), Valproic Acid / Sodium Valproate, Carbamazepine, Lamotrigine. Atypical antipsychotics (Aripiprazole, Quetiapine).",
    boardTip: "Mood stabilizers are key. Avoid antidepressant monotherapy as it can precipitate a rapid switch into a manic or hypomanic episode."
  },
  "Depressive Disorders": {
    therapies: "Cognitive Behavioral Therapy (CBT), Interpersonal Psychotherapy (IPT), Behavioral Activation (BA), and Mindfulness-Based CBT.",
    medications: "SSRIs (Sertraline, Escitalopram, Fluoxetine) are first line. SNRIs (Venlafaxine, Duloxetine) or Atypicals (Bupropion, Mirtazapine) are common alternatives.",
    boardTip: "First-line medical treatment is SSRIs (blocks serotonin reuptake). Psychotherapy paired with pharmacotherapy yields the most robust recovery rates."
  },
  "Anxiety Disorders": {
    therapies: "Cognitive Behavioral Therapy (CBT) with Exposure and Response Prevention (ERP) or systematic desensitization; Cognitive Restructuring; ACT.",
    medications: "SSRIs/SNRIs for long-term daily maintenance; Buspirone for generalized anxiety; Beta-blockers (Propranolol) for situational performance anxiety; Benzodiazepines for acute crisis only.",
    boardTip: "Behavioral therapies (exposure) are extremely powerful for anxiety, aiming to habituate the amygdala to safe/anxious stimuli."
  },
  "Obsessive-Compulsive & Related": {
    therapies: "Exposure and Response Prevention (ERP) is the first-line gold standard behavioral therapy; Cognitive Behavioral Therapy (CBT).",
    medications: "High-dose SSRIs (Fluoxetine, Sertraline, Fluvoxamine) or the highly serotonergic Tricyclic Antiphyschotic Clomipramine.",
    boardTip: "OCD is characterized by persistent thoughts (obsessions) that lead to repetitive behaviors (compulisons) to neutralize distress."
  },
  "Trauma & Stressor-Related": {
    therapies: "Trauma-Focused CBT (TF-CBT), Eye Movement Desensitization and Reprocessing (EMDR), Prolonged Exposure (PE) therapy.",
    medications: "SSRIs (Sertraline, Paroxetine) are FDA-approved first-line medications. Prazosin is effective for treating severe post-traumatic nightmares.",
    boardTip: "EMDR focuses on lateral bilateral eye movements while processing traumatic memories to help the brain re-integrate the experience."
  },
  "Dissociative Disorders": {
    therapies: "Phase-oriented trauma psychotherapy, integration therapy, Cognitive Behavioral Therapy (CBT), Dialectical Behavior Therapy (DBT).",
    medications: "No dedicated medications exist for dissociative disorders. Pharmacotherapy is aimed strictly at secondary comorbid symptoms like depression or anxiety.",
    boardTip: "Strongly correlated with severe, chronic childhood abuse. Hypnotherapy is sometimes used to gain access to dissociated ego states."
  },
  "Somatic Symptom & Related": {
    therapies: "Cognitive Behavioral Therapy (CBT) to alter health-related anxiety, beliefs, and behavioral responses. Single-physician primary care coordination.",
    medications: "SSRIs or SNRIs to treat comorbid depression, health anxiety, or to alter somatic amplification thresholds.",
    boardTip: "Conversion Disorder (Functional Neurological Symptom Disorder) features involuntary motor or sensory deficits that lack medical/neurological etiology."
  },
  "Feeding and Eating Disorders": {
    therapies: "Family-Based Therapy (FBT / Maudsley Model) for Anorexia; CBT-E (Enhanced Cognitive Behavioral Therapy) for Bulimia and Binge Eating.",
    medications: "Fluoxetine (FDA-approved first line for Bulimia Nervosa); Olanzapine (helps weight gain in Anorexia). Bupropion is strictly contraindicated due to seizure risk.",
    boardTip: "Always monitor physical indicators like electrolytes, potassium, and cardiac intervals, especially in severe bulimic vomiting cases (hypokalemic alkalosis)."
  },
  "Sleep-Wake Disorders": {
    therapies: "Cognitive Behavioral Therapy for Insomnia (CBT-I) incorporating sleep restriction, stimulus control, and sleep hygiene education.",
    medications: "Short-term Z-drugs (Zolpidem, Eszopiclone); Melatonin agonists; Orexin receptor antagonists; Modafinil (wake-promoting agent for Narcolepsy).",
    boardTip: "CBT-I is recommended as the first-line chronic treatment for insomnia, even before any pharmacological sleep aids."
  },
  "Sexual Dysfunctions": {
    therapies: "Sex therapy, Sensate Focus exercises (Masters & Johnson technique), Cognitive Behavioral Therapy (CBT), couples communication training.",
    medications: "Phosphodiesterase-5 inhibitors (e.g. Sildenafil, Tadalafil) for erectile dysfunction; SSRIs (e.g. Dapoxetine) for premature ejaculation.",
    boardTip: "Requires symptoms to persist for a minimum duration of 6 months and cause significant clinical distress to be diagnosed."
  },
  "Gender Dysphoria": {
    therapies: "Gender-affirming counseling, supportive psychotherapy, family counseling, and support groups.",
    medications: "Hormone replacement therapy (HRT: estrogens or testosterone) and puberty blockers (gonadotropin-releasing hormone agonists) to align physical characteristics with gender identity.",
    boardTip: "Not a mental illness per se; the diagnosis focuses on the clinical distress resulting from the incongruence between experienced gender and assigned sex."
  },
  "Disruptive, Impulse-Control, & Conduct": {
    therapies: "Parent Management Training (PMT), Parent-Child Interaction Therapy (PCIT), Multisystemic Therapy (MST) for adolescents, and CBT for anger management.",
    medications: "No primary medications. Atypical antipsychotics (Risperidone) or mood stabilizers can be prescribed as an off-label adjunct for severe, explosive physical aggression.",
    boardTip: "Includes Oppositional Defiant Disorder (defiant, angry mood towards authority) and Conduct Disorder (violation of basic rights of others and key laws)."
  },
  "Substance-Related & Addictive": {
    therapies: "Motivational Interviewing (MI), Cognitive Behavioral Therapy (CBT), Contingency Management, 12-Step Facilitation groups, and relapse prevention training.",
    medications: "Alcohol: Disulfiram (deterrent), Naltrexone (blocks opioid/reward pathways), Acamprosate. Opioids: Methadone (agonist), Buprenorphine (partial agonist), Naloxone (antagonist).",
    boardTip: "Motivational Interviewing uses open-ended questions, affirmations, reflective listening, and summaries (OARS) to resolve ambivalence about change."
  },
  "Neurocognitive Disorders": {
    therapies: "Cognitive stimulation, behavioral therapy for agitation, safety planning, and extensive psychoeducational support for families and caregivers.",
    medications: "Cholinesterase Inhibitors (Donepezil, Galantamine, Rivastigmine) for Alzheimer's cognitive decline; NMDA antagonists (Memantine). Avoid antipsychotics unless strictly necessary.",
    boardTip: "Delirium is characterized by acute, fluctuating disturbances in attention and awareness (usually medical causes); dementia (NCD) is gradual, chronic cognitive loss."
  },
  "Personality Disorders": {
    therapies: "Dialectical Behavior Therapy (DBT) is the gold standard for Borderline PD. Schema Therapy, Mentalization-Based Therapy (MBT), and CBT for others.",
    medications: "No medications are FDA-approved to treat personality disorders. Medications may be prescribed for comorbid depression, anxiety, impulsivity, or paranoia.",
    boardTip: "Personality disorders are categorized into 3 clusters: Cluster A (Odd/Eccentric), Cluster B (Dramatic/Erratic/Emotional), and Cluster C (Anxious/Fearful)."
  },
  "Paraphilic Disorders": {
    therapies: "Cognitive Behavioral Therapy (CBT) focusing on cognitive restructuring, relapse prevention, empathy training, and aversion therapy under supervision.",
    medications: "Anti-androgens (Medroxyprogesterone acetate) or gonadotropin-releasing hormone (GnRH) analogs to reduce testosterone levels and libido in severe or high-risk cases.",
    boardTip: "A paraphilia is only classified as a Paraphilic Disorder if it causes distress or impairment to the individual, or involves harm or non-consenting individuals."
  }
};

export function getDisorderTreatments(id: string, category: string): TreatmentInfo {
  // Try exact id match
  if (SPECIFIC_TREATMENTS[id]) {
    return SPECIFIC_TREATMENTS[id];
  }
  
  // Try lowercase matching for ID
  const cleanId = id.toLowerCase();
  for (const key of Object.keys(SPECIFIC_TREATMENTS)) {
    if (cleanId === key || cleanId.includes(key) || key.includes(cleanId)) {
      return SPECIFIC_TREATMENTS[key];
    }
  }

  // Fallback to category defaults
  if (CATEGORY_TREATMENTS[category]) {
    return CATEGORY_TREATMENTS[category];
  }

  // Final fallback
  return {
    therapies: "Cognitive Behavioral Therapy (CBT), psychiatric evaluation, individualized counseling, and age-appropriate support groups.",
    medications: "Symptomatic pharmacotherapy based on primary functional impairment and matching diagnostic specifiers (e.g., SSRIs for comorbid distress, or close family medicine follow-ups).",
    boardTip: "Always prioritize psychoeducation, safety, and establishing a robust therapeutic alliance prior to starting intensive diagnostic interventions."
  };
}
