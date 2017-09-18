'use strict'

const db = require('../db')
const { Accessory, User, Order, Review, Order_accessory } = require('../db/models')
const api = module.exports = require('express').Router()

api.use((req, res, next) => {
  if (req.user) {
    Order.findOrCreate({
      where: {
        userId: req.user.id,
        status: 'incomplete'
      }
    })
    .then(cart => {
      req.cart = cart[0]
      next()
    })
    .catch(next)
  }
  else if (req.session.cartId) {
    Order.findOrCreate({
      where: {
        id: req.session.cartId
      }
    })
    .then(cart => {
      req.cart = cart[0]
      next()
    })
    .catch(next)
  } else {
    Order.create()
    .then(cart => {
      req.cart = cart
      req.session.cartId = cart.id
      next()
    })
    .catch(next)
  }
})

api.post('/', (req, res, next) => {
    let product = req.body.product
    return req.cart.addAccessory(product.id)
    .then(() => {
      Accessory.findById(product.id)
      .then(line => res.send(line))
    })
    .catch(next)
})

api.delete(`/item/:lineItemId`, (req, res, next) => {
    Order_accessory.destroy({where: {accessoryId: req.params.lineItemId}})
        .then(destroyed => res.sendStatus(204))
        .catch(next)
})

api.put(`/item/:lineItemId`, (req, res, next) => {
    Order_accessory.update({quantity: req.body.newQuantity}, {where: {accessoryId: req.params.lineItemId}})
        .then(updated => res.send(req.body.newQuantity))
        .catch(next)
})

api.put(`/:cartId`, (req, res, next) => {
  Order.update({
    shippingAddress: req.body.shippingAddress,
    emailAddress: req.body.emailAddress,
    status: 'processing'
  }, {
    where: {
      id: req.params.cartId
    },
    returning: true
  })
    .then(orderUpdated => {
      if (req.session.cartId) req.session.cartId = 0 
      res.send(orderUpdated[1][0])
    })
    .catch(next)
})

api.get('/id', (req, res, next) => {
  Order.findOne({
    where: {
      id: req.cart ? req.cart.id : req.session.cartId
    }
  })
  .then(order => res.send(order))
})

api.get('/', (req, res, next) => {
  Order_accessory.findAll({
    where: {
      orderId: req.cart ? req.cart.id : req.session.cartId
    }
  })
  .then(accArr => {
    return Promise.all(accArr.map(acc => Accessory.findOne({
      where: {
        id: acc.accessoryId
      }
    })))
  .then(result => {
    res.send(result)
  })
  .catch(next)
  })
})
