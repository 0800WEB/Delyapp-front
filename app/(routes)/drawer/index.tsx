import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../home";
import Cart from "../cart";
import User from "../user";
const Drawer = createDrawerNavigator();

export default function DrawerLayoutNav() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen
        name="HOME"
        component={Home}
        options={{ drawerLabel: "INICIO" }}
      />
      <Drawer.Screen name="PERFIL" component={User} options={{ drawerLabel: "PERFIL" }}/>
      <Drawer.Screen name="CARRITO" component={Cart} options={{ drawerLabel: "CARRITO" }}/>
    </Drawer.Navigator>
  );
}
