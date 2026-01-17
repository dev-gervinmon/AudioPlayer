import PlayerControls from "@/components/PlayerControls";
import { AudioPlayerContext } from "@/lib/contexts/AudioPlayerContext";
import { useRoute } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";

const TEST_AUDIO_URL =
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

const PlayerScreen = () => {
  const { loadAudio } = useContext(AudioPlayerContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const route = useRoute();
  const { uri } = route.params as { uri?: string };
  const audioUri = uri ?? TEST_AUDIO_URL;

  useEffect(() => {
    setLoading(true);
    setError(null);
    Promise.resolve(loadAudio(audioUri))
      .catch(() => setError("Failed to load audio"))
      .finally(() => setLoading(false));
  }, [audioUri, loadAudio]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {loading && <ActivityIndicator size="large" color="#1976D2" />}
      {error && <Text style={{ color: "red" }}>{error}</Text>}
      {!loading && !error && <PlayerControls />}
    </View>
  );
};

export default PlayerScreen;
