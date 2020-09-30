const { Router } = require('express');
const Post = require('../models/post');
const ensureAuth = require('../middleware/ensure-auth')

module.exports = new Router()
  .post('/', ensureAuth, (req, res, next) => {
    Post
      .insert({ ...req.body, userId: req.user.id })
      .then(post => res.send(post))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Post
      .find()
      .then(posts => res.send(posts))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Post
      .findById(req.params.id)
      .then(post => res.send(post))
      .catch(next);
  })

  .patch('/:id', ensureAuth, (req, res, next) => {
    Post
      .update(req.params.id, req.body)
      .then(post => res.send(post))
      .catch(next);
  })

  .delete('/:id', ensureAuth, (req, res, next) => {
    Post
      .delete(req.params.id)
      .then(post => res.send(post))
      .catch(next);
  })

  .get('/popular', (req, res, next) => {
    Post
      .popular()
      .then(posts => res.send(posts))
      .catch(next);
  });
