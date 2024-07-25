import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

import user from "./user/userReducer";

const persistConfig ={
    key: 'root',
    storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, user);

export const store = configureStore({
    reducer: persistedReducer,
  });

  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;