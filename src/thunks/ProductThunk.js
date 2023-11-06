import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../constants/api";
import {
  setNewCollection,
  setNewProduct,
  setPage,
  setProductColorManager,
  setProductComment,
  setProductManager,
  setProductUpdate,
  setProducts,
  setRelatedProduct,
  setSingleProduct,
  setSingleProductComment,
  setTotalPage,
} from "../slices/ProductSlice";
import { setAlert } from "../slices/AlertSlice";

export const filterProduct = createAsyncThunk(
  "/product/filter",
  async (data, { dispatch }) => {
    try {
      let uri = `${API.uri}/product/public/searchFull?page=${
        data.page ? data.page : 0
      }&size=12`;
      if (data.price) {
        uri += `&smallPrice=${data.price.smallPrice}&largePrice=${data.price.largePrice}`;
      }
      const resp = await fetch(uri, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data.category_id ? [data.category_id] : []),
      });
      if (resp.status >= 200 && resp.status < 300) {
        const jsonData = await resp.json();
        dispatch(setProducts(jsonData.content));
        dispatch(setTotalPage(jsonData.totalPages));
        dispatch(setPage(data.page ? data.page : 0));
      }
    } catch (e) {
      console.log(e);
    }
  }
);

export const getProductById = createAsyncThunk(
  "/product/id",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      let uri = `${API.uri}/product/public/findById?id=${id}`;

      const resp = await fetch(uri, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (resp.status >= 200 && resp.status < 300) {
        const jsonData = await resp.json();
        dispatch(setSingleProduct(jsonData));
      }
    } catch (e) {
      console.log(e);
    }
  }
);
export const getProductUpdateById = createAsyncThunk(
  "/product/id",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      let uri = `${API.uri}/product/public/findById?id=${id}`;

      const resp = await fetch(uri, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (resp.status >= 200 && resp.status < 300) {
        const jsonData = await resp.json();
        dispatch(setProductUpdate(jsonData));
      }
    } catch (e) {
      console.log(e);
    }
  }
);
export const getCommentByProduct = createAsyncThunk(
  "/product/comment",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      let uri = `${API.uri}/product-comment/public/find-by-product?idproduct=${id}`;

      const resp = await fetch(uri, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (resp.status >= 200 && resp.status < 300) {
        const jsonData = await resp.json();
        dispatch(setSingleProductComment(jsonData));
      }
    } catch (e) {
      console.log(e);
    }
  }
);
export const addComment = createAsyncThunk(
  "/product/add",
  async (comment, { dispatch, rejectWithValue }) => {
    try {
      let uri = `${API.uri}/product-comment/user/create`;
      const token = localStorage.getItem("auth_token");
      const resp = await fetch(uri, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(comment),
      });
      if (resp.status >= 200 && resp.status < 300) {
        dispatch(setAlert({ type: "success", content: "Đã đánh giá" }));
        dispatch(getCommentByProduct(comment.product.id));
      }
    } catch (e) {
      console.log(e);
    }
  }
);

export const getRelatedProduct = createAsyncThunk(
  "/product/related",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      let uri = `${API.uri}/product/public/findByCategory?idCategory=${id}&page=0&size=4`;

      const resp = await fetch(uri, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (resp.status >= 200 && resp.status < 300) {
        const jsonData = await resp.json();
        dispatch(setRelatedProduct(jsonData.content));
      }
    } catch (e) {
      console.log(e);
    }
  }
);

export const getNewProduct = createAsyncThunk(
  "/product/id",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      let uri = `${API.uri}/product/public/news`;

      const resp = await fetch(uri, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (resp.status >= 200 && resp.status < 300) {
        const jsonData = await resp.json();
        dispatch(setNewProduct(jsonData.content));
      }
    } catch (e) {
      console.log(e);
    }
  }
);

export const getNewCollection = createAsyncThunk(
  "/product/id",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      let uri = `${API.uri}/product/public/new-collection`;

      const resp = await fetch(uri, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (resp.status >= 200 && resp.status < 300) {
        const jsonData = await resp.json();
        dispatch(setNewCollection(jsonData.content));
      }
    } catch (e) {
      console.log(e);
    }
  }
);

export const getProductComment = createAsyncThunk(
  "/product/id",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      let uri = `${API.uri}/product-comment/public/most-comment`;

      const resp = await fetch(uri, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (resp.status >= 200 && resp.status < 300) {
        const jsonData = await resp.json();
        console.log(jsonData);
        dispatch(setProductComment(jsonData));
      }
    } catch (e) {
      console.log(e);
    }
  }
);

export const sendFeedBack = createAsyncThunk(
  "/product/send-feedback",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setAlert({ type: "success", content: "Send feedback success" }));
    } catch (e) {
      console.log(e);
    }
  }
);

export const addProduct = createAsyncThunk(
  "/product/add",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem("auth_token");
      const resp = await fetch(`${API.uri}/product/admin/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (resp.status >= 200 && resp.status < 300) {
        dispatch(
          setAlert({ type: "success", content: "Create new product success" })
        );
        dispatch(getAllProductList());
      } else {
        dispatch(
          setAlert({ type: "error", content: resp.json()?.defaultMessage })
        );
      }
    } catch (e) {
      console.log(e);
    }
  }
);
export const updateProduct = createAsyncThunk(
  "/product/update",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem("auth_token");
      const resp = await fetch(`${API.uri}/product/admin/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (resp.status >= 200 && resp.status < 300) {
        dispatch(
          setAlert({ type: "success", content: "Update product success" })
        );
        dispatch(getAllProductList());
        dispatch(getNewCollection());
        dispatch(getNewProduct());
      } else {
        dispatch(
          setAlert({
            type: "error",
            content: resp.json()?.defaultMessage ?? "Update product error ",
          })
        );
      }
    } catch (e) {
      console.log(e);
    }
  }
);

export const getAllProductList = createAsyncThunk(
  "/product/list",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const resp = await fetch(`${API.uri}/product/public/findAll-list`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (resp.status >= 200 && resp.status < 300) {
        const data = await resp.json();
        dispatch(setProductManager(data));
      }
    } catch (e) {
      console.log(e);
    }
  }
);

export const getAllProductColorList = createAsyncThunk(
  "/product/list",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const resp = await fetch(`${API.uri}/product-color/admin/list`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (resp.status >= 200 && resp.status < 300) {
        const data = await resp.json();
        dispatch(setProductColorManager(data));
      }
    } catch (e) {
      console.log(e);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "admin/product/de;ete",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem("auth_token");
      const resp = await fetch(`${API.uri}/product/admin/delete?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (resp.status < 200 || resp.status >= 400) {
        dispatch(
          setAlert({
            type: "error",
            content: resp.json()?.defaultMessage ?? "Error when delete product",
          })
        );
        return rejectWithValue();
      }
      dispatch(setAlert({ type: "success", content: "Success" }));
      dispatch(getAllProductList());
    } catch (e) {
      dispatch(
        setAlert({ type: "error", content: "Error when delete product" })
      );
    }
  }
);
