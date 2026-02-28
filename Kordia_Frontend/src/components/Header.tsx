import { Settings, Menu } from 'lucide-react';

interface HeaderProps {
  title: string;
  onMenuClick?: () => void;
}

export default function Header({ title, onMenuClick }: HeaderProps) {
  return (
    <header className="md:hidden sticky top-0 bg-gray-900 border-b border-gray-800 px-4 py-3 z-10">
      <div className="flex items-center justify-between">
        <button onClick={onMenuClick} className="text-gray-400">
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          {title}
        </h1>
        <div className="w-6"></div>
      </div>
    </header>
  );
}
