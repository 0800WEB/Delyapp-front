import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { transform } from "@babel/core";
import React, { useState } from "react";
import { RadioButton } from "react-native-paper";

const isIOS = Platform.OS === "ios";

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
  const [selectedOption, setSelectedOption] = useState<"first" | "second" | "">(
    ""
  );
  const handleOptionChange = (option: "first" | "second") => {
    setSelectedOption(option);
    if (option === "first") {
      router.push("/welcome-intro");
    }
  };

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
          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => handleOptionChange("first")}
          >
            <View
              style={[
                styles.radioCircle,
                selectedOption === "first" && styles.selectedRadioCircle,
              ]}
            />
            <Text
              style={{
                fontFamily: "Geomanist Light",
                color: "#fff",
                fontSize: 14,
                textAlign: "left",
                marginLeft: 10,
              }}
            >
              Sí, tengo 18+ años
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => handleOptionChange("second")}
          >
            <View
              style={[
                styles.radioCircle,
                selectedOption === "second" && styles.selectedRadioCircle,
              ]}
            />
            <Text
              style={{
                fontFamily: "Geomanist Light",
                color: "#fff",
                fontSize: 14,
                textAlign: "left",
                marginLeft: 10,
              }}
            >
              No, no cumplo la edad requerida
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
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedRadioCircle: {
    backgroundColor: "white",
  },
});
