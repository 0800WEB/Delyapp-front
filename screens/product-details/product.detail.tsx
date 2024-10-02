import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { FontAwesome, Entypo, Ionicons, AntDesign } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import AllCategoryProducts from "@/components/alProducts/allProductsCategories";
import { useFonts } from "expo-font";
import { addToCart, removeFromCart, getCart } from "@/store/cart/cartActions";
import { clearSelectedProduct } from "@/store/products/productsActions";
import {
  toggleFavorite,
  removeFromFavorites,
  getFavorites,
} from "@/store/favorites/favoritesActions";

interface ProductDetailsScreenProps {
  productId: string;
  setProductId: React.Dispatch<React.SetStateAction<string>>;
}

const ProductDetailsScreen: React.FC<ProductDetailsScreenProps> = ({
  productId,
  setProductId,
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

  const dispatch = useDispatch<AppDispatch>();
  if (!fontsLoaded && !fontError) {
    return null;
  }

  useEffect(() => {
    dispatch(getFavorites());
  }, [productId]);

  const cartProducts = useSelector(
    (state: RootState) => state.cart.cart.products
  );
  const products = useSelector((state: RootState) => state.products);
  const { selectedProductId } = products;
  const categories = useSelector((state: RootState) => state.categories);
  const favoriteProducts = useSelector(
    (state: RootState) => state.favorite.favorites.products
  );

  const product = (products.products as Product[]).find(
    (product: Product) => product._id === productId
  );

  const selectedCategory = (categories.categories as Category[]).find(
    (category: Category) => category._id === product?.category
  );

  const productsForCategory = products.products?.filter(
    (product: Product) => product.category === selectedCategory?._id
  );

  const name = product?.name;
  const words = name?.split(" ") ?? [];
  const chunks = [];

  for (let i = 0; i < words.length; i += 3) {
    chunks.push(words?.slice(i, i + 3).join(" "));
  }

  //Quantity management
  let initialQuantity = 0;
  if (cartProducts) {
    const cartProduct = (cartProducts as CartProduct[]).find(
      (product: CartProduct) => product.product._id === productId
    );
    initialQuantity = cartProduct ? cartProduct.quantity : 0;
  }

  const [quantity, setQuantity] = useState(initialQuantity);

  useEffect(() => {
    let newQuantity = 0;
    if (cartProducts) {
      const cartProduct = (cartProducts as CartProduct[]).find(
        (product: CartProduct) => product.product._id === productId
      );
      newQuantity = cartProduct ? cartProduct.quantity : 0;
    }
    setQuantity(newQuantity);
  }, [cartProducts, productId]);

  //Favorite management
  let initialFavorite = false;
  if (favoriteProducts) {
    const favoriteProduct = (favoriteProducts as Product[]).find(
      (product: Product) => product._id === productId
    );
    initialFavorite = favoriteProduct ? true : false;
  }

  const [favoriteSelect, setFavoriteSelect] = useState(initialFavorite);

  useEffect(() => {
    let newFavorite = false;
    if (favoriteProducts) {
      const favoriteProduct = (favoriteProducts as Product[]).find(
        (product: Product) => product._id === productId
      );
      newFavorite = favoriteProduct ? true : false;
    }
    setFavoriteSelect(newFavorite);
  }, [favoriteProducts, productId]);

  const handleDiscount = async () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      await dispatch(removeFromCart({ productId, quantity: 1 }));
      await dispatch(getCart());
    }
  };

  const handleAdd = async () => {
    setQuantity(quantity + 1);
    await dispatch(addToCart({ productId, quantity: 1 }));
    await dispatch(getCart());
  };

  const handleProductSelected = (newProductId: string) => {
    //   dispatch(selectProduct(newProductId));
    //   router.push(`/(routes)/product-details`);
    setQuantity(0);
    setProductId(newProductId);
  };

  const handleClose = () => {
    // router.push("/(routes)/home");
    if (selectedProductId) {
      dispatch(clearSelectedProduct());
    }
    setProductId("");
  };

  const handleFavorite = async () => {
    if (favoriteSelect) {
      await dispatch(removeFromFavorites({ productId }));
      await dispatch(getFavorites());
    } else {
      await dispatch(toggleFavorite({ productId }));
      await dispatch(getFavorites());
    }
    setFavoriteSelect(!favoriteSelect);
  };
  // console.log(productId);
  // console.log(favoriteSelect);

  if (!product) {
    return (
      <View style={{ flex: 1, marginTop: 25 }}>
        <View style={styles.top}>
          <Text style={styles.topText}>{selectedCategory?.name}</Text>
          <TouchableOpacity onPress={handleClose}>
            <AntDesign
              name="close"
              size={28}
              color="#A1A1A1"
              style={{ height: 40, aspectRatio: 1 }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Text
            style={{
              textAlign: "center",
            }}
          >
            Product not found
          </Text>
        </View>
      </View>
    );
  }

  // console.log(product)

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.top}>
        <Text style={styles.topText}>
          {selectedCategory?.name.toUpperCase()}
        </Text>
        <TouchableOpacity onPress={handleClose}>
          <AntDesign
            name="close"
            size={20}
            color="#000024"
            style={{ height: 40, aspectRatio: 1 }}
          />
        </TouchableOpacity>
      </View>
      <ScrollView style={{ marginBottom: 10 }}>
        <TouchableOpacity
          style={{
            marginVertical: 10,
            alignItems: "flex-end",
            marginHorizontal: 10,
          }}
          onPress={handleFavorite}
        >
          {favoriteSelect ? (
            <Ionicons
              name="heart"
              size={35}
              color="#00BFFF"
              style={{ marginHorizontal: 10 }}
            />
          ) : (
            <Ionicons
              name="heart-outline"
              size={35}
              color="#00BFFF"
              style={{ marginHorizontal: 10 }}
            />
          )}
        </TouchableOpacity>
        <View>
          <Image
            source={{ uri: product.images[0] }}
            style={styles.imageContainer}
          />
        </View>
        <View style={styles.middleSection}>
          <View style={{ justifyContent: "center", width: "68%"}}>
            <Text
              style={[
                styles.commonText,
                { color: "#000024", fontFamily: "Aristotelica Pro Display Bold" },
              ]}
            >
              ${Number(product.price).toFixed(2)} MXN
            </Text>
            <Text style={[styles.nameText]}>{product?.name}</Text>
          </View>
          <View
            style={{
              shadowColor: "#A1A1A1",
              shadowRadius: 50,
              shadowOpacity: 15,
              shadowOffset: { width: 0, height: 4 },
              width: "30%",
              // borderColor: "#A1A1A1",
              // borderWidth: 0.8,
              // borderRadius: 4
            }}
          >
            {/* <Text
              style={[
                styles.nameText,
                {
                  backgroundColor: "#3fd009",
                  color: "white",
                  // paddingHorizontal: 2,
                  padding: 4,
                  borderRadius: 4,
                  fontFamily:"Cherione Regular",
                  fontSize: 14
                },
              ]}
            >
              AGREGAR AL CARRITO
            </Text> */}
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 4,
              }}
            >
              <TouchableWithoutFeedback onPress={handleDiscount}>
                <Entypo
                  name="minus"
                  size={30}
                  color="#000024"
                  style={{ alignSelf: "center" }}
                />
              </TouchableWithoutFeedback>
              <Text
                style={[
                  styles.commonText,
                  { fontSize: 33, paddingHorizontal: 5 },
                ]}
              >
                {quantity}
              </Text>
              <TouchableWithoutFeedback onPress={handleAdd}>
                <Entypo
                  name="plus"
                  size={30}
                  color="#000024"
                  style={{ alignSelf: "center" }}
                />
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>
        <View>
          <Text style={[styles.commonText, styles.description]}>
            {product.description}
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: "auto",
              width: "90%",
              justifyContent: "space-between",
              alignItems: "center",
              alignContent: "center",
              backgroundColor:"#C4F6F3",
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 40,
              marginTop: 15,
            }}
          >
            <Entypo
              name="warning"
              size={28}
              color="#000024"
              style={{ alignSelf: "center", justifyContent:"center",height:30 }}
            />
            <Text
              style={{
                fontSize: 12,
                justifyContent: "flex-start",
                width: "85%",
                fontFamily: "Aristotelica Pro Display Regular",
                textAlign: "center"
              }}
            >
              Al momento de la entrega se solicitará una identificación oficial
              que avale la mayoría de edad.
            </Text>
          </View>
        </View>
        <AllCategoryProducts
          key={selectedCategory?._id}
          category={selectedCategory!}
          products={productsForCategory}
          onProductSelected={handleProductSelected}
          homeScreen={false}
        />
      </ScrollView>
    </View>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  notFoundText: {
    textAlign: "center",
  },
  scrollView: {
    marginBottom: 10,
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
  favoriteButton: {
    marginVertical: 10,
    alignItems: "flex-end",
    marginHorizontal: 10,
  },
  favoriteIcon: {
    marginHorizontal: 10,
  },
  imageContainer: {
    alignSelf: "center",
    aspectRatio: 1,
    height: 250,
    marginVertical: 5,
    borderRadius: 15,
  },
  middleSection: {
    flexDirection: "row",
    marginHorizontal: "auto",
    justifyContent: "space-between",
    marginVertical: 15,
    borderBottomColor: "#A1A1A1",
    borderBottomWidth: 0.3,
    paddingTop: 5,
    paddingBottom: 15,
    width: "95%",
  },
  priceNameContainer: {
    justifyContent: "center",
  },
  commonText: {
    fontFamily: "Aristotelica Pro Display Regular",
    fontSize: 18,
  },
  nameText: {
    fontFamily: "Aristotelica Pro Display Demibold",
    fontSize: 16,
    color: "#000024",
    width: "100%",
    lineHeight: 18,
  },
  addToCartContainer: {
    alignItems: "center",
  },
  addToCartText: {
    backgroundColor: "#A1A1A1",
    color: "white",
    padding: 2,
    borderRadius: 4,
  },
  quantityContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  quantityIcon: {
    alignSelf: "center",
  },
  quantityText: {
    fontSize: 20,
  },
  description: {
    marginHorizontal: 15,
    fontSize: 15,
    color: "#A1A1A1",
    justifyContent: "space-evenly",
    fontFamily: "Aristotelica Pro Display Regular",
  },
});
