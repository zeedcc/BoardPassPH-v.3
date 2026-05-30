import React from 'react';
import { Heart, Activity, CheckCircle, Database } from 'lucide-react';

export const PsychometricConceptsPanel = () => {
    const properties = [
        {
            title: 'Reliability (C-O-R-E)',
            desc: 'Consistency of measurement across time or items.',
            mnemonic: 'C-O-R-E: Consistent, Observable, Repeatable, Exact.',
            content: [
                { term: 'Test-Retest', desc: 'Consistency over time.' },
                { term: 'Cronbach\'s Alpha', desc: 'Internal consistency.' }
            ]
        },
        {
            title: 'Validity (R-E-A-L)',
            desc: 'Accuracy in measuring the targeted construct.',
            mnemonic: 'R-E-A-L: Relevant, Exact, Accurate, Logical.',
            content: [
                { term: 'Content', desc: 'Is the domain covered?' },
                { term: 'Construct', desc: 'Is the theory supported?' },
                { term: 'Criterion', desc: 'Does it predict an outcome?' }
            ]
        }
    ];

    const statsAssumptions = [
        { criteria: 'Normality', parametric: true, nonParametric: false },
        { criteria: 'Homogeneity of Variances', parametric: true, nonParametric: false },
        { criteria: 'Linearity', parametric: true, nonParametric: false },
        { criteria: 'Independence', parametric: true, nonParametric: true },
        { criteria: 'Scale of Measurement', parametric: 'Interval / Ratio', nonParametric: 'Nominal / Ordinal' },
        { criteria: 'Outliers Permitted', parametric: false, nonParametric: true }
    ];

    const testEquivalents = [
        { purpose: 'Compare 2 Independent Groups', param: 'Independent T-Test', nonParam: 'Mann-Whitney U Test' },
        { purpose: 'Compare 2 Related Groups', param: 'Dependent / Paired T-Test', nonParam: 'Wilcoxon Signed Rank Test' },
        { purpose: 'Compare 3+ Indep. Groups', param: 'One-Way ANOVA', nonParam: 'Kruskal-Wallis Test' },
        { purpose: 'Compare 3+ Related Groups', param: 'Repeated Measures ANOVA', nonParam: 'Friedman Rank Test' },
        { purpose: 'Compare 3+ Groups (2 Factors)', param: 'Two-Way ANOVA', nonParam: '-' },
        { purpose: 'Control for Covariates (IV)', param: 'ANCOVA', nonParam: '-' },
        { purpose: 'Multiple Dependent Variables', param: 'MANOVA / MANCOVA', nonParam: '-' },
        { purpose: 'Correlation (2 Continuous Vars)', param: 'Pearson r', nonParam: 'Spearman rho' },
        { purpose: 'Correlation (Ordinal/Ranked)', param: '-', nonParam: 'Kendall\'s W / Spearman rho' },
        { purpose: 'Categorical Data (Frequencies)', param: '-', nonParam: 'Chi-Squared Test' },
        { purpose: 'Categorical Data (Small Sample)', param: '-', nonParam: 'Fisher\'s Exact Test' },
        { purpose: 'Prediction Framework', param: 'Linear / Multiple Regression', nonParam: 'Logistic Regression (Log-odds)' }
    ];

    const reliabilityEstimates = [
        { type: 'Test-Retest', error: 'Time Sampling (Carryover, Practice Effects, Mortality)', useCase: 'Attributes expected to be stable over time.' },
        { type: 'Parallel Forms', error: 'Item Sampling (Differences between test forms)', useCase: 'When test forms must be strictly equivalent with equal means and variances.' },
        { type: 'Alternate Forms', error: 'Item Sampling', useCase: 'When parallel forms are impractical; testing using similar but not strictly equivalent forms.' },
        { type: 'Split-Half', error: 'Item Sample / Nature of Split', useCase: 'Single administration to avoid time/practice effects; uses Spearman-Brown formula.' },
        { type: 'Internal Consistency', error: 'Item Heterogeneity', useCase: 'Measuring how well items consistently measure a single underlying construct (e.g., Cronbach\'s Alpha, KR-20).' },
        { type: 'Interrater / Inter-scorer', error: 'Scorer Differences / Subjectivity', useCase: 'Subjective assessments where multiple scorers grade the same performance (Kappa, Kendal\'s W).' }
    ];

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-display font-bold text-pine">Psychometric & Statistical Concepts</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {properties.map((item, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-150 shadow-sm space-y-3">
                        <h3 className="text-lg font-bold text-pine">{item.title}</h3>
                        <p className="text-xs font-bold text-mint uppercase">{item.mnemonic}</p>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                        <div className="grid grid-cols-1 gap-2 mt-4">
                            {item.content.map((c, i) => (
                                <div key={i} className="text-xs text-gray-700 bg-foam p-3 rounded-lg border border-gray-100">
                                    <strong className="text-pine">{c.term}:</strong> {c.desc}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-pine flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-mint" /> 
                    Reliability Estimates & Errors
                </h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-600">
                        <thead className="text-xs text-pine uppercase bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 rounded-tl-lg">Reliability Type</th>
                                <th className="px-4 py-3">Source of Error Variance</th>
                                <th className="px-4 py-3 rounded-tr-lg">Primary Use Case</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reliabilityEstimates.map((row, idx) => (
                                <tr key={idx} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                                    <td className="px-4 py-3 font-medium text-gray-800">{row.type}</td>
                                    <td className="px-4 py-3 font-mono text-xs">{row.error}</td>
                                    <td className="px-4 py-3 italic">{row.useCase}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-pine flex items-center gap-2">
                    <Activity className="w-5 h-5 text-mint" /> 
                    Parametric vs. Nonparametric Tests
                </h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-600">
                        <thead className="text-xs text-pine uppercase bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 rounded-tl-lg">Purpose / Groups</th>
                                <th className="px-4 py-3">Parametric Equivalent</th>
                                <th className="px-4 py-3 rounded-tr-lg">Nonparametric Equivalent</th>
                            </tr>
                        </thead>
                        <tbody>
                            {testEquivalents.map((row, idx) => (
                                <tr key={idx} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                                    <td className="px-4 py-3 font-medium text-gray-800">{row.purpose}</td>
                                    <td className="px-4 py-3">{row.param}</td>
                                    <td className="px-4 py-3">{row.nonParam}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-pine flex items-center gap-2">
                    <Database className="w-5 h-5 text-mint" /> 
                    Statistical Assumptions
                </h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-600">
                        <thead className="text-xs text-pine uppercase bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 rounded-tl-lg">Assumption Criteria</th>
                                <th className="px-4 py-3">Parametric Tests</th>
                                <th className="px-4 py-3 rounded-tr-lg">Nonparametric Tests</th>
                            </tr>
                        </thead>
                        <tbody>
                            {statsAssumptions.map((row, idx) => (
                                <tr key={idx} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                                    <td className="px-4 py-3 font-medium text-gray-800">{row.criteria}</td>
                                    <td className="px-4 py-3">
                                        {typeof row.parametric === 'boolean' 
                                            ? (row.parametric ? <span className="text-emerald-500 font-bold">✓ Requires</span> : <span className="text-rose-500 font-bold">✗ No</span>)
                                            : <span className="font-mono text-xs">{row.parametric}</span>}
                                    </td>
                                    <td className="px-4 py-3">
                                        {typeof row.nonParametric === 'boolean' 
                                            ? (row.nonParametric ? <span className="text-emerald-500 font-bold">✓ Yes</span> : <span className="text-rose-500 font-bold">✗ No</span>)
                                            : <span className="font-mono text-xs">{row.nonParametric}</span>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
