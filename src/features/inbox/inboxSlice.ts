import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Receipt } from "../../models/Receipt";

interface InboxState {
  currentSelectedReceipt: Receipt | null;
  checkedReceipts: Receipt["invNum"][];
}

const initialState: InboxState = {
  currentSelectedReceipt: null,
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
    setSelected(state, action: PayloadAction<Receipt>) {
      state.currentSelectedReceipt = action.payload;
    },
    clearSelected(state) {
      state.currentSelectedReceipt = null;
    },
  },
});

export const { toggleChecked, clearChecked, setSelected, clearSelected } =
  inboxSlice.actions;
export default inboxSlice.reducer;
