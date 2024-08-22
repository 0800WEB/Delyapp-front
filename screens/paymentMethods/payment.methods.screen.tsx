import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Modal,
  Pressable,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { RadioButton } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import { router } from "expo-router";
import { useFonts } from "expo-font";

import {
  registerCashPayment,
  registerStripePayment,
  registerCardPayment,
  deleteCardPayment,
  deleteStripePayment,
  deleteCashPayment,
} from "@/store/paymentMethods/paymentMethodsActions";

const PaymentMethodsScreen: React.FC = () => {
  let [fontsLoaded, fontError] = useFonts({
    "Cherione Bold": require("../../assets/fonts/Cherione Bold.ttf"),
    "Cherione Normal": require("../../assets/fonts/Cherione Normal.ttf"),
    "Cherione Light": require("../../assets/fonts/Cherione Light.ttf"),
    "Cherione Regular": require("../../assets/fonts/Cherione.otf"),
    "Geomanist Regular": require("../../assets/fonts/Geomanist-Regular.otf"),
    "Geomanist Bold": require("../../assets/fonts/Geomanist-Bold.otf"),
    "Geomanist Light": require("../../assets/fonts/Geomanist-Light.otf"),
    "Geomanist Medium": require("../../assets/fonts/Geomanist-Medium.otf"),
    "Geomanist Thin": require("../../assets/fonts/Geomanist-Thin.otf"),
    "Geomanist ExtraLight": require("../../assets/fonts/Geomanist-ExtraLight.otf"),
    "Geomanist Ultra": require("../../assets/fonts/Geomanist-Ultra.otf"),
    ...FontAwesome.font,
  });
  if (!fontsLoaded && !fontError) {
    return null;
  }
  const payment = useSelector((state: RootState) => state.payment);
  console.log(payment);
  const dispatch = useDispatch<AppDispatch>();

  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>("");
  const [paymentMethods, setPaymentMethods] = useState<
    { method: string; displayName: string }[]
  >([
    { method: "cash", displayName: "Cash" },
    { method: "stripe", displayName: "Stripe" },
  ]);

  const [modalVisible, setModalVisible] = useState(false);

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const [open, setOpen] = useState(false);
  const [cardType, setCardType] = useState<string | null>(null);
  const [items, setItems] = useState([
    { label: "Visa", value: "Visa" },
    { label: "MasterCard", value: "MasterCard" },
  ]);

  const handleAddPaymentMethod = () => {
    if (cardType) {
      setPaymentMethods((prevMethods) => [
        ...prevMethods,
        { method: `card_${cardType}`, displayName: cardType }, // Clave única para cada tarjeta
      ]);
      setModalVisible(false);
      setCardType(null); // Limpiar selección de tipo de tarjeta después de añadir
    } else {
      Alert.alert("Error", "Please select a card type.");
    }
  };

  const handlePaymentMethodChange = async (method: string) => {
    try {
      if (method === selectedPaymentMethod) {
        // Si el método seleccionado ya está activo, desactívalo
        if (method.startsWith("card_")) {
          await dispatch(deleteCardPayment()); // Eliminar tarjeta cuando ya está seleccionada
        } else if (method === "stripe") {
          await dispatch(deleteStripePayment()); // Eliminar Stripe cuando ya está seleccionado
        } else if (method === "cash") {
          await dispatch(deleteCashPayment()); // Eliminar Cash cuando ya está seleccionado
        }
        setSelectedPaymentMethod(""); // Limpiar selección
      } else {
        // Si se selecciona un nuevo método, desactiva el método previamente seleccionado
        if (selectedPaymentMethod.startsWith("card_")) {
          await dispatch(deleteCardPayment()); // Eliminar tarjeta previamente seleccionada
        } else if (selectedPaymentMethod === "stripe") {
          await dispatch(deleteStripePayment()); // Eliminar Stripe previamente seleccionado
        } else if (selectedPaymentMethod === "cash") {
          await dispatch(deleteCashPayment()); // Eliminar Cash previamente seleccionado
        }

        // Registra el nuevo método
        if (method.startsWith("card_")) {
          await dispatch(registerCardPayment()); // Registrar nueva tarjeta
        } else if (method === "cash") {
          await dispatch(registerCashPayment()); // Registrar Cash
        } else if (method === "stripe") {
          await dispatch(registerStripePayment()); // Registrar Stripe
        }

        setSelectedPaymentMethod(method); // Actualiza la selección del método
      }
    } catch (error) {
      console.error("Failed to change payment method: ", error);
    }
  };

  const formatCardNumber = (input: string) => {
    const formatted = input.replace(/\D/g, "").slice(0, 16);
    return formatted.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const handleCardNumberChange = (text: string) => {
    setCardNumber(formatCardNumber(text));
  };

  const handleCardNameChange = (text: string) => {
    setCardName(text.toUpperCase().slice(0, 30)); // Limita la longitud a 30 caracteres
  };

  const formatExpiryDate = (input: string) => {
    const formatted = input.replace(/\D/g, "").slice(0, 4);
    if (formatted.length >= 3) {
      return `${formatted.slice(0, 2)}/${formatted.slice(2, 4)}`;
    }
    return formatted;
  };

  const handleExpiryDateChange = (text: string) => {
    setExpiryDate(formatExpiryDate(text));
  };

  return (
    <LinearGradient
      colors={["#F9F6F7", "#F9F6F7"]}
      style={{ flex: 1, marginTop: StatusBar.currentHeight }}
    >
      <View>
        <View style={styles.top}>
          <Text style={styles.topText}>MÉTODOS DE PAGO</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <AntDesign
              name="close"
              size={28}
              color="#A1A1A1"
              style={styles.closeIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={{ marginHorizontal: 10, marginBottom: 5 }}>
          <RadioButton.Group
            onValueChange={handlePaymentMethodChange}
            value={selectedPaymentMethod}
          >
            {paymentMethods.map((method) => (
              <View style={{ marginVertical: 5 }}>
                <RadioButton.Item
                  key={method.method}
                  label={`Registrar pago con ${method.displayName}`}
                  value={method.method}
                  labelStyle={{ color: "#A1A1A1" }}
                />
              </View>
            ))}
          </RadioButton.Group>
        </View>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <Text
            style={[
              {
                fontFamily: "Cherione Regular",
                textAlign: "center",
                alignContent: "center",
                justifyContent: "center",
                color: "white",
              },
            ]}
          >
            Agregar método de pago
          </Text>
        </Pressable>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
          onShow={() => {
            setCardName("");
            setCardNumber("");
            setExpiryDate("");
            setCardType(null); // Limpiar la selección del tipo de tarjeta cuando se abre el modal
          }}
        >
          <View style={[styles.centeredView]}>
            <View style={[styles.modalView]}>
              <Text style={[styles.modalText, {fontFamily:"Cherione Regular", fontSize:18}]}>
                Registrar una nueva tarjeta de crédito:
              </Text>
              <TextInput
                style={[styles.input, { width: "100%" }]}
                onChangeText={handleCardNameChange}
                value={cardName}
                placeholder="Nombre"
                maxLength={30}
              />
              <TextInput
                style={styles.input}
                onChangeText={handleCardNumberChange}
                value={cardNumber}
                placeholder="Número de tarjeta"
                keyboardType="numeric"
                maxLength={19} // 16 dígitos + 3 espacios
              />
              <View style={{flexDirection:"row", justifyContent:"space-between", width:"100%"}}>
                <TextInput
                  style={[
                    styles.input,
                    { width: 100, textAlign: "center", paddingLeft: 0 },
                  ]}
                  onChangeText={handleExpiryDateChange}
                  value={expiryDate}
                  placeholder="MM/YY"
                  keyboardType="numeric"
                  maxLength={5}
                />
                <TextInput
                  style={[
                    styles.input,
                    { width: 100, textAlign: "center", paddingLeft: 0 },
                  ]}
                  onChangeText={setCvv}
                  value={cvv}
                  placeholder="XXX"
                  keyboardType="numeric"
                  maxLength={5}
                />
              </View>
              <DropDownPicker
                placeholder="Tipo de tarjeta"
                open={open}
                value={cardType}
                items={items}
                setOpen={setOpen}
                setValue={setCardType}
                setItems={setItems}
                containerStyle={{ height: 50 }}
                style={{
                  backgroundColor: "#fafafa",
                  width: "100%",
                  marginBottom: 10,
                  borderRadius: 15,
                }}
                dropDownContainerStyle={{ backgroundColor: "#fafafa" }}
              />
              <Pressable
                style={[
                  styles.button,
                  styles.buttonClose,
                  { width: "100%", marginVertical: 10 },
                ]}
                onPress={handleAddPaymentMethod}
              >
                <Text style={[styles.textStyle]}>Registrar tarjeta</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.button,
                  styles.buttonClose,
                  { width: "100%", marginVertical: 5 },
                ]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.textStyle}>Cancelar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  top: {
    flexDirection: "row",
    paddingTop: 15,
    paddingLeft: 15,
    borderBottomColor: "#949494",
    justifyContent: "space-between",
    borderBottomWidth: 1,
  },
  topText: {
    fontFamily: "Cherione Regular",
    fontSize: 20,
    color: "#949494",
  },
  closeIcon: {
    height: 40,
    aspectRatio: 1,
  },
  input: {
    width: "100%",
    height: 45,
    borderRadius: 15,
    borderColor: "#A1A1A1",
    borderWidth: 0.8,
    fontSize: 16,
    paddingLeft: 15,
    marginHorizontal: "auto",
    fontFamily: "Geomanist Regular",
    backgroundColor: "white",
    color: "#A1A1A1",
    marginBottom: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontFamily: "Geomanist Regular",
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    marginHorizontal: 10,
    height: 45,
    borderRadius: 15,
    justifyContent: "center",
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#A1A1A1",
  },
  buttonClose: {
    backgroundColor: "#A1A1A1",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default PaymentMethodsScreen;
