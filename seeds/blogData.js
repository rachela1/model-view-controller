const { Blogpost } = require('../models');

const postData = [
  {
    title: 'Blossoming Apricot',
    content:
      'Branches with pink apricot blossoms against a blue background.',
  },
  {
    title: 'Cosmos Flowers',
    content: 'Pink cosmos flowers against a blue sky.',
  },
];

const seedBlog = () => Blogpost.bulkCreate(postData);

module.exports = seedBlog;
