import { createSlice } from "@reduxjs/toolkit";

const beerSlice = createSlice({
  name: "beerSlice",
  initialState: { beers: null },
  reducers: {
    setBeers: (state, { payload }) => {
      state.beers = payload;
    },
  },
});

export const beerSliceActions = beerSlice.actions;

export default beerSlice;
