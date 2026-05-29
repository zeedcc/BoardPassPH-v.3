import React, { useState, useMemo } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  Plus, 
  Trash2, 
  Sparkles, 
  Info,
  Clock
} from 'lucide-react';
import { UserProfile } from '../types';
import { DEFAULT_HABIT_DEFINITIONS, getHabitDefinitions, type HabitDefinition } from '../utils/profileHelpers';

interface StudyPlannerPanelProps {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
}

const MOODS = [
  { id: 'motivated', name: 'Motivated', emoji: '🎯', color: 'bg-amber-500 text-white', accent: 'border-amber-200 bg-amber-50/50' },
  { id: 'calm', name: 'Calm', emoji: '🌊', color: 'bg-teal-500 text-white', accent: 'border-teal-200 bg-teal-50/50' },
  { id: 'anxious', name: 'Anxious', emoji: '🧠', color: 'bg-indigo-500 text-white', accent: 'border-indigo-200 bg-indigo-50/50' },
  { id: 'tired', name: 'Tired', emoji: '☕', color: 'bg-orange-500 text-white', accent: 'border-orange-200 bg-orange-50/50' },
  { id: 'sad', name: 'Sad', emoji: '🌧️', color: 'bg-slate-500 text-white', accent: 'border-slate-200 bg-slate-50/50' },
];

export const StudyPlannerPanel: React.FC<StudyPlannerPanelProps> = ({ profile, setProfile }) => {
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(4); 
  const [selectedDateStr, setSelectedDateStr] = useState<string>('2026-05-20');

  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventNote, setNewEventNote] = useState('');
  const [newEventColor, setNewEventColor] = useState('pine');
  const [newEventTime, setNewEventTime] = useState('');
  const [newHabitName, setNewHabitName] = useState('');
  const [newHabitXp, setNewHabitXp] = useState(10);
  const [editingHabitId, setEditingHabitId] = useState<string | null>(null);
  const [editHabitName, setEditHabitName] = useState('');
  const [editHabitXp, setEditHabitXp] = useState(10);
  const [showHabitManager, setShowHabitManager] = useState(false);

  // Core Study Hours Log States
  const [logSubject, setLogSubject] = useState('Developmental Psychology');
  const [logHours, setLogHours] = useState('2');
  const [logDate, setLogDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [logNotes, setLogNotes] = useState('');

  const handleLogHours = (e: React.FormEvent) => {
    e.preventDefault();
    const hoursNum = parseFloat(logHours);
    if (isNaN(hoursNum) || hoursNum <= 0) return;

    const newLogItem = {
      id: Date.now().toString(),
      subjectId: logSubject,
      date: logDate,
      hours: hoursNum,
      notes: logNotes.trim()
    };

    setProfile((prev: any) => {
      const currentLog = prev.studyLog || [];
      const nextLog = [...currentLog, newLogItem];

      const currentHours = prev.studyHours || {};
      const updatedHours = {
        ...currentHours,
        [logSubject]: (currentHours[logSubject] || 0) + hoursNum
      };

      const scoreXp = Math.round(25 * hoursNum);
      const updated = {
        ...prev,
        studyHours: updatedHours,
        studyLog: nextLog,
        totalXp: (prev.totalXp ?? 0) + scoreXp
      };

      localStorage.setItem(`bp_profile_${prev.email}`, JSON.stringify(updated));
      return updated;
    });

    setLogNotes('');
    alert(`📚 Successfully logged ${hoursNum} study hours for ${logSubject}! Clean study habits earned you +${Math.round(hoursNum * 25)} XP towards board preparation.`);
  };

  const handleDeleteLogHours = (id: string) => {
    if (!window.confirm('Are you sure you want to delete this recorded study hours log from your history?')) return;

    setProfile((prev: any) => {
      const currentLog = prev.studyLog || [];
      const itemToDelete = currentLog.find((item: any) => item.id === id);
      if (!itemToDelete) return prev;

      const nextLog = currentLog.filter((item: any) => item.id !== id);

      const currentHours = prev.studyHours || {};
      const updatedHours = {
        ...currentHours,
        [itemToDelete.subjectId]: Math.max(0, (currentHours[itemToDelete.subjectId] || 0) - itemToDelete.hours)
      };

      const updated = {
        ...prev,
        studyHours: updatedHours,
        studyLog: nextLog
      };

      localStorage.setItem(`bp_profile_${prev.email}`, JSON.stringify(updated));
      return updated;
    });
  };

  const habitDefinitions = useMemo(() => getHabitDefinitions(profile), [profile.habitDefinitions]);

  const initializedEvents = useMemo(() => {
    const custom = profile.calendarEvents || {};
    
    if (Object.keys(custom).length > 0) {
      return custom;
    }

    return {
      '2026-05-20': [
        { id: 'm1', title: '🚀 BoardPassPH Review Started', note: 'Diagnose learning baselines & activate index cards.', color: 'pine' }
      ],
      '2026-06-25': [
        { id: 'm2', title: '⏱️ Mid-review 100-item Mock Simulation', note: 'Test compliance to strict board bounds and speed metrics.', color: 'indigo' }
      ],
      '2026-07-15': [
        { id: 'm3', title: '🎯 Comprehensive Assessment Board', note: 'Targeting psychological evaluations and core testing guidelines.', color: 'amber' }
      ],
      '2026-08-18': [
        { id: 'm4', title: '🕯️ Pre-Exam Focus & Mindfulness', note: 'Review notes briefly, prepare gear/calculators, sleep early.', color: 'rose' }
      ],
      '2026-08-19': [
        { id: 'm5', title: '🏁 PRC PmLE Board Exam — Day 1', note: 'Abnormal Psychology & Theories of Personality. Rise and shine!', color: 'rose' }
      ],
      '2026-08-20': [
        { id: 'm6', title: '🏁 PRC PmLE Board Exam — Day 2', note: 'Psychological Assessment & Industrial Psychology. Finish with absolute triumph!', color: 'rose' }
      ]
    };
  }, [profile.calendarEvents]);

  const allActiveUpcomingEvents = useMemo(() => {
    const list: Array<{ id: string; dateStr: string; title: string; note?: string; color: string; time?: string; daysRemaining: number }> = [];
    const today = new Date('2026-05-24');

    Object.entries(initializedEvents).forEach(([dateStr, evts]) => {
      if (!Array.isArray(evts)) return;
      const [y, m, d] = dateStr.split('-');
      const eventDate = new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
      const diffTime = eventDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      evts.forEach((evt: any) => {
        // Show current day, recent days, or future events up to 45 days
        if (diffDays >= -3 && diffDays <= 45) {
          list.push({
            id: evt.id || `evt-${dateStr}-${Math.random()}`,
            dateStr,
            title: evt.title,
            note: evt.note,
            color: evt.color || 'pine',
            time: evt.time,
            daysRemaining: diffDays
          });
        }
      });
    });

    // Sort: closest daysRemaining first
    return list.sort((a, b) => {
      if (a.daysRemaining === 0) return -1;
      if (b.daysRemaining === 0) return 1;
      return Math.abs(a.daysRemaining) - Math.abs(b.daysRemaining);
    });
  }, [initializedEvents]);

  const dailyHabits = useMemo(() => {
    return profile.habitsChecked?.[selectedDateStr] || {};
  }, [profile.habitsChecked, selectedDateStr]);

  const dailyMood = useMemo(() => {
    return profile.moods?.[selectedDateStr] || '';
  }, [profile.moods, selectedDateStr]);

  const calendarCells = useMemo(() => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const startDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();

    const cells = [];

    const prevMonthDaysCount = new Date(currentYear, currentMonth, 0).getDate();
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      const pmDay = prevMonthDaysCount - i;
      const pmMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const pmYear = currentMonth === 0 ? currentYear - 1 : currentYear;
      const dateString = `${pmYear}-${String(pmMonth + 1).padStart(2, '0')}-${String(pmDay).padStart(2, '0')}`;
      cells.push({
        day: pmDay,
        month: pmMonth,
        year: pmYear,
        isCurrentMonth: false,
        dateString
      });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      cells.push({
        day,
        month: currentMonth,
        year: currentYear,
        isCurrentMonth: true,
        dateString
      });
    }

    const totalFilledCells = cells.length;
    const remainingSlots = 42 - totalFilledCells; 
    for (let day = 1; day <= remainingSlots; day++) {
      const nmMonth = currentMonth === 11 ? 0 : currentMonth + 1;
      const nmYear = currentMonth === 11 ? currentYear + 1 : currentYear;
      const actualDateStr = `${nmYear}-${String(nmMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      cells.push({
        day,
        month: nmMonth,
        year: nmYear,
        isCurrentMonth: false,
        dateString: actualDateStr
      });
    }

    return cells;
  }, [currentYear, currentMonth]);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };

  const handleSelectDay = (dateStr: string) => {
    setSelectedDateStr(dateStr);
    setNewEventTitle('');
    setNewEventNote('');
  };

  const handleToggleHabit = (habitId: string, habitName: string, xpReward: number) => {
    const updatedHabits = { ...profile.habitsChecked };
    if (!updatedHabits[selectedDateStr]) {
      updatedHabits[selectedDateStr] = {};
    }

    const wasChecked = !!updatedHabits[selectedDateStr][habitId];
    updatedHabits[selectedDateStr][habitId] = !wasChecked;

    setProfile(prev => {
      const currentXp = prev.totalXp;
      const newXp = wasChecked ? Math.max(0, currentXp - xpReward) : currentXp + xpReward;

      let newStreak = prev.streak;
      if (!wasChecked) {
        const totalCompletedToday = Object.values(updatedHabits[selectedDateStr]).filter(Boolean).length;
        if (totalCompletedToday === habitDefinitions.length) {
          newStreak += 1;
        }
      }

      const next = {
        ...prev,
        totalXp: newXp,
        streak: newStreak,
        habitsChecked: updatedHabits
      };

      localStorage.setItem(`bp_profile_${prev.email}`, JSON.stringify(next));
      return next;
    });
  };

  const handleSelectMood = (moodId: string) => {
    const updatedMoods = { ...profile.moods };
    const hadMood = updatedMoods[selectedDateStr] === moodId;
    
    if (hadMood) {
      delete updatedMoods[selectedDateStr]; 
    } else {
      updatedMoods[selectedDateStr] = moodId;
    }

    setProfile(prev => {
      const next = {
        ...prev,
        moods: updatedMoods,
        totalXp: hadMood ? prev.totalXp : prev.totalXp + 5 
      };
      localStorage.setItem(`bp_profile_${prev.email}`, JSON.stringify(next));
      return next;
    });
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitle.trim()) return;

    const newEvent = {
      id: 'evt-' + Date.now().toString(36),
      title: newEventTitle.trim(),
      note: newEventNote.trim() || undefined,
      color: newEventColor,
      time: newEventTime || undefined,
    };

    const currentDayEvents = initializedEvents[selectedDateStr] || [];
    const updatedEvents = {
      ...initializedEvents,
      [selectedDateStr]: [...currentDayEvents, newEvent]
    };

    setProfile(prev => {
      const next = {
        ...prev,
        calendarEvents: updatedEvents,
        totalXp: prev.totalXp + 10 
      };
      localStorage.setItem(`bp_profile_${prev.email}`, JSON.stringify(next));
      return next;
    });

    setNewEventTitle('');
    setNewEventNote('');
    setNewEventTime('');
  };

  const handleDeleteEvent = (eventId: string) => {
    const currentDayEvents = initializedEvents[selectedDateStr] || [];
    const updatedDayEvents = currentDayEvents.filter(evt => evt.id !== eventId);
    
    const updatedEvents = { ...initializedEvents };
    if (updatedDayEvents.length === 0) {
      delete updatedEvents[selectedDateStr];
    } else {
      updatedEvents[selectedDateStr] = updatedDayEvents;
    }

    setProfile(prev => {
      const next = {
        ...prev,
        calendarEvents: updatedEvents
      };
      localStorage.setItem(`bp_profile_${prev.email}`, JSON.stringify(next));
      return next;
    });
  };

  const formatFriendlyDate = (dateStr: string) => {
    try {
      const [y, m, d] = dateStr.split('-');
      const dObj = new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
      return dObj.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  const habitsCompletedCount = Object.values(dailyHabits).filter(Boolean).length;

  const persistHabitDefinitions = (defs: HabitDefinition[]) => {
    setProfile(prev => {
      const next = { ...prev, habitDefinitions: defs };
      localStorage.setItem(`bp_profile_${prev.email}`, JSON.stringify(next));
      return next;
    });
  };

  const handleAddHabit = () => {
    const name = newHabitName.trim();
    if (!name) return;
    const id = `habit-${Date.now().toString(36)}`;
    persistHabitDefinitions([...habitDefinitions, { id, name, xp: newHabitXp }]);
    setNewHabitName('');
    setNewHabitXp(10);
  };

  const handleDeleteHabit = (id: string) => {
    if (!confirm('Remove this habit from your checklist?')) return;
    persistHabitDefinitions(habitDefinitions.filter(h => h.id !== id));
  };

  const handleStartEditHabit = (habit: HabitDefinition) => {
    setEditingHabitId(habit.id);
    setEditHabitName(habit.name);
    setEditHabitXp(habit.xp);
  };

  const handleSaveEditHabit = () => {
    if (!editingHabitId || !editHabitName.trim()) return;
    persistHabitDefinitions(
      habitDefinitions.map(h =>
        h.id === editingHabitId ? { ...h, name: editHabitName.trim(), xp: editHabitXp } : h
      )
    );
    setEditingHabitId(null);
  };

  const handleResetHabits = () => {
    if (!confirm('Restore the default habit checklist?')) return;
    persistHabitDefinitions([...DEFAULT_HABIT_DEFINITIONS]);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-pine via-pine-mid to-[#1b2f24] rounded-2xl p-6 text-cream shadow-sm relative overflow-hidden select-none border border-pine-light/10">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FFF_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
        <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-mint/5 blur-2xl" />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-black tracking-widest text-mint font-mono bg-pine-mid/50 px-2.5 py-1 rounded-full border border-pine-light/25">
              🎓 Study Companion Deck
            </span>
            <h2 className="font-display text-2xl sm:text-3xl text-cream tracking-tight leading-tight mt-1.5">
              Habit Tracker &amp; Board Calendar
            </h2>
            <p className="text-[11px] text-sage/85 max-w-lg leading-relaxed font-medium">
              Maintain diagnostic consistency, log emotional progress indices, and schedule psychological milestones leading up to <strong>PmLE 2026</strong>.
            </p>
          </div>
          <div className="bg-pine/60 border border-pine-light/20 rounded-xl p-3 text-center sm:text-right flex-shrink-0 min-w-[120px]">
            <span className="text-[9px] uppercase font-mono text-sage block font-sans">Consistency Streak</span>
            <span className="text-xl font-bold font-mono text-mint flex items-center justify-center sm:justify-end gap-1">
              🔥 {profile.streak} Days
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        <div className="xl:col-span-8 bg-white border border-pine/10 rounded-2xl p-4 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-foam text-pine flex items-center justify-center font-bold">
                <CalendarIcon className="w-4 h-4 text-pine" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-pine uppercase tracking-wider font-mono">
                  {monthNames[currentMonth]} {currentYear}
                </h3>
                <span className="text-[9px] text-gray-400 font-mono italic">
                  *Click any day to logs review stats &amp; custom events
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button 
                onClick={handlePrevMonth}
                type="button"
                className="w-8 h-8 rounded-lg border border-gray-150 hover:bg-gray-50 text-gray-600 flex items-center justify-center cursor-pointer transition active:scale-95"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setCurrentMonth(4); 
                  setCurrentYear(2026);
                  handleSelectDay('2026-05-20');
                }}
                type="button"
                className="text-[10px] font-bold uppercase font-mono px-2.5 py-1.5 rounded-lg border border-gray-150 text-pine bg-foam hover:bg-gray-100 transition active:scale-[0.95] cursor-pointer"
              >
                May &apos;26
              </button>
              <button 
                onClick={handleNextMonth}
                type="button"
                className="w-8 h-8 rounded-lg border border-gray-150 hover:bg-gray-50 text-gray-600 flex items-center justify-center cursor-pointer transition active:scale-95"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <div className="grid grid-cols-7 text-center select-none">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <span key={day} className="text-[9.5px] font-extrabold font-mono text-gray-500 uppercase py-1">
                  {day}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {calendarCells.map((cell, idx) => {
                const isSelected = cell.dateString === selectedDateStr;
                const isToday = cell.dateString === '2026-05-20';
                
                const dayMoodId = profile.moods?.[cell.dateString] || '';
                const dayMoodObj = MOODS.find(m => m.id === dayMoodId);
                
                const dayHabits = profile.habitsChecked?.[cell.dateString] || {};
                const completedHabits = Object.values(dayHabits).filter(Boolean).length;
                
                const cellEvents = initializedEvents[cell.dateString] || [];

                return (
                  <button
                    key={`${cell.dateString}-${idx}`}
                    onClick={() => handleSelectDay(cell.dateString)}
                    type="button"
                    className={`min-h-[75px] max-h-[90px] border rounded-xl p-1.5 text-left flex flex-col justify-between transition-all duration-150 cursor-pointer text-ellipsis overflow-hidden ${
                      cell.isCurrentMonth ? 'bg-white' : 'bg-gray-50/50 opacity-40'
                    } ${
                      isSelected 
                        ? 'border-pine-light ring-2 ring-pine/10 bg-foam/45' 
                        : isToday 
                        ? 'border-mint ring-1 ring-mint/50 bg-foam/30' 
                        : 'border-gray-100 hover:border-pine/20 hover:bg-gray-50/20'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className={`text-[11px] font-black font-mono transition-transform ${
                        isToday ? 'bg-pine text-cream w-5 h-5 rounded-full flex items-center justify-center shadow-sm font-black' : 'text-gray-700'
                      } ${isSelected ? 'scale-110 font-black text-pine' : ''}`}>
                        {cell.day}
                      </span>
                      {dayMoodObj && (
                        <span className="text-[11px] select-none" title={`Logged Mood: ${dayMoodObj.name}`}>
                          {dayMoodObj.emoji}
                        </span>
                      )}
                    </div>

                    <div className="w-full space-y-1 overflow-hidden pointer-events-none">
                      {completedHabits > 0 && (
                        <div className="flex gap-0.5 h-1 items-center bg-gray-100 rounded-full overflow-hidden w-full">
                          {Array.from({ length: habitDefinitions.length }).map((_, hIdx) => (
                            <div 
                              key={hIdx}
                              className={`h-full flex-1 rounded-full ${
                                hIdx < completedHabits 
                                  ? 'bg-emerald-500 shadow-xs' 
                                  : 'bg-transparent'
                              }`} 
                            />
                          ))}
                        </div>
                      )}

                      {cellEvents.map(evt => {
                        let badgeColor = 'bg-pine text-cream';
                        if (evt.color === 'indigo') badgeColor = 'bg-[#382B6B] text-cream';
                        else if (evt.color === 'amber') badgeColor = 'bg-amber-600 text-cream';
                        else if (evt.color === 'rose') badgeColor = 'bg-rose-700 text-cream';
                        
                        return (
                          <div 
                            key={evt.id} 
                            className={`text-[8px] font-extrabold uppercase px-1 py-0.5 rounded leading-tight line-clamp-1 border border-white/10 ${badgeColor}`}
                          >
                            {evt.title}
                          </div>
                        );
                      })}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-sage/5 border border-sage/10 rounded-xl p-3 flex gap-2.5 items-start mt-2">
            <Info className="w-4 h-4 text-sage mt-0.5 flex-shrink-0" />
            <p className="text-[9.5px] text-pine-mid/95 leading-normal font-mono">
              <strong>Interactive Guide</strong>: Add custom review check-ins, mock schedules, and physical rest markers. Every completed review habit on the checklist awards up to <strong>20 XP</strong> directly towards your board exam readiness tier!
            </p>
          </div>
        </div>

        <div className="xl:col-span-4 space-y-6">
          {/* Calendar Events Live Monitor Notification Card */}
          <div className="bg-white border border-rose-200/60 rounded-2xl p-4 shadow-sm space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-rose-800">
                <CalendarIcon className="w-4 h-4 text-rose-600 animate-pulse" />
                <h4 className="text-[11px] font-black uppercase tracking-wider font-mono">
                  🚨 Active Calendar Alarms
                </h4>
              </div>
              <span className="text-[9px] font-mono font-bold bg-rose-50 text-rose-700 border border-rose-100 px-2 py-0.5 rounded-full">
                Active notifications
              </span>
            </div>

            <div className="space-y-2">
              {allActiveUpcomingEvents.length === 0 ? (
                <p className="text-[10px] text-gray-400 italic font-mono text-center py-4 bg-gray-50 rounded-xl border border-gray-100">
                  No upcoming notifications in the next 45 days.
                </p>
              ) : (
                allActiveUpcomingEvents.slice(0, 5).map(evt => {
                  const isToday = evt.daysRemaining === 0;
                  const isNear = evt.daysRemaining > 0 && evt.daysRemaining <= 7;
                  
                  let badgeStyling = "bg-teal-50 text-teal-800 border-teal-100";
                  if (isToday) {
                    badgeStyling = "bg-rose-105 text-rose-700 border-rose-200 uppercase font-black animate-pulse";
                  } else if (isNear) {
                    badgeStyling = "bg-amber-100 text-amber-800 border-amber-200 font-extrabold";
                  }

                  return (
                    <button 
                      key={evt.id} 
                      type="button"
                      onClick={() => {
                        setSelectedDateStr(evt.dateStr);
                        // Jump month and year if needed
                        try {
                          const [y, m] = evt.dateStr.split('-');
                          setCurrentYear(parseInt(y));
                          setCurrentMonth(parseInt(m) - 1);
                        } catch {}
                      }}
                      className={`w-full p-2.5 rounded-xl border border-gray-150 flex items-start gap-2.5 hover:bg-foam/25 cursor-pointer transition active:scale-[0.99] text-left ${
                        isToday ? 'border-rose-200 bg-rose-50/15' : 'bg-white'
                      }`}
                    >
                      <div className="space-y-1 min-w-0 flex-grow">
                        <div className="flex justify-between items-baseline gap-1.5 flex-wrap">
                          <span className="text-[9px] font-mono font-bold text-gray-400">
                            {formatFriendlyDate(evt.dateStr)}
                          </span>
                          <span className={`text-[8.5px] font-mono px-1.5 py-0.2 rounded border ${badgeStyling} leading-none`}>
                            {isToday ? "Happening Today!" : isNear ? `In ${evt.daysRemaining}d` : `In ${evt.daysRemaining} days`}
                          </span>
                        </div>
                        <h5 className="text-[11px] font-extrabold text-gray-800 font-sans leading-snug">
                          {evt.title}
                        </h5>
                        {evt.note && (
                          <p className="text-[9.5px] text-gray-500 font-mono truncate">
                            {evt.note}
                          </p>
                        )}
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          <div className="bg-white border border-pine/10 rounded-2xl p-4 shadow-sm space-y-4">
            <div>
              <span className="text-[8px] uppercase font-black font-mono px-2 py-0.5 bg-pine-mid/5 text-pine rounded-full tracking-wider select-none">
                🗓️ Selected Review Slot
              </span>
              <h4 className="font-display text-base text-pine mt-1.5">
                {formatFriendlyDate(selectedDateStr)}
              </h4>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase text-gray-500 tracking-wide block font-mono">
                Log Mood Tracker
              </label>
              
              <div className="grid grid-cols-5 gap-1">
                {MOODS.map(m => {
                  const isActive = dailyMood === m.id;
                  return (
                    <button
                      key={m.id}
                      onClick={() => handleSelectMood(m.id)}
                      type="button"
                      className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all cursor-pointer select-none ${
                        isActive 
                          ? `${m.color} ring-2 ring-emerald-500/20 scale-105 shadow-sm` 
                          : 'bg-white hover:bg-gray-50 border-gray-150'
                      }`}
                      title={m.name}
                    >
                      <span className="text-sm block">{m.emoji}</span>
                      <span className={`text-[8px] uppercase tracking-tighter mt-1 font-mono leading-none ${isActive ? 'text-white font-bold' : 'text-gray-400'}`}>
                        {m.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2 border-t border-gray-100 pt-3">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-black uppercase text-gray-500 tracking-wide font-mono">
                  Habit Checklist
                </label>
                <span className="text-[9px] font-mono font-bold bg-foam px-2 py-0.5 rounded-full text-pine-mid">
                  {habitsCompletedCount} / {habitDefinitions.length} done
                </span>
              </div>

              <div className="mb-2">
                <button
                  type="button"
                  onClick={() => setShowHabitManager(v => !v)}
                  className="text-[9px] font-black uppercase tracking-wider text-pine hover:underline cursor-pointer"
                >
                  {showHabitManager ? 'Hide habit editor' : 'Add / edit / delete habits'}
                </button>
              </div>

              {showHabitManager && (
                <div className="mb-3 p-3 rounded-xl border border-pine/10 bg-foam/30 space-y-2">
                  <div className="flex gap-2">
                    <input
                      value={newHabitName}
                      onChange={e => setNewHabitName(e.target.value)}
                      placeholder="New habit label"
                      className="flex-1 text-[10px] border rounded-lg px-2 py-1.5"
                    />
                    <input
                      type="number"
                      min={1}
                      max={100}
                      value={newHabitXp}
                      onChange={e => setNewHabitXp(Number(e.target.value))}
                      className="w-14 text-[10px] border rounded-lg px-2 py-1.5"
                      title="XP reward"
                    />
                    <button type="button" onClick={handleAddHabit} className="px-2 py-1.5 bg-pine text-cream text-[9px] font-bold rounded-lg cursor-pointer">Add</button>
                  </div>
                  {habitDefinitions.map(habit => (
                    <div key={habit.id} className="flex items-center gap-2 text-[10px]">
                      {editingHabitId === habit.id ? (
                        <>
                          <input value={editHabitName} onChange={e => setEditHabitName(e.target.value)} className="flex-1 border rounded px-2 py-1" />
                          <input type="number" value={editHabitXp} onChange={e => setEditHabitXp(Number(e.target.value))} className="w-12 border rounded px-1 py-1" />
                          <button type="button" onClick={handleSaveEditHabit} className="text-emerald-700 font-bold cursor-pointer">Save</button>
                          <button type="button" onClick={() => setEditingHabitId(null)} className="text-gray-500 cursor-pointer">Cancel</button>
                        </>
                      ) : (
                        <>
                          <span className="flex-1 truncate font-medium">{habit.name} (+{habit.xp}xp)</span>
                          <button type="button" onClick={() => handleStartEditHabit(habit)} className="text-pine font-bold cursor-pointer">Edit</button>
                          <button type="button" onClick={() => handleDeleteHabit(habit.id)} className="text-rose-600 cursor-pointer"><Trash2 className="w-3 h-3" /></button>
                        </>
                      )}
                    </div>
                  ))}
                  <button type="button" onClick={handleResetHabits} className="text-[9px] text-gray-500 underline cursor-pointer">Reset to defaults</button>
                </div>
              )}

              <div className="space-y-1.5">
                {habitDefinitions.map(habit => {
                  const isChecked = !!dailyHabits[habit.id];
                  
                  return (
                    <button
                      key={habit.id}
                      onClick={() => handleToggleHabit(habit.id, habit.name, habit.xp)}
                      type="button"
                      className={`w-full flex items-center gap-3 p-2.5 rounded-xl border text-left transition duration-150 cursor-pointer select-none ${
                        isChecked 
                          ? 'border-emerald-200 bg-emerald-50/20 text-emerald-950 font-medium' 
                          : 'border-gray-100 bg-white hover:bg-gray-50 text-gray-600'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-md border flex items-center justify-center flex-shrink-0 transition-all ${
                        isChecked 
                          ? 'bg-emerald-500 border-emerald-600 text-white' 
                          : 'border-gray-350 bg-white'
                      }`}>
                        {isChecked && <Check className="w-2.5 h-2.5" />}
                      </div>
                      <div className="flex-1 flex justify-between items-center min-w-0 pr-1">
                        <span className="text-[10.5px] truncate leading-tight transition-transform duration-100">
                          {habit.name}
                        </span>
                        <span className={`text-[8.5px] font-extrabold font-mono rounded px-1 flex-shrink-0 ${isChecked ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-500'}`}>
                          +{habit.xp}xp
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3.5 border-t border-gray-100 pt-3">
              <label className="text-[10px] font-black uppercase text-gray-500 tracking-wide block font-mono">
                Day Schedule &amp; Milestones
              </label>

              <div className="space-y-2">
                {(initializedEvents[selectedDateStr] || []).length === 0 ? (
                  <p className="text-[10px] text-gray-400 italic font-mono text-center py-2">
                    No custom reminders marked for this day.
                  </p>
                ) : (
                  (initializedEvents[selectedDateStr] || []).map(evt => {
                    let borderClass = 'border-l-4 border-l-pine bg-foam/40';
                    if (evt.color === 'indigo') borderClass = 'border-l-4 border-l-[#382B6B] bg-[#f0edf7]';
                    else if (evt.color === 'amber') borderClass = 'border-l-4 border-l-amber-500 bg-amber-50/40';
                    else if (evt.color === 'rose') borderClass = 'border-l-4 border-[#E5526C] bg-rose-50/30';

                    return (
                      <div 
                        key={evt.id} 
                        className={`p-2.5 rounded-xl border border-gray-150/70 flex justify-between items-start gap-2 text-left relative ${borderClass}`}
                      >
                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <h5 className="text-[11px] font-extrabold text-gray-800 uppercase leading-none truncate font-sans">
                              {evt.title}
                            </h5>
                            {evt.time && (
                              <span className="text-[8px] font-mono font-bold text-pine bg-foam px-1.5 py-0.5 rounded-full border border-pine/10 whitespace-nowrap">
                                <Clock className="w-2.5 h-2.5 inline mr-0.5 text-pine/60" />
                                {evt.time}
                              </span>
                            )}
                          </div>
                          {evt.note && (
                            <p className="text-[10px] text-gray-500 leading-normal font-mono select-text truncate">
                              {evt.note}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => handleDeleteEvent(evt.id)}
                          type="button"
                          className="text-gray-400 hover:text-rose-500 p-0.5 rounded cursor-pointer transition flex-shrink-0"
                          title="Delete Milestone"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    );
                  })
                )}
              </div>

              <form onSubmit={handleAddEvent} className="bg-gray-50/50 hover:bg-gray-50 border border-gray-150 rounded-xl p-3 space-y-2.5">
                <span className="text-[9px] uppercase font-bold text-gray-500 tracking-wider flex items-center gap-1 font-mono">
                  <Plus className="w-3 h-3 text-pine" /> Create Study Milestone
                </span>

                <div className="space-y-1.5">
                  <input
                    type="text"
                    required
                    placeholder="Milestone title (e.g. abnormal mock review)"
                    value={newEventTitle}
                    onChange={e => setNewEventTitle(e.target.value)}
                    className="w-full text-[11px] px-2.5 py-1.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-pine/30 placeholder:text-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Brief description / checklist details"
                    value={newEventNote}
                    onChange={e => setNewEventNote(e.target.value)}
                    className="w-full text-[10.5px] px-2.5 py-1.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-pine/30 placeholder:text-gray-400 font-mono"
                  />
                </div>

                <div className="flex gap-2 items-center">
                  <input
                    type="time"
                    value={newEventTime}
                    onChange={e => setNewEventTime(e.target.value)}
                    className="text-[11px] px-2 py-1 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-pine/30"
                  />
                  <span className="text-[9px] text-gray-400 font-mono">Reminder time</span>
                </div>

                <div className="flex gap-2 items-center justify-between">
                  <div className="flex gap-1.5">
                    {[
                      { id: 'pine', class: 'bg-[#1B3518]' },
                      { id: 'indigo', class: 'bg-[#382B6B]' },
                      { id: 'amber', class: 'bg-amber-500' },
                      { id: 'rose', class: 'bg-rose-500' },
                    ].map(col => (
                      <button
                        key={col.id}
                        type="button"
                        onClick={() => setNewEventColor(col.id)}
                        className={`w-3.5 h-3.5 rounded-full text-[6px] text-white flex items-center justify-center transition-all ${col.class} ${
                          newEventColor === col.id ? 'ring-2 ring-offset-1 ring-gray-400 scale-110' : ''
                        }`}
                      >
                        {newEventColor === col.id && '✓'}
                      </button>
                    ))}
                  </div>

                  <button
                    type="submit"
                    className="px-3 py-1 bg-pine text-cream text-[10px] font-bold uppercase tracking-wider rounded-lg hover:bg-pine-mid transition flex items-center gap-1 cursor-pointer select-none"
                  >
                    Add to Calendar
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Card: Study Hours Log per Subject */}
          <div className="bg-white border border-pine/10 rounded-2xl p-4 shadow-sm space-y-4 text-left">
            <div>
              <span className="text-[8px] uppercase font-black font-mono px-2 py-0.5 bg-pine-mid/5 text-pine rounded-full tracking-wider select-none">
                📚 Academic Subject Study Log
              </span>
              <h4 className="font-display text-sm text-pine mt-1.5">
                Log Subject Study Hours
              </h4>
              <p className="text-[10px] text-gray-400 font-sans leading-relaxed">
                Log your daily academic study hours per board subject to track preparation indices.
              </p>
            </div>

            <form onSubmit={handleLogHours} className="space-y-3 font-sans border-t border-gray-50 pt-3">
              <div className="space-y-1">
                <label className="text-[9px] uppercase font-bold text-gray-400 block tracking-wider font-mono">Select Core Subject</label>
                <select
                  value={logSubject}
                  onChange={e => setLogSubject(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs font-bold font-sans outline-none focus:border-pine/30"
                >
                  <option value="Developmental Psychology">🌱 Developmental Psychology</option>
                  <option value="Abnormal Psychology">🔬 Abnormal Psychology</option>
                  <option value="Psychological Assessment">📋 Psychological Assessment</option>
                  <option value="Industrial-Organizational Psychology">💼 Industrial-Organizational Psychology</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[9px] uppercase font-bold text-gray-400 block tracking-wider font-mono">Hours Logged</label>
                  <input
                    type="number"
                    step="0.5"
                    min="0.5"
                    max="16"
                    required
                    value={logHours}
                    onChange={e => setLogHours(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs font-bold outline-none font-mono focus:border-pine/30"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] uppercase font-bold text-gray-400 block tracking-wider font-mono">Date Covered</label>
                  <input
                    type="date"
                    required
                    value={logDate}
                    onChange={e => setLogDate(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-lg px-2 py-1 text-xs font-semibold outline-none font-mono focus:border-pine/30"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] uppercase font-bold text-gray-400 block tracking-wider font-mono">Notes / Lesson Subtopic</label>
                <input
                  type="text"
                  value={logNotes}
                  onChange={e => setLogNotes(e.target.value)}
                  placeholder="e.g. Reviewed Gestalt concept & psychoanalysis"
                  className="w-full bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs outline-none focus:border-pine/30"
                />
              </div>

              <button
                type="submit"
                className="w-full py-1.5 bg-pine hover:bg-pine-mid text-cream text-[10px] font-bold uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Log Study Hours</span>
              </button>
            </form>

            {/* Total aggregates summary */}
            <div className="border-t border-gray-100 pt-3 space-y-2">
              <h5 className="text-[9px] uppercase font-black text-gray-400 tracking-widest font-mono">Log Aggregates per Subject</h5>
              <div className="space-y-1.5 font-mono text-[9px]">
                {[
                  { id: 'Dev', name: 'Developmental Psychology', emoji: '🌱', color: 'bg-green-500' },
                  { id: 'Abnormal', name: 'Abnormal Psychology', emoji: '🔬', color: 'bg-rose-500' },
                  { id: 'Assessment', name: 'Psychological Assessment', emoji: '📋', color: 'bg-indigo-500' },
                  { id: 'IO', name: 'Industrial-Organizational Psychology', emoji: '💼', color: 'bg-emerald-600' }
                ].map((s) => {
                  const hrs = (profile.studyHours?.[s.name] || 0);
                  const maxHrs = Math.max(1, ...Object.values(profile.studyHours || {}).map((v) => typeof v === 'number' ? v : 1));
                  return (
                    <div key={s.id} className="space-y-1">
                      <div className="flex justify-between items-center text-gray-500">
                        <span className="truncate max-w-[180px] block font-sans font-medium text-gray-700 text-left">{s.emoji} {s.name}</span>
                        <strong className="text-gray-800">{hrs.toFixed(1)} hrs</strong>
                      </div>
                      <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full ${s.color}`} style={{ width: `${Math.min(100, (hrs / maxHrs) * 100)}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent logs entries */}
            <div className="border-t border-gray-100 pt-3 space-y-2 max-h-[190px] overflow-y-auto">
              <h5 className="text-[9px] uppercase font-black text-gray-400 tracking-widest font-mono">Recent Study Logs</h5>
              {(!profile.studyLog || profile.studyLog.length === 0) ? (
                <p className="text-[9px] text-gray-400 font-mono italic">No hours have been logged yet for any subject.</p>
              ) : (
                <div className="space-y-2">
                  {profile.studyLog.slice().reverse().map((item: any) => (
                    <div key={item.id} className="border border-gray-100 bg-gray-50/20 rounded-xl p-2 flex justify-between items-start gap-2 bg-white">
                      <div className="space-y-0.5 text-left">
                        <div className="flex items-center gap-1 flex-wrap">
                          <span className="text-[7.5px] font-bold text-pine uppercase bg-foam px-1.5 py-0.5 rounded font-mono truncate max-w-[100px]">
                            {item.subjectId === 'Developmental Psychology' ? '🌱 DevPsych' :
                             item.subjectId === 'Abnormal Psychology' ? '🔬 Abnormal' :
                             item.subjectId === 'Psychological Assessment' ? '📋 Assessment' :
                             '💼 I/O Psych'}
                          </span>
                          <span className="text-[7px] text-gray-400 font-mono">{item.date}</span>
                        </div>
                        <p className="text-[9.5px] text-gray-700 font-sans leading-tight">
                          <strong className="text-pine font-mono">{item.hours} hrs</strong>: {item.notes || 'Routine general study review'}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteLogHours(item.id)}
                        className="p-1 hover:bg-rose-50 rounded-lg hover:text-rose-600 text-gray-300 transition cursor-pointer flex-shrink-0"
                        title="Delete log entry"
                      >
                        <Trash2 className="w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
