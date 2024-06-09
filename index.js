// Load the required modules
const express = require("express");
const http = require("http");
const WebSocket = require("ws");

// Create an Express application
const app = express();

// Serve static files from the "public" directory
app.use(express.static("public"));

// Create an HTTP server
const server = http.createServer(app);

// Create a WebSocket server
const wss = new WebSocket.Server({ server });

// Set up WebSocket connection event handler
wss.on("connection", (ws) => {
  console.log("New client connected");

  // Set up message event handler
  ws.on("message", (message) => {
    console.log(`Received message: ${message}`);

    // Broadcast the received message to all clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`Echo: ${message}`);
      }
    });
  });

  // Set up close event handler
  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

// Define the port
const port = 8000;

// Start the server
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
