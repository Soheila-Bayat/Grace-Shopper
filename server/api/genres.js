const router = require('express').Router()
const {Genre, Book, Author} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    if (req.query) {
      const genres = await Genre.findAll({
        where: req.query
      })
      res.status(200).send(genres)
    } else {
      const genres = await Genre.findAll()
      res.status(200).send(genres)
    }
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const genre = await Genre.findById(id, {
      include: [
        {
          model: Book,
          include: [
            {
              model: Author
            }
          ]
        }
      ]
    })
    res.status(200).send(genre)
  } catch (error) {
    next(error)
  }
})

module.exports = router
