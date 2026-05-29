import { useEffect } from 'react';
import { UserProfile } from '../types';

export function useStudyReminders(profile: UserProfile | null) {
  useEffect(() => {
    if (!profile) return;
    if (typeof window === 'undefined' || !('Notification' in window)) return;
    if (Notification.permission !== 'granted') return;

    const todayStr = new Date().toISOString().split('T')[0];
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      if (key && key.startsWith('bp_reminder_') && !key.startsWith(`bp_reminder_${todayStr}_`)) {
        localStorage.removeItem(key);
      }
    }

    const checkReminders = () => {
      const now = new Date();
      const dateStr = now.toISOString().split('T')[0];
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();

      const events = profile.calendarEvents?.[dateStr] || [];
      for (const evt of events) {
        if (!evt.time) continue;
        const [h, m] = evt.time.split(':').map(Number);
        if (h !== currentHour || m !== currentMinute) continue;

        const sentKey = `bp_reminder_${dateStr}_${evt.id}`;
        if (localStorage.getItem(sentKey)) continue;

        try {
          new Notification('BoardPassPH · Study Reminder', {
            body: evt.title,
            icon: '/favicon.svg',
            badge: '/favicon.svg',
            tag: evt.id,
            data: { url: '/' },
          });
        } catch {
          /* standard browser block construct safeguard */
        }

        fetch(`/api/push/send`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: profile.email,
            title: 'BoardPassPH · Study Reminder',
            body: evt.title,
            data: { url: '/' },
          }),
        }).catch(() => {});

        localStorage.setItem(sentKey, '1');
      }
    };

    checkReminders();
    const interval = setInterval(checkReminders, 30000);
    return () => clearInterval(interval);
  }, [profile]);
}
