import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  VirtualizedList,
} from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useFonts } from "expo-font";

const CategoryProducts: React.FC<{
  categoryName: string;
  products: any[];
  onProductSelected: (productId: string) => void;
  onHomeReset: () => void;
}> = ({ categoryName, products, onProductSelected, onHomeReset }) => {
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
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => onProductSelected(item._id)}
          style={styles.card}
        >
          <Image
            source={{ uri: item.images[0] }}
            style={[styles.imageStyle, { alignSelf: "center" }]}
          />
          <View>
            <View style={styles.containerTitle}>
              <Text style={[styles.titleText, { fontSize: 16 }]}>
                {item.name}
              </Text>
              <Text
                style={[
                  styles.titleText,
                  {
                    fontFamily: "Aristotelica Pro Display Lt",
                    fontSize: 15,
                    color: "#000024",
                  },
                ]}
              >
                {item.description}
              </Text>
              <Text style={[styles.titleText, { color: "#000024" }]}>
                ${item.price}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderTopWidth: 0.5,
          borderTopRightRadius: 15,
          borderTopLeftRadius: 15,
          borderColor: "#A1A1A1",
        }}
      >
        <Text style={[styles.topText, { color: "#000024", fontSize: 17 }]}>
          {categoryName}
        </Text>
        <TouchableOpacity onPress={() => onHomeReset()}>
          <AntDesign
            name="close"
            size={20}
            color="#000024"
            style={{ paddingRight: 15 }}
          />
        </TouchableOpacity>
      </View>
      <VirtualizedList
        data={products}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        getItemCount={getItemCount}
        pagingEnabled
        snapToAlignment={"center"}
        decelerationRate={"fast"}
        getItem={getItem}
      />
    </SafeAreaView>
  );
};

export default CategoryProducts;

export const styles = StyleSheet.create({
  imageStyle: {
    width: 90,
    aspectRatio: 1,
    marginHorizontal: 5,
    marginVertical: 10,
    borderRadius: 15,
  },
  topText: {
    display: "flex",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    fontFamily: "Aristotelica Pro Display Demibold",
    fontSize: 18,
    color: "#A1A1A1",
    textAlign: "left",
  },
  containerTitle: {
    display: "flex",
    marginLeft: 5,
    marginVertical: "auto",
    justifyContent: "space-between",
    alignItems: "flex-start",
    maxWidth: "90%",
    minHeight: "95%",
    maxHeight: "95%",
  },
  titleText: {
    fontFamily: "Aristotelica Pro Display Bold",
    fontSize: 17,
    color: "#000024",
    textAlign: "left",
  },
  container: {
    width: "100%",
    minHeight: 120,
    maxHeight: 145,
  },
  card: {
    marginHorizontal: 10,
    maxWidth: "95%",
    flexDirection: "row",
    alignContent: "center",
    borderBottomWidth: 0.5,
    marginVertical: 10,
    borderColor: "#A1A1A1",
    height: "95%",
  },
});
