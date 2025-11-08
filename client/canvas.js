// client/canvas.js
import socket from "./websocket.js";

let canvas, ctx;
let drawing = false;
let lastPos = null;
let color = "#000000";
let size = 4;
let history = [];

export function initCanvas() {
  canvas = document.getElementById("board");
  ctx = canvas.getContext("2d");
  resizeCanvas();

  window.addEventListener("resize", resizeCanvas);
  canvas.addEventListener("mousedown", startDraw);
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mouseup", stopDraw);

  // 🟢 When someone else draws, render it
  socket.on("draw", (data) => {
    drawLine(data.from, data.to, data.color, data.size);
  });

  // 🟢 When someone else undoes, restore previous snapshot
  socket.on("undo", (data) => {
    console.log("Undo received from another user");
    if (!data || !data.image) return;
    pushHistory(); // Save current state before applying remote undo
    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas first
      ctx.drawImage(img, 0, 0);
    };
    img.src = data.image;
  });

}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - 50; // toolbar height
}

function startDraw(e) {
  drawing = true;
  lastPos = getPos(e);
  pushHistory();
}

function draw(e) {
  if (!drawing) return;
  const pos = getPos(e);

  // draw locally
  drawLine(lastPos, pos, color, size);

  // send to others
  socket.emit("draw", { from: lastPos, to: pos, color, size });

  lastPos = pos;
}

function stopDraw() {
  if (drawing) {
    drawing = false;
    pushHistory(); // Save state after completing a stroke
  }
}

function getPos(e) {
  return { x: e.clientX, y: e.clientY - 50 };
}

function drawLine(from, to, color, size) {
  ctx.strokeStyle = color;
  ctx.lineWidth = size;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(from.x, from.y);
  ctx.lineTo(to.x, to.y);
  ctx.stroke();
}

function pushHistory() {
  if (history.length > 20) history.shift();
  history.push(canvas.toDataURL());
}

export function undo() {
  if (history.length === 0) return;

  // Pop previous snapshot
  const imgData = history.pop();

  const img = new Image();
  img.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas first
    ctx.drawImage(img, 0, 0);
    
    // Send current canvas image to everyone else
    const currentImage = canvas.toDataURL();
    socket.emit("undo", { image: currentImage });
  };
  img.src = imgData;
}

export function setColor(newColor) {
  color = newColor;
}

export function setSize(newSize) {
  size = newSize;
}
