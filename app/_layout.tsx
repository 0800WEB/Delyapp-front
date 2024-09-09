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
import * as Notifications from 'expo-notifications';

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
import SearchScreen from "@/screens/searchScreen/search.screen";
import About from "./(routes)/about";
import { StripeProvider } from '@stripe/stripe-react-native'

SplashScreen.preventAutoHideAsync();

let persistor = persistStore(store);
const Stack = createStackNavigator<RootStackParamList>();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


async function requestPermissions() {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    alert('No notification permissions!');
    return false;
  }
  return true;
}

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

  useEffect(() => {
    // Solicita permisos de notificación cuando la aplicación se inicia
    requestPermissions();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <StripeProvider publishableKey="pk_test_51P8jwTDxD4xxO9b9NbsFppYu1psFaGm8OLe5PlIrE8tiPVUbOOt6XZW7ofdmAh2RGBcbWI4zKd533NW25o8ijDLa00XzNkREIW">
        <PersistGate loading={null} persistor={persistor}>
          <ToastProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <RootLayoutNav />
            </GestureHandlerRootView>
          </ToastProvider>
        </PersistGate>
      </StripeProvider>
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
      <Stack.Screen name="(routes)/search/index" component={SearchScreen} />
      <Stack.Screen name="(routes)/about/index" component={About} />
    </Stack.Navigator>
  );
}

