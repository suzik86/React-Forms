import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFormData } from "../../interfaces/FormDataInterface";

const initialState: { data: IFormData } = {
  data: {},
};

export const secondFormDataSlice = createSlice({
  name: "secondFormData",
  initialState,
  reducers: {
    addFormData: (state, action: PayloadAction<IFormData>) => {
      state.data = action.payload;
    },
  },
});

export const { addFormData } = secondFormDataSlice.actions;
export default secondFormDataSlice.reducer;
