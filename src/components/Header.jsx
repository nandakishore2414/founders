import React, { useState, useRef, useCallback } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Search, Home, Users, Play, UserCircle, Menu, X, ChevronLeft, ChevronRight, Briefcase, LayoutDashboard, Bookmark, Telescope, Rocket, HandHeart, Code, Building2, Trophy } from 'lucide-react';

const Header = ({ user, activeMode, hasRole, switchMode, layout, onSwitchRole }) => {
    const [isSearchOpen, setIsSearchOpen] = React.useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const navRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => {
        if (path === '/' || path === '/investor') return location.pathname === path;
        return location.pathname.startsWith(path);
    };

    const scrollNav = useCallback((direction) => {
        if (navRef.current) {
            navRef.current.scrollBy({ left: direction === 'left' ? -120 : 120, behavior: 'smooth' });
        }
    }, []);

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-blue-100/80 sticky-header-transition">
            <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">

                {/* Left: Logo & Mobile Menu */}
                <div className="flex items-center gap-4">
                    <button
                        className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle mobile menu"
                    >
                        <Menu className="w-5 h-5" />
                    </button>

                    <Link
                        to={layout === 'investor' ? '/investor' : '/'}
                        className="flex items-center gap-2 cursor-pointer group"
                    >
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-sm group-hover:shadow-md transition-all">
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
                    </Link>
                </div>

                {/* Center: Navigation with scroll arrows */}
                <div className="hidden md:flex items-center gap-1">
                    <button
                        onClick={() => scrollNav('left')}
                        className="p-1 rounded-full text-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-colors shrink-0"
                        aria-label="Scroll navigation left"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>

                    <nav
                        ref={navRef}
                        role="navigation"
                        aria-label="Main navigation"
                        className="flex items-center gap-0.5 bg-blue-50/70 p-1 rounded-full border border-blue-100/80 max-w-[21rem] lg:max-w-sm xl:max-w-md overflow-x-auto scrollbar-hide"
                    >
                        {layout === 'founder' ? (
                            <>
                                <NavItem icon={Home} label="Home" to="/" active={isActive('/')} />
                                <NavItem icon={Play} label="Shorts" to="/shorts" active={isActive('/shorts')} />
                                <NavItem icon={Building2} label="Startups" to="/startup" active={isActive('/startup')} />
                                <NavItem icon={Rocket} label="Projects" to="/projects" active={isActive('/projects')} />
                                <NavItem icon={Users} label="Network" to="/network" active={isActive('/network')} />
                                <NavItem icon={HandHeart} label="Community" to="/community" active={isActive('/community')} />
                                <NavItem icon={Code} label="Freelance" to="/freelance" active={isActive('/freelance')} />
                                <NavItem icon={Trophy} label="Rank" to="/gamification" active={isActive('/gamification')} />
                                <NavItem icon={UserCircle} label="Profile" to="/profile" active={isActive('/profile')} />
                            </>
                        ) : (
                            <>
                                <NavItem icon={LayoutDashboard} label="Dashboard" to="/investor" active={isActive('/investor') && !location.pathname.includes('/investor/')} />
                                <NavItem icon={Telescope} label="Discover" to="/investor/discover" active={isActive('/investor/discover')} />
                                <NavItem icon={Bookmark} label="Saved" to="/investor/saved" active={isActive('/investor/saved')} />
                                <NavItem icon={UserCircle} label="Profile" to="/investor/profile" active={isActive('/investor/profile')} />
                            </>
                        )}
                    </nav>

                    <button
                        onClick={() => scrollNav('right')}
                        className="p-1 rounded-full text-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-colors shrink-0"
                        aria-label="Scroll navigation right"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>

                {/* Right: Search and Rank */}
                <div className="flex items-center gap-3">
                    {/* Search */}
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
                            aria-label={isSearchOpen ? 'Close search' : 'Open search'}
                        >
                            {isSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
                        </button>
                    </div>

                    {/* Rank Button */}
                    <Link
                        to="/gamification"
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                            isActive('/gamification')
                                ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        <Trophy className="w-4 h-4" />
                        <span className="hidden md:inline">Rank</span>
                    </Link>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-100 shadow-lg py-4 px-4 flex flex-col gap-2 animate-in slide-in-from-top-2">
                    <MobileNavItem icon={Home} label="Home" to="/" active={isActive('/')} onClick={() => setIsMobileMenuOpen(false)} />
                    {layout === 'founder' && (
                        <>
                            <MobileNavItem icon={Rocket} label="Projects" to="/projects" active={isActive('/projects')} onClick={() => setIsMobileMenuOpen(false)} />
                            <MobileNavItem icon={HandHeart} label="Community" to="/community" active={isActive('/community')} onClick={() => setIsMobileMenuOpen(false)} />
                            <MobileNavItem icon={Code} label="Freelance" to="/freelance" active={isActive('/freelance')} onClick={() => setIsMobileMenuOpen(false)} />
                            <MobileNavItem icon={Trophy} label="Rank & Levels" to="/gamification" active={isActive('/gamification')} onClick={() => setIsMobileMenuOpen(false)} />
                        </>
                    )}

                    {activeMode === 'founder' ? (
                        <MobileNavItem icon={UserCircle} label="Founder Identity" to="/profile" active={isActive('/profile')} onClick={() => setIsMobileMenuOpen(false)} />
                    ) : (
                        <MobileNavItem icon={Briefcase} label="Investor Dashboard" to="/investor" active={isActive('/investor')} onClick={() => setIsMobileMenuOpen(false)} />
                    )}
                </div>
            )}
        </header>
    );
};

const NavItem = ({ icon: Icon, label, to, active }) => (
    <Link
        to={to}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold transition-all duration-200 whitespace-nowrap shrink-0 ${active
            ? 'bg-blue-600 text-white shadow-sm shadow-blue-200'
            : 'text-blue-900/60 hover:text-blue-900 hover:bg-blue-100/70'
            }`}
        aria-label={label}
    >
        <Icon className={`w-3.5 h-3.5 ${active ? 'fill-current' : ''}`} strokeWidth={active ? 2.5 : 2} />
        <span>{label}</span>
    </Link>
);

const MobileNavItem = ({ icon: Icon, label, to, active, onClick }) => (
    <Link
        to={to}
        onClick={onClick}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium w-full transition-colors ${active
            ? 'bg-blue-50 text-blue-600'
            : 'text-gray-600 hover:bg-gray-50'
            }`}
        aria-label={label}
    >
        <Icon className="w-5 h-5" />
        {label}
    </Link>
);

const IconButton = ({ icon: Icon, count, label }) => (
    <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors group" aria-label={label}>
        <Icon className="w-5 h-5 group-hover:text-gray-900" strokeWidth={2} />
        {count && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        )}
    </button>
);

export default Header;
