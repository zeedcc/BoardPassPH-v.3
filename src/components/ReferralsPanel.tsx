import React, { useState } from 'react';
import { Gift, Copy, Check, Users, Sparkles, UserPlus, Star, Landmark } from 'lucide-react';
import { UserProfile } from '../types';

interface ReferralsPanelProps {
  profile: UserProfile;
  setProfile: (nextVal: React.SetStateAction<UserProfile | null>) => void;
}

export const ReferralsPanel: React.FC<ReferralsPanelProps> = ({ profile, setProfile }) => {
  const [friendEmail, setFriendEmail] = useState('');
  const [friendCode, setFriendCode] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [referralStatusText, setReferralStatusText] = useState<string | null>(null);

  // Generate deterministic unique referral code from email
  const getMyReferralCode = () => {
    const handle = profile.email.split('@')[0].toUpperCase();
    const hash = profile.email.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 1000;
    return `BOARDPASS-${handle}-${hash}`;
  };

  const referralCode = getMyReferralCode();

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Handle invite form submission (simulating sending invitation)
  const handleInviteFriend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!friendEmail.includes('@') || friendEmail.trim().length < 5) {
      alert("⚠️ Please input a valid candidate email address to dispatch the invite link.");
      return;
    }

    if (friendEmail.trim().toLowerCase() === profile.email.toLowerCase()) {
      alert("⚠️ You cannot invite your own clinical candidate account!");
      return;
    }

    const currentReferred = profile.referredEmails || [];
    if (currentReferred.includes(friendEmail.trim().toLowerCase())) {
      alert("⚠️ This board colleague has already been invited or registered using your code.");
      return;
    }

    setProfile(prev => {
      const nextReferred = [...(prev.referredEmails || []), friendEmail.trim().toLowerCase()];
      // Bonus of +25 XP instantly for inviting a colleague!
      const updated = {
        ...prev,
        totalXp: prev.totalXp + 25,
        referredEmails: nextReferred
      };
      localStorage.setItem(`bp_profile_${prev.email}`, JSON.stringify(updated));
      return updated;
    });

    alert(`🎉 Invitation successfully sent to ${friendEmail}! You earned a +25 XP recruitment reward.`);
    setFriendEmail('');
  };

  // Submit friend referral code
  const handleSubmitReferralCode = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = friendCode.trim().toUpperCase();
    if (!cleaned.startsWith('BOARDPASS-')) {
      setReferralStatusText("❌ Invalid referral code configuration. Must look like 'BOARDPASS-USER-###'.");
      return;
    }

    if (cleaned === referralCode) {
      setReferralStatusText("❌ You cannot redeem your own BoardPass code!");
      return;
    }

    if (profile.referralUsed) {
      setReferralStatusText("⚠️ You have already redeemed a peer referral code before.");
      return;
    }

    // Award 150 XP and 1 Streak Shield!
    setProfile(prev => {
      if (!prev) return prev;
      const updated = {
        ...prev,
        totalXp: prev.totalXp + 150,
        streakShields: prev.streakShields + 1,
        referralUsed: true
      };
      localStorage.setItem(`bp_profile_${prev.email}`, JSON.stringify(updated));
      return updated;
    });

    setReferralStatusText("🎉 Core referral code redeemed! +150 XP added and +1 Streak Shield credited to your clinical profile.");
    setFriendCode('');
  };

  // Referrals milestones checklist
  const milestones = [
    { targetCount: 1, prize: '+50 XP Milestone', completed: (profile.referredEmails?.length || 0) >= 1 },
    { targetCount: 3, prize: '+1 Streak Shield Safeguard', completed: (profile.referredEmails?.length || 0) >= 3 },
    { targetCount: 5, prize: '🥇 Boardmaster VIP Badge', completed: (profile.referredEmails?.length || 0) >= 5 },
  ];

  const referredList = profile.referredEmails || [];

  return (
    <div id="referrals-sentinel-workspace" className="space-y-6 select-none animate-in fade-in duration-200">
      
      {/* Top Banner Block */}
      <div className="bg-white border border-gray-150 rounded-3xl p-6 shadow-xs relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.015] bg-[radial-gradient(#104030_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="space-y-1.5 max-w-xl text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] uppercase font-black tracking-widest text-[#104030] bg-[#deebe3] border border-emerald-250/20 font-mono">
              <Gift className="w-3.5 h-3.5 text-pine" />
              Reciprocal Review Rewards
            </span>
            <h2 className="font-display text-2xl text-pine tracking-tight">
              Colleague Referral Program
            </h2>
            <p className="text-xs text-gray-500 leading-normal font-sans font-medium">
              Study is better together. Share your unique clinical code with fellow Philippine Psychology board examinees. When they register or redeem, you both unlock enormous XP increments and crucial <strong className="text-orange-600 font-bold">Streak Shields</strong> to safeguard your progress!
            </p>
          </div>

          <div className="flex-shrink-0 bg-amber-500 text-white font-mono rounded-3xl p-4 border border-amber-600 text-center min-w-[130px] shadow-sm animate-pulse-short">
            <span className="block text-[8px] uppercase tracking-widest font-black leading-none opacity-80">REDEMPTION VALUE</span>
            <span className="text-2xl font-black block mt-1">+150 XP</span>
            <span className="text-[10px] uppercase font-bold text-amber-100 font-sans block mt-1 leading-none">+1 Streak Shield</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left share tools */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Unique code sharer */}
          <div className="bg-white border border-gray-150 p-6 rounded-2xl shadow-xs space-y-4">
            <h4 className="font-heading font-black text-xs text-gray-400 uppercase tracking-widest flex items-center gap-1.5 font-mono">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              Your Candidate Referral Passport
            </h4>

            <p className="text-xs text-gray-500">
              Instruct friends to sign up and input your custom passport key below to receive mutual clinical credits immediately.
            </p>

            <div className="flex items-center gap-2 bg-[#deebe3]/30 border border-emerald-250/30 p-3 rounded-xl">
              <input
                type="text"
                readOnly
                value={referralCode}
                className="bg-transparent text-pine font-mono text-xs font-black tracking-wider outline-none border-none flex-grow w-full select-all"
              />
              <button
                onClick={handleCopyCode}
                className="px-3.5 py-1.5 bg-pine hover:bg-pine-mid text-cream font-mono text-[9px] font-black uppercase tracking-wider rounded-lg transition duration-150 flex items-center gap-1 shrink-0 active:scale-95 cursor-pointer"
              >
                {isCopied ? <Check className="w-3 h-3 text-mint" /> : <Copy className="w-3 h-3" />}
                <span>{isCopied ? 'Copied' : 'Copy Key'}</span>
              </button>
            </div>
          </div>

          {/* Reciprocal code entry */}
          <div className="bg-white border border-gray-150 p-6 rounded-2xl shadow-xs space-y-4">
            <h4 className="font-heading font-black text-xs text-[#2e4737] uppercase tracking-widest flex items-center gap-1.5 font-mono">
              <UserPlus className="w-4 h-4 text-pine" />
              Redeem Colleague Key
            </h4>

            {profile.referralUsed ? (
              <div className="bg-[#deebe3] text-[#2e5e41] border border-emerald-250/50 p-4 rounded-xl text-xs flex items-center gap-2.5 font-sans">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>
                  <strong>Referral Code Redeemed!</strong> You have successfully credited your peer connection and received the core referral benefits. Keep up the group momentum!
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubmitReferralCode} className="space-y-3.5">
                <p className="text-xs text-gray-500">
                  Input a colleague&apos;s code to unlock a one-time <strong className="text-emerald-700">+150 XP</strong> bonus and an instant <strong className="text-orange-600">Streak Shield</strong> safeguard.
                </p>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={friendCode}
                    onChange={e => setFriendCode(e.target.value)}
                    placeholder="e.g. BOARDPASS-CLINICIAN-123"
                    className="flex-grow w-full bg-white border border-gray-200 text-xs font-semibold py-2.5 px-3 rounded-lg outline-none focus:border-sage placeholder-gray-400 font-mono tracking-wider"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-pine hover:bg-pine-mid text-cream font-mono text-[10px] font-black uppercase tracking-wider rounded-lg border-b-2 border-pine-mid transition cursor-pointer shrink-0 active:scale-95"
                  >
                    Redeem Code
                  </button>
                </div>

                {referralStatusText && (
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-150 text-[10.5px] leading-relaxed text-gray-700 font-mono">
                    {referralStatusText}
                  </div>
                )}
              </form>
            )}
          </div>

          {/* Send invite via email simulation */}
          <div className="bg-white border border-gray-150 p-6 rounded-2xl shadow-xs space-y-4">
            <h4 className="font-heading font-black text-xs text-gray-500 uppercase tracking-widest flex items-center gap-1.5 font-mono">
              ✈️ Direct E-Mail Invitation Unit
            </h4>

            <form onSubmit={handleInviteFriend} className="space-y-3">
              <p className="text-xs text-gray-500">
                Dispatches a customized academic invite. Get <strong className="text-emerald-700">+25 XP</strong> as immediately credited recruitment points when you register a candidate!
              </p>

              <div className="flex gap-2">
                <input
                  type="email"
                  value={friendEmail}
                  onChange={e => setFriendEmail(e.target.value)}
                  placeholder="peer.candidate@university.edu.ph"
                  className="flex-grow w-full bg-white border border-gray-200 text-xs font-semibold py-2.5 px-3 rounded-lg outline-none focus:border-sage placeholder-gray-400"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-[#ffffff] font-mono text-[10px] font-black uppercase tracking-wider rounded-lg border-b-2 border-amber-600 transition cursor-pointer shrink-0 active:scale-95"
                >
                  Send Invite
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Right status tracking milestones */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Milestone Achievements */}
          <div className="bg-white border border-gray-150 p-6 rounded-2xl shadow-xs space-y-4">
            <h4 className="font-heading font-black text-xs text-[#2e4737] uppercase tracking-widest flex items-center gap-1.5 font-mono">
              🎯 Invite Tier Milestones
            </h4>

            <div className="space-y-2.5">
              {milestones.map((milestone, idx) => (
                <div 
                  key={idx} 
                  className={`p-3 rounded-xl border flex items-center justify-between gap-3 ${
                    milestone.completed 
                      ? 'bg-emerald-50/50 border-emerald-250/30 text-emerald-950 font-semibold' 
                      : 'bg-gray-50 border-gray-150 text-gray-500'
                  }`}
                >
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-black font-sans block leading-none">
                      Invite {milestone.targetCount} candidate{milestone.targetCount > 1 ? 's' : ''}
                    </span>
                    <span className="text-[9.5px] font-mono text-gray-400 capitalize block mt-0.5 leading-none">
                      Prize: {milestone.prize}
                    </span>
                  </div>
                  
                  {milestone.completed ? (
                    <span className="bg-emerald-600 text-white font-mono text-[8px] px-2 py-0.5 rounded-full font-black uppercase leading-none">Unlocked</span>
                  ) : (
                    <span className="bg-gray-200 text-gray-400 font-mono text-[8px] px-2 py-0.5 rounded-full font-black uppercase leading-none">Locked</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Invited friends database table */}
          <div className="bg-white border border-gray-150 p-5 rounded-2xl shadow-xs space-y-3.5">
            <h4 className="font-heading font-black text-xs text-gray-400 uppercase tracking-widest flex items-center gap-1.5 font-mono">
              <Users className="w-4 h-4 text-pine" />
              Referred Colleagues ({referredList.length})
            </h4>

            {referredList.length === 0 ? (
              <div className="text-center py-6 bg-gray-50 rounded-xl border border-dashed border-gray-200 text-xs text-gray-400 font-medium font-sans">
                No peer accounts recruited yet. Share your code with fellow psychology majors to build your review study circle!
              </div>
            ) : (
              <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
                {referredList.map((email, index) => (
                  <div 
                    key={index} 
                    className="p-3 bg-gray-50/75 border border-gray-150 rounded-xl flex items-center justify-between gap-2 text-xs font-sans text-gray-850"
                  >
                    <span className="truncate font-semibold">{email}</span>
                    <span className="bg-[#deebe3] text-teal-800 border border-emerald-250/15 font-mono text-[8.5px] font-black px-2 py-0.5 rounded-full uppercase leading-none shrink-0">
                      Active Joined
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
