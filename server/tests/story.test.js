const request = require('supertest');
const app = require('../app');
const { user, story, gen } = require('./dummy');

let token;
let storyId;

beforeAll(async () => {
  const response = await request(app)
    .post('/auth/signin')
    .send(user);

  token = response.body.token;
});

describe('Story', () => {
  // Fetch All
  it('Fetch All Story', async () => {
    const response = await request(app)
      .get('/stories/find')
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).not.toBeNull();
  });

  it('Create Story', async () => {
    const response = await request(app)
      .post('/stories/create')
      .send(story)
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).not.toBeNull();

    storyId = response.body._id;
  });

  // Fetch by ID
  it('Fetch Story By ID', async () => {
    const response = await request(app)
      .get(`/stories/find/${storyId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).not.toBeNull();
  });

  // Edit Story
  it('Edit Story', async () => {
    const response = await request(app)
      .put(`/stories/edit/${storyId}`)
      .send({ title: gen(20) })
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).not.toBeNull();
  });

  // Delete Story
  it('Delete Story', async () => {
    const response = await request(app)
      .delete(`/stories/delete/${storyId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).not.toBeNull();

    const afterDelete = await request(app)
      .get(`/stories/find/${storyId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(afterDelete.statusCode).toBe(404);
  });
});
