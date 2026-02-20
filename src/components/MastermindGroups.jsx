import React from 'react';
import {
    Users, Lock, Calendar, ArrowUpRight, Shield, Clock,
    CheckCircle2, Crown, Zap
} from 'lucide-react';

const GROUPS = [
    {
        name: "SaaS Scaling < $10k",
        members: 8,
        maxMembers: 12,
        industry: "SaaS",
        description: "Weekly accountability for early-stage SaaS founders focusing on first revenue milestones.",
        tags: ['Pre-revenue', 'B2B', 'Growth'],
        avatars: ['Felix', 'Sarah', 'James', 'Elena'],
        nextMeeting: 'Tomorrow, 5 PM',
        activity: 'Very Active',
        theme: 'indigo',
    },
    {
        name: "AI Product Builders",
        members: 11,
        maxMembers: 15,
        industry: "AI/ML",
        description: "Deep dives into LLM integration, prompt engineering, and AI-first product strategies.",
        tags: ['Generative AI', 'Tech', 'LLMs'],
        avatars: ['Raj', 'Maya', 'Tom', 'Lisa'],
        nextMeeting: 'Fri, 10 AM',
        activity: 'Active',
        theme: 'purple',
    },
    {
        name: "Marketplace Growth",
        members: 6,
        maxMembers: 10,
        industry: "Marketplace",
        description: "Solving chicken-and-egg problems in 2-sided marketplaces. Weekly case studies.",
        tags: ['Consumer', 'Growth', 'Strategy'],
        avatars: ['Priya', 'Alex', 'Dev'],
        nextMeeting: 'Mon, 3 PM',
        activity: 'Moderate',
        theme: 'emerald',
    },
    {
        name: "Founder Wellness",
        members: 9,
        maxMembers: 12,
        industry: "General",
        description: "Mental health, burnout prevention, and sustainable work habits for founders.",
        tags: ['Wellbeing', 'Mindset', 'Peer Support'],
        avatars: ['Sarah', 'Tom', 'Elena', 'Maya'],
        nextMeeting: 'Wed, 6 PM',
        activity: 'Active',
        theme: 'amber',
    },
];

const MastermindGroups = ({ hasRole }) => {
    return (
        <div className="space-y-6">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 px-1">
                <div>
                    <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        <Crown className="w-5 h-5 text-indigo-600 fill-indigo-100" />
                        Mastermind Squads
                    </h2>
                    <p className="text-sm text-gray-500 mt-0.5">Exclusive, high-signal peer groups. Apply to join.</p>
                </div>
                <button className="px-4 py-2 bg-gray-900 text-white text-sm font-bold rounded-xl hover:bg-black transition-all shadow-sm flex items-center gap-2 self-start">
                    <Users className="w-4 h-4" /> Start a Squad
                </button>
            </div>

            {/* Groups Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {GROUPS.map((group, index) => (
                    <SquadCard key={index} {...group} index={index} />
                ))}
            </div>
        </div>
    );
};

const SquadCard = ({ name, members, maxMembers, industry, description, tags, avatars, nextMeeting, activity, theme, index }) => {

    const themeStyles = {
        indigo: { bg: 'bg-indigo-50', border: 'border-indigo-100', text: 'text-indigo-900', accent: 'bg-indigo-600', lightAccent: 'bg-indigo-100 text-indigo-700' },
        purple: { bg: 'bg-purple-50', border: 'border-purple-100', text: 'text-purple-900', accent: 'bg-purple-600', lightAccent: 'bg-purple-100 text-purple-700' },
        emerald: { bg: 'bg-emerald-50', border: 'border-emerald-100', text: 'text-emerald-900', accent: 'bg-emerald-600', lightAccent: 'bg-emerald-100 text-emerald-700' },
        amber: { bg: 'bg-amber-50', border: 'border-amber-100', text: 'text-amber-900', accent: 'bg-amber-600', lightAccent: 'bg-amber-100 text-amber-700' },
    };

    const style = themeStyles[theme] || themeStyles.indigo;

    return (
        <div className={`relative rounded-2xl border ${style.border} bg-white shadow-sm hover:shadow-lg transition-all duration-300 group overflow-hidden flex flex-col`}>
            {/* "Ticket" Side Accent */}
            <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${style.accent}`}></div>

            <div className="p-5 pl-7 flex flex-col flex-1">
                {/* Header */}
                <div className="flex justify-between items-start mb-3">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${style.lightAccent}`}>
                                {industry} Squad
                            </span>
                            {activity === 'Very Active' && (
                                <span className="flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-100">
                                    <Zap className="w-3 h-3 fill-green-600" /> Active
                                </span>
                            )}
                        </div>
                        <h3 className={`text-lg font-bold ${style.text} group-hover:opacity-80 transition-opacity`}>{name}</h3>
                    </div>

                    {/* Lock Icon */}
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100 text-gray-400">
                        <Lock className="w-4 h-4" />
                    </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-5 leading-relaxed">
                    {description}
                </p>

                {/* Squad Info */}
                <div className="mt-auto bg-gray-50/80 rounded-xl p-3 border border-gray-100 flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Members</span>
                        <div className="flex -space-x-2">
                            {avatars.map((seed, i) => (
                                <img
                                    key={i}
                                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`}
                                    alt=""
                                    className="w-7 h-7 rounded-full border-2 border-white bg-white shadow-sm"
                                />
                            ))}
                            <div className="w-7 h-7 rounded-full bg-white border-2 border-dashed border-gray-300 flex items-center justify-center text-[10px] font-bold text-gray-400">
                                +{members - avatars.length}
                            </div>
                        </div>
                    </div>

                    <div className="w-px h-8 bg-gray-200 mx-2"></div>

                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Next Session</span>
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-900">
                            <Clock className="w-3.5 h-3.5 text-gray-500" />
                            {nextMeeting}
                        </div>
                    </div>
                </div>

                {/* Action Button (Hidden by default, reveal on hover) */}
                <div className="mt-4 pt-3 border-t border-gray-50 flex justify-between items-center">
                    <div className="flex gap-2">
                        {tags.slice(0, 2).map((tag, i) => (
                            <span key={i} className="text-[10px] text-gray-500 font-medium px-2 py-1 bg-gray-50 rounded-md border border-gray-100">
                                #{tag}
                            </span>
                        ))}
                    </div>
                    <button className={`flex items-center gap-1 text-xs font-bold ${style.lightAccent.split(' ')[1]} hover:underline`}>
                        Request Invite <ArrowUpRight className="w-3 h-3" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MastermindGroups;
