import PlayerControls from "@/components/PlayerControls";
import { AudioPlayerContext } from "@/lib/contexts/AudioPlayerContext";
import React, { useContext, useEffect } from "react";
import { View } from "react-native";

const TEST_AUDIO_URL =
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

const PlayerScreen = () => {
  const { loadAudio } = useContext(AudioPlayerContext);

  useEffect(() => {
    loadAudio(TEST_AUDIO_URL);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <PlayerControls />
    </View>
  );
};

export default PlayerScreen;
