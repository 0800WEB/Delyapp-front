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
        <View style={[styles.imageContainer, { top: -70 }]}>
          <Image
            source={require("@/assets/images/ICONOS-38.png")}
            style={{ transform: [{ scale: 0.48 }] }}
          />
          <Image
            source={require("@/assets/images/ICONOS-01.png")}
            style={{ transform: [{ scale: 0.45 }], top: -35 }}
          />
          <View style={[styles.container, { top: -50 }]}>
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
    gap: 150,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  buttonText: {
    color: "black",
    textAlign: "center",
  },
  welcomeButtonStyle: {
    flex: 1,
    backgroundColor: "transparent",
    width: "25%",
    alignSelf: "flex-end",
    borderRadius: 5,
    bottom: 28,
  },
  dotStyle: {
    display: "flex",
    justifyContent: "flex-end",
    alignContent: "flex-end",
    alignItems: "flex-end",
    backgroundColor: "transparent",
    left: responsiveWidth(-35),
    width: 10,
    height: 10,
    borderRadius: 5,
    borderColor: "white",
    borderWidth: 1,
    bottom: -5,
  },
  activeDotStyle: {
    display: "flex",
    justifyContent: "flex-end",
    alignContent: "flex-end",
    alignItems: "flex-end",
    backgroundColor: "white",
    left: responsiveWidth(-35),
    width: 10,
    height: 10,
    borderRadius: 5,
    bottom: -5,
  },
  fullscreenImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  buttonWrapper: {
    backgroundColor: "white",
    width: "40%",
    height: 45,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    bottom: 28,
  },
});
