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

    res.render('homepage', {
      posts,
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const postsData = await Posts.findAll({
      where: {
        posted_by: req.session.user_id
      },
      include: [{ model: User , attributes: { exclude: ['password'] }}]
    });

    const posts = postsData.map((post) => post.get({ plain: true }));

    res.render('dashboard', {
      posts,
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/posts/:id', withAuth, async (req, res) => {
  try {
    const postData = await Posts.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        { model: User , attributes: { exclude: ['password'] }}, 
        { model: Comments , include: { model: User , attributes: { exclude: ['password'] }}}]
    });

    const post = postData.get({ plain: true });

    res.render('posts', {
      ...post,
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