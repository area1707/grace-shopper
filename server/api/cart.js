'use strict'

const db = require('../db')
const { Accessory, User, Order, Review, Order_accessory } = require('../db/models')
const api = module.exports = require('express').Router()

api.post('/', (req, res, next) => {
    let product = req.body.product
    //try to use addAccessory (magic method) but it didn't work
    req.cart.addAccessory(product.id)
    // LineItem.create({
    //   cartId: req.session.cartId,
    //   accessoryId: product.id
    // })
    // .then(line => LineItem.scope('default').findById(line.id))
    .then(line => res.send(line))
    .catch(next)
})


api.get('/:userId', (req, res, next) => {
    Order.findById(req.session.cartId)
    .then(cart => {
      if (cart) return Order_accessory.scope('default').findAll({where: {orderId: req.session.cartId}})
      else {return []}
    })
    .then(lineItems => res.send(lineItems))
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
