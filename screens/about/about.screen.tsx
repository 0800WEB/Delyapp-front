import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
  Image,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";

import { useFonts } from "expo-font";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import * as Notifications from "expo-notifications";
import { clearSelectedProduct } from "@/store/products/productsActions";
import { router } from "expo-router";

import Accordion from "react-native-collapsible/Accordion";

type DrawerNavProp = DrawerNavigationProp<RootParamList>;

const AboutScreen: React.FC = () => {
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

  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<DrawerNavProp>();
  const order = useSelector((state: RootState) => state.order.order);
  // console.log(order)

  useEffect(() => {
    // const interval = setInterval(() => {
    // dispatch(readOrderStatus(order._id));
    Notifications.scheduleNotificationAsync({
      content: {
        title: "¡Tú Orden ha sido tomada!",
        body: "Tu Orden está siendo procesada y pronto tendrás una actualización.",
      },
      trigger: null,
    });
    // }, 60000);

    // return () => {
    //   clearInterval(interval);
    // };
  }, []);

  const fadeAnims = useRef(
    [...Array(5)].map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    Animated.stagger(
      200,
      fadeAnims.map((fadeAnim) =>
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        })
      )
    ).start();
  }, []);

  // if(order.status === "pendiente"){
  //   Notifications.scheduleNotificationAsync({
  //     content: {
  //       title: "¡Tú Orden ha sido tomada!",
  //       body: "Tu Orden está siendo procesada y pronto tendrás una actualización.",
  //     },
  //     trigger: null,
  //   });
  // } else if (order.status === "confirmado"){
  //   Notifications.scheduleNotificationAsync({
  //     content: {
  //       title: "¡Tu Orden ha sido confirmada!",
  //       body: "Tu Orden ha sido confirmada y pronto será enviada.",
  //     },
  //     trigger: null,
  //   });
  // }
  const [activeSections, setActiveSections] = useState([]);

  const sections = [
    {
      title: "TERMINOS Y CONDICIONES",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus in justo ut est ullamcorper facilisis. Quisque non risus urna. Suspendisse euismod justo eget sapien interdum, sit amet sollicitudin nunc scelerisque",
    },
    { title: "AVISO DE PRIVACIDAD", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent interdum, sapien nec dapibus vestibulum, justo neque eleifend enim, vel interdum libero dolor sit amet magna. Nulla facilisi. Curabitur id sapien ut erat ultrices elementum. Vivamus non metus libero. Proin sagittis mi ut felis consequat, ut dignissim sem hendrerit. In hac habitasse platea dictumst. Fusce convallis vehicula mi, a fermentum elit hendrerit ac. Nulla aliquam fringilla augue, et vulputate risus lacinia id. Etiam sit amet turpis ac ex elementum volutpat vel at turpis. Nam eget erat et quam tincidunt facilisis sit amet ac sapien. Sed vehicula posuere justo, et interdum purus tempor ac. Nam quis lorem sed ligula lacinia lacinia. Suspendisse pharetra velit sed dolor pretium, at bibendum mi vulputate" },
  ];
  const onChange = (sections: number[]) => {
    setActiveSections(sections);
  };

  const renderHeader = (section: any) => (
    <View
      style={{
        width:"90%",
        paddingHorizontal: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: "auto",
        borderBottomWidth: 1,
        borderColor: "white",
        marginBottom: 20,
        paddingBottom: 10,
      }}
    >
      <Text style={{ color: "white", fontSize: 16, fontFamily: "Geomanist Regular" }}>{section.title}</Text>
      <AntDesign
        name="down"
        size={20}
        color="white"
        style={{ }}
      />
    </View>
  );

  const renderContent = (section: any) => (
    <View style={{width:"90%", height: "auto", marginHorizontal: "auto", marginBottom: 15, marginTop: -5 }}>
      <Text style={{ color: "white", fontFamily: "Geomanist Regular", textAlign:"justify", marginHorizontal: "auto" }}>{section.content}</Text>
    </View>
  );

  const goToHome = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "¡Has vuelto a casa!",
        body: "Aquí va el cuerpo de la notificación.",
      },
      trigger: null,
    });
    dispatch(clearSelectedProduct());
    router.back();
  };

  return (
    <LinearGradient
      colors={["#000026", "#000026"]}
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <View style={styles.imageContainer}>
        <Image
          style={styles.fullscreenImage}
          source={require("@/assets/images/ABOUT.png")}
        />
      </View>
      <View style={styles.top}>
        <Text style={[styles.topText, { marginTop: 2 }]}>
          ACERCA DE NOSOTROS
        </Text>
        <TouchableOpacity onPress={() => goToHome()}>
          <AntDesign
            name="close"
            size={20}
            color="white"
            style={{ height: 40, aspectRatio: 1 }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.centeredContainer}>
        <Image
          style={[
            {
              transform: [{ scale: 1 }],
              alignSelf: "center",
              marginVertical: 30,
            },
          ]}
          source={require("@/assets/images/ABOUT_PNG.png")}
        />
        <Accordion
          sections={sections}
          renderHeader={renderHeader}
          renderContent={renderContent}
          onChange={onChange}
          activeSections={activeSections}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  top: {
    flexDirection: "row",
    paddingTop: 18,
    paddingLeft: 15,
    borderBottomColor: "#A1A1A1",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    width: "100%",
    marginTop: 25,
  },
  topText: {
    fontFamily: "Geomanist Regular",
    fontSize: 15,
    color: "white",
    textAlign: "left",
  },
  closeIcon: {
    height: 40,
    aspectRatio: 1,
  },
  imageContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  centeredContainer: {
    // position: "absolute",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    marginVertical: "auto",
    marginTop: -70
    // justifyContent:"space-between",
  },
  radioButton: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
    paddingVertical: 10,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedRadioCircle: {
    backgroundColor: "white",
  },
  centeredText: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: "15%",
    textAlign: "center",
  },
  fullscreenContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  fullscreenImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});
export default AboutScreen;
