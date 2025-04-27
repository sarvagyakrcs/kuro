// server.ts
import express from 'express';
import http from 'http';
import { WebSocket, WebSocketServer } from 'ws';
import * as fs from 'fs';
import * as path from 'path';

// Define types
interface ExtendedWebSocket extends WebSocket {
  isAlive?: boolean;
  fileChunks?: Map<string, {
    chunks: Buffer[];
    totalChunks: number;
    filename: string;
    receivedChunks: number;
    progressInterval?: NodeJS.Timeout;
  }>;
}

interface FileChunkMessage {
  type: 'file_chunk';
  fileId: string;
  filename: string;
  chunkIndex: number;
  totalChunks: number;
  chunk: string; // Base64 encoded chunk
}

// Create Express app and HTTP server
const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Optional: Serve static files
app.use(express.static('public'));

// WebSocket connection handling
wss.on('connection', (ws: ExtendedWebSocket) => {
  console.log('Client connected');
  
  // Initialize file chunks storage for this connection
  ws.fileChunks = new Map();

  // Handle messages from clients
  ws.on('message', (message: Buffer) => {
    try {
      const messageData = JSON.parse(message.toString());
      
      if (messageData.type === 'file_chunk') {
        handleFileChunk(ws, messageData as FileChunkMessage);
      } else {
        // Handle regular messages
        console.log('Received:', messageData);
        ws.send(`Server received: ${JSON.stringify(messageData)}`);
      }
    } catch (error) {
      console.error('Error processing message:', error);
      ws.send(JSON.stringify({ type: 'error', message: 'Invalid message format' }));
    }
  });
  
  // Handle disconnection
  ws.on('close', () => {
    console.log('Client disconnected');
    // Clean up any incomplete file transfers and intervals
    if (ws.fileChunks) {
      ws.fileChunks.forEach(transfer => {
        if (transfer.progressInterval) {
          clearInterval(transfer.progressInterval);
        }
      });
      ws.fileChunks.clear();
    }
  });
});

function handleFileChunk(ws: ExtendedWebSocket, message: FileChunkMessage) {
  if (!ws.fileChunks) return;

  const { fileId, filename, chunkIndex, totalChunks, chunk } = message;
  
  // Initialize file transfer if this is the first chunk
  if (!ws.fileChunks.has(fileId)) {
    console.log(`Started streaming file: ${filename}`);
    ws.fileChunks.set(fileId, {
      chunks: new Array(totalChunks),
      totalChunks,
      filename,
      receivedChunks: 0,
    });

    // Set up progress interval
    const transfer = ws.fileChunks.get(fileId)!;
    transfer.progressInterval = setInterval(() => {
      const progress = (transfer.receivedChunks / totalChunks) * 100;
      console.log(`Upload progress for ${filename}: ${progress.toFixed(2)}%`);
      ws.send(JSON.stringify({
        type: 'progress',
        fileId,
        progress: progress,
        receivedChunks: transfer.receivedChunks,
        totalChunks
      }));
    }, 1000);
  }

  const fileTransfer = ws.fileChunks.get(fileId)!;
  
  // Store the chunk
  fileTransfer.chunks[chunkIndex] = Buffer.from(chunk, 'base64');
  fileTransfer.receivedChunks++;

  // If all chunks received, combine and save the file
  if (fileTransfer.receivedChunks === totalChunks) {
    console.log(`Completed receiving file: ${filename}`);
    
    // Clear the progress interval
    if (fileTransfer.progressInterval) {
      clearInterval(fileTransfer.progressInterval);
    }

    const completeFile = Buffer.concat(fileTransfer.chunks);
    const safeName = path.basename(filename).replace(/[^a-zA-Z0-9.-]/g, '_');
    const filePath = path.join(uploadsDir, safeName);

    fs.writeFile(filePath, completeFile, (err) => {
      if (err) {
        console.error('Error saving file:', err);
        ws.send(JSON.stringify({
          type: 'error',
          fileId,
          message: 'Failed to save file'
        }));
      } else {
        console.log(`File saved successfully: ${safeName}`);
        ws.send(JSON.stringify({
          type: 'success',
          fileId,
          message: 'File successfully received and saved',
          filename: safeName
        }));
      }
    });

    // Clean up
    ws.fileChunks.delete(fileId);
  }
}

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});