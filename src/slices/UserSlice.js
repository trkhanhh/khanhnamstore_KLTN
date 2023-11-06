import { createSlice } from "@reduxjs/toolkit";

const initState = {
  users: [],
  search: [],
  refresh: false,
};
const UserSlice = createSlice({
  name: "users",
  initialState: initState,
  reducers: {
    setUsers: (state, { payload }) => {
      state.users = payload;
    },
    setSearch: (state, { payload }) => {
      state.search = payload;
    },
  },
});

export const { setUsers ,setSearch} = UserSlice.actions;

export default UserSlice.reducer;
