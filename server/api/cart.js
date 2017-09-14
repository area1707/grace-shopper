'use strict'

const db = require('../db')
const { Accessory, User, Cart, LineItem, Order, Review } = require('../db/models')
const api = module.exports = require('express').Router()

api.post('/', (req, res, next) => {
    let product = req.body.product
    //try to use addLineItem (magic method) but it didn't work
    // req.cart.addLineItem(product.id)
    LineItem.create({
      cartId: req.session.cartId,
      accessoryId: product.id
    })
    .then(line => LineItem.scope('default').findById(line.id))
    .then(line => res.send(line))
    .catch(next)
})


api.get('/:userId', (req, res, next) => {
    Cart.findById(req.session.cartId)
    .then(cart => {
      if (cart) return LineItem.scope('default').findAll({where: {cartId: req.session.cartId}})
      else {return []}
    })
    .then(lineItems => res.send(lineItems))
    .catch(next)
})

api.delete(`/item/:lineItemId`, (req, res, next) => {
    LineItem.destroy({where: {id: req.params.lineItemId}})
        .then(destroyed => res.sendStatus(204))
        .catch(next)
})

api.put(`/item/:lineItemId`, (req, res, next) => {
    LineItem.update({quantity: req.body.newQuantity}, {where: {id: req.params.lineItemId}})
        .then(updated => res.send(req.body.newQuantity))
        .catch(next)
})
