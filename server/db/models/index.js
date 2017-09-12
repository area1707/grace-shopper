const Accessory = require('./accessories')
const User = require('./users')
const Review = require('./reviews')
const Order = require('./orders')

module.exports = {Accessory, User, Review, Order}

Review.belongsTo(User)
User.hasMany(Order)
Order.hasMany(Accessory)
Order.belongsTo(User, {as: 'user'})
