const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

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
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

usersRouter.put('/:id', async (request, response) => {
  const body = request.body

  const filter = {_id: request.params.id}
  const update = {access: body.access}

  User.findOneAndUpdate(filter, update, { new: true })
  .then(alteredUser => {
    response.json(alteredUser)
  })
})

usersRouter.delete('/:id', async (request, response) => {

  await User.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = usersRouter