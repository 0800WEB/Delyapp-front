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
import { Image, View, Platform } from "react-native";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const isIOS = Platform.OS === 'ios';
  return (
<DrawerContentScrollView {...props} style={{ backgroundColor: "#000024", display:"flex", flex:1 }}>
      <View
        style={{
          gap: 10,
          flex:0,
        }}
      >
        {/* View contenedor */}
        <DrawerItemList {...props} />
      </View>
        <View style={{ paddingVertical:64, flex:1, justifyContent:"flex-end", flexGrow: 1 }}>
          <Image
            source={require("@/assets/images/botella-azul.png")}
            style={isIOS ? {
              marginVertical: 20, // Margen superior de la imagen
              } : {resizeMode:"contain", marginTop:10}}
          />
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
        options={{ drawerLabel: "MIS PEDIDOS" }}
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