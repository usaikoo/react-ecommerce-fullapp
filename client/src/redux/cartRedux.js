import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:'cart',
    initialState:{
        products: [],
        quantity: 0,
        total: 0,
    },
    reducers: {
        addProduct: (state, action) => {
          state.quantity += 1;
          state.products.push(action.payload);
          state.total += action.payload.price * action.payload.quantity;
        },
        clearProduct: (state, action) => {
            state.quantity = 0;
            state.products = [];
            state.total = 0;
          },
      },
})

//for add to cart
export const {addProduct, clearProduct} = cartSlice.actions;

//to use in store js 
export default cartSlice.reducer