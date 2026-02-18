import { Trophy, ChevronRight, Flame } from 'lucide-react';

const LeftSidebar = ({ currentView, onNavigate }) => {
    return (
        <div className="py-4 sticky top-20 flex flex-col gap-5 items-stretch pr-2 max-h-[calc(100vh-6rem)] overflow-y-auto scrollbar-thin">

            {/* Trending Section */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100">
                    <Flame className="w-4 h-4 text-orange-500" />
                    <h3 className="text-xs font-bold text-gray-900 uppercase tracking-tight">Trending Now</h3>
                </div>
                <div className="py-2.5">
                    <TrendingItem label="AI Startups" badge="Hot" badgeColor="text-orange-600 bg-orange-50 border-orange-100" />
                    <TrendingItem label="Seed Funding" badge="New" badgeColor="text-blue-600 bg-blue-50 border-blue-100" />
                    <TrendingItem label="SaaS Growth" badge="12k" badgeColor="text-gray-500 bg-gray-50 border-gray-100" />
                    <TrendingItem label="Web3 Founders" />
                    <TrendingItem label="Product Launch" />
                </div>
                <div className="px-4 py-2 bg-gray-50/50 border-t border-gray-100">
                    <button className="text-[10px] font-bold text-gray-500 hover:text-blue-600 transition-colors w-full text-center py-1">
                        See all trending
                    </button>
                </div>
            </div>

            {/* Leaderboard Section */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    <h3 className="text-xs font-bold text-gray-900 uppercase tracking-tight">Top Founders</h3>
                </div>
                <div className="p-2 space-y-1">
                    <LeaderboardItem rank={1} name="Alex Chen" score="2.4k" medal="🥇" />
                    <LeaderboardItem rank={2} name="Priya Sharma" score="2.1k" medal="🥈" />
                    <LeaderboardItem rank={3} name="Jordan Lee" score="1.8k" medal="🥉" />
                    <LeaderboardItem rank={4} name="Sam Wilson" score="1.6k" />
                </div>
                <div className="px-4 py-2 bg-gray-50/50 border-t border-gray-100">
                    <button className="text-[10px] font-bold text-gray-500 hover:text-blue-600 transition-colors w-full text-center py-1">
                        View full leaderboard
                    </button>
                </div>
            </div>

            <footer className="px-4 py-2 text-xs text-gray-400 text-center">
                <p className="opacity-60 hover:opacity-100 transition-opacity cursor-default">© 2024 FounderPlatform</p>
            </footer>
        </div>
    );
};


const TrendingItem = ({ label, badge, badgeColor }) => (
    <a href="#" className="flex items-center justify-between px-4 py-2 hover:bg-gray-50 transition-colors group">
        <div className="flex items-center gap-3">
            <div className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-blue-500 transition-all"></div>
            <span className="text-[13px] text-gray-600 group-hover:text-gray-900 font-medium">{label}</span>
        </div>
        {badge && (
            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md border ${badgeColor}`}>
                {badge}
            </span>
        )}
    </a>
);

const LeaderboardItem = ({ rank, name, score, medal }) => (
    <a href="#" className="flex items-center gap-3 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors group">
        <div className="w-4 text-center">
            {medal ? <span className="text-sm">{medal}</span> : <span className="text-[10px] font-bold text-gray-300">#{rank}</span>}
        </div>
        <div className="w-7 h-7 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center flex-shrink-0">
            <span className="text-[10px] font-bold text-gray-500">{name.charAt(0)}</span>
        </div>
        <div className="flex-1 min-w-0">
            <h4 className="text-[12px] font-bold text-gray-700 group-hover:text-gray-900 truncate">{name}</h4>
            <p className="text-[9px] text-gray-400 font-medium">{score} pts</p>
        </div>
        <ChevronRight className="w-3 h-3 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
    </a>
);

export default LeftSidebar;
