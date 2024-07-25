import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { Stack } from "expo-router";
import { ToastProvider } from "react-native-toast-notifications";
import { LogBox } from "react-native";

export { ErrorBoundary } from "expo-router";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { Provider } from "react-redux";
import { store } from "@/store/store";

SplashScreen.preventAutoHideAsync();

let persistor = persistStore(store);

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  useEffect(() => {
    LogBox.ignoreAllLogs(true);
    // console.log("Store: ",store.getState());
  }, []);
 

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootLayoutNav />
      </PersistGate>
    </Provider>
  );
}

function RootLayoutNav() {
  return (
    <ToastProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(routes)/adult-disclaimer/index" />
        <Stack.Screen name="(routes)/welcome-intro/index" />
        <Stack.Screen name="(routes)/select-sign/index" />
        <Stack.Screen name="(routes)/sign-in/index" />
        <Stack.Screen name="(routes)/sign-up/index" />
        <Stack.Screen name="(routes)/verify-account/index" />
        <Stack.Screen name="(routes)/home/index" />
        <Stack.Screen name="(routes)/search/index" />
      </Stack>
    </ToastProvider>
  );
}
