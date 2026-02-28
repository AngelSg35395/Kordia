export interface Song {
  ytid: string;
  title: string;
  artist: string;
  thumbnail: string;
  duration?: number;
  url?: string;
}

export interface SearchResult {
  ytid: string;
  title: string;
  artist: string;
  thumbnail: string;
  duration: number;
}

export interface OfflineSong {
  ytid: string;
  title: string;
  artist: string;
  downloaded_at: string;
  file_size: number;
}

export interface StreamResponse {
  ytid: string;
  url: string;
  cached: boolean;
}

export interface PlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  volume: number;
  queue: Song[];
  currentIndex: number;
}
