const router = require('express').Router();
const User = require('../db/models/users')
const Order = require('../db/models/orders')
//api/orders
module.exports = router

router.get('/:user_id', (req, res, next) => {
  Order.findAll({
    where: {
      userId: req.params.user_id
    }
  })
  .then(result => res.json(result))
  .catch(next)
})

router.post('/:user_id', (req, res, next) => {
  Order.create(req.body)
  .then(result => res.json(result))
  .catch(next)
})
