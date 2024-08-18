import { RootState } from "../store";

export const savedFormList = (state: RootState) => state.savedFormsList || [];
