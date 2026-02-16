import { Trophy, ChevronRight, Flame, Users, Globe, MessageSquare, Compass, Home } from 'lucide-react';

const LeftSidebar = ({ currentView, onNavigate }) => {
    return (
        <div className="py-4 sticky top-20 flex flex-col gap-5 items-stretch pr-2 max-h-[calc(100vh-6rem)] overflow-y-auto scrollbar-thin">

            {/* Navigation Menu */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-2">
                <SidebarItem icon={Home} label="Home" active={currentView === 'home'} onClick={() => onNavigate('home')} />
                <SidebarItem icon={Globe} label="Network" active={currentView === 'network'} onClick={() => onNavigate('network')} />
                <SidebarItem icon={MessageSquare} label="Messages" active={currentView === 'messages'} onClick={() => onNavigate('messages')} />
                <SidebarItem icon={Users} label="My Profile" active={currentView === 'founder'} onClick={() => onNavigate('founder')} />
                <SidebarItem icon={Compass} label="Topics" />
            </div>

            {/* Trending Section */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50 bg-gradient-to-r from-orange-50/80 to-rose-50/50">
                    <div className="flex items-center gap-2.5">
                        <div className="p-1.5 bg-white rounded-lg shadow-sm text-orange-500">
                            <Flame className="w-4 h-4" fill="currentColor" />
                        </div>
                        <h3 className="text-sm font-bold text-gray-800 tracking-tight">Trending Now</h3>
                    </div>
                </div>
                <div className="py-2">
                    <TrendingItem label="AI Startups" badge="Hot" badgeColor="bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-sm" />
                    <TrendingItem label="Seed Funding" badge="New" badgeColor="bg-blue-100 text-blue-700 border border-blue-200" />
                    <TrendingItem label="SaaS Growth" badge="12k" badgeColor="bg-amber-100 text-amber-700 border border-amber-200" />
                    <TrendingItem label="Web3 Founders" />
                    <TrendingItem label="Product Launch" />
                </div>
                <div className="px-5 py-3 border-t border-gray-50 bg-gray-50/30">
                    <button className="w-full py-1.5 text-xs font-semibold text-gray-600 hover:text-blue-600 transition-colors flex items-center justify-center gap-1 group-button rounded-md hover:bg-white hover:shadow-sm">
                        See all trending <ChevronRight className="w-3 h-3 group-button-hover:translate-x-0.5 transition-transform" />
                    </button>
                </div>
            </div>

            {/* Leaderboard Section */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50 bg-gradient-to-r from-yellow-50/80 to-amber-50/50">
                    <div className="flex items-center gap-2.5">
                        <div className="p-1.5 bg-white rounded-lg shadow-sm text-yellow-600">
                            <Trophy className="w-4 h-4" fill="currentColor" />
                        </div>
                        <h3 className="text-sm font-bold text-gray-800 tracking-tight">Top Founders</h3>
                    </div>
                </div>
                <div className="py-2 px-2">
                    <LeaderboardItem rank={1} name="Alex Chen" score="2,450" medal="🥇" specialStyle="bg-yellow-50/50 border-yellow-100" />
                    <LeaderboardItem rank={2} name="Priya Sharma" score="2,120" medal="🥈" specialStyle="border-transparent" />
                    <LeaderboardItem rank={3} name="Jordan Lee" score="1,890" medal="🥉" specialStyle="border-transparent" />
                    <LeaderboardItem rank={4} name="Sam Wilson" score="1,650" specialStyle="border-transparent opacity-90" />
                    <LeaderboardItem rank={5} name="Maria Lopez" score="1,430" specialStyle="border-transparent opacity-80" />
                </div>
                <div className="px-5 py-3 border-t border-gray-50 bg-gray-50/30">
                    <button className="w-full py-1.5 text-xs font-semibold text-gray-600 hover:text-blue-600 transition-colors flex items-center justify-center gap-1 group-button rounded-md hover:bg-white hover:shadow-sm">
                        View leaderboard <ChevronRight className="w-3 h-3 group-button-hover:translate-x-0.5 transition-transform" />
                    </button>
                </div>
            </div>

            <footer className="px-4 py-2 text-xs text-gray-400 text-center">
                <p className="opacity-60 hover:opacity-100 transition-opacity cursor-default">© 2024 FounderPlatform</p>
            </footer>
        </div>
    );
};

const SidebarItem = ({ icon: Icon, label, active, onClick, badge }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all group ${active
                ? 'bg-gray-900 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
    >
        <div className="flex items-center gap-3">
            <Icon className={`w-5 h-5 ${active ? 'text-white' : 'text-gray-400 group-hover:text-gray-900'}`} />
            <span className={`text-sm font-bold ${active ? 'text-white' : ''}`}>{label}</span>
        </div>
        {badge && (
            <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {badge}
            </span>
        )}
    </button>
);

const TrendingItem = ({ label, badge, badgeColor }) => (
    <a href="#" className="flex items-center justify-between px-5 py-2.5 hover:bg-gray-50 transition-colors cursor-pointer group border-l-2 border-transparent hover:border-blue-500 mx-1 rounded-r-lg">
        <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-blue-500 group-hover:scale-125 transition-all"></div>
            <span className="text-sm text-gray-600 group-hover:text-gray-900 font-medium transition-colors">{label}</span>
        </div>
        {badge && (
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${badgeColor}`}>
                {badge}
            </span>
        )}
    </a>
);

const LeaderboardItem = ({ rank, name, score, medal, specialStyle }) => (
    <a href="#" className={`flex items-center gap-3 px-3 py-2 mb-1 rounded-xl hover:bg-white hover:shadow-sm transition-all cursor-pointer group border ${specialStyle || 'border-transparent hover:border-gray-100'}`}>
        <span className="text-xs font-bold text-gray-400 w-6 text-center flex-shrink-0">
            {medal || <span className="text-gray-300">#{rank}</span>}
        </span>
        <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center flex-shrink-0 shadow-sm">
            <span className="text-xs font-bold text-gray-600">{name.charAt(0)}</span>
        </div>
        <div className="flex-1 min-w-0">
            <span className="text-sm text-gray-700 group-hover:text-gray-900 font-bold truncate block">{name}</span>
            <span className="text-[10px] text-gray-400 font-medium block">{score} pts</span>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <ChevronRight className="w-4 h-4 text-gray-300" />
        </div>
    </a>
);

export default LeftSidebar;
