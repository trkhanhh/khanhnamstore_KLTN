import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../constants/api";
import { setAddresses, setAllAddress } from "../slices/AddressSlice";
import { setAlert } from "../slices/AlertSlice";

export const getAllAddressByUser = createAsyncThunk(
  "address/all/user",
  async (_, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("auth_token");
    const resp = await fetch(`${API.uri}/user-address/user/my-address`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (resp.status >= 200 && resp.status < 300) {
      const dataJson = await resp.json();
      dispatch(setAddresses(dataJson));
    }
  }
);
export const getAllAddress = createAsyncThunk(
  "address/all",
  async (_, { dispatch, rejectWithValue }) => {
    const resp = await fetch(`${API.uri}/address/public/province`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (resp.status >= 200 && resp.status < 300) {
      const dataJson = await resp.json();
      dispatch(setAllAddress(dataJson));
    }
  }
);

export const addNewAddress = createAsyncThunk(
  "address/add",
  async (data, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      dispatch(
        setAllAddress({
          type: "error",
          content: "Phiên đăng nhập đã hết hạn vui lòng thử lại",
        })
      );
    }
    const resp = await fetch(`${API.uri}/user-address/user/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (resp.status >= 200 && resp.status < 300) {
      dispatch(
        setAlert({ type: "success", content: "Thêm địa chỉ thành công" })
      );
    }
  }
);

export const updateAddress = createAsyncThunk(
  "address/update",
  async (data, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      dispatch(
        setAllAddress({
          type: "error",
          content: "Phiên đăng nhập đã hết hạn vui lòng thử lại",
        })
      );
    }
    const resp = await fetch(`${API.uri}/user-address/user/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (resp.status >= 200 && resp.status < 300) {
      dispatch(
        setAlert({ type: "success", content: "Cập nhật địa chỉ thành công" })
      );
    }
  }
);

export const deleteAddress = createAsyncThunk(
  "address/delete",
  async (id, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      dispatch(
        setAllAddress({
          type: "error",
          content: "Phiên đăng nhập đã hết hạn vui lòng thử lại",
        })
      );
    }
    const resp = await fetch(`${API.uri}/user-address/user/delete?id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (resp.status >= 200 && resp.status < 300) {
      dispatch(
        setAlert({ type: "success", content: "Xóa địa chỉ thành công" })
      );
      dispatch(getAllAddressByUser());
    } else {
      dispatch(setAlert({ type: "error", content: "Xóa địa chỉ thất bại" }));
    }
  }
);
