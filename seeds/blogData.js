const { Blogpost } = require('../models');

const postData = [
  {
    title: 'Blossoming Apricot',
    author: 'LedyX',
    createdOn: 'March 30, 2018',
    content:
      'Branches with pink apricot blossoms against a blue background.',
  },
  {
    title: 'Cosmos Flowers',
    author: 'WStudio',
    createdOn: 'May 05, 2017',
    content: 'Pink cosmos flowers against a blue sky.',
  },
];

const seedBlog = () => Blogpost.bulkCreate(postData);

module.exports = seedBlog;
