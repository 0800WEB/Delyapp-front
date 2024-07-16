import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
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

export default function SelectSignScreen() {
  let [fontsLoaded, fontError] = useFonts({
    "Cherione Bold": require("../../../assets/fonts/Cherione Bold.ttf"),
    "Cherione Normal": require("../../../assets/fonts/Cherione Normal.ttf"),
    "Cherione Light": require("../../../assets/fonts/Cherione Light.ttf"),
    "Cherione Regular": require("../../../assets/fonts/Cherione.otf"),
    "Geomanist Regular": require("../../../assets/fonts/Geomanist-Regular.otf"),
    "Geomanist Bold": require("../../../assets/fonts/Geomanist-Bold.otf"),
    "Geomanist Light": require("../../../assets/fonts/Geomanist-Light.otf"),
    "Geomanist Medium": require("../../../assets/fonts/Geomanist-Medium.otf"),
    "Geomanist Thin": require("../../../assets/fonts/Geomanist-Thin.otf"),
    "Geomanist ExtraLight": require("../../../assets/fonts/Geomanist-ExtraLight.otf"),
    "Geomanist Ultra": require("../../../assets/fonts/Geomanist-Ultra.otf"),
    ...FontAwesome.font,
  });
  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <LinearGradient colors={["#000", "#000"]} style={{ flex: 1 }}>
      <View style={styles.imageContainer}>
        <Image
          source={require("@/assets/images/img-05.jpg")}
          style={[styles.fullscreenImage, { opacity: 0.6 }]}
        />
      </View>
      <View style={[styles.container]}>
        <Image
          source={require("@/assets/images/ICONOS-38.png")}
          style={{ transform: [{ scale: 0.48 }] }}
        />
        <Image
          source={require("@/assets/images/ICONOS-01.png")}
          style={{ transform: [{ scale: 0.45 }], top: 0 }}
        />
        <View style={[styles.innerContainer, { top: 0 }]}>
          <TouchableOpacity
            style={[styles.buttonWrapper]}
            onPress={() => router.push("/(routes)/sign-up")}
          >
            <Text
              style={[
                styles.buttonText,
                { fontFamily: "Cherione Bold", fontSize: 19 },
              ]}
            >
              REGÍSTRATE
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonWrapper]}
            onPress={() => router.push("/(routes)/sign-in")}
          >
            <Text
              style={[
                styles.buttonText,
                { fontFamily: "Cherione Bold", fontSize: 19 },
              ]}
            >
              INGRESA
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

export const styles = StyleSheet.create({
  imageContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  container: {
    display: "flex",
    margin: "auto",
    gap: 5,
    alignItems: "center",
    width: "80%",
    height: "90%",
  },
  innerContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "30%",
  },
  buttonText: {
    color: "black",
    textAlign: "center",
  },
  fullscreenImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  buttonWrapper: {
    backgroundColor: "white",
    width: "45%",
    height: 45,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    bottom: 28,
  },
});
