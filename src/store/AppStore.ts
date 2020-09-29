import { Store } from "redux";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import createRootReducer, { IRootState } from "../reducer/CombinedReducer";

/**
 *  Redux persist - allows data from redux to be stored in local storage
 *  Redux state is then rehydrated from local storage after the application has been reloaded
 */
const persistConfig = {
  key: 'root',
  storage,
}
const persistedReducer = persistReducer(persistConfig, createRootReducer())

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false
});

/**
 *  Redux toolkit - allows for easier redux setup and nice features, like redux slice
 *  Contains thunk and redux dev tools middleware by default 
 */
export const getStore = (): Store<IRootState> =>
  configureStore({
    reducer: persistedReducer,
    middleware: customizedMiddleware
  }, );