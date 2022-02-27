import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cartSlice",
    initialState: { order: [] },
    reducers: {
        addBeerToCart: (state, { payload }) => {
            state.order.push(payload);
        },

        removeBeerFromCart: (state, { payload }) => {
            if (state.order) {
                state.order.splice(
                    state.order.findIndex((beer) => beer.id === payload.id),
                    1,
                )
            }
        },
    },
});

export const cartSliceActions = cartSlice.actions;

export default cartSlice;
