const router = require('express').Router();
const { Posts, Comments } = require('../../models');

router.get('/', async (req, res) => {
    Posts.findAll({
      include: [{model: Comments}],
     })
      .then((posts) => res.json(posts))
      .catch((err) => {
        console.log(err);
        res.json(err);
      })
});

router.post('/', (req, res) => {
    /* req.body should look like this...
      {
      "postedBy": 1,
      "title": "Example title",
      "cont": "Example content",
      }
  */
    Posts.create(req.body)
    .then((post) => res.status(200).json(post))
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.put('/:id', (req, res) => {
    /* req.body should look like this...
      {
      "postedBy": "Sabrina",
      "title": "Example title",
      "cont": "Example content",
      }
  */
    // update a posts' content by its id
    Posts.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
    .then((post) => res.status(200).json(post))
    .catch((err) => {
      console.log(err);
      res.json(err);
    })
  });

  router.delete('/:id', (req, res) => {
    // delete one product by its `id` value
    Posts.destroy({
      where: {
        id: req.params.id,
      },
    })
    .then((posts) => res.status(200).json(posts))
    .catch((err) => {
      console.log(err);
      res.json(err);
    })
  });

module.exports = router;