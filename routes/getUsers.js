import {Router} from "express"
import {getUser, getUsers} from "../services/userService.js";

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
  const user = new User(request.body.username, request.body.type)
  await addUser(user) 
  response.redirect('/users')
})

export { users }

