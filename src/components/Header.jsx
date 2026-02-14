import React from 'react';
import { Search, Home, Users, Play, MessageSquare, Bell,Plus } from 'lucide-react';

const Header = () => {
    const [isSearchOpen, setIsSearchOpen] = React.useState(false);

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-200 py-1.5 px-4 md:px-0">
            <div className="max-w-6xl mx-auto flex items-center justify-between relative h-10">

                {/* Search Overlay */}
                <div
                    className={`absolute inset-0 bg-white z-20 flex items-center transition-all duration-300 ease-in-out ${isSearchOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                >
                    <div className="w-full flex items-center gap-3">
                        <Search className="w-5 h-5 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="flex-grow bg-transparent text-gray-900 text-sm focus:outline-none"
                            autoFocus={isSearchOpen}
                        />
                        <button
                            onClick={() => setIsSearchOpen(false)}
                            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Left Side: Logo & Search Trigger */}
                <div className={`flex items-center gap-4 transition-opacity duration-300 ${isSearchOpen ? 'opacity-0' : 'opacity-100'}`}>
                    {/* Search Trigger */}
                    <button
                        onClick={() => setIsSearchOpen(true)}
                        className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-full group transition-all"
                    >
                        <Search className="w-5 h-5 text-gray-500 group-hover:text-gray-700" />
                    </button>
                </div>

                {/* Center: Brand Title */}
                <div className={`absolute left-1/2 transform -translate-x-1/2 transition-opacity duration-300 ${isSearchOpen ? 'opacity-0' : 'opacity-100'}`}>
                    <span className="text-xl font-bold text-[#0A66C2] tracking-wide font-sans hidden md:block">FOUNDER HUB</span>
                </div>

                {/* Right Side: Navigation */}
                <nav className={`flex items-center gap-1 sm:gap-6 md:gap-8 transition-opacity duration-300 ${isSearchOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                    <NavItem icon={Home} label="Home" active />
                    <NavItem icon={Users} label="Networks" />
                    <NavItem icon={Play} label="shorts" />
                    <NavItem icon={MessageSquare} label="Messaging" />
                    <NavItem icon={Bell} label="Notifications" />
                    <NavItem icon={Plus} label="Post" />
                </nav>
            </div>
        </header>
    );
};


const NavItem = ({ icon: Icon, label, active, hasArrow }) => {
    return (
        <a
            href="#"
            className={`flex flex-col items-center justify-center cursor-pointer group hover:text-black transition-colors ${active ? 'text-black border-b-2 border-black pb-0.5' : 'text-gray-500'
                }`}
        >
            <div className="relative">
                <Icon className={`w-6 h-6 ${active ? 'fill-current' : ''}`} strokeWidth={active ? 2.5 : 1.5} />
                {label === 'Notifications' && (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold px-1 rounded-full border-2 border-white">3</span>
                )}
            </div>
            <span className="text-xs hidden md:block mt-0.5 font-normal group-hover:text-black flex items-center">
                {label}
                {hasArrow && (
                    <svg className="w-3 h-3 ml-0.5 fill-current opacity-60" viewBox="0 0 16 16">
                        <path d="M8 11L3 6h10z" />
                    </svg>
                )}
            </span>
        </a>
    );
};

export default Header;
