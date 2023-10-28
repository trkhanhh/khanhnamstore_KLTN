import { createSlice } from "@reduxjs/toolkit";
import { login } from "../thunks/AuthThunk";

const initState = {
  logged: false,
  authToken: "",
  user: {},
  refresh: false,
};
const AuthSlice = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {
    setLogged: (state, { payload }) => {
      state.logged = payload;
    },
    setAuthData: (state, { payload }) => {
      state.user = payload;
    },
    setUser: (state, { payload }) => {
      state.user = payload;
      localStorage.setItem("auth_info", JSON.stringify(payload));
    },
    setRefresh: (state, { payload }) => {
      state.refresh = payload;
    },
    loadUser: (state) => {
      const user = JSON.parse(localStorage.getItem("auth_info"));
      const token = localStorage.getItem("auth_token");
      if (user && token) {
        state.user = user;
        state.authToken = token;
        state.logged = true;
      } else {
        state = initState;
      }
    },
    logout: (state) => {
      localStorage.removeItem("auth_info");
      localStorage.removeItem("auth_token");
      state = initState;
      window.location.assign(window.location.href);
    },
  },
});

export const {
  setLogged,
  loadUser,
  logout,
  setRefresh,
  setUser,
} = AuthSlice.actions;

export default AuthSlice.reducer;
