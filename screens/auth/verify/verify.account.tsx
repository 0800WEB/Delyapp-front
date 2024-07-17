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
import React, { useRef, useState } from "react";
import { welcomeIntroSwipperData } from "@/constants/constants";
import AppIntroSlider from "react-native-app-intro-slider";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import DateTimePicker from "@react-native-community/datetimepicker";
import { CheckBox } from "react-native-elements";

import { Toast } from "react-native-toast-notifications";

export default function VerifyAccountScreen() {
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
  if (!fontsLoaded && !fontError) {
    return null;
  }
  const [code, setCode] = useState(new Array(4).fill(""));

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

  const handleSumbit = async () => {
    const otp = code.join("");
    // const activation_token = await AsyncStorage.getItem("activation_token");

    // await axios
    //   .post(`${SERVER_URI}/activate-user`, {
    //     activation_token,
    //     activation_code: otp,
    //   })
    //   .then((res: any) => {
    //     Toast.show("Your account activated successfully!", {
    //       type: "success",
    //     });
    //     setCode(new Array(4).fill(""));
    //     router.push("/(routes)/login");
    //   })
    //   .catch((error) => {
    //     Toast.show("Your OTP is not valid or expired!", {
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
      <View style={styles.container}>
        <Text style={styles.headerText}>CÓDIGO DE VERIFICACIÓN</Text>
        <Text style={styles.subText}>
          Te hemos mandando un código de verificación a tu correo electrónico
        </Text>
        <View style={styles.inputContainer}>
          {code.map((_, index) => (
            <TextInput
              key={index}
              style={styles.inputBox}
              keyboardType="number-pad"
              maxLength={1}
              onChangeText={(text) => handleInput(text, index)}
              value={code[index]}
              ref={inputs.current[index]}
              autoFocus={index === 0}
            />
          ))}
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
            onPress={() => router.push("/(routes)/sign-in")}
          >
            VERIFICAR
          </Text>
        </TouchableOpacity>
        {/* <View style={styles.loginLink}>
          <Text style={[styles.backText, { fontFamily: "Nunito_700Bold" }]}>
            Back To?
          </Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={[styles.loginText, { fontFamily: "Nunito_700Bold" }]}>
              Sign In
            </Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 45,
    width: "70%",
    marginHorizontal: 16,
    borderRadius: 15,
    borderColor: "#A1A1A1",
    borderWidth: 0.8,
    paddingLeft: 35,
    backgroundColor: "#A1A1A1",
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
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
    color: "#949494",
  },
  headerText: {
    fontSize: 22,
    fontFamily: "Cherione Normal",
    color: "#949494",
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    color: "#949494",
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Geomanist Regular",
  },
  inputContainer: {
    flexDirection: "row",
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
});
