const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getToken = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('notes', { content: 1, date: 1 })
  response.json(users.map(u => u.toJSON()))
})

usersRouter.get('/:id', async (request, response) => {
  const user = await User.findOne({_id: request.params.id})

  response.json(user)
})

usersRouter.get('/n=:n', async (request, response) => {

  const n = parseInt(request.params.n)

  const users = await User
    .find({}).limit(n)

  console.log()

  response.json(users.map(u => u.toJSON()))
})

usersRouter.get('/s=:n&l=:m', async (request, response) => {

  const n = parseInt(request.params.n)
  const m = parseInt(request.params.m)

  const users = await User
    .find({}).limit(n).skip(m)

  console.log(n, m)

  response.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (request, response) => {
  const body = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    access: 'user',
    points: 0,
    friends: [],
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

usersRouter.put('/friend', async (request, response) => {

  const body = request.body

  const token = getToken(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  console.log('lista znajomych:', body.friends)

  const filter = {_id: decodedToken.id}
  const update = {friends: body.friends}

  User.findOneAndUpdate(filter, update, { new: true })
  .then(alteredUser => {
    response.json(alteredUser)
  })
})

usersRouter.put('/history', async (request, response) => {

  const body = request.body

  const token = getToken(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const filter = {_id: decodedToken.id}
  const update = {history: body.history}

  User.findOneAndUpdate(filter, update, { new: true })
  .then(alteredUser => {
    response.json(alteredUser)
  })
})

usersRouter.put('/points', async (request, response) => {
  const body = request.body

  const token = getToken(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const filter = {_id: decodedToken.id};
  // const filter = {_id: "5ec10648fd0cb70810c4fb49"};

  // console.log('user id', decodedToken.id)
  // console.log(body.points, typeof(body.points))

  const update = {$inc: {points: body.points}};

  User.findOneAndUpdate(filter, update)
  .then(updated => {
    response.json({success: true})
  })
  .catch(e => {
    console.log(e)
    response.json({success: false})
  })
})

usersRouter.put('/:id', async (request, response) => {
  const body = request.body

  const token = getToken(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const filter = {_id: request.params.id}
  const update = {access: body.access}

  User.findOneAndUpdate(filter, update, { new: true })
  .then(alteredUser => {
    response.json(alteredUser)
  })
})

usersRouter.delete('/:id', async (request, response) => {

  const token = getToken(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  await User.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = usersRouter