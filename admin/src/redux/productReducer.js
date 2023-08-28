import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL PRODUCT
    getAllProduct: (state) => {
      state.isFetching = true;
    },
    getProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products = action.payload;
    },
    getProductFail: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    //DELETE A PRODUCT
    deleteProductStart: (state) => {
      state.isFetching = true;
    },
    deleteProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products.splice(
        state.products.findIndex((item) => item._id === action.payload.id),
        1
      );
    },
    deleteProductFail: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    //Update A PRODUCT
    updateProductStart: (state) => {
      state.isFetching = true;
    },
    updateProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products[
        state.products.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.product;
    },
    updateProductFail: (state) => {
      state.isFetching = false;
      state.error = true;
    },

     //Update A PRODUCT
     addProductStart: (state) => {
      state.isFetching = true;
    },
    addProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products.push(action.payload)
    },
    addProductFail: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

//for add to cart
export const {
  getAllProduct,
  getProductSuccess,
  getProductFail,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFail,

  updateProductStart,
  updateProductSuccess,
  updateProductFail,

  addProductStart,
  addProductSuccess,
  addProductFail,
} = productSlice.actions;

//to use in store js
export default productSlice.reducer;
