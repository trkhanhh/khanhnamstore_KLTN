import { createSlice } from "@reduxjs/toolkit";

const initState = {
  addresses: [],
  allAddress: [],
};
const AddressSlice = createSlice({
  name: "address",
  initialState: initState,
  reducers: {
    setAddresses: (state, { payload }) => {
      state.addresses = payload;
    },
    setAllAddress: (state, { payload }) => {
      state.allAddress = payload;
    },
  },
});

export const { setAddresses, setAllAddress } = AddressSlice.actions;

export default AddressSlice.reducer;
