import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import ProductSlice from "../Redux/ProductSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    product: ProductSlice,
  },
});

export default store;
