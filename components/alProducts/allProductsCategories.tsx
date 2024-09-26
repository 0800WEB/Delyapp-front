import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  VirtualizedList,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import React from "react";

interface AllCategoryProductsProps {
  category: Category;
  products: Product[];
  onProductSelected: (productId: string) => void;
  homeScreen: boolean;
}

const AllCategoryProducts: React.FC<AllCategoryProductsProps> = ({
  category,
  products,
  onProductSelected,
  homeScreen,
}) => {
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
  const getItem = (data: any[], index: number) => data[index];
  const getItemCount = (data: any[]) => (data ? data.length : 0);
  const keyExtractor = (data: any) => data._id.toString();

  const renderItem = ({ item }: { item: any }) => {
    return (
      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={[styles.card]}
          onPress={() => onProductSelected(item._id)}
        >
          <Image
            source={{ uri: item.images[0] }}
            resizeMode={'cover'}
            style={[styles.imageStyle, { flex:1 }]}
          />
          <View style={styles.containerTitle}>
            <Text style={[styles.titleText]}>{item.name.substring(0, 35)}</Text>
          </View>
          <View style={styles.containerTitle}>
            <Text style={[styles.description]}>
              {item.description.substring(0, 20)}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#000024",
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              alignItems: "center",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text
                style={[
                  styles.titleText,
                  {
                    paddingVertical: 13,
                    fontFamily: "Aristotelica Pro Display Bold",
                    color: "white",
                    fontSize: 15,
                  },
                ]}
              >
                ${item.price} MXN
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {!homeScreen ? (
        <Text style={[styles.topText, { marginVertical: 15 }]}>
          También te puede interesar
        </Text>
      ) : (
        <Text style={[styles.topText, { marginVertical: 15 }]}>
          {category.name}
        </Text>
      )}

      <VirtualizedList
        data={products}
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
};

export default AllCategoryProducts;

export const styles = StyleSheet.create({
  imageStyle: {
    maxHeight: 150,   
    minHeight: 150,   
    marginBottom: 3,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderColor: "#A1A1A1",
  },
  topText: {
    display: "flex",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    fontFamily: "Aristotelica Pro Display Regular",
    fontSize: 18,
    color: "#A1A1A1",
  },
  containerTitle: {
    justifyContent: "space-between",
    alignItems: "center",
    width: "95%",
    alignSelf: "center",
  },
  starStyle: {
    width: 14,
    aspectRatio: 1,
    alignSelf: "center",
    marginRight: 5,
  },
  card: {
    maxHeight: "100%",
    height: "100%",
    width: "100%",
    shadowColor: "#A1A1A1",
    justifyContent: "space-between",
  },
  cardContainer: {
    minHeight: 300,
    maxHeight: 350,
    minWidth: 150,
    width: 185,
    marginHorizontal: 8,
    borderColor: "#A1A1A1",
    borderWidth: 0.3,
    borderRadius: 10,
  },
  titleText: {
    fontFamily: "Aristotelica Pro Display Bold",
    // fontWeight: "bold",
    fontSize: 17,
    alignSelf: "center",
    textAlign: "center",
    color: "#000024",
  },
  description: {
    fontFamily: "Aristotelica Pro Display Lt",
    fontSize: 17,
    justifyContent: "center",
    color: "#000024",
    marginHorizontal: "auto",
    textAlign: "center",
    paddingVertical: 5,
  },
});
