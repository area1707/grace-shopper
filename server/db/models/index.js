const Accessory = require('./accessories')
const User = require('./users')
const Review = require('./reviews')
const Order = require('./orders')
const Order_accessory = require('./order_accessory')

module.exports = {Accessory, User, Review, Order}

User.hasMany(Order)
Accessory.belongsToMany(Order, {through: 'order_accessory'})
Order.belongsTo(User, {as: 'user'})
Review.belongsTo(Accessory)
Review.belongsTo(User)
