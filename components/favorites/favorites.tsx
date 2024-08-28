import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  VirtualizedList,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

interface Favorites{
  onProductSelected: (productId: string)=> void
}

export default function Favorites({onProductSelected}:Favorites) {
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
  const favoriteItems = useSelector(
    (state: RootState) => state.favorite.favorites.products
  );

  

  const getItem = (favoriteItems: Product[], index: number) =>
    favoriteItems[index];

  const getItemCount = (favoriteItems: Product[]) =>
    favoriteItems ? favoriteItems.length : 0;

  const keyExtractor = (favoriteItems: Product) => favoriteItems._id.toString();

  const renderItem = ({ item }: { item: Product }) => {
    return (
      <TouchableOpacity style={{ marginHorizontal: 2, width: 150 }} onPress={()=>onProductSelected(item._id)}>
        <Image
          source={require("@/assets/images/ICONOS-47.png")}
          style={[
            styles.imageStyle,
            { alignSelf: "center", backgroundColor: "#A1A1A1" },
          ]}
        />
        <View style={styles.containerTitle}>
          <Text style={styles.titleText}>{item.name.substring(0, 11)}</Text>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={require("@/assets/images/ICONOS-12.png")}
              style={styles.starStyle}
            />
          </View>
        </View>
        <View style={styles.containerTitle}>
          <Text
            style={[
              styles.titleText,
              {
                fontFamily: "Cherione Regular",
                fontSize: 10.5,
                alignSelf: "center",
              },
            ]}
          >
            {item.description.substring(0, 11)}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={[styles.titleText]}>${item.price}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <VirtualizedList
        data={favoriteItems}
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
    height: 130,
    aspectRatio: 1,
    marginHorizontal: 5,
    marginTop: 10,
    marginBottom: 5,
    borderRadius: 15,
    borderWidth: 0.15,
    borderColor: "#A1A1A1",
  },
  topText: {
    display: "flex",
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 15,
    fontFamily: "Geomanist Regular",
    borderBottomColor: "#A1A1A1",
    borderBottomWidth: 0.8,
    color: "#A1A1A1",
  },
  containerTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 130,
    alignSelf: "center",
  },
  categoryText: {
    fontFamily: "Geomanist Medium",
    fontSize: 14,
    color: "#A1A1A1",
  },
  starStyle: {
    width: 14,
    aspectRatio: 1,
    alignSelf: "center",
    marginRight: 5,
  },
  titleText: {
    fontFamily: "Geomanist Medium",
    fontSize: 14,
    color: "#A1A1A1",
  },
});
