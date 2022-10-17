import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  keywords: string[];
}

const initialState: SearchState = {
  keywords: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setKeywords(state, action: PayloadAction<string>) {
      const keywords = action.payload
        .trim()
        .split(" ")
        .filter((element) => element !== "");
      state.keywords = keywords;
    },
    clearKeywords() {
      return initialState;
    },
  },
});

export const { setKeywords, clearKeywords } = searchSlice.actions;
export default searchSlice.reducer;
