const quizesRouter = require('express').Router()
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

quizesRouter.get('/', async (request, response) => {
  const quizes = await Quiz
    .find({}).then(q => {
      response.json(q)
    })
})

quizesRouter.post('/', async (request, response) => {
  const body = request.body

  const token = getToken(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const quiz = new Quiz({
    title: body.title,
    questions: body.questions
  })

  const savedQuiz = await quiz.save()

  const author = {
    id: decodedToken.id,
    username: body.author.username
  }

  const quizPreview = new QuizPreview({
    title: savedQuiz.title,
    timesRun: 0,
    ratings: 0,
    ratingSum: 0,
    ref: savedQuiz.id,
    author: author
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