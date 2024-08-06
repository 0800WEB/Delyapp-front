import {
  View,
  ScrollView,
  DrawerLayoutAndroid,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useEffect, useRef, useState } from "react";
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

const HomeScreen: React.FC = () => {
  const drawer = useRef<DrawerLayoutAndroid>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const isDrawerOpen = useSelector((state: RootState) => state.drawer.isOpen);
  useEffect(() => {
    dispatch(get_allItems());
    dispatch(get_allCategories());
    dispatch(getCart());
  }, []);
  const products = useSelector((state: RootState) => state.products);
  // console.log("Products: ", products);
  const categories = useSelector((state: RootState) => state.categories);
  // console.log("Categories: ", categories);

  const logout = async () => {
    await AsyncStorage.removeItem("userToken");
    await AsyncStorage.removeItem("userInfo");
    dispatch(closeDrawer());
    router.push("select-sign");
  };

  useEffect(() => {
    // console.log("Categoría seleccionada: ", selectedCategory);
    // console.log("Products: ", products.products);
    // console.log("Categories: ", categories.categories);
    if (selectedCategory) {
      const selectedCategoryObj = (categories.categories as Category[]).find(
        (category: Category) => category.name === selectedCategory
      );
      // console.log(selectedCategoryObj);
      let selectedProducts: Product[] = [];
      if (selectedCategoryObj) {
        selectedProducts = (products.products as Product[]).filter(
          (product: Product) => product.category === selectedCategoryObj._id
        );
        setFilteredProducts(selectedProducts);
        // console.log("Productos seleccionados: ", selectedProducts);
      } else {
        console.log(
          "Categoría seleccionada no encontrada en las categorías disponibles"
        );
      }
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (isDrawerOpen) {
      drawer.current?.openDrawer();
    } else {
      drawer.current?.closeDrawer();
    }
  }, [isDrawerOpen]);

  const handleProductSelected = (productId: string) => {
    setSelectedProductId(productId);
    // console.log("Producto Id: ", productId);
    // dispatch(selectProduct(productId));
    // router.push(`/(routes)/product-details`);
    // router.push({pathname: `/(routes)/product-details`, params: { productId }});
  };

  // console.log("Producto Seleccionado: ", selectedProductId);

  const navigationView = () => (
    <View style={[styles.container, styles.navigationContainer]}>
      <TouchableOpacity onPress={() => router.push("/(routes)/home")}>
        <Text style={styles.paragraph}>INICIO</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/(routes)/user")}>
        <Text style={styles.paragraph}>PERFIL</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/(routes)/cart")}>
        <Text style={styles.paragraph}>CARRITO</Text>
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
        {selectedProductId !== '' ? (
          <ProductDetailsScreen productId={selectedProductId} setProductId={setSelectedProductId} />
        ) : (
          <ScrollView style={{ flex: 1, marginBottom: 25 }}>
            <SearchInput homeScreen={true} />
            <Categories
              onItemSelected={(title: string) => {
                setSelectedCategory(title);
              }}
            />
            {selectedCategory ? (
              <>
                <Promos />
                <CategoryProducts
                  categoryName={selectedCategory}
                  products={filteredProducts}
                  onProductSelected={handleProductSelected}
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
