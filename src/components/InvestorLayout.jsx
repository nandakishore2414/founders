import React from 'react';
import Header from './Header';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import InvestorDashboard from './InvestorDashboard';
import FounderDiscovery from './FounderDiscovery';
import Messages from './Messages';
import FounderIdentity from './FounderIdentity';
import AccessRestricted from './AccessRestricted';

const InvestorLayout = ({ currentView, onNavigate, user, activeMode, hasRole, switchMode, onSwitchRole }) => {

    return (
        <div className="min-h-screen bg-[#F3F2EF]">
            <Header
                currentView={currentView}
                onNavigate={onNavigate}
                user={user}
                activeMode={activeMode}
                hasRole={hasRole}
                switchMode={switchMode}
                layout="investor"
                onSwitchRole={onSwitchRole}
            />

            <main className="max-w-6xl mx-auto px-4 md:px-0 grid grid-cols-12 gap-5 pt-20">

                {/* Left Sidebar (Optional or Customized for Investor) */}
                <div className="hidden md:block md:col-span-3 lg:col-span-3 sticky top-20 h-fit">
                    {/* Reusing LeftSidebar for now, or could be Investor specific */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 space-y-2">
                        <div className="font-bold text-gray-900 px-4 py-2">Investor Tools</div>
                        <button onClick={() => onNavigate('investor-dashboard')} className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium ${currentView === 'investor-dashboard' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}>Dashboard</button>
                        <button onClick={() => onNavigate('discover')} className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium ${currentView === 'discover' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}>Discover Startups</button>
                        <button onClick={() => onNavigate('saved')} className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium ${currentView === 'saved' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}>Saved Startups</button>
                    </div>
                </div>

                {/* Content Area */}
                <div className="col-span-12 md:col-span-9 lg:col-span-6">
                    {currentView === 'investor-dashboard' && <InvestorDashboard hasRole={hasRole} />}
                    {currentView === 'discover' && <FounderDiscovery />}
                    {currentView === 'saved' && <AccessRestricted role="investor" message="Saved Startups" description="This feature is coming soon." />}
                    {currentView === 'messages' && <Messages />}
                    {currentView === 'founder' && <FounderIdentity activeMode={activeMode} hasRole={hasRole} user={user} />} {/* Viewing a profile */}

                    {/* Default redirect or view */}
                    {['home', 'shorts'].includes(currentView) && (
                        <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
                            <h2 className="text-xl font-bold">Welcome to Investor Mode</h2>
                            <p className="text-gray-500">Go to Dashboard to see deal flow.</p>
                            <button onClick={() => onNavigate('investor-dashboard')} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">Go to Dashboard</button>
                        </div>
                    )}
                </div>

                {/* Right Sidebar */}
                <div className="hidden lg:block lg:col-span-3 sticky top-20 h-fit">
                    <RightSidebar />
                </div>

            </main>
        </div>
    );
};

export default InvestorLayout;
