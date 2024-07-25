import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
  Platform,
  DrawerLayoutAndroid,
} from "react-native";
import {
  AntDesign,
  Entypo,
  FontAwesome,
  Fontisto,
  Ionicons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import { _retrieveData } from "@/utils/util";
import { UserInfo } from '../../store/user/userReducer';
import { RootState } from "@/store/store";

export default function Header() {
  let [userData, setUserData] = useState<UserData | string | null | undefined>(
    null
  );
  const drawer = useRef<DrawerLayoutAndroid>(null);
  const [drawerPosition, setDrawerPosition] = useState<"left" | "right">(
    "left"
  );
  // let [userData, setUserData] = useState(null);
  let [fontsLoaded, fontError] = useFonts({
    "Cherione Bold": require("../../assets/fonts/Cherione Bold.ttf"),
    "Cherione Normal": require("../../assets/fonts/Cherione Normal.ttf"),
    "Cherione Light": require("../../assets/fonts/Cherione Light.ttf"),
    "Cherione Regular": require("../../assets/fonts/Cherione.otf"),
    "Geomanist Regular": require("../../assets/fonts/Geomanist-Regular.otf"),
    "Geomanist Bold": require("../../assets/fonts/Geomanist-Bold.otf"),
    "Geomanist Light": require("../../assets/fonts/Geomanist-Light.otf"),
    "Geomanist Medium": require("../../assets/fonts/Geomanist-Medium.otf"),
    "Geomanist Thin": require("../../assets/fonts/Geomanist-Thin.otf"),
    "Geomanist ExtraLight": require("../../assets/fonts/Geomanist-ExtraLight.otf"),
    "Geomanist Ultra": require("../../assets/fonts/Geomanist-Ultra.otf"),
    ...FontAwesome.font,
  });
  if (!fontsLoaded && !fontError) {
    return null;
  }
  const userInfo = useSelector((state: RootState) => state.userInfo);
  
  useEffect(() => {
    if (userInfo) {
      setUserData(userInfo);
    }
  }, [userInfo]); 
 
  
  

  const clearToken = async () => {
    await AsyncStorage.removeItem("userToken");
    await AsyncStorage.removeItem("userInfo");
    // const toKEN = await AsyncStorage.getItem("userToken");
  };

  return (
    <View>
      <View style={styles.headerStyle}>
        <TouchableOpacity onPress={clearToken}>
          <SimpleLineIcons
            name="menu"
            size={24}
            color="#A1A1A1"
            style={{ alignSelf: "center" }}
          />
        </TouchableOpacity>
        {typeof userData === "object" && (
          <Text style={styles.userText}>{userData?.name}</Text>
        )}
        <Image
          source={require("@/assets/images/ICONOS-01.png")}
          style={styles.profilePhoto}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    flexDirection: "row",
    paddingVertical: "2.5%",
    // marginTop: 5,
    marginHorizontal: 15,
    justifyContent: "space-between",
  },
  userText: {
    fontFamily: "Cherione Regular",
    fontSize: 18,
    color: "#A1A1A1",
    alignSelf: "center",
  },
  profilePhoto: {
    height: 30,
    width: 30,
    backgroundColor: "#A1A1A1",
    borderRadius: 30,
    alignSelf: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  navigationContainer: {
    backgroundColor: "#ecf0f1",
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: "center",
  },
});
