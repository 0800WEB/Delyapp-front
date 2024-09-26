import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
} from "@react-navigation/drawer";
import Home from "../home";
import Cart from "../cart";
import User from "../user";
import About from "../about";
import Orders from "../orders";
import { useFonts } from "expo-font";
import { FontAwesome } from "@expo/vector-icons";
import { Image, View } from "react-native";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props} style={{ backgroundColor: "#000024" }}>
      <View style={{ flex: 1, gap:10, display:"flex", flexDirection:"column", minHeight:"95%" }}>
        {/* View contenedor */}
        <DrawerItemList {...props} />
        <View style={{ paddingVertical:32, flex:1, justifyContent:"center"}}>
          <Image
            source={require("@/assets/images/botella-azul.png")}
            style={{
              alignSelf:'flex-start',
              marginTop: 20, // Margen superior de la imagen
              position:"absolute",
              left: 0,               // Posiciona la imagen en el borde izquierdo del contenedor
              }}
          />
        </View>
      </View>
    </DrawerContentScrollView>
  );
}
export default function DrawerLayoutNav() {
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
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerItemStyle: { marginVertical: 5 },
        drawerLabelStyle: {
          fontFamily: "Aristotelica Pro Display Demibold",
          color: "white",
          fontSize: 17,
        },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="HOME"
        component={Home}
        options={{ drawerLabel: "INICIO" }}
      />
      <Drawer.Screen
        name="PERFIL"
        component={User}
        options={{ drawerLabel: "PERFIL" }}
      />
      <Drawer.Screen
        name="CARRITO"
        component={Cart}
        options={{ drawerLabel: "CARRITO" }}
      />
      <Drawer.Screen
        name="ORDERS"
        component={Orders}
        options={{ drawerLabel: "MIS ORDENES" }}
      />
      <Drawer.Screen
        name="ABOUT_US"
        component={About}
        options={{ drawerLabel: "ACERCA DE" }}
      />

      {/* El View y la Image se han movido a CustomDrawerContent */}
    </Drawer.Navigator>
  );
}
