import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import { startMarketStream } from "./src/services/marketService.js";

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: process.env.CLIENT_URL || "http://localhost:5173", credentials: true } });

app.set("io", io);
io.on("connection", (socket) => socket.emit("market:status", { connected: true }));

connectDB().then(() => {
  startMarketStream(io);
  server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  });
});
