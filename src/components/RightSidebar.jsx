import React from 'react';
import { MapPin, Briefcase, Calendar } from 'lucide-react';

const UPCOMING_EVENTS = [
    { id: 1, title: 'Founder AMA: Fundraising 101', date: 'Feb 24', time: '5:00 PM' },
    { id: 2, title: 'SaaS Growth Workshop', date: 'Mar 02', time: '10:30 AM' },
];

const RightSidebar = () => {
    return (
        <div className="space-y-4">
            {/* Profile Card */}
            <div className="bg-white rounded-xl border border-blue-100 overflow-hidden">
                {/* Content */}
                <div className="px-4 pt-4 pb-3">
                    {/* Avatar + role row */}
                    <div className="flex items-center justify-between mb-3">
                        <img
                            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Nandakishore"
                            alt="Nandakishore"
                            className="w-12 h-12 rounded-full border-2 border-gray-100 bg-white shadow-sm"
                        />
                        <span className="flex items-center gap-1 text-[11px] font-semibold text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full">
                            <Briefcase className="w-3 h-3" />
                            Founder
                        </span>
                    </div>

                    {/* Name & info */}
                    <h3 className="text-sm font-bold text-gray-900">Nandakishore</h3>
                    <p className="text-xs text-gray-500 mt-0.5 leading-snug">MERN Stack · Building FounderPlatform</p>

                    <div className="flex items-center gap-1 mt-2 text-[11px] text-gray-400">
                        <MapPin className="w-3 h-3" />
                        India
                    </div>

                    {/* Stats */}
                    <div className="flex gap-4 mt-3 pt-3 border-t border-gray-100">
                        <div>
                            <p className="text-sm font-bold text-gray-800">318</p>
                            <p className="text-[10px] text-gray-400">Connections</p>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-800">1.2k</p>
                            <p className="text-[10px] text-gray-400">Profile views</p>
                        </div>
                    </div>
                </div>

            </div>

            {/* Upcoming Events Card */}
            <div className="bg-white rounded-xl border border-blue-100 p-4">
                <div className="flex items-center gap-2 mb-4">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-tight">Upcoming Events</h3>
                </div>
                <div className="space-y-4">
                    {UPCOMING_EVENTS.map((event) => (
                        <div key={event.id} className="group cursor-pointer">
                            <h4 className="text-xs font-bold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-1">{event.title}</h4>
                            <div className="flex items-center justify-between mt-1">
                                <span className="text-[10px] font-medium text-gray-400">{event.date} • {event.time}</span>
                                <button className="text-[10px] font-extrabold text-blue-600 hover:underline">View</button>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="mt-4 w-full py-2 text-[10px] font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-100 rounded-lg transition-colors">
                    Explore all events
                </button>
            </div>

            {/* Footer links */}
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-gray-400 px-1">
                <a href="#" className="hover:text-blue-600 transition-colors">About</a>
                <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
                <a href="#" className="hover:text-blue-600 transition-colors">Help</a>
                <span>· FounderPlatform © 2026</span>
            </div>
        </div>
    );
};

export default RightSidebar;
