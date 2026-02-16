import { useState } from 'react';
import Feed from './components/Feed';
import Header from './components/Header';
import LeftSidebar from './components/LeftSidebar';
import RightSidebar from './components/RightSidebar';
import Shorts from './components/Shorts';
import FounderIdentity from './components/FounderIdentity';
import CreateBuildUpdate from './components/CreateBuildUpdate';
import CreatePost from './components/CreatePost';
import FounderDiscovery from './components/FounderDiscovery';
import Messages from './components/Messages';

function App() {
  const [currentView, setCurrentView] = useState('home');

  const isShortsView = currentView === 'shorts';

  return (
    <div className="min-h-screen bg-[#F3F2EF]">
      {!isShortsView && <Header currentView={currentView} onNavigate={setCurrentView} />}

      <main className={`max-w-6xl mx-auto px-4 md:px-0 grid grid-cols-12 gap-5 ${isShortsView ? 'pt-4' : 'pt-20'}`}>

        {/* Left Sidebar (Home Only) */}
        {!isShortsView && (
          <div className="hidden md:block md:col-span-3 lg:col-span-3 sticky top-20 h-fit">
            <LeftSidebar currentView={currentView} onNavigate={setCurrentView} />
          </div>
        )}

        {/* Content Area */}
        <div className={`col-span-12 ${isShortsView ? '' : 'md:col-span-9 lg:col-span-6'}`}>
          {currentView === 'home' && <Feed />}
          {currentView === 'shorts' && <Shorts onBack={() => setCurrentView('home')} />}
          {currentView === 'founder' && <FounderIdentity />}
          {currentView === 'create-update' && <CreateBuildUpdate onCancel={() => setCurrentView('home')} />}
          {currentView === 'create-post' && <CreatePost onCancel={() => setCurrentView('home')} />}
          {currentView === 'network' && <FounderDiscovery />}
          {currentView === 'messages' && <Messages />}
        </div>

        {/* Right Sidebar (Home Only) */}
        {!isShortsView && (
          <div className="hidden lg:block lg:col-span-3 sticky top-20 h-fit">
            <RightSidebar />
          </div>
        )}

      </main>
    </div>
  )
}

export default App
