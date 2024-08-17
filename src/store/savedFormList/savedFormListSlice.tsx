import { createSlice } from "@reduxjs/toolkit";

const initialState: IFormData[] = [];

import { PayloadAction } from "@reduxjs/toolkit";
import { IFormData } from "../../interfaces/FormDataInterface";

export const savedFormListSlice = createSlice({
  name: "savedFormList",
  initialState,
  reducers: {
    addForm: (state, action: PayloadAction<IFormData>) => {
      state.push(action.payload);
    },
  },
});

export const { addForm } = savedFormListSlice.actions;
export default savedFormListSlice.reducer;
