export type ProtocolType = "polling" | "sse" | "websocket";

export interface Message {
  id: string;
  value: number;
  timestamp: number;
  latency: number;
}

export interface ProtocolMetrics {
  isRunning: boolean;
  messages: Message[];
  requestCount: number;
  avgLatency: number;
  totalBytes: number;
}

export interface MetricsState {
  polling: ProtocolMetrics;
  sse: ProtocolMetrics;
  websocket: ProtocolMetrics;
}
