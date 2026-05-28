import React, { useEffect } from 'react';
import { Megaphone, Calendar, Clock, Link as LinkIcon, Info } from 'lucide-react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const BULLETINS: any[] = [];

export const AnnouncementsPanel: React.FC = () => {
  const [customAnnouncements, setCustomAnnouncements] = React.useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('bp_custom_announcements');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const fetchLiveAnnouncements = async () => {
      try {
        // Query prevention throttling: Only fetch from live firestore once every 5 minutes (300,000 ms)
        const lastSync = localStorage.getItem('bp_announcements_last_sync');
        const now = Date.now();
        if (lastSync && now - parseInt(lastSync, 10) < 300000) {
          // Use cached results
          const saved = localStorage.getItem('bp_custom_announcements');
          if (saved) {
            setCustomAnnouncements(JSON.parse(saved));
            return;
          }
        }

        const snapshot = await getDocs(collection(db, 'custom_announcements'));
        const fbList: any[] = [];
        snapshot.forEach(doc => {
          fbList.push(doc.data());
        });
        if (fbList.length > 0) {
          setCustomAnnouncements(fbList);
          localStorage.setItem('bp_custom_announcements', JSON.stringify(fbList));
          localStorage.setItem('bp_announcements_last_sync', now.toString());
        }
      } catch (err) {
        console.warn('Could not read announcements from Firestore:', err);
      }
    };
    fetchLiveAnnouncements();
  }, []);

  const mergedBulletins = [...customAnnouncements, ...BULLETINS];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl text-pine">Announcements</h2>
        <p className="text-xs text-gray-500 mt-1 leading-relaxed">
          Stay informed about official announcements, updates, schedule changes, and curriculum notifications.
        </p>
      </div>

      <div className="space-y-4">
        {mergedBulletins.length === 0 ? (
          <div className="bg-white border border-gray-150 rounded-2xl p-8 text-center text-gray-400 font-sans">
            <Megaphone className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <p className="text-xs">No announcements currently posted.</p>
          </div>
        ) : (
          mergedBulletins.map(b => (
            <div 
              key={b.id}
              className="bg-white border border-gray-150 rounded-2xl p-5 hover:shadow-md transition-all duration-150 relative flex gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-foam text-2xl flex items-center justify-center flex-shrink-0 border border-pine/5 shadow-inner select-none pointer-events-none">
                {b.icon || '📢'}
              </div>

              <div className="space-y-2 leading-relaxed">
                <div className="flex flex-wrap items-center gap-2 select-none">
                  <span className={`text-[8px] uppercase tracking-widest font-extrabold px-2.5 py-0.5 rounded-full border ${
                    b.tag === 'REGULATORY' ? 'bg-rose-50 border-rose-100 text-rose-800' :
                    b.tag === 'SYLLABUS' ? 'bg-indigo-50 border-indigo-100 text-[#382B6B]' :
                    'bg-foam border-sage/10 text-pine-light'
                  }`}>
                    {b.tag || 'ANNOUNCEMENT'}
                  </span>

                  <span className="text-[9.5px] text-gray-400 font-mono font-bold flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-sage" />
                    {b.date || 'Today'}
                  </span>
                </div>

                <div>
                  <h4 className="font-heading font-black text-gray-900 text-sm tracking-tight leading-snug">
                    {b.title}
                  </h4>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed leading-normal font-sans font-medium text-justify select-text whitespace-pre-line">
                    {b.desc}
                  </p>
                </div>

                {b.link && (
                  <div className="pt-2">
                    <a 
                      href={b.link} 
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-[10px] uppercase font-black tracking-wider text-pine hover:underline"
                    >
                      <LinkIcon className="w-3.5 h-3.5 text-sage" />
                      Visit Link ↗
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="bg-foam/25 border border-dashed border-sage/10 rounded-2xl p-4 flex gap-3 text-xs text-pine-mid leading-normal font-mono select-none">
        <Info className="w-4 h-4 text-sage flex-shrink-0 mt-0.5" />
        <p>This announcements section retrieves updates and posts from our real-time database.</p>
      </div>
    </div>
  );
};
