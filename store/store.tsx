import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import user from "./user/userReducer";
import productsReducer from "./products/productsReducer";
import categoriesReducer from "./categories/categoriesReducer";
import cartReducer from "./cart/cartReducer";
import favoriteReducer from "./favorites/favoritesReducer";
import couponReducer from "./coupon/couponReducer";
import orderReducer from "./order/orderReducer";
import paymentReducer from "./paymentMethods/paymentMethodsReducer";

// Configuración de persistencia
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["user"],
};

// Combina todos los reducers
const rootReducer = combineReducers({
  user: user,
  products: productsReducer,
  categories: categoriesReducer,
  cart: cartReducer,
  favorite: favoriteReducer,
  coupon: couponReducer,
  order: orderReducer,
  payment: paymentReducer,
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
