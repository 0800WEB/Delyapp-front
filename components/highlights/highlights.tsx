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
    fontFamily: "Aristotelica Pro Display Regular",
    color: "#A1A1A1",
    fontSize: 16,
  },
});
