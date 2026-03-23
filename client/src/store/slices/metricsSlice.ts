import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { MetricsState, ProtocolType, Message } from "../../types";

const initialProtocolMetrics = {
  isRunning: false,
  messages: [],
  requestCount: 0,
  avgLatency: 0,
  totalBytes: 0,
};

const initialState: MetricsState = {
  polling: initialProtocolMetrics,
  sse: initialProtocolMetrics,
  websocket: initialProtocolMetrics,
};

const metricsSlice = createSlice({
  name: "metrics",
  initialState,
  reducers: {
    addMessage: (
      state,
      action: PayloadAction<{ protocol: ProtocolType; message: Message }>,
    ) => {
      const { protocol, message } = action.payload;
      state[protocol].messages.push(message);
      state[protocol].requestCount += 1;

      const messages = state[protocol].messages;
      state[protocol].avgLatency =
        messages.reduce((sum, m) => sum + m.latency, 0) / messages.length;

      state[protocol].totalBytes += JSON.stringify(message).length;
    },
    setRunning: (
      state,
      action: PayloadAction<{ protocol: ProtocolType; value: boolean }>,
    ) => {
      state[action.payload.protocol].isRunning = action.payload.value;
    },
    resetMetrics: (state, action: PayloadAction<ProtocolType>) => {
      state[action.payload] = initialProtocolMetrics;
    },
  },
});

export const { addMessage, setRunning, resetMetrics } = metricsSlice.actions;
export default metricsSlice.reducer;
