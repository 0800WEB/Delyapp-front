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
  Keyboard
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
import React, { useEffect, useState } from "react";
import { responsiveWidth } from "react-native-responsive-dimensions";
import DateTimePicker from "@react-native-community/datetimepicker";
import { CheckBox } from "react-native-elements";

import { Toast } from "react-native-toast-notifications";
import{ useDispatch, useSelector } from "react-redux";
import { sign_up } from "@/store/user/authActions";
import { AppDispatch } from '../../../store/store';

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
    password: "",
    phone: "",
    ageVerified: false,
  });
  const [required, setRequired] = useState("");
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
  const authState = useSelector((state: {user: AuthState}) => state.user);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardStatus(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
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
      Toast.show("Debe aceptar los términos y condiciones y el aviso de privacidad", {
        type: "danger",
      });
      return;
    }
  
    if (!userInfo.password || error.password !== "") {
      Toast.show("Hay un problema con la contraseña", {
        type: "danger",
      });
      return;
    }
  
    setButtonSpinner(true);
    dispatch(sign_up({
      name: userInfo.name,
      email: userInfo.email,
      password: userInfo.password,
      phone: userInfo.phone,
      ageVerified: userInfo.ageVerified,
    })).catch(error => {
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
      <ScrollView
        style={{ flex: 1, alignContent: "center", zIndex: 2 }}
      >
        <Image
          source={require("@/assets/images/ICONOS-01.png")}
          style={[
            styles.signInImage,
            { transform:[{scale:0.4}] },
          ]}
        />
        <View style={styles.inputContainer}>
          <View>
            <TextInput
              style={[styles.input, {}]}
              keyboardType="default"
              value={userInfo.name}
              placeholder="Nombre"
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
              onChangeText={(value) =>
                setUserInfo({ ...userInfo, email: value })
              }
            />
           
          </View>
          <View>
            <TextInput
              style={[styles.input, {}]}
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
              style={[styles.input, { paddingTop: 0, paddingLeft: 35 }]}
              keyboardType="default"
              secureTextEntry={!isPasswordVisible}
              defaultValue=""
              placeholder="••••••••••"
              onChangeText={handlePasswordValidation}
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
        <TouchableOpacity
          style={[
            styles.button3,
            { paddingLeft: -35, marginHorizontal: 32, marginTop: 20 },
          ]}
          >
          {buttonSpinner ? (
            <ActivityIndicator size="small" color="#016AF5" style={{marginVertical: "auto"}} />
            ) : (
              <View style={styles.buttonWrapper}>
            <Image
              source={require("@/assets/images/BUTTON.png")}
              style={styles.button2}
              />
            <Text
              onPress={handleSignIn}
              style={[
                {
                  fontFamily: "Geomanist Regular",
                  color: "white",
                  fontSize: 19,
                },
              ]}
            >
              REGISTRARSE
            </Text>
          </View>
            )}
        </TouchableOpacity>
      </ScrollView>
      {!keyboardStatus && (
        <Image
          source={require("@/assets/images/ICONOS-42.png")}
          style={{ position: "absolute", zIndex: 1, left: 0, bottom: 0 }}
          resizeMode="contain"
        />
      )}
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
    height: 40,
    marginHorizontal: 16,
    borderRadius: 25,
    borderColor: "#A1A1A1",
    borderWidth: 0.4,
    paddingLeft: 35,
    fontSize: 16,
    alignContent: "center",
    fontFamily: "Geomanist Regular",
    backgroundColor: "white",
    color: "#A1A1A1",
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
    aspectRatio:1,
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
    color: "white",
    backgroundColor: "#000024"
  },
  buttonText: {
    color: "white",
    textAlign: "left",
    marginTop: 9,
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
});
