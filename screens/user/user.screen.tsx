import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { openDrawer, closeDrawer } from "@/store/drawer/drawerActions";
import { useFonts } from "expo-font";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

export default function UserScreen() {
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
  const navigation = useNavigation();
  const [userData, setUserData] = useState<UserInfo | null>(null);
  const userInfo = useSelector((state: RootState) => state.user.userInfo);

  useEffect(() => {
    if (userInfo) {
      setUserData(userInfo);
    }
  }, [userInfo]);
  return (
    <View style={[styles.container]}>
      <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
        <AntDesign name="close" size={35} color="#A1A1A1" />
      </TouchableOpacity>
      {userData && (
        <>
          <View style={styles.header}>
            <Image
              style={[styles.avatar, {backgroundColor: "#A1A1A1"}] }
              source={require('@/assets/images/ICONOS-01.png')}
            />
          </View>
          <View style={styles.body}>
            <View style={styles.item}>
              <FontAwesome name="user-o" size={25} color="#A1A1A1" />
              <Text style={styles.itemText}>{userData.name}</Text>
            </View>
            <View style={styles.item}>
              <FontAwesome name="envelope-o" size={25} color="#A1A1A1" />
              <Text style={styles.itemText}>{userData.email}</Text>
            </View>
            <View style={styles.item}>
              <FontAwesome name="phone" size={25} color="#A1A1A1" />
              <Text style={styles.itemText}>{userData.phone}</Text>
            </View>
            <View style={styles.item}>
              <FontAwesome name="map" size={25} color="#A1A1A1" />
              {userData && userData.address ? (
                <Text style={styles.itemText}>{userData.address}</Text>
              ) : (
                <Text style={styles.itemText}>No hay dirección registrada</Text>
              )}
            </View>
            <TouchableOpacity style={styles.item} onPress={()=> navigation.navigate('(routes)/update-account/index')}>
              <FontAwesome name="pencil" size={25} color="#A1A1A1" />
              <Text style={styles.itemText}>EDITAR</Text>
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
    height: 200,
    aspectRatio: 1,
    borderRadius: 100,
    marginBottom: 10,
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
    borderBottomColor: "#A1A1A1",
    borderBottomWidth: 1,
  },
  itemText: {
    fontFamily: "Geomanist Regular",
    color: "#A1A1A1",
    fontSize: 18,
    marginLeft: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 40, 
    right: 20, 
    padding: 10,
    zIndex: 1,
  },
});
