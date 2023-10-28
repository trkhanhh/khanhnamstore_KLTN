import { createSlice } from "@reduxjs/toolkit";

const initState = {
  orders: [],
  isFirst: false,
};
const OrderSlice = createSlice({
  name: "carts",
  initialState: initState,
  reducers: {
    setOrders: (state, { payload }) => {
      state.orders = payload;
    },
    setIsFirst: (state, { payload }) => {
      state.isFirst = payload;
    },
  },
});

export const { setOrders ,setIsFirst} = OrderSlice.actions;

export default OrderSlice.reducer;
