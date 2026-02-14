import React from 'react';
import { Bookmark, Square } from 'lucide-react';

const LeftSidebar = () => {
    return (
        <div className="space-y-4">
            {/* Profile Card */}
            <div className="bg-white border border-gray-300 rounded-lg overflow-hidden text-center relative">
                <div className="h-16 bg-gradient-to-r from-gray-400 to-gray-600"></div>
                <div className="relative -mt-10 mb-3 flex items-center justify-center">
                    <img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt="Profile"
                        className="w-16 h-16 rounded-full border-2 border-white cursor-pointer"
                    />
                </div>
                <div className="mb-4">
                    <h2 className="text-base font-semibold text-gray-900 cursor-pointer hover:underline">
                        User Name
                    </h2>
                    <p className="text-xs text-gray-500 mt-1 px-4">
                        Software Engineer | React | Tailwind CSS
                    </p>
                </div>
                <div className="border-t border-gray-200 py-3 text-left">
                    <div className="px-4 py-1 hover:bg-gray-100 cursor-pointer flex justify-between items-center group">
                        <span className="text-xs text-gray-500 font-medium">Profile viewers</span>
                        <span className="text-xs text-blue-600 font-semibold">1,234</span>
                    </div>
                    <div className="px-4 py-1 hover:bg-gray-100 cursor-pointer flex justify-between items-center group">
                        <span className="text-xs text-gray-500 font-medium">Post impressions</span>
                        <span className="text-xs text-blue-600 font-semibold">567</span>
                    </div>
                </div>
                <div className="border-t border-gray-200 py-3 text-left hover:bg-gray-100 cursor-pointer px-4">
                    <p className="text-xs text-gray-500">Access exclusive tools & insights</p>
                    <div className="flex items-center gap-2 mt-1">
                        <div className="w-3 h-3 bg-yellow-400 rounded-sm"></div>
                        <span className="text-xs font-semibold underline decoration-1">Get Hired Faster, Try Premium Free</span>
                    </div>
                </div>
                <div className="border-t border-gray-200 py-3 text-left hover:bg-gray-100 cursor-pointer px-4 flex items-center gap-2">
                    <Bookmark className="w-4 h-4 text-gray-600 fill-gray-500" />
                    <span className="text-xs font-semibold text-gray-900">My Items</span>
                </div>
            </div>

            {/* Community Card */}
            <div className="bg-white border border-gray-300 rounded-lg overflow-hidden py-2 sticky top-20">
                <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    <p className="text-xs font-semibold text-blue-600">Groups</p>
                </div>
                <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center">
                    <p className="text-xs font-semibold text-blue-600">Events</p>
                    <span className="text-gray-500 text-lg">+</span>
                </div>
                <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    <p className="text-xs font-semibold text-blue-600">Followed Hashtags</p>
                </div>
                <div className="border-t border-gray-200 text-center py-3 hover:bg-gray-100 cursor-pointer">
                    <p className="text-sm font-semibold text-gray-500">Discover more</p>
                </div>
            </div>
        </div>
    );
};

export default LeftSidebar;
