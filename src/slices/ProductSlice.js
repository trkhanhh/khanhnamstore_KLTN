import { createSlice } from "@reduxjs/toolkit";

const initState = {
  products: [],
  totalPage: 0,
  page: 0,
  singleProduct: {},
  singleProductComment: [],
  relatedProduct: [],
  newProduct: [],
  newCollection: [],
  productComment:[]
};
const ProductSlice = createSlice({
  name: "products",
  initialState: initState,
  reducers: {
    setProducts: (state, { payload }) => {
      state.products = payload;
    },
    setTotalPage: (state, { payload }) => {
      state.totalPage = payload;
    },
    setPage: (state, { payload }) => {
      state.page = payload;
    },
    setSingleProduct: (state, { payload }) => {
      state.singleProduct = payload;
    },
    setSingleProductComment: (state, { payload }) => {
      state.singleProductComment = payload;
    },
    setRelatedProduct: (state, { payload }) => {
      state.relatedProduct = payload;
    },
    setNewProduct: (state, { payload }) => {
      state.newProduct = payload;
    },
    setNewCollection: (state, { payload }) => {
      state.newCollection = payload;
    },
    setProductComment:(state,{payload})=>{
      state.productComment = payload;
    }
  },
});

export const {
  setProducts,
  setTotalPage,
  setPage,
  setSingleProduct,
  setSingleProductComment,
  setRelatedProduct,
  setNewProduct,
  setNewCollection,
  setProductComment
} = ProductSlice.actions;

export default ProductSlice.reducer;
