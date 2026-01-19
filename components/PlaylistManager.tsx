import { Playlist, PLAYLISTS_KEY } from "@/constants/common";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Button, FlatList, Text, TextInput, View } from "react-native";

const PlaylistManager = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [newPlaylistName, setNewPlaylistName] = useState("");

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

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>Playlists</Text>
      <FlatList
        data={playlists}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 8,
            }}
          >
            <Text style={{ flex: 1 }}>{item.name}</Text>
            <Button title="Delete" onPress={() => removePlaylist(item.id)} />
          </View>
        )}
      />
      <TextInput
        placeholder="New playlist name"
        value={newPlaylistName}
        onChangeText={setNewPlaylistName}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 8,
          marginVertical: 8,
        }}
      />
      <Button
        title="Add Playlist"
        onPress={() => {
          if (newPlaylistName.trim()) {
            addPlaylist(newPlaylistName.trim());
            setNewPlaylistName("");
          }
        }}
      />
    </View>
  );
};

export default PlaylistManager;
