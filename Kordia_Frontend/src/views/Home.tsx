import { useState, useEffect } from 'react';
import { Play } from 'lucide-react';
import { usePlayer } from '../contexts/PlayerContext';
import { Song } from '../types';
import { api } from '../services/api';

export default function Home() {
  const { playSong } = usePlayer();
  const [topSongs] = useState<Song[]>([
    {
      ytid: 'jfKfPfyJRdk',
      title: 'Caminos',
      artist: 'Luna Nueva',
      thumbnail: 'https://i.ytimg.com/vi/jfKfPfyJRdk/maxresdefault.jpg',
    },
    {
      ytid: '9Sc-ir2UwGU',
      title: 'Electric Dream',
      artist: 'Synthwave',
      thumbnail: 'https://i.ytimg.com/vi/9Sc-ir2UwGU/maxresdefault.jpg',
    },
    {
      ytid: 'hLQl3WQQoQ0',
      title: 'Bajo el Sol',
      artist: 'Los Viajeros',
      thumbnail: 'https://i.ytimg.com/vi/hLQl3WQQoQ0/maxresdefault.jpg',
    },
  ]);

  const handlePlay = (song: Song) => {
    playSong(song, topSongs);
  };

  return (
    <div className="p-6 pb-32">
      <h2 className="text-3xl font-bold text-white mb-2">Bienvenido a Kordia</h2>
      <p className="text-gray-400 mb-8">Recomendaciones para ti</p>

      <section className="mb-12">
        <h3 className="text-2xl font-bold text-white mb-6">Top Canciones</h3>
        <div className="space-y-3">
          {topSongs.map((song) => (
            <div
              key={song.ytid}
              className="flex items-center gap-4 bg-gray-800 hover:bg-gray-750 rounded-lg p-3 group transition cursor-pointer"
              onClick={() => handlePlay(song)}
            >
              <img
                src={song.thumbnail}
                alt={song.title}
                className="w-16 h-16 rounded object-cover"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-medium truncate">{song.title}</h4>
                <p className="text-gray-400 text-sm truncate">{song.artist}</p>
              </div>
              <button className="opacity-0 group-hover:opacity-100 bg-purple-600 rounded-full p-3 transition">
                <Play size={20} className="text-white fill-white" />
              </button>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-2xl font-bold text-white mb-6">Listas Populares</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group">
            <img
              src="https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Éxitos del Momento"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end p-4">
              <div className="text-white">
                <h4 className="text-xl font-bold">Éxitos</h4>
                <p className="text-sm">del Momento</p>
              </div>
            </div>
          </div>

          <div className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group">
            <img
              src="https://images.pexels.com/photos/631986/pexels-photo-631986.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Relax Acustico"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end p-4">
              <div className="text-white">
                <h4 className="text-xl font-bold">Relax</h4>
                <p className="text-sm">Acustico</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
