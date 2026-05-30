import React, { useState } from 'react';
import { 
  Brain, User, BookOpen, Scale, Globe, Languages, Heart, Compass, Zap,
  Activity, Sparkles, Sliders, Eye, Users, ChevronRight, Search, Info, HelpCircle
} from 'lucide-react';
import { UserProfile } from '../types';

interface TheoryData {
  id: string;
  title: string;
  author: string;
  mnemonic: {
    phrase: string;
    description: string;
    mapping: { key: string; term: string; explanation: string }[];
  };
  concepts: { title: string; desc: string }[];
  boardPointers: string[];
}

const DEVELOPMENTAL_THEORIES: TheoryData[] = [
  {
    id: 'freud',
    title: 'Psychosexual Theory',
    author: 'Sigmund Freud',
    mnemonic: {
      phrase: 'Old Age People Love Grandchildren',
      description: 'The sequence of Freud\'s 5 psychosexual stages from birth through adulthood:',
      mapping: [
        { key: 'O', term: 'Oral Stage (Birth to 1 Year)', explanation: 'Erogenous zone: Mouth. Primary activities: Sucking, biting. Clinical Fixations: Oral receptive (gullible, dependent) vs Oral aggressive (sarcastic, argumentative).' },
        { key: 'A', term: 'Anal Stage (1 to 3 Years)', explanation: 'Erogenous zone: Anus. Focus: Toilet training. Clinical Fixations: Anal retentive (orderly, stingy, rigid) vs Anal expulsive (messy, disorganized, destructive).' },
        { key: 'P', term: 'Phallic Stage (3 to 6 Years)', explanation: 'Erogenous zone: Genitals. Oedipus & Electra Complexes. Resolution through identification with same-sex parent. Development of Superego.' },
        { key: 'L', term: 'Latency Stage (6 Years to Puberty)', explanation: 'Repression of sexual impulses. Sublimation into schoolwork, hobbies, and same-sex friendships.' },
        { key: 'G', term: 'Genital Stage (Puberty Onward)', explanation: 'Erogenous zone: Genitals (mature). Re-awakening of sexual instincts with focus on mutual, healthy relationships.' }
      ]
    },
    concepts: [
      { title: 'The Tripartite Mind', desc: 'Id (pleasure principle, primary process thinking), Ego (reality principle, secondary process thinking), and Superego (moral branch, conscience and ego-ideal).' },
      { title: 'Fixation & Regression', desc: 'Fixation occurs when libido is arrested at a developmental level due to under-gratification or over-gratification. Regression is reverting to an earlier stage under extreme stress.' },
      { title: 'Defense Mechanisms', desc: 'Unconscious strategies deployed by the Ego to manage neurotic or moral anxiety (e.g., sublimation, projection, reaction formation).' }
    ],
    boardPointers: [
      'Focus on the distinction between oral-passive and oral-sadistic traits.',
      'Anal-retentive traits correspond to obsessive-compulsive traits in later life.',
      'Superego development culminates during the Phallic stage via identification with the same-sex parent.'
    ]
  },
  {
    id: 'erikson',
    title: 'Psychosocial Theory',
    author: 'Erik Erikson',
    mnemonic: {
      phrase: 'Trust the Auto in Indiana; Industry Identifies Intimate Generals\' Integrity',
      description: 'The 8 chronological developmental crises, matched with their psychosocial virtues (THI-I-I-L-C-W):',
      mapping: [
        { key: 'Trust', term: 'Trust vs. Mistrust (0 - 18 months)', explanation: 'Virtue: HOPE. Important relation: Mother. Focus on safety and caregiver reliability.' },
        { key: 'Auto', term: 'Autonomy vs. Shame/Doubt (18mo - 3yr)', explanation: 'Virtue: WILL. Important relation: Parents. Self-reliance and control over bodily functions.' },
        { key: 'Indiana', term: 'Initiative vs. Guilt (3 - 5 years)', explanation: 'Virtue: PURPOSE. Important relation: Family. Goal-directed play, trying out roles, exploring boundaries.' },
        { key: 'Industry', term: 'Industry vs. Inferiority (5 - 12 years)', explanation: 'Virtue: COMPETENCE. Important relation: School & Peers. Skill mastery, academic achievement, tool usage.' },
        { key: 'Identifies', term: 'Identity vs. Role Confusion (12 - 18yr)', explanation: 'Virtue: FIDELITY. Important relation: Peers/In-groups. Crisis of ego identity, occupational goals.' },
        { key: 'Intimate', term: 'Intimacy vs. Isolation (18 - 40 years)', explanation: 'Virtue: LOVE. Important relation: Partners & Friends. Deep emotional commitment, vulnerability.' },
        { key: 'Generals', term: 'Generativity vs. Stagnation (40 - 65yr)', explanation: 'Virtue: CARE. Important relation: Household/Workmates. Guiding next generations, legacy creation.' },
        { key: 'Integrity', term: 'Ego Integrity vs. Despair (65+ years)', explanation: 'Virtue: WISDOM. Important relation: Mankind. Life review, resolution of existential meaning.' }
      ]
    },
    concepts: [
      { title: 'Epigenetic Principle', desc: 'Erikson\'s core postulate that anything that grows has a ground plan, with each part having its time of special ascendancy, culminating in a functional whole.' },
      { title: 'Identity Crisis', desc: 'A turning point or normal adolescent transition milestone of active exploration of alternatives before committing to a unified ego identity.' },
      { title: 'Syntonic vs. Dystonic', desc: 'Each stage represents a conflict between a positive/syntonic element (e.g., Trust) and a negative/dystonic element (e.g., Mistrust) which must be resolved adaptively.' }
    ],
    boardPointers: [
      'The psychosocial crisis is NOT a catastrophe but a turning point of increased vulnerability and potential.',
      'The virtue of "Fidelity" is associated with successful resolution of the adolescence crisis.',
      'Know the "Radius of Significant Relations" for each stage: e.g., Mesosystem peers for adolescence, Microsystem parents for toddlerhood.'
    ]
  },
  {
    id: 'piaget-cog',
    title: 'Cognitive Development',
    author: 'Jean Piaget',
    mnemonic: {
      phrase: 'Some People Can Fly',
      description: 'The 4 primary stages of logical system development in children:',
      mapping: [
        { key: 'S', term: 'Sensorimotor Stage (Birth to 2 Years)', explanation: 'Thought is localized in physical reflexes and sensory actions. Milestone: Object Permanence (around 8 months), Deferred Imitation.' },
        { key: 'P', term: 'Preoperational Stage (2 to 7 Years)', explanation: 'Milestone: Symbolic Function. Cognitive barriers: Egocentrism (Three Mountain Task), Animism, Centration, Lack of Conservation, Irreversibility.' },
        { key: 'C', term: 'Concrete Operational Stage (7 to 11 Years)', explanation: 'Emergence of mental operations for concrete objects. Milestones: Conservation, Decentration, Reversibility, Seriation, Transitivity, Class Inclusion.' },
        { key: 'F', term: 'Formal Operational Stage (11 Years Onward)', explanation: 'Abstract logical reasoning. Milestones: Hypothetico-Deductive Reasoning, Propositional Thought, Systematic Combinatorial Analysis.' }
      ]
    },
    concepts: [
      { title: 'Schemas, Assimilation, & Accommodation', desc: 'Schemas are mental structures. Assimilation inserts new info into existing schemas. Accommodation alters schemas to fit new info.' },
      { title: 'Equilibration', desc: 'The self-regulatory mechanism that drives cognitive growth. The brain moves from equilibrium to disequilibrium (when new experiences conflict with beliefs) and back to a higher state of cognitive balance.' },
      { title: 'Sensorimotor Substage Mnemonic', desc: 'Roosters Peck Seeds, Chickens Talk Inwardly: 1. Simple Reflexes, 2. Primary Circular (own body), 3. Secondary Circular (external actions), 4. Coordination of Secondary (intentionality), 5. Tertiary Circular (experimentation), 6. Internalization of Schemes (insight, mental symbols).' }
    ],
    boardPointers: [
      'Understand the A-not-B error: infants look for hidden objects in the previous spot (A) even after seeing it moved to (B).',
      'Conservation depends on identity, compensation, and reversibility.',
      'Piagetian clinical method utilizes semi-structured clinical interviews to track mistakes as clues to structures.'
    ]
  },
  {
    id: 'kohlberg',
    title: 'Moral Development',
    author: 'Lawrence Kohlberg',
    mnemonic: {
      phrase: 'Partners Constantly Practice: Obedient Individuals Get Social Social Understanding',
      description: 'The structure of 3 levels (P-C-P) and 6 sequential stages of moral reasoning:',
      mapping: [
        { key: 'Partners', term: 'LEVEL 1: Pre-Conventional Morality', explanation: 'Morality is externally controlled. Rules are obeyed to avoid pain or gain rewards.' },
        { key: 'Constantly', term: 'LEVEL 2: Conventional Morality', explanation: 'Conformity to social expectations. Maintaining relationships and social systems is vital.' },
        { key: 'Practice', term: 'LEVEL 3: Post-Conventional Morality', explanation: 'Morality is defined by abstract self-chosen ethical principles.' },
        { key: 'Obobedient', term: 'Stage 1: Punishment-Obedience Orientation', explanation: 'Physical consequences determine goodness. If punished, it was bad.' },
        { key: 'Individuals', term: 'Stage 2: Instrumental Relativist (Marketplace)', explanation: 'Conforms to get favors. "Scratch my back and I\'ll scratch yours."' },
        { key: 'Get', term: 'Stage 3: Good Boy/Nice Girl Interpersonal', explanation: 'Seeking approval, loyalty, and conforming to public stereotypic expectations.' },
        { key: 'Social', term: 'Stage 4: Law & Order (Social System Maintenance)', explanation: 'Duty-driven, obeys rules to preserve social stability. Rules are absolute.' },
        { key: 'Social 2', term: 'Stage 5: Social Contract & Individual Rights', explanation: 'Rules are seen as flexible tools. Greatest good for the greatest number.' },
        { key: 'Understanding', term: 'Stage 6: Universal Ethical Principles', explanation: 'Self-chosen conscience guidance, e.g., justice, human rights, human dignity.' }
      ]
    },
    concepts: [
      { title: 'Cognitive Conflict (Heinz Dilemma)', desc: 'Kohlberg used hypothetical scenarios where values clash (e.g., stealing a drug to save a dying spouse) to analyze the structure of justification behind moral choices, not the choice itself.' },
      { title: 'Invariant Sequence Scale', desc: 'Stages represent structurally complete, hierarchical cognitive frameworks. People cannot skip stages or regress except under cognitive degeneration.' }
    ],
    boardPointers: [
      'Kohlberg was influenced heavily by Jean Piaget\'s cognitive stages.',
      'Most adult societies average at Stage 3 or Stage 4 reasoning.',
      'Critical exam item: Kohlberg\'s system is criticized for being culturally biased (Western individualistic) and gender-biased.'
    ]
  },
  {
    id: 'gilligan',
    title: 'Ethics of Care Theory',
    author: 'Carol Gilligan',
    mnemonic: {
      phrase: 'I Save Somebody\'s Neighborly Values',
      description: 'Gilligan\'s 3 stages and 2 transitions of female moral development focused on relationships instead of justice:',
      mapping: [
        { key: 'I', term: 'Pre-Conventional Stage: Individual Survival', explanation: 'Goal is individual survival. Focus is exclusively on self-interest and personal needs.' },
        { key: 'Save / Transition 1', term: 'Transition 1: Selfishness to Responsibility', explanation: 'Recognizes that caring for self must incorporate consideration of other people.' },
        { key: 'Somebody / Conventional', term: 'Conventional Stage: Self-Sacrifice', explanation: 'Goodness equated with self-sacrifice. Putting others\' needs ahead of one\'s own.' },
        { key: 'Neighborly / Transition 2', term: 'Transition 2: Goodness to Truth', explanation: 'Realizes that self-sacrifice is unbalanced. Care must include both self and other.' },
        { key: 'Values / Post-Conv', term: 'Post-Conventional Stage: Morality of Nonviolence', explanation: 'Integration of needs. Principle of non-violence: hurting any human (including self) is immoral.' }
      ]
    },
    concepts: [
      { title: 'Justice vs. Care Voice', desc: 'Kohlberg\'s model ranks "justice voice" (abstract laws) higher than "interpersonal care voice," causing women (who prioritize relational care) to score lower. Gilligan asserts both are equally mature.' },
      { title: 'Relational Self', desc: 'Development in girls centers on forming a connected grid of relationships, rather than separation-individuation pathways of autonomy.' }
    ],
    boardPointers: [
      'Remember Gilligan\'s landmark critique book: "In a Different Voice" (1982).',
      'The core transition is from "Selfishness" to "Sacrifice" to "Universal Non-injury/Truth".'
    ]
  },
  {
    id: 'piaget-moral',
    title: 'Moral Reasoning Theory',
    author: 'Jean Piaget',
    mnemonic: {
      phrase: 'Hetero to Auto (Rules from HEAVEN vs Rules by AGREEMENT)',
      description: 'Piaget\'s model mapping development of child rule conceptualization:',
      mapping: [
        { key: 'Hetero', term: 'Heteronomous Morality (or Moral Realism, Ages 4-7)', explanation: 'Rules are absolute, sacred, immutable, created by authority. Imminent Justice exists (wrongdoing leads to automatic punishment).' },
        { key: 'Transition', term: 'Incipit Cooperation Transition Phase (Ages 7-10)', explanation: 'Children play rules by joint consensus but still view them with rigid, semi-flexible boundaries.' },
        { key: 'Auto', term: 'Autonomous Morality (or Cooperation Relativism, Age 10+)', explanation: 'Rules are social conventions that can be re-negotiated. Focus on intent of actions rather than the physical size of damage.' }
      ]
    },
    concepts: [
      { title: 'Objective Responsibility', desc: 'In heteronomous stages, children assess blame based purely on physical consequences. For example, breaking 15 cups accidentally is worse than breaking 1 cup intentionally.' },
      { title: 'Subjective Responsibility', desc: 'In autonomous stages, judgment is based on intentions. For example, breaking 1 cup while trying to steal cookies is worse than breaking 15 cups accidentally while helping mother.' }
    ],
    boardPointers: [
      'Question scenario: A child breaks a glass while trying to save a cat vs breaks five glasses while trying to steal jam. A heteronomous child blames the savior for breaking five. An autonomous child blames the thief.',
      'Imminent Justice belief disappears as soon as kids enter autonomous stages.'
    ]
  },
  {
    id: 'bronfenbrenner',
    title: 'Bioecological Systems Theory',
    author: 'Urie Bronfenbrenner',
    mnemonic: {
      phrase: 'My Medium Elephant Makes Cookies',
      description: 'The five concentric environmental levels that continuously shape human developmental dynamics:',
      mapping: [
        { key: 'M', term: 'Microsystem', explanation: 'The immediate environment with direct contact (e.g., parents, siblings, peer group, preschool teachers).' },
        { key: 'M 2', term: 'Mesosystem', explanation: 'Linkages or connections between the child\'s microsystems (e.g., Parent-Teacher conferences, home-school interaction).' },
        { key: 'E', term: 'Exosystem', explanation: 'Indirect settings that affect development but where the child has no active role (e.g., parents\' workplace, school board policies).' },
        { key: 'M 3', term: 'Macrosystem', explanation: 'The overarching cultural blueprint, subcultural values, ideologies, economic status, and historical frameworks.' },
        { key: 'C', term: 'Chronosystem', explanation: 'The temporal dimension: life-events, sociohistorical changes, environmental transitions (e.g., divorce, tech revolutions, war).' }
      ]
    },
    concepts: [
      { title: 'PPCT Model', desc: 'Development is a function of Process (proximal interactions), Person (bio traits), Context (systems), and Time (chronosystem).' },
      { title: 'Bidirectionality / Reciprocity', desc: 'Children do not just receive environmental influences; they actively shape and alter their ecological systems.' }
    ],
    boardPointers: [
      'A change in the parent\'s work shifts (longer hours) represents an EXOSYSTEM change affecting the child.',
      'The pandemic or a move of residence is analyzed under the CHRONOSYSTEM.',
      'Mesosystem consists of interactions between TWO separate Microsystems (e.g., parent interacting with classmate).'
    ]
  },
  {
    id: 'vygotsky',
    title: 'Sociocultural Theory',
    author: 'Lev Vygotsky',
    mnemonic: {
      phrase: 'Students Practice Zone Mastery',
      description: 'Four key constructs driving cognitive growth through cultural mediation:',
      mapping: [
        { key: 'S', term: 'Scaffolding', explanation: 'Temporary support mechanisms provided by caregivers or teachers, dynamically fading as child competence grows.' },
        { key: 'P', term: 'Private Speech', explanation: 'Self-regulatory, audible self-talk used by children to solve complex tasks. Later gets internalized into silent "inner speech".' },
        { key: 'Z', term: 'Zone of Proximal Development (ZPD)', explanation: 'The cognitive space between what a learner can do independently and what they can achieve under skilled peer or adult guidance.' },
        { key: 'M', term: 'More Knowledgeable Other (MKO)', explanation: 'Anyone (peers, teachers, parents, computers) who has a higher skill level or cognitive capacity than the learner on a specific task.' }
      ]
    },
    concepts: [
      { title: 'Cultural Mediation & Psychological Tools', desc: 'Vygotsky believed language is the most powerful cognitive mediator and psychological tool that transforms biological functions into higher mental processes.' },
      { title: 'Social Origins of Thought', desc: 'Every function in the child\'s cultural development appears twice: first, on the social level (interpsychological); later, on the individual level (intrapsychological).' }
    ],
    boardPointers: [
      'Piaget saw private speech as egocentric; Vygotsky saw it as an essential self-regulatory cognitive tool.',
      'Collaborative learning is backed heavily by Vygotskian theories.',
      'ZPD is the dynamic, fluid threshold of learning, not a static potential index.'
    ]
  },
  {
    id: 'separation-individuation',
    title: 'Attachment & Separation',
    author: 'Mary Ainsworth & Margaret Mahler',
    mnemonic: {
      phrase: 'Ainsworth: S-A-R-D | Mahler: Always Share Happy Practices with Rapid Children',
      description: 'The separation-individuation stages (Mahler) and infant attachment styles (Ainsworth):',
      mapping: [
        { key: 'S-A-R-D', term: 'Ainsworth Attachment Styles', explanation: 'Secure (confident explore, comforted upon return), Avoidant (ignores mother, flat physical affect), Resistant/Ambivalent (clings, angry upon return), Disorganized (fearful, freeze patterns).' },
        { key: 'Always / Autistic', term: 'Ah-1: Normal Autistic Phase (0-1 month)', explanation: 'Primary narcissism. Homeostatic equilibrium. Non-response to external stimuli.' },
        { key: 'Share / Symbiotic', term: 'Ah-2: Normal Symbiotic Phase (1-5 months)', explanation: 'Fusion of self with mother. Child acts as if mother and self are a single omnipotent boundary system.' },
        { key: 'Happy / Hatching', term: 'Ind-1: Hatching Differentiation Subphase (5-9mo)', explanation: 'First separation sign. Visual and tactile exploration of mother vs others.' },
        { key: 'Practices / Practicing', term: 'Ind-2: Practicing Subphase (9-16 months)', explanation: 'Upright locomotion. Explores away from mother, uses her as an anchor for "emotional refueling".' },
        { key: 'Rapid / Rapprochement', term: 'Ind-3: Rapprochement Subphase (16-24 months)', explanation: 'Ambitendency. High awareness of separateness causes intense separation anxiety, leading to shadow-and-dart patterns.' },
        { key: 'Children / Consolidation', term: 'Ind-4: Consolidation & Object Constancy (24-36mo)', explanation: 'Internalization of positive maternal image. Supports independent functioning even in long physical absences of mother.' }
      ]
    },
    concepts: [
      { title: 'Strange Situation', desc: 'Ainsworth\'s standardized laboratory paradigm involving separation and reunion with mother in an unfamiliar playroom. Explores how infant manages activation of attachment behavioral system.' },
      { title: 'Emotional Refueling', desc: 'Mahler\'s concept of toddlers returning briefly to touch or look at mother to restore homeostatic energy during active locomotor plays.' },
      { title: 'Object Constancy', desc: 'The cognitive-affective resolution where child holds secure mental representations of secure attachment figures even when needs are frustrated.' }
    ],
    boardPointers: [
      'Disorganized attachment is statistically common where there is exposure to child abuse, extreme neglect, or clinical depression in mothers.',
      'Rapprochement is marked by "splitting" or "ambivalence": child wants to fuse with mother but fears engulfment.',
      'Mary Ainsworth worked with Bowlby, using separation observations to formulate attachment types.'
    ]
  },
  {
    id: 'bowlby',
    title: 'Ethological Attachment Theory',
    author: 'John Bowlby',
    mnemonic: {
      phrase: 'Please Always Claim Reciprocity',
      description: 'The four developmental phases of infant-caregiver attachment:',
      mapping: [
        { key: 'Please', term: 'Preattachment Phase (Birth to 6 Weeks)', explanation: 'Built-in signaling behaviors (crying, smiling, grasping) draw close contact, but infant does not mind being left with unfamiliar adults.' },
        { key: 'Always', term: 'Attachment-in-the-Making (6 Wk to 8 Months)', explanation: 'Differentiated responsiveness. Responds differently to mother than strangers but no separation anxiety yet.' },
        { key: 'Claim', term: 'Clear-Cut Attachment (8 Months to 2 Years)', explanation: 'Emergence of target attachment. Separation anxiety peaks and stranger anxiety begins. Uses caregiver as a secure base.' },
        { key: 'Reciprocity', term: 'Reciprocal Relationship (18 Months - 2 Yr+)', explanation: 'Language progress lets toddlers understand goals of parents. Decreased separation protest as they negotiate plans.' }
      ]
    },
    concepts: [
      { title: 'Internal Working Models (IWM)', desc: 'Cognitive constructs of expectations about the availability and responsiveness of attachment figures, serving as the blueprint for all future relationships.' },
      { title: 'Monotropy', desc: 'Bowlby\'s hypothesis that infants have a primary instinctual bias to bond with ONE major attachment figure (primary caregiver).' },
      { title: 'Maternal Deprivation', desc: 'The psychological consequence of separating an infant/child from its mother figure, leading to long-term cognitive and emotional deficits (e.g. affectionless psychopathy).' }
    ],
    boardPointers: [
      'Stranger anxiety and separation anxiety are typical components of healthy evolutionarily adaptive development peaking around 10-14 months.',
      'The infant\'s internal working model functions as an enduring cognitive guide through personality growth.'
    ]
  },
  {
    id: 'marcia',
    title: 'Identity Status Theory',
    author: 'James Marcia',
    mnemonic: {
      phrase: 'Do Fine Making Achievements',
      description: 'Marcia\'s 4 identity statuses determined by a matrix of Crisis (Exploration) and Commitment:',
      mapping: [
        { key: 'Do', term: 'Identity Diffusion (Low Crisis, Low Commitment)', explanation: 'No active exploration of options, no commitment made. Characterized by directionless apathy, low self-esteem.' },
        { key: 'Fine', term: 'Identity Foreclosure (Low Crisis, High Commitment)', explanation: 'Commitments made without exploration, usually adopting parents\' choices blindly. Rigid, authoritarian.' },
        { key: 'Making', term: 'Identity Moratorium (High Crisis, Low Commitment)', explanation: 'Active exploration period, searching for identity answers without solid commitment. Anxious but progressive.' },
        { key: 'Achievements', term: 'Identity Achievement (High Crisis, High Commitment)', explanation: 'Successful self-exploration resulting in self-constructed, firm vocational and ideological commitments.' }
      ]
    },
    concepts: [
      { title: 'Crisis (Exploration)', desc: 'A period of cognitive struggle where an individual questions existing home values to forge personalized career, political, and lifestyle preferences.' },
      { title: 'MAMA Cycles', desc: 'Adult identity fluctuates continuously. Achieved individuals frequently cycle back into Moratorium, then Achievement (M-A-M-A) as life changes occur.' }
    ],
    boardPointers: [
      'Foreclosed adolescents have low anxiety levels but are extremely rigid when values are challenged.',
      'Moratorium status has the highest levels of current anxiety but is considered highly adaptive for developmental progression.',
      'Diffusion is developmentally normal in young children but pathological if prolonged into late young adulthood.'
    ]
  },
  {
    id: 'pavlov',
    title: 'Classical Conditioning',
    author: 'Ivan Pavlov',
    mnemonic: {
      phrase: 'U-U-C-C: Unconditioned triggers Conditioned Connections',
      description: 'The flow of involuntary associative learning based on stimulus pairings:',
      mapping: [
        { key: 'US', term: 'Unconditioned Stimulus (UCS/US)', explanation: 'A stimulus that automatically coordinates an unlearned, innate biological response (e.g., food on tongue).' },
        { key: 'UR', term: 'Unconditioned Response (UCR/UR)', explanation: 'An unlearned, automatic response triggered by the UCS (e.g., salivation to food).' },
        { key: 'CS', term: 'Conditioned Stimulus (CS)', explanation: 'Initially neutral stimulus (e.g., metronome/bell) that, through repeated pairings with the UCS, triggers a response.' },
        { key: 'CR', term: 'Conditioned Response (CR)', explanation: 'Learn response targeted to the CS alone, mimicking or predicting the UCR.' }
      ]
    },
    concepts: [
      { title: 'Extinction & Spontaneous Recovery', desc: 'Extinction is the weakening of the CS-CR connection when the CS is repeatedly presented without the UCS. Spontaneous Recovery is the sudden reappearance of an extinguished CR after a rest period.' },
      { title: 'Generalization & Discrimination', desc: 'Generalization occurs when stimuli similar to the CS evoke the CR (e.g., Albert fearing all white furry objects). Discrimination is learning to respond exclusively to the original CS.' },
      { title: 'Higher-Order Conditioning', desc: 'Pairing a new neutral stimulus with an established CS to turn the new stimulus into a secondary CS (e.g., light paired with bell).' }
    ],
    boardPointers: [
      'John Watson\'s "Little Albert" experiment applied Pavlovian principles to classical conditioning of human phobias.',
      'In behavior therapy, Systematic Desensitization is built entirely on counterconditioning and extinction principles.'
    ]
  },
  {
    id: 'bandura',
    title: 'Social Learning Theory',
    author: 'Albert Bandura',
    mnemonic: {
      phrase: 'All Reviewees Receive Motivation (A-R-R-M)',
      description: 'The four sequential sub-processes of observational learning:',
      mapping: [
        { key: 'A', term: 'Attention', explanation: 'Learner must actively focus on the model\'s behavior. High status, attractive, or similar models command more attention.' },
        { key: 'R', term: 'Retention', explanation: 'The model\'s behavior must be encoded in long-term memory via visual symbols or verbal imagery.' },
        { key: 'R 2', term: 'Reproduction', explanation: 'The learner must possess the physical/motor capability to display the stored mental representation.' },
        { key: 'M', term: 'Motivation', explanation: 'Presence of reinforcing consequences (direct, vicarious, or self-reinforcement) that prompt performance.' }
      ]
    },
    concepts: [
      { title: 'Triadic Reciprocal Determinism', desc: 'Human functioning is a reciprocal interaction of three factors: Person (cognitions, biology), Behavior (actions, actions display), and Environment (social context).' },
      { title: 'Self-Efficacy', desc: 'An individual\'s belief in their capabilities to organize and execute courses of action to achieve desired goal outcomes.' },
      { title: 'Vicarious Reinforcement / Punishment', desc: 'Modifying behavior by observing the positive or negative consequences delivered to others (the models), bypassing direct personal experiences.' }
    ],
    boardPointers: [
      'Crucial distinction: Learning (acquisition) vs. Performance. A child can acquire a behavior (Bobo Doll hitting) but only perform it when motivation is presented.',
      'Albert Bandura renamed his model to Social Cognitive Theory to reflect cognitive processes.'
    ]
  },
  {
    id: 'skinner',
    title: 'Operant Conditioning',
    author: 'B.F. Skinner',
    mnemonic: {
      phrase: 'P-N-R-P: Positive adds, Negative subtracts, Reinforcement builds, Punishment breaks',
      description: 'Consequence matrix governing voluntary behavior rates:',
      mapping: [
        { key: 'PR', term: 'Positive Reinforcement (PR)', explanation: 'Presenting a desirable stimulus to increase targeted behavior (e.g., giving tokens for completing clinical tasks).' },
        { key: 'NR', term: 'Negative Reinforcement (NR)', explanation: 'Removing an aversive stimulus to increase targeted behavior (e.g., parent stops nagging child when room is cleaned).' },
        { key: 'PP', term: 'Positive Punishment (PP)', explanation: 'Presenting an aversive stimulus to decrease a behavior (e.g., scolding for screaming in the lab).' },
        { key: 'NP', term: 'Negative Punishment (NP)', explanation: 'Removing a desirable stimulus to decrease a behavior (e.g., grounding/taking phone away, Response Cost).' }
      ]
    },
    concepts: [
      { title: 'Schedules of Reinforcement', desc: 'Ratio (responses) vs. Interval (time), Fixed (set) vs. Variable (unpredictable). Mnemonic: FR (scallop-free stairs), VR (highest response rate, slot machines, highly extinction-resistant).' },
      { title: 'Shaping by Successive Approximations', desc: 'Developing complex new behaviors by reinforcing progressively closer steps toward the terminal target response.' },
      { title: 'Primary vs. Secondary Reinforcers', desc: 'Primary: naturally satisfying (food/warmth). Secondary: conditioned satisfaction (money, tokens, grades).' }
    ],
    boardPointers: [
      'Negative reinforcement is NOT punishment. It is reinforcement; it INCREASES a target behavior by removing something unpleasant.',
      'Variable Ratio (VR) schedule produces the highest rate of steady responding with absolute immunity to quick extinction.'
    ]
  },
  {
    id: 'kolb',
    title: 'Experiential Learning Theory',
    author: 'David Kolb',
    mnemonic: {
      phrase: 'Crazy Rabbit Attacks Everyone (C-R-A-E)',
      description: 'The four stages of David Kolb\'s cycle of experiential learning:',
      mapping: [
        { key: 'C', term: 'Concrete Experience (CE)', explanation: 'Active direct involvement. Sensing and feeling. Intuitive, concrete engagement.' },
        { key: 'R', term: 'Reflective Observation (RO)', explanation: 'Stepping back, observing, and reflecting on the concrete experience. Viewing from multiple viewpoints.' },
        { key: 'A', term: 'Abstract Conceptualization (AC)', explanation: 'Logically analyzing ideas, planning systematic intellectual theories, and drawing structural insights.' },
        { key: 'E', term: 'Active Experimentation (AE)', explanation: 'Testing the newly formulated intellectual concepts in fresh, live settings, leading back to new concrete experience.' }
      ]
    },
    concepts: [
      { title: 'Learning Styles', desc: 'Derived from crossing CE/AC with AE/RO: Diverging (Sensitive, creative), Assimilating (Logical, theoretical), Converging (Practical, technical), Accommodating (Hands-on, trial and error).' }
    ],
    boardPointers: [
      'Learning is a continuous cycle; any learner can start at any stage but must navigate all four for deep schemas.',
      'Kolb\'s model is based on cognitive-humanist principles (influenced by Dewey, Lewin, and Piaget).'
    ]
  },
  {
    id: 'wilson',
    title: 'Evolutionary Theory (Sociobiology)',
    author: 'Edward O. Wilson',
    mnemonic: {
      phrase: 'All Kinsfolk Increase Gene Expansions (A-K-I-G-E)',
      description: 'The core foundations of Wilson\'s evolutionary and genetic approach to social behaviors:',
      mapping: [
        { key: 'A', term: 'Altruism Explanation', explanation: 'Self-sacrificing behavior that benefits others, which seems counter-intuitive to natural selection but raises evolutionary fitness of group genes.' },
        { key: 'K', term: 'Kin Selection', explanation: 'Evolutionary strategy that favors the reproductive success of an organism\'s relatives, even at a cost to its own survival.' },
        { key: 'I', term: 'Inclusive Fitness', explanation: 'The sum of domestic direct fitness (individual survival) and indirect fitness (spreading identical genes through relatives).' },
        { key: 'G', term: 'Gene-Culture Coevolution', explanation: 'The reciprocal feedback loop between human genetics and cultural beliefs over generations.' },
        { key: 'E', term: 'Evolutionary Adaptations', explanation: 'Behavioral mechanisms (like attachment, fear, social hierarchies) are selected because they solved ancestral survival problems.' }
      ]
    },
    concepts: [
      { title: 'Sociobiology', desc: 'The systematic study of the biological basis of all social behavior, drawing from evolutionary biology, ethology, genetics, and population ecology.' },
      { title: 'Epigenetic Rules', desc: 'Genetically determined restraints or tendencies of cognitive development that lean human culture toward specific adaptive patterns (e.g., incest taboos).' }
    ],
    boardPointers: [
      'E.O. Wilson\'s 1975 masterpiece "Sociobiology: The New Synthesis" consolidated these fields.',
      'Altruism is mathematically modeled through "Hamilton\'s Rule": b*r > c (benefit * relatedness > cost).'
    ]
  }
];

interface DevConceptsPanelProps {
  profile?: UserProfile | null;
  onNavigate?: (tabId: string) => void;
}

export const DevConceptsPanel: React.FC<DevConceptsPanelProps> = ({ profile, onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTheory, setSelectedTheory] = useState<TheoryData>(DEVELOPMENTAL_THEORIES[0]);

  const isTrial = profile?.tier?.toLowerCase().includes('trial');
  const allowedTrialCount = 5;
  const isLocked = isTrial && DEVELOPMENTAL_THEORIES.findIndex(t => t.id === selectedTheory.id) >= allowedTrialCount;

  const filteredTheories = DEVELOPMENTAL_THEORIES.filter(theory => 
    theory.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    theory.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    theory.mnemonic.phrase.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentIndex = DEVELOPMENTAL_THEORIES.findIndex(t => t.id === selectedTheory.id);
  const prevTheory = currentIndex > 0 ? DEVELOPMENTAL_THEORIES[currentIndex - 1] : null;
  const nextTheory = currentIndex < DEVELOPMENTAL_THEORIES.length - 1 ? DEVELOPMENTAL_THEORIES[currentIndex + 1] : null;

  return (
    <div className="space-y-6" id="dev-concepts-panel-container">
      {/* HEADER CARD */}
      <div className="bg-gradient-to-r from-pine to-emerald-800 rounded-3xl p-6 text-cream shadow-md border border-pine-light/20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 bg-mint/20 text-mint border border-mint/30 px-3 py-1 rounded-full text-[10px] font-mono font-black uppercase tracking-wider">
              <Brain className="w-3.5 h-3.5 animate-pulse" /> BLEPP / PmLE Core Review
            </div>
            <h2 className="text-3xl font-display font-bold tracking-tight">Developmental Psychology</h2>
            <p className="text-xs text-emerald-100 max-w-2xl font-sans leading-relaxed">
              CHED Memorandum Order (CMO) No. 34 syllabus guidelines. Study 16 landmark developmental theories with active, high-yield psychometric exam mnemonics and board pointers.
            </p>
          </div>
        </div>
      </div>

      {/* CONTROLS & FILTERING - SINGLE COLUMN STRUCTURE */}
      <div className="bg-white border border-gray-150 rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-sage" />
            <input 
              type="text" 
              placeholder="Search by theorist, stage, or mnemonic phrase..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-foam/40 border border-gray-150 pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm font-sans focus:border-pine outline-none transition duration-150 text-gray-800"
            />
          </div>
          
          {/* Dropdown Selector */}
          <div className="md:w-80">
            <select
              value={selectedTheory.id}
              onChange={(e) => {
                const found = DEVELOPMENTAL_THEORIES.find(t => t.id === e.target.value);
                if (found) setSelectedTheory(found);
              }}
              className="w-full bg-white border border-gray-150 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold font-mono text-pine focus:border-pine outline-none transition duration-150 shadow-sm cursor-pointer"
            >
              {DEVELOPMENTAL_THEORIES.map((theory) => (
                <option key={theory.id} value={theory.id}>
                  {theory.title} — {theory.author}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Selection Pills (Horizontal Scrollable) */}
        {filteredTheories.length > 0 && (
          <div className="space-y-1.5 pt-1">
            <span className="text-[9px] uppercase tracking-widest font-black text-gray-400 font-mono block">
              Quick Selection Chips ({filteredTheories.length})
            </span>
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
              {filteredTheories.map((theory) => {
                const isActive = selectedTheory.id === theory.id;
                return (
                  <button
                    key={theory.id}
                    onClick={() => setSelectedTheory(theory)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer ${
                      isActive 
                        ? 'bg-pine text-cream ring-2 ring-pine/20' 
                        : 'bg-foam/20 hover:bg-foam/50 text-gray-600 border border-gray-100 hover:border-gray-250'
                    }`}
                  >
                    {theory.author} ({theory.title.split(' ')[0]})
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* SINGLE COLUMN DETAILED SHEET - 1 COLUMN ALWAYS */}
      <div className="bg-white border border-gray-150 rounded-2xl p-6 md:p-8 shadow-sm space-y-7">
        
        {/* Title Block */}
        <div className="border-b border-gray-100 pb-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          <div>
            <h3 className="text-2xl font-display font-black text-pine tracking-tight">{selectedTheory.title}</h3>
            <p className="text-xs sm:text-sm text-gray-500 font-sans mt-1">
              Primary Theorist: <strong className="text-gray-800 font-semibold">{selectedTheory.author}</strong>
            </p>
          </div>
          <span className="text-[9px] uppercase font-mono bg-[#f0fdf4] text-emerald-800 font-extrabold px-3 py-1.5 rounded-md border border-emerald-100/80 tracking-wider">
            CHED DEVELOPMENTAL CORE SYLLABUS
          </span>
        </div>

        {isLocked ? (
          <div className="bg-gradient-to-br from-amber-50/10 to-teal-500/5 border border-dashed border-teal-200/50 rounded-2xl p-6 md:p-8 text-center space-y-4 max-w-xl mx-auto my-6 shadow-sm">
            <span className="inline-flex items-center gap-1 bg-teal-50 border border-teal-100 px-3 py-1 rounded-full text-[10px] font-mono font-extrabold text-teal-800 uppercase tracking-widest leading-none">
              🔒 Premium Syllabus Locked
            </span>
            <h4 className="font-display font-black text-gray-900 text-lg md:text-xl tracking-tight leading-snug">
              Unlock the Full BoardPassPH Developmental Syllabus
            </h4>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-sans font-medium">
              During your clinical trial session, the first 5 core theories (Freud, Erikson, Piaget, Kohlberg, and Gilligan) are fully unlocked. To review Vygotsky, Bandura, Bowlby, Ainsworth, and all 16 board exam syllabi, upgrade to Premium!
            </p>
            <div className="bg-white p-3.5 rounded-xl border border-teal-100 text-left text-xs space-y-2 font-medium font-sans text-gray-700 max-w-md mx-auto shadow-2xs">
              <div className="flex items-start gap-2.5">
                <span className="text-emerald-500 font-extrabold text-[11px] mt-0.5">✓</span>
                <span>Access all <strong>16 developmental theories</strong> with mnemonic decoders</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-emerald-500 font-extrabold text-[11px] mt-0.5">✓</span>
                <span>Get complete Board Exam high-yield recall pointers</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-emerald-500 font-extrabold text-[11px] mt-0.5">✓</span>
                <span>Unlock unrestricted AI question practice & detailed explanations</span>
              </div>
            </div>
            <button
              onClick={() => onNavigate?.('billingTab')}
              className="w-full max-w-sm py-3 bg-gradient-to-r from-emerald-600 to-[#14b8a6] hover:from-emerald-700 hover:to-teal-600 text-cream font-sans font-black text-xs uppercase tracking-wider rounded-xl cursor-pointer shadow-md select-none active:scale-95 transition duration-150 inline-flex items-center justify-center gap-2"
            >
              👑 Unlock Premium via GCash →
            </button>
          </div>
        ) : (
          <>
            {/* HIGH YIELD MNEMONIC BLOCK */}
            <div className="bg-gradient-to-br from-[#fffbeb] to-[#fef3c7]/30 border border-[#fde8bb] rounded-2xl p-5 md:p-6 space-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[9px] uppercase font-mono bg-[#ea580c] text-white font-black px-2.5 py-1 rounded-md tracking-wider">
                  ⭐ HIGH-YIELD REVIEW MNEMONIC
                </span>
                <span className="text-sm md:text-base font-display font-extrabold text-[#7c2d12] italic select-all">
                  "{selectedTheory.mnemonic.phrase}"
                </span>
              </div>
              
              <p className="text-xs sm:text-sm text-amber-950 font-sans leading-relaxed">
                {selectedTheory.mnemonic.description}
              </p>

              {/* Expanded Mnemonic List - Guaranteed 1-column layout for ultimate readability */}
              <div className="space-y-3.5 pt-2">
                {selectedTheory.mnemonic.mapping.map((mapItem, idx) => (
                  <div 
                    key={idx} 
                    className="bg-white/95 p-4 rounded-xl border border-amber-200/50 shadow-xs hover:border-amber-300 transition-all duration-150 flex items-start gap-4"
                  >
                    <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#ea580c] text-white font-mono text-sm font-black shrink-0 shadow-sm mt-0.5">
                      {mapItem.key}
                    </span>
                    <div className="space-y-1 flex-1">
                      <strong className="text-xs sm:text-sm font-mono text-gray-900 block font-bold leading-tight">
                        {mapItem.term}
                      </strong>
                      <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-sans text-justify">
                        {mapItem.explanation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CORE CONCEPTS */}
            <div className="space-y-4">
              <h4 className="text-[10px] sm:text-xs uppercase tracking-widest font-black text-gray-400 font-mono block">
                Syllabus Core Concepts &amp; Paradigm Explanations
              </h4>
              <div className="space-y-4">
                {selectedTheory.concepts.map((concept, idx) => (
                  <div 
                    key={idx} 
                    className="bg-foam/15 border border-gray-150/80 rounded-xl p-5 space-y-2 hover:bg-foam/25 transition duration-150"
                  >
                    <span className="text-xs sm:text-sm font-bold text-pine font-mono block border-l-3 border-mint pl-3">
                      {concept.title}
                    </span>
                    <p className="text-xs sm:text-sm text-gray-650 leading-relaxed font-sans">
                      {concept.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* BOARD EXAM RECALL POINTERS */}
            <div className="bg-gradient-to-br from-[#f0f9ff] to-[#f8fafc] border border-sky-100 rounded-2xl p-5 md:p-6 space-y-4 shadow-xs">
              <h5 className="text-xs sm:text-sm uppercase tracking-wider font-extrabold text-sky-950 flex items-center gap-2">
                <Info className="w-4.5 h-4.5 text-sky-500" /> High-Probability Licensure Recall Pointers
              </h5>
              <ul className="space-y-3 pl-5 list-disc text-xs sm:text-sm text-slate-705 leading-relaxed font-sans">
                {selectedTheory.boardPointers.map((pointer, idx) => (
                  <li key={idx} className="marker:text-sky-500 pl-0.5">
                    {pointer}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        {/* BOTTOM PAGINATION CONTROLS */}
        <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          {prevTheory ? (
            <button
              type="button"
              onClick={() => {
                setSelectedTheory(prevTheory);
                document.getElementById('dev-concepts-panel-container')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-4 py-2.5 text-left border border-gray-200 hover:border-pine hover:bg-foam/10 text-gray-750 rounded-xl transition duration-150 flex items-center gap-2.5 group cursor-pointer"
            >
              <span className="text-lg transition-transform duration-150 group-hover:-translate-x-1 font-bold">←</span>
              <div className="flex flex-col">
                <span className="text-[9px] text-gray-400 font-mono uppercase tracking-wider">Previous Theory</span>
                <span className="text-xs font-bold text-pine">{prevTheory.title}</span>
              </div>
            </button>
          ) : (
            <div className="hidden sm:block" />
          )}

          {nextTheory ? (
            <button
              type="button"
              onClick={() => {
                setSelectedTheory(nextTheory);
                document.getElementById('dev-concepts-panel-container')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-4 py-2.5 text-right border border-gray-200 hover:border-pine hover:bg-foam/10 text-gray-750 rounded-xl transition duration-150 flex items-center justify-end gap-2.5 group cursor-pointer"
            >
              <div className="flex flex-col items-end">
                <span className="text-[9px] text-gray-400 font-mono uppercase tracking-wider font-semibold">Next Theory</span>
                <span className="text-xs font-bold text-pine">{nextTheory.title}</span>
              </div>
              <span className="text-lg transition-transform duration-150 group-hover:translate-x-1 font-bold">→</span>
            </button>
          ) : (
            <div className="hidden sm:block" />
          )}
        </div>

      </div>
    </div>
  );
};
