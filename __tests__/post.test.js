const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/user-service');

describe('post routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'))
  });

  it('makes a new post via POST', async () => {
    const user = await UserService.create({
      email: 'test@test.com',
      profile: 'test',
      password: 'password'
    });
  })
});
