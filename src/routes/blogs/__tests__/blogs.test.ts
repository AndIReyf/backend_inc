import request from 'supertest';
import { AppRoutes, createBasicAuthHeader } from '../../../core';
import app from '../../../main';
import { IBlog } from '../types';

const blog: IBlog = {
  id: '1',
  name: 'Blog',
  description: 'Description',
  websiteUrl: 'https://blog.website',
};

const basicAuthHeader = createBasicAuthHeader('admin', 'qwerty');

describe('Blogs', () => {
  beforeAll(async () => {
    await request(app).delete(`${AppRoutes.tests}${AppRoutes.allData}`);
  });

  it('Should return empty [], GET => /blogs', async () => {
    await request(app).get(AppRoutes.blogs).expect(200, []);
    await request(app).get(AppRoutes.blogs).send(blog).expect(200, []);
  });
  it('Not Found, GET => /blogs/:id', async () => {
    await request(app).get(`${AppRoutes.blogs}/1`).expect(404);
    await request(app).get(`${AppRoutes.blogs}/1`).send(blog).expect(404);
  });
  it('Not auth, POST => /blogs', async () => {
    await request(app).post(AppRoutes.blogs).expect(401);
    await request(app).post(AppRoutes.blogs).send(blog).expect(401);
  });
  it('Authorized, POST => /blogs', async () => {
    await request(app)
      .post(AppRoutes.blogs)
      .set('Authorization', basicAuthHeader)
      .send(blog)
      .expect(201, blog);
    await request(app)
      .post(AppRoutes.blogs)
      .set('Authorization', basicAuthHeader)
      .expect(400);
    await request(app)
      .post(AppRoutes.blogs)
      .set('Authorization', basicAuthHeader)
      .send({})
      .expect(400);
    await request(app)
      .post(AppRoutes.blogs)
      .set('Authorization', basicAuthHeader)
      .send({ name: 'A' })
      .expect(400);
    await request(app)
      .post(AppRoutes.blogs)
      .set('Authorization', basicAuthHeader)
      .send({ name: 'A', description: 'Description' })
      .expect(400);
    await request(app)
      .post(AppRoutes.blogs)
      .set('Authorization', basicAuthHeader)
      .send({ name: 'A', description: ' ', websiteUrl: 'https://blog.website' })
      .expect(400);
    await request(app)
      .post(AppRoutes.blogs)
      .set('Authorization', basicAuthHeader)
      .send({ name: 'A', description: ' A', websiteUrl: 'https://' })
      .expect(400);
    await request(app)
      .post(AppRoutes.blogs)
      .set('Authorization', basicAuthHeader)
      .send({ name: '', description: '', websiteUrl: '' })
      .expect(400);
    await request(app)
      .post(AppRoutes.blogs)
      .set('Authorization', basicAuthHeader)
      .send({ name: ' ', description: '  ', websiteUrl: ' ' })
      .expect(400);
    await request(app)
      .post(AppRoutes.blogs)
      .set('Authorization', basicAuthHeader)
      .send({ name: 0, description: false, websiteUrl: undefined })
      .expect(400);
  });

  afterAll((done) => {
    done();
  });
});
