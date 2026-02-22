import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Rocket, Sparkles, Tag, Users, Target, ArrowRight } from 'lucide-react';
import { useData } from '../context/DataContext';

const CreateProject = ({ user, currentUserId }) => {
    const navigate = useNavigate();
    const { addProject } = useData();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        industry: [],
        stage: 'Idea',
        lookingFor: [],
        tags: [],
        problem: '',
        solution: '',
        targetAudience: ''
    });
    const [tagInput, setTagInput] = useState('');

    const industries = ['SaaS', 'FinTech', 'HealthTech', 'EdTech', 'E-commerce', 'AI/ML', 'DevTools', 'B2B', 'B2C', 'Logistics', 'Other'];
    const stages = ['Idea', 'Validation', 'MVP', 'Early Revenue', 'Scaling'];
    const lookingForOptions = ['Co-founder', 'Technical Co-founder', 'Designer', 'Developer', 'Marketing', 'Funding', 'Advisors', 'Beta Testers', 'Partners'];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title || !formData.description) {
            alert('Please fill in required fields');
            return;
        }

        addProject({
            creatorId: currentUserId,
            creatorName: user.name,
            creatorAvatar: user.avatar,
            ...formData
        });

        // Reset form
        setFormData({
            title: '',
            description: '',
            industry: [],
            stage: 'Idea',
            lookingFor: [],
            tags: [],
            problem: '',
            solution: '',
            targetAudience: ''
        });
        navigate('/projects');
    };

    const addTag = () => {
        if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
            setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
            setTagInput('');
        }
    };

    const removeTag = (tag) => {
        setFormData({ ...formData, tags: formData.tags.filter(t => t !== tag) });
    };

    const toggleArrayItem = (arrayName, item) => {
        const currentArray = formData[arrayName];
        if (currentArray.includes(item)) {
            setFormData({ ...formData, [arrayName]: currentArray.filter(i => i !== item) });
        } else {
            setFormData({ ...formData, [arrayName]: [...currentArray, item] });
        }
    };

    return (
        <div className="max-w-3xl mx-auto py-4 md:py-6 px-4 md:px-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 md:px-6 py-4 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Rocket className="w-4 h-4 md:w-5 md:h-5 text-white" />
                        </div>
                        <div className="min-w-0">
                            <h2 className="text-lg md:text-xl font-bold text-white">Create New Project/Idea</h2>
                            <p className="text-blue-100 text-xs md:text-sm">Share your startup idea with the community</p>
                        </div>
                    </div>
                    <button
                        onClick={() => navigate('/projects')}
                        className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors flex-shrink-0"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-4 md:space-y-6">
                    {/* Project Title */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                            Project Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="e.g., AI-powered task management for remote teams"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>

                    {/* Problem & Solution */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                Problem Statement
                            </label>
                            <textarea
                                value={formData.problem}
                                onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                                placeholder="What problem are you solving?"
                                rows="3"
                                className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                Your Solution
                            </label>
                            <textarea
                                value={formData.solution}
                                onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                                placeholder="How are you solving it?"
                                rows="3"
                                className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                            Detailed Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Tell us more about your project..."
                            rows="5"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>

                    {/* Industry & Stage */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                Industry <span className="text-red-500">*</span>
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {industries.map(industry => (
                                    <button
                                        key={industry}
                                        type="button"
                                        onClick={() => toggleArrayItem('industry', industry)}
                                        className={`px-2.5 md:px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-colors ${formData.industry.includes(industry)
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {industry}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                Stage <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={formData.stage}
                                onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                                className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                            >
                                {stages.map(stage => (
                                    <option key={stage} value={stage}>{stage}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Looking For */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            Looking For
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {lookingForOptions.map(option => (
                                <button
                                    key={option}
                                    type="button"
                                    onClick={() => toggleArrayItem('lookingFor', option)}
                                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${formData.lookingFor.includes(option)
                                            ? 'bg-purple-600 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Tags */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                            <Tag className="w-4 h-4" />
                            Tags
                        </label>
                        <div className="flex gap-2 mb-2">
                            <input
                                type="text"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                                placeholder="Add tags (press Enter)"
                                className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <button
                                type="button"
                                onClick={addTag}
                                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium"
                            >
                                Add
                            </button>
                        </div>
                        {formData.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {formData.tags.map(tag => (
                                    <span
                                        key={tag}
                                        className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm"
                                    >
                                        {tag}
                                        <button
                                            type="button"
                                            onClick={() => removeTag(tag)}
                                            className="hover:text-blue-900"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Target Audience */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                            <Target className="w-4 h-4" />
                            Target Audience
                        </label>
                        <input
                            type="text"
                            value={formData.targetAudience}
                            onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                            placeholder="e.g., Small business owners, Remote teams, Students"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-4 border-t border-gray-100">
                        <button
                            type="button"
                            onClick={() => navigate('/projects')}
                            className="w-full sm:w-auto px-6 py-2.5 text-gray-700 hover:bg-gray-100 rounded-xl font-medium transition-colors text-sm md:text-base"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm md:text-base"
                        >
                            <Sparkles className="w-4 h-4" />
                            Publish Project
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProject;
