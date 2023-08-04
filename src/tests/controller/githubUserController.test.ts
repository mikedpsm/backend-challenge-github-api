import { describe, expect, it } from '@jest/globals';
import request from 'supertest';
import app from '../../app';
import router from '../../routes/router';
import axios from 'axios';

const username = 'mikedpsm';
let server: any;
app.use("/api", router);

const port = 3000;

beforeEach(() => {
  server = app.listen(port);
});

afterEach(() => {
  server.close();
})

describe('GET /users/:username/repos', () => {
  it.skip('Should return an array of repositories when a valid username is provided', async () => {
    const amountOfRepos = 17;

    const data = await request(app)
      .get(`/api/users/${username}/repos`)
      .expect('content-type', /json/)
      .expect(200);

    expect(data.body.length).toEqual(amountOfRepos);
  });

  it.skip('Should return an error message when an invalid username is provided', async () => {
    const data = await request(app)
      .get('/api/users/not-valid-name/repos')
      .expect(404);

    expect(data.body).toStrictEqual({ message: 'Invalid username. Please check it and try again.' });
  });

  it.skip('Should return a 200 status code when a request is successful', async () => {
    const data = await request(app)
      .get(`/api/users/${username}/repos`);

    expect(data.statusCode).toBe(200);
  });

  it.skip('Should return an empty array of repositories when a valid username with no public repositories is provided', async () => {
    const amountOfRepos = 0;

    const data = await request(app)
      .get('/api/users/miked/repos')
      .expect('content-type', /json/)
      .expect(200);

    expect(data.body.length).toEqual(amountOfRepos);
  });
});

describe('GET /users/:username/repos', () => {

});