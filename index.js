const express = require('express');
const cors = require('cors');
const Database = require('@replit/database');
const db = new Database();

const app = express();
app.use(express.json());
app.use(express.static('.')); // Serve your HTML/CSS/JS files from root

// API endpoint to create a post
app.post('/api/posts', async (req, res) => {
  const { caption, imageUrl } = req.body;
  const id = Date.now().toString();
  await db.set(id, { caption, imageUrl });
  res.json({ success: true, id });
});

// API endpoint to retrieve all posts
app.get('/api/posts', async (req, res) => {
  const keys = await db.list();
  const posts = await Promise.all(keys.map(async (key) => await db.get(key)));
  res.json(posts);
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
