import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import PlayerScreen from "@/components/PlayerScreen";
import SongList from "@/components/SongList";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { AudioPlayerProvider } from "@/lib/contexts/AudioPlayerContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const Stack = createNativeStackNavigator();

  return (
    <AudioPlayerProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack.Navigator>
          <Stack.Screen name="SongList" component={SongList} />
          <Stack.Screen name="PlayerScreen" component={PlayerScreen} />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </ThemeProvider>
    </AudioPlayerProvider>
  );
}
