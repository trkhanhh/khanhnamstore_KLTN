import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../constants/api";
import { setCategory } from "../slices/CategorySlice";

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
