import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
// import { Stack } from "expo-router";
// import { Drawer } from "expo-router/drawer";
import { ToastProvider } from "react-native-toast-notifications";
import { LogBox } from "react-native";

export { ErrorBoundary } from "expo-router";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { Provider } from "react-redux";
import store from "@/store/store";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";


import Start from "./(routes)/start";
import AdultDisclaimer from "./(routes)/adult-disclaimer";
import WelcomeIntro from "./(routes)/welcome-intro";
import SelectSign from "./(routes)/select-sign";
import SignIn from "./(routes)/sign-in";
import SignUp from "./(routes)/sign-up";
import VerifyAccount from "./(routes)/verify-account";
import Home from "./(routes)/home";
import DrawerLayoutNav from "./(routes)/drawer";
import UpdateAccount from "./(routes)/update-account";
import MapScreen from "@/screens/map-address/map.screen";
import Order from "./(routes)/order";

SplashScreen.preventAutoHideAsync();

let persistor = persistStore(store);
const Stack = createStackNavigator<RootStackParamList>();


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
        <ToastProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
              <RootLayoutNav />
          </GestureHandlerRootView>
        </ToastProvider>
      </PersistGate>
    </Provider>
  );
}



function RootLayoutNav() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="(routes)/start/index" component={Start} />
      <Stack.Screen name="(routes)/adult-disclaimer/index" component={AdultDisclaimer} />
      <Stack.Screen name="(routes)/welcome-intro/index" component={WelcomeIntro} />
      <Stack.Screen name="(routes)/select-sign/index" component={SelectSign} />
      <Stack.Screen name="(routes)/sign-in/index" component={SignIn} />
      <Stack.Screen name="(routes)/sign-up/index" component={SignUp} />
      <Stack.Screen name="(routes)/verify-account/index" component={VerifyAccount} />
      {/* <Stack.Screen name="(routes)/home/index" component={Home} /> */}
      <Stack.Screen name="(routes)/drawer/index" component={DrawerLayoutNav}  />
      <Stack.Screen name="(routes)/update-account/index" component={UpdateAccount}  />
      <Stack.Screen name="(routes)/map/index" component={MapScreen}  />
      <Stack.Screen name="(routes)/order/index" component={Order}  />
    </Stack.Navigator>
  );
}

