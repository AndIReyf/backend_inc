import request from 'supertest';
import { AppRoutes } from '../core';
import app from '../index';

describe('GET home route /', () => {
  it("should return 'Hello world!'", async () => {
    const { status, text } = await request(app).get(AppRoutes.home);
    expect(status).toBe(200);
    expect(text).toBe('Hello world!');
  });
});
