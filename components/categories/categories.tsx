import {
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  VirtualizedList,
} from "react-native";
import {
  FontAwesome,
} from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { router } from "expo-router";
import React, { useState, useEffect } from "react";
import { categorySliderData } from "@/constants/constants";
import axios from "axios";

interface CategoriesProps {
  onItemSelected: (title: string) => void;
  resetSelectedTitle: boolean;
}

export default function Categories({ onItemSelected, resetSelectedTitle }: CategoriesProps) {
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

  const [selectedTitle, setSelectedTitle] = useState('');

  useEffect(()=> {
    if(resetSelectedTitle) {
      setSelectedTitle('');
    }
  }, [resetSelectedTitle])

  const getItem = (data: categorySliderDataType[], index: number) =>
    data[index];

  const getItemCount = (data: categorySliderDataType[]) => data.length;

  const keyExtractor = (item: categorySliderDataType) => item.id.toString();

  const renderItem = ({ item }: { item: categorySliderDataType }) => {
    return (
      <TouchableOpacity onPress={() =>{
        onItemSelected(item.title);
        setSelectedTitle(item.title);
      }}>
        <Image source={item.title === selectedTitle ? item.image2 : item.image} style={styles.imageStyle} />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView>
      <Text style={styles.topText}>PRODUCTOS</Text>      
      <VirtualizedList
        data={categorySliderData}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        getItemCount={getItemCount}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToAlignment={"center"}
        decelerationRate={"fast"}
        getItem={getItem}
      />
    </SafeAreaView>
  );
}

export const styles = StyleSheet.create({
  imageStyle: {
    height: 93,
    width: "auto",
    aspectRatio: 1,
    marginHorizontal: 5,
    marginVertical: 10,
    resizeMode:"contain"
  },
  topText: {
    display: "flex",
    paddingTop: 13,
    paddingBottom: 13,
    paddingLeft: 15,
    fontFamily: "Aristotelica Pro Display Regular",
    borderBottomColor: "#A1A1A1",
    borderBottomWidth: 0.8,
    color: "#000024",
    backgroundColor: "white"
  },
});
