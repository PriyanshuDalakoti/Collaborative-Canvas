# Architecture Documentation

## Data Flow Diagram

```
User Action (Draw/Undo)
       ↓
Client Canvas Event
       ↓
WebSocket Emit
       ↓
Server Broadcast
       ↓
Other Clients Receive
       ↓
Update Remote Canvases
```

## WebSocket Protocol

### Messages Sent

1. **draw**
   ```javascript
   {
     from: { x: number, y: number },
     to: { x: number, y: number },
     color: string,
     size: number
   }
   ```

2. **undo**
   ```javascript
   {
     image: string // base64 encoded canvas state
   }
   ```

3. **users**
   ```javascript
   {
     count: number
   }
   ```

## Undo/Redo Strategy

### Current Implementation
- Maintains a history array of canvas states (max 20 states)
- States are saved as base64 encoded images after each complete stroke
- When undo is triggered:
  1. Pop the latest state from history
  2. Apply it to local canvas
  3. Broadcast new canvas state to all users

### Limitations
- Memory intensive due to storing full canvas states
- Global undo affects all users
- Limited to 20 steps to prevent memory issues

### Potential Improvements
- Store vector commands instead of raster images
- Implement per-user undo history
- Use differential updates instead of full state transfers

## Performance Decisions

1. **Canvas State Management**
   - Used `toDataURL()` for simplicity despite performance cost
   - Limited history to 20 states to prevent memory issues
   - Clear rectangle before new state to prevent ghosting

2. **Real-time Updates**
   - Immediate local drawing for responsiveness
   - Asynchronous broadcast to other users
   - No buffering/debouncing of draw events for real-time feel

3. **WebSocket Communication**
   - Used Socket.IO for reliable real-time communication
   - Broadcast strategy to minimize server processing
   - CORS enabled for cross-origin support

## Conflict Resolution

### Drawing Conflicts
- Last-write-wins strategy
- Each draw operation is atomic
- No explicit conflict resolution needed due to pixel-based nature

### Undo Conflicts
- Global state approach
- Last undo operation takes precedence
- All users sync to same canvas state

### Simultaneous Drawing
- All drawing operations are preserved
- No operation queueing or validation
- Each client maintains their own draw state

## Future Improvements

1. **State Management**
   - Implement command pattern for operations
   - Add operation timestamps
   - Support user-specific undo/redo

2. **Performance**
   - Implement draw operation batching
   - Add compression for canvas state transfers
   - Optimize history storage

3. **Conflict Resolution**
   - Add operational transformation
   - Implement user-specific layers
   - Add version control for canvas states