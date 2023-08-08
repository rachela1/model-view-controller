const router = require('express').Router();
const { Blogpost, User, Comments } = require('../models');
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
  
  router.get("/blogpost/:id", async (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/login');
      } else {
        try {
          const blogpostData = await Blogpost.findByPk(req.params.id, { include: [User] });
          const commentData = await Comments.findAll({ where: { id: req.params.id }, include: [User]});

          const blogpost = blogpostData.get({ plain: true});
          const comments = commentData.map((comment) => comment.get({ plain: true }));

          res.render("addComment", { 
            blogpost,
            comments,
            loggedIn: req.session.loggedIn,
        });
        } catch (err) {
          console.error(err);
          res.status(500).json(err);
        }
      }
});

  router.get("/blogpost/:id", async (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/login');
      } else {
        try {
          const blogpostData = await Blogpost.findByPk(req.params.id, { include: [User] });
          const commentData = await Comments.findAll({ where: { id: req.params.id }, include: [User]});

          const blogpost = blogpostData.get({ plain: true});
          const comments = commentData.map((comment) => comment.get({ plain: true }));

          res.render("addComment", { 
            blogpost,
            comments,
            loggedIn: req.session.loggedIn,
        });
        } catch (err) {
          console.error(err);
          res.status(500).json(err);
        }
      }
});

router.get('/dashboard/:id', async (req, res) => {
    try {
      const blogpostData = await Blogpost.findByPk(req.params.id, { include: [{ model: User, attributes: ["username"] }] });
      const blogpost = blogpostData.get({ plain: true });
      res.render("updateBlogpost", { blogpost, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.error(err);
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
  
  router.get("/newblogpost", (req, res) => {
    res.render("newBlogpost", { loggedIn: req.session.loggedIn });
});
  
  
module.exports = router;