import PlayerControls from "@/components/PlayerControls";
import { AudioPlayerContext } from "@/lib/contexts/AudioPlayerContext";
import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";

const TEST_AUDIO_URL =
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

const PlayerScreen = () => {
  const { loadAudio } = useContext(AudioPlayerContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    Promise.resolve(loadAudio(TEST_AUDIO_URL))
      .catch(() => setError("Failed to load audio"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {loading && <ActivityIndicator size="large" color="#1976D2" />}
      {error && <Text style={{ color: "red" }}>{error}</Text>}
      {!loading && !error && <PlayerControls />}
    </View>
  );
};

export default PlayerScreen;
