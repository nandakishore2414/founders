import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Video, FileText, TrendingUp, Play, CheckCircle2, HelpCircle, Briefcase, BarChart2, Image as ImageIcon, Plus, X } from 'lucide-react';
import { useData } from '../context/DataContext';

const CreatePost = ({ user, currentUserId }) => {
    const navigate = useNavigate();
    const [selectedFormat, setSelectedFormat] = useState('Video');
    const [formData, setFormData] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { addPost } = useData();

    const formats = [
        { id: 'Video', icon: Video, label: "Explainer Video", desc: "Short video update" },
        { id: 'Thread', icon: FileText, label: "Insight Thread", desc: "Share your learnings" },
        { id: 'Case Study', icon: TrendingUp, label: "Case Study", desc: "Problem, Action, Result" },
        { id: 'Demo', icon: Play, label: "Product Demo", desc: "Showcase a feature" },
        { id: 'Milestone', icon: CheckCircle2, label: "Milestone", desc: "Celebrate a win" },
        { id: 'AMA', icon: HelpCircle, label: "AMA", desc: "Answer questions" },
        { id: 'Hiring', icon: Briefcase, label: "Hiring", desc: "Post a job" },
        { id: 'Poll', icon: BarChart2, label: "Poll", desc: "Get feedback" },
    ];

    return (
        <div className="max-w-3xl mx-auto pb-20 pt-6 px-4 md:px-0">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-1">Create Content</h1>
                <p className="text-gray-500 text-sm">Select a format to structure your update.</p>
            </div>

            {/* Format Selector */}
            <div className="flex gap-4 overflow-x-auto pb-6 mb-4 scrollbar-hide">
                {formats.map((format) => (
                    <button
                        key={format.id}
                        onClick={() => setSelectedFormat(format.id)}
                        className={`flex-shrink-0 w-32 p-3 rounded-xl border text-left transition-all group ${selectedFormat === format.id
                            ? 'border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-200'
                            : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                            }`}
                    >
                        <format.icon className={`w-5 h-5 mb-2 ${selectedFormat === format.id ? 'text-white' : 'text-gray-500 group-hover:text-gray-900'}`} />
                        <div className={`text-xs font-bold mb-0.5 ${selectedFormat === format.id ? 'text-white' : 'text-gray-900'}`}>{format.label}</div>
                        <div className={`text-[10px] ${selectedFormat === format.id ? 'text-gray-400' : 'text-gray-500'}`}>{format.desc}</div>
                    </button>
                ))}
            </div>

            {/* Dynamic Form */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 animate-in fade-in zoom-in-95 duration-200">
                {selectedFormat === 'Video' && <VideoForm formData={formData} setFormData={setFormData} />}
                {selectedFormat === 'Thread' && <ThreadForm formData={formData} setFormData={setFormData} />}
                {selectedFormat === 'Case Study' && <CaseStudyForm formData={formData} setFormData={setFormData} />}
                {selectedFormat === 'Hiring' && <HiringForm formData={formData} setFormData={setFormData} />}
                {selectedFormat === 'Poll' && <PollForm formData={formData} setFormData={setFormData} />}
                {/* Fallback for others */}
                {['Demo', 'Milestone', 'AMA'].includes(selectedFormat) && <GenericForm type={selectedFormat} formData={formData} setFormData={setFormData} />}

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 pt-6 mt-6 border-t border-gray-100">
                    <button
                        onClick={() => navigate('/')}
                        className="px-5 py-2.5 text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                        disabled={isSubmitting}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={async () => {
                            setIsSubmitting(true);
                            try {
                                addPost({
                                    type: selectedFormat,
                                    founderId: currentUserId,
                                    founderName: user?.name || 'Founder',
                                    founderAvatar: user?.avatar || '',
                                    startupName: 'Startup', // Would come from user profile
                                    content: formData,
                                    time: 'just now'
                                });
                                setFormData({});
                                navigate('/');
                            } catch (error) {
                                console.error('Error publishing post:', error);
                                alert('Failed to publish post. Please try again.');
                            } finally {
                                setIsSubmitting(false);
                            }
                        }}
                        disabled={isSubmitting}
                        className={`px-6 py-2.5 text-sm font-bold text-white rounded-lg shadow-lg shadow-gray-200 transition-all transform hover:-translate-y-0.5 ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                    >
                        {isSubmitting ? 'Publishing...' : `Publish ${selectedFormat}`}
                    </button>
                </div>
            </div>
        </div>
    );
};

/* --- Sub-Forms --- */

const VideoForm = () => (
    <div className="space-y-6">
        <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Video Title <span className="text-red-500">*</span></label>
            <input type="text" placeholder="e.g. Introducing our new AI engine" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-0 text-gray-900" />
        </div>
        <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Upload Video</label>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer group bg-gray-50/50">
                <Video className="w-8 h-8 text-gray-400 group-hover:text-blue-500 mb-2 transition-colors" />
                <span className="text-sm text-gray-600 font-medium">Click to upload .mp4 or .mov</span>
                <span className="text-xs text-gray-400 mt-1">Up to 2 minutes (100MB)</span>
            </div>
        </div>
        <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">One-line Summary</label>
            <input type="text" placeholder="What's the main takeaway?" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-0 text-gray-900" />
        </div>
        <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Call to Action</label>
            <div className="flex gap-2">
                <button className="px-4 py-2 rounded-lg border border-blue-200 bg-blue-50 text-blue-700 text-sm font-semibold">Get Demo</button>
                <button className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600 text-sm font-semibold">Join Waitlist</button>
                <button className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600 text-sm font-semibold">Visit Website</button>
            </div>
        </div>
    </div>
);

const ThreadForm = () => (
    <div className="space-y-6">
        <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Thread Title <span className="text-red-500">*</span></label>
            <input type="text" placeholder="e.g. 5 things I learned raising our Seed round" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-0 text-gray-900 text-lg font-bold" />
        </div>
        <div className="space-y-3">
            <label className="block text-sm font-bold text-gray-700">Key Points</label>
            <div className="flex gap-2">
                <span className="mt-2 text-gray-400 font-bold">•</span>
                <textarea rows="2" placeholder="Point 1..." className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-0 text-gray-900 resize-none"></textarea>
            </div>
            <div className="flex gap-2">
                <span className="mt-2 text-gray-400 font-bold">•</span>
                <textarea rows="2" placeholder="Point 2..." className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-0 text-gray-900 resize-none"></textarea>
            </div>
        </div>
        <button className="text-blue-600 text-sm font-semibold hover:underline flex items-center gap-1">
            <Plus className="w-4 h-4" /> Add another point
        </button>
        <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Conclusion (Optional)</label>
            <input type="text" placeholder="The main takeaway..." className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-0 text-gray-900" />
        </div>
    </div>
);

const CaseStudyForm = () => (
    <div className="space-y-6">
        <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Case Study Title</label>
            <input type="text" placeholder="e.g. How we decreased churn..." className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-0 text-gray-900" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                <label className="block text-xs font-bold text-red-600 uppercase mb-2">The Problem</label>
                <textarea rows="4" className="w-full bg-white px-3 py-2 rounded-lg border border-red-100 focus:border-red-300 focus:ring-0 text-sm resize-none" placeholder="What was broken?"></textarea>
            </div>
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                <label className="block text-xs font-bold text-blue-600 uppercase mb-2">Action Taken</label>
                <textarea rows="4" className="w-full bg-white px-3 py-2 rounded-lg border border-blue-100 focus:border-blue-300 focus:ring-0 text-sm resize-none" placeholder="What did you do?"></textarea>
            </div>
            <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                <label className="block text-xs font-bold text-green-600 uppercase mb-2">The Result</label>
                <textarea rows="4" className="w-full bg-white px-3 py-2 rounded-lg border border-green-100 focus:border-green-300 focus:ring-0 text-sm resize-none" placeholder="Metrics & Outcomes?"></textarea>
            </div>
        </div>
    </div>
);

const HiringForm = () => (
    <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Role Title</label>
                <input type="text" placeholder="e.g. Senior Frontend Engineer" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-0 text-gray-900" />
            </div>
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Location</label>
                <input type="text" placeholder="e.g. Remote / NYC" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-0 text-gray-900" />
            </div>
        </div>
        <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Salary / Equity range</label>
            <input type="text" placeholder="e.g. $120k - $160k + 0.5%" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-0 text-gray-900" />
        </div>
        <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Required Skills (Tags)</label>
            <input type="text" placeholder="e.g. React, Node.js, TypeScript (comma separated)" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-0 text-gray-900" />
        </div>
        <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Apply Link</label>
            <input type="text" placeholder="https://..." className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-0 text-gray-900 text-blue-600" />
        </div>
    </div>
);

const PollForm = () => (
    <div className="space-y-6">
        <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Question</label>
            <input type="text" placeholder="Ask something..." className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-0 text-gray-900 font-bold" />
        </div>
        <div className="space-y-3">
            <label className="block text-sm font-bold text-gray-700">Options</label>
            <input type="text" placeholder="Option 1" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-gray-900 text-sm" />
            <input type="text" placeholder="Option 2" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-gray-900 text-sm" />
            <input type="text" placeholder="Option 3" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-gray-900 text-sm" />
        </div>
        <button className="text-blue-600 text-sm font-semibold hover:underline flex items-center gap-1">
            <Plus className="w-4 h-4" /> Add option
        </button>
        <div className="flex items-center gap-2">
            <input type="checkbox" id="results" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
            <label htmlFor="results" className="text-sm text-gray-600 cursor-pointer">Show results immediately</label>
        </div>
    </div>
);

const GenericForm = ({ type, formData, setFormData }) => (
    <div className="space-y-6">
        <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">{type} Title</label>
            <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-0 text-gray-900"
            />
        </div>
        <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
            <textarea
                rows="5"
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-0 text-gray-900 resize-none"
            ></textarea>
        </div>
        <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Attachment (Optional)</label>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer group">
                <ImageIcon className="w-6 h-6 text-gray-400 group-hover:text-gray-600 mb-1" />
                <span className="text-xs text-gray-500">Upload Image/Screenshot</span>
            </div>
        </div>
    </div>
);

export default CreatePost;
