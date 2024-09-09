import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { router } from "expo-router";
import React, { useState } from "react";
import { get_SearchItem } from "@/store/products/productsActions";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";

export default function SearchInput({ homeScreen }: { homeScreen?: boolean }) {
  const [value, setValue] = useState("");
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
              { fontFamily: "Geomanist Regular", marginLeft: 5 },
            ]}
            placeholder="Buscar Producto"
            value={value}
            onChangeText={(text) => setValue(text)}
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
    fontFamily: "Geomanist Regular",
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
    color: "#A1A1A1",
    paddingVertical: 0,
    width: "90%",
    height: 30,
  },
});
