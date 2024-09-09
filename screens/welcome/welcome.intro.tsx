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

export default function WelcomeIntroScreen() {
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

  const renderItem = ({ item }: { item: welcomeSwipperDataType }) => {
    return (
      <LinearGradient colors={["#000", "#000"]} style={{ flex: 1 }}>
        <View style={styles.imageContainer}>
          <Image source={item.image1} style={[styles.imageContainer, { overlayColor: 'rgba(0, 0, 0, 0.9)' }]} />
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              position: "absolute",
              width: "90%",
              height: "80%",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {item.image2 && <Image
              source={item.image2}
              style={[
                {
                  transform: [{ scale: 1 }],
                  top: item.top,
                  right: item.right,
                },
              ]}
            />}
            <Image
              source={item.image3}
              style={[
                {
                  transform: [{ scale: 1 }],
                  position: "absolute",
                  bottom: item.bottom,
                },
              ]}
            />
          </View>
        </View>
      </LinearGradient>
    );
  };

  return (
    <AppIntroSlider
      renderItem={renderItem}
      data={welcomeIntroSwipperData}
      onDone={() => router.push("/(routes)/select-sign")}
      onSkip={() => router.push("/(routes)/select-sign")}
      showNextButton={false}
      renderDoneButton={() => (
        <View style={styles.welcomeButtonStyle}>
          <Text
            style={[
              styles.buttonText,
              { fontFamily: "Geomanist Regular", fontSize: 16 },
            ]}
          >
            SALTAR
          </Text>
        </View>
      )}
      showSkipButton={true}
      renderSkipButton={() => (
        <View style={styles.welcomeButtonStyle}>
          <Text
            style={[
              styles.buttonText,
              { fontFamily: "Geomanist Regular", fontSize: 16 },
            ]}
          >
            SALTAR
          </Text>
        </View>
      )}
      dotStyle={styles.dotStyle}
      bottomButton={true}
      activeDotStyle={styles.activeDotStyle}
    />
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
  buttonText: {
    color: "white",
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
});
