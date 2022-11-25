import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { clearKeywords, setKeywords } from "../search/searchSlice";
import { Receipt } from "@/models";

export interface InboxState {
  selectedReceipt: {
    previous: number | null;
    current: number | null;
    next: number | null;
  };
  checkedReceipts: Receipt["invNum"][];
  deletingReceipt: Receipt["invNum"] | null;
  viewportDate: Date | null;
}

const initialState: InboxState = {
  selectedReceipt: {
    previous: null,
    current: null,
    next: null,
  },
  checkedReceipts: [],
  deletingReceipt: null,
  viewportDate: null,
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
    // deleting receipt
    setDeleting(state, action: PayloadAction<InboxState["deletingReceipt"]>) {
      state.deletingReceipt = action.payload;
    },
    clearDeleting(state) {
      state.deletingReceipt = initialState.deletingReceipt;
    },
    // viewport date
    setViewportDate(state, action: PayloadAction<InboxState["viewportDate"]>) {
      state.viewportDate = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(clearKeywords, () => initialState)
      .addCase(setKeywords, () => initialState);
  },
});

export const {
  toggleChecked,
  clearChecked,
  setSelected,
  previousSelected,
  nextSelected,
  clearSelected,
  setDeleting,
  clearDeleting,
  setViewportDate,
} = inboxSlice.actions;
export default inboxSlice.reducer;
