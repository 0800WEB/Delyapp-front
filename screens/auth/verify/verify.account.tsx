import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
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
import React, { useRef, useState, useEffect } from "react";
import { welcomeIntroSwipperData } from "@/constants/constants";
import AppIntroSlider from "react-native-app-intro-slider";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import DateTimePicker from "@react-native-community/datetimepicker";
import { CheckBox } from "react-native-elements";

import { Toast } from "react-native-toast-notifications";
import { SERVER_URI } from "@/utils/uri";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { verify_code, re_verify_code } from "@/store/user/authActions";
import { AppDispatch, RootState } from "../../../store/store";

export default function VerifyAccountScreen() {
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
  if (!fontsLoaded && !fontError) {
    return null;
  }
  const [code, setCode] = useState(new Array(4).fill(""));
  const [email, setEmail] = useState("");
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const inputs = useRef<any>([...Array(4)].map(() => React.createRef()));

  const handleInput = (text: any, index: any) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 3) {
      inputs.current[index + 1].current.focus();
    }

    if (text === "" && index > 0) {
      inputs.current[index - 1].current.focus();
    }
  };
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
  const dispatch = useDispatch<AppDispatch>();
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  // if (userInfo && typeof userInfo === 'object' && userInfo.hasOwnProperty('email')) {
  //   console.log("UserInfo: ", userInfo.email);
  // } else {
  //   console.log("userInfo is not an object with an email property");
  // }
  useEffect(() => {
    if (userInfo) {
      if (typeof userInfo === "string") {
        const correo = JSON.parse(userInfo);
        setEmail(correo.email);
      } else if (userInfo.email) {
        setEmail(userInfo.email);
      }
    }
  }, [userInfo]);

  const handleSumbit = async () => {
    const otp = code.join("");
    dispatch(verify_code({ email, code: otp }));
  };
  console.log("Email: ", email);

  const handleResend = async () => {
    dispatch(re_verify_code({ email }));
  };

  return (
    <LinearGradient
      colors={["#F9F6F7", "#F9F6F7"]}
      style={{ flex: 1, paddingTop: 30 }}
    >
      <Text style={styles.topText}>VERIFICACIÓN</Text>
      <View style={[styles.container]}>
        <Text style={styles.headerText}>CÓDIGO DE VERIFICACIÓN</Text>
        <Text style={styles.subText}>
          Te hemos mandando un código de verificación a tu correo electrónico
        </Text>
        <View style={[styles.inputContainer, { marginLeft: 10 }]}>
          {code && code?.map((_, index) => (
            <TextInput
              key={index}
              style={styles.inputBox}
              keyboardType="number-pad"
              maxLength={1}
              onChangeText={(text) => handleInput(text, index)}
              value={code[index]}
              ref={inputs.current[index]}
              autoFocus={index === 0}
              placeholderTextColor={"#999"}
            />
          ))}
        </View>
        <TouchableOpacity style={{ marginTop: 15 }} onPress={handleSumbit}>
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
              VERIFICAR
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        <View style={styles.loginLink}>
          <Text style={[styles.subText, { fontFamily: "Aristotelica Pro Display Lt" }]}>
            No me llega el código.
          </Text>
          <TouchableOpacity onPress={handleResend}>
            <Text
              style={[styles.loginText, { fontFamily: "Aristotelica Pro Display Lt" }]}
            >
              Reenviar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 45,
    borderRadius: 15,
    borderColor: "#A1A1A1",
    borderWidth: 0.8,
    backgroundColor: "#A1A1A1",
    marginHorizontal: 32,
    marginTop: 15,
    width: "70%",
  },
  topText: {
    display: "flex",
    paddingTop: 15,
    paddingBottom: 8,
    paddingLeft: 15,
    fontFamily: "Geomanist Regular",
    borderBottomColor: "#949494",
    borderBottomWidth: 1,
    color: "white",
    backgroundColor: "#000024",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 13,
    backgroundColor: "#fff",
    color: "#949494",
  },
  headerText: {
    fontSize: 22,
    fontFamily: "Cherione Normal",
    color: "#949494",
    marginBottom: 10,
    marginTop: -40,
  },
  subText: {
    fontSize: 16,
    color: "#949494",
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Geomanist Regular",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 20,
  },
  inputBox: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: "#ddd",
    textAlign: "center",
    marginRight: 10,
    borderRadius: 10,
    fontSize: 20,
  },
  loginLink: {
    flexDirection: "row",
    marginTop: 30,
  },
  loginText: {
    color: "#3876EE",
    marginLeft: 5,
    fontSize: 16,
  },
  backText: { fontSize: 16 },
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
});
