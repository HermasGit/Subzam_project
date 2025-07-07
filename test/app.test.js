const request = require('supertest');
jest.mock('../src/db', () => ({
  query: jest.fn(),
}));

const pool = require('../src/db');
const app = require('../index');

describe('Production routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('GET /api/production returns rows', async () => {
    pool.query.mockResolvedValue({ rows: [{ id: 1 }] });
    const res = await request(app).get('/api/production');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([{ id: 1 }]);
  });

  test('POST /api/production creates entry', async () => {
    pool.query.mockResolvedValue({});
    const data = {
      entry_date: '2025-01-01',
      person_in_charge: 'Alice',
      batch_number: 'B001',
      stage: 'Mixing',
      quantity: 10,
    };
    const res = await request(app).post('/api/production').send(data);
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ message: 'Production data submitted.' });
  });
});
