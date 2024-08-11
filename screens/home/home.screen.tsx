import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useMemo, useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Header from "@/components/header/header";
import Categories from "@/components/categories/categories";
import SearchInput from "@/components/search/searchInput";
import Highlights from "@/components/highlights/highlights";
import Promos from "@/components/promos/promos";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { openDrawer, closeDrawer } from "@/store/drawer/drawerActions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { get_allItems, selectProduct } from "@/store/products/productsActions";
import { get_allCategories } from "@/store/categories/categoriesActions";
import CategoryProducts from "@/components/categoryProducts/categoryProducts";
import AllCategoryProducts from "@/components/alProducts/allProductsCategories";
import { getCart } from "@/store/cart/cartActions";
import ProductDetailsScreen from "../product-details/product.detail";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/native";
import { getFavorites } from "@/store/favorites/favoritesActions";
import { PanResponder, Animated } from "react-native";
import { Dimensions } from "react-native";

type DrawerNavProp = DrawerNavigationProp<RootParamList>;

const HomeScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [reset, setReset] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<DrawerNavProp>();

  useEffect(() => {
    dispatch(get_allItems());
    dispatch(get_allCategories());
    dispatch(getCart());
    dispatch(getFavorites());
  }, []);
  const products = useSelector((state: RootState) => state.products);
  // console.log("Products: ", products);
  const categories = useSelector((state: RootState) => state.categories);
  // console.log("Categories: ", categories);
  const cartItems = useSelector((state: RootState) => state.cart.cart.products);
  // console.log("Cart: ", cartItems);

  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const buttonRadius = 30; // El radio de tu botón

  const pan = new Animated.ValueXY();
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      pan.setOffset({
        x: pan.x._value,
        y: pan.y._value
      });
    },
    onPanResponderMove: Animated.event(
      [
        null,
        {
          dx: pan.x, // x,y are Animated.Value
          dy: pan.y,
        },
      ],
      { useNativeDriver: false }
    ),
    onPanResponderRelease: (e, gesture) => {
      pan.flattenOffset();
    },
  });

  const logout = async () => {
    await AsyncStorage.removeItem("userToken");
    await AsyncStorage.removeItem("userInfo");
    dispatch(closeDrawer());
    router.push("select-sign");
  };

  useEffect(() => {
    if (selectedCategory) {
      const selectedCategoryObj = (categories.categories as Category[]).find(
        (category: Category) => category.name === selectedCategory
      );
      let selectedProducts: Product[] = [];
      if (selectedCategoryObj) {
        selectedProducts = (products.products as Product[]).filter(
          (product: Product) => product.category === selectedCategoryObj._id
        );
        setFilteredProducts(selectedProducts);
      } else {
        console.log(
          "Categoría seleccionada no encontrada en las categorías disponibles"
        );
      }
    }
  }, [selectedCategory]);

  const handleProductSelected = (productId: string) => {
    setSelectedProductId(productId);
  };

  const handleResetHome = () => {
    setSelectedCategory(null);
    setFilteredProducts([]);
    setSelectedProductId("");
    setReset(true);
  };

  return (
    <LinearGradient
      colors={["#F9F6F7", "#F9F6F7"]}
      style={{ flex: 1, paddingTop: 30 }}
    >
      <Header
        openDrawer={() => navigation.dispatch(DrawerActions.openDrawer())}
      />
      {cartItems.length > 0 && (
        <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.floatingButton,
          {
            left: 0,
            top: 25,
            transform: [
              {
                translateX: pan.x.interpolate({
                  inputRange: [-1, screenWidth - buttonRadius * 2 + 1],
                  outputRange: [0, screenWidth - buttonRadius * 2],
                  extrapolate: 'clamp'
                })
              },
              {
                translateY: pan.y.interpolate({
                  inputRange: [-1, screenHeight - buttonRadius * 2 + 1],
                  outputRange: [0, screenHeight - buttonRadius * 2],
                  extrapolate: 'clamp'
                })
              }
            ]
          }
        ]}
      >
        <TouchableOpacity onPress={() => navigation.navigate("CARRITO")}>
          <AntDesign
            name="shoppingcart"
            size={35}
            color={"white"}
            style={[styles.floatingButtonText]}
          />
        </TouchableOpacity>
      </Animated.View>
      )}
      {selectedProductId !== "" ? (
        <ProductDetailsScreen
          productId={selectedProductId}
          setProductId={setSelectedProductId}
        />
      ) : (
        <ScrollView style={{ flex: 1, marginBottom: 25 }}>
          <SearchInput homeScreen={true} />
          <Categories
            onItemSelected={(title: string) => {
              setSelectedCategory(title);
            }}
            resetSelectedTitle={reset}
          />
          {selectedCategory ? (
            <>
              <CategoryProducts
                categoryName={selectedCategory}
                products={filteredProducts}
                onProductSelected={handleProductSelected}
                onHomeReset={handleResetHome}
              />
            </>
          ) : (
            <>
              <Highlights />
              <Promos />
              {categories.categories.map((category: Category) => {
                const productsForCategory = products.products.filter(
                  (product: Product) => product.category === category._id
                );
                return (
                  <AllCategoryProducts
                    key={category._id}
                    category={category}
                    products={productsForCategory}
                    onProductSelected={handleProductSelected}
                    homeScreen={true}
                  />
                );
              })}
            </>
          )}
        </ScrollView>
      )}
    </LinearGradient>
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
  floatingButton: {
    position: "absolute",
    width: 70,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#A1A1A1",
    borderRadius: 35,
    zIndex: 100,
    shadowColor: "#54AB6A",
    shadowOffset: {
      width: 15,
      height: 15,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  floatingButtonText: {
    marginLeft: -4,
  },
});

export default HomeScreen;
