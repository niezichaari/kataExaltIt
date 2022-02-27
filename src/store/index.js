import "bootstrap/dist/css/bootstrap.min.css";

import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import beerSlice from "./beer-slice";
import cartSlice from "./cart-slice";

const store = configureStore({
  reducer: {
    beerSlice: beerSlice.reducer,
    cartSlice: cartSlice.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

setupListeners(store.dispatch);
export default store;
