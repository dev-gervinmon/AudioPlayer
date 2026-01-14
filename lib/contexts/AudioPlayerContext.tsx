import { Audio } from "expo-av";
import { createContext, useEffect, useRef, useState } from "react";

const defaultAudioPlayerContext = {
  isPlaying: false,
  playbackPosition: 0,
  playbackDuration: 0,
  play: () => {},
  pause: () => {},
  seek: (_position: number) => {},
  loadAudio: (_url: string) => {},
};

export const AudioPlayerContext = createContext(defaultAudioPlayerContext);

export const AudioPlayerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const playbackInstance = useRef<Audio.Sound | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackPosition, setPlaybackPosition] = useState(0);
  const [playbackDuration, setPlaybackDuration] = useState(0);

  const onPlaybackStatusUpdate = (status: any) => {
    if (status.isLoaded) {
      setPlaybackPosition(status.positionMillis);
      setPlaybackDuration(status.durationMillis);
      setIsPlaying(status.isPlaying);
    }
  };

  const loadAudio = async (uri: string) => {
    if (playbackInstance.current) {
      await playbackInstance.current.unloadAsync();
      playbackInstance.current = null;
    }

    const { sound } = await Audio.Sound.createAsync({ uri });
    playbackInstance.current = sound;
    sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
  };

  const play = async () => {
    if (playbackInstance.current) {
      await playbackInstance.current.playAsync();
      setIsPlaying(true);
    }
  };

  const pause = async () => {
    if (playbackInstance.current) {
      await playbackInstance.current.pauseAsync();
      setIsPlaying(false);
    }
  };

  const seek = async (position: number) => {
    if (playbackInstance.current) {
      await playbackInstance.current.setPositionAsync(position);
    }
  };

  useEffect(() => {
    return () => {
      if (playbackInstance.current) {
        playbackInstance.current.unloadAsync();
      }
    };
  }, []);

  return (
    <AudioPlayerContext.Provider
      value={{
        isPlaying,
        playbackPosition,
        playbackDuration,
        play,
        pause,
        seek,
        loadAudio,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};
