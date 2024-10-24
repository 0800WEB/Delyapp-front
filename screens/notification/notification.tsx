import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Header from "@/components/header/header";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/native";
import axios from "axios"; // Importamos axios
import { SERVER_URI } from "@/utils/uri";

type DrawerNavProp = DrawerNavigationProp<RootParamList>;

interface Banner {
  _id: string;
  name: string;
  image: string;
}

const BannerScreen: React.FC = () => {
  const navigation = useNavigation<DrawerNavProp>();
  const [banners, setBanners] = useState<Banner[]>([]);

  useEffect(() => {
    fetchBanners(); // Llamamos a la función para fetchear los banners al montar el componente
  }, [navigation]);

  const fetchBanners = async () => {
    try {
      const response = await axios.get(`${SERVER_URI}/banners`); // URL de tu API
      setBanners(response.data); // Guardamos los datos en el estado
    } catch (error) {
      console.error("Error fetching banners:", error);
    }
  };

  return (
    <LinearGradient
      colors={["#F9F6F7", "#F9F6F7"]}
      style={{ flex: 1, paddingTop: 30 }}
    >
      <Header
        openDrawer={() => navigation.dispatch(DrawerActions.openDrawer())}
      />
      <ScrollView>
        <ScrollView style={{paddingHorizontal:10}}>
        {banners && banners.map((item, index) => (
          <Image
            key={item._id}
            source={{ uri: item.image }}
            style={styles.imageStyle}
          />
        ))}
        </ScrollView>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    height: 130,
    width: "100%",
    borderRadius: 15,
    marginTop: 32,
  },
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 16,
    paddingTop: "15%",
  },
  navigationContainer: {
    backgroundColor: "#0D0D0D",
  },
  paragraph: {
    color: "#F9F6F7",
    padding: 16,
    fontSize: 18,
    textAlign: "center",
  },
  floatingButton: {
    position: "absolute",
    width: 70,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#A1A1A1",
    borderRadius: 35,
    zIndex: 100,
    shadowColor: "#54AB6A",
    shadowOffset: {
      width: 15,
      height: 15,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    right: 25,
    bottom: 25,
  },
  floatingButtonText: {
    marginLeft: -4,
  },
});

export default BannerScreen;
