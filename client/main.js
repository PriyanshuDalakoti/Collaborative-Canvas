// client/main.js
import socket from './websocket.js';
import { initCanvas, setColor, setSize, undo } from './canvas.js';

// wait until page fully loads
window.onload = () => {
  const colorInput = document.getElementById('color');
  const sizeInput = document.getElementById('size');
  const undoBtn = document.getElementById('undo');
  const eraseBtn = document.getElementById('erase');

  colorInput.addEventListener('input', (e) => setColor(e.target.value));
  sizeInput.addEventListener('input', (e) => setSize(e.target.value));
  undoBtn.addEventListener('click', undo);

  eraseBtn.addEventListener('click', () => setColor('#ffffff'));

  initCanvas();
};
