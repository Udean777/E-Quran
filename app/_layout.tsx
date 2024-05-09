import FontAwesome from "@expo/vector-icons/FontAwesome";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const queryClient = new QueryClient();

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "monserrat-regular": require("@/assets/fonts/Montserrat-Regular.ttf"),
    "monserrat-medium": require("@/assets/fonts/Montserrat-Medium.ttf"),
    "monserrat-semiBold": require("@/assets/fonts/Montserrat-SemiBold.ttf"),
    "monserrat-bold": require("@/assets/fonts/Montserrat-Bold.ttf"),
    "monserrat-extraBold": require("@/assets/fonts/Montserrat-ExtraBold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return <RootLayoutNav onLayoutRootView={onLayoutRootView} />;
}

function RootLayoutNav({ onLayoutRootView }: { onLayoutRootView: any }) {
  return (
    <GestureHandlerRootView
      style={{ flex: 1 }}
      onLayout={onLayoutRootView}>
      <SafeAreaView style={{ flex: 1 }}>
        <QueryClientProvider client={queryClient}>
          <Stack>
            <Stack.Screen
              name="index"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="screens/[detail]"
              options={{ headerShown: false }}
            />
          </Stack>
        </QueryClientProvider>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
