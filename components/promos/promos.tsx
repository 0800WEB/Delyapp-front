import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
  VirtualizedList,
  Dimensions,
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
import React, { useState, useEffect } from "react";
import AppIntroSlider from "react-native-app-intro-slider";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { categorySliderData } from "@/constants/constants";
import axios from "axios";
import { promoSliderData } from "../../constants/constants";
import Swiper from "react-native-swiper";

export default function Promos() {
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
    <View style={{ height: 200 }}>
      <Swiper autoplay autoplayTimeout={3} dot={<View style={styles.dot} />} activeDot={<View style={styles.activeDot} />}>
        {promoSliderData && promoSliderData?.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={{ width: "95%", marginHorizontal: "auto", marginTop: 15 }}
          >
            <Image source={item?.image} style={styles.imageStyle}  />
          </TouchableOpacity>
        ))}
      </Swiper>
    </View>
  );
}

export const styles = StyleSheet.create({
  imageStyle: {
    height: 130,
    width: "100%",
    objectFit: "contain",
    borderRadius: 15,
  },
  dot: {
    backgroundColor: "white",
    width: 10,
    aspectRatio: 1,
    borderRadius: 5,
    borderWidth: 0.6,
    borderColor: "#A1A1A1",
    marginLeft: 3,
    marginRight: 3,
    marginTop: -12,
    marginBottom: 3,
  },
  activeDot: {
    backgroundColor: "#A1A1A1",
    width: 10,
    aspectRatio: 1,
    borderRadius: 5,
    borderWidth: 0.6,
    borderColor: "#A1A1A1",
    marginLeft: 3,
    marginRight: 3,
    marginTop: -12,
    marginBottom: 3,
  },
});
