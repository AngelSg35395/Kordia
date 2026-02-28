import { Play, Download } from 'lucide-react';
import { Song } from '../types';

interface SongCardProps {
  song: Song;
  onPlay: (song: Song) => void;
  onDownload?: (song: Song) => void;
  showDownload?: boolean;
}

export default function SongCard({ song, onPlay, onDownload, showDownload = true }: SongCardProps) {
  return (
    <div className="group relative bg-gray-800 rounded-lg p-4 hover:bg-gray-750 transition cursor-pointer">
      <div className="relative aspect-square mb-3">
        <img
          src={song.thumbnail}
          alt={song.title}
          className="w-full h-full object-cover rounded"
        />
        <button
          onClick={() => onPlay(song)}
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-50 transition opacity-0 group-hover:opacity-100"
        >
          <div className="bg-purple-600 rounded-full p-3 transform scale-90 group-hover:scale-100 transition">
            <Play size={24} className="text-white fill-white" />
          </div>
        </button>
      </div>

      <h3 className="text-white font-medium truncate mb-1">{song.title}</h3>
      <p className="text-gray-400 text-sm truncate">{song.artist}</p>

      {showDownload && onDownload && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDownload(song);
          }}
          className="absolute top-2 right-2 bg-gray-900 bg-opacity-80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition hover:bg-purple-600"
        >
          <Download size={16} className="text-white" />
        </button>
      )}
    </div>
  );
}
