const router = require('express').Router()

const {Order, OrderBook, Book, User} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    if (req.query) {
      const orders = await Order.findAll({
        where: req.query,
        include: [
          {
            model: Book,
            through: {OrderBook}
          }
        ]
      })
      res.status(200).send(orders)
    } else {
      const orders = await Order.findAll({})
      res.status(200).send(orders)
    }
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const order = await Order.findById(id)
    res.status(200).send(order)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const cart = req.body
    let user
    let userId
    if (req.user) {
      userId = req.user.id
    } else {
      user = await User.create({email: 'guest@user.com'})
      userId = user.id
    }
    console.log(userId)
    let price = 0
    cart.forEach(item => {
      price += item.subTotal
    })
    const order = await Order.create(
      {
        totalPrice: price,
        userId: userId,
        date: Date.now(),
        orderBooks: cart
      },
      {include: [{model: OrderBook}]}
    )
    res.status(200).send(order)
  } catch (err) {
    next(err)
  }
})

module.exports = router
