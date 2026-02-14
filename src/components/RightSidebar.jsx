import React from 'react';
import { Info } from 'lucide-react';

const RightSidebar = () => {
    return (
        <div className="space-y-4">
            {/* LinkedIn News Card */}
            <div className="bg-white border border-gray-300 rounded-lg overflow-hidden py-3">
                <div className="flex justify-between items-center px-4 mb-2">
                    <h2 className="text-sm font-semibold text-gray-900">LinkedIn News</h2>
                    <Info className="w-3.5 h-3.5 text-gray-600 fill-gray-500" />
                </div>
                <div>
                    <NewsItem title="Tech hiring stabilizes" time="1d ago • 10,934 readers" />
                    <NewsItem title="Gen Z at work" time="19h ago • 5,213 readers" />
                    <NewsItem title="The future of AI" time="3d ago • 23,452 readers" />
                    <NewsItem title="Startups to watch" time="12h ago • 8,112 readers" />
                    <NewsItem title="Remote work trends" time="2d ago • 15,321 readers" />
                </div>
                <div className="px-4 mt-2 hover:bg-gray-100 cursor-pointer py-1">
                    <button className="text-xs font-semibold text-gray-500 flex items-center">
                        Show more
                        <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Ad Component */}
            <div className="bg-white border border-gray-300 rounded-lg overflow-hidden p-4 text-center sticky top-20">
                <p className="text-xs text-gray-500 mb-2">Ad</p>
                <div className="flex justify-center mb-2">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-xs text-gray-500">Logo</div>
                </div>
                <p className="text-sm text-gray-500 text-center">
                    See who is viewing your profile.
                </p>
                <button className="mt-3 px-4 py-1 text-blue-600 font-semibold border border-blue-600 rounded-full hover:bg-blue-50 transition-colors text-sm">
                    Try Premium for free
                </button>
            </div>

            <div className="text-center">
                <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs text-gray-500 px-4">
                    <a href="#" className="hover:text-blue-600 hover:underline">About</a>
                    <a href="#" className="hover:text-blue-600 hover:underline">Accessibility</a>
                    <a href="#" className="hover:text-blue-600 hover:underline">Help Center</a>
                    <a href="#" className="hover:text-blue-600 hover:underline">Privacy & Terms</a>
                    <a href="#" className="hover:text-blue-600 hover:underline">Ad Choices</a>
                    <a href="#" className="hover:text-blue-600 hover:underline">Advertising</a>
                    <a href="#" className="hover:text-blue-600 hover:underline">Business Services</a>
                    <a href="#" className="hover:text-blue-600 hover:underline">Get the LinkedIn app</a>
                    <a href="#" className="hover:text-blue-600 hover:underline">More</a>
                </div>
                <div className="mt-2 text-xs text-gray-900 flex items-center justify-center gap-1">
                    <span className="font-bold text-blue-600">LinkedIn</span>
                    <span>LinkedIn Corporation © 2024</span>
                </div>
            </div>
        </div>
    );
};

const NewsItem = ({ title, time }) => (
    <div className="px-4 py-1 hover:bg-gray-100 cursor-pointer">
        <div className="flex gap-2 items-start">
            <div className="mt-1.5 w-1 h-1 bg-gray-500 rounded-full flex-shrink-0"></div>
            <div>
                <h3 className="text-sm font-semibold text-gray-800 line-clamp-1">{title}</h3>
                <p className="text-xs text-gray-500">{time}</p>
            </div>
        </div>
    </div>
);

export default RightSidebar;
