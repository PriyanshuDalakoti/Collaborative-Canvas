// client/websocket.js
const socket = io();

// show connection info in console
socket.on('connect', () => {
  console.log('✅ Connected to server:', socket.id);
});

socket.on('users', (data) => {
  const counter = document.getElementById('users');
  if (counter) counter.textContent = `Users Online: ${data.count}`;
});

export default socket;
