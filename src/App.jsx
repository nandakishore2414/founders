import { useState } from 'react';
import Feed from './components/Feed';
import Header from './components/Header';
import LeftSidebar from './components/LeftSidebar';
import RightSidebar from './components/RightSidebar';
import Shorts from './components/Shorts';
import ShortsSidebar from './components/ShortsSidebar';
import FounderIdentity from './components/FounderIdentity';
import CreateBuildUpdate from './components/CreateBuildUpdate';
import CreatePost from './components/CreatePost';
import FounderDiscovery from './components/FounderDiscovery';
import Messages from './components/Messages';
import InvestorDashboard from './components/InvestorDashboard';
import FounderLayout from './components/FounderLayout';
import InvestorLayout from './components/InvestorLayout';

function App() {
  const [currentView, setCurrentView] = useState('home');

  // Simulated User State
  const [user, setUser] = useState({
    name: "Arjun",
    roles: ["founder", "investor"], // Can be "founder", "investor", or both
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
  });

  // Initialize mode based on role
  // If user only has investor role, default to investor mode. Otherwise founder.
  const [activeMode, setActiveMode] = useState(() => {
    if (user.roles.includes('investor') && !user.roles.includes('founder')) return 'investor';
    return 'founder';
  });

  const hasRole = (role) => user.roles.includes(role);

  const switchMode = (mode) => {
    setActiveMode(mode);
    // Navigate to default view for that mode
    if (mode === 'investor') setCurrentView('investor-dashboard');
    else setCurrentView('home');
  };

  // Placeholder for handleRoleChange, assuming it will be defined elsewhere or is a prop
  // For the purpose of this edit, we assume handleRoleChange is accessible in this scope.
  const handleRoleChange = (newRole) => {
    console.log("Role changed to:", newRole);
    // In a real app, this would update the user's roles or active mode
    // For now, it just logs.
  };

  const isShortsView = currentView === 'shorts';

  if (activeMode === 'investor' && hasRole('investor')) {
    return (
      <InvestorLayout
        currentView={currentView}
        onNavigate={setCurrentView}
        user={user}
        activeMode={activeMode}
        hasRole={hasRole}
        switchMode={switchMode}
        onSwitchRole={handleRoleChange}
      />
    );
  }

  return (
    <FounderLayout
      currentView={currentView}
      onNavigate={setCurrentView}
      user={user}
      activeMode={activeMode}
      hasRole={hasRole}
      switchMode={switchMode}
      onSwitchRole={handleRoleChange}
    />
  );
}

export default App
