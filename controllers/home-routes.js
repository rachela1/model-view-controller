const router = require('express').Router();
const { Blogpost, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
       
        const dbBlogpostData = await Blogpost.findAll({
            include: [User]
        });
        const blogposts = dbBlogpostData.map((blogpost) => 
            blogpost.get({ plain: true})
        );

        res.render('homepage', {
            blogposts,
            loggedIn: req.session.loggedIn,
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

  router.post('/newblogpost', withAuth, async (req, res) => {
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
  
  router.get("/newblogpost", (req, res) => {
    res.render("newBlogpost", { loggedIn: req.session.loggedIn });
});
  
  
module.exports = router;