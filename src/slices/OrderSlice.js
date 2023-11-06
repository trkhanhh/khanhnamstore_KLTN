import { createSlice } from "@reduxjs/toolkit";

const initState = {
  orders: [],
  manager: {
    orders: [],
  },
  isFirst: false,
};
const OrderSlice = createSlice({
  name: "carts",
  initialState: initState,
  reducers: {
    setManagerOrder: (state, { payload }) => {
      state.manager.orders = payload;
    },
    setOrders: (state, { payload }) => {
      state.orders = payload;
    },
    setIsFirst: (state, { payload }) => {
      state.isFirst = payload;
    },
  },
});

export const { setOrders, setIsFirst, setManagerOrder } = OrderSlice.actions;

export default OrderSlice.reducer;
