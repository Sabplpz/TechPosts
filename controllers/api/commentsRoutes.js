const router = require('express').Router();
const { Comments } = require('../../models');

router.get('/', async (req, res) => {
  res.render('comments', { 
    logged_in: req.session.logged_in 
  });
});

router.post('/', (req, res) => {
    /* req.body should look like this...
      {
      "postedBy": 1,
      "cont": "Example content",
      "post_id": 1
      } 
  */
      userId = req.session.user_id;
    Comments.create({
      postedBy: userId,
      cont: req.body.cont,
      post_id: req.body.post_id
    })
    .then((comment) =>  
    res.status(200).json(comment)
    
    )
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.put('/:id', (req, res) => {
    /* req.body should look like this...
       {
      "postedBy": 1,
      "cont": "Example content",
      "post_id": 1
      }
  */
    // update a posts' content by its id
    Comment.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
    .then((comment) => res.status(200).json(comment))
    .catch((err) => {
      console.log(err);
      res.json(err);
    })
  });

  router.delete('/:id', (req, res) => {
    // delete one product by its `id` value
    Comments.destroy({
      where: {
        id: req.params.id,
      },
    })
    .then((comment) => res.status(200).json(comment))
    .catch((err) => {
      console.log(err);
      res.json(err);
    })
  });

module.exports = router;