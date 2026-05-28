import React, { useState } from 'react';
import { Calculator, HelpCircle, CheckCircle, AlertTriangle, ShieldCheck } from 'lucide-react';
import { UserProfile } from '../types';

interface WeightedCalculatorPanelProps {
  profile?: UserProfile | null;
}

export const WeightedCalculatorPanel: React.FC<WeightedCalculatorPanelProps> = ({ profile }) => {
  const [abPsych, setAbPsych] = useState<number>(75);
  const [assess, setAssess] = useState<number>(75);
  const [personality, setPersonality] = useState<number>(75);
  const [industrial, setIndustrial] = useState<number>(75);

  const calculateGwa = () => {
    // PRC Psychometrician weights:
    // Psychological Assessment: 40%
    // Abnormal Psychology: 20%
    // Theories of Personality: 20%
    // Industrial Psychology: 20%
    const score = 
      (assess * 0.40) + 
      (abPsych * 0.20) + 
      (personality * 0.20) + 
      (industrial * 0.20);
    return parseFloat(score.toFixed(2));
  };

  const gwa = calculateGwa();
  const hasSubFifty = abPsych < 50 || assess < 50 || personality < 50 || industrial < 50;
  const passed = gwa >= 75 && !hasSubFifty;

  const isTrial = profile?.tier?.toLowerCase().includes('trial');

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl text-pine">PmLE Weighted Score Calculator</h2>
          <p className="text-xs text-gray-500 mt-1 leading-relaxed">
            The PRC Board of Psychology implements a strict weighted calculation format. Input your projected or mock exam percentages below to verify your general passing compatibility indices.
          </p>
        </div>

        {isTrial && (
          <div className="bg-emerald-50/75 border border-emerald-200/50 rounded-2xl px-3.5 py-1.5 flex items-center gap-2 text-[10.5px] text-emerald-900 font-sans font-bold select-none shrink-0 self-start md:self-auto shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-emerald-700 animate-pulse" />
            <span>Clinical Trial Mode Enabled</span>
          </div>
        )}
      </div>

      {isTrial && (
        <div className="bg-emerald-50/15 border border-emerald-100 rounded-xl p-4 text-[11px] text-gray-700 leading-relaxed font-sans font-medium select-text">
          <span className="font-black text-emerald-800 uppercase tracking-wider font-mono mr-1.5 flex items-center gap-1">
            ✨ Evaluation Limitation Notice
          </span>
          Mock exam forecasting is unlocked during your 7-day clinical evaluation period. Real-time correlation values between local metrics and board averages are restricted to pre-compiled models until full candidate licensure is activated.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        <div className="md:col-span-7 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h4 className="font-heading font-black text-pine text-xs uppercase tracking-widest flex items-center gap-2 select-none border-b border-gray-100 pb-2.5">
            <Calculator className="w-4 h-4 text-sage" />
            Projected Course Percentages
          </h4>

          <div className="space-y-4 font-mono select-none">
            {[
              { label: 'Psychological Assessment (40% Weight)', val: assess, setter: setAssess },
              { label: 'I/O Psychology (20% Weight)', val: industrial, setter: setIndustrial },
              { label: 'Theories of Personality (20% Weight)', val: personality, setter: setPersonality },
              { label: 'Abnormal Psychology (20% Weight)', val: abPsych, setter: setAbPsych }
            ].map((row, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between items-center text-xs font-bold text-gray-700">
                  <span>{row.label}</span>
                  <span className="text-pine">{row.val}%</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="100"
                  value={row.val}
                  onChange={(e) => row.setter(parseInt(e.target.value))}
                  className="w-full accent-pine h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[9px] text-gray-400 font-semibold font-mono">
                  <span>30%</span>
                  <span>100%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-5 space-y-4">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm text-center select-none space-y-4">
            <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-widest font-mono">Simulated Board GWA</span>
            <h2 className="font-display text-5xl text-pine tracking-tighter leading-none">
              {gwa.toFixed(2)}%
            </h2>

            <div className={`p-4 rounded-xl border flex flex-col justify-center items-center gap-1 leading-normal ${
              passed 
                ? 'bg-emerald-50 border-emerald-250 text-emerald-900' 
                : 'bg-rose-50 border-rose-250 text-rose-900'
            }`}>
              <span className="font-heading font-black text-xs uppercase tracking-widest">
                {passed ? '🟢 PASSING GWA' : '🔴 FAILED STATUS'}
              </span>
              <p className="text-[10px] text-gray-600 font-semibold max-w-[200px] mt-1 leading-normal">
                {passed 
                  ? 'Your indices meet both the 75.00% GWA benchmark and omit sub-50% course exclusions.'
                  : hasSubFifty 
                  ? 'PRC regulations reject any GWA if an individual course score is under 50.00% regardless of average!'
                  : 'GWA is under the mandatory 75.00% passing threshold mark.'}
              </p>
            </div>
          </div>

          <div className="bg-yellow-50/40 border border-yellow-100 text-yellow-905 rounded-xl p-4 leading-normal select-none">
            <h5 className="font-heading font-black text-[9.5px] uppercase text-yellow-800 tracking-wider flex items-center gap-1">
              <HelpCircle className="w-3.5 h-3.5 text-yellow-600" />
              PRC Rule Section guidelines
            </h5>
            <p className="text-[10px] text-yellow-950/80 leading-relaxed font-semibold mt-1">
              To pass the Board for Psychometricians, candidates must accumulate a general weighted average of at least 75.00%, with no grade in any subject falling below 50.00%.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
