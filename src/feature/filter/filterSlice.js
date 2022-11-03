import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  color: null,
  status: "ALl",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    addColor: (state, action) => {
      state.color = action.payload;
    },
    addStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});
export default filterSlice.reducer;
export const { addColor, addStatus } = filterSlice.actions;
