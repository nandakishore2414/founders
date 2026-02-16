import React from 'react';
import { UserPlus, MessageSquare, Briefcase, TrendingUp, Users, MapPin, Zap, Star } from 'lucide-react';

const FounderCard = ({
    name,
    avatar,
    startupName,
    positioning,
    industry,
    stage,
    location,
    metric, // e.g. "12k Users" or "$5k MRR"
    openTo, // Array of strings: ['Partnerships', 'Hiring', 'Beta Swap']
    streak,
    onConnect,
    onCollaborate
}) => {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-5 flex flex-col h-full group">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex gap-3">
                    <img src={avatar} alt={name} className="w-12 h-12 rounded-full border border-gray-100 object-cover" />
                    <div>
                        <h3 className="font-bold text-gray-900 leading-tight">{name}</h3>
                        <p className="text-xs text-gray-500 font-medium mb-0.5">{startupName}</p>
                        <div className="flex items-center gap-1 text-[10px] text-gray-400">
                            <MapPin className="w-3 h-3" /> {location}
                        </div>
                    </div>
                </div>
                {streak > 0 && (
                    <div className="flex items-center gap-1 bg-orange-50 text-orange-600 px-2 py-1 rounded-full text-[10px] font-bold border border-orange-100">
                        <Zap className="w-3 h-3 fill-current" /> {streak}
                    </div>
                )}
            </div>

            {/* Positioning */}
            <p className="text-sm text-gray-700 leading-relaxed mb-4 flex-grow">
                {positioning}
            </p>

            {/* Tags & Metrics */}
            <div className="space-y-3 mb-6">
                {/* Industry & Stage */}
                <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-gray-50 text-gray-600 text-[10px] font-semibold rounded-md border border-gray-100 uppercase tracking-wide">
                        {stage}
                    </span>
                    {industry.map((tag, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-50 text-gray-600 text-[10px] font-semibold rounded-md border border-gray-100">
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Key Metric */}
                <div className="flex items-center gap-2 text-xs font-medium text-gray-900 bg-gray-50/50 p-2 rounded-lg border border-gray-100">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span>{metric}</span>
                </div>

                {/* Open To */}
                <div className="flex flex-wrap gap-1.5">
                    {openTo.map((item, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-medium rounded-full border border-blue-100 flex items-center gap-1">
                            <Star className="w-2.5 h-2.5" /> {item}
                        </span>
                    ))}
                </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-3 mt-auto">
                <button
                    onClick={onConnect}
                    className="flex justify-center items-center gap-2 py-2 px-3 bg-white border border-gray-200 hover:border-gray-900 text-gray-700 hover:text-gray-900 rounded-xl text-xs font-bold transition-all"
                >
                    <UserPlus className="w-4 h-4" /> Connect
                </button>
                <button
                    onClick={onCollaborate}
                    className="flex justify-center items-center gap-2 py-2 px-3 bg-gray-900 hover:bg-black text-white rounded-xl text-xs font-bold transition-all shadow-sm"
                >
                    <MessageSquare className="w-4 h-4" /> Collaborate
                </button>
            </div>
        </div>
    );
};

export default FounderCard;
