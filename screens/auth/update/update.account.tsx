import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  AntDesign,
  FontAwesome,
  Fontisto,
} from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { responsiveWidth } from "react-native-responsive-dimensions";

import { Toast } from "react-native-toast-notifications";
import { useDispatch, useSelector } from "react-redux";
import { update_user } from "@/store/user/authActions";
import { AppDispatch, RootState } from "../../../store/store";

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
  const [buttonSpinner, setButtonSpinner] = useState(false);
  const [userData, setUserData] = useState<UserInfo | null>(null);
  const userStore = useSelector((state: RootState) => state.user.userInfo);

  useEffect(() => {
    if (userStore) {
      setUserData(userStore);
      setUserInfo({
        name: userData?.name,
        email: userData?.email,
        phone: userData?.phone,
        address: '',
      });
    }
  }, [userStore]);
  const [userInfo, setUserInfo] = useState({
    name: userData?.name,
    email: userData?.email,
    phone: userData?.phone,
    address: '',
  }); 

  const dispatch = useDispatch<AppDispatch>();

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const handleSignIn = async () => {
    console.log("userInfo: ", userInfo);
    if (userData) {
      console.log("userData: ", userData);
    }
    setButtonSpinner(true);
    //   dispatch(sign_up({
    //     name: userInfo.name,
    //     email: userInfo.email,
    //     password: userInfo.password,
    //     phone: userInfo.phone,
    //     ageVerified: userInfo.ageVerified,
    //   }));
    setTimeout(() => {
      setButtonSpinner(false);
    }, 2000);
  };

  return (
    <LinearGradient
      colors={["#F9F6F7", "#F9F6F7"]}
      style={{ flex: 1, paddingTop: 30 }}
    >
      <Text style={styles.topText}>ACTUALIZAR PERFIL</Text>
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
            source={require("@/assets/images/CHARRO_NEGRO-03.png")}
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
                value={userData.name}
                placeholder={userData.name}
                onChangeText={(value) =>
                  setUserInfo({ ...userInfo, name: value })
                }
                editable={false}
              />
              <AntDesign
                style={{ position: "absolute", left: 26, top: 12 }}
                name="user"
                size={20}
                color="#A1A1A1"
              />
            </View>
            <View>
              <TextInput
                style={[styles.input, {}]}
                keyboardType="email-address"
                value={userData.email}
                placeholder={userData.email}
                onChangeText={(value) =>
                  setUserInfo({ ...userInfo, email: value })
                }
                editable={false}
              />
              <Fontisto
                style={{ position: "absolute", left: 26, top: 12 }}
                name="email"
                size={20}
                color="#A1A1A1"
              />
            </View>
            <View>
              <TextInput
                style={[styles.input, {}]}
                keyboardType="number-pad"
                value={userData.phone}
                placeholder={userData.phone}
                onChangeText={(value) =>
                  setUserInfo({ ...userInfo, phone: value })
                }
                editable={false}
              />
              <AntDesign
                style={{ position: "absolute", left: 26, top: 12 }}
                name="phone"
                size={20}
                color="#A1A1A1"
              />
            </View>
            {userData.address ? (
              <View>
                <TextInput
                  style={[styles.input, {}]}
                  keyboardType="default"
                  value={userData.address}
                  placeholder={userData.address}
                  onChangeText={(value) =>
                    setUserInfo({ ...userInfo, address: value })
                  }
                />
                <FontAwesome
                  style={{ position: "absolute", left: 26, top: 12 }}
                  name="map"
                  size={20}
                  color="#A1A1A1"
                />
              </View>
            ) : (
              <View>
                <TextInput
                  style={[styles.input, {}]}
                  keyboardType="default"
                  value={userData.address}
                  placeholder="Establece una Dirección"
                  onChangeText={(value) =>
                    setUserInfo({ ...userInfo, address: value })
                  }
                />
                <FontAwesome
                  style={{ position: "absolute", left: 26, top: 12 }}
                  name="map"
                  size={20}
                  color="#A1A1A1"
                />
              </View>
            )}
          </View>
          <TouchableOpacity
            style={[
              styles.button,
              { paddingLeft: -35, marginHorizontal: 32, marginTop: 20 },
            ]}
          >
            {buttonSpinner ? (
              <ActivityIndicator
                size="small"
                color="white"
                style={{ marginVertical: "auto" }}
              />
            ) : (
              <Text
                style={[
                  {
                    color: "white",
                    marginTop: 11,
                    fontSize: 16,
                    fontFamily: "Cherione Regular",
                    textAlign: "center",
                  },
                ]}
                onPress={handleSignIn}
              >
                ACTUALIZAR
              </Text>
            )}
          </TouchableOpacity>
        </View>
      )}
    </LinearGradient>
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
    rowGap: 20,
  },
  input: {
    height: 45,
    marginHorizontal: 16,
    borderRadius: 15,
    borderColor: "#A1A1A1",
    borderWidth: 0.8,
    paddingLeft: 35,
    fontSize: 16,
    fontFamily: "Geomanist Regular",
    backgroundColor: "white",
    color: "#A1A1A1",
  },
  button: {
    height: 45,
    marginHorizontal: 16,
    borderRadius: 15,
    borderColor: "#A1A1A1",
    borderWidth: 0.8,
    paddingLeft: 35,
    backgroundColor: "#A1A1A1",
  },
  signInImage: {
    width: "60%",
    height: 250,
    alignSelf: "center",
    marginTop: -85,
  },
  topText: {
    display: "flex",
    paddingTop: 15,
    paddingBottom: 8,
    paddingLeft: 15,
    fontFamily: "Geomanist Regular",
    borderBottomColor: "#949494",
    borderBottomWidth: 1,
    color: "#949494",
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
});