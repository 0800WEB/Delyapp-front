import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  FlatList,
  Image,
  Alert,
} from "react-native";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { _retrieveData } from "@/utils/util"; // Asegúrate de reemplazar esto con la ruta a tu función de almacenamiento

import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";
// import { GOOGLE_MAPS_APIKEY } from "@env";
import { GOOGLE_MAPS_APIKEY } from "@/utils/uri";

import { router } from "expo-router";
import { useFonts } from "expo-font";
import { FontAwesome, AntDesign, Entypo } from "@expo/vector-icons";
import { useCoupon, clearCoupon } from "@/store/coupon/couponActions";
import { createOrder } from "@/store/order/orderActions";
import { clearCart } from "@/store/cart/cartActions";
import { clearSelectedProduct } from "@/store/products/productsActions";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useStripe } from "@stripe/stripe-react-native";
import axios from "axios";
import { SERVER_URI } from "@/utils/uri";
import { Toast } from "react-native-toast-notifications";
type DrawerNavProp = DrawerNavigationProp<RootParamList>;

type LocationType = { latitude: number; longitude: number } | undefined;

const MapScreen: React.FC = () => {
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

  const dispatch = useDispatch<AppDispatch>();

  const cart = useSelector((state: RootState) => state.cart.cart);
  const { products, totalPrice } = cart;
  const cartProducts = JSON.parse(JSON.stringify(products));
  const coupon = useSelector((state: RootState) => state.coupon.coupon);
  const [couponCode, setCouponCode] = useState("");

  const [origin, setOrigin] = useState({
    latitude: -12.074533,
    longitude: -77.083644,
  });
  const [destination, setDestination] = useState<LocationType>();
  const [currentLocation, setCurrentLocation] = useState<LocationType>();
  const [destinationAddress, setDestinationAddress] = useState("");

  //radio de la entrega en km
  const deliveryRadius = 10;

  const getLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    const current = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    setCurrentLocation(current);
    setDestination(current);
  };

  const navigation = useNavigation<DrawerNavProp>();

  useEffect(() => {
    getLocationPermission();
  }, []);
  // console.log(currentLocation)
  const getGeocode = async (address: string) => {
    let response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_MAPS_APIKEY}`
    );
    let data = await response.json();
    return data.results[0].geometry.location;
  };

  useEffect(() => {
    if (destinationAddress !== "") {
      getGeocode(destinationAddress).then((location) => {
        const newLocation = {
          latitude: location.lat,
          longitude: location.lng,
        };
        setCurrentLocation(newLocation);
      });
    }
  }, [destinationAddress]);

  useEffect(() => {
    if (destination) {
      (async () => {
        const newDestinationAddress = await getReverseGeocode(destination);
        setDestinationAddress(newDestinationAddress);
      })();
    }
  }, [destination]);

  const getReverseGeocode = async (location: LocationType): Promise<string> => {
    if (!location) {
      return "";
    }
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${GOOGLE_MAPS_APIKEY}`
      );
      const data = await response.json();
      return data.results[0].formatted_address;
    } catch (error) {
      console.error(error);
      return "";
    }
  };

  const calculateDistance = (loc1: LocationType, loc2: LocationType) => {
    if (!loc1 || !loc2) return 0;

    const toRadians = (degrees: number) => degrees * (Math.PI / 180);
    const R = 6371; // Radio de la Tierra en km
    const dLat = toRadians(loc2.latitude - loc1.latitude);
    const dLng = toRadians(loc2.longitude - loc1.longitude);
    const lat1 = toRadians(loc1.latitude);
    const lat2 = toRadians(loc2.latitude);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distancia en km
  };

  useEffect(() => {
    if (destination) {
      (async () => {
        const newDestinationAddress = await getReverseGeocode(destination);
        setDestinationAddress(newDestinationAddress);
      })();
    }
  }, [destination]);

  const applyCoupon = async () => {
    dispatch(useCoupon(couponCode));
    //  console.log(couponCode)
  };

  let newPrice: number = 0;
  let discount: number = 0;
  let discountPercentage: number = 0;
  if (coupon) {
    if (coupon.discountAmount !== 0) {
      discount = coupon.discountAmount;
      newPrice = totalPrice - discount;
    } else if (coupon.discountPercentage !== 0) {
      discount = coupon.discountPercentage;
      newPrice = totalPrice - (totalPrice * discount) / 100;
      discountPercentage = (discount * totalPrice) / 100;
    }
  }

  // console.log("CartId: ", cart._id);
  // console.log("deliveryAddress: ", destinationAddress);
  // console.log("Cupon: ", coupon);
  // console.log("CuponId: ", coupon._id);
  // console.log("TotalPrice: ", totalPrice);

  const newOrder = async () => {
    dispatch(
      createOrder({
        cartId: cart._id,
        deliveryAddress: destinationAddress,
        paymentMethod: "stripe",
        couponId: coupon?._id,
      })
    );
    if (createOrder.fulfilled()) {
      dispatch(clearCart());
      dispatch(clearCoupon());
    } else{
      console.log("Error al crear la orden")
    }
    await navigation.navigate("(routes)/order/index");
  };

  const goToHome = () => {
    // console.log(prod)
    if (dispatch) {
      dispatch(clearSelectedProduct());
    }
    router.back();
  };

  let { initPaymentSheet, presentPaymentSheet } = useStripe();

  const onCheckout = async ({
    cartId,
    couponId,
  }: {
    cartId: string;
    couponId?: string;
  }) => {
    try {
      const distance = calculateDistance(origin, destination);

      if (distance > deliveryRadius) {
        Alert.alert(
          "Dirección fuera de la zona de entrega",
          `La dirección ingresada está fuera del área de entrega permitida de ${deliveryRadius} km.`,
          [{ text: "OK" }]
        );
        return;
      }
      const token = await _retrieveData({ key: "userToken" });
      if (!token) {
        Toast.show("Usuario no autenticado", { type: "danger" });
        return;
      }
      // 1. Crear el Payment Intent desde el backend
      const response = await axios.post(
        `${SERVER_URI}/payments`,
        { cartId, couponId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response?.error) {
        console.log("Something went wrong", response.error);
        Toast.show("Hubo un problema al crear el Payment Intent", {
          type: "danger",
        });
        return;
      }

      // 2. Inicializar el Payment Sheet
      const { error: paymentSheetError } = await initPaymentSheet({
        merchantDisplayName: "Charro Negro",
        paymentIntentClientSecret: response.data.clientSecret, // Asegúrate de que esta es la correcta respuesta
        defaultBillingDetails: {
          name: "lucas",
        },
      });

      if (paymentSheetError) {
        console.log("Something went wrong", paymentSheetError.message);
        Toast.show("Error al inicializar el Payment Sheet", { type: "danger" });
        return;
      }

      // 3. Presentar el Payment Sheet
      const { error: paymentError } = await presentPaymentSheet();

      if (paymentError) {
        console.log(`Error code: ${paymentError.code}`, paymentError.message);
        return;
      }

      // Si todo salió bien, mostramos un mensaje de éxito
      Toast.show("Pago realizado con éxito", { type: "success" });
      await dispatch(clearSelectedProduct());
      await newOrder();

      // Aquí puedes manejar la confirmación de éxito de la orden
      console.log("Payment successful!");
    } catch (error) {
      console.error("Error en el checkout:", error);
      Toast.show("Error en el proceso de pago", { type: "danger" });
    }
  };

  console.log(cartProducts)

  if (cart) {
    const renderProductItem = ({ item }: { item: CartProduct }) => (
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: 10,
          marginVertical: 15,
          justifyContent: "space-between",
          paddingBottom: 15,
          // width: "90%",
          borderBottomColor: "#A1A1A1",
          borderBottomWidth: 0.5,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <View
            style={{ justifyContent: "space-between", alignContent: "center", width: "65%" }}
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
          </View>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View>
            <Text
              style={{
                textAlign: "left",
                fontFamily: "Geomanist Regular",
                fontSize: 17,
                color: "#000024",
                marginHorizontal: 15,
              }}
            >
              ${Number(item.product?.price?.toString()).toFixed(2)} MXN
            </Text>
          </View>
        </View>
      </View>
    );

    return (
      <LinearGradient
        colors={["#F9F6F7", "#F9F6F7"]}
        style={{ flex: 1, marginTop: 25 }}
      >
        <View style={styles.top}>
          <Text style={[styles.topText, { marginTop: 2 }]}>
            DETALLES DE ENVÍO
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
        <ScrollView>
          <View style={{ flex: 1, marginTop: 15 }}>
            <Text
              style={{
                marginHorizontal: 10,
                fontFamily: "Geomanist Regular",
                fontSize: 15,
                color: "#000024",
              }}
            >
              ¿Dónde deseas recibir tu pedido?
            </Text>
            <MapView
              style={{ height: 300, marginVertical: 15 }}
              initialRegion={{
                latitude: origin?.latitude,
                longitude: origin?.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              {/* <Marker
              draggable={false}
              coordinate={origin}
              title={"title"}
              description={"description"}
              onDragEnd={(direction) => {
                setOrigin(direction.nativeEvent.coordinate);
              }}
            /> */}
              {currentLocation && (
                <Marker
                  draggable={true}
                  coordinate={currentLocation}
                  title={"title"}
                  description={"description"}
                  onDragEnd={async (e) => {
                    const newDestination = e.nativeEvent.coordinate;
                    setDestination(newDestination);
                    const newDestinationAddress = await getReverseGeocode(
                      newDestination
                    );
                    setDestinationAddress(newDestinationAddress);
                  }}
                />
              )}
              <MapViewDirections
                origin={origin}
                destination={currentLocation}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={3}
                strokeColor="#000"
              />
            </MapView>
            <View style={{ marginHorizontal: 10 }}>
              {/* <TextInput
              style={styles.inputs}
              value={originAddress}
              onChangeText={setOriginAddress}
              placeholder="Dirección de la tienda"
            /> */}
              <TextInput
                style={styles.inputs}
                value={destinationAddress}
                onChangeText={setDestinationAddress}
                placeholder="Dirección del pedido"
              />
            </View>
            {cartProducts && (
              <SafeAreaView
                style={{borderTopRightRadius: 50, borderTopLeftRadius: 50 }}
              >
                <FlatList
                  data={cartProducts}
                  renderItem={renderProductItem}
                  keyExtractor={(item) => item._id}
                />
              </SafeAreaView>
            )}

            <View
              style={{
                margin: 10,
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
                <View>
                  <Text style={[styles.cartResume, { textAlign: "left" }]}>
                    Sutotal:{" "}
                  </Text>
                  <Text style={[styles.cartResume, { textAlign: "left" }]}>
                    DESCUENTO:{" "}
                  </Text>
                </View>
                <View>
                  <Text style={styles.cartResume}>
                    ${totalPrice.toFixed(2)} MXN
                  </Text>
                  {discountPercentage ? (
                    <Text style={styles.cartResume}>
                      ${discountPercentage?.toFixed(2)}
                    </Text>
                  ) : (
                    <Text style={styles.cartResume}>
                      ${discount?.toFixed(2)} MXN
                    </Text>
                  )}
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  paddingTop: 10,
                  marginBottom: 10,
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderTopColor: "#A1A1A1",
                  borderTopWidth: 0.5,
                }}
              >
                <Text style={[styles.cartTotal, { marginLeft: 20 }]}>
                  TOTAL:{" "}
                </Text>
                {totalPrice && newPrice !== 0 ? (
                  <Text style={[styles.cartTotal, { marginRight: 20 }]}>
                    ${newPrice.toFixed(2)} MXN
                  </Text>
                ) : (
                  <Text style={[styles.cartTotal, { marginRight: 20 }]}>
                    ${totalPrice.toFixed(2)} MXN
                  </Text>
                )}
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginHorizontal: 16,
                marginBottom: 15,
                marginTop: 5,
              }}
            >
              <TextInput
                style={[styles.input, { color: "#A1A1A1" }]}
                keyboardType="default"
                value={couponCode}
                placeholder="Escribe aquí tu cupón"
                onChangeText={setCouponCode}
              />
              <TouchableOpacity
                style={{
                  width: "40%",
                  height: 40,
                  justifyContent: "center",
                  backgroundColor: "#000024", // Cambia el color si está deshabilitado
                  borderTopRightRadius: 25,
                  borderBottomRightRadius: 25,
                }}
                onPress={applyCoupon}
                disabled={!couponCode} // Deshabilitar si el campo está vacío
              >
                <Text
                  style={{
                    textAlign: "center",
                    alignContent: "center",
                    color: "white",
                    fontFamily: "Geomanist Regular",
                    fontSize: 15,
                  }}
                >
                  APLICAR CUPÓN
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                alignContent: "center",
                backgroundColor: "#C4F6F3",
                paddingHorizontal: 20,
                paddingVertical: 10,
                marginTop: 5,
                marginBottom: 12,
              }}
            >
              <Entypo
                name="warning"
                size={28}
                color="#000024"
                style={{
                  alignSelf: "center",
                  justifyContent: "center",
                  height: 30,
                }}
              />
              <Text
                style={{
                  fontSize: 12,
                  justifyContent: "center",
                  width: "85%",
                  textAlign: "center",
                }}
              >
                AL REALIZAR EL PEDIDO, CONFIRMO QUE TENGO 18 AÑOS O MÁS Y ACEPTO
                LOS TÉRMINOS Y CONDICIONES
              </Text>
            </View>
            <TouchableOpacity
              style={[
                styles.button3,
                {
                  paddingLeft: -35,
                  marginHorizontal: 32,
                  marginTop: 15,
                  marginBottom: 15,
                },
              ]}
              onPress={() =>
                onCheckout({
                  cartId: cart._id,
                  ...(coupon?._id && { couponId: coupon._id }), // Solo incluye couponId si existe
                })
              }
              disabled={!destinationAddress} // Deshabilitar si destinationAddress está vacío
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
                  REALIZAR PEDIDO
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    );
  }
};

const styles = StyleSheet.create({
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
  inputs: {
    marginBottom: 10,
    height: 40,
    borderColor: "#949494",
    borderBottomWidth: 0.8,
    textAlign: "center",
    color: "#000024",
    fontSize: 15,
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
    fontSize: 18,
    fontWeight: "regular",
    fontFamily: "Geomanist Regular",
    marginVertical: 5,
    color: "#A1A1A1",
  },
  input: {
    width: "60%",
    height: 40,
    // marginLeft: 16,
    borderRadius: 25,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderColor: "#A1A1A1",
    borderWidth: 0.4,
    paddingLeft: 25,
    fontSize: 15,
    fontFamily: "Geomanist Regular",
    backgroundColor: "white",
    color: "#000024",
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

export default MapScreen;
