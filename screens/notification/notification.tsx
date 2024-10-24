import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Header from "@/components/header/header";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/native";
import axios from "axios";
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

  const fetchBanners = async () => {
    try {
      const response = await axios.get(`${SERVER_URI}/banners`);
      setBanners(response.data);
    } catch (error) {
      console.error("Error fetching banners:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchBanners(); // Hacemos el fetch solo cuando la pantalla está en foco
    }, [])
  );

  return (
    <LinearGradient
      colors={["#F9F6F7", "#F9F6F7"]}
      style={{ flex: 1, paddingTop: 30 }}
    >
      <Header
        openDrawer={() => navigation.dispatch(DrawerActions.openDrawer())}
      />
      <ScrollView>
        <ScrollView style={{ paddingHorizontal: 10 }}>
          {banners && banners.map((item) => (
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
});

export default BannerScreen;
