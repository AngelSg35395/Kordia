import { useState, useEffect } from 'react';
import { Play, Trash2, Download } from 'lucide-react';
import { usePlayer } from '../contexts/PlayerContext';
import { OfflineSong, Song } from '../types';
import { api } from '../services/api';

export default function Library() {
  const { playSong } = usePlayer();
  const [offlineSongs, setOfflineSongs] = useState<OfflineSong[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadOfflineSongs();
  }, []);

  const loadOfflineSongs = async () => {
    setIsLoading(true);
    try {
      const songs = await api.getOfflineSongs();
      setOfflineSongs(songs);
    } catch (error) {
      console.error('Failed to load offline songs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlay = (song: OfflineSong) => {
    const songData: Song = {
      ytid: song.ytid,
      title: song.title,
      artist: song.artist,
      thumbnail: '',
      url: api.getOfflineAudioUrl(song.ytid),
    };
    playSong(songData, offlineSongs.map(s => ({
      ytid: s.ytid,
      title: s.title,
      artist: s.artist,
      thumbnail: '',
      url: api.getOfflineAudioUrl(s.ytid),
    })));
  };

  const handleDelete = async (ytid: string) => {
    if (!confirm('¿Estás seguro de eliminar esta canción?')) return;

    try {
      await api.deleteOfflineSong(ytid);
      setOfflineSongs(offlineSongs.filter(s => s.ytid !== ytid));
    } catch (error) {
      console.error('Failed to delete song:', error);
      alert('Error al eliminar la canción');
    }
  };

  const formatFileSize = (bytes: number) => {
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(2)} MB`;
  };

  return (
    <div className="p-6 pb-32">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Biblioteca</h2>
          <p className="text-gray-400">
            {offlineSongs.length} {offlineSongs.length === 1 ? 'canción' : 'canciones'} descargadas
          </p>
        </div>
        {offlineSongs.length > 0 && (
          <div className="text-gray-400 text-sm">
            Total: {formatFileSize(offlineSongs.reduce((acc, s) => acc + s.file_size, 0))}
          </div>
        )}
      </div>

      {isLoading && (
        <div className="text-center text-gray-400 py-12">
          <p>Cargando...</p>
        </div>
      )}

      {!isLoading && offlineSongs.length === 0 && (
        <div className="text-center text-gray-400 py-12">
          <Download size={48} className="mx-auto mb-4 opacity-50" />
          <p className="text-lg mb-2">No hay canciones descargadas</p>
          <p className="text-sm">Descarga canciones desde la búsqueda para escucharlas sin conexión</p>
        </div>
      )}

      {!isLoading && offlineSongs.length > 0 && (
        <div className="space-y-2">
          {offlineSongs.map((song) => (
            <div
              key={song.ytid}
              className="flex items-center gap-4 bg-gray-800 hover:bg-gray-750 rounded-lg p-4 group transition"
            >
              <button
                onClick={() => handlePlay(song)}
                className="bg-purple-600 rounded-full p-3 opacity-0 group-hover:opacity-100 transition hover:bg-purple-700"
              >
                <Play size={20} className="text-white fill-white" />
              </button>

              <div className="flex-1 min-w-0">
                <h4 className="text-white font-medium truncate">{song.title}</h4>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <span className="truncate">{song.artist}</span>
                  <span>•</span>
                  <span>{formatFileSize(song.file_size)}</span>
                </div>
              </div>

              <button
                onClick={() => handleDelete(song.ytid)}
                className="text-gray-400 hover:text-red-500 transition p-2"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
