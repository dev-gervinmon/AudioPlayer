export type Song = {
  uri: string;
  name: string;
  title?: string;
  artist?: string;
  duration?: number;
};

export type Playlist = {
  id: string;
  name: string;
  songUris: string[];
};

export const PLAYLISTS_KEY = "playlists";
export const SONGS_KEY = "songs";
