const { Blogpost } = require('../models');

const postData = [
  {
    title: 'Blogpost 1',
    content:
      'This is Blogpost 1',
  },
  {
    title: 'Blogpost 2',
    content: 'This is Blogpost 2',
  },
];

const seedBlog = () => Blogpost.bulkCreate(postData);

module.exports = seedBlog;
