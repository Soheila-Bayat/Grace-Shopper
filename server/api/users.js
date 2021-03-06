const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: [
        'id',
        'email',
        'isAdmin',
        'firstName',
        'lastName',
        'userName'
      ]
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const book = await User.findById(id)
    res.status(200).send(book)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  const id = req.params.id
  const user = await User.findOne({
    where: {
      id
    }
  })
  const updatedUser = await user.update(req.body)
  res.json(updatedUser)
})
