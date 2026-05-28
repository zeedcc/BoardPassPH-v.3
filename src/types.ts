export interface SubtestDetail {
  name: string;
  definition: string;
  highMeaning: string;
  lowMeaning: string;
}

export interface TestAdministration {
  type: string;
  items: string;
  ageRange: string;
  time: string;
  trainingNeeded: string;
}

export interface PsychologyTest {
  id: string;
  name: string;
  category: string;
  developer: string;
  quickInfo: string;
  purpose: string;
  administration: TestAdministration;
  scoring: string;
  interpretation: string;
  mnemonics?: string;
  versions: string;
  factorsMeasured: string;
  isSmo34?: boolean;
  subtests?: SubtestDetail[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface Question {
  id?: string;
  category: string;
  vignette: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  source?: 'dsm5' | 'pharma' | 'assessment' | 'dev' | 'io' | 'local_test' | 'ethics';
  testId?: string;
  difficulty?: 'easy' | 'medium' | 'hard' | 'random';
  topic?: string;
}

export interface UserProfile {
  email: string;
  tier: 'Free' | 'Pro' | 'Clinical' | 'Clinical Trial' | '7-Day Clinical Trial' | 'Pro Suite' | 'Clinical Suite' | 'Lifetime Pass' | 'Study Buddy Trio';
  adaptive: boolean;
  username?: string;
  school?: string;
  photo?: string;
  totalXp: number;
  streak: number;
  streakShields: number;
  lastDate: string;
  currentCombo: number;
  attempts: number;
  correct: number;
  deck: Question[];
  notes: Record<string, string>;
  heat: Record<string, number>;
  badges: Record<string, boolean>;
  theme?: string;
  password?: string;
  passwordHint?: string;
  signUpDate?: string;
  moods?: Record<string, string>;
  habitsChecked?: Record<string, Record<string, boolean>>;
  calendarEvents?: Record<string, { id: string; title: string; note?: string; color: string; time?: string }[]>;
  dailyChallenges?: Record<string, 'correct' | 'incorrect'>;
  allowPushNotifications?: boolean;
  rememberQuestionHistory?: boolean;
  autoSubjectAccuracy?: boolean;
  habits?: string[];
  habitDefinitions?: { id: string; name: string; xp: number }[];
  questionHistory?: string[]; // vignette snippets for AI deduplication
  subjectAccuracy?: Record<string, number>;
  subjectAttempts?: Record<string, number>;
  subjectCorrect?: Record<string, number>;
  studyHours?: Record<string, number>; // Record representing subject ID to accumulated hours
  studyLog?: { id: string; subjectId: string; date: string; hours: number; notes?: string }[];
  tosProgress?: Record<string, 'unread' | 'reviewing' | 'mastered'>;
  referredEmails?: string[];
  referralUsed?: boolean;
  claimedReferralBonus?: boolean;
  petName?: string;
  petSpecies?: 'frog' | 'kitty' | 'pup' | 'owl';
  petHappiness?: number;
  petAccessories?: string[];
  activePetAccessory?: string;
}

export interface ExamQuestionState {
  question: Question;
  selectedAnswer: number | null;
  flagged: boolean;
}

export interface GCashPaymentRequest {
  id: string;
  email: string;
  requestedTier: 'Pro Suite' | 'Clinical Suite';
  amountPaid: number;
  gcashNumber: string;
  gcashReceiver: string;
  gcashRef: string;
  timestamp: string;
  status: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
}

export interface MockExamState {
  questions: ExamQuestionState[];
  currentQuestionIndex: number;
  secondsRemaining: number;
  isActive: boolean;
  isCompleted: boolean;
  focusArea: string;
  score: number;
  gainedXp: number;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  hint?: string;
}

export interface FlashcardDeck {
  id: string;
  title: string;
  description: string;
  creatorEmail: string;
  creatorName: string;
  cards: Flashcard[];
  isPublic: boolean;
  createdAt: string;
  category?: string;
  downloads?: number;
}

export interface GroupRecallRoom {
  id: string;
  deckId: string;
  deckTitle: string;
  cards: Flashcard[];
  hostEmail: string;
  hostName: string;
  status: 'lobby' | 'active' | 'reveal' | 'finished';
  currentCardIndex: number;
  participants: Record<string, {
    email: string;
    name: string;
    score: number;
    lastAnswerText?: string;
    submittedAnswer?: boolean;
    selfRating?: 'perfect' | 'vague' | 'forgot' | null;
    voiceConnected?: boolean;
    isMuted?: boolean;
    isSpeaking?: boolean;
  }>;
  chatMessages: {
    id: string;
    senderName: string;
    senderEmail: string;
    text: string;
    timestamp: string;
    audioUrl?: string;
    duration?: number;
  }[];
  createdAt: string;
  lastActiveAt: string;
}

