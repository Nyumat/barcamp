import io from "socket.io-client";

// const socket = io("https://chatws-pkxd.onrender.com");
const socket = io("http://localhost:8080");

export function connectChatServer() {
  socket.on("connect", () => {
    console.log("connected");
  });

  socket.on("disconnect", () => {
    console.log("disconnected");
  });
}

connectChatServer();

export default socket;
