import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from "react-native";
import { useEffect, useMemo, useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { _retrieveData } from "@/utils/util"; // Asegúrate de reemplazar esto con la ruta a tu función de almacenamiento

import MapView, { Marker, Polyline } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";
// import { GOOGLE_MAPS_APIKEY } from "@env";
import { GOOGLE_MAPS_APIKEY } from "@/utils/uri";

import { router } from "expo-router";
import { useFonts } from "expo-font";
import { FontAwesome, Entypo, Ionicons, AntDesign } from "@expo/vector-icons";
import { useCoupon, clearCoupon} from "@/store/coupon/couponActions";
import { createOrder } from "@/store/order/orderActions";
import { clearCart } from "@/store/cart/cartActions";
import { clearSelectedProduct } from '@/store/products/productsActions'
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
  const coupon = useSelector((state: RootState) => state.coupon.coupon);
  const [couponCode, setCouponCode] = useState("");

  const [origin, setOrigin] = useState({
    latitude: -12.074533,
    longitude: -77.083644,
  });
  const [destination, setDestination] = useState<LocationType>();
  const [currentLocation, setCurrentLocation] = useState<LocationType>();
  const [destinationAddress, setDestinationAddress] = useState("");

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
      return ""; // Return an empty string if location is undefined
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
    await navigation.navigate("(routes)/order/index");
    dispatch(clearCart());
    dispatch(clearCoupon())
  };

  let { initPaymentSheet, presentPaymentSheet } = useStripe();

  const onCheckout = async ({ cartId, couponId }: { cartId: string; couponId?: string }) => {
    try {
      const token = await _retrieveData({ key: "userToken" });
      if (!token) {
        Toast.show("Usuario no autenticado", { type: "danger" });
        return;
      }
      // 1. Crear el Payment Intent desde el backend
      const response = await axios.post(`${SERVER_URI}/payments`, { cartId, couponId }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response?.error) {
        console.log("Something went wrong", response.error);
        Toast.show("Hubo un problema al crear el Payment Intent", { type: "danger" });
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
        Toast.show("Pago cancelado o fallido", { type: "danger" });
        return;
      }
  
      // Si todo salió bien, mostramos un mensaje de éxito
      Toast.show("Pago realizado con éxito", { type: "success" });
      await dispatch(clearSelectedProduct())
      await newOrder();

      // Aquí puedes manejar la confirmación de éxito de la orden
      console.log("Payment successful!");
    } catch (error) {
      console.error("Error en el checkout:", error);
      Toast.show("Error en el proceso de pago", { type: "danger" });
    }
  };
  
  

  return (
    <LinearGradient
      colors={["#F9F6F7", "#F9F6F7"]}
      style={{ flex: 1, marginTop: 25 }}
    >
      <ScrollView>
        <View style={styles.top}>
          <Text style={styles.topText}>DIRECCIÓN DE ENTREGA</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <AntDesign
              name="close"
              size={28}
              color="#A1A1A1"
              style={styles.closeIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, marginTop: 15 }}>
          <Text
            style={{
              marginHorizontal: 10,
              fontFamily: "Geomanist Regular",
              fontSize: 18,
              color: "#A1A1A1",
            }}
          >
            Dónde deseas recibir tu pedido:
          </Text>
          <MapView
            style={{ height: 300, marginVertical: 15, marginHorizontal: 10 }}
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
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: 16,
            }}
          >
            <TextInput
              style={[styles.input, { color: "#A1A1A1" }]}
              keyboardType="default"
              value={couponCode}
              placeholder="CUPÓN DE DESCUENTO"
              onChangeText={setCouponCode}
            />
            <AntDesign
              style={{ position: "absolute", left: 10, top: 12 }}
              name="tago"
              size={20}
              color="#A1A1A1"
            />
            <TouchableOpacity
              style={{
                width: "30%",
                height: 45,
                justifyContent: "center",
                backgroundColor: couponCode ? "#A1A1A1" : "#cccccc", // Cambia el color si está deshabilitado
                borderTopRightRadius: 15,
                borderBottomRightRadius: 15,
              }}
              onPress={applyCoupon}
              disabled={!couponCode} // Deshabilitar si el campo está vacío
            >
              <Text
                style={{
                  textAlign: "center",
                  alignContent: "center",
                  color: "white",
                  fontFamily: "Cherione Regular",
                  fontSize: 16,
                }}
              >
                APLICAR
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ margin: 10, elevation: 0.8, borderColor: "#A1A1A1" }}>
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
                <Text style={styles.cartResume}>${totalPrice.toFixed(2)}</Text>
                {discountPercentage ? (
                  <Text style={styles.cartResume}>
                    ${discountPercentage?.toFixed(2)}
                  </Text>
                ) : (
                  <Text style={styles.cartResume}>${discount?.toFixed(2)}</Text>
                )}
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginHorizontal: 20,
                marginBottom: 10,
                justifyContent: "space-between",
                alignItems: "center",
                borderTopColor: "#A1A1A1",
                borderTopWidth: 0.5,
              }}
            >
              <Text style={styles.cartTotal}>TOTAL: </Text>
              {totalPrice && newPrice !== 0 ? (
                <Text style={styles.cartTotal}>${newPrice.toFixed(2)}</Text>
              ) : (
                <Text style={styles.cartTotal}>${totalPrice.toFixed(2)}</Text>
              )}
            </View>
          </View>
          <TouchableOpacity
  style={{
    flexDirection: "row",
    marginHorizontal: 20,
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: destinationAddress ? "#A1A1A1" : "#cccccc", // Cambia el color si está deshabilitado
    paddingVertical: 15,
    borderRadius: 10,
  }}
  onPress={() =>
    onCheckout({
      cartId: cart._id,
      ...(coupon?._id && { couponId: coupon._id }), // Solo incluye couponId si existe
    })
  }
  disabled={!destinationAddress} // Deshabilitar si destinationAddress está vacío
>
  <Text
    style={{
      color: "white",
      fontFamily: "Cherione Normal",
      fontSize: 16,
    }}
  >
    REALIZAR PEDIDO
  </Text>
</TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
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
  inputs: {
    marginBottom: 10,
    height: 45,
    borderColor: "#949494",
    borderWidth: 0.8,
    borderRadius: 5,
    padding: 10,
  },
  cartTotal: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
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
});

export default MapScreen;
