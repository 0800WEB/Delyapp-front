import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
  Platform,
} from "react-native";
import {
  AntDesign,
  Entypo,
  FontAwesome,
  Fontisto,
  Ionicons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { transform } from "@babel/core";
import React, { useState } from "react";
import { welcomeIntroSwipperData } from "@/constants/constants";
import AppIntroSlider from "react-native-app-intro-slider";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import DateTimePicker from "@react-native-community/datetimepicker";
import { CheckBox } from "react-native-elements";

import { Toast } from "react-native-toast-notifications";

export default function SignUpScreen() {
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
    name: "",
    email: "",
    phone: "",
    birthDate: "",
    password: "",
  });
  const [required, setRequired] = useState("");
  const [error, setError] = useState({
    password: "",
  });
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setUserInfo({
      ...userInfo,
      birthDate: currentDate.toISOString(),
    });
    setDate(currentDate);
  };
  const showMode = (currentMode: "date" | "time") => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };
  if (!fontsLoaded && !fontError) {
    return null;
  }

  const handlePasswordValidation = (value: string) => {
    const password = value;
    const passwordSpecialCharacter = /(?=.*[!@#$&*])/;
    const passwordOneNumber = /(?=.*[0-9])/;
    const passwordSixValue = /(?=.{6,})/;

    if (!passwordSpecialCharacter.test(password)) {
      setError({
        ...error,
        password: "Write at least one special character",
      });
      setUserInfo({ ...userInfo, password: "" });
    } else if (!passwordOneNumber.test(password)) {
      setError({
        ...error,
        password: "Write at least one number",
      });
      setUserInfo({ ...userInfo, password: "" });
    } else if (!passwordSixValue.test(password)) {
      setError({
        ...error,
        password: "Write at least 6 characters",
      });
      setUserInfo({ ...userInfo, password: "" });
    } else {
      setError({
        ...error,
        password: "",
      });
      setUserInfo({ ...userInfo, password: value });
    }
  };

  const handleSignIn = async () => {
    setButtonSpinner(true);
    // await axios
    //   .post(`${SERVER_URI}/registration`, {
    //     name: userInfo.name,
    //     email: userInfo.email,
    //     password: userInfo.password,
    //   })
    //   .then(async (res) => {
    //     await AsyncStorage.setItem(
    //       "activation_token",
    //       res.data.activationToken
    //     );
    //     Toast.show(res.data.message, {
    //       type: "success",
    //     });
    //     setUserInfo({
    //       name: "",
    //       email: "",
    //       password: "",
    //     });
    //     setButtonSpinner(false);
    //     router.push("/(routes)/verifyAccount");
    //   })
    //   .catch((error) => {
    //     setButtonSpinner(false);
    //     Toast.show("Email already exist!", {
    //       type: "danger",
    //     });
    //   });
  };

  return (
    <LinearGradient
      colors={["#F9F6F7", "#F9F6F7"]}
      style={{ flex: 1, paddingTop: 30 }}
    >
      <Text style={styles.topText}>REGISTRO</Text>
      <ScrollView
        style={{ backgroundColor: "#F9F6F7", flex: 1, alignContent: "center" }}
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
              value={userInfo.name}
              placeholder="Nombre de Usuario"
              onChangeText={(value) =>
                setUserInfo({ ...userInfo, name: value })
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
              style={[styles.input, {}]}
              keyboardType="email-address"
              value={userInfo.email}
              placeholder="Correo Electrónico"
              onChangeText={(value) =>
                setUserInfo({ ...userInfo, email: value })
              }
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
              value={userInfo.phone}
              placeholder="Número de Teléfono"
              onChangeText={(value) =>
                setUserInfo({ ...userInfo, phone: value })
              }
            />
            <AntDesign
              style={{ position: "absolute", left: 26, top: 12 }}
              name="phone"
              size={20}
              color="#A1A1A1"
            />
          </View>
          <View>
            <TouchableOpacity style={styles.button} onPress={showDatepicker}>
              <Text style={styles.buttonText}>Fecha de Nacimiento</Text>
            </TouchableOpacity>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={"date"}
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}
            <AntDesign
              style={{ position: "absolute", left: 26, top: 12 }}
              name="calendar"
              size={20}
              color="white"
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
          <CheckBox
            title="Acepto los términos y condiciones para el uso de la aplicación"
            checked={termsAccepted}
            onPress={() => setTermsAccepted(!termsAccepted)}
            containerStyle={styles.checkboxContainer}
            textStyle={styles.checkboxText}
            checkedColor="#A1A1A1"
            uncheckedColor="#A1A1A1"
          />
          <CheckBox
            title="He leído y estoy de acuerdo con el aviso de privacidad"
            checked={privacyAccepted}
            onPress={() => setPrivacyAccepted(!privacyAccepted)}
            containerStyle={styles.checkboxContainer}
            textStyle={styles.checkboxText}
            checkedColor="#A1A1A1"
            uncheckedColor="#A1A1A1"
          />
        </View>
        <TouchableOpacity style={[styles.button, {paddingLeft: -35, marginHorizontal: 32, marginTop: 15}]}>
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
            onPress={() => router.push("/(routes)/verify-account")}
          >
            REGISTRARSE
          </Text>
        </TouchableOpacity>
      </ScrollView>
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
    marginTop: -40,
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
