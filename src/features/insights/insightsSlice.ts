import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InsightsState {
  selectedMonth: string;
}

const initialState: InsightsState = {
  selectedMonth: "",
};

const insightsSlice = createSlice({
  name: "insights",
  initialState,
  reducers: {
    setSelectedMonth(
      state,
      action: PayloadAction<InsightsState["selectedMonth"]>
    ) {
      state.selectedMonth = action.payload;
    },
  },
});

export const { setSelectedMonth } = insightsSlice.actions;
export default insightsSlice.reducer;
