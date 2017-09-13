const router = require('express').Router();
const Accessory = require('../db/models/accessories')
module.exports = router

router.get('/', function (req, res, next) {
  Accessory.findAll()
  .then( accessories => res.status(200).json(accessories))
  .catch(next)
})

router.post('/', (req, res, next) => {
  Accessory.create(req.body)
  .then(newAccessory => res.json(newAccessory))
  .catch(next)
})

router.get('/:accessoryId', (req, res, next) => {
  Accessory.findById(req.params.accessoryId)
  // OB/SRC: probably mean to use lower case here?
  .then(Accessory => res.json(Accessory))
  .catch(next)
})

router.put('/:accessoryId', (req, res, next) => {
  Accessory.update(
    req.body,
    {where: {id: req.params.accessoryId},
    returning: true})
  .then(result => {
    res.status(200).json(result[1][0]) // OB/SRC: document what's going on here
  })
  .catch(next)
})

router.delete('/:accessoryId', (req, res, next) => {
  Accessory.findById(req.params.accessoryId)
  // OB/SRC: probably mean to use lower case here?
  .then(Accessory => Accessory.destroy())
  .then(() => res.sendStatus(204))
  .catch(next)
})
