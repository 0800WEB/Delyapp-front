import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  VirtualizedList,
} from "react-native";
import {
  FontAwesome,
} from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { router } from "expo-router";
import React from "react";

import SearchInput from "@/components/search/searchInput";
import { AppDispatch, RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { selectProduct } from "@/store/products/productsActions";
import { useNavigation } from "expo-router";
import { useDispatch } from "react-redux";

export default function SearchScreen() {
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
  const navigation = useNavigation<DrawerNavProp>();
  const dispatch = useDispatch<AppDispatch>();
  const searchProducts = useSelector((state: RootState) => state.products.searchProducts);
  const selectedProductId = useSelector((state: RootState) => state.products.selectedProductId);
  // console.log(selectedProductId)

  const handleProductSelected = (productId: string) => {
    if (dispatch) {
      dispatch(selectProduct(productId));
    }
    router.back();
  }

  const getItem = (data: any[], index: number) => data[index];
  const getItemCount = (data: any[]) => (data ? data.length : 0);
  const keyExtractor = (item: any) => item._id.toString();

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.productCard} onPress={() => handleProductSelected(item._id)}>
      <Image
        source={{uri: item.images[0]}}
        style={styles.imageStyle}
      />
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>{item.name}</Text>
        <Text style={[styles.titleText, styles.descriptionText]}>
          {item.description}
        </Text>
        <Text style={styles.priceText}>${item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <SearchInput />
      <VirtualizedList
        data={searchProducts}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        getItemCount={getItemCount}
        getItem={getItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  productCard: {
    marginHorizontal: "auto",
    width: "95%",
    flexDirection: "row",
    alignContent: "center",
    marginVertical: 10,
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    padding: 10,
  },
  imageStyle: {
    width: 90,
    aspectRatio: 1,
    marginHorizontal: 5,
    marginVertical: 10,
    borderRadius: 15,
    borderWidth: 0.15,
    borderColor: "#A1A1A1",
  },
  textContainer: {
    marginLeft: 10,
    justifyContent: "space-around",
    flex: 1,
  },
  titleText: {
    fontFamily: "Geomanist Medium",
    fontSize: 17,
    color: "#000024",
    textAlign: "left",
  },
  descriptionText: {
    fontFamily: "Geomanist Regular",
    fontSize: 15,
    color: "#000024",
  },
  priceText: {
    fontFamily: "Geomanist Medium",
    fontSize: 18,
    color: "#000024",
  },
  topText: {
    display: "flex",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    fontFamily: "Geomanist Medium",
    fontSize: 18,
    color: "#A1A1A1",
    textAlign: "left",
  },
  containerTitle: {
    display: "flex",
    marginLeft: 5,
    marginVertical: 10,
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "80%",
    height: 90,
  },
});