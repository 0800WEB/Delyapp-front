import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { AntDesign, FontAwesome, Fontisto } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { responsiveWidth } from "react-native-responsive-dimensions";

import { useDispatch, useSelector } from "react-redux";
import { update_user } from "@/store/user/authActions";
import { AppDispatch, RootState } from "../../../store/store";
import { useNavigation } from "@react-navigation/native";
import Header from "@/components/header/header";
import SearchInput from "@/components/search/searchInput";
import { DrawerActions } from "@react-navigation/native";

export default function UpdateAccountScreen() {
  let [fontsLoaded, fontError] = useFonts({
    "Cherione Bold": require("../../../assets/fonts/Cherione Bold.ttf"),
    "Cherione Normal": require("../../../assets/fonts/Cherione Normal.ttf"),
    "Cherione Light": require("../../../assets/fonts/Cherione Light.ttf"),
    "Cherione Regular": require("../../../assets/fonts/Cherione.otf"),
    "Geomanist Regular": require("../../../assets/fonts/Geomanist-Regular.otf"),
    "Geomanist Bold": require("../../../assets/fonts/Geomanist-Bold.otf"),
    "Geomanist Light": require("../../../assets/fonts/Geomanist-Light.otf"),
    "Geomanist Medium": require("../../../assets/fonts/Geomanist-Medium.otf"),
    "Geomanist Thin": require("../../../assets/fonts/Geomanist-Thin.otf"),
    "Geomanist ExtraLight": require("../../../assets/fonts/Geomanist-ExtraLight.otf"),
    "Geomanist Ultra": require("../../../assets/fonts/Geomanist-Ultra.otf"),
    ...FontAwesome.font,
  });
  const navigation = useNavigation<DrawerNavProp>();
  const [buttonSpinner, setButtonSpinner] = useState(false);
  const [userData, setUserData] = useState<UserInfo>();
  const userStore = useSelector((state: RootState) => state.user.userInfo);
  // console.log(userStore)

  useEffect(() => {
    if (userStore) {
      setUserData(userStore);
      setUserInfo({
        id: userData?.id,
        name: userData?.name,
        email: userData?.email,
        phone: userData?.phone,
      });
    }
  }, [userStore]);
  const [userInfo, setUserInfo] = useState({
    id: userData?.id,
    name: userData?.name,
    email: userData?.email,
    phone: userData?.phone,
  });

  const dispatch = useDispatch<AppDispatch>();

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const handleUpdate = async () => {
    if (userData) {
      dispatch(
        update_user({
          id: userData.id,
          name: userInfo.name,
          email: userInfo.email,
          phone: userInfo.phone,
        })
      );
    }
    setButtonSpinner(true);
    router.back();
    setTimeout(() => {
      setButtonSpinner(false);
    }, 2000);
  };

  return (
    <View style={{ flex: 1, marginTop: 26 }}>
      <Header
        openDrawer={() => navigation.dispatch(DrawerActions.openDrawer())}
      />
      <SearchInput homeScreen={true} />
      <View style={styles.top}>
        <Text style={[styles.topText, { marginTop: 2 }]}>
          EDITAR PERFIL
        </Text>
        <TouchableOpacity onPress={() => router.back()}>
          <AntDesign
            name="close"
            size={20}
            color="#000024"
            style={{ height: 40, aspectRatio: 1 }}
          />
        </TouchableOpacity>
      </View>
      {userData && (
        <View
          style={{
            backgroundColor: "#F9F6F7",
            flex: 1,
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={require("@/assets/images/ICONOS-01.png")}
            style={[
              styles.signInImage,
              { backgroundColor: "transparent", opacity: 0.67 },
            ]}
          />
          <View style={styles.inputContainer}>
            <View>
              <TextInput
                style={[styles.input]}
                keyboardType="default"
                value={userInfo.name}
                placeholder={userData?.name}
                onChangeText={(value) =>
                  setUserInfo({ ...userInfo, name: value })
                }
              />
            </View>
            <View>
              <TextInput
                style={[styles.input, {}]}
                keyboardType="email-address"
                value={userInfo.email}
                placeholder={userData?.email}
                onChangeText={(value) =>
                  setUserInfo({ ...userInfo, email: value })
                }
                editable={false}
              />
            </View>
            <View>
              <TextInput
                style={[styles.input, {}]}
                keyboardType="number-pad"
                value={userInfo.phone}
                placeholder={userData.phone}
                onChangeText={(value) =>
                  setUserInfo({ ...userInfo, phone: value })
                }
              />
            </View>
          </View>
          <TouchableOpacity
            style={[
              styles.button3,
              { paddingLeft: -35, marginHorizontal: 32, marginTop: 20 },
            ]}
          >
            {buttonSpinner ? (
              <ActivityIndicator
              size="small"
              color="#016AF5"
              style={{ marginVertical: "auto" }}
              />
            ) : (
              <View style={styles.buttonWrapper}>
              <Image
                source={require("@/assets/images/BUTTON.png")}
                style={styles.button2}
              />
              <Text
                onPress={handleUpdate}
                style={[
                  {
                    fontFamily: "Geomanist Regular",
                    color: "white",
                    fontSize: 19,
                  },
                ]}
              >
                ACTUALIZAR
              </Text>
            </View>
            )}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

export const styles = StyleSheet.create({
  checkboxContainer: {
    backgroundColor: "#f9f9f9",
    borderWidth: 0,
    marginTop: -5,
    marginLeft: 25,
    width: "80%",
    textAlign: "left",
    padding: 0,
  },
  checkboxText: {
    color: "#A1A1A1",
    fontSize: 12,
    fontFamily: "Geomanist Regular",
  },
  imageContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  inputContainer: {
    marginHorizontal: 16,
    marginTop: -40,
    marginBottom: 10,
    rowGap: 20,
  },
  input: {
    height: 40,
    marginHorizontal: 16,
    borderRadius: 25,
    borderColor: "#A1A1A1",
    borderWidth: 0.4,
    fontSize: 16,
    alignContent: "center",
    fontFamily: "Geomanist Regular",
    backgroundColor: "white",
    color: "#000024",
    textAlign: "center",
  },
  button: {
    height: 40,
    marginHorizontal: 16,
    borderRadius: 25,
    borderColor: "#A1A1A1",
    borderWidth: 0.8,
    paddingLeft: 35,
    backgroundColor: "#A1A1A1",
  },
  signInImage: {
    aspectRatio: 1,
    height: 100,
    alignSelf: "center",
    marginTop: -120,
    marginBottom: 90,
  },
  buttonText: {
    color: "white",
    textAlign: "left",
    marginTop: 11,
    fontSize: 16,
    fontFamily: "Geomanist Regular",
  },
  welcomeButtonStyle: {
    flex: 1,
    backgroundColor: "transparent",
    width: "25%",
    alignSelf: "flex-end",
    borderRadius: 15,
    bottom: 28,
  },
  dotStyle: {
    display: "flex",
    justifyContent: "flex-end",
    alignContent: "flex-end",
    alignItems: "flex-end",
    backgroundColor: "transparent",
    left: responsiveWidth(-35),
    width: 10,
    height: 10,
    borderRadius: 5,
    borderColor: "white",
    borderWidth: 1,
    bottom: -5,
  },
  activeDotStyle: {
    display: "flex",
    justifyContent: "flex-end",
    alignContent: "flex-end",
    alignItems: "flex-end",
    backgroundColor: "white",
    left: responsiveWidth(-35),
    width: 10,
    height: 10,
    borderRadius: 5,
    bottom: -5,
  },
  visibleIcon: {
    position: "absolute",
    right: 30,
    top: 11,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    top: 60,
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
