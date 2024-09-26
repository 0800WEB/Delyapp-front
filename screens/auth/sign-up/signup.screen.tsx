import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import { Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { responsiveWidth } from "react-native-responsive-dimensions";
import DateTimePicker from "@react-native-community/datetimepicker";
import { CheckBox } from "react-native-elements";

import { Toast } from "react-native-toast-notifications";
import { useDispatch, useSelector } from "react-redux";
import { sign_up } from "@/store/user/authActions";
import { AppDispatch } from "../../../store/store";

export default function SignUpScreen() {
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
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [buttonSpinner, setButtonSpinner] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    ageVerified: false,
  });
  const [error, setError] = useState({
    password: "",
  });
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [dateChanged, setDateChanged] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const authState = useSelector((state: { user: AuthState }) => state.user);

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

  function isOver18(birthDate: Date) {
    const currentDate = new Date();
    currentDate.setFullYear(currentDate.getFullYear() - 18);
    return birthDate < currentDate;
  }
  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDateChanged(true);
    const over18: boolean = isOver18(currentDate);
    setUserInfo({
      ...userInfo,
      ageVerified: over18,
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

  let formattedDate = date.toISOString().split("T")[0];

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
        password: "Usa al menos un caracter especial",
      });
      setUserInfo({ ...userInfo, password: "" });
    } else if (!passwordOneNumber.test(password)) {
      setError({
        ...error,
        password: "Usa al menos un número",
      });
      setUserInfo({ ...userInfo, password: "" });
    } else if (!passwordSixValue.test(password)) {
      setError({
        ...error,
        password: "La contraseña debe contener 6 caracteres como mínimo",
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
    if (!userInfo.name) {
      Toast.show("El nombre es requerido", {
        type: "danger",
      });
      return;
    }

    if (!userInfo.email || !/\S+@\S+\.\S+/.test(userInfo.email)) {
      Toast.show("El email es requerido o no es válido", {
        type: "danger",
      });
      return;
    }

    if (!userInfo.phone || userInfo.phone.length < 9) {
      Toast.show("El teléfono es requerido o no es válido", {
        type: "danger",
      });
      return;
    }

    if (!userInfo.ageVerified) {
      Toast.show("La edad debe ser mayor de 18 años", {
        type: "danger",
      });
      return;
    }

    if (!termsAccepted || !privacyAccepted) {
      Toast.show(
        "Debe aceptar los términos y condiciones y el aviso de privacidad",
        {
          type: "danger",
        }
      );
      return;
    }

    if (!userInfo.password || error.password !== "") {
      Toast.show("Hay un problema con la contraseña", {
        type: "danger",
      });
      return;
    }

    setButtonSpinner(true);
    dispatch(
      sign_up({
        name: userInfo.name,
        email: userInfo.email,
        password: userInfo.password,
        phone: userInfo.phone,
        ageVerified: userInfo.ageVerified,
      })
    ).catch((error) => {
      // Crear un objeto de error personalizado con solo las propiedades serializables
      const serializableError = {
        name: error.name,
        message: error.message,
      };
      // Lanzar el error serializable
      throw serializableError;
    });
    setTimeout(() => {
      setButtonSpinner(false);
    }, 3000);
  };

  return (
    <LinearGradient
      colors={["#F9F6F7", "#F9F6F7"]}
      style={{ flex: 1, paddingTop: 30 }}
    >
      <Text style={styles.topText}>REGISTRO</Text>
      <ScrollView style={{ flex: 1, alignContent: "center", zIndex: 2 }}>
        <Image
          source={require("@/assets/images/ICONOS-01.png")}
          style={[styles.signInImage, { transform: [{ scale: 0.4 }] }]}
        />
        <View style={styles.inputContainer}>
          <View>
            <TextInput
              style={[styles.input, {}]}
              keyboardType="default"
              value={userInfo.name}
              placeholder="Nombre"
              placeholderTextColor={"#999"}
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
              placeholder="Correo Electrónico"
              placeholderTextColor={"#999"}
              onChangeText={(value) =>
                setUserInfo({ ...userInfo, email: value })
              }
            />
          </View>
          <View>
            <TextInput
              style={[styles.input, {}]}
              placeholderTextColor={"#999"}
              keyboardType="number-pad"
              value={userInfo.phone}
              placeholder="Teléfono"
              onChangeText={(value) =>
                setUserInfo({ ...userInfo, phone: value })
              }
            />
          </View>
          <View>
            <TouchableOpacity style={styles.button} onPress={showDatepicker}>
              {dateChanged !== false ? (
                <Text style={styles.buttonText}>{formattedDate}</Text>
              ) : (
                <Text style={styles.buttonText}>Fecha de Nacimiento</Text>
              )}
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
          </View>
          <View>
            <TextInput
              style={[styles.input, { paddingTop: 0 }]}
              keyboardType="default"
              secureTextEntry={!isPasswordVisible}
              defaultValue=""
              placeholder="••••••••••"
              onChangeText={handlePasswordValidation}
              placeholderTextColor={"#999"}
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

            {error.password && (
              <View style={[styles.errorContainer, { top: 10 }]}>
                <Entypo name="cross" size={18} color={"red"} />
                <Text style={{ color: "red", fontSize: 11, marginTop: -1 }}>
                  {error.password}
                </Text>
              </View>
            )}
          </View>
          <View
            style={{ marginHorizontal: 10, backgroundColor:"rgba(249, 246, 247, 0.8)", borderRadius:25, paddingHorizontal: 10 }}
          >
            <TouchableOpacity
              style={[styles.radioButton, { marginTop: 10 }]}
              onPress={() => setTermsAccepted(!termsAccepted)}
            >
              <View
                style={[
                  styles.radioCircle,
                  termsAccepted && styles.selectedRadioCircle,
                ]}
              />
              <Text
                style={{
                  fontFamily: "Aristotelica Pro Display Lt",
                  color: "#000024",
                  fontSize: 14,
                  textAlign: "left",
                  marginLeft: 10,
                }}
              >
                Acepto los términos y condiciones para el uso de la aplicación
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.radioButton}
              onPress={() => setPrivacyAccepted(!privacyAccepted)}
            >
              <View
                style={[
                  styles.radioCircle,
                  privacyAccepted && styles.selectedRadioCircle,
                ]}
              />
              <Text
                style={{
                  fontFamily: "Aristotelica Pro Display Lt",
                  color: "#000024",
                  fontSize: 14,
                  textAlign: "left",
                  marginLeft: 10,
                }}
              >
                He leído y estoy de acuerdo con el aviso de privacidad
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={[
            {marginTop: 20 }
          ]}
          onPress={handleSignIn}
        >
          {buttonSpinner ? (
            <ActivityIndicator
              size="small"
              color="#016AF5"
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
                  paddingVertical: 20,
                  paddingHorizontal: 20,
                },
              ]}
            >
              REGISTRARSE
            </Text>
          </LinearGradient>
          )}
        </TouchableOpacity>
      </ScrollView>     
    </LinearGradient>
  );
}

export const styles = StyleSheet.create({
  checkboxContainer: {
    backgroundColor: "transparent",
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
    borderColor: "#016AF5",
    borderWidth: 0.8,
    backgroundColor: "#016AF5",
  },
  signInImage: {
    aspectRatio: 1,
    height: 250,
    alignSelf: "center",
    marginTop: -40,
  },
  topText: {
    display: "flex",
    paddingTop: 15,
    paddingBottom: 8,
    paddingLeft: 15,
    fontFamily: "Aristotelica Pro Display Regular",
    borderBottomColor: "#949494",
    borderBottomWidth: 1,
    color: "white",
    backgroundColor: "#000024",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    marginTop: 5,
    fontSize: 16,
    fontFamily: "Aristotelica Pro Display Regular",
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
    top: 8,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    top: 60,
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
  radioButton: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
    paddingBottom: 5,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#000024",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedRadioCircle: {
    backgroundColor: "#000024",
  },
});
