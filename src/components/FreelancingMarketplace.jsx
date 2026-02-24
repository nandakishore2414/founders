import React, { useState } from 'react';
import { Briefcase, DollarSign, Clock, MapPin, Search, Filter, Plus, Tag, CheckCircle } from 'lucide-react';
import { useData } from '../context/DataContext';
import CollaborationRequestModal from './CollaborationRequestModal';

const FreelancingMarketplace = () => {
    const { freelancingListings, founders, currentFounder, addFreelancingListing, addCollaborationRequest, getCollaborationRequestsForSource } = useData();
    const [activeTab, setActiveTab] = useState('all'); // 'all', 'job', 'service'
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showRequestModal, setShowRequestModal] = useState(false);
    const [selectedListing, setSelectedListing] = useState(null);
    const [formData, setFormData] = useState({
        type: 'job',
        title: '',
        description: '',
        category: '',
        budget: '',
        skills: [],
        location: '',
        duration: ''
    });
    const [skillInput, setSkillInput] = useState('');

    const categories = ['Development', 'Design', 'Marketing', 'Writing', 'Business', 'Other'];
    const filteredListings = freelancingListings.filter(listing => {
        const matchesTab = activeTab === 'all' || listing.type === activeTab;
        const matchesSearch = !searchQuery || 
            listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            listing.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || listing.category === selectedCategory;
        return matchesTab && matchesSearch && matchesCategory;
    });

    const getCreatorInfo = (creatorId) => {
        return founders.find(f => f.id === creatorId) || { name: 'Unknown', avatar: '' };
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title || !formData.description) {
            alert('Please fill in required fields');
            return;
        }

        addFreelancingListing({
            creatorId: 'founder-1', // Current user
            ...formData
        });

        setFormData({ type: 'job', title: '', description: '', category: '', budget: '', skills: [], location: '', duration: '' });
        setShowCreateModal(false);
    };

    const addSkill = () => {
        if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
            setFormData({ ...formData, skills: [...formData.skills, skillInput.trim()] });
            setSkillInput('');
        }
    };

    const openRequestModal = (listing) => {
        if (!currentFounder) {
            alert('Please complete your profile before sending requests.');
            return;
        }

        if (listing.creatorId === currentFounder.id) {
            alert('You cannot request your own listing.');
            return;
        }

        setSelectedListing(listing);
        setShowRequestModal(true);
    };

    const closeRequestModal = () => {
        setShowRequestModal(false);
        setSelectedListing(null);
    };

    const handleSubmitRequest = (requestForm) => {
        if (!selectedListing || !currentFounder) return;

        addCollaborationRequest({
            sourceType: 'freelance',
            sourceId: selectedListing.id,
            sourceTitle: selectedListing.title,
            fromId: currentFounder.id,
            toId: selectedListing.creatorId,
            intent: requestForm.intent,
            compensationType: requestForm.compensationType,
            amount: requestForm.amount,
            message: requestForm.message
        });

        closeRequestModal();
    };

    return (
        <div className="max-w-6xl mx-auto py-6">
            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                            <Briefcase className="w-8 h-8 text-purple-600" />
                            Freelancing Marketplace
                        </h1>
                        <p className="text-gray-600 mt-1">Find talent or offer your services</p>
                    </div>
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        Post {activeTab === 'service' ? 'Service' : 'Job'}
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-4">
                    <button
                        onClick={() => setActiveTab('all')}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            activeTab === 'all'
                                ? 'bg-purple-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                        All Listings
                    </button>
                    <button
                        onClick={() => setActiveTab('job')}
                        className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${
                            activeTab === 'job'
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                        <Briefcase className="w-4 h-4" />
                        Jobs
                    </button>
                    <button
                        onClick={() => setActiveTab('service')}
                        className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${
                            activeTab === 'service'
                                ? 'bg-green-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                        <CheckCircle className="w-4 h-4" />
                        Services
                    </button>
                </div>

                {/* Search & Filters */}
                <div className="bg-white rounded-xl border border-gray-100 p-4 flex flex-wrap gap-4">
                    <div className="flex-1 min-w-[200px] relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search listings..."
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4 text-gray-500" />
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="All">All Categories</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Listings Grid */}
            {filteredListings.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
                    <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No listings yet</h3>
                    <p className="text-gray-600 mb-6">Be the first to post a job or offer a service!</p>
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors"
                    >
                        Create Listing
                    </button>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 gap-6">
                    {filteredListings.map(listing => {
                        const creator = getCreatorInfo(listing.creatorId);
                        const requestCount = getCollaborationRequestsForSource('freelance', listing.id).length;
                        const isOwnListing = listing.creatorId === currentFounder?.id;
                        return (
                            <div
                                key={listing.id}
                                className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow"
                            >
                                {/* Header */}
                                <div className="p-5 border-b border-gray-100">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={creator.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${creator.name}`}
                                                alt={creator.name}
                                                className="w-10 h-10 rounded-full"
                                            />
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{creator.name}</h3>
                                                <p className="text-xs text-gray-500">{new Date(listing.timestamp).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                                            listing.type === 'job'
                                                ? 'bg-blue-100 text-blue-700'
                                                : 'bg-green-100 text-green-700'
                                        }`}>
                                            {listing.type === 'job' ? 'Job' : 'Service'}
                                        </span>
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900 mb-2">{listing.title}</h2>
                                    <p className="text-gray-600 text-sm line-clamp-2 mb-3">{listing.description}</p>
                                    {listing.category && (
                                        <span className="inline-block px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs font-medium mb-2">
                                            {listing.category}
                                        </span>
                                    )}
                                </div>

                                {/* Details */}
                                <div className="px-5 py-3 bg-gray-50 border-b border-gray-100 space-y-2">
                                    {listing.budget && (
                                        <div className="flex items-center gap-2 text-sm">
                                            <DollarSign className="w-4 h-4 text-green-600" />
                                            <span className="font-semibold text-gray-900">{listing.budget}</span>
                                        </div>
                                    )}
                                    {listing.duration && (
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Clock className="w-4 h-4" />
                                            <span>{listing.duration}</span>
                                        </div>
                                    )}
                                    {listing.location && (
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <MapPin className="w-4 h-4" />
                                            <span>{listing.location}</span>
                                        </div>
                                    )}
                                    {listing.skills && listing.skills.length > 0 && (
                                        <div className="pt-2">
                                            <div className="flex flex-wrap gap-1.5">
                                                {listing.skills.slice(0, 4).map(skill => (
                                                    <span key={skill} className="inline-flex items-center gap-1 px-2 py-1 bg-white border border-gray-200 text-gray-700 rounded text-xs">
                                                        <Tag className="w-3 h-3" />
                                                        {skill}
                                                    </span>
                                                ))}
                                                {listing.skills.length > 4 && (
                                                    <span className="text-xs text-gray-500">+{listing.skills.length - 4} more</span>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="px-5 py-4 flex items-center justify-between">
                                    <span className="text-sm text-gray-600">
                                        {requestCount} {listing.type === 'job' ? 'applications' : 'requests'}
                                    </span>
                                    <button
                                        onClick={() => openRequestModal(listing)}
                                        disabled={isOwnListing}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isOwnListing
                                                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                                : listing.type === 'job'
                                                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                                                    : 'bg-green-600 text-white hover:bg-green-700'
                                            }`}
                                    >
                                        {isOwnListing ? 'Your Listing' : listing.type === 'job' ? 'Apply Now' : 'Get Service'}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {showRequestModal && (
                <CollaborationRequestModal
                    onClose={closeRequestModal}
                    onSubmit={handleSubmitRequest}
                    contextTitle={selectedListing ? selectedListing.title : ''}
                    intentOptions={selectedListing?.type === 'job'
                        ? [
                            { value: 'apply', label: 'Apply for this job' },
                            { value: 'help', label: 'Offer part-time help' }
                        ]
                        : [
                            { value: 'hire_service', label: 'Request this service' }
                        ]}
                    defaultIntent={selectedListing?.type === 'job' ? 'apply' : 'hire_service'}
                    submitLabel="Send Freelance Request"
                />
            )}

            {/* Create Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-4 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-white">Create {formData.type === 'job' ? 'Job' : 'Service'} Listing</h2>
                            <button
                                onClick={() => setShowCreateModal(false)}
                                className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center text-white"
                            >
                                ×
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">Type</label>
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, type: 'job' })}
                                        className={`flex-1 px-4 py-2 rounded-lg font-medium ${
                                            formData.type === 'job'
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-100 text-gray-700'
                                        }`}
                                    >
                                        Post a Job
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, type: 'service' })}
                                        className={`flex-1 px-4 py-2 rounded-lg font-medium ${
                                            formData.type === 'service'
                                                ? 'bg-green-600 text-white'
                                                : 'bg-gray-100 text-gray-700'
                                        }`}
                                    >
                                        Offer a Service
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">Title *</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder={formData.type === 'job' ? 'e.g., Need React Developer' : 'e.g., React Development Services'}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">Description *</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows="4"
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                                    required
                                />
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-2">Category</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                                    >
                                        <option value="">Select category</option>
                                        {categories.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-2">Budget</label>
                                    <input
                                        type="text"
                                        value={formData.budget}
                                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                        placeholder="e.g., $500-$1000"
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                                    />
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-2">Duration</label>
                                    <input
                                        type="text"
                                        value={formData.duration}
                                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                        placeholder="e.g., 2-4 weeks"
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-2">Location</label>
                                    <input
                                        type="text"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        placeholder="e.g., Remote, San Francisco"
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">Required Skills</label>
                                <div className="flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        value={skillInput}
                                        onChange={(e) => setSkillInput(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                                        placeholder="Add skill"
                                        className="flex-1 px-4 py-2 border border-gray-200 rounded-lg"
                                    />
                                    <button type="button" onClick={addSkill} className="px-4 py-2 bg-gray-100 rounded-lg">
                                        Add
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {formData.skills.map(skill => (
                                        <span key={skill} className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-sm">
                                            {skill} ×
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowCreateModal(false)}
                                    className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700"
                                >
                                    Post Listing
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FreelancingMarketplace;
