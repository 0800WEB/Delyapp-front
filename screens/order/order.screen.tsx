import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
  Button,
} from "react-native";
import { useEffect, useMemo, useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";

import MapView, { Marker, Polyline } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";
// import { GOOGLE_MAPS_APIKEY } from "@env";
import { GOOGLE_MAPS_APIKEY } from "@/utils/uri";

import { router } from "expo-router";
import { useFonts } from "expo-font";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import * as Notifications from 'expo-notifications';
import { readOrderStatus } from "@/store/order/orderActions";

type DrawerNavProp = DrawerNavigationProp<RootParamList>;

const OrderScreen: React.FC = () => {
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
  const navigation = useNavigation<DrawerNavProp>();
  const order = useSelector((state: RootState) => state.order.order);
  // console.log(order._id)

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(readOrderStatus(order._id));
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const fadeAnims = useRef(
    [...Array(5)].map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    Animated.stagger(
      200,
      fadeAnims.map((fadeAnim) =>
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        })
      )
    ).start();
  }, []);

  if(order.status === "pendiente"){
    Notifications.scheduleNotificationAsync({
      content: {
        title: "¡Tú Orden ha sido!",
        body: "Tu Orden está siendo procesada y pronto tendrás una actualización.",
      },
      trigger: null,
    });
  } else if (order.status === "confirmado"){
    Notifications.scheduleNotificationAsync({
      content: {
        title: "¡Tu Orden ha sido confirmada!",
        body: "Tu Orden ha sido confirmada y pronto será enviada.",
      },
      trigger: null,
    });
  }

  const goToHome = async () => {
    await Notifications.scheduleNotificationAsync({
        content: {
          title: "¡Has vuelto a casa!",
          body: "Aquí va el cuerpo de la notificación.",
        },
        trigger: null,
      });
    // navigation.navigate("Home");
  };

  return (
    <LinearGradient
      colors={["#F9F6F7", "#F9F6F7"]}
      style={{ flex: 1, marginTop: 25 }}
    >
      <View style={styles.top}>
        <Text style={styles.topText}>ESTADO DE LA ORDEN</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <AntDesign
            name="close"
            size={28}
            color="#A1A1A1"
            style={styles.closeIcon}
          />
        </TouchableOpacity>
      </View>
      {order && (
        <View style={styles.container}>
          <Animated.Text
            style={[styles.deliveryDetails, { opacity: fadeAnims[0] }]}
          >
            Dirección de Entrega:
          </Animated.Text>
          <Animated.Text
            style={[styles.deliveryStatus, { opacity: fadeAnims[1] }]}
          >
            {order.deliveryAddress}
          </Animated.Text>
          <Animated.Text
            style={[styles.deliveryDetails, { opacity: fadeAnims[2] }]}
          >
            Método de Pago:
          </Animated.Text>
          <Animated.Text
            style={[styles.deliveryStatus, { opacity: fadeAnims[3] }]}
          >
            {order.paymentMethod}
          </Animated.Text>
          <Animated.Text
            style={[styles.deliveryDetails, { opacity: fadeAnims[4] }]}
          >
            Valor del Pedido:
          </Animated.Text>
          <Animated.Text
            style={[styles.deliveryStatus, { opacity: fadeAnims[4] }]}
          >
            $ {order.totalPrice}
          </Animated.Text>
          <Animated.Text
            style={[styles.deliveryDetails, { opacity: fadeAnims[4] }]}
          >
            Dirección de Entrega:
          </Animated.Text>
          <Animated.Text
            style={[styles.deliveryStatus, { opacity: fadeAnims[4] }]}
          >
            {order.status}
          </Animated.Text>
          <Button title="Go to Home" onPress={goToHome} />
        </View>
      )}
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
  deliveryStatus: {
    fontFamily: "Geomanist Regular",
    color: "#A1A1A1",
    fontSize: 17,
  },
  container: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 15,
    justifyContent: "flex-start",
    gap: 15,
  },
  deliveryDetails: {
    fontFamily: "Cherione Bold",
    color: "#A1A1A1",
    fontSize: 14,
  },
});

export default OrderScreen;
