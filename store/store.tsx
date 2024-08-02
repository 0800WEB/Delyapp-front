import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import user from "./user/userReducer";
import drawerReducer from "./drawer/drawerReducer";
import productsReducer from "./products/productsReducer";
import categoriesReducer from "./categories/categoriesReducer";
import cartReducer from "./cart/cartReducer";
import favoriteReducer from "./favorites/favoritesReducer";

// Configuración de persistencia
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["user"],
};

// Combina todos los reducers
const rootReducer = combineReducers({
  user: user,
  drawer: drawerReducer,
  products: productsReducer,
  categories: categoriesReducer,
  cart: cartReducer,
  favorite: favoriteReducer,
});

// Reducer persistido
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configuración del store con middleware
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
        ignoredPaths: ["register", "rehydrate"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
