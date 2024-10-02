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
import { LinearGradient } from "expo-linear-gradient";
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
import axios from "axios";
import { SERVER_URI } from "@/utils/uri";
import { Route, Link, Routes, useLocation } from "react-router-dom";
import { fetchUserOrders } from "@/store/order/orderActions";

type DrawerNavProp = DrawerNavigationProp<RootParamList>;

const OrdersScreen: React.FC = () => {
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
  const dispatch = useDispatch<AppDispatch>();
  if (!fontsLoaded && !fontError) {
    return null;
  }
  //   const [renderedImages, setRenderedImages] = useState([]);
  const navigation = useNavigation<DrawerNavProp>();
  console.log(navigation);
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
    switch (status?.toLowerCase()) {
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

  const handleRepeatOrder = async (orderId: string) => {
    try {
      // Recuperar el token de autenticación
      const token = await _retrieveData({ key: "userToken" });

      // Hacer la petición POST a la ruta de repeatOrder
      const response = await axios.post(
        `${SERVER_URI}/carts/repeat-order/${orderId}`,
        {}, // No necesitas enviar body
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pasar el token en los headers
          },
        }
      );

      if (response.data.success) {
        // Actualizar el carrito (si es necesario)
        await dispatch(getCart());

        // Navegar al carrito
        navigation.navigate("CARRITO");

        console.log("Orden repetida con éxito:", response.data);
      } else {
        console.error("Error al repetir la orden:", response.data.message);
      }
    } catch (error) {
      console.error("Error en el servidor al repetir la orden:", error);
    }
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
          <Text style={[styles.topText, { marginTop: 2 }]}>MIS PEDIDOS</Text>
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
            fontFamily: "Aristotelica Pro Display Bold",
            fontSize: 20,
            color: "#A1A1A1",
          }}
        >
          AÚN NO TIENES PEDIDOS
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
          padding: 10,
        }}
      >
        <View style={{ flexDirection: "row", gap: 10 }}>
          {item?.products[0] &&
            item?.products[0].product?.images &&
            item?.products[0].product?.images?.length > 0 && (
              <Image
                source={{ uri: item?.products[0].product?.images[0] }}
                style={{
                  aspectRatio: 1,
                  width: "18%",

                  alignSelf: "center",
                  marginTop: -55,
                }}
              />
            )}
          <View
            style={{
              justifyContent: "space-between",
              alignContent: "center",
              width: "80%",
              marginLeft: 5,
            }}
          >
            <Text
              style={[
                styles.commonText,
                {
                  fontFamily: "Aristotelica Pro Display Regular",
                  fontSize: 15,
                },
              ]}
            >
              {item?.products?.length} ARTÍCULOS
            </Text>
            <Text
              style={[
                styles.commonText,
                { fontFamily: "Aristotelica Pro Display Bold", fontSize: 15 },
              ]}
            >
              ID PEDIDO {item._id}
            </Text>
            {item && item?.products?.map((product, index) => (
              <Text
                style={[
                  styles.commonText,
                  { fontFamily: "Aristotelica Pro Display Regular" },
                ]}
                key={index}
              >
                {" "}
                • {product?.product?.name} x {product?.quantity}
              </Text>
            ))}

            <Text
              style={[
                styles.commonText,
                { fontFamily: "Aristotelica Pro Display Bold", fontSize: 15 },
              ]}
            >
              ${item?.totalPrice} MXN
            </Text>
            <Text
              style={[
                styles.commonText,
                {
                  fontFamily: "Aristotelica Pro Display Regular",
                  fontSize: 15,
                },
              ]}
            >
              {item?.updatedAt?.substring(0, 10)}
            </Text>
            <Text style={[styles.commonText, getStatusColor(item?.status)]}>
              {item?.status?.toUpperCase()}
            </Text>
            <TouchableOpacity
              style={{
                marginVertical: 5,
                display: "flex",
                alignItems: "flex-end",
                borderRadius: 60,
              }}
              onPress={() => {
                handleRepeatOrder(item?._id); // Pasar el ID de la orden
              }}
            >
              <LinearGradient
                colors={["#016AF5", "#08E6E7"]}
                style={{borderRadius: 55}}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text
                  style={[
                    {
                      fontFamily: "Aristotelica Pro Display Regular",
                      textAlign: "center",
                      color: "white",
                      fontSize: 17,
                      paddingVertical: 5,
                      paddingHorizontal: 20,
                      

                    },
                  ]}
                >
                  VOLVER A PEDIR
                </Text>
              </LinearGradient>
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
          <Text style={[styles.topText, { marginTop: 2 }]}>MIS PEDIDOS</Text>
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
              data={[...orders] /* .reverse() */}
              renderItem={renderProductItem}
              keyExtractor={(item) => item?._id}
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
    fontFamily: "Aristotelica Pro Display Regular",
    fontSize: 15,
    color: "#000024",
  },
  closeIcon: {
    height: 40,
    aspectRatio: 1,
  },
  commonText: {
    color: "#A1A1A1",
    fontFamily: "Aristotelica Pro Display Demibold",
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
