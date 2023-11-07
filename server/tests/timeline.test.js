const request = require('supertest');
const app = require('../app');
const { user, timeline, gen } = require('./dummy');

let token;
let timelineId;
let storyId;

beforeAll(async () => {
  const response = await request(app)
    .post('/auth/signin')
    .send(user);

  token = response.body.token;
});

describe('Timeline', () => {
  // Fetch All
  it('Fetch All Timeline', async () => {
    const response = await request(app)
      .get('/timelines/find')
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).not.toBeNull();
  });

  // it('Create Story', async () => {
  //   const response = await request(app)
  //     .post('/stories/create')
  //     .send(story)
  //     .set('Authorization', `Bearer ${token}`);

  //   expect(response.statusCode).toBe(200);
  //   expect(response.body).not.toBeNull();

  //   storyId = response.body._id;
  // });

  // const timeline = { story: storyId };

  it('Create Timeline', async () => {
    const response = await request(app)
      .post('/timelines/create')
      .send(timeline)
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).not.toBeNull();

    timelineId = response.body._id;
  });

  // Fetch by ID
  it('Fetch Timeline By ID', async () => {
    const response = await request(app)
      .get(`/timelines/find/${timelineId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).not.toBeNull();
  });

  // Edit Timeline
  it('Edit Timeline', async () => {
    const response = await request(app)
      .put(`/timelines/edit/${timelineId}`)
      .send({ timelinedetail: gen(20) })
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).not.toBeNull();
  });

  // Delete Timeline
  it('Delete Timeline', async () => {
    const response = await request(app)
      .delete(`/timelines/delete/${timelineId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).not.toBeNull();

    const afterDelete = await request(app)
      .get(`/timelines/find/${timelineId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(afterDelete.statusCode).toBe(404);
  });
});
