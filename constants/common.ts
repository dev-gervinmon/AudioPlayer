export type Song = {
  uri: string;
  name: string;
  title?: string;
  artist?: string;
  duration?: number;
};

export const SONGS_KEY = "songs";
