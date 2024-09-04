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

const OrdersScreen: React.FC = () => {
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
  //   const [renderedImages, setRenderedImages] = useState([]);
  const navigation = useNavigation<DrawerNavProp>();

  useEffect(() => {
    dispatch(getCart());
  }, []);

  const orders = useSelector((state: RootState) => state.order.orders);
  const userOrders = JSON.parse(JSON.stringify(orders));
//   console.log("User Orders: ", userOrders);

  const goToHome = () => {
    if (dispatch) {
      dispatch(clearSelectedProduct());
    }
    router.back();
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pendiente":
        return styles.pending;
      case "en preparación":
        return styles.preparing;
      case "en camino":
        return styles.delivering;
      case "cancelado":
        return styles.canceled;
      case "entregado":
        return styles.delivered;
      default:
        return styles.commonText;
    }
  };

  const handleAddToCart = async (products: any[]) => {
    // console.log(products);
    products.map(async (product) => {
      await dispatch(
        addToCart({ productId: product.product._id, quantity: 1 })
      );
    });
    await dispatch(getCart());
    await navigation.navigate("CARRITO");
  };

  if (!userOrders || userOrders?.length === 0) {
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
          <Text style={[styles.topText, { marginTop: 2 }]}>MIS ÓRDENES</Text>
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
          AÚN NO TIENES ÓRDENES
        </Text>
      </View>
    );
  }

  if (orders) {
    const renderProductItem = ({ item }: { item: userOrders }) => (
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
          {item.products[0] &&
            item.products[0].product.images &&
            item.products[0].product.images.length > 0 && (
              <Image
                source={{ uri: item.products[0].product.images[0] }}
                style={{
                  aspectRatio: 1,
                  width: 85,
                  borderRadius: 15,
                  alignSelf: "center",
                  marginTop: -55
                }}
              />
            )}
          <View
            style={{
              justifyContent: "space-between",
              alignContent: "center",
              width: "65%",
              marginLeft: 5,
            }}
          >
            <Text
              style={[
                styles.commonText,
                { fontFamily: "Geomanist Regular", fontSize: 15 },
              ]}
            >
              {item.products.length} ARTÍCULOS
            </Text>
            <Text
              style={[
                styles.commonText,
                { fontFamily: "Geomanist Medium", fontSize: 15 },
              ]}
            >
              ID PEDIDO {item._id}
            </Text>
            {Object.entries(
              item.products.reduce((acc, product) => {
                acc[product.product.name] =
                  (acc[product.product.name] || 0) + 1;
                return acc;
              }, {})
            ).map(([productName, count], index) => (
              <Text
                style={[styles.commonText, { fontFamily: "Geomanist Regular" }]}
                key={index}
              >
                {" "}
                • {productName} x {count}
              </Text>
            ))}
            <Text
              style={[
                styles.commonText,
                { fontFamily: "Geomanist Medium", fontSize: 15 },
              ]}
            >
              ${item.totalPrice} MXN
            </Text>
            <Text
              style={[
                styles.commonText,
                { fontFamily: "Geomanist Regular", fontSize: 15 },
              ]}
            >
              {item.updatedAt.substring(0, 10)}
            </Text>
            <Text style={[styles.commonText, getStatusColor(item.status)]}>
              {item.status.toUpperCase()}
            </Text>
            <TouchableOpacity
              style={[styles.button3, { marginRight: 0, marginTop: 15 }]}
              onPress={() => {
                handleAddToCart(item.products);
              }}
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
                      fontSize: 17,
                    },
                  ]}
                >
                  VOLVER A PEDIR
                </Text>
              </View>
            </TouchableOpacity>
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
          <Text style={[styles.topText, { marginTop: 2 }]}>MIS ÓRDENES</Text>
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
          <SafeAreaView
            style={{ borderTopRightRadius: 50, borderTopLeftRadius: 50 }}
          >
            <FlatList
              data={orders}
              renderItem={renderProductItem}
              keyExtractor={(item) => item._id}
            />
          </SafeAreaView>
        </ScrollView>
      </View>
    );
  }
};

export default OrdersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  commonText: {
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
    height: 35,
    borderRadius: 60,
  },
  button3: {
    width: 200,
    height: 45,
    borderRadius: 60,
    alignSelf: "center",
  },
  pending: {
    color: "#FFC700",
  },
  preparing: {
    color: "#FF8A00",
  },
  delivering: {
    color: "#8700AA",
  },
  delivered: {
    color: "#2EB200",
  },
  canceled: {
    color: "#FF0000",
  },
});
