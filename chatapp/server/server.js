import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

// socket io
export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// online users map
export const userSocketMap = {};

// socket connection
io.on("connection", (socket) => {

  const userId = socket.handshake.query.userId;

  console.log("User Connected:", userId);

  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  // send online users
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // typing event
  socket.on("typing", ({ receiverId, senderName }) => {

    const receiverSocketId = userSocketMap[receiverId];

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("typing", senderName);
    }

  });

  // stop typing
  socket.on("stopTyping", ({ receiverId }) => {

    const receiverSocketId = userSocketMap[receiverId];

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("stopTyping");
    }

  });

  // disconnect
  socket.on("disconnect", () => {

    console.log("User Disconnected:", userId);

    delete userSocketMap[userId];

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

  });

});

// middleware
app.use(express.json({ limit: "4mb" }));
app.use(cors());

// routes
app.use("/api/status", (req, res) => res.send("server is live"));
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

// db connect
await connectDB();

// start server
const PORT = process.env.PORT || 5001;

server.listen(PORT, () =>
  console.log("Server running on PORT:", PORT)
);