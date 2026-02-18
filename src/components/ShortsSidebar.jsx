import React from 'react';
import { Home, Users, Play, UserCircle, LogOut, Briefcase } from 'lucide-react';

const ShortsSidebar = ({ currentView, onNavigate, activeMode }) => {
    return (
        <div className="fixed left-0 top-0 bottom-0 w-16 flex flex-col items-center py-6 z-50">
            {/* Logo Icon */}
            <div
                className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md mb-8 cursor-pointer hover:scale-105 transition-transform"
                onClick={() => onNavigate('home')}
            >
                FP
            </div>

            {/* Navigation Items */}
            <div className="flex flex-col gap-6 flex-1 w-full items-center">
                <NavIcon icon={Home} label="Home" active={currentView === 'home'} onClick={() => onNavigate('home')} />
                <NavIcon icon={Users} label="Networks" active={currentView === 'network'} onClick={() => onNavigate('network')} />
                <NavIcon icon={Play} label="Shorts" active={currentView === 'shorts'} onClick={() => onNavigate('shorts')} />

                {activeMode === 'founder' ? (
                    <NavIcon icon={UserCircle} label="Profile" active={currentView === 'founder'} onClick={() => onNavigate('founder')} />
                ) : (
                    <NavIcon icon={Briefcase} label="Invest" active={currentView === 'investor-dashboard'} onClick={() => onNavigate('investor-dashboard')} />
                )}
            </div>

            {/* Bottom Actions */}
            <div className="mt-auto">
                {/* Profile Avatar */}
                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border border-gray-300 cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-blue-500 transition-all">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Profile" className="w-full h-full object-cover" />
                </div>
            </div>
        </div>
    );
};

const NavIcon = ({ icon: Icon, label, active, onClick }) => (
    <button
        onClick={onClick}
        className={`p-3 rounded-xl transition-all group relative flex justify-center ${active
            ? 'bg-blue-50 text-blue-600 shadow-sm'
            : 'text-gray-400 hover:bg-gray-100 hover:text-gray-900'
            }`}
        title={label}
    >
        <Icon className={`w-6 h-6 ${active ? 'fill-current' : ''}`} strokeWidth={active ? 2.5 : 2} />

        {/* Tooltip on Hover */}
        <span className="absolute left-14 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
            {label}
        </span>
    </button>
);

export default ShortsSidebar;
