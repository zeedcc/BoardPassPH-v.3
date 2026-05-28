import React, { useState, useEffect } from 'react';
import { Award, CheckCircle, Zap, Loader2, ShieldCheck, BookOpen, Copy, Wallet, Clock, AlertTriangle, RefreshCw, X, CheckSquare } from 'lucide-react';
import { UserProfile, GCashPaymentRequest } from '../types';
import { PlanInfographic } from './PlanInfographic';
import { submitGCashRequest, getGCashRequestsForUser } from '../utils/gcashHelpers';

interface BillingPanelProps {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;
}

const PLANS = [
  {
    id: 'free-tier',
    name: 'Free',
    price: 0,
    period: 'forever',
    color: 'slate',
    badge: 'Starter',
    description: 'Permanent free access with a minimal daily question allowance.',
    highlight: false,
    features: [
      '5 AI questions per day',
      'DSM-5 core trials',
      'PRC TOS Tracker & Planner',
      'Basic XP & streak system',
    ],
  },
  {
    id: 'trial',
    name: '7-Day Clinical Trial',
    price: 0,
    period: 'trial',
    color: 'gray',
    badge: 'Trial',
    description: 'Complimentary trial access containing multi-module interactive tools.',
    highlight: false,
    features: [
      '10 daily AI practice queries',
      'Full DSM-5 disorder encyclopedia checklists',
      '20-item quick diagnostic simulation boards',
      'Group study room pairing (3-peer limit)',
      'Weighted passing calculator forecast model',
      'Live calendar alarms & study alerts',
    ],
  },
  {
    id: 'pro',
    name: 'Pro Suite',
    price: 79,
    period: '/mo',
    color: 'amber',
    badge: '★ Best Value',
    description: 'Serious reviewees ready to level up their board prep.',
    highlight: false,
    features: [
      'Unlimited daily AI questions',
      'All PRC board topics index & card generator',
      'Live personalized passing calculator correlations',
      'Unrestricted peer capacities in study rooms',
      'Spaced repetition active status tracking',
      'Full cohort levels, badges & leaderboard',
    ],
  },
  {
    id: 'clinical',
    name: 'Clinical Suite',
    price: 149,
    period: '/mo',
    color: 'rose',
    badge: 'Full Access',
    description: 'Complete clinical arsenal — everything for board domination.',
    highlight: false,
    features: [
      'Everything in Pro Suite',
      '100-item full realistic mock board simulator',
      'Comprehensive PDF export index queries',
      'Pharmacology Q-Pack & mnemonics archive',
      'Priority support line & verification routing',
    ],
  },
  {
    id: 'lifetime',
    name: 'Lifetime Pass',
    price: 249,
    period: 'one-time',
    color: 'emerald',
    badge: '★ Lifetime Special',
    description: 'Affordable individual lifetime access — pay once, dominate forever.',
    highlight: true,
    features: [
      'Lifetime unlimited AI questions (No subscription!)',
      'Full 100-item Mock Board Simulator premium tier',
      'Comprehensive PDF export index queries',
      'Pharmacology Q-Pack & mnemonics archive',
      'Spaced repetition & PRC board topics index',
      'Priority verification & VIP helper desk routing',
    ],
  },
  {
    id: 'buddy-bundle',
    name: 'Study Buddy Trio',
    price: 599,
    period: 'one-time',
    color: 'indigo',
    badge: '★ 3-Peer Pack',
    description: 'Exclusive bundle for review groups. Split the cost & activate THREE accounts!',
    highlight: false,
    features: [
      'Lifetime access for THREE study partners (Maximum savings value!)',
      'All three reviewee profiles upgraded to full Clinical access',
      'Co-ordinate and sync in unlimited group study rooms',
      'Shared accountability, cohort levels & badges',
      'Triple the preparation power, single checkout split',
    ],
  },
];

export const BillingPanel: React.FC<BillingPanelProps> = ({ profile, setProfile }) => {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [statusMsg, setStatusMsg] = useState('');
  const [error, setError] = useState('');

  // GCash Custom Unlock portal states
  const [showGcashCheckout, setShowGcashCheckout] = useState<UserProfile['tier'] | null>(null);
  const [gcashSenderNum, setGcashSenderNum] = useState('');
  const [gcashRefNum, setGcashRefNum] = useState('');
  const [gcashAmount, setGcashAmount] = useState<number>(79);
  const [trialDaysLeft, setTrialDaysLeft] = useState<number | null>(null);
  const [requestHistory, setRequestHistory] = useState<GCashPaymentRequest[]>([]);
  const [submittingPayment, setSubmittingPayment] = useState(false);
  const [copiedNum, setCopiedNum] = useState(false);
  const [copiedReceiver, setCopiedReceiver] = useState(false);

  const currentTier = profile.tier || '7-Day Clinical Trial';

  useEffect(() => {
    if (!profile.signUpDate) {
      setTrialDaysLeft(7);
      return;
    }

    const calculateTrialDays = () => {
      const signUpStr = profile.signUpDate || '';
      const signUpDate = new Date(signUpStr);
      signUpDate.setHours(0, 0, 0, 0);

      const trialLength = 7; 
      const endDate = new Date(signUpDate.getTime() + trialLength * 24 * 60 * 60 * 1000);
      endDate.setHours(0, 0, 0, 0);

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const diffTime = endDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setTrialDaysLeft(Math.max(0, diffDays));
    };

    calculateTrialDays();
  }, [profile.signUpDate]);
  
  const isActive = (planId: string) => {
    if (planId === 'free-tier') return currentTier === 'Free';
    if (planId === 'trial') return currentTier === '7-Day Clinical Trial' || currentTier === 'Clinical Trial';
    if (planId === 'pro') return currentTier === 'Pro Suite' || currentTier === 'Pro';
    if (planId === 'clinical') return currentTier === 'Clinical Suite' || currentTier === 'Clinical';
    if (planId === 'lifetime') return currentTier === 'Lifetime Pass';
    if (planId === 'buddy-bundle') return currentTier === 'Study Buddy Trio';
    return false;
  };

  // Fetch submitted requests & keep updated
  const loadUserRequests = async () => {
    try {
      const history = await getGCashRequestsForUser(profile.email);
      setRequestHistory(history);
    } catch (e) {
      console.warn("Could not load payment requests queue:", e);
    }
  };

  useEffect(() => {
    loadUserRequests();
    const interval = setInterval(loadUserRequests, 4000);
    return () => clearInterval(interval);
  }, [profile.email]);

  // Reactive upgrade hook: if database has approved plan, auto-sync profile
  useEffect(() => {
    if (requestHistory.length > 0) {
      const latestApproved = requestHistory.find(r => r.status === 'approved');
      if (latestApproved && profile.tier !== latestApproved.requestedTier) {
        setProfile(prev => {
          if (!prev) return prev;
          const updated = { ...prev, tier: latestApproved.requestedTier };
          localStorage.setItem(`bp_profile_${prev.email}`, JSON.stringify(updated));
          return updated;
        });
        setStatusMsg(`🎉 Premium subscription approved! Switched to ${latestApproved.requestedTier}.`);
      }
    }
  }, [requestHistory, profile.tier]);

  const handleSubscribe = async (planId: string) => {
    setError('');
    setStatusMsg('');

    if (['pro', 'clinical', 'lifetime', 'buddy-bundle'].includes(planId)) {
      let tierName: UserProfile['tier'] = 'Pro Suite';
      let cost = 79;
      if (planId === 'pro') {
        tierName = 'Pro Suite';
        cost = 79;
      } else if (planId === 'clinical') {
        tierName = 'Clinical Suite';
        cost = 149;
      } else if (planId === 'lifetime') {
        tierName = 'Lifetime Pass';
        cost = 249;
      } else if (planId === 'buddy-bundle') {
        tierName = 'Study Buddy Trio';
        cost = 599;
      }
      setShowGcashCheckout(tierName);
      setGcashAmount(cost);
      return;
    }

    setLoadingPlan(planId);
    const planName = PLANS.find(p => p.id === planId)?.name ?? planId;
    let newTier: UserProfile['tier'];
    
    if (planId === 'free-tier') newTier = 'Free';
    else newTier = '7-Day Clinical Trial';

    try {
      setProfile(prev => {
        if (!prev) return prev;
        const updated = { ...prev, tier: newTier };
        localStorage.setItem(`bp_profile_${prev.email}`, JSON.stringify(updated));
        return updated;
      });
      setStatusMsg(`✅ Switched to ${planName}.`);
    } catch {
      setError('Failed to update plan.');
    } finally {
      setLoadingPlan(null);
    }
  };

  const handleSubmitGcashPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!showGcashCheckout) return;
    setError('');
    setStatusMsg('');

    // Field sanitizations
    const phoneClean = gcashSenderNum.trim();
    const refClean = gcashRefNum.trim();

    if (!phoneClean || phoneClean.length < 10) {
      setError('Please provide a valid GCash sender phone number account (min. 10 digits).');
      return;
    }

    if (!refClean || refClean.length < 6) {
      setError('Please provide a valid GCash reference code (at least 6 alphanumeric characters).');
      return;
    }

    setSubmittingPayment(true);

    const paymentPayload: GCashPaymentRequest = {
      id: `req-${Date.now()}`,
      email: profile.email,
      requestedTier: showGcashCheckout,
      amountPaid: gcashAmount,
      gcashNumber: phoneClean,
      gcashReceiver: 'DEDC',
      gcashRef: refClean,
      timestamp: new Date().toISOString(),
      status: 'pending'
    };

    try {
      await submitGCashRequest(paymentPayload);
      setStatusMsg(`✉️ Your payment of ₱${gcashAmount} for ${showGcashCheckout} has been submitted! It is now pending admin confirmation. Premium features will unlock as soon as verified.`);
      setGcashSenderNum('');
      setGcashRefNum('');
      setShowGcashCheckout(null);
      await loadUserRequests();
    } catch (err: any) {
      setError('Could not submit payment metadata: ' + err.message);
    } finally {
      setSubmittingPayment(false);
    }
  };

  const handleCopyNum = () => {
    navigator.clipboard.writeText('09763333248');
    setCopiedNum(true);
    setTimeout(() => setCopiedNum(false), 2000);
  };

  const handleCopyReceiver = () => {
    navigator.clipboard.writeText('DEDC');
    setCopiedReceiver(true);
    setTimeout(() => setCopiedReceiver(false), 2000);
  };

  return (
    <div className="space-y-8 select-none">
      <div className="bg-gradient-to-br from-pine to-pine-mid rounded-3xl p-6 text-center relative overflow-hidden shadow-xl border border-pine-light/20 animate-pulse">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-mint via-sage to-pine-light" />
        <div className="relative space-y-1.5 animate-bounce-subtle">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 border border-white/15 rounded-full text-[10px] font-black uppercase tracking-widest text-mint mb-1 font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-mint" />
            Active Board Account Status
          </div>
          <div className="font-display text-3xl text-cream tracking-tight">{currentTier}</div>
          <div className="text-[11px] text-mint/60 font-mono">
            {currentTier === 'Lifetime Pass' ? '₱249 One-Time · Lifetime Full Access Individual Pass active'
              : currentTier === 'Study Buddy Trio' ? '₱599 One-Time · Study Buddy Trio (3-Peer) lifetime access active'
              : currentTier.includes('Pro') ? '₱79 / month · Full board prep suite active'
              : currentTier.includes('Clinical Suite') || currentTier === 'Clinical' ? '₱149 / month · Complete clinical arsenal active'
              : currentTier.includes('Trial') ? '7-Day Clinical Trial · Try standard questions'
              : 'Free access · Minimal daily question allowance'}
          </div>
          {currentTier.toLowerCase().includes('trial') && (
            <div className="mt-2 text-[10px] font-black text-rose-300 uppercase tracking-widest font-mono bg-rose-950/40 inline-block px-3 py-1 rounded-full border border-rose-800/20">
              ⏳ {trialDaysLeft !== null ? `${trialDaysLeft} days remaining on trial` : '7 days remaining on trial'}
            </div>
          )}
        </div>
      </div>

      {statusMsg && (
        <div className="p-4 rounded-2xl border bg-emerald-50 border-emerald-200 text-emerald-800 text-xs font-semibold leading-relaxed space-y-1 animate-in slide-in-from-top-3 duration-200">
          <div className="flex items-center gap-1.5 text-emerald-950 font-bold uppercase tracking-wider text-[10px] font-mono">
            <CheckSquare className="w-4 h-4 text-emerald-600" />
            Core Upgrade System Clear
          </div>
          <p>{statusMsg}</p>
        </div>
      )}

      {error && (
        <p className="text-xs text-rose-600 bg-rose-50 border border-rose-200 px-4 py-3 rounded-2xl text-center font-bold">
          {error}
        </p>
      )}

      {/* GCash Direct Checkout dialog wrapper */}
      {showGcashCheckout && (
        <div className="bg-gradient-to-br from-white to-blue-50/20 border-2 border-blue-200/55 rounded-3xl p-6 shadow-md space-y-6 animate-in zoom-in-95 duration-200">
          <div className="flex justify-between items-start border-b border-gray-100 pb-4">
            <div className="space-y-1">
              <span className="text-[8px] uppercase tracking-widest font-black text-blue-600 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full font-mono">
                🇵🇭 GCash Checkout Portal
              </span>
              <h3 className="font-display text-xl text-pine">
                Unlock {showGcashCheckout} features
              </h3>
              <p className="text-[10px] text-gray-400 font-mono">
                Complete GCash bank transfer below, then submit references for reviewee clearance.
              </p>
            </div>
            <button
              onClick={() => setShowGcashCheckout(null)}
              className="p-1 hover:bg-gray-100 rounded-full transition text-gray-400 hover:text-pine cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 leading-relaxed">
            {/* Payment Details Card */}
            <div className="bg-white border border-blue-100/50 rounded-2xl p-4.5 space-y-4 shadow-sm">
              <h4 className="text-[10px] uppercase font-black tracking-wider text-blue-800 font-mono flex items-center gap-1.5">
                <Wallet className="w-4 h-4 text-blue-500" />
                1. Remit GCash Transfer
              </h4>

              <div className="space-y-3 pt-1">
                <div className="flex justify-between items-center text-xs font-semibold p-2.5 bg-gray-50 rounded-xl">
                  <span className="text-gray-400 font-mono text-[10px] uppercase">Receiver Mobile No.</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-pine font-mono text-sm font-black">09763333248</span>
                    <button
                      onClick={handleCopyNum}
                      className="p-1 hover:bg-mint/20 rounded text-sage hover:text-pine transition"
                      title="Copy phone code"
                    >
                      {copiedNum ? (
                        <span className="text-[8px] text-emerald-600 font-black">Copied!</span>
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs font-semibold p-2.5 bg-gray-50 rounded-xl">
                  <span className="text-gray-400 font-mono text-[10px] uppercase">Receiver Name</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-pine font-black uppercase text-xs">DEDC</span>
                    <button
                      onClick={handleCopyReceiver}
                      className="p-1 hover:bg-mint/20 rounded text-sage hover:text-pine transition"
                      title="Copy receiver string"
                    >
                      {copiedReceiver ? (
                        <span className="text-[8px] text-emerald-600 font-black">Copied!</span>
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs font-semibold p-2.5 bg-blue-50/50 rounded-xl border border-blue-100/40">
                  <span className="text-blue-800 font-mono text-[10px] uppercase font-bold">Registration Amount</span>
                  <span className="text-blue-950 font-display text-base font-black">₱{gcashAmount}.00</span>
                </div>
              </div>

              {/* Clinical Trial Upgrade Comparison Box */}
              <div className="p-3.5 bg-gradient-to-br from-teal-50/10 to-teal-500/5 rounded-xl border border-teal-200/40 space-y-2.5">
                <div className="flex items-center gap-1.5 text-teal-800 select-none">
                  <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider">
                    ⚡ Upgrades from Your Clinical Trial
                  </span>
                </div>
                <div className="space-y-2 text-[10.5px]">
                  <div className="flex justify-between items-baseline border-b border-gray-100 pb-1.5">
                    <span className="text-gray-500 font-medium font-sans">Mock Board Exams</span>
                    <span className="text-right font-semibold text-gray-700">
                      <span className="line-through text-gray-400 mr-1.5 font-normal">20-Item Diagnostic Limit</span>
                      <strong className="text-teal-900 font-extrabold uppercase text-[8.5px] bg-[#def6f7] px-1.5 py-0.2 rounded border border-teal-100">Full 100-Item active</strong>
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline border-b border-gray-100 pb-1.5">
                    <span className="text-gray-500 font-medium font-sans">Group Study Room</span>
                    <span className="text-right font-semibold text-gray-700">
                      <span className="line-through text-gray-400 mr-1.5 font-normal">3 Peers Limit</span>
                      <strong className="text-teal-900 font-extrabold uppercase text-[8.5px] bg-[#def6f7] px-1.5 py-0.2 rounded border border-teal-100">Unlimited peers</strong>
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline border-b border-gray-100 pb-1.5">
                    <span className="text-gray-500 font-medium font-sans">Passing rate Calculator</span>
                    <span className="text-right font-semibold text-gray-700">
                      <span className="line-through text-gray-400 mr-1.5 font-normal">Simulated Averages</span>
                      <strong className="text-teal-900 font-extrabold uppercase text-[8.5px] bg-[#def6f7] px-1.5 py-0.2 rounded border border-teal-100">Live Personal Forecast</strong>
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline border-b border-gray-100 pb-1.5">
                    <span className="text-gray-500 font-medium font-sans">Assessment Library</span>
                    <span className="text-right font-semibold text-gray-700">
                      <span className="line-through text-gray-400 mr-1.5 font-normal">Browse Cards</span>
                      <strong className="text-teal-900 font-extrabold uppercase text-[8.5px] bg-[#def6f7] px-1.5 py-0.2 rounded border border-teal-100">Export PDF list</strong>
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-gray-500 font-medium font-sans">Workspace AI Queries</span>
                    <span className="text-right font-semibold text-gray-700">
                      <span className="line-through text-gray-400 mr-1.5 font-normal">10 Queries daily</span>
                      <strong className="text-teal-900 font-extrabold uppercase text-[8.5px] bg-[#def6f7] px-1.5 py-0.2 rounded border border-teal-100">Unrestricted</strong>
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/50 flex gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-[9.5px] text-amber-800 leading-normal">
                  Ensure transfers coordinate exactly with the representative receiver: <strong>DEDC</strong>. Unmatched receipts will be locked pending manual auditing.
                </p>
              </div>
            </div>

            {/* Verification details Form */}
            <form onSubmit={handleSubmitGcashPayment} className="space-y-4">
              <h4 className="text-[10px] uppercase font-black tracking-wider text-blue-800 font-mono flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-blue-500" />
                2. Input Receipt Verification
              </h4>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider font-mono">
                  Your GCash Mobile Phone Number
                </label>
                <input
                  type="text"
                  required
                  placeholder="09171234567"
                  value={gcashSenderNum}
                  onChange={e => setGcashSenderNum(e.target.value)}
                  className="w-full bg-white border border-gray-200 focus:border-blue-400 focus:ring-3 focus:ring-blue-100 pl-3.5 py-2 rounded-xl text-xs font-semibold outline-none transition-all font-mono"
                />
                <span className="text-[9px] text-gray-400 block leading-normal leading-relaxed">
                  Entered digits used by the admin to match payments from GCash history invoices.
                </span>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider font-mono">
                  13-Digit GCash Transaction ID / Ref. No.
                </label>
                <input
                  type="text"
                  required
                  placeholder="5012 3456 78910"
                  value={gcashRefNum}
                  onChange={e => setGcashRefNum(e.target.value)}
                  className="w-full bg-white border border-gray-200 focus:border-blue-400 focus:ring-3 focus:ring-blue-100 pl-3.5 py-2 rounded-xl text-xs font-semibold outline-none transition-all font-mono"
                />
                <span className="text-[9px] text-gray-400 block leading-normal leading-relaxed">
                  Found on your GCash SMS reference, receipt, or App inbox message logs.
                </span>
              </div>

              <button
                type="submit"
                disabled={submittingPayment}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow text-white hover:from-blue-700 hover:to-indigo-700 font-sans uppercase tracking-widest font-black text-xs rounded-xl transition cursor-pointer flex items-center justify-center gap-2"
              >
                {submittingPayment ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Verifying parameters...</>
                ) : (
                  "Submit Upgrade Token Reference"
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* PLANS SELECTION CARDS */}
      <div>
        <div className="text-center space-y-1 mb-6">
          <h2 className="font-display text-2.5xl text-pine">Choose Your Review Tier</h2>
          <p className="text-xs text-gray-500 font-medium">
            Unlock complete subject indices, spaced repetition logs, and interactive mock examination databases.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {PLANS.map(plan => {
            const active = isActive(plan.id);
            const isAmber = plan.color === 'amber';
            const isRose = plan.color === 'rose';
            const isEmerald = plan.color === 'emerald';
            const isIndigo = plan.color === 'indigo';
            const isGray = plan.color === 'gray' || plan.color === 'slate';
            const isFreeOption = plan.id === 'free-tier' || plan.id === 'trial';

            return (
              <div
                key={plan.id}
                className={`relative bg-white rounded-3xl p-6 flex flex-col shadow-sm border transition-all hover:-translate-y-0.5 hover:shadow-md ${
                  isAmber ? 'border-2 border-amber-300 shadow-amber-500/5' :
                  isRose  ? 'border-2 border-rose-200 bg-rose-50/5 hover:border-rose-300' :
                  isEmerald ? 'border-2 border-emerald-300 bg-emerald-50/5 hover:border-emerald-400' :
                  isIndigo ? 'border-2 border-indigo-200 bg-indigo-50/5 hover:border-indigo-300' :
                  'border border-gray-200 hover:border-gray-300'
                } ${active ? 'ring-2 ring-offset-1 ring-pine/30' : ''}`}
              >
                {plan.highlight && !active && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[8px] uppercase font-black px-3 py-1 rounded-full shadow tracking-wider whitespace-nowrap">
                    ★ Highly Recommended
                  </div>
                )}
                {active && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-pine text-cream text-[8px] uppercase font-black px-3 py-1 rounded-full shadow tracking-wider whitespace-nowrap font-mono">
                    ✓ Active Subscription
                  </div>
                )}

                <div className="space-y-4 flex-1">
                  <div className="flex items-center gap-2">
                    {isGray  && <BookOpen className="w-4 h-4 text-gray-400" />}
                    {isAmber && <Award className="w-4 h-4 text-amber-500" />}
                    {isRose  && <Zap className="w-4 h-4 text-rose-500 animate-pulse" />}
                    {isEmerald && <ShieldCheck className="w-4 h-4 text-emerald-500" />}
                    {isIndigo && <Award className="w-4 h-4 text-indigo-500" />}
                    <span className={`text-[9.5px] uppercase font-bold px-2.5 py-0.5 rounded-full border ${
                      isAmber ? 'bg-amber-50 text-amber-800 border-amber-200' :
                      isRose  ? 'bg-rose-50 text-rose-800 border-rose-200' :
                      isEmerald ? 'bg-emerald-100/70 text-emerald-900 border-emerald-200' :
                      isIndigo ? 'bg-indigo-50 text-indigo-800 border-indigo-200' :
                      'bg-gray-100 text-gray-600 border-gray-200'
                    }`}>
                      {plan.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display text-xl text-pine">{plan.name}</h3>
                    <p className="text-[10px] text-gray-400 mt-0.5 leading-snug">{plan.description}</p>
                  </div>

                  <div className="pb-3 border-b border-gray-50 flex items-baseline">
                    {plan.price === 0 ? (
                      <span className="font-display text-3xl text-gray-700 font-bold">Free</span>
                    ) : (
                      <>
                        <span className="font-display text-3xl text-gray-900 font-bold">₱{plan.price}</span>
                        <span className="text-[10px] font-bold text-gray-400 ml-1">{plan.period}</span>
                      </>
                    )}
                  </div>

                  <ul className="space-y-2">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-[11px] text-gray-600 font-bold">
                        <CheckCircle className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${
                          isAmber ? 'text-amber-500' : isRose ? 'text-rose-500' : isEmerald ? 'text-emerald-500' : isIndigo ? 'text-indigo-500' : 'text-emerald-400'
                        }`} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-5 mt-auto">
                  <button
                    type="button"
                    onClick={() => handleSubscribe(plan.id)}
                    disabled={!!loadingPlan || active}
                    className={`w-full py-2.5 font-bold text-xs uppercase tracking-widest rounded-xl transition cursor-pointer select-none active:scale-[0.98] shadow flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed ${
                      active
                        ? 'bg-pine/10 text-pine border border-pine/20'
                        : isAmber
                        ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white hover:shadow-md border-b-2 border-amber-600'
                        : isRose
                        ? 'bg-gradient-to-r from-rose-600 to-red-500 text-white hover:shadow-md border-b-2 border-rose-800'
                        : isEmerald
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white hover:shadow-md border-b-2 border-emerald-800'
                        : isIndigo
                        ? 'bg-gradient-to-r from-indigo-600 to-violet-500 text-white hover:shadow-md border-b-2 border-indigo-800'
                        : 'bg-pine text-cream hover:bg-pine-mid border-b-2 border-pine-mid'
                    }`}
                  >
                    {active ? '✓ Current Activated' :
                      loadingPlan === plan.id ? (
                        <><Loader2 className="w-3.5 h-3.5 animate-spin" />Updating...</>
                      ) : (
                        isFreeOption ? `Upgrade to ${plan.name}` : `Unlock Premium: Pay via GCash`
                      )
                    }
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ACTIVE SUBSCRIPTION QUEUE / REQUEST HISTORY TRACKER */}
      {requestHistory.length > 0 && (
        <div className="bg-white border border-gray-150 rounded-2xl p-5 shadow-xs space-y-4 select-none">
          <div className="flex justify-between items-center border-b border-gray-100 pb-3">
            <h4 className="font-heading font-black text-xs text-gray-500 uppercase tracking-widest flex items-center gap-2 font-mono">
              <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />
              Upgrade Transactions Queues ({requestHistory.length})
            </h4>
            <span className="text-[9px] text-gray-400 bg-gray-50 rounded-lg px-2 px-1 border border-gray-100 font-mono">
              Live-tracked and evaluated
            </span>
          </div>

          <div className="space-y-3.5 divide-y divide-gray-100/50">
            {requestHistory.map((item) => {
              const isPending = item.status === 'pending';
              const isApproved = item.status === 'approved';
              const isRejected = item.status === 'rejected';

              return (
                <div key={item.id} className="pt-3 first:pt-0 grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
                  <div className="space-y-1">
                    <span className="text-[8px] tracking-wide uppercase font-black px-2 py-0.5 rounded bg-gray-100 text-gray-600 border border-gray-200">
                      {item.requestedTier}
                    </span>
                    <p className="text-[11px] font-black font-mono text-pine-mid">Ref: {item.gcashRef}</p>
                    <p className="text-[9px] text-gray-400 font-mono">{new Date(item.timestamp).toLocaleString()}</p>
                  </div>

                  <div className="text-left font-mono text-xs font-semibold">
                    <span className="text-gray-400 text-[10px] block font-mono uppercase">GCash Account</span>
                    <span>{item.gcashNumber}</span>
                  </div>

                  <div className="text-left font-mono text-xs font-semibold">
                    <span className="text-gray-400 text-[10px] block font-mono uppercase">Subtotal paid</span>
                    <span className="font-bold text-pine">₱{item.amountPaid}.00</span>
                  </div>

                  <div className="md:text-right">
                    {isPending && (
                       <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full font-mono">
                         ⏳ Matching Reference
                       </span>
                    )}
                    {isApproved && (
                       <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full font-mono">
                         ✓ Verified Active
                       </span>
                    )}
                    {isRejected && (
                      <div className="space-y-1 md:items-end flex flex-col">
                        <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase text-rose-700 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full font-mono">
                          ✗ Matching Failed
                        </span>
                        <p className="text-[9px] text-rose-800 font-mono leading-tight max-w-xs">{item.rejectionReason}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* PLAN DETAILS TABLES / INFOGRAPHIC */}
      <PlanInfographic />
    </div>
  );
};
