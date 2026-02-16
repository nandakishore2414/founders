import React from 'react';
import { MoreHorizontal, Lightbulb, Bookmark, MessageSquare, Briefcase, TrendingUp, CheckCircle2, AlertTriangle, ArrowRight, XCircle } from 'lucide-react';

const BuildUpdateCard = ({
    founderName,
    founderAvatar,
    startupName,
    time,
    type,
    headline,
    whatWeDid,
    outcome,
    lesson,
    image,
    insightCount,
    saveCount,
    commentCount
}) => {

    const getTypeStyles = (type) => {
        switch (type) {
            case 'Feature Shipped': return { icon: CheckCircle2, bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-100' };
            case 'Milestone': return { icon: TrendingUp, bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-100' };
            case 'Pivot': return { icon: ArrowRight, bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-100' };
            case 'Failure': return { icon: XCircle, bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-100' };
            case 'Lesson': return { icon: Lightbulb, bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-100' };
            default: return { icon: CheckCircle2, bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-100' };
        }
    };

    const style = getTypeStyles(type);
    const TypeIcon = style.icon;

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
                <div className="flex gap-3">
                    <img src={founderAvatar} alt={founderName} className="w-10 h-10 rounded-full border border-gray-100" />
                    <div>
                        <div className="flex items-center gap-2">
                            <h3 className="font-bold text-gray-900 text-sm">{startupName}</h3>
                            <span className="text-gray-400 text-xs">• {time}</span>
                        </div>
                        <div className="text-xs text-gray-500">{founderName}</div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${style.bg} ${style.text} ${style.border} border`}>
                        <TypeIcon className="w-3 h-3" /> {type}
                    </span>
                    <button className="text-gray-400 hover:text-gray-600 p-1">
                        <MoreHorizontal className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="mb-4 space-y-3">
                <h2 className="text-lg font-bold text-gray-900 leading-tight">{headline}</h2>

                <div className="space-y-4">
                    {/* What We Did */}
                    <div className="pl-3 border-l-2 border-gray-200">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">What we did</h4>
                        <p className="text-sm text-gray-700 leading-relaxed">{whatWeDid}</p>
                    </div>

                    {/* Outcome (Optional) */}
                    {outcome && (
                        <div className="pl-3 border-l-2 border-blue-200 bg-blue-50/30 py-2 pr-2 rounded-r-lg">
                            <h4 className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-1">The Outcome</h4>
                            <p className="text-sm text-gray-800 font-medium">{outcome}</p>
                        </div>
                    )}

                    {/* Lesson (Optional) */}
                    {lesson && (
                        <div className="pl-3 border-l-2 border-amber-200 bg-amber-50/30 py-2 pr-2 rounded-r-lg">
                            <h4 className="text-xs font-bold text-amber-600 uppercase tracking-wide mb-1">Key Lesson</h4>
                            <p className="text-sm text-gray-800 italic">"{lesson}"</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Media */}
            {image && (
                <div className="mb-4 rounded-xl overflow-hidden border border-gray-100">
                    <img src={image} alt="Update media" className="w-full h-auto object-cover max-h-[400px]" />
                </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                <div className="flex gap-4">
                    <ActionButton icon={Lightbulb} label="Insightful" count={insightCount} />
                    <ActionButton icon={Bookmark} label="Save" count={saveCount} />
                    <ActionButton icon={MessageSquare} label="Discuss" count={commentCount} />
                </div>

                <div className="flex gap-2">
                    <button className="text-xs font-semibold text-gray-500 hover:text-indigo-600 px-3 py-1.5 rounded-lg hover:bg-indigo-50 transition-colors">
                        Interested User
                    </button>
                    <button className="text-xs font-semibold text-gray-500 hover:text-green-600 px-3 py-1.5 rounded-lg hover:bg-green-50 transition-colors flex items-center gap-1">
                        <Briefcase className="w-3 h-3" /> Investor
                    </button>
                </div>
            </div>
        </div>
    );
};

const ActionButton = ({ icon: Icon, label, count }) => (
    <button className="flex items-center gap-1.5 text-gray-500 hover:text-gray-900 transition-colors group">
        <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
        <span className="text-xs font-medium">{count}</span>
        <span className="text-xs hidden group-hover:inline">{label}</span>
    </button>
);

export default BuildUpdateCard;
