const router = require('express').Router();
const Order = require('../db/models/orders')
const Order_accessory = require('../db/models/order_accessory')
module.exports = router

router.get('/', (req, res, next) => {
  Order_accessory.findAll()
  .then(orders => res.json(orders))
  .catch(next)
})
