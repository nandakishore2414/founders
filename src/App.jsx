import { useState, lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import FounderLayout from './components/FounderLayout';
import InvestorLayout from './components/InvestorLayout';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';
import { DataProvider } from './context/DataContext';
import { GamificationProvider } from './context/GamificationContext';

// Lazy-loaded route components
const Feed = lazy(() => import('./components/Feed'));
const Shorts = lazy(() => import('./components/Shorts'));
const StartupPage = lazy(() => import('./components/StartupPage'));
const ProjectsFeed = lazy(() => import('./components/ProjectsFeed'));
const FounderDiscovery = lazy(() => import('./components/FounderDiscovery'));
const CommunityHelp = lazy(() => import('./components/CommunityHelp'));
const FreelancingMarketplace = lazy(() => import('./components/FreelancingMarketplace'));
const ProfilePage = lazy(() => import('./components/ProfilePage'));
const Messages = lazy(() => import('./components/Messages'));
const CreatePost = lazy(() => import('./components/CreatePost'));
const CreateBuildUpdate = lazy(() => import('./components/CreateBuildUpdate'));
const CreateProject = lazy(() => import('./components/CreateProject'));
const GamificationDashboard = lazy(() => import('./components/GamificationDashboard'));
const InvestorDashboard = lazy(() => import('./components/InvestorDashboard'));
const AccessRestricted = lazy(() => import('./components/AccessRestricted'));
const FounderIdentity = lazy(() => import('./components/FounderIdentity'));

function App() {
  // Simulated User State
  const [user, setUser] = useState({
    name: "Arjun",
    roles: ["founder", "investor"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
  });

  // Initialize mode based on role
  const [activeMode, setActiveMode] = useState(() => {
    if (user.roles.includes('investor') && !user.roles.includes('founder')) return 'investor';
    return 'founder';
  });

  const navigate = useNavigate();

  const hasRole = (role) => user.roles.includes(role);

  const switchMode = (mode) => {
    setActiveMode(mode);
    if (mode === 'investor') navigate('/investor');
    else navigate('/');
  };

  const handleRoleChange = (newRole) => {
    console.log("Role changed to:", newRole);
    switch (newRole) {
      case 'user':
        setUser(prev => ({ ...prev, roles: [] }));
        break;
      case 'founder':
        setUser(prev => ({ ...prev, roles: ['founder'] }));
        setActiveMode('founder');
        navigate('/');
        break;
      case 'investor':
        setUser(prev => ({ ...prev, roles: ['investor'] }));
        setActiveMode('investor');
        navigate('/investor');
        break;
      case 'founder_investor':
        setUser(prev => ({ ...prev, roles: ['founder', 'investor'] }));
        break;
      default:
        break;
    }
  };

  const currentUserId = 'founder-1';

  const sharedProps = {
    user,
    activeMode,
    hasRole,
    switchMode,
    onSwitchRole: handleRoleChange,
  };

  return (
    <DataProvider currentUserId={currentUserId}>
      <GamificationProvider>
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              {/* Founder routes */}
              <Route element={<FounderLayout {...sharedProps} />}>
                <Route index element={<Feed />} />
                <Route path="shorts" element={<Shorts />} />
                <Route path="startup" element={<StartupPage user={user} />} />
                <Route path="projects" element={<ProjectsFeed />} />
                <Route path="network" element={<FounderDiscovery />} />
                <Route path="community" element={<CommunityHelp />} />
                <Route path="freelance" element={<FreelancingMarketplace />} />
                <Route path="gamification" element={<GamificationDashboard />} />
                <Route path="profile" element={<ProfilePage user={user} activeMode={activeMode} switchMode={switchMode} hasRole={hasRole} />} />
                <Route path="messages" element={<Messages />} />
                <Route path="create-post" element={<CreatePost user={user} currentUserId={currentUserId} />} />
                <Route path="create-update" element={<CreateBuildUpdate hasRole={hasRole} user={user} currentUserId={currentUserId} />} />
                <Route path="create-project" element={<CreateProject user={user} currentUserId={currentUserId} />} />
              </Route>

            {/* Investor routes */}
            <Route path="investor" element={<InvestorLayout {...sharedProps} />}>
              <Route index element={<InvestorDashboard hasRole={hasRole} />} />
              <Route path="discover" element={<FounderDiscovery />} />
              <Route path="saved" element={<AccessRestricted role="investor" message="Saved Startups" description="This feature is coming soon." />} />
              <Route path="messages" element={<Messages />} />
              <Route path="profile" element={<FounderIdentity activeMode={activeMode} hasRole={hasRole} user={user} />} />
              <Route path="gamification" element={<GamificationDashboard />} />
            </Route>

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
      </GamificationProvider>
    </DataProvider>
  );
}

export default App
