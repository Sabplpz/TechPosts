const router = require('express').Router();
const { User, Posts, Comments} = require('../models');
const withAuth = require('../utils/auth');

// Prevent non logged in users from viewing the homepage
router.get('/', withAuth, async (req, res) => {
  try {
    const postsData = await Posts.findAll({
      include: [
        { model: User , attributes: { exclude: ['password'] }}, 
        { model: Comments }]
    });

    const posts = postsData.map((post) => post.get({ plain: true }));
    console.log(posts[0].comments);

    res.render('homepage', {
      posts,
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;