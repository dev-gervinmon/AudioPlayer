import { AudioPlayerContext } from "@/lib/contexts/AudioPlayerContext";
import Slider from "@react-native-community/slider";
import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const PlayerControls = () => {
  const { isPlaying, play, pause, playbackPosition, playbackDuration, seek } =
    useContext(AudioPlayerContext);

  // Format seconds to mm:ss
  const formatTime = (millis: number) => {
    const totalSeconds = Math.floor(millis / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={isPlaying ? pause : play}
        style={styles.button}
      >
        <Icon
          name={isPlaying ? "pause-circle" : "play-circle"}
          size={64}
          color="#1976D2"
        />
      </TouchableOpacity>
      <View style={styles.sliderContainer}>
        <Text style={styles.time}>{formatTime(playbackPosition)}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={playbackDuration || 1}
          value={playbackPosition}
          minimumTrackTintColor="#1976D2"
          maximumTrackTintColor="#BDBDBD"
          thumbTintColor="#1976D2"
          onSlidingComplete={seek}
        />
        <Text style={styles.time}>{formatTime(playbackDuration)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 24,
    backgroundColor: "#fff",
    borderRadius: 16,
    elevation: 2,
    margin: 16,
  },
  button: {
    marginBottom: 16,
  },
  sliderContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 8,
  },
  slider: {
    flex: 1,
    height: 40,
    marginHorizontal: 8,
  },
  time: {
    width: 48,
    textAlign: "center",
    color: "#333",
    fontVariant: ["tabular-nums"],
  },
});

export default PlayerControls;
