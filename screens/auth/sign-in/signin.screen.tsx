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
  Ionicons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import { responsiveWidth } from "react-native-responsive-dimensions";

import { Toast } from "react-native-toast-notifications";
import { useDispatch, useSelector } from "react-redux";
import { sign_in } from "@/store/user/authActions";
import { AppDispatch, RootState } from "@/store/store";

import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";



export default function SignInScreen() {
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
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [buttonSpinner, setButtonSpinner] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });  

  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<DrawerNavProp>();
  // const authState = useSelector((state: RootState) => state);
  // console.log(authState)

  if (!fontsLoaded && !fontError) {
    return null;
  }


  const handleSignIn = async () => {
    setButtonSpinner(true);
    const action = await dispatch(
      sign_in({ email: userInfo.email, password: userInfo.password })
    );
    if (sign_in.fulfilled.match(action)) {
      setButtonSpinner(false);
      Toast.show(`Bienvenido`, { type: "success" });
      navigation.navigate("HOME");
    } else if (sign_in.rejected.match(action)) {
      Toast.show("Ha ocurrido un error, vuelve a intentar", {
        type: "danger",
      });
      setButtonSpinner(false);
    }   
  };

  return (
    <LinearGradient
      colors={["#F9F6F7", "#F9F6F7"]}
      style={{ flex: 1, paddingTop: 30 }}
    >
      <Text style={styles.topText}>LOGEO</Text>
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
            { backgroundColor: "#F9F6F7", opacity: 0.67 },
          ]}
        />
        <View style={styles.inputContainer}>
          <View>
            <TextInput
              style={[styles.input, {}]}
              keyboardType="default"
              value={userInfo.email}
              placeholder="Nombre de Usuario"
              onChangeText={(value) =>
                setUserInfo({ ...userInfo, email: value })
              }
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
              style={[styles.input, { paddingTop: 0, paddingLeft: 35 }]}
              keyboardType="default"
              value={userInfo.password}
              secureTextEntry={!isPasswordVisible}
              placeholder="••••••••••"
              onChangeText={(value) =>
                setUserInfo({ ...userInfo, password: value })
              }
            />
            <TouchableOpacity
              style={styles.visibleIcon}
              onPress={() => setPasswordVisible(!isPasswordVisible)}
            >
              {isPasswordVisible ? (
                <Ionicons name="eye-off-outline" size={23} color={"#A1A1A1"} />
              ) : (
                <Ionicons name="eye-outline" size={23} color={"#A1A1A1"} />
              )}
            </TouchableOpacity>
            <SimpleLineIcons
              style={{ position: "absolute", left: 26, top: 12 }}
              name="lock"
              size={20}
              color="#A1A1A1"
            />
          </View>
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
              INGRESAR
            </Text>
          )}
        </TouchableOpacity>
      </View>
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
    marginTop: -180,
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
});
