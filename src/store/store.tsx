import { configureStore } from "@reduxjs/toolkit";
import firstFormData from "./firstFormData/firstFormDataSlice";
import counrtyList from "./countryList/countryListSlice";
import secondFormData from "./secondFormData/secondFormDataSlice";
import savedFormsList from "./savedFormList/savedFormListSlice";

export const store = configureStore({
  reducer: {
    firstFormData,
    secondFormData,
    counrtyList,
    savedFormsList,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
