import request from 'supertest';
import mongoose from 'mongoose';
import app from '@app';

const categoryPayload = {
  name: 'Product name',
  description: 'Some description',
};

beforeAll(async () => {
  await mongoose.connect(process.env.DATABASEURI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('POST /api/v1/categories', () => {
  it('Returns status 200', () => request(app)
    .post('/api/v1/categories')
    .send(categoryPayload)
    .expect(200)
    .then((res) => expect(res.body).toEqual(expect.objectContaining({
      _id: expect.anything(),
      name: expect.any(String),
      description: expect.any(String),
      status: expect.any(String),
    }))));
});
