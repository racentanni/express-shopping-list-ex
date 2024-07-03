const request = require('supertest');
const app = require('../app');
let items = require('../fakeDb');

beforeEach(() => {
    items.length = 0; //Clear the array
    items.push({ name: 'popsicle', price: 1.45});
});

afterEach(() => {
    items.length = 0; //Clear the array
});

describe('GET /items', () => {
    it('should return a list of shopping items', async () => {
        const res = await request(app).get('/items');
        expect(res.statusCode).toBe(200);
        expect(res.body). toEqual([{ name: 'popsicle', price: 1.45}]);
    });
});

describe('POST /items', () => {
    it('Should add a new item to the list', async () => {
        const newItem = { name: 'cheerios', price: 3.40 };
        const res = await request(app).post('/items').send(newItem);
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({ added: newItem });
        expect(items).toContainEqual(newItem);
    });
});

describe('GET /items/:name', () => {
    it('Should return a single item', async () => {
    const res = await request(app).get('/items/popsicle');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ name: 'popsicle', price: 1.45});
});

it('should return a 404 for an invalid item', async () => {
    const res = await request(app).get('/items/not found');
    expect(res.status.code).toBe(404);
    expect(res.body).toEqual({ error: 'Item not found'});
    });
});

describe('PATCH /items/:name', () => {
    it('should update a single item', async () => {
        const updatedItem = {name: 'new popsicle', price: 2.45};
        const res = await request(app).patch('/items/popsicle').send(updatedItem);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ updated: updatedItem});
        expect(items).toContainEqual(updatedItem);
    });

    it('should return a 404 for an invalid item', async () => {
        const res = await request(app).patch('/items/not found').send({ name: 'new name', price: 2.45});
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({error: 'Item not found' });
    });

});

describe('DELETE /items/:name', () => {
    it('should delete a single item', async () => {
      const res = await request(app).delete('/items/popsicle');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ message: 'Deleted' });
      expect(items).not.toContainEqual({ name: 'popsicle', price: 1.45 });
    });
  
    it('should return a 404 for an invalid item', async () => {
      const res = await request(app).delete('/items/notfound');
      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({ error: 'Item not found' });
    });
  });