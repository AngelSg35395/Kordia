import { SearchResult, OfflineSong, StreamResponse, Song } from '../types';

// En producción usamos rutas relativas (mismo origen que el backend).
// En desarrollo, Vite proxy redirige al backend en localhost:8000.
const API_BASE_URL = import.meta.env.DEV
  ? (import.meta.env.VITE_API_URL || '')
  : '';

export const api = {
  async search(query: string, maxResults: number = 10): Promise<SearchResult[]> {
    const response = await fetch(
      `${API_BASE_URL}/search?q=${encodeURIComponent(query)}&max_results=${maxResults}`
    );
    if (!response.ok) throw new Error('Search failed');
    return response.json();
  },

  async getStreamUrl(ytid: string): Promise<StreamResponse> {
    const response = await fetch(`${API_BASE_URL}/stream/${ytid}`);
    if (!response.ok) throw new Error('Failed to get stream URL');
    return response.json();
  },

  async downloadOffline(song: Song): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/offline/download/${song.ytid}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ytid: song.ytid,
        title: song.title,
        artist: song.artist,
        thumbnail: song.thumbnail,
      }),
    });
    if (!response.ok) throw new Error('Download failed');
  },

  async getOfflineSongs(): Promise<OfflineSong[]> {
    const response = await fetch(`${API_BASE_URL}/offline`);
    if (!response.ok) throw new Error('Failed to get offline songs');
    return response.json();
  },

  async deleteOfflineSong(ytid: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/offline/${ytid}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete song');
  },

  getOfflineAudioUrl(ytid: string): string {
    return `${API_BASE_URL}/offline/audio/${ytid}`;
  },

  async cleanup(): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/cleanup`, {
      method: 'POST',
    });
    if (!response.ok) throw new Error('Cleanup failed');
  },
};
