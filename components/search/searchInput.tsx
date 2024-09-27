import { View, StyleSheet, TextInput, TouchableOpacity, Platform } from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { router } from "expo-router";
import React, { useState } from "react";
import { get_SearchItem } from "@/store/products/productsActions";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";

export default function SearchInput({ homeScreen }: { homeScreen?: boolean }) {

  const isIOS = Platform.OS === 'ios';

  const [value, setValue] = useState("");
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
  if (!fontsLoaded && !fontError) {
    return null;
  }
  const dispatch = useDispatch<AppDispatch>();

  const handleSearch = async () => {
    if (value.trim() === "") {
      alert("Por favor, introduce un producto para su búsqueda.");
      return;
    }
    router.push("/(routes)/search");
    dispatch(get_SearchItem(value));
  };

  return (
    <View>
      {!homeScreen && (
        <View style={{ marginTop: 25 }}>
          <View
            style={{
              marginTop: 25,
              backgroundColor: "#000024",
              height: 10,
              width: "100%",
            }}
          ></View>
        </View>
      )}
      <View style={styles.filteringContainer}>
        <View style={styles.searchContainer}>
          <TextInput
            style={[
              styles.input,
              { fontFamily: "Aristotelica Pro Display Regular", marginLeft: 5 },
            ]}
            placeholder="Buscar Producto"
            value={value}
            onChangeText={(text) => setValue(text)}
            placeholderTextColor={"#999"}
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity
            style={styles.searchIconContainer}
            onPress={handleSearch}
          >
            <AntDesign name="search1" size={18} color="#A1A1A1" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  filteringContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 10,
    backgroundColor: "#000024",
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    fontFamily: "Aristotelica Pro Display Regular",
    borderRadius: 50,
    height: 40,
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
    color: "#000024",
    paddingVertical: 0,
    width: "90%",
    height: 30,
  },
});