import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./Routes/auth.js";
import adminRoute from "./Routes/admin.js";
import conversationRoute from "./Routes/conversation.js";
import messageRoute from "./Routes/messages.js";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
dotenv.config();

// Middlewares
const port = process.env.port || 8800;
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth/", authRoute);
app.use("/api/admin/", adminRoute);
app.use("/api/conversation/", conversationRoute);
app.use("/api/message/", messageRoute);

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: ["http://localhost:3000", "http://localhost:3001"] },
});

app.set("port", process.env.PORT || 5000);

httpServer.listen(app.get("port"), function () {
  var port = httpServer.address().port;
  console.log("Running on : ", port);
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  console.log("a user connected.");

  socket.on("addUser", (userId) => {
    console.log(userId);
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    io.to(user?.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});


// Connection
const Connect = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGO,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connected to db!");
  } catch (err) {
    throw err;
  }
};

app.listen(port, () => {
  Connect();
  console.log("Connected");
});
