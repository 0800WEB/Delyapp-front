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

interface AllCategoryProductsProps {
  category: Category;
  products: Product[];
  onProductSelected: (productId: string) => void;
  homeScreen: boolean;
}

const AllCategoryProducts: React.FC<AllCategoryProductsProps> = ({
  category,
  products,
  onProductSelected,
  homeScreen,
}) => {
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
  const getItem = (data: any[], index: number) => data[index];
  const getItemCount = (data: any[]) => (data ? data.length : 0);
  const keyExtractor = (data: any) => data._id.toString();

  const renderItem = ({ item }: { item: any }) => {
    return (
      <View>
        <TouchableOpacity
          style={{ marginHorizontal: 5, width: 150 }}
          onPress={() => onProductSelected(item._id)}
        >
          <Image
            source={{ uri: item.images[0] }}
            style={[
              styles.imageStyle,
              { alignSelf: "center" },
            ]}
          />
          <View style={styles.containerTitle}>
            <Text style={styles.titleText}>{item.name.substring(0, 20)}</Text>
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
              {category.name.substring(0, 11)}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={[styles.titleText]}>${item.price}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {!homeScreen ? (
        <Text style={styles.topText}>También te puede interesar</Text>
      ) : (
        <Text style={styles.topText}>{category.name}</Text>
      )}

      <VirtualizedList
        data={products}
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
};

export default AllCategoryProducts;

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
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    fontFamily: "Geomanist Medium",
    fontSize: 18,
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
