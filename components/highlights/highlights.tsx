import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  FontAwesome,
} from "@expo/vector-icons";
import { useFonts } from "expo-font";
import React, { useState } from "react";
import Popular from "../popular/popular";
import Favorites from "../favorites/favorites";

interface HighlightsProps {
  selectedProductId: (productId: string)=> void;
}

export default function Highlights({selectedProductId}:HighlightsProps) {
  const [popularSelect, setPopularSelect] = useState(true);
  const [favoritesSelect, setFavoritesSelect] = useState(false);
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
  
  

  const handlePopular = () => {
    setPopularSelect(true);
    setFavoritesSelect(false);
  };
  const handleFavorites = () => {
    setPopularSelect(false);
    setFavoritesSelect(true);
  };

  const handleProductSelected = (productId: string) => {
    // console.log(productId);
    selectedProductId(productId);
  }
  return (
    <SafeAreaView style={{marginBottom: 15}}>
      <View style={styles.selectButtons}>
        <TouchableOpacity onPress={handlePopular}>
          {popularSelect ? (          
          <Text style={[styles.text, {color:"#00BFFF"}]}>LO MÁS PEDIDO</Text>
          ) : (
            <Text style={styles.text}>LO MÁS PEDIDO</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={handleFavorites}>
          {favoritesSelect ? (          
          <Text style={[styles.text, {color:"#00BFFF"}]}>TUS FAVORITOS</Text>
          ) : (
            <Text style={styles.text}>TUS FAVORITOS</Text>
          )}
        </TouchableOpacity>
      </View>
      {popularSelect ? <Popular onProductSelected={handleProductSelected} /> : <Favorites onProductSelected={handleProductSelected} />}
    </SafeAreaView>
  );
}

export const styles = StyleSheet.create({
  selectButtons: {
    flexDirection: "row",
    marginLeft: 15,
    gap: 15,
  },
  imageStyle: {
    height: 145,
    aspectRatio: 1,
    marginHorizontal: 5,
    marginVertical: 10,
    borderRadius: 15,
    borderWidth: 0.15,
    borderColor: "#A1A1A1",
  },
  text: {
    display: "flex",
    paddingTop: 18,
    paddingBottom: 18, 
    fontFamily: "Geomanist Regular",
    color: "#A1A1A1",
    fontSize: 16,
  },
});
