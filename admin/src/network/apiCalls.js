import { loginFail, loginStart, loginSuccess } from "../redux/userReducer";
import {
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
} from "../redux/productReducer";
import { publicRequest, userRequest } from "./network";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFail());
  }
};

//get products

export const getProducts = async (dispatch) => {
  dispatch(getAllProduct());
  try {
    const res = await publicRequest.get("/products");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFail());
  }
};

//del products

export const deleteProduct = async (dispatch, id) => {
  dispatch(deleteProductStart());
  try {
    const res = await userRequest.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(res.data));
  } catch (err) {
    dispatch(deleteProductFail());
  }
};

//update products

export const updateProduct = async (dispatch, id, product) => {
  dispatch(updateProductStart());
  try {
    const res = await userRequest.put(`/products/${id}`,  product );
    dispatch(updateProductSuccess(res.data));
  } catch (err) {
    dispatch(updateProductFail());
  }
};

//add products

export const addProduct = async (dispatch, product) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post(`/products/`, product);
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductFail());
  }
};
