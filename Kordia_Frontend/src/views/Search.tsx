import { useState } from 'react';
import { Search as SearchIcon, Download } from 'lucide-react';
import { usePlayer } from '../contexts/PlayerContext';
import { SearchResult, Song } from '../types';
import { api } from '../services/api';
import SongCard from '../components/SongCard';

export default function Search() {
  const { playSong } = usePlayer();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      const searchResults = await api.search(query, 20);
      setResults(searchResults);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlay = (result: SearchResult) => {
    const song: Song = {
      ytid: result.ytid,
      title: result.title,
      artist: result.artist,
      thumbnail: result.thumbnail,
      duration: result.duration,
    };
    playSong(song, results.map(r => ({
      ytid: r.ytid,
      title: r.title,
      artist: r.artist,
      thumbnail: r.thumbnail,
      duration: r.duration,
    })));
  };

  const handleDownload = async (result: SearchResult) => {
    try {
      await api.downloadOffline({
        ytid: result.ytid,
        title: result.title,
        artist: result.artist,
        thumbnail: result.thumbnail,
      });
      alert('Descarga iniciada');
    } catch (error) {
      console.error('Download failed:', error);
      alert('Error al descargar');
    }
  };

  return (
    <div className="p-6 pb-32">
      <h2 className="text-3xl font-bold text-white mb-6">Buscar</h2>

      <form onSubmit={handleSearch} className="mb-8">
        <div className="relative">
          <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="¿Qué quieres escuchar?"
            className="w-full bg-gray-800 text-white pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>
      </form>

      {isLoading && (
        <div className="text-center text-gray-400 py-12">
          <p>Buscando...</p>
        </div>
      )}

      {!isLoading && results.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {results.map((result) => (
            <SongCard
              key={result.ytid}
              song={result}
              onPlay={handlePlay}
              onDownload={handleDownload}
            />
          ))}
        </div>
      )}

      {!isLoading && results.length === 0 && query && (
        <div className="text-center text-gray-400 py-12">
          <p>No se encontraron resultados</p>
        </div>
      )}
    </div>
  );
}
