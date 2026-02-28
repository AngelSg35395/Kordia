import { X, Trash2 } from 'lucide-react';
import { usePlayer } from '../contexts/PlayerContext';

interface QueueProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Queue({ isOpen, onClose }: QueueProps) {
  const { queue, currentIndex, playSong, removeFromQueue, clearQueue } = usePlayer();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end md:items-center justify-center">
      <div className="bg-gray-900 w-full md:w-96 md:rounded-lg max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h3 className="text-white font-semibold">Cola de Reproducción</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {queue.length === 0 ? (
            <p className="text-gray-400 text-center py-8">La cola está vacía</p>
          ) : (
            <div className="space-y-2">
              {queue.map((song, index) => (
                <div
                  key={`${song.ytid}-${index}`}
                  className={`flex items-center gap-3 p-3 rounded-lg ${
                    index === currentIndex ? 'bg-purple-600 bg-opacity-20' : 'bg-gray-800'
                  }`}
                >
                  <img
                    src={song.thumbnail}
                    alt={song.title}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4
                      className={`font-medium truncate ${
                        index === currentIndex ? 'text-purple-400' : 'text-white'
                      }`}
                    >
                      {song.title}
                    </h4>
                    <p className="text-gray-400 text-sm truncate">{song.artist}</p>
                  </div>
                  {index !== currentIndex && (
                    <button
                      onClick={() => removeFromQueue(index)}
                      className="text-gray-400 hover:text-red-500 transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {queue.length > 0 && (
          <div className="p-4 border-t border-gray-800">
            <button
              onClick={clearQueue}
              className="w-full bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-lg transition"
            >
              Limpiar Cola
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
