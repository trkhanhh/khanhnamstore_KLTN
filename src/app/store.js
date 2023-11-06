import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../slices/AuthSlice.js";
import AlertReducer from "../slices/AlertSlice.js";
import CategoryReducer from "../slices/CategorySlice.js";
import AddressReducer from "../slices/AddressSlice.js";
import productReducer from "../slices/ProductSlice.js";
import CartReducer from "../slices/CartSlice.js";
import OrderSlice from "../slices/OrderSlice.js";
import UserSlice from "../slices/UserSlice.js";

export const store = configureStore({
  reducer: {
    authReducer: AuthReducer,
    alertReducer: AlertReducer,
    categoryReducer: CategoryReducer,
    productReducer: productReducer,
    addressReducer: AddressReducer,
    cartReducer: CartReducer,
    orderReducer: OrderSlice,
    userReducer: UserSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
