const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const path = require("path");
require("dotenv").config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

const messages = require("./public/messages.json");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

app.get("/messages", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "messages.json"));
});

io.on("connection", (socket) => {
  setInterval(() => {
    const randomIndex = Math.floor(Math.random() * messages.length);
    const randomMessage = messages[randomIndex];
    socket.emit("message", randomMessage);
  }, 1000);

  socket.on("message", (message) => {
    io.emit("message", message);
  });
});

httpServer.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
