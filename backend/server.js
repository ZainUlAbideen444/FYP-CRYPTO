import dotenv from "dotenv";
dotenv.config();

import http from "http";
import { Server } from "socket.io";

import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import { startMarketStream } from "./src/services/marketService.js";

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  },
});

app.set("io", io);

io.on("connection", (socket) => {
  console.log(`Socket Connected: ${socket.id}`);

  socket.emit("market:status", {
    connected: true,
  });

  socket.on("disconnect", () => {
    console.log(`Socket Disconnected: ${socket.id}`);
  });
});

async function startServer() {
  try {
    await connectDB();

    console.log("✅ MongoDB Connected");

    startMarketStream(io);

    server.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server");
    console.error(error);
    process.exit(1);
  }
}

startServer();