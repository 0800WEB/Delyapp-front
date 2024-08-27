import {
  StatusBar,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
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
    "Cherione Regular": require("../../assets/fonts/Cherione.otf"),
    "Geomanist Regular": require("../../assets/fonts/Geomanist-Regular.otf"),
    "Geomanist Medium": require("../../assets/fonts/Geomanist-Medium.otf"),
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
  const { selectedProductId } = products
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

  const productsForCategory = products.products.filter(
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
    if(selectedProductId){
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

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.top}>
        <Text style={styles.topText}>{selectedCategory?.name}</Text>
        <TouchableOpacity onPress={handleClose}>
          <AntDesign
            name="arrowleft"
            size={28}
            color="#A1A1A1"
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
              name="star"
              size={35}
              color="#A1A1A1"
              style={{ marginHorizontal: 10 }}
            />
          ) : (
            <Ionicons
              name="star-outline"
              size={35}
              color="#A1A1A1"
              style={{ marginHorizontal: 10 }}
            />
          )}
        </TouchableOpacity>
        <View>
          <Image
            source={require("@/assets/images/ICONOS-47.png")}
            style={styles.imageContainer}
          />
        </View>
        <View style={styles.middleSection}>
          <View style={{ justifyContent: "center" }}>
            <Text style={styles.commonText}>${product.price}</Text>
            {chunks.map((chunk, index) => (
              <Text key={index} style={[styles.nameText]}>
                {chunk}
              </Text>
            ))}
          </View>
          <View
            style={{
              shadowColor: "#A1A1A1",
              shadowRadius: 50,
              shadowOpacity: 15,
              shadowOffset: { width: 0, height: 4 },
              elevation: 1, 
              // borderColor: "#A1A1A1",
              // borderWidth: 0.8,
              // borderRadius: 4
            }}
          >
            <Text
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
            </Text>
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 4
              }}
            >
              <TouchableWithoutFeedback onPress={handleDiscount}>
                <Entypo
                  name="minus"
                  size={38}
                  color="#A1A1A1"
                  style={{ alignSelf: "center" }}
                />
              </TouchableWithoutFeedback>
              <Text style={[styles.commonText, { fontSize: 26 }]}>
                {quantity}
              </Text>
              <TouchableWithoutFeedback onPress={handleAdd}>
                <Entypo
                  name="plus"
                  size={38}
                  color="#A1A1A1"
                  style={{ alignSelf: "center" }}
                />
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>
        <Text style={[styles.commonText, styles.description]}>
          {product.description}
        </Text>
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
    // paddingTop: 15,
    paddingLeft: 15,
    borderBottomColor: "#949494",
    justifyContent: "space-between",
    borderBottomWidth: 1,
  },
  topText: {
    fontFamily: "Cherione Regular",
    fontSize: 20,
    color: "#949494",
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
    backgroundColor: "#A1A1A1",
    alignSelf: "center",
    aspectRatio: 1,
    height: 250,
    marginVertical: 5,
  },
  middleSection: {
    flexDirection: "row",
    marginHorizontal: 15,
    justifyContent: "space-between",
    marginVertical: 10,
    borderBottomColor: "#A1A1A1",
    borderBottomWidth: 0.8,
    paddingVertical: 5,
  },
  priceNameContainer: {
    justifyContent: "center",
  },
  commonText: {
    fontFamily: "Cherione Bold",
    fontSize: 18,
    color: "#A1A1A1",
  },
  nameText: {
    fontFamily: "Geomanist Medium",
    fontSize: 15,
    color: "#A1A1A1",
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
    fontSize: 17,
    justifyContent: "space-evenly",
    fontFamily: "Geomanist Regular",
  },
});
