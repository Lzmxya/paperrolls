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
    setKeywords(state, action: PayloadAction<string>) {
      const terms = action.payload
        .trim()
        .split(" ")
        .filter((element) => element !== "");
      state.terms = terms;
    },
    clearKeywords() {
      return initialState;
    },
  },
});

export const { setKeywords, clearKeywords } = searchSlice.actions;
export default searchSlice.reducer;
