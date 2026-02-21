import React from 'react';
import {
    Zap, Rocket, PenSquare, Flame, Star,
    UserPlus, ChevronRight, Activity, Users
} from 'lucide-react';
import { useData } from '../context/DataContext';

const LeftSidebar = ({ currentView, onNavigate }) => {
    const { currentFounder, getBuildUpdatesByFounder, connections } = useData();

    // Derived state
    const founderId = currentFounder?.id || 'founder-1';
    const buildUpdates = getBuildUpdatesByFounder(founderId);
    const recentUpdateCount = buildUpdates.length;
    const pendingConnections = connections.filter(c => c.toId === founderId && c.status === 'pending');

    const formattedScore = currentFounder?.reputation ? currentFounder.reputation.toLocaleString() : '0';

    return (
        <div className="py-4 sticky top-20 flex flex-col gap-5 items-stretch pr-2 max-h-[calc(100vh-6rem)] overflow-y-auto scrollbar-thin">

            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-blue-100 overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-blue-50">
                    <Zap className="w-4 h-4 text-blue-600" />
                    <h3 className="text-xs font-bold text-gray-900 uppercase tracking-tight">Quick Actions</h3>
                </div>
                <div className="p-2 space-y-1">
                    <button
                        onClick={() => onNavigate('create-update')}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-blue-50/60 transition-colors group text-left"
                    >
                        <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                            <Rocket className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-700">Share Build Update</span>
                    </button>

                    <button
                        onClick={() => onNavigate('create-post')}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-blue-50/60 transition-colors group text-left"
                    >
                        <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                            <PenSquare className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-700">Create Post</span>
                    </button>
                </div>
            </div>

            {/* Your Activity */}
            <div className="bg-white rounded-xl border border-blue-100 overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-blue-50">
                    <Activity className="w-4 h-4 text-blue-600" />
                    <h3 className="text-xs font-bold text-gray-900 uppercase tracking-tight">Your Activity</h3>
                </div>
                <div className="p-4 space-y-4">
                    {/* Streak */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-blue-50 rounded-md">
                                <Flame className="w-4 h-4 text-blue-500" />
                            </div>
                            <span className="text-sm font-medium text-gray-600">Build Streak</span>
                        </div>
                        <span className="text-sm font-bold text-gray-900">{currentFounder?.streak || 0} Days</span>
                    </div>

                    {/* Updates */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-blue-50 rounded-md">
                                <Rocket className="w-4 h-4 text-blue-500" />
                            </div>
                            <span className="text-sm font-medium text-gray-600">Total Updates</span>
                        </div>
                        <span className="text-sm font-bold text-gray-900">{recentUpdateCount}</span>
                    </div>

                    {/* Reputation */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-blue-50 rounded-md">
                                <Star className="w-4 h-4 text-blue-500" />
                            </div>
                            <span className="text-sm font-medium text-gray-600">Reputation</span>
                        </div>
                        <span className="text-sm font-bold text-gray-900">{formattedScore}</span>
                    </div>
                </div>
                <div className="px-4 py-2 bg-blue-50/50 border-t border-blue-50">
                    <button
                        onClick={() => onNavigate('profile')}
                        className="text-[10px] font-bold text-blue-600 hover:text-blue-700 transition-colors w-full text-center py-1"
                    >
                        View full profile stats
                    </button>
                </div>
            </div>

            {/* Connections */}
            <div className="bg-white rounded-xl border border-blue-100 overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-blue-50">
                    <Users className="w-4 h-4 text-blue-600" />
                    <h3 className="text-xs font-bold text-gray-900 uppercase tracking-tight">Connections</h3>
                </div>

                {pendingConnections.length > 0 ? (
                    <div className="p-2 space-y-1">
                        {pendingConnections.slice(0, 3).map((conn, i) => (
                            <div key={conn.id || i} className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-blue-50/60 transition-colors">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-600">
                                        U
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-semibold text-gray-900">New Request</p>
                                        <p className="text-[10px] text-gray-500 truncate">{conn.message || 'Wants to connect'}</p>
                                    </div>
                                </div>
                                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-6 text-center">
                        <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-2">
                            <UserPlus className="w-5 h-5 text-blue-400" />
                        </div>
                        <p className="text-xs text-gray-500 mb-3">No pending requests</p>
                        <button
                            onClick={() => onNavigate('network')}
                            className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                        >
                            Find founders
                        </button>
                    </div>
                )}

                {pendingConnections.length > 0 && (
                    <div className="px-4 py-2 bg-blue-50/50 border-t border-blue-50">
                        <button
                            onClick={() => onNavigate('network')}
                            className="text-[10px] font-bold text-blue-600 hover:text-blue-700 transition-colors w-full text-center py-1"
                        >
                            Manage connections
                        </button>
                    </div>
                )}
            </div>

            <footer className="px-4 py-2 text-xs text-gray-400 text-center">
                <p className="opacity-60 hover:opacity-100 transition-opacity cursor-default">© 2024 FounderPlatform</p>
            </footer>
        </div>
    );
};

export default LeftSidebar;

