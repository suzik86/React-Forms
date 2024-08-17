import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [
    "Belarus",
    "Russia",
    "USA",
    "Canada",
    "India",
    "UK",
    "Australia",
    "Japan",
    "China",
  ],
};

export const countryListSlice = createSlice({
  name: "countryList",
  initialState,
  reducers: {
    countries: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { countries } = countryListSlice.actions;
export default countryListSlice.reducer;
