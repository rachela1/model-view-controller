const router = require('express').Router();
const { Blogpost, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
    res.render('homepage')
})

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
        blogpost: blogpost,
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

  router.get('/newblogpost', withAuth, async (req, res) => {
    try {
        res.render('new-blogpost', {
            loggedIn: req.session.loggedIn,
            userId: req.session.userId,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
  });
  
  
module.exports = router;