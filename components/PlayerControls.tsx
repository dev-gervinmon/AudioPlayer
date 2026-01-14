import { AudioPlayerContext } from "@/lib/contexts/AudioPlayerContext";
import React, { useContext } from "react";
import { TouchableOpacity } from "react-native";
import { Text, View } from "react-native-reanimated/lib/typescript/Animated";
import Icon from "react-native-vector-icons/MaterialIcons";

const PlayerControls = () => {
  const { isPlaying, play, pause, playbackPosition, playbackDuration, seek } =
    useContext(AudioPlayerContext);
  return (
    <View>
      <TouchableOpacity onPress={isPlaying ? pause : play}>
        <Icon
          name={isPlaying ? "pause-circle" : "play-circle"}
          size={64}
          color="#000"
        />
      </TouchableOpacity>
      <Text>
        {Math.floor(playbackPosition / 1000)}s /{" "}
        {Math.floor(playbackDuration / 1000)} sec
      </Text>
    </View>
  );
};

export default PlayerControls;
