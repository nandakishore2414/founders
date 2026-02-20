import React, { useState } from 'react';
import { Search, Home, Users, Play, MessageSquare, Bell, Plus, UserCircle, Menu, X, ChevronDown, Briefcase, Zap, Check, LayoutDashboard, Bookmark, Telescope } from 'lucide-react';

const Header = ({ currentView, onNavigate, user, activeMode, hasRole, switchMode, layout, onSwitchRole }) => {
    const [isSearchOpen, setIsSearchOpen] = React.useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-blue-100/80 sticky-header-transition">
            <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">

                {/* Left: Logo & Mobile Menu */}
                <div className="flex items-center gap-4">
                    <button
                        className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <Menu className="w-5 h-5" />
                    </button>

                    <div
                        className="flex items-center gap-2 cursor-pointer group"
                        onClick={() => onNavigate(layout === 'investor' ? 'investor-dashboard' : 'home')}
                    >
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-sm group-hover:shadow-md transition-all">
                            FP
                        </div>
                        <span className="text-lg font-bold text-gray-900 tracking-tight hidden md:block group-hover:text-blue-600 transition-colors">
                            FounderPlatform
                        </span>

                        {/* Mode Badge */}
                        {user.roles.length > 1 && (
                            <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded border ml-1 tracking-wider ${activeMode === 'investor'
                                ? 'bg-blue-100 text-blue-700 border-blue-200'
                                : 'bg-blue-50 text-blue-600 border-blue-200'
                                }`}>
                                {activeMode}
                            </span>
                        )}
                    </div>
                </div>

                {/* Center: Navigation */}
                <nav className="hidden md:flex items-center gap-1 bg-blue-50/70 p-1 rounded-full border border-blue-100/80">

                    {layout === 'founder' ? (
                        <>
                            <NavItem
                                icon={Home}
                                label="Home"
                                active={currentView === 'home'}
                                onClick={() => onNavigate('home')}
                            />
                            <NavItem
                                icon={Users}
                                label="Networks"
                                active={currentView === 'network'}
                                onClick={() => onNavigate('network')}
                            />
                            <NavItem
                                icon={Briefcase}
                                label="Startup"
                                active={currentView === 'startup'}
                                onClick={() => onNavigate('startup')}
                            />
                            <NavItem
                                icon={Play}
                                label="Shorts"
                                active={currentView === 'shorts'}
                                onClick={() => onNavigate('shorts')}
                            />
                            <NavItem
                                icon={UserCircle}
                                label="Profile"
                                active={currentView === 'founder' || currentView === 'profile'}
                                onClick={() => onNavigate('profile')}
                            />
                        </>
                    ) : (
                        <>
                            <NavItem
                                icon={LayoutDashboard}
                                label="Dashboard"
                                active={currentView === 'investor-dashboard'}
                                onClick={() => onNavigate('investor-dashboard')}
                            />
                            <NavItem
                                icon={Telescope}
                                label="Discover"
                                active={currentView === 'discover'}
                                onClick={() => onNavigate('discover')}
                            />
                            <NavItem
                                icon={Bookmark}
                                label="Saved"
                                active={currentView === 'saved'}
                                onClick={() => onNavigate('saved')}
                            />
                            <NavItem
                                icon={UserCircle}
                                label="Profile"
                                active={currentView === 'founder'} // Reusing founder profile view for now
                                onClick={() => onNavigate('founder')}
                            />
                        </>
                    )}
                </nav>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 md:gap-4">
                    {/* Search (unchanged) */}
                    <div className={`relative transition-all duration-300 ${isSearchOpen ? 'w-full md:w-64 absolute md:relative left-0 md:left-auto top-0 md:top-auto h-full md:h-auto bg-white md:bg-transparent z-20 flex items-center px-4 md:px-0' : 'w-auto'}`}>
                        {isSearchOpen && (
                            <Search className="w-4 h-4 text-gray-500 absolute left-7 md:left-3" />
                        )}
                        <input
                            type="text"
                            placeholder="Search..."
                            className={`bg-gray-100 border-transparent focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-200 rounded-full text-sm transition-all duration-300 ${isSearchOpen ? 'w-full pl-10 pr-10 py-2 border' : 'w-0 opacity-0 pointer-events-none md:w-0 md:opacity-0'}`}
                            autoFocus={isSearchOpen}
                            onBlur={() => !isSearchOpen && setIsSearchOpen(false)}
                        />
                        <button
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className={`p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors ${isSearchOpen ? 'absolute right-4 md:right-2' : ''}`}
                        >
                            {isSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
                        </button>
                    </div>

                    <div className="h-6 w-px bg-gray-200 hidden md:block"></div>

                    <div className="flex items-center gap-1">
                        <IconButton icon={MessageSquare} count={2} />
                        <IconButton icon={Bell} count={5} />
                    </div>

                    {/* Create Action (Founder Only) */}
                    {layout === 'founder' && hasRole('founder') && (
                        <button
                            onClick={() => onNavigate('create-post')}
                            className="hidden md:flex items-center gap-2 pl-1 pr-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all text-sm font-medium ml-2 shadow-sm shadow-blue-200"
                        >
                            <Plus className="w-4 h-4 bg-blue-500/50 rounded-full p-0.5" />
                            <span>Post</span>
                        </button>
                    )}

                    {/* Profile & Mode Switcher */}
                    <div className="relative">
                        <div
                            className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden border border-gray-100 cursor-pointer ml-1 hover:ring-2 ring-blue-300 transition-all"
                            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                        >
                            <img src={user.avatar} alt="Profile" />
                        </div>

                        {/* Dropdown Menu */}
                        {isProfileMenuOpen && (
                            <>
                                <div className="fixed inset-0 z-10" onClick={() => setIsProfileMenuOpen(false)}></div>
                                <div className="absolute right-0 top-12 w-56 bg-white rounded-xl shadow-xl border border-gray-100 z-20 overflow-hidden animate-in slide-in-from-top-2 fade-in duration-200">
                                    <div className="p-3 border-b border-gray-100">
                                        <p className="font-semibold text-gray-900">{user.name}</p>
                                        <p className="text-xs text-gray-500 capitalize">{activeMode} Mode</p>
                                    </div>

                                    {/* Mode Switcher */}
                                    {user.roles.includes('founder') && user.roles.includes('investor') && (
                                        <div className="p-2">
                                            <p className="text-[10px] uppercase font-bold text-gray-400 px-2 py-1 tracking-wider">Switch Mode</p>
                                            <button
                                                onClick={() => { switchMode('founder'); setIsProfileMenuOpen(false); }}
                                                className={`flex items-center justify-between w-full px-2 py-2 text-sm rounded-lg ${activeMode === 'founder' ? 'bg-blue-600 text-white' : 'hover:bg-blue-50 text-gray-600'}`}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <Zap className="w-4 h-4" />
                                                    <span>Founder Mode</span>
                                                </div>
                                                {activeMode === 'founder' && <Check className="w-4 h-4" />}
                                            </button>
                                            <button
                                                onClick={() => { switchMode('investor'); setIsProfileMenuOpen(false); }}
                                                className={`flex items-center justify-between w-full px-2 py-2 text-sm rounded-lg ${activeMode === 'investor' ? 'bg-blue-700 text-white' : 'hover:bg-blue-50 text-gray-600'}`}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <Briefcase className="w-4 h-4" />
                                                    <span>Investor Mode</span>
                                                </div>
                                                {activeMode === 'investor' && <Check className="w-4 h-4" />}
                                            </button>
                                        </div>
                                    )}

                                    <div className="p-2 border-t border-gray-100">
                                        <p className="text-[10px] uppercase font-bold text-gray-400 px-2 py-1 tracking-wider">Demo: Switch Role</p>
                                        <button onClick={() => { onSwitchRole('user'); setIsProfileMenuOpen(false); }} className="w-full text-left px-2 py-1.5 text-xs text-gray-600 hover:bg-gray-50 rounded-lg">Normal User</button>
                                        <button onClick={() => { onSwitchRole('founder'); setIsProfileMenuOpen(false); }} className="w-full text-left px-2 py-1.5 text-xs text-gray-600 hover:bg-gray-50 rounded-lg">Founder Only</button>
                                        <button onClick={() => { onSwitchRole('investor'); setIsProfileMenuOpen(false); }} className="w-full text-left px-2 py-1.5 text-xs text-gray-600 hover:bg-gray-50 rounded-lg">Investor Only</button>
                                        <button onClick={() => { onSwitchRole('founder_investor'); setIsProfileMenuOpen(false); }} className="w-full text-left px-2 py-1.5 text-xs text-gray-600 hover:bg-gray-50 rounded-lg">Founder + Investor</button>
                                    </div>

                                    <div className="p-2 border-t border-gray-100">
                                        <button
                                            onClick={() => { onNavigate('profile'); setIsProfileMenuOpen(false); }}
                                            className="flex items-center gap-2 w-full text-left px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg font-medium"
                                        >
                                            <UserCircle className="w-4 h-4" />
                                            My Profile
                                        </button>
                                    </div>

                                    <div className="p-2 border-t border-gray-100">
                                        <button className="w-full text-left px-2 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg">
                                            Sign Out
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-100 shadow-lg py-4 px-4 flex flex-col gap-2 animate-in slide-in-from-top-2">
                    <MobileNavItem icon={Home} label="Home" active={currentView === 'home'} onClick={() => { onNavigate('home'); setIsMobileMenuOpen(false) }} />
                    <MobileNavItem icon={Users} label="Networks" onClick={() => setIsMobileMenuOpen(false)} />
                    <MobileNavItem icon={Play} label="Shorts" active={currentView === 'shorts'} onClick={() => { onNavigate('shorts'); setIsMobileMenuOpen(false) }} />

                    {activeMode === 'founder' ? (
                        <MobileNavItem icon={UserCircle} label="Founder Identity" active={currentView === 'founder'} onClick={() => { onNavigate('founder'); setIsMobileMenuOpen(false) }} />
                    ) : (
                        <MobileNavItem icon={Briefcase} label="Investor Dashboard" active={currentView === 'investor-dashboard'} onClick={() => { onNavigate('investor-dashboard'); setIsMobileMenuOpen(false) }} />
                    )}
                </div>
            )}
        </header>
    );
};

const NavItem = ({ icon: Icon, label, active, onClick }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${active
            ? 'bg-blue-600 text-white shadow-sm shadow-blue-200'
            : 'text-blue-900/60 hover:text-blue-900 hover:bg-blue-100/70'
            }`}
    >
        <Icon className={`w-4 h-4 ${active ? 'fill-current' : ''}`} strokeWidth={active ? 2.5 : 2} />
        <span>{label}</span>
    </button>
);

const MobileNavItem = ({ icon: Icon, label, active, onClick }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium w-full transition-colors ${active
            ? 'bg-blue-50 text-blue-600'
            : 'text-gray-600 hover:bg-gray-50'
            }`}
    >
        <Icon className="w-5 h-5" />
        {label}
    </button>
);

const IconButton = ({ icon: Icon, count }) => (
    <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors group">
        <Icon className="w-5 h-5 group-hover:text-gray-900" strokeWidth={2} />
        {count && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        )}
    </button>
);

export default Header;
