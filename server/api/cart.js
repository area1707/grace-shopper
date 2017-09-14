'use strict'

const db = require('../db')
const { Accessory, User, Cart, LineItem, Order, Review } = require('../db/models')
const api = module.exports = require('express').Router()

api.post('/:userId', (req, res, next) => {
    let cartInfo = req.params.userId === "unauthUser" ? {where: {session_id: req.sessionID}} : {where: {userId: req.params.userId}}
    let product = req.body.product;
    console.log('cartInfo inside post backend route', cartInfo)
    Cart.findOrCreate(cartInfo)
        .then(([cart, _]) => {
            return LineItem.findOrCreate({where: {
                accessoryId: product.id,
                cartId: cart.id
            }})
        })
        .then(([line, isCreated]) => {
            if (!isCreated) {
                return line.update({quantity: line.quantity + 1})
            } else {
                return line
            }
        })
        .then(line => LineItem.scope('default').findById(line.id))
        .then(line => res.send(line))
        .catch(next)
})


api.get('/:userId', (req, res, next) => {
    let cartInfo = req.params.userId === "unauthUser" ? {where: {session_id: req.sessionID}} : {where: {userId: req.params.userId}}
    console.log('cartInfo inside get backend route', cartInfo)
    Cart.findOne(cartInfo)
        .then(cart => {
            if (cart) return LineItem.scope('default').findAll({where: {cartId: cart.id}})
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
