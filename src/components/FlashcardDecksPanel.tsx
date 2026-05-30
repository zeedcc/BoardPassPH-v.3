import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Layers, Plus, Search, Share2, Play, Send, Upload, Sparkles, 
  Smile, Check, X, ChevronLeft, ChevronRight, Info, Users, Globe, Lock, 
  ArrowLeft, Copy, Trophy, RefreshCw, ThumbsUp, MessageSquare, BookOpen, AlertCircle,
  Mic, MicOff, Volume2, CircleDot, Radio, Square, Zap, Key, Flame, Heart, ChevronDown
} from 'lucide-react';
import { doc, setDoc, getDoc, updateDoc as firestoreUpdateDoc, arrayUnion, onSnapshot, collection, query, where, getDocs, deleteDoc, writeBatch } from 'firebase/firestore';
import { db, firestoreWithTimeout, firebaseStatus } from '../firebase';
import { UserProfile, Flashcard, FlashcardDeck, GroupRecallRoom } from '../types';
import { GroupVideoChat } from './GroupVideoChat';

interface FlashcardDecksPanelProps {
  profile: UserProfile;
  setProfile: (nextVal: React.SetStateAction<UserProfile | null>) => void;
}

// Simulated peer names and avatars
const VIRTUAL_PEERS = [
  { name: "Reviewer Camille", avatar: "👩‍⚕️", speed: 4000, color: "text-rose-500 bg-rose-50 border-rose-200" },
  { name: "Dr. Ryan (Passer)", avatar: "👨‍🎓", speed: 5000, color: "text-blue-500 bg-blue-50 border-blue-200" },
  { name: "Ethics Bot", avatar: "🤖", speed: 6500, color: "text-amber-500 bg-amber-50 border-amber-200" }
];

const FlashcardDeckItem: React.FC<{ 
  deck: FlashcardDeck; 
  onEdit: (d: FlashcardDeck) => void;
  onDelete: (id: string) => void;
  onAddSubdeck: (parentId: string) => void;
  onLaunchSolo: (d: FlashcardDeck) => void;
  onLaunchLive: (d: FlashcardDeck) => void;
  onShare: (d: FlashcardDeck) => void;
  isSubdeck?: boolean;
}> = ({ deck, onEdit, onDelete, onAddSubdeck, onLaunchSolo, onLaunchLive, onShare, isSubdeck }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`bg-white border ${isSubdeck ? 'border-gray-100 ml-4' : 'border-gray-200'} rounded-3xl p-5 shadow-sm space-y-4 flex flex-col justify-between`}>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-[10px] uppercase font-extrabold text-[#11321e] bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded-full select-none">
            {deck.category || "General Psychology"}
          </span>
          <span className="text-[10px] font-mono font-bold text-gray-400">
            {deck.cards.length} Active Cards
          </span>
        </div>
        <h4 className="font-display text-lg px-0.5 font-bold leading-tight text-pine flex items-center gap-2">
          {deck.subdecks && deck.subdecks.length > 0 && (
            <button onClick={() => setIsExpanded(!isExpanded)} className="text-gray-400 hover:text-pine cursor-pointer">
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
          )}
          {deck.title}
        </h4>
        <p className="text-xs text-gray-500 line-clamp-2 px-0.5">
          {deck.description}
        </p>
      </div>

      <div className="pt-3 border-t border-gray-100 flex gap-2 flex-wrap">
        <button
          onClick={() => onLaunchLive(deck)}
          className="px-3 py-1.5 bg-pine hover:bg-pine-mid text-cream text-[10px] font-black uppercase tracking-wider rounded-lg flex items-center gap-1 cursor-pointer"
          title="Host Arena"
        >
          <Users className="w-3 h-3 text-mint" />
          Arena
        </button>
        
        <button
          onClick={() => onLaunchSolo(deck)}
          className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-cream text-[10px] font-black uppercase tracking-wider rounded-lg flex items-center gap-1 cursor-pointer"
          title="Solo Play"
        >
          <Play className="w-3 h-3" />
          Solo
        </button>

        {!deck.isPublic && (
          <button
            onClick={() => onShare(deck)}
            className="px-3 py-1.5 border border-emerald-200 text-emerald-800 hover:bg-emerald-50 text-[10px] font-black uppercase tracking-wider rounded-lg flex items-center gap-1 cursor-pointer"
            title="Public"
          >
            <Globe className="w-3 h-3" />
            Public
          </button>
        )}

        <button
          onClick={() => onEdit(deck)}
          className="px-3 py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-[10px] font-bold uppercase rounded-lg cursor-pointer"
        >
          Edit
        </button>

        <button
          onClick={() => onAddSubdeck(deck.id)}
          className="px-3 py-1.5 bg-pine/10 text-pine hover:bg-pine/20 text-[10px] font-bold uppercase rounded-lg cursor-pointer"
        >
          + Sub
        </button>

        <button
          onClick={() => onDelete(deck.id)}
          className="px-3 py-1.5 bg-red-50 text-red-700 hover:bg-red-100 text-[10px] font-bold uppercase rounded-lg cursor-pointer ml-auto"
        >
          Delete
        </button>
      </div>

      {isExpanded && deck.subdecks && deck.subdecks.length > 0 && (
        <div className="pt-2 space-y-4 border-l-2 border-pine/10 pl-2">
          {deck.subdecks.map(sub => (
            <FlashcardDeckItem 
              key={sub.id} 
              deck={sub} 
              onEdit={onEdit} 
              onDelete={onDelete} 
              onAddSubdeck={onAddSubdeck}
              onLaunchSolo={onLaunchSolo}
              onLaunchLive={onLaunchLive}
              onShare={onShare}
              isSubdeck
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Pre-seeded local decks based on PmLE curriculum
const SAMPLE_DECKS: FlashcardDeck[] = [];

// Must be defined outside component so it can be used in useState initializer
function SEED_PUBLIC_DECKS(): FlashcardDeck[] {
  return SAMPLE_DECKS;
}

export const FlashcardDecksPanel: React.FC<FlashcardDecksPanelProps> = ({ profile, setProfile }) => {
  const [activeSubTab, setActiveSubTab] = useState<'my-decks' | 'ai-generator' | 'public-decks' | 'live-recall'>('my-decks');
  
  // Custom Deck Creation State
  const [myCustomDecks, setMyCustomDecks] = useState<FlashcardDeck[]>([]);
  const [newDeckTitle, setNewDeckTitle] = useState('');
  const [newDeckDesc, setNewDeckDesc] = useState('');
  const [newDeckCategory, setNewDeckCategory] = useState('Abnormal Psychology');
  const [newDeckCards, setNewDeckCards] = useState<Omit<Flashcard, 'id'>[]>([{ front: '', back: '', hint: '' }]);
  const [isCreatingDeck, setIsCreatingDeck] = useState(false);
  const [editingDeckId, setEditingDeckId] = useState<string | null>(null);
  const [parentDeckIdForSubdeck, setParentDeckIdForSubdeck] = useState<string | null>(null);
  
  // AI Generator state
  const [pastedNotes, setPastedNotes] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileContentText, setFileContentText] = useState('');
  const [isGeneratingDeckAI, setIsGeneratingDeckAI] = useState(false);
  const [aiGenerationProgressText, setAiGenerationProgressText] = useState('');
  const [aiGenResult, setAiGenResult] = useState<Flashcard[]>([]);
  const [aiDeckTitle, setAiDeckTitle] = useState('');
  const [isParsingFile, setIsParsingFile] = useState(false);
  const [fileExtensionError, setFileExtensionError] = useState('');

  const [deckApiKey, setDeckApiKey] = useState(() => {
    return localStorage.getItem(`bp_gemini_api_key_${profile.email}`) || '';
  });
  const [numCardsToGenerate, setNumCardsToGenerate] = useState<number>(50);
  
  // Public Decks pool
  const [publicDecks, setPublicDecks] = useState<FlashcardDeck[]>(SEED_PUBLIC_DECKS());
  const [deckSearchQuery, setDeckSearchQuery] = useState('');
  
  // Live Active Recall State Models
  const [activeSessionRoom, setActiveSessionRoom] = useState<GroupRecallRoom | null>(null);
  const [joinRoomIdInput, setJoinRoomIdInput] = useState('');
  const [selectedDeckIdForNewRoom, setSelectedDeckIdForNewRoom] = useState('');
  const [roomLobbyMode, setRoomLobbyMode] = useState<'multiplayer' | 'solo'>('multiplayer');
  const [myWrittenAnswer, setMyWrittenAnswer] = useState('');
  const [playersDoneSubmitting, setPlayersDoneSubmitting] = useState(false);
  const [isSoloMode, setIsSoloMode] = useState(false);
  const [activeRoomMessageInput, setActiveRoomMessageInput] = useState('');
  const [sessionRoomLoading, setSessionRoomLoading] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const [selectedTimerDuration, setSelectedTimerDuration] = useState(60);

  // Voice Recording and voice lounge states
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const voiceTimerRef = useRef<any>(null);
  const playedVoiceNoteIds = useRef<Set<string>>(new Set());
  const voxTimerRef = useRef<any>(null);
  const roomUnsubscribeRef = useRef<(() => void) | null>(null);
  const isAutoRecordingRef = useRef(false);
  // Ref to avoid stale closure in countdown timer useEffect
  const hostRevealRef = useRef<(() => Promise<void>) | null>(null);
  const recordingSecondsRef = useRef(0);

  // Live Voice Lounge Connection
  const [voiceLoungeConnected, setVoiceLoungeConnected] = useState(false);
  const [isVoiceMuted, setIsVoiceMuted] = useState(false);
  const [localVoiceVolume, setLocalVoiceVolume] = useState(0); // 0 to 100
  // Refs to avoid stale closures in requestAnimationFrame callback
  const voiceLoungeConnectedRef = useRef(false);

  // INTERCEPTOR: Prevent Firebase quota exhaustion in Solo Mode
  const updateDoc = async (docRef: any, data: any) => {
    if (isSoloMode) {
      setActiveSessionRoom(prev => {
        if (!prev) return prev;
        const next = { ...prev };
        
        // Shallow merge simple fields
        Object.keys(data).forEach(k => {
           if (k !== 'chatMessages') {
             (next as any)[k] = data[k];
           }
        });
        
        return next;
      });
      return Promise.resolve();
    }
    return firestoreUpdateDoc(docRef, data);
  };

  const isVoiceMutedRef = useRef(false);
  const isRecordingVoiceRef = useRef(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const rafIdRef = useRef<number | null>(null);

  // ── WebRTC live voice ──────────────────────────────────────────────────────
  // peerConnections: keyed by remote participant's emailKey (dots replaced with _)
  const peerConnectionsRef = useRef<Record<string, RTCPeerConnection>>({});
  // remoteAudio elements: one per remote peer, kept alive in a ref so GC won't kill them
  const remoteAudioElementsRef = useRef<Record<string, HTMLAudioElement>>({});
  // Firestore unsubscribers for each peer's signaling sub-collection listener
  const signalingUnsubsRef = useRef<Record<string, () => void>>({});
  // Track which peers we have already initiated an offer toward
  const offeredPeersRef = useRef<Set<string>>(new Set());
  // ──────────────────────────────────────────────────────────────────────────
  
  // Load my-decks from localStorage or profile (prefer profile for cloud sync)
  useEffect(() => {
    if (profile.flashcardDecks && profile.flashcardDecks.length > 0) {
      setMyCustomDecks(profile.flashcardDecks);
    } else {
      const saved = localStorage.getItem(`bp_flashcards_${profile.email}`);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setMyCustomDecks(parsed);
          // If profile is empty but local has data, sync it up
          if (parsed.length > 0) {
            setProfile((prev: UserProfile | null) => prev ? ({ ...prev, flashcardDecks: parsed }) : prev);
          }
        } catch (err) {
          console.warn("Could not load custom flashcard decks", err);
        }
      } else {
        localStorage.setItem(`bp_flashcards_${profile.email}`, JSON.stringify([]));
      }
    }
    fetchPublicDecks();
  }, [profile.email]);

  // Auto-join shared flashcard rooms from URL query param
  useEffect(() => {
    const pendingClassroomRoom = localStorage.getItem('bp_flashcard_join_room_id');
    if (pendingClassroomRoom) {
      localStorage.removeItem('bp_flashcard_join_room_id');
      setSessionRoomLoading(true);
      
      const autoJoinSharedRoom = async () => {
        let code = pendingClassroomRoom.trim().toLowerCase();
        // Normalize room code: if it's 6 digits, add the 'room-' prefix
        if (/^\d{6}$/.test(code)) {
          code = `room-${code}`;
        }

        try {
          const docRef = doc(db, 'liveRecallSessions', code);
          const docSnap = await firestoreWithTimeout(getDoc(docRef));

          if (!docSnap.exists()) {
            alert("The shared Recall lobby was not found. It may have expired or been deleted.");
            setSessionRoomLoading(false);
            return;
          }

          const roomData = docSnap.data() as GroupRecallRoom;
          const myName = profile.username || profile.email.split('@')[0];
          const memberKey = profile.email.replace(/\./g, '_');

          const updatedParticipants = { ...roomData.participants };
          updatedParticipants[memberKey] = {
            email: profile.email,
            name: myName,
            score: roomData.participants[memberKey]?.score || 0,
            lastAnswerText: '',
            submittedAnswer: false,
            selfRating: null
          };

          await firestoreWithTimeout(updateDoc(docRef, {
            participants: updatedParticipants,
            chatMessages: arrayUnion({
              id: `msg-${Date.now()}`,
              senderName: "Lobby Bot",
              senderEmail: "admin@boardpassph.com",
              text: `${myName} entered the Active Recall room via share link!`,
              timestamp: new Date().toLocaleTimeString()
            })
          }));

          subscribeToLiveRecallSession(code);
        } catch (err) {
          console.error("Auto room joining failed:", err);
        } finally {
          setSessionRoomLoading(false);
        }
      };

      autoJoinSharedRoom();
    }
  }, [profile.email]);

  const fetchPublicDecks = async () => {
    try {
      const q = query(collection(db, 'flashcardDecks'), where('isPublic', '==', true));
      const querySnapshot = await firestoreWithTimeout(getDocs(q));
      const items: FlashcardDeck[] = [];
      querySnapshot.forEach((doc: any) => {
        items.push({ id: doc.id, ...doc.data() } as FlashcardDeck);
      });
      if (items.length > 0) {
        setPublicDecks([...SAMPLE_DECKS, ...items]);
      } else {
        setPublicDecks(SAMPLE_DECKS);
      }
    } catch (err) {
      console.warn("Could not fetch remote public decks, using preseeded ones:", err);
      setPublicDecks(SAMPLE_DECKS);
    }
  };

  const saveDecksLocally = (updated: FlashcardDeck[]) => {
    setMyCustomDecks(updated);
    localStorage.setItem(`bp_flashcards_${profile.email}`, JSON.stringify(updated));
    // Update profile so the Cloud Sync button actually has access to this data
    setProfile((prev: UserProfile | null) => {
      if (!prev) return prev;
      return { ...prev, flashcardDecks: updated };
    });
  };

  // Dynamic client-side CDN script loaders to avoid heavy bundler size / node.js server-side 1MB POST payload size limits
  const loadPdfJs = (): Promise<any> => {
    return new Promise((resolve, reject) => {
      if ((window as any).pdfjsLib) {
        resolve((window as any).pdfjsLib);
        return;
      }
      const existing = document.getElementById('pdfjs-script');
      if (existing) {
        let attempts = 0;
        const interval = setInterval(() => {
          if ((window as any).pdfjsLib) {
            clearInterval(interval);
            resolve((window as any).pdfjsLib);
          } else if (attempts > 60) {
            clearInterval(interval);
            reject(new Error('PDF engine load timed out. Please refresh or try again.'));
          }
          attempts++;
        }, 100);
        return;
      }
      const script = document.createElement('script');
      script.id = 'pdfjs-script';
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js';
      script.onload = () => {
        const pdfjsLib = (window as any).pdfjsLib;
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
        resolve(pdfjsLib);
      };
      script.onerror = () => reject(new Error('Failed to load PDF engine from CDN.'));
      document.head.appendChild(script);
    });
  };

  const loadMammoth = (): Promise<any> => {
    return new Promise((resolve, reject) => {
      if ((window as any).mammoth) {
        resolve((window as any).mammoth);
        return;
      }
      const existing = document.getElementById('mammoth-script');
      if (existing) {
        let attempts = 0;
        const interval = setInterval(() => {
          if ((window as any).mammoth) {
            clearInterval(interval);
            resolve((window as any).mammoth);
          } else if (attempts > 60) {
            clearInterval(interval);
            reject(new Error('Mammoth engine load timed out.'));
          }
          attempts++;
        }, 100);
        return;
      }
      const script = document.createElement('script');
      script.id = 'mammoth-script';
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js';
      script.onload = () => {
        resolve((window as any).mammoth);
      };
      script.onerror = () => reject(new Error('Failed to load Word document reader from CDN.'));
      document.head.appendChild(script);
    });
  };

  const loadXlsx = (): Promise<any> => {
    return new Promise((resolve, reject) => {
      if ((window as any).XLSX) {
        resolve((window as any).XLSX);
        return;
      }
      const existing = document.getElementById('xlsx-script');
      if (existing) {
        let attempts = 0;
        const interval = setInterval(() => {
          if ((window as any).XLSX) {
            clearInterval(interval);
            resolve((window as any).XLSX);
          } else if (attempts > 60) {
            clearInterval(interval);
            reject(new Error('XLSX spreadsheet engine load timed out.'));
          }
          attempts++;
        }, 100);
        return;
      }
      const script = document.createElement('script');
      script.id = 'xlsx-script';
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';
      script.onload = () => {
        resolve((window as any).XLSX);
      };
      script.onerror = () => reject(new Error('Failed to load Excel reader from CDN.'));
      document.head.appendChild(script);
    });
  };

  const parsePdfOnClient = async (file: File): Promise<string> => {
    const pdfjsLib = await loadPdfJs();
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdfDoc = await loadingTask.promise;
    let fullText = '';
    const maxPages = Math.min(120, pdfDoc.numPages); // prevent freezing on Books, sample first 120 pages
    for (let i = 1; i <= maxPages; i++) {
      const page = await pdfDoc.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item: any) => item.str).join(' ');
      fullText += pageText + '\n';
    }
    return fullText;
  };

  const parseDocxOnClient = async (file: File): Promise<string> => {
    const mammothInstance = await loadMammoth();
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammothInstance.extractRawText({ arrayBuffer });
    return result.value || '';
  };

  const parseExcelOnClient = async (file: File): Promise<string> => {
    const xlsxInstance = await loadXlsx();
    const arrayBuffer = await file.arrayBuffer();
    const workbook = xlsxInstance.read(arrayBuffer, { type: 'array' });
    let extracted = '';
    workbook.SheetNames.forEach((sheetName: string) => {
      const worksheet = workbook.Sheets[sheetName];
      const rows = xlsxInstance.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];
      if (rows && rows.length > 0) {
        extracted += `\n--- Sheet: ${sheetName} ---\n`;
        rows.forEach((row) => {
          if (row && row.length > 0) {
            extracted += row.map((cell: any) => cell !== undefined && cell !== null ? String(cell) : '').join('\t') + '\n';
          }
        });
      }
    });
    return extracted;
  };

  // Handle Manual File upload parsing & 10MB limit (PDF, Docx, Excel, CSV, TXT, etc.)
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // AI Quota check - Must have custom API key
    if (!deckApiKey || deckApiKey.trim() === '') {
      alert("⚠️ Developer API Key Required: You must paste your own Gemini API Key below to synthesize AI Deck cards.");
      return;
    }

    const limitSize = 20 * 1024 * 1024;
    if (file.size > limitSize) {
      alert(`⚠️ File is too large! The limit is 20MB. This file is ${(file.size / (1024 * 1024)).toFixed(2)}MB. Please choose a smaller study guide or split your material.`);
      return;
    }

    setFileExtensionError('');
    setSelectedFile(file);
    setFileContentText('');
    setIsParsingFile(true);

    const lowerName = file.name.toLowerCase();

    try {
      if (lowerName.endsWith('.pdf')) {
        const text = await parsePdfOnClient(file);
        setFileContentText(text);
      } else if (lowerName.endsWith('.docx')) {
        const text = await parseDocxOnClient(file);
        setFileContentText(text);
      } else if (lowerName.endsWith('.xlsx') || lowerName.endsWith('.xls')) {
        const text = await parseExcelOnClient(file);
        setFileContentText(text);
      } else if (lowerName.endsWith('.txt') || lowerName.endsWith('.md') || lowerName.endsWith('.csv') || lowerName.endsWith('.json')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const text = event.target?.result as string;
          setFileContentText(text || '');
        };
        reader.onerror = () => {
          setFileExtensionError('⚠️ Failed reading text format locally.');
          setSelectedFile(null);
        };
        reader.readAsText(file);
      } else {
        // Fallback for unknown formats, try to read as plain text
        const reader = new FileReader();
        reader.onload = (event) => {
          const text = event.target?.result as string;
          setFileContentText(text || '');
        };
        reader.readAsText(file);
      }
    } catch (err: any) {
      console.error("Client side document parsing error:", err);
      setFileExtensionError(`⚠️ Text extraction failed: ${err.message || err}. Try pasting relevant content directly or converting to a text file.`);
      setSelectedFile(null);
    } finally {
      setIsParsingFile(false);
    }
  };

  // Helper function to split text into semantic chunks for robust serverless processing
  const splitTextIntoSemanticChunks = (text: string, maxChunkSize: number = 6000): string[] => {
    if (text.length <= maxChunkSize) {
      return [text];
    }
    const paragraphs = text.split(/\n+/);
    const chunks: string[] = [];
    let currentChunk = '';

    for (const para of paragraphs) {
      if ((currentChunk + para).length > maxChunkSize) {
        if (currentChunk.trim() !== '') {
          chunks.push(currentChunk.trim());
        }
        currentChunk = para + '\n';
      } else {
        currentChunk += para + '\n';
      }
    }
    if (currentChunk.trim() !== '') {
      chunks.push(currentChunk.trim());
    }

    const finalChunks: string[] = [];
    for (const chunk of chunks) {
      if (chunk.length > maxChunkSize) {
        let temp = chunk;
        while (temp.length > maxChunkSize) {
          finalChunks.push(temp.substring(0, maxChunkSize));
          temp = temp.substring(maxChunkSize);
        }
        if (temp.trim() !== '') {
          finalChunks.push(temp);
        }
      } else {
        finalChunks.push(chunk);
      }
    }
    return finalChunks;
  };

  // Call Gemini backend to generate custom cards
  const handleTriggerAIGenerator = async () => {
  const rawNotes = pastedNotes.trim();
  const rawFileText = fileContentText.trim();

  if (!rawNotes && !rawFileText) {
    alert("Please either paste study notes or upload a text file first!");
    return;
  }

  if (!deckApiKey || deckApiKey.trim() === '') {
    alert("⚠️ Developer API Key Required: You must paste your own Gemini API Key below to synthesize AI Deck cards.");
    return;
  }

  setIsGeneratingDeckAI(true);
  setAiGenerationProgressText("Reading and chunking content...");
  setAiGenResult([]);

  try {
    const fullText = `${rawNotes}\n${rawFileText}`.trim();

    // Split content into semantic chunks so nothing is skipped
    const CHUNK_SIZE = 6000;
    const chunks = splitTextIntoSemanticChunks(fullText, CHUNK_SIZE);

    // Calculate cards per chunk — distribute numCardsToGenerate across chunks,
    // but always generate at least 1 card per chunk so the whole doc is covered.
    const cardsPerChunk = Math.max(1, Math.ceil(numCardsToGenerate / chunks.length));
    const TOTAL_CARDS = cardsPerChunk * chunks.length; // actual total, may exceed slider

    const allCards: Flashcard[] = [];
    let globalCardIndex = 0;

    for (let chunkIdx = 0; chunkIdx < chunks.length; chunkIdx++) {
      const chunk = chunks[chunkIdx];

      for (let localIdx = 1; localIdx <= cardsPerChunk; localIdx++) {
        globalCardIndex++;
        setAiGenerationProgressText(
          `Chunk ${chunkIdx + 1}/${chunks.length} — card ${globalCardIndex} of ~${TOTAL_CARDS}...`
        );

        try {
          const res = await fetch('/api/generate-deck', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              textPayload: chunk,          // send only this chunk, not the full text
              fileContent: '',
              fileName: selectedFile?.name || 'Uploaded Notes',
              cardIndex: localIdx,
              totalCards: cardsPerChunk,
              customApiKey: deckApiKey
            })
          });

          if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`Server returned status ${res.status}: ${errorText}`);
          }

          const data = await res.json();

          if (data.isFallback) {
            console.warn(`Chunk ${chunkIdx + 1}, card ${localIdx} fallback:`, data.msg);
            continue;
          }

          if (data.card) {
            const newCard: Flashcard = {
              id: `card-${globalCardIndex}-${Date.now()}`,
              front: data.card.front,
              back: data.card.back,
              hint: data.card.hint || '',
              options: data.card.options || [],
              correctOption: data.card.correctOption || ''
            };
            allCards.push(newCard);
            setAiGenResult([...allCards]); // live preview as cards arrive
          }
        } catch (err: any) {
          console.warn(`Error generating card ${globalCardIndex}:`, err);
        }
      }
    }

    if (allCards.length > 0) {
      setAiGenResult(allCards);
      setAiDeckTitle(
        selectedFile
          ? `AI - ${selectedFile.name.split('.')[0]}`
          : `AI - Chapter Review ${new Date().toLocaleDateString()}`
      );
    } else {
      alert("Failed to synthesize flashcards. Please double check that your Gemini API Key is valid.");
    }
  } catch (err: any) {
    console.warn("AI deck generation client error:", err);
    alert(`AI deck generator failed.\n\nDetails: ${err.message || err}\n\nPlease check your internet connection or verify your Gemini API Key.`);
  } finally {
    setIsGeneratingDeckAI(false);
    setAiGenerationProgressText('');
  }
};


  const handleCreateNewManualDeck = () => {
    setNewDeckTitle('');
    setNewDeckDesc('');
    setNewDeckCategory('Abnormal Psychology');
    setNewDeckCards([{ front: '', back: '', hint: '', options: ['', '', '', ''], correctOption: '' }]);
    setIsCreatingDeck(true);
    setActiveSubTab('my-decks'); // Always switch to my-decks when creating
  };

  const handleAddManualCardRow = () => {
    setNewDeckCards([...newDeckCards, { front: '', back: '', hint: '', options: ['', '', '', ''], correctOption: '' }]);
  };

  const handleRemoveManualCardRow = (idx: number) => {
    if (newDeckCards.length <= 1) return;
    setNewDeckCards(newDeckCards.filter((_, i) => i !== idx));
  };

  const findDeckRecursive = (decks: FlashcardDeck[], targetId: string): FlashcardDeck | undefined => {
    for (const d of decks) {
      if (d.id === targetId) return d;
      if (d.subdecks) {
        const found = findDeckRecursive(d.subdecks, targetId);
        if (found) return found;
      }
    }
    return undefined;
  };

  const handleSaveManualDeck = async () => {
    if (!newDeckTitle.trim()) {
      alert("Title is required!");
      return;
    }

    const compiledCards: Flashcard[] = newDeckCards
      .filter(c => c.front.trim() && c.back.trim())
      .map((c, i) => ({
        id: (c as any).id || `card-${Date.now()}-${i}`,
        front: c.front.trim(),
        back: c.back.trim(),
        hint: c.hint?.trim() || '',
        options: c.options || [],
        correctOption: c.correctOption || ''
      }));

    if (compiledCards.length === 0) {
      alert("Decks must have at least one complete card with a front and back!");
      return;
    }

    let updated: FlashcardDeck[];

    if (editingDeckId) {
      const existingDeck = findDeckRecursive(myCustomDecks, editingDeckId);
      if (!existingDeck) return;

      const updatedDeck: FlashcardDeck = {
        ...existingDeck,
        title: newDeckTitle.trim(),
        description: newDeckDesc.trim(),
        category: newDeckCategory,
        cards: compiledCards
      };

      // Auto-sync to public directory if already published
      if (updatedDeck.isPublic) {
        try {
          await setDoc(doc(db, 'flashcardDecks', updatedDeck.id), updatedDeck);
        } catch (e) {
          console.warn("Public directory sync failed:", e);
        }
      }

      updated = findAndReplaceDeck(myCustomDecks, editingDeckId, updatedDeck);
    } else {
      const deckId = `deck-${Date.now()}`;
      const newDeck: FlashcardDeck = {
        id: deckId,
        title: newDeckTitle.trim(),
        description: newDeckDesc.trim() || 'Custom study cards',
        creatorEmail: profile.email,
        creatorName: profile.username || profile.email.split('@')[0],
        cards: compiledCards,
        isPublic: false,
        category: newDeckCategory,
        createdAt: new Date().toISOString()
      };

      if (parentDeckIdForSubdeck) {
        updated = findAndAddSubdeck(myCustomDecks, parentDeckIdForSubdeck, newDeck);
      } else {
        updated = [newDeck, ...myCustomDecks];
      }
    }

    saveDecksLocally(updated);
    setIsCreatingDeck(false);
    setEditingDeckId(null);
    setParentDeckIdForSubdeck(null);
    alert(editingDeckId ? "🎉 Flashcard Deck Updated Successfully!" : "🎉 Flashcard Deck Created Successfully! Find it in the My Decks tab.");
  };

  const handleStartEditingDeck = (deck: FlashcardDeck) => {
    setNewDeckTitle(deck.title);
    setNewDeckDesc(deck.description);
    setNewDeckCategory(deck.category || 'Abnormal Psychology');
    setNewDeckCards(deck.cards.map(c => ({
      front: c.front,
      back: c.back,
      hint: c.hint || '',
      options: c.options || ['', '', '', ''],
      correctOption: c.correctOption || ''
    })));
    setEditingDeckId(deck.id);
    setIsCreatingDeck(true);
  };

  const handleStartCreatingSubdeck = (parentId: string) => {
    handleCreateNewManualDeck();
    setParentDeckIdForSubdeck(parentId);
  };

  const findAndReplaceDeck = (decks: FlashcardDeck[], targetId: string, updatedDeck: FlashcardDeck): FlashcardDeck[] => {
    return decks.map(d => {
      if (d.id === targetId) return updatedDeck;
      if (d.subdecks) {
        return { ...d, subdecks: findAndReplaceDeck(d.subdecks, targetId, updatedDeck) };
      }
      return d;
    });
  };

  const findAndAddSubdeck = (decks: FlashcardDeck[], parentId: string, newSubdeck: FlashcardDeck): FlashcardDeck[] => {
    return decks.map(d => {
      if (d.id === parentId) {
        return { ...d, subdecks: [...(d.subdecks || []), newSubdeck] };
      }
      if (d.subdecks) {
        return { ...d, subdecks: findAndAddSubdeck(d.subdecks, parentId, newSubdeck) };
      }
      return d;
    });
  };

  const handleSaveAIDeck = () => {
    if (aiGenResult.length === 0) return;

    const deckId = `deck-${Date.now()}`;
    const newDeck: FlashcardDeck = {
      id: deckId,
      title: aiDeckTitle || 'AI-Generated Deck',
      description: `Generated by AI on ${new Date().toLocaleDateString()} from uploaded review guidelines.`,
      creatorEmail: profile.email,
      creatorName: 'AI Co-author',
      cards: aiGenResult,
      isPublic: false,
      category: 'Psychological Assessment',
      createdAt: new Date().toISOString()
    };

    const updated = [newDeck, ...myCustomDecks];
    saveDecksLocally(updated);
    
    // Clear state
    setAiGenResult([]);
    setPastedNotes('');
    setSelectedFile(null);
    setFileContentText('');
    setActiveSubTab('my-decks');
    alert("🎉 AI Flashcard Deck Saved Successfully! Try launching it in the Live Recall Arena.");
  };

  const handleShareDeckWithPublic = async (deck: FlashcardDeck) => {
    const confirmation = window.confirm(`Would you like to publish "${deck.title}" to the BoardPassPH Community Directory? Other candidates will be able to search and study this deck.`);
    if (!confirmation) return;

    try {
      const publicRef = doc(db, 'flashcardDecks', deck.id);
      const updatedDeck = { ...deck, isPublic: true };
      await setDoc(publicRef, updatedDeck);

      // Update local state
      const updatedLocal = myCustomDecks.map(d => d.id === deck.id ? { ...d, isPublic: true } : d);
      saveDecksLocally(updatedLocal);
      fetchPublicDecks();
      alert("✨ Published successfully to Community Directory! Thank you for backing fellow PmLE examinees.");
    } catch (err) {
      console.error("Public deck publishing failed:", err);
      alert("Failed to share deck. Please check web connection.");
    }
  };

  const handleDeleteCustomDeck = (deckId: string) => {
    const confirmation = window.confirm("Are you sure you want to delete this custom deck permanently?");
    if (!confirmation) return;

    const findAndDeleteRecursive = (decks: FlashcardDeck[], targetId: string): FlashcardDeck[] => {
      const filtered = decks.filter(d => d.id !== targetId);
      return filtered.map(d => ({
        ...d,
        subdecks: d.subdecks ? findAndDeleteRecursive(d.subdecks, targetId) : undefined
      }));
    };

    const updated = findAndDeleteRecursive(myCustomDecks, deckId);
    saveDecksLocally(updated);
  };

  // Real-time Active Recall Arena multiplayer mechanics
  const handleLaunchLiveGroupRecall = async (deck: FlashcardDeck, forceSolo = false) => {
    setSessionRoomLoading(true);
    setIsSoloMode(forceSolo);
    const roomId = `room-${Math.floor(100000 + Math.random() * 900000)}`;

    const myName = profile.username || profile.email.split('@')[0];
    const initialParticipants: Record<string, any> = {};
    initialParticipants[profile.email.replace(/\./g, '_')] = {
      email: profile.email,
      name: myName,
      score: 0,
      lastAnswerText: '',
      submittedAnswer: false,
      selfRating: null
    };

    // If Solo Mode is requested, preseed virtual peers
    if (forceSolo) {
      VIRTUAL_PEERS.forEach((peer, idx) => {
        const peerKey = `peer_${idx}`;
        initialParticipants[peerKey] = {
          email: `${peer.name.toLowerCase().replace(/\s/g, '_')}@sim.edu`,
          name: `${peer.avatar} ${peer.name}`,
          score: 0,
          lastAnswerText: '',
          submittedAnswer: false,
          selfRating: null
        };
      });
    }

    if (!deck.cards || deck.cards.length === 0) {
      alert("This deck is currently empty. Please add some cards before launching an Active Recall Arena session!");
      setSessionRoomLoading(false);
      return;
    }

    const shuffledCards = [...deck.cards];
    for (let i = shuffledCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
    }

    const newRoom: GroupRecallRoom = {
      id: roomId,
      deckId: deck.id,
      deckTitle: deck.title,
      cards: shuffledCards.slice(0, 20),
      hostEmail: profile.email,
      hostName: myName,
      status: 'lobby',
      timerDuration: selectedTimerDuration,
      currentCardIndex: 0,
      participants: initialParticipants,
      chatMessages: [
        {
          id: `sys-${Date.now()}`,
          senderName: "BoardPass System",
          senderEmail: "admin@boardpassph.com",
          text: `Welcome to Active Recall Arena. ${forceSolo ? "Single-play Solo mode with artificial peers activated!" : "Share room code with your classmates to study cooperatively!"}`,
          timestamp: new Date().toLocaleTimeString()
        }
      ],
      createdAt: new Date().toISOString(),
      lastActiveAt: new Date().toISOString()
    };

    try {
      if (forceSolo) {
         setActiveSessionRoom(newRoom);
         setActiveSubTab('live-recall');
      } else {
         await firestoreWithTimeout(setDoc(doc(db, 'liveRecallSessions', roomId), newRoom));
         // Subscribe real-time
         subscribeToLiveRecallSession(roomId);
      }
    } catch (err) {
      console.error("Failed to host Active Recall room:", err);
      alert("Error initiating multiplayer lobby. Try again as peer.");
    } finally {
      setSessionRoomLoading(false);
    }
  };

  const handleCreateRoomFromForm = () => {
    if (!selectedDeckIdForNewRoom) {
      alert("Please select a study deck to host!");
      return;
    }
    const deck = myCustomDecks.find(d => d.id === selectedDeckIdForNewRoom) || publicDecks.find(d => d.id === selectedDeckIdForNewRoom);
    if (!deck) {
      alert("Selected deck could not be found.");
      return;
    }
    if (!deck.cards || deck.cards.length === 0) {
      alert("Cannot host session: This deck contains no flashcards.");
      return;
    }
    handleLaunchLiveGroupRecall(deck, roomLobbyMode === 'solo');
  };

  const handleJoinLiveSessionByInput = async () => {
    const rawCode = joinRoomIdInput.trim();
    if (!rawCode) {
      alert("Please enter a valid lobby code");
      return;
    }
    setSessionRoomLoading(true);
    
    // Normalize room code: if it's 6 digits, add the 'room-' prefix
    let code = rawCode.toLowerCase();
    if (/^\d{6}$/.test(code)) {
      code = `room-${code}`;
    }

    try {
      const docRef = doc(db, 'liveRecallSessions', code);
      const docSnap = await firestoreWithTimeout(getDoc(docRef));

      if (!docSnap.exists()) {
        alert("Active Recall lobby not found. Double check your code (e.g. room-123456).");
        setSessionRoomLoading(false);
        return;
      }

      const roomData = docSnap.data() as GroupRecallRoom;
      const myName = profile.username || profile.email.split('@')[0];
      const memberKey = profile.email.replace(/\./g, '_');

      // Update participants list
      const updatedParticipants = { ...roomData.participants };
      updatedParticipants[memberKey] = {
        email: profile.email,
        name: myName,
        score: roomData.participants[memberKey]?.score || 0,
        lastAnswerText: '',
        submittedAnswer: false,
        selfRating: null
      };

      await firestoreWithTimeout(updateDoc(docRef, {
        participants: updatedParticipants,
        chatMessages: arrayUnion({
          id: `msg-${Date.now()}`,
          senderName: "Lobby Bot",
          senderEmail: "admin@boardpassph.com",
          text: `${myName} stepped into the Active Recall room!`,
          timestamp: new Date().toLocaleTimeString()
        })
      }));

      subscribeToLiveRecallSession(code);
    } catch (err) {
      console.error("Room joining failed:", err);
      alert("Could not access lobby.");
    } finally {
      setSessionRoomLoading(false);
    }
  };

  // Solo mode reactivity: simulate onSnapshot auto-reveal behavior when activeSessionRoom updates
  useEffect(() => {
    if (isSoloMode && activeSessionRoom) {
      const keys = Object.keys(activeSessionRoom.participants);
      if (keys.length > 0) {
        const allSubmitted = keys.every(k => activeSessionRoom.participants[k].submittedAnswer);
        setPlayersDoneSubmitting(allSubmitted || activeSessionRoom.status === 'reveal' || activeSessionRoom.status === 'finished');

        if (allSubmitted && activeSessionRoom.status === 'active' && activeSessionRoom.hostEmail === profile.email) {
          handleHostRevealAnswerBackFromSnapshot(activeSessionRoom.id);
        }
      } else {
        setPlayersDoneSubmitting(false);
      }
    }
  }, [activeSessionRoom, isSoloMode, profile.email]);

  const subscribeToLiveRecallSession = (roomId: string) => {
    if (roomUnsubscribeRef.current) {
      roomUnsubscribeRef.current();
    }
    roomUnsubscribeRef.current = onSnapshot(doc(db, 'liveRecallSessions', roomId), (docSnapshot) => {
      if (docSnapshot.exists()) {
        const room = docSnapshot.data() as GroupRecallRoom;
        setActiveSessionRoom(room);
        setActiveSubTab('live-recall');

        // Check if all active submitted answer
        const keys = Object.keys(room.participants);
        if (keys.length > 0) {
          const allSubmitted = keys.every(k => room.participants[k].submittedAnswer);
          // Unblock proceed if all submitted OR if we are already in reveal/finished state
          setPlayersDoneSubmitting(allSubmitted || room.status === 'reveal' || room.status === 'finished');

          // AUTO-REVEAL Logic: If everyone is done and I'm the host, automatically reveal
          if (allSubmitted && room.status === 'active' && room.hostEmail === profile.email) {
            handleHostRevealAnswerBackFromSnapshot(room.id);
          }
        } else {
          setPlayersDoneSubmitting(false);
        }
      }
    });
  };

  // Helper for auto-reveal from snapshot to avoid stale state issues
  const handleHostRevealAnswerBackFromSnapshot = async (roomId: string) => {
    try {
      const docRef = doc(db, 'liveRecallSessions', roomId);
      await updateDoc(docRef, {
        status: 'reveal',
        chatMessages: arrayUnion({
          id: `msg-auto-${Date.now()}`,
          senderName: "Host Bot",
          senderEmail: "admin@boardpassph.com",
          text: "All candidates have submitted their choices. Board Exam Correct Answer revealed!",
          timestamp: new Date().toLocaleTimeString()
        })
      });
    } catch (err) {
      console.warn("Auto reveal failed:", err);
    }
  };

  // Solo mode automation loops (AI review companions)
  useEffect(() => {
    if (!activeSessionRoom || activeSessionRoom.status !== 'active' || !isSoloMode) return;

    // Simulate AI typing response
    const myKey = profile.email.replace(/\./g, '_');
    const peers = Object.keys(activeSessionRoom.participants).filter(k => k.startsWith('peer_'));
    const timerIds: ReturnType<typeof setTimeout>[] = [];

    peers.forEach((peerKey, i) => {
      const isAlreadySubmitted = activeSessionRoom.participants[peerKey].submittedAnswer;
      if (isAlreadySubmitted) return;

      const timerIdx = setTimeout(async () => {
        // Prepare mock answers based on current card
        const currentCard = activeSessionRoom.cards[activeSessionRoom.currentCardIndex];
        let randomAns = '';
        
        if (currentCard.options && currentCard.options.length > 0) {
          // Weighted choice: peer often gets it right, sometimes wrong
          const getCorrect = Math.random() > 0.3;
          if (getCorrect && currentCard.correctOption) {
            randomAns = currentCard.correctOption;
          } else {
            randomAns = currentCard.options[Math.floor(Math.random() * currentCard.options.length)];
          }
        } else {
          const answersOptions = [
            `I think it's: ${currentCard.back.substring(0, 50)}...`,
            `Ah, is that the one that requires ${currentCard.hint || "active phase validation"}?`,
            `I recall this! Let's write down: ${currentCard.back.split('.')[0] || "6 months criteria"}`
          ];
          randomAns = answersOptions[Math.floor(Math.random() * answersOptions.length)];
        }

        try {
          const docRef = doc(db, 'liveRecallSessions', activeSessionRoom.id);
          const freshSnap = await getDoc(docRef);
          if (freshSnap.exists()) {
            const currentRoom = freshSnap.data() as GroupRecallRoom;
            const updatedParticipants = { ...currentRoom.participants };
            if (updatedParticipants[peerKey]) {
              updatedParticipants[peerKey].lastAnswerText = randomAns;
              updatedParticipants[peerKey].submittedAnswer = true;
            }

            await updateDoc(docRef, { participants: updatedParticipants });
          }
        } catch (err) {
          console.warn("AI Peer typing sync skipped", err);
        }
      }, VIRTUAL_PEERS[i].speed);

      timerIds.push(timerIdx);
    });

    return () => timerIds.forEach(clearTimeout);
  }, [activeSessionRoom?.status, activeSessionRoom?.currentCardIndex, isSoloMode, activeSessionRoom?.id]);

  // AI peers self-assessing when reveal is triggered
  useEffect(() => {
    if (!activeSessionRoom || activeSessionRoom.status !== 'reveal' || !isSoloMode) return;

    const peers = Object.keys(activeSessionRoom.participants).filter(k => k.startsWith('peer_'));
    const timerIds: ReturnType<typeof setTimeout>[] = [];
    peers.forEach((peerKey, i) => {
      const peerRating = activeSessionRoom.participants[peerKey].selfRating;
      if (peerRating) return; // Already rated

      const timerIdx = setTimeout(async () => {
        const ratingsArray: ('perfect' | 'vague' | 'forgot')[] = ['perfect', 'vague', 'perfect', 'forgot'];
        const chosenRating = ratingsArray[Math.floor(Math.random() * ratingsArray.length)];
        const scoreGain = chosenRating === 'perfect' ? 10 : chosenRating === 'vague' ? 5 : 0;

        try {
          const docRef = doc(db, 'liveRecallSessions', activeSessionRoom.id);
          const freshSnap = await getDoc(docRef);
          if (freshSnap.exists()) {
            const currentRoom = freshSnap.data() as GroupRecallRoom;
            const updatedParticipants = { ...currentRoom.participants };
            if (updatedParticipants[peerKey]) {
              updatedParticipants[peerKey].selfRating = chosenRating;
              updatedParticipants[peerKey].score = (updatedParticipants[peerKey].score || 0) + scoreGain;
              updatedParticipants[peerKey].submittedAnswer = false; // reset for next round
            }

            // AI peer also optionally sends a chat message
            const funnyComments = {
              perfect: ["Wow! I completely remembered this criteria correctly!", "Guessed it perfect. 10 points!", "Awesome mnemonic, study bot works!"],
              vague: ["Ah, I missed some particulars. Halfsies count!", "Close enough, I'll take a partial 5.", "Memory was hazy, but diagnostic was correct."],
              forgot: ["Darn, Schizophrenia timelines got me again.", "Zero XP this rounds, let me write down the hint.", "Oh, totally blanked. Back to clinical encyclopedia..."]
            };
            const commentsList = funnyComments[chosenRating];
            const peerInfo = VIRTUAL_PEERS[i];

            const updatedChats = [...currentRoom.chatMessages, {
              id: `ai-msg-${Date.now()}-${peerKey}`,
              senderName: `${peerInfo.avatar} ${peerInfo.name}`,
              senderEmail: `${peerInfo.name}@sim.edu`,
              text: commentsList[Math.floor(Math.random() * commentsList.length)],
              timestamp: new Date().toLocaleTimeString()
            }];

            await updateDoc(docRef, {
              participants: updatedParticipants,
              chatMessages: updatedChats
            });
          }
        } catch (err) {
          console.warn("AI Peer auto rating sync skipped", err);
        }
      }, 3000 + i * 1500);

      timerIds.push(timerIdx);
    });

    return () => timerIds.forEach(clearTimeout);
  }, [activeSessionRoom?.status, isSoloMode, activeSessionRoom?.id]);

  // Solo mode AI virtual peers voice channel activity simulation
  useEffect(() => {
    if (!activeSessionRoom || !isSoloMode) return;

    // Simulate AI peers joining the voice lounge after 3 seconds
    const timer = setTimeout(async () => {
      try {
        const docRef = doc(db, 'liveRecallSessions', activeSessionRoom.id);
        const freshSnap = await getDoc(docRef);
        if (freshSnap.exists()) {
          const currentRoom = freshSnap.data() as GroupRecallRoom;
          const updatedParticipants = { ...currentRoom.participants };
          const peers = Object.keys(updatedParticipants).filter(k => k.startsWith('peer_'));
          
          peers.forEach((peerKey, idx) => {
            if (!updatedParticipants[peerKey].voiceConnected) {
              updatedParticipants[peerKey].voiceConnected = true;
              updatedParticipants[peerKey].isMuted = idx === 2; // Ethics Bot is muted by default
              updatedParticipants[peerKey].isSpeaking = false;
            }
          });

          await updateDoc(docRef, { participants: updatedParticipants });
        }
      } catch (err) {
        console.warn("AI Peer voice connection simulation failed:", err);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [activeSessionRoom?.id, isSoloMode]);

  // Synchronized countdown timer logic
  useEffect(() => {
    if (!activeSessionRoom || !activeSessionRoom.timerExpiresAt || activeSessionRoom.status !== 'active') {
      setSecondsLeft(null);
      return;
    }

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const expires = new Date(activeSessionRoom.timerExpiresAt!).getTime();
      const diff = Math.max(0, Math.floor((expires - now) / 1000));
      
      setSecondsLeft(diff);

      // If I'm the host and timer hits 0, auto-reveal
      if (diff === 0 && activeSessionRoom.hostEmail === profile.email) {
        hostRevealRef.current?.();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [activeSessionRoom?.timerExpiresAt, activeSessionRoom?.status, activeSessionRoom?.hostEmail, profile.email]);

  // Simulate AI peers "Speaking" briefly when they submit an answer or comment
  useEffect(() => {
    if (!activeSessionRoom || !isSoloMode) return;

    const peers = Object.keys(activeSessionRoom.participants).filter(k => k.startsWith('peer_'));
    const timerIds: ReturnType<typeof setTimeout>[] = [];
    
    peers.forEach((peerKey) => {
      const isDone = activeSessionRoom.participants[peerKey]?.submittedAnswer;
      if (!isDone) return;

      // Trigger temporary speaking status animation for 2 seconds
      const speakingTimer = setTimeout(async () => {
        try {
          const docRef = doc(db, 'liveRecallSessions', activeSessionRoom.id);
          const freshSnap = await getDoc(docRef);
          if (freshSnap.exists()) {
            const currentRoom = freshSnap.data() as GroupRecallRoom;
            const updatedParticipants = { ...currentRoom.participants };
            if (updatedParticipants[peerKey] && updatedParticipants[peerKey].voiceConnected && !updatedParticipants[peerKey].isMuted) {
              updatedParticipants[peerKey].isSpeaking = true;
              await updateDoc(docRef, { participants: updatedParticipants });

              // Mute/stop speaking after 1.8s
              setTimeout(async () => {
                const innerSnap = await getDoc(docRef);
                if (innerSnap.exists()) {
                  const innerRoom = innerSnap.data() as GroupRecallRoom;
                  const innerParts = { ...innerRoom.participants };
                  if (innerParts[peerKey]) {
                    innerParts[peerKey].isSpeaking = false;
                    await updateDoc(docRef, { participants: innerParts });
                  }
                }
              }, 1800);
            }
          }
        } catch (e) {}
      }, Math.random() * 2000);

      timerIds.push(speakingTimer);
    });

    return () => timerIds.forEach(clearTimeout);
  }, [activeSessionRoom?.currentCardIndex, isSoloMode]);

  const handleStartGroupSessionActive = async () => {
    if (!activeSessionRoom) return;

    const expiresAt = new Date();
    expiresAt.setSeconds(expiresAt.getSeconds() + (activeSessionRoom.timerDuration || 60));

    try {
      const docRef = doc(db, 'liveRecallSessions', activeSessionRoom.id);
      await updateDoc(docRef, {
        status: 'active',
        timerExpiresAt: expiresAt.toISOString(),
        chatMessages: arrayUnion({
          id: `msg-${Date.now()}`,
          senderName: "Host Bot",
          senderEmail: "admin@boardpassph.com",
          text: "Host fired up the session clock! Card 1 is active. Submit answers below!",
          timestamp: new Date().toLocaleTimeString()
        })
      });
    } catch (err) {
      console.warn("Lobby active state transition failure:", err);
    }
  };

  const handleSubmitMyWrittenRecallAnswer = async (directAnswer?: string) => {
    if (!activeSessionRoom) return;
    const finalAnswer = directAnswer || myWrittenAnswer.trim();
    
    if (!finalAnswer) {
      alert("Please type a recall statement or select an option first!");
      return;
    }

    const memberKey = profile.email.replace(/\./g, '_');
    const updatedParticipants = { ...activeSessionRoom.participants };
    
    // Automatic Grading Logic
    const currentCard = activeSessionRoom.cards[activeSessionRoom.currentCardIndex];
    const isCorrect = finalAnswer === currentCard.correctOption;
    
    let rating: 'perfect' | 'vague' | 'forgot' = 'forgot';
    let scoreGain = 0;

    if (isCorrect) {
      if (secondsLeft !== null) {
        const duration = activeSessionRoom.timerDuration || 60;
        if (secondsLeft >= duration * 0.5) {
          rating = 'perfect'; // Blitz
          scoreGain = 10;
        } else if (secondsLeft >= duration * 0.15) {
          rating = 'vague'; // Rapid
          scoreGain = 7;
        } else {
          rating = 'forgot'; // Standard
          scoreGain = 5;
        }
      } else {
        rating = 'vague';
        scoreGain = 5;
      }
    }

    if (updatedParticipants[memberKey]) {
      updatedParticipants[memberKey].lastAnswerText = finalAnswer;
      updatedParticipants[memberKey].submittedAnswer = true;
      updatedParticipants[memberKey].selfRating = isCorrect ? rating : 'forgot';
      updatedParticipants[memberKey].score = (updatedParticipants[memberKey].score || 0) + scoreGain;
      // Session Hot Streak Logic
      if (isCorrect) {
        updatedParticipants[memberKey].streak = (updatedParticipants[memberKey].streak || 0) + 1;
      } else {
        updatedParticipants[memberKey].streak = 0;
      }
    }

    // Grant XP immediately
    if (scoreGain > 0) {
      setProfile(prev => prev ? ({ ...prev, totalXp: prev.totalXp + scoreGain }) : prev);
    }

    try {
      const docRef = doc(db, 'liveRecallSessions', activeSessionRoom.id);
      await updateDoc(docRef, { participants: updatedParticipants });
    } catch (err) {
      console.warn("Failed syncing response", err);
    }
  };

  const handleUpdateCurrentCardIndex = async (newIdx: number) => {
    if (!activeSessionRoom) return;
    if (newIdx < 0 || newIdx >= activeSessionRoom.cards.length) return;

    try {
      const docRef = doc(db, 'liveRecallSessions', activeSessionRoom.id);
      const freshSnap = await getDoc(docRef);
      if (freshSnap.exists()) {
        const currentRoom = freshSnap.data() as GroupRecallRoom;
        
        const updatedParticipants = { ...currentRoom.participants };
        Object.keys(updatedParticipants).forEach(key => {
          updatedParticipants[key] = {
            ...updatedParticipants[key],
            submittedAnswer: false,
            lastAnswerText: '',
            selfRating: null
          };
        });

        const expiresAt = new Date();
        expiresAt.setSeconds(expiresAt.getSeconds() + (activeSessionRoom.timerDuration || 60));

        await updateDoc(docRef, { 
          currentCardIndex: newIdx,
          timerExpiresAt: expiresAt.toISOString(),
          status: 'active',
          participants: updatedParticipants
        });
        setMyWrittenAnswer('');
      }
    } catch (err) {
      console.warn("Index update failure:", err);
    }
  };

  const handleHostRevealAnswerBack = async () => {
    if (!activeSessionRoom) return;

    try {
      const docRef = doc(db, 'liveRecallSessions', activeSessionRoom.id);
      await updateDoc(docRef, {
        status: 'reveal',
        chatMessages: arrayUnion({
          id: `msg-${Date.now()}`,
          senderName: "Host Bot",
          senderEmail: "admin@boardpassph.com",
          text: "High-yield card answer revealed! Grade yourselves below based on memory consistency.",
          timestamp: new Date().toLocaleTimeString()
        })
      });
    } catch (err) {
      console.warn("Answer reveal failed:", err);
    }
  };
  // Keep ref in sync so the timer useEffect never has a stale closure
  hostRevealRef.current = handleHostRevealAnswerBack;

  const handleHostProceedToNextRecallQuiz = async () => {
    if (!activeSessionRoom) return;

    const nextIdx = activeSessionRoom.currentCardIndex + 1;
    const isFinished = nextIdx >= activeSessionRoom.cards.length;

    try {
      const docRef = doc(db, 'liveRecallSessions', activeSessionRoom.id);
      const freshSnap = await getDoc(docRef);
      if (freshSnap.exists()) {
        const currentRoom = freshSnap.data() as GroupRecallRoom;
        
        // Reset sub flags for all participants for the next card
        const updatedParticipants = { ...currentRoom.participants };
        Object.keys(updatedParticipants).forEach(key => {
          updatedParticipants[key] = {
            ...updatedParticipants[key],
            submittedAnswer: false,
            lastAnswerText: '',
            selfRating: null
          };
        });

        const expiresAt = new Date();
        expiresAt.setSeconds(expiresAt.getSeconds() + (activeSessionRoom.timerDuration || 60));

        await updateDoc(docRef, {
          status: isFinished ? 'finished' : 'active',
          currentCardIndex: isFinished ? activeSessionRoom.currentCardIndex : nextIdx,
          timerExpiresAt: isFinished ? null : expiresAt.toISOString(),
          participants: updatedParticipants
        });

        setMyWrittenAnswer('');
      }
    } catch (err) {
      console.warn("State update failure:", err);
    }
  };

  const handleSendReaction = async (emoji: string) => {
    if (!activeSessionRoom) return;
    const myName = profile.username || profile.email.split('@')[0];
    try {
      const roomRef = doc(db, 'liveRecallSessions', activeSessionRoom.id);
      await updateDoc(roomRef, {
        chatMessages: arrayUnion({
          id: `react-${Date.now()}-${Math.random()}`,
          senderName: myName,
          senderEmail: profile.email,
          text: `${emoji}`,
          timestamp: new Date().toLocaleTimeString()
        })
      });
    } catch (e) {}
  };

  const handleSendRoomChatMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeSessionRoom || !activeRoomMessageInput.trim()) return;

    const myName = profile.username || profile.email.split('@')[0];
    const newMessage = {
      id: `msg-${Date.now()}`,
      senderName: myName,
      senderEmail: profile.email,
      text: activeRoomMessageInput.trim(),
      timestamp: new Date().toLocaleTimeString()
    };

    try {
      await updateDoc(doc(db, 'liveRecallSessions', activeSessionRoom.id), {
        chatMessages: arrayUnion(newMessage)
      });
      setActiveRoomMessageInput('');
    } catch (err) {
      console.warn("Chat transmission error:", err);
    }
  };

  // ── WebRTC helpers ─────────────────────────────────────────────────────────

  const STUN_CONFIG: RTCConfiguration = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun1.l.google.com:19302' },
    ],
  };

  /** Tear down a single peer connection and its Firestore signaling listener */
  const closePeer = (emailKey: string) => {
    if (signalingUnsubsRef.current[emailKey]) {
      signalingUnsubsRef.current[emailKey]();
      delete signalingUnsubsRef.current[emailKey];
    }
    if (peerConnectionsRef.current[emailKey]) {
      peerConnectionsRef.current[emailKey].close();
      delete peerConnectionsRef.current[emailKey];
    }
    if (remoteAudioElementsRef.current[emailKey]) {
      remoteAudioElementsRef.current[emailKey].srcObject = null;
      delete remoteAudioElementsRef.current[emailKey];
    }
    offeredPeersRef.current.delete(emailKey);
  };

  /** Tear down every active peer connection */
  const closeAllPeers = () => {
    Object.keys(peerConnectionsRef.current).forEach(closePeer);
  };

  /**
   * Create (or return existing) RTCPeerConnection for a remote peer.
   * localStream must already be set in micStreamRef.current.
   */
  const getOrCreatePeerConnection = (
    remoteEmailKey: string,
    roomId: string,
    myEmailKey: string,
  ): RTCPeerConnection => {
    if (peerConnectionsRef.current[remoteEmailKey]) {
      return peerConnectionsRef.current[remoteEmailKey];
    }

    const pc = new RTCPeerConnection(STUN_CONFIG);
    peerConnectionsRef.current[remoteEmailKey] = pc;

    // Add local audio tracks
    if (micStreamRef.current) {
      micStreamRef.current.getAudioTracks().forEach(track => {
        pc.addTrack(track, micStreamRef.current!);
      });
    }

    // When we get a remote audio track, attach it to an Audio element
    pc.ontrack = (event) => {
      const stream = event.streams[0];
      if (!remoteAudioElementsRef.current[remoteEmailKey]) {
        const audio = new Audio();
        audio.autoplay = true;
        audio.volume = 1.0;
        remoteAudioElementsRef.current[remoteEmailKey] = audio;
      }
      remoteAudioElementsRef.current[remoteEmailKey].srcObject = stream;
      remoteAudioElementsRef.current[remoteEmailKey].play().catch(() => {});
    };

    // Trickle ICE: write candidates to Firestore so the remote peer can consume them
    pc.onicecandidate = async (event) => {
      if (!event.candidate) return;
      try {
        const candRef = doc(
          collection(db, 'liveRecallSessions', roomId, 'signaling',
            `${myEmailKey}__to__${remoteEmailKey}`, 'candidates')
        );
        await setDoc(candRef, { candidate: event.candidate.toJSON(), ts: Date.now() });
      } catch (e) {
        console.warn('ICE candidate write failed:', e);
      }
    };

    pc.onconnectionstatechange = () => {
      if (['failed', 'closed', 'disconnected'].includes(pc.connectionState)) {
        closePeer(remoteEmailKey);
      }
    };

    return pc;
  };

  /**
   * Listen for an offer/answer/ICE from a specific remote peer toward us.
   * path: signaling/{remoteEmailKey}__to__{myEmailKey}
   */
  const listenForSignalingFromPeer = (
    remoteEmailKey: string,
    roomId: string,
    myEmailKey: string,
  ) => {
    if (signalingUnsubsRef.current[remoteEmailKey]) return; // already listening

    const sigDocPath = `liveRecallSessions/${roomId}/signaling/${remoteEmailKey}__to__${myEmailKey}`;
    const sigDocRef = doc(db, sigDocPath);

    const unsub = onSnapshot(sigDocRef, async (snap) => {
      if (!snap.exists()) return;
      const data = snap.data();

      const pc = getOrCreatePeerConnection(remoteEmailKey, roomId, myEmailKey);

      // Handle offer
      if (data.offer && pc.signalingState === 'stable' && !offeredPeersRef.current.has(`answer_sent_to_${remoteEmailKey}`)) {
        try {
          await pc.setRemoteDescription(new RTCSessionDescription(data.offer));
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
          offeredPeersRef.current.add(`answer_sent_to_${remoteEmailKey}`);

          // Write our answer to the reverse path
          await setDoc(
            doc(db, `liveRecallSessions/${roomId}/signaling/${myEmailKey}__to__${remoteEmailKey}`),
            { answer: { type: answer.type, sdp: answer.sdp }, ts: Date.now() },
            { merge: true }
          );
        } catch (e) {
          console.warn('Answer creation failed:', e);
        }
      }

      // Handle answer to our offer
      if (data.answer && pc.signalingState === 'have-local-offer') {
        try {
          await pc.setRemoteDescription(new RTCSessionDescription(data.answer));
        } catch (e) {
          console.warn('setRemoteDescription(answer) failed:', e);
        }
      }
    });

    signalingUnsubsRef.current[remoteEmailKey] = unsub;

    // Also listen for incoming ICE candidates from this peer
    const candColRef = collection(db, `liveRecallSessions/${roomId}/signaling/${remoteEmailKey}__to__${myEmailKey}/candidates`);
    const candUnsub = onSnapshot(candColRef, async (colSnap) => {
      const pc = peerConnectionsRef.current[remoteEmailKey];
      if (!pc) return;
      for (const change of colSnap.docChanges()) {
        if (change.type === 'added') {
          try {
            await pc.addIceCandidate(new RTCIceCandidate(change.doc.data().candidate));
          } catch (e) {
            console.warn('addIceCandidate failed:', e);
          }
        }
      }
    });

    // Combine both unsubscribers
    const prevUnsub = signalingUnsubsRef.current[remoteEmailKey];
    signalingUnsubsRef.current[remoteEmailKey] = () => {
      prevUnsub?.();
      candUnsub();
    };
  };

  /**
   * Initiate an offer to a remote peer (caller side).
   * Only called when myEmailKey < remoteEmailKey (lexicographic) to avoid double-offers.
   */
  const initiateOfferToPeer = async (
    remoteEmailKey: string,
    roomId: string,
    myEmailKey: string,
  ) => {
    if (offeredPeersRef.current.has(remoteEmailKey)) return;
    offeredPeersRef.current.add(remoteEmailKey);

    const pc = getOrCreatePeerConnection(remoteEmailKey, roomId, myEmailKey);

    try {
      const offer = await pc.createOffer({ offerToReceiveAudio: true });
      await pc.setLocalDescription(offer);

      await setDoc(
        doc(db, `liveRecallSessions/${roomId}/signaling/${myEmailKey}__to__${remoteEmailKey}`),
        { offer: { type: offer.type, sdp: offer.sdp }, ts: Date.now() },
        { merge: true }
      );

      // Listen for the answer on the reverse path
      listenForSignalingFromPeer(remoteEmailKey, roomId, myEmailKey);
    } catch (e) {
      console.warn('Offer creation failed:', e);
      offeredPeersRef.current.delete(remoteEmailKey);
    }
  };

  /**
   * Connect to all other voice-lounge participants in the room.
   * Uses a deterministic offer/answer split: lower emailKey sends the offer.
   */
  const connectToAllVoicePeers = (room: GroupRecallRoom, myEmailKey: string) => {
    const otherKeys = Object.keys(room.participants).filter(
      k => k !== myEmailKey && room.participants[k].voiceConnected && !k.startsWith('peer_')
    );

    otherKeys.forEach(remoteKey => {
      if (myEmailKey < remoteKey) {
        // I am the "caller" – send offer
        initiateOfferToPeer(remoteKey, room.id, myEmailKey);
      } else {
        // I am the "callee" – just listen for an offer
        listenForSignalingFromPeer(remoteKey, room.id, myEmailKey);
      }
    });
  };

  // ── End WebRTC helpers ─────────────────────────────────────────────────────

  const cleanupVoiceLoungeAndRecording = () => {
    // Tear down all WebRTC peer connections first
    closeAllPeers();

    // Stop recording if active
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      try { mediaRecorderRef.current.stop(); } catch (e) {}
    }
    if (voiceTimerRef.current) {
      clearInterval(voiceTimerRef.current);
      voiceTimerRef.current = null;
    }
    setIsRecordingVoice(false);
    isRecordingVoiceRef.current = false;
    setRecordingSeconds(0);

    // Release mic stream tracks
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach(track => {
        try { track.stop(); } catch (e) {}
      });
      micStreamRef.current = null;
    }

    // Cancel animation frame
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }

    // Close AudioContext
    if (audioContextRef.current) {
      try {
        if (audioContextRef.current.state !== 'closed') {
          audioContextRef.current.close();
        }
      } catch (e) {}
      audioContextRef.current = null;
    }

    analyserRef.current = null;
    setVoiceLoungeConnected(false);
    voiceLoungeConnectedRef.current = false;
    setIsVoiceMuted(false);
    isVoiceMutedRef.current = false;
    setLocalVoiceVolume(0);
  };

  useEffect(() => {
    return () => {
      cleanupVoiceLoungeAndRecording();
    };
  }, []);

  const syncVoiceStatusToFirestore = async (connected: boolean, muted: boolean, speaking: boolean) => {
    if (!activeSessionRoom) return;
    try {
      const roomRef = doc(db, 'liveRecallSessions', activeSessionRoom.id);
      const freshSnap = await getDoc(roomRef);
      if (freshSnap.exists()) {
        const currentRoom = freshSnap.data() as GroupRecallRoom;
        const memberKey = profile.email.replace(/\./g, '_');
        const updatedParticipants = { ...currentRoom.participants };
        if (updatedParticipants[memberKey]) {
          updatedParticipants[memberKey].voiceConnected = connected;
          updatedParticipants[memberKey].isMuted = muted;
          updatedParticipants[memberKey].isSpeaking = speaking;

          await updateDoc(roomRef, { participants: updatedParticipants });
        }
      }
    } catch (err) {
      console.warn("Could not sync voice status to Firestore:", err);
    }
  };

  const handleConnectVoiceLounge = async () => {
    if (!activeSessionRoom) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = stream;
      setVoiceLoungeConnected(true);
      voiceLoungeConnectedRef.current = true;
      setIsVoiceMuted(false);
      isVoiceMutedRef.current = false;

      // Set up analyser for volume visualisation (unchanged)
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        const ctx = new AudioContextClass();
        audioContextRef.current = ctx;
        const source = ctx.createMediaStreamSource(stream);
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 256;
        source.connect(analyser);
        analyserRef.current = analyser;

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        let lastSpeakingVal = false;
        let lastSyncTime = 0;

        const updateVolume = () => {
          if (!analyserRef.current || !micStreamRef.current) return;
          analyserRef.current.getByteFrequencyData(dataArray);
          let total = 0;
          for (let i = 0; i < bufferLength; i++) total += dataArray[i];
          const average = total / bufferLength;
          const volumeScaled = Math.min(100, Math.round((average / 255) * 200));
          setLocalVoiceVolume(volumeScaled);

          const isSpeaking = volumeScaled > 8;
          const now = Date.now();
          if (isSpeaking !== lastSpeakingVal && now - lastSyncTime > 400) {
            lastSpeakingVal = isSpeaking;
            lastSyncTime = now;
            syncVoiceStatusToFirestore(true, isVoiceMutedRef.current, isSpeaking);
          }
          rafIdRef.current = requestAnimationFrame(updateVolume);
        };
        rafIdRef.current = requestAnimationFrame(updateVolume);
      }

      // Mark ourselves as voice-connected in Firestore
      await syncVoiceStatusToFirestore(true, false, false);

      // ── WebRTC: connect to every peer already in the lounge ───────────────
      const myEmailKey = profile.email.replace(/\./g, '_');
      connectToAllVoicePeers(activeSessionRoom, myEmailKey);
      // ──────────────────────────────────────────────────────────────────────

      const myName = profile.username || profile.email.split('@')[0];
      await updateDoc(doc(db, 'liveRecallSessions', activeSessionRoom.id), {
        chatMessages: arrayUnion({
          id: `msg-${Date.now()}`,
          senderName: "Lobby Bot",
          senderEmail: "admin@boardpassph.com",
          text: `🎙️ ${myName} joined the live voice lounge!`,
          timestamp: new Date().toLocaleTimeString()
        })
      });
    } catch (err) {
      console.error("Microphone activation failed:", err);
      alert("🎙️ Microphone Access Required: Please allow microphone permissions to connect to the BP Voice Lounge.");
    }
  };

  const handleDisconnectVoiceLounge = async () => {
    if (!activeSessionRoom) return;
    const myName = profile.username || profile.email.split('@')[0];
    const myEmailKey = profile.email.replace(/\./g, '_');

    // ── Close all WebRTC peer connections ─────────────────────────────────
    closeAllPeers();

    // Delete our outgoing signaling docs from Firestore so peers know we left
    try {
      const sigColRef = collection(db, 'liveRecallSessions', activeSessionRoom.id, 'signaling');
      const sigSnap = await firestoreWithTimeout(getDocs(sigColRef));
      const batch = writeBatch(db);
      sigSnap.docs.forEach((d: any) => {
        if (d.id.startsWith(`${myEmailKey}__to__`)) batch.delete(d.ref);
      });
      await batch.commit();
    } catch (e) {
      console.warn('Signaling cleanup failed:', e);
    }
    // ──────────────────────────────────────────────────────────────────────

    // Cleanup local state and stream
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach(track => track.stop());
      micStreamRef.current = null;
    }
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
    if (audioContextRef.current) {
      try { audioContextRef.current.close(); } catch (e) {}
      audioContextRef.current = null;
    }
    analyserRef.current = null;
    setVoiceLoungeConnected(false);
    voiceLoungeConnectedRef.current = false;
    setIsVoiceMuted(false);
    isVoiceMutedRef.current = false;
    setLocalVoiceVolume(0);

    // Update Firestore presence
    await syncVoiceStatusToFirestore(false, false, false);

    try {
      await updateDoc(doc(db, 'liveRecallSessions', activeSessionRoom.id), {
        chatMessages: arrayUnion({
          id: `msg-${Date.now()}`,
          senderName: "Lobby Bot",
          senderEmail: "admin@boardpassph.com",
          text: `🔇 ${myName} left the voice lounge.`,
          timestamp: new Date().toLocaleTimeString()
        })
      });
    } catch (e) {}
  };

  const handleToggleMuteVoiceLounge = async () => {
    const nextMuted = !isVoiceMuted;
    setIsVoiceMuted(nextMuted);
    isVoiceMutedRef.current = nextMuted;

    if (micStreamRef.current) {
      micStreamRef.current.getAudioTracks().forEach(track => {
        track.enabled = !nextMuted;
      });
    }

    if (nextMuted) {
      setLocalVoiceVolume(0);
    }

    await syncVoiceStatusToFirestore(true, nextMuted, false);
  };

  const handleStartVoiceRecording = async () => {
    try {
      audioChunksRef.current = [];
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        
        // Convert to base64 Url
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const base64Url = reader.result as string;
          if (!activeSessionRoom) return;

          const myName = profile.username || profile.email.split('@')[0];
          const recDuration = recordingSecondsRef.current || 1;

          const voiceMessage = {
            id: `msg-${Date.now()}`,
            senderName: myName,
            senderEmail: profile.email,
            text: `🎙️ Sent a board-review voice note (${recDuration} secs)`,
            audioUrl: base64Url,
            duration: recDuration,
            timestamp: new Date().toLocaleTimeString()
          };

          try {
            await updateDoc(doc(db, 'liveRecallSessions', activeSessionRoom.id), {
              chatMessages: arrayUnion(voiceMessage)
            });
          } catch (err) {
            console.error("Transmitting voice message failed:", err);
          }
          
          setRecordingSeconds(0);
        };

        // Release the audio track immediately
        stream.getTracks().forEach(track => track.stop());
      };

      setIsRecordingVoice(true);
      isRecordingVoiceRef.current = true;
      setRecordingSeconds(0);
      recordingSecondsRef.current = 0;
      recorder.start();

      // Start tick timer
      voiceTimerRef.current = setInterval(() => {
        recordingSecondsRef.current++;
        setRecordingSeconds(recordingSecondsRef.current);
        if (recordingSecondsRef.current >= 60) { // Limit to 1 min per clip
          handleStopVoiceRecording();
        }
      }, 1000);

    } catch (err) {
      console.error("Failed to start voice recording:", err);
      alert("🎙️ Recording Access Denied: Please allow microphone permission to record voice notes.");
    }
  };

  const handleStopVoiceRecording = () => {
    isAutoRecordingRef.current = false;
    if (voxTimerRef.current) {
      clearTimeout(voxTimerRef.current);
      voxTimerRef.current = null;
    }

    if (voiceTimerRef.current) {
      clearInterval(voiceTimerRef.current);
      voiceTimerRef.current = null;
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    setIsRecordingVoice(false);
    isRecordingVoiceRef.current = false;
  };

  const handleLeaveRecallGame = () => {
    if (window.confirm("Do you want to leave the active recall session? Your current lobby points will be reset.")) {
      cleanupVoiceLoungeAndRecording();
      if (roomUnsubscribeRef.current) {
        roomUnsubscribeRef.current();
        roomUnsubscribeRef.current = null;
      }
      setActiveSessionRoom(null);
      setMyWrittenAnswer('');
      setActiveSubTab('my-decks');
    }
  };

  useEffect(() => {
    return () => {
      if (roomUnsubscribeRef.current) roomUnsubscribeRef.current();
    };
  }, []);

  // Auto-play incoming voice notes if in voice lounge
  // Uses a pending queue to retry playback on next user interaction if browser blocks auto-play
  const pendingAudioQueue = useRef<HTMLAudioElement[]>([]);

  const flushPendingAudio = () => {
    while (pendingAudioQueue.current.length > 0) {
      const a = pendingAudioQueue.current.shift();
      if (a) a.play().catch(() => {});
    }
  };

  useEffect(() => {
    // Flush any queued audio on any user gesture (click/keydown)
    document.addEventListener('click', flushPendingAudio, { once: false });
    document.addEventListener('keydown', flushPendingAudio, { once: false });
    return () => {
      document.removeEventListener('click', flushPendingAudio);
      document.removeEventListener('keydown', flushPendingAudio);
    };
  }, []);

  useEffect(() => {
    if (!voiceLoungeConnected || !activeSessionRoom) return;

    activeSessionRoom.chatMessages.forEach(msg => {
      if (msg.audioUrl && msg.senderEmail !== profile.email && !playedVoiceNoteIds.current.has(msg.id)) {
        playedVoiceNoteIds.current.add(msg.id);

        try {
          const audio = new Audio(msg.audioUrl);
          audio.volume = 1.0;

          // Try auto-play; if browser blocks it, queue for next user interaction
          audio.play().catch(() => {
            pendingAudioQueue.current.push(audio);
          });
        } catch (e) {
          console.error("Audio auto-play failed:", e);
        }
      }
    });
  }, [activeSessionRoom?.chatMessages, voiceLoungeConnected]);

  // ── WebRTC: when a new peer joins the lounge while we are already connected,
  //    initiate / accept a connection to them automatically ───────────────────
  useEffect(() => {
    if (!voiceLoungeConnected || !activeSessionRoom || !micStreamRef.current) return;
    const myEmailKey = profile.email.replace(/\./g, '_');
    const voicePeerKeys = Object.keys(activeSessionRoom.participants).filter(
      k => k !== myEmailKey && activeSessionRoom.participants[k].voiceConnected && !k.startsWith('peer_')
    );
    voicePeerKeys.forEach(remoteKey => {
      if (!peerConnectionsRef.current[remoteKey]) {
        // New peer appeared — connect
        if (myEmailKey < remoteKey) {
          initiateOfferToPeer(remoteKey, activeSessionRoom.id, myEmailKey);
        } else {
          listenForSignalingFromPeer(remoteKey, activeSessionRoom.id, myEmailKey);
        }
      }
    });
    // Tear down connections for peers who left the lounge
    Object.keys(peerConnectionsRef.current).forEach(remoteKey => {
      if (!activeSessionRoom.participants[remoteKey]?.voiceConnected) {
        closePeer(remoteKey);
      }
    });
  }, [activeSessionRoom?.participants, voiceLoungeConnected]);
  // ──────────────────────────────────────────────────────────────────────────

  const filteredPublicDecks = publicDecks.filter(deck => 
    deck.title.toLowerCase().includes(deckSearchQuery.toLowerCase()) || 
    deck.description.toLowerCase().includes(deckSearchQuery.toLowerCase()) ||
    (deck.category && deck.category.toLowerCase().includes(deckSearchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-pine-light/10 pb-5">
        <div>
          <h2 className="font-display text-4xl font-extrabold italic text-pine tracking-tight flex items-center gap-2">
            🧠 Active Recall Arena
            <span className="text-[10px] uppercase tracking-widest font-mono bg-emerald-50 border border-emerald-100 text-[#1e3e29] px-2 py-0.5 rounded-full mt-2 font-bold animate-pulse">
              BP Live!
            </span>
          </h2>
          <p className="text-xs text-gray-500 mt-1.5 max-w-xl leading-relaxed">
            Create custom high-yield syllabus decks, feed note documents to Gemini AI for instant flashcard conversion, share decks with the public directory, or study live cooperatively in standard multiplayer/solo BP sessions.
          </p>
        </div>

        {activeSessionRoom ? (
          <button
            onClick={handleLeaveRecallGame}
            className="px-4 py-2 bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 rounded-xl font-bold text-xs uppercase"
          >
            Leave Game Room
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleCreateNewManualDeck}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-pine hover:bg-pine-mid text-white text-xs font-black uppercase tracking-widest rounded-xl transition shadow-sm border-b-2 border-pine-mid cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Deck</span>
            </button>
            <button
              onClick={() => setActiveSubTab('ai-generator')}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-mint hover:bg-mint-mid text-pine text-xs font-black uppercase tracking-widest rounded-xl transition shadow-sm border-b-2 border-[#15a371] cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Deck Builder</span>
            </button>
          </div>
        )}
      </div>

      {/* Main Study Arena or tabs selection */}
      {activeSessionRoom ? (
        /* GIZMO MULTIPLAYER ACTIVE RECALL GAME BOARD */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Flashcard Stage (left - 8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white border border-gray-150 rounded-3xl p-6 shadow-sm min-h-[460px] flex flex-col justify-between relative overflow-hidden">
              <div className="flex justify-between items-center border-b border-gray-100 pb-4 select-none">
                <div>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">
                    Topic: {activeSessionRoom.deckTitle}
                  </span>
                  {isSoloMode && (
                    <span className="ml-2 text-[10px] font-mono tracking-widest uppercase text-amber-700 bg-amber-50 border border-amber-100 px-3 py-1 rounded-full">
                      Solo Trial
                    </span>
                  )}
                </div>
                <span className="text-xs font-bold text-pine font-mono">
                  Card {activeSessionRoom.currentCardIndex + 1} of {activeSessionRoom.cards.length}
                </span>
              </div>

              {/* LOBBY VIEW */}
              {activeSessionRoom.status === 'lobby' && (
                <div className="flex-grow flex flex-col justify-center items-center text-center p-8 space-y-6">
                  <div className="w-16 h-16 bg-[#deebe3] text-[#1e3e29] rounded-2xl flex items-center justify-center font-display font-black text-2xl select-none">
                    🔑
                  </div>
                  <div>
                    <h3 className="font-display text-2xl text-pine">Join Code: {activeSessionRoom.id}</h3>
                    <p className="text-xs text-gray-500 mt-1 max-w-md">
                      Share this lobby link or QR code with your classmates to join your active learning room synchronously!
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 justify-center">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(activeSessionRoom.id);
                        alert("Room ID copied to clipboard!");
                      }}
                      className="px-4 py-2 border border-gray-250 hover:bg-gray-50 text-xs font-bold font-mono rounded-xl cursor-pointer flex items-center gap-1.5 text-gray-700"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      Copy Code
                    </button>

                    <button
                      onClick={() => {
                        const sLink = `${window.location.origin}?flashcardRoom=${activeSessionRoom.id}`;
                        navigator.clipboard.writeText(sLink);
                        alert("Lobby Share Link copied to clipboard!");
                      }}
                      className="px-4 py-2 border border-pine/35 bg-foam/20 hover:bg-foam/50 text-pine text-xs font-bold font-mono rounded-xl cursor-pointer flex items-center gap-1.5"
                    >
                      <Share2 className="w-3.5 h-3.5 text-sage" />
                      Copy Share Link
                    </button>

                    {activeSessionRoom.hostEmail === profile.email && (
                      <button
                        onClick={handleStartGroupSessionActive}
                        className="px-6 py-2.5 bg-pine hover:bg-pine-mid text-cream font-black text-xs uppercase tracking-widest rounded-xl shadow-xs cursor-pointer border-b-2 border-pine-mid"
                      >
                        Start Active Recall Game
                      </button>
                    )}
                  </div>

                  {/* QR Code sharing option */}
                  <div className="flex flex-col items-center bg-gray-50/50 border border-gray-150 p-3 rounded-2xl max-w-xs w-full select-none animate-in fade-in">
                    <p className="text-[9px] font-mono font-bold text-gray-400 mb-1.5 uppercase tracking-wide">
                      Scan to Join Recall Arena (Realtime Sync)
                    </p>
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(`${window.location.origin}?flashcardRoom=${activeSessionRoom.id}`)}`}
                      alt="QR Code Joining Link"
                      className="w-24 h-24 rounded-lg shadow-xs border border-gray-100 bg-white"
                      referrerPolicy="no-referrer"
                    />
                    <span className="text-[8px] text-gray-400 font-medium mt-1">Classmates will connect to this lobby immediately</span>
                  </div>

                  {activeSessionRoom.hostEmail !== profile.email && (
                    <div className="text-xs text-amber-600 font-bold bg-amber-50 border border-amber-100 p-3 rounded-xl animate-pulse w-full max-w-md">
                      Waiting for host to launch active recall cards...
                    </div>
                  )}
                </div>
              )}

              {/* CARD FRONT / ACTIVE VIEW */}
              {activeSessionRoom.status === 'active' && (
                <div className="flex-grow flex flex-col pt-4 overflow-hidden">
                  <div className="px-4 flex-1 overflow-y-auto">
                    <div className="max-w-md mx-auto w-full space-y-6 pb-20">
                      <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 flex flex-col overflow-hidden">
                        {/* Synchronized Board Exam Timer */}
                        {secondsLeft !== null && (
                          <div className="h-1.5 w-full bg-gray-50 flex overflow-hidden">
                            <motion.div 
                              initial={{ width: '100%' }}
                              animate={{ width: `${(secondsLeft / (activeSessionRoom.timerDuration || 60)) * 100}%` }}
                              transition={{ duration: 1, ease: 'linear' }}
                              className={`h-full ${secondsLeft < (activeSessionRoom.timerDuration || 60) * 0.25 ? 'bg-rose-500' : 'bg-pine'}`}
                            />
                          </div>
                        )}

                        <div className="p-6 pb-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-1.5">
                              <Zap className="w-3.5 h-3.5 text-green-500 fill-green-500" />
                              <span className="text-[9px] font-black text-green-600 uppercase tracking-widest">High Yield Concept</span>
                            </div>
                            {secondsLeft !== null && (
                              <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${secondsLeft < (activeSessionRoom.timerDuration || 60) * 0.25 ? 'bg-rose-50 text-rose-600 animate-pulse' : 'bg-gray-50 text-gray-400'}`}>
                                <RefreshCw className={`w-2.5 h-2.5 ${secondsLeft < (activeSessionRoom.timerDuration || 60) * 0.25 ? 'animate-spin' : ''}`} />
                                <span className="text-[10px] font-black font-mono">{secondsLeft}s</span>
                              </div>
                            )}
                          </div>
                          <h2 className="text-lg font-black text-gray-900 leading-snug tracking-tight">
                            {activeSessionRoom.cards[activeSessionRoom.currentCardIndex].front}
                          </h2>
                        </div>

                        <div className="px-6 pb-6 pt-2 space-y-2">
                          {activeSessionRoom.cards[activeSessionRoom.currentCardIndex].options?.length ? (
                            activeSessionRoom.cards[activeSessionRoom.currentCardIndex].options.map((opt, idx) => {
                              const memberKey = profile.email.replace(/\./g, '_');
                              const hasSubmitted = activeSessionRoom.participants[memberKey]?.submittedAnswer;
                              const myAnswer = activeSessionRoom.participants[memberKey]?.lastAnswerText;
                              const isCorrect = opt === activeSessionRoom.cards[activeSessionRoom.currentCardIndex].correctOption;
                              const isSelected = myAnswer === opt;
                              const isReveal = activeSessionRoom.status === 'reveal';
                              
                              return (
                                <button
                                  key={idx}
                                  disabled={hasSubmitted || isReveal}
                                  onClick={() => handleSubmitMyWrittenRecallAnswer(opt)}
                                  className={`
                                    w-full py-3.5 px-6 text-center text-xs font-black uppercase tracking-tight transition-all border border-gray-100 rounded-2xl cursor-pointer shadow-xs
                                    ${isReveal
                                      ? isCorrect 
                                        ? 'bg-green-50 border-green-200 text-green-700 ring-2 ring-green-100' 
                                        : isSelected ? 'bg-rose-50 border-rose-200 text-rose-700' : 'text-gray-300 bg-gray-50 border-transparent opacity-60'
                                      : isSelected
                                        ? 'bg-pine-mid border-pine text-white animate-pulse'
                                        : hasSubmitted
                                          ? 'bg-gray-50 text-gray-400 border-gray-100 opacity-80'
                                          : 'bg-white hover:bg-pine/5 hover:border-pine hover:text-pine text-gray-800 active:scale-[0.98]'
                                    }
                                  `}
                                >
                                  {opt}
                                  {isSelected && !isReveal && <span className="ml-2 opacity-50">(Selected)</span>}
                                </button>
                              );
                            })
                          ) : (
                            <div className="p-8 text-center space-y-4">
                              <AlertCircle className="w-12 h-12 text-amber-400 mx-auto" />
                              <div className="space-y-1">
                                <h4 className="text-sm font-black text-gray-800 uppercase">Legacy Deck Format</h4>
                                <p className="text-[10px] text-gray-500 font-medium">BoardPassPH now exclusively uses synced MCQ. Please generate a new AI deck for the updated Board Exam Arena experience.</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Manual Navigation - Host Only & Sync Locked */}
                      {activeSessionRoom.hostEmail === profile.email && (
                        <div className="flex justify-center gap-6 pt-4 pb-12">
                          <button 
                            onClick={() => handleUpdateCurrentCardIndex(activeSessionRoom.currentCardIndex - 1)}
                            disabled={activeSessionRoom.currentCardIndex === 0}
                            className="w-16 h-16 bg-white border border-gray-100 shadow-sm rounded-full flex items-center justify-center disabled:opacity-20 cursor-pointer hover:bg-gray-50 active:scale-95 transition"
                          >
                            <ChevronLeft className="w-6 h-6 text-gray-400" />
                          </button>
                          <button 
                            onClick={() => {
                              if (!playersDoneSubmitting) {
                                alert("Board Exam Rules: All candidates must submit their answers before proceeding to the next item.");
                                return;
                              }
                              handleUpdateCurrentCardIndex(activeSessionRoom.currentCardIndex + 1);
                            }}
                            disabled={activeSessionRoom.currentCardIndex >= activeSessionRoom.cards.length - 1 || !playersDoneSubmitting}
                            className={`w-16 h-16 bg-white border border-gray-100 shadow-sm rounded-full flex items-center justify-center disabled:opacity-20 cursor-pointer transition active:scale-95 ${playersDoneSubmitting ? 'hover:bg-pine/5 ring-4 ring-pine/10 ring-offset-2' : 'hover:bg-gray-50'}`}
                          >
                            <ChevronRight className={`w-6 h-6 ${playersDoneSubmitting ? 'text-pine' : 'text-gray-400'}`} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}


              {/* ANSWER REVEAL VIEW */}
              {activeSessionRoom.status === 'reveal' && (
                <div className="flex-grow flex flex-col justify-between py-6">
                  <div className="space-y-6">
                    <div className="text-center space-y-2">
                      <span className="text-[10px] font-mono uppercase bg-red-50 text-red-700 px-3 py-1 rounded-full border border-red-150">
                        Prompt Question
                      </span>
                      <h4 className="text-sm font-bold text-gray-500 max-w-xl mx-auto whitespace-pre-wrap text-left">
                        {activeSessionRoom.cards[activeSessionRoom.currentCardIndex].front}
                      </h4>
                    </div>

                    <div className="bg-emerald-50 border border-emerald-150 p-6 rounded-3xl space-y-3 relative overflow-hidden max-w-xl mx-auto">
                      <div className="absolute top-0 right-0 p-3 text-emerald-200 text-5xl font-black font-display font-mono select-none">
                        ✓
                      </div>
                      <span className="text-[10px] font-mono font-black uppercase tracking-widest text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full inline-block">
                        Correct Active Answer
                      </span>
                      <p className="text-sm text-emerald-950 leading-relaxed font-semibold">
                        {activeSessionRoom.cards[activeSessionRoom.currentCardIndex].back}
                      </p>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 p-4 rounded-2xl max-w-xl mx-auto">
                      <span className="text-[9px] uppercase font-mono font-black text-gray-400 block mb-2 select-none">
                        Your submitted memory statement:
                      </span>
                      <p className="text-xs text-gray-700 font-medium italic">
                        "{activeSessionRoom.participants[profile.email.replace(/\./g, '_')]?.lastAnswerText || "Blank response submitted"}"
                      </p>
                    </div>
                  </div>

                  {/* AUTOMATIC GRADING FEEDBACK */}
                  <div className="mt-8 space-y-4 max-w-xl mx-auto w-full">
                    {activeSessionRoom.participants[profile.email.replace(/\./g, '_')]?.submittedAnswer && (
                      <div className={`p-4 rounded-2xl text-center space-y-1 border ${
                        activeSessionRoom.participants[profile.email.replace(/\./g, '_')]?.lastAnswerText === activeSessionRoom.cards[activeSessionRoom.currentCardIndex].correctOption
                          ? 'bg-emerald-50 border-emerald-150'
                          : 'bg-rose-50 border-rose-150'
                      }`}>
                        <p className="text-xs font-bold text-gray-900">
                          {activeSessionRoom.participants[profile.email.replace(/\./g, '_')]?.lastAnswerText === activeSessionRoom.cards[activeSessionRoom.currentCardIndex].correctOption ? (
                            <>
                              Auto-Graded: <span className="uppercase font-black text-emerald-600">CORRECT!</span>
                              <span className="block text-[10px] text-gray-500 font-mono mt-1 italic">
                                Submission Speed Bonus: +{
                                  activeSessionRoom.participants[profile.email.replace(/\./g, '_')]?.selfRating === 'perfect' ? '10 XP (BLITZ)' : 
                                  activeSessionRoom.participants[profile.email.replace(/\./g, '_')]?.selfRating === 'vague' ? '7 XP (RAPID)' : '5 XP (STANDARD)'
                                }
                              </span>
                            </>
                          ) : (
                            <>
                              Auto-Graded: <span className="uppercase font-black text-rose-600">INCORRECT</span>
                              <span className="block text-[10px] text-gray-500 font-mono mt-1 italic">Rule out this concept during the rationalization phase.</span>
                            </>
                          )}
                        </p>
                      </div>
                    )}

                    {activeSessionRoom.hostEmail === profile.email && (
                      <div className="pt-4 flex flex-col items-center gap-3">
                        {!playersDoneSubmitting && (
                          <p className="text-[10px] text-amber-600 font-bold bg-amber-50 px-4 py-2 rounded-full border border-amber-100 animate-pulse">
                            Waiting for all candidates to submit answers...
                          </p>
                        )}
                        <button
                          onClick={handleHostProceedToNextRecallQuiz}
                          disabled={!playersDoneSubmitting}
                          className={`px-8 py-3 text-white text-xs font-black uppercase tracking-widest rounded-xl transition border-b-4 flex items-center gap-2 cursor-pointer
                            ${playersDoneSubmitting 
                              ? 'bg-pine hover:bg-pine-mid border-pine-mid active:translate-y-0.5 active:border-b-0' 
                              : 'bg-gray-200 border-gray-300 opacity-50 cursor-not-allowed'
                            }
                          `}
                        >
                          <span>{activeSessionRoom.currentCardIndex >= activeSessionRoom.cards.length - 1 ? "Complete Arena Session" : "Proceed to Next Board Item"}</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* GAME COMPLETED VIEW */}
              {activeSessionRoom.status === 'finished' && (
                <div className="flex-grow flex flex-col justify-center items-center text-center p-8 space-y-6 select-none">
                  <div className="w-20 h-20 bg-amber-50 border-4 border-amber-300 text-amber-500 rounded-3xl flex items-center justify-center text-4xl animate-bounce">
                    🏆
                  </div>
                  <div>
                    <h3 className="font-display text-3xl font-extrabold text-[#f45185] italic">Clinical Arena Cleared!</h3>
                    <p className="text-xs text-gray-500 mt-1 max-w-sm">
                      Superb! You have completed all active recall items. Check the leaderboards to view final peer placement scorecard metrics!
                    </p>
                  </div>

                  <div className="bg-[#deebe3]/30 p-5 rounded-3xl max-w-xs w-full space-y-2 border border-[#1e3e29]/10">
                    <span className="text-[9px] font-mono tracking-widest uppercase text-emerald-950 font-black block">
                      Individual Performance Log
                    </span>
                    <p className="text-3xl font-display text-emerald-900 font-extrabold">
                      {activeSessionRoom.participants[profile.email.replace(/\./g, '_')]?.score || 0} pts
                    </p>
                    <p className="text-xs text-gray-400">XP and memory vectors consolidated successfully.</p>
                  </div>

                  <button
                    onClick={() => {
                      setActiveSessionRoom(null);
                      setMyWrittenAnswer('');
                      setActiveSubTab('my-decks');
                    }}
                    className="px-6 py-2.5 bg-pine hover:bg-pine-mid text-cream text-xs font-black uppercase tracking-widest rounded-xl shadow-xs"
                  >
                    View Community Directory
                  </button>
                </div>
              )}
            </div>

            {/* Injected Video/Audio WebRTC Engine for Live Interaction */}
            <GroupVideoChat roomId={activeSessionRoom.id} userEmail={profile.email} />
          </div>

          {/* Leaderboards, participants tracking & Chat (right - 4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Real-time Scoreboard */}
            <div className="bg-white border border-gray-150 rounded-3xl p-5 shadow-sm space-y-4">
              <h4 className="font-display text-base text-pine flex items-center gap-1.5 select-none font-black uppercase tracking-wider font-mono">
                <Users className="w-4 h-4 text-sage" />
                Live Arena Placements
              </h4>

              <div className="space-y-2">
                {Object.keys(activeSessionRoom.participants)
                  .map(key => ({ id: key, ...activeSessionRoom.participants[key] }))
                  .sort((a, b) => b.score - a.score)
                  .map((player, idx) => {
                    const isSelf = player.email === profile.email;
                    const speaking = player.voiceConnected && player.isSpeaking;
                    return (
                      <div 
                        key={player.id}
                        className={`p-2.5 rounded-2xl flex items-center justify-between border transition-all duration-200 ${
                          speaking
                            ? 'bg-emerald-50/70 border-emerald-300 shadow-md ring-1 ring-emerald-450 transform scale-102 font-extrabold'
                            : isSelf 
                              ? 'bg-foam/35 border-pine/15 font-bold shadow-xs' 
                              : 'bg-gray-50 border-gray-150'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold ${
                            idx === 0 ? 'bg-yellow-105 border-yellow-250 text-yellow-800' : 'bg-gray-200 text-gray-700'
                          }`}>
                            #{idx + 1}
                          </span>
                          <div>
                            <p className="text-xs text-gray-800 truncate max-w-[120px] flex items-center gap-1">
                              {player.name}
                              {(player.streak || 0) >= 2 && (
                                <span className={`shrink-0 flex items-center gap-0.5 px-1 py-0.5 ${player.streak >= 5 ? 'bg-rose-100 text-rose-700 border-rose-200' : 'bg-orange-100 text-orange-700 border-orange-200'} border rounded-md text-[7px] font-mono leading-none animate-bounce`}>
                                  <Flame className="w-1.5 h-1.5 fill-current" /> {player.streak} STREAK
                                </span>
                              )}
                              {player.voiceConnected && (
                                <span className="shrink-0 flex items-center gap-0.5 select-none">
                                  {player.isSpeaking ? (
                                    <span className="flex items-center gap-0.5 px-1 py-0.5 bg-emerald-550 bg-emerald-600 text-white rounded-md text-[7px] font-mono leading-none animate-pulse">
                                      <Volume2 className="w-1.5 h-1.5" /> Speak
                                    </span>
                                  ) : player.isMuted ? (
                                    <span className="flex items-center gap-0.5 px-1 py-0.5 bg-rose-100 text-rose-700 border border-rose-200 rounded-md text-[7px] font-mono leading-none">
                                      <MicOff className="w-1.5 h-1.5" /> Muted
                                    </span>
                                  ) : (
                                    <span className="flex items-center gap-0.5 px-1 py-0.5 bg-gray-100 text-gray-700 border border-gray-200 rounded-md text-[7px] font-mono leading-none">
                                      <Mic className="w-1.5 h-1.5" /> On Live
                                    </span>
                                  )}
                                </span>
                              )}
                            </p>
                            {player.submittedAnswer && (
                              <span className="text-[8px] uppercase tracking-wide font-black text-emerald-600 block animate-pulse">
                                Typing Done...
                              </span>
                            )}
                            {player.selfRating && (
                              <span className="text-[8px] uppercase tracking-wider font-extrabold text-indigo-600 block">
                                Rated: {player.selfRating}
                              </span>
                            )}
                          </div>
                        </div>

                        <span className="text-xs font-mono font-black text-pine bg-white px-2.5 py-1 rounded-lg border border-gray-205">
                          {player.score || 0} pts
                        </span>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* BP Live Voice Lounge (AirTime) Control Box */}
            <div className="bg-white border border-gray-150 rounded-3xl p-5 shadow-sm space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-gray-150 select-none">
                <h4 className="font-display text-xs text-pine flex items-center gap-1.5 font-bold uppercase tracking-wider font-mono">
                  <Radio className={`w-3.5 h-3.5 ${voiceLoungeConnected ? 'text-rose-655 text-rose-600 animate-pulse' : 'text-gray-400'}`} />
                  BP Voice Lounge
                </h4>
                {voiceLoungeConnected && (
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                )}
              </div>

              {!voiceLoungeConnected ? (
                <div className="text-center py-1 space-y-2">
                  <p className="text-[10px] text-gray-400 leading-relaxed font-semibold">
                    Join the live voice lounge to sync real-time microphone speaking indicators and run audio notes.
                  </p>
                  <button
                    onClick={handleConnectVoiceLounge}
                    className="w-full py-1.5 bg-emerald-600 hover:bg-emerald-700 text-[#fbfdfb] rounded-xl text-[10px] font-black uppercase font-mono tracking-wide transition duration-150 cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <Mic className="w-3.5 h-3.5" />
                    Connect Voice Lounge
                  </button>
                </div>
              ) : (
                <div className="space-y-3 animate-in fade-in zoom-in-95 duration-200">
                  <div className="bg-gray-50 border border-gray-150 rounded-2xl p-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <button
                          onClick={handleToggleMuteVoiceLounge}
                          className={`px-3 py-1.5 rounded-xl cursor-pointer transition flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider border shadow-sm ${
                            isVoiceMuted ? 'bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-200' : 'bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-200'
                          }`}
                        >
                          {isVoiceMuted ? (
                            <><MicOff className="w-3.5 h-3.5" /> Mic is Muted</>
                          ) : (
                            <><Mic className="w-3.5 h-3.5" /> Mic is Live</>
                          )}
                        </button>
                        {!isVoiceMuted && localVoiceVolume > 15 && (
                          <span className="absolute -top-1 -right-1 flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                          </span>
                        )}
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-gray-700 leading-none">
                          {isVoiceMuted ? "You are Muted" : "Microphone Live"}
                        </p>
                        <p className="text-[8px] text-gray-400 font-mono leading-none mt-1">
                          {isVoiceMuted ? "Click to connect" : "Casting voice indices"}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={handleDisconnectVoiceLounge}
                      className="px-2 py-1 bg-gray-200 hover:bg-rose-50 text-gray-600 hover:text-rose-700 rounded-lg text-[9px] font-bold font-mono cursor-pointer transition duration-150"
                    >
                      Leave Lounge
                    </button>
                  </div>

                  {/* Visualizer Waveform Animation using current volume */}
                  {!isVoiceMuted && (
                    <div className="bg-emerald-950/5 border border-emerald-500/15 p-2 rounded-xl space-y-1">
                      <div className="flex justify-between items-center text-[8px] font-mono text-gray-400 select-none font-bold">
                        <span>MIC INTENSITY</span>
                        <span>{localVoiceVolume}%</span>
                      </div>
                      <div className="h-4 flex items-center justify-center gap-0.5">
                        {[...Array(16)].map((_, i) => {
                          const baseHeight = localVoiceVolume > 15 ? (localVoiceVolume / 100) * 105 : 12;
                          // give slightly random heights for fluctuate
                          const randFactor = 0.35 + Math.random() * 0.65;
                          const heightVal = Math.max(12, Math.min(100, Math.round(baseHeight * randFactor)));
                          return (
                            <span
                              key={i}
                              style={{ height: `${heightVal}%` }}
                              className="w-1 bg-emerald-600 rounded-full transition-all duration-75"
                            />
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Arena Live Chat Feed */}
            <div className="bg-white border border-gray-150 rounded-3xl p-5 shadow-sm space-y-4 h-[400px] flex flex-col justify-between overflow-hidden relative">
              <h4 className="font-display text-base text-pine flex items-center gap-1.5 select-none font-black uppercase tracking-wider font-mono border-b border-gray-50 pb-2">
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                Study Room Chat
              </h4>

              <div className="flex-grow overflow-y-auto space-y-3 pr-1 py-1 no-scrollbar col-span-1 border border-transparent">
                {activeSessionRoom.chatMessages.map((msg, i) => {
                  const isSystem = msg.senderEmail === 'admin@boardpassph.com';
                  const isReaction = msg.text.length < 5 && !msg.audioUrl;
                  return (
                    <div 
                      key={msg.id || i}
                      className={`text-xs p-3 rounded-2xl border space-y-1.5 transition duration-150 ${
                        isSystem 
                          ? 'bg-emerald-50/40 border-emerald-100 text-emerald-800 italic' 
                          : isReaction
                            ? 'bg-amber-50/30 border-amber-100 text-center scale-110 shadow-sm'
                            : 'bg-gray-50 border-gray-150 shadow-xs'
                      }`}
                    >
                      {!isReaction && (
                        <div className="flex justify-between items-center select-none border-b border-gray-100/50 pb-0.5">
                          <span className="text-[9px] uppercase font-mono font-black text-gray-500">
                            {msg.senderName}
                          </span>
                          <span className="text-[8px] font-mono text-gray-400">
                            {msg.timestamp}
                          </span>
                        </div>
                      )}
                      
                      {msg.audioUrl ? (
                        <div className="bg-white border border-gray-200 rounded-xl p-2 flex items-center justify-between gap-3 shadow-2xs select-none">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                try {
                                  const audio = new Audio(msg.audioUrl);
                                  audio.play();
                                } catch (err) {
                                  console.error("Audio playback error:", err);
                                }
                              }}
                              className="w-7 h-7 rounded-full bg-pine hover:bg-emerald-800 text-[#fbfdfb] flex items-center justify-center cursor-pointer transition active:scale-95 shrink-0 animate-pulse"
                            >
                              <Play className="w-3.5 h-3.5 ml-0.5" />
                            </button>
                            <div>
                              <p className="text-[10px] font-bold text-gray-700">Voice review capsule</p>
                              <p className="text-[8px] font-mono text-gray-400 capitalize">Length: {msg.duration || '?'} seconds</p>
                            </div>
                          </div>
                          <span className="text-[8px] uppercase tracking-wide font-bold bg-emerald-50 border border-emerald-100 text-emerald-700 px-1 py-0.5 rounded-md shrink-0">
                            Voice Note
                          </span>
                        </div>
                      ) : (
                        <p className="text-xs text-gray-800 leading-normal">
                          {msg.text}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

               <div className="flex gap-1 mb-2">
                {['👏', '🔥', '🤓', '💯', '🤔'].map(emoji => (
                  <button 
                    key={emoji}
                    onClick={() => handleSendReaction(emoji)}
                    className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 hover:bg-white hover:border-pine/30 flex items-center justify-center text-sm cursor-pointer hover:scale-125 transition active:scale-95 shadow-2xs"
                  >
                    {emoji}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSendRoomChatMessage} className="flex gap-2 border-t border-gray-100 pt-3 relative">
                {isRecordingVoice ? (
                  <div className="flex-grow bg-rose-50 border border-rose-200 rounded-xl px-3 py-2 text-xs font-mono font-bold text-rose-700 flex items-center justify-between animate-pulse">
                    <span className="flex items-center gap-1.5 select-none text-[10px] uppercase font-bold tracking-wide">
                      <span className="h-2.5 w-2.5 rounded-full bg-rose-600 animate-ping shrink-0" />
                      {"REC VOICE NOTE"}: {recordingSeconds}s
                    </span>
                    <button
                      type="button"
                      onClick={handleStopVoiceRecording}
                      className="text-[9px] uppercase font-black text-rose-900 bg-rose-100 hover:bg-rose-200 border border-rose-300 px-2 py-1 rounded-lg cursor-pointer"
                    >
                      {"Stop & Send"}
                    </button>
                  </div>
                ) : (
                  <>
                    <input
                      type="text"
                      value={activeRoomMessageInput}
                      onChange={(e) => setActiveRoomMessageInput(e.target.value)}
                      placeholder="Ask peers standard study questions..."
                      className="flex-grow bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 text-xs font-medium outline-none"
                    />
                    
                    <button
                      type="button"
                      onClick={handleStartVoiceRecording}
                      className="p-1.5 bg-gray-50 border border-gray-250 hover:bg-foam text-gray-600 hover:text-pine rounded-xl cursor-pointer flex items-center justify-center gap-1 transition"
                      title="Record and send voice note"
                    >
                      <Mic className="w-3.5 h-3.5" />
                      <span className="text-[9px] font-bold font-mono">REC</span>
                    </button>
                    
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-pine text-[#fbfdfb] rounded-xl text-xs font-bold"
                    >
                      Send
                    </button>
                  </>
                )}
              </form>
            </div>

          </div>
        </div>
      ) : (
        /* CENTRAL PANELS CONTROLS WITH SUBTABS NAVIGATION */
        <div className="space-y-6">
          
          {/* Subtabs Menu Selection */}
          <div className="flex bg-white/45 p-1 border border-pine/5 rounded-2xl max-w-lg font-mono text-[9px] font-black uppercase tracking-wider gap-1 select-none shadow-xs">
            <button
              onClick={() => setActiveSubTab('my-decks')}
              className={`flex-grow text-center px-3 py-2.5 rounded-xl transition duration-150 cursor-pointer ${
                activeSubTab === 'my-decks' ? 'bg-pine text-[#fbfdfb] font-black shadow-xs' : 'text-pine hover:bg-foam/65'
              }`}
            >
              📂 My Decks
            </button>
            <button
              onClick={() => setActiveSubTab('ai-generator')}
              className={`flex-grow text-center px-3 py-2.5 rounded-xl transition duration-150 cursor-pointer ${
                activeSubTab === 'ai-generator' ? 'bg-pine text-[#fbfdfb] font-black shadow-xs' : 'text-pine hover:bg-foam/65'
              }`}
            >
              🤖 AI Deck Builder
            </button>
            <button
              onClick={() => setActiveSubTab('public-decks')}
              className={`flex-grow text-center px-3 py-2.5 rounded-xl transition duration-150 cursor-pointer ${
                activeSubTab === 'public-decks' ? 'bg-pine text-[#fbfdfb] font-black shadow-xs' : 'text-pine hover:bg-foam/65'
              }`}
            >
              🌍 Community Decks
            </button>
            <button
              onClick={() => setActiveSubTab('live-recall')}
              className={`flex-grow text-center px-3 py-2.5 rounded-xl transition duration-150 cursor-pointer ${
                activeSubTab === 'live-recall' ? 'bg-pine text-[#fbfdfb] font-black shadow-xs' : 'text-pine hover:bg-foam/65'
              }`}
            >
              🧠 Recall Arena
            </button>
          </div>

          {/* MANUAL DECK CREATION MODAL OVERLAY */}
          {isCreatingDeck && (
            <div className="bg-white border border-gray-250 rounded-3xl p-6 shadow-md relative animate-in fade-in duration-300">
              <button
                onClick={() => setIsCreatingDeck(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-display text-2xl text-pine mb-4">
                {editingDeckId ? "Edit Flashcard Deck" : parentDeckIdForSubdeck ? "Create New Subdeck" : "Manual Flashcard Creator"}
              </h3>
              
              <div className="space-y-4 max-w-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider font-mono">
                      Deck Title
                    </label>
                    <input
                      type="text"
                      value={newDeckTitle}
                      onChange={(e) => setNewDeckTitle(e.target.value)}
                      placeholder="e.g. Republic Act 10029 Ethical Guide"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-xs font-semibold outline-none"
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider font-mono">
                      Curriculum Subject Path
                    </label>
                    <select
                      value={newDeckCategory}
                      onChange={(e) => setNewDeckCategory(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-xs font-semibold outline-none"
                    >
                      <option value="Abnormal Psychology">Abnormal Psychology (DSM-5-TR)</option>
                      <option value="Psychological Assessment">Psychological Assessment & Tests</option>
                      <option value="Industrial Organizational">Industrial Organizational Psychology</option>
                      <option value="Developmental Psychology">Developmental Syllabus & Theories</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider font-mono">
                    Short Description
                  </label>
                  <input
                    type="text"
                    value={newDeckDesc}
                    onChange={(e) => setNewDeckDesc(e.target.value)}
                    placeholder="Provide a brief summary of what chapters this deck contains."
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-xs font-medium outline-none"
                  />
                </div>

                {/* Cards items sub-sections */}
                <div className="space-y-3 pt-3 border-t border-gray-100 max-h-[290px] overflow-y-auto pr-1 no-scrollbar">
                  <span className="text-[10px] uppercase font-black text-gray-400 font-mono tracking-widest block select-none">
                    Flashcard Rows (Front & Back)
                  </span>

                  {newDeckCards.map((card, idx) => (
                    <div key={idx} className="bg-gray-50/60 p-4 rounded-2xl border border-gray-150 relative space-y-3">
                      <button
                        onClick={() => handleRemoveManualCardRow(idx)}
                        disabled={newDeckCards.length <= 1}
                        className="absolute top-2 right-2 text-rose-600 disabled:text-gray-300 font-bold text-[10px] uppercase tracking-wider"
                      >
                        Remove
                      </button>

                      <div className="grid grid-cols-1 gap-3">
                        <div className="space-y-1">
                          <label className="text-[9px] uppercase font-black text-gray-400">Board Question / MCQ Vignette</label>
                          <textarea
                            value={card.front}
                            onChange={(e) => {
                              const updated = [...newDeckCards];
                              updated[idx].front = e.target.value;
                              setNewDeckCards(updated);
                            }}
                            placeholder="e.g. A 25-year-old client reports zero interest in relationships and social detachment. Which diagnosis aligns?&#10;A) Schizoid&#10;B) Schizotypal..."
                            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-medium outline-none resize-y min-h-[60px]"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] uppercase font-black text-gray-400">Clinical Rationale (Back of card)</label>
                          <textarea
                            rows={2}
                            value={card.back}
                            onChange={(e) => {
                              const updated = [...newDeckCards];
                              updated[idx].back = e.target.value;
                              setNewDeckCards(updated);
                            }}
                            placeholder="Provide rationale for the correct board choice and explain rule-outs."
                            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-medium outline-none"
                          />
                        </div>

                        {/* MCQ Options UI */}
                        <div className="space-y-2 pt-2 border-t border-gray-100">
                          <label className="text-[9px] uppercase font-black text-gray-400 block">Board MCQ Options & Correct Choice</label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {(card.options || ['', '', '', '']).map((opt, oIdx) => (
                              <div key={oIdx} className="flex items-center gap-2">
                                <input 
                                  type="radio" 
                                  name={`correct-${idx}`}
                                  checked={card.correctOption === opt && opt !== ''}
                                  onChange={() => {
                                    const updated = [...newDeckCards];
                                    updated[idx].correctOption = opt;
                                    setNewDeckCards(updated);
                                  }}
                                  className="accent-pine"
                                />
                                <input
                                  type="text"
                                  value={opt}
                                  onChange={(e) => {
                                    const updated = [...newDeckCards];
                                    if (!updated[idx].options) updated[idx].options = ['', '', '', ''];
                                    const wasCorrect = updated[idx].correctOption === updated[idx].options[oIdx];
                                    updated[idx].options![oIdx] = e.target.value;
                                    if (wasCorrect) updated[idx].correctOption = e.target.value;
                                    setNewDeckCards(updated);
                                  }}
                                  placeholder={`Option ${String.fromCharCode(65 + oIdx)}`}
                                  className="flex-grow bg-white border border-gray-200 rounded-lg px-2 py-1 text-[10px] outline-none"
                                />
                              </div>
                            ))}
                          </div>
                          <p className="text-[8px] text-gray-400 italic mt-1">Select the radio button next to the correct answer.</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2.5 pt-4">
                  <button
                    onClick={handleAddManualCardRow}
                    className="px-4 py-2 border border-pine text-pine hover:bg-foam/25 text-xs font-black uppercase tracking-wider rounded-xl cursor-pointer"
                  >
                    + Add Card Row
                  </button>
                  <button
                    onClick={handleSaveManualDeck}
                    className="px-6 py-2 bg-pine hover:bg-pine-mid text-cream text-xs font-black uppercase tracking-widest rounded-xl transition cursor-pointer"
                  >
                    Save & Consolidate Deck
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* MY DECKS SUBTAB VIEW */}
          {activeSubTab === 'my-decks' && !isCreatingDeck && (
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-white p-4 border border-gray-150 rounded-2xl select-none">
                <span className="text-xs font-mono font-bold text-pine bg-foam/50 px-3 py-1.5 rounded-full">
                  My Custom Inventory: {myCustomDecks.length} Decks
                </span>
              </div>

              {myCustomDecks.length === 0 ? (
                <div className="bg-white border border-dashed border-gray-200 rounded-3xl p-16 text-center text-gray-500 max-w-xl mx-auto select-none">
                  <Layers className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <h5 className="font-heading font-black text-gray-750">Your Flashcard Closet is Empty</h5>
                  <p className="text-xs text-gray-400 mt-1 font-medium leading-relaxed">
                    You haven’t crafted customized flashcards yet. Feed reference text files to our AI Generator or write a few cards manually to begin.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {myCustomDecks.map((deck) => (
                    <FlashcardDeckItem 
                      key={deck.id}
                      deck={deck}
                      onEdit={handleStartEditingDeck}
                      onDelete={handleDeleteCustomDeck}
                      onAddSubdeck={handleStartCreatingSubdeck}
                      onLaunchSolo={(d) => handleLaunchLiveGroupRecall(d, true)}
                      onLaunchLive={(d) => handleLaunchLiveGroupRecall(d, false)}
                      onShare={handleShareDeckWithPublic}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* AI FLASHCARD GENERATOR VIEW */}
          {activeSubTab === 'ai-generator' && (
            <div className="bg-white border border-gray-150 rounded-3xl p-6 shadow-sm space-y-6 animate-in fade-in duration-300">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono font-black text-rose-700 bg-rose-50 border border-rose-100 px-3 py-1 rounded-full inline-block animate-pulse">
                  🤖 Gemini Review Engine
                </span>
                <h3 className="font-display text-2xl text-pine">Instant AI Deck Synthesis</h3>
                <p className="text-xs text-gray-500 max-w-xl">
                  Paste notes, review guidelines, or upload diagnostic checklists. Our Gemini model will automatically parse terms, symptoms, and validity formulas into comprehensive active recall questions!
                </p>
              </div>

              {/* Input section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-3">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider font-mono">
                      Pasted Notes or Guidelines text
                    </label>
                    <textarea
                      rows={8}
                      value={pastedNotes}
                      onChange={(e) => setPastedNotes(e.target.value)}
                      placeholder="Paste theories, disorders checklists, WISC indices, or RA 10029 provisions..."
                      className="w-full bg-[#deebe3]/10 border border-gray-250 focus:bg-white focus:border-pine rounded-2xl p-4 text-xs font-semibold outline-none transition"
                    />
                  </div>
                </div>

                <div className="space-y-4 border-l border-gray-100 pl-0 lg:pl-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider font-mono">
                      Alternative: Upload Reference File (Up to 20MB)
                    </label>
                    
                    <div className="border-2 border-dashed border-gray-200 hover:border-pine/35 hover:bg-foam/10 rounded-3xl p-8 text-center cursor-pointer transition relative">
                      <input
                        type="file"
                        accept=".pdf,.docx,.doc,.xlsx,.xls,.txt,.md,.csv"
                        onChange={handleFileUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        disabled={isParsingFile || isGeneratingDeckAI}
                      />
                      <Upload className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                      <p className="text-xs font-bold text-gray-650">Drag & Drop or click to upload</p>
                      <p className="text-[10px] text-gray-400 mt-1">Supports PDF, Word (.docx), Excel (.xlsx), CSV, or TXT (Max 20MB)</p>
                    </div>

                    {/* API Key Configuration for AI Generaton */}
                    <div className="pt-2">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1.5 mb-1.5">
                        Developer API Key Configuration
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={deckApiKey}
                          onChange={(e) => {
                            setDeckApiKey(e.target.value);
                            localStorage.setItem(`bp_gemini_api_key_${profile.email}`, e.target.value.trim());
                          }}
                          placeholder="Paste your Gemini AI Studio API Key here (AIzaSy...)"
                          className="flex-grow bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-xs font-mono outline-none focus:border-sage focus:ring-1 focus:ring-sage"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            localStorage.setItem(`bp_gemini_api_key_${profile.email}`, deckApiKey.trim());
                            alert("API Key saved successfully! The Deck Builder will now use your custom developer allocation limit.");
                          }}
                          className="px-4 py-2 bg-sage hover:bg-[#689f81] text-white text-xs font-bold rounded-xl transition shadow-sm whitespace-nowrap"
                        >
                          Save Key
                        </button>
                      </div>
                      <div className="mt-2 bg-blue-50 border border-blue-100 rounded-xl p-3">
                        <p className="text-[11px] font-bold text-blue-900 mb-1">How to get your free Gemini API Key:</p>
                        <ol className="list-decimal list-inside text-[10px] text-blue-800 space-y-1">
                          <li>Go to <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="underline font-semibold hover:text-blue-600">Google AI Studio</a> and sign in with your Google account.</li>
                          <li>Click the <strong>"Get API key"</strong> button.</li>
                          <li>Click <strong>"Create API key in new project"</strong>.</li>
                          <li>Copy the generated key (it starts with <code className="bg-blue-100 px-1 py-0.5 rounded">AIzaSy</code>) and paste it in the field above.</li>
                        </ol>
                        <p className="text-[9px] text-blue-700 mt-2">
                          Your key is stored securely locally in your browser and used directly for generations without constraints.
                        </p>
                      </div>
                    </div>

                    {isParsingFile && (
                      <div className="p-4 bg-mint/5 border border-mint/15 rounded-xl flex items-center gap-3 select-none animate-pulse">
                        <RefreshCw className="w-4 h-4 text-emerald-600 animate-spin shrink-0" />
                        <div>
                          <p className="text-xs font-bold text-pine">Scraping document copy...</p>
                          <p className="text-[9px] text-gray-500">Extracting clinical text and definitions safely.</p>
                        </div>
                      </div>
                    )}

                    {fileExtensionError && (
                      <div className="p-3 bg-red-50 border border-red-150 rounded-xl flex items-center gap-2 text-red-700 animate-in fade-in">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span className="text-[10px] font-semibold leading-relaxed">{fileExtensionError}</span>
                      </div>
                    )}

                    {!isParsingFile && selectedFile && (
                      <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-between select-none animate-in fade-in">
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                          <div>
                            <p className="text-xs font-bold text-emerald-990 truncate max-w-[160px]">{selectedFile.name}</p>
                            <p className="text-[9px] text-emerald-700">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB · Ready for AI</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => { setSelectedFile(null); setFileContentText(''); }}
                          className="text-[10px] font-mono hover:text-red-700 text-gray-400 cursor-pointer p-1"
                        >
                          Clear
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider font-mono">
  Cards per Document Chunk (total scales with file size)
</label>
<input
  type="number"
  min={1}
  max={200}
  step={1}
  value={numCardsToGenerate}
  onChange={(e) => setNumCardsToGenerate(Math.max(1, Math.min(200, parseInt(e.target.value) || 1)))}
                      disabled={isGeneratingDeckAI || isParsingFile}
                      className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-xs font-mono font-bold outline-none focus:border-pine focus:ring-1 focus:ring-pine/20 transition disabled:opacity-50"
                    />
                  </div>

                  <button
                    onClick={handleTriggerAIGenerator}
                    disabled={isGeneratingDeckAI || isParsingFile}
                    className="w-full py-3 bg-pine hover:bg-pine-mid text-[#fbfdfb] font-black text-xs uppercase tracking-widest rounded-xl transition cursor-pointer flex items-center justify-center gap-2 border-b-2 border-pine-mid disabled:opacity-55 shadow-sm"
                  >
                    <Sparkles className="w-4 h-4 text-mint animate-pulse" />
                    <span>{isGeneratingDeckAI ? (aiGenerationProgressText || 'Synthesizing Cards via Gemini...') : 'Synthesize AI Active Recall Deck'}</span>
                  </button>
                </div>
              </div>

              {/* Result Preview list & Save */}
              {aiGenResult.length > 0 && (
                <div className="pt-6 border-t border-gray-100 space-y-4 animate-in slide-in-from-bottom-3 duration-300">
                  <div className="flex justify-between items-center gap-2 flex-wrap select-none bg-foam/40 p-4 rounded-2xl">
                    <div>
                      <h4 className="font-display text-lg text-pine">Preview AI Generated Decks</h4>
                      <p className="text-xs text-gray-400 mt-0.5">Exactly {aiGenResult.length} high-yield clinical cards crafted by AI.</p>
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={aiDeckTitle}
                        onChange={(e) => setAiDeckTitle(e.target.value)}
                        placeholder="Customize Deck Title"
                        className="bg-white border border-gray-250 rounded-xl px-4 py-2 text-xs font-bold outline-none"
                      />
                      <button
                        onClick={handleSaveAIDeck}
                        className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-[#fbfdfb] text-xs font-black uppercase tracking-wider rounded-xl cursor-pointer"
                      >
                        ✓ Save AI Deck
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[350px] overflow-y-auto no-scrollbar py-2">
                    {aiGenResult.map((card, idx) => (
                      <div key={card.id || idx} className="bg-[#fcfdfc] border border-gray-150 p-4 rounded-2xl shadow-xs">
                        <span className="text-[9px] font-mono uppercase bg-gray-100 text-gray-400 px-2 py-0.5 rounded-md">Card #{idx + 1}</span>
                        <p className="text-xs text-gray-800 font-bold leading-relaxed mt-2 whitespace-pre-wrap"><strong>Front:</strong><br />{card.front}</p>
                        <p className="text-xs text-emerald-800 leading-relaxed mt-2.5 border-t border-gray-50 pt-2.5"><strong>Back Rationale:</strong> {card.back}</p>
                        {card.options && card.options.length > 0 && (
                          <div className="mt-3 space-y-1 bg-white p-2 rounded-xl border border-gray-100">
                            <p className="text-[10px] font-black uppercase text-gray-400 mb-1">Board MCQ Options:</p>
                            {card.options.map((opt, oIdx) => (
                              <div key={oIdx} className={`text-[10px] px-2 py-1 rounded-md ${opt === card.correctOption ? 'bg-green-50 text-green-700 font-bold' : 'text-gray-500'}`}>
                                {String.fromCharCode(65 + oIdx)}) {opt} {opt === card.correctOption && '✓'}
                              </div>
                            ))}
                          </div>
                        )}
                        {card.hint && (
                          <p className="text-[10px] text-gray-400 italic mt-1.5">Hint: {card.hint}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* COMMUNITY DECKS LIST VIEW */}
          {activeSubTab === 'public-decks' && (
            <div className="space-y-6">
              
              {/* Search Bar slot */}
              <div className="bg-white border border-gray-150 rounded-3xl p-5 shadow-sm">
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={deckSearchQuery}
                    onChange={(e) => setDeckSearchQuery(e.target.value)}
                    placeholder="Search public community decks (e.g. validity, mood disorders, ethical law)..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs font-medium outline-none focus:bg-white focus:border-pine transition"
                  />
                </div>
              </div>

              {/* Public cards listings */}
              {filteredPublicDecks.length === 0 ? (
                <div className="bg-white border border-dashed border-gray-200 rounded-3xl p-16 text-center text-gray-500 max-w-xl mx-auto select-none">
                  <Globe className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <h5 className="font-heading font-black text-gray-700">No Matching Public Decks</h5>
                  <p className="text-xs text-gray-400 mt-1 font-medium">
                    Try adjusting your search criteria or create your own custom deck and share it with the community!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {filteredPublicDecks.map((deck) => (
                    <div key={deck.id} className="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm space-y-4 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center select-none">
                          <span className="text-[10px] uppercase font-extrabold text-[#11321e] bg-teal-50 border border-teal-100 px-2.5 py-0.5 rounded-full">
                            {deck.category || "General Psychology"}
                          </span>
                          <span className="text-[10px] font-mono font-bold text-gray-400">
                            {deck.cards.length} Cards
                          </span>
                        </div>
                        <h4 className="font-display text-lg px-0.5 font-bold leading-tight text-pine">
                          {deck.title}
                        </h4>
                        <p className="text-xs text-gray-500 px-0.5 line-clamp-2">
                          {deck.description}
                        </p>
                        
                        <div className="pt-2 px-0.5 flex items-center gap-1 text-[10px] text-gray-400">
                          <span className="font-bold">Author: {deck.creatorName}</span>
                          <span className="text-gray-200">•</span>
                          <span>Published {deck.createdAt ? new Date(deck.createdAt).toLocaleDateString() : 'recently'}</span>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-gray-100 flex gap-2">
                        <button
                          onClick={() => handleLaunchLiveGroupRecall(deck, false)}
                          className="px-3 py-1.5 bg-pine hover:bg-pine-mid text-cream text-[10px] font-black uppercase tracking-wider rounded-lg flex items-center gap-1 cursor-pointer"
                        >
                          <Users className="w-3 h-3 text-mint" />
                          Host Recall Live
                        </button>
                        
                        <button
                          onClick={() => handleLaunchLiveGroupRecall(deck, true)}
                          className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-cream text-[10px] font-black uppercase tracking-wider rounded-lg flex items-center gap-1 cursor-pointer"
                        >
                          <Play className="w-3 h-3" />
                          Solo Live
                        </button>

                        <button
                          onClick={() => {
                            // Check local duplicate
                            if (myCustomDecks.some(d => d.id === deck.id)) {
                              alert("This public deck is already in your My Decks slot!");
                              return;
                            }
                            const updated = [deck, ...myCustomDecks];
                            saveDecksLocally(updated);
                            alert("📥 Deck added to your My Decks closet successfully!");
                          }}
                          className="px-3 py-1.5 border border-gray-200 hover:bg-gray-50 text-gray-700 text-[10px] font-black uppercase tracking-wider rounded-lg cursor-pointer ml-auto"
                        >
                          📥 Download
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* RECALL ARENA LOBBY TAB SECTION */}
          {activeSubTab === 'live-recall' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-gradient-to-br from-[#1e3e29] to-[#2f4939] rounded-3xl p-8 text-white relative overflow-hidden border border-[#2f4939]/30 shadow-lg">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
                
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-3">
                    <span className="text-[10px] uppercase font-black tracking-widest text-[#9ed4b7] bg-white/10 px-3 py-1 rounded-full border border-white/10 w-max block">
                      BoardPassPH Online Arena
                    </span>
                    <h2 className="font-display text-3xl font-extrabold italic text-[#fbfdfb] tracking-tight">
                      Active Recall <span className="text-mint font-normal not-italic">Lobby Arena</span>
                    </h2>
                    <p className="text-xs text-[#deebe3] max-w-xl leading-relaxed opacity-90">
                      Review Board diagnostics in perfect real-time synchronization. Host a board room, generate instant joining credentials, chat live, and analyze mock solutions together with your classmates or AI peers!
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-display font-black text-white">100%</p>
                      <p className="text-[9px] uppercase font-bold text-mint/70 tracking-widest">Cloud Sync</p>
                    </div>
                    <div className="h-10 w-[1px] bg-white/10" />
                    <div className="text-center">
                      <p className="text-2xl font-display font-black text-white">Live</p>
                      <p className="text-[9px] uppercase font-bold text-mint/70 tracking-widest">Multiplayer</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* JOIN ROOM PORTAL */}
                <div className="bg-white border border-gray-150 rounded-3xl p-8 shadow-sm space-y-6 transform transition hover:shadow-md">
                  <div className="space-y-2">
                    <div className="w-12 h-12 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-2">
                      <Users className="w-6 h-6" />
                    </div>
                    <h4 className="font-display text-xl text-pine font-black uppercase tracking-wide font-mono">
                      Join Active Arena
                    </h4>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Enter a unique study room code shared by your peers to join their live testing lobby instantly.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="e.g. room-741285"
                      value={joinRoomIdInput}
                      onChange={(e) => setJoinRoomIdInput(e.target.value)}
                      className="w-full bg-[#deebe3]/15 border border-gray-250 focus:bg-white focus:border-pine rounded-2xl px-5 py-3.5 text-sm font-mono font-black tracking-wider uppercase outline-none shadow-sm transition"
                    />
                    <button
                      onClick={handleJoinLiveSessionByInput}
                      disabled={sessionRoomLoading || !joinRoomIdInput.trim()}
                      className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black uppercase tracking-widest rounded-2xl cursor-pointer disabled:opacity-55 shadow-md border-b-4 border-indigo-800 active:border-b-0 active:translate-y-1 transition-all"
                    >
                      {sessionRoomLoading ? 'Connecting to Firebase...' : 'Step into the Arena'}
                    </button>
                    {firebaseStatus.errorMessage && (
                      <p className="text-[10px] text-red-500 mt-2 font-mono break-words leading-tight bg-red-50 p-2 rounded-xl border border-red-100">
                        ⚠️ Connection alert: {firebaseStatus.errorMessage}
                      </p>
                    )}
                  </div>
                </div>

                {/* CREATE ROOM PORTAL */}
                <div className="bg-white border border-gray-150 rounded-3xl p-8 shadow-sm space-y-6 transform transition hover:shadow-md">
                  <div className="space-y-2">
                    <div className="w-12 h-12 bg-mint/10 border border-mint/20 text-[#1e3e29] rounded-2xl flex items-center justify-center mb-2">
                      <Plus className="w-6 h-6" />
                    </div>
                    <h4 className="font-display text-xl text-pine font-black uppercase tracking-wide font-mono">
                      Host Recall Arena
                    </h4>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Initialize a brand new real-time review room. You control question loading, timers, and revealed answers.
                    </p>
                  </div>

                  <div className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-black text-gray-400 block tracking-widest font-mono">
                        Select Study Deck Resource:
                      </label>
                      <select
                        value={selectedDeckIdForNewRoom}
                        onChange={(e) => setSelectedDeckIdForNewRoom(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-xs font-bold outline-none focus:border-pine focus:bg-white shadow-sm transition"
                      >
                        <option value="">-- Choose a Study Deck --</option>
                        {myCustomDecks.length > 0 && (
                          <optgroup label="My Custom Decks">
                            {myCustomDecks.map(deck => (
                              <option key={deck.id} value={deck.id}>{deck.title} ({deck.cards.length} cards)</option>
                            ))}
                          </optgroup>
                        )}
                        {publicDecks.length > 0 && (
                          <optgroup label="Community Decks">
                            {publicDecks.map(deck => (
                              <option key={deck.id} value={deck.id}>{deck.title} ({deck.cards.length} cards)</option>
                            ))}
                          </optgroup>
                        )}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-black text-gray-400 block tracking-widest font-mono">
                        Arena Difficulty Mode:
                      </label>
                      <select
                        value={roomLobbyMode}
                        onChange={(e) => setRoomLobbyMode(e.target.value as 'multiplayer' | 'solo')}
                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-xs font-bold outline-none focus:border-pine focus:bg-white shadow-sm transition"
                      >
                        <option value="multiplayer">👥 Peer Challenge (Play with Classmates)</option>
                        <option value="solo">🧑‍💻 Solo Arena (Play with AI Virtual Peers)</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-black text-gray-400 block tracking-widest font-mono">
                        Question Timer Duration:
                      </label>
                      <select
                        value={selectedTimerDuration}
                        onChange={(e) => setSelectedTimerDuration(Number(e.target.value))}
                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-xs font-bold outline-none focus:border-pine focus:bg-white shadow-sm transition"
                      >
                        <option value={15}>⚡ 15 Seconds (Blitz Mode)</option>
                        <option value={30}>🔥 30 Seconds (Rapid Mode)</option>
                        <option value={60}>⌛ 60 Seconds (Standard Exam Time)</option>
                      </select>
                    </div>

                    <button
                      onClick={handleCreateRoomFromForm}
                      disabled={sessionRoomLoading || !selectedDeckIdForNewRoom}
                      className="w-full py-3.5 bg-pine hover:bg-pine-mid text-[#fbfdfb] text-xs font-black uppercase tracking-widest rounded-2xl cursor-pointer disabled:opacity-45 shadow-md border-b-4 border-emerald-950 active:border-b-0 active:translate-y-1 transition-all"
                    >
                      Launch Active Lobby Room
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-3xl p-6 flex gap-4 text-amber-900 shadow-xs">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h5 className="font-bold text-sm">Pro Tip: Study Synchronization</h5>
                  <p className="text-xs leading-relaxed opacity-85 mt-0.5">
                    In the Arena, everyone sees the same card at the exact same second. Once you submit your choice, you'll see who else is done. The Answer and Rationalization will reveal automatically once all candidates have submitted!
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
};
