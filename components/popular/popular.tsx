import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  VirtualizedList,
} from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

interface Popular {
  onProductSelected: (productId: string) => void;
}

export default function Popular({ onProductSelected }: Popular) {
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
  const topOrderedProducts = useSelector(
    (state: RootState) => state.products.topOrderedProducts
  );

  const getItem = (topOrderedProducts: Product[], index: number) =>
    topOrderedProducts[index];

  const getItemCount = (topOrderedProducts: Product[]) =>
    topOrderedProducts ? topOrderedProducts.length : 0;

  const keyExtractor = (topOrderedProducts: Product) => topOrderedProducts._id;

  const renderItem = ({ item }: { item: Product }) => {
    return (
      <TouchableOpacity
        style={{
          marginHorizontal: 5,
          height: 280,
          width: 130,
          borderColor: "#A1A1A1",
          borderWidth: 0.3,
          borderRadius: 15,
          shadowColor: "#A1A1A1",
          justifyContent: "space-between",
        }}
        onPress={() => onProductSelected(item.productId)}
      >
          <Image
            source={{ uri: item.images[0] }}
            style={[styles.imageStyle, { alignSelf: "center" }]}
          />
          
        <View style={styles.containerTitle}>
          <Text
            style={[
              styles.titleText,
              {
                fontFamily: "Geomanist Medium",
                fontSize: 17,
                alignSelf: "center",
                color: "#000024",
                textAlign: "center",
              },
            ]}
          >
            {item.name.substring(0, 20)}
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={[
              styles.titleText,
              {
                fontFamily: "Geomanist Regular",
                fontSize: 17,
                justifyContent: "center",
                color: "#000024",
                marginHorizontal: "auto",
                textAlign: "center",
                paddingVertical: 5,
              },
            ]}
          >
            {item.description.substring(0, 20)}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#000024",
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text
              style={[
                styles.titleText,
                {
                  paddingVertical: 13,
                  fontFamily: "Geomanist Medium",
                  color: "white",
                  fontSize: 15,
                },
              ]}
            >
              ${item.price} MXN
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <VirtualizedList
        data={topOrderedProducts}
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
    justifyContent: "space-between",
    alignItems: "center",
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
