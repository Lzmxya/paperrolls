import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Receipt } from "@/models/Receipt";

export interface InboxState {
  selectedReceipt: {
    previous: number | null;
    current: number | null;
    next: number | null;
  };
  checkedReceipts: Receipt["invNum"][];
}

const initialState: InboxState = {
  selectedReceipt: {
    previous: null,
    current: null,
    next: null,
  },
  checkedReceipts: [],
};

const inboxSlice = createSlice({
  name: "inbox",
  initialState,
  reducers: {
    // check receipts
    toggleChecked(state, action: PayloadAction<Receipt["invNum"]>) {
      if (state.checkedReceipts.includes(action.payload)) {
        state.checkedReceipts = state.checkedReceipts.filter(
          (element) => element !== action.payload
        );
        return;
      }
      state.checkedReceipts.push(action.payload);
    },
    clearChecked(state) {
      state.checkedReceipts = [];
    },
    // select receipt
    setSelected(state, action: PayloadAction<InboxState["selectedReceipt"]>) {
      state.selectedReceipt = action.payload;
    },
    previousSelected(state) {
      state.selectedReceipt.current && state.selectedReceipt.current--;
    },
    nextSelected(state) {
      state.selectedReceipt.current !== null && state.selectedReceipt.current++;
    },
    clearSelected(state) {
      state.selectedReceipt = initialState.selectedReceipt;
    },
  },
});

export const {
  toggleChecked,
  clearChecked,
  setSelected,
  previousSelected,
  nextSelected,
  clearSelected,
} = inboxSlice.actions;
export default inboxSlice.reducer;
