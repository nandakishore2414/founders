import React, { useState } from 'react';
import { CheckCircle2, TrendingUp, ArrowRight, XCircle, Lightbulb, DollarSign, MessageCircle, Users, Image as ImageIcon, X, Lock } from 'lucide-react';
import { useData } from '../context/DataContext';
import AccessRestricted from './AccessRestricted';

const CreateBuildUpdate = ({ onCancel, hasRole, user, currentUserId }) => {
    const [selectedType, setSelectedType] = useState('Feature Shipped');
    const [headline, setHeadline] = useState('');
    const [whatWeDid, setWhatWeDid] = useState('');
    const [outcome, setOutcome] = useState('');
    const [lesson, setLesson] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { addBuildUpdate } = useData();

    if (!hasRole('founder')) {
        return (
            <AccessRestricted
                role="founder"
                message="Founder Access Only"
                description="Only verified founders can post build updates. Switch to Founder Mode to access this feature."
            />
        );
    }

    const types = [
        { id: 'Feature Shipped', icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
        { id: 'Milestone', icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50' },
        { id: 'Pivot', icon: ArrowRight, color: 'text-purple-600', bg: 'bg-purple-50' },
        { id: 'Failure', icon: XCircle, color: 'text-red-600', bg: 'bg-red-50' },
        { id: 'Revenue', icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { id: 'Insight', icon: Lightbulb, color: 'text-amber-600', bg: 'bg-amber-50' },
        { id: 'Hiring', icon: Users, color: 'text-pink-600', bg: 'bg-pink-50' },
    ];

    return (
        <div className="max-w-2xl mx-auto pb-20 pt-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Share a Build Update</h1>
            <p className="text-gray-500 mb-8 text-sm">Structured updates only. Clear, concise, outcome-driven.</p>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-8">

                {/* 1. Type Selector */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">Update Type <span className="text-red-500">*</span></label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {types.map((type) => (
                            <button
                                key={type.id}
                                onClick={() => setSelectedType(type.id)}
                                className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${selectedType === type.id
                                    ? `border-gray-900 bg-gray-50 ring-1 ring-gray-900`
                                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50/50'
                                    }`}
                            >
                                <div className={`p-2 rounded-full ${type.bg} ${type.color}`}>
                                    <type.icon className="w-5 h-5" />
                                </div>
                                <span className={`text-xs font-semibold ${selectedType === type.id ? 'text-gray-900' : 'text-gray-500'}`}>
                                    {type.id}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* 2. Headline */}
                <div>
                    <div className="flex justify-between mb-1">
                        <label className="block text-sm font-bold text-gray-700">Headline <span className="text-red-500">*</span></label>
                        <span className="text-xs text-gray-400">{headline.length}/60</span>
                    </div>
                    <input
                        type="text"
                        value={headline}
                        onChange={(e) => setHeadline(e.target.value.slice(0, 60))}
                        placeholder="e.g. Launched onboarding v2"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-0 transition-colors text-gray-900 font-medium placeholder:font-normal"
                        maxLength={60}
                    />
                </div>

                {/* 3. What We Did */}
                <div>
                    <div className="flex justify-between mb-1">
                        <label className="block text-sm font-bold text-gray-700">What We Did <span className="text-red-500">*</span></label>
                        <span className="text-xs text-gray-400">{whatWeDid.length}/300</span>
                    </div>
                    <textarea
                        rows="3"
                        value={whatWeDid}
                        onChange={(e) => setWhatWeDid(e.target.value.slice(0, 300))}
                        placeholder="Explain clearly what changed..."
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-0 transition-colors text-gray-900 resize-none"
                        maxLength={300}
                    ></textarea>
                </div>

                {/* 4. Outcome & Lesson (Grid) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Outcome / Result <span className="text-xs font-normal text-gray-400">(Optional)</span></label>
                        <textarea
                            rows="3"
                            value={outcome}
                            onChange={(e) => setOutcome(e.target.value)}
                            placeholder="e.g. User activation increased by 18%"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-0 transition-colors text-gray-900 resize-none bg-blue-50/20 focus:bg-white"
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Key Lesson <span className="text-xs font-normal text-gray-400">(Optional)</span></label>
                        <textarea
                            rows="3"
                            value={lesson}
                            onChange={(e) => setLesson(e.target.value)}
                            placeholder="Short insight other founders can apply..."
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-0 transition-colors text-gray-900 resize-none bg-amber-50/20 focus:bg-white"
                        ></textarea>
                    </div>
                </div>

                {/* 5. Attachments */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">Attachments</label>
                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer group">
                        <div className="p-3 bg-gray-100 rounded-full mb-3 group-hover:bg-white group-hover:shadow-sm transition-all">
                            <ImageIcon className="w-6 h-6 text-gray-400 group-hover:text-gray-600" />
                        </div>
                        <span className="text-sm text-gray-600 font-medium">Click to upload image or video</span>
                        <span className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 5MB</span>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                    <button
                        onClick={onCancel}
                        className="px-5 py-2.5 text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                        disabled={isSubmitting}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={async () => {
                            if (!headline.trim() || !whatWeDid.trim()) {
                                alert('Please fill in the required fields (Headline and What We Did)');
                                return;
                            }
                            setIsSubmitting(true);
                            try {
                                addBuildUpdate({
                                    type: selectedType,
                                    headline: headline.trim(),
                                    whatWeDid: whatWeDid.trim(),
                                    outcome: outcome.trim() || undefined,
                                    lesson: lesson.trim() || undefined,
                                    founderId: currentUserId,
                                    founderName: user?.name || 'Founder',
                                    founderAvatar: user?.avatar || '',
                                    startupName: 'Startup' // Would come from user profile
                                });
                                onCancel(); // Navigate back
                            } catch (error) {
                                console.error('Error publishing update:', error);
                                alert('Failed to publish update. Please try again.');
                            } finally {
                                setIsSubmitting(false);
                            }
                        }}
                        disabled={isSubmitting || !headline.trim() || !whatWeDid.trim()}
                        className={`px-6 py-2.5 text-sm font-bold text-white rounded-lg shadow-lg shadow-gray-200 transition-all transform hover:-translate-y-0.5 ${
                            isSubmitting || !headline.trim() || !whatWeDid.trim()
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-gray-900 hover:bg-black'
                        }`}
                    >
                        {isSubmitting ? 'Publishing...' : 'Publish Update'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateBuildUpdate;
