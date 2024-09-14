import { View, Text, Image, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { useFonts } from "expo-font";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";

const isIOS = Platform.OS === 'ios';

export default function AdultDisclaimerScreen() {
  let [fontsLoaded, fontError] = useFonts({
    "Aristotelica Pro Cdn Extralight": require("../../assets/fonts/Aristotelica-pro-cdn-extralight.otf"),
    "Aristotelica Pro Display Extralight": require("../../assets/fonts/Aristotelica-pro-display-extralight.otf"),
    "Aristotelica Pro Text Extralight": require("../../assets/fonts/Aristotelica-pro-text-extralight.otf"),
    "Aristotelica Pro Display Bold": require("../../assets/fonts/Aristotelica Pro Display Bold.otf"),
    "Aristotelica Pro Display Demibold": require("../../assets/fonts/Aristotelica Pro Display Demibold.otf"),
    "Aristotelica Pro Display Hairline": require("../../assets/fonts/Aristotelica Pro Display Hairline.otf"),
    "Aristotelica Pro Display Regular": require("../../assets/fonts/Aristotelica Pro Display Regular.otf"),
    "Aristotelica Pro Display Thin": require("../../assets/fonts/Aristotelica Pro Display Thin.otf"),
    "Aristotelica Pro Display Ft": require("../../assets/fonts/AristotelicaProDisp-Ft.otf"),
    "Aristotelica Pro Display Hv": require("../../assets/fonts/AristotelicaProDisp-Hv.otf"),
    "Aristotelica Pro Display Lt": require("../../assets/fonts/AristotelicaProDisp-Lt.otf"),
    ...FontAwesome.font,
  });
  
  const [selectedOption, setSelectedOption] = useState<"first" | "second" | "">("");

  if (!fontsLoaded && !fontError) {
    return null;
  }  

  const handleOptionChange = (option: "first" | "second") => {
    setSelectedOption(option);
    if (option === "first") {
      router.push("/welcome-intro");
    }
  };

  return (
    <LinearGradient
      colors={["#000026", "#000026"]}
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
          style={[{ transform: [{ scale: 1}], alignSelf: "center", marginBottom: 30 }]}
          source={require("@/assets/images/ICONOS-38.png")}
        />
        <Text style={styles.centeredText}>
          <Text
            style={{
              fontFamily: "Aristotelica Pro Display Regular",
              color: "#fff",
              fontSize: 14,
            }}
          >
            DRINGO
          </Text>
          <Text> </Text>
          <Text
            style={{
              fontFamily: "Aristotelica Pro Display Extralight",
              color: "#fff",
              fontSize: 15,
              lineHeight: 20,
              textAlign: "center"
            }}
          >
            ofrece productos válidos solo para mayores de 18 años, por esta
            razón es necesario que confirmes tu edad.
          </Text>
        </Text>

        <View
          style={{ flex: 1, marginTop: 20, gap: 2, marginHorizontal: "20%" }}
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
                fontFamily: "Aristotelica Pro Display Extralight",
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
                fontFamily: "Aristotelica Pro Display Extralight",
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

const styles = StyleSheet.create({
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
    paddingVertical: 10,
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
  centeredText: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: "15%",
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
