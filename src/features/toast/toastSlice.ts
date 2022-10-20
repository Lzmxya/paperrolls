import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const enum ToastTypes {
  ARCHIVE = "ARCHIVE",
  DELETE = "DELETE",
}

interface ToastState {
  description?: string;
  target: string;
  type?: ToastTypes;
}

const initialState: ToastState = { target: "" };

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    setArchivedToast: {
      reducer: (state, action: PayloadAction<ToastState>) => {
        return action.payload;
      },
      prepare: (value: string) => {
        const target = value;
        const description = `已封存「${target}」`;
        return {
          payload: { description, target, type: ToastTypes.ARCHIVE },
        };
      },
    },
    resetToast: () => initialState,
  },
});

export const { setArchivedToast, resetToast } = toastSlice.actions;
export default toastSlice.reducer;
