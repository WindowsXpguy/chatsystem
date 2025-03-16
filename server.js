const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve the frontend from "public" folder
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("message", (message) => {
        console.log("Message received:", message);
        io.emit("message", message); // Broadcast message
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

// Serve frontend files for any unknown routes
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
