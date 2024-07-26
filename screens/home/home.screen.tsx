import {
  View,
  ScrollView,
  DrawerLayoutAndroid,
  StyleSheet,
  Button,
  Text,
  TouchableOpacity,
} from "react-native";
import { useEffect, useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Header from "@/components/header/header";
import Categories from "@/components/categories/categories";
import SearchInput from "@/components/search/searchInput";
import Highlights from "@/components/highlights/highlights";
import Promos from "@/components/promos/promos";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { openDrawer, closeDrawer } from "@/store/drawer/drawerActions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const HomeScreen: React.FC = () => {
  const drawer = useRef<DrawerLayoutAndroid>(null);
  const dispatch = useDispatch();
  const isDrawerOpen = useSelector((state: RootState) => state.drawer.isOpen);

  const logout = async () => {
    await AsyncStorage.removeItem("userToken");
    await AsyncStorage.removeItem("userInfo");
    dispatch(closeDrawer());
    router.push("select-sign");
  };

  useEffect(() => {
    if (isDrawerOpen) {
      drawer.current?.openDrawer();
    } else {
      drawer.current?.closeDrawer();
    }
  }, [isDrawerOpen]);

  const navigationView = () => (
    <View style={[styles.container, styles.navigationContainer]}>
      <TouchableOpacity onPress={() => router.push("/(routes)/user")}>
        <Text style={styles.paragraph}>PERFIL</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/screen2")}>
        <Text style={styles.paragraph}>Go to Screen 2</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/screen3")}>
        <Text style={styles.paragraph}>Go to Screen 3</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={logout}>
        <Text style={styles.paragraph}>CERRAR SESIÓN</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition="left"
      renderNavigationView={navigationView}
      onDrawerClose={() => dispatch(closeDrawer())}
    >
      <LinearGradient
        colors={["#F9F6F7", "#F9F6F7"]}
        style={{ flex: 1, paddingTop: 30 }}
      >
        <Header openDrawer={() => dispatch(openDrawer())} />
        <ScrollView style={{ flex: 1 }}>
          <SearchInput homeScreen={true} />
          <Categories />
          <Highlights />
          <Promos />
        </ScrollView>
      </LinearGradient>
    </DrawerLayoutAndroid>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 16,
    paddingTop: "15%",
  },
  navigationContainer: {
    backgroundColor: "#0D0D0D",
    // borderTopRightRadius: 50,
    // borderBottomRightRadius: 50,
  },
  paragraph: {
    color: "#F9F6F7",
    padding: 16,
    fontSize: 18,
    textAlign: "center",
  },
});

export default HomeScreen;
