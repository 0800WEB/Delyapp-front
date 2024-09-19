import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";

type DrawerNavProp = DrawerNavigationProp<RootParamList>;

const SelectSignScreen:React.FC = () => {
  let [fontsLoaded, fontError] = useFonts({
    "Aristotelica Pro Cdn Extralight": require("../../../assets/fonts/Aristotelica-pro-cdn-extralight.otf"),
    "Aristotelica Pro Display Extralight": require("../../../assets/fonts/Aristotelica-pro-display-extralight.otf"),
    "Aristotelica Pro Text Extralight": require("../../../assets/fonts/Aristotelica-pro-text-extralight.otf"),
    "Aristotelica Pro Display Bold": require("../../../assets/fonts/Aristotelica Pro Display Bold.otf"),
    "Aristotelica Pro Display Demibold": require("../../../assets/fonts/Aristotelica Pro Display Demibold.otf"),
    "Aristotelica Pro Display Hairline": require("../../../assets/fonts/Aristotelica Pro Display Hairline.otf"),
    "Aristotelica Pro Display Regular": require("../../../assets/fonts/Aristotelica Pro Display Regular.otf"),
    "Aristotelica Pro Display Thin": require("../../../assets/fonts/Aristotelica Pro Display Thin.otf"),
    "Aristotelica Pro Display Ft": require("../../../assets/fonts/AristotelicaProDisp-Ft.otf"),
    "Aristotelica Pro Display Hv": require("../../../assets/fonts/AristotelicaProDisp-Hv.otf"),
    "Aristotelica Pro Display Lt": require("../../../assets/fonts/AristotelicaProDisp-Lt.otf"),
    ...FontAwesome.font,
  });
  if (!fontsLoaded && !fontError) {
    return null;
  }

  const navigation = useNavigation<DrawerNavProp>();

  const goToAbout = async () => {
    navigation.navigate("(routes)/about/index");
  }

  return (
    <LinearGradient colors={["#000", "#000"]} style={{ flex: 1 }}>
      <View style={styles.imageContainer}>
        <Image
          source={require("@/assets/images/img-05.jpg")}
          style={[styles.fullscreenImage, { opacity: 1 }]}
        />
      </View>
      <View style={[styles.container, { paddingTop: 30 }]}>
        <Image
          source={require("@/assets/images/ICONOS-38.png")}
          style={{ transform: [{ scale: 1 }] }}
        />
        <Image
          source={require("@/assets/images/ICONOS-01.png")}
          style={{ transform: [{ scale: 1 }], top: 0 }}
        />
        <View style={[styles.innerContainer, { top: 0 }]}>
          <TouchableOpacity onPress={() => router.push("/(routes)/sign-up")}>
          <LinearGradient
              colors={["#016AF5", "#08E6E7"]}
              style={{ margin: "auto", borderRadius: 25 }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text
                style={[
                  {
                    fontFamily: "Aristotelica Pro Display Regular",
                    textAlign: "center",
                    color: "white",
                    fontSize: 17,
                    paddingVertical: 20,
                    width: 135,
                  },
                ]}
              >
               REGÍSTRATE
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/(routes)/sign-in")}>
          <LinearGradient
              colors={["#016AF5", "#08E6E7"]}
              style={{ margin: "auto", borderRadius: 25 }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text
                style={[
                  {
                    fontFamily: "Aristotelica Pro Display Regular",
                    textAlign: "center",
                    color: "white",
                    fontSize: 17,
                    paddingVertical: 20,
                    width: 135,
                  },
                ]}
              >
                INGRESA
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity onPress={goToAbout}>
            <View style={styles.buttonWrapper}>
              <Text
                style={[
                  styles.buttonText,
                  {
                    fontFamily: "Aristotelica Pro Display Light",
                    color: "white",
                    fontSize: 15,
                    borderBottomWidth: 0.4,
                    borderColor: "#fff",
                    paddingBottom: 5,
                  },
                ]}
              >
                ACERCA DE
              </Text>
            </View>
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
    gap: 70,
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    position: "absolute",
    width: 200,
    height: 45,
    borderRadius: 60,
  },
});


export default SelectSignScreen;