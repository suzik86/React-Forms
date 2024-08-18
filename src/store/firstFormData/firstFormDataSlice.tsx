import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFormData } from "../../interfaces/FormDataInterface";

const initialState: { data: IFormData } = {
  data: {},
};

export const firstFormDataSlice = createSlice({
  name: "firstFormData",
  initialState,
  reducers: {
    addFormData: (state, action: PayloadAction<IFormData>) => {
      state.data = action.payload;
    },
  },
});

export const { addFormData } = firstFormDataSlice.actions;
export default firstFormDataSlice.reducer;
