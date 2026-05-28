import React from 'react';
import { Heart, Activity, Target, ShieldAlert } from 'lucide-react';

const STAGES = [
    { 
        title: 'Prenatal', 
        age: 'Conception to Birth', 
        task: 'Biological development and organogenesis.', 
        milestone: 'Rapid cell division, blastocyst formation, organogenesis, and brain growth spurts.',
        challenge: 'Genetic/chromosomal abnormalities (e.g., Trisomy 21), teratogens (e.g., alcohol, smoking), and pregnancy-related complications.' 
    },
    { 
        title: 'Infancy', 
        age: 'Birth to 2 years', 
        task: 'Maturation of sensory/motor functions, sensorimotor intelligence, communication, and attachment.', 
        milestone: 'Develops object permanence, pulls to stand, takes first steps, and says first words (e.g., "mama", "dada").',
        challenge: 'Psychosocial Crisis: Trust vs. Mistrust (Withdrawal). Potential physical/motor delays or sensory processing challenges.' 
    },
    { 
        title: 'Toddlerhood', 
        age: '2 to 3 years', 
        task: 'Elaboration of locomotion, language development, fantasy play, and self-control.', 
        milestone: 'Walks independently, uses two-word phrases, begins to ask simple questions, and shows increasing independence.',
        challenge: 'Psychosocial Crisis: Autonomy vs. Shame & Doubt (Compulsion). Resistance or negativism (temper tantrums).' 
    },
    { 
        title: 'Early School Age', 
        age: '4 to 6 years', 
        task: 'Gender identification, early moral development, self-theory, and peer play.', 
        milestone: 'Counts to 10 or more, engages in cooperative play, understands time concepts, and uses future tense.',
        challenge: 'Psychosocial Crisis: Initiative vs. Guilt (Inhibition). Emotional regulation issues or early signs of oppositional behavior.' 
    },
    { 
        title: 'Middle Childhood', 
        age: '6 to 12 years', 
        task: 'Friendship, concrete operations, skill learning, self-evaluation, and team play.', 
        milestone: 'Develops concrete operational thinking, forms stable friendships, and refines gross/fine motor skills.',
        challenge: 'Psychosocial Crisis: Industry vs. Inferiority (Inertia). Specific learning disorders, ADHD, and peer pressure.' 
    },
    { 
        title: 'Early Adolescence', 
        age: '12 to 18 years', 
        task: 'Physical maturation, formal operations, emotional development, and peer group membership.', 
        milestone: 'Puberty (rapid physical changes), development of formal operational thinking, and complex problem-solving.',
        challenge: 'Psychosocial Crisis: Group Identity vs. Alienation (Dissociation). Body image issues, academic pressure, and mental health challenges.' 
    },
    { 
        title: 'Later Adolescence', 
        age: '18 to 24 years', 
        task: 'Autonomy from parents, gender identity, internalized morality, and career choice.', 
        milestone: 'Navigating independence from parents, exploring intimate relationships, and finalizing educational goals.',
        challenge: 'Psychosocial Crisis: Individual Identity vs. Identity Confusion (Repudiation). Future pressure and financial independence struggles.' 
    },
    { 
        title: 'Early Adulthood', 
        age: '24 to 34 years', 
        task: 'Exploring intimate relationships, childbearing, work, and lifestyle.', 
        milestone: 'Peak physical strength, forming a life structure (career, relationships), and establishing intimacy.',
        challenge: 'Psychosocial Crisis: Intimacy vs. Isolation (Exclusivity). Debt management, relationship challenges, and "quarter-life crisis".' 
    },
    { 
        title: 'Middle Adulthood', 
        age: '34 to 60 years', 
        task: 'Managing a career, nurturing intimate relationships, expanding caring relationships, and managing household.', 
        milestone: 'Balancing multiple roles, generativity, and experiencing reflective thinking / postformal thought.',
        challenge: 'Psychosocial Crisis: Generativity vs. Stagnation (Rejectivity). "Sandwich Generation" pressure, and empty nest syndrome.' 
    },
    { 
        title: 'Later Adulthood', 
        age: '60 to 75 years', 
        task: 'Accepting one\'s life, redirecting energy to new roles, promoting intellectual vigor, and developing a view on death.', 
        milestone: 'Adaptation to retirement, focusing on personal goals / leisure, and maintaining crystallized intelligence.',
        challenge: 'Psychosocial Crisis: Integrity vs. Despair (Disdain). Chronic health conditions, grief, and loss of loved ones.' 
    },
    { 
        title: 'Elderhood', 
        age: '75 until death', 
        task: 'Coping with physical changes of aging, developing a psychohistorical perspective, and traveling uncharted terrain.', 
        milestone: 'Reflecting on life, sharing wisdom, maintaining social support, and continuing care arrangements.',
        challenge: 'Psychosocial Crisis: Immortality vs. Extinction (Difference). Frailty, mobility issues, and facing mortality.' 
    }
];

export const LifeStagesPanel = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-display font-bold text-pine">Developmental Stages: Prenatal to Death</h2>
            <div className="grid grid-cols-1 gap-4">
                {STAGES.map((stage, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-150 shadow-sm space-y-4">
                        <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                            <h3 className="text-xl font-bold text-pine flex items-center gap-2">
                               <Heart className="w-5 h-5 text-mint"/> {stage.title}
                            </h3>
                            <span className="text-xs font-mono font-bold px-3 py-1 bg-foam text-pine rounded-full">{stage.age}</span>
                        </div>
                        <div className="space-y-3">
                            <div>
                                <h4 className="text-sm font-bold text-gray-800 flex items-center gap-1.5"><Target className="w-4 h-4 text-emerald-500" /> Developmental Task</h4>
                                <p className="text-sm text-gray-600 pl-5.5">{stage.task}</p>
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-gray-800 flex items-center gap-1.5"><Activity className="w-4 h-4 text-blue-500" /> Key Milestones</h4>
                                <p className="text-sm text-gray-600 pl-5.5">{stage.milestone}</p>
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-gray-800 flex items-center gap-1.5"><ShieldAlert className="w-4 h-4 text-rose-500" /> Challenges & Crises</h4>
                                <p className="text-sm text-gray-600 pl-5.5">{stage.challenge}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
