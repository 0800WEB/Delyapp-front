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
      <TouchableOpacity onPress={openDrawer} style={{zIndex: 2}}>
        <SimpleLineIcons
          name="menu"
          size={30}
          color="white"
          style={{ alignSelf: "center" }}
        />
      </TouchableOpacity>
      {/* {userData && <Text style={styles.userText}>{userData.name.toUpperCase()}</Text>} */}
      <View style={{ flexDirection: "row", gap: 15 }}>
        <TouchableOpacity
          onPress={() => Linking.openURL("https://www.facebook.com")}
          style={{ marginLeft: -35 }}
        >
          <FontAwesome name="whatsapp" size={34} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("CARRITO")}>
          <Entypo
            name="shopping-cart"
            size={33}
            color="white"
            style={{ alignSelf: "center", marginLeft: -5 }}
          />
          {cartItems.length > 0 && (
            <View style={{
              borderRadius: 15,
              backgroundColor: "#00BFFF",
              display: "flex",
              justifyContent:"center",
              alignItems:"center",
              width: 20,
              height: 20,
              position: "absolute",
                  top: -10,
                  right: -10,
            }}>
              <Text
                style={{
                  color: "white",
                  fontSize: 15,
                  
                  
                  borderRadius: 15,
                  textAlign: "center",
                  fontFamily: "Aristotelica Pro Display Regular",
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
    fontFamily: "Aristotelica Pro Display Regular",
    fontSize: 15,
    color: "white",
    width: "100%",
    alignSelf: "center",
    textAlign: "center",
    position: "absolute",
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
