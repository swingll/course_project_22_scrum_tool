const request = require('supertest');
const app = require('../app');
const { user, gen } = require('./dummy');

describe('User Signin', () => {
    it('Signin successfully', async () => {
        const response = await request(app)
            .post('/auth/signin')
            .send(user);

        expect(response.statusCode).toBe(200);
        expect(response.body).not.toBeNull();
        expect(response.body.token).not.toBeNull();
    });

    it('Signin failed', async () => {
        const dummy = {
            username: gen(20),
            password: gen(20),
        }

        const response = await request(app)
            .post('/auth/signin')
            .send(dummy);

        expect(response.statusCode).toBe(404);
    });
});

describe('User Signup', () => {
    it('Signup successfully', async () => {
        const dummy = {
            email: `${gen(20)}@gmail.com`,
            username: gen(20),
            password: gen(20),
        }

        const response = await request(app)
            .post('/auth/signup')
            .send(dummy);

        expect(response.statusCode).toBe(200);
        expect(response.body).not.toBeNull();
        expect(response.body.token).not.toBeNull();
    });

    it('Signup failed', async () => {
        const response = await request(app)
            .post('/auth/signup')
            .send(user);

        expect(response.statusCode).toBe(400);
    });
});