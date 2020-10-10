const mongoose = require('mongoose')

const quizSchema = mongoose.Schema({
  title: String,
  questions: [
    {
        pytanie: String,
        valid: [
          {
            type: String
          }
        ],
        answers: [
          {
            type: String
          }
        ],
    }
  ],
})

quizSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Quiz', quizSchema)