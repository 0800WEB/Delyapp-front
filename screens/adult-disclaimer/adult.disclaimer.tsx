import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { transform } from "@babel/core";
import React, { useState } from "react";
import { RadioButton } from "react-native-paper";

export default function AdultDisclaimerScreen() {
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
  const [checked, setChecked] = useState<"first" | "second" | "">("");

  if (!fontsLoaded && !fontError) {
    return null;
  }  

  return (
    <LinearGradient
      colors={["#000", "#000"]}
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <View style={styles.imageContainer}>
        <Image
          style={styles.fullscreenImage}
          source={require("@/assets/images/img_01.jpg")}
        />
      </View>
      <View style={styles.centeredContainer}>
        <Image
          style={[{ transform: [{ scale: 0.4 }] }]}
          source={require("@/assets/images/ICONOS-38.png")}
        />
        <Text style={styles.centeredText}>
          <Text
            style={{
              fontFamily: "Geomanist Light",
              color: "#fff",
              fontSize: 11,
            }}
          >
            CHARRO NEGRO
          </Text>
          <Text> </Text>
          <Text
            style={{
              fontFamily: "Geomanist Light",
              color: "#fff",
              fontSize: 15,
            }}
          >
            ofrece productos válidos solo para mayores de 18 años, por esta
            razón es necesario que confirmes tu edad.
          </Text>
        </Text>

        <View
          style={{ flex: 1, marginTop: 40, gap: 2, marginHorizontal: "20%" }}
        >
          <RadioButton.Group
            onValueChange={(newValue: React.SetStateAction<string>) =>
              {setChecked(newValue as "first" | "second" | "");
              if (newValue === 'first') {
                router.push('/welcome-intro');
              }}
            }
            value={checked}
          >
            <View style={styles.radioButton}>
              <RadioButton
                uncheckedColor="white"
                color="black"
                value="first"
                onPress={() => router.push("/welcome-intro")}
              />
              <Text
                style={{
                  fontFamily: "Geomanist Light",
                  color: "#fff",
                  fontSize: 13,
                  textAlign: "left",
                }}
              >
                Sí, tengo 18+ años
              </Text>
            </View>
            <View style={styles.radioButton}>
              <RadioButton
                uncheckedColor="white"
                color="black"
                value="second"
              />
              <Text
                style={{
                  fontFamily: "Geomanist Light",
                  color: "#fff",
                  fontSize: 13,
                  textAlign: "left",
                }}
              >
                No, no cumplo la edad requerida
              </Text>
            </View>
          </RadioButton.Group>
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
  centeredContainer: {
    position: "absolute",
    color: "white",
  },
  radioButton: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  centeredText: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: -20,
    marginHorizontal: "22%",
    textAlign: "center",
  },
  fullscreenContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  fullscreenImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});
