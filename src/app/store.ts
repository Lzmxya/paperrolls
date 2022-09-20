import { configureStore } from "@reduxjs/toolkit";
import inboxReducer from "../features/inbox/inboxSlice";

export const store = configureStore({
  reducer: {
    inbox: inboxReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // // Ignore these action types
        // ignoredActions: ["your/action/type"],
        // // Ignore these field paths in all actions
        ignoredActionPaths: ["payload"],
        // // Ignore these paths in the state
        ignoredPaths: ["inbox"],
      },
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;