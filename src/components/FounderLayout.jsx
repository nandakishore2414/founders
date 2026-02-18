import React from 'react';
import Header from './Header';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import ShortsSidebar from './ShortsSidebar';
import Feed from './Feed';
import Shorts from './Shorts';
import FounderIdentity from './FounderIdentity';
import CreateBuildUpdate from './CreateBuildUpdate';
import CreatePost from './CreatePost';
import FounderDiscovery from './FounderDiscovery';
import Messages from './Messages';
import AccessRestricted from './AccessRestricted';

const FounderLayout = ({ currentView, onNavigate, user, activeMode, hasRole, switchMode, onSwitchRole }) => {
    const isShortsView = currentView === 'shorts';

    return (
        <div className="min-h-screen bg-[#F3F2EF]">
            {!isShortsView && (
                <Header
                    currentView={currentView}
                    onNavigate={onNavigate}
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
                    currentView={currentView}
                    onNavigate={onNavigate}
                    user={user}
                    activeMode={activeMode}
                />
            )}

            <main className={`max-w-6xl mx-auto px-4 md:px-0 grid grid-cols-12 gap-5 ${isShortsView ? 'pt-0 pl-16' : 'pt-20'}`}>

                {/* Left Sidebar (Home Only) */}
                {!isShortsView && (
                    <div className="hidden md:block md:col-span-3 lg:col-span-3 sticky top-20 h-fit">
                        <LeftSidebar currentView={currentView} onNavigate={onNavigate} />
                    </div>
                )}

                {/* Content Area */}
                <div className={`col-span-12 ${isShortsView ? '' : 'md:col-span-9 lg:col-span-6'}`}>
                    {currentView === 'home' && <Feed />}
                    {currentView === 'shorts' && <Shorts onBack={() => onNavigate('home')} />}
                    {currentView === 'founder' && <FounderIdentity activeMode={activeMode} hasRole={hasRole} user={user} />}
                    {currentView === 'create-update' && <CreateBuildUpdate onCancel={() => onNavigate('home')} hasRole={hasRole} />}
                    {currentView === 'create-post' && <CreatePost onCancel={() => onNavigate('home')} />}
                    {currentView === 'network' && <FounderDiscovery />}
                    {currentView === 'messages' && <Messages />}

                    {/* Fallback for restricted/unknown views in this layout */}
                    {['investor-dashboard', 'saved-startups'].includes(currentView) && (
                        <AccessRestricted
                            role="investor"
                            message="Investor Access Only"
                            description="Please switch to Investor Mode to view this content."
                        />
                    )}
                </div>

                {/* Right Sidebar (Home Only) */}
                {!isShortsView && (
                    <div className="hidden lg:block lg:col-span-3 sticky top-20 h-fit">
                        <RightSidebar />
                    </div>
                )}

            </main>
        </div>
    );
};

export default FounderLayout;
