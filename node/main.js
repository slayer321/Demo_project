// Required modules
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();

// Parse incoming JSON requests
app.use(bodyParser.json());

// In-memory data storage
let items = [];

// GET route to retrieve all items
app.get('/items', (req, res) => {
  res.json(items);
});

// GET route to retrieve a single item by ID
app.get('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find((item) => item.id === id);

  if (!item) {
    res.status(404).json({ error: 'Item not found' });
    return;
  }

  res.json(item);
});

// POST route to create a new item
app.post('/items', (req, res) => {
  const newItem = req.body;
  newItem.id = Date.now();
  items.push(newItem);

  res.status(201).json(newItem);
});

// PUT route to update an existing item
app.put('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedItem = req.body;
  updatedItem.id = id;

  const index = items.findIndex((item) => item.id === id);

  if (index === -1) {
    res.status(404).json({ error: 'Item not found' });
    return;
  }

  items[index] = updatedItem;

  res.json(updatedItem);
});

// DELETE route to delete an item
app.delete('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const index = items.findIndex((item) => item.id === id);

  if (index === -1) {
    res.status(404).json({ error: 'Item not found' });
    return;
  }

  const deletedItem = items.splice(index, 1)[0];

  res.json(deletedItem);
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
