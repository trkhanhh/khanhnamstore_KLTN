import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAlert } from "../slices/AlertSlice";
import { API } from "../constants/api";
import { setUsers } from "../slices/UserSlice";
import { json } from "react-router-dom";

export const getAllUser = createAsyncThunk(
  "admin/user/list",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem("auth_token");
      const resp = await fetch(`${API.uri}/admin/users/list`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (resp.status < 200 || resp.status >= 400) {
        dispatch(
          setAlert({ type: "error", content: "Error when fetch user list" })
        );
        return rejectWithValue();
      }
      const jsonData = await resp.json();
      dispatch(setUsers(jsonData));
    } catch (e) {
      dispatch(
        setAlert({ type: "error", content: "Error when fetch user list" })
      );
    }
  }
);

export const lockOrUnLockUser = createAsyncThunk(
  "admin/user/lockOrUnLock",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem("auth_token");
      const resp = await fetch(`${API.uri}/admin/lockOrUnlockUser?id=${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (resp.status < 200 || resp.status >= 400) {
        dispatch(
          setAlert({ type: "error", content: "Error when fetch user list" })
        );
        return rejectWithValue();
      }
      dispatch(setAlert({ type: "success", content: "Success" }));
      dispatch(getAllUser());
    } catch (e) {
      dispatch(
        setAlert({ type: "error", content: "Error when fetch user list" })
      );
    }
  }
);

export const addUser = createAsyncThunk(
  "admin/user/add",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem("auth_token");
      const resp = await fetch(`${API.uri}/admin/addaccount`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      const jsonData = await resp.json();
      console.log(jsonData);
      if (resp.status < 200 || resp.status >= 400) {
        dispatch(
          setAlert({
            type: "error",
            content: jsonData.defaultMessage
              ? jsonData.defaultMessage
              : "Form not valid",
          })
        );
        return rejectWithValue();
      }
      dispatch(setAlert({ type: "success", content: "Success" }));
      dispatch(getAllUser());
    } catch (e) {
      dispatch(
        setAlert({ type: "error", content: "Error when fetch user list" })
      );
    }
  }
);
