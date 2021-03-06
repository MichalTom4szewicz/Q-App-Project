const mongoose = require('mongoose')

const quizPreviewSchema = mongoose.Schema({

  title: String,
  //refer: { type: Schema.Types.ObjectId, ref: 'Quiz' },
  ref: String,
  timesRun: Number,
  ratings: Number,
  ratingSum: Number,
  author: {
    id: String,
    username: String
  }
})

quizPreviewSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('QuizPreview', quizPreviewSchema)