'use strict'

const db = require('../db')
const { Accessory, User, Order, Review, Order_accessory } = require('../db/models')
const api = module.exports = require('express').Router()

api.use((req, res, next) => {
  if (req.user) {
    Order.findOrCreate({
      where: {
        userId: req.user.id
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
    const accessoryId = req.body.accessoryId
    const orderedPrice = req.body.orderedPrice
    return req.cart.addAccessory(accessoryId)
    .then((result) => {
      const returnedOrder = result[0][0]
      return returnedOrder.update({orderedPrice})
    })
    .then(() => {
      Accessory.findById(accessoryId)
      .then(line => {
        res.send(line)
      })
    })
    .catch(next)
})

api.delete(`/item/:lineItemId`, (req, res, next) => {
    Order_accessory.destroy({where: {accessoryId: req.params.lineItemId}})
        .then(destroyed => res.sendStatus(204))
        .catch(next)
})

api.put(`/item/:lineItemId`, (req, res, next) => {
    Order_accessory.update({quantity: req.body.newQuantity, orderedPrice: req.body.orderedPrice}, {where: {accessoryId: req.params.lineItemId}})
        .then(updated => res.send(req.body.newQuantity))
        .catch(next)
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
