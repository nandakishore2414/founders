import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import ShortsSidebar from './ShortsSidebar';
import ProfileLeftSidebar from './ProfileLeftSidebar';
import ProfileRightSidebar from './ProfileRightSidebar';

const FounderLayout = ({ user, activeMode, hasRole, switchMode, onSwitchRole }) => {
    const location = useLocation();
    const isShortsView = location.pathname === '/shorts';
    const isProfileView = location.pathname === '/profile';

    return (
        <div className="min-h-screen bg-[#EEF2FF]">
            {/* Skip to main content link */}
            <a href="#main-content" className="sr-only sr-only-focusable">Skip to main content</a>

            {!isShortsView && (
                <Header
                    user={user}
                    activeMode={activeMode}
                    hasRole={hasRole}
                    switchMode={switchMode}
                    layout="founder"
                    onSwitchRole={onSwitchRole}
                />
            )}
            {isShortsView && (
                <ShortsSidebar
                    user={user}
                    activeMode={activeMode}
                />
            )}

            <main id="main-content" className={`max-w-6xl mx-auto px-4 md:px-0 grid grid-cols-12 gap-5 ${isShortsView ? 'pt-0 pl-16' : 'pt-20'}`}>

                {/* Left Sidebar */}
                {!isShortsView && (
                    <aside className="hidden md:block md:col-span-3 lg:col-span-3 sticky top-20 h-fit" aria-label="Quick actions and navigation">
                        {isProfileView ? (
                            <ProfileLeftSidebar user={user} activeMode={activeMode} />
                        ) : (
                            <LeftSidebar />
                        )}
                    </aside>
                )}

                {/* Content Area — renders matched child route */}
                <div className={`col-span-12 ${isShortsView ? '' : 'md:col-span-9 lg:col-span-6'}`}>
                    <Outlet />
                </div>

                {/* Right Sidebar */}
                {!isShortsView && (
                    <aside className="hidden lg:block lg:col-span-3 sticky top-20 h-fit" aria-label="Profile overview">
                        {isProfileView ? (
                            <ProfileRightSidebar activeMode={activeMode} />
                        ) : (
                            <RightSidebar />
                        )}
                    </aside>
                )}

            </main>
        </div>
    );
};

export default FounderLayout;
