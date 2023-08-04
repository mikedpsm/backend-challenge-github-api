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
  it('Should return an array of repositories when a valid username is provided', async () => {
    const amountOfRepos = 17;

    const data = await request(app)
      .get(`/api/users/${username}/repos`)
      .expect('content-type', /json/)
      .expect(200);

    expect(data.body.length).toEqual(amountOfRepos);
  });

  it('Should return an error message when an invalid username is provided', async () => {
    const data = await request(app)
      .get('/api/users/not-valid-name/repos')

    expect(data.body).toStrictEqual({ message: 'Invalid username. Please check it and try again.' });
    expect(data.status).toBe(404);
  });

  it('Should return a 200 status code when a request is successful', async () => {
    const data = await request(app)
      .get(`/api/users/${username}/repos`);

    expect(data.statusCode).toBe(200);
  });

  it('Should return an empty array of repositories when a valid username with no public repositories is provided', async () => {
    const amountOfRepos = 0;

    const data = await request(app)
      .get('/api/users/miked/repos')
      .expect('content-type', /json/)
      .expect(200);

    expect(data.body.length).toEqual(amountOfRepos);
  });
});

describe('GET /users/:username/details', () => {
  it('Should return an user\'s details when a valid username is provided', async () => {
    const data = await request(app)
      .get(`/api/users/${username}/details`)
      .expect('content-type', /json/)
      .expect(200);

    expect(data.body.id).toEqual(11251303);
  });

  it('Should return an error message when an invalid username is provided', async () => {
    const data = await request(app)
      .get('/api/users/mikedpsmx/details');

    expect(data.body).toStrictEqual({
      "message": "Not Found",
      "documentation_url": "https://docs.github.com/rest/users/users#get-a-user"
    });
    expect(data.status).toBe(404);
  });

  it('Should return an error message when an empty username is provided', async () => {
    const data = await request(app)
      .get('/api/users/details');

    expect(data.status).toBe(404);
  });
});

describe('GET /users?since={number}', () => {
  it('Should return a list of users using default query parameter', async () => {
    const data = await request(app)
      .get(`/api/users/`);

    expect(data.body.data[0].id).toEqual(2);
    expect(data.status).toBe(200);
  });

  it('Should return a list of users using custom query parameter', async () => {
    const data = await request(app)
      .get(`/api/users/`)
      .query({ since: 5, per_page: 3 });

    expect(data.body.data[0].id).toEqual(6);
    expect(data.body.data.length).toBe(3);
    expect(data.status).toBe(200);
  });

  it('Should return a list of users using a large \'since\' query parameter', async () => {
    const data = await request(app)
      .get(`/api/users/`)
      .query({ since: 50000, per_page: 5 });

    expect(data.body.data[0].id).toEqual(50001);
    expect(data.body.data.length).toBe(5);
    expect(data.status).toBe(200);
  });

  it('Should return a bad request error when using an invalid query parameter', async () => {
    const data = await request(app)
      .get(`/api/users/`)
      .query({ since: 'a' });

    expect(data.status).toBe(400);
  });

  it('Should return a \"next page\" link when using a valid query parameter', async () => {
    const data = await request(app)
      .get(`/api/users/`)
      .query({ since: 5, per_page: 3 });

    expect(data.body.data[0].id).toEqual(6);
  });

});