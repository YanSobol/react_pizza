import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
//import {persistReducer, persistStore} from 'redux-persist'
import cartReducer from "./slices/cartSlice";
import filter from "./slices/filterSlice";
import pizza from "./slices/pizzaSlice";
import { useDispatch } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  filter,
  cart: persistReducer(persistConfig, cartReducer),
  pizza,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(thunk),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
