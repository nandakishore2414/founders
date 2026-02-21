import React, { useState } from 'react';
import { MoreHorizontal, Lightbulb, Bookmark, MessageSquare, Briefcase, TrendingUp, CheckCircle2, AlertTriangle, ArrowRight, XCircle, Play, FileText, HelpCircle, BarChart2, Video } from 'lucide-react';

const PostCard = ({
    type, // 'Video', 'Thread', 'Case Study', 'Demo', 'Milestone', 'AMA', 'Hiring', 'Poll'
    founderName,
    founderAvatar,
    startupName,
    time,
    content, // Object containing fields specific to type
    engagement
}) => {
    const [isSaved, setIsSaved] = useState(false);

    const getTypeBadge = (type) => {
        const styles = {
            'Video': { icon: Video, color: 'text-blue-600', bg: 'bg-blue-50' },
            'Thread': { icon: FileText, color: 'text-gray-600', bg: 'bg-gray-100' },
            'Case Study': { icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
            'Demo': { icon: Play, color: 'text-blue-700', bg: 'bg-blue-50' },
            'Milestone': { icon: CheckCircle2, color: 'text-orange-600', bg: 'bg-orange-50' },
            'AMA': { icon: HelpCircle, color: 'text-pink-600', bg: 'bg-pink-50' },
            'Hiring': { icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-50' },
            'Poll': { icon: BarChart2, color: 'text-cyan-600', bg: 'bg-cyan-50' },
        };
        const style = styles[type] || styles['Thread'];
        const Icon = style.icon;

        return (
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${style.bg} ${style.color}`}>
                <Icon className="w-3 h-3" /> {type}
            </span>
        );
    };

    const renderContent = () => {
        switch (type) {
            case 'Video':
                return (
                    <div className="space-y-3">
                        <h3 className="text-lg font-bold text-gray-900">{content.title}</h3>
                        <div className="relative rounded-xl overflow-hidden bg-black aspect-video group cursor-pointer">
                            <img src={content.thumbnail} alt="Video thumbnail" className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Play className="w-5 h-5 text-white fill-current ml-0.5" />
                                </div>
                            </div>
                            <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded font-medium">{content.duration}</span>
                        </div>
                        <p className="text-sm text-gray-600">{content.summary}</p>
                        {content.cta && (
                            <button className="w-full py-2 bg-blue-50 text-blue-600 font-semibold rounded-lg hover:bg-blue-100 transition-colors text-sm">
                                {content.cta}
                            </button>
                        )}
                    </div>
                );
            case 'Thread':
                return (
                    <div className="space-y-3">
                        <h3 className="text-lg font-bold text-gray-900">{content.title}</h3>
                        <ul className="space-y-2 pl-4 border-l-2 border-gray-200">
                            {content.points.map((point, idx) => (
                                <li key={idx} className="text-sm text-gray-700 leading-relaxed">{point}</li>
                            ))}
                        </ul>
                        {content.conclusion && (
                            <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-800 font-medium border border-gray-100">
                                💡 {content.conclusion}
                            </div>
                        )}
                    </div>
                );
            case 'Case Study':
                return (
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-gray-900">{content.title}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                            <div className="bg-red-50 p-3 rounded-lg border border-red-100">
                                <h4 className="text-xs font-bold text-red-600 uppercase mb-1">Problem</h4>
                                <p className="text-xs text-gray-700">{content.problem}</p>
                            </div>
                            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                                <h4 className="text-xs font-bold text-blue-600 uppercase mb-1">Action</h4>
                                <p className="text-xs text-gray-700">{content.action}</p>
                            </div>
                            <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                                <h4 className="text-xs font-bold text-green-600 uppercase mb-1">Result</h4>
                                <p className="text-sm font-bold text-gray-900">{content.result}</p>
                            </div>
                        </div>
                    </div>
                );
            case 'Hiring':
                return (
                    <div className="border border-blue-100 rounded-xl p-4 bg-blue-50/40">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">{content.role}</h3>
                                <div className="text-sm text-gray-500 font-medium">{content.location} • {content.salary}</div>
                            </div>
                            <button className="px-4 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-full hover:bg-blue-700 transition-colors">
                                Apply Now
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                            {content.skills.map((skill, idx) => (
                                <span key={idx} className="px-2 py-0.5 bg-white border border-blue-100 text-blue-600 text-xs rounded-md font-medium">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                );
            case 'Poll':
                return (
                    <div className="space-y-3">
                        <h3 className="text-lg font-bold text-gray-900">{content.question}</h3>
                        <div className="space-y-2">
                            {content.options.map((option, idx) => (
                                <div key={idx} className="relative group cursor-pointer">
                                    <div className="absolute inset-0 bg-cyan-50 rounded-lg w-[40%] group-hover:bg-cyan-100 transition-colors"></div> {/* Mock percentage width */}
                                    <div className="relative px-3 py-2 flex justify-between items-center z-10">
                                        <span className="text-sm font-medium text-gray-700">{option.text}</span>
                                        <span className="text-xs text-gray-500 font-bold">{option.percent}%</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="text-xs text-gray-400 text-right">{content.totalVotes} votes • {content.timeLeft} left</div>
                    </div>
                );
            default:
                return <p className="text-sm text-gray-700">{content.text}</p>;
        }
    };

    return (
        <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-5 hover:shadow-md hover:shadow-blue-50 transition-shadow">
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
                <div className="flex gap-3">
                    <img src={founderAvatar} alt={founderName} className="w-10 h-10 rounded-full border border-gray-100 cursor-pointer" />
                    <div>
                        <div className="flex items-center gap-2">
                            <h3 className="font-bold text-gray-900 text-sm cursor-pointer hover:underline">{startupName}</h3>
                            <span className="text-gray-400 text-xs">• {time}</span>
                        </div>
                        <div className="text-xs text-gray-500">{founderName}</div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {getTypeBadge(type)}
                    <button className="text-gray-400 hover:text-gray-600 p-1">
                        <MoreHorizontal className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Body */}
            <div className="mb-4">
                {renderContent()}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                <div className="flex gap-4">
                    <ActionButton icon={Lightbulb} label="Insightful" count={engagement.insightful} />
                    <ActionButton icon={Bookmark} label="Save" count={engagement.saves} active={isSaved} onClick={() => setIsSaved(!isSaved)} />
                    <ActionButton icon={MessageSquare} label="Discuss" count={engagement.comments} />
                </div>
                <div className="flex gap-2">
                    <button className="text-xs font-semibold text-gray-500 hover:text-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors">
                        Interested
                    </button>
                </div>
            </div>
        </div>
    );
};

const ActionButton = ({ icon: Icon, label, count, active, onClick }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-1.5 transition-colors group ${active ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900'}`}
    >
        <Icon className={`w-4 h-4 group-hover:scale-110 transition-transform ${active ? 'fill-current' : ''}`} />
        <span className="text-xs font-medium">{count}</span>
        <span className="text-xs hidden group-hover:inline">{label}</span>
    </button>
);

export default PostCard;
