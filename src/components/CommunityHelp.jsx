import React, { useState } from 'react';
import { HelpCircle, HandHeart, MessageSquare, ThumbsUp, Filter, Search, Plus, Tag } from 'lucide-react';
import { useData } from '../context/DataContext';

const CommunityHelp = ({ onNavigate }) => {
    const { communityPosts, founders, addCommunityPost } = useData();
    const [activeTab, setActiveTab] = useState('all'); // 'all', 'ask', 'offer'
    const [searchQuery, setSearchQuery] = useState('');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [formData, setFormData] = useState({
        type: 'ask',
        title: '',
        description: '',
        category: '',
        tags: []
    });
    const [tagInput, setTagInput] = useState('');

    const categories = ['Technical', 'Business', 'Design', 'Marketing', 'Legal', 'Funding', 'Product', 'Other'];
    const tagsOptions = ['React', 'Node.js', 'Marketing', 'Design', 'Funding', 'Legal', 'Product', 'Growth'];

    const filteredPosts = communityPosts.filter(post => {
        const matchesTab = activeTab === 'all' || post.type === activeTab;
        const matchesSearch = !searchQuery || 
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    });

    const getAuthorInfo = (authorId) => {
        return founders.find(f => f.id === authorId) || { name: 'Unknown', avatar: '' };
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title || !formData.description) {
            alert('Please fill in required fields');
            return;
        }

        addCommunityPost({
            authorId: 'founder-1', // Current user
            ...formData
        });

        setFormData({ type: 'ask', title: '', description: '', category: '', tags: [] });
        setShowCreateModal(false);
    };

    const addTag = () => {
        if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
            setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
            setTagInput('');
        }
    };

    return (
        <div className="max-w-6xl mx-auto py-6">
            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                            <HandHeart className="w-8 h-8 text-green-600" />
                            Community Help
                        </h1>
                        <p className="text-gray-600 mt-1">Ask questions, offer help, and grow together</p>
                    </div>
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        Ask for Help
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-4">
                    <button
                        onClick={() => setActiveTab('all')}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            activeTab === 'all'
                                ? 'bg-green-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                        All Posts
                    </button>
                    <button
                        onClick={() => setActiveTab('ask')}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                            activeTab === 'ask'
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                        <HelpCircle className="w-4 h-4" />
                        Asking for Help
                    </button>
                    <button
                        onClick={() => setActiveTab('offer')}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                            activeTab === 'offer'
                                ? 'bg-purple-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                        <HandHeart className="w-4 h-4" />
                        Offering Help
                    </button>
                </div>

                {/* Search */}
                <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search community posts..."
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                </div>
            </div>

            {/* Posts List */}
            {filteredPosts.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
                    <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts yet</h3>
                    <p className="text-gray-600 mb-6">Be the first to ask for help or offer assistance!</p>
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors"
                    >
                        Create Post
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredPosts.map(post => {
                        const author = getAuthorInfo(post.authorId);
                        return (
                            <div
                                key={post.id}
                                className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-start gap-4">
                                    <img
                                        src={author.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${author.name}`}
                                        alt={author.name}
                                        className="w-12 h-12 rounded-full"
                                    />
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-semibold text-gray-900">{author.name}</span>
                                                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                                                        post.type === 'ask'
                                                            ? 'bg-blue-100 text-blue-700'
                                                            : 'bg-purple-100 text-purple-700'
                                                    }`}>
                                                        {post.type === 'ask' ? 'Asking' : 'Offering'}
                                                    </span>
                                                    {post.category && (
                                                        <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs">
                                                            {post.category}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-xs text-gray-500">
                                                    {new Date(post.timestamp).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">{post.title}</h3>
                                        <p className="text-gray-700 mb-3">{post.description}</p>
                                        {post.tags && post.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5 mb-3">
                                                {post.tags.map(tag => (
                                                    <span key={tag} className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                                                        <Tag className="w-3 h-3" />
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                        <div className="flex items-center gap-4 pt-3 border-t border-gray-100">
                                            <button className="flex items-center gap-1.5 text-gray-600 hover:text-green-600 transition-colors">
                                                <ThumbsUp className="w-4 h-4" />
                                                <span className="text-sm font-medium">{post.helpful || 0} Helpful</span>
                                            </button>
                                            <button className="flex items-center gap-1.5 text-gray-600 hover:text-blue-600 transition-colors">
                                                <MessageSquare className="w-4 h-4" />
                                                <span className="text-sm font-medium">{post.responses?.length || 0} Responses</span>
                                            </button>
                                            <button className="ml-auto px-4 py-1.5 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                                                {post.type === 'ask' ? 'Offer Help' : 'Get Help'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Create Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-white">Create Community Post</h2>
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
                                        onClick={() => setFormData({ ...formData, type: 'ask' })}
                                        className={`flex-1 px-4 py-2 rounded-lg font-medium ${
                                            formData.type === 'ask'
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-100 text-gray-700'
                                        }`}
                                    >
                                        Ask for Help
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, type: 'offer' })}
                                        className={`flex-1 px-4 py-2 rounded-lg font-medium ${
                                            formData.type === 'offer'
                                                ? 'bg-purple-600 text-white'
                                                : 'bg-gray-100 text-gray-700'
                                        }`}
                                    >
                                        Offer Help
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">Title *</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
                                <label className="block text-sm font-semibold text-gray-900 mb-2">Tags</label>
                                <div className="flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        value={tagInput}
                                        onChange={(e) => setTagInput(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                                        placeholder="Add tag"
                                        className="flex-1 px-4 py-2 border border-gray-200 rounded-lg"
                                    />
                                    <button type="button" onClick={addTag} className="px-4 py-2 bg-gray-100 rounded-lg">
                                        Add
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {formData.tags.map(tag => (
                                        <span key={tag} className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm">
                                            {tag} ×
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
                                    className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700"
                                >
                                    Post
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CommunityHelp;
