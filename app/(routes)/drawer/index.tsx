import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../home";
import Cart from "../cart";
const Drawer = createDrawerNavigator();

export default function DrawerLayoutNav() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen
        name="(routes)/home/index"
        component={Home}
        options={{ drawerLabel: "INICIO" }}
      />
      <Drawer.Screen name="Cart" component={Cart} options={{ drawerLabel: "CARRITO" }}/>
    </Drawer.Navigator>
  );
}
