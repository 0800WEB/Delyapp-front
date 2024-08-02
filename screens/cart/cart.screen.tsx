import {
  StatusBar,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
} from "react-native";
import { FontAwesome, Entypo, Ionicons, AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { useRouting } from "expo-next-react-navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import AllCategoryProducts from "@/components/alProducts/allProductsCategories";
import { router } from "expo-router";
import { useFonts } from "expo-font";
import { useDispatch } from "react-redux";
import { getCart } from "@/store/cart/cartActions";
import { _retrieveData } from "@/utils/util";

interface Product {
  __v: number;
  _id: string;
  category: string;
  createdAt: string;
  description: string;
  images: string[];
  name: string;
  price: number;
  stock: number;
  updatedAt: string;
}

interface CartProduct {
  productId: number;
  quantity: number;
  totalPrice: number;
}

interface CartItem {
  _id: string;
  product: Product;
  quantity: number;
}

const CartScreen: React.FC = () => {
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
  const dispatch = useDispatch();
  if (!fontsLoaded && !fontError) {
    return null;
  }

  useEffect(() => {
    dispatch(getCart() as any);
  }, []);

  const cart = useSelector((state: RootState) => state.cart.cart);
  const { products, totalPrice } = cart;
  const cartProducts = JSON.parse(JSON.stringify(products));

  if (!cartProducts || cartProducts.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Text
          style={{
            textAlign: "center",
          }}
        >
          No existen elementos en el carrito, por favor agregalos
        </Text>
      </View>
    );
  }

  if (cart) {
    const renderProductItem = ({ item }: { item: CartItem }) => (
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: "auto",
          marginVertical: 15,
          justifyContent: "space-between",
          width: "90%",
        }}
      >
        <View style={{ flexDirection: "row", width: "60%" }}>
          <Image
            source={require("@/assets/images/ICONOS-47.png")}
            style={{
              backgroundColor: "#A1A1A1",
              aspectRatio: 1,
              width: 85,
              borderRadius: 15,
            }}
          />
          <Text
            style={{
              textAlign: "left",
              marginHorizontal: 15,
              marginVertical: "auto",
              fontFamily: "Geomanist Medium",
              fontSize: 15,
              color: "#A1A1A1",
            }}
          >
            {item.product.name}
          </Text>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "flex-start",
            width: "20%",
          }}
        >
          <Text
            style={{
              textAlign: "left",
              fontFamily: "Geomanist Regular",
              fontSize: 15,
              color: "#A1A1A1",
            }}
          >
            ${item.product?.price?.toString()}
          </Text>
          <Text
            style={{
              textAlign: "left",
              fontFamily: "Geomanist Regular",
              fontSize: 15,
              color: "#A1A1A1",
            }}
          >
            {item.quantity?.toString()}
          </Text>
        </View>
      </View>
    );

    return (
      <View style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
        <View style={styles.top}>
          <Text style={styles.topText}>CARRITO DE COMPRA</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <AntDesign
              name="close"
              size={28}
              color="#A1A1A1"
              style={styles.closeIcon}
            />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <FlatList
            data={cartProducts}
            renderItem={renderProductItem}
            keyExtractor={(item) => item._id}
          />
          {totalPrice && (
            <Text style={styles.cartTotal}>${totalPrice.toFixed(2)}</Text>
          )}
        </ScrollView>
      </View>
    );
  }
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  notFoundText: {
    textAlign: "center",
  },
  scrollView: {
    marginBottom: 10,
  },
  top: {
    flexDirection: "row",
    paddingTop: 15,
    paddingLeft: 15,
    borderBottomColor: "#949494",
    justifyContent: "space-between",
    borderBottomWidth: 1,
  },
  topText: {
    fontFamily: "Cherione Regular",
    fontSize: 20,
    color: "#949494",
  },
  closeIcon: {
    height: 40,
    aspectRatio: 1,
  },
  favoriteButton: {
    marginVertical: 10,
    alignItems: "flex-end",
    marginHorizontal: 10,
  },
  favoriteIcon: {
    marginHorizontal: 10,
  },
  imageContainer: {
    backgroundColor: "#A1A1A1",
    alignSelf: "center",
    aspectRatio: 1,
    height: 250,
    marginVertical: 5,
  },
  middleSection: {
    flexDirection: "row",
    marginHorizontal: 15,
    justifyContent: "space-between",
    marginVertical: 10,
    borderBottomColor: "#A1A1A1",
    borderBottomWidth: 0.8,
    paddingVertical: 5,
  },
  priceNameContainer: {
    justifyContent: "center",
  },
  commonText: {
    fontFamily: "Geomanist Medium",
    fontSize: 18,
    color: "#A1A1A1",
  },
  nameText: {
    fontFamily: "Geomanist Medium",
    fontSize: 15,
    color: "#A1A1A1",
  },
  addToCartContainer: {
    alignItems: "center",
  },
  addToCartText: {
    backgroundColor: "#A1A1A1",
    color: "white",
    padding: 2,
    borderRadius: 4,
  },
  quantityContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  quantityIcon: {
    alignSelf: "center",
  },
  quantityText: {
    fontSize: 20,
  },
  description: {
    marginHorizontal: 15,
    fontSize: 17,
    justifyContent: "space-evenly",
    fontFamily: "Geomanist Regular",
  },
  cartTotal: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
});
