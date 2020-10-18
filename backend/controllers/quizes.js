const quizesRouter = require('express').Router()
const Quiz = require('../models/quiz')
const QuizPreview = require('../models/quizPreview')


quizesRouter.get('/', async (request, response) => {
  const quizes = await Quiz
    .find({}).then(q => {
      response.json(q)
    })
})


quizesRouter.post('/', async (request, response) => {
  const body = request.body

  const quiz = new Quiz({
    title: body.title,
    questions: body.questions
  })

  const savedQuiz = await quiz.save()

  const quizPreview = new QuizPreview({
    title: savedQuiz.title,
    timesRun: 0,
    ratings: 0,
    ratingSum: 0,
    ref: savedQuiz.id,
    author: body.author
  })

  const savedQuizPreview = await quizPreview.save()

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

module.exports = quizesRouter