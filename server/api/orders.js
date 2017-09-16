const router = require('express').Router();
const Order = require('../db/models/orders')
const Order_accessory = require('../db/models/order_accessory')
module.exports = router

router.get('/', (req, res, next) => {
  Order_accessory.findAll()
  .then(orders => res.json(orders))
  .catch(next)
})


// router.get('/:order_id', (req, res, next) => {
//   Order_accessory.findAll({
//     where: {
//       orderId: req.params.order_id
//     }
//   })
//   .then(order => res.json(order))
//   .catch(next)
// })

//the aim is when an order is posted in our order table, we also need to create a row in order_accessories (join table)
//we can do this by looking up the id of the resulted order, and then returns an array of accessory IDs
// we take the accessory ids to update the inventory of the accessories
router.post('/:user_id', (req, res, next) => {
  Order.create(req.body)
  // .then(result => {
  //   let orderArr = result.order
  //   orderArr.map(order => {
  //     Accessory.findAll({
  //       where: {
  //         name: order
  //       }
  //     })
  //     .then()
  //   })
  //   Order.findById(result.id)
  //   .then(order => order.addAccessory())
  //   Order_accessory.findAll({
  //     where: {
  //       orderId: result.id
  //     }
  //   })
  //   .then(accessories => {
  //     accessories.forEach(accessory => Accessory.update({
  //       inventory: accessory.inventory--
  //     }))
  //   })
  // })
  .catch(next)
})
