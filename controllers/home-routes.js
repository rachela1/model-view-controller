const router = require('express').Router();
const { Blogpost, User } = require('../models');

router.get('/', async (req, res) => {
    try {
        const dbBlog = await Blogpost.findall({
            include: [
                {
                    model: User,
                    attributes: ['username'],

                },
            ],
            order: [
                ['id', 'DESC'],
            ],
        });

    const blogpost = dbBlog.map((blogpost) => {
     blogpost.get({ plain : true })
    });
    res.render('homepage', {
        blogposts: blogposts,
        loggedIn: req.session.loggedIn,
        username: req.session.username,
    });
} catch (err) {
    console.log(err);
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/dashboard', async (req, res) => {
    try {
      const dbBlogpostData = await Blogpost.findAll();
      const blogposts = dbBlogpostData.map((blogpost) => blogpost.get({ plain: true }));
      res.render('dashboard', {
        blogposts,
        loggedIn: req.session.loggedIn,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });


  
module.exports = router;