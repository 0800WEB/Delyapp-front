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
    height: 145,
    aspectRatio: 1,
    marginHorizontal: 5,
    marginVertical: 10,
  },
  topText: {
    display: "flex",
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 15,
    fontFamily: "Geomanist Regular",
    borderBottomColor: "#A1A1A1",
    borderBottomWidth: 0.8,
    color: "#000024",
    backgroundColor: "white"
  },
});
