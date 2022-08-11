import { configureStore, combineReducers } from "@reduxjs/toolkit";

import cartReducer from "./cartRedux";
import productsReducer from "./productsRedux";
import categoriesReducer from "./categoriesRedux";
import singleProductReducer from "./singleProductRedux";
import singleCategoryReducer from "./singleCategoryRedux";
import ordersReducer from "./ordersRedux"
import userReducer from "./loginRedux";
import footerReducer from "./footerRedux";
import themeReducer from "./themeRedux";

import {
   persistStore,
   persistReducer,
   FLUSH,
   REHYDRATE,
   PAUSE,
   PERSIST,
   PURGE,
   REGISTER,
 } from "redux-persist";
 import storage from "redux-persist/lib/storage";


 const persistConfig = {
   key: "root",
   version: 1,
   blacklist: ['products'],
   storage,
 };



const rootReducer = combineReducers({  cart: cartReducer,  user: userReducer, products: productsReducer, categories: categoriesReducer , singleProduct: singleProductReducer , singleCategory: singleCategoryReducer , orders: ordersReducer , footer: footerReducer, theme: themeReducer});


const persistedReducer = persistReducer(persistConfig, rootReducer);

export const storeme =  configureStore({
   reducer:  persistedReducer,
 
   
   middleware: (getDefaultMiddleware) =>
   getDefaultMiddleware({
     serializableCheck: {
       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
     },
   }),

})
export let persistor = persistStore(storeme);