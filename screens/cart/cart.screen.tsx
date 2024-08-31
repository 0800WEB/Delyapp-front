import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";
import { FontAwesome5, AntDesign, FontAwesome } from "@expo/vector-icons";
import React, { useEffect } from "react";
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
  const dispatch = useDispatch<AppDispatch>();
  if (!fontsLoaded && !fontError) {
    return null;
  }
  const navigation = useNavigation<DrawerNavProp>();

  useEffect(() => {
    dispatch(getCart() as any);
  }, []);

  const cart = useSelector((state: RootState) => state.cart.cart);
  // console.log(cart)
  const { products, totalPrice } = cart;
  const cartProducts = JSON.parse(JSON.stringify(products));

  const handleDiscount = async (productId: string) => {
    await dispatch(removeFromCart({ productId, quantity: 1 }));
    await dispatch(getCart());
  };
  const handleAdd = async (productId: string) => {
    // console.log(productId);
    await dispatch(addToCart({ productId, quantity: 1 }));
    await dispatch(getCart());
  };

  const goToMapScreen = async () => {
    await navigation.navigate("(routes)/map/index");
  };
  const goToHome = () => {
    // console.log(prod)
    if (dispatch) {
      dispatch(clearSelectedProduct());
    }
    router.back();
  };

  if (!cartProducts || cartProducts.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          marginTop: 25,
        }}
      >
        <Header
          openDrawer={() => navigation.dispatch(DrawerActions.openDrawer())}
        />
        <SearchInput homeScreen={true} />
        <View style={styles.top}>
          <Text style={[styles.topText, { marginTop: 2 }]}>
            CARRITO DE COMPRAS
          </Text>
          <TouchableOpacity onPress={() => goToHome()}>
            <AntDesign
              name="close"
              size={20}
              color="#000024"
              style={{ height: 40, aspectRatio: 1 }}
            />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            marginVertical: "auto",
            marginHorizontal: 25,
            justifyContent: "center",
            alignContent: "center",
            alignSelf: "center",
            textAlign: "center",
            fontFamily: "Geomanist Regular",
            fontSize: 20,
            color: "#A1A1A1",
          }}
        >
          EL CARRITO ESTÁ VACÍO, POR FAVOR AGREGA PRODUCTOS
        </Text>
      </View>
    );
  }

  if (cart) {
    const renderProductItem = ({ item }: { item: CartProduct }) => (
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: "auto",
          marginVertical: 15,
          justifyContent: "space-between",
          paddingVertical: 10,
          width: "90%",
          borderBottomColor: "#A1A1A1",
          borderBottomWidth: 0.5,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          {item.product.images && (
            <Image
              source={{ uri: item.product.images[0] }}
              style={{
                aspectRatio: 1,
                width: 85,
                borderRadius: 15,
              }}
            />
          )}
          <View
            style={{ justifyContent: "space-between", alignContent: "center" }}
          >
            <Text
              style={{
                textAlign: "left",
                marginHorizontal: 15,
                fontFamily: "Geomanist Medium",
                fontSize: 17,
                color: "#000024",
              }}
            >
              {item.product.name}
            </Text>
            <Text
              style={{
                textAlign: "left",
                marginHorizontal: 15,
                fontFamily: "Geomanist Regular",
                fontSize: 14,
                color: "#000024",
              }}
            >
              {item.product.description}
            </Text>
            <Text
              style={{
                textAlign: "left",
                fontFamily: "Geomanist Medium",
                fontSize: 17,
                color: "#000024",
                marginHorizontal: 15,
              }}
            >
              ${Number(item.product?.price?.toString()).toFixed(2)}
            </Text>
          </View>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingVertical: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => handleDiscount(item.product._id)}
              >
                <FontAwesome5
                  name={item.quantity == 1 ? "trash-alt" : "minus"}
                  color="#000024"
                  size={20}
                />
              </TouchableOpacity>
              <Text
                style={{
                  textAlign: "left",
                  fontFamily: "Geomanist Regular",
                  fontSize: 38,
                  color: "#000024",
                  paddingHorizontal: 17,
                }}
              >
                {item.quantity?.toString()}
              </Text>
              <TouchableOpacity onPress={() => handleAdd(item.product._id)}>
                <FontAwesome5 name="plus" color="#000024" size={20} />
              </TouchableOpacity>
            </View>
            <Text
              style={{
                fontSize: 11,
                textAlign: "center",
                fontFamily: "Geomanist Medium",
                marginTop: -12,
              }}
            >
              CANTIDAD
            </Text>
          </View>
        </View>
      </View>
    );

    return (
      <View style={{ flex: 1, marginTop: 25 }}>
        <Header
          openDrawer={() => navigation.dispatch(DrawerActions.openDrawer())}
        />
        <SearchInput homeScreen={true} />
        <View style={styles.top}>
          <Text style={[styles.topText, { marginTop: 2 }]}>
            CARRITO DE COMPRAS
          </Text>
          <TouchableOpacity onPress={() => goToHome()}>
            <AntDesign
              name="close"
              size={20}
              color="#000024"
              style={{ height: 40, aspectRatio: 1 }}
            />
          </TouchableOpacity>
        </View>
        <ScrollView style={{ marginBottom: 10 }}>
          <Text
            style={{
              paddingTop: 10,
              paddingLeft: 10,
              color: "#A1A1A1",
              fontFamily: "Geomanist Regular",
            }}
          >
            {cartProducts.length} productos agregado(s)
          </Text>
          <SafeAreaView
            style={{ borderTopRightRadius: 50, borderTopLeftRadius: 50 }}
          >
            <FlatList
              data={cartProducts}
              renderItem={renderProductItem}
              keyExtractor={(item) => item._id}
            />
          </SafeAreaView>
          <View
            style={{
              margin: 10,
              marginHorizontal: "auto",
              width: "90%",
              borderTopWidth: 0.4,
              borderBottomWidth: 0.4,
              borderColor: "#A1A1A1",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                marginHorizontal: 20,
                marginVertical: 10,
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={styles.cartTotal}>TOTAL: </Text>
              {totalPrice && (
                <Text style={styles.cartTotal}>${totalPrice.toFixed(2)}</Text>
              )}
            </View>
          </View>
          <TouchableOpacity
            style={[
              styles.button3,
              { paddingLeft: -35, marginHorizontal: 32, marginTop: 15 },
            ]}
            onPress={goToMapScreen}
          >
            <View style={styles.buttonWrapper}>
              <Image
                source={require("@/assets/images/BUTTON.png")}
                style={styles.button2}
              />
              <Text
                style={[
                  {
                    fontFamily: "Geomanist Regular",
                    color: "white",
                    fontSize: 19,
                  },
                ]}
              >
                COMPLETAR PEDIDO
              </Text>
            </View>
          </TouchableOpacity>
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
    paddingTop: 18,
    paddingLeft: 15,
    borderBottomColor: "#A1A1A1",
    justifyContent: "space-between",
    borderBottomWidth: 1,
  },
  topText: {
    fontFamily: "Geomanist Regular",
    fontSize: 15,
    color: "#000024",
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
    fontFamily: "Geomanist Regular",
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
    fontFamily: "Geomanist Regular",
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
