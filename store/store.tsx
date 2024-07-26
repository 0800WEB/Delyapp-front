import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

import user from "./user/userReducer";
import drawerReducer from "./drawer/drawerReducer";
import productsReducer from "./products/productsReducer";
import categoriesReducer from "./categories/categoriesReducer";

// const persistConfig ={
//     key: 'root',
//     storage: AsyncStorage,
// }

// const rootReducer = combineReducers({
//     user: user,
//     drawer: drawerReducer,
//   });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//     reducer: persistedReducer
//   });
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, user);

export const store = configureStore({
  reducer: {
    user: persistedReducer,
    drawer: drawerReducer,
    products: productsReducer,
    categories: categoriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
