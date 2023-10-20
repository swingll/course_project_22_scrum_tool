const request = require('supertest');
const app = require('../app');
const { user, story, task, gen } = require('./dummy');

let token;
let storyId;
let taskId;

beforeAll(async () => {
  const response = await request(app)
    .post('/auth/signin')
    .send(user);

  token = response.body.token;
});

describe('Task', () => {
  // Fetch All
  it('Fetch All Task', async () => {
    const response = await request(app)
      .get('/tasks/find')
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).not.toBeNull();
  });

  // Create Story
  it('Create Story', async () => {
    const response = await request(app)
      .post('/stories/create')
      .send(story)
      .set('Authorization', `Bearer ${token}`);

    storyId = response.body._id;
  });

  // Create Task
  it('Create Task', async () => {
    const response = await request(app)
      .post('/tasks/create')
      .send({ ...task, story: storyId })
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).not.toBeNull();

    taskId = response.body._id;
  });

  // Fetch By ID
  it('Fetch Task By ID', async () => {
    const response = await request(app)
      .get(`/tasks/find/${taskId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).not.toBeNull();
  });

  // Edit Task
  it('Edit Task', async () => {
    const response = await request(app)
      .put(`/tasks/edit/${taskId}`)
      .send({ content: gen(20) })
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).not.toBeNull();
  });

  // Delete Task
  it('Delete Task', async () => {
    const response = await request(app)
      .delete(`/tasks/delete/${taskId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).not.toBeNull();

    const afterDelete = await request(app)
      .get(`/tasks/find/${taskId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(afterDelete.statusCode).toBe(404);
  });
});
