// server.js (Node.js + Socket.IO Backend)
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let players = {};

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    
    if (!players.white) {
        players.white = socket.id;
    } else if (!players.black) {
        players.black = socket.id;
    }
    
    socket.on('move', (move) => {
        socket.broadcast.emit('move', move);
    });
    
    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
        if (players.white === socket.id) delete players.white;
        if (players.black === socket.id) delete players.black;
    });
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
