import { createSlice } from "@reduxjs/toolkit";

const initState = {
  products: [],
  search: [],
  totalPageSearch: 0,
  pageSearch: 0,
  totalPage: 0,
  page: 0,
  singleProduct: {},
  singleProductComment: [],
  relatedProduct: [],
  newProduct: [],
  newCollection: [],
  productComment: [],
  adminSearch: [],
  manager: {
    products: [],
    colors: [],
    productUpdate: {},
  },
};
const ProductSlice = createSlice({
  name: "products",
  initialState: initState,
  reducers: {
    setSearch: (state, { payload }) => {
      state.search = payload;
    },
    setTotalPageSearch: (state, { payload }) => {
      state.totalPageSearch = payload;
    },
    setPageSearch: (state, { payload }) => {
      state.pageSearch = payload;
    },
    setProductUpdate: (state, { payload }) => {
      state.manager.productUpdate = payload;
    },
    setProductColorManager: (state, { payload }) => {
      state.manager.colors = payload;
    },
    setProductManager: (state, { payload }) => {
      state.manager.products = payload;
    },
    setAdminSearch: (state, { payload }) => {
      state.adminSearch = payload;
    },
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
    setProductComment: (state, { payload }) => {
      state.productComment = payload;
    },
  },
});

export const {
  setProducts,
  setProductColorManager,
  setTotalPage,
  setPage,
  setSingleProduct,
  setSingleProductComment,
  setRelatedProduct,
  setNewProduct,
  setNewCollection,
  setProductComment,
  setProductManager,
  setAdminSearch,
  setProductUpdate,
  setPageSearch,
  setSearch,
  setTotalPageSearch,
} = ProductSlice.actions;

export default ProductSlice.reducer;
