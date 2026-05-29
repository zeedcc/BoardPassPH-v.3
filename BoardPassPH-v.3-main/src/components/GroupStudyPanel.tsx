import React, { useState, useEffect, useRef } from 'react';
import { 
  Users, MessageSquare, Send, Copy, Play, Check, XCircle, 
  Sparkles, Share2, LogOut, RefreshCw, AlertCircle, CheckCircle2, Award
} from 'lucide-react';
import { UserProfile, Question } from '../types';
import { db } from '../firebase';
import { 
  collection,
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  onSnapshot, 
  arrayUnion,
  deleteDoc
} from 'firebase/firestore';
import { getRandomLocalQuestion } from '../utils/questionGenerator';

interface GroupStudyPanelProps {
  profile: UserProfile;
  initialRoomId?: string | null;
  onClearRoomParam?: () => void;
}

interface Participant {
  email: string;
  name: string;
  xp: number;
  lastActive: string;
}

interface SubmittedAnswer {
  selectedIndex: number;
  isCorrect: boolean;
  name: string;
  timestamp: string;
}

interface ChatMessage {
  sender: string;
  email: string;
  text: string;
  timestamp: string;
}

interface GroupRoom {
  id: string;
  host: string;
  status: 'waiting' | 'active' | 'completed';
  currentQuestion: Question | null;
  participants: Record<string, Participant>;
  answers: Record<string, SubmittedAnswer>;
  chat: ChatMessage[];
  createdAt: string;
}

interface SessionHistoryEntry {
  roomId: string;
  joinedAt: string;
  role: 'host' | 'participant';
  hostEmail: string;
}

export const GroupStudyPanel: React.FC<GroupStudyPanelProps> = ({ 
  profile, 
  initialRoomId,
  onClearRoomParam 
}) => {
  const [roomId, setRoomId] = useState<string | null>(initialRoomId || null);
  const [room, setRoom] = useState<GroupRoom | null>(null);
  const [joinCodeInput, setJoinCodeInput] = useState('');
  const [chatMessage, setChatMessage] = useState('');
  const [localSelectedAnswer, setLocalSelectedAnswer] = useState<number | null>(null);
  const [isCreatingOrJoining, setIsCreatingOrJoining] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [availableRooms, setAvailableRooms] = useState<GroupRoom[]>([]);
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const [sessionHistory, setSessionHistory] = useState<SessionHistoryEntry[]>([]);

  // Load history on mount and email change
  useEffect(() => {
    const getHist = (): SessionHistoryEntry[] => {
      try {
        const data = localStorage.getItem(`bp_joined_sessions_${profile.email}`);
        return data ? JSON.parse(data) : [];
      } catch (e) {
        return [];
      }
    };
    setSessionHistory(getHist());
  }, [profile.email]);

  const addSessionToHistory = (roomIdClean: string, roleVal: 'host' | 'participant', hostEmailVal: string) => {
    const getHist = (): SessionHistoryEntry[] => {
      try {
        const data = localStorage.getItem(`bp_joined_sessions_${profile.email}`);
        return data ? JSON.parse(data) : [];
      } catch (e) {
        return [];
      }
    };
    const hist = getHist();
    const existingIndex = hist.findIndex(h => h.roomId === roomIdClean);
    let updated: SessionHistoryEntry[] = [];
    if (existingIndex > -1) {
      updated = [...hist];
      updated[existingIndex] = {
        ...updated[existingIndex],
        joinedAt: new Date().toISOString(),
      };
    } else {
      updated = [
        {
          roomId: roomIdClean,
          joinedAt: new Date().toISOString(),
          role: roleVal,
          hostEmail: hostEmailVal,
        },
        ...hist
      ];
    }
    updated = updated.slice(0, 5);
    localStorage.setItem(`bp_joined_sessions_${profile.email}`, JSON.stringify(updated));
    setSessionHistory(updated);
  };

  const removeSessionFromHistory = (roomIdClean: string) => {
    const getHist = (): SessionHistoryEntry[] => {
      try {
        const data = localStorage.getItem(`bp_joined_sessions_${profile.email}`);
        return data ? JSON.parse(data) : [];
      } catch (e) {
        return [];
      }
    };
    const hist = getHist();
    const updated = hist.filter(h => h.roomId !== roomIdClean);
    localStorage.setItem(`bp_joined_sessions_${profile.email}`, JSON.stringify(updated));
    setSessionHistory(updated);
  };

  // Auto scroll chat to bottom
  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [room?.chat]);

  // Handle URL parameter room entry
  useEffect(() => {
    if (initialRoomId) {
      handleJoinRoomById(initialRoomId);
      if (onClearRoomParam) {
        onClearRoomParam();
      }
    }
  }, [initialRoomId]);

  // Sync Room with Firestore in real-time
  useEffect(() => {
    if (!roomId) {
      setRoom(null);
      return;
    }

    const roomRef = doc(db, 'groupRooms', roomId);
    
    // Setup listener
    const unsubscribe = onSnapshot(roomRef, (snapshot) => {
      if (snapshot.exists()) {
        const rawData = snapshot.data();
        setRoom(rawData as GroupRoom);
        setErrorText(null);
      } else {
        setErrorText("This live group study session has been dissolved by the host or does not exist.");
        setRoomId(null);
        setRoom(null);
      }
    }, (err) => {
      console.error("Firestore sync error:", err);
      setErrorText("Database error: Could not synchronize with real-time room statistics.");
    });

    // Write current user as an active participant
    const registerUser = async () => {
      try {
        const emailClean = profile.email.replace(/\./g, '_');
        await updateDoc(roomRef, {
          [`participants.${emailClean}`]: {
            email: profile.email,
            name: profile.username || profile.email.split('@')[0],
            xp: profile.totalXp,
            lastActive: new Date().toISOString()
          }
        });
      } catch (err) {
        console.warn("Could not register participant context:", err);
      }
    };
    registerUser();

    return () => {
      unsubscribe();
    };
  }, [roomId, profile.email, profile.username, profile.totalXp]);

  useEffect(() => {
    const roomsRef = collection(db, 'groupRooms');
    const unsubscribe = onSnapshot(roomsRef, (snapshot) => {
      const rooms = snapshot.docs
        .map((doc) => ({ id: doc.id, ...(doc.data() as Omit<GroupRoom, 'id'>) } as GroupRoom))
        .filter((room) => room.status !== 'completed');
      setAvailableRooms(rooms);
    }, (err) => {
      console.error('Firestore room directory error:', err);
    });
    return () => unsubscribe();
  }, []);

  const generateRoomCode = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let code = 'BP-';
    for (let i = 0; i < 4; i++) {
      code += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    code += Math.floor(100 + Math.random() * 900); // Add 3 digits
    return code;
  };

  const handleCreateRoom = async () => {
    // Check 5-session limit
    const getHist = (): SessionHistoryEntry[] => {
      try {
        const data = localStorage.getItem(`bp_joined_sessions_${profile.email}`);
        return data ? JSON.parse(data) : [];
      } catch (e) {
        return [];
      }
    };
    const hist = getHist();
    if (hist.length >= 5) {
      setErrorText("You have reached the limit of 5 live sessions. Please remove some from your History section first to start a new one.");
      return;
    }

    setIsCreatingOrJoining(true);
    setErrorText(null);
    const code = generateRoomCode();
    
    // Choose a random psychological assessment question for slot 1
    const firstQ = getRandomLocalQuestion('assessment', 'medium');

    const newRoomPayload: GroupRoom = {
      id: code,
      host: profile.email,
      status: 'waiting',
      currentQuestion: firstQ,
      participants: {},
      answers: {},
      chat: [
        {
          sender: "BoardPassPH AI Monitor",
          email: "bot@boardpassph.com",
          text: `Welcome to Live Group Room ${code}! Share the link or code with your peers to begin reviewing together!`,
          timestamp: new Date().toISOString()
        }
      ],
      createdAt: new Date().toISOString()
    };

    try {
      await setDoc(doc(db, 'groupRooms', code), newRoomPayload);
      addSessionToHistory(code, 'host', profile.email);
      setRoomId(code);
    } catch (err: any) {
      console.error("Create room failed:", err);
      setErrorText("Could not provision dynamic group session in cloud database.");
    } finally {
      setIsCreatingOrJoining(false);
    }
  };

  const handleJoinRoomById = async (code: string) => {
    const cleanCode = code.toUpperCase().trim();
    if (!cleanCode) return;

    // Check 5-session limit (only reject if they are not already a member)
    const getHist = (): SessionHistoryEntry[] => {
      try {
        const data = localStorage.getItem(`bp_joined_sessions_${profile.email}`);
        return data ? JSON.parse(data) : [];
      } catch (e) {
        return [];
      }
    };
    const hist = getHist();
    const isAlreadyMember = hist.some(h => h.roomId === cleanCode);

    if (!isAlreadyMember && hist.length >= 5) {
      setErrorText("You have reached the limit of 5 live sessions. Please remove some from your History section first to join a new one.");
      return;
    }

    setIsCreatingOrJoining(true);
    setErrorText(null);

    try {
      const roomRef = doc(db, 'groupRooms', cleanCode);
      const snapshot = await getDoc(roomRef);

      if (snapshot.exists()) {
        const roomData = snapshot.data() as GroupRoom;
        addSessionToHistory(cleanCode, roomData.host === profile.email ? 'host' : 'participant', roomData.host);
        setRoomId(cleanCode);
      } else {
        setErrorText(`Room session with code "${cleanCode}" was not found.`);
      }
    } catch (err) {
      console.error("Failed to join room:", err);
      setErrorText("Networking failure: Could not verify room code.");
    } finally {
      setIsCreatingOrJoining(false);
    }
  };

  const handleLeaveRoom = async () => {
    if (!roomId || !room) return;
    
    // If hosts leaves, we can prompt or cleanly dissolve. For simple live logic,
    // if guest leaves, delete their participant status. If host leaves, keep room but remove host flag.
    const emailClean = profile.email.replace(/\./g, '_');
    const roomRef = doc(db, 'groupRooms', roomId);

    try {
      if (room.host === profile.email) {
        // Host leaves: Dissolve entirely to keep Firebase DB clean
        await deleteDoc(roomRef);
      } else {
        // Guest leaves: Remove item
        await updateDoc(roomRef, {
          [`participants.${emailClean}`]: null
        });
      }
    } catch (err) {
      console.warn("Clean disconnect failed:", err);
    }

    setRoomId(null);
    setRoom(null);
    setLocalSelectedAnswer(null);
  };

  const handleSendChatMsg = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim() || !roomId) return;

    const textToSend = chatMessage.trim();
    setChatMessage('');

    const roomRef = doc(db, 'groupRooms', roomId);
    try {
      await updateDoc(roomRef, {
        chat: arrayUnion({
          sender: profile.username || profile.email.split('@')[0],
          email: profile.email,
          text: textToSend,
          timestamp: new Date().toISOString()
        })
      });
    } catch (err) {
      console.error("Failed to post chat message:", err);
    }
  };

  const handleSelectAnswer = async (index: number) => {
    if (!roomId || !room || !room.currentQuestion || localSelectedAnswer !== null) return;
    
    setLocalSelectedAnswer(index);
    const emailClean = profile.email.replace(/\./g, '_');
    const isCorrect = index === room.currentQuestion.correctIndex;
    const roomRef = doc(db, 'groupRooms', roomId);

    try {
      await updateDoc(roomRef, {
        [`answers.${emailClean}`]: {
          selectedIndex: index,
          isCorrect,
          name: profile.username || profile.email.split('@')[0],
          timestamp: new Date().toISOString()
        }
      });
    } catch (err) {
      console.error("Failed to store answers:", err);
    }
  };

  const handleHostNextQuestion = async () => {
    if (!roomId || !room) return;

    const roomRef = doc(db, 'groupRooms', roomId);
    setLocalSelectedAnswer(null);

    // Let's alternate questioning subjects for live sessions: assessment, clinical, dev, logic
    const categories: ('assessment' | 'dsm5' | 'dev' | 'io')[] = ['assessment', 'dsm5', 'dev', 'io'];
    const randomCat = categories[Math.floor(Math.random() * categories.length)];
    const q = getRandomLocalQuestion(randomCat, 'medium');

    try {
      await updateDoc(roomRef, {
        currentQuestion: q,
        answers: {}, // Flush everyone's responses for the next round!
        status: 'active'
      });
    } catch (err) {
      console.error("Failed to update host question:", err);
    }
  };

  const handleHostStartExam = async () => {
    if (!roomId) return;
    const roomRef = doc(db, 'groupRooms', roomId);
    try {
      await updateDoc(roomRef, {
        status: 'active'
      });
    } catch (err) {
      console.error("Start exam update failed:", err);
    }
  };

  const handleCopyCode = () => {
    if (!roomId) return;
    navigator.clipboard.writeText(roomId);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyLink = () => {
    if (!roomId) return;
    const directLink = `${window.location.origin}?room=${roomId}`;
    navigator.clipboard.writeText(directLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Extract participants list
  const activeParticipants = room ? (Object.values(room.participants) as Participant[]).filter(Boolean) : [];
  const submittedAnswers = room ? (Object.values(room.answers) as SubmittedAnswer[]).filter(Boolean) : [];
  const currentQuestion = room?.currentQuestion;

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      {!roomId ? (
        <div className="bg-gradient-to-br from-pine to-pine-mid rounded-2xl p-6 text-cream relative overflow-hidden select-none border border-pine-light/25">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
          <div className="relative z-10 space-y-2">
            <span className="text-[9px] uppercase tracking-[0.25em] font-extrabold text-mint bg-pine px-3 py-1 rounded-full w-max block border border-pine-light/20">
              BoardPassPH Multicast Study
            </span>
            <h2 className="font-display text-2xl tracking-tight leading-tight md:text-3xl">
              Live Group Review Arena
            </h2>
            <p className="text-xs text-mint/80 max-w-xl leading-relaxed">
              Review Board diagnostics in perfect real-time synchronization. Host a board room, generate instant joining credentials, chat live, and analyze mock solutions together.
            </p>
          </div>
        </div>
      ) : null}

      {/* Main Error Alert */}
      {errorText && (
        <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-xl flex gap-3 items-start animate-fade-in text-xs font-semibold">
          <AlertCircle className="w-4 h-4 text-rose-500 mt-0.5 flex-shrink-0" />
          <div>{errorText}</div>
        </div>
      )}

      {/* LOBBY VIEW - Creation & Joining Panel */}
      {!roomId ? (
        <div className="space-y-4">
          {profile?.tier?.toLowerCase().includes('trial') && (
            <div className="bg-emerald-50/50 border border-emerald-250 rounded-2xl p-4 flex gap-3 text-emerald-950 text-xs leading-relaxed font-sans select-text">
              <Users className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">🌟 Group Review Arena: Clinical Trial Mode Active</span>
                <p className="mt-0.5">Live Firebase synchronizations are active. Classrooms can host or join review sessions with classmates in real-time. All available rooms are listed below so you can jump back into the right study group instantly.</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-5 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <span className="text-[9px] uppercase font-extrabold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-100 w-max block select-none">
                Start a Board Room
              </span>
              <h3 className="font-display text-lg text-pine leading-snug">
                Host a Live Review Session
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Generate a secure room session code in our dynamic Firebase server slot. You will control question loading, option reveals, and timer triggers.
              </p>
            </div>
            <button
              onClick={handleCreateRoom}
              disabled={isCreatingOrJoining}
              className="w-full mt-4 py-3 bg-pine hover:bg-pine-mid text-cream text-xs font-black uppercase tracking-widest rounded-xl transition cursor-pointer select-none border-b-2 border-pine-mid disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isCreatingOrJoining ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-mint" />
                  <span>Configuring Server...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-mint animate-pulse" />
                  <span>Create Live Session</span>
                </>
              )}
            </button>
          </div>

          <div className="md:col-span-7 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="space-y-1">
              <span className="text-[9px] uppercase font-extrabold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100 w-max block select-none">
                Join Session
              </span>
              <h3 className="font-display text-lg text-pine leading-snug">
                Enter Peer Board Room
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Enter the unique study room code generated by your classmates to join their live testing lobby.
              </p>
            </div>

            <div className="pt-2">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleJoinRoomById(joinCodeInput);
                }} 
                className="flex gap-2.5"
              >
                <input
                  type="text"
                  required
                  placeholder="e.g. BP-ABCD123"
                  value={joinCodeInput}
                  onChange={(e) => setJoinCodeInput(e.target.value)}
                  className="bg-foam border border-pine/15 rounded-xl px-4 py-3 text-sm font-bold uppercase tracking-widest text-pine placeholder-pine/40 outline-none w-full focus:border-pine focus:ring-1 focus:ring-pine/20 font-mono"
                />
                <button
                  type="submit"
                  disabled={isCreatingOrJoining || !joinCodeInput.trim()}
                  className="bg-indigo-600 hover:bg-indigo-700 text-cream px-6 rounded-xl text-xs font-black uppercase tracking-widest border-b-2 border-indigo-800 transition disabled:opacity-40"
                >
                  Join
                </button>
              </form>
            </div>

            <div className="border-t border-gray-100 pt-4 space-y-4 select-none">
              <div>
                <span className="text-[10px] uppercase font-black tracking-wider text-gray-450 font-mono">
                  📚 Available Group Study Sessions
                </span>
                <div className="mt-3 grid gap-3 max-h-[200px] overflow-y-auto pr-1">
                  {availableRooms.length > 0 ? (
                    availableRooms.map((session) => {
                      const hostName = session.host.split('@')[0];
                      const participantsCount = session.participants ? Object.values(session.participants).filter(Boolean).length : 0;

                      return (
                        <div key={session.id} className="border border-gray-200 rounded-2xl p-3 bg-white shadow-sm flex flex-col gap-2 text-xs">
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <div className="font-bold text-pine">{session.id}</div>
                              <div className="text-gray-500">Host: {hostName}</div>
                            </div>
                            <span className="text-[10px] uppercase tracking-wider text-slate-500">{session.status}</span>
                          </div>
                          <div className="flex items-center justify-between gap-3 text-[10px] text-gray-600">
                            <span>{participantsCount} active {participantsCount === 1 ? 'member' : 'members'}</span>
                            <button
                              type="button"
                              onClick={() => handleJoinRoomById(session.id)}
                              disabled={isCreatingOrJoining}
                              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-cream rounded-full text-[10px] font-semibold transition disabled:opacity-50"
                            >
                              Join
                            </button>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-gray-400 text-[10px]">No active group rooms found yet. Create one or enter a code to join your peers.</div>
                  )}
                </div>
              </div>

              <span className="text-[9px] uppercase font-black tracking-wider text-gray-450 font-mono">
                🚀 Dynamic Features Available:
              </span>
              <div className="grid grid-cols-2 gap-3 text-[11px] text-gray-500 font-medium">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Synchronized Question Cards</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Peer Response Statistics</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Integrated Study Chatbox</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Real-time Sync via Firebase</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- Joined Sessions History Section --- */}
        <div id="joined-sessions-history" className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[9px] uppercase font-extrabold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-100 w-max block select-none">
                Lobby Register
              </span>
              <h3 className="font-display text-lg text-pine leading-snug">
                Your Joined Sessions History
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                A persistent ledger of the live board rooms you have hosted or joined. Capped at <span className="font-bold text-pine">5 sessions maximum</span>.
              </p>
            </div>
            <div className="text-left sm:text-right shrink-0">
              <span className="text-xs font-mono font-bold text-gray-500 px-3 py-1 bg-gray-100 rounded-full">
                {sessionHistory.length} / 5 Slots Used
              </span>
              <div className="w-24 bg-gray-100 h-1.5 rounded-full mt-2 overflow-hidden">
                <div 
                  className={`h-full transition-all duration-300 ${
                    sessionHistory.length >= 5 ? 'bg-rose-500' : 'bg-[#2f4939]'
                  }`} 
                  style={{ width: `${(sessionHistory.length / 5) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sessionHistory.length > 0 ? (
              sessionHistory.map((h) => {
                const dateStr = new Date(h.joinedAt).toLocaleDateString([], {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                });

                return (
                  <div 
                    key={h.roomId} 
                    className="border border-gray-200 rounded-xl p-4 bg-gray-50/50 hover:bg-gray-50 transition flex items-center justify-between gap-4 font-sans font-medium text-xs"
                  >
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-sm font-black text-pine select-all">
                          {h.roomId}
                        </span>
                        <span className={`text-[9px] uppercase tracking-wider px-2 py-0.5 rounded font-extrabold border ${
                          h.role === 'host' 
                            ? 'bg-amber-50 text-amber-800 border-amber-100' 
                            : 'bg-indigo-50 text-indigo-800 border-indigo-100'
                        }`}>
                          {h.role === 'host' ? 'Host' : 'Peer'}
                        </span>
                      </div>
                      <div className="text-[10px] text-gray-400">
                        Joined: {dateStr}
                      </div>
                      <div className="text-[10px] text-gray-500 truncate" title={h.hostEmail}>
                        Host: {h.hostEmail}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleJoinRoomById(h.roomId)}
                        disabled={isCreatingOrJoining}
                        className="px-3 py-1.5 bg-[#2f4939] hover:bg-[#1a3022] text-cream rounded-lg text-xs font-black uppercase tracking-wider transition inline-flex items-center gap-1 cursor-pointer disabled:opacity-50"
                      >
                        <Play className="w-3 h-3 text-mint" />
                        <span>Rejoin</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => removeSessionFromHistory(h.roomId)}
                        className="p-1.5 hover:bg-rose-50 text-gray-400 hover:text-rose-600 rounded-lg transition shrink-0 cursor-pointer"
                        title="Remove from history"
                      >
                        <XCircle className="w-4.5 h-4.5" />
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full border border-dashed border-gray-200 rounded-xl py-8 text-center text-xs text-gray-400">
                <AlertCircle className="w-5 h-5 mx-auto mb-2 text-gray-300" />
                No joined sessions recorded in your register. Host or join a session to start tracking!
              </div>
            )}
          </div>
        </div>
        {/* --- End Joined Sessions History Section --- */}

      </div>
      ) : (
        /* ROOM VIEWS (Waiting or Active) */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Study Desk Area */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-4">
              {/* Header inside active room */}
              <div className="flex justify-between items-center border-b border-gray-100 pb-3 flex-wrap gap-2 select-none">
                <div className="space-y-0.5">
                  <span className="text-[9px] uppercase font-black text-gray-400 font-mono block">
                    Dynamic Lobby Code
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-black text-pine font-mono select-all">
                      {roomId}
                    </span>
                    <button
                      onClick={handleCopyCode}
                      className="p-1 hover:bg-gray-100 rounded text-sage hover:text-pine transition"
                      title="Copy Code"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    {copiedCode && (
                      <span className="text-[9px] text-emerald-600 font-bold font-mono animate-pulse">Copied!</span>
                    )}
                  </div>
                </div>

                {/* Direct link generator */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyLink}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-[10px] font-bold text-pine rounded-lg border border-gray-200 transition"
                  >
                    <Share2 className="w-3 h-3 text-sage" />
                    <span>{copiedLink ? "Link Copied!" : "Copy Joining Link"}</span>
                  </button>

                  <button
                    onClick={handleLeaveRoom}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-[10px] font-bold text-rose-700 rounded-lg border border-rose-150 transition"
                    title="Leave Room"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>{room?.host === profile.email ? "Dissolve" : "Leave"}</span>
                  </button>
                </div>
              </div>

              {/* Waiting Lobby */}
              {room?.status === 'waiting' && (
                <div className="py-12 text-center space-y-4 max-w-md mx-auto select-none">
                  <div className="w-16 h-16 bg-pine/5 border border-pine/10 text-pine rounded-full flex items-center justify-center mx-auto animate-bounce">
                    <Users className="w-8 h-8 text-sage" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-pine uppercase tracking-wider font-mono">
                      Waiting for Reviewees to Join...
                    </h4>
                    <p className="text-xs text-gray-500">
                      Share the slot credentials shown above. Once your study group is settled, the Host can jumpstart the exam session.
                    </p>
                  </div>

                  {room.host === profile.email ? (
                    <button
                      onClick={handleHostStartExam}
                      className="px-8 py-3 bg-pine hover:bg-pine-mid text-cream text-xs font-black uppercase tracking-widest rounded-xl transition cursor-pointer border-b-2 border-pine-mid inline-flex items-center gap-2 shadow-sm"
                    >
                      <Play className="w-3.5 h-3.5 text-mint" />
                      <span>Start Study Session</span>
                    </button>
                  ) : (
                    <div className="text-[10px] text-gray-400 font-bold tracking-widest font-mono uppercase animate-pulse">
                      Waiting for host to begin...
                    </div>
                  )}
                </div>
              )}

              {/* Active Quiz Session */}
              {room?.status === 'active' && currentQuestion && (
                <div className="space-y-5">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase font-mono tracking-widest text-[#2f4939] bg-foam/50 px-3.5 py-2 rounded-xl border border-pine/5 select-none">
                    <span className="truncate">🎯 Category: {currentQuestion.category}</span>
                    <span className="flex-shrink-0 bg-mint/5 px-2 py-0.5 rounded text-pine">
                      Active Board Question
                    </span>
                  </div>

                  <div className="bg-foam/20 border border-pine/5 p-4.5 rounded-2xl">
                    <p className="text-xs md:text-sm text-pine font-medium leading-relaxed font-sans select-text">
                      {currentQuestion.vignette}
                    </p>
                  </div>

                  {/* Multiple Choice Options List */}
                  <div className="space-y-2.5">
                    {currentQuestion.options.map((option, idx) => {
                      const isSelectedBySelf = localSelectedAnswer === idx;
                      const hasSubmitted = localSelectedAnswer !== null;
                      
                      let optionBg = 'bg-white hover:bg-foam/20 hover:scale-[1.005]';
                      let borderBorder = 'border-gray-200';
                      let iconColor = 'text-gray-300';

                      if (isSelectedBySelf) {
                        optionBg = 'bg-[#e2efe6] text-pine';
                        borderBorder = 'border-pine-light ring-2 ring-pine/5';
                        iconColor = 'text-pine';
                      } else if (hasSubmitted) {
                        optionBg = 'bg-gray-50 text-gray-400 cursor-not-allowed';
                        borderBorder = 'border-gray-150';
                      }

                      return (
                        <button
                          key={idx}
                          disabled={hasSubmitted}
                          onClick={() => handleSelectAnswer(idx)}
                          className={`w-full text-left flex items-start gap-3.5 px-4 py-3 border rounded-xl text-xs font-bold transition-all duration-150 relative cursor-pointer select-none ${optionBg} ${borderBorder}`}
                        >
                          <div className={`w-5 h-5 rounded-lg border flex items-center justify-center font-mono font-bold text-[11px] uppercase ${isSelectedBySelf ? 'bg-pine text-white border-transparent' : 'bg-gray-50 text-gray-500'} flex-shrink-0 mt-0.5`}>
                            {String.fromCharCode(65 + idx)}
                          </div>
                          <span className="leading-relaxed">{option}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Answers Feedback / Reveal Panel */}
                  {localSelectedAnswer !== null && (
                    <div className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-4 space-y-3 animate-in slide-in-from-bottom-3 duration-200">
                      <div className="flex gap-2.5 items-start">
                        <Award className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="text-xs font-bold text-emerald-900 leading-tight">
                            Answer Logged on Cloud Server!
                          </h4>
                          <p className="text-[10px] text-emerald-800/80 leading-relaxed mt-1">
                            Your choice has been transmitted to your board room peers. Continue chatting below while the remaining candidates record their solutions.
                          </p>
                        </div>
                      </div>

                      <div className="bg-white/70 p-3 rounded-lg border border-emerald-100 text-xs text-pine-mid leading-relaxed">
                        <span className="font-mono font-bold text-[#142d1f] uppercase text-[9px] block mb-1">Board Solution Explanation:</span>
                        {currentQuestion.explanation}
                      </div>
                    </div>
                  )}

                  {/* Host Controller Panel */}
                  {room.host === profile.email && (
                    <div className="border-t border-gray-100 pt-4 flex justify-between items-center select-none flex-wrap gap-2">
                      <div className="text-[10px] font-mono text-gray-400">
                        Host Control Session
                      </div>
                      <button
                        onClick={handleHostNextQuestion}
                        className="px-5 py-2.5 bg-pine hover:bg-pine-mid text-cream text-[11px] font-black uppercase tracking-wider rounded-lg transition cursor-pointer border-b-2 border-pine-mid inline-flex items-center gap-1.5"
                      >
                        <RefreshCw className="w-3.5 h-3.5 text-mint" />
                        <span>Next Group Question</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right hand Panel: Active Peers & Chatroom */}
          <div className="lg:col-span-4 space-y-6 flex flex-col justify-between">
            {/* Real-time Peers Grid */}
            <div className="bg-white border border-gray-200 rounded-2xl p-4.5 shadow-sm space-y-3.5 select-none">
              <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                <span className="text-[10px] uppercase font-black tracking-wider text-pine font-mono block">
                  Active Reviewees ({activeParticipants.length})
                </span>
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
              </div>

              <div className="space-y-2.5 max-h-[160px] overflow-y-auto pr-1">
                {activeParticipants.map((p, i) => {
                  const hasAnswered = room?.answers && room.answers[p.email.replace(/\./g, '_')];
                  const submittedVal = room?.answers?.[p.email.replace(/\./g, '_')];
                  
                  return (
                    <div key={i} className="flex justify-between items-center bg-foam/20 p-2 rounded-xl border border-pine/5 text-xs font-semibold">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-pine/10 text-pine text-[10px] font-bold flex items-center justify-center border border-pine/5 font-mono">
                          {p.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-pine block max-w-[120px] truncate">{p.name} {p.email === room?.host && "👑"}</span>
                          <span className="text-[9px] text-gray-400 font-mono block">{p.xp} XP</span>
                        </div>
                      </div>

                      <div>
                        {hasAnswered ? (
                          <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center gap-1`}>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span>Done</span>
                          </span>
                        ) : (
                          <span className="text-[9px] text-gray-400 font-bold tracking-widest font-mono uppercase animate-pulse">
                            Thinking...
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Chatbox Container */}
            <div className="bg-white border border-gray-200 rounded-2xl p-4.5 shadow-sm flex flex-col h-[320px] justify-between space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-100 select-none">
                <MessageSquare className="w-4 h-4 text-sage" />
                <span className="text-[10px] uppercase font-black tracking-wider text-pine font-mono block">
                  Study Room Discussion
                </span>
              </div>

              {/* Chat messages box */}
              <div className="space-y-2.5 overflow-y-auto flex-1 pr-1 pb-2 scrollbar-none">
                {room?.chat && room.chat.length > 0 ? (
                  room.chat.slice(-50).map((msg, i) => {
                    const isSelf = msg.email === profile.email;
                    const isSystem = msg.email === "bot@boardpassph.com";

                    if (isSystem) {
                      return (
                        <div key={i} className="bg-amber-50/50 border border-amber-100/50 p-2 rounded-lg text-[10px] text-amber-900 leading-normal select-none">
                          {msg.text}
                        </div>
                      );
                    }

                    return (
                      <div key={i} className={`flex flex-col ${isSelf ? 'items-end' : 'items-start'} max-w-[90%] ${isSelf ? 'ml-auto' : ''}`}>
                        <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest font-mono px-1">
                          {msg.sender}
                        </span>
                        <div className={`p-2.5 rounded-2xl text-[11px] leading-relaxed mt-0.5 ${
                          isSelf 
                            ? 'bg-pine text-cream rounded-tr-none font-bold' 
                            : 'bg-foam text-pine rounded-tl-none font-medium'
                        }`}>
                          {msg.text}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-12 text-[10.5px] text-gray-400 font-mono select-none">
                    Discussion is active. Introduce yourself!
                  </div>
                )}
                <div ref={chatBottomRef} />
              </div>

              {/* Message inputs form */}
              <form onSubmit={handleSendChatMsg} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type message..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  className="bg-foam/60 border border-pine/10 pl-3 pr-3 py-2 text-xs text-pine placeholder-pine-mid/30 rounded-xl outline-none flex-1 focus:border-pine font-mono"
                />
                <button
                  type="submit"
                  disabled={!chatMessage.trim()}
                  className="p-2.5 bg-pine hover:bg-pine-mid text-cream rounded-xl transition cursor-pointer disabled:opacity-45"
                >
                  <Send className="w-3.5 h-3.5 text-mint" />
                </button>
              </form>
            </div>

          </div>

        </div>
      )}
    </div>
  );
};
