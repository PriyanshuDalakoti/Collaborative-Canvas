# Collaborative Canvas

A real-time collaborative drawing application where multiple users can draw together on a shared canvas.


## 🚀 Demo
🔗 **Live App:** [https://collaborative-canvas-bhcu.onrender.com](https://collaborative-canvas-bhcu.onrender.com)  
🔗 **GitHub Repo:** https://github.com/PriyanshuDalakoti/Collaborative-Canvas


## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/PriyanshuDalakoti/Collaborative-Canvas.git
cd collaborative-canvas
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

## Testing with Multiple Users

There are several ways to test the collaborative features:

1. **Different Browsers**: Open the application in different browsers on the same computer (e.g., Chrome and Firefox)
2. **Private/Incognito Windows**: Open multiple private/incognito windows in the same browser
3. **Different Devices**: Access the application from different devices on the same network using your local IP address
   - Find your IP address using `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
   - Access via `http://YOUR_IP_ADDRESS:3000`

## Features

- Real-time collaborative drawing
- Customizable brush color and size
- Eraser tool
- Undo functionality
- User count display

## Known Limitations/Bugs

1. **Canvas Resizing**: When the window is resized, the canvas clears due to the current implementation of the resize handler
2. **Undo Limitations**: 
   - Limited to last 20 actions
   - Affects all users simultaneously (no user-specific undo)
3. **Performance**: Large numbers of simultaneous users may experience latency
4. **Browser Support**: Best experienced in modern browsers (Chrome, Firefox, Edge)
5. **Mobile Support**: Limited touch screen support

## Time Spent on Project

Total Development Time: 10 hours

Breakdown:
- Initial Setup & Basic Drawing: 15 hours
- WebSocket Integration: 2 hours
- Undo Functionality: 1 hours


