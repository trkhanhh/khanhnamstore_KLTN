import { createSlice } from "@reduxjs/toolkit";
import { login, register } from "../thunks/AuthThunk";

const initState = {
  msg: {},
};
const AlertSlice = createSlice({
  name: "alert",
  initialState: initState,
  reducers: {
    setAlert: (state, { payload }) => {
      state.msg = payload;
    },
  },
});

export const { setAlert } = AlertSlice.actions;

export default AlertSlice.reducer;
