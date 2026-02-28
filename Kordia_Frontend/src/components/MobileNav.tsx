import { Home, Search, Library, Settings } from 'lucide-react';

interface MobileNavProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export default function MobileNav({ currentView, onViewChange }: MobileNavProps) {
  const menuItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'search', icon: Search, label: 'Buscar' },
    { id: 'library', icon: Library, label: 'Biblioteca' },
    { id: 'settings', icon: Settings, label: 'Ajustes' },
  ];

  return (
    <nav className="md:hidden fixed bottom-20 left-0 right-0 bg-gray-900 border-t border-gray-800">
      <div className="flex justify-around items-center py-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`flex flex-col items-center gap-1 px-4 py-2 transition-colors ${
                isActive ? 'text-purple-500' : 'text-gray-400'
              }`}
            >
              <Icon size={24} />
              <span className="text-xs">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
