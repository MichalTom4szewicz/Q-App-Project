const quizPreviewsRouter = require('express').Router()
const Quiz = require('../models/quiz')
const QuizPreview = require('../models/quizPreview')
const jwt = require('jsonwebtoken')

const getToken = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

quizPreviewsRouter.get('/', async (request, response) => {
  const quizPreviews = await QuizPreview
  .find({}).then(q => {
      response.json(q)
  })
})

quizPreviewsRouter.get('/:id', async (request, response) => {
  const qp = await QuizPreview.findOne({ref: request.params.id})

  response.json(qp)
})

quizPreviewsRouter.get('/user/:username/:id', async (request, response) => {

  const user ={
    id: request.params.id,
    username: request.params.username
  }

  const qp = await QuizPreview.find({author: user})

  response.json(qp)
})

quizPreviewsRouter.delete('/:id', async (request, response) => {

  const token = getToken(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const quizPreview = await QuizPreview.findById(request.params.id)

  const quizId = quizPreview.ref

  await Quiz.findByIdAndRemove(quizId)
  await QuizPreview.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

quizPreviewsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const qp = await QuizPreview.findOne({ref: request.params.id})

  const filter = {_id: qp._id};

  let update
  if(body.rating === 0) {
    update = {$inc: {timesRun: 1}};
  } else {
    update = {$inc: {timesRun: 1, ratings: 1, ratingSum: body.rating}};
  }

  QuizPreview.findOneAndUpdate(filter, update)
  .then(updated => {
    response.json({succes: true})
  })
  .catch(e => {
    response.json({succes: false})
  })
})

module.exports = quizPreviewsRouter