import { createSlice } from "@reduxjs/toolkit";

const initState = {
  categories: [],
  manager: {
    updateCategory: {},
  },
};
const CategoriesSlice = createSlice({
  name: "categories",
  initialState: initState,
  reducers: {
    setCategory: (state, { payload }) => {
      state.categories = payload;
    },
    setUpdateCategory: (state, { payload }) => {
      state.manager.updateCategory = payload;
    },
  },
});

export const { setCategory, setUpdateCategory } = CategoriesSlice.actions;

export default CategoriesSlice.reducer;
