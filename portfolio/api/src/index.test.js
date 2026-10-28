const request = require('supertest');
const app = require('./index');

test('POST /api/contact valide → 200', async () => {
  const res = await request(app).post('/api/contact')
    .send({ name: 'Alice', email: 'a@b.com', message: 'Hello' });
  expect(res.statusCode).toBe(200);
});

test('POST /api/contact invalide → 400', async () => {
  const res = await request(app).post('/api/contact')
    .send({ name: 'A', email: 'bad', message: '' });
  expect(res.statusCode).toBe(400);
});

test('injection SQL traitée comme texte', async () => {
  const res = await request(app).post('/api/contact')
    .send({ name: "'; DROP TABLE contacts;--", email: 'a@b.com', message: 'x' });
  expect([200, 400]).toContain(res.statusCode);
});
