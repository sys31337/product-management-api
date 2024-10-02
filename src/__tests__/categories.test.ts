import request from 'supertest';
import mongoose from 'mongoose';
import app from '@app';

const categoryPayload = {
  name: 'Category name',
  description: 'Some description',
};

const categoryObject = {
  _id: expect.anything(),
  name: expect.any(String),
  description: expect.any(String),
  status: expect.any(String),
};

let randomCategoryId = null;

beforeAll(async () => {
  await mongoose.connect(process.env.DATABASEURI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Categories Test', () => {
  it('Creates a new category', () => request(app)
    .post('/api/v1/categories')
    .send(categoryPayload)
    .expect(200)
    .then((res) => {
      randomCategoryId = res.body._id;
      expect(res.body).toEqual(expect.objectContaining(categoryObject));
    }));

  it('Gets all categories', () => request(app)
    .get('/api/v1/categories')
    .expect(200)
    .then((res) => expect(res.body).toEqual(expect.arrayContaining([expect.objectContaining(categoryObject)]))));

  it('Gets a single category', () => request(app)
    .get(`/api/v1/categories/${randomCategoryId}`)
    .expect(200)
    .then((res) => expect(res.body).toEqual(expect.objectContaining(categoryObject))));

  it('Updates a single category', () => request(app)
    .put(`/api/v1/categories/${randomCategoryId}`)
    .send({ name: 'Updated category name', description: 'Updated category description' })
    .expect(200));

  it('Softly deletes single category', () => request(app)
    .delete(`/api/v1/categories/${randomCategoryId}`)
    .expect(200));

  it('Hardly deletes single category', () => request(app)
    .delete(`/api/v1/categories/${randomCategoryId}/hard`)
    .expect(200));
});
