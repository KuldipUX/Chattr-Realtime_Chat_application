import express from 'express'
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import userRoute from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';
import mesageRoute from './routes/messageRoute.js'
import cors from 'cors'

import http from "http";
import { initSocket } from "./socket/socket.js"; // 🔥 important

dotenv.config({});
const app = express();
const PORT = process.env.PORT || 8080;

// 🔥 create server
const server = http.createServer(app);

// 🔥 init socket
initSocket(server);

// middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());

const corsOption = {
    origin:'http://localhost:5173',
    credentials:true
};
app.use(cors(corsOption));

// routes
app.use("/api/v1/user",userRoute);
app.use("/api/v1/message",mesageRoute);

// ❌ app.listen hatao
// ✅ server.listen use karo
server.listen(PORT,()=>{
    connectDB();
    console.log(`Server listen at port ${PORT}`);
});