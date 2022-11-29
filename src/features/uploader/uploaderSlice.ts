import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UploaderState {
  pickerIsOpen: boolean;
}

const initialState: UploaderState = {
  pickerIsOpen: false,
};

const uploaderSlice = createSlice({
  name: "uploader",
  initialState,
  reducers: {
    setPickerIsOpen(
      state,
      action: PayloadAction<UploaderState["pickerIsOpen"]>
    ) {
      state.pickerIsOpen = action.payload;
    },
  },
});

export const { setPickerIsOpen } = uploaderSlice.actions;
export default uploaderSlice.reducer;
