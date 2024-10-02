import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign, FontAwesome, Fontisto } from "@expo/vector-icons";
import { useFonts } from "expo-font";
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
    "Aristotelica Pro Cdn Extralight": require("../../../assets/fonts/Aristotelica-pro-cdn-extralight.otf"),
    "Aristotelica Pro Display Extralight": require("../../../assets/fonts/Aristotelica-pro-display-extralight.otf"),
    "Aristotelica Pro Text Extralight": require("../../../assets/fonts/Aristotelica-pro-text-extralight.otf"),
    "Aristotelica Pro Display Bold": require("../../../assets/fonts/Aristotelica Pro Display Bold.otf"),
    "Aristotelica Pro Display Demibold": require("../../../assets/fonts/Aristotelica Pro Display Demibold.otf"),
    "Aristotelica Pro Display Hairline": require("../../../assets/fonts/Aristotelica Pro Display Hairline.otf"),
    "Aristotelica Pro Display Regular": require("../../../assets/fonts/Aristotelica Pro Display Regular.otf"),
    "Aristotelica Pro Display Thin": require("../../../assets/fonts/Aristotelica Pro Display Thin.otf"),
    "Aristotelica Pro Display Ft": require("../../../assets/fonts/AristotelicaProDisp-Ft.otf"),
    "Aristotelica Pro Display Hv": require("../../../assets/fonts/AristotelicaProDisp-Hv.otf"),
    "Aristotelica Pro Display Lt": require("../../../assets/fonts/AristotelicaProDisp-Lt.otf"),
    ...FontAwesome.font,
  });
  const navigation = useNavigation<DrawerNavProp>();
  const [buttonSpinner, setButtonSpinner] = useState(false);
  const [userData, setUserData] = useState<UserInfo>();
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const userStore = useSelector((state: RootState) => state.user.userInfo);
  // console.log(userStore)
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardStatus(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardStatus(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

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
        <Text style={[styles.topText, { marginTop: 2 }]}>EDITAR PERFIL</Text>
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
                placeholderTextColor={"#999"}
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
                placeholderTextColor={"#999"}
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
                placeholderTextColor={"#999"}
              />
            </View>
          </View>
          <TouchableOpacity onPress={handleUpdate} style={{marginTop: 15}}>
            {buttonSpinner ? (
              <ActivityIndicator
                size="small"
                color="#000024"
                style={{ marginVertical: "auto" }}
              />
            ) : (
              <LinearGradient
                colors={["#016AF5", "#08E6E7"]}
                style={{ margin: "auto", borderRadius: 25 }}
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
                      paddingVertical: 3,
                      paddingHorizontal: 20,
                    },
                  ]}
                >
                  ACTUALIZAR
                </Text>
              </LinearGradient>
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
    fontFamily: "Aristotelica Pro Display Regular",
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
    fontFamily: "Aristotelica Pro Display Regular",
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
    fontFamily: "Aristotelica Pro Display Regular",
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
