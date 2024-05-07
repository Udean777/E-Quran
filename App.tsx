/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { Platform, SafeAreaView, StatusBar } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { PaperProvider } from 'react-native-paper';
import SplashScreen from 'react-native-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
const queryClient = new QueryClient();

function App(): React.JSX.Element {

  useEffect(() => {
    if (Platform.OS === "android") {
      SplashScreen.hide()
    }
  }, [])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaView style={{ flex: 1 }}>
          <NavigationContainer>
            <PaperProvider>
              <StatusBar animated barStyle={"dark-content"} backgroundColor={"#fff"} />
              <AppNavigator />
            </PaperProvider>
          </NavigationContainer>
        </SafeAreaView>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}

export default App;
