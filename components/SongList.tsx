import AsyncStorage from "@react-native-async-storage/async-storage";
import * as DocumentPicker from "expo-document-picker";
import { useRouter } from "expo-router";
import * as mm from "music-metadata-browser";
import React, { useEffect, useState } from "react";
import { Button, FlatList, Text, View } from "react-native";
import { Song, SONGS_KEY } from "../constants/common";

const SongList = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const router = useRouter();

  useEffect(() => {
    const loadSongs = async () => {
      const stored = await AsyncStorage.getItem(SONGS_KEY);
      if (stored) setSongs(JSON.parse(stored));
    };
    loadSongs();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(SONGS_KEY, JSON.stringify(songs));
  }, [songs]);

  const playSong = (uri: string) => {
    router.push({ pathname: "/explore", params: { uri } });
  };

  const pickSong = async () => {
    const result = await DocumentPicker.getDocumentAsync({ type: "audio/*" });
    if (result.assets && result.assets.length > 0) {
      for (const asset of result.assets) {
        try {
          const response = await fetch(asset.uri);
          const arrayBuffer = await response.arrayBuffer();
          const metadata = await mm.parseBuffer(
            Buffer.from(arrayBuffer),
            asset.mimeType || undefined,
          );
          setSongs((prev) => [
            ...prev,
            {
              uri: asset.uri,
              name: asset.name,
              title: metadata.common.title,
              artist: metadata.common.artist,
              duration: metadata.format.duration,
            },
          ]);
        } catch {
          setSongs((prev) => [...prev, { uri: asset.uri, name: asset.name }]);
        }
      }
    }
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Button title="Pick a Song" onPress={pickSong} />
      <FlatList
        data={songs}
        keyExtractor={(item) => item.uri}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 8 }}>
            <Text onPress={() => playSong(item.uri)}>
              {item.title || item.name} {item.artist ? `- ${item.artist}` : ""}
            </Text>
            {item.duration && (
              <Text style={{ color: "#666" }}>
                Duration: {Math.floor(item.duration)} sec
              </Text>
            )}
          </View>
        )}
      />
      <Button title="Clear Songs" onPress={() => setSongs([])} />
    </View>
  );
};

export default SongList;
