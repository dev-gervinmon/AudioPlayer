import { Playlist, PLAYLISTS_KEY } from "@/constants/common";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const PlaylistManager = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  useEffect(() => {
    const loadPlaylists = async () => {
      const stored = await AsyncStorage.getItem(PLAYLISTS_KEY);
      if (stored) setPlaylists(JSON.parse(stored));
    };
    loadPlaylists();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(PLAYLISTS_KEY, JSON.stringify(playlists));
  }, [playlists]);

  const addPlaylist = (name: string) => {
    setPlaylists((prev) => [
      ...prev,
      { id: Date.now().toString(), name, songUris: [] },
    ]);
  };

  const removePlaylist = (id: string) => {
    setPlaylists((prev) => prev.filter((p) => p.id !== id));
  };

  const addSongToPlaylist = (playlistId: string, songUri: string) => {
    setPlaylists((prev) =>
      prev.map((p) =>
        p.id === playlistId ? { ...p, songUris: [...p.songUris, songUri] } : p,
      ),
    );
  };

  const removeSongFromPlaylist = (playlistId: string, songUri: string) => {
    setPlaylists((prev) =>
      prev.map((p) =>
        p.id === playlistId
          ? { ...p, songUris: p.songUris.filter((uri) => uri !== songUri) }
          : p,
      ),
    );
  };
};

export default PlaylistManager;
