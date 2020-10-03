const quizPreviewsRouter = require('express').Router()
const Quiz = require('../models/quiz')
const QuizPreview = require('../models/quizPreview')


quizPreviewsRouter.get('/', async (request, response) => {
  const quizPreviews = await QuizPreview
    .find({}).then(q => {
        response.json(q)
      })

  // response.json(quizPreviews.map(q => q.toJSON()))
})

/*
quizesRouter.post('/', async (request, response) => {
  const body = request.body

  const quiz = new Quiz({
    title: body.title,
    questions: body.questions
  })
  
  const savedQuiz = await quiz.save()
  
  response.json(savedQuiz.toJSON())  
})

quizesRouter.get('/:id', async (request, response) => {
  const quiz = await Quiz.findById(request.params.id)
  
  if (quiz) {
    response.json(quiz.toJSON())
  } else {
    response.status(404).end()
  }
})
*/


module.exports = quizPreviewsRouter