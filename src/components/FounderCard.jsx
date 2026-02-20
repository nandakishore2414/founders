import React from 'react';
import {
    UserPlus, MessageSquare, TrendingUp, MapPin, Zap, Star,
    Award, Shield, Crown, ArrowUpRight, CheckCircle2
} from 'lucide-react';

const FounderCard = ({
    name,
    avatar,
    startupName,
    positioning,
    industry,
    stage,
    location,
    metric,
    openTo,
    streak,
    reputation,
    featured,
    onConnect,
    onCollaborate,
    variant = 'default'
}) => {

    // Generate a deterministic gradient based on name for the cover
    const getGradient = (str) => {
        const gradients = [
            'from-blue-600 to-indigo-600',
            'from-emerald-500 to-teal-600',
            'from-orange-500 to-red-600',
            'from-pink-500 to-rose-500',
            'from-purple-600 to-indigo-600',
            'from-cyan-500 to-blue-500',
        ];
        const index = str.length % gradients.length;
        return gradients[index];
    };

    const coverGradient = getGradient(name);

    // ─── Featured / Premium Card ─────────────────────────
    if (variant === 'featured') {
        return (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden flex flex-col h-full relative">
                {/* Featured Badge */}
                <div className="absolute top-3 right-3 z-10 bg-black/20 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold px-2 py-1 rounded-lg flex items-center gap-1">
                    <Crown className="w-3 h-3 text-amber-300 fill-amber-300" /> Featured
                </div>

                {/* Cover Image */}
                <div className={`h-24 bg-gradient-to-r ${coverGradient} relative`}>
                    <div className="absolute inset-0 opacity-20" style={{
                        backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                        backgroundSize: '16px 16px'
                    }}></div>
                </div>

                {/* Content Container */}
                <div className="px-5 pb-5 flex-1 flex flex-col relative">
                    {/* Avatar - Overlapping Cover */}
                    <div className="-mt-10 mb-3 flex justify-between items-end">
                        <div className="relative">
                            <div className="w-20 h-20 rounded-2xl p-1 bg-white shadow-sm">
                                <img src={avatar} alt={name} className="w-full h-full rounded-xl object-cover bg-gray-100" />
                            </div>
                            {streak > 0 && (
                                <div className="absolute -bottom-2 -right-2 bg-white p-1 rounded-full shadow-sm">
                                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center border-2 border-white">
                                        <Flame className="w-3 h-3 text-white fill-white" />
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* Reputation Badge */}
                        {reputation && (
                            <div className="flex flex-col items-end">
                                <div className="flex items-center gap-1 text-xs font-bold text-gray-900">
                                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                                    {reputation}
                                </div>
                                <span className="text-[10px] text-gray-400 font-medium">Top 5%</span>
                            </div>
                        )}
                    </div>

                    {/* Startup first, then founder — so users understand the startup at a glance */}
                    <div className="mb-2">
                        <p className="text-sm font-bold text-indigo-600">{startupName}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{name} · {stage}</p>
                    </div>

                    {/* What we do */}
                    <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2" title={positioning}>
                        {positioning}
                    </p>

                    {/* Metrics Pills */}
                    <div className="flex flex-wrap gap-2 mb-5">
                        <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-50 rounded-lg text-xs font-medium text-gray-700 border border-gray-100">
                            <TrendingUp className="w-3.5 h-3.5 text-green-600" />
                            {metric}
                        </div>
                        <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-50 rounded-lg text-xs font-medium text-gray-700 border border-gray-100">
                            <MapPin className="w-3.5 h-3.5 text-gray-400" />
                            {location}
                        </div>
                    </div>

                    {/* Action Footer */}
                    <div className="mt-auto grid grid-cols-2 gap-3">
                        <button
                            onClick={onConnect}
                            className="py-2.5 bg-gray-900 text-white rounded-xl text-xs font-bold hover:bg-black transition-all flex items-center justify-center gap-2"
                        >
                            <UserPlus className="w-4 h-4" /> Connect
                        </button>
                        <button
                            onClick={onCollaborate}
                            className="py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl text-xs font-bold hover:border-gray-900 transition-all flex items-center justify-center gap-2"
                        >
                            <MessageSquare className="w-4 h-4" /> Message
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // ─── Default Card (Mini-Profile Style) ─────────────────
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col h-full overflow-hidden">
            {/* Mini Cover Strip */}
            <div className={`h-16 bg-gradient-to-r ${coverGradient} opacity-90 group-hover:opacity-100 transition-opacity`}></div>

            <div className="px-4 pb-4 flex-1 flex flex-col">
                {/* Avatar - Pull up */}
                <div className="-mt-8 mb-3 flex justify-between items-end">
                    <img
                        src={avatar}
                        alt={name}
                        className="w-14 h-14 rounded-xl border-4 border-white object-cover bg-white shadow-sm"
                    />
                    {streak > 0 && (
                        <div className="flex items-center gap-1 bg-orange-50 text-orange-600 px-2 py-1 rounded-full text-[10px] font-bold border border-orange-100 mb-1">
                            <Zap className="w-3 h-3 fill-orange-600" /> {streak}d
                        </div>
                    )}
                </div>

                {/* Identity: Startup first so users understand what they're looking at */}
                <div className="mb-1.5">
                    <p className="text-xs font-bold text-indigo-600 uppercase tracking-wide">{startupName}</p>
                    <h3 className="font-bold text-gray-900 text-sm">{name}</h3>
                </div>

                {/* What we do (one-line) */}
                <p className="text-xs text-gray-600 leading-relaxed mb-3 line-clamp-2" title={positioning}>
                    {positioning}
                </p>

                {/* Signal Tags: Stage · Metric · Industry */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                    <span className="px-2 py-0.5 bg-gray-50 text-gray-600 text-[10px] font-semibold rounded-md border border-gray-100 border-l-2 border-l-gray-400">
                        {stage}
                    </span>
                    <span className="px-2 py-0.5 bg-green-50 text-green-700 text-[10px] font-semibold rounded-md border border-green-100">
                        {metric}
                    </span>
                    {industry && industry.slice(0, 2).map((tag, i) => (
                        <span key={i} className="px-2 py-0.5 bg-gray-50 text-gray-500 text-[10px] font-medium rounded-md border border-gray-100">
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Actions */}
                <div className="mt-auto pt-3 border-t border-gray-50 flex gap-2">
                    <button
                        onClick={onConnect}
                        className="flex-1 py-1.5 bg-gray-50 hover:bg-indigo-50 text-gray-600 hover:text-indigo-600 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                    >
                        <UserPlus className="w-3.5 h-3.5" /> Connect
                    </button>
                    <button
                        onClick={onCollaborate}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-900 transition-colors"
                        title="Message"
                    >
                        <MessageSquare className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

// Start Flame icon since it was referenced but not imported in lucide-react in some versions, 
// strictly it is Flame, but let's make sure it is defined if missing or just use Zap as fallback visually.
// Lucide has Flame.

function Flame({ className }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.1.2-2.2.5-3.3.3-1.4 1-2.9 3-2.9a2.5 2.5 0 0 0 0-3.3" />
        </svg>
    )
}

export default FounderCard;
