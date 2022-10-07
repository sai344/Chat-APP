import express from "express";
import cors from "cors";
import chat from "./controllers/chat";
require("dotenv").config();

const app = express();
const http = require("http").createServer(app);

//socket.io
const io = require("socket.io")(http, {
    path: "/socket.io",
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET","pOST"],
        allowedHeaders: ["content-type"],
    },
});

//middleware
app.use(cors()); 
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true}));

//rest api
app.get("/api", (req, res) => {
    res.send("This is REST API");
})

//socket
chat(io);

const port = 8000;
http.listen(port, () => console.log(`Server running on port $(port)`));