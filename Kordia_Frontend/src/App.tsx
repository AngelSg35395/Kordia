import { useState } from 'react';
import { PlayerProvider } from './contexts/PlayerContext';
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import MobileNav from './components/MobileNav';
import Queue from './components/Queue';
import Header from './components/Header';
import Home from './views/Home';
import Search from './views/Search';
import Library from './views/Library';
import Settings from './views/Settings';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [showQueue, setShowQueue] = useState(false);

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <Home />;
      case 'search':
        return <Search />;
      case 'library':
        return <Library />;
      case 'settings':
        return <Settings />;
      default:
        return <Home />;
    }
  };

  const getViewTitle = () => {
    switch (currentView) {
      case 'home':
        return 'Kordia';
      case 'search':
        return 'Buscar';
      case 'library':
        return 'Biblioteca';
      case 'settings':
        return 'Ajustes';
      default:
        return 'Kordia';
    }
  };

  return (
    <PlayerProvider>
      <div className="min-h-screen bg-gray-950 flex">
        <Sidebar currentView={currentView} onViewChange={setCurrentView} />

        <main className="flex-1 flex flex-col">
          <Header title={getViewTitle()} />

          <div className="flex-1 overflow-y-auto">
            {renderView()}
          </div>
        </main>

        <Player onShowQueue={() => setShowQueue(true)} />
        <MobileNav currentView={currentView} onViewChange={setCurrentView} />
        <Queue isOpen={showQueue} onClose={() => setShowQueue(false)} />
      </div>
    </PlayerProvider>
  );
}

export default App;
