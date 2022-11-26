import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  terms: string[];
}

const initialState: SearchState = {
  terms: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setTerms(state, action: PayloadAction<string>) {
      const terms = action.payload
        .trim()
        .split(" ")
        .filter((element) => element !== "");
      state.terms = terms;
    },
    clearTerms() {
      return initialState;
    },
  },
});

export const { setTerms, clearTerms } = searchSlice.actions;
export default searchSlice.reducer;
