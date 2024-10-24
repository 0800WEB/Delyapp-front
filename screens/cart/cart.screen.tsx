import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ActivityIndicator, // Import ActivityIndicator
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5, AntDesign, FontAwesome } from "@expo/vector-icons";
import React, { useEffect, useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { router } from "expo-router";
import { useFonts } from "expo-font";
import { useDispatch } from "react-redux";
import { getCart } from "@/store/cart/cartActions";
import { _retrieveData } from "@/utils/util";
import { addToCart, removeFromCart } from "@/store/cart/cartActions";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { clearSelectedProduct } from "@/store/products/productsActions";
import Header from "@/components/header/header";
import SearchInput from "@/components/search/searchInput";
import { DrawerActions } from "@react-navigation/native";

type DrawerNavProp = DrawerNavigationProp<RootParamList>;

const CartScreen: React.FC = () => {
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
  const [isProcessing, setIsProcessing] = useState(false); // Add processing state

  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<DrawerNavProp>();

  const fetchCart = useCallback(() => {
    dispatch(getCart());
  }, [dispatch]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Verificamos si el carrito está cargando
  const cart = useSelector((state: RootState) => state.cart.cart);
  const { products = [], totalPrice } = cart || {};  // Aseguramos que `products` sea un array vacío si no hay datos
  const cartProducts = products && products.length ? products : [];  // Aseguramos que `cartProducts` siempre tenga un array

  const handleDiscount = async (productId: string) => {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      await dispatch(removeFromCart({ productId, quantity: 1 }));
      await dispatch(getCart());
    } catch (error) {
      console.error("Error al aplicar descuento:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAdd = async (productId: string) => {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      await dispatch(addToCart({ productId, quantity: 1 }));
      await dispatch(getCart());
    } catch (error) {
      console.error("Error al agregar producto:", error);
    } finally {
      setIsProcessing(false);
    }
  };


  const goToMapScreen = async () => {
    await navigation.navigate("(routes)/map/index");
  };

  const goToHome = () => {
    if (dispatch) {
      dispatch(clearSelectedProduct());
    }
    router.back();
  };

  if (!cartProducts.length) {
    return (
      <View style={{ flex: 1, marginTop: 25 }}>
        <Header openDrawer={() => navigation.dispatch(DrawerActions.openDrawer())} />
        <SearchInput homeScreen={true} />
        <View style={styles.top}>
          <Text style={[styles.topText, { marginTop: 2 }]}>CARRITO DE COMPRAS</Text>
          <TouchableOpacity onPress={goToHome}>
            <AntDesign name="close" size={20} color="#000024" style={{ height: 40, aspectRatio: 1 }} />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            marginVertical: "auto",
            marginHorizontal: 25,
            justifyContent: "center",
            alignSelf: "center",
            textAlign: "center",
            fontFamily: "Aristotelica Pro Display Bold",
            fontSize: 20,
            color: "#A1A1A1",
          }}>
          EL CARRITO ESTÁ VACÍO, POR FAVOR AGREGA PRODUCTOS
        </Text>
      </View>
    );
  }

  const renderProductItem = ({ item }: { item: CartProduct }) => {
    if (!item?.product) {
      return null; // Verificación de producto inválido
    }
    return (
      <View style={styles.cardContainer}>
        <View style={styles.imageContainer1}>
          {item?.product?.images && <Image source={{ uri: item?.product?.images[0] }} style={styles.imageContainer} />}
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.nameText}>{item.product.name?.substring(0, 35)}</Text>
          <Text style={styles.descriptionText}>{item.product.description?.substring(0, 30)}</Text>
          <Text style={styles.priceText}>${Number(item.product.price).toFixed(2)} MXN</Text>
        </View>
        <View style={styles.cartQuantityContainer}>
          <View style={styles.quantitySection}>
            <TouchableOpacity onPress={() => handleDiscount(item?.product?._id)} disabled={isProcessing}>
              <FontAwesome5
                name={item?.quantity === 1 ? "trash-alt" : "minus"}
                color={isProcessing ? "#ccc" : "#000024"} // Color del icono deshabilitado
                size={20}
              />
            </TouchableOpacity>
            {isProcessing ? (
              <Text style={{ fontSize: 32, color: "#000024", paddingHorizontal: 17 }}>{item?.quantity}</Text>
            ) : (
              <Text style={{ fontSize: 32, color: "#000024", paddingHorizontal: 17 }}>{item?.quantity}</Text>
            )}
            <TouchableOpacity onPress={() => handleAdd(item?.product?._id)} disabled={isProcessing}>
              <FontAwesome5
                name="plus"
                color={isProcessing ? "#ccc" : "#000024"} // Color del icono deshabilitado
                size={20}
              />
            </TouchableOpacity>

          </View>
          <Text style={{ fontSize: 11, textAlign: "center", fontFamily: "Aristotelica Pro Display Demibold" }}>CANTIDAD</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, marginTop: 25 }}>
      <Header openDrawer={() => navigation.dispatch(DrawerActions.openDrawer())} />
      <SearchInput homeScreen={true} />
      <View style={styles.top}>
        <Text style={[styles.topText, { marginTop: 2 }]}>CARRITO DE COMPRAS</Text>
        <TouchableOpacity onPress={goToHome}>
          <AntDesign name="close" size={20} color="#000024" style={{ height: 40, aspectRatio: 1 }} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView}>
        <Text style={{ padding: 10, color: "#A1A1A1", fontFamily: "Geomanist Regular" }}>
          {cartProducts.length} producto(s) agregado(s)
        </Text>
        <SafeAreaView>
          <FlatList data={cartProducts} renderItem={renderProductItem} keyExtractor={(item) => item ? item?._id : ""} />
        </SafeAreaView>
        <View style={{ margin: 10, borderColor: "#A1A1A1", borderTopWidth: 0.4, borderBottomWidth: 0.4 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", margin: 20 }}>
            <Text style={styles.cartTotal}>TOTAL: </Text>
            {totalPrice && <Text style={styles.cartTotal}>${totalPrice.toFixed(2)} MXN</Text>}
          </View>
        </View>
        <TouchableOpacity onPress={goToMapScreen}>
          <LinearGradient colors={["#016AF5", "#08E6E7"]} style={{ borderRadius: 25 }} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
            <Text style={{ textAlign: "center", color: "white", fontSize: 17, padding: 20 }}>COMPLETAR PEDIDO</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
export default CartScreen;

const styles = StyleSheet.create({
  scrollView: {
    marginBottom: 10,
  },
  top: {
    flexDirection: "row",
    paddingTop: 18,
    paddingLeft: 15,
    borderBottomColor: "#A1A1A1",
    justifyContent: "space-between",
    borderBottomWidth: 1,
  },
  topText: {
    fontFamily: "Aristotelica Pro Display Regular",
    fontSize: 15,
    color: "#000024",
  },
  cardContainer: {
    flexDirection: "row",
    marginHorizontal: "auto",
    marginVertical: 10,
    paddingVertical: 10,
    justifyContent: "space-between",
    width: "93%",
    minHeight: 120,
    maxHeight: "auto",
    borderBottomColor: "#A1A1A1",
    borderBottomWidth: 0.5,
  },
  imageContainer1: {
    alignItems: "center",
    maxWidth: "20%",
    justifyContent: "center",
  },
  imageContainer: {
    aspectRatio: 1,
    minWidth: "100%",
    maxWidth: "100%",
    borderRadius: 15,
  },
  textContainer: {
    justifyContent: "space-between",
    alignContent: "center",
    width: "58%",
    height: "auto",
    marginLeft: "2%",
    gap: 5,
  },
  nameText: {
    textAlign: "left",
    fontFamily: "Aristotelica Pro Display Bold",
    fontSize: 17,
    color: "#000024",
    width: "100%",
  },
  descriptionText: {
    textAlign: "left",
    fontFamily: "Aristotelica Pro Display Lt",
    fontSize: 14,
    color: "#000024",
    width: "93%",
  },
  priceText: {
    textAlign: "left",
    fontFamily: "Aristotelica Pro Display Demibold",
    fontSize: 16,
    color: "#000024",
  },
  cartQuantityContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: "20%",
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
  quantitySection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  quantityText: {
    fontSize: 20,
  },
  description: {
    marginHorizontal: 15,
    fontSize: 17,
    justifyContent: "space-evenly",
    fontFamily: "Aristotelica Pro Display Regular",
  },
  cartTotal: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Aristotelica Pro Display Demibold",
    marginVertical: 10,
    color: "#A1A1A1",
  },
  cartResume: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "regular",
    marginVertical: 5,
    color: "#A1A1A1",
  },
  input: {
    width: "70%",
    height: 45,
    // marginLeft: 16,
    borderRadius: 15,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderColor: "#A1A1A1",
    borderWidth: 0.8,
    paddingLeft: 35,
    fontSize: 16,
    fontFamily: "Aristotelica Pro Display Regular",
    backgroundColor: "white",
    color: "#A1A1A1",
  },
  buttonWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  button2: {
    position: "absolute",
    width: 200,
    height: 45,
    borderRadius: 60,
  },
  button3: {
    width: 200,
    height: 45,
    borderRadius: 60,
    alignSelf: "center",
  },
});
