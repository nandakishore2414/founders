import React from 'react';
import { Search, Home, Users, Play, MessageSquare, Bell, Plus, UserCircle, Menu, X } from 'lucide-react';

const Header = ({ currentView, onNavigate }) => {
    const [isSearchOpen, setIsSearchOpen] = React.useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/60 sticky-header-transition">
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
                        onClick={() => onNavigate('home')}
                    >
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-sm group-hover:shadow-md transition-all">
                            FP
                        </div>
                        <span className="text-lg font-bold text-gray-900 tracking-tight hidden md:block group-hover:text-blue-600 transition-colors">
                            FounderPlatform
                        </span>
                    </div>
                </div>

                {/* Center: Navigation */}
                <nav className="hidden md:flex items-center gap-1 bg-gray-100/50 p-1 rounded-full border border-gray-200/50">
                    <NavItem
                        icon={Home}
                        label="Home"
                        active={currentView === 'home'}
                        onClick={() => onNavigate('home')}
                    />
                    <NavItem icon={Users} label="Networks" />
                    <NavItem
                        icon={Play}
                        label="Shorts"
                        active={currentView === 'shorts'}
                        onClick={() => onNavigate('shorts')}
                    />
                    <NavItem
                        icon={UserCircle}
                        label="Founder"
                        active={currentView === 'founder'}
                        onClick={() => onNavigate('founder')}
                    />
                </nav>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 md:gap-4">
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

                    <button
                        onClick={() => onNavigate('create-post')}
                        className="hidden md:flex items-center gap-2 pl-1 pr-3 py-1 bg-gray-900 hover:bg-gray-800 text-white rounded-full transition-all text-sm font-medium ml-2"
                    >
                        <Plus className="w-4 h-4 bg-gray-700/50 rounded-full p-0.5" />
                        <span>Post</span>
                    </button>

                    <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden border border-gray-100 cursor-pointer ml-1">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Profile" />
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-100 shadow-lg py-4 px-4 flex flex-col gap-2 animate-in slide-in-from-top-2">
                    <MobileNavItem icon={Home} label="Home" active={currentView === 'home'} onClick={() => { onNavigate('home'); setIsMobileMenuOpen(false) }} />
                    <MobileNavItem icon={Users} label="Networks" onClick={() => setIsMobileMenuOpen(false)} />
                    <MobileNavItem icon={Play} label="Shorts" active={currentView === 'shorts'} onClick={() => { onNavigate('shorts'); setIsMobileMenuOpen(false) }} />
                    <MobileNavItem icon={UserCircle} label="Founder Identity" active={currentView === 'founder'} onClick={() => { onNavigate('founder'); setIsMobileMenuOpen(false) }} />
                </div>
            )}
        </header>
    );
};

const NavItem = ({ icon: Icon, label, active, onClick }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${active
            ? 'bg-white text-blue-600 shadow-sm'
            : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200/50'
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
