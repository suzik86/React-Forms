import { RootState } from "../store";

export const secondName = (state: RootState) =>
  state.secondFormData.data.name || "";

export const secondAge = (state: RootState) =>
  state.secondFormData.data.age || 0;

export const secondEmail = (state: RootState) =>
  state.secondFormData.data.email || "";

export const secondPassword = (state: RootState) =>
  state.secondFormData.data.password || "";

export const secondGender = (state: RootState) =>
  state.secondFormData.data.gender || "";

export const secondAcceptTerms = (state: RootState) =>
  state.secondFormData.data.acceptTerms || false;

export const secondPicture = (state: RootState) =>
  state.secondFormData.data.picture || null;

export const secondCountry = (state: RootState) =>
  state.secondFormData.data.country || "";
