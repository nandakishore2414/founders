import React from 'react';
import { Home, Users, Play, UserCircle, LogOut, Briefcase } from 'lucide-react';

const ShortsSidebar = ({ currentView, onNavigate, activeMode }) => {
    return (
        <div className="fixed left-0 top-0 bottom-0 w-16 flex flex-col items-center py-6 z-50" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f0f5ff 50%, #e8f0fe 100%)', borderRight: '1px solid rgba(147, 197, 253, 0.4)' }}>
            {/* Logo Icon */}
            <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg mb-8 cursor-pointer hover:scale-105 transition-transform"
                style={{ background: 'linear-gradient(135deg, #2563eb, #3b82f6)', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)' }}
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
                <div className="w-10 h-10 rounded-full overflow-hidden cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-blue-500 transition-all" style={{ border: '2px solid rgba(147, 197, 253, 0.6)' }}>
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Profile" className="w-full h-full object-cover" />
                </div>
            </div>
        </div>
    );
};

const NavIcon = ({ icon: Icon, label, active, onClick }) => (
    <button
        onClick={onClick}
        className="p-3 rounded-xl transition-all group relative flex justify-center"
        style={active ? {
            background: 'rgba(59, 130, 246, 0.12)',
            color: '#2563eb',
            boxShadow: '0 2px 8px rgba(59, 130, 246, 0.1)'
        } : {
            color: '#94a3b8'
        }}
        title={label}
        onMouseEnter={(e) => { if (!active) { e.currentTarget.style.background = 'rgba(59, 130, 246, 0.08)'; e.currentTarget.style.color = '#3b82f6'; } }}
        onMouseLeave={(e) => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#94a3b8'; } }}
    >
        <Icon className={`w-6 h-6 ${active ? 'fill-current' : ''}`} strokeWidth={active ? 2.5 : 2} />

        {/* Tooltip on Hover */}
        <span className="absolute left-14 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50" style={{ background: '#1e40af', boxShadow: '0 2px 8px rgba(30, 64, 175, 0.3)' }}>
            {label}
        </span>
    </button>
);

export default ShortsSidebar;

