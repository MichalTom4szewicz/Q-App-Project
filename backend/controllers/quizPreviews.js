const quizPreviewsRouter = require('express').Router()
const Quiz = require('../models/quiz')
const QuizPreview = require('../models/quizPreview')


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

quizPreviewsRouter.delete('/:id', async (request, response) => {

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