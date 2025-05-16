const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs-extra');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// In-memory data
let onlineUsers = 0;
let comments = [{
  playerId: '1ab1bb11',
  playerName: 'Bob',
  comment: 'This is a test comment!'
}];

// Online user tracking
app.get('/doom-add', (req, res) => {
  onlineUsers++;
  res.send('OK');
});

app.get('/doom-get', (req, res) => {
  res.json({ count: onlineUsers });
});

app.get('/doom-remove-user', (req, res) => {
  onlineUsers = Math.max(0, onlineUsers - 1);
  res.send('OK');
});

// Comment endpoints
app.post('/doom-chat/add', (req, res) => {
  const { playerId, playerName, comment } = req.body;
  if (!playerId || !playerName || !comment) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  comments.push({ playerId, playerName, comment });
  res.json({ success: true });
});

app.get('/doom-chat/clear', (req, res) => {
  comments = [];
  res.json({ success: true });
});

app.get('/doom-chat/get', (req, res) => {
  res.json(comments);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
