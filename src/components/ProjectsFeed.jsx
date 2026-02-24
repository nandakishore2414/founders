import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket, Heart, MessageCircle, Eye, Users, Tag, Filter, Search, Sparkles, UserPlus } from 'lucide-react';
import { useData } from '../context/DataContext';
import CollaborationRequestModal from './CollaborationRequestModal';

const ProjectsFeed = () => {
    const navigate = useNavigate();
    const { projects, founders, currentFounder, addCollaborationRequest, getCollaborationRequestsForSource } = useData();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStage, setSelectedStage] = useState('All');
    const [selectedIndustry, setSelectedIndustry] = useState('All');
    const [selectedProject, setSelectedProject] = useState(null);
    const [showRequestModal, setShowRequestModal] = useState(false);

    const stages = ['All', 'Idea', 'Validation', 'MVP', 'Early Revenue', 'Scaling'];
    const industries = ['All', 'SaaS', 'FinTech', 'HealthTech', 'EdTech', 'AI/ML', 'E-commerce', 'DevTools'];

    const filteredProjects = projects.filter(project => {
        const matchesSearch = !searchQuery ||
            project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStage = selectedStage === 'All' || project.stage === selectedStage;
        const matchesIndustry = selectedIndustry === 'All' ||
            (project.industry && project.industry.includes(selectedIndustry));
        return matchesSearch && matchesStage && matchesIndustry;
    });

    const getCreatorInfo = (creatorId) => {
        return founders.find(f => f.id === creatorId) || { name: 'Unknown', avatar: '' };
    };

    const openRequestModal = (project) => {
        if (!currentFounder) {
            alert('Please complete your profile before sending requests.');
            return;
        }

        if (project.creatorId === currentFounder.id) {
            alert('You cannot request your own project.');
            return;
        }

        setSelectedProject(project);
        setShowRequestModal(true);
    };

    const closeRequestModal = () => {
        setShowRequestModal(false);
        setSelectedProject(null);
    };

    const handleSubmitRequest = (requestForm) => {
        if (!selectedProject || !currentFounder) return;

        addCollaborationRequest({
            sourceType: 'project',
            sourceId: selectedProject.id,
            sourceTitle: selectedProject.title,
            fromId: currentFounder.id,
            toId: selectedProject.creatorId,
            intent: requestForm.intent,
            compensationType: requestForm.compensationType,
            amount: requestForm.amount,
            message: requestForm.message
        });

        closeRequestModal();
    };

    return (
        <div className="max-w-6xl mx-auto py-4 md:py-6 px-4 md:px-0">
            {/* Header */}
            <div className="mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
                            <Rocket className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
                            Projects & Ideas
                        </h1>
                        <p className="text-gray-600 mt-1 text-sm md:text-base">Discover and support innovative startup ideas</p>
                    </div>
                    <button
                        onClick={() => navigate('/create-project')}
                        className="w-full sm:w-auto px-4 md:px-6 py-2.5 md:py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm md:text-base"
                    >
                        <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
                        Create Project
                    </button>
                </div>

                {/* Search & Filters */}
                <div className="bg-white rounded-xl border border-gray-100 p-4 md:p-5 space-y-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search projects..."
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
                        <div className="flex items-center gap-2 flex-1 min-w-[150px]">
                            <Filter className="w-4 h-4 text-gray-500 flex-shrink-0" />
                            <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Stage:</span>
                            <select
                                value={selectedStage}
                                onChange={(e) => setSelectedStage(e.target.value)}
                                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                            >
                                {stages.map(stage => (
                                    <option key={stage} value={stage}>{stage}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex items-center gap-2 flex-1 min-w-[150px]">
                            <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Industry:</span>
                            <select
                                value={selectedIndustry}
                                onChange={(e) => setSelectedIndustry(e.target.value)}
                                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                            >
                                {industries.map(industry => (
                                    <option key={industry} value={industry}>{industry}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Projects Grid */}
            {filteredProjects.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-100 p-8 md:p-12 text-center">
                    <Rocket className="w-12 h-12 md:w-16 md:h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">No projects yet</h3>
                    <p className="text-sm md:text-base text-gray-600 mb-6">Be the first to share your startup idea!</p>
                    <button
                        onClick={() => navigate('/create-project')}
                        className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors text-sm md:text-base"
                    >
                        Create Your First Project
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {filteredProjects.map(project => {
                        const creator = getCreatorInfo(project.creatorId);
                        const requestCount = getCollaborationRequestsForSource('project', project.id).length;
                        const isOwnProject = project.creatorId === currentFounder?.id;
                        return (
                            <div
                                key={project.id}
                                className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow"
                            >
                                {/* Header */}
                                <div className="p-4 md:p-5 border-b border-gray-100">
                                    <div className="flex items-start justify-between mb-3 gap-2">
                                        <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                                            <img
                                                src={creator.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${creator.name}`}
                                                alt={creator.name}
                                                className="w-8 h-8 md:w-10 md:h-10 rounded-full flex-shrink-0"
                                            />
                                            <div className="min-w-0">
                                                <h3 className="font-semibold text-gray-900 text-sm md:text-base truncate">{creator.name}</h3>
                                                <p className="text-xs text-gray-500">{new Date(project.timestamp).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        <span className="px-2 md:px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-semibold whitespace-nowrap flex-shrink-0">
                                            {project.stage}
                                        </span>
                                    </div>
                                    <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-2 line-clamp-2">{project.title}</h2>
                                    <p className="text-gray-600 text-sm line-clamp-2">{project.description}</p>
                                </div>

                                {/* Tags & Industry */}
                                <div className="px-5 py-3 bg-gray-50 border-b border-gray-100">
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {project.industry && project.industry.slice(0, 3).map(ind => (
                                            <span key={ind} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                                                {ind}
                                            </span>
                                        ))}
                                    </div>
                                    {project.tags && project.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5">
                                            {project.tags.slice(0, 4).map(tag => (
                                                <span key={tag} className="inline-flex items-center gap-1 text-xs text-gray-600">
                                                    <Tag className="w-3 h-3" />
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Looking For */}
                                {project.lookingFor && project.lookingFor.length > 0 && (
                                    <div className="px-5 py-3 border-b border-gray-100">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Users className="w-4 h-4 text-purple-600" />
                                            <span className="text-xs font-semibold text-gray-700">Looking For:</span>
                                        </div>
                                        <div className="flex flex-wrap gap-1.5">
                                            {project.lookingFor.slice(0, 3).map(item => (
                                                <span key={item} className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs">
                                                    {item}
                                                </span>
                                            ))}
                                            {project.lookingFor.length > 3 && (
                                                <span className="px-2 py-1 text-gray-500 text-xs">
                                                    +{project.lookingFor.length - 3} more
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="px-4 md:px-5 py-3 md:py-4 flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-2 md:gap-4">
                                        <button className="flex items-center gap-1 md:gap-1.5 text-gray-600 hover:text-red-600 transition-colors">
                                            <Heart className="w-4 h-4" />
                                            <span className="text-xs md:text-sm font-medium">{project.likes || 0}</span>
                                        </button>
                                        <button className="flex items-center gap-1 md:gap-1.5 text-gray-600 hover:text-blue-600 transition-colors">
                                            <MessageCircle className="w-4 h-4" />
                                            <span className="text-xs md:text-sm font-medium">{project.comments?.length || 0}</span>
                                        </button>
                                        <button className="flex items-center gap-1 md:gap-1.5 text-gray-600 hover:text-gray-900 transition-colors">
                                            <Eye className="w-4 h-4" />
                                            <span className="text-xs md:text-sm font-medium hidden sm:inline">{project.views || 0}</span>
                                        </button>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-gray-500 whitespace-nowrap">{requestCount} requests</span>
                                        <button
                                            onClick={() => openRequestModal(project)}
                                            disabled={isOwnProject}
                                            className={`px-3 md:px-4 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-1.5 ${isOwnProject
                                                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                                    : 'bg-blue-600 text-white hover:bg-blue-700'
                                                }`}
                                        >
                                            <UserPlus className="w-4 h-4" />
                                            {isOwnProject ? 'Your Project' : 'Request to Join'}
                                        </button>
                                    </div>
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
                    contextTitle={selectedProject ? selectedProject.title : ''}
                    intentOptions={[
                        { value: 'join', label: 'Join this project' },
                        { value: 'help', label: 'Offer targeted help' }
                    ]}
                    defaultIntent="join"
                    submitLabel="Send Project Request"
                />
            )}
        </div>
    );
};

export default ProjectsFeed;
