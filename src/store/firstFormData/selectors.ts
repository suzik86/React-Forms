import { RootState } from "../store";

export const name = (state: RootState) => state.firstFormData.data.name || "";

export const age = (state: RootState) => state.firstFormData.data.age || 0;

export const email = (state: RootState) => state.firstFormData.data.email || "";

export const password = (state: RootState) =>
  state.firstFormData.data.password || "";

export const gender = (state: RootState) =>
  state.firstFormData.data.gender || "";

export const acceptTerms = (state: RootState) =>
  state.firstFormData.data.acceptTerms || false;

export const picture = (state: RootState) =>
  state.firstFormData.data.picture || null;

export const country = (state: RootState) =>
  state.firstFormData.data.country || "";
