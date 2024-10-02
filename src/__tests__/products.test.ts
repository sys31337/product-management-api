import request from 'supertest';
import mongoose from 'mongoose';
import app from '@app';

const productPayload = {
  name: 'Product name',
  description: 'Some description',
  price: 1000,
  quantity: 200,
};

const productObject = {
  _id: expect.anything(),
  name: expect.any(String),
  description: expect.any(String),
  status: expect.any(String),
};

let randomProductId = null;

beforeAll(async () => {
  await mongoose.connect(process.env.DATABASEURI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

let randomCategoryId = null;

describe('Products Test', () => {
  it('Creates a new category', () => request(app)
    .post('/api/v1/categories')
    .send({ name: 'Category', description: 'Some description' })
    .expect(200)
    .then((res) => {
      randomCategoryId = res.body._id;
    }));

  it('Creates a new product', () => request(app)
    .post('/api/v1/products')
    .send({ ...productPayload, category: randomCategoryId })
    .expect(200)
    .then((res) => {
      randomProductId = res.body._id;
      expect(res.body).toEqual(expect.objectContaining(productObject));
    }));

  it('Gets all products', () => request(app)
    .get('/api/v1/products')
    .expect(200)
    .then((res) => expect(res.body).toEqual(expect.arrayContaining([expect.objectContaining(productObject)]))));

  it('Gets a single product', () => request(app)
    .get(`/api/v1/products/${randomProductId}`)
    .expect(200)
    .then((res) => expect(res.body).toEqual(expect.objectContaining(productObject))));

  it('Updates a single product', () => request(app)
    .put(`/api/v1/products/${randomProductId}`)
    .send({ name: 'Updated product name', description: 'Updated product description' })
    .expect(200));

  // it('Softly deletes single product', () => request(app)
  //   .delete(`/api/v1/products/${randomProductId}`)
  //   .expect(200));

  // it('Hardly deletes single product', () => request(app)
  //   .delete(`/api/v1/products/${randomProductId}/hard`)
  //   .expect(200));
});
