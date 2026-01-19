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
};

export default PlaylistManager;
