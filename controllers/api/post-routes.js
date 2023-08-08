const router = require('express').Router();
const { Blogpost, Comments } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const newBlogpost = await Blogpost.create({
      ...req.body,
      user_id: req.session.user_id,
      author: req.session.author,
    });

    res.status(200).json(newBlogpost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/:id', async (req, res) => {
  try {
      const newCommentData = await Comments.create(
          {
              description: req.body.description,
              blogpost_id: req.params.id,
              user_id: req.session.user_id,
          },
      );
      res.status(200).json(newCommentData);
  } catch (err) {
      console.log(err)
      res.status(500).json(err)
  }
});

router.put("/:id", async (req, res) => {
  try {
    const blogpostData = await Blogpost.update(
      req.body,
      {
          where: { id: req.params.id },
      }
    );
    res.json(blogpostData)
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const blogpostData = await Blogpost.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogpostData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(blogpostDataData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;