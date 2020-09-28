const { Router } = require('express');
const Post = require('../models/post');

module.exports = new Router()
  .post('/', (req, res, next) => {
    Post
      .insert(req.body)
      .then(post => res.send(post))
      .catch(next);
  })