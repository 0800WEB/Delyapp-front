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
                    fontFamily: "Geomanist Regular",
                    textAlign: "center",
                    color: "white",
                    fontSize: 19,
                    paddingVertical: 3,
                    paddingHorizontal: 20,
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
                    fontFamily: "Geomanist Regular",
                    textAlign: "center",
                    color: "white",
                    fontSize: 19,
                    paddingVertical: 3,
                    paddingHorizontal: 35,
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
                    fontFamily: "Geomanist Regular",
                    color: "white",
                    fontSize: 17,
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