const chance = require('chance').Chance();
const UserService = require('../lib/services/user-service');
const Post = require('../lib/models/post');
const Comment = require('../lib/models/comment');

module.exports = async ({ userCount = 5, postCount = 500, commentCount = 1000 } = {}) => {
  const users = await Promise.all([...Array(userCount)].map((_, i) => {
    return UserService.create({
      email: `test${i}@test.com`,
      password: `password${i}`,
      profile: 'profile photo url'
    });
  }));

  const posts = await Promise.all([...Array(postCount)].map(() => {
    return Post.insert({
      userId: chance.pickone(users).id,
      photo: chance.word(),
      caption: chance.sentence(),
      tags: JSON.stringify([chance.word(), chance.word(), chance.word()])
    });
  }));

  await Promise.all([...Array(commentCount)].map(() => {
    return Comment.insert({
      text: chance.sentence(),
      commenterId: chance.pickone(users).id,
      postId: chance.pickone(posts).id
    });
  }));
};
