import { HashRouter } from 'react-router-dom';
import { useState } from 'react';
import { BiMenu } from 'react-icons/bi';
import AppRoutes from './routes';
import Sidebar from './components/layout/Sidebar';
import Player from './components/player/Player';
import { MusicProvider } from './contexts/MusicContext';
import { AuthProvider } from './contexts/AuthContext';
import { PlaylistProvider } from './contexts/PlaylistContext';
import { SocialProvider } from './contexts/SocialContext';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <HashRouter>
      <AuthProvider>
        <SocialProvider>
          <PlaylistProvider>
            <MusicProvider>
              <div className="flex flex-col h-screen bg-dark text-white md:flex-row">
                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="md:hidden fixed top-4 left-4 z-50 p-2 bg-dark-lighter rounded-full"
                >
                  <BiMenu className="text-2xl" />
                </button>

                {/* Sidebar */}
                <div className={`
                  fixed inset-0 z-40 transform transition-transform duration-300 md:relative md:transform-none
                  ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                `}>
                  <Sidebar onClose={() => setIsSidebarOpen(false)} />
                </div>

                {/* Main Content */}
                <main className="flex-1 overflow-auto pt-16 md:pt-0 pb-24 md:pb-28">
                  <AppRoutes />
                </main>

                {/* Player */}
                <div className="fixed bottom-0 left-0 right-0 z-50">
                  <Player />
                </div>
              </div>
            </MusicProvider>
          </PlaylistProvider>
        </SocialProvider>
      </AuthProvider>
    </HashRouter>
  );
}

export default App;