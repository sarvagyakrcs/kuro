// server.ts
import express from 'express';
import http from 'http';
import { WebSocket, WebSocketServer } from 'ws';

// Define types
interface ExtendedWebSocket extends WebSocket {
  isAlive?: boolean;
}

// Create Express app and HTTP server
const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

// Optional: Serve static files
app.use(express.static('public'));

// WebSocket connection handling
wss.on('connection', (ws: ExtendedWebSocket) => {
  console.log('Client connected');
  
  // Set up an interval to send "hello" every second
  const intervalId = setInterval(() => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send('hello');
    }
  }, 1000);
  
  // Handle messages from clients
  ws.on('message', (message: Buffer) => {
    const messageStr = message.toString();
    console.log('Received:', messageStr);
    
    // Echo back to the sender
    ws.send(`Server received: ${messageStr}`);
    
    // Broadcast to all clients
    wss.clients.forEach((client: WebSocket) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(`Broadcast: ${messageStr}`);
      }
    });
  });
  
  // Handle disconnection and clean up interval
  ws.on('close', () => {
    console.log('Client disconnected');
    clearInterval(intervalId);
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});