// server/server.js
const path = require('path');
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config(); // loads PORT from .env if present

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// serve client static files
app.use(express.static(path.join(__dirname, '..', 'client')));

const PORT = process.env.PORT || 3000;

let connectedCount = 0;

io.on('connection', (socket) => {
  connectedCount++;
  console.log('Client connected:', socket.id, 'total:', connectedCount);

  // notify all clients about current user count
  io.emit('users', { count: connectedCount });

  socket.on('draw', (data) => {
    // broadcast drawing event to other clients
    socket.broadcast.emit('draw', data);
  });

  socket.on('cursor', (data) => {
    socket.broadcast.emit('cursor', { id: socket.id, ...data });
  });

  socket.on('undo', () => {
    socket.broadcast.emit('undo');
  });

  socket.on('disconnect', () => {
    connectedCount--;
    console.log('Client disconnected:', socket.id, 'total:', connectedCount);
    io.emit('users', { count: connectedCount });
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
