import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../constants/api";
import { setAlert } from "../slices/AlertSlice";
import { logout, setRefresh } from "../slices/AuthSlice";

export const register = createAsyncThunk(
  "/register",
  async (regData, { dispatch, rejectWithValue }) => {
    try {
      const resp = await fetch(`${API.uri}/regis`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: regData.email,
          password: regData.password,
          fullname: regData.name,
        }),
      });
      const jsonData = await resp.json();
      if (resp.status >= 300) {
        dispatch(setAlert({ type: "error", content: jsonData.defaultMessage }));
        return rejectWithValue("");
      }
      dispatch(setAlert({ type: "success", content: "Đăng ký thành công" }));
      return jsonData;
    } catch (e) {
      console.log(e);
    }
  }
);
export const login = createAsyncThunk(
  "/login",
  async (loginData, { rejectWithValue, dispatch }) => {
    try {
      const resp = await fetch(`${API.uri}/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      const dataJson = await resp.json();
      if (resp.status >= 300) {
        dispatch(
          setAlert({
            type: "error",
            content: dataJson?.defaultMessage,
          })
        );
        return rejectWithValue("something error");
      }
      dispatch(setAlert({ type: "success", content: "Đăng nhập thành công" }));
      localStorage.setItem("auth_info", JSON.stringify(dataJson.user));
      localStorage.setItem("auth_token", dataJson.token);
      dispatch(setRefresh(true));
      return dataJson;
    } catch (e) {
      console.log(e);
    }
  }
);
export const activeAccount = createAsyncThunk(
  "/active",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const resp = await fetch(
        `${API.uri}/active-account?email=${data.email}&key=${data.code}`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const dataJson = await resp.json();
      if (resp.status >= 300) {
        dispatch(
          setAlert({
            type: "error",
            content: dataJson?.defaultMessage,
          })
        );
        return rejectWithValue("something error");
      }
      dispatch(
        setAlert({ type: "success", content: "Kích hoạt tài khoản thành công" })
      );
      setTimeout(() => {
        return dataJson;
      }, 1000);
    } catch (e) {
      console.log(e);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "/profile/update",
  async (updateData, { dispatch, rejectWithValue }) => {
    try {
      let token = localStorage.getItem("auth_token");
      if (!token) {
        dispatch(
          setAlert({
            type: "error",
            content: '"Có lỗi xảy ra hãy thử đăng nhập lại"',
          })
        );
        return rejectWithValue("");
      }
      const resp = await fetch(`${API.uri}/user/update`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });
      const dataJson = await resp.json();
      if (resp.status >= 300) {
        dispatch(
          setAlert({
            type: "error",
            content: dataJson?.defaultMessage,
          })
        );
        return rejectWithValue("something error");
      }
      dispatch(
        setAlert({ type: "success", content: "Cập nhật tài khoản thành công" })
      );
      return dataJson;
    } catch (e) {
      console.log(e);
    }
  }
);

export const changePassword = createAsyncThunk(
  "/user/change-password",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      let token = localStorage.getItem("auth_token");
      if (!token) {
        dispatch(
          setAlert({
            type: "error",
            content: '"Có lỗi xảy ra hãy thử đăng nhập lại"',
          })
        );
        return rejectWithValue("");
      }
      const resp = await fetch(`${API.uri}/user/change-password`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          oldPass: data.oldPassword,
          newPass: data.newPassword,
        }),
      });
      if (resp.status >= 300) {
        const dataJson = await resp.json();
        dispatch(
          setAlert({
            type: "error",
            content: dataJson?.defaultMessage,
          })
        );
        return rejectWithValue("something error");
      }
      dispatch(
        setAlert({ type: "success", content: "Đổi mật khẩu thành công" })
      );
      dispatch(logout());
    } catch (e) {
      console.log(e);
    }
  }
);
export const forgotPassword = createAsyncThunk(
  "/user/forgot-password",
  async (email, { dispatch, rejectWithValue }) => {
    try {
      const resp = await fetch(`${API.uri}/forgot-password?email=${email}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
      });
      if (resp.status >= 300) {
        const dataJson = await resp.json();
        dispatch(
          setAlert({
            type: "error",
            content: dataJson?.defaultMessage,
          })
        );
        return rejectWithValue("something error");
      }
      dispatch(
        setAlert({ type: "success", content: "Hãy kiểm tra mail của bạn" })
      );
    } catch (e) {
      console.log(e);
    }
  }
);
