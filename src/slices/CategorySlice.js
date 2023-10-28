import { createSlice } from "@reduxjs/toolkit";

const initState = {
  categories: [],
};
const CategoriesSlice = createSlice({
  name: "categories",
  initialState: initState,
  reducers: {
    setCategory: (state, { payload }) => {
      state.categories = payload;
    },
  },
});

export const { setCategory } = CategoriesSlice.actions;

export default CategoriesSlice.reducer;
