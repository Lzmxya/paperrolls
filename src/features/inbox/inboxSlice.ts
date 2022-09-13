import { createSlice } from "@reduxjs/toolkit";
import { Receipt } from "../../models/Receipt";

interface ReceiptState extends Receipt {
  checked: boolean;
  selected: boolean;
}

type Partial<ReceiptState> = {
  [P in keyof ReceiptState]?: ReceiptState[P];
};

type InboxState = Partial<ReceiptState>[];

const initialState: InboxState = [];

const inboxSlice = createSlice({
  name: "inbox",
  initialState,
  reducers: {
    setData(state, action) {
      const payload: Receipt[] = action.payload;
      const data: InboxState = payload.map((element) => ({
        ...element,
        checked: false,
        selected: false,
      }));
      return data;
    },
  },
});

export const { setData } = inboxSlice.actions;
export default inboxSlice.reducer;
