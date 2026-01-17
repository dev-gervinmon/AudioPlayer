import * as DocumentPicker from "expo-document-picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Button, FlatList, Text, View } from "react-native";

const SongList = () => {
  const [songs, setSongs] = useState<DocumentPicker.DocumentPickerAsset[]>([]);
  const router = useRouter();

  const playSong = (uri: string) => {
    router.push({ pathname: "/explore", params: { uri } });
  }
  const pickSong = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "audio/*",
    });
    if (result.assets && result.assets.length > 0) {
      setSongs((prev) => [...prev, ...result.assets]);
    }
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Button title="Pick a Song" onPress={pickSong} />
      <FlatList
        data={songs}
        keyExtractor={(item) => item.uri}
        renderItem={({ item }) => (
          <Text style={{ marginVertical: 8 }} onPress={() => playSong(item.uri)}>{item.name}</Text>
        )}
      />
    </View>
  );
};

export default SongList;
