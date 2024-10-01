import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useFonts } from "expo-font";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppDispatch } from "@/store/store";
import { sign_out } from "@/store/user/authActions";
import Header from "@/components/header/header";
import SearchInput from "@/components/search/searchInput";
import { DrawerActions } from "@react-navigation/native";

export default function UserScreen() {
  const dispatch = useDispatch<AppDispatch>();
  let [fontsLoaded, fontError] = useFonts({
    "Aristotelica Pro Cdn Extralight": require("../../assets/fonts/Aristotelica-pro-cdn-extralight.otf"),
    "Aristotelica Pro Display Extralight": require("../../assets/fonts/Aristotelica-pro-display-extralight.otf"),
    "Aristotelica Pro Text Extralight": require("../../assets/fonts/Aristotelica-pro-text-extralight.otf"),
    "Aristotelica Pro Display Bold": require("../../assets/fonts/Aristotelica Pro Display Bold.otf"),
    "Aristotelica Pro Display Demibold": require("../../assets/fonts/Aristotelica Pro Display Demibold.otf"),
    "Aristotelica Pro Display Hairline": require("../../assets/fonts/Aristotelica Pro Display Hairline.otf"),
    "Aristotelica Pro Display Regular": require("../../assets/fonts/Aristotelica Pro Display Regular.otf"),
    "Aristotelica Pro Display Thin": require("../../assets/fonts/Aristotelica Pro Display Thin.otf"),
    "Aristotelica Pro Display Ft": require("../../assets/fonts/AristotelicaProDisp-Ft.otf"),
    "Aristotelica Pro Display Hv": require("../../assets/fonts/AristotelicaProDisp-Hv.otf"),
    "Aristotelica Pro Display Lt": require("../../assets/fonts/AristotelicaProDisp-Lt.otf"),
    ...FontAwesome.font,
  });
  if (!fontsLoaded && !fontError) {
    return null;
  }
  const navigation = useNavigation<DrawerNavProp>();
  const [userData, setUserData] = useState<UserInfo | null>(null);
  const userInfo = useSelector((state: RootState) => state.user.userInfo);

  useEffect(() => {
    if (userInfo) {
      setUserData(userInfo);
    }
  }, [userInfo]);

  //TODO-logout

  const logout = async () => {
    dispatch(sign_out())
    router.push("select-sign");
  };

  return (
    <View style={{ flex: 1, marginTop: 26 }}>
      <Header
          openDrawer={() => navigation.dispatch(DrawerActions.openDrawer())}
        />
        <SearchInput homeScreen={true} />
        <View style={styles.top}>
          <Text style={[styles.topText, { marginTop: 2 }]}>
            PERFIL DE USUARIO
          </Text>
          <TouchableOpacity onPress={() => router.back()}>
            <AntDesign
              name="close"
              size={20}
              color="#000024"
              style={{ height: 40, aspectRatio: 1 }}
            />
          </TouchableOpacity>
        </View>      
      {userData && (
        <>
          <View style={styles.header}>
            <Image
              style={[styles.avatar] }
              source={require('@/assets/images/ICONOS-01.png')}
            />
          </View>
          <View style={styles.body}>
            <View style={styles.item}>
              <FontAwesome name="user-o" size={25} color="#000024" />
              <Text style={styles.itemText}>{userData.name}</Text>
            </View>
            <View style={styles.item}>
              <FontAwesome name="envelope-o" size={25} color="#000024" />
              <Text style={styles.itemText}>{userData.email}</Text>
            </View>
            <View style={styles.item}>
              <FontAwesome name="phone" size={25} color="#000024" />
              <Text style={styles.itemText}>{userData.phone}</Text>
            </View>
            <TouchableOpacity style={styles.item} onPress={()=> navigation.navigate('(routes)/update-account/index')}>
              <FontAwesome name="pencil" size={25} color="#000024" />
              <Text style={styles.itemText}>EDITAR</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item} onPress={logout}>
              <FontAwesome name="close" size={25} color="#000024" />
              <Text style={styles.itemText}>CERRAR SESIÓN</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F6F7",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    height: "30%",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    height: 150,
    aspectRatio: 1,
    borderRadius: 100,
    marginBottom: -30,
  },
  body: {
    width: "98%",
    paddingHorizontal: 30,
    alignItems: "flex-start",
    justifyContent: "center",
    paddingTop: 40,
  },
  item: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 20,
    paddingBottom: 10,
    paddingHorizontal: 5,
    alignItems: "center",
    borderBottomColor: "#000024",
    borderBottomWidth: 1,
  },
  itemText: {
    fontFamily: "Aristotelica Pro Display Regular",
    color: "#000024",
    fontSize: 18,
    marginLeft: 20,
  },
  top: {
    flexDirection: "row",
    paddingTop: 18,
    paddingLeft: 15,
    borderBottomColor: "#A1A1A1",
    justifyContent: "space-between",
    borderBottomWidth: 1,
  },
  topText: {
    fontFamily: "Aristotelica Pro Display Regular",
    fontSize: 15,
    color: "#000024",
  },
  closeIcon: {
    height: 40,
    aspectRatio: 1,
  },
});
