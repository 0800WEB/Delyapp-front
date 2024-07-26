import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  VirtualizedList,
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
import { categorySliderData } from "@/constants/constants";
import Popular from "../popular/popular";
import Favorites from "../favorites/favorites";

export default function Highlights() {
  const [popularSelect, setPopularSelect] = useState(true);
  const [favoritesSelect, setFavoritesSelect] = useState(false);
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
  const handlePopular = () => {
    setPopularSelect(true);
    setFavoritesSelect(false);
  };
  const handleFavorites = () => {
    setPopularSelect(false);
    setFavoritesSelect(true);
  };
  return (
    <SafeAreaView>
      <View style={styles.selectButtons}>
        <TouchableOpacity onPress={handlePopular}>
          <Text style={styles.text}>LO MÁS PEDIDO</Text>
          {popularSelect && (
            <View
              style={{ borderBottomWidth: 2, borderBottomColor: "#A1A1A1" , opacity: 0.5}}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={handleFavorites}>
          <Text style={styles.text}>TUS FAVORITOS</Text>
          {favoritesSelect && (
            <View
              style={{ borderBottomWidth: 2, borderBottomColor: "#A1A1A1", opacity: 0.5 }}
            />
          )}
        </TouchableOpacity>
      </View>
      {popularSelect ? <Popular /> : <Favorites />}
    </SafeAreaView>
  );
}

export const styles = StyleSheet.create({
  selectButtons: {
    flexDirection: "row",
    marginLeft: 15,
    gap: 15,
  },
  imageStyle: {
    height: 145,
    aspectRatio: 1,
    marginHorizontal: 5,
    marginVertical: 10,
    borderRadius: 15,
    borderWidth: 0.15,
    borderColor: "#A1A1A1",
  },
  text: {
    display: "flex",
    paddingTop: 8,
    paddingBottom: 4,
    fontFamily: "Geomanist Regular",
    color: "#A1A1A1",
  },
});
