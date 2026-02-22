import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import Header from './Header';
import RightSidebar from './RightSidebar';

const InvestorLayout = ({ user, activeMode, hasRole, switchMode, onSwitchRole }) => {
    const location = useLocation();

    return (
        <div className="min-h-screen bg-[#F3F2EF]">
            <a href="#main-content" className="sr-only sr-only-focusable">Skip to main content</a>

            <Header
                user={user}
                activeMode={activeMode}
                hasRole={hasRole}
                switchMode={switchMode}
                layout="investor"
                onSwitchRole={onSwitchRole}
            />

            <main id="main-content" className="max-w-6xl mx-auto px-4 md:px-0 grid grid-cols-12 gap-5 pt-20">

                {/* Left Sidebar — Investor Tools */}
                <aside className="hidden md:block md:col-span-3 lg:col-span-3 sticky top-20 h-fit" aria-label="Investor tools">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 space-y-2">
                        <div className="font-bold text-gray-900 px-4 py-2">Investor Tools</div>
                        <Link
                            to="/investor"
                            className={`block w-full text-left px-4 py-2 rounded-lg text-sm font-medium ${location.pathname === '/investor' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
                        >
                            Dashboard
                        </Link>
                        <Link
                            to="/investor/discover"
                            className={`block w-full text-left px-4 py-2 rounded-lg text-sm font-medium ${location.pathname === '/investor/discover' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
                        >
                            Discover Startups
                        </Link>
                        <Link
                            to="/investor/saved"
                            className={`block w-full text-left px-4 py-2 rounded-lg text-sm font-medium ${location.pathname === '/investor/saved' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
                        >
                            Saved Startups
                        </Link>
                    </div>
                </aside>

                {/* Content Area — renders matched child route */}
                <div className="col-span-12 md:col-span-9 lg:col-span-6">
                    <Outlet />
                </div>

                {/* Right Sidebar */}
                <aside className="hidden lg:block lg:col-span-3 sticky top-20 h-fit" aria-label="Profile overview">
                    <RightSidebar />
                </aside>

            </main>
        </div>
    );
};

export default InvestorLayout;
