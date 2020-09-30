const fs = require('fs');
const pool = require('../lib/utils/pool');
const { getAgent } = require('../data/data-helpers');
const request = require('supertest');
const app = require('../lib/app');
const User = require('../lib/models/user');
const Post = require('../lib/models/post')

describe('posts routes', () => {

  it('makes a new post via POST', async () => {
    const response = await getAgent()
      .post('/api/v1/posts')
      .send({
        caption: 'My first post',
        photo: 'test photo url',
        tags: JSON.stringify(['an', 'array', 'of', 'tags'])
      });

    expect(response.body).toEqual({
      id: expect.any(String),
      userId: expect.any(String),
      caption: 'My first post',
      photo: 'test photo url',
      tags: ['an', 'array', 'of', 'tags']
    })
  })

  it('gets a list of all post with GET', async () => {
    const response = await getAgent()
      .get('/api/v1/posts')

    expect(response.body).toContainEqual({
      id: expect.any(String),
      userId: expect.any(String),
      caption: expect.any(String),
      photo: expect.any(String),
      tags: expect.any(Array)
    })
  })

  it('updates a post by id via PATCH', async () => {
    const response = await getAgent()
      .patch('/api/v1/posts/1')
      .send({ caption: 'updated caption' })

    expect(response.body).toEqual({
      id: '1',
      photo: expect.any(String),
      tags: expect.any(Array),
      userId: expect.any(String),
      caption: 'updated caption'
    })
  })

  it('deletes a post by id via DELETE', async () => {
    const response = await getAgent()
      .delete('/api/v1/posts/1')

    expect(response.body).toEqual({
      id: '1',
      photo: expect.any(String),
      tags: expect.any(Array),
      userId: expect.any(String),
      caption: expect.any(String)
    })
  })

  // it('gets the 10 most commented posts via GET', async() => {
  //   const response = await getAgent()
  //     .get('/api/v1/posts/popular')

  //     expect(response.body).toContainEqual({
  //       id: expect.any(String),
  //       photo: expect.any(String),
  //       tags: expect.any(Array),
  //       userId: expect.any(String),
  //       caption: expect.any(String)
  //     })
  // })
});
