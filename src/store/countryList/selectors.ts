import { RootState } from "../store";

export const countries = (state: RootState) => state.counrtyList.data || [];
