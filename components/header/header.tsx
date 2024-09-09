import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import {
  SimpleLineIcons,
  Entypo,
  AntDesign,
  FontAwesome,
} from "@expo/vector-icons";
import { useFonts } from "expo-font";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { _retrieveData } from "@/utils/util";
import { UserInfo } from "../../store/user/userReducer";
import { RootState } from "@/store/store";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/native";

type DrawerNavProp = DrawerNavigationProp<RootParamList>;
interface HeaderProps {
  openDrawer: () => void;
}

const Header: React.FC<HeaderProps> = ({ openDrawer }) => {
  const [userData, setUserData] = useState<UserInfo | null>(null);
  const [fontsLoaded, fontError] = useFonts({
    "Cherione Bold": require("../../assets/fonts/Cherione Bold.ttf"),
    "Cherione Regular": require("../../assets/fonts/Cherione.otf"),
  });
  const navigation = useNavigation<DrawerNavProp>();

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const cartItems = useSelector((state: RootState) => state.cart.cart.products);

  useEffect(() => {
    if (userInfo) {
      setUserData(userInfo);
    }
  }, [userInfo]);

  return (
    <View style={styles.headerStyle}>
      <TouchableOpacity onPress={openDrawer}>
        <SimpleLineIcons
          name="menu"
          size={28}
          color="white"
          style={{ alignSelf: "center" }}
        />
      </TouchableOpacity>
      {userData && <Text style={styles.userText}>{userData.name}</Text>}
      <View style={{ flexDirection: "row", gap: 15 }}>
        <TouchableOpacity
          onPress={() => Linking.openURL("https://www.facebook.com")}
          style={{ marginLeft: -35 }}
        >
          <FontAwesome name="whatsapp" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("CARRITO")}>
          <Entypo
            name="shopping-cart"
            size={30}
            color="white"
            style={{ alignSelf: "center", marginLeft: -5 }}
          />
          {cartItems.length > 0 && (
            <View>
              <Text
                style={{
                  color: "white",
                  fontSize: 10,
                  top: -38,
                  right: -10,
                  backgroundColor: "#00BFFF",
                  paddingHorizontal: 0,
                  paddingVertical: 6,
                  borderRadius: 15,
                  textAlign: "center",
                }}
              >
                {cartItems.length}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    flexDirection: "row",
    paddingTop: 15,
    paddingHorizontal: 15,
    justifyContent: "space-between",
    backgroundColor: "#000024",
    height: 60,
  },
  userText: {
    fontFamily: "Cherione Regular",
    fontSize: 18,
    color: "white",
    alignSelf: "center",
    textAlign: "center",
    marginTop: -15,
  },
  profilePhoto: {
    height: 30,
    width: 30,
    backgroundColor: "white",
    borderRadius: 30,
    alignSelf: "center",
  },
});

export default Header;
