const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const { join } = require("node:path");
const PORT = 3000;

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
})

io.on('connection', (socket) => {
    console.log('Connection established');

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    })

    socket.on('disconnect', () => {
        console.log('User disconnected');
    })
})


server.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`);
})