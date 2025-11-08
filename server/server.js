// server/server.js
const path = require('path');
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

app.use(express.static(path.join(__dirname, '..', 'client')));

const PORT = process.env.PORT || 3000;
let connectedCount = 0;

io.on('connection', (socket) => {
  connectedCount++;
  console.log('✅  User connected:', socket.id);
  io.emit('users', { count: connectedCount });

  // when client sends a drawing event, forward it to everyone except sender
  socket.on('draw', (data) => {
    socket.broadcast.emit('draw', data);
  });

  // undo from one user → broadcast to all others
socket.on('undo', (data) => {
  socket.broadcast.emit('undo', data);
});


  socket.on('disconnect', () => {
    connectedCount--;
    io.emit('users', { count: connectedCount });
    console.log('❌  User disconnected:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`🎨  Server listening on http://localhost:${PORT}`);
});
