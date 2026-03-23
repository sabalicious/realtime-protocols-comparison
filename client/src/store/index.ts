import { configureStore } from "@reduxjs/toolkit";
import metricsReducer from "./slices/metricsSlice";
import experimentReducer from "./slices/experimentSlice";

export const store = configureStore({
  reducer: {
    metrics: metricsReducer,
    experiment: experimentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
