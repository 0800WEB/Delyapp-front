import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { LinearGradient } from "expo-linear-gradient";
import Header from "@/components/header/header";
import Categories from "@/components/categories/categories";
import SearchInput from "@/components/search/searchInput";
import Highlights from "@/components/highlights/highlights";
import Promos from "@/components/promos/promos";
import { useDispatch, useSelector } from "react-redux";
import CategoryProducts from "@/components/categoryProducts/categoryProducts";
import AllCategoryProducts from "@/components/alProducts/allProductsCategories";
import ProductDetailsScreen from "../product-details/product.detail";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/native";
//store
import { AppDispatch, RootState } from "@/store/store";
import { get_TopOrderedProducts, get_allItems } from "@/store/products/productsActions";
import { get_allCategories } from "@/store/categories/categoriesActions";
import { getCart } from "@/store/cart/cartActions";
import { getFavorites } from "@/store/favorites/favoritesActions";
import { fetchUserOrders } from "@/store/order/orderActions";

type DrawerNavProp = DrawerNavigationProp<RootParamList>;

const HomeScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [reset, setReset] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<DrawerNavProp>();

  useFocusEffect(
    useCallback(() => {
      dispatch(get_allItems());
      dispatch(get_allCategories());
      dispatch(getCart());
      dispatch(getFavorites());
      dispatch(get_TopOrderedProducts());
      dispatch(fetchUserOrders());
  
      // Return a cleanup function to unsubscribe if necessary
      return () => {};
    }, [])
  );

  const products = useSelector((state: RootState) => state.products);
  const categories = useSelector((state: RootState) => state.categories);
  // const cartItems = useSelector((state: RootState) => state.cart.cart.products);
  const selectedProduct = useSelector(
    (state: RootState) => state.products.selectedProductId
  );

  useFocusEffect(
    useCallback(() => {
      if (selectedProduct) {
        setSelectedProductId(selectedProduct);
      } else if (!selectedProduct) {
        setSelectedProductId("");
      }
    }, [selectedProduct])
  );

  // const userInfo = useSelector((state: RootState) => state.user);
  // console.log("Cart Items: ", cartItems.length);
  if (categories) {
    useEffect(() => {
      if (selectedCategory) {
        const selectedCategoryObj = (categories.categories as Category[])?.find(
          (category: Category) => {
            return (
              category.name.toLowerCase() == selectedCategory.toLowerCase()
            );
          }
        );
        // console.log("Cat:", selectedCategoryObj);
        let selectedProducts: Product[] = [];
        if (selectedCategoryObj) {
          selectedProducts = (products.products as Product[])?.filter(
            (product: Product) => product.category === selectedCategoryObj._id
          );
          // console.log(selectedProducts);
          setFilteredProducts(selectedProducts);
        } else {
          console.log(
            "Categoría seleccionada no encontrada en las categorías disponibles"
          );
        }
      }
    }, [selectedCategory]);
  }
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
      <SearchInput homeScreen={true} />
      {selectedProductId !== "" ? (
        <ProductDetailsScreen
          productId={selectedProductId}
          setProductId={setSelectedProductId}
        />
      ) : (
        <ScrollView style={{ flex: 1, marginBottom: 25 }}>
          <Categories
            onItemSelected={(title: string) => {
              setSelectedCategory(title);
              // console.log(title);
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
              <Highlights selectedProductId={handleProductSelected} />
              <Promos />
              {categories.categories ? categories?.categories?.map((category: Category) => {
                const productsForCategory = products && products?.products?.filter(
                  (product: Product) => product?.category === category?._id
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
              }) : ""}
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
    //Color de la sombra
    shadowColor: "#54AB6A",
    shadowOffset: {
      width: 15,
      height: 15,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    right: 25,
    bottom: 25,
  },
  floatingButtonText: {
    marginLeft: -4,
  },
});

export default HomeScreen;
