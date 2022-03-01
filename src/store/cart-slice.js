import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cartSlice",
    initialState: { order: JSON.parse(localStorage.getItem("beer")) || [] },
    reducers: {
        addBeerToCart: (state, { payload }) => {
            state.order.push(payload);
            //update Local Storage
            localStorage.setItem('beer', JSON.stringify(state.order))
        },

        removeBeerFromCart: (state, { payload }) => {
            if (state.order) {
                state.order.splice(
                    state.order.findIndex((beer) => beer.id === payload.id),
                    1,
                )
                //update Local Storage
                localStorage.setItem('beer', JSON.stringify(state.order))
            }
        },
    },
});

export const cartSliceActions = cartSlice.actions;

export default cartSlice;
