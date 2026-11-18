import {Router} from "express"
import {createUser, getUser, getUserByUsername, getUsers} from "../services/userService.js";
import {User} from "../models/User.js";
import {hashPassword} from "../services/authService.js";

const userRoutes = Router()

userRoutes.get('/', async (request, response) => {
  const allUsers = await getUsers()
  response.json(allUsers)
})

userRoutes.get('/add', (request, response) => {
  response.render('add')
})



userRoutes.get('/:id', async (request, response) => {
  const user = await getUser(request.params.id)
  response.json(user)
})

userRoutes.put('/:id', (request, response) => {

})

userRoutes.post('/', async (request, response) => {
  const { username, password, level } = request.body

  if (await getUserByUsername(username)) {
    return response.status(409).send({error: 'Brugernavn findes allerede.'})
  }

  await createUser(new User(username, hashPassword(password), level))
  response.sendStatus(201)
})

export { userRoutes }

