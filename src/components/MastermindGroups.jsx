import React from 'react';
import { Users, Lock, ChevronRight, MessageSquare, Video, FileText } from 'lucide-react';

const MastermindGroups = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GroupCard
                name="SaaS Scaling < $10k"
                members={8}
                maxMembers={12}
                industry="SaaS"
                description="Weekly accountability for early-stage SaaS founders focusing on first revenue."
                tags={['Pre-revenue', 'B2B']}
            />
            <GroupCard
                name="AI Product Builders"
                members={11}
                maxMembers={15}
                industry="AI/ML"
                description="Deep dives into LLM integration and prompt engineering strategies."
                tags={['Generative AI', 'Tech']}
            />
            <GroupCard
                name="Marketplace Growth"
                members={6}
                maxMembers={10}
                industry="Marketplace"
                description="Solving chicken-and-egg problems in 2-sided marketplaces."
                tags={['Consumer', 'Growth']}
            />
        </div>
    );
};

const GroupCard = ({ name, members, maxMembers, industry, description, tags }) => (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col h-full hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-900 text-white rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="font-bold text-gray-900">{name}</h3>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Lock className="w-3 h-3" />
                        <span>Private Group</span>
                    </div>
                </div>
            </div>
            <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded-md">
                {members}/{maxMembers}
            </span>
        </div>

        <p className="text-sm text-gray-600 mb-6 flex-grow">
            {description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag, idx) => (
                <span key={idx} className="text-[10px] font-semibold bg-gray-50 text-gray-600 px-2 py-1 rounded-md border border-gray-100">
                    {tag}
                </span>
            ))}
        </div>

        <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
            <div className="flex -space-x-2">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-7 h-7 rounded-full bg-gray-200 border-2 border-white"></div>
                ))}
                <div className="w-7 h-7 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-gray-500">
                    +{members - 3}
                </div>
            </div>
            <button className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors">
                Request to Join <ChevronRight className="w-3 h-3" />
            </button>
        </div>
    </div>
);

export default MastermindGroups;
