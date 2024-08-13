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

import MapView, { Marker, Polyline } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";
import { GOOGLE_MAPS_APIKEY } from "@env";

import { router } from "expo-router";
import { useFonts } from "expo-font";
import { FontAwesome, Entypo, Ionicons, AntDesign } from "@expo/vector-icons";

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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [origin, setOrigin] = useState({
    latitude: -12.083305,
    longitude: -77.058817,
  });
  const [destination, setDestination] = useState({
    latitude: -12.074533,
    longitude: -77.083644,
  });
  const [address, setAddress] = useState("");
  const [originAddress, setOriginAddress] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    getLocationPermission();
  }, []);

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
    setDestination(current);
  };

  const getGeocode = async (address: string) => {
    let response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_MAPS_APIKEY}`
    );
    let data = await response.json();
    return data.results[0].geometry.location;
  };

  useEffect(() => {
    if (originAddress !== "") {
      getGeocode(originAddress).then((location) => {
        setOrigin({
          latitude: location.lat,
          longitude: location.lng,
        });
      });
    }
  }, [originAddress]);

  useEffect(() => {
    if (destinationAddress !== "") {
      getGeocode(destinationAddress).then((location) => {
        setDestination({
          latitude: location.lat,
          longitude: location.lng,
        });
      });
    }
  }, [destinationAddress]);

  return (
    <LinearGradient
      colors={["#F9F6F7", "#F9F6F7"]}
      style={{ flex: 1, marginTop: StatusBar.currentHeight }}
    >
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
          <Marker
            draggable={true}
            coordinate={origin}
            title={"title"}
            description={"description"}
            onDragEnd={(direction) => {
              setOrigin(direction.nativeEvent.coordinate);
            }}
          />
          <Marker
            draggable={true}
            coordinate={destination}
            title={"title"}
            description={"description"}
            onDragEnd={(direction) => {
              setDestination(direction.nativeEvent.coordinate);
            }}
          />
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="#000"
          />
        </MapView>
        <View style={{ marginHorizontal: 10 }}>
          <TextInput
            style={styles.inputs}
            value={originAddress}
            onChangeText={setOriginAddress}
            placeholder="Dirección de la tienda"
          />
          <TextInput
            style={styles.inputs}
            value={destinationAddress}
            onChangeText={setDestinationAddress}
            placeholder="Dirección del pedido"
          />
        </View>
      </View>
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
});

export default MapScreen;
