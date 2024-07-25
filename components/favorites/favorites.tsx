import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    Image,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Button,
    VirtualizedList,
  } from "react-native";
  import {
    AntDesign,
    Entypo,
    FontAwesome,
    Fontisto,
    Ionicons,
    SimpleLineIcons,
  } from "@expo/vector-icons";
  import { useFonts } from "expo-font";
  import { LinearGradient } from "expo-linear-gradient";
  import { router } from "expo-router";
  import { transform } from "@babel/core";
  import React, { useState, useEffect } from "react";
  import AppIntroSlider from "react-native-app-intro-slider";
  import {
    responsiveHeight,
    responsiveWidth,
  } from "react-native-responsive-dimensions";
  import { categorySliderData } from "@/constants/constants";
  import axios from "axios";
  
  export default function Favorites() {
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
    const [data, setData] = useState<fakeDataType[]>([]);
  
    const fetchData = async () => {
      try {
        const result = await axios.get("https://fakestoreapi.com/products");
        setData(result.data);
      } catch (error) {
        console.error(error);
      }
    };
    useEffect(() => {
      fetchData();
    }, []);
  
    const getItem = (data: fakeDataType[], index: number) => data[index];
  
    const getItemCount = (data: fakeDataType[]) => (data ? data.length : 0);
  
    const keyExtractor = (data: fakeDataType) => data.id.toString();
  
    const renderItem = ({ item }: { item: fakeDataType }) => {
      return (
        <TouchableOpacity
          style={{ marginHorizontal: 2, width: 150 }}
        >
          <Image
            source={{ uri: item.image }}
            style={[styles.imageStyle, { alignSelf: "center" }]}
          />
          <View style={styles.containerTitle}>
            <Text style={styles.titleText}>{item.title.substring(0, 11)}</Text>
            <View style={{ flexDirection: "row" }}>
              <Image
                source={require("@/assets/images/ICONOS-12.png")}
                style={styles.starStyle}
              />
              <Text style={[styles.titleText, { fontFamily: "Geomanist Light" }]}>
                {item.rating.rate}
              </Text>
            </View>
          </View>
          <View style={styles.containerTitle}>
            <Text style={[styles.titleText, { fontFamily: "Cherione Regular", fontSize: 10.5, alignSelf: "center" }]}>{item.category.substring(0, 11)}</Text>
            <View style={{ flexDirection: "row" }}>            
              <Text style={[styles.titleText]}>
                ${item.price}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    };
  
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <VirtualizedList
          data={data}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          getItemCount={getItemCount}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          snapToAlignment={"center"}
          decelerationRate={"fast"}
          getItem={getItem}
        />
      </SafeAreaView>
    );
  }
  
  export const styles = StyleSheet.create({
    imageStyle: {
      height: 130,
      aspectRatio: 1,
      marginHorizontal: 5,
      marginTop: 10,
      marginBottom: 5,
      borderRadius: 15,
      borderWidth: 0.15,
      borderColor: "#A1A1A1",
    },
    topText: {
      display: "flex",
      paddingTop: 8,
      paddingBottom: 8,
      paddingLeft: 15,
      fontFamily: "Geomanist Regular",
      borderBottomColor: "#A1A1A1",
      borderBottomWidth: 0.8,
      color: "#A1A1A1",
    },
    containerTitle: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: 130,
      alignSelf: "center",
    },
    categoryText: {
      fontFamily: "Geomanist Medium",
      fontSize: 14,
      color: "#A1A1A1",
    },
    starStyle: {
      width: 14,
      aspectRatio: 1,
      alignSelf: "center",
      marginRight: 5,
    },
    titleText: {
      fontFamily: "Geomanist Medium",
      fontSize: 14,
      color: "#A1A1A1",
    },
  });
  