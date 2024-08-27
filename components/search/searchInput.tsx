import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
  Platform,
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


export default function SearchInput({ homeScreen }: { homeScreen?: boolean }) {
  const [value, setValue] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
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
    <View>
      {!homeScreen && <View style={{ marginTop: 50 }}></View>}
      <View style={styles.filteringContainer}>
        <View style={styles.searchContainer}>
          <TextInput
            style={[
              styles.input,
              { fontFamily: "Geomanist Regular", marginLeft: 5 },
            ]}
            placeholder="Buscar Producto"
            value={value}
            onChangeText={(text) => setValue(text)}
          />
          <TouchableOpacity
            style={styles.searchIconContainer}
            onPress={() => router.push("/(routes)/search")}
          >
            <AntDesign name="search1" size={20} color="#A1A1A1" />
          </TouchableOpacity>
        </View>
      </View>
      {!homeScreen && (
        <>
          <Text
            style={{
              textAlign: "center",
              alignItems: "center",
              paddingTop: 50,
              fontSize: 20,
              color: "#A1A1A1",
              fontFamily: "Geomanist Medium",
            }}
          >No hay productos para mostrar...</Text>
        </>
      )}
    </View>
  );
}

export const styles = StyleSheet.create({
  filteringContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginBottom: 5,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    fontFamily: "Geomanist Regular",
    borderRadius: 15,
    height: 45,
    paddingHorizontal: 10,
    color: "#A1A1A1",
    borderColor: "#A1A1A1",
    borderWidth: 0.8,
  },
  searchIconContainer: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },

  input: {
    flex: 1,
    fontSize: 16,
    color: "#A1A1A1",
    paddingVertical: 0,
    width: "90%",
    height: 30,
  },
});
