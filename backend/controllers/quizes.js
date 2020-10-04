const quizesRouter = require('express').Router()
const Quiz = require('../models/quiz')
const QuizPreview = require('../models/quizPreview')


quizesRouter.get('/', async (request, response) => {
  const quizes = await Quiz
    .find({}).then(q => {
      response.json(q)
    })

  //response.json(quizes.map(q => q.toJSON()))
})


quizesRouter.post('/', async (request, response) => {
  const body = request.body

  const quiz = new Quiz({
    title: body.title,
    questions: body.questions
  })

  //console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")

  const savedQuiz = await quiz.save()

  const quizPreview = new QuizPreview({
    title: savedQuiz.title,
    ref: savedQuiz.id
  })

  const savedQuizPreview = await quizPreview.save()
  //console.log("bbbbbbbbbbbbbbbbbbbbbbbbbb")

  response.json(savedQuiz.toJSON())
})

quizesRouter.get('/:id', async (request, response) => {
  const quiz = await Quiz.findById(request.params.id)

  // console.log(quiz)

  if (quiz) {
    response.json(quiz.toJSON())
  } else {
    response.status(404).end()
  }
})


module.exports = quizesRouter