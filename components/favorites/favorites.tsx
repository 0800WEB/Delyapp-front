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
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

interface Favorites {
  onProductSelected: (productId: string) => void;
}

export default function Favorites({ onProductSelected }: Favorites) {
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
      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={[styles.card]}
          onPress={() => onProductSelected(item._id)}
        >
          <Image
            source={{ uri: item.images[0] }}
            style={[styles.imageStyle, { alignSelf: "center" }]}
          />
          <View style={styles.containerTitle}>
            <Text style={[styles.titleText]}>{item.name.substring(0, 11)}</Text>
          </View>
          <View style={styles.containerTitle}>
            <Text style={[styles.description]}>{item.description}</Text>
          </View>
          <View
            style={{
              backgroundColor: "#000024",
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              alignItems: "center",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text
                style={[
                  styles.titleText,
                  {
                    paddingVertical: 13,
                    fontFamily: "Aristotelica Pro Display Bold",
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
      </View>
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
    height: 150,
    aspectRatio: 1,
    marginBottom: 3,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderColor: "#A1A1A1",
  },
  topText: {
    display: "flex",
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 15,
    fontFamily: "Aristotelica Pro Display Regular",
    borderBottomColor: "#A1A1A1",
    borderBottomWidth: 0.8,
    color: "#A1A1A1",
  },
  containerTitle: {
    justifyContent: "space-between",
    alignItems: "center",
    width: "95%",
    alignSelf: "center",
  },
  categoryText: {
    fontFamily: "Aristotelica Pro Display Regular",
    fontSize: 14,
    color: "#A1A1A1",
  },
  starStyle: {
    width: 14,
    aspectRatio: 1,
    alignSelf: "center",
    marginRight: 5,
  },
  card: {
    maxHeight: "100%",
    height: "100%",
    width: "100%",
    shadowColor: "#A1A1A1",
    justifyContent: "space-between",
  },
  cardContainer: {
    minHeight: 300,
    maxHeight: 350,
    minWidth: 150,
    width: 185,
    marginHorizontal: 8,
    borderColor: "#A1A1A1",
    borderWidth: 0.3,
    borderRadius: 10,
  },
  titleText: {
    fontFamily: "Aristotelica Pro Display Bold",
    fontSize: 17,
    alignSelf: "center",
    textAlign: "center",
    color: "#000024",
  },
  description: {
    fontFamily: "Aristotelica Pro Display Lt",
    fontSize: 17,
    justifyContent: "center",
    color: "#000024",
    marginHorizontal: "auto",
    textAlign: "center",
    paddingVertical: 5,
  },
});
