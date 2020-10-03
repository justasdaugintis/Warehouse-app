import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ILanguageState {
  language: string;
}

export const initialState: ILanguageState = {
  language: "en",
};

/**
 *  Contains the reducer and actions for language selection
 */
export const languageSlice = createSlice({
  initialState: initialState,
  name: "languageSelect",
  reducers: {
    setLanguage: (state: ILanguageState, { payload }: PayloadAction<string>): void => {
      state.language = payload;
    },
  },
});

export const languageActions = languageSlice.actions;

export const languageReducer = languageSlice.reducer;
