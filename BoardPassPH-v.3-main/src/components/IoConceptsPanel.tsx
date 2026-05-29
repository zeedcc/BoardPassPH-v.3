import React, { useState, useMemo } from 'react';
import { 
  Briefcase, Network, Layers, ShieldCheck, Database, Award, Info, 
  HelpCircle, ChevronDown, ChevronUp, Search, Flame, UserCheck, 
  RefreshCw, Zap, Users, MessageSquare, Scale, TrendingUp, AlertCircle,
  TrendingDown, CheckCircle, HelpCircle as HelpIcon, ArrowRight, Compass
} from 'lucide-react';
import { UserProfile } from '../types';

interface MappingItem {
  key: string;
  term: string;
  explanation: string;
}

interface SyllabusItem {
  id: string;
  category: 'theories' | 'models' | 'concepts';
  subCategory: string; // e.g. "Classical", "Motivation", "OD"
  title: string;
  theorist_author?: string;
  oneLiner: string;
  description: string;
  highYieldRecall: string;
  colorTheme: 'teal' | 'indigo' | 'amber' | 'emerald' | 'rose' | 'sky' | 'violet';
  details: {
    tenets?: string[];
    mapping?: MappingItem[];
    coreSteps?: string[];
    comparisonTable?: {
      headers: string[];
      rows: string[][];
    };
    pointers: string[];
  };
}

interface IoConceptsPanelProps {
  profile?: UserProfile | null;
  onNavigate?: (tabId: string) => void;
}

export const IoConceptsPanel: React.FC<IoConceptsPanelProps> = ({ profile, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'theories' | 'models' | 'concepts'>('theories');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSubCategory, setActiveSubCategory] = useState<string>('ALL');
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({
    'taylor-sci-mgmt': true // open scientific management by default
  });

  const toggleCard = (id: string) => {
    setExpandedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleAllExpanded = (expand: boolean) => {
    const next: Record<string, boolean> = {};
    filteredItems.forEach(item => {
      next[item.id] = expand;
    });
    setExpandedCards(next);
  };

  // FULL EXHAUSTIVE I/O SYLLABUS DIRECTORY
  const syllabusItems: SyllabusItem[] = useMemo(() => [
    // --- ORGANIZATIONAL THEORIES ---
    // Classical
    {
      id: 'taylor-sci-mgmt',
      category: 'theories',
      subCategory: 'Classical Organizational Theory',
      title: 'Scientific Management (Taylorism)',
      theorist_author: 'Frederick Taylor',
      oneLiner: 'The classic "machine model" of organizations, driving performance through stopwatch studies, extreme simplification, and monetary compensation.',
      description: 'Taylorism treats the organization as a pragmatic machine and employees as cogs. It focuses simply on running more effectively by determining the physical limits of work and establishing the single most streamlined method to finish any given objective.',
      highYieldRecall: 'FATHER OF SCIENTIFIC MANAGEMENT. Premise: "There is one best way to get the job done." Assumes "Economic Man" (workers are motivated purely by rational financial gains).',
      colorTheme: 'teal',
      details: {
        tenets: [
          'Work Simplification: Breaking complex tasks down into small, highly structured, repetitive steps.',
          'Stopwatch & Motion Studies: Measuring physical speeds of workers to identify optimal timing parameters.',
          'Differential Piece-Rate: Direct linear financial incentives matching performance thresholds.'
        ],
        pointers: [
          'Management gathers extensive data from workers who understand the physical tasks best.',
          'Scientific selection of employees: scientifically training them to attain supreme speeds.',
          'Redistribution of labor: Management plans structural steps, and worker executes physical steps.',
          'Primary limitation: Dehumanizing, ignores social networks, psychological burnout, and non-monetary human needs.'
        ]
      }
    },
    {
      id: 'weber-bureaucracy',
      category: 'theories',
      subCategory: 'Classical Organizational Theory',
      title: 'Theory of Bureaucracy',
      theorist_author: 'Max Weber',
      oneLiner: 'An impersonal, highly structured administrative model that guarantees supreme speed, absolute uniformity, and perfect predictability.',
      description: 'Weber, a German sociologist, formulated bureaucracy to replace chaotic, emotional, nepotistic, or traditional management styles with logic, rules, and objective qualifications.',
      highYieldRecall: 'IDEAL BUREAUCRACY. Core driver: Impersonality and strict rules of selection. Eliminates subjective feelings, bias, and favoritism.',
      colorTheme: 'teal',
      details: {
        tenets: [
          'Division of Labor: Standardized specialization of work across designated posts.',
          'Top-down Pyramidal Hierarchy: A strict vertical chain of command.',
          'Delegation of Authorities & Span of Control: Quantified supervisor responsibilities.',
          'Formal Selection: Employees are advanced strictly due to technical credentials or test metrics.'
        ],
        pointers: [
          '6 Core Characteristics of Bureaucracy: 1) Specialization of labor, 2) Well-defined authority hierarchy, 3) Formal rules and procedures, 4) Impersonality, 5) Merit-based employment, 6) Written records.',
          'Guarantees extreme operational consistency across multiple geographical locations.',
          'Primary limitation: High risk of rigid Red Tape, inflexibility in response to changing environments, and trained incapacity.'
        ]
      }
    },
    {
      id: 'fayol-administrative',
      category: 'theories',
      subCategory: 'Classical Organizational Theory',
      title: 'Administrative Theory',
      theorist_author: 'Henri Fayol',
      oneLiner: 'First universal outline of managerial duties, shifting the structural focus to administrative systems and top-down overhead control.',
      description: 'Unlike Taylor who focused on shop-floor mechanics, French mine manager Henri Fayol researched high-level administrative functions, proving that managerial efficiency generates worker efficiency.',
      highYieldRecall: '5 FUNCTIONS of Management (POCCC: Planning, Organizing, Commanding, Controlling, Coordinating). Represents the executive baseline.',
      colorTheme: 'teal',
      details: {
        tenets: [
          'Unity of Command: Each subordinate is accountable to exactly one superior (prevents instruction clash).',
          'Unity of Direction: One singular plan for activities pursuing a common organizational target.',
          'Scalar Chain (Line of Authority): Line from supreme authority down to lowest rank.'
        ],
        pointers: [
          '14 Principles of Administrative Theory include: 1) Division of Labor, 2) Authority/Responsibility, 3) Discipline, 4) Unity of Command, 5) Unity of Direction, 6) Subordination of Individual Interest, 7) Remuneration, 8) Centralization, 9) Scalar Chain, 10) Order, 11) Equity, 12) Stability of Tenure, 13) Initiative, 14) Esprit de Corps.',
          'Esprit de Corps represents the active development of camaraderie and a sense of belonging within the company.',
          'Fayol emphasized that administrative qualities are teachable and scale across all industries.'
        ]
      }
    },
    // Neoclassical
    {
      id: 'mayo-hawthorne',
      category: 'theories',
      subCategory: 'Neoclassical Theory',
      title: 'Hawthorne Experiment & Human Relations',
      theorist_author: 'Elton Mayo',
      oneLiner: 'The historical transition from mechanistic models to humancentric motivation, proving that social attention drives job levels.',
      description: 'Conducted at Western Electric Company Hawthorne Works, Mayo proved employee productivity is affected not just by physical parameters (illumination, rest pauses) but by psychological validation.',
      highYieldRecall: 'THE HAWTHORNE EFFECT. The phenomenon where individuals modify or increase their performance simply because they know they are being observed and valued.',
      colorTheme: 'indigo',
      details: {
        tenets: [
          'Emphasis on the Human Factor: Recognizing emotional realities as operational vectors.',
          'Importance of Informal Organization: Native friendships and cliques override corporate rules.',
          'Decentralization & Participation: Subordinates perform better when consulted.'
        ],
        pointers: [
          'Underpayment quotas set by peer groups are often obeyed over manager incentives.',
          'Social values, group sentiments, and interpersonal respect prove to be much stronger performance determinants than physical work conditions.',
          'Laid the foundation for Organizational Behavior (OB) as a distinct industrial scientific discipline.'
        ]
      }
    },
    {
      id: 'barnard-comprehensive',
      category: 'theories',
      subCategory: 'Neoclassical Theory',
      title: 'Comprehensive Theory of Behavior In Formal Organization',
      theorist_author: 'Chester Barnard',
      oneLiner: 'Views formal organizations as cooperative, social systems that survive only when goals align with human willingness to follow directives.',
      description: 'Chester Barnard, former president of New Jersey Bell Telephone, merged administrative systems with organic human sociology, framing communication as the supreme coordinating tool.',
      highYieldRecall: 'ZONE OF ACCEPTANCE (Authority Acceptance). Subordinates choose whether to accept directives based on communication, personal benefits, and ethical alignment.',
      colorTheme: 'indigo',
      details: {
        tenets: [
          'Cooperative Systems: Organizations exist strictly to overcome physical, cognitive, and environmental limits of individuals.',
          'Communication Integrity: The channels of authority must reside in explicit, open patterns.',
          'Incentive Balance: Ensuring physical, spiritual, and social outputs exceed human contribution inputs.'
        ],
        pointers: [
          'Authority is established not by managerial rank, but by subordinate wellness and willingness to obey are met.',
          'Directives are accepted only if: 1) understood clearly, 2) believed to be consistent with organizational goals, 3) compatible with personal needs, 4) physically & mentally executable.'
        ]
      }
    },
    {
      id: 'simon-bounded-rationality',
      category: 'theories',
      subCategory: 'Neoclassical Theory',
      title: 'Application of Classical Theories to current structures',
      theorist_author: 'Herbert Simon',
      oneLiner: 'Dethroned classical rules of pure logic, demonstrating that human choice is bounded by cognitive limitations.',
      description: 'Simon proved managers cannot make perfectly optimizing decisions due to information barriers and timeline deficits. Instead, actors choose the first satisfactory option that emerges.',
      highYieldRecall: 'BOUNDED RATIONALITY & SATISFICING. Human choice is confined by cognitive load. We do not select the "optimal" mathematical path, we select "satisfactory" paths.',
      colorTheme: 'indigo',
      details: {
        tenets: [
          'Bounded Rationality: Bounded by limits in cognitive processing and imperfect external resources.',
          'Satisficing: Merging "satisfying" and "sufficing" — selecting acceptable alternatives over endless optimization search.',
          'Contingency Approach: Designing structural channels around decision flows rather than rigid charts.'
        ],
        pointers: [
          'Simon referred to classical "principles of management" as contradictory proverbial myths (e.g., span of control clashes with reducing command levels).',
          'Won the Nobel Prize in Economics (1978) for pioneering work on administrative decision systems.'
        ]
      }
    },
    {
      id: 'mcgregor-theory-xy',
      category: 'theories',
      subCategory: 'Humanistic Theory',
      title: 'Theory X and Theory Y',
      theorist_author: 'Douglas McGregor',
      oneLiner: 'A cognitive taxonomy of managerial assumptions regarding human nature, determining how managers control and motivate staffs.',
      description: 'McGregor outlined that supervisory styles are not objective; they are self-fulfilling manifestations of the beliefs managers hold about their employees.',
      highYieldRecall: 'THEORY X (Coercive, assumes laziness) vs. THEORY Y (Humanistic, assumes intrinsic drive). A self-fulfilling prophecy in management action.',
      colorTheme: 'violet',
      details: {
        comparisonTable: {
          headers: ['Feature', 'Theory X', 'Theory Y'],
          rows: [
            ['View of Employees', 'We are lazy, seek to avoid work, and lack ambition.', 'We enjoy work naturally, are self-motivated, and seek progress.'],
            ['Need for Direction', 'High surveillance, strict command, constant monitor.', 'Low surveillance, encourages autonomy.'],
            ['Responsibility Preference', 'Avoids accountability, prefers direct orders.', 'Actively seeks and accepts challenging objectives.'],
            ['Motivation Source', 'Primarily extrinsic (strict wages, threat of punishment).', 'Primarily intrinsic (satisfaction, growth, meaning).'],
            ['Management Style', 'Authoritarian, centralized, controlling.', 'Democratic, authoritative, coaching, participative.']
          ]
        },
        pointers: [
          'Self-Fulfilling Prophecy: Treating employees like Theory X objects causes them to act lazy, perpetuating manager control patterns.',
          'Modern knowledge organizations require Theory Y administrative support to allow creative problem-solving.'
        ]
      }
    },
    {
      id: 'argyris-growth',
      category: 'theories',
      subCategory: 'Neoclassical Theory',
      title: 'Growth Perspective (Maturity Theory)',
      theorist_author: 'Chris Argyris',
      oneLiner: 'Exploration of systemic blockages, arguing that rigid classical organizations treat mature adults like dependent infants.',
      description: 'Argyris postulated that healthy psychological growth progresses from passive dependence (infancy) to active independence (maturity). Classical bureaucratic structures inhibit this transformation.',
      highYieldRecall: 'PASSIVE-TO-ACTIVE SPECTRUM. Organizations that support human progression to self-actualizing maturity thrive over mechanistic structures.',
      colorTheme: 'indigo',
      details: {
        tenets: [
          'Maturity Continuum: Human transitions from a passive observer to an active, goal-setting specialist.',
          'Self-Actualization Blockage: High formalization causes cognitive frustration, absenteeism, and adaptive sabotage.',
          'Job Enrichment: Aligning tasks with mature capabilities to unleash human motivation.'
        ],
        pointers: [
          'Healthy adults demand: variety of skills, control over tasks, and equal status with superiors.',
          'When organizations stifle growth, employees show withdrawal, psychological defensive reactions, and informal protest.'
        ]
      }
    },
    // Modern Organizational Theories
    {
      id: 'modern-systems',
      category: 'theories',
      subCategory: 'Modern Organizational Theory',
      title: 'Systems Theory of Organizations',
      theorist_author: 'Levy, Riggio, McShane',
      oneLiner: 'Holistic framework viewing the organization as an open system composed of interdependent elements interacting with the environment.',
      description: 'Systems theory rejects narrow department assessments. It treats the organization as an organic, living system where elements depend on each other for survival.',
      highYieldRecall: 'ORGANIZATION AS A LIVING SYSTEM. Five Core Parts of System Theory: 1) Individuals, 2) Formal Organization, 3) Small Groups, 4) Status and Roles, 5) Physical Setting.',
      colorTheme: 'sky',
      details: {
        tenets: [
          'Interdependence: Shifts in one department (e.g., sales) ripple and impact all others (e.g., HR, production).',
          'Dynamic Equilibrium (Homeostasis): Continual systemic adjustment to survive environmental volatility.',
          'Synergy: The total systemic output is significantly greater than the sum of isolated isolated inputs.'
        ],
        pointers: [
          'It is impossible to understand human behavior apart from the formal and informal social structures they operate in.',
          'The ultimate purpose of the organization is survival, achieved through constant environmental adaptation.'
        ]
      }
    },
    {
      id: 'modern-learning',
      category: 'theories',
      subCategory: 'Modern Organizational Theory',
      title: 'Organizational Learning Theory',
      theorist_author: 'Peter Senge',
      oneLiner: 'Views corporate success as contingent on the speed of collective knowledge acquisition, translation, and memory storage.',
      description: 'Investigates how modern companies adapt, learn, and survive. It emphasizes that organizations possess memory banks stored in policies, cultures, and team processes.',
      highYieldRecall: 'KNOWLEDGE ACQUISITION & RETENTION. Emphasizes continuous feedback loops over rigid historical operational manuals.',
      colorTheme: 'sky',
      details: {
        tenets: [
          'Single-Loop Learning: Correcting current operational errors to stay within the bounds of historical presets.',
          'Double-Loop Learning: Challenging deep organizational assumptions, reinventing the actual presets.',
          'Knowledge Management: The systematic sharing of intellectual capital across separate silos.'
        ],
        pointers: [
          'Allows the organization to remain flexible, anti-fragile, and highly adaptive during sudden industry shifts.',
          'Relying on historic structures leads to collective memory blockages and eventual organizational decay.'
        ]
      }
    },
    // Contingency Theory Models
    {
      id: 'contingency-woodward',
      category: 'theories',
      subCategory: 'Contingency Theory',
      title: 'Contingency Model of Technology & Structure',
      theorist_author: 'Joan Woodward',
      oneLiner: 'Demonstrated that the optimal organizational structure is directly contingent on the technical system of production.',
      description: 'Woodward categorized companies by technical complexity, proving that structural styles (mechanistic vs organic) determine profit outcomes matches the workflow technical system.',
      highYieldRecall: 'WOODWARD’S CONTINGENCY. Technology determines structure. Different production scales mandate unique management hierarchies.',
      colorTheme: 'amber',
      details: {
        tenets: [
          'Unit & Small Batch: Custom, low-volume tailoring/prototypes. Demands Organic Structure.',
          'Large Batch & Mass: Standardized assembly line. Demands highly Mechanistic Structure.',
          'Continuous Process: Auto-run oil refineries/chemical plants. Demands highly Organic Structure.'
        ],
        pointers: [
          'Technological complexity scales from Unit up to Continuous Process.',
          'Span of control, levels of hierarchy, and staff-to-line ratios correlate with production systems.'
        ]
      }
    },
    {
      id: 'contingency-lawrence',
      category: 'theories',
      subCategory: 'Contingency Theory',
      title: 'Environmental Contingency Model',
      theorist_author: 'Lawrence and Lorsch',
      oneLiner: 'Structures must balance Differentiation (specialized focus of departments) with Integration (coordination) based on outer market volatility.',
      description: 'This model investigates how subunits adapt to environmental uncertainty. Highly unstable markets demand decentralized, unique departments that must still coordinate tasks.',
      highYieldRecall: 'DIFFERENTIATION VS. INTEGRATION. Subunits facing turbulent markets must differentiate their styles, but coordinate tightly to survive.',
      colorTheme: 'amber',
      details: {
        tenets: [
          'Environmental Uncertainty: Market rate of change, product lifespans, and technical volatility.',
          'Differentiation: Specialized cognitive and emotional structures of subunits (e.g., highly fluid R&D vs structured finance).',
          'Integration: The collaboration mechanisms (liaisons, steering groups) used to resolve subunit conflict.'
        ],
        pointers: [
          'In highly stable environments, low differentiation and low formal integration are efficient.',
          'In turbulent environments, high differentiation paired with strong, professional integration systems guarantees survival.'
        ]
      }
    },
    {
      id: 'contingency-fiedler-theory',
      category: 'theories',
      subCategory: 'Contingency Theory',
      title: "Fiedler's Contingency Model",
      theorist_author: 'Fred Fiedler',
      oneLiner: 'Leadership effectiveness is contingent on the fit between a fixed style (LPC score) and the situational favorableness of the organization environment.',
      description: 'Fiedler argued leadership personality is fixed. Therefore, we do not change leaders’ styles; we alter situational favorableness or assign leaders matching the environment context.',
      highYieldRecall: 'LEAST PREFERRED COWORKER (LPC). High LPC = relationship-oriented leader. Low LPC = task-oriented leader. Task-leaders succeed in extreme ends of favorableness.',
      colorTheme: 'amber',
      details: {
        tenets: [
          'Leader-Member Relations: Degree of trust, respect, and confidence in the leader (Good vs. Poor).',
          'Task Structure: Degree of task specificity, procedure clarity, and step definition (High vs. Low).',
          'Position Power: Formal authority to reward, punish, or direct (Strong vs. Weak).'
        ],
        pointers: [
          'Situation favorableness has 8 categories (octants) based on Fiedler\'s 3 criteria.',
          'Low LPC (task-oriented) leaders perform best in highly favorable (good relations, high structure, strong power) AND highly unfavorable situations.',
          'High LPC (relationship-oriented) leaders perform best in moderately favorable situations.'
        ]
      }
    },
    {
      id: 'contingency-mintzberg',
      category: 'theories',
      subCategory: 'Contingency Theory',
      title: "Mintzberg's Contingency Model (Configuration)",
      theorist_author: 'Henry Mintzberg',
      oneLiner: 'Organizations naturally cluster into unique configurations depending on age, technical sophistication, environment, and stakeholder power.',
      description: 'Mintzberg created a taxonomy of organizational anatomy, defining how basic functional blocks coordinate under specific strategic demands.',
      highYieldRecall: '5 COORDINATING MECHANISMS & 5 CORE ANATOMICAL PARTS (Operating Core, Strategic Apex, Middle Line, Technostructure, Support Staff).',
      colorTheme: 'amber',
      details: {
        tenets: [
          'Operating Core: Employees who perform baseland physical duties matching the core purpose.',
          'Strategic Apex: Supreme managers guiding organizational mission and planning.',
          'Technostructure: Analysts (standardizers, planners, schedulers) who design official rules.'
        ],
        pointers: [
          'Coordinating mechanisms: 1) Mutual Adjustment, 2) Direct Supervision, 3) Standardization of Work Processes, 4) Standardization of Work Output, 5) Standardization of Skills/Knowledge.',
          'Configurations: Simple Structure (Strategic Apex dominance), Machine Bureaucracy (Technostructure dominance), Professional Bureaucracy (Operating Core dominance), Divisionalized (Middle Line dominance), Adhocracy (Support staff/collaboration dominance).'
        ]
      }
    },
    // Motivation Theories
    {
      id: 'motivation-maslow',
      category: 'theories',
      subCategory: 'Motivation Theory',
      title: "Hierarchy of Needs",
      theorist_author: "Abraham Maslow",
      oneLiner: "Human requirements reside in a five-tiered system where primitive foundation needs must be met before growth needs become motivators.",
      description: "Proposed that humans satisfy needs sequentially. If lower-level physiological and safety parameters are broken, cognitive focus regresses to satisfy them, stopping actualizing progress.",
      highYieldRecall: "DEFICIENCY NEEDS (D-needs: Physiological, Safety, Social, Esteem) vs. GROWTH NEEDS (B-need: Self-Actualization).",
      colorTheme: 'violet',
      details: {
        tenets: [
          'Physiological: Physical essentials for baseline survival (food, water, air, sleep).',
          'Safety: Financial stability, health, property, and physical protection.',
          'Love & Belonging: Emotional connections, team camaraderie, acceptance, and intimacy.',
          'Esteem: Personal respect, status, recognition, autonomy, and competence.',
          'Self-Actualization: Continuous fulfillment of individual creative potential, growth, and destiny.'
        ],
        pointers: [
          'A satisfied need is no longer an active motivator.',
          'The bottom four tiers represent deficit voids; self-actualization represents a continuous, infinite self-growth loop.'
        ]
      }
    },
    {
      id: 'motivation-herzberg',
      category: 'theories',
      subCategory: 'Motivation Theory',
      title: "Herzberg's Two-Factor Theory",
      theorist_author: "Frederick Herzberg",
      oneLiner: "Satisfaction and dissatisfaction are not direct opposites; they are entirely distinct metrics driven by separate environmental factors.",
      description: "Herzberg proved that fixing working conditions (wages, safety) only moves employees to a neutral state of 'no dissatisfaction,' but does NOT actively motivate performance.",
      highYieldRecall: "HYGIENE FACTORS (dissatisfaction context) vs. MOTIVATIONAL FACTORS (satisfaction content). Also called Motivator-Hygiene Theory.",
      colorTheme: 'violet',
      details: {
        tenets: [
          'Hygiene Factors (Extrinsic / Environment): Company policies, salary, job security, physical workspace, manager-subordinate relationships.',
          'Motivators (Intrinsic / Job Content): Achievement, professional recognition, active responsibility, advancement, creative work itself.'
        ],
        pointers: [
          'If hygiene factors are poor, workers feel severe dissatisfaction. If they are perfect, workers feel neutral.',
          'Only motivators actively ignite internal employee drives to exceed average benchmarks.',
          'Laid the foundation for job enrichment and workstation redesign policies.'
        ]
      }
    },
    {
      id: 'motivation-mcclelland',
      category: 'theories',
      subCategory: 'Motivation Theory',
      title: "Theory of Needs (Acquired Needs Theory)",
      theorist_author: "David McClelland",
      oneLiner: "Humans acquire three fundamental social needs over time through cultural exposure and childhood learning feedback.",
      description: "McClelland utilized projective psychological tests (Thematic Apperception Test) to map how individual profiles drive specific organizational behaviors and leadership matches.",
      highYieldRecall: "nAch (Achievement), nAff (Affiliation), and nPower (Power). High-performing executives often exhibit moderate nAff paired with high nPower.",
      colorTheme: 'violet',
      details: {
        tenets: [
          'Need for Achievement (nAch): The intense drive to excel, overcome obstacles, and conquer challenging metrics on ones own.',
          'Need for Affiliation (nAff): The need to feel loved, validated, avoid conflict, and build warm, integrated friendships.',
          'Need for Power (nPower): The desire to direct, motivate, control, and influence the actions of third parties.'
        ],
        pointers: [
          'High nAch performers seek moderately difficult goals with direct, unambiguous performance feedback.',
          'High nAch workers make excellent individual contributors but can struggle as team managers.',
          'Corporate managers demand high socialized Power (nPower) paired with self-control, and lower Affiliation.'
        ]
      }
    },
    {
      id: 'motivation-alderfer',
      category: 'theories',
      subCategory: 'Motivation Theory',
      title: "ERG Theory",
      theorist_author: "Clayton Alderfer",
      oneLiner: "A simplified, flexible iteration of Maslow outlining three core categories of human needs, allowing regress under chronic frustration.",
      description: "Alderfer consolidated Maslow's 5 layers into 3. Importantly, he added a regression flow proving that failing to reach high-level goals causes actors to double down on lower desires.",
      highYieldRecall: "E-R-G (Existence, Relatedness, Growth). FRUSTRATION-REGRESSION mechanism: Failing high goals triggers regression to lower needs.",
      colorTheme: 'violet',
      details: {
        tenets: [
          'Existence Needs: Basic physical safety and primitive materials (Maslow\'s physiological & physical security).',
          'Relatedness Needs: Interpersonal alignment, team respect, and warmth (Maslow\'s social and external esteem).',
          'Growth Needs: Creative expansion, internal esteem, and actualization (Maslow\'s internal esteem and self-actualization).'
        ],
        pointers: [
          'No rigid hierarchical escalation: multiple needs can act as concurrent motivators simultaneously.',
          'Example of Frustration-Regression: An employee stifled from Growth opportunities will regress to demand extreme compensation upgrades (Existence) or massive social circles (Relatedness).'
        ]
      }
    },
    {
      id: 'motivation-skinner',
      category: 'theories',
      subCategory: 'Motivation Theory',
      title: "Reinforcement Theory",
      theorist_author: "B.F. Skinner",
      oneLiner: "Behavior is entirely determined by its physical consequences; employees repeat rewarded actions and avoid punished actions.",
      description: "Skinner eliminated cognitive factors, arguing that behavior is conditioned by environmental reinforcers and punishments. Operant conditioning governs corporate productivity rates.",
      highYieldRecall: "OPERANT CONDITIONING. Reinforcers repeat actions. Punishments extinguish actions. Schedules (Fixed/Variable Ratio and Interval) determine response speeds.",
      colorTheme: 'violet',
      details: {
        tenets: [
          'Positive Reinforcers: Desirable stimuli applied immediately following an action (increases behavior frequency).',
          'Negative Reinforcers: Removal of unpleasant stimuli immediately following an action (increases behavior frequency).',
          'Punishment: Introduction of painful/unpleasant stimuli following an action (seeks to extinguish behavior frequency).',
          'Extinction: Total absence of any reinforcement (gradually eliminates the target behavior over time).'
        ],
        pointers: [
          '4 Reinforcement Schedules: Fixed Interval (periodic wage), Variable Interval (pop quiz, random audit), Fixed Ratio (commission piece-rate), Variable Ratio (gambling, slot machines, surprise bonuses).',
          'Variable Ratio generates the highest resistance to behavior extinction and supreme response speeds.',
          'The Premack Principle: High-probability behaviors (pleasurable tasks) can reinforce low-probability behaviors (unwanted tasks).'
        ]
      }
    },
    {
      id: 'motivation-extrinsic-intrinsic',
      category: 'theories',
      subCategory: 'Motivation Theory',
      title: "Extrinsic vs. Intrinsic Motivation",
      theorist_author: "Deci & Ryan",
      oneLiner: "We are driven either by environmental incentives (wages, grades, badges) or native internal desires (meaning, pleasure, mastery).",
      description: "This model examines the complex interplay between external incentives and internal joy. It demonstrates that introducing high economic rewards can sometimes poison intrinsic motivations.",
      highYieldRecall: "OVERJUSTIFICATION EFFECT (Cognitive Evaluation Theory). External physical rewards can decrease intrinsic desire for a creative task.",
      colorTheme: 'violet',
      details: {
        tenets: [
          'Extrinsic Motivation: Engaging in an activity strictly to acquire a separate outcome, prize, or avoid compliance penalties.',
          'Intrinsic Motivation: Engaging in an activity purely for its own sake, deriving joy, interest, and mastery directly from execution.'
        ],
        pointers: [
          'To cultivate intrinsic drives, jobs must be structured to spark curiosity, autonomy, and professional challenge.',
          'If a worker already loves their job, applying an aggressive financial incentive structure may cause them to view the job as a transaction, decreasing creativity.'
        ]
      }
    },
    {
      id: 'motivation-locke',
      category: 'theories',
      subCategory: 'Motivation Theory',
      title: "Goal-Setting Theory",
      theorist_author: "Edwin Locke",
      oneLiner: "Specific, clearly quantified, and difficult goals generate far higher performance outcomes than vague, abstract, or easy presets.",
      description: "Locke proved that hard targets focus attention, increase effort persistence, and spark the discovery of task-relevant knowledge strategies, provided feedback is continually shared.",
      highYieldRecall: "SMART GOALS (Specific, Measurable, Attainable, Relevant, Time-bound). General 'do your best' directions generate extremely subpar results.",
      colorTheme: 'violet',
      details: {
        tenets: [
          'Goal Specificity: Clear, measurable mathematical metrics (e.g., "increase cold calls by 15%").',
          'Goal Difficulty: High-yielding target parameters that push individual boundaries of skill.',
          'Feedback Loop: Continual progress updates to allow strategy adjustments.'
        ],
        pointers: [
          'Goal Commitment is a vital mediator: Employees must believe they can achieve the goal (self-efficacy) and want to reach it.',
          'Participative goal-setting (letting staff choose targets) is best for raising initial goal commitment.'
        ]
      }
    },
    {
      id: 'motivation-adams',
      category: 'theories',
      subCategory: 'Motivation Theory',
      title: "Equity Theory",
      theorist_author: "J. Stacey Adams",
      oneLiner: "Workers evaluate fairness by comparing their own input/outcome ratio against the ratios of referent peers.",
      description: "Equality is not purely mathematical; it is perceptual. If individuals identify a ratio imbalance, cognitive dissonance triggers actions to restore equity (e.g., lowering speed or quitting).",
      highYieldRecall: "UNDERPAYMENT INEQUITY (anger, lowering performance inputs) vs. OVERPAYMENT INEQUITY (guilt, raising cognitive quality).",
      colorTheme: 'violet',
      details: {
        tenets: [
          'Inputs: Hard work, loyalty, credentials, training hours, emotional dedication.',
          'Outcomes: Compensation, health benefits, status badges, workspace sizes, promotions.',
          'Referent Other: Coworkers, industry standards, or previous roles used for comparison.'
        ],
        pointers: [
          'Actions to resolve Underpayment: 1) Demanding pay increases, 2) Slacking off, 3) Selecting a different referent peer, 4) Sabotage, 5) Resigning from the firm.'
        ]
      }
    },
    {
      id: 'motivation-vroom-vie',
      category: 'theories',
      subCategory: 'Motivation Theory',
      title: "Expectancy (VIE) Theory",
      theorist_author: "Victor Vroom",
      oneLiner: "Motivation is a mathematically calculated product of three cognitive expectations regarding effort, performance, and final values.",
      description: "Vroom framed employees as rational, cognitive evaluators. Before exerting physical energy, the brain calculates whether work will yield successful targets and whether final rewards hold interest.",
      highYieldRecall: "MOTIVATION = EXPECTANCY x INSTRUMENTALITY x VALENCE. Multiplicative formula: if any variable is zero, total motivation is zero.",
      colorTheme: 'violet',
      details: {
        tenets: [
          'Expectancy (E -> P): The subjective belief that individual physical effort will successfully translate to targeted performance goals.',
          'Instrumentality (P -> O): The subjective belief that hitting the performance target will successfully trigger targeted reward outcomes.',
          'Valence (V): The subjective desirability scale of the final rewards or organizational outputs (ranging from -1.00 to +1.00).'
        ],
        pointers: [
          'To raise Expectancy: Provide training, clear job procedures, and necessary resources.',
          'To raise Instrumentality: Guarantee transparent commission payout procedures and honor promotional promises.',
          'To raise Valence: Personalize employee benefits (e.g., choice of cash, travel, or remote work hours).'
        ]
      }
    },
    {
      id: 'motivation-bandura',
      category: 'theories',
      subCategory: 'Motivation Theory',
      title: "Self-Efficacy Theory",
      theorist_author: "Albert Bandura",
      oneLiner: "The subjective belief in ones own capability to execute the specific steps required to succeed in a challenging task.",
      description: "Self-efficacy dictates whether employees will attempt a task, how much effort they will exert, and how long they will persist when failure hits them.",
      highYieldRecall: "COGNITIVE MASTERY. Higher self-efficacy correlates with superior goal-setting behavior and extreme resilience in task struggles.",
      colorTheme: 'violet',
      details: {
        tenets: [
          'Enactive Mastery: Past successful history of executing similar targets (the most powerful source).',
          'Vicarious Modeling: Observing comparable peers succeed in the target task.',
          'Verbal Persuasion: Receiving specific, encouraging validation from leadership or mentors.'
        ],
        pointers: [
          'Manager Pygmalion effects operate by directly raising the subordinate\'s subjective self-efficacy beliefs.',
          'Physiological Arousal: Low anxiety and stable heart rates help people perceive tasks as controllable.'
        ]
      }
    },
    {
      id: 'motivation-consistency',
      category: 'theories',
      subCategory: 'Motivation Theory',
      title: "Consistency Theory",
      theorist_author: "Abraham Korman",
      oneLiner: "Individual performance is dictated by self-esteem; people act in ways that preserve cognitive consistency with their self-image.",
      description: "Korman proved that employees with high chronic self-esteem choose roles and perform tasks that match their valued self-image. Low self-esteem actors unconsciously limit their success to match subpar expectations.",
      highYieldRecall: "SELF-ESTEEM CONGRUENCE. Low self-esteem employees will actively struggle in roles unless cognitive reassurance stabilizes their status.",
      colorTheme: 'violet',
      details: {
        tenets: [
          'Chronic Self-Esteem: General, long-term global assessment of personal self-worth.',
          'Situational Self-Esteem: Task-relevant evaluation of capacity within a specific role.',
          'Social Influenced Self-Esteem: Estimates of self-worth derived from peer ratings.'
        ],
        pointers: [
          'To maximize worker progress, companies must actively build task-relevant self-esteem through ' +
          'early ' +
          '"experience-with-success" setups.'
        ]
      }
    },
    {
      id: 'motivation-attribution',
      category: 'theories',
      subCategory: 'Motivation Theory',
      title: "Attribution Theory",
      theorist_author: "Fritz Heider / Bernard Weiner",
      oneLiner: "Employees try to explain the causal origins of their performance failures or successes, dictating future task motivation.",
      description: "When an audit goes poorly or sales drop, people attribute it to internal elements (ability, effort) or external parameters (luck, systemic issues). The nature of this choice determines motivation recovery.",
      highYieldRecall: "attribution coordinates: 1) Locus of Control, 2) Stability (is it permanent?), 3) Controllability (do I have power?).",
      colorTheme: 'violet',
      details: {
        tenets: [
          'Internal Stable (Ability): "I failed because I lack intelligence" (generates despair and swift giving up).',
          'Internal Unstable (Effort): "I failed because I did not study or coordinate" (generates high recovery drive).',
          'External Stable (Task Difficulty): "The exam is mathematically impossible." (demands structural change).'
        ],
        pointers: [
          'Attribution retraining teaches employees to shift errors from stable internal traits (lack of intelligence) to unstable controllable vectors (lack of preparation effort).'
        ]
      }
    },
    {
      id: 'motivation-four-drive',
      category: 'theories',
      subCategory: 'Motivation Theory',
      title: "Four-Drive Theory",
      theorist_author: "Lawrence & Nohria",
      oneLiner: "Human operational energy is guided by four innate, hardwired, and highly distinct evolutionary drives.",
      description: "This model merges evolutionary neuroscience with workplace behavior, arguing that modern employees operate to satisfy primitive survival instincts within corporate structures.",
      highYieldRecall: "4 INNATE DRIVES (Acquire, Bond, Comprehend, Defend). Systems must coordinate to satisfy all four drives concurrently.",
      colorTheme: 'violet',
      details: {
        tenets: [
          'Drive to Acquire: To seek out, claim, secure, and retain status items, goods, and resources.',
          'Drive to Bond: To form reciprocal, loving, friendly, and integrated relationships with peer networks.',
          'Drive to Comprehend: To satisfy innate curiosity, resolve confusion, and master new task parameters.',
          'Drive to Defend: To protect personal resources, assets, family, and status metrics from threat.'
        ],
        pointers: [
          'Drives are universal and hardwired in human biology.',
          'Example: Drive to Defend explains why sudden structural change triggers extreme stress and institutional resistance.'
        ]
      }
    },
    {
      id: 'motivation-self-reg',
      category: 'theories',
      subCategory: 'Motivation Theory',
      title: "Self-Regulation Theory",
      theorist_author: "Kanfer & Karoly",
      oneLiner: "Employees monitor their own behavioral progress, compile discrepancy ratios, and execute control loops to hit benchmarks.",
      description: "Self-regulation focuses on internal self-control, outlining how individuals set goals, observe real-time efforts, judge achievement distance, and administer self-reward feedback.",
      highYieldRecall: "DISCREPANCY RATIO. Behavioral modifications occur when the brain detects a wide gap between current output levels and goal targets.",
      colorTheme: 'violet',
      details: {
        tenets: [
          'Self-Monitoring: Tracking the physical execution rate of targeted behaviors.',
          'Self-Evaluation: Comparing real-time outputs against established behavioral rules.',
          'Self-Reinforcement: Rewarding oneself once progress checks are successfully hit.'
        ],
        pointers: [
          'Self-regulation is a highly exhaustive cognitive resource that is easily depleted (ego depletion).'
        ]
      }
    },
    {
      id: 'motivation-job-expectations',
      category: 'theories',
      subCategory: 'Motivation Theory',
      title: "Job Expectations Theory",
      theorist_author: "John Wanous",
      oneLiner: "The discrepancy between what an applicant expects a job to look like and its reality directly governs tenure.",
      description: "When recruits enter with overly inflated expectations of workplace convenience, reality checks spark immediate demotivation, low satisfaction, and swift registration of resignation.",
      highYieldRecall: "REALISTIC JOB PREVIEW (RJP). Providing a raw, honest look (both pros + cons) at onboarding reduces premature turnover.",
      colorTheme: 'violet',
      details: {
        tenets: [
          'Expectation Inflation: Unrealistic marketing promises during recruiting phases.',
          'Shattered Expectations: The cognitive shock of daily physical task realities.',
          'RJP Utility: Deliberate injection of mundane job challenges during hiring to self-filter applicants.'
        ],
        pointers: [
          'RJPs might slightly lower the rate of initial recruits, but they radically increase organizational tenure and lower training cost waste.'
        ]
      }
    },
    {
      id: 'motivation-justice',
      category: 'theories',
      subCategory: 'Motivation Theory',
      title: "Organizational Justice Theory",
      theorist_author: "Gerald Greenberg",
      oneLiner: "Employee trust and motivation depend on their global perception of mathematical and structural fairness within operations.",
      description: "Greenberg categorized equity into distinct dimensions. Even if employees dislike a final decision (e.g. no budget), they accept it if the procedures were unbiased and respectful.",
      highYieldRecall: "DISTRIBUTIVE (what was decided) vs. PROCEDURAL JUSTICE (how it was decided) vs. INTERACTIONAL JUSTICE (how they were treated).",
      colorTheme: 'violet',
      details: {
        tenets: [
          'Distributive Justice: The perceived fairness of the final resource allocation and reward outcomes.',
          'Procedural Justice: The perceived fairness of the administrative rules used to arrive at a decision.',
          'Interactional Justice: The degree of dignity, transparency, and personal respect shown during communication.'
        ],
        pointers: [
          'If Procedural and Interactional justice parameters are robust, employees are highly compliant even under bad budget outcomes.'
        ]
      }
    },
    {
      id: 'motivation-mars',
      category: 'theories',
      subCategory: 'Motivation Theory',
      title: "MARS Model of Individual Behavior & Performance",
      theorist_author: "McShane & Von Glinow",
      oneLiner: "A streamlined full-stack behavioral diagnostic framework predicting human performance from four combined elements.",
      description: "MARS acts as an administrative diagnostic. If performance is low, the manager checks Motivation, physical Ability, Role clarity, or outer Situational impediments.",
      highYieldRecall: "M-A-R-S. If any factor in the MARS chain is deficient, task performance will instantly suffer.",
      colorTheme: 'violet',
      details: {
        tenets: [
          'Motivation (M): The forces that steer direction, intensity, and persistence of voluntary human work loops.',
          'Ability (A): The natural aptitudes and learned competencies required to physically execute the work.',
          'Role Perceptions (R): The degree of clarity page how task expectations and direct job parameters correspond.',
          'Situational Factors (S): Environmental variables (timeline, budget, tool availability) outside individual control.'
        ],
        pointers: [
          'Motivation features 3 coordinates: 1) Direction (path chosen), 2) Intensity (amount of physical effort), 3) Persistence (duration of struggle).'
        ]
      }
    },
    {
      id: 'motivation-sdt',
      category: 'theories',
      subCategory: 'Motivation Theory',
      title: "Self-Determination Theory",
      theorist_author: "Deci & Ryan",
      oneLiner: "Human flourishing and peak execution require the satisfying of three universal, innate psychological needs.",
      description: "SDT argues that human development doesn't rely on extrinsic pushes. Rather, people seek intrinsic mastery and group connection if their default workspaces satisfy three social nutrients.",
      highYieldRecall: "3 NUTRIENTS (Autonomy, Competence, Connection/Relatedness). Hitting these triggers supreme self-motivation.",
      colorTheme: 'violet',
      details: {
        tenets: [
          'Autonomy: The vital need to feel in control of ones own behaviors, timelines, decisions, and goals.',
          'Competence: The developmental need to gain mastery of tasks, execute skills, and learn different complex tools.',
          'Connection / Relatedness: The need to experience belonging, attachment, and deep interaction with a supportive community.'
        ],
        pointers: [
          'SDT outlines an internalization continuum: scaling from Amotivation up to Extrinsic Regulation, and up to fully aligned Intrinsic Integration.'
        ]
      }
    },
    {
      id: 'theory-selffulfill',
      category: 'theories',
      subCategory: 'Humanistic Theory',
      title: "Self-Fulfilling Prophecy Effects",
      theorist_author: "Rosenthal, Golem, Galatea",
      oneLiner: "The expectations held by supervisors or employees create behavioral loops that force reality to match predictions.",
      description: "Identifies cognitive projection phenomena in workplace relations, detailing how outer labels alter physical performance realities over time.",
      highYieldRecall: "PYGMALION (positive expectations raise performance) vs. GOLEM (negative expectations degrade performance) vs. GALATEA (self-expectations).",
      colorTheme: 'violet',
      details: {
        tenets: [
          'Pygmalion / Rosenthal Effect: High expectations from an authority figure trigger actual performance improvements in subordinates.',
          'Golem Effect: Low, negative expectations from a supervisor cause an employee to perform poorly.',
          'Galatea Effect: The sovereign power of individual self-expectations governing task progress.'
        ],
        pointers: [
          'The cycle: 1) Supervisor expectations, 2) Supervisor behaviors, 3) Subordinate self-concept shifts, 4) Subordinate performance.'
        ]
      }
    },
    {
      id: 'theory-open-systems-katz',
      category: 'theories',
      subCategory: 'Open System Theory',
      title: "Open System Theory",
      theorist_author: "Katz and Kahn",
      oneLiner: "Applies physics and biology properties to organizations, noting that open structures must import energy or perish.",
      description: "Daniel Katz and Robert Kahn framed organizations as dynamic devices with permeable boundaries that continually ingest environmental materials, process them, and discharge outputs back to the surroundings.",
      highYieldRecall: "NEGENTROPY (Negative Entropy: importing active resource energy to stop default system decay).",
      colorTheme: 'sky',
      details: {
        tenets: [
          'Input-Throughput-Output Process: Ingesting resources, transforming them, and releasing outputs.',
          'Equifinality: The system can reach the same final state of success from varied initial paths and structures.',
          'Entropy: The natural physical tendency of closed systems to drift to disorder, decay, and eventual doom.'
        ],
        pointers: [
          'Open systems demand: 1) Permeable boundaries, 2) Continual environmental feedback, 3) Dynamic Equilibrium (Homeostasis), 4) Differentiation.'
        ]
      }
    },
    // Leadership Theories
    {
      id: 'leadership-greatman',
      category: 'theories',
      subCategory: 'Leadership Theory',
      title: "Great Man/Woman & Trait Theories",
      theorist_author: "Thomas Carlyle",
      oneLiner: "Universal historical assertion that leaders are born with unique, innate physical and psychological attributes that make them leaders.",
      description: "Classic trait studies sought to identify personal attributes (height, cognitive weight, extroversion, dominance, intelligence, appearance) that isolate leaders from general followers.",
      highYieldRecall: "BORN LEADERS. Assumes leadership attributes are genetically hardwired and cannot be taught in management courses.",
      colorTheme: 'indigo',
      details: {
        tenets: [
          'Innate Leadership Traits: Cognitive capability, physical stamina, self-confidence, dominance.',
          'Genetic Assignment: Environmental context is secondary; true genius overcomes historical situations.'
        ],
        pointers: [
          'Fell out of scientific favor because no single set of traits consistently predicts leadership effectiveness across varied situations.'
        ]
      }
    },
    {
      id: 'leadership-lewin',
      category: 'theories',
      subCategory: 'Leadership Theory',
      title: "Lewin's Classic Leadership Styles",
      theorist_author: "Kurt Lewin",
      oneLiner: "Categorizes leaders into three highly distinct communication patterns based on decision-making delegation.",
      description: "Conducted behavioral studies with youth groups, proving that supervisor interaction style radically impacts the climate, performance rate, and internal aggression of groups.",
      highYieldRecall: "AUTOCRATIC (Authoritarian) vs. DEMOCRATIC (Participative) vs. LAISSEZ-FAIRE (Delegative).",
      colorTheme: 'indigo',
      details: {
        tenets: [
          'Autocratic: Directs everything on ones own, offers zero input channels, controls tasks tightly (causes dependency).',
          'Democratic: Consults with group members, shares planning loops, encourages joint decisions (highest satisfaction).',
          'Laissez-Faire: Abandons role, leaves decision-making to the group with minimal or zero inputs.'
        ],
        pointers: [
          'Democratic structures generate the highest task motivation and quality feedback.',
          'Autocratic structures output high quantity under close surveillance, but collapse when the manager exits.'
        ]
      }
    },
    {
      id: 'leadership-impact',
      category: 'theories',
      subCategory: 'Leadership Theory',
      title: "IMPACT Theory of Leadership",
      theorist_author: "Andrew DuBrin",
      oneLiner: "Proposes six highly specific behavior styles that prove effective matches depending on the emotional climate of the organization.",
      description: "DuBrin's IMPACT theory states that a leader will enjoy success only when their personal behavioral footprint matches the specific organizational scenario.",
      highYieldRecall: "6 IMPACT CLIMATES (Informational, Magnetic, Position, Affiliation, Coercive, Tactical). Match style with current group stress.",
      colorTheme: 'indigo',
      details: {
        tenets: [
          'Informational (Ignorance): Best style when critical data is heavily missing across corporate groups.',
          'Magnetic (Despair): Leads through extreme charisma and optimism when team morale is low.',
          'Position (Instability): Uses formal bureaucratic authority to restore structure in chaotic systems.'
        ],
        pointers: [
          'Affiliation (Anxiety): Leads through care and connection when team anxiety levels are extremely high.',
          'Coercive (Crisis): Bold, direct command style matching rapid emergency timelines.',
          'Tactical (Disorganization): Re-engineers procedures when operations are structurally disorganized.'
        ]
      }
    },
    {
      id: 'leadership-pathgoal',
      category: 'theories',
      subCategory: 'Leadership Theory',
      title: "Path-Goal Theory",
      theorist_author: "Robert House",
      oneLiner: "The modern executive role is to clarify paths, remove environmental barriers, and assign personalized style to fit targets.",
      description: "Path-goal merges expectancy motivation with leadership, outlining how managers can boost expectancy and valence scores by customizing behaviors to match subordinate capabilities.",
      highYieldRecall: "PATH CLARIFICATION. Customizes path safety. 4 Executive Behaviors: Instrumental, Supportive, Participative, Achievement-Oriented.",
      colorTheme: 'indigo',
      details: {
        tenets: [
          'Instrumental / Directive: Clarifying rules, planning schedules (ideal for highly ambiguous tasks).',
          'Supportive: Expressing personal warmth, respect, concern (ideal for boring, hazardous, or high-stress tasks).',
          'Participative: Consulting subordinates, integrating suggestions (ideal for highly customized workflows).'
        ],
        pointers: [
          'Achievement-Oriented: Setting highly challenging goals to drive performance (ideal for elite, self-efficacy-rich teams).'
        ]
      }
    },
    {
      id: 'leadership-situational',
      category: 'theories',
      subCategory: 'Leadership Theory',
      title: "Situational Leadership Theory",
      theorist_author: "Hersey & Blanchard",
      oneLiner: "Leadership style must continuously adapt matching the professional readiness and commitment levels of subordinates.",
      description: "This model tracks task execution, proving that as employees develop from raw rookies to autonomous veterans, leaders must transition from directive supervision to laissez-faire delegation.",
      highYieldRecall: "SUBORDINATE MATURITY. 4 Styles matching readiness: S1 Directing, S2 Coaching, S3 Supporting, S4 Delegating.",
      colorTheme: 'indigo',
      details: {
        tenets: [
          'S1 Directing: High task, low relation. Ideal for unable and unwilling/insecure rookies.',
          'S2 Coaching: High task, high relation. Ideal for unable but willing/confident junior employees.',
          'S3 Supporting: Low task, high relation. Ideal for able but unwilling/apprehensive workers.'
        ],
        pointers: [
          'S4 Delegating: Low task, low relation. Ideal for highly capable and willing champions.',
          'Matching styles prevents role friction and accelerates professional growth.'
        ]
      }
    },
    {
      id: 'leadership-lmx',
      category: 'theories',
      subCategory: 'Leadership Theory',
      title: "Leader-Member Exchange Theory (LMX)",
      theorist_author: "Dansereau, Graen, & Haga",
      oneLiner: "Leaders do not treat all subordinates equally; they build high-quality dyads (In-Group) or transactional paths (Out-Group).",
      description: "Investigates unique individual dyads within teams, illustrating how early trust exchanges permanently segment workers into inner circles with massive rewards or outer paths with minimal contact.",
      highYieldRecall: "IN-GROUP (high trust, autonomy, interesting tasks) vs. OUT-GROUP (strict contracts, transactional interactions).",
      colorTheme: 'indigo',
      details: {
        tenets: [
          'In-Group: Relies on mutual trust, extra-role interactions, and high resource sharing.',
          'Out-Group: Relationship is strictly transactional, relying page formal job contracts and minimal compliance checkups.'
        ],
        pointers: [
          'In-group members show superior job satisfaction, lower turnover, and high OCB rates.'
        ]
      }
    },
    {
      id: 'leadership-charismatic',
      category: 'theories',
      subCategory: 'Leadership Theory',
      title: "Charismatic Leadership Theory",
      theorist_author: "Robert House / Max Weber",
      oneLiner: "Certain leaders possess exceptional, transcendent traits that inspire extraordinary loyalty, devotion, and alignment.",
      description: "Examines visual and communications architectures of leaders who utilize non-verbal patterns, metaphors, and intense value-statements to capture follower imagination.",
      highYieldRecall: "TRANSCENDENT CHARISMA. Follower self-concept links directly with leader vision.",
      colorTheme: 'indigo',
      details: {
        tenets: [
          'Communication of Vision: Compelling descriptions of a grand future style.',
          'Confidence & Social Modeling: Personal risk-taking to establish credibility.'
        ],
        pointers: [
          'Charismatic leaders can sometimes construct destructive echo-chambers or trigger high dependency (cult of personality).'
        ]
      }
    },
    {
      id: 'leadership-transformational',
      category: 'theories',
      subCategory: 'Leadership Theory',
      title: "Transformational Leadership Theory",
      theorist_author: "Bernard Bass",
      oneLiner: "The leader actively transforms and upgrades the core values, spiritual beliefs, and job commitment levels of subordinates.",
      description: "Transformational framework goes beyond simple contract exchanges. It re-aligns follower identities to match the noble vision of the overall collective.",
      highYieldRecall: "THE 4 I's (Idealized Influence, Inspirational Motivation, Intellectual Stimulation, Individualized Consideration).",
      colorTheme: 'indigo',
      details: {
        tenets: [
          'Idealized Influence (Charisma): Acting as highly moral role models, inspiring trust and status alignment.',
          'Inspirational Motivation: Articulating a simple, exciting corporate vision.',
          'Intellectual Stimulation: Encouraging subordinates to challenge status-quo methods and seek innovation.'
        ],
        pointers: [
          'Individualized Consideration: Offereing specific mentoring, coaching, and individualized professional growth paths.'
        ]
      }
    },
    {
      id: 'leadership-transactional',
      category: 'theories',
      subCategory: 'Leadership Theory',
      title: "Transactional Leadership Theory",
      theorist_author: "Bernard Bass",
      oneLiner: "Focuses strictly on performance exchanges, corrective contracts, surveillance loops, and wage-for-work transactions.",
      description: "Based on contract structures, transactional leadership operates efficiently in stable processes with highly quantified production deliverables.",
      highYieldRecall: "EXCHANGE TRANSACTION. Focuses on compliance monitoring and external task-based corrections.",
      colorTheme: 'indigo',
      details: {
        tenets: [
          'Contingent Reward: Exchanging wages, praises, and promotion packages for the correct execution of tasks.',
          'Management-by-Exception (Active): Closely monitoring operations for deviations and initiating swift correction steps.'
        ],
        pointers: [
          'Management-by-Exception (Passive): Only intervening when catastrophic failures or deviations emerge.'
        ]
      }
    },

    // --- ORGANIZATIONAL MODELS ---
    {
      id: 'model-lewin-change',
      category: 'models',
      subCategory: 'Organizational Models',
      title: "Lewin's 3-Stage Change & Adaptation Model",
      theorist_author: "Kurt Lewin",
      oneLiner: "Treats restructuring as a process of breaking historical patterns, executing shifts, and solidifying new habits.",
      description: "Change requires disrupting equilibrium. This model outlines a physical progression to manage institutional shifts while minimizing downstream resistance.",
      highYieldRecall: "UNFREEZE -> MOVE -> REFREEZE. Core OD framework for strategic transition planning.",
      colorTheme: 'rose',
      details: {
        tenets: [
          'Unfreezing: Showing that the current equilibrium state is no longer viable, melting resistant customs.',
          'Moving: Deploying new workflows, roles, training loops, and structural norms.',
          'Refreezing: Solidifying the modifications into the corporate DNA through reward systems and official policy handbooks.'
        ],
        pointers: [
          'Lewin\'s taxonomy categorization of people being changed: 1) Change Agents (enjoy change, try to break rules), 2) Change Analysts (want changes only if logical value is proven), 3) Receptive Changers (willing to help once change starts), 4) Reluctant Changers (will change if mandatory), 5) Change Resisters (will sabotage to block change).'
        ]
      }
    },
    {
      id: 'model-action-research',
      category: 'models',
      subCategory: 'Organizational Models',
      title: "Action Research Model",
      theorist_author: "French & Bell",
      oneLiner: "A highly systematic, scientific, and cyclical progress loop focusing on data collection and organization diagnosis.",
      description: "Action Research treats change as an ongoing feedback experiment, ensuring that all interventions are designed page empirical metrics collected directly from staff.",
      highYieldRecall: "CYCLICAL DESIGN. Focuses page organizational self-discovery, data gathering, custom action, and immediate re-assessment.",
      colorTheme: 'rose',
      details: {
        tenets: [
          'Problem Cleansing: Collecting qualitative symptoms from the operating core.',
          'Scientific Interventions: Matching actions with organizational diagnostic parameters.',
          'Joint Action Planning: Combining client systems with professional OD specialist consults.'
        ],
        pointers: [
          'Sensemaking: Employee-driven activities to understand and adapt to current workplace developments.'
        ]
      }
    },
    {
      id: 'model-perrow',
      category: 'models',
      subCategory: 'Organizational Models',
      title: "Perrow's Technology & Task Model",
      theorist_author: "Charles Perrow",
      oneLiner: "Classifies department structures based on two variables: task variability and solution analyzability.",
      description: "Perrow mapped how work designs correspond to workflow patterns, proving that specialized, irregular tasks demand higher decentralization.",
      highYieldRecall: "VARIABILITY vs. ANALYZABILITY. 4 quadrants: Routine, Engineering, Craft, Nonroutine.",
      colorTheme: 'rose',
      details: {
        tenets: [
          'Task Variability: The frequency of unexpected exceptions or sudden technical issues.',
          'Task Analyzability: The ease of executing clear physical formulas or computational steps to solve exceptions.'
        ],
        pointers: [
          'Routine (Low var, High anal: assembly line): Highly centralized, high formalization.',
          'Engineering (High var, High anal: accounting, structural coding): High formalization, moderate decentralization.',
          'Craft (Low var, Low anal: fine art, custom carpentry): High decentralization, low formalization.',
          'Nonroutine (High var, Low anal: aerospace R&D, strategic crisis control): Flexible, organic adhocracy.'
        ]
      }
    },
    {
      id: 'model-kotter',
      category: 'models',
      subCategory: 'Organizational Models',
      title: "Kotter's 8-Step Change Model",
      theorist_author: "John Kotter",
      oneLiner: "A rigorous, step-by-step masterplan designed to minimize strategic corporate transition failures.",
      description: "Kotter proved most corporate restructurings fall short because executives skip critical early stages. He designed a sequential 8-stage plan to anchor change permanently.",
      highYieldRecall: "8 STAGES. Absolute rule: NEVER skip a step in the chain. Early stages focus on creating readiness.",
      colorTheme: 'rose',
      details: {
        coreSteps: [
          '1. Establish a Urgency Sense (melt complacency).',
          '2. Form a Guiding Coalition (assemble power leaders).',
          '3. Create a Strategic Vision (set noble directions).',
          '4. Communicate the Change Vision (share continuous updates).',
          '5. Empower Action & Remove Obstacles (clear bureaucratic blocks).',
          '6. Plan for Short-Term Wins (engineer easy, early metrics).',
          '7. Consolidate Improvements (build on wins, accelerate pace).',
          '8. Embed changes in Corporate Culture (anchor in customs).'
        ],
        pointers: [
          'Compelling vision is the primary tool to melt political blockages and cultural stagnation.'
        ]
      }
    },
    {
      id: 'model-invisible-hand',
      category: 'models',
      subCategory: 'Organizational Models',
      title: "Invisible Hand Theory & Rational Choice",
      theorist_author: "Adam Smith",
      oneLiner: "Argues that if individual actors act out of rational self-interest, collective operations reach maximum economic utility.",
      description: "Smith\'s model asserts that employees utilize rational calculation to secure optimal personal outputs. Market equilibrium is achieved without heavy, rigid management controls.",
      highYieldRecall: "RATIONAL CHOICE. Motivation operates as an internal ledger calculating personal cost/benefit ratios.",
      colorTheme: 'rose',
      details: {
        tenets: [
          'Self-Interest Drive: Individual actions seek utility and resources.',
          'Rational Calculations: Perfect comparison of task energy vs final outcomes.'
        ],
        pointers: [
          'Laid the structural baseline for industrial economic and contract compliance designs.'
        ]
      }
    },
    {
      id: 'model-vroomyetton',
      category: 'models',
      subCategory: 'Organizational Models',
      title: "Vroom-Yetton Decision-Making Model",
      theorist_author: "Vroom, Yetton, & Jago",
      oneLiner: "Provides a mathematical decision-tree flowchart guiding how much employee participation a manager should allow in decisions.",
      description: "Provides diagnostic questions page decision quality, timeline constraints, and subordinate commitment levels, selecting among 5 leadership decision styles.",
      highYieldRecall: "DECISION TREE FLOWCHART. Formulates the optimal degree of employee participation based on situation dynamics.",
      colorTheme: 'rose',
      details: {
        tenets: [
          'Autocratic I (AI): Manager decides alone using currently available local metrics.',
          'Autocratic II (AII): Manager acquires metrics from subordinates, then decides alone.',
          'Consultative I (CI): Manager shares problem with staffers individually, gets inputs, then decides alone.'
        ],
        pointers: [
          'Consultative II (CII): Manager shares problem with subordinates as a cohesive group, gets inputs, then decides alone.',
          'Group I (GI): Manager shares problem with group, acts as facilitator, and team reaches consensus.'
        ]
      }
    },

    // --- ORGANIZATIONAL CONCEPTS ---
    {
      id: 'concept-social-systems',
      category: 'concepts',
      subCategory: 'Organizational Concepts',
      title: "Components of Social Systems (Roles & Norms)",
      theorist_author: "Katz & Kahn Model",
      oneLiner: "The social scaffolding of any organization, mapping systemic roles, operational norms, and corporate cultures.",
      description: "Social systems coordinate behavior through designated expectations (roles) and unwritten rules (norms) that define approved actions.",
      highYieldRecall: "ROLE FRICTION & NORM PATTERNS. Role conflict, role ambiguity, role overload, and descriptive vs injunctive norms.",
      colorTheme: 'emerald',
      details: {
        tenets: [
          'Role Conflict: Facing incompatible or contradictory task expectations page separate structural lines.',
          'Role Ambiguity: A severe lack of clarity page exact boundaries, duties, and performance metrics.',
          'Role Overload: Total task parameters exceed individual cognitive or temporal capacity.',
          'Role Differentiation: The systematic creation of specialized actions within workgroups.'
        ],
        pointers: [
          'Descriptive Norms: What people actually do in real daily setups (e.g., leaving exactly at 5 PM).',
          'Injunctive Norms: What ought to be done according to official policies (e.g., working overtime).',
          'Low role ambiguity correlates with supreme task commitment and lower physical exhaustion.'
        ]
      }
    },
    {
      id: 'concept-po-fit',
      category: 'concepts',
      subCategory: 'Organizational Concepts',
      title: "Person-Organization Fit",
      theorist_author: "Amy Kristof-Brown",
      oneLiner: "The developmental compatibility between individual values, trait structures, and the corporate culture.",
      description: "P-O Fit measures how cleanly an employee's personal DNA matches historical values and behavioral patterns of the firm, directly predicting retention levels.",
      highYieldRecall: "VALUE CONGRUENCE. High P-O fit triggers supreme job satisfaction, high OCB, and low search for exit alternatives.",
      colorTheme: 'emerald',
      details: {
        tenets: [
          'Supplementary Fit: Individual has traits that are highly similar to organizational actors.',
          'Complementary Fit: Individual adds a unique skill set or cognitive style that completes the team topology.',
          'Value Convergence: Continuous training and cultural exposures align individual values with corporate mission.'
        ],
        pointers: [
          'High congruence ensures teams can rapidly communicate during high-uncertainty events.',
          'Severe mismatch leads to immediate cognitive dissonance, high stress, and voluntary turnover.'
        ]
      }
    },
    {
      id: 'concept-down-out-off',
      category: 'concepts',
      subCategory: 'Organizational Concepts',
      title: "Downsizing, Outsourcing, and Offshoring",
      theorist_author: "Modern HRM Frameworks",
      oneLiner: "Structural maneuvers used by modern executive panels to modify headcount, streamline operational costs, and globalize services.",
      description: "Outlines structural cost reductions and labor allocation, tracing how headcount actions impact survivors' psychological contracts.",
      highYieldRecall: "ORGANIZATIONAL TRIMMING. Downsizing (Horizontal vs Vertical), Outsourcing (subcontracting), Offshoring (relocating overseas).",
      colorTheme: 'emerald',
      details: {
        tenets: [
          'Downsizing: Reducing workforce density to raise margins. Horizontal (cut jobs within a department) vs Vertical (eliminate an entire tier).',
          'Outsourcing: Subcontracting internal operations to specialized third-party provider systems.',
          'Offshoring: Relocating designated operations to external countries to capture low labor costs.'
        ],
        pointers: [
          'Survivor Syndrome: Employees who remain after layoffs feel intense guilt, anxiety, and a drop in organizational commitment.',
          'RJPs and clear strategic communication are essential to buffer Downsizing stress shocks.'
        ]
      }
    },
    {
      id: 'concept-merger-acq',
      category: 'concepts',
      subCategory: 'Organizational Concepts',
      title: "Mergers and Acquisitions (M&A Phases)",
      theorist_author: "Levy & Muchinsky",
      oneLiner: "The administrative merging of corporations, demanding strategic alignment and cultural integration across three distinct phases.",
      description: "Investigates cultural clashes when equal-power systems fuse (merger) or one system absorbs another (acquisition, including hostile takeover).",
      highYieldRecall: "3 M&A PHASES (Precombination, Combination, Postcombination). Cultural integration determines success over financial models.",
      colorTheme: 'emerald',
      details: {
        tenets: [
          'Precombination Phase: Evaluating companies, calculating financial parameters, and planning mergers (high anxiety).',
          'Combination Phase: Executing the transaction, initiating physical restructuring (high employee culture clash).',
          'Postcombination Phase: Long-term cultural integration and procedure alignment.'
        ],
        pointers: [
          'Hostile Takeover occurs when a dominant firm acquires an unwilling peer, causing severe employee panic.',
          'Primary failure source is Cultural Clash (ignoring Level 3 deep assumptions of the target organization).'
        ]
      }
    },
    {
      id: 'concept-od',
      category: 'concepts',
      subCategory: 'Organizational Concepts',
      title: "Organizational Development (OD & Appreciative Inquiry)",
      theorist_author: "Senge, Cooperrider, & Burke",
      oneLiner: "Systematic, behavioral-science-based interventions designed to elevate long-term health, efficacy, and employee well-being.",
      description: "OD targets structural change. Appreciative Inquiry completely replaces problem-centric audits with positive focus loops page past successes and future capabilities.",
      highYieldRecall: "APPRECIATIVE INQUIRY (AI) 5-D LOOP (Define, Discover, Dream, Design, Deliver). Highlights strengths over failures.",
      colorTheme: 'emerald',
      details: {
        tenets: [
          'Define: Identifying the focal areas of inquiry and planning positive targets.',
          'Discover: Inquiring about past operational successes and identifying organizational peak moments.',
          'Dream: Envisioning a positive, actualizing future style based on discovered core strengths.',
          'Design: Writing custom plans, structures, and behavioral policies to manifest the dream.',
          'Deliver / Destiny: Executing, monitoring progress, and anchoring lessons cleanly.'
        ],
        pointers: [
          'OD Interventions can be Human Process (coaching, team building), Technostructural (TQM, reengineering), or HRM (reward setups, appraisals).',
          'TQM (Total Quality Management) focuses on continuous optimization of quality across all operational levels.'
        ]
      }
    },
    {
      id: 'concept-power',
      category: 'concepts',
      subCategory: 'Organizational Concepts',
      title: "Power in the Organization (French & Raven)",
      theorist_author: "French, Raven, & DuBrin",
      oneLiner: "The social metrics governing influence, political maneuvers, and authority bases within corporate hierarchies.",
      description: "Argues that power goes beyond executive titles. It is a social transaction. Actors construct networks using logical arguments, alliances, or technical scarcity.",
      highYieldRecall: "5 POWER BASES (Coercive, Reward, Legitimate, Expert, Referent) + Informational Power. Politics refers to power-acquisition maneuvers.",
      colorTheme: 'emerald',
      details: {
        tenets: [
          'Position Power: Authority derived strictly from hierarchical rank (Coercive, Reward, Legitimate).',
          'Personal Power: Influence derived from individual traits and knowledge (Expert, Referent).',
          'Political Influence Tactics: Ingratiation (flattery), Assertiveness, Rationality, Coalitions, Exchanges.'
        ],
        pointers: [
          'Legitimate Power: stems from an individual\'s official structural position.',
          'Expert Power: arises from specialized, scarce technical knowledge.',
          'Referent Power: stems from interpersonal admiration, charisma, and status modeling.',
          'Informational Power: control and access to critical organizational decisions.'
        ]
      }
    },
    {
      id: 'concept-communication',
      category: 'concepts',
      subCategory: 'Organizational Concepts',
      title: "Communication in the Organization (Formal vs. Informal)",
      theorist_author: "Levy & Aamodt",
      oneLiner: "The functional nervous system of companies, routing metrics through formal channels or lateral grapevine networks.",
      description: "Maps formal hierarchies of coordination vs lateral networks of rumors and informal grapevines.",
      highYieldRecall: "INFORMAL GRAPEVINE (Fast, highly accurate but easily poisoned). Roles: Isolates vs. Dead-enders. 3rd-party: Ombudsperson & Liaison.",
      colorTheme: 'emerald',
      details: {
        tenets: [
          'Upward Communication: Subordinate feed to executive level (Attitude surveys, suggestion boxes).',
          'Downward Communication: Superior commands page policy manuals, newsletters, or intranets.',
          'Lateral / Business: Interdepartmental transmission to coordinate tasks.',
          'Informal Grapevine: Unofficial lateral networks. Single-strand, Gossip, Probability, or Cluster chain models.'
        ],
        pointers: [
          'Isolates: Subordinates who receive less than half of grapevine data.',
          'Dead-enders: Subordinates who receive gossip but do not pass it on to peer networks.',
          'Ombudsperson: Neutral investigator who resolves employee complaints.',
          'Liaison: Key focal point actor routing information across silos.'
        ]
      }
    },
    {
      id: 'concept-decision-making',
      category: 'concepts',
      subCategory: 'Organizational Concepts',
      title: "Organizational Decision-Making",
      theorist_author: "Heider & Simon Frameworks",
      oneLiner: "The steps of group consensus, detailing how systems define complications and construct solutions.",
      description: "Details structural decision processes. Shifting from solo plans to group formats can trigger high-performance gains, but introduces high cognitive bias.",
      highYieldRecall: "GROUP POLARIZATION (group choice shifts to a more extreme end than solo suggestions). Brainstorming vs. Brainwriting.",
      colorTheme: 'emerald',
      details: {
        tenets: [
          'Problem Definition: Pinpointing core operational symptoms and establishing success Criteria.',
          'Nominal Group Technique: Members write ideas silently, present them, and vote anonymously (guards against dominance).',
          'Brainwriting: Generating ideas page paper silently before speaking to stop performance blocking.'
        ],
        pointers: [
          'Steps: Goal setting -> Performance criteria -> Problem defining -> Option generation -> Evaluation -> Implementation -> Feedback.',
          'Groupthink occurs when extreme cohesion causes silencing of dissent and catastrophic choice failures.'
        ]
      }
    },
    {
      id: 'concept-individual-behavior',
      category: 'concepts',
      subCategory: 'Organizational Concepts',
      title: "Types of Individual Behavior",
      theorist_author: "Levy & McShane",
      oneLiner: "An catalog of worker behavior profiles, tracing task execution, extra-role help, and exit patterns.",
      description: "Classifies work behavior dimensions. Understanding OCB and CWB formats allows managers to design balanced feedback scorecards.",
      highYieldRecall: "ORGANIZATIONAL CITIZENSHIP BEHAVIOR (OCB) vs. COUNTERPRODUCTIVE WORK BEHAVIOR (CWB). Task performance types.",
      colorTheme: 'emerald',
      details: {
        tenets: [
          'Task Performance: Proficient (executes basic duties), Adaptive (adjusts to modifications), Proactive (initiates modifications).',
          'OCB: Discretionary extra-role help, volunteering, defending firm image without direct compensation demands.',
          'Counterproductive Work Behavior: Intentional work sabotage, harassment, theft, or time slacking.'
        ],
        pointers: [
          'Withdrawal Behaviors: Absenteeism, tardiness, job search loops, and eventual voluntary resignation.',
          'High OCB correlates with positive supervisory climate and strong affective commitment.'
        ]
      }
    },
    {
      id: 'concept-perceptual-effects',
      category: 'concepts',
      subCategory: 'Organizational Concepts',
      title: "Perceptual Effects & Performance Errors",
      theorist_author: "BLEPP Cognitive Psychology",
      oneLiner: "Cognitive shortcuts and evaluations biases that skew manager ratings and administrative judgments.",
      description: "Examines system rating distortions, detailing how single impression points generate general appraisal failures.",
      highYieldRecall: "HALO EFFECT (generalizing single excellence) vs. FALSE-CONSENSUS (assuming others share our beliefs) vs. PRIMACY & RECENCY.",
      colorTheme: 'emerald',
      details: {
        tenets: [
          'Halo Effect: Letting an overall positive impression in one trait skew task ratings across entirely separate metrics.',
          'False-Consensus Effect: Overestimating the extent to which coworkers share our personal values, morals, and beliefs.',
          'Primacy Effect: Heavily weighing top, early impressions during evaluation loops.'
        ],
        pointers: [
          'Recency Effect: Allowing only the most recent couple of weeks of work to dominate the global annual appraisal score.'
        ]
      }
    },
    {
      id: 'concept-commitment',
      category: 'concepts',
      subCategory: 'Organizational Concepts',
      title: "Organizational Commitment",
      theorist_author: "Meyer & Allen 3-Component Model",
      oneLiner: "The psychological bond connecting an employee to their firm, dictating tenure and task vigor.",
      description: "Meyer and Allen formulated three distinct commitment vectors. Satisfaction is highest under affective patterns, whereas transactional formats degrade performance.",
      highYieldRecall: "AFFECTIVE (want to stay-love) vs. CONTINUANCE (need to stay-pension cost) vs. NORMATIVE (ought to stay-obligation).",
      colorTheme: 'emerald',
      details: {
        tenets: [
          'Affective Commitment: Strong emotional attachment, identification, and love for corporate mission ("I stay because I love it").',
          'Continuance Commitment: Cost-benefit attachment based on exit penalties, pension vesting, or salary gaps ("I stay because I have to").',
          'Normative Commitment: Moral obligation, guilt-based alignment, or familial duty ("I stay because I ought to").'
        ],
        pointers: [
          'Affective commitment is the supreme predictor of job tenure, low absenteeism, high OCB hours, and high creativity rates.'
        ]
      }
    },
    {
      id: 'concept-leader-variables',
      category: 'concepts',
      subCategory: 'Organizational Concepts',
      title: "Leadership Variables (Motivations & Performance Factors)",
      theorist_author: "DuBrin & Levy",
      oneLiner: "Investigates variables that predict why humans seek power (leader emergence) vs what makes them succeed (performance).",
      description: "Details cognitive and emotional traits that spark executive behavior, isolating motives from genetic gender variables.",
      highYieldRecall: "AFFECTIVE IDENTITY (love leading) vs. NONCALCULATIVE (personal gain lead) vs. SOCIAL-NORMATIVE (duty-based lead).",
      colorTheme: 'emerald',
      details: {
        tenets: [
          'Affective Identity Motivation: Individuals seek leadership because they intrinsically enjoy charge and commanding others.',
          'Noncalculative Motivation: Seek power strictly when they calculate that the role outputs a massive personal gain vector.',
          'Social-Normative Motivation: Accept leadership responsibilities purely out of a sense of duty, tradition, or obligation.'
        ],
        pointers: [
          'Self-Monitoring: High self-monitoring executives adjust their social presentation dynamically, leading to superior performance.',
          'Cognitive Ability & Leadership Motive Pattern (High power drive, low affiliation drive) predict high corporate executive success.'
        ]
      }
    }
  ], []);

  // Filter Sub-categories based page Active Tab
  const subCategories = useMemo(() => {
    const items = syllabusItems.filter(item => item.category === activeTab);
    const set = new Set(items.map(item => item.subCategory));
    return ['ALL', ...Array.from(set)];
  }, [syllabusItems, activeTab]);

  // Reset Sub-tab filter when main tab shifts
  React.useEffect(() => {
    setActiveSubCategory('ALL');
  }, [activeTab]);

  // Filter items matching Search and Category chips
  const filteredItems = useMemo(() => {
    return syllabusItems.filter(item => {
      // Tab Category Match
      if (item.category !== activeTab) return false;

      // Sub-category Chip Match
      if (activeSubCategory !== 'ALL' && item.subCategory !== activeSubCategory) return false;

      // Search Match
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const titleMatch = item.title.toLowerCase().includes(query);
        const theoristMatch = item.theorist_author?.toLowerCase().includes(query) || false;
        const subMatch = item.subCategory.toLowerCase().includes(query);
        const recallMatch = item.highYieldRecall.toLowerCase().includes(query);
        const descMatch = item.description.toLowerCase().includes(query);
        
        return titleMatch || theoristMatch || subMatch || recallMatch || descMatch;
      }

      return true;
    });
  }, [syllabusItems, activeTab, activeSubCategory, searchQuery]);

  const isTrial = profile?.tier?.toLowerCase().includes('trial');
  const displayItems = isTrial ? filteredItems.slice(0, 3) : filteredItems;

  return (
    <div className="space-y-6" id="io-concepts-panel-container">
      {/* HEADER CARD */}
      <div className="bg-gradient-to-r from-teal-900 to-indigo-950 rounded-3xl p-6 md:p-8 text-cream shadow-md border border-teal-800/30">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 bg-sky-400/20 text-sky-300 border border-sky-400/30 px-3 py-1 rounded-full text-[10px] font-mono font-black uppercase tracking-wider">
              <Briefcase className="w-3.5 h-3.5 animate-pulse" /> BLEPP / PmLE Professional Syllabus Board Review
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-black tracking-tight text-white">
              Industrial / Organizational (I/O) Psychology
            </h2>
            <p className="text-xs sm:text-sm text-sky-100 max-w-2xl font-sans leading-relaxed">
              Exhaustive review database tracking every required organizational theory, model matrix, and structural concept outlined in the CHED exam syllabus.
            </p>
          </div>
        </div>
      </div>

      {/* CORE CONTROL AREA - 1 COLUMN ALWAYS FOR ULTIMATE READABILITY */}
      <div className="bg-white border border-gray-150 rounded-2xl p-5 shadow-sm space-y-5">
        
        {/* TAB NAVIGATION SELECTOR */}
        <div className="flex flex-col sm:flex-row bg-foam/30 p-1.5 border border-gray-150 rounded-2xl font-mono text-[10.5px] font-black uppercase tracking-wider gap-1.5">
          <button
            onClick={() => {
              setActiveTab('theories');
              setSearchQuery('');
            }}
            className={`flex-1 text-center py-3 rounded-xl transition-all duration-150 cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'theories' 
                ? 'bg-indigo-950 text-white font-black shadow-xs' 
                : 'text-indigo-950 hover:bg-foam/65'
            }`}
          >
            📂 Organizational Theories ({syllabusItems.filter(i => i.category === 'theories').length})
          </button>
          <button
            onClick={() => {
              setActiveTab('models');
              setSearchQuery('');
            }}
            className={`flex-1 text-center py-3 rounded-xl transition-all duration-150 cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'models' 
                ? 'bg-indigo-950 text-white font-black shadow-xs' 
                : 'text-indigo-950 hover:bg-foam/65'
            }`}
          >
            📊 Organizational Models ({syllabusItems.filter(i => i.category === 'models').length})
          </button>
          <button
            onClick={() => {
              setActiveTab('concepts');
              setSearchQuery('');
            }}
            className={`flex-1 text-center py-3 rounded-xl transition-all duration-150 cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'concepts' 
                ? 'bg-indigo-950 text-white font-black shadow-xs' 
                : 'text-indigo-950 hover:bg-foam/65'
            }`}
          >
            💡 Organizational Concepts ({syllabusItems.filter(i => i.category === 'concepts').length})
          </button>
        </div>

        {/* SEARCH BAR & GENERAL FILTERS */}
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 w-4.5 h-4.5 text-sage" />
            <input 
              type="text" 
              placeholder={`Search in ${activeTab}... (e.g. Taylor, Hawthorne, expectancy, SDT)`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-foam/25 border border-gray-150 pl-11 pr-4 py-3 rounded-xl text-xs sm:text-sm font-sans focus:border-stone outline-none transition duration-150 text-gray-800 font-medium placeholder-gray-400"
            />
          </div>

          {/* QUICK ACTIONS BUTTONS */}
          <div className="flex gap-2">
            <button
              onClick={() => toggleAllExpanded(true)}
              className="px-3 py-2 border border-gray-150 hover:border-gray-300 rounded-lg text-[10px] font-mono font-bold bg-white text-gray-600 hover:text-gray-900 cursor-pointer"
            >
              Expand All
            </button>
            <button
              onClick={() => toggleAllExpanded(false)}
              className="px-3 py-2 border border-gray-150 hover:border-gray-300 rounded-lg text-[10px] font-mono font-bold bg-white text-gray-600 hover:text-gray-900 cursor-pointer"
            >
              Collapse All
            </button>
          </div>
        </div>

        {/* HORIZONTAL STREAMLINED SELECTION PILLS */}
        {subCategories.length > 1 && (
          <div className="space-y-1.5 border-t border-gray-100 pt-3">
            <span className="text-[9px] uppercase tracking-widest font-black text-gray-400 font-mono block">
              Sub-Syllabus Category Filter
            </span>
            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
              {subCategories.map((sub, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSubCategory(sub)}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all duration-150 cursor-pointer ${
                    activeSubCategory === sub
                      ? 'bg-indigo-950 text-white shadow-inner scale-[0.98]'
                      : 'bg-foam/20 text-gray-600 border border-gray-100 hover:bg-foam/45 hover:border-gray-250'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* SEARCH COUNTER OR FEEDBACK */}
      <div className="flex items-center justify-between text-[11px] text-gray-400 font-mono px-1">
        <span>Showing {filteredItems.length} of {syllabusItems.filter(i => i.category === activeTab).length} syllabus parameters</span>
        {searchQuery && (
          <button onClick={() => setSearchQuery('')} className="text-teal-700 hover:underline cursor-pointer">
            Clear search filter
          </button>
        )}
      </div>

      {/* CORE 1-COLUMN RESULTS LIST */}
      <div className="space-y-4">
        {filteredItems.length === 0 ? (
          <div className="bg-white border border-gray-150 rounded-2xl p-12 text-center text-gray-400 font-sans">
            <AlertCircle className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-sm font-semibold">No syllabus records matched your search query.</p>
            <p className="text-xs text-gray-400 mt-1">Try testing simpler keywords or switching back to the ALL filters chip.</p>
          </div>
        ) : (
          <>
            {displayItems.map(item => {
            const isExpanded = !!expandedCards[item.id];
            
            // Visual accent coloring matches themes
            const accentClasses = {
              teal: 'border-l-4 border-l-teal-600',
              indigo: 'border-l-4 border-l-indigo-700',
              amber: 'border-l-4 border-l-amber-500',
              rose: 'border-l-4 border-l-rose-600',
              emerald: 'border-l-4 border-l-emerald-600',
              sky: 'border-l-4 border-l-sky-500',
              violet: 'border-l-4 border-l-violet-600'
            }[item.colorTheme];

            const bgClasses = {
              teal: 'from-teal-50/20 to-transparent',
              indigo: 'from-indigo-50/20 to-transparent',
              amber: 'from-amber-50/25 to-transparent',
              rose: 'from-rose-50/20 to-transparent',
              emerald: 'from-emerald-50/15 to-transparent',
              sky: 'from-sky-50/20 to-transparent',
              violet: 'from-violet-50/20 to-transparent'
            }[item.colorTheme];

            return (
              <div 
                key={item.id}
                className={`bg-white border border-gray-150 rounded-2xl shadow-xs transition-all duration-200 overflow-hidden ${accentClasses} hover:shadow-md`}
              >
                {/* Header view with expand toggle capability */}
                <div 
                  onClick={() => toggleCard(item.id)}
                  className={`p-5 md:p-6 flex items-start justify-between gap-4 cursor-pointer select-none bg-gradient-to-r ${bgClasses}`}
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[8.5px] uppercase font-mono tracking-wider font-extrabold px-2.5 py-0.5 rounded-md bg-gray-100 border border-gray-250/20 text-gray-600">
                        {item.subCategory}
                      </span>
                      {item.theorist_author && (
                        <span className="text-[10px] font-mono text-gray-400 font-bold">
                          ✍️ {item.theorist_author}
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg md:text-xl font-display font-black text-gray-900 tracking-tight leading-snug">
                      {item.title}
                    </h3>
                    
                    <p className="text-xs sm:text-sm text-gray-600 leading-normal font-sans font-medium text-justify">
                      {item.oneLiner}
                    </p>
                  </div>

                  <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-150 shrink-0 text-gray-400">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>

                {/* Expanded high-yield details page section */}
                {isExpanded && (
                  <div className="border-t border-gray-100 p-5 md:p-6 bg-[#fafafb]/30 space-y-5 animate-in slide-in-from-top-3 duration-250">
                    
                    {/* Paradigm/Theoretician detailed paragraph */}
                    <div className="space-y-1">
                      <h4 className="text-[10px] font-mono uppercase text-gray-400 font-black tracking-widest">Theoretical Focus Summary</h4>
                      <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-sans text-justify rounded-lg bg-white/60 p-3.5 border border-gray-150/55 shadow-2xs select-text">
                        {item.description}
                      </p>
                    </div>

                    {/* HIGH YIELD BOARD EXAM RECALL POINTER CARD */}
                    <div className="bg-gradient-to-br from-[#fffbeb]/90 to-transparent border border-[#fde8bb]/80 rounded-xl p-4 md:p-5 space-y-2.5 shadow-3xs">
                      <div className="flex items-center gap-2">
                        <Flame className="w-4 h-4 text-orange-600 animate-pulse" />
                        <span className="text-[9px] uppercase font-mono bg-orange-600 text-cream font-black px-2 py-0.5 rounded-sm tracking-wider">
                          ⭐ HIGH-YIELD REVIEW POINTER
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#7c2d12] font-display font-bold leading-normal select-all">
                        {item.highYieldRecall}
                      </p>
                    </div>

                    {/* TENETS OR KEY SEGMENT BREAKDOWN */}
                    {item.details.tenets && item.details.tenets.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-[10px] font-mono uppercase text-gray-400 font-black tracking-widest">Core Tenets &amp; Architecture</h4>
                        <div className="space-y-2 font-sans">
                          {item.details.tenets.map((tenet, idx) => (
                            <div key={idx} className="bg-white border border-gray-100 rounded-xl p-3.5 flex items-start gap-3 shadow-3xs">
                              <span className="w-5 h-5 rounded-md bg-indigo-50 border border-indigo-100 text-indigo-800 text-[10px] font-mono font-black flex items-center justify-center shrink-0 mt-0.5">
                                {idx + 1}
                              </span>
                              <p className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed">
                                {tenet}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* MAPPING COMPONENT LIST */}
                    {item.details.mapping && item.details.mapping.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-[10px] font-mono uppercase text-gray-400 font-black tracking-widest">Detailed Terms Taxonomy</h4>
                        <div className="space-y-2.5 font-sans">
                          {item.details.mapping.map((termItem, idx) => (
                            <div key={idx} className="bg-white border border-gray-150/70 p-4 rounded-xl flex items-start gap-4 hover:border-gray-250 shadow-3xs transition">
                              <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-teal-800 text-white font-mono text-xs font-black shrink-0 shadow-2xs mt-0.5">
                                {termItem.key}
                              </span>
                              <div className="space-y-1 flex-1">
                                <strong className="text-xs sm:text-sm font-semibold font-mono text-gray-900 block font-bold">
                                  {termItem.term}
                                </strong>
                                <p className="text-xs sm:text-sm text-gray-605 leading-relaxed text-justify">
                                  {termItem.explanation}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* KOTTER/STAGE CORE STEPS */}
                    {item.details.coreSteps && item.details.coreSteps.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-[10px] font-mono uppercase text-gray-400 font-black tracking-widest">Linear Action Steps Chain</h4>
                        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-3xs space-y-3 font-sans">
                          {item.details.coreSteps.map((step, idx) => (
                            <div key={idx} className="flex items-start gap-3 pl-1">
                              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0 mt-2" />
                              <span className="text-xs sm:text-sm text-gray-700 font-mono font-bold leading-relaxed">{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* MC GREGOR STYLE COMPARISON TABLES */}
                    {item.details.comparisonTable && (
                      <div className="space-y-2 overflow-hidden">
                        <h4 className="text-[10px] font-mono uppercase text-gray-400 font-black tracking-widest">Structural Comparison Grid</h4>
                        <div className="overflow-x-auto rounded-xl border border-gray-150 bg-white">
                          <table className="w-full text-left text-xs border-collapse font-sans">
                            <thead>
                              <tr className="bg-indigo-950 text-white font-mono text-[9px] uppercase tracking-wider border-b border-indigo-900">
                                {item.details.comparisonTable.headers.map((h, idx) => (
                                  <th key={idx} className="p-3 font-semibold select-none">{h}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                              {item.details.comparisonTable.rows.map((row, rIdx) => (
                                <tr key={rIdx} className="hover:bg-slate-50/50">
                                  {row.map((val, cIdx) => (
                                    <td key={cIdx} className={`p-3 text-gray-700 ${cIdx === 0 ? 'font-mono font-bold text-[10px] text-indigo-950 bg-slate-50/30' : 'text-justify text-xs'}`}>
                                      {val}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* ADDTIONAL BOARD RECALL BULLETPONT RECALL POINTS */}
                    <div className="space-y-2.5 pt-1.5 border-t border-dashed border-gray-200">
                      <span className="text-[10px] font-mono uppercase text-gray-400 font-black tracking-widest block">Licensure Recall &amp; Administrative Pointers</span>
                      <ul className="space-y-2.5 pl-4 list-disc text-xs sm:text-sm text-slate-700 font-sans">
                        {item.details.pointers.map((pointer, pIdx) => (
                          <li key={pIdx} className="marker:text-gray-400 text-justify">
                            {pointer}
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>
                )}
              </div>
            );
          })}

          {isTrial && filteredItems.length > 3 && (
            <div className="bg-gradient-to-br from-indigo-50/15 to-teal-500/5 border border-dashed border-indigo-100 rounded-2xl p-6 text-center space-y-4 shadow-sm max-w-2xl mx-auto my-4 animate-in fade-in duration-300">
              <span className="inline-flex items-center gap-1.5 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full text-[10px] font-mono font-extrabold text-[#312e81] uppercase tracking-widest leading-none">
                🕵️‍♂️ Clinical Trial Active Preview
              </span>
              <h4 className="font-display font-black text-gray-900 text-base md:text-lg tracking-tight leading-snug">
                Unlock {filteredItems.length - 3} More {activeTab === 'theories' ? 'Landmark Theories' : activeTab === 'models' ? 'Diagnostic Models' : 'Organizational Concepts'} in I/O Psychology
              </h4>
              <p className="text-xs text-gray-550 leading-relaxed font-sans font-medium">
                You are viewing a free trial selection of our exhaustive Industrial/Organizational Psychology syllabus. Upgrade to Premium to instantly explore all 20+ models, checklists, and active recall pointer index lists!
              </p>
              <div className="bg-white/85 p-3.5 rounded-xl border border-indigo-100 text-left text-[11px] space-y-2 font-medium font-sans text-gray-700 max-w-md mx-auto shadow-3xs">
                <div className="flex items-start gap-2">
                  <span className="text-[#3b82f6] font-bold">✓</span>
                  <span>100% Alignment with PRC I/O Psychology syllabus structures</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#3b82f6] font-bold">✓</span>
                  <span>Time motion research, job designs, team models, and OD parameters</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#3b82f6] font-bold">✓</span>
                  <span>High-yielding active study mnemonics and printable index spreadsheets</span>
                </div>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => onNavigate?.('billingTab')}
                  className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-[#14b8a6] hover:from-emerald-700 hover:to-teal-600 text-white font-sans font-extrabold text-xs uppercase tracking-wider rounded-xl cursor-pointer shadow-md select-none active:scale-95 transition-all inline-flex items-center justify-center gap-1.5 animate-pulse"
                >
                  👑 Upgrade to Premium Suite via GCash →
                </button>
              </div>
            </div>
          )}
        </>
      )}
      </div>

      {/* DISCLAMER / HELPFUL MOTIVATIONAL QUOTE */}
      <div className="bg-foam/20 border border-dashed border-sage/10 rounded-2xl p-4 flex gap-3 text-xs text-pine-mid leading-relaxed font-mono select-none">
        <Info className="w-5 h-5 text-sage shrink-0 mt-0.5" />
        <p>
          Always seek to connect organizational theories with human relations situations. Board exam questions typically test whether you can correctly diagnose systemic conflicts in simulated physical or remote office scenarios.
        </p>
      </div>
    </div>
  );
};
