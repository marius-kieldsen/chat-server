import {Router} from "express"
import {createUser, getUser, getUserByUsername, getUsers} from "../services/userService.js";
import {User} from "../models/User.js";
import {hashPassword} from "../services/authService.js";

const users = Router()

users.get('/', async (request, response) => {
  const allUsers = await getUsers()
  response.json(allUsers)
})

users.get('/add', (request, response) => {
  response.render('add')
})

users.get('/:id', async (request, response) => {
  const user = await getUser(request.params.id)
  response.json(user)
})

users.put('/:id', (request, response) => {

})

users.post('/', async (request, response) => {
  const { username, password, level } = request.body

  if (await getUserByUsername(username)) {
    return response.status(409).send({ ok: false, error: 'Brugernavn findes allerede.'})
  }

  await createUser(new User(username, hashPassword(password), level))
  response.status(201).send({ ok: true })
})

export { users }

