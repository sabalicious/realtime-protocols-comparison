import { createSlice } from "@reduxjs/toolkit";

interface ExperimentState {
  isActive: boolean;
}

const initialState: ExperimentState = {
  isActive: false,
};

const experimentSlice = createSlice({
  name: "experiment",
  initialState,
  reducers: {
    startExperiment: (state) => {
      state.isActive = true;
    },
    stopExperiment: (state) => {
      state.isActive = false;
    },
  },
});

export const { startExperiment, stopExperiment } = experimentSlice.actions;
export default experimentSlice.reducer;
