const request = require('supertest');
const app = require('./main'); // Assuming your app file is named 'main.js'

describe('CRUD API', () => {
  let itemId;

  // Test GET /items
  it('should retrieve all items', async () => {
    const response = await request(app).get('/items');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  // Test POST /items
  it('should create a new item', async () => {
    const newItem = { name: 'Item 1', description: 'Description 1' };
    const response = await request(app).post('/items').send(newItem);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    itemId = response.body.id;
  });

  // Test GET /items/:id
  it('should retrieve a specific item', async () => {
    const response = await request(app).get(`/items/${itemId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', itemId);
    expect(response.body).toHaveProperty('name', 'Item 1');
    expect(response.body).toHaveProperty('description', 'Description 1');
  });

  // Test PUT /items/:id
  it('should update an existing item', async () => {
    const updatedItem = { name: 'Item 1 (Updated)', description: 'Description 1 (Updated)' };
    const response = await request(app).put(`/items/${itemId}`).send(updatedItem);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', itemId);
    expect(response.body).toHaveProperty('name', 'Item 1 (Updated)');
    expect(response.body).toHaveProperty('description', 'Description 1 (Updated)');
  });

  // Test DELETE /items/:id
  it('should delete an item', async () => {
    const response = await request(app).delete(`/items/${itemId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', itemId);
  });

  // Verify item deletion
  it('should not find the deleted item', async () => {
    const response = await request(app).get(`/items/${itemId}`);
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Item not found' });
  });
});
