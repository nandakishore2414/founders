import Feed from './components/Feed';
import Header from './components/Header';
import LeftSidebar from './components/LeftSidebar';
import RightSidebar from './components/RightSidebar';

function App() {
  return (
    <div className="min-h-screen bg-[#F3F2EF]">
      <Header />
      <main className="max-w-6xl mx-auto pt-20 px-4 md:px-0 grid grid-cols-12 gap-5">

        {/* Left Sidebar */}
        <div className="hidden md:block md:col-span-3 lg:col-span-3 sticky top-20 h-fit">
          <LeftSidebar />
        </div>

        {/* Feed */}
        <div className="col-span-12 md:col-span-9 lg:col-span-6">
          <Feed />
        </div>

        {/* Right Sidebar */}
        <div className="hidden lg:block lg:col-span-3 sticky top-20 h-fit">
          <RightSidebar />
        </div>

      </main>
    </div>
  )
}

export default App
