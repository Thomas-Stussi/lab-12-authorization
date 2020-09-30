const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/user-service');
const { getAgent } = require('../data/data-helpers');

describe('user auth routes', () => {
  it('signup a user via POST', async () => {
    const response = await getAgent()
      .post('/api/v1/auth/signup')
      .send({
        email: 'test@test.com',
        profile: 'test',
        password: 'password'
      });

    expect(response.body).toEqual({
      id: expect.any(String),
      email: 'test@test.com',
      profile: 'test'
    });
  });

  it('logs in a user via POST', async () => {
    const user = await UserService.create({
      email: 'test@test.com',
      profile: 'test',
      password: 'password'
    });

    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'test@test.com',
        password: 'password'
      });

    expect(response.body).toEqual({
      id: user.id,
      email: 'test@test.com',
      profile: 'test'
    });
  });

  it('verifies a user with GET', async () => {
    const agent = request.agent(app);
    await agent
      .post('/api/v1/auth/signup')
      .send({
        email: 'test@test.com',
        profile: 'test',
        password: 'password'
      })

    const response = await agent
      .get('/api/v1/auth/verify')

    expect(response.body).toEqual({
      id: expect.any(String),
      email: 'test@test.com',
      profile: 'test'
    })

    const responseWithoutAUser = await request(app)
      .get('/api/v1/auth/verify');

    expect(responseWithoutAUser.body).toEqual({
      status: 500,
      message: 'jwt must be provided'
    });
  })
});
