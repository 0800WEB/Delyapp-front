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
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { transform } from "@babel/core";
import React, { useState } from "react";
import { welcomeIntroSwipperData } from "@/constants/constants";
import AppIntroSlider from "react-native-app-intro-slider";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import DateTimePicker from "@react-native-community/datetimepicker";
import { CheckBox } from "react-native-elements";

export default function Header() {
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
  return (
    <View>
      <View style={styles.headerStyle}>
        <TouchableOpacity>
          <SimpleLineIcons name="menu" size={24} color="#A1A1A1" style={{alignSelf: "center"}} />
        </TouchableOpacity>
        <Text style={styles.userText}>Nombre de Usuario</Text>
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
});
