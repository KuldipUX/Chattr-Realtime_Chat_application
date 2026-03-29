import { Server } from "socket.io";

let io;
const onlineUsers = new Map(); // 🔥 yahi rakho

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // 🔥 JOIN EVENT
    socket.on("join", (userId) => {
      onlineUsers.set(userId, socket.id);
      console.log("User joined:", userId);
    });
    socket.on("send_message", (data) => {
  const { receiverId } = data;

  // 🔥 jis user ko message bhejna hai
  const receiverSocketId = onlineUsers.get(receiverId);

  if (receiverSocketId) {
    io.to(receiverSocketId).emit("receive_message", data);
  }
});

    // 🔥 DISCONNECT
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);

      // user remove karo
      for (let [key, value] of onlineUsers.entries()) {
        if (value === socket.id) {
          onlineUsers.delete(key);
        }
      }
    });
  });

  return io;
};

// optional (future use)
export const getIO = () => {
  if (!io) {
    throw new Error("Socket not initialized!");
  }
  return io;
};
