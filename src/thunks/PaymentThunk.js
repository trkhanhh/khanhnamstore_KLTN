import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../constants/api";
import { setAlert } from "../slices/AlertSlice";
import { setIsFirst, setManagerOrder, setOrders } from "../slices/OrderSlice";

export const createPayment = createAsyncThunk(
  "/payment/create",
  async (paymentData, { dispatch, rejectWithValue, getState }) => {
    try {
      const resp = await fetch(`${API.uri}/urlpayment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData.req),
      });
      const jsonData = await resp.json();
      if (resp.status >= 300) {
        dispatch(setAlert({ type: "error", content: jsonData.defaultMessage }));
        return rejectWithValue("");
      }
      localStorage.setItem(
        "order_request",
        JSON.stringify({
          orderId: jsonData.orderId,
          requestId: jsonData.requestId,
          addressId: paymentData.addressId,
          listProductSize: paymentData.req.listProductSize,
        })
      );
      window.location.assign(jsonData.url);
    } catch (e) {
      console.log(e);
    }
  }
);

export const checkPayment = createAsyncThunk(
  "/payment/check",
  async (_, { dispatch, rejectWithValue, getState }) => {
    try {
      const { isFirst } = getState().orderReducer;

      const checkData = JSON.parse(localStorage.getItem("order_request"));
      if (checkData && !isFirst) {
        dispatch(setIsFirst(true));
        const resp = await fetch(
          `${API.uri}/checkPayment?orderId=${checkData.orderId}&requestId=${checkData.requestId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const jsonData = await resp.json();
        if (resp.status >= 300) {
          return rejectWithValue("");
        }

        if (jsonData.success === true) {
          dispatch(
            createMomoOrder(JSON.parse(localStorage.getItem("order_request")))
          );
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
);

export const createMomoOrder = createAsyncThunk(
  "/payment/create",
  async (orderData, { dispatch, rejectWithValue, getState }) => {
    try {
      const token = localStorage.getItem("auth_token");
      const resp = await fetch(`${API.uri}/invoice/user/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          payType: "PAYMENT_MOMO",
          requestIdMomo: orderData.requestId,
          orderIdMomo: orderData.orderId,
          userAddressId: orderData.addressId,
          listProductSize: orderData.listProductSize,
        }),
      });
      if (resp.status >= 300) {
        return rejectWithValue("");
      }
      localStorage.removeItem("order_request");
      localStorage.removeItem("cart");
      dispatch(
        setAlert({
          type: "success",
          content: "Xác nhận thành công , đã tạo đơn hàng",
        })
      );

      setTimeout(() => {
        dispatch(setIsFirst(false));
        window.location.assign("http://localhost:3000");
      }, 2000);
    } catch (e) {
      console.log(e);
    }
  }
);

export const createOrder = createAsyncThunk(
  "/payment/order/create",
  async (orderData, { dispatch, rejectWithValue, getState }) => {
    console.log(orderData);
    try {
      const token = localStorage.getItem("auth_token");
      const resp = await fetch(`${API.uri}/invoice/user/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          payType: orderData.payType,
          userAddressId: orderData.userAddressId,
          listProductSize: orderData.listProductSize,
        }),
      });
      const jsonData = await resp.json();
      if (resp.status >= 300) {
        dispatch(setAlert({ type: "error", content: jsonData.defaultMessage }));
        return rejectWithValue("");
      }
      localStorage.removeItem("order_request");
      localStorage.removeItem("cart");
      dispatch(
        setAlert({
          type: "success",
          content: "Xác nhận thành công , đã tạo đơn hàng",
        })
      );
      dispatch(getOrderByUser());
    } catch (e) {
      console.log(e);
    }
  }
);
export const getOrderByUser = createAsyncThunk(
  "/payment/order/create",
  async (_, { dispatch, rejectWithValue, getState }) => {
    try {
      const token = localStorage.getItem("auth_token");
      const resp = await fetch(`${API.uri}/invoice/user/find-by-user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const jsonData = await resp.json();
      if (resp.status >= 300) {
        dispatch(
          setAlert({
            type: "error",
            content:
              jsonData.defaultMessage ?? "Get orders error please try re-login",
          })
        );
        return rejectWithValue("");
      }
      dispatch(setOrders(jsonData));
    } catch (e) {
      console.log(e);
    }
  }
);

export const getOrderList = createAsyncThunk(
  "/payment/order/create",
  async (_, { dispatch, rejectWithValue, getState }) => {
    try {
      const token = localStorage.getItem("auth_token");
      const resp = await fetch(`${API.uri}/invoice/admin/find-all-list`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const jsonData = await resp.json();
      if (resp.status >= 300) {
        dispatch(setAlert({ type: "error", content: jsonData.defaultMessage }));
        return rejectWithValue("");
      }
      dispatch(setManagerOrder(jsonData));
    } catch (e) {
      console.log(e);
    }
  }
);

export const confirmOrder = createAsyncThunk(
  "/payment/order/create",
  async (id, { dispatch, rejectWithValue, getState }) => {
    try {
      const token = localStorage.getItem("auth_token");
      const resp = await fetch(
        `${API.uri}/invoice/admin/update-status?idInvoice=${id}&idStatus=2`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const jsonData = await resp.json();
      if (resp.status >= 300) {
        dispatch(setAlert({ type: "error", content: jsonData.defaultMessage }));
        return rejectWithValue("");
      }
      dispatch(setAlert({ type: "success", content: "Confirm success" }));
      dispatch(getOrderList());
    } catch (e) {
      console.log(e);
    }
  }
);

export const confirmGetOrder = createAsyncThunk(
  "/payment/order/create",
  async (id, { dispatch, rejectWithValue, getState }) => {
    try {
      const token = localStorage.getItem("auth_token");
      const resp = await fetch(
        `${API.uri}/invoice/admin/update-status?idInvoice=${id}&idStatus=4`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const jsonData = await resp.json();
      if (resp.status >= 300) {
        dispatch(setAlert({ type: "error", content: jsonData.defaultMessage }));
        return rejectWithValue("");
      }
      dispatch(setAlert({ type: "success", content: "Confirm success" }));
      dispatch(getOrderByUser());
    } catch (e) {
      console.log(e);
    }
  }
);

export const cancelOrder = createAsyncThunk(
  "/payment/order/create",
  async (id, { dispatch, rejectWithValue, getState }) => {
    try {
      const token = localStorage.getItem("auth_token");
      const resp = await fetch(
        `${API.uri}/invoice/admin/update-status?idInvoice=${id}&idStatus=6`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const jsonData = await resp.json();
      if (resp.status >= 300) {
        dispatch(setAlert({ type: "error", content: jsonData.defaultMessage }));
        return rejectWithValue("");
      }
      dispatch(setAlert({ type: "success", content: "Cancel success" }));
      dispatch(getOrderByUser());
    } catch (e) {
      console.log(e);
    }
  }
);
