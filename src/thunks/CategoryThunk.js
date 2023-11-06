import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../constants/api";
import { setCategory, setUpdateCategory } from "../slices/CategorySlice";
import { setAlert } from "../slices/AlertSlice";

export const getAllCategories = createAsyncThunk(
  "/category/get-all",
  async (_, { dispatch }) => {
    try {
      const resp = await fetch(`${API.uri}/category/public/findAll`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (resp.status == 200) {
        const jsonData = await resp.json();
        dispatch(setCategory(jsonData?.content));
      }
    } catch (e) {
      console.log(e);
    }
  }
);
export const getById = createAsyncThunk(
  "/category/get-all",
  async (id, { dispatch }) => {
    try {
      const token = localStorage.getItem("auth_token");
      const resp = await fetch(`${API.uri}/category/admin/findById?id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (resp.status == 200) {
        const jsonData = await resp.json();
        dispatch(setUpdateCategory(jsonData));
      }
    } catch (e) {
      console.log(e);
    }
  }
);

export const addCategory = createAsyncThunk(
  "/category/add",
  async (data, { dispatch }) => {
    try {
      const token = localStorage.getItem("auth_token");
      const resp = await fetch(`${API.uri}/category/admin/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (resp.status >= 200 && resp.status < 300) {
        dispatch(
          setAlert({ type: "success", content: "Add category success" })
        );
        dispatch(getAllCategories());
      }
    } catch (e) {
      console.log(e);
    }
  }
);

export const updateCategory = createAsyncThunk(
  "/category/update",
  async (data, { dispatch }) => {
    try {
      const token = localStorage.getItem("auth_token");
      const resp = await fetch(`${API.uri}/category/admin/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (resp.status >= 200 && resp.status < 300) {
        dispatch(
          setAlert({ type: "success", content: "Update category success" })
        );
        dispatch(getAllCategories());
      }
    } catch (e) {
      console.log(e);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "/category/add",
  async (id, { dispatch }) => {
    try {
      const token = localStorage.getItem("auth_token");
      const resp = await fetch(`${API.uri}/category/admin/delete?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (resp.status >= 200 && resp.status < 300) {
        dispatch(
          setAlert({ type: "success", content: "Delete category success" })
        );
        dispatch(getAllCategories());
      } else {
        dispatch(
          setAlert({
            type: "error",
            content: "Category have products can not delete",
          })
        );
      }
    } catch (e) {
      console.log(e);
    }
  }
);
