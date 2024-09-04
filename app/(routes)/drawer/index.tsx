import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerContentComponentProps } from "@react-navigation/drawer";
import Home from "../home";
import Cart from "../cart";
import User from "../user";
import About from "../about";
import Orders from "../orders";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props} style={{backgroundColor: '#000024'}}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

export default function DrawerLayoutNav() {
  return (
    <Drawer.Navigator 
      screenOptions={{ headerShown: false, 
        drawerItemStyle: { marginVertical: 5 },
        drawerLabelStyle: { fontFamily: 'Geomanist Medium', color: 'white', fontSize:17 },}}
      drawerContent={props => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="HOME"
        component={Home}
        options={{ drawerLabel: "INICIO" }}
      />
      <Drawer.Screen name="PERFIL" component={User} options={{ drawerLabel: "PERFIL" }}/>
      <Drawer.Screen name="CARRITO" component={Cart} options={{ drawerLabel: "CARRITO" }}/>
      <Drawer.Screen name="ORDERS" component={Orders} options={{ drawerLabel: "MIS ORDENES" }}/>
      <Drawer.Screen name="ABOUT_US" component={About} options={{ drawerLabel: "ACERCA DE" }}/>
    </Drawer.Navigator>
  );
}
