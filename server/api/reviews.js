// api/revews.js
const router = require('express').Router();
const Review = require('../db/models/reviews')

//get all reviews
router.get('/', function (req, res, next) {
  Review.findAll()
  .then( reviews => res.status(200).json(reviews))
  .catch(next)
})

router.post('/', (req, res, next) => {
  Review.create(req.body)
  .then(newReview => res.json(newReview))
  .catch(next)
})

router.get('/:reviewId', (req, res, next) => {
  Review.findById(req.params.reviewId)
  .then(review => res.json(review))
  .catch(next)
})

router.put('/:reviewId', (req, res, next) => {
  Review.update(
    req.body,
    {where: {id: req.params.reviewId},
    returning: true})
  .then(result => {
    res.status(200).json(result[1][0])
  })
  .catch(next)
})

router.delete('/:reviewId', (req, res, next) => {
  Review.findById(req.params.reviewId)
  .then(review => Review.destroy(review))
  .then(() => res.sendStatus(204))
  .catch(next)
})


module.exports = router;
