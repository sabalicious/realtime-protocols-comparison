import express from "express";
import cors from "cors";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const generateData = () => ({
  value: Math.round(Math.random() * 100),
  timestamp: Date.now(),
});

// --- POLLING ---
app.get("/polling", (req, res) => {
  const sentAt = Number(req.query.sentAt) || Date.now();
  const data = generateData();
  res.json({
    ...data,
    latency: Date.now() - sentAt,
  });
});

// --- SSE ---
app.get("/sse", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const interval = setInterval(() => {
    const data = generateData();
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  }, 1000);

  req.on("close", () => {
    clearInterval(interval);
  });
});

// --- WEBSOCKET ---

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
